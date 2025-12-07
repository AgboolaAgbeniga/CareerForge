'use client';

import React, { useState } from 'react';
import {
  Bell,
  ChevronDown,
  Linkedin,
  UploadCloud,
  Sparkles,
  FileText,
  TrendingUp,
  Zap,
  Check,
  ArrowRight,
  Map,
  Calendar,
  Bot,
  Database,
  FileCheck,
  Briefcase,
  Eye,
  Crown,
  ChevronRight,
} from 'lucide-react';
import { formatRelativeTime } from '../../../lib/dateUtils';
import { formatCurrency } from '../../../lib/currencyUtils';

export default function Dashboard() {
  const [profileCompletion, setProfileCompletion] = useState(65);
  const [resumeScore, setResumeScore] = useState(85);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: FileCheck,
      color: 'text-green-500',
      title: 'Resume Optimized',
      desc: 'Your score increased to 85.',
      time: formatRelativeTime(new Date(Date.now() - 10 * 60 * 1000)),
    },
    {
      id: 2,
      icon: Briefcase,
      color: 'text-blue-500',
      title: '5 New Job Matches',
      desc: 'Linear and Notion roles.',
      time: formatRelativeTime(new Date(Date.now() - 2 * 60 * 60 * 1000)),
    },
    {
      id: 3,
      icon: Eye,
      color: 'text-purple-500',
      title: 'Profile Viewed',
      desc: 'Recruiter from Microsoft.',
      time: formatRelativeTime(new Date(Date.now() - 24 * 60 * 60 * 1000)),
    },
  ]);

  const [applications] = useState([
    {
      id: 1,
      company: 'Uber',
      role: 'Product Mgr, Driver Exp',
      status: 'applied',
      time: formatRelativeTime(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)),
      logo: 'U',
    },
    {
      id: 2,
      company: 'Stripe',
      role: 'Technical Product Mgr',
      status: 'interviewing',
      time: 'Tomorrow, 2:00 PM',
      logo: 'S',
      urgent: true,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 selection:bg-indigo-100 selection:text-indigo-700 overflow-x-hidden font-['Inter']">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-12 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-white font-bold tracking-tighter shadow-lg">
                AI
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-gray-100">
                Career<span className="text-indigo-600">OS</span>
              </span>
            </div>

            {/* Global Nav */}
            <div className="hidden md:flex items-center space-x-1 bg-gray-100/50 dark:bg-gray-700/50 p-1 rounded-full border border-gray-200/50 dark:border-gray-600/50">
              <a
                href="#"
                className="px-4 py-1.5 text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 shadow-sm rounded-full transition-all"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                Resumes
              </a>
              <a
                href="#"
                className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                Jobs
              </a>
              <a
                href="#"
                className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                Applications
              </a>
              <a
                href="#"
                className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                Learn
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
              </button>
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-600"></div>
              <button className="flex items-center gap-2 group">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 group-hover:border-indigo-300 transition-colors"
                />
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Container */}
      <main className="max-w-[1600px] mx-auto p-4 lg:p-8 space-y-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Alex
              </span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
              Your AI cockpit is tracking{' '}
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                5 active opportunities
              </span>
              . Market demand for your skills is up{' '}
              <span className="text-green-600 font-medium">12%</span> this week.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover-lift">
              <Linkedin className="w-4 h-4 text-[#0077b5]" />
              Sync LinkedIn
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover-lift">
              <UploadCloud className="w-4 h-4" />
              Upload Resume
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-gray-900/10 hover:bg-gray-800 dark:hover:bg-gray-600 transition-all hover-lift">
              <Sparkles className="w-4 h-4" />
              Generate with AI
            </button>
          </div>
        </header>

        {/* Modular Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* LEFT COLUMN (Stats & Progress) */}
          <div className="md:col-span-12 lg:col-span-8 space-y-6">
            {/* Resume & Profile Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resume Status Panel */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 relative overflow-hidden group shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <FileText className="w-32 h-32 text-indigo-600 -rotate-12 transform translate-x-8 -translate-y-8" />
                </div>

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      Resume Health
                      <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                        Strong
                      </span>
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Product_Manager_v4.pdf
                    </p>
                  </div>
                  <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-900 px-3 py-1.5 rounded-lg transition-colors">
                    Analyze New
                  </button>
                </div>

                <div className="flex items-center gap-8">
                  {/* Circular Chart */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-100 dark:text-gray-700"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="42"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-indigo-600 progress-ring__circle"
                        strokeWidth="8"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="42"
                        cx="50"
                        cy="50"
                        strokeDasharray="264"
                        strokeDashoffset={264 - (resumeScore / 100) * 264}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                        {resumeScore}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-semibold">
                        ATS
                      </span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          Keywords Match
                        </span>
                        <span className="text-gray-900 dark:text-gray-100 font-bold">
                          92%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                          style={{ width: '92%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                      <span>Score improved by 5 pts this week</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Completion Panel */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Profile Strength
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {profileCompletion}%
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Intermediate
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-yellow-50 dark:bg-yellow-900 flex items-center justify-center border border-yellow-100 dark:border-yellow-700">
                    <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>

                {/* Animated Checklist */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 shadow-sm opacity-50">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
                      Add Experience
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-600 transition-colors cursor-pointer group">
                    <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900 group-hover:border-indigo-200 dark:group-hover:border-indigo-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 group-hover:bg-indigo-600"></div>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                        Add Certifications
                      </span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-gray-300 dark:text-gray-600 group-hover:text-indigo-400" />
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/50 rounded-lg p-3 border border-blue-100 dark:border-blue-800 flex gap-3 items-start">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-800 dark:text-blue-200 leading-snug">
                    <span className="font-semibold">AI Tip:</span> Completing
                    your profile increases match accuracy by ~20%.
                  </p>
                </div>
              </div>
            </div>

            {/* Career Path Visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-l-4 border-l-indigo-500 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900 rounded-md">
                    <Map className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    Projected Career Path
                  </h3>
                </div>
                <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium">
                  View Full Roadmap
                </button>
              </div>

              <div className="relative">
                {/* Horizontal Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 dark:bg-gray-700 -translate-y-1/2 z-0 hidden md:block"></div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
                  {/* Step 1: Current */}
                  <div className="flex flex-col md:items-center text-left md:text-center group">
                    <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-gray-700 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-gray-800 shadow-sm mb-3">
                      NOW
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-3 rounded-xl w-full hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
                        Product Manager
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        Current Role
                      </p>
                    </div>
                  </div>

                  {/* Step 2: Next */}
                  <div className="flex flex-col md:items-center text-left md:text-center group">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-gray-800 shadow-sm mb-3 animate-pulse">
                      1y
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900 border border-indigo-200 dark:border-indigo-700 p-3 rounded-xl w-full shadow-sm">
                      <p className="text-xs font-bold text-indigo-900 dark:text-indigo-100">
                        Senior PM
                      </p>
                      <p className="text-[10px] text-indigo-600 dark:text-indigo-400">
                        Goal • +{formatCurrency(25000, 'USD')} salary
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Future */}
                  <div className="flex flex-col md:items-center text-left md:text-center group opacity-60 hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-500 text-gray-400 dark:text-gray-500 flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-gray-800 mb-3">
                      3y
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-3 rounded-xl w-full border-dashed">
                      <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        Group PM
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        Requires: Leadership
                      </p>
                    </div>
                  </div>

                  {/* Step 4: Long Term */}
                  <div className="flex flex-col md:items-center text-left md:text-center group opacity-40 hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-300 dark:text-gray-600 flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-gray-800 mb-3">
                      5y
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-3 rounded-xl w-full border-dashed">
                      <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        Director of Product
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        Strategic Role
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Applications Tracker */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    Applications
                  </h3>
                  <span className="bg-gray-900 dark:bg-gray-700 text-white text-[10px] px-1.5 py-0.5 rounded-md font-medium">
                    3 Active
                  </span>
                </div>
                <div className="flex text-xs font-medium bg-gray-200/50 dark:bg-gray-600/50 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('kanban')}
                    className={`px-3 py-1 rounded ${viewMode === 'kanban' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`}
                  >
                    Kanban
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`}
                  >
                    List
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
                {/* Column 1: Applied */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Applied
                    </span>
                  </div>
                  {/* Card */}
                  <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded bg-black text-white flex items-center justify-center font-bold text-xs">
                        U
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                          Uber
                        </h4>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                          Product Mgr, Driver Exp
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        2d ago
                      </span>
                      <ArrowRight className="w-3 h-3 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Column 2: Interviewing */}
                <div className="p-4 space-y-3 bg-indigo-50/30 dark:bg-indigo-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                    <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-100 uppercase tracking-wider">
                      Interviewing
                    </span>
                  </div>
                  {/* Card */}
                  <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-700 shadow-sm cursor-pointer hover:shadow-md transition-all relative">
                    <div
                      className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 border border-white dark:border-gray-800"
                      title="Action Needed"
                    ></div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded bg-[#635BFF] text-white flex items-center justify-center font-bold text-xs">
                        S
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Stripe
                        </h4>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">
                          Technical Product Mgr
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-600">
                      <p className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Tomorrow, 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Column 3: Offer/Pending */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Offer
                    </span>
                  </div>
                  <div className="flex items-center justify-center h-20 border-2 border-dashed border-gray-100 dark:border-gray-600 rounded-xl">
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      Drag to move here
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Insight Footer */}
              <div className="px-4 py-2 bg-indigo-900 dark:bg-indigo-800 text-white flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <Bot className="w-3 h-3" />
                  <span className="font-medium">AI Insight:</span> Your response
                  time is excellent (avg 2hrs).
                </div>
                <button className="hover:underline opacity-80">
                  View Analysis
                </button>
              </div>
            </div>

            {/* Job Matches Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                  Top Recommended Matches
                </h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                    Remote
                  </button>
                  <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                    Full-time
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Job Card 1 */}
                <div className="group bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all relative">
                  <div className="absolute top-5 right-5 flex flex-col items-end">
                    <div
                      className="radial-progress text-green-500 text-[10px] font-bold"
                      style={
                        {
                          '--value': 98,
                          '--size': '2rem',
                        } as React.CSSProperties
                      }
                    >
                      98%
                    </div>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center">
                      {/* Figma icon placeholder */}
                      <div className="w-6 h-6 bg-gray-900 dark:bg-gray-100 rounded"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 transition-colors">
                        Product Designer
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Figma • San Francisco
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-medium text-gray-600 dark:text-gray-400">
                      Design Systems
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-medium text-gray-600 dark:text-gray-400">
                      Prototyping
                    </span>
                    <span className="px-2 py-1 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-700 rounded text-[10px] font-medium flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" /> Skills Match
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700">
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {formatRelativeTime(
                        new Date(Date.now() - 4 * 60 * 60 * 1000)
                      )}
                    </span>
                    <button className="text-xs font-semibold text-white bg-gray-900 dark:bg-gray-700 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                      Apply Now
                    </button>
                  </div>
                </div>

                {/* Job Card 2 */}
                <div className="group bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all relative">
                  <div className="absolute top-5 right-5 flex flex-col items-end">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900 px-2 py-1 rounded-full">
                      94% Match
                    </span>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center">
                      {/* Slack icon placeholder */}
                      <div className="w-6 h-6 bg-gray-900 dark:bg-gray-100 rounded"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 transition-colors">
                        Technical PM
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Slack • Remote
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-medium text-gray-600 dark:text-gray-400">
                      API
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-medium text-gray-600 dark:text-gray-400">
                      Agile
                    </span>
                    <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-700 rounded text-[10px] font-medium flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5" /> Hot Role
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700">
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {formatRelativeTime(
                        new Date(Date.now() - 24 * 60 * 60 * 1000)
                      )}
                    </span>
                    <button className="text-xs font-semibold text-white bg-gray-900 dark:bg-gray-700 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (AI, Upskilling, Notifications) */}
          <div className="md:col-span-12 lg:col-span-4 space-y-6">
            {/* AI Career Coach (Futuristic Card) */}
            <div className="rounded-2xl relative bg-white dark:bg-gray-800 p-[1px] shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20"></div>
              <div className="relative rounded-2xl bg-white dark:bg-gray-800 p-5 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded bg-gradient-to-r from-indigo-500 to-purple-500">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="font-bold text-gray-900 dark:text-gray-100">
                    AI Career Coach
                  </h2>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/50 rounded-xl p-4 border border-indigo-100 dark:border-indigo-700 mb-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                        I noticed you're targeting{' '}
                        <span className="font-semibold">Senior PM</span> roles.
                        Your resume lacks metric-driven results in the
                        "Strategy" section.
                      </p>
                      <button className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-700 border border-indigo-200 dark:border-indigo-600 px-3 py-1.5 rounded-lg shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors">
                        Auto-Fix Resume
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all group">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        Optimize LinkedIn Headline
                      </span>
                      <ChevronRight className="w-3 h-3 text-gray-400 dark:text-gray-500 group-hover:text-indigo-500" />
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all group">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        Draft Cover Letter for Stripe
                      </span>
                      <ChevronRight className="w-3 h-3 text-gray-400 dark:text-gray-500 group-hover:text-indigo-500" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Skill Gaps & Upskilling */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Skill Gap Analysis
                </h3>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                  Based on job matches
                </span>
              </div>

              <div className="space-y-4">
                {/* Skill 1 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      SQL Data Analysis
                    </span>
                    <span className="text-red-500 font-medium">
                      Critical Gap
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-2">
                    Required for 80% of your target roles.
                  </p>
                  <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
                    <div className="w-8 h-8 rounded bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                      <Database className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
                        Advanced SQL for PMs
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        Coursera • 4 weeks
                      </p>
                    </div>
                    <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                      Enroll
                    </button>
                  </div>
                </div>

                {/* Skill 2 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      A/B Testing
                    </span>
                    <span className="text-yellow-600 font-medium">Gap</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: '30%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications Feed */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 flex justify-between items-center">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                  Activity Feed
                </h3>
                <button className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wide hover:text-gray-900 dark:hover:text-gray-100">
                  Clear
                </button>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-700 max-h-60 overflow-y-auto">
                {notifications.map((notif, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex gap-3"
                  >
                    <div className="mt-0.5 relative">
                      <notif.icon className={`w-4 h-4 ${notif.color}`} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                        {notif.title}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                        {notif.desc}
                      </p>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 block mt-1">
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Upsell (Subtle & Elegant) */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 transition-transform duration-300 group-hover:scale-105"></div>
              <div className="relative p-6 text-center">
                <div className="w-10 h-10 mx-auto bg-gradient-to-tr from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg mb-3">
                  <Crown className="w-5 h-5 text-yellow-900" />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">
                  Upgrade to Pro
                </h3>
                <p className="text-xs text-gray-400 mb-4 px-2">
                  Unlock unlimited AI insights, salary predictions, and direct
                  recruiter messaging.
                </p>
                <button className="w-full bg-white text-gray-900 text-xs font-bold py-2.5 rounded-xl hover:bg-gray-100 transition-colors shadow-sm">
                  View Plans
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-gray-900 dark:bg-gray-800 text-white py-8 rounded-t-[40px] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50 blur-sm"></div>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-800 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">
              AI
            </div>
            <span className="text-sm font-semibold tracking-tight">
              CareerForge
            </span>
          </div>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Help Center
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
          <p className="text-[10px] text-gray-600 dark:text-gray-500">
            Built for professionals, powered by AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
