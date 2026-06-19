'use client';

import React, { useState } from 'react';
import {
  FileText,
  Eye,
  Download,
  Sparkles,
  FileInput,
  Upload,
  Linkedin,
} from 'lucide-react';
import {
  ResumeEditor,
  TemplateSelector,
  AISuggestionsPanel,
  ResumeAnalysis,
} from '@/components';
import { useUser } from '@/hooks/queries/useAuth';
import { useMyResumes } from '@/hooks/queries/useProfile';
import Button from '@/components/ui/Button';

export default function AiResumeDraft() {
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState<any>({
    name: '',
    title: '',
    location: '',
    email: '',
    linkedin: '',
    website: '',
    skills: [],
    experience: [],
    education: [],
  });

  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const { data: profileRes, isLoading: isUserLoading } = useUser();
  const { data: resumesArr, isLoading: isResumesLoading } = useMyResumes();

  React.useEffect(() => {
    if (isUserLoading || isResumesLoading) return;

    try {
      let newResumeData = { ...resumeData };
      
      // Populate from the profile API 
      if (profileRes) {
        const userObj = profileRes;
        const jsProfile = profileRes.profile;

        if (userObj) {
          if (userObj.firstName) newResumeData.name = `${userObj.firstName} ${userObj.lastName || ''}`.trim();
          if (userObj.email) newResumeData.email = userObj.email;
          if (userObj.location) newResumeData.location = userObj.location;
          if (userObj.phone) newResumeData.phone = userObj.phone;
        }

        if (jsProfile) {
          if (jsProfile.title) newResumeData.title = jsProfile.title;
          if (jsProfile.linkedinUrl) newResumeData.linkedin = jsProfile.linkedinUrl;
          if (jsProfile.portfolioUrl) newResumeData.website = jsProfile.portfolioUrl;
          if (jsProfile.bio) newResumeData.bio = jsProfile.bio;
          if (jsProfile.skills && jsProfile.skills.length > 0) newResumeData.skills = jsProfile.skills;
          if (jsProfile.experience && jsProfile.experience.length > 0) newResumeData.experience = jsProfile.experience;
          if (jsProfile.educationHistory && jsProfile.educationHistory.length > 0) newResumeData.education = jsProfile.educationHistory;
          if (jsProfile.certifications && jsProfile.certifications.length > 0) newResumeData.certifications = jsProfile.certifications;
        }
      }

      // Fallback: if profile had no parsed data, try reading from the resumes table
      if (resumesArr && resumesArr.length > 0 && !newResumeData.experience.length) {
        const latestResume = resumesArr[resumesArr.length - 1];
        if (latestResume?.parsedData) {
          const pd = latestResume.parsedData;
          if (!newResumeData.skills.length && pd.skills) newResumeData.skills = pd.skills.map((s: any) => typeof s === 'string' ? s : s.skill).filter(Boolean);
          if (!newResumeData.experience.length && pd.experience) newResumeData.experience = pd.experience;
          if (!newResumeData.education.length && pd.education) newResumeData.education = pd.education;
        }
      }
      
      setResumeData(newResumeData);
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setIsLoading(false);
    }
  }, [isUserLoading, isResumesLoading, profileRes, resumesArr]);

  const updateResumeData = (field: string, value: any) => {
    setResumeData((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    updateResumeData('experience', newExperience);
  };

  const updateAchievement = (
    expIndex: number,
    achIndex: number,
    value: string
  ) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex].achievements[achIndex] = value;
    updateResumeData('experience', newExperience);
  };

  const addSkill = (skill: string) => {
    updateResumeData('skills', [...resumeData.skills, skill]);
  };

  const removeSkill = (index: number) => {
    const newSkills = resumeData.skills.filter((_: any, i: number) => i !== index);
    updateResumeData('skills', newSkills);
  };

  const addExperience = () => {
    const newExp = {
      title: 'New Role',
      company: 'Company Name',
      period: 'Start - End',
      achievements: ['Achievement 1', 'Achievement 2'],
    };
    updateResumeData('experience', [...(resumeData.experience || []), newExp]);
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const newEducation = [...(resumeData.education || [])];
    newEducation[index] = { ...newEducation[index], [field]: value };
    updateResumeData('education', newEducation);
  };

  const addEducation = () => {
    const newEdu = {
      degree: 'New Degree',
      institution: 'Institution Name',
      period: 'Start - End',
    };
    updateResumeData('education', [...(resumeData.education || []), newEdu]);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-canvas text-ink">
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-6 pt-10">
        <section className="h-full flex flex-col">
          <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-hairline">
            <div className="space-y-1">
              <h1 className="type-display-xl text-ink flex items-center gap-3">
                <FileText className="w-8 h-8 text-ink" />
                Resume Draft
              </h1>
              <div className="flex items-center gap-3 mt-2 type-mono-caption text-body">
                <span>Product Designer - Tech Lead</span>
                <span className="px-2 py-0.5 rounded-sm bg-surface-dark border border-hairline text-ink font-medium">
                  Saved
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="!px-3 !py-1.5 !min-h-0 text-[12px] leading-[12px]">
                <Eye className="w-3.5 h-3.5 mr-2" /> Preview
              </Button>
              <Button variant="outline" className="!px-3 !py-1.5 !min-h-0 text-[12px] leading-[12px]">
                <Download className="w-3.5 h-3.5 mr-2" /> Export
              </Button>
              <Button variant="primary" className="!px-4 !py-1.5 !min-h-0 text-[12px] leading-[12px]">
                <Sparkles className="w-3.5 h-3.5 mr-2" /> Optimize with AI
              </Button>
            </div>
          </header>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 overflow-y-auto">
              {isLoading ? (
                <div className="flex-1 flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ink"></div>
                </div>
              ) : (
                <ResumeEditor
                  resumeData={resumeData}
                  updateResumeData={updateResumeData}
                  updateExperience={updateExperience}
                  updateAchievement={updateAchievement}
                  addSkill={addSkill}
                  removeSkill={removeSkill}
                  addExperience={addExperience}
                  updateEducation={updateEducation}
                  addEducation={addEducation}
                />
              )}
            </div>

            <aside className="lg:col-span-4 space-y-6">
              <ResumeAnalysis />
              <AISuggestionsPanel addSkill={addSkill} />
              <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />

              <div className="space-y-3 pt-4 border-t border-hairline">
                <Button variant="outline" className="w-full">
                  <FileInput className="w-4 h-4 mr-2" /> Generate from Job Description
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" /> Upload
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Linkedin className="w-4 h-4 mr-2" /> Sync
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
