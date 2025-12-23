import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-indigo-50/50 relative">
      <div className="curve-top transform rotate-180">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">
            What Our Users Say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: 'This platform changed my job search completely!',
              name: 'Sarah Johnson',
              role: 'Software Engineer',
            },
            {
              quote: 'Hiring has never been easier.',
              name: 'Mike Chen',
              role: 'HR Manager',
            },
          ].map((item: any, index: number) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative"
            >
              <Quote
                className={`absolute top-8 right-8 w-8 h-8 fill-opacity-10 ${index === 0 ? 'text-indigo-100 fill-indigo-50' : 'text-teal-100 fill-teal-50'}`}
              />
              <p className="text-slate-700 text-lg mb-6 leading-relaxed">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name.split(' ')[0]}&backgroundColor=e5e7eb`}
                  alt="User"
                  className="w-10 h-10 rounded-full bg-gray-100"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;