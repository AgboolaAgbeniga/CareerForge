'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { formatRelativeTime } from '@/lib/utils/dateUtils';
import Button from '@/components/ui/Button';

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
    <div className="bg-canvas text-ink min-h-screen">
      <main className="max-w-[1400px] mx-auto px-4 py-8 pt-20 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Main Matching Panel */}
          <section className="cf-card overflow-hidden flex flex-col h-full">
            {/* Panel Header */}
            <div className="p-6 pb-4 border-b border-hairline bg-surface-dark">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="type-body-lg font-semibold text-ink flex items-center gap-2">
                    <Icon
                      icon="lucide:sparkles"
                      width={18}
                      className="text-ink"
                    />
                    Top AI Matches
                  </h1>
                  <p className="type-body-sm text-body mt-1">
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
                        className="text-body"
                      />
                    </div>
                    <select
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      className="cf-input pl-9 pr-8 py-2 w-48 type-body-sm font-medium"
                    >
                      <option>Sr. Product Designer</option>
                      <option>Backend Engineer</option>
                      <option>Marketing Lead</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <Icon
                        icon="lucide:chevron-down"
                        width={14}
                        className="text-body"
                      />
                    </div>
                  </div>

                  {/* Search */}
                  <div className="relative hidden sm:block">
                    <Icon
                      icon="lucide:search"
                      width={14}
                      className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-body"
                    />
                    <input
                      type="text"
                      placeholder="Search candidates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="cf-input pl-9 pr-3 py-2 w-40 type-body-sm"
                    />
                  </div>

                  {/* Filter Toggle */}
                  <button className="p-2.5 rounded-sm bg-canvas border border-hairline hover:bg-surface-dark transition-colors text-body">
                    <Icon icon="lucide:sliders-horizontal" width={16} />
                  </button>
                </div>
              </div>

              {/* Job Summary Card */}
              <div className="rounded-sm p-4 border border-hairline bg-canvas flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden mb-2">
                <div className="flex items-center gap-4 z-10">
                  <div className="w-10 h-10 rounded-sm bg-surface-dark border border-hairline flex items-center justify-center text-ink">
                    <Icon icon="lucide:briefcase" width={20} />
                  </div>
                  <div>
                    <h3 className="type-body-md font-semibold text-ink">
                      {selectedJob}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 type-mono-caption text-body">
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
                      <span className="flex items-center gap-1 text-ink bg-surface-dark px-1.5 py-0.5 rounded-sm border border-hairline">
                        <Icon icon="lucide:users" width={12} />
                        124 Matched
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="!px-3 !py-1.5 !min-h-0 text-[12px] leading-[12px] z-10">
                  <Icon
                    icon="lucide:pencil"
                    width={12}
                    className="mr-1.5"
                  />
                  Edit Job Criteria
                </Button>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row h-full relative">
              {/* Advanced Filters Sidebar */}
              <aside className="w-full xl:w-64 border-b xl:border-b-0 xl:border-r border-hairline bg-surface-dark p-5 flex-shrink-0 space-y-6">
                {/* Visual Insights */}
                <div>
                  <h4 className="type-mono-caption text-body mb-3 flex items-center gap-2">
                    <Icon icon="lucide:bar-chart-2" width={12} />
                    Insights
                  </h4>
                  <div className="bg-canvas rounded-sm p-3 border border-hairline">
                    <div className="flex justify-between type-mono-caption text-body mb-2">
                      <span>Top Candidate</span>
                      <span className="text-ink font-medium">
                        98% Fit
                      </span>
                    </div>
                    <div className="w-full bg-surface-dark border border-hairline h-1.5 rounded-sm overflow-hidden mb-3">
                      <div className="bg-ink h-full w-[98%]"></div>
                    </div>
                    <p className="type-mono-caption text-body leading-tight">
                      The top 5 candidates match{' '}
                      <span className="text-ink font-bold">9/10</span> required skills
                      including Motion Design.
                    </p>
                  </div>
                </div>

                {/* Filters */}
                <div className="space-y-4">
                  <h4 className="type-mono-caption text-body flex items-center gap-2">
                    <Icon icon="lucide:filter" width={12} />
                    Filters
                  </h4>

                  {/* Score Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between type-body-sm text-body">
                      <span>Min Match Score</span>
                      <span className="text-ink font-medium">
                        {minScore}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={minScore}
                      onChange={(e) => setMinScore(Number(e.target.value))}
                      className="w-full h-1 bg-canvas border border-hairline rounded-sm appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <label className="type-body-sm text-body">
                      Must-have Skills
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Figma', 'React', '3D'].map((skill) => (
                        <label
                          key={skill}
                          className="flex items-center gap-2 type-body-sm text-ink cursor-pointer hover:opacity-80"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSkills.includes(skill)}
                            onChange={() => toggleSkill(skill)}
                            className="w-4 h-4 rounded-sm border-hairline bg-canvas text-ink focus:ring-ink focus:ring-offset-0"
                          />
                          {skill}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <label className="type-body-sm text-body">
                      Experience Level
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="cf-input py-1.5"
                    >
                      <option>Senior (5-8y)</option>
                      <option>Mid-Level (3-5y)</option>
                      <option>Lead (8y+)</option>
                    </select>
                  </div>

                  <Button variant="primary" className="w-full !px-4 !py-2 !min-h-0 text-[12px] leading-[12px]">
                    Apply Filters
                  </Button>
                </div>
              </aside>

              {/* Candidate List */}
              <div className="flex-1 bg-canvas">
                <div className="divide-y divide-hairline">
                  {filteredCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="p-5 hover:bg-surface-dark transition-colors group relative"
                    >
                      <div className="flex flex-col sm:flex-row gap-5">
                        {/* Left: Avatar & Identity */}
                        <div className="flex gap-4 min-w-[200px]">
                          <div className="relative shrink-0">
                            <div className="w-14 h-14 rounded-sm bg-surface-dark p-0.5 border border-hairline">
                              <img
                                src={candidate.avatar}
                                alt={candidate.name}
                                className="w-full h-full rounded-sm object-cover grayscale opacity-90"
                              />
                            </div>
                            {candidate.badge && (
                              <div className="absolute -bottom-1 -right-1 bg-canvas rounded-sm p-0.5 border border-hairline">
                                <div className="w-4 h-4 bg-ink rounded-sm flex items-center justify-center text-[8px] font-bold text-canvas">
                                  {candidate.badge}
                                </div>
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="type-body-md font-bold text-ink hover:underline cursor-pointer">
                              {candidate.name}
                            </h3>
                            <p className="type-body-sm text-ink font-medium mb-1">
                              {candidate.title}
                            </p>
                            <div className="flex flex-col gap-1 type-mono-caption text-body">
                              <span className="flex items-center gap-1.5">
                                <Icon icon="lucide:briefcase" width={12} />
                                {candidate.company}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Icon icon="lucide:clock" width={12} />
                                {candidate.experience}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Middle: Skills & Stats */}
                        <div className="flex-1 space-y-3">
                          {/* Score Header */}
                          <div className="flex items-center gap-2 mb-1">
                            <div className="type-display-md text-ink">
                              {candidate.matchScore}%
                            </div>
                            <span
                              className={`type-mono-caption px-1.5 py-0.5 rounded-sm border ${
                                candidate.matchScore >= 90
                                  ? 'bg-ink text-canvas border-ink'
                                  : 'bg-surface-dark text-ink border-hairline'
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
                                className={`type-mono-caption px-2 py-0.5 rounded-sm flex items-center gap-1 border ${
                                  skill.has
                                    ? 'bg-surface-dark text-ink border-hairline'
                                    : 'bg-canvas text-body border-hairline line-through'
                                }`}
                              >
                                {skill.has && (
                                  <Icon icon="lucide:check" width={12} />
                                )}
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-center gap-2 pl-2 border-l border-transparent sm:border-l-hairline">
                          <Button variant="primary" className="w-full sm:w-auto !px-3 !py-1.5 !min-h-0 text-[12px] leading-[12px] flex items-center justify-center gap-1.5">
                            <Icon icon="lucide:eye" width={12} />
                            <span className="hidden sm:inline">Profile</span>
                          </Button>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <button
                              className="flex-1 p-2 rounded-sm bg-surface-dark hover:bg-ink hover:text-canvas text-body border border-hairline transition-colors"
                              title="Shortlist"
                            >
                              <Icon
                                icon="lucide:star"
                                width={14}
                                className="mx-auto"
                              />
                            </button>
                            <button
                              className="flex-1 p-2 rounded-sm bg-surface-dark hover:bg-ink hover:text-canvas text-body border border-hairline transition-colors"
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
            <div className="p-4 border-t border-hairline bg-surface-dark flex justify-between items-center z-10">
              <Button variant="outline" className="!px-3 !py-1.5 !min-h-0 text-[12px] leading-[12px]">
                <Icon icon="lucide:download" width={12} className="mr-1.5" />
                Export List
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="!px-2 !py-1.5 !min-h-0 text-[12px]" disabled>
                  <Icon icon="lucide:chevron-left" width={14} />
                </Button>
                <span className="type-mono-caption text-body">
                  1 of 12
                </span>
                <Button variant="outline" className="!px-2 !py-1.5 !min-h-0 text-[12px]">
                  <Icon icon="lucide:chevron-right" width={14} />
                </Button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Copilot */}
          <section className="cf-card overflow-hidden relative">
            <div className="p-5 border-b border-hairline bg-surface-dark flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-canvas flex items-center justify-center border border-hairline">
                <Icon icon="lucide:bot" width={16} className="text-ink" />
              </div>
              <div>
                <h2 className="type-body-sm font-semibold text-ink">
                  AI Copilot
                </h2>
                <p className="type-mono-caption text-body">Analysis active</p>
              </div>
            </div>
            <div className="p-5 space-y-3 bg-canvas">
              <div className="bg-surface-dark border border-hairline rounded-sm p-3">
                <div className="flex gap-3">
                  <Icon
                    icon="lucide:zap"
                    width={14}
                    className="text-ink shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="type-body-sm text-ink leading-relaxed mb-2">
                      <span className="font-semibold text-ink">Sarah Chen</span>{' '}
                      matches 98% but has high salary expectations.
                    </p>
                    <Button variant="outline" className="!px-2 !py-1 !min-h-0 text-[10px] leading-[10px]">
                      View Salary Data
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* KPIs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="cf-card p-4 text-center">
              <p className="type-mono-caption text-body mb-1">
                Time to Hire
              </p>
              <h3 className="type-display-md text-ink">18d</h3>
              <span className="type-mono-caption text-ink font-medium">-2 days</span>
            </div>
            <div className="cf-card p-4 text-center">
              <p className="type-mono-caption text-body mb-1">
                Shortlisted
              </p>
              <h3 className="type-display-md text-ink">48</h3>
              <span className="type-mono-caption text-ink font-medium">+5 new</span>
            </div>
          </div>

          {/* Notifications */}
          <section className="cf-card overflow-hidden flex flex-col">
            <div className="p-4 border-b border-hairline flex justify-between items-center bg-surface-dark">
              <h2 className="type-body-sm font-semibold text-ink">
                Activity
              </h2>
              <span className="type-mono-caption text-body">Today</span>
            </div>
            <div className="p-2 space-y-1 bg-canvas">
              <div className="p-3 rounded-sm hover:bg-surface-dark transition-colors cursor-pointer flex gap-3">
                <Icon
                  icon="lucide:mail"
                  width={14}
                  className="mt-0.5 text-ink"
                />
                <div>
                  <p className="type-body-sm text-ink">
                    Sarah replied to interview request.
                  </p>
                  <p className="type-mono-caption text-body mt-0.5">
                    {formatRelativeTime(new Date(Date.now() - 10 * 60 * 1000))}
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-sm hover:bg-surface-dark transition-colors cursor-pointer flex gap-3">
                <Icon
                  icon="lucide:user-plus"
                  width={14}
                  className="mt-0.5 text-ink"
                />
                <div>
                  <p className="type-body-sm text-ink">
                    New match for Backend Role.
                  </p>
                  <p className="type-mono-caption text-body mt-0.5">
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
