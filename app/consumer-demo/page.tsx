"use client";

import { useState } from 'react';
import Link from 'next/link';
import MainDashboard from '@/components/demo/consumer/MainDashboard';
import PowerReliabilityCenter from '@/components/demo/consumer/PowerReliabilityCenter';
import UsageBillAnalytics from '@/components/demo/consumer/UsageBillAnalytics';
import CommunityGridHeroes from '@/components/demo/consumer/CommunityGridHeroes';

export default function ConsumerDemo() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sections = [
    { 
      id: 'dashboard', 
      name: 'Energy Command Center', 
      icon: <EnergyIcon />,
      description: 'Live bill tracker & grid status' 
    },
    { 
      id: 'reliability', 
      name: 'Power Reliability', 
      icon: <ReliabilityIcon />,
      description: 'Outage maps & schedules' 
    },
    { 
      id: 'analytics', 
      name: 'Usage Analytics', 
      icon: <AnalyticsIcon />,
      description: 'Bill breakdown & history' 
    },
    { 
      id: 'community', 
      name: 'Grid Heroes', 
      icon: <CommunityIcon />,
      description: 'Community challenges' 
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <MainDashboard />;
      case 'reliability':
        return <PowerReliabilityCenter />;
      case 'analytics':
        return <UsageBillAnalytics />;
      case 'community':
        return <CommunityGridHeroes />;
      case 'settings':
        return <ConsumerSettings />;
      case 'user':
        return <ConsumerAccount />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <main className="relative min-h-screen bg-gray-950 text-white">
      <BackgroundEffects />
      <div className="flex">
        <ConsumerSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          sections={sections}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <ConsumerContent 
          activeSection={activeSection}
          sidebarOpen={sidebarOpen}
          renderContent={renderContent}
        />
      </div>
    </main>
  );
}

function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-bg opacity-50" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern" />
      
      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
    </div>
  );
}

interface ConsumerSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sections: any[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function ConsumerSidebar({ activeSection, setActiveSection, sections, isOpen, setIsOpen }: ConsumerSidebarProps) {
  return (
    <>
      {/* Hamburger Button - only visible when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-40 p-3 bg-gray-800/80 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-gray-700/80 transition-all duration-200 shadow-lg"
        >
          <HamburgerIcon />
        </button>
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen bg-gray-900/95 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 z-30 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64`}>
        <div className="p-4">
          {/* Sidebar Header with Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <Link href="/" className="flex items-center space-x-2 mb-3">
                <div className="relative">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-md shadow-lg"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-md blur opacity-50"></div>
                </div>
                <span className="text-sm font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  EcoGridX
                </span>
              </Link>
              <Link 
                href="/" 
                className="inline-flex items-center text-xs text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <BackIcon />
                <span className="ml-1">Back to Home</span>
              </Link>
            </div>
            
            {/* Toggle button inside sidebar */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 bg-gray-800/60 hover:bg-gray-700/60 rounded-md transition-colors ml-3"
            >
              <XIcon />
            </button>
          </div>

          <h2 className="text-lg font-bold mb-4 text-white">Consumer Dashboard</h2>
          
          <div className="flex-1 flex flex-col">
            {/* Main Navigation Tabs */}
            <div className="space-y-1 flex-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="w-4 h-4">{section.icon}</div>
                  <span className="font-medium">{section.name}</span>
                </button>
              ))}
            </div>

            {/* Bottom Navigation Tabs */}
            <div className="border-t border-white/10 pt-4 mt-4">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveSection('settings')}
                  className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm whitespace-nowrap ${
                    activeSection === 'settings'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="w-4 h-4"><SettingsIcon /></div>
                  <span className="font-medium">Settings</span>
                </button>
                
                <button
                  onClick={() => setActiveSection('user')}
                  className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm whitespace-nowrap ${
                    activeSection === 'user'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="w-4 h-4"><UserIcon /></div>
                  <span className="font-medium">Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

interface ConsumerContentProps {
  activeSection: string;
  sidebarOpen: boolean;
  renderContent: () => React.ReactNode;
}

function ConsumerContent({ activeSection, sidebarOpen, renderContent }: ConsumerContentProps) {
  return (
    <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
}

// Icon Components
function EnergyIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function ReliabilityIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// Placeholder components for Settings and Account
function ConsumerSettings() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Consumer Settings
          </span>
        </h1>
        <p className="text-gray-400">Manage your account preferences and notifications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Bill alerts</span>
              <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Outage notifications</span>
              <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Energy saving tips</span>
              <div className="w-10 h-6 bg-gray-600 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Display Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-gray-300 mb-2">Theme</label>
              <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <option>Dark Theme</option>
                <option>Light Theme</option>
                <option>Auto</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Language</label>
              <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsumerAccount() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Account Information
          </span>
        </h1>
        <p className="text-gray-400">Manage your personal information and billing details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                defaultValue="John Smith"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                defaultValue="john.smith@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Phone</label>
              <input 
                type="tel" 
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                defaultValue="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Billing Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Account Number</label>
              <input 
                type="text" 
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                defaultValue="ACC-789456123"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Service Address</label>
              <input 
                type="text" 
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                defaultValue="123 Main St, Anytown, ST 12345"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Billing Cycle</label>
              <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}