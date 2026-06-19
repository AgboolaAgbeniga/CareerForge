import React from 'react';

const ValueProposition: React.FC = () => {
  return (
    <section className="bg-canvas py-section border-b border-hairline">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          <div className="flex flex-col">
            <div className="type-mono-caps-eyebrow text-ink mb-6">01 / For Job Seekers</div>
            <h2 className="type-display-xl text-ink mb-6">
              Land more interviews.
            </h2>
            <p className="type-body-lg text-ink/70 mb-8 max-w-md">
              Tailored, ATS-friendly resumes and LinkedIn profile optimization directly linked to personalized job recommendations.
            </p>
            <a href="/auth/signup" className="type-mono-caps-eyebrow text-ink border-b border-ink/30 pb-1 self-start hover:border-ink transition-colors">
              Get Started →
            </a>
          </div>

          <div className="flex flex-col">
            <div className="type-mono-caps-eyebrow text-ink mb-6">02 / For Recruiters</div>
            <h2 className="type-display-xl text-ink mb-6">
              Hire faster with AI.
            </h2>
            <p className="type-body-lg text-ink/70 mb-8 max-w-md">
              Intelligent candidate screening and ranking accelerates your hiring cycle, bringing the best talent to the top instantly.
            </p>
            <a href="/auth/signup" className="type-mono-caps-eyebrow text-ink border-b border-ink/30 pb-1 self-start hover:border-ink transition-colors">
              Start Hiring →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;