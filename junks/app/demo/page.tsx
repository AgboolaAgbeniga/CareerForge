'use client';

import React, { useState, useEffect } from 'react';
import {
  UploadCloud,
  Briefcase,
  UserCheck,
  Search,
  CheckCircle2,
  ArrowRight,
  FileText,
  Sparkles,
  Target,
  BarChart2,
  Zap,
  Globe,
  Quote,
  User,
  MapPin,
  Check,
  Bot,
  Star,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Building,
  Calendar,
  X,
  ShieldCheck,
  Eye,
  Mail,
  Download,
  Settings,
  Bell,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  BadgeCheck,
  Award,
  Link,
  StickyNote,
  MessageSquare,
  Send,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  PieChart,
  Activity,
  Zap as Lightning,
} from 'lucide-react';
import { motion, useTransform, useSpring } from 'framer-motion';

// Enhanced mock data for comprehensive demo
const mockCandidates = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Senior UX Designer — Full-Stack Developer',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'React'],
    experience: '7 years experience',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    matchScore: 98,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&background=e5e7eb',
    status: 'shortlisted',
    email: 'sarah.chen@email.com',
    phone: '(555) 123-4567',
    summary: 'Passionate UX Designer with 7 years of experience creating user-centered digital experiences.',
    education: 'Master of Design, California College of the Arts',
    certifications: ['Google UX Design Certificate', 'Certified Usability Analyst'],
    portfolio: 'sarahchen.design',
    lastActive: '2 hours ago',
  },
  {
    id: 2,
    name: 'Marcus Jones',
    title: 'Product Designer — UI/UX Specialist',
    skills: ['Figma', 'UI/UX', 'Design Systems', 'Sketch', 'Prototyping'],
    experience: '5 years experience',
    company: 'StartupXYZ',
    location: 'Remote',
    matchScore: 92,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&background=e5e7eb',
    status: 'contacted',
    email: 'marcus.jones@email.com',
    phone: '(555) 234-5678',
    summary: 'Creative Product Designer focused on building intuitive user experiences.',
    education: 'Bachelor of Fine Arts, RISD',
    certifications: ['Adobe Certified Expert'],
    portfolio: 'dribbble.com/marcusjones',
    lastActive: '1 day ago',
  },
  {
    id: 3,
    name: 'Elena Lewis',
    title: 'UX Researcher — User Experience Analyst',
    skills: ['User Research', 'Analytics', 'Figma', 'Data Analysis', 'A/B Testing'],
    experience: '6 years experience',
    company: 'Design Agency',
    location: 'New York, NY',
    matchScore: 89,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&background=e5e7eb',
    status: 'shortlisted',
    email: 'elena.lewis@email.com',
    phone: '(555) 345-6789',
    summary: 'Data-driven UX Researcher with expertise in user behavior analysis.',
    education: 'PhD Human-Computer Interaction, Carnegie Mellon',
    certifications: ['Certified UX Researcher'],
    portfolio: 'elenalewis.com',
    lastActive: '3 hours ago',
  },
  {
    id: 4,
    name: 'David Kim',
    title: 'Senior Frontend Engineer',
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL'],
    experience: '8 years experience',
    company: 'BigTech Corp',
    location: 'Seattle, WA',
    matchScore: 94,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David&background=e5e7eb',
    status: 'shortlisted',
    email: 'david.kim@email.com',
    phone: '(555) 456-7890',
    summary: 'Senior Frontend Engineer specializing in React and modern web technologies.',
    education: 'MS Computer Science, Stanford',
    certifications: ['AWS Certified Developer'],
    portfolio: 'github.com/davidkim',
    lastActive: '30 minutes ago',
  },
];

// mockJobs is now imported from lib/demo-data

const mockResumeData = {
  personalInfo: {
    name: 'Alex Thompson',
    title: 'Software Engineer',
    email: 'alex.thompson@email.com',
    phone: '(555) 123-4567',
    location: 'Seattle, WA',
  },
  summary: 'Passionate software engineer with 6+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies.',
  experience: [
    {
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      duration: '2021 - Present',
      description: 'Led development of microservices architecture serving 1M+ users. Improved performance by 40% through optimization.',
    },
    {
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      duration: '2019 - 2021',
      description: 'Built responsive web applications using React and Node.js. Collaborated with cross-functional teams.',
    },
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes'],
  education: 'BS Computer Science, University of Washington (2019)',
};

export default function DemoPresentation() {
    const [currentStep, setCurrentStep] = useState<'auth' | 'homepage' | 'job-seeker-flow' | 'recruiter-flow'>('homepage');
    const [authStep, setAuthStep] = useState<'login' | 'signup' | 'forgot-password' | 'reset-password' | 'email-verification' | 'two-factor'>('login');
    const [authLoading, setAuthLoading] = useState(false);
    const [userType, setUserType] = useState<'job-seeker' | 'recruiter'>('job-seeker');
   const [jobSeekerStep, setJobSeekerStep] = useState<'upload' | 'analyzing' | 'generated' | 'job-search' | 'job-details' | 'apply-job' | 'dashboard' | 'applications' | 'messaging' | 'career-tools' | 'settings'>('upload');
   const [recruiterStep, setRecruiterStep] = useState<'onboarding' | 'post-job' | 'published' | 'matching' | 'dashboard' | 'candidate-profile' | 'shortlist' | 'settings' | 'interview-scheduling' | 'messaging' | 'offers' | 'team' | 'analytics' | 'ats-pipeline'>('onboarding');
   const [uploadProgress, setUploadProgress] = useState(0);
   const [isGenerating, setIsGenerating] = useState(false);
   const [analysisSteps, setAnalysisSteps] = useState([
     { id: 'parsing', label: 'Parsing Document Structure', status: 'pending', progress: 0 },
     { id: 'skills', label: 'Extracting Skills & Keywords', status: 'pending', progress: 0 },
     { id: 'experience', label: 'Analyzing Work Experience', status: 'pending', progress: 0 },
     { id: 'optimization', label: 'Optimizing for ATS Compatibility', status: 'pending', progress: 0 },
     { id: 'scoring', label: 'Calculating Match Scores', status: 'pending', progress: 0 },
   ]);
   const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
   const [selectedJob, setSelectedJob] = useState<any>(null);
   const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'skills' | 'actions'>('overview');
   const [notes, setNotes] = useState('');
   const [tags, setTags] = useState(['Top Candidate', 'Design Systems Expert']);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
   const [applicationStatus, setApplicationStatus] = useState<'all' | 'pending' | 'interview' | 'rejected' | 'accepted'>('all');
   const [selectedMessage, setSelectedMessage] = useState<any>(null);
   const [newMessage, setNewMessage] = useState('');
   const [interviewDate, setInterviewDate] = useState('');
   const [interviewTime, setInterviewTime] = useState('');
   const [offerAmount, setOfferAmount] = useState('');
   const [teamMembers, setTeamMembers] = useState<any[]>([]);

  // Animation for homepage
  const animationProgress = useSpring(0, { stiffness: 100, damping: 30 });
  const candidateProgress = useTransform(animationProgress, [0.2, 0.4], [0, 85]);
  const jobProgress = useTransform(animationProgress, [0.2, 0.4], [0, 92]);
  const connectorPathLength = useTransform(animationProgress, [0.3, 0.5], [0, 1]);
  const badgesOpacity = useTransform(animationProgress, [0.4, 0.6], [0, 1]);

  useEffect(() => {
    if (currentStep === 'homepage') {
      let startTime = Date.now();
      const duration = 5000;
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed % duration) / duration;
        animationProgress.set(progress);
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [currentStep, animationProgress]);

  const handleUploadResume = () => {
    setJobSeekerStep('analyzing');
    setUploadProgress(0);

    // Reset analysis steps
    setAnalysisSteps(prev => prev.map(step => ({ ...step, status: 'pending', progress: 0 })));

    let currentStepIndex = 0;
    let overallProgress = 0;

    const interval = setInterval(() => {
      overallProgress += Math.floor(Math.random() * 8) + 3;

      // Update current step progress
      setAnalysisSteps(prev => prev.map((step, index) => {
        if (index === currentStepIndex) {
          const stepProgress = Math.min(100, step.progress + Math.floor(Math.random() * 15) + 5);
          return { ...step, progress: stepProgress, status: stepProgress >= 100 ? 'completed' : 'in-progress' };
        } else if (index < currentStepIndex) {
          return { ...step, status: 'completed', progress: 100 };
        }
        return step;
      }));

      // Move to next step when current is complete
      if (analysisSteps[currentStepIndex]?.progress >= 100 && currentStepIndex < analysisSteps.length - 1) {
        currentStepIndex++;
        setAnalysisSteps(prev => prev.map((step, index) => {
          if (index === currentStepIndex) {
            return { ...step, status: 'in-progress' };
          }
          return step;
        }));
      }

      setUploadProgress(Math.min(100, overallProgress));

      if (overallProgress >= 100) {
        clearInterval(interval);
        // Mark all steps as completed
        setAnalysisSteps(prev => prev.map(step => ({ ...step, status: 'completed', progress: 100 })));
        setTimeout(() => setJobSeekerStep('generated'), 1000);
      }
    }, 300);
  };

  const handlePostJob = () => {
    setRecruiterStep('published');
    setTimeout(() => setRecruiterStep('matching'), 2000);
  };

  const handleLogin = () => {
    setAuthLoading(true);
    // Simulate login success
    setTimeout(() => {
      setAuthLoading(false);
      if (userType === 'job-seeker') {
        setCurrentStep('job-seeker-flow');
        setJobSeekerStep('upload');
      } else {
        setCurrentStep('recruiter-flow');
        setRecruiterStep('onboarding');
      }
    }, 1500);
  };

  const handleSignup = () => {
    setAuthLoading(true);
    // Simulate signup success
    setTimeout(() => {
      setAuthLoading(false);
      setAuthStep('email-verification');
    }, 1500);
  };

  const handleForgotPassword = () => {
    setAuthStep('reset-password');
  };

  const handleResetPassword = () => {
    setAuthStep('login');
  };

  const handleEmailVerification = () => {
    setAuthStep('two-factor');
  };

  const handleTwoFactorSetup = () => {
    setCurrentStep(userType === 'job-seeker' ? 'job-seeker-flow' : 'recruiter-flow');
    if (userType === 'job-seeker') {
      setJobSeekerStep('upload');
    } else {
      setRecruiterStep('onboarding');
    }
  };

  const addTag = () => {
    setTags([...tags, 'New Tag']);
  };

  const renderHomepage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              AI
            </div>
            <span className="text-slate-900 font-semibold tracking-tight text-lg">
              CareerForge
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">About</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-32 lg:pt-40 lg:pb-48 hero-glow overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            New: AI Resume Analysis v1.0
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 mb-6">
            Smarter Resumes.
            <br />
            <span className="text-gradient">Better Matches.</span> Faster Hiring.
          </h1>

          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            The all-in-one AI platform connecting top talent with innovative
            companies. Optimize your career path or find your next unicorn hire in
            seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-testid="value-prop">
            <button
              data-testid="upload-resume-btn"
              onClick={() => {
                setUserType('job-seeker');
                setCurrentStep('auth');
              }}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-4 h-4" /> Upload Resume
            </button>
            <button
              data-testid="post-job-btn"
              onClick={() => {
                setUserType('recruiter');
                setCurrentStep('auth');
              }}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" /> Post a Job
            </button>
          </div>

          {/* Interactive Demo */}
          <motion.div className="mt-16 mx-auto max-w-4xl relative">
            <motion.div className="bg-white rounded-2xl shadow-2xl border border-slate-200/60 p-2">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl overflow-hidden aspect-[16/9] relative flex items-center justify-center border border-slate-100">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                <svg className="absolute inset-0 w-full h-full z-20">
                  <motion.path
                    d="M 25% 50% Q 50% 30% 75% 25%"
                    stroke="url(#glow)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    style={{ pathLength: connectorPathLength }}
                  />
                  <defs>
                    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="relative z-10 grid grid-cols-2 gap-8 w-3/4">
                  <motion.div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex gap-3 mb-3">
                      <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-900">Alex Thompson</div>
                        <div className="text-xs text-slate-500">Software Engineer</div>
                      </div>
                    </div>
                    <div className="h-1 w-full bg-slate-100 rounded mb-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-indigo-500 rounded"
                        style={{ width: candidateProgress }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Match Score: {Math.round(candidateProgress.get())}%
                    </div>
                    <motion.div className="mt-2 flex flex-wrap gap-1" style={{ opacity: badgesOpacity }}>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-indigo-50 text-indigo-700">
                        Skills: React, Node.js
                      </span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-green-50 text-green-700">
                        <MapPin className="w-2 h-2 mr-1" />
                        Seattle, WA
                      </span>
                    </motion.div>
                  </motion.div>

                  <motion.div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex gap-3 mb-3">
                      <div className="w-8 h-8 rounded bg-teal-100 flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-teal-600" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-900">Senior Developer</div>
                        <div className="text-xs text-slate-500">TechCorp</div>
                      </div>
                    </div>
                    <div className="h-1 w-full bg-slate-100 rounded mb-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-teal-500 rounded"
                        style={{ width: jobProgress }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Match Score: {Math.round(jobProgress.get())}%
                    </div>
                    <motion.div className="mt-2 flex flex-wrap gap-1" style={{ opacity: badgesOpacity }}>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-teal-50 text-teal-700">
                        Requirements: React, AWS
                      </span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-blue-50 text-blue-700">
                        <Globe className="w-2 h-2 mr-1" />
                        Remote
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );

  const renderJobSeekerFlow = () => (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentStep('homepage')}
            className="text-slate-400 hover:text-white flex items-center gap-2"
          >
            ← Back to Homepage
          </button>
          <div className="flex gap-4" data-testid="job-matches">
            <button
              onClick={() => setJobSeekerStep('dashboard')}
              className={`px-4 py-2 rounded-lg text-sm ${jobSeekerStep === 'dashboard' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setJobSeekerStep('job-search')}
              className={`px-4 py-2 rounded-lg text-sm ${jobSeekerStep === 'job-search' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
            >
              Job Search
            </button>
            <button
              onClick={() => setJobSeekerStep('applications')}
              className={`px-4 py-2 rounded-lg text-sm ${jobSeekerStep === 'applications' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
            >
              Applications
            </button>
            <button
              onClick={() => setJobSeekerStep('messaging')}
              className={`px-4 py-2 rounded-lg text-sm ${jobSeekerStep === 'messaging' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
            >
              Messages
            </button>
            <button
              onClick={() => setJobSeekerStep('career-tools')}
              className={`px-4 py-2 rounded-lg text-sm ${jobSeekerStep === 'career-tools' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
            >
              Career Tools
            </button>
            <button
              onClick={() => setJobSeekerStep('settings')}
              className={`px-4 py-2 rounded-lg text-sm ${jobSeekerStep === 'settings' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
            >
              Settings
            </button>
          </div>
        </div>

        {jobSeekerStep === 'upload' && (
          <div className="glass-card rounded-2xl p-8" data-testid="upload-section">
            <h2 className="text-2xl font-semibold text-white mb-6">Upload Your Resume</h2>
            <div className="border-2 border-dashed border-slate-600 rounded-xl p-12 text-center" data-testid="upload-area">
              <UploadCloud className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Drag & drop your resume here</h3>
              <p className="text-slate-400 mb-6">or click to browse files</p>
              <button
                data-testid="simulate-upload-btn"
                onClick={handleUploadResume}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
              >
                Simulate Upload
              </button>
            </div>
          </div>
        )}

        {jobSeekerStep === 'analyzing' && (
            <div className="glass-card rounded-2xl p-8" data-testid="analyzing">
              <h2 className="text-2xl font-semibold text-white mb-6">AI Resume Analysis</h2>
             <div className="space-y-6">
               <div className="flex items-center gap-4 mb-6">
                 <Bot className="w-8 h-8 text-indigo-400 animate-pulse" />
                 <div>
                   <div className="text-white font-medium">CareerForge AI is analyzing your resume</div>
                   <div className="text-slate-400 text-sm">Our advanced AI is extracting insights and optimizing your profile</div>
                 </div>
               </div>

               {/* Detailed Analysis Steps */}
               <div className="space-y-4">
                 {analysisSteps.map((step, index) => (
                   <div key={step.id} className="bg-slate-800/50 rounded-lg p-4">
                     <div className="flex items-center justify-between mb-2">
                       <div className="flex items-center gap-3">
                         <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                           step.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                           step.status === 'in-progress' ? 'bg-indigo-500/20 text-indigo-400 animate-pulse' :
                           'bg-slate-600 text-slate-400'
                         }`}>
                           {step.status === 'completed' ? (
                             <CheckCircle2 className="w-4 h-4" />
                           ) : step.status === 'in-progress' ? (
                             <Bot className="w-4 h-4" />
                           ) : (
                             <div className="w-2 h-2 bg-current rounded-full"></div>
                           )}
                         </div>
                         <span className={`text-sm font-medium ${
                           step.status === 'completed' ? 'text-emerald-400' :
                           step.status === 'in-progress' ? 'text-indigo-400' :
                           'text-slate-400'
                         }`}>
                           {step.label}
                         </span>
                       </div>
                       <span className="text-xs text-slate-500">{step.progress}%</span>
                     </div>
                     <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                       <div
                         className={`h-full rounded-full transition-all duration-500 ${
                           step.status === 'completed' ? 'bg-emerald-500' :
                           step.status === 'in-progress' ? 'bg-indigo-500' :
                           'bg-slate-600'
                         }`}
                         style={{ width: `${step.progress}%` }}
                       />
                     </div>
                   </div>
                 ))}
               </div>

               {/* Overall Progress */}
               <div className="border-t border-slate-700 pt-6">
                 <div className="flex items-center justify-between mb-2">
                   <span className="text-white font-medium">Overall Progress</span>
                   <span className="text-slate-400 text-sm">{uploadProgress}% Complete</span>
                 </div>
                 <div className="w-full bg-slate-800 rounded-full h-3">
                   <div
                     className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                     style={{ width: `${uploadProgress}%` }}
                   />
                 </div>
               </div>

               {/* AI Insights Preview */}
               <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                 <div className="flex items-start gap-3">
                   <Sparkles className="w-5 h-5 text-indigo-400 mt-0.5" />
                   <div>
                     <p className="text-sm text-slate-300">
                       <span className="text-indigo-400 font-medium">AI Insight:</span> Your React and Node.js skills are highly marketable.
                       Adding cloud certifications could increase your match scores by 25%.
                     </p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         )}

        {jobSeekerStep === 'generated' && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-8" data-testid="generated-resume">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
                <h2 className="text-2xl font-semibold text-white">Resume Generated Successfully!</h2>
              </div>

              <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">{mockResumeData.personalInfo.name}</h3>
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                    AI Optimized
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Professional Summary</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{mockResumeData.summary}</p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">Experience</h4>
                    <div className="space-y-3">
                      {mockResumeData.experience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-indigo-500 pl-4">
                          <div className="text-white font-medium">{exp.position}</div>
                          <div className="text-indigo-300 text-sm">{exp.company} • {exp.duration}</div>
                          <p className="text-slate-300 text-sm mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {mockResumeData.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setJobSeekerStep('upload')}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
                >
                  Upload Another Resume
                </button>
                <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderRecruiterFlow = () => (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentStep('homepage')}
            className="text-slate-400 hover:text-white flex items-center gap-2"
          >
            ← Back to Homepage
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => setRecruiterStep('dashboard')}
              className={`px-4 py-2 rounded-lg text-sm ${recruiterStep === 'dashboard' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setRecruiterStep('matching')}
              className={`px-4 py-2 rounded-lg text-sm ${recruiterStep === 'matching' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
            >
              Candidates
            </button>
            <button
              onClick={() => setRecruiterStep('shortlist')}
              className={`px-4 py-2 rounded-lg text-sm ${recruiterStep === 'shortlist' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
            >
              Shortlists
            </button>
            <button
              onClick={() => setRecruiterStep('interview-scheduling')}
              className={`px-4 py-2 rounded-lg text-sm ${recruiterStep === 'interview-scheduling' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
            >
              Interviews
            </button>
            <button
              onClick={() => setRecruiterStep('messaging')}
              className={`px-4 py-2 rounded-lg text-sm ${recruiterStep === 'messaging' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
            >
              Messages
            </button>
            <button
              onClick={() => setRecruiterStep('offers')}
              className={`px-4 py-2 rounded-lg text-sm ${recruiterStep === 'offers' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
            >
              Offers
            </button>
            <button
              onClick={() => setRecruiterStep('team')}
              className={`px-4 py-2 rounded-lg text-sm ${recruiterStep === 'team' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
            >
              Team
            </button>
            <button
              onClick={() => setRecruiterStep('analytics')}
              className={`px-4 py-2 rounded-lg text-sm ${recruiterStep === 'analytics' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
            >
              Analytics
            </button>
            <button
              onClick={() => setRecruiterStep('settings')}
              className={`px-4 py-2 rounded-lg text-sm ${recruiterStep === 'settings' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
            >
              Settings
            </button>
          </div>
        </div>

        {recruiterStep === 'onboarding' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Recruiter Onboarding</h2>
                <p className="text-slate-400">Set up your hiring environment with AI-powered tools</p>
              </div>
              <div className="text-sm text-slate-500">
                Step 1 of 4
              </div>
            </div>

            {/* Company Profile Step */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-6 h-6 text-indigo-400" />
                <h3 className="text-lg font-semibold text-white">Company Profile</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Company Name</label>
                    <input
                      type="text"
                      defaultValue="Cyberdyne Systems"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Industry</label>
                    <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white">
                      <option>Artificial Intelligence</option>
                      <option>Fintech</option>
                      <option>Health</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Headquarters</label>
                  <input
                    type="text"
                    defaultValue="San Francisco, CA"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <button
                  onClick={() => setRecruiterStep('post-job')}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
                >
                  Continue to Job Posting
                </button>
              </div>
            </div>
          </div>
        )}

        {recruiterStep === 'post-job' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-6">Post a Job</h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Job Title</label>
                      <input
                        type="text"
                        defaultValue="Senior Frontend Developer"
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Company</label>
                      <input
                        type="text"
                        defaultValue="TechCorp Inc."
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Job Description</label>
                    <textarea
                      rows={4}
                      defaultValue="We are looking for a Senior Frontend Developer to join our team. You will be responsible for building modern web applications using React, TypeScript, and modern development practices."
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Location</label>
                      <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white">
                        <option>Remote</option>
                        <option>On-site</option>
                        <option>Hybrid</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Salary Min</label>
                      <input
                        type="number"
                        defaultValue="120000"
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Salary Max</label>
                      <input
                        type="number"
                        defaultValue="180000"
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Required Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'TypeScript', 'Node.js', 'AWS'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handlePostJob}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
                  >
                    Publish Job
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">AI Optimization</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-indigo-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-300">
                          Adding "Design Systems" could increase qualified applicants by 18%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-amber-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-300">
                          Salary range is competitive for senior roles
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {recruiterStep === 'published' && (
          <div className="text-center py-20">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">Job Published Successfully!</h2>
            <p className="text-slate-400">Finding matching candidates...</p>
          </div>
        )}

        {recruiterStep === 'matching' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Top AI Matches</h2>
                <p className="text-slate-400">AI-ranked candidates for your active job postings</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setRecruiterStep('dashboard')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm"
                >
                  View Dashboard
                </button>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                </button>
              </div>
            </div>

            {/* Job Summary Card */}
            <div className="glass-card rounded-xl p-6 border border-indigo-500/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">Senior Product Designer</h3>
                  <p className="text-slate-400 text-sm">San Francisco, CA • Full-time • $120k - $180k</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-400">124</div>
                  <div className="text-xs text-slate-500">Matches Found</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <span>Posted 3 days ago</span>
                <span>850 views</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="candidate-matches">
              {mockCandidates.map((candidate) => (
                <div key={candidate.id} className="glass-card rounded-xl p-6 hover:border-indigo-500/30 transition-colors candidate-card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-14 h-14 rounded-full"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-slate-950 rounded-full p-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-white">{candidate.name}</h3>
                        <BadgeCheck className="w-4 h-4 text-blue-400" />
                      </div>
                      <p className="text-slate-400 text-sm mb-1">{candidate.title}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {candidate.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {candidate.experience}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gradient mb-1">{candidate.matchScore}%</div>
                      <div className="text-xs text-slate-500">Match Score</div>
                      <div className={`text-xs px-2 py-1 rounded-full mt-2 ${
                        candidate.matchScore >= 95 ? 'bg-emerald-500/20 text-emerald-400' :
                        candidate.matchScore >= 90 ? 'bg-blue-500/20 text-blue-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {candidate.matchScore >= 95 ? 'Strong Match' :
                         candidate.matchScore >= 90 ? 'Great Fit' : 'Good Match'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-slate-400 mb-2">Key Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 4).map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 4 && (
                          <span className="px-2 py-1 bg-slate-700 text-slate-400 rounded text-xs">
                            +{candidate.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedCandidate(candidate);
                          setRecruiterStep('candidate-profile');
                        }}
                        className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Profile
                      </button>
                      <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg">
                        <Star className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Insights */}
            <div className="glass-card rounded-xl p-6 border border-indigo-500/30" data-testid="ai-insights">
              <div className="flex items-center gap-3 mb-4">
                <Bot className="w-6 h-6 text-indigo-400" />
                <h3 className="text-lg font-semibold text-white">AI Copilot Insights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-indigo-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-300">
                        Top candidates match 9/10 required skills. Adding "Motion Design" could increase matches by 15%.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-300">
                        Average response time: 2.3 hours. Sarah Chen viewed your job 30 minutes ago.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setRecruiterStep('shortlist')}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
              >
                View Shortlists
              </button>
              <button
                onClick={() => setRecruiterStep('post-job')}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
              >
                Post Another Job
              </button>
            </div>
          </div>
        )}

        {recruiterStep === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Recruiter Dashboard</h2>
                <p className="text-slate-400">Welcome back, Alex. Here's your hiring overview.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setRecruiterStep('settings')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Post Job
                </button>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-card p-6 rounded-xl text-center" data-testid="total-matches">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">124</div>
                <div className="text-xs text-slate-500">Total Matches</div>
              </div>
              <div className="glass-card p-6 rounded-xl text-center" data-testid="time-to-hire">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">18d</div>
                <div className="text-xs text-slate-500">Avg Time to Hire</div>
              </div>
              <div className="glass-card p-6 rounded-xl text-center" data-testid="shortlisted">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">48</div>
                <div className="text-xs text-slate-500">Shortlisted</div>
              </div>
              <div className="glass-card p-6 rounded-xl text-center" data-testid="success-rate">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">92%</div>
                <div className="text-xs text-slate-500">Success Rate</div>
              </div>
            </div>

            {/* Active Jobs */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Active Job Postings</h3>
              <div className="space-y-4">
                {mockJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{job.title}</h4>
                        <p className="text-slate-400 text-sm">{job.location} • {job.type} • {job.salary}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="text-white font-medium">{job.matches}</div>
                        <div className="text-slate-500">Matches</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-medium">{job.views}</div>
                        <div className="text-slate-500">Views</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs ${
                        job.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {job.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setRecruiterStep('onboarding')}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
              >
                Back to Onboarding
              </button>
              <button
                onClick={() => setRecruiterStep('matching')}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
              >
                Browse Candidates
              </button>
            </div>
          </div>
        )}

        {recruiterStep === 'candidate-profile' && selectedCandidate && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setRecruiterStep('matching')}
                className="text-slate-400 hover:text-white flex items-center gap-2"
              >
                ← Back to Matches
              </button>
              <div className="text-sm text-slate-500">
                Candidate Profile
              </div>
            </div>

            {/* Profile Header */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="relative">
                  <img
                    src={selectedCandidate.avatar}
                    alt={selectedCandidate.name}
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-slate-950 rounded-full p-1">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-semibold text-white">{selectedCandidate.name}</h1>
                    <BadgeCheck className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-slate-400 mb-3">{selectedCandidate.title}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-400" />
                      <span className="text-slate-300">{selectedCandidate.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-400" />
                      <span className="text-slate-300">{selectedCandidate.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-indigo-400" />
                      <span className="text-slate-300">{selectedCandidate.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient mb-1">{selectedCandidate.matchScore}%</div>
                    <div className="text-xs text-slate-500">Match Score</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact
                    </button>
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg">
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'experience', label: 'Experience', icon: Briefcase },
                { id: 'skills', label: 'Skills', icon: Target },
                { id: 'actions', label: 'Actions', icon: Zap },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="glass-card rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Professional Summary</h3>
                  <p className="text-slate-300 leading-relaxed">{selectedCandidate.summary}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-indigo-400" />
                      Certifications
                    </h3>
                    <div className="space-y-3">
                      {selectedCandidate.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-slate-300 text-sm">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Link className="w-5 h-5 text-indigo-400" />
                      Portfolio
                    </h3>
                    <a
                      href="#"
                      className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      {selectedCandidate.portfolio}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Work Experience</h3>
                <div className="space-y-6">
                  <div className="border-l-2 border-indigo-500 pl-6">
                    <h4 className="text-white font-medium">Senior UX Designer</h4>
                    <p className="text-indigo-400 text-sm mb-2">TechCorp Inc. • 2021 - Present</p>
                    <p className="text-slate-300 text-sm">
                      Led design for 5+ major product features, conducted user research with 200+ participants,
                      and established design system used across 10 teams.
                    </p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs">Figma</span>
                      <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs">User Research</span>
                      <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs">Design Systems</span>
                    </div>
                  </div>
                  <div className="border-l-2 border-slate-600 pl-6">
                    <h4 className="text-white font-medium">UX Designer</h4>
                    <p className="text-indigo-400 text-sm mb-2">StartupXYZ • 2019 - 2021</p>
                    <p className="text-slate-300 text-sm">
                      Designed mobile app interface used by 50K+ users, conducted A/B testing for feature optimization.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Skills & Expertise</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedCandidate.skills.map((skill, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-lg p-4">
                      <div className="text-sm font-medium text-white mb-2">{skill}</div>
                      <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-500 h-full rounded-full"
                          style={{ width: `${85 + Math.random() * 15}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Expert</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'actions' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm">
                        <Download className="w-4 h-4" />
                        Download Resume
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm">
                        <Star className="w-4 h-4" />
                        Add to Shortlist
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm">
                        <Mail className="w-4 h-4" />
                        Send Message
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm">
                        <Calendar className="w-4 h-4" />
                        Schedule Interview
                      </button>
                    </div>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <StickyNote className="w-5 h-5 text-indigo-400" />
                      Notes & Tags
                    </h3>
                    <div className="space-y-4">
                      <textarea
                        placeholder="Add private notes about this candidate..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 placeholder-slate-500 text-sm resize-none"
                        rows={3}
                      />
                      <div>
                        <div className="text-xs text-slate-400 mb-2">Tags</div>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                          <button className="px-2 py-1 text-slate-400 hover:text-white text-xs">
                            + Add Tag
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6 border border-indigo-500/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Match Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-400 mb-1">95%</div>
                      <div className="text-xs text-slate-500">Skills Match</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">92%</div>
                      <div className="text-xs text-slate-500">Experience Match</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">100%</div>
                      <div className="text-xs text-slate-500">Location Match</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {recruiterStep === 'shortlist' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Shortlists</h2>
                <p className="text-slate-400">Manage your shortlisted candidates organized by job posting</p>
              </div>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </button>
            </div>

            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Senior Product Designer</h3>
                      <p className="text-slate-400 text-sm">San Francisco, CA • Posted 3 days ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">3</div>
                    <div className="text-xs text-slate-500">Candidates</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockCandidates.slice(0, 3).map((candidate) => (
                    <div key={candidate.id} className="bg-slate-800/50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={candidate.avatar}
                            alt={candidate.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h4 className="text-sm font-semibold text-white">{candidate.name}</h4>
                            <p className="text-xs text-slate-500">{candidate.title}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          candidate.status === 'shortlisted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {candidate.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-slate-500">Match:</span>
                        <span className="text-sm font-bold text-gradient">{candidate.matchScore}%</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            setRecruiterStep('candidate-profile');
                          }}
                          className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs"
                        >
                          View
                        </button>
                        <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setRecruiterStep('matching')}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
              >
                Back to Matches
              </button>
              <button
                onClick={() => setRecruiterStep('dashboard')}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
              >
                View Dashboard
              </button>
            </div>
          </div>
        )}

        {recruiterStep === 'settings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Settings</h2>
                <p className="text-slate-400">Manage your account, company, and preferences</p>
              </div>
              <button
                onClick={() => setRecruiterStep('dashboard')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm"
              >
                Back to Dashboard
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-lg">
                  <User className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-sm font-medium">Account</div>
                    <div className="text-xs opacity-70">Profile & authentication</div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg">
                  <Building className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-sm font-medium">Company</div>
                    <div className="text-xs opacity-70">Profile & branding</div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg">
                  <Users className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-sm font-medium">Team</div>
                    <div className="text-xs opacity-70">Collaboration & workflow</div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg">
                  <Bell className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-sm font-medium">Notifications</div>
                    <div className="text-xs opacity-70">Alerts & preferences</div>
                  </div>
                </button>
              </div>

              <div className="lg:col-span-2">
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-6 h-6 text-indigo-400" />
                    <h3 className="text-lg font-semibold text-white">Account Settings</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue="Alex Thompson"
                          className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="alex@cyberdyne.com"
                          className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-white">Two-Factor Authentication</div>
                        <div className="text-xs text-slate-500">Add extra security to your account</div>
                      </div>
                      <div className="relative inline-block w-10 h-6 align-middle select-none">
                        <input type="checkbox" defaultChecked className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1" />
                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer"></label>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAuthFlow = () => (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-md mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <div className="text-white font-bold text-xl">AI</div>
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">Welcome to CareerForge</h1>
          <p className="text-slate-400">Sign in to your account or create a new one</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setUserType('job-seeker')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              userType === 'job-seeker'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Job Seeker
          </button>
          <button
            onClick={() => setUserType('recruiter')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              userType === 'recruiter'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Recruiter
          </button>
        </div>

        {authStep === 'login' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-slate-700" />
                <span className="text-sm text-slate-400">Remember me</span>
              </label>
              <button
                onClick={() => setAuthStep('forgot-password')}
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                Forgot password?
              </button>
            </div>
            <button
              onClick={handleLogin}
              disabled={authLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium disabled:opacity-50"
            >
              {authLoading ? 'Signing in...' : 'Sign In'}
            </button>
            <button
              onClick={() => setAuthStep('signup')}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium"
            >
              Create Account
            </button>
          </div>
        )}

        {authStep === 'signup' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
            <button
              onClick={handleSignup}
              disabled={authLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium disabled:opacity-50"
            >
              {authLoading ? 'Creating account...' : 'Create Account'}
            </button>
            <button
              onClick={() => setAuthStep('login')}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium"
            >
              Back to Sign In
            </button>
          </div>
        )}

        {authStep === 'forgot-password' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="name@company.com"
              />
            </div>
            <button
              onClick={handleForgotPassword}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
            >
              Send Reset Link
            </button>
            <button
              onClick={() => setAuthStep('login')}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium"
            >
              Back to Sign In
            </button>
          </div>
        )}

        {authStep === 'reset-password' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
            <button
              onClick={handleResetPassword}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
            >
              Reset Password
            </button>
          </div>
        )}

        {authStep === 'email-verification' && (
          <div className="space-y-4">
            <div className="text-center">
              <Mail className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Check your email</h3>
              <p className="text-slate-400 text-sm">We've sent a verification link to your email address</p>
            </div>
            <button
              onClick={handleEmailVerification}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
            >
              Continue
            </button>
          </div>
        )}

        {authStep === 'two-factor' && (
          <div className="space-y-4">
            <div className="text-center">
              <ShieldCheck className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Two-Factor Authentication</h3>
              <p className="text-slate-400 text-sm">Enter the 6-digit code from your authenticator app</p>
            </div>
            <div className="flex gap-2 justify-center">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center bg-slate-800 border border-slate-700 rounded-lg text-white text-xl font-bold focus:outline-none focus:border-indigo-500"
                />
              ))}
            </div>
            <button
              onClick={handleTwoFactorSetup}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
            >
              Verify Code
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {currentStep === 'auth' && renderAuthFlow()}
      {currentStep === 'homepage' && renderHomepage()}
      {currentStep === 'job-seeker-flow' && renderJobSeekerFlow()}
      {currentStep === 'recruiter-flow' && renderRecruiterFlow()}
    </div>
  );
}