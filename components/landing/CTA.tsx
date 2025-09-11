"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function CTA() {
  const [showDemoOptions, setShowDemoOptions] = useState(false);

  return (
    <section id="demo" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
            <h3 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Ready to Transform Your Grid?
              </span>
            </h3>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              A showcase of advanced AI and reinforcement learning applied to smart grid optimization. Built with cutting-edge technology for research and demonstration purposes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => setShowDemoOptions(true)}
                className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl font-bold text-lg text-gray-900 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Launch Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <a href="#technology" className="px-8 py-4 border-2 border-white/20 rounded-2xl font-bold text-lg hover:bg-white/5 hover:border-emerald-400/50 transition-all duration-300">
                View Technology
              </a>
            </div>
          </div>
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
                {/* Grid Operations Demo */}
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
                        Grid Operations Demo
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
    </section>
  );
}



