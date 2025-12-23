import React from 'react';
import {
  UserCheck,
  Search,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

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

export default ValueProposition;