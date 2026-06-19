'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import Button from '@/components/ui/Button';

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
    <div className="bg-canvas text-ink min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Profile Header */}
            <div className="cf-card p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-sm bg-surface-dark border border-hairline overflow-hidden">
                    <img
                      src="https://ui-avatars.com/api/?name=Sarah+Chen&background=random&size=96"
                      alt="Sarah Chen"
                      className="w-full h-full object-cover grayscale opacity-90"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-canvas rounded-sm p-1">
                    <div className="w-4 h-4 bg-ink rounded-sm border border-canvas"></div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="type-display-md text-ink">
                      Sarah Chen
                    </h1>
                    <Icon
                      icon="lucide:badge-check"
                      width={20}
                      className="text-ink"
                    />
                  </div>
                  <p className="type-body-sm text-body mb-3">
                    Senior UX Designer • San Francisco, CA
                  </p>

                  <div className="flex items-center gap-6 type-mono-caption text-ink">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="lucide:briefcase"
                        width={16}
                        className="text-body"
                      />
                      <span>7 years experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="lucide:map-pin"
                        width={16}
                        className="text-body"
                      />
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="lucide:mail"
                        width={16}
                        className="text-body"
                      />
                      <span>
                        sarah.chen@email.com
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="text-center">
                    <div className="type-display-md text-ink mb-1">
                      98%
                    </div>
                    <div className="type-mono-caption text-body">Match Score</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="primary" className="flex items-center gap-2">
                      <Icon icon="lucide:mail" width={14} />
                      Contact
                    </Button>
                    <Button variant="outline">
                      <Icon icon="lucide:star" width={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="cf-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-sm bg-surface-dark border border-hairline flex items-center justify-center">
                  <Icon
                    icon="lucide:user"
                    width={16}
                    className="text-ink"
                  />
                </div>
                <h2 className="type-body-lg font-semibold text-ink">
                  Summary
                </h2>
              </div>
              <p className="type-body-sm text-ink leading-relaxed">
                Passionate UX Designer with 7 years of experience creating
                user-centered digital experiences. Specialized in design
                systems, user research, and cross-functional collaboration.
                Proven track record of leading design initiatives that drive
                business growth and improve user satisfaction.
              </p>
              <p className="type-mono-caption text-body mt-3 italic">
                Candidate has 6 years of experience in React.js.
              </p>
            </div>

            {/* Experience */}
            <div className="cf-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-sm bg-surface-dark border border-hairline flex items-center justify-center">
                  <Icon
                    icon="lucide:briefcase"
                    width={16}
                    className="text-ink"
                  />
                </div>
                <h2 className="type-body-lg font-semibold text-ink">
                  Experience
                </h2>
              </div>

              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="timeline-item">
                    <div className="bg-canvas border border-hairline rounded-sm p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="type-body-md font-semibold text-ink">
                            {exp.title}
                          </h3>
                          <p className="type-mono-caption text-body">
                            {exp.company}
                          </p>
                        </div>
                        <span className="type-mono-caption text-body bg-surface-dark px-2 py-1 rounded-sm border border-hairline">
                          {exp.period}
                        </span>
                      </div>
                      <p className="type-body-sm text-ink mb-3">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="type-mono-caption bg-surface-dark text-ink px-2 py-1 rounded-sm border border-hairline"
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
            <div className="cf-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-sm bg-surface-dark border border-hairline flex items-center justify-center">
                  <Icon
                    icon="lucide:graduation-cap"
                    width={16}
                    className="text-ink"
                  />
                </div>
                <h2 className="type-body-lg font-semibold text-ink">
                  Education
                </h2>
              </div>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-canvas border border-hairline rounded-sm p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="type-body-md font-semibold text-ink">
                          {edu.degree}
                        </h3>
                        <p className="type-mono-caption text-body">{edu.school}</p>
                      </div>
                      <span className="type-mono-caption text-body bg-surface-dark px-2 py-1 rounded-sm border border-hairline">
                        {edu.period}
                      </span>
                    </div>
                    <p className="type-body-sm text-ink">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="cf-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-sm bg-surface-dark border border-hairline flex items-center justify-center">
                  <Icon
                    icon="lucide:tag"
                    width={16}
                    className="text-ink"
                  />
                </div>
                <h2 className="type-body-lg font-semibold text-ink">
                  Skills
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="bg-canvas border border-hairline rounded-sm p-3 text-center"
                  >
                    <div className="type-body-sm font-semibold text-ink mb-1">
                      {skill.name}
                    </div>
                    <div className="w-full bg-surface-dark h-2 rounded-sm border border-hairline overflow-hidden">
                      <div
                        className="bg-ink h-full rounded-sm"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <div className="type-mono-caption text-body mt-1">
                      {skill.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Portfolio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="cf-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-sm bg-surface-dark border border-hairline flex items-center justify-center">
                    <Icon
                      icon="lucide:award"
                      width={16}
                      className="text-ink"
                    />
                  </div>
                  <h2 className="type-body-lg font-semibold text-ink">
                    Certifications
                  </h2>
                </div>

                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="bg-canvas border border-hairline rounded-sm p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          icon="lucide:check-circle"
                          width={16}
                          className="text-ink"
                        />
                        <div>
                          <div className="type-body-sm font-semibold text-ink">
                            {cert.name}
                          </div>
                          <div className="type-mono-caption text-body">
                            Issued {cert.issued}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cf-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-sm bg-surface-dark border border-hairline flex items-center justify-center">
                    <Icon
                      icon="lucide:link"
                      width={16}
                      className="text-ink"
                    />
                  </div>
                  <h2 className="type-body-lg font-semibold text-ink">
                    Portfolio
                  </h2>
                </div>

                <div className="space-y-3">
                  {portfolio.map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      className="bg-canvas border border-hairline rounded-sm p-3 hover:bg-surface-dark transition-colors block"
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          icon="lucide:external-link"
                          width={16}
                          className="text-body"
                        />
                        <div>
                          <div className="type-body-sm font-semibold text-ink">
                            {item.name}
                          </div>
                          <div className="type-mono-caption text-body">
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
            <div className="cf-card p-6">
              <h3 className="type-body-lg font-semibold text-ink mb-4">
                Actions
              </h3>

              <div className="space-y-3">
                <Button variant="primary" className="w-full flex items-center gap-3 justify-start">
                  <Icon icon="lucide:download" width={16} />
                  Download Resume
                </Button>

                <Button variant="outline" className="w-full flex items-center gap-3 justify-start">
                  <Icon icon="lucide:star" width={16} />
                  Add to Shortlist
                </Button>

                <Button variant="outline" className="w-full flex items-center gap-3 justify-start">
                  <Icon icon="lucide:mail" width={16} />
                  Send Message
                </Button>

                <Button variant="outline" className="w-full flex items-center gap-3 justify-start">
                  <Icon icon="lucide:calendar" width={16} />
                  Schedule Interview
                </Button>
              </div>
            </div>

            {/* Notes & Tags */}
            <div className="cf-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-sm bg-surface-dark border border-hairline flex items-center justify-center">
                  <Icon
                    icon="lucide:sticky-note"
                    width={16}
                    className="text-ink"
                  />
                </div>
                <h3 className="type-body-lg font-semibold text-ink">
                  Notes & Tags
                </h3>
              </div>

              <div className="space-y-4">
                <div className="bg-canvas border border-hairline rounded-sm p-3">
                  <textarea
                    placeholder="Add private notes about this candidate..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-transparent border-none text-ink type-body-sm placeholder:text-body focus:outline-none resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button className="type-mono-caption text-ink hover:underline">
                      Save Note
                    </button>
                  </div>
                </div>

                <div>
                  <div className="type-mono-caption text-body mb-2">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="type-mono-caption bg-surface-dark text-ink px-2 py-1 rounded-sm border border-hairline"
                      >
                        {tag}
                      </span>
                    ))}
                    <button
                      onClick={addTag}
                      className="type-mono-caption text-body hover:text-ink transition-colors px-2 py-1 rounded-sm border border-hairline hover:bg-surface-dark"
                    >
                      + Add Tag
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Match Details */}
            <div className="cf-card p-6 border-ink">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-sm bg-ink flex items-center justify-center border border-hairline">
                  <Icon
                    icon="lucide:sparkles"
                    width={16}
                    className="text-canvas"
                  />
                </div>
                <h3 className="type-body-lg font-semibold text-ink">
                  Match Analysis
                </h3>
              </div>

              <div className="space-y-4">
                <div className="bg-canvas border border-hairline rounded-sm p-3">
                  <div className="type-body-sm text-ink mb-2">
                    Skills Match
                  </div>
                  <div className="w-full bg-surface-dark h-2 rounded-sm border border-hairline overflow-hidden mb-1">
                    <div className="bg-ink h-full w-[95%] rounded-sm"></div>
                  </div>
                  <div className="type-mono-caption text-body">
                    9/10 required skills
                  </div>
                </div>

                <div className="bg-canvas border border-hairline rounded-sm p-3">
                  <div className="type-body-sm text-ink mb-2">
                    Experience Match
                  </div>
                  <div className="w-full bg-surface-dark h-2 rounded-sm border border-hairline overflow-hidden mb-1">
                    <div className="bg-ink h-full w-[92%] rounded-sm"></div>
                  </div>
                  <div className="type-mono-caption text-body">
                    7+ years experience
                  </div>
                </div>

                <div className="bg-canvas border border-hairline rounded-sm p-3">
                  <div className="type-body-sm text-ink mb-2">
                    Location Match
                  </div>
                  <div className="w-full bg-surface-dark h-2 rounded-sm border border-hairline overflow-hidden mb-1">
                    <div className="bg-ink h-full w-[100%] rounded-sm"></div>
                  </div>
                  <div className="type-mono-caption text-body">
                    Perfect location match
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
