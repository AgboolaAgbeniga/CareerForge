'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { formatShortDate, formatRelativeTime } from '../../../lib/dateUtils';
import {
  KPICards,
  ActiveJobs,
  RecentShortlists,
  AIHiringCopilot,
  NotificationsPanel
} from '../../../components';

interface Candidate {
  id: string;
  name: string;
  title: string;
  experience: string;
  company: string;
  location: string;
  matchScore: number;
  skills: string[];
  avatar: string;
}

interface Job {
  id: string;
  title: string;
  location: string;
  postedDays: number;
  matches: number;
  views: number;
  status: 'open' | 'draft';
}

export default function RecruiterDashboard() {
  const [selectedJob, setSelectedJob] = useState('senior-designer');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [matchScoreFilter, setMatchScoreFilter] = useState(70);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Figma',
    'User Research',
  ]);
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');

  const currentDate = formatShortDate(new Date());

  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'Senior UX Designer — Full-Stack Developer',
      experience: '7 years experience',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      matchScore: 98,
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      avatar:
        'https://ui-avatars.com/api/?name=Sarah+Chen&background=random&size=64',
    },
    {
      id: '2',
      name: 'Marcus Jones',
      title: 'Product Designer — UI/UX Specialist',
      experience: '5 years experience',
      company: 'StartupXYZ',
      location: 'Remote',
      matchScore: 92,
      skills: ['UI/UX', 'Design Systems', 'Figma'],
      avatar:
        'https://ui-avatars.com/api/?name=Marcus+J&background=random&size=64',
    },
    {
      id: '3',
      name: 'Elena Lewis',
      title: 'UX Researcher — User Experience Analyst',
      experience: '6 years experience',
      company: 'Design Agency',
      location: 'New York, NY',
      matchScore: 78,
      skills: ['User Research', 'Analytics'],
      avatar:
        'https://ui-avatars.com/api/?name=Elena+L&background=random&size=64',
    },
  ];

  const jobs: Job[] = [
    {
      id: 'senior-backend',
      title: 'Senior Backend Engineer',
      location: 'Remote',
      postedDays: 2,
      matches: 42,
      views: 1200,
      status: 'open',
    },
    {
      id: 'product-marketing',
      title: 'Product Marketing Manager',
      location: 'New York',
      postedDays: 5,
      matches: 18,
      views: 850,
      status: 'open',
    },
    {
      id: 'growth-lead',
      title: 'Growth Lead',
      location: 'London',
      postedDays: 0,
      matches: 0,
      views: 0,
      status: 'draft',
    },
  ];

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-950 text-slate-300 font-sans antialiased min-h-screen">

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8 pt-20">
        {/* Welcome & Date */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium text-indigo-400 mb-1 uppercase tracking-wider">
              Dashboard
            </p>
            <h1 className="text-2xl font-semibold text-white tracking-tight">
              Welcome back, Alex
            </h1>
          </div>
          <div className="text-right hidden sm:block">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Icon icon="lucide:calendar" width={14} />
              <span>{currentDate}</span>
            </div>
          </div>
        </div>

        <KPICards />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Candidate Matching Panel */}
            <section className="glass-panel rounded-xl border border-indigo-500/20 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-white/5 bg-gradient-to-r from-indigo-900/10 to-transparent">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-3">
                      <Icon
                        icon="lucide:sparkles"
                        width={20}
                        className="text-indigo-400"
                      />
                      Top AI Matches
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                      AI‑ranked candidates for your active job postings.
                    </p>
                  </div>

                  {/* Quick Filters */}
                  <div className="flex items-center gap-3">
                    <select
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-colors"
                    >
                      <option value="senior-designer">
                        Senior Product Designer
                      </option>
                      <option value="backend-engineer">
                        Senior Backend Engineer
                      </option>
                      <option value="marketing-manager">
                        Product Marketing Manager
                      </option>
                    </select>

                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search candidates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-colors w-48"
                      />
                      <Icon
                        icon="lucide:search"
                        width={14}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                      />
                    </div>

                    <button
                      onClick={() =>
                        setShowAdvancedFilters(!showAdvancedFilters)
                      }
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                      title="Advanced Filters"
                    >
                      <Icon icon="lucide:sliders-horizontal" width={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Job Summary */}
              <div className="p-6 border-b border-white/5 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Icon
                      icon="lucide:briefcase"
                      width={24}
                      className="text-white"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Icon
                            icon="lucide:building"
                            width={16}
                            className="text-indigo-400"
                          />
                          <span className="text-sm font-medium text-slate-400">
                            Job Title
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          Senior Product Designer
                        </h3>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Icon
                            icon="lucide:map-pin"
                            width={16}
                            className="text-indigo-400"
                          />
                          <span className="text-sm font-medium text-slate-400">
                            Location
                          </span>
                        </div>
                        <p className="text-white">San Francisco, CA</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Icon
                            icon="lucide:calendar"
                            width={16}
                            className="text-indigo-400"
                          />
                          <span className="text-sm font-medium text-slate-400">
                            Date Posted
                          </span>
                        </div>
                        <p className="text-white">
                          {formatRelativeTime(
                            new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="lucide:users"
                          width={16}
                          className="text-indigo-400"
                        />
                        <span className="text-sm text-slate-300">
                          124 candidates matched
                        </span>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-[1.02] transition-all border border-white/10 text-sm">
                        <Icon icon="lucide:pencil" width={14} />
                        Edit Job
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Candidate List */}
              <div className="divide-y divide-white/5">
                {filteredCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="p-6 hover:bg-white/[0.02] transition-colors group cursor-pointer"
                  >
                    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden">
                          <img
                            src={candidate.avatar}
                            alt={candidate.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-slate-950 rounded-full p-1">
                          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950"></div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-white tracking-tight">
                            {candidate.name}
                          </h3>
                          <Icon
                            icon="lucide:badge-check"
                            width={16}
                            className="text-blue-400"
                          />
                        </div>
                        <p className="text-sm text-slate-400 mb-3">
                          {candidate.title}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Icon icon="lucide:clock" width={12} />
                            <span>{candidate.experience}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon icon="lucide:briefcase" width={12} />
                            <span>{candidate.company}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon icon="lucide:map-pin" width={12} />
                            <span>{candidate.location}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.map((skill, index) => (
                            <span
                              key={index}
                              className={`text-xs px-2 py-1 rounded border ${
                                index < 2
                                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                                  : 'bg-slate-700 text-slate-400 border-slate-600'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Match Score */}
                      <div className="flex-shrink-0">
                        <div className="text-center">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-full shadow-lg">
                            <span>{candidate.matchScore}%</span>
                            <span className="text-xs opacity-90">Match</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {candidate.matchScore >= 90
                              ? 'Strong fit'
                              : candidate.matchScore >= 80
                                ? 'Strong fit'
                                : 'Medium fit'}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          className="p-3 rounded-lg bg-white/5 hover:bg-indigo-600 hover:text-white text-slate-400 transition-all border border-white/10 group-hover:border-indigo-500/50"
                          title="View Profile"
                        >
                          <Icon icon="lucide:eye" width={18} />
                        </button>
                        <button
                          className="p-3 rounded-lg bg-white/5 hover:bg-amber-500 hover:text-white text-slate-400 transition-all border border-white/10"
                          title="Add to Shortlist"
                        >
                          <Icon icon="lucide:star" width={18} />
                        </button>
                        <button
                          className="p-3 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white text-slate-400 transition-all border border-white/10"
                          title="Contact Candidate"
                        >
                          <Icon icon="lucide:mail" width={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="border-t border-white/5">
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Match Score */}
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400">
                          Match Score (70%+)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={matchScoreFilter}
                          onChange={(e) =>
                            setMatchScoreFilter(Number(e.target.value))
                          }
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>0%</span>
                          <span className="text-indigo-400 font-medium">
                            {matchScoreFilter}%
                          </span>
                          <span>100%</span>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400">
                          Required Skills
                        </label>
                        <div className="space-y-1 max-h-24 overflow-y-auto">
                          {[
                            'Figma',
                            'User Research',
                            'Prototyping',
                            'Design Systems',
                          ].map((skill) => (
                            <label
                              key={skill}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedSkills.includes(skill)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedSkills([
                                      ...selectedSkills,
                                      skill,
                                    ]);
                                  } else {
                                    setSelectedSkills(
                                      selectedSkills.filter((s) => s !== skill)
                                    );
                                  }
                                }}
                                className="custom-checkbox"
                              />
                              <span className="text-xs text-slate-300">
                                {skill}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Location */}
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400">
                          Location
                        </label>
                        <select
                          value={locationFilter}
                          onChange={(e) => setLocationFilter(e.target.value)}
                          className="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-indigo-500/50"
                        >
                          <option value="">Any Location</option>
                          <option value="sf">San Francisco, CA</option>
                          <option value="remote">Remote</option>
                          <option value="ny">New York, NY</option>
                          <option value="la">Los Angeles, CA</option>
                        </select>
                      </div>

                      {/* Experience */}
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400">
                          Experience Level
                        </label>
                        <select
                          value={experienceFilter}
                          onChange={(e) => setExperienceFilter(e.target.value)}
                          className="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-indigo-500/50"
                        >
                          <option value="">Any Experience</option>
                          <option value="entry">Entry Level (0-2 years)</option>
                          <option value="mid">Mid Level (3-5 years)</option>
                          <option value="senior">
                            Senior Level (6-10 years)
                          </option>
                          <option value="lead">
                            Lead/Principal (10+ years)
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Education */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <label className="text-xs font-medium text-slate-400 mb-2 block">
                        Education
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Bachelor's Degree",
                          "Master's Degree",
                          'PhD',
                          'Certifications',
                        ].map((edu) => (
                          <label
                            key={edu}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />
                            <span className="text-xs text-slate-300">
                              {edu}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Apply Filters */}
                    <div className="mt-6 flex justify-end">
                      <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-[1.02] transition-all border border-white/10 text-sm">
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Visual Insights */}
              <div className="p-6 border-t border-white/5 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Skill Fit Distribution */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-white mb-3">
                      Skill Fit Distribution
                    </h4>
                    <div className="space-y-2">
                      {[
                        { skill: 'Figma', percentage: 95, color: 'emerald' },
                        {
                          skill: 'User Research',
                          percentage: 80,
                          color: 'indigo',
                        },
                        {
                          skill: 'Prototyping',
                          percentage: 60,
                          color: 'purple',
                        },
                      ].map(({ skill, percentage, color }) => (
                        <div
                          key={skill}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-slate-400">{skill}</span>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-4 rounded-sm ${
                                  i < Math.floor(percentage / 20)
                                    ? `bg-${color}-500`
                                    : 'bg-slate-700'
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`text-${color}-400 font-medium`}>
                            {percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Candidates by Match Score */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-white mb-3">
                      Candidates by Match Score
                    </h4>
                    <div className="space-y-3">
                      {[
                        {
                          range: '90-100%',
                          width: 25,
                          count: 31,
                          color: 'emerald',
                        },
                        {
                          range: '80-89%',
                          width: 35,
                          count: 43,
                          color: 'indigo',
                        },
                        {
                          range: '70-79%',
                          width: 30,
                          count: 37,
                          color: 'amber',
                        },
                        {
                          range: '60-69%',
                          width: 10,
                          count: 13,
                          color: 'orange',
                        },
                      ].map(({ range, width, count, color }) => (
                        <div key={range} className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 w-12">
                            {range}
                          </span>
                          <div className="flex-1 bg-slate-700 h-3 rounded-full overflow-hidden">
                            <div
                              className={`bg-${color}-500 h-full rounded-full`}
                              style={{ width: `${width}%` }}
                            />
                          </div>
                          <span
                            className={`text-xs text-${color}-400 font-medium`}
                          >
                            {count}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-3 italic">
                      Top candidate matches 9/10 required skills.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:bg-white/10 hover:border-white/20 transition-colors text-sm">
                      <Icon icon="lucide:chevron-left" width={14} />
                      Previous
                    </button>
                    <span className="text-sm text-slate-400">Page 1 of 13</span>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:bg-white/10 hover:border-white/20 transition-colors text-sm">
                      Next
                      <Icon icon="lucide:chevron-right" width={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-xs text-slate-500 italic">
                      Export shortlist as CSV or PDF.
                    </p>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-[1.02] transition-all border border-white/10 text-sm">
                      <Icon icon="lucide:download" width={14} />
                      Export Candidates
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Active Jobs and Shortlist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ActiveJobs jobs={jobs} />

              <RecentShortlists />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            <AIHiringCopilot />

            <NotificationsPanel />

          </div>
        </div>
      </main>
    </div>
  );
}
