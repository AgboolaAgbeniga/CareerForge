'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { usePageStore } from '@/store/usePageStore';
import { useAiInsights } from '@/hooks/queries/useAi';
import { motion, AnimatePresence } from 'framer-motion';

interface AIInsightPanelProps {
  pageType: string;
}

interface InsightData {
  message: string;
  action: string;
  payload: any;
}

export default function AIInsightPanel({ pageType }: AIInsightPanelProps) {
  const pageContextData = usePageStore((s) => s.pageContextData);
  const contextString = pageContextData ? JSON.stringify(pageContextData) : '';
  const { data: insightData, isLoading: isQueryLoading, isError } = useAiInsights(pageType, contextString);

  const [insight, setInsight] = useState<InsightData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isQueryLoading) {
      setIsLoading(true);
    } else if (isError || !insightData) {
      setInsight({ message: 'Update your profile to unlock deeper AI insights.', action: 'NONE', payload: null });
      setIsLoading(false);
    } else {
      setInsight(insightData);
      setIsLoading(false);
    }
  }, [insightData, isQueryLoading, isError]);

  const handleApplyAction = async () => {
    if (!insight || insight.action === 'NONE') return;
    
    console.log(`Executing AI Action: ${insight.action}`, insight.payload);
    
    if (insight.action === 'ADD_SKILL') {
      alert(`AI automatically added skill: ${insight.payload}`);
    } else if (insight.action === 'UPDATE_PREFERENCES') {
      alert(`AI automatically updated preferences to: ${JSON.stringify(insight.payload)}`);
    } else {
      alert(`AI Action Executed: ${insight.action}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-indigo-500/20 shadow-2xl shadow-indigo-500/10 p-5 group"
    >
      {/* Premium background gradient sweeps */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-indigo-500/10 dark:via-transparent dark:to-purple-500/10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 blur-3xl rounded-full group-hover:bg-indigo-500/30 transition-all duration-700 pointer-events-none" />
      
      <div className="flex items-center space-x-2 mb-4 relative z-10">
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 tracking-tight text-sm uppercase">AI Insight</h3>
      </div>
      
      <div className="relative z-10 min-h-[60px]">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3 text-slate-500 dark:text-slate-400 py-2"
            >
              <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
              <span className="text-sm font-medium">Analyzing context...</span>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {insight?.message}
              </p>
              
              {insight?.action !== 'NONE' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApplyAction}
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl transition-all shadow-md shadow-indigo-500/20 ring-1 ring-white/20"
                >
                  Apply Suggestion
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
