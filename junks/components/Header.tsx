"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Linkedin,
  Twitter,
  Youtube,
} from 'lucide-react';

const Header: React.FC = () => {
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: useTransform(backgroundOpacity, (opacity) => `rgba(255, 255, 255, ${opacity})`),
        backdropFilter: useTransform(backgroundOpacity, (opacity) => opacity > 0 ? 'blur(10px)' : 'none'),
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-slate-900">
              CareerForge
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#features" className="text-slate-700 hover:text-indigo-600 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-slate-700 hover:text-indigo-600 transition-colors">
              Pricing
            </a>
            <a href="#recruiters" className="text-slate-700 hover:text-indigo-600 transition-colors">
              For Recruiters
            </a>
            <a href="#seekers" className="text-slate-700 hover:text-indigo-600 transition-colors">
              For Job Seekers
            </a>
            <div className="relative">
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className="flex items-center text-slate-700 hover:text-indigo-600 transition-colors"
                aria-expanded={isResourcesOpen}
                aria-haspopup="true"
              >
                Resources
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isResourcesOpen && (
                <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                  <a href="#blog" className="block px-4 py-2 text-slate-700 hover:bg-slate-50">
                    Blog
                  </a>
                  <a href="#guides" className="block px-4 py-2 text-slate-700 hover:bg-slate-50">
                    Guides
                  </a>
                  <a href="#help" className="block px-4 py-2 text-slate-700 hover:bg-slate-50">
                    Help Center
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="/login"
              className="text-slate-700 hover:text-indigo-600 transition-colors px-4 py-2"
            >
              Log In
            </a>
            <a
              href="/signup"
              className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 pb-4 border-t border-slate-200"
          >
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-slate-700 hover:text-indigo-600 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-slate-700 hover:text-indigo-600 transition-colors">
                Pricing
              </a>
              <a href="#recruiters" className="text-slate-700 hover:text-indigo-600 transition-colors">
                For Recruiters
              </a>
              <a href="#seekers" className="text-slate-700 hover:text-indigo-600 transition-colors">
                For Job Seekers
              </a>
              <div>
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="flex items-center text-slate-700 hover:text-indigo-600 transition-colors w-full justify-between"
                  aria-expanded={isResourcesOpen}
                >
                  Resources
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isResourcesOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <a href="#blog" className="block text-slate-600 hover:text-indigo-600">
                      Blog
                    </a>
                    <a href="#guides" className="block text-slate-600 hover:text-indigo-600">
                      Guides
                    </a>
                    <a href="#help" className="block text-slate-600 hover:text-indigo-600">
                      Help Center
                    </a>
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-2 pt-4 border-t border-slate-200">
                <a
                  href="/login"
                  className="text-slate-700 hover:text-indigo-600 transition-colors px-4 py-2"
                >
                  Log In
                </a>
                <a
                  href="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors text-center"
                >
                  Sign Up
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;