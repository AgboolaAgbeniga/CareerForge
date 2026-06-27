'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Rocket,
  Import,
  UserCircle,
  FileText,
  Sliders,
  Bot,
  MessageCircle,
  CheckCircle2,
  Circle,
  ArrowRight,
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Save,
  MapPin,
  Mail,
  User,
  Tag,
  Award,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import AIInsightPanel from '@/components/shared/AIInsightPanel';
import UploadResumeModal from '@/components/shared/UploadResumeModal';
import { toast } from 'sonner';
import { useUser } from '@/hooks/queries/useAuth';
import { useUpdateProfile } from '@/hooks/queries/useProfile';
import OnboardingHeader from '@/components/layout/OnboardingHeader';
import OnboardingFooter from '@/components/layout/OnboardingFooter';
import Button from '@/components/ui/Button';

export default function OnboardingWelcomePage() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(parseInt(searchParams.get('step') || '1'));

  const [profileData, setProfileData] = useState<any>({
    name: '',
    title: '',
    location: '',
    email: '',
    phone: '',
    website: '',
    linkedin: '',
    bio: '',
    experience: [],
    education: [],
    certifications: [],
    skills: [],
    portfolio: '',
    profileCompletionPercentage: 0,
    resumeFileUrl: '',
  });
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [salaryMin, setSalaryMin] = useState(80);
  const [salaryMax, setSalaryMax] = useState(150);
  const [aiCoachEnabled, setAiCoachEnabled] = useState(false);
  const [desiredRole, setDesiredRole] = useState('');
  const [workArrangement, setWorkArrangement] = useState('Remote');
  const [preferredLocation, setPreferredLocation] = useState('');
  const router = useRouter();
  const { data: userProfileData, refetch: refetchProfile, isLoading: isUserLoading } = useUser();
  const updateProfileMutation = useUpdateProfile();

  const [isImporting, setIsImporting] = useState(false);
  const [isSavingPref, setIsSavingPref] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [newSkillText, setNewSkillText] = useState('');

  useEffect(() => {
    if (!userProfileData) return;
    
    const userObj = userProfileData;
    const jsProfile = userProfileData.profile;
    
    if (jsProfile) {
      setProfileData({
        name: `${userObj.firstName || ''} ${userObj.lastName || ''}`.trim(),
        title: jsProfile.title || '',
        location: userObj.location || '',
        email: userObj.email || '',
        phone: userObj.phone || '',
        website: jsProfile.portfolioUrl || '',
        linkedin: jsProfile.linkedinUrl || '',
        bio: jsProfile.bio || '',
        experience: jsProfile.experience || [],
        education: jsProfile.educationHistory || [],
        certifications: jsProfile.certifications || [],
        skills: jsProfile.skills || [],
        portfolio: jsProfile.portfolioUrl || '',
        profileCompletionPercentage: jsProfile.profileCompletionPercentage || 0,
        resumeFileUrl: jsProfile.resumeFileUrl || '',
      });
      if (jsProfile.preferences?.salaryMin) setSalaryMin(jsProfile.preferences.salaryMin);
      if (jsProfile.preferences?.salaryMax) setSalaryMax(jsProfile.preferences.salaryMax);
      if (jsProfile.title) setDesiredRole(jsProfile.title);
      if (jsProfile.preferences?.workArrangement) setWorkArrangement(jsProfile.preferences.workArrangement);
      if (jsProfile.preferences?.preferredLocation) setPreferredLocation(jsProfile.preferences.preferredLocation);
    } else if (userObj) {
      setProfileData((prev: any) => ({
        ...prev,
        name: `${userObj.firstName || ''} ${userObj.lastName || ''}`.trim(),
        email: userObj.email || '',
        phone: userObj.phone || '',
        location: userObj.location || '',
      }));
    }
    
    setIsLoadingProfile(false);
  }, [userProfileData]);

  const fetchProfileAfterUpload = async () => {
    await refetchProfile();
  };

  const handleUploadResume = () => {
    setIsUploadModalOpen(true);
  };
  
  const handleUploadSuccess = async (parsedData: any, fileUrl?: string) => {
    setIsUploadModalOpen(false);
    toast.success('Resume uploaded and parsed successfully!');
    
    if (parsedData) {
      setProfileData((prev: any) => {
        const newProfile = { ...prev };
        
        if (parsedData.personal_info?.name) newProfile.name = parsedData.personal_info.name;
        if (parsedData.personal_info?.title) newProfile.title = parsedData.personal_info.title;
        if (parsedData.contact?.email) newProfile.email = parsedData.contact.email;
        if (parsedData.contact?.phone) newProfile.phone = parsedData.contact.phone;
        if (parsedData.contact?.location) newProfile.location = parsedData.contact.location;
        if (parsedData.summary) newProfile.bio = parsedData.summary;
        
        if (parsedData.skills && Array.isArray(parsedData.skills)) {
          newProfile.skills = parsedData.skills.map((s: any) => typeof s === 'string' ? s : s.skill).filter(Boolean);
        }
        
        if (parsedData.experience && Array.isArray(parsedData.experience) && parsedData.experience.length > 0) {
          newProfile.experience = parsedData.experience.map((exp: any) => ({
             title: exp.role || exp.title || exp.job_title || 'Role',
             company: exp.company || 'Company',
             location: exp.location || 'Remote',
             period: [exp.start_date, exp.end_date].filter(Boolean).join(' — ') || 'Present',
             description: exp.description || exp.responsibilities?.join('\n') || ''
          }));
        }
        
        if (parsedData.education && Array.isArray(parsedData.education) && parsedData.education.length > 0) {
          newProfile.education = parsedData.education.map((ed: any) => ({
              institution: ed.institution || ed.school || 'University',
              degree: ed.degree || 'Degree',
              period: ed.year || ed.end_date || ed.graduation_year || ''
          }));
        }

        if (parsedData.certifications && Array.isArray(parsedData.certifications) && parsedData.certifications.length > 0) {
          newProfile.certifications = parsedData.certifications.map((cert: any) => ({
             name: typeof cert === 'string' ? cert : cert.name || 'Certification',
             issued: typeof cert === 'string' ? '' : cert.issued || cert.date || ''
          }));
        }

        if (fileUrl) {
          newProfile.resumeFileUrl = fileUrl;
        }

        return newProfile;
      });
      
      if (parsedData.personal_info?.title) {
        setDesiredRole(parsedData.personal_info.title);
      }
      if (parsedData.contact?.location) {
        setPreferredLocation(parsedData.contact.location);
      }
    } else {
      await fetchProfileAfterUpload();
    }
    
    setCurrentStep(2);
  };

  const updateProfile = (field: string, value: any) => {
    setProfileData((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...(profileData.experience || [])];
    newExperience[index] = { ...newExperience[index], [field]: value };
    updateProfile('experience', newExperience);
  };

  const removeExperience = (index: number) => {
    const newExperience = (profileData.experience || []).filter((_: any, i: number) => i !== index);
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
    updateProfile('experience', [...(profileData.experience || []), newExp]);
    setEditingSection(`experience-${(profileData.experience || []).length}`);
  };

  const addCertification = () => {
    const newCert = {
      name: 'New Certification',
      issued: 'Date Issued',
    };
    updateProfile('certifications', [...(profileData.certifications || []), newCert]);
    setEditingSection(`certification-${(profileData.certifications || []).length}`);
  };

  const updateCertification = (index: number, field: string, value: string) => {
    const newCerts = [...(profileData.certifications || [])];
    newCerts[index] = { ...newCerts[index], [field]: value };
    updateProfile('certifications', newCerts);
  };

  const removeCertification = (index: number) => {
    const newCerts = (profileData.certifications || []).filter((_: any, i: number) => i !== index);
    updateProfile('certifications', newCerts);
  };

  const addSkill = (skill: string) => {
    if (skill && !(profileData.skills || []).includes(skill)) {
      updateProfile('skills', [...(profileData.skills || []), skill]);
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = (profileData.skills || []).filter((_: any, i: number) => i !== index);
    updateProfile('skills', newSkills);
  };

  const addEducation = () => {
    const newEd = {
      institution: 'New Institution',
      degree: 'Degree / Program',
      period: 'Year',
    };
    updateProfile('education', [...(profileData.education || []), newEd]);
    setEditingSection(`education-${(profileData.education || []).length}`);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const eduList = [...(profileData.education || [])];
    if (eduList[index]) eduList[index] = { ...eduList[index], [field]: value };
    updateProfile('education', eduList);
  };

  const removeEducation = (index: number) => {
    const eduList = (profileData.education || []).filter((_: any, i: number) => i !== index);
    updateProfile('education', eduList);
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      // Compute total years of experience from experience entries
      const computedYears = (profileData.experience || []).reduce((sum: number, exp: any) => {
        const parts = (exp.period || '').split(/—|-/);
        const startRaw = parts[0]?.trim() ?? '';
        const endRaw = parts[1]?.trim() ?? '';
        const start = parseInt(startRaw);
        const end = endRaw.toLowerCase() === 'present'
          ? new Date().getFullYear()
          : parseInt(endRaw);
        if (!isNaN(start) && !isNaN(end) && end >= start) {
          return sum + (end - start);
        }
        return sum + 1; // fallback: count 1 year per entry when dates aren't parseable
      }, 0);
      const experienceYears = Math.max(0, computedYears);

      const payload = {
        firstName: profileData.name.split(' ')[0] || '',
        lastName: profileData.name.split(' ').slice(1).join(' ') || '',
        phone: profileData.phone,
        location: profileData.location,
        jobSeekerProfile: {
          title: profileData.title || desiredRole,
          bio: profileData.bio,
          experience: profileData.experience,
          educationHistory: profileData.education,
          skills: profileData.skills,
          certifications: profileData.certifications,
          experienceYears,
          ...(profileData.resumeFileUrl ? { resumeFileUrl: profileData.resumeFileUrl } : {}),
        }
      };

      await updateProfileMutation.mutateAsync(payload);
      toast.success('Profile saved successfully!');
      await fetchProfileAfterUpload();
      setCurrentStep(3);
    } catch (error) {
      console.error('Failed to save profile:', error);
      toast.error('Failed to save profile.');
    } finally {
      setIsSaving(false);
    }
  };



  const handleSavePreferences = async () => {
    try {
      setIsSavingPref(true);
      await updateProfileMutation.mutateAsync({
        jobSeekerProfile: { 
          title: desiredRole,
          preferences: { salaryMin, salaryMax, workArrangement, preferredLocation }
        }
      });
      toast.success('Preferences saved successfully!');
      setCurrentStep(4);
    } catch (error) {
      console.error('Failed to save preferences:', error);
      toast.error('Failed to save preferences.');
    } finally {
      setIsSavingPref(false);
    }
  };

  const handleLaunch = async () => {
    try {
      await updateProfileMutation.mutateAsync({
        onboardingCompleted: true,
        jobSeekerProfile: {
          preferences: { aiCoachEnabled }
        }
      });
      
      // Force a full navigation to clear Next.js router cache and remount AuthGuard
      window.location.href = '/job-seeker/dashboard';
    } catch (error) {
      console.error('Failed to update onboarding status:', error);
      window.location.href = '/job-seeker/dashboard';
    }
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSalaryMin(Math.min(value, salaryMax - 10));
    setSalaryMax(Math.max(value, salaryMin + 10));
  };

  const stepTitles = [
    "Import Career Identity",
    "Complete Profile",
    "Job Preferences",
    "Enable AI Career Coach"
  ];

  const goNext = async () => {
    if (currentStep === 2) {
      await handleSaveProfile();
    } else {
      setCurrentStep(prev => Math.min(4, prev + 1));
    }
  };
  const goBack = () => setCurrentStep(prev => Math.max(1, prev - 1));

  const calculateStrength = (data: any) => {
    if (!data) return 0;
    let strength = 0;
    if (data.name) strength += 10;
    if (data.title) strength += 10;
    if (data.email) strength += 5;
    if (data.phone) strength += 5;
    if (data.location) strength += 5;
    if (data.experience && data.experience.length > 0) strength += 25;
    if (data.education && data.education.length > 0) strength += 20;
    if (data.skills && data.skills.length > 0) strength += 10;
    if (data.certifications && data.certifications.length > 0) strength += 10;
    return Math.min(100, strength);
  };

  const profileStrength = calculateStrength(profileData);
  const hasExperience = profileData?.experience && profileData.experience.length > 0;
  const hasEducation = profileData?.education && profileData.education.length > 0;
  const hasSkills = profileData?.skills && profileData.skills.length > 0;
  const hasCertifications = profileData?.certifications && profileData.certifications.length > 0;
  const hasResume = !!profileData?.resumeFileUrl;

  return (
    <div className="flex flex-col min-h-screen bg-canvas text-ink">
      <OnboardingHeader 
        currentStep={currentStep} 
        totalSteps={4} 
        stepTitle={stepTitles[currentStep - 1]} 
      />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 w-full">
        <div className="mb-10">
          <h1 className="type-display-md text-ink mb-2">
            Welcome, {userProfileData ? userProfileData.firstName : 'User'}. Let&apos;s launch your career.
          </h1>
          <p className="type-body-md text-body max-w-2xl">
            Complete these mission-critical steps to activate the AI matching engine.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Wizard Steps */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Import */}
            <section className={`cf-card p-6 relative transition-all ${currentStep === 1 ? 'border-ink' : 'opacity-60'}`}>
              <div 
                className={`flex justify-between items-start mb-6 ${currentStep !== 1 ? 'cursor-pointer hover:opacity-80' : ''}`}
                onClick={() => currentStep !== 1 && setCurrentStep(1)}
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-sm bg-surface-dark flex items-center justify-center">
                    <Import className="w-5 h-5 text-on-dark" />
                  </div>
                  <div>
                    <h2 className="type-body-lg text-ink font-semibold">
                      Import Career Identity
                    </h2>
                    <p className="type-body-sm text-body">
                      Sync your history to jumpstart the process.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Resume Upload */}
                <button
                  onClick={handleUploadResume}
                  className="group relative flex flex-col items-center justify-center p-6 border border-hairline border-dashed rounded-sm hover:border-ink hover:bg-surface transition-all bg-canvas"
                >
                  <div className="w-7 h-7 text-body mb-3 group-hover:text-ink transition-colors">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <span className="type-body-sm text-ink font-semibold">
                    {hasResume ? 'Replace Resume' : 'Upload Resume'}
                  </span>
                  <span className="type-caption text-body mt-1">
                    {hasResume ? 'Current resume uploaded' : 'PDF or DOCX'}
                  </span>
                </button>
              </div>
            </section>

            {/* Step 2: Complete Profile */}
            <section className={`cf-card p-6 relative transition-all ${currentStep === 2 ? 'border-ink' : 'opacity-60'}`}>
              <div 
                className={`flex justify-between items-start mb-6 ${currentStep !== 2 ? 'cursor-pointer hover:opacity-80' : ''}`}
                onClick={() => currentStep !== 2 && setCurrentStep(2)}
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-sm bg-surface-dark flex items-center justify-center">
                    <UserCircle className="w-5 h-5 text-on-dark" />
                  </div>
                  <div>
                    <h2 className="type-body-lg text-ink font-semibold">
                      Complete Profile
                    </h2>
                    <p className="type-body-sm text-body">
                      Verify and edit your profile details below.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between type-body-sm text-ink font-medium mb-1">
                  <span>Profile Strength</span>
                  <span>{profileStrength}%</span>
                </div>
                <div className="w-full bg-hairline rounded-full h-1.5 mb-6">
                  <div
                    className="bg-ink h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${profileStrength}%` }}
                  ></div>
                </div>

                {currentStep !== 2 ? (
                  <div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[
                        { label: 'Experience', isChecked: hasExperience },
                        { label: 'Education', isChecked: hasEducation },
                        { label: 'Skills', isChecked: hasSkills },
                        { label: 'Certifications', isChecked: hasCertifications }
                      ].map((item) => (
                        <div key={item.label} className="p-3 border border-hairline rounded-sm flex items-center justify-between">
                          <span className="type-body-sm font-medium text-ink">
                            {item.label}
                          </span>
                          {item.isChecked ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Circle className="w-4 h-4 text-hairline" />}
                        </div>
                      ))}
                    </div>
                    <Button type="button" onClick={() => setCurrentStep(2)} variant="secondaryWhite" className="w-full">
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6 pt-4 border-t border-hairline">
                    {/* Personal Details Section */}
                    <div className="space-y-4">
                      <h3 className="type-body-md text-ink font-semibold flex items-center gap-2">
                        <User className="w-4 h-4" /> Personal Details
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block type-caption text-body mb-1">Full Name</label>
                          <input
                            type="text"
                            value={profileData.name || ''}
                            onChange={(e) => updateProfile('name', e.target.value)}
                            className="cf-input"
                            placeholder="Full Name"
                          />
                        </div>
                        <div>
                          <label className="block type-caption text-body mb-1">Professional Title</label>
                          <input
                            type="text"
                            value={profileData.title || ''}
                            onChange={(e) => updateProfile('title', e.target.value)}
                            className="cf-input"
                            placeholder="e.g. Software Engineer"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block type-caption text-body mb-1">Email</label>
                          <input
                            type="email"
                            value={profileData.email || ''}
                            onChange={(e) => updateProfile('email', e.target.value)}
                            className="cf-input"
                            placeholder="Email"
                          />
                        </div>
                        <div>
                          <label className="block type-caption text-body mb-1">Phone</label>
                          <input
                            type="text"
                            value={profileData.phone || ''}
                            onChange={(e) => updateProfile('phone', e.target.value)}
                            className="cf-input"
                            placeholder="Phone Number"
                          />
                        </div>
                        <div>
                          <label className="block type-caption text-body mb-1">Location</label>
                          <input
                            type="text"
                            value={profileData.location || ''}
                            onChange={(e) => updateProfile('location', e.target.value)}
                            className="cf-input"
                            placeholder="Location"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block type-caption text-body mb-1">Bio / Professional Summary</label>
                        <textarea
                          value={profileData.bio || ''}
                          onChange={(e) => updateProfile('bio', e.target.value)}
                          className="w-full p-2 bg-surface-dark border border-hairline rounded-sm type-body-sm text-ink focus:border-ink focus:outline-none transition-colors"
                          rows={3}
                          placeholder="Tell us about your professional background..."
                        />
                      </div>
                    </div>

                    {/* Experience Section */}
                    <div className="space-y-4 pt-4 border-t border-hairline">
                      <div className="flex justify-between items-center">
                        <h3 className="type-body-md text-ink font-semibold flex items-center gap-2">
                          <Briefcase className="w-4 h-4" /> Work Experience
                        </h3>
                        <button
                          type="button"
                          onClick={addExperience}
                          className="text-body hover:text-ink flex items-center gap-1 type-caption font-medium transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Experience
                        </button>
                      </div>

                      <div className="space-y-4">
                        {(profileData.experience || []).map((exp: any, index: number) => (
                          <div key={index} className="p-4 border border-hairline rounded-sm bg-surface-dark relative group">
                            <div className="absolute right-3 top-3 opacity-65 hover:opacity-100 transition-opacity flex gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingSection(editingSection === `experience-${index}` ? null : `experience-${index}`)}
                                className="text-body hover:text-ink p-1 hover:bg-canvas rounded-sm border border-hairline"
                                title="Edit"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeExperience(index)}
                                className="text-body hover:text-ink p-1 hover:bg-canvas rounded-sm border border-hairline"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {editingSection === `experience-${index}` ? (
                              <div className="space-y-3 mt-2 pr-8">
                                <input
                                  type="text"
                                  value={exp.title || ''}
                                  onChange={(e) => updateExperience(index, 'title', e.target.value)}
                                  className="w-full p-2 bg-canvas border border-hairline rounded-sm type-body-sm text-ink focus:border-ink"
                                  placeholder="Job Title"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    value={exp.company || ''}
                                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                    className="w-full p-2 bg-canvas border border-hairline rounded-sm type-body-sm text-ink focus:border-ink"
                                    placeholder="Company"
                                  />
                                  <input
                                    type="text"
                                    value={exp.location || ''}
                                    onChange={(e) => updateExperience(index, 'location', e.target.value)}
                                    className="w-full p-2 bg-canvas border border-hairline rounded-sm type-body-sm text-ink focus:border-ink"
                                    placeholder="Location"
                                  />
                                </div>
                                <input
                                  type="text"
                                  value={exp.period || ''}
                                  onChange={(e) => updateExperience(index, 'period', e.target.value)}
                                  className="w-full p-2 bg-canvas border border-hairline rounded-sm type-body-sm text-ink focus:border-ink"
                                  placeholder="Period (e.g. 2021 - Present)"
                                />
                                <textarea
                                  value={exp.description || ''}
                                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                  className="w-full p-2 bg-canvas border border-hairline rounded-sm type-body-sm text-ink focus:border-ink"
                                  rows={3}
                                  placeholder="Role description..."
                                />
                                <Button
                                  type="button"
                                  onClick={() => setEditingSection(null)}
                                  variant="primary"
                                  className="!px-3 !py-1.5 !min-h-0 text-[11px] leading-[11px]"
                                >
                                  Save Position
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <h4 className="type-body-sm text-ink font-semibold">{exp.title || 'Role'}</h4>
                                <div className="type-caption text-body mt-1">
                                  {exp.company || 'Company'} • {exp.location || 'Location'} • {exp.period || 'Period'}
                                </div>
                                <p className="type-body-sm text-ink mt-2 whitespace-pre-wrap leading-relaxed">
                                  {exp.description || 'No description provided.'}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                        {(profileData.experience || []).length === 0 && (
                          <p className="type-caption text-body">No experience added yet.</p>
                        )}
                      </div>
                    </div>

                    {/* Education Section */}
                    <div className="space-y-4 pt-4 border-t border-hairline">
                      <div className="flex justify-between items-center">
                        <h3 className="type-body-md text-ink font-semibold flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" /> Education
                        </h3>
                        <button
                          type="button"
                          onClick={addEducation}
                          className="text-body hover:text-ink flex items-center gap-1 type-caption font-medium transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Education
                        </button>
                      </div>

                      <div className="space-y-4">
                        {(profileData.education || []).map((edu: any, index: number) => (
                          <div key={index} className="p-4 border border-hairline rounded-sm bg-surface-dark relative group">
                            <div className="absolute right-3 top-3 opacity-65 hover:opacity-100 transition-opacity flex gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingSection(editingSection === `education-${index}` ? null : `education-${index}`)}
                                className="text-body hover:text-ink p-1 hover:bg-canvas rounded-sm border border-hairline"
                                title="Edit"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeEducation(index)}
                                className="text-body hover:text-ink p-1 hover:bg-canvas rounded-sm border border-hairline"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {editingSection === `education-${index}` ? (
                              <div className="space-y-3 mt-2 pr-8">
                                <input
                                  type="text"
                                  value={edu.institution || ''}
                                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                  className="w-full p-2 bg-canvas border border-hairline rounded-sm type-body-sm text-ink focus:border-ink"
                                  placeholder="Institution / School"
                                />
                                <input
                                  type="text"
                                  value={edu.degree || ''}
                                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                  className="w-full p-2 bg-canvas border border-hairline rounded-sm type-body-sm text-ink focus:border-ink"
                                  placeholder="Degree / Field of study"
                                />
                                <input
                                  type="text"
                                  value={edu.period || ''}
                                  onChange={(e) => updateEducation(index, 'period', e.target.value)}
                                  className="w-full p-2 bg-canvas border border-hairline rounded-sm type-body-sm text-ink focus:border-ink"
                                  placeholder="Period / Year"
                                />
                                <Button
                                  type="button"
                                  onClick={() => setEditingSection(null)}
                                  variant="primary"
                                  className="!px-3 !py-1.5 !min-h-0 text-[11px] leading-[11px]"
                                >
                                  Save Education
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <h4 className="type-body-sm text-ink font-semibold">{edu.institution || 'School'}</h4>
                                <div className="type-caption text-body mt-1">
                                  {edu.degree || 'Degree'} • {edu.period || 'Year'}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        {(profileData.education || []).length === 0 && (
                          <p className="type-caption text-body">No education added yet.</p>
                        )}
                      </div>
                    </div>

                    {/* Certifications Section */}
                    <div className="space-y-4 pt-4 border-t border-hairline">
                      <div className="flex justify-between items-center">
                        <h3 className="type-body-md text-ink font-semibold flex items-center gap-2">
                          <Award className="w-4 h-4" /> Certifications
                        </h3>
                        <button
                          type="button"
                          onClick={addCertification}
                          className="text-body hover:text-ink flex items-center gap-1 type-caption font-medium transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Certification
                        </button>
                      </div>

                      <div className="space-y-4">
                        {(profileData.certifications || []).map((cert: any, index: number) => (
                          <div key={index} className="p-4 border border-hairline rounded-sm bg-surface-dark relative group">
                            <div className="absolute right-3 top-3 opacity-65 hover:opacity-100 transition-opacity flex gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingSection(editingSection === `certification-${index}` ? null : `certification-${index}`)}
                                className="text-body hover:text-ink p-1 hover:bg-canvas rounded-sm border border-hairline"
                                title="Edit"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeCertification(index)}
                                className="text-body hover:text-ink p-1 hover:bg-canvas rounded-sm border border-hairline"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {editingSection === `certification-${index}` ? (
                              <div className="space-y-3 mt-2 pr-8">
                                <input
                                  type="text"
                                  value={cert.name || ''}
                                  onChange={(e) => updateCertification(index, 'name', e.target.value)}
                                  className="w-full p-2 bg-canvas border border-hairline rounded-sm type-body-sm text-ink focus:border-ink"
                                  placeholder="Certification Name"
                                />
                                <input
                                  type="text"
                                  value={cert.issued || ''}
                                  onChange={(e) => updateCertification(index, 'issued', e.target.value)}
                                  className="w-full p-2 bg-canvas border border-hairline rounded-sm type-body-sm text-ink focus:border-ink"
                                  placeholder="Issued Date"
                                />
                                <Button
                                  type="button"
                                  onClick={() => setEditingSection(null)}
                                  variant="primary"
                                  className="!px-3 !py-1.5 !min-h-0 text-[11px] leading-[11px]"
                                >
                                  Save Certification
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <h4 className="type-body-sm text-ink font-semibold">{cert.name || 'Certification'}</h4>
                                <div className="type-caption text-body mt-1">
                                  Issued: {cert.issued || 'N/A'}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        {(profileData.certifications || []).length === 0 && (
                          <p className="type-caption text-body">No certifications added yet.</p>
                        )}
                      </div>
                    </div>

                    {/* Skills Section */}
                    <div className="space-y-4 pt-4 border-t border-hairline">
                      <h3 className="type-body-md text-ink font-semibold flex items-center gap-2">
                        <Tag className="w-4 h-4" /> Skills
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {(profileData.skills || []).map((skill: any, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-sm type-mono-caption text-ink border border-hairline bg-surface-dark hover:bg-canvas cursor-pointer transition-colors"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(index)}
                              className="ml-1.5 text-body hover:text-ink font-bold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2 max-w-sm">
                        <input
                          type="text"
                          value={newSkillText}
                          onChange={(e) => setNewSkillText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (newSkillText.trim()) {
                                addSkill(newSkillText.trim());
                                setNewSkillText('');
                              }
                            }
                          }}
                          className="cf-input"
                          placeholder="Add skill (press Enter)"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            if (newSkillText.trim()) {
                              addSkill(newSkillText.trim());
                              setNewSkillText('');
                            }
                          }}
                          variant="secondaryWhite"
                        >
                          Add
                        </Button>
                      </div>
                    </div>


                  </div>
                )}
              </div>
            </section>


            {/* Step 3: Preferences */}
            <section className={`cf-card p-6 relative transition-all ${currentStep === 3 ? 'border-ink' : 'opacity-60'}`}>
              <div 
                className={`flex justify-between items-start mb-6 ${currentStep !== 3 ? 'cursor-pointer hover:opacity-80' : ''}`}
                onClick={() => currentStep !== 3 && setCurrentStep(3)}
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-sm bg-surface-dark flex items-center justify-center">
                    <Sliders className="w-5 h-5 text-on-dark" />
                  </div>
                  <div>
                    <h2 className="type-body-lg text-ink font-semibold">
                      Job Preferences
                    </h2>
                    <p className="type-body-sm text-body">
                      Teach our AI what you&apos;re looking for.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block type-body-sm text-ink mb-1.5">
                      Desired Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Product Designer"
                      value={desiredRole}
                      onChange={(e) => setDesiredRole(e.target.value)}
                      className="cf-input"
                    />
                  </div>
                  <div>
                    <label className="block type-body-sm text-ink mb-1.5">
                      Work Arrangement
                    </label>
                    <select
                      value={workArrangement}
                      onChange={(e) => setWorkArrangement(e.target.value)}
                      className="cf-input appearance-none"
                    >
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>
                  {workArrangement !== 'Remote' && (
                    <div className="sm:col-span-2">
                      <label className="block type-body-sm text-ink mb-1.5">
                        Preferred Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. San Francisco, CA or London, UK"
                        value={preferredLocation}
                        onChange={(e) => setPreferredLocation(e.target.value)}
                        className="cf-input"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="type-body-sm text-ink">
                      Salary Range (Annual)
                    </label>
                    <span className="type-body-sm font-bold text-ink">
                      ${salaryMin}k - ${salaryMax}k
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="300"
                    value={(salaryMin + salaryMax) / 2}
                    onChange={handleSalaryChange}
                    className="w-full h-2 bg-hairline rounded-sm appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between type-caption text-body mt-1">
                    <span>$30k</span>
                    <span>$300k+</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    onClick={handleSavePreferences}
                    disabled={isSavingPref}
                    variant="secondaryWhite"
                  >
                    {isSavingPref && <Loader2 className="w-4 h-4 animate-spin mr-2 inline" />}
                    Save Preferences
                  </Button>
                </div>
              </div>
            </section>

            {/* Step 4: Coach */}
            <section className={`cf-card p-6 relative transition-all ${currentStep === 4 ? 'border-ink' : 'opacity-60'}`}>
              <div 
                className={`flex justify-between items-center ${currentStep !== 4 ? 'cursor-pointer hover:opacity-80' : ''}`}
                onClick={() => currentStep !== 4 && setCurrentStep(4)}
              >
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-sm bg-surface-dark flex items-center justify-center">
                    <Bot className="w-5 h-5 text-on-dark" />
                  </div>
                  <div>
                    <h2 className="type-body-lg text-ink font-semibold">
                      Enable AI Career Coach
                    </h2>
                    <p className="type-body-sm text-body">
                      Get daily insights and interview prep.
                    </p>
                  </div>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="ai-coach"
                    checked={aiCoachEnabled}
                    onChange={(e) => setAiCoachEnabled(e.target.checked)}
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-canvas border-2 appearance-none cursor-pointer border-hairline transition-all duration-300 checked:right-0 checked:border-ink"
                  />
                  <label
                    htmlFor="ai-coach"
                    className="toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-300"
                    style={{ backgroundColor: aiCoachEnabled ? '#000000' : '#e2e8f0' }}
                  ></label>
                </div>
              </div>
            </section>

            {currentStep === 4 && (
              <div className="pt-4">
                <Button
                  onClick={handleLaunch}
                  variant="primary"
                  className="w-full py-4 type-body-lg font-semibold"
                >
                  <Rocket className="w-5 h-5 mr-2 inline" />
                  Launch Dashboard
                </Button>
              </div>
            )}
          </div>

          {/* Right Column: AI Insights */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              <AIInsightPanel pageType="onboarding" />

              {/* Need Help? */}
              <div className="cf-card p-4 text-center border-dashed">
                <p className="type-caption text-body mb-2">
                  Stuck on onboarding?
                </p>
                <button className="type-body-sm text-ink hover:text-ink/70 flex items-center justify-center gap-1 mx-auto transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat with Support
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <OnboardingFooter 
        microcopy="Your progress is auto-saved. Take your time." 
        onBack={goBack} 
        onNext={goNext} 
        canGoBack={currentStep > 1}
        canGoNext={currentStep < 4}
        nextLabel={currentStep === 4 ? "Finish" : "Next"}
      />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          margin-top: -6px;
          transition: transform 0.1s;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        .slider::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: #e5e5e5;
          border-radius: 2px;
        }
      `}</style>

      {/* Modals */}
      <UploadResumeModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onSuccess={handleUploadSuccess} 
      />
    </div>
  );
}
