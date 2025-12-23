'use client';

import { useEffect } from 'react';
import {
  UploadCloud,
  Briefcase,
  Frown,
  SearchX,
  Link,
  User,
  Building2,
  CheckCircle2,
  X,
  Check,
  FileText,
  Kanban,
  Zap,
  Crosshair,
  BarChart3,
  Chrome,
} from 'lucide-react';

export default function PitchDeck() {
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dot');
    const mainContainer = document.querySelector('main');

    const observerOptions = {
      root: mainContainer,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');

          const id = entry.target.getAttribute('id');
          navDots.forEach((dot) => {
            const dotElement = dot as HTMLElement;
            if (dotElement.dataset.target === id) {
              dotElement.setAttribute('data-active', 'true');
            } else {
              dotElement.setAttribute('data-active', 'false');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });

    const handleDotClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const targetId = target.getAttribute('data-target');
      const targetSection = document.getElementById(targetId!);
      targetSection?.scrollIntoView({ behavior: 'smooth' });
    };

    navDots.forEach((dot) => {
      dot.addEventListener('click', handleDotClick);
    });

    return () => {
      observer.disconnect();
      navDots.forEach((dot) => {
        dot.removeEventListener('click', handleDotClick);
      });
    };
  }, []);

  return (
    <>
      <style jsx>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #020617;
          color: #e2e8f0;
          overflow: hidden;
        }

        main {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }
        section {
          scroll-snap-align: start;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        main::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        main {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        section.active .reveal {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 {
          transition-delay: 100ms;
        }
        .reveal-delay-2 {
          transition-delay: 200ms;
        }
        .reveal-delay-3 {
          transition-delay: 300ms;
        }
        .reveal-delay-4 {
          transition-delay: 400ms;
        }

        .text-gradient {
          background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-gradient-primary {
          background: linear-gradient(135deg, #60a5fa 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .glass-panel {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-900/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              C
            </div>
            <span className="text-white font-medium tracking-tight text-sm">CareerForge</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <a href="#home" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Vision
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Team
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">
              Sign In
            </a>
            <a href="#cta" className="bg-white text-slate-950 px-4 py-2 rounded text-xs font-medium hover:bg-slate-200 transition-colors">
              Get Started
            </a>
          </div>
        </div>
      </header>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/20 transition-colors duration-300 data-[active=true]:bg-blue-500 nav-dot"
            data-target={`section-${i + 1}`}
          />
        ))}
      </div>

      <main id="scroll-container">
        {/* SECTION 1: TITLE */}
        <section id="section-1" className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/10 to-transparent pointer-events-none"></div>

          <div className="max-w-6xl mx-auto px-6 text-center z-10 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-medium mb-8 reveal">
              <span className="animate-pulse">●</span> Pitch Deck 2025
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-6 text-white reveal reveal-delay-1">
              Forging the <br />
              <span className="text-gradient-primary">Future of Careers</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 reveal reveal-delay-2">
              The first AI-powered dual-sided career assistant unifying the workflow for ambitious job seekers and modern recruiters.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 reveal reveal-delay-3">
              <button className="px-8 py-4 rounded bg-white text-slate-950 font-medium hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                <UploadCloud className="w-4 h-4" /> Upload Resume
              </button>
              <button className="px-8 py-4 rounded border border-white/10 hover:bg-white/5 text-white font-medium transition-all flex items-center justify-center gap-2">
                <Briefcase className="w-4 h-4" /> Post a Job
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] border border-white/5 rounded-full opacity-20 animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] border border-blue-500/10 rounded-full opacity-30 animate-[spin_40s_linear_infinite_reverse]"></div>
        </section>

        {/* SECTION 2: THE PROBLEM */}
        <section id="section-2" className="bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="reveal">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-6">
                The Job Search <br /> is <span className="text-red-400">Broken</span>.
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                The market is fragmented. Both sides of the marketplace are suffering from inefficiency, noise, and outdated tools.
              </p>
            </div>
            <div className="grid gap-6">
              <div className="glass-panel p-6 rounded-xl relative overflow-hidden group hover:border-red-500/30 transition-colors reveal reveal-delay-1">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Frown className="w-16 h-16 text-red-500" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> Job Seekers
                </h3>
                <p className="text-slate-400 text-sm">
                  Resume tailoring is manual and slow. Applications go into a "black hole". Tracking is done in messy spreadsheets.
                </p>
              </div>
              <div className="glass-panel p-6 rounded-xl relative overflow-hidden group hover:border-red-500/30 transition-colors reveal reveal-delay-2">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <SearchX className="w-16 h-16 text-red-500" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> Recruiters
                </h3>
                <p className="text-slate-400 text-sm">
                  Inundated with unqualified candidates. Screening takes hundreds of hours. Existing ATS tools are clunky and passive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE SOLUTION */}
        <section id="section-3" className="bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 w-full text-center">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-16 reveal">
              One Platform. Two Audiences.<br />
              <span className="text-gradient-primary">Infinite Value.</span>
            </h2>

            <div className="relative grid md:grid-cols-2 gap-8 md:gap-32 items-center">
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 border-t-2 border-dashed border-blue-500/30 z-0"></div>
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-slate-900 border border-blue-500 rounded-full items-center justify-center z-10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Link className="w-4 h-4" />
              </div>

              <div className="glass-panel p-8 rounded-2xl text-left border-blue-500/20 shadow-[0_0_50px_-20px_rgba(59,130,246,0.2)] reveal reveal-delay-1">
                <div className="w-12 h-12 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Career Copilot</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  AI that rewrites resumes for every job, tracks application status automatically, and suggests skills to close the gap.
                </p>
              </div>

              <div className="glass-panel p-8 rounded-2xl text-left border-purple-500/20 shadow-[0_0_50px_-20px_rgba(168,85,247,0.2)] reveal reveal-delay-2">
                <div className="w-12 h-12 rounded bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Recruitment Engine</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Automated screening that matches candidates based on verified skills, not keywords. Instant shortlisting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: VALUE PROP */}
        <section id="section-4" className="relative bg-slate-950 flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          <div className="max-w-5xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 relative z-10">
            <div className="reveal">
              <div className="text-6xl text-blue-500/20 font-serif mb-4">"</div>
              <h3 className="text-3xl font-medium text-white tracking-tight mb-4 leading-tight">
                Find better opportunities, <br />
                <span className="text-blue-400">10x faster</span>.
              </h3>
              <p className="text-slate-500 border-l border-white/10 pl-4">For Job Seekers</p>
            </div>

            <div className="md:text-right reveal reveal-delay-2">
              <div className="text-6xl text-purple-500/20 font-serif mb-4">"</div>
              <h3 className="text-3xl font-medium text-white tracking-tight mb-4 leading-tight">
                Reduce hiring workload <br />
                <span className="text-purple-400">instantly</span>.
              </h3>
              <p className="text-slate-500 border-r border-white/10 pr-4 inline-block">For HR Teams</p>
            </div>
          </div>
        </section>

        {/* SECTION 5: USP */}
        <section id="section-5" className="bg-slate-950">
          <div className="max-w-5xl mx-auto px-6 w-full">
            <div className="text-center mb-16 reveal">
              <h2 className="text-4xl font-medium tracking-tighter text-white">The Only Dual-Sided Assistant</h2>
              <p className="text-slate-400 mt-4">Why we win where others capture only half the value.</p>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden reveal reveal-delay-1">
              <div className="grid grid-cols-4 bg-white/5 border-b border-white/10 text-xs font-medium text-slate-300 uppercase tracking-wider">
                <div className="p-4">Feature</div>
                <div className="p-4 text-center text-white bg-blue-500/10 border-x border-white/5">CareerForge</div>
                <div className="p-4 text-center opacity-50">LinkedIn</div>
                <div className="p-4 text-center opacity-50">Rezi/Teal</div>
              </div>

              <div className="grid grid-cols-4 border-b border-white/5 items-center hover:bg-white/[0.02]">
                <div className="p-4 text-sm text-slate-300">AI Resume Tailoring</div>
                <div className="p-4 flex justify-center border-x border-white/5 bg-blue-500/[0.02]">
                  <CheckCircle2 className="text-blue-400 w-5 h-5" />
                </div>
                <div className="p-4 flex justify-center opacity-30">
                  <X className="w-4 h-4" />
                </div>
                <div className="p-4 flex justify-center opacity-70">
                  <Check className="w-4 h-4" />
                </div>
              </div>

              <div className="grid grid-cols-4 border-b border-white/5 items-center hover:bg-white/[0.02]">
                <div className="p-4 text-sm text-slate-300">Automated Job Tracking</div>
                <div className="p-4 flex justify-center border-x border-white/5 bg-blue-500/[0.02]">
                  <CheckCircle2 className="text-blue-400 w-5 h-5" />
                </div>
                <div className="p-4 flex justify-center opacity-30">
                  <X className="w-4 h-4" />
                </div>
                <div className="p-4 flex justify-center opacity-70">
                  <Check className="w-4 h-4" />
                </div>
              </div>

              <div className="grid grid-cols-4 border-b border-white/5 items-center hover:bg-white/[0.02]">
                <div className="p-4 text-sm text-slate-300">Direct Recruiter Matching</div>
                <div className="p-4 flex justify-center border-x border-white/5 bg-blue-500/[0.02]">
                  <CheckCircle2 className="text-blue-400 w-5 h-5" />
                </div>
                <div className="p-4 flex justify-center opacity-50">
                  <Check className="w-4 h-4" />
                </div>
                <div className="p-4 flex justify-center opacity-30">
                  <X className="w-4 h-4" />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center hover:bg-white/[0.02]">
                <div className="p-4 text-sm text-slate-300">Unified Skill Verification</div>
                <div className="p-4 flex justify-center border-x border-white/5 bg-blue-500/[0.02]">
                  <CheckCircle2 className="text-blue-400 w-5 h-5" />
                </div>
                <div className="p-4 flex justify-center opacity-30">
                  <X className="w-4 h-4" />
                </div>
                <div className="p-4 flex justify-center opacity-30">
                  <X className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CORE FEATURES */}
        <section id="section-6" className="bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="mb-12 reveal">
              <h2 className="text-4xl font-medium tracking-tighter text-white">Tools That Work For Everyone</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors reveal">
                <div className="w-10 h-10 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-white font-medium mb-2">Smart Resume Builder</h4>
                <p className="text-sm text-slate-400">
                  Generates ATS-optimized resumes tailored to specific job descriptions in seconds.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors reveal reveal-delay-1">
                <div className="w-10 h-10 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                  <Kanban className="w-5 h-5" />
                </div>
                <h4 className="text-white font-medium mb-2">Application Kanban</h4>
                <p className="text-sm text-slate-400">
                  Drag-and-drop tracking for all your applications across different platforms.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors reveal reveal-delay-2">
                <div className="w-10 h-10 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-white font-medium mb-2">Instant Shortlisting</h4>
                <p className="text-sm text-slate-400">
                  Recruiters see the top 1% of matches immediately, filtering out noise.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors reveal">
                <div className="w-10 h-10 rounded bg-pink-500/20 text-pink-400 flex items-center justify-center mb-4">
                  <Crosshair className="w-5 h-5" />
                </div>
                <h4 className="text-white font-medium mb-2">Bias Removal</h4>
                <p className="text-sm text-slate-400">
                  Skill-first matching algorithms that hide PII until the interview stage.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors reveal reveal-delay-1">
                <div className="w-10 h-10 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h4 className="text-white font-medium mb-2">Market Analytics</h4>
                <p className="text-sm text-slate-400">
                  Salary insights and skill demand trends for both candidates and companies.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors reveal reveal-delay-2">
                <div className="w-10 h-10 rounded bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
                  <Chrome className="w-5 h-5" />
                </div>
                <h4 className="text-white font-medium mb-2">Extension</h4>
                <p className="text-sm text-slate-400">
                  Save jobs and auto-fill applications directly from LinkedIn and Indeed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: MARKET OPPORTUNITY */}
        <section id="section-7" className="bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 reveal">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-6">
                A $3B+ Market <br /> Ready for Disruption
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                The recruitment tech stack is bloated. Companies spend billions on tools that don't talk to each other. Candidates spend billions on upskilling and career services. We sit in the middle.
              </p>
              <div className="flex flex-col gap-4 border-l-2 border-white/10 pl-6">
                <div>
                  <span className="text-3xl font-medium text-white">$480B</span>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Global Recruitment Market</p>
                </div>
                <div>
                  <span className="text-3xl font-medium text-white">400M+</span>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Job Seekers on LinkedIn</p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex items-center justify-center reveal reveal-delay-2">
              <div className="relative w-80 h-80 flex items-center justify-center">
                <div className="absolute w-80 h-80 rounded-full border border-slate-700 bg-slate-800/20 flex items-start justify-center pt-4">
                  <span className="text-xs text-slate-500 font-medium">TAM $28B</span>
                </div>
                <div className="absolute w-56 h-56 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-start justify-center pt-4 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                  <span className="text-xs text-blue-400 font-medium">SAM $3.2B</span>
                </div>
                <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <span className="block text-white font-bold text-lg">$150M</span>
                    <span className="text-[10px] text-white/80">SOM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: COMPETITIVE LANDSCAPE */}
        <section id="section-8" className="bg-slate-950">
          <div className="max-w-6xl mx-auto px-6 w-full text-center">
            <h2 className="text-4xl font-medium tracking-tighter text-white mb-4 reveal">The Competitive Gap</h2>
            <p className="text-slate-400 mb-16 max-w-2xl mx-auto reveal reveal-delay-1">
              Others solve one piece of the puzzle. We solve the whole picture.
            </p>

            <div className="relative h-[400px] w-full border-l border-b border-slate-700/50 reveal reveal-delay-2">
              <div className="absolute -left-12 top-1/2 -rotate-90 text-xs text-slate-500 tracking-widest uppercase">
                Platform Utility
              </div>
              <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-xs text-slate-500 tracking-widest uppercase">
                User Focus (Seeker → Recruiter)
              </div>

              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                <div className="bg-white/[0.01] border-r border-b border-slate-800/50"></div>
                <div className="bg-white/[0.01] border-b border-slate-800/50"></div>
                <div className="bg-white/[0.01] border-r border-slate-800/50"></div>
                <div className="bg-blue-500/[0.03]"></div>
              </div>

              <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm">
                Resume.io
              </div>
              <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm">
                Teal
              </div>
              <div className="absolute top-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm">
                LinkedIn
              </div>
              <div className="absolute top-3/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm">
                Indeed
              </div>

              <div className="absolute top-[15%] right-[15%] transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] flex items-center justify-center text-white font-bold text-lg animate-pulse">
                  C
                </div>
                <span className="text-white font-medium text-sm bg-slate-900 px-2 py-1 rounded border border-white/10">
                  CareerForge
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: IMPACT */}
        <section id="section-9" className="bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="text-center mb-16 reveal">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white">
                CareerForge Delivers <span className="text-gradient-primary">Real Results</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center reveal">
                <div className="text-5xl font-medium text-white mb-2 tracking-tight">3x</div>
                <div className="text-sm text-blue-400 font-medium uppercase tracking-wide mb-3">Interview Rate</div>
                <p className="text-xs text-slate-500">For users using AI tailoring vs generic resumes.</p>
              </div>
              <div className="text-center reveal reveal-delay-1">
                <div className="text-5xl font-medium text-white mb-2 tracking-tight">60%</div>
                <div className="text-sm text-purple-400 font-medium uppercase tracking-wide mb-3">Time Saved</div>
                <p className="text-xs text-slate-500">Reduction in screening time for HR teams.</p>
              </div>
              <div className="text-center reveal reveal-delay-2">
                <div className="text-5xl font-medium text-white mb-2 tracking-tight">95%</div>
                <div className="text-sm text-green-400 font-medium uppercase tracking-wide mb-3">Accuracy</div>
                <p className="text-xs text-slate-500">In parsing and matching candidate skills.</p>
              </div>
              <div className="text-center reveal reveal-delay-3">
                <div className="text-5xl font-medium text-white mb-2 tracking-tight">10k+</div>
                <div className="text-sm text-pink-400 font-medium uppercase tracking-wide mb-3">Users</div>
                <p className="text-xs text-slate-500">Grown organically in the last 3 months.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: VISION */}
        <section id="section-10" className="relative bg-slate-950 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-slate-950"></div>
          <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="max-w-4xl mx-auto px-6 w-full text-center relative z-10">
            <span className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4 block reveal">
              The Roadmap
            </span>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-white mb-8 reveal reveal-delay-1">
              LinkedIn + ATS <br /> of the Future
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto reveal reveal-delay-2">
              We are starting with tools. We are building the network. We will become the infrastructure for the global workforce.
            </p>

            <div className="flex flex-wrap justify-center gap-4 reveal reveal-delay-3">
              <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300">
                Enterprise Integrations
              </span>
              <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300">
                Automated Coaching
              </span>
              <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300">
                Skill Verification API
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 11: TEAM */}
        <section id="section-11" className="bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <h2 className="text-4xl font-medium tracking-tighter text-white mb-16 text-center reveal">
              The Team Forging the Future
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="group reveal">
                <div className="h-64 bg-slate-800 rounded-xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-lg font-medium">Alex Rivera</h3>
                    <p className="text-blue-400 text-sm">Co-Founder & CEO</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Ex-Product at LinkedIn. Scaled marketplace products to 10M+ users.
                </p>
              </div>

              <div className="group reveal reveal-delay-1">
                <div className="h-64 bg-slate-800 rounded-xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-lg font-medium">Sarah Chen</h3>
                    <p className="text-purple-400 text-sm">Co-Founder & CTO</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  AI Researcher. Previously built NLP matching engines for Google Hire.
                </p>
              </div>

              <div className="group reveal reveal-delay-2">
                <div className="h-64 bg-slate-800 rounded-xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-lg font-medium">Michael Ross</h3>
                    <p className="text-green-400 text-sm">Head of Growth</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Growth Lead at 2 Unicorns. Expert in B2C2B acquisition loops.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 12: CTA */}
        <section id="section-12" className="bg-slate-950 relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950/50 to-slate-950 pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-6 w-full text-center z-10">
            <h2 className="text-5xl md:text-6xl font-medium tracking-tighter text-white mb-8 reveal">
              Join CareerForge Today
            </h2>
            <p className="text-xl text-slate-400 mb-10 reveal reveal-delay-1">
              Be part of the recruitment revolution.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20 reveal reveal-delay-2">
              <button className="px-8 py-4 rounded bg-blue-600 text-white font-medium hover:bg-blue-500 transition-all shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)]">
                Upload Resume
              </button>
              <button className="px-8 py-4 rounded bg-white text-slate-950 font-medium hover:bg-slate-200 transition-all">
                Partner With Us
              </button>
            </div>

            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 reveal reveal-delay-3">
              <p>&copy; 2024 CareerForge Inc.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
                <a href="#" className="hover:text-white">
                  Terms
                </a>
                <a href="#" className="hover:text-white">
                  Security
                </a>
                <a href="#" className="hover:text-white">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}