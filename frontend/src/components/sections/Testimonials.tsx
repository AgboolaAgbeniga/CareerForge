import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="bg-canvas text-ink py-section border-b border-hairline">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="border-x border-hairline px-6 py-12">
            <div className="type-display-xxl mb-4">50k+</div>
            <div className="type-mono-caps-eyebrow text-ink/70">Resumes Optimized</div>
          </div>
          <div className="border-r border-hairline px-6 py-12 md:border-l-0 border-l border-hairline">
            <div className="type-display-xxl mb-4">30%</div>
            <div className="type-mono-caps-eyebrow text-ink/70">Faster Hiring Cycles</div>
          </div>
          <div className="border-r border-hairline px-6 py-12 md:border-l-0 border-l border-hairline">
            <div className="type-display-xxl mb-4">95%</div>
            <div className="type-mono-caps-eyebrow text-ink/70">User Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;