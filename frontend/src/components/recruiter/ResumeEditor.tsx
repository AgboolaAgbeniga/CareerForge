'use client';

import React, { useState, useEffect } from 'react';
import {
  Pencil,
  Cpu,
  Briefcase,
  Plus,
  GraduationCap,
  FolderOpen,
  Github,
  Figma,
  MapPin,
  Mail,
  Linkedin,
  Globe,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface ResumeData {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  website: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    period: string;
    achievements: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
  }>;
}

interface ResumeEditorProps {
  resumeData: ResumeData | null;
  isLoading?: boolean;
  error?: Error | null;
  updateResumeData: (field: string, value: any) => void;
  updateExperience: (index: number, field: string, value: any) => void;
  updateAchievement: (expIndex: number, achIndex: number, value: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  addExperience: () => void;
  updateEducation?: (index: number, field: string, value: any) => void;
  addEducation?: () => void;
}

// Editable Field Component for better accessibility and Vercel standards
const EditableField = ({ 
  value, 
  onUpdate, 
  className, 
  multiline = false 
}: { 
  value: string; 
  onUpdate: (val: string) => void; 
  className: string;
  multiline?: boolean;
}) => {
  return (
    <span
      className={`editable outline-none focus:ring-1 focus:ring-primary rounded-sm transition-all px-1 -ml-1 ${className}`}
      contentEditable
      onBlur={(e) => onUpdate(e.currentTarget.textContent || '')}
      suppressContentEditableWarning={true}
    >
      {value}
    </span>
  );
};

export function ResumeEditor({
  resumeData,
  isLoading = false,
  error = null,
  updateResumeData,
  updateExperience,
  updateAchievement,
  addSkill,
  removeSkill,
  addExperience,
  updateEducation,
  addEducation,
}: ResumeEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Hydration safe

  // Error Boundary Fallback
  if (error) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="bg-canvas-dark border-hairline rounded-sm p-6 max-w-md text-center shadow-none">
          <AlertCircle className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-primary font-display mb-2">Failed to load resume</h3>
          <p className="text-[10px] font-mono uppercase tracking-[0.08px] text-body">{error.message || 'An unexpected error occurred.'}</p>
        </div>
      </div>
    );
  }

  // Premium Loading Skeleton
  if (isLoading || !resumeData) {
    return (
      <div className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-3xl mx-auto bg-canvas border-hairline rounded-sm shadow-none p-8 min-h-[800px] animate-pulse">
          <div className="h-10 bg-canvas-dark rounded-sm w-1/3 mb-4"></div>
          <div className="h-6 bg-canvas-dark rounded-sm w-1/4 mb-6"></div>
          <div className="flex gap-4 mb-12">
            <div className="h-4 bg-canvas-dark rounded-sm w-24"></div>
            <div className="h-4 bg-canvas-dark rounded-sm w-32"></div>
          </div>
          <div className="space-y-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-3">
                <div className="h-6 bg-canvas-dark rounded-sm w-1/4"></div>
                <div className="h-4 bg-canvas-dark rounded-sm w-1/3"></div>
                <div className="h-20 bg-canvas-dark rounded-sm w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 relative">
      <div className="max-w-3xl mx-auto bg-canvas border-hairline rounded-sm shadow-none p-8 min-h-[1000px] relative">
        
        {/* Header Section */}
        <div className="group relative mb-8 border-b-hairline pb-6 hover:bg-canvas-dark -mx-4 px-4 rounded-sm transition-colors">
          <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button className="p-1.5 bg-canvas-dark rounded-sm text-body hover:text-primary border-hairline shadow-none transition-all">
              <Pencil className="w-3 h-3" />
            </button>
          </div>
          
          <EditableField 
            value={resumeData.name} 
            onUpdate={(val) => updateResumeData('name', val)} 
            className="text-3xl font-display text-ink mb-2 block w-fit"
          />
          <EditableField 
            value={resumeData.title} 
            onUpdate={(val) => updateResumeData('title', val)} 
            className="text-[10px] font-mono text-body uppercase tracking-[0.08px] mb-3 block w-fit"
          />
          
          <div className="flex flex-wrap gap-4 text-[10px] font-mono text-body uppercase tracking-[0.08px]">
            <span className="flex items-center gap-1.5 hover:text-ink transition-colors cursor-text">
              <MapPin className="w-3 h-3" /> 
              <EditableField value={resumeData.location} onUpdate={(val) => updateResumeData('location', val)} className="" />
            </span>
            <span className="flex items-center gap-1.5 hover:text-ink transition-colors cursor-text">
              <Mail className="w-3 h-3" /> 
              <EditableField value={resumeData.email} onUpdate={(val) => updateResumeData('email', val)} className="" />
            </span>
            <span className="flex items-center gap-1.5 hover:text-ink transition-colors cursor-text">
              <Linkedin className="w-3 h-3" /> 
              <EditableField value={resumeData.linkedin} onUpdate={(val) => updateResumeData('linkedin', val)} className="" />
            </span>
            <span className="flex items-center gap-1.5 hover:text-ink transition-colors cursor-text">
              <Globe className="w-3 h-3" /> 
              <EditableField value={resumeData.website} onUpdate={(val) => updateResumeData('website', val)} className="" />
            </span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-8 group relative hover:bg-canvas-dark -mx-4 px-4 py-3 rounded-sm transition-colors">
          <h2 className="text-[10px] font-mono text-ink uppercase tracking-[0.08px] mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" /> Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2.5 py-1 rounded-sm bg-canvas border-hairline text-[10px] font-mono text-body uppercase tracking-[0.08px] shadow-none hover:border-primary transition-colors"
              >
                <EditableField 
                  value={skill} 
                  onUpdate={(val) => {
                    const newSkills = [...resumeData.skills];
                    newSkills[index] = val;
                    updateResumeData('skills', newSkills);
                  }} 
                  className="" 
                />
              </span>
            ))}
            <button
              className="px-2.5 py-1 rounded-sm border-hairline text-on-primary bg-primary text-[10px] font-mono uppercase tracking-[0.08px] flex items-center gap-1 hover:opacity-90 transition-opacity"
              onClick={() => addSkill('New Skill')}
            >
              <Plus className="w-3 h-3" /> Add Skill
            </button>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-8 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[10px] font-mono text-ink uppercase tracking-[0.08px] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" /> Experience
            </h2>
            <button
              className="text-[10px] font-mono uppercase tracking-[0.08px] text-on-primary hover:opacity-90 bg-primary px-2 py-1 rounded-sm transition-opacity flex items-center gap-1"
              onClick={addExperience}
            >
              <Plus className="w-3 h-3" /> Add Role
            </button>
          </div>

          <div className="space-y-6">
            {resumeData.experience.map((exp, expIndex) => (
              <div
                key={expIndex}
                className="relative pl-6 group hover:bg-canvas-dark -mr-4 pr-4 py-3 rounded-sm transition-colors border-l-hairline ml-2"
              >
                <div
                  className={`absolute -left-[5px] top-4 w-2 h-2 rounded-sm bg-canvas border-hairline ${expIndex === 0 ? 'border-primary shadow-none' : 'group-hover:border-primary'} transition-all`}
                ></div>

                <div className="flex justify-between items-baseline mb-1">
                  <EditableField 
                    value={exp.title} 
                    onUpdate={(val) => updateExperience(expIndex, 'title', val)} 
                    className="text-ink font-display text-base block w-fit"
                  />
                  <EditableField 
                    value={exp.period} 
                    onUpdate={(val) => updateExperience(expIndex, 'period', val)} 
                    className="text-[10px] text-body font-mono uppercase tracking-[0.08px] block w-fit"
                  />
                </div>
                
                <EditableField 
                  value={exp.company} 
                  onUpdate={(val) => updateExperience(expIndex, 'company', val)} 
                  className="text-[10px] font-mono uppercase tracking-[0.08px] text-body mb-3 block w-fit"
                />
                
                <ul className="text-[10px] font-mono text-body uppercase tracking-[0.08px] space-y-2 list-disc list-outside ml-4 marker:text-primary">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="pl-1">
                      <EditableField 
                        value={achievement} 
                        onUpdate={(val) => updateAchievement(expIndex, achIndex, val)} 
                        className="block w-full leading-relaxed"
                        multiline
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[10px] font-mono text-ink uppercase tracking-[0.08px] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" /> Education
            </h2>
            <button
              className="text-[10px] font-mono uppercase tracking-[0.08px] text-on-primary hover:opacity-90 bg-primary px-2 py-1 rounded-sm transition-opacity flex items-center gap-1"
              onClick={addEducation}
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>

          <div className="space-y-4">
            {resumeData.education.map((edu, eduIndex) => (
              <div key={eduIndex} className="group hover:bg-canvas-dark -mx-4 px-4 py-3 rounded-sm transition-colors border-hairline border-transparent hover:border-hairline">
                <div className="flex justify-between items-baseline mb-1">
                  <EditableField 
                    value={edu.degree} 
                    onUpdate={(val) => updateEducation && updateEducation(eduIndex, 'degree', val)} 
                    className="text-ink font-display block w-fit"
                  />
                  <EditableField 
                    value={edu.period} 
                    onUpdate={(val) => updateEducation && updateEducation(eduIndex, 'period', val)} 
                    className="text-[10px] text-body font-mono uppercase tracking-[0.08px] block w-fit"
                  />
                </div>
                <EditableField 
                  value={edu.institution} 
                  onUpdate={(val) => updateEducation && updateEducation(eduIndex, 'institution', val)} 
                  className="text-[10px] font-mono text-body uppercase tracking-[0.08px] block w-fit"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Section */}
        <div>
          <h2 className="text-[10px] font-mono text-ink uppercase tracking-[0.08px] mb-4 flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-primary" /> Portfolio
          </h2>
          <div className="flex gap-4">
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2.5 rounded-sm border-hairline bg-canvas-dark text-[10px] font-mono uppercase tracking-[0.08px] text-body hover:border-primary hover:bg-canvas hover:text-ink transition-all shadow-none"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2.5 rounded-sm border-hairline bg-canvas-dark text-[10px] font-mono uppercase tracking-[0.08px] text-body hover:border-primary hover:bg-canvas hover:text-ink transition-all shadow-none"
            >
              <Figma className="w-4 h-4" /> Behance
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}