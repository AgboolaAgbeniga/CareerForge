'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import Button from '@/components/ui/Button';

export default function RecruiterOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      router.push('/recruiter/recruiter-dashboard');
    }, 1000);
  };

  return (
    <div className="bg-canvas text-ink min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-hairline bg-canvas sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ink rounded-sm flex items-center justify-center">
              <Icon icon="lucide:building-2" className="text-canvas" width={18} />
            </div>
            <span className="type-body-md font-semibold text-ink">
              Company Setup
            </span>
          </div>
          <div className="type-mono-caption text-body">
            STEP {step} OF 3
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-sm ${
                  s <= step ? 'bg-ink' : 'bg-surface-dark'
                }`}
              />
            ))}
          </div>

          {step === 1 && (
            <div className="fade-in space-y-6">
              <h1 className="type-display-lg text-ink mb-2">
                Welcome to CareerForge! Let's get your company set up.
              </h1>
              <p className="type-body-md text-body mb-8">
                First, tell us a bit about your organization so we can tailor the experience.
              </p>

              <div className="cf-card p-6 space-y-5">
                <div>
                  <label className="block type-mono-caps-eyebrow text-body mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Corporation"
                    className="cf-input"
                  />
                </div>
                <div>
                  <label className="block type-mono-caps-eyebrow text-body mb-2">
                    Industry
                  </label>
                  <select className="cf-input appearance-none">
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Retail</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block type-mono-caps-eyebrow text-body mb-2">
                    Company Size
                  </label>
                  <select className="cf-input appearance-none">
                    <option>1-50 Employees</option>
                    <option>51-200 Employees</option>
                    <option>201-1000 Employees</option>
                    <option>1000+ Employees</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="fade-in space-y-6">
              <h1 className="type-display-lg text-ink mb-2">
                Hiring Goals
              </h1>
              <p className="type-body-md text-body mb-8">
                What kind of talent are you looking to connect with?
              </p>

              <div className="cf-card p-6 space-y-5">
                <div>
                  <label className="block type-mono-caps-eyebrow text-body mb-2">
                    Primary Hiring Focus
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'Operations'].map((dept) => (
                      <label key={dept} className="flex items-center gap-3 p-3 border border-hairline rounded-sm cursor-pointer hover:bg-surface-dark transition-colors">
                        <input type="checkbox" className="cf-checkbox" />
                        <span className="type-body-sm text-ink">{dept}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block type-mono-caps-eyebrow text-body mb-2">
                    Expected Hiring Volume (Yearly)
                  </label>
                  <select className="cf-input appearance-none">
                    <option>1-10 Hires</option>
                    <option>11-50 Hires</option>
                    <option>51-100 Hires</option>
                    <option>100+ Hires</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="fade-in space-y-6">
              <h1 className="type-display-lg text-ink mb-2">
                Team Setup
              </h1>
              <p className="type-body-md text-body mb-8">
                Invite team members to collaborate on hiring. You can also do this later.
              </p>

              <div className="cf-card p-6 space-y-5">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Colleague's email address"
                      className="cf-input flex-1"
                    />
                    <Button variant="outline">
                      Send Invite
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Colleague's email address"
                      className="cf-input flex-1"
                    />
                    <Button variant="outline">
                      Send Invite
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-hairline">
                  <div className="flex items-center gap-3 p-3 bg-surface-dark border border-hairline rounded-sm">
                    <Icon icon="lucide:info" className="text-body" />
                    <p className="type-mono-caption text-body">
                      Invited members will receive an email to join your company workspace.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-hairline mt-8">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 1 || loading}
            className={step === 1 ? 'invisible' : ''}
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <>
                <Icon icon="lucide:loader-2" className="animate-spin" />
                Setting up...
              </>
            ) : step === 3 ? (
              'Complete Setup'
            ) : (
              'Continue'
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}
