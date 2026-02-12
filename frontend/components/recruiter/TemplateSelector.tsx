'use client';

import React from 'react';

interface TemplateSelectorProps {
  selectedTemplate: number;
  setSelectedTemplate: (index: number) => void;
}

export function TemplateSelector({ selectedTemplate, setSelectedTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex justify-between items-center">
        Templates
        <span className="text-[10px] font-normal text-slate-500 normal-case">
          Switch anytime
        </span>
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {/* Template 1 (Active) */}
        <div
          className={`aspect-[3/4] rounded-lg border-2 ${selectedTemplate === 0 ? 'border-indigo-500' : 'border-slate-800'} bg-slate-800 relative overflow-hidden cursor-pointer group`}
          onClick={() => setSelectedTemplate(0)}
        >
          <div className="absolute inset-2 flex flex-col gap-1 opacity-50">
            <div className="h-2 w-1/3 bg-slate-500 rounded-sm"></div>
            <div className="h-1 w-full bg-slate-600 rounded-sm mt-1"></div>
            <div className="h-1 w-2/3 bg-slate-600 rounded-sm"></div>
            <div className="mt-2 h-16 w-full bg-slate-700/50 rounded-sm"></div>
          </div>
          <div className="absolute inset-0 bg-indigo-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-medium text-white">
              Modern
            </span>
          </div>
          {selectedTemplate === 0 && (
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500"></div>
          )}
        </div>

        {/* Template 2 */}
        <div
          className="aspect-[3/4] rounded-lg border border-slate-800 bg-slate-900 relative overflow-hidden cursor-pointer hover:border-slate-600 transition-colors group"
          onClick={() => setSelectedTemplate(1)}
        >
          <div className="absolute inset-2 flex flex-col items-center gap-1 opacity-30">
            <div className="h-3 w-3 rounded-full bg-slate-500"></div>
            <div className="h-1 w-1/2 bg-slate-600 rounded-sm mt-1"></div>
            <div className="mt-2 h-full w-full border-t border-slate-700"></div>
          </div>
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="px-2 py-1 bg-white text-black text-[10px] rounded">
              Apply
            </button>
          </div>
          <div className="absolute bottom-1 left-0 w-full text-center text-[9px] text-slate-500">
            Minimal
          </div>
        </div>

        {/* Template 3 */}
        <div
          className="aspect-[3/4] rounded-lg border border-slate-800 bg-slate-900 relative overflow-hidden cursor-pointer hover:border-slate-600 transition-colors group"
          onClick={() => setSelectedTemplate(2)}
        >
          <div className="absolute top-0 left-0 bottom-0 w-1/3 bg-slate-800"></div>
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="px-2 py-1 bg-white text-black text-[10px] rounded">
              Apply
            </button>
          </div>
          <div className="absolute bottom-1 left-0 w-full text-center text-[9px] text-slate-500">
            Creative
          </div>
        </div>

        {/* Template 4 */}
        <div
          className="aspect-[3/4] rounded-lg border border-slate-800 bg-slate-900 relative overflow-hidden cursor-pointer hover:border-slate-600 transition-colors group"
          onClick={() => setSelectedTemplate(3)}
        >
          <div className="absolute top-2 left-2 right-2 border-b border-slate-700 pb-1"></div>
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="px-2 py-1 bg-white text-black text-[10px] rounded">
              Apply
            </button>
          </div>
          <div className="absolute bottom-1 left-0 w-full text-center text-[9px] text-slate-500">
            Corporate
          </div>
        </div>
      </div>
    </div>
  );
}