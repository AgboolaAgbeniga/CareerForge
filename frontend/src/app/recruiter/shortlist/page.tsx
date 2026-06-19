'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { formatRelativeTime } from '@/lib/utils/dateUtils';
import Button from '@/components/ui/Button';

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
    <div className="bg-canvas text-ink min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-8 pt-24 space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="type-display-lg text-ink mb-2">
              Shortlists
            </h1>
            <p className="text-body type-body-sm">
              Manage your shortlisted candidates organized by job posting
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="type-display-md text-ink">
                {totalShortlisted}
              </div>
              <div className="type-mono-caption text-body">Total Shortlisted</div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Icon icon="lucide:download" width={16} />
              Export All
            </Button>
          </div>
        </div>

        {/* Shortlist Groups */}
        <div className="space-y-8">
          {shortlists.map((job) => (
            <div
              key={job.id}
              className="cf-card overflow-hidden"
            >
              <div className="p-6 border-b border-hairline flex items-center justify-between bg-surface-dark">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-canvas border border-hairline flex items-center justify-center">
                    <Icon
                      icon="lucide:briefcase"
                      width={20}
                      className="text-ink"
                    />
                  </div>
                  <div>
                    <h2 className="type-body-lg font-semibold text-ink tracking-tight">
                      {job.title}
                    </h2>
                    <p className="type-body-sm text-body">
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
                    <div className="type-display-md text-ink">
                      {job.candidates.length}
                    </div>
                    <div className="type-mono-caption text-body">Candidates</div>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Icon icon="lucide:download" width={16} />
                    Export
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <p className="type-body-sm text-body mb-4">
                  You have <span className="font-semibold text-ink">{job.candidates.length}</span> candidates shortlisted for{' '}
                  <span className="font-semibold text-ink">{job.title}</span>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {job.candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="bg-canvas border border-hairline rounded-sm p-4 hover:bg-surface-dark transition-colors group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-sm bg-surface-dark border border-hairline overflow-hidden">
                            <img
                              src={candidate.avatar}
                              alt={candidate.name}
                              className="w-full h-full object-cover grayscale opacity-90"
                            />
                          </div>
                          <div>
                            <h4 className="type-body-sm font-semibold text-ink hover:underline cursor-pointer">
                              {candidate.name}
                            </h4>
                            <p className="type-mono-caption text-body">
                              {candidate.title}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-sm type-mono-caption border ${
                            candidate.status === 'shortlisted'
                              ? 'bg-ink text-canvas border-ink'
                              : 'bg-surface-dark text-ink border-hairline'
                          }`}
                        >
                          {candidate.status === 'shortlisted'
                            ? 'Shortlisted'
                            : 'Contacted'}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="type-mono-caption text-body">
                            Match Score:
                          </span>
                          <span className="type-body-sm font-bold text-ink">
                            {candidate.matchScore}%
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="type-mono-caption px-2 py-1 rounded-sm border border-hairline bg-surface-dark text-ink"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4 pt-4 border-t border-hairline">
                        <Button variant="outline" className="flex-1 !px-2 !py-1.5 !min-h-0 text-[12px] leading-[12px] flex items-center justify-center gap-1">
                          <Icon icon="lucide:eye" width={12} />
                          View
                        </Button>
                        <Button
                          variant={candidate.status === 'contacted' ? 'primary' : 'outline'}
                          className="flex-1 !px-2 !py-1.5 !min-h-0 text-[12px] leading-[12px] flex items-center justify-center gap-1"
                        >
                          <Icon icon="lucide:mail" width={12} />
                          Contact
                        </Button>
                        <Button variant="outline" className="!px-2 !py-1.5 !min-h-0 text-[12px] leading-[12px] flex items-center justify-center">
                          <Icon icon="lucide:trash-2" width={12} />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Load More */}
                  <div className="md:col-span-2 lg:col-span-3 flex justify-center py-4">
                    <Button variant="outline">
                      Load More Candidates
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {shortlists.length === 0 && (
          <div className="cf-card p-12 text-center">
            <div className="w-16 h-16 rounded-sm bg-surface-dark border border-hairline flex items-center justify-center mx-auto mb-4">
              <Icon icon="lucide:star" width={32} className="text-body" />
            </div>
            <h3 className="type-body-lg font-semibold text-ink mb-2">
              No Shortlisted Candidates
            </h3>
            <p className="type-body-sm text-body mb-6">
              Start shortlisting candidates from the matching screen to organize
              your top picks.
            </p>
            <Button variant="primary">
              Browse Candidates
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
