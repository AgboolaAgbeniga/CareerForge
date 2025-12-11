"use client";

import React from 'react';
import {
  UploadCloud,
  Briefcase,
} from 'lucide-react';
import { motion, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-32 lg:pt-40 lg:pb-48 hero-glow overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-medium mb-8 animate-fade-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          New: AI Resume Analysis v1.0
        </div>

        <h1
          className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 mb-6 animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          Smarter Resumes.
          <br />
          <span className="text-gradient">Better Matches.</span> Faster Hiring.
        </h1>

        <p
          className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          The all-in-one AI platform connecting top talent with innovative
          companies. Optimize your career path or find your next unicorn hire in
          seconds.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
          >
            <UploadCloud className="w-4 h-4" /> Upload Resume
          </a>
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
          >
            <Briefcase className="w-4 h-4" /> Post a Job
          </a>
        </div>

        {/* Interactive Abstract UI Illustration */}
        <motion.div
          className="mt-16 mx-auto max-w-4xl relative"
          style={{ opacity: 1, rotate: 0 }}
          aria-label="Illustration of AI matching candidates to jobs"
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl border border-slate-200/60 p-2"
            style={{ rotate: 0 }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl overflow-hidden aspect-[16/9] relative flex items-center justify-center border border-slate-100">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
              {/* SVG Connector */}
              <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none">
                <motion.path
                  d="M 25% 50% Q 50% 30% 75% 50%"
                  stroke="url(#glow)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  style={{ pathLength: 0.5 }}
                  transition={{ duration: 1 }}
                />
                <defs>
                  <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Cards */}
              <div className="relative z-10 grid grid-cols-2 gap-8 w-3/4">
                {/* Candidate Card */}
                <motion.div
                  className="bg-white p-4 rounded-lg shadow-sm border border-slate-200"
                  style={{ x: -50 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="flex gap-3 mb-3">
                    <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center">
                      <span className="w-4 h-4 text-indigo-600">U</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-slate-900">Michael Chen</div>
                      <div className="text-xs text-slate-500">Software Engineer</div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded mb-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-indigo-500 rounded"
                      style={{ width: '85%' }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400" aria-label="Match score 85%">
                    Match Score: 85%
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-indigo-50 text-indigo-700">
                      Skills: Python, React
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-green-50 text-green-700">
                      SF, CA
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-emerald-50 text-emerald-700">
                      Available
                    </span>
                  </div>
                </motion.div>
                {/* Job Card */}
                <motion.div
                  className="bg-white p-4 rounded-lg shadow-sm border border-slate-200"
                  style={{ x: 50 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="flex gap-3 mb-3">
                    <div className="w-8 h-8 rounded bg-teal-100 flex items-center justify-center">
                      <span className="w-4 h-4 text-teal-600">B</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-slate-900">Backend Developer</div>
                      <div className="text-xs text-slate-500">NovaTech</div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded mb-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-teal-500 rounded"
                      style={{ width: '92%' }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400" aria-label="Match score 92%">
                    Match Score: 92%
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-teal-50 text-teal-700">
                      Node.js, AWS
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-blue-50 text-blue-700">
                      Remote
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-orange-50 text-orange-700">
                      Open Role
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Curved Separator */}
      <div className="curve-bottom">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-slate-50"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;