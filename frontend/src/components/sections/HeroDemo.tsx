"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface HeroDemoProps {
  loop?: boolean;
  play?: boolean;
  captions?: boolean;
  onAnimationComplete?: () => void;
}

const HeroDemo: React.FC<HeroDemoProps> = ({
  loop = true,
  play = true,
  captions = true,
  onAnimationComplete
}) => {
  const [isPlaying, setIsPlaying] = useState(play);
  const [currentCaption, setCurrentCaption] = useState('');
  const [showMetric, setShowMetric] = useState(false);
  const [multipleMode, setMultipleMode] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation springs
  const candidateProgress = useSpring(0, { stiffness: 100, damping: 30 });
  const jobProgress = useSpring(0, { stiffness: 100, damping: 30 });
  const connectorPath = useSpring(0, { stiffness: 50, damping: 25 });
  const badgesOpacity = useSpring(0, { stiffness: 200, damping: 40 });

  // Transforms for width
  const candidateWidth = useTransform(candidateProgress, [0, 1], ['0%', '85%']);
  const jobWidth = useTransform(jobProgress, [0, 1], ['0%', '92%']);

  // Parallax scroll value
  const scrollY = useMotionValue(0);
  const backgroundY = useTransform(scrollY, [0, 1], [0, -50]);

  // Check for reduced motion and mobile
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  useEffect(() => {
    const updateScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / window.innerHeight));
        scrollY.set(scrollProgress);
      }
    };

    window.addEventListener('scroll', updateScroll);
    updateScroll();

    return () => window.removeEventListener('scroll', updateScroll);
  }, [scrollY]);

  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    const sequence = async () => {
      // Reset
      candidateProgress.set(0);
      jobProgress.set(0);
      connectorPath.set(0);
      badgesOpacity.set(0);
      setCurrentCaption('');
      setShowMetric(false);

      // Start animation
      setCurrentCaption('Analyzing resume...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      candidateProgress.set(0.85);
      setCurrentCaption('Matching skills to job...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      jobProgress.set(0.92);

      if (!isMobile) {
        connectorPath.set(1);
        setCurrentCaption('Candidate fit: 85%');
        await new Promise(resolve => setTimeout(resolve, 1000));

        badgesOpacity.set(1);
        await new Promise(resolve => setTimeout(resolve, 1500));

        setShowMetric(true);
        setCurrentCaption('50,000+ resumes optimized');
        await new Promise(resolve => setTimeout(resolve, 2000));

        setCurrentCaption('');
        setShowMetric(false);
      } else {
        setCurrentCaption('Candidate fit: 85%');
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentCaption('');
      }

      onAnimationComplete?.();

      if (loop) {
        setTimeout(() => sequence(), 1000);
      }
    };

    sequence();
  }, [isPlaying, loop, candidateProgress, jobProgress, connectorPath, badgesOpacity, prefersReducedMotion, isMobile, onAnimationComplete]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReplay = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  const toggleMultipleMode = () => {
    setMultipleMode(!multipleMode);
  };

  if (prefersReducedMotion) {
    return (
      <div className="w-full relative" ref={containerRef}>
        <div className="cf-card p-2 bg-canvas-dark text-on-dark border-surface-dark-soft shadow-none">
          <div className="rounded-sm overflow-hidden aspect-[4/3] relative flex items-center justify-center border border-surface-dark-soft">
            <div className="relative z-10 flex flex-col gap-8 w-3/4">
              {/* Static Candidate Card */}
              <div className="bg-canvas text-ink p-4 rounded-sm border border-hairline shadow-none">
                <div className="flex gap-3 mb-3">
                  <div className="w-8 h-8 rounded-sm bg-hairline flex items-center justify-center">
                    <span className="type-mono-caps-eyebrow text-ink">U</span>
                  </div>
                  <div className="space-y-1">
                    <div className="type-body-sm font-medium text-ink">Alex Rivera</div>
                    <div className="type-caption text-body">Full-Stack Developer</div>
                  </div>
                </div>
                <div className="h-1 w-full bg-hairline rounded-sm mb-2 overflow-hidden">
                  <div className="h-full w-[85%] bg-ink rounded-sm"></div>
                </div>
                <div className="type-caption text-body" aria-label="Match score 85%">
                  Match Score: 85%
                </div>
              </div>
              {/* Static Job Card */}
              <div className="bg-canvas text-ink p-4 rounded-sm border border-hairline shadow-none">
                <div className="flex gap-3 mb-3">
                  <div className="w-8 h-8 rounded-sm bg-hairline flex items-center justify-center">
                    <span className="type-mono-caps-eyebrow text-ink">B</span>
                  </div>
                  <div className="space-y-1">
                    <div className="type-body-sm font-medium text-ink">Senior Frontend Engineer</div>
                    <div className="type-caption text-body">TechCorp</div>
                  </div>
                </div>
                <div className="h-1 w-full bg-hairline rounded-sm mb-2 overflow-hidden">
                  <div className="h-full w-[92%] bg-ink rounded-sm"></div>
                </div>
                <div className="type-caption text-body" aria-label="Match score 92%">
                  Match Score: 92%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full relative"
      ref={containerRef}
      style={{ y: backgroundY }}
      aria-label="Interactive demo of AI matching candidates to jobs"
    >
      {/* Control Buttons */}
      <div className="absolute top-4 right-4 z-30 flex gap-2">
        <button
          onClick={handlePlayPause}
          className="p-2 bg-canvas text-ink border border-hairline rounded-sm hover:bg-hairline transition-colors"
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={handleReplay}
          className="p-2 bg-canvas text-ink border border-hairline rounded-sm hover:bg-hairline transition-colors"
          aria-label="Replay animation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={toggleMultipleMode}
          className="p-2 bg-canvas text-ink border border-hairline rounded-sm hover:bg-hairline transition-colors type-caption"
          aria-label="Toggle multiple matches mode"
        >
          {multipleMode ? '1' : '3'}
        </button>
      </div>

      {/* Caption */}
      <AnimatePresence>
        {captions && currentCaption && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-4 left-4 z-30 bg-ink text-canvas px-3 py-1 rounded-sm type-caption"
          >
            {currentCaption}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="cf-card p-2 bg-canvas-dark text-on-dark border-surface-dark-soft shadow-none"
        animate={controls}
      >
        <motion.div
          className="rounded-sm overflow-hidden aspect-[4/3] relative flex items-center justify-center border border-surface-dark-soft bg-canvas-dark"
        >
          {/* SVG Connector - Hidden on mobile */}
          {!isMobile && (
            <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none">
              <motion.path
                d="M 50% 25% L 50% 75%"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                fill="none"
                style={{ pathLength: connectorPath }}
                transition={{ ease: "easeInOut", duration: 1 }}
              />
            </svg>
          )}

          {/* Cards */}
          <div className={`relative z-10 flex flex-col gap-8 w-3/4`}>
            {multipleMode ? (
              // Multiple mode simplified for demo
              <div className="flex flex-col gap-4 w-full">
                 <div className="bg-canvas text-ink p-3 rounded-sm border border-hairline shadow-none cursor-pointer flex-1 flex justify-between items-center">
                    <div className="type-body-sm font-medium">Alex Rivera</div>
                    <div className="type-caption text-body">85%</div>
                 </div>
                 <div className="bg-canvas text-ink p-3 rounded-sm border border-hairline shadow-none cursor-pointer flex-1 flex justify-between items-center">
                    <div className="type-body-sm font-medium">Senior Frontend</div>
                    <div className="type-caption text-body">92%</div>
                 </div>
              </div>
            ) : (
              // Single pair
              <>
                {/* Candidate Card */}
                <motion.div
                  className="bg-canvas text-ink p-4 rounded-sm border border-hairline shadow-none cursor-pointer"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="flex gap-3 mb-3">
                    <div className="w-8 h-8 rounded-sm bg-hairline flex items-center justify-center">
                      <span className="type-mono-caps-eyebrow text-ink">U</span>
                    </div>
                    <div className="space-y-1">
                      <div className="type-body-sm font-medium text-ink">Alex Rivera</div>
                      <div className="type-caption text-body">Full-Stack Developer</div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-hairline rounded-sm mb-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-ink rounded-sm"
                      style={{ width: candidateWidth }}
                      transition={{ ease: "easeInOut", duration: 1 }}
                    />
                  </div>
                  <div className="type-caption text-body" aria-label="Match score 85%">
                    Match Score: 85%
                  </div>
                  {!isMobile && (
                    <motion.div
                      className="mt-2 flex flex-wrap gap-1"
                      style={{ opacity: badgesOpacity }}
                    >
                      <motion.span
                        className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[8px] font-medium border border-hairline text-ink bg-canvas"
                        initial={{ scale: 0 }}
                        animate={{ scale: badgesOpacity.get() }}
                        transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0 }}
                      >
                        TypeScript, Next.js
                      </motion.span>
                      <motion.span
                        className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[8px] font-medium border border-hairline text-ink bg-canvas"
                        initial={{ scale: 0 }}
                        animate={{ scale: badgesOpacity.get() }}
                        transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.1 }}
                      >
                        SF, CA
                      </motion.span>
                    </motion.div>
                  )}
                </motion.div>

                {/* Job Card */}
                <motion.div
                  className="bg-canvas text-ink p-4 rounded-sm border border-hairline shadow-none cursor-pointer"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="flex gap-3 mb-3">
                    <div className="w-8 h-8 rounded-sm bg-hairline flex items-center justify-center">
                      <span className="type-mono-caps-eyebrow text-ink">B</span>
                    </div>
                    <div className="space-y-1">
                      <div className="type-body-sm font-medium text-ink">Senior Frontend Engineer</div>
                      <div className="type-caption text-body">TechCorp</div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-hairline rounded-sm mb-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-ink rounded-sm"
                      style={{ width: jobWidth }}
                      transition={{ ease: "easeInOut", duration: 1 }}
                    />
                  </div>
                  <div className="type-caption text-body" aria-label="Match score 92%">
                    Match Score: 92%
                  </div>
                  {!isMobile && (
                    <motion.div
                      className="mt-2 flex flex-wrap gap-1"
                      style={{ opacity: badgesOpacity }}
                    >
                      <motion.span
                        className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[8px] font-medium border border-hairline text-ink bg-canvas"
                        initial={{ scale: 0 }}
                        animate={{ scale: badgesOpacity.get() }}
                        transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0 }}
                      >
                        React, TypeScript
                      </motion.span>
                      <motion.span
                        className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[8px] font-medium border border-hairline text-ink bg-canvas"
                        initial={{ scale: 0 }}
                        animate={{ scale: badgesOpacity.get() }}
                        transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.1 }}
                      >
                        Remote
                      </motion.span>
                    </motion.div>
                  )}
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroDemo;