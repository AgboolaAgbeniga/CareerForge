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

  // Combined animation progress for gradient shift
  const combinedProgress = useTransform(
    [candidateProgress, jobProgress, connectorPath, badgesOpacity],
    ([cp, jp, conn, bad]: number[]) => (cp + jp + conn + bad) / 4
  );
  const gradientShift = useTransform(combinedProgress, (progress) =>
    `linear-gradient(135deg, rgba(239, 246, 255, ${0.5 + progress * 0.3}) 0%, rgba(20, 184, 166, ${0.1 + progress * 0.2}) 50%, rgba(99, 102, 241, ${0.1 + progress * 0.2}) 100%)`
  );

  // Check for reduced motion and mobile
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

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
      <div className="mt-16 mx-auto max-w-4xl relative" ref={containerRef}>
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/60 p-2">
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl overflow-hidden aspect-[16/9] relative flex items-center justify-center border border-slate-100">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
            <div className="relative z-10 grid grid-cols-2 gap-8 w-3/4">
              {/* Static Candidate Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="flex gap-3 mb-3">
                  <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center">
                    <span className="w-4 h-4 text-indigo-600">U</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-slate-900">Alex Rivera</div>
                    <div className="text-xs text-slate-500">Full-Stack Developer</div>
                  </div>
                </div>
                <div className="h-1 w-full bg-slate-100 rounded mb-2 overflow-hidden">
                  <div className="h-full w-[85%] bg-indigo-500 rounded"></div>
                </div>
                <div className="text-[10px] text-slate-400" aria-label="Match score 85%">
                  Match Score: 85%
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-indigo-50 text-indigo-700">
                    TypeScript, Next.js, GraphQL
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-green-50 text-green-700">
                    SF, CA
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-emerald-50 text-emerald-700">
                    Available
                  </span>
                </div>
              </div>
              {/* Static Job Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="flex gap-3 mb-3">
                  <div className="w-8 h-8 rounded bg-teal-100 flex items-center justify-center">
                    <span className="w-4 h-4 text-teal-600">B</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-slate-900">Senior Frontend Engineer</div>
                    <div className="text-xs text-slate-500">TechCorp</div>
                  </div>
                </div>
                <div className="h-1 w-full bg-slate-100 rounded mb-2 overflow-hidden">
                  <div className="h-full w-[92%] bg-teal-500 rounded"></div>
                </div>
                <div className="text-[10px] text-slate-400" aria-label="Match score 92%">
                  Match Score: 92%
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-teal-50 text-teal-700">
                    React, TypeScript, Redux
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-blue-50 text-blue-700">
                    Remote
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-orange-50 text-orange-700">
                    Open Role
                  </span>
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
      className="mt-16 mx-auto max-w-4xl relative"
      ref={containerRef}
      style={{ y: backgroundY }}
      aria-label="Interactive demo of AI matching candidates to jobs"
    >
      {/* Control Buttons */}
      <div className="absolute top-4 right-4 z-30 flex gap-2">
        <button
          onClick={handlePlayPause}
          className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={handleReplay}
          className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label="Replay animation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={toggleMultipleMode}
          className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors text-xs"
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
            className="absolute top-4 left-4 z-30 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium"
          >
            {currentCaption}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metric Flash - Hidden on mobile */}
      {!isMobile && (
        <AnimatePresence>
          {showMetric && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-gradient-to-r from-indigo-500 to-teal-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-2xl"
            >
              50,000+ resumes optimized
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <motion.div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200/60 p-2"
        animate={controls}
      >
        <motion.div
          className="rounded-xl overflow-hidden aspect-[16/9] relative flex items-center justify-center border border-slate-100"
          style={{ background: gradientShift }}
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"
            style={{ y: backgroundY }}
          ></motion.div>

          {/* SVG Connector - Hidden on mobile */}
          {!isMobile && (
            <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none">
              <motion.path
                d="M 25% 50% Q 50% 30% 75% 50%"
                stroke="url(#glow)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{ pathLength: connectorPath }}
                transition={{ ease: "easeInOut", duration: 1 }}
              />
              {/* Pulsing glow effect */}
              <motion.path
                d="M 25% 50% Q 50% 30% 75% 50%"
                stroke="url(#pulseGlow)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                style={{ pathLength: connectorPath }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "anticipate" }}
                opacity={connectorPath.get() > 0 ? 1 : 0}
              />
              <defs>
                <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="pulseGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {/* Cards */}
          <div className={`relative z-10 ${multipleMode ? 'flex flex-col gap-4 w-full' : 'grid grid-cols-2 gap-8 w-3/4'}`}>
            {multipleMode ? (
              // Multiple pairs
              <>
                <div className="flex gap-4">
                  {/* Candidate Card 1 */}
                  <motion.div
                    className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 cursor-pointer flex-1"
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{
                      willChange: "transform",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <div className="flex gap-2 mb-2">
                      <div className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center">
                        <span className="w-3 h-3 text-indigo-600 text-[8px]">M</span>
                      </div>
                      <div className="space-y-0">
                        <div className="text-[10px] font-medium text-slate-900">Alex Rivera</div>
                        <div className="text-[8px] text-slate-500">85%</div>
                      </div>
                    </div>
                  </motion.div>
                  {/* Job Card 1 */}
                  <motion.div
                    className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 cursor-pointer flex-1"
                    whileHover={{
                      scale: 1.05,
                      rotateY: -5,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{
                      willChange: "transform",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <div className="flex gap-2 mb-2">
                      <div className="w-6 h-6 rounded bg-teal-100 flex items-center justify-center">
                        <span className="w-3 h-3 text-teal-600 text-[8px]">B</span>
                      </div>
                      <div className="space-y-0">
                        <div className="text-[10px] font-medium text-slate-900">Senior Frontend</div>
                        <div className="text-[8px] text-slate-500">92%</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="flex gap-4">
                  {/* Candidate Card 2 */}
                  <motion.div
                    className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 cursor-pointer flex-1"
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{
                      willChange: "transform",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <div className="flex gap-2 mb-2">
                      <div className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center">
                        <span className="w-3 h-3 text-indigo-600 text-[8px]">S</span>
                      </div>
                      <div className="space-y-0">
                        <div className="text-[10px] font-medium text-slate-900">Jordan Lee</div>
                        <div className="text-[8px] text-slate-500">78%</div>
                      </div>
                    </div>
                  </motion.div>
                  {/* Job Card 2 */}
                  <motion.div
                    className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 cursor-pointer flex-1"
                    whileHover={{
                      scale: 1.05,
                      rotateY: -5,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{
                      willChange: "transform",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <div className="flex gap-2 mb-2">
                      <div className="w-6 h-6 rounded bg-teal-100 flex items-center justify-center">
                        <span className="w-3 h-3 text-teal-600 text-[8px]">F</span>
                      </div>
                      <div className="space-y-0">
                        <div className="text-[10px] font-medium text-slate-900">DevOps Engineer</div>
                        <div className="text-[8px] text-slate-500">88%</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </>
            ) : (
              // Single pair
              <>
                {/* Candidate Card */}
                <motion.div
                  className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer"
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    willChange: "transform",
                    transformStyle: "preserve-3d"
                  }}
                >
                  <div className="flex gap-3 mb-3">
                    <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center">
                      <span className="w-4 h-4 text-indigo-600">U</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-slate-900">Alex Rivera</div>
                      <div className="text-xs text-slate-500">Full-Stack Developer</div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded mb-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-indigo-500 rounded"
                      style={{ width: candidateWidth }}
                      transition={{ ease: "easeInOut", duration: 1 }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400" aria-label="Match score 85%">
                    Match Score: 85%
                  </div>
                  {!isMobile && (
                    <motion.div
                      className="mt-2 flex flex-wrap gap-1"
                      style={{ opacity: badgesOpacity }}
                    >
                      <motion.span
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-indigo-50 text-indigo-700"
                        initial={{ scale: 0 }}
                        animate={{ scale: badgesOpacity.get() }}
                        transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0 }}
                      >
                        TypeScript, Next.js, GraphQL
                      </motion.span>
                      <motion.span
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-green-50 text-green-700"
                        initial={{ scale: 0 }}
                        animate={{ scale: badgesOpacity.get() }}
                        transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.1 }}
                      >
                        SF, CA
                      </motion.span>
                      <motion.span
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-emerald-50 text-emerald-700"
                        initial={{ scale: 0 }}
                        animate={{ scale: badgesOpacity.get() }}
                        transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.2 }}
                      >
                        Available
                      </motion.span>
                    </motion.div>
                  )}
                </motion.div>

                {/* Job Card */}
                <motion.div
                  className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer"
                  whileHover={{
                    scale: 1.05,
                    rotateY: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    willChange: "transform",
                    transformStyle: "preserve-3d"
                  }}
                >
                  <div className="flex gap-3 mb-3">
                    <div className="w-8 h-8 rounded bg-teal-100 flex items-center justify-center">
                      <span className="w-4 h-4 text-teal-600">B</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-slate-900">Senior Frontend Engineer</div>
                      <div className="text-xs text-slate-500">TechCorp</div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded mb-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-teal-500 rounded"
                      style={{ width: jobWidth }}
                      transition={{ ease: "easeInOut", duration: 1 }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400" aria-label="Match score 92%">
                    Match Score: 92%
                  </div>
                  {!isMobile && (
                    <motion.div
                      className="mt-2 flex flex-wrap gap-1"
                      style={{ opacity: badgesOpacity }}
                    >
                      <motion.span
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-teal-50 text-teal-700"
                        initial={{ scale: 0 }}
                        animate={{ scale: badgesOpacity.get() }}
                        transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0 }}
                      >
                        React, TypeScript, Redux
                      </motion.span>
                      <motion.span
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-blue-50 text-blue-700"
                        initial={{ scale: 0 }}
                        animate={{ scale: badgesOpacity.get() }}
                        transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.1 }}
                      >
                        Remote
                      </motion.span>
                      <motion.span
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-orange-50 text-orange-700"
                        initial={{ scale: 0 }}
                        animate={{ scale: badgesOpacity.get() }}
                        transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.2 }}
                      >
                        Open Role
                      </motion.span>
                    </motion.div>
                  )}
                </motion.div>
              </>
            )}
          </div>

          {/* Roadmap Tease - Hidden on mobile */}
          {!isMobile && (
            <motion.div
              className="absolute bottom-4 right-4 opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 5, duration: 1 }}
            >
              <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-[8px] text-slate-500 border border-slate-200">
                Coming Soon: AI Interview Prep
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroDemo;