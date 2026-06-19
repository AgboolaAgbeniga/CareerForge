'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Bell,
  Pencil,
  Briefcase,
  Plus,
  GraduationCap,
  Award,
  User,
  Tag,
  Link2,
  Dribbble,
  Github,
  ExternalLink,
  FileText,
  Download,
  Save,
  MapPin,
  Mail,
  Link,
  ShieldCheck,
  Lightbulb,
  TrendingUp,
  Wand2,
  ChevronRight,
  ArrowRight,
  Loader2,
  Trash2,
} from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/queries/useAuth';
import { useMyResumes, useUpdateProfile } from '@/hooks/queries/useProfile';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';

function FullProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOnboarding = searchParams.get('onboarding') === 'true';

  const [isLoading, setIsLoading] = useState(true);

  const [profileData, setProfileData] = useState<any>({
    name: '',
    title: '',
    location: '',
    email: '',
    website: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    bio: '',
    profileStrength: 0,
    experience: [],
    education: [],
    certifications: [],
    skills: [],
    portfolioLinks: [],
  });

  const [editingSection, setEditingSection] = useState<string | null>(null);

  const { data: profileRes, isLoading: isUserLoading } = useUser();
  const { data: resumesArr, isLoading: isResumesLoading } = useMyResumes();

  React.useEffect(() => {
    if (isUserLoading || isResumesLoading) return;

    try {
      let newProfileData = { ...profileData };
      
      // Primary source: the profile API 
      if (profileRes) {
        const userObj = profileRes;
        const jsProfile = profileRes.profile;

        if (userObj) {
          if (userObj.firstName || userObj.lastName) {
            newProfileData.name = `${userObj.firstName || ''} ${userObj.lastName || ''}`.trim();
          }
          if (userObj.email) newProfileData.email = userObj.email;
          if (userObj.phone) newProfileData.phone = userObj.phone;
          if (userObj.location) newProfileData.location = userObj.location;
        }

        if (jsProfile) {
          if (jsProfile.title) newProfileData.title = jsProfile.title;
          if (jsProfile.bio) newProfileData.bio = jsProfile.bio;
          if (jsProfile.portfolioUrl) { newProfileData.website = jsProfile.portfolioUrl; newProfileData.portfolio = jsProfile.portfolioUrl; }
          if (jsProfile.linkedinUrl) newProfileData.linkedin = jsProfile.linkedinUrl;
          if (jsProfile.skills && jsProfile.skills.length > 0) newProfileData.skills = jsProfile.skills;
          if (jsProfile.experience && jsProfile.experience.length > 0) newProfileData.experience = jsProfile.experience;
          if (jsProfile.educationHistory && jsProfile.educationHistory.length > 0) newProfileData.education = jsProfile.educationHistory;
          if (jsProfile.certifications && jsProfile.certifications.length > 0) newProfileData.certifications = jsProfile.certifications;
        }
      }

      // Fallback: if profile columns are empty, try the raw parsedData from the resumes table
      if (resumesArr && resumesArr.length > 0) {
        const activeResume = resumesArr[0];
        if (activeResume?.parsedData) {
          const parsed = activeResume.parsedData;
          if (!newProfileData.name && parsed.personal_info?.name) newProfileData.name = parsed.personal_info.name;
          if (!newProfileData.email && parsed.contact?.email) newProfileData.email = parsed.contact.email;
          if (!newProfileData.phone && parsed.contact?.phone) newProfileData.phone = parsed.contact.phone;

          if (!newProfileData.skills.length && parsed.skills?.length) {
            newProfileData.skills = parsed.skills.map((s: any) => typeof s === 'string' ? s : s.skill).filter(Boolean);
          }
          if (!newProfileData.experience.length && parsed.experience?.length) {
            newProfileData.experience = parsed.experience.map((exp: any) => ({
              title: exp.role || exp.title || exp.job_title || 'Role',
              company: exp.company || 'Company',
              location: exp.location || 'Remote',
              period: [exp.start_date, exp.end_date].filter(Boolean).join(' — ') || 'Present',
              description: exp.description || exp.responsibilities?.join('\n') || ''
            }));
          }
          if (!newProfileData.education.length && parsed.education?.length) {
            newProfileData.education = parsed.education.map((ed: any) => ({
              institution: ed.institution || ed.school || 'University',
              degree: ed.degree || 'Degree',
              period: ed.year || ed.end_date || ed.graduation_year || ''
            }));
          }
        }
      }
      
      setProfileData(newProfileData);
    } catch (err) {
      console.error('Failed to fetch profile data', err);
    } finally {
      setIsLoading(false);
    }
  }, [isUserLoading, isResumesLoading, profileRes, resumesArr]);

  const calculateStrength = (data: any) => {
    let strength = 0;
    if (data.name) strength += 10;
    if (data.title) strength += 10;
    if (data.email) strength += 5;
    if (data.phone) strength += 5;
    if (data.location) strength += 5;
    if (data.experience && data.experience.length > 0) strength += 25;
    if (data.education && Object.keys(data.education).length > 0) strength += 20;
    if (data.skills && data.skills.length > 0) strength += 10;
    if (data.certifications && data.certifications.length > 0) strength += 10;
    return Math.min(100, strength);
  };

  React.useEffect(() => {
    setProfileData((prev: any) => ({ ...prev, profileStrength: calculateStrength(prev) }));
  }, [
    profileData.name, profileData.title, profileData.email, profileData.phone, profileData.location,
    profileData.experience, profileData.education, profileData.skills, profileData.certifications
  ]);

  const updateProfile = (field: string, value: any) => {
    setProfileData((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...profileData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    updateProfile('experience', newExperience);
  };

  const removeExperience = (index: number) => {
    const newExperience = profileData.experience.filter((_: any, i: number) => i !== index);
    updateProfile('experience', newExperience);
  };

  const addExperience = () => {
    const newExp = {
      title: 'New Position',
      company: 'Company Name',
      location: 'Location',
      period: 'Start — End',
      description: 'Describe your role and achievements...',
    };
    updateProfile('experience', [...profileData.experience, newExp]);
    setEditingSection(`experience-${profileData.experience.length}`);
  };

  const addCertification = () => {
    const newCert = {
      name: 'New Certification',
      issued: 'Date Issued',
    };
    updateProfile('certifications', [...profileData.certifications, newCert]);
  };

  const addSkill = (skill: string) => {
    if (skill && !profileData.skills.includes(skill)) {
      updateProfile('skills', [...profileData.skills, skill]);
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = profileData.skills.filter((_: any, i: number) => i !== index);
    updateProfile('skills', newSkills);
  };

  const addEducation = () => {
    const newEd = {
      institution: 'New Institution',
      degree: 'Degree / Program',
      period: 'Year',
    };
    // Ensure education is an array internally, though schema says string, we extended it
    const eduList = Array.isArray(profileData.education) ? profileData.education : [profileData.education].filter(Boolean);
    updateProfile('education', [...eduList, newEd]);
    setEditingSection(`education-${eduList.length}`);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const eduList = Array.isArray(profileData.education) ? [...profileData.education] : [{...profileData.education}];
    if(eduList[index]) eduList[index] = { ...eduList[index], [field]: value };
    updateProfile('education', eduList);
  };

  const removeEducation = (index: number) => {
    const eduList = Array.isArray(profileData.education) ? [...profileData.education] : [{...profileData.education}];
    const filtered = eduList.filter((_: any, i: number) => i !== index);
    updateProfile('education', filtered);
  };

  const [isSaving, setIsSaving] = useState(false);
  const updateProfileMutation = useUpdateProfile();

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      const payload = {
        firstName: profileData.name.split(' ')[0],
        lastName: profileData.name.split(' ').slice(1).join(' '),
        phone: profileData.phone,
        location: profileData.location,
        jobSeekerProfile: {
          title: profileData.title,
          experience: profileData.experience,
          educationHistory: profileData.education,
          skills: profileData.skills,
          certifications: profileData.certifications,
        }
      };

      await updateProfileMutation.mutateAsync(payload);
      
      toast.success('Profile saved successfully!');
      if (isOnboarding) {
        router.push('/job-seeker/onboarding-welcome?step=3');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-ink animate-spin mb-4" />
        <p className="type-mono-caption text-body">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-ink antialiased flex flex-col">

      {/* Main Content Wrapper */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 w-full">
        {/* Profile Overview */}
        <section className="cf-card p-6 mb-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 brand-gradient"></div>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-sm border border-hairline overflow-hidden relative bg-surface-dark">
                <img
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/0 hover:bg-ink/10 transition-colors flex items-center justify-center cursor-pointer group-avatar">
                  <span className="text-on-dark opacity-0 group-hover:group-avatar:opacity-100 transition-opacity">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <span className="absolute bottom-1 right-1 w-6 h-6 bg-canvas rounded-sm flex items-center justify-center border border-hairline cursor-pointer hover:text-ink text-body transition-colors">
                <Pencil className="w-3 h-3" />
              </span>
            </div>

            {/* Info */}
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h1 className="type-display-lg text-ink">
                    {profileData.name}
                  </h1>
                  <p className="type-body-md text-ink font-medium mt-1">
                    {profileData.title}
                  </p>
                </div>
                <Button variant="outline" className="!px-4 !py-2 !min-h-0 text-[12px] leading-[12px]">
                  <Pencil className="w-3.5 h-3.5 mr-2" />
                  Edit Public View
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 type-mono-caption text-body">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-body" />
                  {profileData.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-body" />
                  {profileData.email}
                </div>
                <div className="flex items-center gap-1.5 text-ink hover:underline cursor-pointer">
                  <Link className="w-4 h-4" />
                  {profileData.website}
                </div>
              </div>
            </div>

            {/* Completion Bar */}
            <div className="w-full md:w-64 bg-surface-dark rounded-sm p-4 border border-hairline">
              <div className="flex justify-between items-end mb-2">
                <span className="type-mono-caption text-body">
                  Profile Strength
                </span>
                <span className="type-mono-caption text-ink font-bold">
                  {profileData.profileStrength}%
                </span>
              </div>
              <div className="w-full bg-canvas rounded-full h-1.5 overflow-hidden border border-hairline">
                <div
                  className="bg-ink h-full rounded-full"
                  style={{ width: `${profileData.profileStrength}%` }}
                ></div>
              </div>
              <p className="type-mono-caption text-body mt-2">
                Add 1 more certification to reach 100%
              </p>
            </div>
          </div>
        </section>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN (Main Content) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* EXPERIENCE CARD */}
            <div className="cf-card overflow-hidden">
              <div className="px-6 py-4 border-b border-hairline flex justify-between items-center bg-surface-dark">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-canvas border border-hairline text-ink rounded-sm">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h2 className="type-body-md text-ink font-semibold">
                    Experience
                  </h2>
                </div>
                <button
                  onClick={addExperience}
                  className="text-body hover:text-ink transition-colors p-1.5 hover:bg-canvas rounded-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {profileData.experience.map((exp: any, index: number) => (
                  <div
                    key={index}
                    className="group relative pl-4 border-l-2 border-hairline hover:border-ink transition-colors duration-300"
                  >
                    <div className="absolute -right-2 top-0 opacity-65 hover:opacity-100 transition-opacity flex gap-2 bg-canvas p-1 rounded-sm border border-hairline shadow-sm">
                      <button
                        onClick={() => setEditingSection(`experience-${index}`)}
                        className="text-body hover:text-ink p-1"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeExperience(index)}
                        className="text-body hover:text-ink p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {editingSection === `experience-${index}` ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) =>
                            updateExperience(index, 'title', e.target.value)
                          }
                          className="w-full p-2 bg-surface-dark border border-hairline rounded-sm type-body-sm text-ink focus:border-ink focus:outline-none transition-colors"
                          placeholder="Job Title"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(index, 'company', e.target.value)
                            }
                            className="flex-1 p-2 bg-surface-dark border border-hairline rounded-sm type-body-sm text-ink focus:border-ink focus:outline-none transition-colors"
                            placeholder="Company"
                          />
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) =>
                              updateExperience(
                                index,
                                'location',
                                e.target.value
                              )
                            }
                            className="flex-1 p-2 bg-surface-dark border border-hairline rounded-sm type-body-sm text-ink focus:border-ink focus:outline-none transition-colors"
                            placeholder="Location"
                          />
                        </div>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) =>
                            updateExperience(index, 'period', e.target.value)
                          }
                          className="w-full p-2 bg-surface-dark border border-hairline rounded-sm type-body-sm text-ink focus:border-ink focus:outline-none transition-colors"
                          placeholder="Period"
                        />
                        <textarea
                          value={exp.description}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              'description',
                              e.target.value
                            )
                          }
                          className="w-full p-2 bg-surface-dark border border-hairline rounded-sm type-body-sm text-ink focus:border-ink focus:outline-none transition-colors"
                          rows={3}
                          placeholder="Description"
                        />
                        <Button
                          onClick={() => setEditingSection(null)}
                          variant="primary"
                          className="!px-4 !py-2 !min-h-0 text-[12px] leading-[12px]"
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h3 className="type-body-md text-ink font-medium">
                          {exp.title}
                        </h3>
                        <div className="type-mono-caption text-ink mt-1">
                          {exp.company}{' '}
                          <span className="mx-1 text-body">•</span>{' '}
                          {exp.location}
                        </div>
                        <div className="type-mono-caption text-body mt-1 mb-3">
                          {exp.period}
                        </div>
                        <p className="type-body-sm text-ink leading-relaxed">
                          {exp.description}
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* EDUCATION CARD */}
            <div className="cf-card overflow-hidden">
              <div className="px-6 py-4 border-b border-hairline flex justify-between items-center bg-surface-dark">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-canvas border border-hairline text-ink rounded-sm">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h2 className="type-body-md text-ink font-semibold">
                    Education
                  </h2>
                </div>
                <button 
                  onClick={addEducation}
                  className="text-body hover:text-ink transition-colors p-1.5 hover:bg-canvas rounded-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {(Array.isArray(profileData.education) ? profileData.education : [profileData.education]).filter(Boolean).map((edu: any, index: number) => (
                  <div key={index} className="group relative flex items-start gap-4">
                    <div className="h-10 w-10 rounded-sm bg-surface-dark border border-hairline flex items-center justify-center text-body flex-shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="flex-grow">
                      {editingSection === `education-${index}` ? (
                        <div className="space-y-3 pr-8">
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                            className="w-full p-2 bg-surface-dark border border-hairline rounded-sm type-body-sm text-ink focus:border-ink focus:outline-none transition-colors"
                            placeholder="Institution"
                          />
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            className="w-full p-2 bg-surface-dark border border-hairline rounded-sm type-body-sm text-ink focus:border-ink focus:outline-none transition-colors"
                            placeholder="Degree"
                          />
                          <input
                            type="text"
                            value={edu.period}
                            onChange={(e) => updateEducation(index, 'period', e.target.value)}
                            className="w-full p-2 bg-surface-dark border border-hairline rounded-sm type-body-sm text-ink focus:border-ink focus:outline-none transition-colors"
                            placeholder="Period"
                          />
                          <Button
                            onClick={() => setEditingSection(null)}
                            variant="primary"
                            className="!px-4 !py-2 !min-h-0 text-[12px] leading-[12px]"
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="type-body-md text-ink font-medium">
                              {edu.institution}
                            </h3>
                            <div className="type-body-sm text-ink mt-1">
                              {edu.degree}
                            </div>
                            <div className="type-mono-caption text-body mt-2">
                              {edu.period}
                            </div>
                          </div>
                          <div className="opacity-65 hover:opacity-100 transition-opacity flex gap-2 bg-canvas p-1 rounded-sm border border-hairline shadow-sm">
                            <button 
                              onClick={() => setEditingSection(`education-${index}`)}
                              className="text-body hover:text-ink p-1"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => removeEducation(index)}
                              className="text-body hover:text-ink p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CERTIFICATIONS CARD */}
            <div className="cf-card overflow-hidden">
              <div className="px-6 py-4 border-b border-hairline flex justify-between items-center bg-surface-dark">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-canvas border border-hairline text-ink rounded-sm">
                    <Award className="w-4 h-4" />
                  </div>
                  <h2 className="type-body-md text-ink font-semibold">
                    Certifications
                  </h2>
                </div>
                <button
                  onClick={addCertification}
                  className="text-body hover:text-ink transition-colors p-1.5 hover:bg-canvas rounded-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {profileData.certifications.map((cert: any, index: number) => (
                  <div
                    key={index}
                    className="group flex justify-between items-center p-3 rounded-sm border border-hairline hover:border-ink hover:bg-surface-dark transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-ink">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="type-body-sm text-ink font-medium">
                          {cert.name}
                        </div>
                        <div className="type-mono-caption text-body mt-1">
                          Issued {cert.issued}
                        </div>
                      </div>
                    </div>
                    <button className="opacity-65 hover:opacity-100 text-body hover:text-ink p-1 bg-canvas border border-hairline rounded-sm shadow-sm">
                      <Pencil className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Sidebar) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* AI INSIGHTS PANEL */}
            <aside className="cf-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-sm bg-ink flex items-center justify-center text-on-dark text-[10px]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h2 className="type-mono-button text-ink">
                  AI Assistant
                </h2>
              </div>

              <div className="space-y-3">
                <div className="bg-surface-dark p-3 rounded-sm border border-hairline text-sm">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-ink mt-0.5 min-w-[16px]" />
                    <p className="type-body-sm text-ink leading-snug">
                      Your "Stripe" description lacks metrics. Try: "Reduced
                      checkout churn by{' '}
                      <span className="font-medium">12%</span>
                      ..."
                    </p>
                  </div>
                </div>
                <div className="bg-surface-dark p-3 rounded-sm border border-hairline text-sm">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-ink mt-0.5 min-w-[16px]" />
                    <p className="type-body-sm text-ink leading-snug">
                      Adding a case study link to your education could boost
                      visibility by 20%.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="mt-4 w-full text-[12px] leading-[12px] !py-2" variant="primary">
                <Wand2 className="w-3.5 h-3.5 mr-2" />
                Apply AI Fixes
              </Button>
            </aside>

            {/* ACTIONS PANEL */}
            <div className="cf-card p-5">
              <h3 className="type-mono-eyebrow text-body mb-4">
                Profile Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full group flex items-center justify-between p-3 rounded-sm border border-hairline hover:border-ink hover:bg-surface-dark transition-all type-body-sm text-ink font-medium">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-body group-hover:text-ink" />
                    Generate Resume
                  </span>
                  <ChevronRight className="w-4 h-4 text-body group-hover:text-ink" />
                </button>

                <button className="w-full group flex items-center justify-between p-3 rounded-sm border border-hairline hover:border-ink hover:bg-surface-dark transition-all type-body-sm text-ink font-medium">
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-body group-hover:text-ink" />
                    Export as PDF
                  </span>
                  <ChevronRight className="w-4 h-4 text-body group-hover:text-ink" />
                </button>

                <Button 
                  onClick={handleSave}
                  variant="primary"
                  className={`w-full text-[12px] leading-[12px] !py-2.5 ${isOnboarding ? 'animate-pulse' : ''}`}
                >
                  {isOnboarding ? (
                    <>
                      Confirm & Continue Setup <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5 mr-2" /> Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* PERSONAL INFO CARD */}
            <div className="cf-card p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-body" />
                  <h3 className="type-body-md text-ink font-semibold">
                    Personal Details
                  </h3>
                </div>
                <button className="text-body hover:text-ink p-1">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="block type-mono-eyebrow text-body mb-1">Phone</span>
                  <span className="type-body-sm text-ink font-medium">{profileData.phone}</span>
                </div>
                <div>
                  <span className="block type-mono-eyebrow text-body mb-1">
                    Portfolio
                  </span>
                  <a href="#" className="type-body-sm text-ink hover:underline font-medium">
                    {profileData.portfolio}
                  </a>
                </div>
                <div>
                  <span className="block type-mono-eyebrow text-body mb-1">LinkedIn</span>
                  <a href="#" className="type-body-sm text-ink hover:underline font-medium">
                    {profileData.linkedin}
                  </a>
                </div>
              </div>
            </div>

            {/* SKILLS CARD */}
            <div className="cf-card p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-body" />
                  <h3 className="type-body-md text-ink font-semibold">
                    Skills
                  </h3>
                </div>
                <button className="text-body hover:text-ink p-1">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill: any, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-sm type-mono-caption text-ink border border-hairline bg-surface-dark hover:bg-canvas cursor-pointer transition-colors"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(index)}
                      className="ml-1.5 text-body hover:text-ink"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <span
                  onClick={() => addSkill('New Skill')}
                  className="inline-flex items-center px-2 py-1 rounded-sm type-mono-caption text-body border border-dashed border-hairline hover:border-ink hover:text-ink cursor-pointer transition-colors"
                >
                  + Add
                </span>
              </div>
            </div>

            {/* PORTFOLIO LINKS */}
            <div className="cf-card p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-body" />
                  <h3 className="type-body-md text-ink font-semibold">
                    Portfolio
                  </h3>
                </div>
                <button className="text-body hover:text-ink p-1">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <ul className="space-y-2">
                {profileData.portfolioLinks.map((link: any, index: number) => (
                  <li
                    key={index}
                    className="flex items-center justify-between group p-2 hover:bg-surface-dark rounded-sm -mx-2 transition-colors border border-transparent hover:border-hairline"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-canvas p-1.5 rounded-sm border border-hairline text-ink">
                        <link.icon className="w-4 h-4" />
                      </div>
                      <div className="type-body-sm text-ink font-medium">
                        {link.name}
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 text-body hover:text-ink p-1">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function FullProfile() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-ink animate-spin mb-4" />
        <p className="type-mono-caption text-body">Loading your profile...</p>
      </div>
    }>
      <FullProfileContent />
    </React.Suspense>
  );
}
