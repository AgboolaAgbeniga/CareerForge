import React from 'react';
import { ArrowRight, Linkedin, Twitter, Youtube } from 'lucide-react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 relative">
      {/* Curve top */}
      <div
        className="absolute top-[-40px] left-0 w-full h-10 bg-slate-50"
        style={{
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          transform: 'scaleX(1.5)',
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  Roadmap
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  Status
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm font-semibold text-slate-900 mb-4">
              Stay updated
            </h4>
            <form className="flex gap-2 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="px-3 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-slate-600">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-600">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-600">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 text-white rounded flex items-center justify-center font-bold text-xs tracking-tighter">
              AI
            </div>
            <p className="text-xs text-slate-500">
              © 2023 CareerAI Inc. All rights reserved.
            </p>
          </div>
          <p className="text-xs text-slate-400">
            Built for professionals, powered by AI.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
