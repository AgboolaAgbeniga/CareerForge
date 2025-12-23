'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { formatRelativeTime } from '../../../lib/dateUtils';

interface Candidate {
  id: string;
  name: string;
  title: string;
  company: string;
  experience: string;
  matchScore: number;
  skills: { name: string; has: boolean }[];
  avatar: string;
  badge: string;
}

export default function CandidateMatching() {
  const [selectedJob, setSelectedJob] = useState('Sr. Product Designer');
  const [searchQuery, setSearchQuery] = useState('');
  const [minScore, setMinScore] = useState(85);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Figma',
    'React',
  ]);
  const [experienceLevel, setExperienceLevel] = useState('Senior (5-8y)');

  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'Senior UX Designer',
      company: 'Stripe (3y)',
      experience: '7 YOE Total',
      matchScore: 98,
      skills: [
        { name: 'Figma', has: true },
        { name: 'Prototyping', has: true },
        { name: 'Leadership', has: true },
        { name: 'WebGL', has: false },
      ],
      avatar:
        'https://ui-avatars.com/api/?name=Sarah+Chen&background=10b981&color=fff',
      badge: 'AI',
    },
    {
      id: '2',
      name: 'Marcus Jones',
      title: 'Product Designer',
      company: 'Freelance (2y)',
      experience: '5 YOE Total',
      matchScore: 82,
      skills: [
        { name: 'Figma', has: true },
        { name: 'UI Design', has: true },
        { name: 'Research', has: false },
        { name: 'Leadership', has: false },
      ],
      avatar:
        'https://ui-avatars.com/api/?name=Marcus+Jones&background=f59e0b&color=fff',
      badge: '',
    },
    {
      id: '3',
      name: 'David Kim',
      title: 'UX Engineer',
      company: 'Microsoft (5y)',
      experience: '9 YOE Total',
      matchScore: 94,
      skills: [
        { name: 'React', has: true },
        { name: 'Prototyping', has: true },
        { name: 'WebGL', has: true },
      ],
      avatar:
        'https://ui-avatars.com/api/?name=David+Kim&background=6366f1&color=fff',
      badge: '',
    },
  ];

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="bg-slate-950 text-slate-300 font-sans antialiased min-h-screen">
      {/* Header */}
      <header className="glass-header sticky top-0 z-50 w-full">
        <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold tracking-tighter shadow-glow">
              AI
            </div>
            <span className="text-lg font-semibold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              TalentOS
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="/recruiter/recruiter-dashboard"
              className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/recruiter/candidate-matching"
              className="px-3 py-2 text-sm font-medium text-white bg-white/5 rounded-md border border-white/5 shadow-inner-light"
            >
              Candidates
            </a>
            <a
              href="/recruiter/post-job"
              className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              Jobs
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              Analytics
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Icon icon="lucide:bell" width={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-slate-950"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden cursor-pointer">
              <img
                src="https://ui-avatars.com/api/?name=Alex+R&background=0D8ABC&color=fff"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Main Matching Panel */}
          <section className="glass-panel rounded-xl overflow-hidden flex flex-col h-full border-t border-indigo-500/20 shadow-glow">
            {/* Panel Header */}
            <div className="p-6 pb-4 border-b border-white/5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
                    <Icon
                      icon="lucide:sparkles"
                      width={20}
                      className="text-indigo-400"
                    />
                    Top AI Matches
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">
                    AI-ranked candidates for your active job postings.
                  </p>
                </div>

                {/* Quick Filters */}
                <div className="flex items-center gap-2">
                  {/* Job Selector */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon
                        icon="lucide:briefcase"
                        width={14}
                        className="text-indigo-400"
                      />
                    </div>
                    <select
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      className="appearance-none bg-slate-900/50 border border-white/10 text-white text-xs rounded-lg pl-9 pr-8 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer hover:bg-white/5 w-48 font-medium"
                    >
                      <option>Sr. Product Designer</option>
                      <option>Backend Engineer</option>
                      <option>Marketing Lead</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <Icon
                        icon="lucide:chevron-down"
                        width={14}
                        className="text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Search */}
                  <div className="relative hidden sm:block">
                    <Icon
                      icon="lucide:search"
                      width={14}
                      className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"
                    />
                    <input
                      type="text"
                      placeholder="Search candidates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-900/50 border border-white/10 text-slate-300 text-xs rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-indigo-500 transition-all w-40 hover:bg-white/5"
                    />
                  </div>

                  {/* Filter Toggle */}
                  <button className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors">
                    <Icon icon="lucide:sliders-horizontal" width={16} />
                  </button>
                </div>
              </div>

              {/* Job Summary Card */}
              <div className="relative rounded-xl p-0.5 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-transparent mx-6 mb-6">
                <div className="bg-slate-900/90 rounded-[10px] p-4 flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden">
                  {/* Decorative Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                  <div className="flex items-center gap-4 z-10">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg">
                      <Icon icon="lucide:briefcase" width={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {selectedJob}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Icon icon="lucide:map-pin" width={12} />
                          San Francisco (Hybrid)
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon icon="lucide:calendar" width={12} />
                          {formatRelativeTime(
                            new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
                          )}
                        </span>
                        <span className="flex items-center gap-1 text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                          <Icon icon="lucide:users" width={12} />
                          124 Matched
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="group flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-all z-10">
                    <Icon
                      icon="lucide:pencil"
                      width={12}
                      className="group-hover:rotate-12 transition-transform"
                    />
                    Edit Job Criteria
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row h-full relative">
              {/* Advanced Filters Sidebar */}
              <aside className="w-full xl:w-64 border-b xl:border-b-0 xl:border-r border-white/5 bg-slate-900/30 p-5 flex-shrink-0 space-y-6">
                {/* Visual Insights */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Icon icon="lucide:bar-chart-2" width={12} />
                    Insights
                  </h4>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                      <span>Top Candidate</span>
                      <span className="text-emerald-400 font-medium">
                        98% Fit
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[98%]"></div>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      The top 5 candidates match{' '}
                      <span className="text-white">9/10</span> required skills
                      including Motion Design.
                    </p>
                  </div>
                </div>

                {/* Filters */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Icon icon="lucide:filter" width={12} />
                    Filters
                  </h4>

                  {/* Score Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Min Match Score</span>
                      <span className="text-indigo-400 font-medium">
                        {minScore}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={minScore}
                      onChange={(e) => setMinScore(Number(e.target.value))}
                      className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <label className="text-xs text-slate-300">
                      Must-have Skills
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Figma', 'React', '3D'].map((skill) => (
                        <label
                          key={skill}
                          className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer hover:text-slate-200"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSkills.includes(skill)}
                            onChange={() => toggleSkill(skill)}
                            className="custom-checkbox"
                          />
                          {skill}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <label className="text-xs text-slate-300">
                      Experience Level
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full bg-slate-800 border border-white/10 text-xs text-slate-300 rounded-md p-2 outline-none focus:border-indigo-500"
                    >
                      <option>Senior (5-8y)</option>
                      <option>Mid-Level (3-5y)</option>
                      <option>Lead (8y+)</option>
                    </select>
                  </div>

                  <button className="w-full py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                    Apply Filters
                  </button>
                </div>
              </aside>

              {/* Candidate List */}
              <div className="flex-1 bg-slate-900/10">
                <div className="divide-y divide-white/5">
                  {filteredCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="p-5 hover:bg-white/[0.02] transition-colors group relative"
                    >
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity ${
                          candidate.matchScore >= 90
                            ? 'bg-gradient-to-b from-emerald-500 to-teal-500'
                            : candidate.matchScore >= 80
                              ? 'bg-gradient-to-b from-amber-500 to-orange-500'
                              : 'bg-gradient-to-b from-indigo-500 to-purple-500'
                        }`}
                      />
                      <div className="flex flex-col sm:flex-row gap-5">
                        {/* Left: Avatar & Identity */}
                        <div className="flex gap-4 min-w-[200px]">
                          <div className="relative shrink-0">
                            <div className="w-14 h-14 rounded-full bg-slate-800 p-0.5 border border-slate-700 shadow-lg">
                              <img
                                src={candidate.avatar}
                                alt={candidate.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            </div>
                            {candidate.badge && (
                              <div className="absolute -bottom-1 -right-1 bg-slate-950 rounded-full p-0.5 border border-slate-800">
                                <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] font-bold text-slate-950">
                                  {candidate.badge}
                                </div>
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors cursor-pointer">
                              {candidate.name}
                            </h3>
                            <p className="text-xs text-indigo-300 font-medium mb-1">
                              {candidate.title}
                            </p>
                            <div className="flex flex-col gap-1 text-[11px] text-slate-500">
                              <span className="flex items-center gap-1.5">
                                <Icon icon="lucide:briefcase" width={10} />
                                {candidate.company}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Icon icon="lucide:clock" width={10} />
                                {candidate.experience}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Middle: Skills & Stats */}
                        <div className="flex-1 space-y-3">
                          {/* Score Header */}
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className={`text-2xl font-bold tracking-tighter ${
                                candidate.matchScore >= 90
                                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400'
                                  : candidate.matchScore >= 80
                                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400'
                                    : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400'
                              }`}
                            >
                              {candidate.matchScore}%
                            </div>
                            <span
                              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide ${
                                candidate.matchScore >= 90
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : candidate.matchScore >= 80
                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                    : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                              }`}
                            >
                              {candidate.matchScore >= 90
                                ? 'Strong Match'
                                : candidate.matchScore >= 80
                                  ? 'Potential'
                                  : 'Tech Fit'}
                            </span>
                          </div>

                          {/* Skill Pills */}
                          <div className="flex flex-wrap gap-1.5">
                            {candidate.skills.map((skill, index) => (
                              <span
                                key={index}
                                className={`px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 ${
                                  skill.has
                                    ? 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/20'
                                    : 'bg-slate-800 text-slate-500 border border-slate-700 line-through decoration-slate-600'
                                }`}
                              >
                                {skill.has && (
                                  <Icon icon="lucide:check" width={10} />
                                )}
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-center gap-2 pl-2 border-l border-white/5 border-l-transparent sm:border-l-white/5">
                          <button className="w-full sm:w-auto p-2 sm:py-1.5 sm:px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
                            <Icon icon="lucide:eye" width={14} />
                            <span className="hidden sm:inline">Profile</span>
                          </button>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <button
                              className="flex-1 p-2 rounded-lg bg-white/5 hover:bg-amber-500/20 hover:text-amber-400 hover:border-amber-500/50 text-slate-400 border border-white/10 transition-colors"
                              title="Shortlist"
                            >
                              <Icon
                                icon="lucide:star"
                                width={14}
                                className="mx-auto"
                              />
                            </button>
                            <button
                              className="flex-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10 transition-colors"
                              title="Contact"
                            >
                              <Icon
                                icon="lucide:mail"
                                width={14}
                                className="mx-auto"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-4 border-t border-white/5 bg-slate-900/50 backdrop-blur-sm flex justify-between items-center z-10">
              <button className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors">
                <Icon icon="lucide:download" width={14} />
                Export List
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="p-1.5 rounded-md hover:bg-white/5 text-slate-500 hover:text-white transition-colors disabled:opacity-50"
                  disabled
                >
                  <Icon icon="lucide:chevron-left" width={16} />
                </button>
                <span className="text-xs text-slate-500 font-medium">
                  1 of 12
                </span>
                <button className="p-1.5 rounded-md hover:bg-white/5 text-slate-500 hover:text-white transition-colors">
                  <Icon icon="lucide:chevron-right" width={16} />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Copilot */}
          <section className="glass-panel rounded-xl overflow-hidden border border-indigo-500/30 relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="p-5 border-b border-indigo-500/20 bg-gradient-to-r from-indigo-900/20 to-transparent flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-glow">
                <Icon icon="lucide:bot" width={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white tracking-tight">
                  AI Copilot
                </h2>
                <p className="text-[10px] text-indigo-300">Analysis active</p>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-3">
                <div className="flex gap-3">
                  <Icon
                    icon="lucide:zap"
                    width={14}
                    className="text-indigo-400 shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-xs text-indigo-100 leading-relaxed mb-2">
                      <span className="font-medium text-white">Sarah Chen</span>{' '}
                      matches 98% but has high salary expectations.
                    </p>
                    <button className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded transition-colors shadow-lg shadow-indigo-500/20">
                      View Salary Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* KPIs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-4 rounded-xl text-center hover:border-indigo-500/30 transition-colors">
              <p className="text-[10px] text-slate-500 uppercase font-medium tracking-wider mb-1">
                Time to Hire
              </p>
              <h3 className="text-xl font-bold text-white">18d</h3>
              <span className="text-[10px] text-emerald-400">-2 days</span>
            </div>
            <div className="glass-panel p-4 rounded-xl text-center hover:border-purple-500/30 transition-colors">
              <p className="text-[10px] text-slate-500 uppercase font-medium tracking-wider mb-1">
                Shortlisted
              </p>
              <h3 className="text-xl font-bold text-white">48</h3>
              <span className="text-[10px] text-emerald-400">+5 new</span>
            </div>
          </div>

          {/* Notifications */}
          <section className="glass-panel rounded-xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-sm font-semibold text-white tracking-tight">
                Activity
              </h2>
              <span className="text-[10px] text-slate-500">Today</span>
            </div>
            <div className="p-2 space-y-1">
              <div className="p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer flex gap-3">
                <Icon
                  icon="lucide:mail"
                  width={14}
                  className="mt-0.5 text-indigo-400"
                />
                <div>
                  <p className="text-xs text-slate-300">
                    Sarah replied to interview request.
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {formatRelativeTime(new Date(Date.now() - 10 * 60 * 1000))}
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer flex gap-3">
                <Icon
                  icon="lucide:user-plus"
                  width={14}
                  className="mt-0.5 text-emerald-400"
                />
                <div>
                  <p className="text-xs text-slate-300">
                    New match for Backend Role.
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {formatRelativeTime(new Date(Date.now() - 60 * 60 * 1000))}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
