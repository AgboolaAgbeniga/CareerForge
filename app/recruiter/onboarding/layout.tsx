import { OnboardingHeader, OnboardingFooter } from '../../../components';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  microcopy: string;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  canGoBack?: boolean;
  canGoNext?: boolean;
}

export default function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  stepTitle,
  microcopy,
  onBack,
  onNext,
  nextLabel,
  canGoBack,
  canGoNext,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <OnboardingHeader
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepTitle={stepTitle}
      />
      <main className="flex-1">
        {children}
      </main>
      <OnboardingFooter
        microcopy={microcopy}
        onBack={onBack}
        onNext={onNext}
        nextLabel={nextLabel}
        canGoBack={canGoBack}
        canGoNext={canGoNext}
      />
    </div>
  );
}