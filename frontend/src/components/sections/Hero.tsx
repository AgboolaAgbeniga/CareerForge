"use client";

import React, { useState } from 'react';
import {
  UploadCloud,
  Briefcase,
} from 'lucide-react';
import { motion } from 'framer-motion';
import HeroDemo from './HeroDemo';
import Button from '@/components/ui/Button';

const Hero: React.FC = () => {
  const [pulseCTAs, setPulseCTAs] = useState(false);

  const handleAnimationComplete = () => {
    setPulseCTAs(true);
    setTimeout(() => setPulseCTAs(false), 2000);
  };
  return (
    <section className="relative pt-32 pb-32 lg:pt-40 lg:pb-48 bg-canvas-dark text-on-dark overflow-hidden border-b border-surface-dark-soft">
      {/* Brand Gradient Ribbon */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-30 pointer-events-none" style={{
        background: 'linear-gradient(135deg, transparent 0%, rgba(20, 184, 166, 0.1) 40%, rgba(99, 102, 241, 0.2) 60%, rgba(236, 72, 153, 0.1) 100%)'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Aligned Copy */}
        <div className="w-full md:w-1/2 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-dark-soft type-mono-caps-eyebrow text-on-dark mb-8 animate-fade-up border border-white/10 rounded-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-on-dark opacity-75"></span>
              <span className="relative inline-flex rounded-sm h-2 w-2 bg-on-dark"></span>
            </span>
            New: AI Resume Analysis v1.0
          </div>

          <h1
            className="type-display-xxl text-on-dark mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Smarter Resumes.
            <br />
            Better Matches.
            <br />
            Faster Hiring.
          </h1>

          <p
            className="type-body-lg text-on-dark/75 mb-10 max-w-xl animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            The all-in-one AI platform connecting top talent with innovative
            companies. Optimize your career path or find your next unicorn hire in
            seconds.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-start gap-4 animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              icon="heroicons:cloud-arrow-up-16-solid"
              iconPosition="left"
            >
              Upload Resume
            </Button>
            <Button
              variant="ghostOnDark"
              size="lg"
              className="w-full sm:w-auto"
              icon="heroicons:briefcase-16-solid"
              iconPosition="left"
            >
              Post a Job
            </Button>
          </div>
        </div>

        {/* Right Side Demo */}
        <div className="w-full md:w-1/2">
          <HeroDemo onAnimationComplete={handleAnimationComplete} />
        </div>
      </div>
    </section>
  );
};

export default Hero;