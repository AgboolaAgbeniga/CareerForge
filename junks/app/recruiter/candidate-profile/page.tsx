'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  description: string;
}

interface Skill {
  name: string;
  level: number;
  label: string;
}

interface Certification {
  name: string;
  issued: string;
}

interface Portfolio {
  name: string;
  url: string;
  displayUrl: string;
}

export default function CandidateProfile() {
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState(['Top Candidate', 'Design Systems Expert']);

  const experience: Experience[] = [
    {
      id: '1',
      title: 'Senior UX Designer',
      company: 'TechCorp Inc.',
      period: '2021 - Present',
      description:
        'Led design for 5+ major product features, conducted user research with 200+ participants, and established design system used across 10 teams.',
      skills: ['Figma', 'User Research', 'Design Systems'],
    },
    {
      id: '2',
      title: 'UX Designer',
      company: 'StartupXYZ',
      period: '2019 - 2021',
      description:
        'Designed mobile app interface used by 50K+ users, collaborated with engineering team on implementation, and conducted A/B testing for feature optimization.',
      skills: ['Sketch', 'InVision', 'Prototyping'],
    },
    {
      id: '3',
      title: 'Junior Designer',
      company: 'Design Agency',
      period: '2017 - 2019',
      description:
        'Created visual designs for web and mobile projects, assisted in user testing sessions, and contributed to design process documentation.',
      skills: ['Adobe Creative Suite', 'HTML/CSS'],
    },
  ];

  const education: Education[] = [
    {
      id: '1',
      degree: 'Master of Design',
      school: 'California College of the Arts',
      period: '2015 - 2017',
      description: 'Focus on Interaction Design and Human-Computer Interaction',
    },
    {
      id: '2',
      degree: 'Bachelor of Fine Arts',
      school: 'San Francisco Art Institute',
      period: '2011 - 2015',
      description: 'Graphic Design major with emphasis on digital media',
    },
  ];

  const skills: Skill[] = [
    { name: 'Figma', level: 95, label: 'Expert' },
    { name: 'User Research', level: 90, label: 'Expert' },
    { name: 'Prototyping', level: 85, label: 'Advanced' },
    { name: 'Design Systems', level: 88, label: 'Advanced' },
    { name: 'React', level: 75, label: 'Intermediate' },
    { name: 'Leadership', level: 80, label: 'Advanced' },
  ];

  const certifications: Certification[] = [
    { name: 'Google UX Design Certificate', issued: '2022' },
    { name: 'Certified Usability Analyst', issued: '2021' },
  ];

  const portfolio: Portfolio[] = [
    { name: 'Portfolio Website', url: '#', displayUrl: 'sarahchen.design' },
    {
      name: 'Dribbble Profile',
      url: '#',
      displayUrl: 'dribbble.com/sarahchen',
    },
    {
      name: 'LinkedIn Profile',
      url: '#',
      displayUrl: 'linkedin.com/in/sarahchen',
    },
  ];

  const addTag = () => {
    // Simple implementation - in real app would have input
    setTags([...tags, 'New Tag']);
  };

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

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Profile Header */}
            <div className="glass-panel rounded-xl p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                    <img
                      src="https://ui-avatars.com/api/?name=Sarah+Chen&background=random&size=96"
                      alt="Sarah Chen"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-slate-950 rounded-full p-1">
                    <div className="w-4 h-4 bg-green-500 rounded-full border border-slate-950"></div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-semibold text-white tracking-tight">
                      Sarah Chen
                    </h1>
                    <Icon
                      icon="lucide:badge-check"
                      width={20}
                      className="text-blue-400"
                    />
                  </div>
                  <p className="text-slate-400 mb-3">
                    Senior UX Designer • San Francisco, CA
                  </p>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="lucide:briefcase"
                        width={16}
                        className="text-indigo-400"
                      />
                      <span className="text-slate-300">7 years experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="lucide:map-pin"
                        width={16}
                        className="text-indigo-400"
                      />
                      <span className="text-slate-300">San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="lucide:mail"
                        width={16}
                        className="text-indigo-400"
                      />
                      <span className="text-slate-300">
                        sarah.chen@email.com
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient mb-1">
                      98%
                    </div>
                    <div className="text-xs text-slate-500">Match Score</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-[1.02] transition-all border border-white/10 text-sm flex items-center justify-center gap-2">
                      <Icon icon="lucide:mail" width={14} />
                      Contact
                    </button>
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:bg-white/10 hover:border-white/20 transition-colors">
                      <Icon icon="lucide:star" width={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="glass-panel rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Icon
                    icon="lucide:user"
                    width={16}
                    className="text-indigo-400"
                  />
                </div>
                <h2 className="text-lg font-semibold text-white tracking-tight">
                  Summary
                </h2>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Passionate UX Designer with 7 years of experience creating
                user-centered digital experiences. Specialized in design
                systems, user research, and cross-functional collaboration.
                Proven track record of leading design initiatives that drive
                business growth and improve user satisfaction.
              </p>
              <p className="text-sm text-slate-400 mt-3 italic">
                Candidate has 6 years of experience in React.js.
              </p>
            </div>

            {/* Experience */}
            <div className="glass-panel rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Icon
                    icon="lucide:briefcase"
                    width={16}
                    className="text-indigo-400"
                  />
                </div>
                <h2 className="text-lg font-semibold text-white tracking-tight">
                  Experience
                </h2>
              </div>

              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="timeline-item">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-base font-semibold text-white">
                            {exp.title}
                          </h3>
                          <p className="text-sm text-indigo-400">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 mb-3">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-indigo-500/10 text-indigo-300 px-2 py-1 rounded border border-indigo-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="glass-panel rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Icon
                    icon="lucide:graduation-cap"
                    width={16}
                    className="text-indigo-400"
                  />
                </div>
                <h2 className="text-lg font-semibold text-white tracking-tight">
                  Education
                </h2>
              </div>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-indigo-400">{edu.school}</p>
                      </div>
                      <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="glass-panel rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Icon
                    icon="lucide:tag"
                    width={16}
                    className="text-indigo-400"
                  />
                </div>
                <h2 className="text-lg font-semibold text-white tracking-tight">
                  Skills
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="bg-white/5 border border-white/10 rounded-lg p-3 text-center"
                  >
                    <div className="text-sm font-medium text-white mb-1">
                      {skill.name}
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-500 h-full rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {skill.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Portfolio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Icon
                      icon="lucide:award"
                      width={16}
                      className="text-indigo-400"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-white tracking-tight">
                    Certifications
                  </h2>
                </div>

                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="bg-white/5 border border-white/10 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          icon="lucide:check-circle"
                          width={16}
                          className="text-emerald-400"
                        />
                        <div>
                          <div className="text-sm font-medium text-white">
                            {cert.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            Issued {cert.issued}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Icon
                      icon="lucide:link"
                      width={16}
                      className="text-indigo-400"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-white tracking-tight">
                    Portfolio
                  </h2>
                </div>

                <div className="space-y-3">
                  {portfolio.map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors block"
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          icon="lucide:external-link"
                          width={16}
                          className="text-indigo-400"
                        />
                        <div>
                          <div className="text-sm font-medium text-white">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {item.displayUrl}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Actions */}
            <div className="glass-panel rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white tracking-tight mb-4">
                Actions
              </h3>

              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-[1.02] transition-all border border-white/10">
                  <Icon icon="lucide:download" width={16} />
                  Download Resume
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:bg-white/10 hover:border-white/20 transition-colors">
                  <Icon icon="lucide:star" width={16} />
                  Add to Shortlist
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:bg-white/10 hover:border-white/20 transition-colors">
                  <Icon icon="lucide:mail" width={16} />
                  Send Message
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:bg-white/10 hover:border-white/20 transition-colors">
                  <Icon icon="lucide:calendar" width={16} />
                  Schedule Interview
                </button>
              </div>
            </div>

            {/* Notes & Tags */}
            <div className="glass-panel rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Icon
                    icon="lucide:sticky-note"
                    width={16}
                    className="text-indigo-400"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  Notes & Tags
                </h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <textarea
                    placeholder="Add private notes about this candidate..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-transparent border-none text-slate-300 placeholder-slate-500 focus:outline-none resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                      Save Note
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-400 mb-2">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-indigo-500/10 text-indigo-300 px-2 py-1 rounded border border-indigo-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                    <button
                      onClick={addTag}
                      className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded border border-slate-600 hover:border-slate-500"
                    >
                      + Add Tag
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Match Details */}
            <div className="glass-panel rounded-xl p-6 border border-indigo-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)] animate-pulse-slow">
                  <Icon
                    icon="lucide:sparkles"
                    width={16}
                    className="text-white"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  Match Analysis
                </h3>
              </div>

              <div className="space-y-4">
                <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-3">
                  <div className="text-sm text-indigo-100 mb-2">
                    Skills Match
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mb-1">
                    <div className="bg-indigo-500 h-full w-[95%] rounded-full"></div>
                  </div>
                  <div className="text-xs text-indigo-400">
                    9/10 required skills
                  </div>
                </div>

                <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3">
                  <div className="text-sm text-purple-100 mb-2">
                    Experience Match
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mb-1">
                    <div className="bg-purple-500 h-full w-[92%] rounded-full"></div>
                  </div>
                  <div className="text-xs text-purple-400">
                    7+ years experience
                  </div>
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                  <div className="text-sm text-emerald-100 mb-2">
                    Location Match
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mb-1">
                    <div className="bg-emerald-500 h-full w-[100%] rounded-full"></div>
                  </div>
                  <div className="text-xs text-emerald-400">
                    Perfect location match
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Illustration */}
            <div className="glass-panel rounded-xl p-6 text-center">
              <div className="mb-4">
                <svg
                  className="w-24 h-24 mx-auto opacity-80"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="35" r="12" fill="#6366f1" opacity="0.8" />
                  <path
                    d="M35 55 L50 40 L65 55"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                    fill="none"
                  />
                  <rect
                    x="30"
                    y="55"
                    width="40"
                    height="30"
                    rx="3"
                    fill="#334155"
                    stroke="#475569"
                    strokeWidth="1"
                  />
                  <circle cx="42" cy="65" r="2" fill="#10b981" />
                  <circle cx="50" cy="65" r="2" fill="#10b981" />
                  <circle cx="58" cy="65" r="2" fill="#10b981" />
                  <path
                    d="M45 75 Q50 80 55 75"
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle cx="75" cy="25" r="8" fill="#e2e8f0" opacity="0.3" />
                  <path
                    d="M70 25 L75 30 L80 25"
                    stroke="#6366f1"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <h4 className="text-sm font-medium text-white mb-2">
                Review Profile
              </h4>
              <p className="text-xs text-slate-400">
                Detailed candidate insights
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
