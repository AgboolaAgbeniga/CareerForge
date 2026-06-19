import React from 'react';
import { Icon } from '@iconify/react';
import Button from '@/components/ui/Button';

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
            className="p-6 hover:bg-surface-dark transition-colors group cursor-pointer border-b border-hairline last:border-b-0"
        >
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-sm bg-canvas border border-hairline overflow-hidden">
                        <img
                            src={candidate.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name || 'Candidate')}&background=random&size=64`}
                            alt={candidate.name || 'Candidate'}
                            className="w-full h-full object-cover grayscale opacity-80"
                        />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-canvas rounded-sm p-1">
                        <div className="w-4 h-4 bg-ink rounded-sm"></div>
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="type-body-lg text-ink font-semibold">
                            {candidate.name || 'Unknown Candidate'}
                        </h3>
                        <Icon
                            icon="lucide:badge-check"
                            width={16}
                            className="text-ink"
                        />
                    </div>
                    <p className="type-mono-caption text-body mb-3">
                        {candidate.title || 'No Title'}
                    </p>

                    <div className="flex items-center gap-4 type-mono-caption text-body mb-3">
                        <div className="flex items-center gap-1">
                            <Icon icon="lucide:clock" width={14} />
                            <span>{candidate.experience || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Icon icon="lucide:briefcase" width={14} />
                            <span>{candidate.company || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Icon icon="lucide:map-pin" width={14} />
                            <span>{candidate.location || 'N/A'}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                        {candidate.skills?.map((skill, index) => (
                            <span
                                key={index}
                                className={`type-mono-caption px-2 py-1 rounded-sm border border-hairline ${index < 2
                                    ? 'bg-ink text-on-primary border-ink'
                                    : 'bg-surface-dark text-ink'
                                    }`}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Match Score */}
                <div className="flex-shrink-0 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-on-primary rounded-sm shadow-none">
                        <span className="type-display-md">{candidate.matchScore || 0}%</span>
                        <span className="type-mono-caption opacity-90">Match</span>
                    </div>
                    <p className="type-mono-caption text-body mt-2">
                        {candidate.matchScore >= 90
                            ? 'Strong fit'
                            : candidate.matchScore >= 80
                                ? 'Strong fit'
                                : 'Medium fit'}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                    <button
                        className="p-3 rounded-sm bg-surface-dark hover:bg-ink hover:text-on-primary text-body transition-colors border border-hairline"
                        title="View Profile"
                        onClick={(e) => { e.stopPropagation(); /* Add logic */ }}
                    >
                        <Icon icon="lucide:eye" width={18} />
                    </button>
                    <button
                        className="p-3 rounded-sm bg-surface-dark hover:bg-ink hover:text-on-primary text-body transition-colors border border-hairline"
                        title="Add to Shortlist"
                        onClick={(e) => { e.stopPropagation(); /* Add logic */ }}
                    >
                        <Icon icon="lucide:star" width={18} />
                    </button>
                    <button
                        className="p-3 rounded-sm bg-surface-dark hover:bg-ink hover:text-on-primary text-body transition-colors border border-hairline"
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
