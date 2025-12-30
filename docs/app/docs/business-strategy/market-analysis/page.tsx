import { ContentRenderer } from '@/components/ContentRenderer';
import { marketAnalysisContent } from '@/content/business-strategy/market-analysis';

export const metadata = {
  title: 'Market Analysis - CareerForge Documentation',
  description: 'Comprehensive analysis of the global career development and recruitment market, including size, trends, competitive landscape, and growth opportunities',
};

export default function MarketAnalysisPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ContentRenderer content={marketAnalysisContent} />
      </div>
    </div>
  );
}