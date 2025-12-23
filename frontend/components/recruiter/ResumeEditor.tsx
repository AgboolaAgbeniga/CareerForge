'use client';

import React from 'react';
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
  education: {
    degree: string;
    institution: string;
    period: string;
  };
}

interface ResumeEditorProps {
  resumeData: ResumeData;
  updateResumeData: (field: string, value: any) => void;
  updateExperience: (index: number, field: string, value: any) => void;
  updateAchievement: (expIndex: number, achIndex: number, value: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  addExperience: () => void;
}

export function ResumeEditor({
  resumeData,
  updateResumeData,
  updateExperience,
  updateAchievement,
  addSkill,
  removeSkill,
  addExperience,
}: ResumeEditorProps) {
  return (
    <div className="flex-1 overflow-y-auto p-8 relative">
      {/* Document Canvas */}
      <div className="max-w-3xl mx-auto bg-slate-900/50 border border-slate-800 rounded-xl shadow-2xl p-8 min-h-[1000px] relative">
        {/* Header Section */}
        <div className="group relative mb-8 border-b border-slate-800/50 pb-6 hover:bg-slate-800/20 -mx-4 px-4 rounded-lg transition-colors">
          <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button className="p-1.5 bg-slate-800 rounded text-indigo-400 hover:text-white border border-slate-700">
              <Pencil className="w-3 h-3" />
            </button>
          </div>
          <h1
            className="text-3xl font-bold text-white mb-2 editable"
            contentEditable
            onInput={(e) =>
              updateResumeData('name', e.currentTarget.textContent)
            }
            suppressContentEditableWarning={true}
          >
            {resumeData.name}
          </h1>
          <p
            className="text-lg text-indigo-400 font-medium mb-3 editable"
            contentEditable
            onInput={(e) =>
              updateResumeData('title', e.currentTarget.textContent)
            }
            suppressContentEditableWarning={true}
          >
            {resumeData.title}
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> {resumeData.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3" /> {resumeData.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3 h-3" /> {resumeData.linkedin}
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3 h-3" /> {resumeData.website}
            </span>
          </div>
        </div>

        {/* Skills Section (Pills) */}
        <div className="mb-8 group relative hover:bg-slate-800/20 -mx-4 px-4 py-2 rounded-lg transition-colors">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-500" /> Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-xs editable"
                contentEditable
                onInput={(e) => {
                  const newSkills = [...resumeData.skills];
                  newSkills[index] = e.currentTarget.textContent || '';
                  updateResumeData('skills', newSkills);
                }}
                suppressContentEditableWarning={true}
              >
                {skill}
              </span>
            ))}
            {/* AI Suggestion Pill */}
            <button
              className="px-2 py-1 rounded-md border border-dashed border-emerald-500/50 text-emerald-400 bg-emerald-500/5 text-xs flex items-center gap-1 hover:bg-emerald-500/10 transition-colors"
              onClick={() => addSkill('Prototyping')}
            >
              <Plus className="w-3 h-3" /> Add "Prototyping"
            </button>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-8 relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-500" />{' '}
              Experience
            </h2>
            <button
              className="text-xs text-indigo-400 hover:text-white flex items-center gap-1"
              onClick={addExperience}
            >
              <Plus className="w-3 h-3" /> Add Role
            </button>
          </div>

          <div className="space-y-6">
            {resumeData.experience.map((exp, expIndex) => (
              <div
                key={expIndex}
                className="relative pl-6 group hover:bg-slate-800/20 -mr-4 pr-4 py-2 rounded-lg transition-colors"
              >
                <div className="resume-timeline-line"></div>
                <div
                  className={`absolute left-0 top-3 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 ${expIndex === 0 ? 'border-indigo-500' : 'border-slate-600 group-hover:border-indigo-500'} transition-colors`}
                ></div>

                <div className="flex justify-between items-baseline mb-1">
                  <h3
                    className="text-white font-medium editable"
                    contentEditable
                    onInput={(e) =>
                      updateExperience(
                        expIndex,
                        'title',
                        e.currentTarget.textContent
                      )
                    }
                    suppressContentEditableWarning={true}
                  >
                    {exp.title}
                  </h3>
                  <span
                    className="text-xs text-slate-500 font-mono editable"
                    contentEditable
                    onInput={(e) =>
                      updateExperience(
                        expIndex,
                        'period',
                        e.currentTarget.textContent
                      )
                    }
                    suppressContentEditableWarning={true}
                  >
                    {exp.period}
                  </span>
                </div>
                <div
                  className="text-xs text-indigo-300 mb-2 editable"
                  contentEditable
                  onInput={(e) =>
                    updateExperience(
                      expIndex,
                      'company',
                      e.currentTarget.textContent
                    )
                  }
                  suppressContentEditableWarning={true}
                >
                  {exp.company}
                </div>
                <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside marker:text-indigo-500/50">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li
                      key={achIndex}
                      className="editable"
                      contentEditable
                      onInput={(e) =>
                        updateAchievement(
                          expIndex,
                          achIndex,
                          e.currentTarget.textContent || ''
                        )
                      }
                      suppressContentEditableWarning={true}
                    >
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-500" />{' '}
            Education
          </h2>
          <div className="group hover:bg-slate-800/20 -mx-4 px-4 py-2 rounded-lg transition-colors">
            <div className="flex justify-between items-baseline mb-1">
              <h3
                className="text-white font-medium editable"
                contentEditable
                onInput={(e) =>
                  updateResumeData('education', {
                    ...resumeData.education,
                    degree: e.currentTarget.textContent,
                  })
                }
                suppressContentEditableWarning={true}
              >
                {resumeData.education.degree}
              </h3>
              <span
                className="text-xs text-slate-500 font-mono editable"
                contentEditable
                onInput={(e) =>
                  updateResumeData('education', {
                    ...resumeData.education,
                    period: e.currentTarget.textContent,
                  })
                }
                suppressContentEditableWarning={true}
              >
                {resumeData.education.period}
              </span>
            </div>
            <div
              className="text-xs text-slate-400 editable"
              contentEditable
              onInput={(e) =>
                updateResumeData('education', {
                  ...resumeData.education,
                  institution: e.currentTarget.textContent,
                })
              }
              suppressContentEditableWarning={true}
            >
              {resumeData.education.institution}
            </div>
          </div>
        </div>

        {/* Portfolio Section */}
        <div>
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-indigo-500" /> Portfolio
          </h2>
          <div className="flex gap-4">
            <a
              href="#"
              className="flex items-center gap-2 px-3 py-2 rounded border border-slate-700 bg-slate-800/30 text-xs text-indigo-300 hover:border-indigo-500/50 hover:bg-slate-800 transition-colors"
            >
              <Github className="w-3 h-3" /> GitHub
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-3 py-2 rounded border border-slate-700 bg-slate-800/30 text-xs text-indigo-300 hover:border-indigo-500/50 hover:bg-slate-800 transition-colors"
            >
              <Figma className="w-3 h-3" /> Behance
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}