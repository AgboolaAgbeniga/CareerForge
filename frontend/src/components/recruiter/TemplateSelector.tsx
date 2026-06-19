'use client';

import React from 'react';

interface TemplateSelectorProps {
  selectedTemplate: number;
  setSelectedTemplate: (index: number) => void;
}

export function TemplateSelector({ selectedTemplate, setSelectedTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-[10px] font-mono text-body uppercase tracking-[0.08px] flex justify-between items-center">
        Templates
        <span className="text-[10px] font-mono text-body normal-case">
          Switch anytime
        </span>
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {/* Template 1 (Active) */}
        <div
          className={`aspect-[3/4] rounded-sm border-hairline ${selectedTemplate === 0 ? 'border-primary' : 'border-transparent'} bg-canvas-dark relative overflow-hidden cursor-pointer group`}
          onClick={() => setSelectedTemplate(0)}
        >
          <div className="absolute inset-2 flex flex-col gap-1 opacity-50">
            <div className="h-2 w-1/3 bg-canvas rounded-sm border-hairline"></div>
            <div className="h-1 w-full bg-canvas rounded-sm mt-1 border-hairline"></div>
            <div className="h-1 w-2/3 bg-canvas rounded-sm border-hairline"></div>
            <div className="mt-2 h-16 w-full bg-canvas rounded-sm border-hairline"></div>
          </div>
          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-mono uppercase tracking-[0.08px] text-primary">
              Modern
            </span>
          </div>
          {selectedTemplate === 0 && (
            <div className="absolute top-1 right-1 w-2 h-2 rounded-sm bg-primary border-hairline"></div>
          )}
        </div>

        {/* Template 2 */}
        <div
          className="aspect-[3/4] rounded-sm border-hairline bg-canvas-dark relative overflow-hidden cursor-pointer hover:border-body transition-colors group"
          onClick={() => setSelectedTemplate(1)}
        >
          <div className="absolute inset-2 flex flex-col items-center gap-1 opacity-30">
            <div className="h-3 w-3 rounded-sm bg-canvas border-hairline"></div>
            <div className="h-1 w-1/2 bg-canvas border-hairline rounded-sm mt-1"></div>
            <div className="mt-2 h-full w-full border-t-hairline"></div>
          </div>
          <div className="absolute inset-0 bg-canvas/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="px-2 py-1 bg-primary text-on-primary font-mono uppercase tracking-[0.08px] text-[10px] rounded-sm">
              Apply
            </button>
          </div>
          <div className="absolute bottom-1 left-0 w-full text-center text-[9px] font-mono uppercase tracking-[0.08px] text-body">
            Minimal
          </div>
        </div>

        {/* Template 3 */}
        <div
          className="aspect-[3/4] rounded-sm border-hairline bg-canvas-dark relative overflow-hidden cursor-pointer hover:border-body transition-colors group"
          onClick={() => setSelectedTemplate(2)}
        >
          <div className="absolute top-0 left-0 bottom-0 w-1/3 bg-canvas border-r-hairline"></div>
          <div className="absolute inset-0 bg-canvas/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="px-2 py-1 bg-primary text-on-primary font-mono uppercase tracking-[0.08px] text-[10px] rounded-sm">
              Apply
            </button>
          </div>
          <div className="absolute bottom-1 left-0 w-full text-center text-[9px] font-mono uppercase tracking-[0.08px] text-body">
            Creative
          </div>
        </div>

        {/* Template 4 */}
        <div
          className="aspect-[3/4] rounded-sm border-hairline bg-canvas-dark relative overflow-hidden cursor-pointer hover:border-body transition-colors group"
          onClick={() => setSelectedTemplate(3)}
        >
          <div className="absolute top-2 left-2 right-2 border-b-hairline pb-1"></div>
          <div className="absolute inset-0 bg-canvas/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="px-2 py-1 bg-primary text-on-primary font-mono uppercase tracking-[0.08px] text-[10px] rounded-sm">
              Apply
            </button>
          </div>
          <div className="absolute bottom-1 left-0 w-full text-center text-[9px] font-mono uppercase tracking-[0.08px] text-body">
            Corporate
          </div>
        </div>
      </div>
    </div>
  );
}