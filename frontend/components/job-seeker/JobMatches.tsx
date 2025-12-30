'use client';

import React from 'react';
import { Check, Zap, MapPin } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils/dateUtils';

interface JobMatch {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    matchScore: number;
    skills: string[];
    salaryMin?: number;
    salaryMax?: number;
    postedAt: string;
}

interface JobMatchesProps {
    matches: JobMatch[];
}

export function JobMatches({ matches }: JobMatchesProps) {
    const getInitials = (name: string) => name ? name.substring(0, 1).toUpperCase() : '?';

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                    Top Recommended Matches
                </h2>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                        Remote
                    </button>
                    <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                        Full-time
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches.length > 0 ? (
                    matches.map((job) => (
                        <div
                            key={job.id}
                            className="group bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all relative"
                        >
                            <div className="absolute top-5 right-5 flex flex-col items-end">
                                <div
                                    className={`radial-progress text-[10px] font-bold ${job.matchScore >= 90 ? 'text-green-500' : job.matchScore >= 70 ? 'text-indigo-500' : 'text-amber-500'
                                        }`}
                                    style={
                                        {
                                            '--value': job.matchScore,
                                            '--size': '2rem',
                                        } as React.CSSProperties
                                    }
                                >
                                    {job.matchScore}%
                                </div>
                            </div>

                            <div className="flex gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center text-gray-900 dark:text-gray-100 font-bold">
                                    {getInitials(job.company)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 transition-colors">
                                        {job.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1">
                                        {job.company} • {job.location}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {job.skills && job.skills.slice(0, 3).map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-medium text-gray-600 dark:text-gray-400"
                                    >
                                        {skill}
                                    </span>
                                ))}
                                {job.matchScore >= 80 && (
                                    <span className="px-2 py-1 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-700 rounded text-[10px] font-medium flex items-center gap-1">
                                        <Check className="w-2.5 h-2.5" /> High Match
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700">
                                <span className="text-[10px] text-gray-400 dark:text-gray-500">
                                    {formatRelativeTime(new Date(job.postedAt))}
                                </span>
                                <button className="text-xs font-semibold text-white bg-gray-900 dark:bg-gray-700 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 text-center py-8 text-sm text-gray-500">
                        No active job matches found. Complete your profile to get recommendations.
                    </div>
                )}
            </div>
        </div>
    );
}
