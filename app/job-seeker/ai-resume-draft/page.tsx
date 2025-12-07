'use client';

import React, { useState } from 'react';
import {
  FileText,
  Eye,
  Download,
  Sparkles,
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
  Wand2,
  Edit3,
  FileInput,
  Upload,
} from 'lucide-react';

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
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-slate-700/50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center text-white font-bold tracking-tighter shadow-lg">
                AI
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                Career<span className="text-indigo-400">OS</span>
              </span>
            </div>

            {/* Global Nav */}
            <div className="hidden md:flex items-center space-x-1 bg-slate-800/50 p-1 rounded-full border border-slate-700/50">
              <a
                href="#"
                className="px-4 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="px-4 py-1.5 text-sm font-medium text-white bg-slate-700 shadow-sm rounded-full transition-all"
              >
                Resumes
              </a>
              <a
                href="#"
                className="px-4 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                Jobs
              </a>
              <a
                href="#"
                className="px-4 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                Applications
              </a>
              <a
                href="#"
                className="px-4 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                Learn
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-indigo-400 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 0112 21c7.962 0 12-1.21 12-2.683m-12 2.683a17.925 17.925 0 01-7.132-8.317M12 21V9m0 0a9 9 0 019-9m-9 9a9 9 0 01-9-9"
                  />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950"></span>
              </button>
              <div className="h-6 w-px bg-slate-700"></div>
              <button className="flex items-center gap-2 group">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-slate-700 group-hover:border-indigo-400 transition-colors"
                />
                <svg
                  className="w-4 h-4 text-slate-500 group-hover:text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950 to-slate-950 max-w-[1600px] mx-auto p-6">
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
            {/* LEFT: RESUME EDITOR (Document) */}
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

              {/* Footer Microcopy */}
              <div className="max-w-3xl mx-auto mt-8 text-center pb-8">
                <div className="flex justify-center gap-4 text-xs text-slate-600 mb-2">
                  <a href="#" className="hover:text-slate-400">
                    Help Center
                  </a>
                  <a href="#" className="hover:text-slate-400">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-slate-400">
                    Terms
                  </a>
                </div>
                <p className="text-[10px] text-slate-600 font-mono">
                  Your career identity, powered by AI.
                </p>
              </div>
            </div>

            {/* RIGHT: CONTROL PANEL (Sidebar) */}
            <aside className="w-full lg:w-96 border-l border-slate-800 bg-slate-950/50 backdrop-blur-sm p-6 overflow-y-auto space-y-6">
              {/* 1. RESUME ANALYSIS */}
              <div className="ai-gradient-border p-5 bg-slate-900/40">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Resume Strength
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500 text-white">
                    STRONG
                  </span>
                </div>

                <div className="flex items-center gap-6 mb-4">
                  {/* Radar Chart SVG */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full transform -rotate-90"
                    >
                      {/* Background Pentagon */}
                      <polygon
                        points="50,10 90,40 75,90 25,90 10,40"
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="1"
                      />
                      <polygon
                        points="50,25 70,40 62.5,65 37.5,65 30,40"
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="1"
                      />
                      {/* Data Polygon */}
                      <polygon
                        points="50,15 85,40 70,85 30,80 15,45"
                        fill="rgba(99, 102, 241, 0.2)"
                        stroke="#818cf8"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-indigo-300">
                      85%
                    </div>
                  </div>
                  <div className="space-y-3 flex-1">
                    <div>
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>ATS Score</span>
                        <span className="text-white">88/100</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[88%]"></div>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Your resume is optimized for{' '}
                      <span className="text-white">Tech Lead</span> roles.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. AI INSIGHTS (Actions) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    AI Suggestions
                  </h3>
                </div>

                {/* Insight Card */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-500/30 transition-colors group">
                  <p className="text-xs text-slate-300 mb-2">
                    Adding{' '}
                    <span className="text-purple-400 font-medium">Python</span>{' '}
                    improves match scores by 20%.
                  </p>
                  <button
                    className="w-full py-1.5 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[10px] font-medium border border-purple-500/20 flex items-center justify-center gap-1 transition-colors"
                    onClick={() => addSkill('Python')}
                  >
                    <Wand2 className="w-3 h-3" /> Apply AI Fix
                  </button>
                </div>

                {/* Insight Card */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/30 transition-colors group">
                  <p className="text-xs text-slate-300 mb-2">
                    Quantify your impact at{' '}
                    <span className="text-white">Acme Corp</span>.
                  </p>
                  <button className="w-full py-1.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[10px] font-medium border border-amber-500/20 flex items-center justify-center gap-1 transition-colors">
                    <Edit3 className="w-3 h-3" /> Rewrite with Data
                  </button>
                </div>
              </div>

              {/* 3. TEMPLATES */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex justify-between items-center">
                  Templates
                  <span className="text-[10px] font-normal text-slate-500 normal-case">
                    Switch anytime
                  </span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Template 1 (Active) */}
                  <div
                    className={`aspect-[3/4] rounded-lg border-2 ${selectedTemplate === 0 ? 'border-indigo-500' : 'border-slate-800'} bg-slate-800 relative overflow-hidden cursor-pointer group`}
                    onClick={() => setSelectedTemplate(0)}
                  >
                    <div className="absolute inset-2 flex flex-col gap-1 opacity-50">
                      <div className="h-2 w-1/3 bg-slate-500 rounded-sm"></div>
                      <div className="h-1 w-full bg-slate-600 rounded-sm mt-1"></div>
                      <div className="h-1 w-2/3 bg-slate-600 rounded-sm"></div>
                      <div className="mt-2 h-16 w-full bg-slate-700/50 rounded-sm"></div>
                    </div>
                    <div className="absolute inset-0 bg-indigo-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-medium text-white">
                        Modern
                      </span>
                    </div>
                    {selectedTemplate === 0 && (
                      <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500"></div>
                    )}
                  </div>

                  {/* Template 2 */}
                  <div
                    className="aspect-[3/4] rounded-lg border border-slate-800 bg-slate-900 relative overflow-hidden cursor-pointer hover:border-slate-600 transition-colors group"
                    onClick={() => setSelectedTemplate(1)}
                  >
                    <div className="absolute inset-2 flex flex-col items-center gap-1 opacity-30">
                      <div className="h-3 w-3 rounded-full bg-slate-500"></div>
                      <div className="h-1 w-1/2 bg-slate-600 rounded-sm mt-1"></div>
                      <div className="mt-2 h-full w-full border-t border-slate-700"></div>
                    </div>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-2 py-1 bg-white text-black text-[10px] rounded">
                        Apply
                      </button>
                    </div>
                    <div className="absolute bottom-1 left-0 w-full text-center text-[9px] text-slate-500">
                      Minimal
                    </div>
                  </div>

                  {/* Template 3 */}
                  <div
                    className="aspect-[3/4] rounded-lg border border-slate-800 bg-slate-900 relative overflow-hidden cursor-pointer hover:border-slate-600 transition-colors group"
                    onClick={() => setSelectedTemplate(2)}
                  >
                    <div className="absolute top-0 left-0 bottom-0 w-1/3 bg-slate-800"></div>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-2 py-1 bg-white text-black text-[10px] rounded">
                        Apply
                      </button>
                    </div>
                    <div className="absolute bottom-1 left-0 w-full text-center text-[9px] text-slate-500">
                      Creative
                    </div>
                  </div>

                  {/* Template 4 */}
                  <div
                    className="aspect-[3/4] rounded-lg border border-slate-800 bg-slate-900 relative overflow-hidden cursor-pointer hover:border-slate-600 transition-colors group"
                    onClick={() => setSelectedTemplate(3)}
                  >
                    <div className="absolute top-2 left-2 right-2 border-b border-slate-700 pb-1"></div>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-2 py-1 bg-white text-black text-[10px] rounded">
                        Apply
                      </button>
                    </div>
                    <div className="absolute bottom-1 left-0 w-full text-center text-[9px] text-slate-500">
                      Corporate
                    </div>
                  </div>
                </div>
              </div>

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
