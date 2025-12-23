import React from 'react';
import {
  FileText,
  Sparkles,
  Target,
  BarChart2,
  Zap,
  Globe,
} from 'lucide-react';

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
            Powerful Features
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Everything you need to succeed in your job search or hiring process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Resume Analysis',
              description:
                'Get detailed insights into your resume with AI-powered analysis.',
              learnMore: 'Learn more',
            },
            {
              title: 'AI Matching',
              description:
                'Our advanced algorithms find the perfect job matches for you.',
              learnMore: 'Learn more',
            },
            {
              title: 'Career Guidance',
              description:
                'Receive personalized career advice and recommendations.',
              learnMore: 'Learn more',
            },
            {
              title: 'Analytics Dashboard',
              description:
                'Track your job search progress with comprehensive analytics.',
              learnMore: 'Learn more',
            },
            {
              title: 'Fast Application',
              description:
                'Apply to jobs in seconds with our streamlined process.',
              learnMore: 'Learn more',
            },
            {
              title: 'Global Reach',
              description: 'Connect with opportunities worldwide.',
              learnMore: 'Learn more',
            },
          ].map((item: any, index: number) => {
            const colors = [
              { bg: 'bg-indigo-600', text: 'text-indigo-600' },
              { bg: 'bg-purple-600', text: 'text-purple-600' },
              { bg: 'bg-teal-600', text: 'text-teal-600' },
              { bg: 'bg-blue-600', text: 'text-blue-600' },
              { bg: 'bg-orange-600', text: 'text-orange-600' },
              { bg: 'bg-pink-600', text: 'text-pink-600' },
            ];
            const color = colors[index % colors.length];
            return (
              <div
                key={index}
                className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center ${color.text} mb-6 shadow-sm`}
                >
                  {index === 0 && <FileText className="w-5 h-5" />}
                  {index === 1 && <Sparkles className="w-5 h-5" />}
                  {index === 2 && <Target className="w-5 h-5" />}
                  {index === 3 && <BarChart2 className="w-5 h-5" />}
                  {index === 4 && <Zap className="w-5 h-5" />}
                  {index === 5 && <Globe className="w-5 h-5" />}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  {item.description}
                </p>
                <span
                  className={`text-xs font-medium ${color.text} group-hover:underline`}
                >
                  {item.learnMore}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;