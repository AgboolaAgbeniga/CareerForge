import React from 'react';
import { Icon } from '@iconify/react';

export interface Candidate {
    id: string;
    name: string;
    title: string;
    experience: string;
    company: string;
    location: string;
    matchScore: number;
    skills: string[];
    avatar: string;
}

interface CandidateCardProps {
    candidate: Candidate;
    onClick?: () => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="p-6 hover:bg-white/[0.02] transition-colors group cursor-pointer"
        >
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden">
                        <img
                            src={candidate.avatar}
                            alt={candidate.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-slate-950 rounded-full p-1">
                        <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950"></div>
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white tracking-tight">
                            {candidate.name}
                        </h3>
                        <Icon
                            icon="lucide:badge-check"
                            width={16}
                            className="text-blue-400"
                        />
                    </div>
                    <p className="text-sm text-slate-400 mb-3">
                        {candidate.title}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                        <div className="flex items-center gap-1">
                            <Icon icon="lucide:clock" width={12} />
                            <span>{candidate.experience}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Icon icon="lucide:briefcase" width={12} />
                            <span>{candidate.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Icon icon="lucide:map-pin" width={12} />
                            <span>{candidate.location}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                        {candidate.skills.map((skill, index) => (
                            <span
                                key={index}
                                className={`text-xs px-2 py-1 rounded border ${index < 2
                                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                                    : 'bg-slate-700 text-slate-400 border-slate-600'
                                    }`}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Match Score */}
                <div className="flex-shrink-0">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-full shadow-lg">
                            <span>{candidate.matchScore}%</span>
                            <span className="text-xs opacity-90">Match</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                            {candidate.matchScore >= 90
                                ? 'Strong fit'
                                : candidate.matchScore >= 80
                                    ? 'Strong fit'
                                    : 'Medium fit'}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                    <button
                        className="p-3 rounded-lg bg-white/5 hover:bg-indigo-600 hover:text-white text-slate-400 transition-all border border-white/10 group-hover:border-indigo-500/50"
                        title="View Profile"
                        onClick={(e) => { e.stopPropagation(); /* Add logic */ }}
                    >
                        <Icon icon="lucide:eye" width={18} />
                    </button>
                    <button
                        className="p-3 rounded-lg bg-white/5 hover:bg-amber-500 hover:text-white text-slate-400 transition-all border border-white/10"
                        title="Add to Shortlist"
                        onClick={(e) => { e.stopPropagation(); /* Add logic */ }}
                    >
                        <Icon icon="lucide:star" width={18} />
                    </button>
                    <button
                        className="p-3 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white text-slate-400 transition-all border border-white/10"
                        title="Contact Candidate"
                        onClick={(e) => { e.stopPropagation(); /* Add logic */ }}
                    >
                        <Icon icon="lucide:mail" width={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
