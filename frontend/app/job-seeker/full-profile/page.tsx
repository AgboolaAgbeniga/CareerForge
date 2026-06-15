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
} from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import { toast } from 'sonner';

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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, resumesRes] = await Promise.all([
          apiClient.get('/api/auth/profile').catch(() => null),
          apiClient.get('/api/resume/my').catch(() => [])
        ]);
        
        let newProfileData = { ...profileData };
        
        if (profileRes) {
           newProfileData.name = `${profileRes.firstName || ''} ${profileRes.lastName || ''}`.trim() || newProfileData.name;
           newProfileData.email = profileRes.email || newProfileData.email;
        }
        
        const resumes = Array.isArray(resumesRes) ? resumesRes : (resumesRes as any)?.data || [];
        const activeResume = resumes[0]; // Assuming ordered by most recent or active

        if (activeResume && activeResume.parsedData) {
           const parsed = activeResume.parsedData;
           if (parsed.personal_info?.name) newProfileData.name = parsed.personal_info.name;
           if (parsed.contact?.email) newProfileData.email = parsed.contact.email;
           if (parsed.contact?.phone) newProfileData.phone = parsed.contact.phone;
           
           if (parsed.skills && Array.isArray(parsed.skills)) {
             newProfileData.skills = parsed.skills.map((s: any) => typeof s === 'string' ? s : s.skill).filter(Boolean);
           }
           
           if (parsed.experience && Array.isArray(parsed.experience) && parsed.experience.length > 0) {
             newProfileData.experience = parsed.experience.map((exp: any) => ({
                title: exp.role || exp.title || exp.job_title || 'Role',
                company: exp.company || 'Company',
                location: exp.location || 'Remote',
                period: [exp.start_date, exp.end_date].filter(Boolean).join(' — ') || 'Present',
                description: exp.description || exp.responsibilities?.join('\n') || ''
             }));
           }
           
           if (parsed.education && Array.isArray(parsed.education) && parsed.education.length > 0) {
             newProfileData.education = parsed.education.map((ed: any) => ({
                 institution: ed.institution || ed.school || 'University',
                 degree: ed.degree || 'Degree',
                 period: ed.year || ed.end_date || ed.graduation_year || ''
             }));
           }
        }
        
        setProfileData(newProfileData);
      } catch (err) {
        console.error('Failed to fetch profile data', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setProfileData(prev => ({ ...prev, profileStrength: calculateStrength(prev) }));
  }, [
    profileData.name, profileData.title, profileData.email, profileData.phone, profileData.location,
    profileData.experience, profileData.education, profileData.skills, profileData.certifications
  ]);

  const updateProfile = (field: string, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...profileData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    updateProfile('experience', newExperience);
  };

  const removeExperience = (index: number) => {
    const newExperience = profileData.experience.filter((_, i) => i !== index);
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
    const newSkills = profileData.skills.filter((_, i) => i !== index);
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
    const filtered = eduList.filter((_, i) => i !== index);
    updateProfile('education', filtered);
  };

  const [isSaving, setIsSaving] = useState(false);

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

      await apiClient.put('/api/auth/profile', payload);
      
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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-['Rethink_Sans']">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900 flex flex-col font-['Rethink_Sans']">

      {/* Main Content Wrapper */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 w-full">
        {/* Profile Overview */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden relative bg-slate-100">
                <img
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center cursor-pointer group-avatar">
                  <span className="text-white opacity-0 group-hover:group-avatar:opacity-100 transition-opacity drop-shadow-md">
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
              <span className="absolute bottom-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 cursor-pointer hover:text-blue-600 text-slate-400 transition-colors">
                <Pencil className="w-3 h-3" />
              </span>
            </div>

            {/* Info */}
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {profileData.name}
                  </h1>
                  <p className="text-lg text-slate-600 font-medium">
                    {profileData.title}
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                  <Pencil className="w-3.5 h-3.5" />
                  Edit Public View
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {profileData.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-slate-400" />
                  {profileData.email}
                </div>
                <div className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 cursor-pointer">
                  <Link className="w-4 h-4" />
                  {profileData.website}
                </div>
              </div>
            </div>

            {/* Completion Bar */}
            <div className="w-full md:w-64 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Profile Strength
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {profileData.profileStrength}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  style={{ width: `${profileData.profileStrength}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-400 mt-2">
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
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Experience
                  </h2>
                </div>
                <button
                  onClick={addExperience}
                  className="text-slate-400 hover:text-blue-600 transition-colors p-1.5 hover:bg-blue-50 rounded-md"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {profileData.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="group relative pl-4 border-l-2 border-slate-100 hover:border-blue-500 transition-colors duration-300"
                  >
                    <div className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button
                        onClick={() => setEditingSection(`experience-${index}`)}
                        className="text-slate-400 hover:text-blue-600 p-1"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeExperience(index)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
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
                          className="w-full p-2 border border-slate-200 rounded text-sm font-bold"
                          placeholder="Job Title"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(index, 'company', e.target.value)
                            }
                            className="flex-1 p-2 border border-slate-200 rounded text-sm"
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
                            className="flex-1 p-2 border border-slate-200 rounded text-sm"
                            placeholder="Location"
                          />
                        </div>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) =>
                            updateExperience(index, 'period', e.target.value)
                          }
                          className="w-full p-2 border border-slate-200 rounded text-sm"
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
                          className="w-full p-2 border border-slate-200 rounded text-sm"
                          rows={3}
                          placeholder="Description"
                        />
                        <button
                          onClick={() => setEditingSection(null)}
                          className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-sm font-bold text-slate-900">
                          {exp.title}
                        </h3>
                        <div className="text-sm text-slate-600 font-medium">
                          {exp.company}{' '}
                          <span className="mx-1 text-slate-300">•</span>{' '}
                          {exp.location}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 mb-2">
                          {exp.period}
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {exp.description}
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* EDUCATION CARD */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Education
                  </h2>
                </div>
                <button 
                  onClick={addEducation}
                  className="text-slate-400 hover:text-purple-600 transition-colors p-1.5 hover:bg-purple-50 rounded-md"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {(Array.isArray(profileData.education) ? profileData.education : [profileData.education]).filter(Boolean).map((edu, index) => (
                  <div key={index} className="group relative flex items-start gap-4">
                    <div className="h-10 w-10 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      {editingSection === `education-${index}` ? (
                        <div className="space-y-3 pr-8">
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                            className="w-full p-2 border border-slate-200 rounded text-sm font-bold"
                            placeholder="Institution"
                          />
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            className="w-full p-2 border border-slate-200 rounded text-sm"
                            placeholder="Degree"
                          />
                          <input
                            type="text"
                            value={edu.period}
                            onChange={(e) => updateEducation(index, 'period', e.target.value)}
                            className="w-full p-2 border border-slate-200 rounded text-sm"
                            placeholder="Period"
                          />
                          <button
                            onClick={() => setEditingSection(null)}
                            className="px-4 py-2 bg-purple-600 text-white rounded text-sm"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">
                              {edu.institution}
                            </h3>
                            <div className="text-sm text-slate-600">
                              {edu.degree}
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                              {edu.period}
                            </div>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button 
                              onClick={() => setEditingSection(`education-${index}`)}
                              className="text-slate-400 hover:text-purple-600 p-1"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeEducation(index)}
                              className="text-slate-400 hover:text-red-500 p-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
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
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                    <Award className="w-5 h-5" />
                  </div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Certifications
                  </h2>
                </div>
                <button
                  onClick={addCertification}
                  className="text-slate-400 hover:text-teal-600 transition-colors p-1.5 hover:bg-teal-50 rounded-md"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {profileData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="group flex justify-between items-center p-3 rounded-lg border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-teal-600">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {cert.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          Issued {cert.issued}
                        </div>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-teal-600">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Sidebar) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* AI INSIGHTS PANEL */}
            <aside className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-[10px]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide uppercase">
                  AI Assistant
                </h2>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 min-w-[16px]" />
                    <p className="text-slate-600 leading-snug">
                      Your "Stripe" description lacks metrics. Try: "Reduced
                      checkout churn by{' '}
                      <span className="font-semibold text-slate-800">12%</span>
                      ..."
                    </p>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5 min-w-[16px]" />
                    <p className="text-slate-600 leading-snug">
                      Adding a case study link to your education could boost
                      visibility by 20%.
                    </p>
                  </div>
                </div>
              </div>

              <button className="mt-4 w-full py-2 px-4 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                <Wand2 className="w-3.5 h-3.5" />
                Apply AI Fixes
              </button>
            </aside>

            {/* ACTIONS PANEL */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Profile Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full group flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-sm font-medium text-slate-700">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4.5 h-4.5 text-slate-400 group-hover:text-blue-500" />
                    Generate Resume
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                </button>

                <button className="w-full group flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 transition-all text-sm font-medium text-slate-700">
                  <span className="flex items-center gap-2">
                    <Download className="w-4.5 h-4.5 text-slate-400 group-hover:text-purple-500" />
                    Export as PDF
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-500" />
                </button>

                <button 
                  onClick={handleSave}
                  className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg font-medium text-sm shadow-md hover:shadow-lg hover:opacity-95 transition-all ${
                    isOnboarding 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white animate-pulse-slow' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  }`}
                >
                  {isOnboarding ? (
                    <>
                      Confirm & Continue Setup <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* PERSONAL INFO CARD */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4.5 h-4.5 text-slate-400" />
                  <h3 className="text-sm font-semibold text-slate-900">
                    Personal Details
                  </h3>
                </div>
                <button className="text-slate-400 hover:text-blue-600">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="block text-xs text-slate-400">Phone</span>
                  <span className="text-slate-700">{profileData.phone}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400">
                    Portfolio
                  </span>
                  <a href="#" className="text-blue-600 hover:underline">
                    {profileData.portfolio}
                  </a>
                </div>
                <div>
                  <span className="block text-xs text-slate-400">LinkedIn</span>
                  <a href="#" className="text-blue-600 hover:underline">
                    {profileData.linkedin}
                  </a>
                </div>
              </div>
            </div>

            {/* SKILLS CARD */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-4.5 h-4.5 text-slate-400" />
                  <h3 className="text-sm font-semibold text-slate-900">
                    Skills
                  </h3>
                </div>
                <button className="text-slate-400 hover:text-blue-600">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 cursor-pointer transition-colors"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(index)}
                      className="ml-1.5 text-slate-400 hover:text-slate-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <span
                  onClick={() => addSkill('New Skill')}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white text-slate-400 border border-dashed border-slate-300 hover:border-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                >
                  + Add
                </span>
              </div>
            </div>

            {/* PORTFOLIO LINKS */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Link2 className="w-4.5 h-4.5 text-slate-400" />
                  <h3 className="text-sm font-semibold text-slate-900">
                    Portfolio
                  </h3>
                </div>
                <button className="text-slate-400 hover:text-blue-600">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <ul className="space-y-3">
                {profileData.portfolioLinks.map((link, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between group p-2 hover:bg-slate-50 rounded-lg -mx-2 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-1.5 rounded text-slate-600">
                        <link.icon className="w-4 h-4" />
                      </div>
                      <div className="text-sm font-medium text-slate-700">
                        {link.name}
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-600">
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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-['Rethink_Sans']">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Loading your profile...</p>
      </div>
    }>
      <FullProfileContent />
    </React.Suspense>
  );
}
