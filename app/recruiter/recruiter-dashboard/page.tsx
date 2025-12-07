'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { formatShortDate, formatRelativeTime } from '../../../lib/dateUtils';

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
      {/* Header */}
      <header className="glass-header sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold tracking-tighter">
              AI
            </div>
            <span className="text-lg font-semibold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              CareerForge
            </span>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="/recruiter/recruiter-dashboard"
              className="px-3 py-2 text-sm font-medium text-white bg-white/5 rounded-md border border-white/5"
            >
              Dashboard
            </a>
            <a
              href="/recruiter/post-job"
              className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              Post Job
            </a>
            <a
              href="/recruiter/candidate-matching"
              className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              Candidates
            </a>
            <a
              href="/recruiter/shortlist"
              className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              Shortlists
            </a>
            <a
              href="/recruiter/recruiter-notifications"
              className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              Notifications
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-[1.02] transition-all border border-white/10">
              <Icon icon="lucide:briefcase" width={14} />
              Post a Job
            </button>

            <div className="h-6 w-px bg-slate-800 hidden md:block"></div>

            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Icon icon="lucide:bell" width={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-slate-950"></span>
            </button>

            <div className="flex items-center gap-3 pl-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                <img
                  src="https://ui-avatars.com/api/?name=Alex+R&background=0D8ABC&color=fff"
                  alt="User"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
                />
              </div>
              <Icon
                icon="lucide:chevron-down"
                width={14}
                className="text-slate-500 group-hover:text-slate-300"
              />
            </div>
          </div>
        </div>
        {/* Gradient Underline */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
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

        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Jobs */}
          <div className="glass-panel p-5 rounded-xl group hover:border-indigo-500/30 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Icon icon="lucide:briefcase" width={48} />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Icon icon="lucide:briefcase" width={18} />
              </div>
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                +12% <Icon icon="lucide:arrow-up-right" width={10} />
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-500 font-medium">Active Jobs</p>
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                14
              </h3>
            </div>
            <svg
              className="w-full h-8 mt-2 opacity-50 sparkline"
              viewBox="0 0 100 20"
              fill="none"
            >
              <path
                d="M0 15 Q 10 18, 20 10 T 40 12 T 60 5 T 80 8 T 100 2"
                stroke="#6366f1"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Candidates Matched */}
          <div className="glass-panel p-5 rounded-xl group hover:border-purple-500/30 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Icon icon="lucide:users" width={48} />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Icon icon="lucide:users" width={18} />
              </div>
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                +85 <Icon icon="lucide:user-plus" width={10} />
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-500 font-medium">
                Candidates Matched
              </p>
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                1,204
              </h3>
            </div>
            <div className="mt-3 text-xs text-slate-500">
              Your average match score is{' '}
              <span className="text-purple-400 font-medium">82%</span>.
            </div>
          </div>

          {/* Shortlisted */}
          <div className="glass-panel p-5 rounded-xl group hover:border-amber-500/30 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Icon icon="lucide:star" width={48} />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Icon icon="lucide:star" width={18} />
              </div>
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                Active
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-500 font-medium">Shortlisted</p>
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                48
              </h3>
            </div>
            <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full w-[45%] rounded-full"></div>
            </div>
          </div>

          {/* Time-to-Hire */}
          <div className="glass-panel p-5 rounded-xl group hover:border-teal-500/30 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Icon icon="lucide:clock" width={48} />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <Icon icon="lucide:clock" width={18} />
              </div>
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                -2 days
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-500 font-medium">Time-to-Hire</p>
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                18d
              </h3>
            </div>
            <svg
              className="w-full h-8 mt-2 opacity-50 sparkline"
              viewBox="0 0 100 20"
              fill="none"
            >
              <path
                d="M0 5 L 20 5 L 40 15 L 60 10 L 80 18 L 100 12"
                stroke="#2dd4bf"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

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
              {/* Active Jobs */}
              <section className="glass-panel rounded-xl overflow-hidden flex flex-col h-full">
                <div className="p-5 border-b border-white/5 flex justify-between items-center">
                  <h2 className="text-base font-semibold text-white tracking-tight">
                    Active Jobs
                  </h2>
                  <a
                    href="#"
                    className="text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    View All
                  </a>
                </div>
                <div className="p-2 flex-1">
                  <div className="space-y-1">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className="p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-sm font-medium text-slate-200 group-hover:text-white">
                              {job.title}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {job.location} • Posted{' '}
                              {formatRelativeTime(
                                new Date(
                                  Date.now() -
                                    job.postedDays * 24 * 60 * 60 * 1000
                                )
                              )}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                              job.status === 'open'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-slate-700/50 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {job.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Icon
                              icon="lucide:users"
                              width={12}
                              className="text-indigo-400"
                            />
                            {job.matches} Matches
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon
                              icon="lucide:eye"
                              width={12}
                              className="text-slate-500"
                            />
                            {job.views} Views
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Recent Shortlists */}
              <section className="glass-panel rounded-xl overflow-hidden flex flex-col h-full">
                <div className="p-5 border-b border-white/5 flex justify-between items-center">
                  <h2 className="text-base font-semibold text-white tracking-tight">
                    Recent Shortlists
                  </h2>
                  <button
                    className="text-slate-400 hover:text-white transition-colors"
                    title="Export"
                  >
                    <Icon icon="lucide:download" width={14} />
                  </button>
                </div>
                <div className="p-2 flex-1">
                  <div className="space-y-2">
                    {[
                      {
                        initials: 'EL',
                        name: 'Elena Lewis',
                        title: 'Sr. Backend • 95% Match',
                      },
                      {
                        initials: 'JD',
                        name: 'John Doe',
                        title: 'Prod. Mktg • 88% Match',
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-white/[0.03] p-3 rounded-lg border border-white/5 flex justify-between items-center group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-semibold text-white">
                            {item.initials}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white">
                              {item.name}
                            </h4>
                            <p className="text-[10px] text-slate-500">
                              {item.title}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="text-slate-400 hover:text-white p-1"
                            title="Contact"
                          >
                            <Icon icon="lucide:mail" width={14} />
                          </button>
                          <button
                            className="text-slate-400 hover:text-red-400 p-1"
                            title="Remove"
                          >
                            <Icon icon="lucide:trash-2" width={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3 border-t border-white/5 text-center">
                  <button className="w-full py-1.5 text-xs font-medium text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors border border-white/5 flex items-center justify-center gap-2">
                    <Icon icon="lucide:mail" width={12} />
                    Contact All
                  </button>
                </div>
              </section>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* AI Insights */}
            <section className="glass-panel rounded-xl overflow-hidden border border-indigo-500/30 relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="p-5 border-b border-indigo-500/20 bg-gradient-to-r from-indigo-900/20 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)] animate-pulse-slow">
                    <Icon
                      icon="lucide:sparkles"
                      width={16}
                      className="text-white"
                    />
                  </div>
                  <h2 className="text-base font-semibold text-white tracking-tight">
                    AI Hiring Copilot
                  </h2>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-3">
                  <div className="flex gap-3">
                    <Icon
                      icon="lucide:zap"
                      width={16}
                      className="text-indigo-400 shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-xs text-indigo-100 leading-relaxed mb-2">
                        Your "Sr. Product Designer" job description is missing 2
                        key skills trending in the market:{' '}
                        <span className="text-white font-medium">
                          Motion Design
                        </span>{' '}
                        and{' '}
                        <span className="text-white font-medium">WebGL</span>.
                      </p>
                      <p className="text-[10px] text-indigo-400 mb-2">
                        Adding these could increase candidate quality by 20%.
                      </p>
                      <button className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md transition-colors shadow-lg shadow-indigo-500/20 font-medium w-full flex justify-center items-center gap-2">
                        Apply AI Fix <Icon icon="lucide:wand-2" width={12} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-lg p-3">
                  <div className="flex gap-3">
                    <Icon
                      icon="lucide:alert-circle"
                      width={16}
                      className="text-amber-400 shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Candidate{' '}
                        <span className="text-white font-medium">
                          Michael T.
                        </span>{' '}
                        is at risk of competing offers. He's been active on 3
                        other platforms today.
                      </p>
                      <button className="mt-2 text-xs text-white underline decoration-slate-500 underline-offset-2 hover:decoration-white transition-all">
                        Schedule Interview Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section className="glass-panel rounded-xl overflow-hidden flex flex-col max-h-[400px]">
              <div className="p-4 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-sm font-semibold text-white tracking-tight">
                  Notifications
                </h2>
                <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.5 rounded-full">
                  3 new
                </span>
              </div>
              <div className="overflow-y-auto p-2 space-y-1">
                {[
                  {
                    icon: 'user-plus',
                    color: 'indigo',
                    message: '5 new candidates matched for "Backend Engineer".',
                    time: formatRelativeTime(
                      new Date(Date.now() - 10 * 60 * 1000)
                    ),
                  },
                  {
                    icon: 'check-circle',
                    color: 'emerald',
                    message: 'Job posting "Marketing Lead" is now Live.',
                    time: formatRelativeTime(
                      new Date(Date.now() - 60 * 60 * 1000)
                    ),
                  },
                  {
                    icon: 'message-square',
                    color: 'amber',
                    message: 'Sarah Chen replied to your message.',
                    time: formatRelativeTime(
                      new Date(Date.now() - 2 * 60 * 60 * 1000)
                    ),
                  },
                ].map((notif, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${index === 0 ? 'bg-white/5 border-l-2 border-indigo-500 hover:bg-white/10' : 'hover:bg-white/5'} transition-colors cursor-pointer`}
                  >
                    <div className="flex gap-3">
                      <div className="mt-0.5">
                        <Icon
                          icon={`lucide:${notif.icon}`}
                          width={14}
                          className={`text-${notif.color}-400`}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-slate-200">
                          {index === 0 && (
                            <span className="font-medium text-white">
                              5 new candidates
                            </span>
                          )}
                          {index === 1 && (
                            <>
                              Job posting "
                              <span className="text-emerald-400">
                                Marketing Lead
                              </span>
                              " is now Live.
                            </>
                          )}
                          {index === 2 && (
                            <>Sarah Chen replied to your message.</>
                          )}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-white/5 text-center">
                <button className="text-[10px] text-slate-400 hover:text-white transition-colors">
                  Mark all as read
                </button>
              </div>
            </section>

            {/* Footer */}
            <div className="text-[10px] text-slate-600 text-center px-4">
              <div className="flex justify-center gap-3 mb-2">
                <a href="#" className="hover:text-slate-400">
                  Help
                </a>
                <a href="#" className="hover:text-slate-400">
                  Privacy
                </a>
                <a href="#" className="hover:text-slate-400">
                  Terms
                </a>
              </div>
              <p>Built for recruiters, powered by AI.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
