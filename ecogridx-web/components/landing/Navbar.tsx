"use client";

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
          
          <a href="/demo" className="relative group px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-gray-900 hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 inline-block">
            <span className="relative z-10">Try Demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </div>
    </nav>
  );
}



