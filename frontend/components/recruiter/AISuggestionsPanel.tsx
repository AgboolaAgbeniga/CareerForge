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
        <Sparkles className="w-4 h-4 text-purple-400" />
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          AI Suggestions
        </h3>
      </div>

      {/* Insight Card */}
      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-500/30 transition-colors group">
        <p className="text-xs text-slate-300 mb-2">
          Adding{' '}
          <span className="text-purple-400 font-medium">Python</span>{' '}
          improves match scores by 20%.
        </p>
        <button
          className="w-full py-1.5 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[10px] font-medium border border-purple-500/20 flex items-center justify-center gap-1 transition-colors"
          onClick={() => addSkill('Python')}
        >
          <Wand2 className="w-3 h-3" /> Apply AI Fix
        </button>
      </div>

      {/* Insight Card */}
      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/30 transition-colors group">
        <p className="text-xs text-slate-300 mb-2">
          Quantify your impact at{' '}
          <span className="text-white">Acme Corp</span>.
        </p>
        <button className="w-full py-1.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[10px] font-medium border border-amber-500/20 flex items-center justify-center gap-1 transition-colors">
          <Edit3 className="w-3 h-3" /> Rewrite with Data
        </button>
      </div>
    </div>
  );
}