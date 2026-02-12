'use client';

import { useState } from 'react';
import { Button, Input, Select, Checkbox } from '@/components';
import {
  Sparkles,
  Building2,
  Cpu,
  MessageSquare,
  Bell,
  User,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
  Plus,
  UploadCloud,
  MapPin,
  ChevronDown,
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  Calendar,
  Mail,
  MessageCircle,
  Clock,
  Settings,
  Zap,
  FileText,
  Send,
  ToggleLeft,
  ToggleRight,
  Users,
  Target,
  Workflow,
  Share2,
  Crown,
  UserCheck,
  UserCog,
} from 'lucide-react';

export default function RecruiterOnboarding() {
  const [smartFiltering, setSmartFiltering] = useState(false);
  const [matchScore, setMatchScore] = useState(85);
  const [prioritySignals, setPrioritySignals] = useState({
    technicalSkills: true,
    cultureFit: false,
    experience: true,
  });

  // Team Preferences State
  const [teamPreferencesExpanded, setTeamPreferencesExpanded] = useState(false);
  const [teamPreferencesCompleted, setTeamPreferencesCompleted] =
    useState(false);
  const [hiringGoals, setHiringGoals] = useState({
    departments: [] as string[],
    roles: [] as string[],
    hiringVolume: '',
  });
  const [teamMembers, setTeamMembers] = useState(
    [] as Array<{
      email: string;
      role: 'admin' | 'hiring-manager' | 'assistant';
      name?: string;
    }>
  );
  const [workflowPreferences, setWorkflowPreferences] = useState({
    shortlistType: 'centralized' as 'centralized' | 'individual',
    requireApproval: false,
  });
  const [communicationRules, setCommunicationRules] = useState({
    sharedInbox: true,
    routeToAll: false,
  });

  // Communication Tools State
  const [communicationExpanded, setCommunicationExpanded] = useState(false);
  const [calendarSync, setCalendarSync] = useState({
    enabled: false,
    provider: 'google' as 'google' | 'outlook',
  });
  const [messagingEnabled, setMessagingEnabled] = useState(false);
  const [messagingMode, setMessagingMode] = useState<
    'recruiter-only' | 'bidirectional'
  >('recruiter-only');
  const [notificationSettings, setNotificationSettings] = useState({
    messages: true,
    confirmations: true,
    updates: false,
    filter: 'all' as 'all' | 'unread' | 'candidates' | 'jobs',
  });
  const [smartScheduling, setSmartScheduling] = useState(false);

  const handlePriorityChange = (key: keyof typeof prioritySignals) => {
    setPrioritySignals((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="onboarding-body text-slate-400 min-h-screen flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a
              href="/recruiter/recruiter-dashboard"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mr-4"
            >
              <ArrowRight className="rotate-180" size={16} />
              <span className="text-sm">Back to Dashboard</span>
            </a>
            <a
              href="/recruiter/recruiter-dashboard"
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="text-white" size={18} />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white group-hover:text-indigo-100 transition-colors">
                AI Career
              </span>
            </a>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Post Job
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Candidates
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Shortlists
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer hover:bg-slate-800/50 p-2 rounded-full transition-colors">
              <Bell className="text-slate-400" size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-950"></span>
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-medium text-white">Sarah Connor</p>
                <p className="text-[10px] text-slate-500">Cyberdyne Systems</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden cursor-pointer">
                <User className="text-slate-400" size={16} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 p-6 md:p-10 pt-12">
        {/* LEFT: Progress Stepper */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-28 fade-in">
            <h2 className="text-sm font-semibold text-white tracking-tight mb-6">
              Setup Guide
            </h2>

            <div className="relative pl-4 border-l border-slate-800 space-y-8">
              {/* Step 1: Active */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-indigo-500/10"></div>
                <h3 className="text-sm font-medium text-indigo-400">
                  Company Profile
                </h3>
                <p className="text-xs text-slate-500 mt-1">Brand & identity</p>
              </div>

              {/* Step 2: Team Preferences */}
              <div className="relative">
                <div
                  className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ${
                    teamPreferencesCompleted
                      ? 'bg-green-500 ring-4 ring-green-500/10'
                      : 'bg-slate-700 border border-slate-900'
                  }`}
                ></div>
                <h3
                  className={`text-sm font-medium ${teamPreferencesCompleted ? 'text-green-400' : 'text-slate-300'}`}
                >
                  Team Preferences
                  {teamPreferencesCompleted && (
                    <Check className="inline ml-1" size={12} />
                  )}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Goals & collaboration
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-900"></div>
                <h3 className="text-sm font-medium text-slate-500">
                  Candidate Matching
                </h3>
                <p className="text-xs text-slate-600 mt-1">AI configuration</p>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-900"></div>
                <h3 className="text-sm font-medium text-slate-500">
                  Communication
                </h3>
                <p className="text-xs text-slate-600 mt-1">Integrations</p>
              </div>
            </div>

            <div className="mt-10 p-4 rounded-xl bg-gradient-to-b from-slate-900 to-slate-900/50 border border-slate-800/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-300">
                  Completion
                </span>
                <span className="text-xs font-medium text-indigo-400">15%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-indigo-500 h-1.5 rounded-full w-[15%]"></div>
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER: Onboarding Form Feed */}
        <section className="col-span-1 lg:col-span-6 space-y-8">
          <div className="fade-in">
            <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">
              Launch your hiring engine
            </h1>
            <p className="text-slate-500 text-sm">
              Configure your environment to attract top 1% talent automatically.
            </p>
          </div>

          {/* STEP 1: Company Profile (Active/Expanded) */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm glow-border transition-all duration-300 fade-in delay-100">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-800/50 pb-4">
              <Building2 className="text-indigo-500" size={20} />
              <h2 className="text-base font-medium text-white">
                Company Profile
              </h2>
              <span className="ml-auto text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20">
                Active Step
              </span>
            </div>

            <div className="space-y-5">
              {/* Logo Upload */}
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-xl bg-slate-900 border border-dashed border-slate-600 hover:border-indigo-500 hover:bg-slate-800/50 flex flex-col items-center justify-center cursor-pointer transition-all group">
                  <UploadCloud
                    className="text-slate-500 group-hover:text-indigo-400"
                    size={20}
                  />
                  <span className="text-[10px] text-slate-500 mt-1 group-hover:text-slate-300">
                    Logo
                  </span>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value="Cyberdyne Systems"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-slate-600 shadow-sm"
                    placeholder="e.g. Acme Inc."
                  />
                </div>
              </div>

              {/* Grid Inputs */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Industry
                  </label>
                  <div className="relative">
                    <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer">
                      <option>Artificial Intelligence</option>
                      <option>Fintech</option>
                      <option>Health</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-3 text-slate-600 pointer-events-none"
                      size={14}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Company Size
                  </label>
                  <div className="relative">
                    <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer">
                      <option>50-100 Employees</option>
                      <option>100-500 Employees</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-3 text-slate-600 pointer-events-none"
                      size={14}
                    />
                  </div>
                </div>
              </div>

              {/* Location with Icon */}
              <div className="relative">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Headquarters
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-2.5 text-slate-500"
                    size={16}
                  />
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <Button className="w-full mt-2 bg-white hover:bg-slate-200 text-slate-950 text-sm font-medium py-2.5 rounded-lg shadow-lg shadow-white/5 transition-colors flex items-center justify-center gap-2">
                Save Company Profile
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>

          {/* STEP 2: Team Preferences (Expandable) */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl backdrop-blur-sm transition-all duration-300 fade-in delay-200 overflow-hidden">
            {/* Header - Always Visible */}
            <div
              className="p-6 cursor-pointer hover:border-slate-700 transition-all group"
              onClick={() =>
                setTeamPreferencesExpanded(!teamPreferencesExpanded)
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users
                    className="text-slate-500 group-hover:text-teal-400 transition-colors"
                    size={20}
                  />
                  <div>
                    <h2 className="text-base font-medium text-slate-300 group-hover:text-white transition-colors flex items-center gap-2">
                      Team Preferences
                      {teamPreferencesCompleted && (
                        <Check className="text-green-500" size={16} />
                      )}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Define hiring goals & collaboration
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`text-slate-600 group-hover:text-slate-400 transition-transform duration-300 ${teamPreferencesExpanded ? 'rotate-90' : ''}`}
                  size={16}
                />
              </div>
            </div>

            {/* Expandable Content */}
            <div
              className={`transition-all duration-500 ease-in-out ${teamPreferencesExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            >
              <div className="px-6 pb-6 space-y-8">
                {/* A. Hiring Goals */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Target className="text-indigo-500" size={18} />
                    <h3 className="text-sm font-medium text-white">
                      Hiring Goals
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500">
                    Tailor AI matches to your team's mission
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">
                        Departments
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Engineering',
                          'Marketing',
                          'Sales',
                          'Product',
                          'Design',
                          'Operations',
                        ].map((dept) => (
                          <button
                            key={dept}
                            onClick={() =>
                              setHiringGoals((prev) => ({
                                ...prev,
                                departments: prev.departments.includes(dept)
                                  ? prev.departments.filter((d) => d !== dept)
                                  : [...prev.departments, dept],
                              }))
                            }
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                              hiringGoals.departments.includes(dept)
                                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50'
                                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                            }`}
                          >
                            {dept}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">
                        Key Roles
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Software Engineer',
                          'Product Manager',
                          'Designer',
                          'Data Scientist',
                          'DevOps Engineer',
                          'QA Engineer',
                        ].map((role) => (
                          <button
                            key={role}
                            onClick={() =>
                              setHiringGoals((prev) => ({
                                ...prev,
                                roles: prev.roles.includes(role)
                                  ? prev.roles.filter((r) => r !== role)
                                  : [...prev.roles, role],
                              }))
                            }
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                              hiringGoals.roles.includes(role)
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">
                        Monthly Hiring Volume
                      </label>
                      <input
                        type="number"
                        value={hiringGoals.hiringVolume}
                        onChange={(e) =>
                          setHiringGoals((prev) => ({
                            ...prev,
                            hiringVolume: e.target.value,
                          }))
                        }
                        placeholder="e.g. 5"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                      />
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium py-2 rounded-lg transition-colors">
                      Save Hiring Goals
                    </button>
                  </div>
                </div>

                {/* B. Team Collaboration */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Share2 className="text-teal-500" size={18} />
                    <h3 className="text-sm font-medium text-white">
                      Team Collaboration
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500">
                    Collaborate seamlessly with your hiring team
                  </p>

                  <div className="space-y-4">
                    {/* Current Team Members */}
                    {teamMembers.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-slate-400">
                          Current team members:
                        </p>
                        {teamMembers.map((member, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                                <User size={14} className="text-slate-400" />
                              </div>
                              <div>
                                <p className="text-xs font-medium text-white">
                                  {member.name || member.email}
                                </p>
                                <p className="text-[10px] text-slate-500">
                                  {member.email}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {member.role === 'admin' && (
                                <Crown size={12} className="text-yellow-500" />
                              )}
                              <span className="text-[10px] text-slate-400 capitalize">
                                {member.role.replace('-', ' ')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Team Member */}
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                      <p className="text-xs text-slate-400">
                        Invite new team member:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="email"
                          placeholder="Email address"
                          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const email = (e.target as HTMLInputElement)
                                .value;
                              if (email) {
                                setTeamMembers((prev) => [
                                  ...prev,
                                  { email, role: 'assistant' },
                                ]);
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                        />
                        <select
                          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-teal-500/50 appearance-none cursor-pointer"
                          defaultValue="assistant"
                        >
                          <option value="admin">Admin Recruiter</option>
                          <option value="hiring-manager">Hiring Manager</option>
                          <option value="assistant">Recruiter Assistant</option>
                        </select>
                        <button className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium py-2 px-4 rounded-lg transition-colors">
                          Invite
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-800/30 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <UserCheck
                          className="text-slate-400 mt-0.5"
                          size={14}
                        />
                        <div className="text-xs text-slate-400">
                          <p className="font-medium text-slate-300 mb-1">
                            Role Permissions:
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <strong className="text-yellow-400">
                                Admin:
                              </strong>{' '}
                              Full access to all features
                            </li>
                            <li>
                              <strong className="text-blue-400">
                                Hiring Manager:
                              </strong>{' '}
                              Review candidates, shortlist, no job posting
                            </li>
                            <li>
                              <strong className="text-green-400">
                                Assistant:
                              </strong>{' '}
                              Message candidates, schedule interviews
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* C. Workflow Preferences */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Workflow className="text-amber-500" size={18} />
                    <h3 className="text-sm font-medium text-white">
                      Workflow Preferences
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500">
                    Align the platform with your hiring process
                  </p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-400 mb-2">
                        Shortlist management:
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            setWorkflowPreferences((prev) => ({
                              ...prev,
                              shortlistType: 'centralized',
                            }))
                          }
                          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                            workflowPreferences.shortlistType === 'centralized'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          Centralized Shortlist
                        </button>
                        <button
                          onClick={() =>
                            setWorkflowPreferences((prev) => ({
                              ...prev,
                              shortlistType: 'individual',
                            }))
                          }
                          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                            workflowPreferences.shortlistType === 'individual'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          Individual Shortlists
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-200">
                          Require Hiring Manager Approval
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Before interview scheduling
                        </p>
                      </div>
                      <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                        <input
                          type="checkbox"
                          checked={workflowPreferences.requireApproval}
                          onChange={() =>
                            setWorkflowPreferences((prev) => ({
                              ...prev,
                              requireApproval: !prev.requireApproval,
                            }))
                          }
                          className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                        />
                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                      </div>
                    </div>

                    <button className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium py-2 rounded-lg transition-colors">
                      Save Workflow Preferences
                    </button>
                  </div>
                </div>

                {/* D. Communication Rules */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="text-rose-500" size={18} />
                    <h3 className="text-sm font-medium text-white">
                      Communication Rules
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500">
                    Ensure no candidate message is missed
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-200">
                          Shared Messaging Inbox
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          All team members see candidate messages
                        </p>
                      </div>
                      <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                        <input
                          type="checkbox"
                          checked={communicationRules.sharedInbox}
                          onChange={() =>
                            setCommunicationRules((prev) => ({
                              ...prev,
                              sharedInbox: !prev.sharedInbox,
                            }))
                          }
                          className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                        />
                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-200">
                          Route to All Recruiters
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Notifications go to entire team
                        </p>
                      </div>
                      <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                        <input
                          type="checkbox"
                          checked={communicationRules.routeToAll}
                          onChange={() =>
                            setCommunicationRules((prev) => ({
                              ...prev,
                              routeToAll: !prev.routeToAll,
                            }))
                          }
                          className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                        />
                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                      </div>
                    </div>

                    <button
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium py-2 rounded-lg transition-colors"
                      onClick={() => setTeamPreferencesCompleted(true)}
                    >
                      Save Communication Rules
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: AI Matching (Visual Preview) */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm glow-border transition-all duration-300 fade-in delay-200">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-800/50 pb-4">
              <Cpu className="text-purple-500" size={20} />
              <h2 className="text-base font-medium text-white">
                AI Candidate Matching
              </h2>
            </div>

            <div className="space-y-6">
              {/* Custom Toggle Item */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-slate-200">
                    Smart Filtering
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Auto-hide candidates below match threshold
                  </p>
                </div>
                {/* Custom Toggle Component */}
                <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    checked={smartFiltering}
                    onChange={() => setSmartFiltering(!smartFiltering)}
                    className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                  />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                </div>
              </div>

              {/* Custom Slider Item */}
              <div>
                <div className="flex justify-between mb-3">
                  <h3 className="text-sm font-medium text-slate-200">
                    Minimum Match Score
                  </h3>
                  <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                    {matchScore}%
                  </span>
                </div>
                <div className="relative w-full h-1.5 bg-slate-800 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${matchScore}%` }}
                  ></div>
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-100 rounded-full border-2 border-slate-900 shadow-lg cursor-grab hover:scale-110 transition-transform"
                    style={{ left: `${matchScore}%` }}
                    onMouseDown={(e) => {
                      const slider = e.currentTarget.parentElement!;
                      const handleMouseMove = (e: MouseEvent) => {
                        const rect = slider.getBoundingClientRect();
                        const percent = Math.min(
                          100,
                          Math.max(
                            0,
                            ((e.clientX - rect.left) / rect.width) * 100
                          )
                        );
                        setMatchScore(Math.round(percent));
                      };
                      const handleMouseUp = () => {
                        document.removeEventListener(
                          'mousemove',
                          handleMouseMove
                        );
                        document.removeEventListener('mouseup', handleMouseUp);
                      };
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-slate-600 font-medium">
                  <span>Loose</span>
                  <span>Strict</span>
                </div>
              </div>

              {/* Custom Checkboxes */}
              <div className="pt-2">
                <label className="block text-xs font-medium text-slate-300 mb-3">
                  Priority Signals
                </label>
                <div className="flex flex-wrap gap-3">
                  <label className="cursor-pointer group relative">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={prioritySignals.technicalSkills}
                      onChange={() => handlePriorityChange('technicalSkills')}
                    />
                    <div className="px-3 py-1.5 rounded-md border border-slate-700 bg-slate-900/50 text-xs text-slate-400 peer-checked:bg-purple-500/10 peer-checked:text-purple-300 peer-checked:border-purple-500/50 transition-all flex items-center gap-2">
                      <Check
                        className="opacity-0 peer-checked:opacity-100 transition-opacity"
                        size={10}
                      />
                      Technical Skills
                    </div>
                  </label>
                  <label className="cursor-pointer group relative">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={prioritySignals.cultureFit}
                      onChange={() => handlePriorityChange('cultureFit')}
                    />
                    <div className="px-3 py-1.5 rounded-md border border-slate-700 bg-slate-900/50 text-xs text-slate-400 peer-checked:bg-purple-500/10 peer-checked:text-purple-300 peer-checked:border-purple-500/50 transition-all flex items-center gap-2">
                      <Check
                        className="opacity-0 peer-checked:opacity-100 transition-opacity"
                        size={10}
                      />
                      Culture Fit
                    </div>
                  </label>
                  <label className="cursor-pointer group relative">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={prioritySignals.experience}
                      onChange={() => handlePriorityChange('experience')}
                    />
                    <div className="px-3 py-1.5 rounded-md border border-slate-700 bg-slate-900/50 text-xs text-slate-400 peer-checked:bg-purple-500/10 peer-checked:text-purple-300 peer-checked:border-purple-500/50 transition-all flex items-center gap-2">
                      <Check
                        className="opacity-0 peer-checked:opacity-100 transition-opacity"
                        size={10}
                      />
                      Experience
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 5: Communication Tools (Expandable) */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl backdrop-blur-sm transition-all duration-300 fade-in delay-300 overflow-hidden">
            {/* Header - Always Visible */}
            <div
              className="p-6 cursor-pointer hover:border-slate-700 transition-all group"
              onClick={() => setCommunicationExpanded(!communicationExpanded)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare
                    className="text-slate-500 group-hover:text-teal-400 transition-colors"
                    size={20}
                  />
                  <div>
                    <h2 className="text-base font-medium text-slate-300 group-hover:text-white transition-colors">
                      Communication Tools
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Calendar sync & email templates
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`text-slate-600 group-hover:text-slate-400 transition-transform duration-300 ${communicationExpanded ? 'rotate-90' : ''}`}
                  size={16}
                />
              </div>
            </div>

            {/* Expandable Content */}
            <div
              className={`transition-all duration-500 ease-in-out ${communicationExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            >
              <div className="px-6 pb-6 space-y-8">
                {/* A. Calendar Sync */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-indigo-500" size={18} />
                    <h3 className="text-sm font-medium text-white">
                      Calendar Integration
                    </h3>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-200">
                        Enable Calendar Integration
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Sync interviews directly with your calendar
                      </p>
                    </div>
                    <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        checked={calendarSync.enabled}
                        onChange={() =>
                          setCalendarSync((prev) => ({
                            ...prev,
                            enabled: !prev.enabled,
                          }))
                        }
                        className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                      />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                    </div>
                  </div>

                  {calendarSync.enabled && (
                    <div className="space-y-3 pl-4 border-l border-slate-800">
                      <p className="text-xs text-slate-400">
                        Choose your calendar provider:
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            setCalendarSync((prev) => ({
                              ...prev,
                              provider: 'google',
                            }))
                          }
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                            calendarSync.provider === 'google'
                              ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                              : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'
                          }`}
                        >
                          <span className="text-sm">📅</span>
                          <span className="text-xs font-medium">
                            Google Calendar
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            setCalendarSync((prev) => ({
                              ...prev,
                              provider: 'outlook',
                            }))
                          }
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                            calendarSync.provider === 'outlook'
                              ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                              : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'
                          }`}
                        >
                          <span className="text-sm">📧</span>
                          <span className="text-xs font-medium">Outlook</span>
                        </button>
                      </div>
                      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium py-2 rounded-lg transition-colors">
                        Connect Calendar
                      </button>
                    </div>
                  )}
                </div>

                {/* B. Email Templates */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-purple-500" size={18} />
                    <h3 className="text-sm font-medium text-white">
                      Email Templates
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500">
                    Save time with AI-generated recruiter emails
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Interview Invitation', icon: '📅' },
                      { name: 'Follow-Up Reminder', icon: '⏰' },
                      { name: 'Offer Letter', icon: '📄' },
                      { name: 'Rejection/Feedback', icon: '💬' },
                    ].map((template) => (
                      <div
                        key={template.name}
                        className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 hover:border-slate-600 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm">{template.icon}</span>
                          <span className="text-xs font-medium text-slate-300 group-hover:text-white">
                            {template.name}
                          </span>
                        </div>
                        <button className="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium">
                          Customize →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* C. Messaging Preferences */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="text-teal-500" size={18} />
                    <h3 className="text-sm font-medium text-white">
                      Messaging Inbox
                    </h3>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-200">
                        Enable Messaging Inbox
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Centralize candidate communication
                      </p>
                    </div>
                    <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        checked={messagingEnabled}
                        onChange={() => setMessagingEnabled(!messagingEnabled)}
                        className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                      />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                    </div>
                  </div>

                  {messagingEnabled && (
                    <div className="space-y-3 pl-4 border-l border-slate-800">
                      <p className="text-xs text-slate-400">Messaging mode:</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setMessagingMode('recruiter-only')}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                            messagingMode === 'recruiter-only'
                              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50'
                              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          Recruiter Only
                        </button>
                        <button
                          onClick={() => setMessagingMode('bidirectional')}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                            messagingMode === 'bidirectional'
                              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50'
                              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          Bidirectional
                        </button>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-slate-400">
                          Notification settings:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings.messages}
                              onChange={() =>
                                setNotificationSettings((prev) => ({
                                  ...prev,
                                  messages: !prev.messages,
                                }))
                              }
                              className="w-3 h-3 rounded border-slate-600 text-teal-500 focus:ring-teal-500"
                            />
                            <span className="text-xs text-slate-400">
                              In-app
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings.confirmations}
                              onChange={() =>
                                setNotificationSettings((prev) => ({
                                  ...prev,
                                  confirmations: !prev.confirmations,
                                }))
                              }
                              className="w-3 h-3 rounded border-slate-600 text-teal-500 focus:ring-teal-500"
                            />
                            <span className="text-xs text-slate-400">
                              Email
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings.updates}
                              onChange={() =>
                                setNotificationSettings((prev) => ({
                                  ...prev,
                                  updates: !prev.updates,
                                }))
                              }
                              className="w-3 h-3 rounded border-slate-600 text-teal-500 focus:ring-teal-500"
                            />
                            <span className="text-xs text-slate-400">Push</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* D. Interview Scheduling Tools */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="text-amber-500" size={18} />
                    <h3 className="text-sm font-medium text-white">
                      Interview Scheduling
                    </h3>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-200">
                        Enable Smart Scheduling
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        AI suggests optimal interview times
                      </p>
                    </div>
                    <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        checked={smartScheduling}
                        onChange={() => setSmartScheduling(!smartScheduling)}
                        className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                      />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                    </div>
                  </div>

                  {smartScheduling && (
                    <div className="pl-4 border-l border-slate-800 space-y-3">
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-xs text-slate-300 mb-2">
                          📅 Next available slots:
                        </p>
                        <div className="space-y-1">
                          <div className="text-[10px] text-slate-400">
                            Tomorrow 2:00 PM - 3:00 PM
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Wednesday 10:00 AM - 11:00 AM
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Thursday 4:00 PM - 5:00 PM
                          </div>
                        </div>
                      </div>
                      <button className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium py-2 rounded-lg transition-colors">
                        Send Scheduling Link
                      </button>
                    </div>
                  )}
                </div>

                {/* E. Notification Settings */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Settings className="text-rose-500" size={18} />
                    <h3 className="text-sm font-medium text-white">
                      Notification Preferences
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500">
                    Stay informed without being overwhelmed
                  </p>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-300">
                          Candidate Messages
                        </span>
                        <div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
                          <input
                            type="checkbox"
                            checked={notificationSettings.messages}
                            onChange={() =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                messages: !prev.messages,
                              }))
                            }
                            className="toggle-checkbox absolute block w-3 h-3 rounded-full bg-white border-2 appearance-none cursor-pointer left-0.5 top-0.5 transition-all duration-300"
                          />
                          <label className="toggle-label block overflow-hidden h-4 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-300">
                          Interview Confirmations
                        </span>
                        <div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
                          <input
                            type="checkbox"
                            checked={notificationSettings.confirmations}
                            onChange={() =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                confirmations: !prev.confirmations,
                              }))
                            }
                            className="toggle-checkbox absolute block w-3 h-3 rounded-full bg-white border-2 appearance-none cursor-pointer left-0.5 top-0.5 transition-all duration-300"
                          />
                          <label className="toggle-label block overflow-hidden h-4 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-300">
                          Job Posting Updates
                        </span>
                        <div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
                          <input
                            type="checkbox"
                            checked={notificationSettings.updates}
                            onChange={() =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                updates: !prev.updates,
                              }))
                            }
                            className="toggle-checkbox absolute block w-3 h-3 rounded-full bg-white border-2 appearance-none cursor-pointer left-0.5 top-0.5 transition-all duration-300"
                          />
                          <label className="toggle-label block overflow-hidden h-4 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 mb-2">
                        Filter notifications:
                      </p>
                      <div className="flex gap-2">
                        {[
                          { value: 'all', label: 'All' },
                          { value: 'unread', label: 'Unread' },
                          { value: 'candidates', label: 'Candidates' },
                          { value: 'jobs', label: 'Jobs' },
                        ].map((filter) => (
                          <button
                            key={filter.value}
                            onClick={() =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                filter: filter.value as any,
                              }))
                            }
                            className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                              notificationSettings.filter === filter.value
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                            }`}
                          >
                            {filter.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium py-2 rounded-lg transition-colors">
                      Save Notification Preferences
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: AI Insights Panel */}
        <aside className="col-span-1 lg:col-span-3">
          <div className="sticky top-28 fade-in delay-200">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="text-indigo-400 animate-pulse" size={18} />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                AI Copilot
              </h2>
            </div>

            {/* Communication Insight Card 1 */}
            <div className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 border border-teal-500/20 rounded-xl p-4 mb-4 backdrop-blur-sm">
              <div className="flex gap-3">
                <div className="mt-1 min-w-[16px]">
                  <Calendar className="text-teal-400" size={16} />
                </div>
                <div>
                  <p className="text-xs text-teal-100 font-medium leading-relaxed mb-2">
                    Adding calendar sync reduces scheduling conflicts by{' '}
                    <span className="text-teal-300">25%</span>.
                  </p>
                  <button className="text-[10px] font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1 transition-colors">
                    Enable sync
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>

            {/* Communication Insight Card 2 */}
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-xl p-4 mb-4 backdrop-blur-sm">
              <div className="flex gap-3">
                <div className="mt-1 min-w-[16px]">
                  <Zap className="text-purple-400" size={16} />
                </div>
                <div>
                  <p className="text-xs text-purple-100 font-medium leading-relaxed mb-2">
                    AI email templates save{' '}
                    <span className="text-purple-300">15 minutes</span> per
                    candidate outreach.
                  </p>
                  <button className="text-[10px] font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                    Customize templates
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>

            {/* Team Insight Card */}
            <div className="bg-gradient-to-br from-teal-900/20 to-emerald-900/20 border border-teal-500/20 rounded-xl p-4 mb-4 backdrop-blur-sm">
              <div className="flex gap-3">
                <div className="mt-1 min-w-[16px]">
                  <Users className="text-teal-400" size={16} />
                </div>
                <div>
                  <p className="text-xs text-teal-100 font-medium leading-relaxed mb-2">
                    Team collaboration increases hiring success by{' '}
                    <span className="text-teal-300">35%</span> through shared
                    insights.
                  </p>
                  <button className="text-[10px] font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1 transition-colors">
                    Invite team
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>

            {/* Communication Insight Card 3 */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 mb-4">
              <div className="flex gap-3">
                <div className="mt-1 min-w-[16px]">
                  <MessageCircle className="text-slate-400" size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    Centralized messaging improves response time by 40%.
                  </p>
                  <button className="text-[10px] font-medium text-slate-500 hover:text-slate-300 border border-slate-700 rounded px-2 py-1 transition-all">
                    Enable inbox
                  </button>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-800/50">
              <h3 className="text-[11px] font-semibold text-slate-500 uppercase mb-3">
                Quick Actions
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between group cursor-pointer">
                  <span className="text-xs text-slate-400 group-hover:text-white transition-colors">
                    Import from LinkedIn
                  </span>
                  <ExternalLink
                    className="text-slate-600 group-hover:text-slate-400"
                    size={12}
                  />
                </li>
                <li className="flex items-center justify-between group cursor-pointer">
                  <span className="text-xs text-slate-400 group-hover:text-white transition-colors">
                    Invite Team Members
                  </span>
                  <Plus
                    className="text-slate-600 group-hover:text-slate-400"
                    size={12}
                  />
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800/60 bg-gradient-to-b from-slate-950 to-slate-925 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-xs text-slate-500 font-medium">
              System Operational
            </span>
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
            >
              Help Center
            </a>
            <a
              href="#"
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
            >
              Terms
            </a>
          </div>
          <p className="text-xs text-slate-700">© 2024 AI Career Platform</p>
        </div>
      </footer>
    </div>
  );
}
