'use client';

import React from 'react';
import { Sparkles, Wand2, Edit3 } from 'lucide-react';

interface AISuggestionsPanelProps {
  addSkill: (skill: string) => void;
}

export function AISuggestionsPanel({ addSkill }: AISuggestionsPanelProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="text-[10px] font-mono text-body uppercase tracking-[0.08px]">
          AI Suggestions
        </h3>
      </div>

      {/* Insight Card */}
      <div className="p-3 rounded-sm bg-canvas border-hairline hover:bg-canvas-dark transition-colors group">
        <p className="text-[10px] font-mono uppercase tracking-[0.08px] text-body mb-2">
          Adding{' '}
          <span className="text-ink font-bold">Python</span>{' '}
          improves match scores by 20%.
        </p>
        <button
          className="w-full py-1.5 rounded-sm bg-primary text-on-primary text-[10px] font-mono uppercase tracking-[0.08px] border-hairline flex items-center justify-center gap-1 hover:opacity-90 transition-opacity"
          onClick={() => addSkill('Python')}
        >
          <Wand2 className="w-3 h-3" /> Apply AI Fix
        </button>
      </div>

      {/* Insight Card */}
      <div className="p-3 rounded-sm bg-canvas border-hairline hover:bg-canvas-dark transition-colors group">
        <p className="text-[10px] font-mono uppercase tracking-[0.08px] text-body mb-2">
          Quantify your impact at{' '}
          <span className="text-ink font-bold">Acme Corp</span>.
        </p>
        <button className="w-full py-1.5 rounded-sm bg-canvas-dark text-ink text-[10px] font-mono uppercase tracking-[0.08px] border-hairline flex items-center justify-center gap-1 hover:bg-canvas transition-colors">
          <Edit3 className="w-3 h-3 text-body" /> Rewrite with Data
        </button>
      </div>
    </div>
  );
}