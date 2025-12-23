// UI Components
export { default as Button } from './ui/Button';
export { default as Modal } from './ui/Modal';
export { default as Input } from './ui/Input';
export { default as Select } from './ui/Select';
export { default as Textarea } from './ui/Textarea';
export { default as Checkbox } from './ui/Checkbox';
export { default as Radio } from './ui/Radio';

// Layout Components
export { default as Header } from './layout/Header';
export { default as Footer } from './layout/Footer';
export { default as OnboardingHeader } from './layout/OnboardingHeader';
export { default as OnboardingFooter } from './layout/OnboardingFooter';
export { default as AuthLayout } from './layout/AuthLayout';

// Section Components
export { default as Hero } from './sections/Hero';
export { default as HeroDemo } from './sections/HeroDemo';
export { default as ValueProposition } from './sections/ValueProposition';
export { default as FeaturesGrid } from './sections/FeaturesGrid';
export { default as Testimonials } from './sections/Testimonials';
export { default as CallToAction } from './sections/CallToAction';

// Dashboard Components
export { KPICards } from './dashboard/KPICards';
export { ActiveJobs } from './dashboard/ActiveJobs';
export { RecentShortlists } from './dashboard/RecentShortlists';
export { ActivityFeed } from './dashboard/ActivityFeed';
export { NotificationsPanel } from './dashboard/NotificationsPanel';

// Job Seeker Components
export { AICareerCoach } from './job-seeker/AICareerCoach';
export { ApplicationsTracker } from './job-seeker/ApplicationsTracker';
export { CareerPathVisualization } from './job-seeker/CareerPathVisualization';
export { ProfileCompletionCard } from './job-seeker/ProfileCompletionCard';
export { ResumeHealthCard } from './job-seeker/ResumeHealthCard';
export { SkillGapAnalysis } from './job-seeker/SkillGapAnalysis';

// Recruiter Components
export { AIHiringCopilot } from './recruiter/AIHiringCopilot';
export { AISuggestionsPanel } from './recruiter/AISuggestionsPanel';
export { ResumeAnalysis } from './recruiter/ResumeAnalysis';
export { ResumeEditor } from './recruiter/ResumeEditor';
export { TemplateSelector } from './recruiter/TemplateSelector';

// Shared Components
export { ToastProvider, useToast } from './shared/ToastContext';
export { ThemeProvider, useTheme } from './shared/ThemeProvider';
export { default as MessagingInbox } from './shared/MessagingInbox';
export { default as Settings } from './shared/Settings';
export { default as Contributors } from './shared/Contributors';
export { PremiumUpsell } from './shared/PremiumUpsell';

// Types
export * from './types';
