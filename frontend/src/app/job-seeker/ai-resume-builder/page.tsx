'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import {
  Sparkles,
  FileText,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  Download,
  Check,
  ChevronRight,
  Play,
  RotateCcw
} from 'lucide-react';
import { useUser } from '@/hooks/queries/useAuth';
import Button from '@/components/ui/Button';

export default function AIResumeBuilder() {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useUser();
  const [sessions, setSessions] = useState<any[]>([]);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states for starting new session
  const [targetRole, setTargetRole] = useState('');
  const [experienceYears, setExperienceYears] = useState('2');
  const [keyAchievements, setKeyAchievements] = useState('');

  // Conversational Q&A states
  const [answerInput, setAnswerInput] = useState('');

  // Refinement states
  const [feedbackInput, setFeedbackInput] = useState('');

  useEffect(() => {
    if (user?.id) {
      loadSessions();
    }
  }, [user]);

  const loadSessions = async () => {
    try {
      const response = await apiClient.get('/api/ai/coach/guided-builder/sessions') as any;
      if (response?.success) {
        setSessions(response.sessions || []);
        
        // Auto-resume latest incomplete session if any
        const incomplete = (response.sessions || []).find((s: any) => !s.isCompleted);
        if (incomplete) {
          setCurrentSession(incomplete);
        }
      }
    } catch (err) {
      console.error('Failed to load builder sessions:', err);
    }
  };

  const handleStartSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRole) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/api/ai/coach/guided-builder/start', {
        targetRole,
        experienceYears: Number(experienceYears),
        keyAchievements
      }) as any;

      if (response?.success) {
        setCurrentSession(response.session);
        loadSessions();
      } else {
        setError('Failed to start builder session.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Failed to start session.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerInput.trim() || !currentSession) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/api/ai/coach/guided-builder/respond', {
        sessionId: currentSession.id,
        stage: 1,
        answer: answerInput
      }) as any;

      if (response?.success) {
        setCurrentSession(response.session);
        setAnswerInput('');
      } else {
        setError('Failed to submit answer.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Failed to submit answer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackInput.trim() || !currentSession) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/api/ai/coach/guided-builder/respond', {
        sessionId: currentSession.id,
        stage: 2,
        feedback: feedbackInput
      }) as any;

      if (response?.success) {
        setCurrentSession(response.session);
        setFeedbackInput('');
      } else {
        setError('Failed to refine section.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Failed to refine section.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveSection = async () => {
    if (!currentSession) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/api/ai/coach/guided-builder/respond', {
        sessionId: currentSession.id,
        stage: 2,
        approve: true
      }) as any;

      if (response?.success) {
        setCurrentSession(response.session);
      } else {
        setError('Failed to approve section.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Failed to approve section.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteSession = async () => {
    if (!currentSession) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/api/ai/coach/guided-builder/respond', {
        sessionId: currentSession.id,
        stage: 3,
        approve: true
      }) as any;

      if (response?.success) {
        setCurrentSession(null);
        setTargetRole('');
        setKeyAchievements('');
        loadSessions();
      } else {
        setError('Failed to complete session.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Failed to complete session.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeSession = async (session: any) => {
    setCurrentSession(session);
    setError(null);
  };

  // Helper selectors
  const stage = currentSession?.stage || 0;
  const currentSection = currentSession?.currentSection || 'summary';
  const context = currentSession?.contextData || {};
  const currentQuestionIdx = context.current_question_index || 0;
  const questions = context.questions || [];
  const activeQuestion = questions[currentQuestionIdx];

  const draftSections = currentSession?.draftSections || {};
  const currentDraft = draftSections[currentSection] || {};
  const testResults = currentSession?.readerTestResults || {};

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-950 text-slate-100 p-6 pt-10">
      <main className="flex-1 max-w-[1200px] w-full mx-auto">
        
        {/* Header Block */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-500 font-semibold type-mono-caption">
              <Sparkles className="w-5 h-5" />
              <span>AI CAREER COPILOT</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              Guided Resume Co-Writer
            </h1>
            <p className="text-slate-400 max-w-xl text-sm">
              Create a custom resume targeting your dream role through conversational AI interviews, section drafting, and ATS testing.
            </p>
          </div>
          {currentSession && (
            <button
              onClick={() => setCurrentSession(null)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 border border-slate-800 hover:border-slate-700 bg-slate-900 px-3 py-1.5 rounded-lg transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Back to Dashboard
            </button>
          )}
        </header>

        {error && (
          <div className="mb-6 flex items-start gap-3 bg-red-950/40 border border-red-500/20 p-4 rounded-xl text-red-300 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Error:</span> {error}
            </div>
          </div>
        )}

        {/* Dash/Welcome/Start new session if currentSession is null */}
        {!currentSession && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Start Form */}
            <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white">Initialize New Writer Session</h2>
              <form onSubmit={handleStartSession} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Job Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Frontend Architect, Staff Product Manager"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Years of Experience</label>
                    <select
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                    >
                      <option value="0">Entry / Intern</option>
                      <option value="2">Junior (1-3 yrs)</option>
                      <option value="5">Mid (4-6 yrs)</option>
                      <option value="8">Senior (7-10 yrs)</option>
                      <option value="12">Lead / Executive (10+ yrs)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key achievements & background highlights</label>
                  <textarea
                    placeholder="e.g. Built automated pipelines reducing deployments by 80%, led redesign using Tailwind, managed a team of 3 developers."
                    value={keyAchievements}
                    onChange={(e) => setKeyAchievements(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading || !targetRole}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg hover:shadow-emerald-500/10"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" /> Preparing AI Agent...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Launch Copilot <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* History and Active Sessions List */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl space-y-4">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  Your Sessions
                </h3>
                {sessions.length === 0 ? (
                  <p className="text-sm text-slate-500 italic">No previous co-authoring sessions. Start one to begin.</p>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {sessions.map((s) => (
                      <div
                        key={s.id}
                        className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-white">{s.contextData?.target_role || 'Target Role'}</div>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>Stage {s.stage}</span>
                            <span>•</span>
                            <span className="capitalize">{s.currentSection || 'summary'}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleResumeSession(s)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900 text-emerald-400 text-xs font-semibold transition-all flex items-center gap-1"
                        >
                          {s.isCompleted ? 'View' : 'Resume'} <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ACTIVE SESSION WORKSPACE */}
        {currentSession && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Steps Panel */}
            <div className="lg:col-span-3 space-y-3">
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Workflow Progress</div>
                
                <div className="space-y-2">
                  <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${stage === 1 ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' : 'text-slate-400'}`}>
                    <MessageSquare className="w-4 h-4" />
                    <div className="text-sm font-semibold">1. Context Interview</div>
                  </div>
                  <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${stage === 2 ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' : 'text-slate-400'}`}>
                    <FileText className="w-4 h-4" />
                    <div className="text-sm font-semibold">2. Live Refinement</div>
                  </div>
                  <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${stage === 3 ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' : 'text-slate-400'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <div className="text-sm font-semibold">3. ATS Reader Test</div>
                  </div>
                </div>
              </div>

              {stage === 2 && (
                <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Active Section</div>
                  <div className="flex flex-col gap-1.5">
                    {['summary', 'skills', 'experience', 'education'].map((sec) => (
                      <div
                        key={sec}
                        className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg capitalize ${
                          currentSection === sec 
                            ? 'bg-slate-800 text-white font-semibold' 
                            : draftSections[sec]?.approved 
                              ? 'text-emerald-400' 
                              : 'text-slate-500'
                        }`}
                      >
                        <span>{sec}</span>
                        {draftSections[sec]?.approved && <Check className="w-3.5 h-3.5" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Stage Workspace Card */}
            <div className="lg:col-span-9 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[500px]">
              
              {/* STAGE 1: Q&A CONTEXT GATHERING */}
              {stage === 1 && (
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white">Context Interview</h2>
                      <span className="text-xs type-mono-caption text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                        Question {currentQuestionIdx + 1} of {questions.length}
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/10 text-slate-200 text-base leading-relaxed font-medium">
                      {activeQuestion || "Preparing question..."}
                    </div>

                    {/* Chat answers so far */}
                    {context.answers && context.answers.length > 0 && (
                      <div className="space-y-3 pt-4 border-t border-slate-800">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Responses Gathered</div>
                        <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2">
                          {context.answers.map((a: any, idx: number) => (
                            <div key={idx} className="text-xs bg-slate-900/60 p-3 rounded-lg border border-slate-800 space-y-1">
                              <div className="text-slate-400 font-medium">Q: {a.question}</div>
                              <div className="text-emerald-400 font-semibold">A: {a.answer}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleAnswerSubmit} className="mt-8 pt-6 border-t border-slate-800 flex gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Type your response here..."
                      value={answerInput}
                      onChange={(e) => setAnswerInput(e.target.value)}
                      disabled={isLoading}
                      className="flex-1 bg-slate-850 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isLoading || !answerInput.trim()}
                      className="px-5 bg-emerald-600 hover:bg-emerald-700"
                    >
                      {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ChevronRight className="w-5 h-5" />}
                    </Button>
                  </form>
                </div>
              )}

              {/* STAGE 2: Live Refinement */}
              {stage === 2 && (
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white capitalize">Drafting: {currentSection}</h2>
                      <span className="text-xs type-mono-caption text-yellow-500 bg-yellow-950/20 px-3 py-1 rounded-full border border-yellow-500/10">
                        AI Draft
                      </span>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 max-h-[350px] overflow-y-auto">
                      {currentSection === 'skills' ? (
                        <div className="space-y-4">
                          {currentDraft.content && typeof currentDraft.content === 'object' ? (
                            Object.entries(currentDraft.content).map(([cat, skills]: any) => (
                              <div key={cat} className="space-y-1.5">
                                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{cat}</h4>
                                <div className="flex flex-wrap gap-2">
                                  {skills.map((skill: string) => (
                                    <span key={skill} className="px-2.5 py-1 bg-slate-850 rounded-lg text-xs font-semibold text-emerald-400 border border-slate-750">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))
                          ) : (
                            <pre className="text-sm font-medium leading-relaxed whitespace-pre-wrap font-sans text-slate-300">
                              {JSON.stringify(currentDraft.content || {})}
                            </pre>
                          )}
                        </div>
                      ) : (
                        <pre className="text-sm font-medium leading-relaxed whitespace-pre-wrap font-sans text-slate-300">
                          {currentDraft.content || "Generating proposal..."}
                        </pre>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
                    <form onSubmit={handleRefineSubmit} className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Suggest improvements, change tone, add keywords..."
                        value={feedbackInput}
                        onChange={(e) => setFeedbackInput(e.target.value)}
                        disabled={isLoading}
                        className="flex-1 bg-slate-850 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                      />
                      <Button
                        type="submit"
                        variant="outline"
                        disabled={isLoading || !feedbackInput.trim()}
                        className="px-4 border-slate-700 hover:border-slate-600 text-slate-300"
                      >
                        {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Regenerate"}
                      </Button>
                    </form>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleApproveSection}
                        variant="primary"
                        disabled={isLoading}
                        className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2.5 font-bold shadow-lg shadow-emerald-500/10 flex items-center gap-2"
                      >
                        Approve & Continue <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 3: Reader Test / ATS Review */}
              {stage === 3 && (
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white">Simulated Recruiter Review</h2>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-950 border border-slate-850 rounded-2xl text-center space-y-2">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">ATS Score</div>
                        <div className="text-5xl font-black text-emerald-400">
                          {testResults.ats_score || 80}%
                        </div>
                        <div className="text-xs text-slate-400">Match score for {context.target_role}</div>
                      </div>

                      <div className="md:col-span-8 space-y-3">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Key Strengths
                        </h3>
                        <ul className="text-xs space-y-1 text-slate-300 list-disc pl-4">
                          {(testResults.strengths || []).map((s: string, idx: number) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                      <div className="space-y-3">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2 text-yellow-500">
                          <AlertCircle className="w-4 h-4" /> Gaps & Blindspots
                        </h3>
                        <ul className="text-xs space-y-1 text-slate-300 list-disc pl-4">
                          {(testResults.gaps || []).map((g: string, idx: number) => (
                            <li key={idx}>{g}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2 text-emerald-400">
                          <Sparkles className="w-4 h-4" /> Next Steps
                        </h3>
                        <ul className="text-xs space-y-1 text-slate-300 list-disc pl-4">
                          {(testResults.recommendations || []).map((r: string, idx: number) => (
                            <li key={idx}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end gap-3">
                    <Button
                      onClick={handleCompleteSession}
                      variant="primary"
                      disabled={isLoading}
                      className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2.5 font-bold shadow-lg flex items-center gap-2"
                    >
                      Finish Resume
                    </Button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
