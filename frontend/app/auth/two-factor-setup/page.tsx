'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Smartphone, Loader2, Copy, AlertTriangle } from 'lucide-react';
import { apiClient } from '@/lib/api/client';

export default function TwoFactorSetupPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetch2FASetup = async () => {
      try {
        const data = await apiClient.auth.setup2FA() as any;
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setVerifying(true);

    try {
      await apiClient.auth.verify2FA(code);
      setStep(3); // Backup codes view
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please check the code.');
    } finally {
      setVerifying(false);
    }
  };

  const handleSkip = () => {
    router.push('/job-seeker/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 text-gray-800">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Setup Complete!
            </h1>
            <p className="text-gray-600 text-sm mb-6 text-center">
              Two-factor authentication is now enabled.
            </p>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-amber-900">Save your backup codes</h3>
                  <p className="text-xs text-amber-800 mt-1">
                    If you lose access to your phone, these codes are the ONLY way to recover your account. Store them securely.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 font-mono text-sm uppercase">
                {backupCodes.map((bc, i) => (
                  <div key={i} className="bg-white p-2 border border-amber-200 text-center rounded">
                    {bc}
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(backupCodes.join('\n'));
                  alert('Backup codes copied to clipboard');
                }}
                className="flex items-center justify-center gap-2 w-full mt-4 text-amber-900 hover:text-amber-700 text-sm font-medium transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copy all codes
              </button>
            </div>

            <Link
              href="/job-seeker/dashboard"
              className="w-full inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-center"
            >
              Finish Setup
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 text-gray-800">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Two-Factor Authentication
            </h1>
            <p className="text-gray-600 text-sm">
              Add an extra layer of security to your account.
            </p>
          </div>

          {/* Step 1: Scan QR Code */}
          <div>
            <p className="text-center text-sm text-gray-600 mb-4">
              Scan the QR code below with your authenticator app (e.g., Google Authenticator, Authy).
            </p>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white border-2 border-gray-100 rounded-xl shadow-inner">
                {qrCode ? (
                  <img src={qrCode} alt="QR Code for 2FA" className="w-48 h-48" />
                ) : (
                  <div className="w-48 h-48 bg-gray-50 flex items-center justify-center">
                    <Smartphone className="w-12 h-12 text-gray-300" />
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center mb-6">
              <p className="text-xs text-gray-500 mb-1">
                Can't scan? Enter this code manually:
              </p>
              <code className="text-sm font-semibold tracking-widest text-indigo-700">
                {secret || 'LOADING...'}
              </code>
            </div>
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="codeInput"
                className="block text-sm font-medium text-gray-700 mb-1 text-center"
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
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="123456"
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-xs mt-2 text-center">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={verifying || code.length !== 6}
                className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
              >
                {verifying && <Loader2 className="w-4 h-4 animate-spin" />}
                {verifying ? 'Verifying...' : 'Verify & Activate'}
              </button>
            </form>
          </div>
        </div>

        {/* Footer for Skip option */}
        <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
          <button
            onClick={handleSkip}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
