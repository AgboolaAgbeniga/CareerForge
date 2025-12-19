"use client";

import React, { useState } from 'react';
import {
  UploadCloud,
  Briefcase,
} from 'lucide-react';
import { motion, useTransform } from 'framer-motion';
import HeroDemo from './HeroDemo';

const Hero: React.FC = () => {
  const [pulseCTAs, setPulseCTAs] = useState(false);

  const handleAnimationComplete = () => {
    setPulseCTAs(true);
    setTimeout(() => setPulseCTAs(false), 2000);
  };
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
          <motion.a
            href="#"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
            animate={pulseCTAs ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.6, repeat: pulseCTAs ? 3 : 0 }}
          >
            <UploadCloud className="w-4 h-4" /> Upload Resume
          </motion.a>
          <motion.a
            href="#"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
            animate={pulseCTAs ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.6, repeat: pulseCTAs ? 3 : 0, delay: 0.2 }}
          >
            <Briefcase className="w-4 h-4" /> Post a Job
          </motion.a>
        </div>

        {/* Interactive Hero Demo */}
        <HeroDemo onAnimationComplete={handleAnimationComplete} />
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