import React from 'react';
import Button from '@/components/ui/Button';

const CallToAction: React.FC = () => {
  return (
    <section className="bg-canvas-dark text-on-dark py-32 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="type-display-xxl mb-8">
          Ready to grow?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg">
            I'm a Job Seeker
          </Button>
          <Button variant="ghostOnDark" size="lg">
            I'm a Recruiter
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;