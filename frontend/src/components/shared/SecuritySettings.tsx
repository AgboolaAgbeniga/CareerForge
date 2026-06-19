'use client';

import React, { useState, useEffect } from 'react';
import {
    ShieldCheck,
    ShieldAlert,
    Lock,
    Smartphone,
    RefreshCw,
    Trash2,
    Loader2,
    Copy,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { useUser, useDisable2FA, useRegenerateBackupCodes } from '@/hooks/queries/useAuth';

const SecuritySettings: React.FC = () => {
    const { data: userProfile, isLoading: loading } = useUser();
    const disable2FAMutation = useDisable2FA();
    const regenerateCodesMutation = useRegenerateBackupCodes();

    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showDisableForm, setShowDisableForm] = useState(false);
    const [showBackupCodes, setShowBackupCodes] = useState(false);
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [newBackupCodes, setNewBackupCodes] = useState<string[]>([]);

    const clearMessages = () => {
        setError('');
        setSuccess('');
    };

    const handleDisable2FA = async (e: React.FormEvent) => {
        e.preventDefault();
        clearMessages();
        setActionLoading(true);

        try {
            await disable2FAMutation.mutateAsync({ password, code: code || undefined });
            setSuccess('Two-factor authentication has been disabled.');
            setShowDisableForm(false);
            setPassword('');
            setCode('');
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to disable 2FA. Please check your credentials.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleRegenerateCodes = async () => {
        if (!window.confirm('Are you sure? Old backup codes will stop working.')) return;

        const pass = window.prompt('Please enter your password to regenerate backup codes:');
        if (!pass) return;

        clearMessages();
        setActionLoading(true);

        try {
            const data = await regenerateCodesMutation.mutateAsync({ password: pass });
            setNewBackupCodes(data.backupCodes);
            setShowBackupCodes(true);
            setSuccess('New backup codes generated successfully.');
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to regenerate backup codes.');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    const is2FAEnabled = userProfile?.twoFactorEnabled;

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${is2FAEnabled ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                                {is2FAEnabled ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Two-Factor Authentication (2FA)</h3>
                                <p className="text-sm text-gray-500 dark:text-slate-400">
                                    {is2FAEnabled
                                        ? 'Your account is protected with an extra layer of security.'
                                        : 'Add an extra layer of security to your account by requiring more than just a password.'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${is2FAEnabled ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'}`}>
                                {is2FAEnabled ? 'Enabled' : 'Disabled'}
                            </span>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg flex items-center gap-3 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-4 bg-green-50 border border-green-100 text-green-700 rounded-lg flex items-center gap-3 dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-400">
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{success}</p>
                        </div>
                    )}

                    {!is2FAEnabled ? (
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="/auth/two-factor-setup"
                                className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors inline-block text-center shadow-lg shadow-indigo-500/20"
                            >
                                Setup 2FA
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setShowDisableForm(!showDisableForm)}
                                    className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                    Disable 2FA
                                </button>
                                <button
                                    onClick={handleRegenerateCodes}
                                    className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                                >
                                    <RefreshCw className={`w-4 h-4 ${actionLoading ? 'animate-spin' : ''}`} />
                                    Regenerate Backup Codes
                                </button>
                            </div>

                            {showDisableForm && (
                                <form onSubmit={handleDisable2FA} className="mt-6 p-6 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-slate-700">
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Confirm Deactivation</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Confirm Password</label>
                                            <input
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">2FA Code or Backup Code (Optional)</label>
                                            <input
                                                type="text"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}
                                                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono dark:text-white"
                                                placeholder="123456"
                                            />
                                        </div>
                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="submit"
                                                disabled={actionLoading}
                                                className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2 disabled:bg-red-400"
                                            >
                                                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                Confirm Disable
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowDisableForm(false)}
                                                className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}

                            {showBackupCodes && (
                                <div className="mt-6 p-6 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-900/30">
                                    <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-400 mb-2">Your New Backup Codes</h4>
                                    <p className="text-xs text-amber-800 dark:text-amber-500 mb-4">Make sure to save these codes in a safe place. They will only be shown once.</p>
                                    <div className="grid grid-cols-2 gap-2 font-mono text-sm uppercase">
                                        {newBackupCodes.map((bc, i) => (
                                            <div key={i} className="bg-white dark:bg-slate-900 p-2 border border-amber-200 dark:border-amber-900/30 text-center rounded dark:text-white">
                                                {bc}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(newBackupCodes.join('\n'));
                                            alert('Backup codes copied');
                                        }}
                                        className="mt-4 flex items-center gap-2 text-amber-900 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 text-sm font-medium"
                                    >
                                        <Copy className="w-4 h-4" />
                                        Copy all
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-gray-500 dark:text-slate-400">
                            <Lock className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Password</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400">Change your password to keep your account secure.</p>
                        </div>
                    </div>
                    <button className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                        Update Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;
