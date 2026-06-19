import React from 'react';

const FeaturesGrid: React.FC = () => {
  return (
    <section className="bg-canvas-dark text-on-dark py-section border-b border-surface-dark-soft">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="type-display-xl mb-6">
            Everything you need.
          </h2>
          <p className="type-body-lg text-on-dark/70 max-w-2xl mx-auto">
            Powerful AI tools designed for both job seekers and recruiters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
          {[
            { title: 'AI Resume Builder', desc: 'Create tailored resumes instantly with ATS optimization.' },
            { title: 'LinkedIn Optimization', desc: 'Boost visibility with AI suggestions for your profile.' },
            { title: 'Smart Job Matching', desc: 'Get personalized job recommendations based on your skills.' },
            { title: 'Recruiter Dashboard', desc: 'Manage postings and candidates easily with analytics.' },
            { title: 'AI Candidate Ranking', desc: 'Shortlist talent in seconds with intelligent scoring.' },
            { title: 'Global Reach', desc: 'Connect job seekers and recruiters worldwide.' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col border-t border-surface-dark-soft pt-6">
              <div className="type-mono-caps-eyebrow text-on-dark opacity-50 mb-4">Feature 0{idx + 1}</div>
              <h3 className="type-display-md mb-3">
                {item.title}
              </h3>
              <p className="type-body-md text-on-dark/70">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;