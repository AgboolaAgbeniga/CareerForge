'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Smartphone, Loader2, Copy, AlertTriangle } from 'lucide-react';
import { useSetup2FA, useVerify2FA } from '@/hooks/queries/useAuth';
import AuthLayout from '@/components/layout/AuthLayout';
import Button from '@/components/ui/Button';

export default function TwoFactorSetupPage() {
  const [step, setStep] = useState(1);
  const setup2FAMutation = useSetup2FA();
  const verify2FAMutation = useVerify2FA();
  const [loading, setLoading] = useState(true);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetch2FASetup = async () => {
      try {
        const data = await setup2FAMutation.mutateAsync();
        setQrCode(data.qrCode);
        setSecret(data.secret);
        setBackupCodes(data.backupCodes);
      } catch (err: any) {
        setError(err.message || 'Failed to initialize 2FA setup');
      } finally {
        setLoading(false);
      }
    };

    fetch2FASetup();
  }, []); // Intentionally only run once

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await verify2FAMutation.mutateAsync({ code });
      setStep(3); // Backup codes view
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please check the code.');
    }
  };

  const handleSkip = () => {
    router.push('/job-seeker/dashboard');
  };

  if (loading) {
    return (
      <AuthLayout title="Setting up 2FA…" subtitle="Please wait while we initialize the secure setup.">
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-on-dark" />
        </div>
      </AuthLayout>
    );
  }

  if (step === 3) {
    return (
      <AuthLayout title="Setup Complete!" subtitle="Two-factor authentication is now enabled.">
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-success/10 border border-success/30 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-sm mb-6 text-left">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <h3 className="type-body-sm font-semibold text-amber-500">Save your backup codes</h3>
                <p className="type-caption text-amber-500/80 mt-1">
                  If you lose access to your phone, these codes are the ONLY way to recover your account. Store them securely.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 font-mono type-caption uppercase">
              {backupCodes.map((bc, i) => (
                <div key={i} className="bg-canvas-dark p-2 border border-surface-dark-soft text-center rounded-sm text-on-dark">
                  {bc}
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(backupCodes.join('\n'));
                alert('Backup codes copied to clipboard');
              }}
              className="flex items-center justify-center gap-2 w-full mt-4 text-amber-500 hover:text-amber-400 type-body-sm font-medium transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy all codes
            </button>
          </div>

          <Link href="/job-seeker/dashboard" className="block w-full">
            <Button variant="primary" className="w-full">
              Finish Setup
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Two-Factor Authentication" subtitle="Add an extra layer of security to your account.">
      <div className="text-center">
        <p className="type-body-sm text-on-dark/70 mb-4">
          Scan the QR code below with your authenticator app (e.g., Google Authenticator, Authy).
        </p>

        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white rounded-sm">
            {qrCode ? (
              <img src={qrCode} alt="QR Code for 2FA" className="w-48 h-48" />
            ) : (
              <div className="w-48 h-48 bg-surface-dark flex items-center justify-center">
                <Smartphone className="w-12 h-12 text-on-dark/30" />
              </div>
            )}
          </div>
        </div>

        <div className="bg-surface-dark-soft p-3 rounded-sm mb-6">
          <p className="type-caption text-on-dark/50 mb-1">
            Can&apos;t scan? Enter this code manually:
          </p>
          <code className="type-body-md font-semibold tracking-widest text-on-dark">
            {secret || 'LOADING...'}
          </code>
        </div>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="codeInput"
            className="block type-body-sm font-medium text-on-dark mb-1"
          >
            Enter the 6-digit code from your app
          </label>
          <input
            type="text"
            id="codeInput"
            name="code"
            required
            maxLength={6}
            pattern="\d{6}"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-3 py-3 bg-canvas-dark border border-surface-dark-soft rounded-sm text-center type-display-md tracking-widest text-on-dark focus:outline-none focus:border-on-dark transition-colors"
            placeholder="123456"
            autoFocus
          />
          {error && (
            <p className="text-error type-caption mt-2">
              {error}
            </p>
          )}
          <Button
            type="submit"
            variant="primary"
            disabled={verify2FAMutation.isPending || code.length !== 6}
            className="w-full mt-4"
          >
            {verify2FAMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2 inline" />
                Verifying...
              </>
            ) : (
              'Verify & Activate'
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-surface-dark-soft">
          <button
            onClick={handleSkip}
            className="type-body-sm font-medium text-on-dark/70 hover:text-on-dark transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
