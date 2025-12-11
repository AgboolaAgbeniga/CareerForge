import React from 'react';

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

export default CallToAction;