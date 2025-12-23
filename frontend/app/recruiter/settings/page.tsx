'use client';

import { useState } from 'react';
import { Button, Input, Select } from '@/components';
import {
  User,
  Building2,
  Users,
  MessageSquare,
  Bell,
  Shield,
  Settings as SettingsIcon,
  Upload,
  Crown,
  Calendar,
  Download,
  AlertTriangle,
  HelpCircle,
  MessageSquare as ChatIcon,
  Check,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

type SettingsTab =
  | 'account'
  | 'company'
  | 'team'
  | 'communication'
  | 'notifications'
  | 'privacy'
  | 'system';

export default function RecruiterSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');
  const [userRole] = useState<'admin' | 'hiring-manager' | 'assistant'>(
    'admin'
  );

  // Account Settings State
  const [accountSettings, setAccountSettings] = useState({
    name: 'Sarah Connor',
    email: 'sarah.connor@cyberdyne.com',
    phone: '+1 (555) 123-4567',
    language: 'en',
    timezone: 'America/New_York',
    twoFactorEnabled: false,
  });

  // Company Settings State
  const [companySettings, setCompanySettings] = useState({
    name: 'Cyberdyne Systems',
    industry: 'Artificial Intelligence',
    size: '100-500',
    description: 'Leading AI and robotics company',
    showProfile: true,
    emailSignature:
      'Best regards,\nSarah Connor\nSenior Recruiter\nCyberdyne Systems',
  });

  const tabs = [
    {
      id: 'account' as const,
      label: 'Account',
      icon: User,
      description: 'Profile & authentication',
    },
    {
      id: 'company' as const,
      label: 'Company',
      icon: Building2,
      description: 'Profile & branding',
    },
    {
      id: 'team' as const,
      label: 'Team',
      icon: Users,
      description: 'Collaboration & workflow',
    },
    {
      id: 'communication' as const,
      label: 'Communication',
      icon: MessageSquare,
      description: 'Tools & messaging',
    },
    {
      id: 'notifications' as const,
      label: 'Notifications',
      icon: Bell,
      description: 'Alerts & preferences',
    },
    {
      id: 'privacy' as const,
      label: 'Privacy',
      icon: Shield,
      description: 'Data & compliance',
    },
    {
      id: 'system' as const,
      label: 'System',
      icon: SettingsIcon,
      description: 'Preferences & support',
    },
  ];

  return (
    <div className="onboarding-body text-slate-400 min-h-screen">
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
              href="/recruiter"
              className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/recruiter/jobs"
              className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Jobs
            </a>
            <a
              href="/recruiter/candidates"
              className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Candidates
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
                <p className="text-[10px] text-slate-500">Admin Recruiter</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden cursor-pointer">
                <User className="text-slate-400" size={16} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold text-white mb-6">Settings</h2>
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-300'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <tab.icon size={18} />
                  <div>
                    <p className="text-sm font-medium">{tab.label}</p>
                    <p className="text-xs opacity-70">{tab.description}</p>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <section className="lg:col-span-9">
          {activeTab === 'account' && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <User className="text-indigo-500" size={24} />
                <h2 className="text-xl font-semibold text-white">
                  Account Settings
                </h2>
              </div>

              {/* Profile Information */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Profile Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={accountSettings.name}
                      onChange={(e) =>
                        setAccountSettings((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-white focus:border-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={accountSettings.email}
                      onChange={(e) =>
                        setAccountSettings((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-white focus:border-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={accountSettings.phone}
                      onChange={(e) =>
                        setAccountSettings((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-white focus:border-indigo-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* Authentication */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Authentication
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                        <span className="text-sm">🔐</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Two-Factor Authentication
                        </p>
                        <p className="text-xs text-slate-500">
                          Add an extra layer of security
                        </p>
                      </div>
                    </div>
                    <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        checked={accountSettings.twoFactorEnabled}
                        onChange={() =>
                          setAccountSettings((prev) => ({
                            ...prev,
                            twoFactorEnabled: !prev.twoFactorEnabled,
                          }))
                        }
                        className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                      />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <Button className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700">
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>

              {/* Language & Region */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Language & Region
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Language
                    </label>
                    <Select
                      options={[
                        { value: 'en', label: 'English' },
                        { value: 'es', label: 'Spanish' },
                        { value: 'fr', label: 'French' },
                        { value: 'de', label: 'German' },
                      ]}
                      value={accountSettings.language}
                      onChange={(e) =>
                        setAccountSettings((prev) => ({
                          ...prev,
                          language: e.target.value,
                        }))
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:border-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Time Zone
                    </label>
                    <Select
                      options={[
                        { value: 'America/New_York', label: 'Eastern Time' },
                        { value: 'America/Chicago', label: 'Central Time' },
                        { value: 'America/Denver', label: 'Mountain Time' },
                        { value: 'America/Los_Angeles', label: 'Pacific Time' },
                        { value: 'Europe/London', label: 'GMT' },
                        { value: 'Europe/Paris', label: 'CET' },
                        { value: 'Asia/Tokyo', label: 'JST' },
                      ]}
                      value={accountSettings.timezone}
                      onChange={(e) =>
                        setAccountSettings((prev) => ({
                          ...prev,
                          timezone: e.target.value,
                        }))
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:border-indigo-500/50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2">
                  Save Account Settings
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="text-purple-500" size={24} />
                <h2 className="text-xl font-semibold text-white">
                  Company Settings
                </h2>
                {userRole !== 'admin' && (
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">
                    Admin Only
                  </span>
                )}
              </div>

              {/* Company Profile */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Company Profile
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-xl bg-slate-900 border border-dashed border-slate-600 hover:border-purple-500 hover:bg-slate-800/50 flex flex-col items-center justify-center cursor-pointer transition-all group">
                      <Upload
                        className="text-slate-500 group-hover:text-purple-400"
                        size={20}
                      />
                      <span className="text-[10px] text-slate-500 mt-1 group-hover:text-slate-300">
                        Logo
                      </span>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Company Name
                        </label>
                        <Input
                          type="text"
                          value={companySettings.name}
                          onChange={(e) =>
                            setCompanySettings((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          disabled={userRole !== 'admin'}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-white focus:border-purple-500/50 disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Industry
                        </label>
                        <Select
                          options={[
                            {
                              value: 'Artificial Intelligence',
                              label: 'Artificial Intelligence',
                            },
                            { value: 'Fintech', label: 'Fintech' },
                            { value: 'Healthcare', label: 'Healthcare' },
                            { value: 'E-commerce', label: 'E-commerce' },
                          ]}
                          value={companySettings.industry}
                          onChange={(e) =>
                            setCompanySettings((prev) => ({
                              ...prev,
                              industry: e.target.value,
                            }))
                          }
                          disabled={userRole !== 'admin'}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:border-purple-500/50 disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Company Size
                      </label>
                      <Select
                        options={[
                          { value: '1-10', label: '1-10 Employees' },
                          { value: '11-50', label: '11-50 Employees' },
                          { value: '51-100', label: '51-100 Employees' },
                          { value: '100-500', label: '100-500 Employees' },
                          { value: '500+', label: '500+ Employees' },
                        ]}
                        value={companySettings.size}
                        onChange={(e) =>
                          setCompanySettings((prev) => ({
                            ...prev,
                            size: e.target.value,
                          }))
                        }
                        disabled={userRole !== 'admin'}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:border-purple-500/50 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={companySettings.description}
                      onChange={(e) =>
                        setCompanySettings((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      disabled={userRole !== 'admin'}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-white focus:border-purple-500/50 disabled:opacity-50 min-h-[80px] resize-none"
                      placeholder="Brief description of your company..."
                    />
                  </div>
                </div>
              </div>

              {/* Branding */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Branding
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Signature
                    </label>
                    <textarea
                      value={companySettings.emailSignature}
                      onChange={(e) =>
                        setCompanySettings((prev) => ({
                          ...prev,
                          emailSignature: e.target.value,
                        }))
                      }
                      disabled={userRole !== 'admin'}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-white focus:border-purple-500/50 disabled:opacity-50 min-h-[100px] resize-none font-mono"
                      placeholder="Your email signature..."
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Show Company Profile to Candidates
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Let candidates see your company information
                      </p>
                    </div>
                    <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        checked={companySettings.showProfile}
                        onChange={() =>
                          setCompanySettings((prev) => ({
                            ...prev,
                            showProfile: !prev.showProfile,
                          }))
                        }
                        disabled={userRole !== 'admin'}
                        className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300 disabled:opacity-50"
                      />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300 disabled:opacity-50"></label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit Trail */}
              {userRole === 'admin' && (
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Recent Changes
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-slate-800">
                      <div>
                        <p className="text-sm text-white">
                          Company description updated
                        </p>
                        <p className="text-xs text-slate-500">
                          by Sarah Connor • 2 hours ago
                        </p>
                      </div>
                      <span className="text-xs text-slate-400">Admin</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-800">
                      <div>
                        <p className="text-sm text-white">
                          Email signature changed
                        </p>
                        <p className="text-xs text-slate-500">
                          by Sarah Connor • 1 day ago
                        </p>
                      </div>
                      <span className="text-xs text-slate-400">Admin</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
                  disabled={userRole !== 'admin'}
                >
                  Save Company Settings
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <Users className="text-teal-500" size={24} />
                <h2 className="text-xl font-semibold text-white">
                  Team & Collaboration
                </h2>
              </div>

              {/* Team Management */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Team Management
                </h3>

                {/* Current Team Members */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-sm font-medium text-slate-300">
                    Current Team Members
                  </h4>
                  <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                        <User size={16} className="text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Sarah Connor
                        </p>
                        <p className="text-xs text-slate-500">
                          sarah@cyberdyne.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Crown size={14} className="text-yellow-500" />
                      <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-300">
                        Admin Recruiter
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                        <User size={16} className="text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          John Smith
                        </p>
                        <p className="text-xs text-slate-500">
                          john@cyberdyne.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-300">
                        Hiring Manager
                      </span>
                    </div>
                  </div>
                </div>

                {/* Invite New Member */}
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-3">
                    Invite New Team Member
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                      type="email"
                      placeholder="Email address"
                      className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:border-teal-500/50"
                    />
                    <Select
                      options={[
                        { value: 'admin', label: 'Admin Recruiter' },
                        { value: 'hiring-manager', label: 'Hiring Manager' },
                        { value: 'assistant', label: 'Recruiter Assistant' },
                      ]}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:border-teal-500/50"
                    />
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                      Invite
                    </Button>
                  </div>
                </div>
              </div>

              {/* Workflow Preferences */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Workflow Preferences
                </h3>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-slate-400 mb-3">
                      Shortlist management:
                    </p>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-teal-500/20 text-teal-300 border border-teal-500/50">
                        Centralized Shortlist
                      </button>
                      <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600">
                        Individual Shortlists
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Require Hiring Manager Approval
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Before interview scheduling
                      </p>
                    </div>
                    <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => {}}
                        className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                      />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2">
                  Save Team Preferences
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="text-blue-500" size={24} />
                <h2 className="text-xl font-semibold text-white">
                  Communication Tools
                </h2>
              </div>

              {/* Messaging Preferences */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Messaging Preferences
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Shared Messaging Inbox
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        All team members see candidate messages
                      </p>
                    </div>
                    <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => {}}
                        className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                      />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Allow Candidate Initiation
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Candidates can start conversations
                      </p>
                    </div>
                    <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => {}}
                        className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                      />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar Sync */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Calendar Integration
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-slate-400" size={20} />
                      <div>
                        <p className="text-sm font-medium text-white">
                          Calendar Connected
                        </p>
                        <p className="text-xs text-slate-500">
                          Sync interviews with your calendar
                        </p>
                      </div>
                    </div>
                    <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => {}}
                        className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                      />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                    </div>
                  </div>

                  <div className="pl-4 border-l border-slate-800 space-y-3">
                    <p className="text-xs text-slate-400">
                      Choose your calendar provider:
                    </p>
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all border-blue-500 bg-blue-500/10 text-blue-300">
                        <span className="text-sm">📅</span>
                        <span className="text-xs font-medium">
                          Google Calendar
                        </span>
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600">
                        <span className="text-sm">📧</span>
                        <span className="text-xs font-medium">Outlook</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Templates */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Email Templates
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: 'Interview Invitation',
                      icon: '📅',
                      description: 'Schedule and confirm interviews',
                    },
                    {
                      name: 'Follow-Up Reminder',
                      icon: '⏰',
                      description: 'Keep candidates engaged',
                    },
                    {
                      name: 'Offer Letter',
                      icon: '📄',
                      description: 'Formal job offers',
                    },
                    {
                      name: 'Rejection/Feedback',
                      icon: '💬',
                      description: 'Professional rejections',
                    },
                  ].map((template) => (
                    <div
                      key={template.name}
                      className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-lg">{template.icon}</span>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">
                            {template.name}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            {template.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">
                          Customize
                        </button>
                        <button className="text-xs text-slate-500 hover:text-slate-300">
                          Preview
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                  Save Communication Tools
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="text-amber-500" size={24} />
                <h2 className="text-xl font-semibold text-white">
                  Notifications
                </h2>
              </div>

              {/* Notification Preferences */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Notification Preferences
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      key: 'candidateMessages',
                      label: 'Candidate Messages',
                      desc: 'New messages from candidates',
                    },
                    {
                      key: 'interviewConfirmations',
                      label: 'Interview Confirmations',
                      desc: 'Interview scheduling updates',
                    },
                    {
                      key: 'jobUpdates',
                      label: 'Job Posting Updates',
                      desc: 'Changes to your job listings',
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                      <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                        <input
                          type="checkbox"
                          checked={true}
                          onChange={() => {}}
                          className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                        />
                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Channels */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Delivery Channels
                </h3>

                <div className="space-y-4">
                  {[
                    { key: 'inApp', label: 'In-App Notifications', icon: '💬' },
                    { key: 'email', label: 'Email Notifications', icon: '📧' },
                    { key: 'push', label: 'Push Notifications', icon: '📱' },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm">{item.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {item.label}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Receive notifications via {item.label.toLowerCase()}
                          </p>
                        </div>
                      </div>
                      <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                        <input
                          type="checkbox"
                          checked={true}
                          onChange={() => {}}
                          className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                        />
                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frequency */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Notification Frequency
                </h3>

                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-amber-500/20 text-amber-300 border border-amber-500/50">
                    Real-time
                  </button>
                  <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600">
                    Daily Digest
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2">
                  Save Notification Settings
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-red-500" size={24} />
                <h2 className="text-xl font-semibold text-white">
                  Data & Privacy
                </h2>
              </div>

              {/* Export Data */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Export Your Data
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                  Download your data including candidate lists, resumes, and
                  reports.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors">
                    <Download className="text-slate-400" size={20} />
                    <div>
                      <p className="text-sm font-medium text-white">
                        Candidate Data
                      </p>
                      <p className="text-xs text-slate-500">CSV format</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors">
                    <Download className="text-slate-400" size={20} />
                    <div>
                      <p className="text-sm font-medium text-white">Reports</p>
                      <p className="text-xs text-slate-500">PDF format</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors">
                    <Download className="text-slate-400" size={20} />
                    <div>
                      <p className="text-sm font-medium text-white">All Data</p>
                      <p className="text-xs text-slate-500">Complete export</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Compliance */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Compliance
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg">
                    <AlertTriangle
                      className="text-amber-500 mt-0.5"
                      size={16}
                    />
                    <div>
                      <p className="text-sm font-medium text-white">
                        GDPR Compliance
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        We comply with GDPR requirements for data protection and
                        privacy rights in the European Union.
                      </p>
                      <button className="text-xs text-amber-400 hover:text-amber-300 mt-2">
                        View Privacy Policy →
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg">
                    <Shield className="text-green-500 mt-0.5" size={16} />
                    <div>
                      <p className="text-sm font-medium text-white">
                        CCPA Compliance
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        California Consumer Privacy Act compliance for
                        California residents.
                      </p>
                      <button className="text-xs text-green-400 hover:text-green-300 mt-2">
                        View CCPA Notice →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2">
                  Save Privacy Settings
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <SettingsIcon className="text-gray-500" size={24} />
                <h2 className="text-xl font-semibold text-white">
                  System & Support
                </h2>
              </div>

              {/* System Preferences */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  System Preferences
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                        <span className="text-sm">🌙</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Dark Mode
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Toggle between light and dark themes
                        </p>
                      </div>
                    </div>
                    <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => {}}
                        className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                      />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                        <span className="text-sm">👁️</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          High Contrast
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Increase contrast for better visibility
                        </p>
                      </div>
                    </div>
                    <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => {}}
                        className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 transition-all duration-300"
                      />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer transition-colors duration-300"></label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help Center */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Help Center
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors">
                    <HelpCircle className="text-slate-400" size={20} />
                    <div>
                      <p className="text-sm font-medium text-white">
                        Recruiter Documentation
                      </p>
                      <p className="text-xs text-slate-500">
                        Guides and tutorials
                      </p>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors">
                    <ChatIcon className="text-slate-400" size={20} />
                    <div>
                      <p className="text-sm font-medium text-white">
                        Contact Support
                      </p>
                      <p className="text-xs text-slate-500">
                        Chat or email support
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2">
                  Save System Preferences
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
