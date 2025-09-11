"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showDemoOptions, setShowDemoOptions] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-950/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl shadow-lg"></div>
              <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl blur opacity-50"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              EcoGridX
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-emerald-400 transition-colors">Features</a>
            <a href="#metrics" className="text-gray-300 hover:text-emerald-400 transition-colors">Performance</a>
            <a href="#technology" className="text-gray-300 hover:text-emerald-400 transition-colors">Technology</a>
            <a href="#demo" className="text-gray-300 hover:text-emerald-400 transition-colors">Demo</a>
          </div>
          
          <button 
            onClick={() => setShowDemoOptions(true)}
            className="relative group px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-gray-900 hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">Try Demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Demo Options Modal */}
        {showDemoOptions && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-gray-900/95 border border-gray-700/50 rounded-2xl p-8 max-w-md w-full relative">
              {/* Close Button */}
              <button
                onClick={() => setShowDemoOptions(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-2xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Choose Demo Experience
                </span>
              </h3>

              <div className="space-y-4">
                {/* Grid Operators Demo */}
                <Link 
                  href="/demo"
                  className="group block p-6 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl hover:border-emerald-400/40 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                        Grid Operators Demo
                      </h4>
                      <p className="text-sm text-gray-400">For utility operators and engineers</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Explore AI-powered grid optimization, storage management, and real-time energy distribution controls.
                  </p>
                </Link>

                {/* Consumer Demo */}
                <Link 
                  href="/consumer-demo"
                  className="group block p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        Consumer Demo
                      </h4>
                      <p className="text-sm text-gray-400">For energy consumers and homeowners</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Experience personalized energy insights, forecasting, conservation challenges, and community engagement.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}



