import React from 'react';
import {
  UploadCloud,
  Briefcase,
  UserCheck,
  Search,
  CheckCircle2,
  ArrowRight,
  FileText,
  Sparkles,
  Target,
  BarChart2,
  Zap,
  Globe,
  Quote,
} from 'lucide-react';

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

        {/* Abstract UI Illustration */}
        <div
          className="mt-16 mx-auto max-w-4xl relative animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/60 p-2 transform rotate-1 hover:rotate-0 transition-transform duration-700">
            <div className="bg-slate-50 rounded-xl overflow-hidden aspect-[16/9] relative flex items-center justify-center border border-slate-100">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
              {/* Decorative Elements mimicking UI */}
              <div className="relative z-10 grid grid-cols-2 gap-8 w-3/4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                  <div className="flex gap-3 mb-3">
                    <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 w-20 bg-slate-200 rounded"></div>
                      <div className="h-2 w-12 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded mb-2 overflow-hidden">
                    <div className="h-full w-[85%] bg-indigo-500 rounded"></div>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Match Score: 85%
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                  <div className="flex gap-3 mb-3">
                    <div className="w-8 h-8 rounded bg-teal-100 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-teal-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 w-20 bg-slate-200 rounded"></div>
                      <div className="h-2 w-12 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded mb-2 overflow-hidden">
                    <div className="h-full w-[92%] bg-teal-500 rounded"></div>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Match Score: 92%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

const ValueProposition: React.FC = () => {
  return (
    <section className="bg-slate-50 py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Job Seeker Column */}
          <div className="bg-white rounded-[2rem] p-8 lg:p-12 border border-slate-200/50 shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 text-indigo-600">
              <UserCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900 mb-4 tracking-tight">
              For Job Seekers
            </h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Discover your dream job with our AI-powered platform. Upload your
              resume and get matched with opportunities that fit your skills and
              preferences.
            </p>

            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                <span className="text-slate-600 text-sm">
                  AI-powered job matching
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                <span className="text-slate-600 text-sm">
                  Resume optimization
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                <span className="text-slate-600 text-sm">
                  Application tracking
                </span>
              </li>
            </ul>

            <a
              href="#"
              className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 group"
            >
              Get Started{' '}
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Recruiter Column */}
          <div className="bg-white rounded-[2rem] p-8 lg:p-12 border border-slate-200/50 shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-8 text-teal-600">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900 mb-4 tracking-tight">
              For Recruiters
            </h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Find the best candidates quickly with our intelligent matching
              system.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                'Smart candidate screening',
                'Automated resume parsing',
                'Advanced analytics',
              ].map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                  <span className="text-slate-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-700 group"
            >
              Start Hiring{' '}
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
            Powerful Features
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Everything you need to succeed in your job search or hiring process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Resume Analysis',
              description:
                'Get detailed insights into your resume with AI-powered analysis.',
              learnMore: 'Learn more',
            },
            {
              title: 'AI Matching',
              description:
                'Our advanced algorithms find the perfect job matches for you.',
              learnMore: 'Learn more',
            },
            {
              title: 'Career Guidance',
              description:
                'Receive personalized career advice and recommendations.',
              learnMore: 'Learn more',
            },
            {
              title: 'Analytics Dashboard',
              description:
                'Track your job search progress with comprehensive analytics.',
              learnMore: 'Learn more',
            },
            {
              title: 'Fast Application',
              description:
                'Apply to jobs in seconds with our streamlined process.',
              learnMore: 'Learn more',
            },
            {
              title: 'Global Reach',
              description: 'Connect with opportunities worldwide.',
              learnMore: 'Learn more',
            },
          ].map((item: any, index: number) => {
            const colors = [
              { bg: 'bg-indigo-600', text: 'text-indigo-600' },
              { bg: 'bg-purple-600', text: 'text-purple-600' },
              { bg: 'bg-teal-600', text: 'text-teal-600' },
              { bg: 'bg-blue-600', text: 'text-blue-600' },
              { bg: 'bg-orange-600', text: 'text-orange-600' },
              { bg: 'bg-pink-600', text: 'text-pink-600' },
            ];
            const color = colors[index % colors.length];
            return (
              <div
                key={index}
                className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center ${color.text} mb-6 shadow-sm`}
                >
                  {/* Icon would be dynamic, but for now keep hardcoded or add to json */}
                  {index === 0 && <FileText className="w-5 h-5" />}
                  {index === 1 && <Sparkles className="w-5 h-5" />}
                  {index === 2 && <Target className="w-5 h-5" />}
                  {index === 3 && <BarChart2 className="w-5 h-5" />}
                  {index === 4 && <Zap className="w-5 h-5" />}
                  {index === 5 && <Globe className="w-5 h-5" />}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  {item.description}
                </p>
                <span
                  className={`text-xs font-medium ${color.text} group-hover:underline`}
                >
                  {item.learnMore}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-indigo-50/50 relative">
      <div className="curve-top transform rotate-180">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">
            What Our Users Say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: 'This platform changed my job search completely!',
              name: 'Sarah Johnson',
              role: 'Software Engineer',
            },
            {
              quote: 'Hiring has never been easier.',
              name: 'Mike Chen',
              role: 'HR Manager',
            },
          ].map((item: any, index: number) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative"
            >
              <Quote
                className={`absolute top-8 right-8 w-8 h-8 fill-opacity-10 ${index === 0 ? 'text-indigo-100 fill-indigo-50' : 'text-teal-100 fill-teal-50'}`}
              />
              <p className="text-slate-700 text-lg mb-6 leading-relaxed">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name.split(' ')[0]}&backgroundColor=e5e7eb`}
                  alt="User"
                  className="w-10 h-10 rounded-full bg-gray-100"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CallToAction: React.FC = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-indigo-900/40">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-indigo-200 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of job seekers and recruiters using our platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-slate-900 px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              I'm a Job Seeker
            </button>
            <button className="bg-transparent border border-white/30 text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors">
              I'm a Recruiter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div>
      <Hero />
      <ValueProposition />
      <FeaturesGrid />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
