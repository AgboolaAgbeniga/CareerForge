'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { usePageContext } from '@/contexts/PageContext';
import apiClient from '@/lib/apiClient';

interface AIInsightPanelProps {
  pageType: string;
}

interface InsightData {
  message: string;
  action: string;
  payload: any;
}

export default function AIInsightPanel({ pageType }: AIInsightPanelProps) {
  const { pageContextData } = usePageContext();
  const [insight, setInsight] = useState<InsightData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const fetchInsight = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.post('/api/ai/insights', {
          pageType,
          pageContext: pageContextData || ''
        });
        
        if (mounted && response.data) {
          setInsight(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch AI insight:', error);
        if (mounted) {
          setInsight({ message: 'Update your profile to unlock deeper AI insights.', action: 'NONE', payload: null });
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchInsight();
    
    return () => {
      mounted = false;
    };
  }, [pageType, pageContextData]);

  const handleApplyAction = async () => {
    if (!insight || insight.action === 'NONE') return;
    
    // Global action dispatcher based on LLM payload
    console.log(`Executing AI Action: ${insight.action}`, insight.payload);
    
    if (insight.action === 'ADD_SKILL') {
      // In a real app, dispatch to a Redux store or hit a profile update API
      alert(`AI automatically added skill: ${insight.payload}`);
    } else if (insight.action === 'UPDATE_PREFERENCES') {
      alert(`AI automatically updated preferences to: ${JSON.stringify(insight.payload)}`);
    } else {
      alert(`AI Action Executed: ${insight.action}`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800/50 dark:to-slate-900 border border-indigo-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm relative overflow-hidden group">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full group-hover:bg-indigo-500/20 transition-all duration-500"></div>
      
      <div className="flex items-center space-x-2 mb-3 relative z-10">
        <Sparkles className="w-5 h-5 text-indigo-500" />
        <h3 className="font-semibold text-slate-800 dark:text-slate-200">AI Insight</h3>
      </div>
      
      <div className="relative z-10 min-h-[60px]">
        {isLoading ? (
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Analyzing current context...</span>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {insight?.message}
            </p>
            
            {insight?.action !== 'NONE' && (
              <button
                onClick={handleApplyAction}
                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
              >
                Apply AI Suggestion
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
