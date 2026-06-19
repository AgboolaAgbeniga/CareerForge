import React from 'react';
import { Linkedin, Twitter, Youtube, Globe } from 'lucide-react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-canvas pt-section pb-0 border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6 mb-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="type-mono-caps-eyebrow text-ink mb-4">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="type-body-md text-body hover:text-ink transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="type-body-md text-body hover:text-ink transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="type-body-md text-body hover:text-ink transition-colors">
                  Integrations
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="type-mono-caps-eyebrow text-ink mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="type-body-md text-body hover:text-ink transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="type-body-md text-body hover:text-ink transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="type-body-md text-body hover:text-ink transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="type-mono-caps-eyebrow text-ink mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="type-body-md text-body hover:text-ink transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="type-body-md text-body hover:text-ink transition-colors">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="type-body-md text-body hover:text-ink transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="type-mono-caps-eyebrow text-ink mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="type-body-md text-body hover:text-ink transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="type-body-md text-body hover:text-ink transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="type-body-md text-body hover:text-ink transition-colors">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-hairline pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-4">
                <a href="#" className="text-body hover:text-ink transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-body hover:text-ink transition-colors" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-body hover:text-ink transition-colors" aria-label="YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
              <p className="type-body-md text-body ml-4">
                CareerForge — forging the future of hiring.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-body" />
              <select className="text-body bg-transparent border-none focus:outline-none type-mono-caps-eyebrow">
                <option>English</option>
                <option>Español</option>
                <option>Français</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Wordmark Banner */}
      <div className="w-full overflow-hidden flex items-center justify-center bg-canvas">
        <h1 className="text-[15vw] type-display-xxl text-hairline leading-none tracking-tighter whitespace-nowrap select-none">
          careerforge.ai
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
