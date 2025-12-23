'use client';

import React, { useState } from 'react';
import {
  FileText,
  Eye,
  Download,
  Sparkles,
  FileInput,
  Upload,
  Linkedin,
} from 'lucide-react';
import {
  ResumeEditor,
  TemplateSelector,
  AISuggestionsPanel,
  ResumeAnalysis,
} from '@/components';

export default function AiResumeDraft() {
  const [resumeData, setResumeData] = useState({
    name: 'John Doe',
    title: 'Senior Product Designer',
    location: 'San Francisco, CA',
    email: 'john.doe@example.com',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.design',
    skills: [
      'Product Strategy',
      'UI/UX Design',
      'Figma',
      'React',
      'Design Systems',
    ],
    experience: [
      {
        title: 'Senior Product Designer',
        company: 'Acme Corp • FinTech',
        period: '2021 - Present',
        achievements: [
          'Spearheaded the redesign of the core dashboard, increasing user engagement by 40%.',
          'Managed a team of 4 junior designers and established weekly design critiques.',
          'Collaborated with engineering to implement a new design system in React.',
        ],
      },
      {
        title: 'Product Designer',
        company: 'Globex Inc',
        period: '2018 - 2021',
        achievements: [
          'Designed and shipped mobile applications for iOS and Android.',
          'Conducted user research and usability testing with over 50 participants.',
        ],
      },
    ],
    education: {
      degree: 'BFA in Interaction Design',
      institution: 'California College of the Arts',
      period: '2014 - 2018',
    },
  });

  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const updateResumeData = (field: string, value: any) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    updateResumeData('experience', newExperience);
  };

  const updateAchievement = (
    expIndex: number,
    achIndex: number,
    value: string
  ) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex].achievements[achIndex] = value;
    updateResumeData('experience', newExperience);
  };

  const addSkill = (skill: string) => {
    updateResumeData('skills', [...resumeData.skills, skill]);
  };

  const removeSkill = (index: number) => {
    const newSkills = resumeData.skills.filter((_, i) => i !== index);
    updateResumeData('skills', newSkills);
  };

  const addExperience = () => {
    const newExp = {
      title: 'New Role',
      company: 'Company Name',
      period: 'Start - End',
      achievements: ['Achievement 1', 'Achievement 2'],
    };
    updateResumeData('experience', [...resumeData.experience, newExp]);
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden text-sm antialiased bg-slate-950 text-slate-200 font-['Rethink_Sans']">

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950 to-slate-950 max-w-[1600px] mx-auto p-6 pt-20">
        {/* RESUME COCKPIT SCREEN */}
        <section className="h-full flex flex-col">
          {/* Cockpit Header */}
          <header className="h-16 px-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md flex items-center justify-between z-20">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-500" />
                Resume Draft
              </h1>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400 text-sm">
                Product Designer - Tech Lead
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
                Saved
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-300 text-xs hover:bg-slate-700 transition-colors">
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-300 text-xs hover:bg-slate-700 transition-colors">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
              <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
                <Sparkles className="w-3.5 h-3.5" /> Optimize with AI
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
            <ResumeEditor
              resumeData={resumeData}
              updateResumeData={updateResumeData}
              updateExperience={updateExperience}
              updateAchievement={updateAchievement}
              addSkill={addSkill}
              removeSkill={removeSkill}
              addExperience={addExperience}
            />

            {/* RIGHT: CONTROL PANEL (Sidebar) */}
            <aside className="w-full lg:w-96 border-l border-slate-800 bg-slate-950/50 backdrop-blur-sm p-6 overflow-y-auto space-y-6">
              <ResumeAnalysis />

              <AISuggestionsPanel addSkill={addSkill} />

              <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />

              {/* 4. ACTIONS PANEL */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <button className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-2 border border-slate-700">
                  <FileInput className="w-4 h-4" /> Generate from Job
                  Description
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-2 border border-slate-700">
                    <Upload className="w-4 h-4" /> Upload
                  </button>
                  <button className="py-2.5 rounded-lg bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] text-xs font-medium transition-colors flex items-center justify-center gap-2 border border-[#0077b5]/20">
                    <Linkedin className="w-4 h-4" /> Sync
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
