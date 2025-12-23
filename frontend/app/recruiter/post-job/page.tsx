'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { formatSalaryRange } from '@/lib/currencyUtils';

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
    <div className="bg-slate-950 text-slate-300 font-rethink antialiased min-h-screen flex flex-col relative">
      {/* Ambient Background Effects */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg tracking-tighter shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              AI
            </div>
            <span className="text-white font-semibold tracking-tight text-lg group-hover:text-indigo-400 transition-colors">
              CareerForge
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="/recruiter/recruiter-dashboard"
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/recruiter/candidate-matching"
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Candidates
            </a>
            <a
              href="/recruiter/post-job"
              className="px-4 py-2 text-sm font-medium text-white border-b-2 border-indigo-500"
            >
              Jobs
            </a>
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Applications
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors group">
              <Icon icon="lucide:bell" width={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-slate-950 animate-pulse"></span>
            </button>
            <div className="h-8 w-px bg-white/10 mx-1 hidden sm:block"></div>
            <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group">
              <img
                src="https://ui-avatars.com/api/?name=Recruiter+Admin&background=4f46e5&color=fff"
                alt="Profile"
                className="w-7 h-7 rounded-full ring-1 ring-white/10"
              />
              <Icon
                icon="lucide:chevron-down"
                width={14}
                className="text-slate-500 group-hover:text-white transition-colors"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          {/* Left Column: Job Form */}
          <div className="lg:col-span-8 space-y-8">
            {/* Page Header */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-semibold text-white tracking-tight">
                    Post a Job
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">
                    Create a new listing. AI-assisted optimization is active.
                  </p>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-xs font-medium text-indigo-400">
                    Step 1 of 2
                  </span>
                  <div className="w-32 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div className="w-[60%] h-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Details Form */}
            <form className="space-y-6">
              {/* Core Information */}
              <section className="glass-card rounded-xl p-6 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1 h-4 bg-indigo-500 rounded-full"></span>
                  <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Core Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Job Title */}
                  <div className="input-group space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 transition-colors">
                      Job Title
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none icon-wrapper transition-colors text-slate-500">
                        <Icon icon="lucide:briefcase" width={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. Senior Product Designer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-white placeholder-slate-600 text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="input-group space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 transition-colors">
                      Company Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none icon-wrapper transition-colors text-slate-500">
                        <Icon icon="lucide:building-2" width={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. Acme Corp"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-white placeholder-slate-600 text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Logistics */}
              <section className="glass-card rounded-xl p-6 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                  <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Logistics & Compensation
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Location */}
                  <div className="input-group space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 transition-colors">
                      Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none icon-wrapper text-slate-500">
                        <Icon icon="lucide:map-pin" width={18} />
                      </div>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="custom-select w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-white text-sm transition-all cursor-pointer"
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
                  <div className="input-group space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 transition-colors">
                      Employment Type
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none icon-wrapper text-slate-500">
                        <Icon icon="lucide:clock" width={18} />
                      </div>
                      <select
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value)}
                        className="custom-select w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-white text-sm transition-all cursor-pointer"
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                      </select>
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div className="input-group space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 transition-colors">
                      Salary Range (Annual)
                    </label>
                    <div className="relative flex items-center gap-2">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                          <Icon icon="lucide:dollar-sign" width={16} />
                        </div>
                        <input
                          type="number"
                          placeholder="Min"
                          value={salaryMin}
                          onChange={(e) => setSalaryMin(e.target.value)}
                          className="w-full pl-8 pr-3 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500/50 text-white text-sm"
                        />
                      </div>
                      <span className="text-slate-500">-</span>
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                          <Icon icon="lucide:dollar-sign" width={16} />
                        </div>
                        <input
                          type="number"
                          placeholder="Max"
                          value={salaryMax}
                          onChange={(e) => setSalaryMax(e.target.value)}
                          className="w-full pl-8 pr-3 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500/50 text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="input-group space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 transition-colors">
                      Application Deadline
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none icon-wrapper text-slate-500">
                        <Icon icon="lucide:calendar" width={18} />
                      </div>
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-white text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Role Details */}
              <section className="glass-card rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-4 bg-teal-500 rounded-full"></span>
                    <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
                      Role Details
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group"
                  >
                    <Icon icon="lucide:sparkles" width={12} />
                    Generate with AI
                  </button>
                </div>

                {/* Rich Text Editor */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400">
                    Job Description
                  </label>
                  <div className="w-full bg-slate-900/50 border border-white/10 rounded-lg overflow-hidden focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 p-2 border-b border-white/5 bg-white/5">
                      <button
                        type="button"
                        className="rte-btn p-1.5 rounded text-slate-400 transition-colors"
                      >
                        <Icon icon="lucide:bold" width={16} />
                      </button>
                      <button
                        type="button"
                        className="rte-btn p-1.5 rounded text-slate-400 transition-colors"
                      >
                        <Icon icon="lucide:italic" width={16} />
                      </button>
                      <button
                        type="button"
                        className="rte-btn p-1.5 rounded text-slate-400 transition-colors"
                      >
                        <Icon icon="lucide:list" width={16} />
                      </button>
                      <button
                        type="button"
                        className="rte-btn p-1.5 rounded text-slate-400 transition-colors"
                      >
                        <Icon icon="lucide:list-ordered" width={16} />
                      </button>
                      <div className="h-4 w-px bg-white/10 mx-1"></div>
                      <button
                        type="button"
                        className="rte-btn p-1.5 rounded text-slate-400 transition-colors"
                      >
                        <Icon icon="lucide:link" width={16} />
                      </button>
                    </div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-40 p-4 bg-transparent text-slate-300 text-sm focus:outline-none resize-none leading-relaxed"
                      placeholder="Describe the role..."
                    />
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400">
                    Required Skills
                  </label>
                  <div className="w-full p-2 bg-slate-900/50 border border-white/10 rounded-lg flex flex-wrap gap-2 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
                    {skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5"
                      >
                        {skill.name}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill.id)}
                          className="hover:text-white"
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
                      className="bg-transparent text-sm text-white focus:outline-none px-2 py-1 min-w-[100px] flex-grow"
                    />
                  </div>
                </div>
              </section>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-slate-300 hover:text-white text-sm font-medium transition-colors"
                >
                  Save Draft
                </button>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium transition-colors"
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.02]"
                  >
                    Publish Job
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Preview & AI */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Live Preview */}
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  Live Preview
                </h3>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                  Active
                </span>
              </div>

              {/* Job Card Preview */}
              <div className="glass-card rounded-2xl p-5 border border-white/10 relative overflow-hidden group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                    {companyName.charAt(0).toUpperCase()}
                  </div>
                  <button className="text-slate-500 hover:text-white">
                    <Icon icon="lucide:bookmark" width={18} />
                  </button>
                </div>

                <h4 className="text-white font-semibold text-lg tracking-tight mb-1">
                  {jobTitle}
                </h4>
                <p className="text-slate-400 text-sm mb-4">
                  {companyName} •{' '}
                  {location === 'remote'
                    ? 'Remote'
                    : location === 'onsite'
                      ? 'On-site'
                      : 'Hybrid'}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300">
                    {employmentType === 'full-time'
                      ? 'Full-time'
                      : employmentType === 'part-time'
                        ? 'Part-time'
                        : 'Contract'}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300">
                    {formatSalaryRange(
                      parseInt(salaryMin),
                      parseInt(salaryMax),
                      'USD'
                    )}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300">
                    Senior Level
                  </span>
                </div>

                <button className="w-full py-2 rounded-lg bg-white text-slate-950 font-semibold text-sm hover:bg-slate-200 transition-colors">
                  Apply Now
                </button>

                {/* Match Score Overlay */}
                <div className="absolute top-4 right-1/2 translate-x-1/2 bg-slate-900/90 backdrop-blur border border-indigo-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="text-[10px] font-medium text-white">
                    Match Score calculated post-publish
                  </span>
                </div>
              </div>

              {/* AI Optimization */}
              <div className="rounded-2xl p-1 relative overflow-hidden bg-gradient-to-b from-indigo-500/20 to-purple-500/20 p-[1px]">
                <div className="bg-slate-950 rounded-2xl p-5 relative h-full">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 blur-[40px] rounded-full pointer-events-none"></div>

                  <div className="flex items-center gap-2 mb-4">
                    <Icon
                      icon="lucide:bot"
                      width={20}
                      className="text-indigo-400 animate-pulse-slow"
                    />
                    <h3 className="text-sm font-semibold text-white">
                      AI Optimization
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Insight 1 */}
                    <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                      <div className="flex gap-2 items-start">
                        <Icon
                          icon="lucide:trending-up"
                          width={14}
                          className="text-indigo-400 mt-0.5 shrink-0"
                        />
                        <div>
                          <p className="text-xs text-slate-300 leading-snug">
                            Adding{' '}
                            <span className="text-white font-medium">
                              "Design Systems"
                            </span>{' '}
                            to skills could increase qualified applicants by
                            18%.
                          </p>
                          <button className="mt-2 text-[10px] font-medium text-indigo-400 hover:text-white transition-colors flex items-center gap-1">
                            Apply Suggestion{' '}
                            <Icon icon="lucide:arrow-right" width={10} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Insight 2 */}
                    <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                      <div className="flex gap-2 items-start">
                        <Icon
                          icon="lucide:alert-circle"
                          width={14}
                          className="text-amber-400 mt-0.5 shrink-0"
                        />
                        <div>
                          <p className="text-xs text-slate-300 leading-snug">
                            Salary range is slightly below market average for
                            Senior roles in Remote tech.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto relative z-10">
        {/* Curved Top SVG */}
        <div className="absolute -top-6 left-0 w-full overflow-hidden leading-none rotate-180 pointer-events-none">
          <svg
            className="relative block w-full h-12"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-slate-950"
            ></path>
          </svg>
        </div>

        <div className="bg-gradient-to-t from-slate-900 to-slate-950 pt-10 pb-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-white font-semibold tracking-tight text-lg mb-1">
                CareerForge
              </h4>
              <p className="text-xs text-slate-500">
                Post jobs confidently, powered by AI.
              </p>
            </div>

            <div className="flex gap-6 text-[11px] text-slate-500 font-medium uppercase tracking-wider">
              <a href="#" className="hover:text-white transition-colors">
                Help Center
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
