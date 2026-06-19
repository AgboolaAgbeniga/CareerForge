'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { formatSalaryRange } from '@/lib/utils/currencyUtils';
import Button from '@/components/ui/Button';

interface Skill {
  id: string;
  name: string;
}

export default function PostJob() {
  const [jobTitle, setJobTitle] = useState('Senior Product Designer');
  const [companyName, setCompanyName] = useState('Linear');
  const [location, setLocation] = useState('remote');
  const [employmentType, setEmploymentType] = useState('full-time');
  const [salaryMin, setSalaryMin] = useState('120000');
  const [salaryMax, setSalaryMax] = useState('180000');
  const [deadline, setDeadline] = useState('2023-12-31');
  const [description, setDescription] = useState(
    'We are looking for a Senior Product Designer to join our core team. You will be responsible for defining the user experience across our platform...'
  );
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'Figma' },
    { id: '2', name: 'Prototyping' },
    { id: '3', name: 'UI/UX' },
  ]);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (
      newSkill.trim() &&
      !skills.find((s) => s.name.toLowerCase() === newSkill.toLowerCase())
    ) {
      setSkills([
        ...skills,
        { id: Date.now().toString(), name: newSkill.trim() },
      ]);
      setNewSkill('');
    }
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="bg-canvas text-ink min-h-screen flex flex-col">

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          {/* Left Column: Job Form */}
          <div className="lg:col-span-8 space-y-8">
            {/* Page Header */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="type-display-lg text-ink">
                    Post a Job
                  </h1>
                  <p className="type-body-sm text-body mt-1">
                    Create a new listing. AI-assisted optimization is active.
                  </p>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="type-mono-caption text-ink font-medium">
                    Step 1 of 2
                  </span>
                  <div className="w-32 h-1 bg-surface-dark border border-hairline rounded-sm mt-2 overflow-hidden">
                    <div className="w-[60%] h-full bg-ink"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Details Form */}
            <form className="space-y-6">
              {/* Core Information */}
              <section className="cf-card p-6 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1 h-4 bg-ink rounded-sm"></span>
                  <h2 className="type-mono-caption text-ink font-semibold">
                    Core Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Job Title */}
                  <div className="space-y-1.5">
                    <label className="type-mono-caption text-body">
                      Job Title
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-body">
                        <Icon icon="lucide:briefcase" width={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. Senior Product Designer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="cf-input pl-10"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="type-mono-caption text-body">
                      Company Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-body">
                        <Icon icon="lucide:building-2" width={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. Acme Corp"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="cf-input pl-10"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Logistics */}
              <section className="cf-card p-6 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1 h-4 bg-ink rounded-sm"></span>
                  <h2 className="type-mono-caption text-ink font-semibold">
                    Logistics & Compensation
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Location */}
                  <div className="space-y-1.5">
                    <label className="type-mono-caption text-body">
                      Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-body">
                        <Icon icon="lucide:map-pin" width={18} />
                      </div>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="cf-input pl-10"
                      >
                        <option value="" disabled>
                          Select Location Type
                        </option>
                        <option value="remote">Remote</option>
                        <option value="onsite">On-site</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>

                  {/* Employment Type */}
                  <div className="space-y-1.5">
                    <label className="type-mono-caption text-body">
                      Employment Type
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-body">
                        <Icon icon="lucide:clock" width={18} />
                      </div>
                      <select
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value)}
                        className="cf-input pl-10"
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                      </select>
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div className="space-y-1.5">
                    <label className="type-mono-caption text-body">
                      Salary Range (Annual)
                    </label>
                    <div className="relative flex items-center gap-2">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-body">
                          <Icon icon="lucide:dollar-sign" width={16} />
                        </div>
                        <input
                          type="number"
                          placeholder="Min"
                          value={salaryMin}
                          onChange={(e) => setSalaryMin(e.target.value)}
                          className="cf-input pl-8"
                        />
                      </div>
                      <span className="text-body">-</span>
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-body">
                          <Icon icon="lucide:dollar-sign" width={16} />
                        </div>
                        <input
                          type="number"
                          placeholder="Max"
                          value={salaryMax}
                          onChange={(e) => setSalaryMax(e.target.value)}
                          className="cf-input pl-8"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="space-y-1.5">
                    <label className="type-mono-caption text-body">
                      Application Deadline
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-body">
                        <Icon icon="lucide:calendar" width={18} />
                      </div>
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="cf-input pl-10"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Role Details */}
              <section className="cf-card p-6 space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-4 bg-ink rounded-sm"></span>
                    <h2 className="type-mono-caption text-ink font-semibold">
                      Role Details
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="type-mono-caption text-ink hover:underline flex items-center gap-1 group"
                  >
                    <Icon icon="lucide:sparkles" width={12} />
                    Generate with AI
                  </button>
                </div>

                {/* Rich Text Editor */}
                <div className="space-y-1.5">
                  <label className="type-mono-caption text-body">
                    Job Description
                  </label>
                  <div className="w-full bg-canvas border border-hairline rounded-sm overflow-hidden focus-within:border-ink transition-all">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 p-2 border-b border-hairline bg-surface-dark">
                      <button
                        type="button"
                        className="p-1.5 rounded-sm text-body hover:bg-canvas hover:text-ink transition-colors"
                      >
                        <Icon icon="lucide:bold" width={16} />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded-sm text-body hover:bg-canvas hover:text-ink transition-colors"
                      >
                        <Icon icon="lucide:italic" width={16} />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded-sm text-body hover:bg-canvas hover:text-ink transition-colors"
                      >
                        <Icon icon="lucide:list" width={16} />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded-sm text-body hover:bg-canvas hover:text-ink transition-colors"
                      >
                        <Icon icon="lucide:list-ordered" width={16} />
                      </button>
                      <div className="h-4 w-px bg-hairline mx-1"></div>
                      <button
                        type="button"
                        className="p-1.5 rounded-sm text-body hover:bg-canvas hover:text-ink transition-colors"
                      >
                        <Icon icon="lucide:link" width={16} />
                      </button>
                    </div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-40 p-4 bg-transparent text-ink type-body-sm focus:outline-none resize-none"
                      placeholder="Describe the role..."
                    />
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="space-y-1.5">
                  <label className="type-mono-caption text-body">
                    Required Skills
                  </label>
                  <div className="w-full p-2 bg-canvas border border-hairline rounded-sm flex flex-wrap gap-2 focus-within:border-ink transition-all">
                    {skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-surface-dark text-ink border border-hairline px-2.5 py-1 rounded-sm type-mono-caption flex items-center gap-1.5"
                      >
                        {skill.name}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill.id)}
                          className="hover:text-ink text-body"
                        >
                          <Icon icon="lucide:x" width={12} />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Add a skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="bg-transparent type-body-sm text-ink focus:outline-none px-2 py-1 min-w-[100px] flex-grow"
                    />
                  </div>
                </div>
              </section>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-hairline">
                <Button variant="outline">
                  Save Draft
                </Button>
                <div className="flex gap-4">
                  <Button variant="outline">
                    Preview
                  </Button>
                  <Button variant="primary">
                    Publish Job
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Preview & AI */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Live Preview */}
              <div className="flex items-center justify-between">
                <h3 className="type-mono-caption text-body">
                  Live Preview
                </h3>
                <span className="type-mono-caption bg-surface-dark text-ink px-2 py-0.5 rounded-sm border border-hairline">
                  Active
                </span>
              </div>

              {/* Job Card Preview */}
              <div className="cf-card p-5 relative overflow-hidden group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-sm bg-surface-dark border border-hairline flex items-center justify-center text-ink font-bold type-body-lg">
                    {companyName.charAt(0).toUpperCase()}
                  </div>
                  <button className="text-body hover:text-ink">
                    <Icon icon="lucide:bookmark" width={18} />
                  </button>
                </div>

                <h4 className="text-ink type-body-lg font-semibold tracking-tight mb-1">
                  {jobTitle}
                </h4>
                <p className="text-body type-body-sm mb-4">
                  {companyName} •{' '}
                  {location === 'remote'
                    ? 'Remote'
                    : location === 'onsite'
                      ? 'On-site'
                      : 'Hybrid'}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2 py-1 rounded-sm bg-surface-dark border border-hairline type-mono-caption text-ink">
                    {employmentType === 'full-time'
                      ? 'Full-time'
                      : employmentType === 'part-time'
                        ? 'Part-time'
                        : 'Contract'}
                  </span>
                  <span className="px-2 py-1 rounded-sm bg-surface-dark border border-hairline type-mono-caption text-ink">
                    {formatSalaryRange(
                      parseInt(salaryMin),
                      parseInt(salaryMax),
                      'USD'
                    )}
                  </span>
                  <span className="px-2 py-1 rounded-sm bg-surface-dark border border-hairline type-mono-caption text-ink">
                    Senior Level
                  </span>
                </div>

                <Button variant="primary" className="w-full">
                  Apply Now
                </Button>

                {/* Match Score Overlay */}
                <div className="absolute top-4 right-1/2 translate-x-1/2 bg-canvas border border-hairline px-3 py-1 rounded-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 rounded-sm bg-ink"></div>
                  <span className="type-mono-caption text-ink">
                    Match Score calculated post-publish
                  </span>
                </div>
              </div>

              {/* AI Optimization */}
              <div className="cf-card p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon
                      icon="lucide:bot"
                      width={20}
                      className="text-ink"
                    />
                    <h3 className="type-body-sm font-semibold text-ink">
                      AI Optimization
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Insight 1 */}
                    <div className="p-3 rounded-sm bg-surface-dark border border-hairline">
                      <div className="flex gap-2 items-start">
                        <Icon
                          icon="lucide:trending-up"
                          width={14}
                          className="text-ink mt-0.5 shrink-0"
                        />
                        <div>
                          <p className="type-body-sm text-ink leading-snug">
                            Adding{' '}
                            <span className="font-semibold">
                              "Design Systems"
                            </span>{' '}
                            to skills could increase qualified applicants by
                            18%.
                          </p>
                          <button className="mt-2 type-mono-caption text-ink hover:underline flex items-center gap-1">
                            Apply Suggestion{' '}
                            <Icon icon="lucide:arrow-right" width={10} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Insight 2 */}
                    <div className="p-3 rounded-sm bg-surface-dark border border-hairline">
                      <div className="flex gap-2 items-start">
                        <Icon
                          icon="lucide:alert-circle"
                          width={14}
                          className="text-ink mt-0.5 shrink-0"
                        />
                        <div>
                          <p className="type-body-sm text-ink leading-snug">
                            Salary range is slightly below market average for
                            Senior roles in Remote tech.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
