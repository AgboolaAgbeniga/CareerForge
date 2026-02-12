import { ContentRenderer } from '@/components/ContentRenderer';
import { performanceOptimizationContent } from '@/content/frontend/performance-optimization';

export const metadata = {
  title: 'Performance Optimization - CareerForge Documentation',
  description: 'Comprehensive guide to optimizing frontend performance, including bundle optimization, lazy loading, caching strategies, and monitoring techniques',
};

export default function PerformanceOptimizationPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ContentRenderer content={performanceOptimizationContent} />
      </div>
    </div>
  );
}