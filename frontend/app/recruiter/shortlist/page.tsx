'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { formatRelativeTime } from '@/lib/dateUtils';

interface Candidate {
  id: string;
  name: string;
  title: string;
  matchScore: number;
  skills: string[];
  avatar: string;
  status: 'shortlisted' | 'contacted';
}

interface JobShortlist {
  id: string;
  title: string;
  location: string;
  postedDays: number;
  candidates: Candidate[];
}

export default function Shortlist() {
  const [shortlists] = useState<JobShortlist[]>([
    {
      id: '1',
      title: 'Senior Product Designer',
      location: 'San Francisco, CA',
      postedDays: 3,
      candidates: [
        {
          id: '1',
          name: 'Sarah Chen',
          title: 'Senior UX Designer',
          matchScore: 98,
          skills: ['Figma', 'React', 'User Research'],
          avatar:
            'https://ui-avatars.com/api/?name=Sarah+Chen&background=random',
          status: 'shortlisted',
        },
        {
          id: '2',
          name: 'Marcus Jones',
          title: 'Product Designer',
          matchScore: 92,
          skills: ['UI/UX', 'Design Systems', 'Figma'],
          avatar: 'https://ui-avatars.com/api/?name=Marcus+J&background=random',
          status: 'contacted',
        },
        {
          id: '3',
          name: 'Elena Lewis',
          title: 'UX Researcher',
          matchScore: 89,
          skills: ['User Research', 'Analytics', 'Figma'],
          avatar: 'https://ui-avatars.com/api/?name=Elena+L&background=random',
          status: 'shortlisted',
        },
      ],
    },
    {
      id: '2',
      title: 'Backend Engineer',
      location: 'Remote',
      postedDays: 7,
      candidates: [
        {
          id: '4',
          name: 'John Doe',
          title: 'Senior Backend Engineer',
          matchScore: 95,
          skills: ['Python', 'Django', 'PostgreSQL'],
          avatar: 'https://ui-avatars.com/api/?name=John+D&background=random',
          status: 'shortlisted',
        },
      ],
    },
  ]);

  const totalShortlisted = shortlists.reduce(
    (sum, job) => sum + job.candidates.length,
    0
  );

  return (
    <div className="bg-slate-950 text-slate-300 font-sans antialiased min-h-screen">
      {/* Header */}
      <header className="glass-header sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/recruiter/recruiter-dashboard"
            className="flex items-center gap-2 group"
          >
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
              className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
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
              className="px-3 py-2 text-sm font-medium text-white bg-white/5 rounded-md border border-white/5"
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
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">
              Shortlists
            </h1>
            <p className="text-slate-400 text-sm">
              Manage your shortlisted candidates organized by job posting
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient">
                {totalShortlisted}
              </div>
              <div className="text-xs text-slate-500">Total Shortlisted</div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-[1.02] transition-all border border-white/10">
              <Icon icon="lucide:download" width={16} />
              Export All
            </button>
          </div>
        </div>

        {/* Shortlist Groups */}
        <div className="space-y-8">
          {shortlists.map((job) => (
            <div
              key={job.id}
              className="glass-panel rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Icon
                      icon="lucide:briefcase"
                      width={20}
                      className="text-indigo-400"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white tracking-tight">
                      {job.title}
                    </h2>
                    <p className="text-sm text-slate-400">
                      {job.location} • Posted{' '}
                      {formatRelativeTime(
                        new Date(
                          Date.now() - job.postedDays * 24 * 60 * 60 * 1000
                        )
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">
                      {job.candidates.length}
                    </div>
                    <div className="text-xs text-slate-500">Candidates</div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:bg-white/10 hover:border-white/20 transition-colors">
                    <Icon icon="lucide:download" width={16} />
                    Export
                  </button>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-slate-400 mb-4 italic">
                  You have {job.candidates.length} candidates shortlisted for{' '}
                  {job.title}.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {job.candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="bg-white/[0.03] border border-white/5 rounded-lg p-4 hover:bg-white/[0.05] transition-colors group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                            <img
                              src={candidate.avatar}
                              alt={candidate.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white">
                              {candidate.name}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {candidate.title}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                            candidate.status === 'shortlisted'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}
                        >
                          {candidate.status === 'shortlisted'
                            ? 'Shortlisted'
                            : 'Contacted'}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-slate-500">
                            Match Score:
                          </span>
                          <span className="text-sm font-bold text-gradient">
                            {candidate.matchScore}%
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.map((skill, index) => (
                            <span
                              key={index}
                              className={`text-[10px] px-2 py-1 rounded border ${
                                index === 0
                                  ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                                  : index === 1
                                    ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                                    : 'bg-teal-500/10 text-teal-300 border-teal-500/20'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-white/5 hover:bg-indigo-600 hover:text-white text-slate-400 transition-all border border-white/10 rounded text-xs flex items-center justify-center gap-1">
                          <Icon icon="lucide:eye" width={12} />
                          View
                        </button>
                        <button
                          className={`flex-1 px-3 py-2 transition-all border rounded text-xs flex items-center justify-center gap-1 ${
                            candidate.status === 'contacted'
                              ? 'bg-blue-600/20 hover:bg-blue-600 hover:text-white text-blue-400 border-blue-500/20'
                              : 'bg-white/5 hover:bg-blue-600 hover:text-white text-slate-400 border-white/10'
                          }`}
                        >
                          <Icon icon="lucide:mail" width={12} />
                          Contact
                        </button>
                        <button className="px-3 py-2 bg-white/5 hover:bg-red-600 hover:text-white text-slate-400 transition-all border border-white/10 rounded text-xs flex items-center justify-center">
                          <Icon icon="lucide:trash-2" width={12} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Load More */}
                  <div className="md:col-span-2 lg:col-span-3 flex justify-center py-4">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:bg-white/10 hover:border-white/20 transition-colors text-sm">
                      Load More Candidates
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {shortlists.length === 0 && (
          <div className="glass-panel rounded-xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4">
              <Icon icon="lucide:star" width={32} className="text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No Shortlisted Candidates
            </h3>
            <p className="text-slate-400 mb-6">
              Start shortlisting candidates from the matching screen to organize
              your top picks.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-[1.02] transition-all border border-white/10">
              Browse Candidates
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
