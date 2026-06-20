import { Router } from 'express';
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { db } from '../utils/database';
import { jobs, users, jobSeekers, resumes } from '../models/schema';
import { eq, and, sql } from 'drizzle-orm';
import aiService from '../services/aiService';
import logger from '../utils/logger';

const mcpServer = new Server({
  name: "careerforge-mcp-server",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {}
  }
});

// Register List Tools
mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_jobs",
        description: "Search open jobs in CareerForge by skills, location, and salary.",
        inputSchema: {
          type: "object",
          properties: {
            skills: { type: "array", items: { type: "string" }, description: "Skills list to match" },
            location: { type: "string", description: "Location string" },
            salaryMin: { type: "number", description: "Minimum salary" },
            salaryMax: { type: "number", description: "Maximum salary" },
          }
        }
      },
      {
        name: "match_candidate",
        description: "Calculate match score and analysis for a candidate and job.",
        inputSchema: {
          type: "object",
          properties: {
            candidateId: { type: "string", description: "Job seeker user UUID" },
            jobId: { type: "string", description: "Job UUID" }
          },
          required: ["candidateId", "jobId"]
        }
      },
      {
        name: "career_advice",
        description: "Provide career coaching advice for a job seeker.",
        inputSchema: {
          type: "object",
          properties: {
            candidateId: { type: "string", description: "Job seeker user UUID" },
            query: { type: "string", description: "Coaching question/query" }
          },
          required: ["candidateId", "query"]
        }
      },
      {
        name: "resume_parse",
        description: "Parse raw resume text into structured ResumeData.",
        inputSchema: {
          type: "object",
          properties: {
            resumeText: { type: "string", description: "Raw resume text content" }
          },
          required: ["resumeText"]
        }
      },
      {
        name: "skill_gaps",
        description: "Analyze candidate's skills gap against a target role.",
        inputSchema: {
          type: "object",
          properties: {
            candidateId: { type: "string", description: "Job seeker user UUID" },
            targetRole: { type: "string", description: "Target job title" }
          },
          required: ["candidateId", "targetRole"]
        }
      },
      {
        name: "cover_letter",
        description: "Generate a custom tailored cover letter for a candidate and job.",
        inputSchema: {
          type: "object",
          properties: {
            candidateId: { type: "string", description: "Job seeker user UUID" },
            jobId: { type: "string", description: "Job UUID" }
          },
          required: ["candidateId", "jobId"]
        }
      }
    ]
  };
});

// Register Call Tool
mcpServer.setRequestHandler(CallToolRequestSchema, async (request: any) => {
  const { name } = request.params;
  const args = request.params.arguments || {};

  logger.info(`MCP Tool Call: ${name}`, args);

  try {
    switch (name) {
      case "search_jobs": {
        const { skills, location, salaryMin, salaryMax } = args as any;
        const conditions = [eq(jobs.status, 'open')];
        if (location) {
          conditions.push(sql`${jobs.location} ILIKE ${`%${location}%`}`);
        }
        if (skills && skills.length > 0) {
          conditions.push(sql`${jobs.skillsRequired} && ${skills}::text[]`);
        }
        const results = await db.select().from(jobs).where(and(...conditions)).limit(20);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }]
        };
      }

      case "match_candidate": {
        const { candidateId, jobId } = args as any;
        const matchData = await aiService.analyzeResumeForRecruiter(candidateId, jobId);
        return {
          content: [{ type: "text", text: JSON.stringify(matchData, null, 2) }]
        };
      }

      case "career_advice": {
        const { candidateId, query } = args as any;
        const [user] = await db.select().from(users).where(eq(users.id, candidateId)).limit(1);
        let skills: string[] = [];
        let currentRole = "";
        let experienceYears = 0;
        if (user && user.role === 'job_seeker') {
          const [profile] = await db.select().from(jobSeekers).where(eq(jobSeekers.id, candidateId)).limit(1);
          if (profile) {
            skills = profile.skills || [];
            currentRole = profile.title || "";
            experienceYears = profile.experienceYears || 0;
          }
        }
        const advice = await aiService.getCareerAdvice(query, { currentRole, skills, experienceYears });
        return {
          content: [{ type: "text", text: advice }]
        };
      }

      case "resume_parse": {
        const { resumeText } = args as any;
        const parsed = await aiService.parseResume(Buffer.from(resumeText), 'resume.txt');
        return {
          content: [{ type: "text", text: JSON.stringify(parsed, null, 2) }]
        };
      }

      case "skill_gaps": {
        const { candidateId, targetRole } = args as any;
        const gaps = await aiService.analyzeSkillGaps(candidateId, [targetRole]);
        return {
          content: [{ type: "text", text: JSON.stringify(gaps, null, 2) }]
        };
      }

      case "cover_letter": {
        const { candidateId, jobId } = args as any;
        const [userResume] = await db.select().from(resumes).where(eq(resumes.jobSeekerId, candidateId)).limit(1);
        if (!userResume) {
          throw new Error(`No resume found for candidate ${candidateId}`);
        }
        const letter = await aiService.generateCoverLetter(jobId, userResume.id);
        return {
          content: [{ type: "text", text: JSON.stringify(letter, null, 2) }]
        };
      }

      default:
        throw new Error(`Tool ${name} not found`);
    }
  } catch (err: any) {
    logger.error(`MCP Tool Call Error: ${name}`, err);
    return {
      content: [{ type: "text", text: `Error: ${err.message || String(err)}` }],
      isError: true
    };
  }
});

const router = Router();
const transports = new Map<string, SSEServerTransport>();

router.get("/sse", (req, res) => {
  logger.info("New MCP SSE client connection initiated");
  const transport = new SSEServerTransport("/api/mcp/messages", res);
  mcpServer.connect(transport).then(() => {
    const sessionId = transport.sessionId;
    transports.set(sessionId, transport);
    logger.info(`MCP client session ${sessionId} connected successfully`);
    req.on("close", () => {
      transports.delete(sessionId);
      logger.info(`MCP client session ${sessionId} disconnected`);
    });
  }).catch((err: any) => {
    logger.error("Failed to connect MCP server to transport:", err);
  });
});

router.post("/messages", async (req, res, next) => {
  try {
    const sessionId = req.query.sessionId as string;
    if (!sessionId) {
      res.status(400).json({ error: "Missing sessionId parameter" });
      return;
    }
    const transport = transports.get(sessionId);
    if (transport) {
      await transport.handlePostMessage(req, res);
    } else {
      res.status(404).json({ error: `MCP Session ${sessionId} not found` });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
