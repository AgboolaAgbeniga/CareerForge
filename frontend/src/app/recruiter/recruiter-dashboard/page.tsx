'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/queries/useAuth';
import { useRecruiterDashboard } from '@/hooks/queries/useDashboard';
import { Icon } from '@iconify/react';
import { formatShortDate, formatRelativeTime } from '@/lib/utils/dateUtils';
import {
  KPICards,
  ActiveJobs,
  RecentShortlists,
  AIHiringCopilot,
  NotificationsPanel
} from '@/components';
import { CandidateCard } from '@/components/recruiter/CandidateCard';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Button from '@/components/ui/Button';

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
  const { data: user } = useUser();
  const { data: dashboardData, isLoading: isDashboardLoading } = useRecruiterDashboard();
  const realJobs = dashboardData?.jobs || [];
  const realApplications = dashboardData?.applications || [];
  const realNotifications = dashboardData?.notifications || [];
  const isLoading = isDashboardLoading;

  const currentDate = formatShortDate(new Date());

  const filteredCandidates = realApplications.filter(
    (candidate) =>
      candidate?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProtectedRoute allowedRoles={['recruiter']}>
      <div className="bg-canvas text-ink min-h-screen">

        <main className="max-w-7xl mx-auto px-4 py-8 space-y-6 pt-20">
          {/* Welcome & Date */}
          <div className="flex items-end justify-between">
            <div>
              <p className="type-mono-caption text-body mb-1">
                Dashboard
              </p>
              <h1 className="type-display-md text-ink">
                Welcome back, {user ? `${user.firstName} ${user.lastName}` : 'User'}
              </h1>
            </div>
            <div className="text-right hidden sm:block">
              <div className="flex items-center gap-2 type-mono-caption text-body">
                <Icon icon="lucide:calendar" width={14} />
                <span>{currentDate}</span>
              </div>
            </div>
          </div>

          <KPICards applicationsCount={realApplications.length} activeJobsCount={realJobs.length} />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Candidate Matching Panel */}
              <section className="cf-card overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-hairline bg-surface-dark">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="type-body-lg font-semibold text-ink flex items-center gap-2">
                        <Icon
                          icon="lucide:sparkles"
                          width={18}
                          className="text-ink"
                        />
                        Top AI Matches
                      </h2>
                      <p className="type-body-sm text-body mt-1">
                        AI-ranked candidates for your active job postings.
                      </p>
                    </div>

                    {/* Quick Filters */}
                    <div className="flex items-center gap-3">
                      <select
                        value={selectedJob}
                        onChange={(e) => setSelectedJob(e.target.value)}
                        className="cf-input py-2 type-body-sm"
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
                          className="cf-input pl-9 w-48 py-2 type-body-sm"
                        />
                        <Icon
                          icon="lucide:search"
                          width={14}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-body"
                        />
                      </div>

                      <button
                        onClick={() =>
                          setShowAdvancedFilters(!showAdvancedFilters)
                        }
                        className="p-2.5 rounded-sm bg-surface-dark border border-hairline text-body hover:text-ink hover:bg-canvas transition-colors"
                        title="Advanced Filters"
                      >
                        <Icon icon="lucide:sliders-horizontal" width={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Job Summary */}
                <div className="p-6 border-b border-hairline bg-canvas">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-16 h-16 rounded-sm bg-surface-dark flex items-center justify-center border border-hairline flex-shrink-0">
                      <Icon
                        icon="lucide:briefcase"
                        width={24}
                        className="text-ink"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Icon
                              icon="lucide:building"
                              width={14}
                              className="text-body"
                            />
                            <span className="type-mono-caption text-body">
                              Job Title
                            </span>
                          </div>
                          <h3 className="type-body-md font-semibold text-ink">
                            Senior Product Designer
                          </h3>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Icon
                              icon="lucide:map-pin"
                              width={14}
                              className="text-body"
                            />
                            <span className="type-mono-caption text-body">
                              Location
                            </span>
                          </div>
                          <p className="type-body-sm text-ink">San Francisco, CA</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Icon
                              icon="lucide:calendar"
                              width={14}
                              className="text-body"
                            />
                            <span className="type-mono-caption text-body">
                              Date Posted
                            </span>
                          </div>
                          <p className="type-body-sm text-ink">
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
                            width={14}
                            className="text-body"
                          />
                          <span className="type-body-sm text-body">
                            124 candidates matched
                          </span>
                        </div>
                        <Button variant="outline" className="!px-3 !py-1.5 !min-h-0 text-[12px] leading-[12px]">
                          <Icon icon="lucide:pencil" width={12} className="mr-1.5" />
                          Edit Job
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Candidate List */}
                <div className="divide-y divide-hairline">
                  {filteredCandidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                  {filteredCandidates.length === 0 && (
                    <div className="p-8 text-center type-body-sm text-body">
                      No matching candidates found for this job.
                    </div>
                  )}
                </div>

                {/* Advanced Filters */}
                {showAdvancedFilters && (
                  <div className="border-t border-hairline bg-surface-dark">
                    <div className="px-6 py-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Match Score */}
                        <div className="space-y-2">
                          <label className="type-mono-caption text-body">
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
                            className="w-full h-1 bg-canvas border border-hairline rounded-sm appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between type-mono-caption text-body">
                            <span>0%</span>
                            <span className="text-ink font-medium">
                              {matchScoreFilter}%
                            </span>
                            <span>100%</span>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="space-y-2">
                          <label className="type-mono-caption text-body">
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
                                  className="w-4 h-4 rounded-sm border-hairline bg-canvas text-ink focus:ring-ink focus:ring-offset-0"
                                />
                                <span className="type-body-sm text-ink">
                                  {skill}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                          <label className="type-mono-caption text-body">
                            Location
                          </label>
                          <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="cf-input py-1.5"
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
                          <label className="type-mono-caption text-body">
                            Experience Level
                          </label>
                          <select
                            value={experienceFilter}
                            onChange={(e) => setExperienceFilter(e.target.value)}
                            className="cf-input py-1.5"
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
                      <div className="mt-4 pt-4 border-t border-hairline">
                        <label className="type-mono-caption text-body mb-2 block">
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
                                className="w-4 h-4 rounded-sm border-hairline bg-canvas text-ink focus:ring-ink focus:ring-offset-0"
                              />
                              <span className="type-body-sm text-ink">
                                {edu}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Apply Filters */}
                      <div className="mt-6 flex justify-end">
                        <Button variant="primary" className="!px-4 !py-2 !min-h-0 text-[12px] leading-[12px]">
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual Insights */}
                <div className="p-6 border-t border-hairline bg-canvas">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Skill Fit Distribution */}
                    <div className="bg-surface-dark border border-hairline rounded-sm p-4">
                      <h4 className="type-body-sm font-semibold text-ink mb-3">
                        Skill Fit Distribution
                      </h4>
                      <div className="space-y-2">
                        {[
                          { skill: 'Figma', percentage: 95, color: 'ink' },
                          {
                            skill: 'User Research',
                            percentage: 80,
                            color: 'ink',
                          },
                          {
                            skill: 'Prototyping',
                            percentage: 60,
                            color: 'ink',
                          },
                        ].map(({ skill, percentage, color }) => (
                          <div
                            key={skill}
                            className="flex items-center justify-between type-body-sm"
                          >
                            <span className="text-body">{skill}</span>
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-4 rounded-sm ${i < Math.floor(percentage / 20)
                                    ? `bg-ink`
                                    : 'bg-canvas border border-hairline'
                                    }`}
                                />
                              ))}
                            </div>
                            <span className={`text-${color} font-medium`}>
                              {percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Candidates by Match Score */}
                    <div className="bg-surface-dark border border-hairline rounded-sm p-4">
                      <h4 className="type-body-sm font-semibold text-ink mb-3">
                        Candidates by Match Score
                      </h4>
                      <div className="space-y-3">
                        {[
                          {
                            range: '90-100%',
                            width: 25,
                            count: 31,
                            color: 'ink',
                          },
                          {
                            range: '80-89%',
                            width: 35,
                            count: 43,
                            color: 'ink',
                          },
                          {
                            range: '70-79%',
                            width: 30,
                            count: 37,
                            color: 'ink',
                          },
                          {
                            range: '60-69%',
                            width: 10,
                            count: 13,
                            color: 'ink',
                          },
                        ].map(({ range, width, count, color }) => (
                          <div key={range} className="flex items-center gap-3">
                            <span className="type-mono-caption text-body w-12">
                              {range}
                            </span>
                            <div className="flex-1 bg-canvas border border-hairline h-2 rounded-sm overflow-hidden">
                              <div
                                className={`bg-${color} h-full rounded-sm`}
                                style={{ width: `${width}%` }}
                              />
                            </div>
                            <span
                              className={`type-mono-caption text-ink font-medium`}
                            >
                              {count}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="type-mono-caption text-body mt-3 italic">
                        Top candidate matches 9/10 required skills.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-hairline bg-surface-dark">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" className="!px-3 !py-1.5 !min-h-0 text-[12px] leading-[12px]">
                        <Icon icon="lucide:chevron-left" width={14} className="mr-1" />
                        Previous
                      </Button>
                      <span className="type-mono-caption text-body">Page 1 of 13</span>
                      <Button variant="outline" className="!px-3 !py-1.5 !min-h-0 text-[12px] leading-[12px]">
                        Next
                        <Icon icon="lucide:chevron-right" width={14} className="ml-1" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="type-mono-caption text-body italic hidden sm:block">
                        Export shortlist as CSV or PDF.
                      </p>
                      <Button variant="primary" className="!px-4 !py-1.5 !min-h-0 text-[12px] leading-[12px]">
                        <Icon icon="lucide:download" width={12} className="mr-1.5" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Active Jobs and Shortlist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ActiveJobs jobs={realJobs} />
                <RecentShortlists applications={realApplications} />
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-6">
              <AIHiringCopilot />
              <NotificationsPanel notifications={realNotifications} />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
