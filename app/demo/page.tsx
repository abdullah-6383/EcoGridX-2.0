"use client";

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import AIOptimizer from '@/components/demo/AIOptimizer';
import StorageManagement from '@/components/demo/StorageManagement';
import PredictionHistory from '@/components/demo/PredictionHistory';

export default function Demo() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <main className="relative min-h-screen bg-gray-950 text-white">
      <BackgroundEffects />
      <div className="flex">
        <DemoSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <DemoContent 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
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



interface DemoSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function DemoSidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: DemoSidebarProps) {
  const tabs = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <DashboardIcon />
    },
    {
      id: 'ai-optimization',
      name: 'AI Optimization',
      icon: <AIOptimizerIcon />
    },
    {
      id: 'storage-management',
      name: 'Storage Management',
      icon: <StorageIcon />
    },
    {
      id: 'prediction-history',
      name: 'Prediction History',
      icon: <PredictionIcon />
    },
    {
      id: 'alerts',
      name: 'Alerts',
      icon: <AlertsIcon />
    }
  ];

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

          <h2 className="text-lg font-bold mb-4 text-white">Controls</h2>
          
          <div className="flex-1 flex flex-col">
            {/* Main Navigation Tabs */}
            <div className="space-y-1 flex-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="w-4 h-4">{tab.icon}</div>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Bottom Navigation Tabs */}
            <div className="border-t border-white/10 pt-4 mt-4">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm whitespace-nowrap ${
                    activeTab === 'settings'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="w-4 h-4"><SettingsIcon /></div>
                  <span className="font-medium">Settings</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('user')}
                  className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm whitespace-nowrap ${
                    activeTab === 'user'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="w-4 h-4"><UserIcon /></div>
                  <span className="font-medium">User</span>
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

interface DemoContentProps {
  activeTab: string;
  sidebarOpen: boolean;
}

function DemoContent({ activeTab, sidebarOpen }: DemoContentProps) {
  return (
    <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <div className="p-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'ai-optimization' && <AIOptimizer />}
        {activeTab === 'storage-management' && <StorageManagement />}
        {activeTab === 'prediction-history' && <PredictionHistory />}
        {activeTab === 'alerts' && <Alerts />}
        {activeTab === 'settings' && <Settings />}
        {activeTab === 'user' && <User />}
      </div>
    </div>
  );
}

function Dashboard() {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [touchData, setTouchData] = useState({ startX: 0, startY: 0, lastDistance: 0, initialScale: 1 })
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isZooming, setIsZooming] = useState(false)

  // Reset zoom function with smooth animation
  const resetZoom = () => {
    const svgElement = svgRef.current
    if (svgElement) {
      // Add smooth transition
      svgElement.style.transition = 'transform 0.5s ease-out'
      
      // Reset to default values
      setScale(1)
      setTranslate({ x: 0, y: 0 })
      
      // Remove transition after animation completes
      setTimeout(() => {
        if (svgElement) {
          svgElement.style.transition = ''
        }
      }, 500)
    }
  }

  useEffect(() => {
    const svg = svgRef.current
    const container = containerRef.current
    if (!svg || !container) return

    // Use transform3d for hardware acceleration
    const updateTransform = () => {
      svg.style.transform = `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`
      svg.style.transition = isPanning || isZooming ? 'none' : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
      svg.style.transformOrigin = 'center center'
      svg.style.willChange = isPanning || isZooming ? 'transform' : 'auto'
    }

    // Enhanced mouse wheel zoom with optimized performance
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      setIsZooming(true)
      
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9 // Reduced zoom factor for smoother experience
      const newScale = Math.min(Math.max(scale * zoomFactor, 0.3), 5)
      
      // Zoom towards mouse position with optimized calculations
      const rect = container.getBoundingClientRect()
      const mouseX = e.clientX - rect.left - rect.width / 2
      const mouseY = e.clientY - rect.top - rect.height / 2
      
      const scaleDiff = newScale - scale
      const newTranslate = {
        x: translate.x - (mouseX * scaleDiff) / scale,
        y: translate.y - (mouseY * scaleDiff) / scale
      }
      
      setScale(newScale)
      setTranslate(newTranslate)
      
      // Reset zooming state with shorter delay
      setTimeout(() => setIsZooming(false), 150)
    }

    // Enhanced mouse pan with momentum
    const handleMouseDown = (e: MouseEvent) => {
      setIsPanning(true)
      setTouchData(prev => ({
        ...prev,
        startX: e.clientX - translate.x,
        startY: e.clientY - translate.y
      }))
      container.style.cursor = 'grabbing'
      container.style.userSelect = 'none'
      e.preventDefault()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPanning) return
      
      const newTranslate = {
        x: e.clientX - touchData.startX,
        y: e.clientY - touchData.startY
      }
      
      setTranslate(newTranslate)
    }

    const handleMouseUp = () => {
      setIsPanning(false)
      container.style.cursor = 'grab'
      container.style.userSelect = 'auto'
    }

    // Enhanced touch events with better pinch-to-zoom
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      
      if (e.touches.length === 1) {
        setIsPanning(true)
        setTouchData(prev => ({
          ...prev,
          startX: e.touches[0].clientX - translate.x,
          startY: e.touches[0].clientY - translate.y
        }))
      } else if (e.touches.length === 2) {
        setIsPanning(false)
        setIsZooming(true)
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const distance = Math.sqrt(dx * dx + dy * dy)
        setTouchData(prev => ({
          ...prev,
          lastDistance: distance,
          initialScale: scale
        }))
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      
      if (e.touches.length === 1 && isPanning) {
        const newTranslate = {
          x: e.touches[0].clientX - touchData.startX,
          y: e.touches[0].clientY - touchData.startY
        }
        setTranslate(newTranslate)
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (touchData.lastDistance > 0) {
          const scaleChange = distance / touchData.lastDistance
          const newScale = Math.max(0.3, Math.min(5, touchData.initialScale * scaleChange))
          setScale(newScale)
        }
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      setIsPanning(false)
      setIsZooming(false)
      
      if (e.touches.length === 0) {
        setTouchData(prev => ({
          ...prev,
          lastDistance: 0,
          initialScale: scale
        }))
      }
    }

    // Add event listeners
    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('mousedown', handleMouseDown)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('mouseleave', handleMouseUp)
    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: false })

    updateTransform()

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('mousedown', handleMouseDown)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('mouseleave', handleMouseUp)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [scale, translate, isPanning, touchData, isZooming])

  // Optimized node click handler with useCallback for better performance
  const handleNodeClick = useCallback((nodeType: string) => {
    setSelectedNode(nodeType)
    
    // Create centered overlay with node visualization and info
    const container = containerRef.current
    if (container) {
      // Remove any existing overlay efficiently
      const existingOverlay = document.querySelector('.node-center-overlay')
      if (existingOverlay) {
        existingOverlay.remove()
        // Restore scrolling if previous overlay exists
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
      }
      
      // Get node data
      const nodeData = {
        'power-hub': { 
          color: '#fbbf24', gradient: 'from-yellow-400 to-amber-500', size: 80,
          icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
          info: {
            title: 'Power Hub',
            subtitle: 'Central Generation Facility',
            description: 'Primary power generation facility serving the entire grid network with advanced combined cycle technology.',
            stats: [
              { label: 'Total Generation', value: '2,847 MW', color: 'text-yellow-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
              { label: 'Efficiency Rating', value: '98.2%', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 17V7h2v10h-2zm4 0V7h2v10h-2zm4 0V7h2v10h-2z"/></svg>' },
              { label: 'Operational Status', value: 'Online', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>' },
              { label: 'Fuel Type', value: 'Natural Gas', color: 'text-blue-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.5.8 2.8 2 3.5v8c0 1.1.9 2 2 2h1c1.1 0 2-.9 2-2v-8c1.2-.7 2-2 2-3.5C16.5 4 14.5 2 12 2z"/></svg>' },
              { label: 'Units Active', value: '4/4 Online', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
              { label: 'Last Maintenance', value: '2 days ago', color: 'text-gray-300', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>' }
            ]
          }
        },
        'residential-north': { 
          color: '#22d3ee', gradient: 'from-cyan-400 to-blue-500', size: 60,
          icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
          info: {
            title: 'Residential North',
            subtitle: 'Housing District',
            description: 'Large residential area with modern energy-efficient homes and smart grid integration.',
            stats: [
              { label: 'Power Consumption', value: '820 MW', color: 'text-cyan-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
              { label: 'Population Served', value: '~45,000', color: 'text-blue-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.006 2.006 0 0 0 18.06 7h-.72c-.8 0-1.54.5-1.85 1.26l-1.92 5.63c-.28.81.02 1.7.77 2.08L16 17v5h4z"/></svg>' },
              { label: 'Peak Usage Time', value: '7-9 PM', color: 'text-orange-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg>' },
              { label: 'Grid Efficiency', value: '94.1%', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>' },
              { label: 'Smart Meters', value: '18,500', color: 'text-purple-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14z"/></svg>' },
              { label: 'Avg. Bill Reduction', value: '15.2%', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' }
            ]
          }
        },
        'residential-south': { 
          color: '#22d3ee', gradient: 'from-cyan-400 to-blue-500', size: 60,
          icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
          info: {
            title: 'Residential South',
            subtitle: 'Housing District',
            description: 'Expanding residential zone with new developments and enhanced energy management systems.',
            stats: [
              { label: 'Power Consumption', value: '950 MW', color: 'text-cyan-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
              { label: 'Population Served', value: '~52,000', color: 'text-blue-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.006 2.006 0 0 0 18.06 7h-.72c-.8 0-1.54.5-1.85 1.26l-1.92 5.63c-.28.81.02 1.7.77 2.08L16 17v5h4z"/></svg>' },
              { label: 'Peak Usage Time', value: '6-8 PM', color: 'text-orange-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg>' },
              { label: 'Grid Efficiency', value: '96.3%', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>' },
              { label: 'Smart Meters', value: '21,200', color: 'text-purple-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14z"/></svg>' },
              { label: 'Solar Adoption', value: '32.4%', color: 'text-yellow-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>' }
            ]
          }
        },
        'critical-systems': { 
          color: '#ef4444', gradient: 'from-red-400 to-red-600', size: 50,
          icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
          info: {
            title: 'Critical Systems',
            subtitle: 'Emergency Infrastructure',
            description: 'Essential services requiring uninterrupted power supply including hospitals and emergency services.',
            stats: [
              { label: 'Priority Load', value: '200 MW', color: 'text-red-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
              { label: 'Priority Level', value: 'Maximum', color: 'text-red-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>' },
              { label: 'Backup Systems', value: '3 Active', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>' },
              { label: 'System Uptime', value: '99.99%', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg>' },
              { label: 'Response Time', value: '<2 seconds', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
              { label: 'Facilities', value: '12 Critical', color: 'text-orange-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm6 16H8a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h2v1a1 1 0 0 0 2 0V9h2v12a1 1 0 0 1-1 1z"/></svg>' }
            ]
          }
        },
        'commercial-west': { 
          color: '#10b981', gradient: 'from-emerald-400 to-green-500', size: 60,
          icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4.5 0v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4.5 0v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zM4 21V8h16v13H4z"/></svg>',
          info: {
            title: 'Commercial West',
            subtitle: 'Business District',
            description: 'Major commercial hub with office buildings, retail centers, and business facilities.',
            stats: [
              { label: 'Power Consumption', value: '650 MW', color: 'text-emerald-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
              { label: 'Buildings Served', value: '1,200+', color: 'text-blue-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4.5 0v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4.5 0v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zM4 21V8h16v13H4z"/></svg>' },
              { label: 'Peak Hours', value: '9AM-6PM', color: 'text-orange-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg>' },
              { label: 'Load Factor', value: '87.5%', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 17V7h2v10h-2zm4 0V7h2v10h-2zm4 0V7h2v10h-2z"/></svg>' },
              { label: 'Energy Savings', value: '22.1%', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' },
              { label: 'HVAC Efficiency', value: '91.2%', color: 'text-blue-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z"/></svg>' }
            ]
          }
        },
        'industrial-east': { 
          color: '#10b981', gradient: 'from-emerald-400 to-green-500', size: 60,
          icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 15c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>',
          info: {
            title: 'Industrial East',
            subtitle: 'Manufacturing Zone',
            description: 'Heavy industrial area with manufacturing plants, processing facilities, and logistics centers.',
            stats: [
              { label: 'Power Consumption', value: '980 MW', color: 'text-emerald-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
              { label: 'Manufacturing Plants', value: '45 Active', color: 'text-blue-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 15c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>' },
              { label: 'Operating Schedule', value: '24/7', color: 'text-orange-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg>' },
              { label: 'Process Efficiency', value: '91.8%', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
              { label: 'Production Output', value: '+12.3%', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>' },
              { label: 'Worker Safety', value: '98.9%', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.8C8,12.2 8.6,11.6 9.2,11.6V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11.5H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z"/></svg>' }
            ]
          }
        },
        'solar-farm-a': { 
          color: '#8b5cf6', gradient: 'from-purple-400 to-violet-500', size: 40,
          icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>',
          info: {
            title: 'Solar Farm A',
            subtitle: 'Photovoltaic Array',
            description: 'Large-scale solar installation with advanced tracking systems and energy storage integration.',
            stats: [
              { label: 'Power Generation', value: '450 MW', color: 'text-purple-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
              { label: 'Solar Panels', value: '2.1M Units', color: 'text-blue-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>' },
              { label: 'Panel Efficiency', value: '22.1%', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 17V7h2v10h-2zm4 0V7h2v10h-2zm4 0V7h2v10h-2z"/></svg>' },
              { label: 'Weather Conditions', value: 'Optimal', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zm9-9.95h2v2.95h-2zm7.45 3.91l1.41 1.41-1.79 1.79-1.41-1.41zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79zm4.21-2.84l-1.41-1.41-1.79 1.8 1.41 1.41zm-14.7 0l1.41 1.41 1.79-1.8-1.41-1.41zM20 10.5h3v2h-3zm-8-5c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z"/></svg>' },
              { label: 'Tracking System', value: 'Active', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
              { label: 'Energy Storage', value: '125 MWh', color: 'text-yellow-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>' }
            ]
          }
        },
        'wind-farm-b': { 
          color: '#8b5cf6', gradient: 'from-purple-400 to-violet-500', size: 40,
          icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C9.21 2 6.98 4.11 6.7 6.8C5.73 7.42 5 8.47 5 9.7c0 1.66 1.34 3 3 3h1v9h6v-9h1c1.66 0 3-1.34 3-3 0-1.23-.73-2.28-1.7-2.9C16.02 4.11 13.79 2 11 2h1z"/></svg>',
          info: {
            title: 'Wind Farm B',
            subtitle: 'Turbine Cluster',
            description: 'Advanced wind generation facility with high-efficiency turbines and predictive maintenance systems.',
            stats: [
              { label: 'Power Generation', value: '680 MW', color: 'text-purple-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
              { label: 'Wind Turbines', value: '95 Units', color: 'text-blue-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C9.21 2 6.98 4.11 6.7 6.8C5.73 7.42 5 8.47 5 9.7c0 1.66 1.34 3 3 3h1v9h6v-9h1c1.66 0 3-1.34 3-3 0-1.23-.73-2.28-1.7-2.9C16.02 4.11 13.79 2 11 2h1z"/></svg>' },
              { label: 'Average Wind Speed', value: '18.2 m/s', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C9.21 2 6.98 4.11 6.7 6.8C5.73 7.42 5 8.47 5 9.7c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3 0-1.23-.73-2.28-1.7-2.9C16.02 4.11 13.79 2 11 2h1z"/></svg>' },
              { label: 'Capacity Factor', value: '89.5%', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>' },
              { label: 'Turbine Efficiency', value: '94.7%', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
              { label: 'Maintenance Status', value: 'Optimal', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>' }
            ]
          }
        },
        'storage-west': { 
          color: '#f59e0b', gradient: 'from-amber-400 to-orange-500', size: 35,
          icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>',
          info: {
            title: 'Storage West',
            subtitle: 'Battery Energy Storage',
            description: 'Advanced lithium-ion battery storage system providing grid stabilization and peak shaving.',
            stats: [
              { label: 'Current Capacity', value: '85%', color: 'text-amber-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>' },
              { label: 'Max Storage', value: '500 MWh', color: 'text-blue-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
              { label: 'Response Time', value: '<50ms', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
              { label: 'Charge Cycles', value: '1,247', color: 'text-gray-300', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/></svg>' },
              { label: 'Efficiency', value: '96.8%', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 17V7h2v10h-2zm4 0V7h2v10h-2zm4 0V7h2v10h-2z"/></svg>' },
              { label: 'Temperature', value: '23°C', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-2V5c0-.55.45-1 1-1s1 .45 1 1v6h-2z"/></svg>' }
            ]
          }
        },
        'storage-east': { 
          color: '#f59e0b', gradient: 'from-amber-400 to-orange-500', size: 35,
          icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>',
          info: {
            title: 'Storage East',
            subtitle: 'Battery Energy Storage',
            description: 'High-capacity battery storage facility with smart grid integration and automated management.',
            stats: [
              { label: 'Current Capacity', value: '85%', color: 'text-amber-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>' },
              { label: 'Max Storage', value: '500 MWh', color: 'text-blue-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
              { label: 'Response Time', value: '<50ms', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
              { label: 'Charge Cycles', value: '1,189', color: 'text-gray-300', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/></svg>' },
              { label: 'Efficiency', value: '97.2%', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 17V7h2v10h-2zm4 0V7h2v10h-2zm4 0V7h2v10h-2z"/></svg>' },
              { label: 'Temperature', value: '22°C', color: 'text-green-400', icon: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-2V5c0-.55.45-1 1-1s1 .45 1 1v6h-2z"/></svg>' }
            ]
          }
        }
      }
      
      const selectedNodeData = nodeData[nodeType as keyof typeof nodeData]
      if (!selectedNodeData) return
      
      // Create the full-screen centered overlay with optimized rendering
      const overlay = document.createElement('div')
      overlay.className = 'node-center-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
      
      // Use CSS animations instead of classes for better performance
      overlay.style.opacity = '0'
      overlay.style.transform = 'scale(0.95)'
      overlay.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
      
      // Prevent background scrolling
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      
      // Prevent scroll events on the overlay
      overlay.addEventListener('wheel', (e) => e.preventDefault(), { passive: false })
      overlay.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false })
      
      // Pre-build the content string for better performance
      const overlayContent = `
        <div class="bg-slate-900/95 backdrop-blur-xl border border-cyan-400/30 rounded-3xl p-8 max-w-5xl w-full mx-4 shadow-2xl shadow-cyan-400/20" style="transform: scale(0.9); opacity: 0; transition: transform 0.5s ease, opacity 0.5s ease;">
          <!-- Header -->
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-4">
              <div class="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <span class="text-xl font-bold text-white">Node Information</span>
            </div>
            <button class="close-overlay w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-400/30 flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-200 hover:scale-105">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <!-- Left Side - Node Visualization -->
            <div class="flex flex-col items-center justify-center p-8">
              <div class="relative">
                <!-- Main Node Circle with Animation -->
                <div class="relative" style="width: ${selectedNodeData.size}px; height: ${selectedNodeData.size}px;">
                  <div class="absolute inset-0 bg-gradient-to-br ${selectedNodeData.gradient} rounded-full animate-pulse shadow-2xl" style="box-shadow: 0 0 50px ${selectedNodeData.color}40"></div>
                  <div class="absolute inset-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center text-white">
                    ${selectedNodeData.icon}
                  </div>
                  
                  <!-- Optimized Rotating Rings -->
                  <div class="absolute -inset-4 border-2 border-cyan-400/30 rounded-full" style="animation: spin 20s linear infinite;"></div>
                  <div class="absolute -inset-6 border border-cyan-400/20 rounded-full" style="animation: spin 30s linear infinite reverse;"></div>
                  <div class="absolute -inset-8 border border-cyan-400/10 rounded-full" style="animation: spin 40s linear infinite;"></div>
                </div>
                
                <!-- Floating Data Points with staggered animations -->
                <div class="absolute -top-4 -right-4 w-3 h-3 bg-green-400 rounded-full" style="animation: bounce 2s infinite 0.5s;"></div>
                <div class="absolute -bottom-4 -left-4 w-2 h-2 bg-blue-400 rounded-full" style="animation: bounce 2s infinite 1s;"></div>
                <div class="absolute top-1/2 -left-6 w-2 h-2 bg-purple-400 rounded-full" style="animation: bounce 2s infinite 1.5s;"></div>
              </div>
              
              <!-- Node Title -->
              <div class="mt-8 text-center">
                <h2 class="text-2xl font-bold text-white mb-2">${selectedNodeData.info.title}</h2>
                <p class="text-lg text-gray-400">${selectedNodeData.info.subtitle}</p>
                <p class="text-sm text-gray-500 mt-3 max-w-md">${selectedNodeData.info.description}</p>
              </div>
            </div>
            
            <!-- Right Side - Information Panel -->
            <div>
              <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span class="w-2 h-2 bg-cyan-400 rounded-full"></span>
                Live Statistics
              </h3>
              
              <!-- Optimized Stats Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                ${selectedNodeData.info.stats.map((stat, index) => `
                  <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30 hover:border-cyan-400/30 transition-all duration-300" style="animation-delay: ${100 + index * 50}ms;">
                    <div class="flex items-center gap-3 mb-2">
                      <span class="text-lg flex items-center justify-center w-5 h-5">${stat.icon}</span>
                      <div class="text-xs text-gray-400 font-medium">${stat.label}</div>
                    </div>
                    <div class="font-bold text-lg ${stat.color}">${stat.value}</div>
                  </div>
                `).join('')}
              </div>
              
              <!-- Status Footer -->
              <div class="bg-slate-800/30 rounded-xl p-4 border border-slate-600/20">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span class="text-sm text-gray-400">Real-time Data</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-500">Last Updated:</span>
                    <span class="text-xs text-cyan-400 font-mono">${new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
      
      overlay.innerHTML = overlayContent
      document.body.appendChild(overlay)
      
      // Trigger animations with requestAnimationFrame for smooth performance
      requestAnimationFrame(() => {
        overlay.style.opacity = '1'
        overlay.style.transform = 'scale(1)'
        
        const content = overlay.querySelector('.bg-slate-900\\/95') as HTMLElement
        if (content) {
          requestAnimationFrame(() => {
            content.style.transform = 'scale(1)'
            content.style.opacity = '1'
          })
        }
      })
      
      // Add close functionality
      const closeBtn = overlay.querySelector('.close-overlay')
      const overlayBg = overlay
      
      const closeOverlay = () => {
        // Restore background scrolling
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
        
        // Use CSS transitions for smoother closing
        overlay.style.opacity = '0'
        overlay.style.transform = 'scale(0.95)'
        
        setTimeout(() => {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay)
            setSelectedNode(null)
          }
        }, 300)
      }
      
      closeBtn?.addEventListener('click', closeOverlay)
      overlayBg?.addEventListener('click', (e) => {
        if (e.target === overlayBg) closeOverlay()
      })
      
      // Close on Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeOverlay()
          document.removeEventListener('keydown', handleEscape)
        }
      }
      document.addEventListener('keydown', handleEscape)
      
      // Auto-close after 15 seconds
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          // Restore background scrolling
          document.body.style.overflow = ''
          document.documentElement.style.overflow = ''
          closeOverlay()
        }
      }, 15000)
    }
    
    // Log node interaction
    console.log(`Selected node: ${nodeType}`)
  }, [selectedNode]) // useCallback dependency array
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                EcoGridX Dashboard
              </span>
            </h1>
            <p className="text-gray-400">Comprehensive overview of smart grid operations and performance</p>
          </div>
        </div>
      </div>

      {/* Interactive Energy Flow Network - Obsidian Graph Style */}
      <section className="mb-6">
        <div className="bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-700/20 border border-slate-500/20 rounded-2xl p-6 min-h-[500px] relative overflow-hidden">
          {/* Obsidian-style background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-80"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
          
          <div className="relative z-10 flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
              Energy Network Graph
              <span className="text-sm font-normal text-gray-400 ml-2">Interactive Knowledge Map</span>
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Interactive</span>
              </div>
            </div>
          </div>
          
          {/* Obsidian Graph Container */}
          <div 
            ref={containerRef}
            className="relative h-[400px] bg-gradient-to-br from-slate-900/80 to-slate-800/60 rounded-xl border border-slate-600/30 overflow-hidden cursor-grab backdrop-blur-sm will-change-transform"
            style={{ 
              background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.8) 0%, rgba(2, 6, 23, 0.95) 100%)',
              touchAction: 'none'
            }}
          >
            
            {/* Optimized SVG Graph */}
            <svg 
              ref={svgRef}
              className="w-full h-full will-change-transform"
              viewBox="0 0 1200 600"
              style={{ 
                transformOrigin: '0 0',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Graph Background with Obsidian styling */}
              <defs>
                {/* Gradient definitions for Obsidian-style nodes */}
                <radialGradient id="centralNode" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9"/>
                  <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.7"/>
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.5"/>
                </radialGradient>
                
                <radialGradient id="primaryNode" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8"/>
                  <stop offset="70%" stopColor="#0891b2" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#0e7490" stopOpacity="0.4"/>
                </radialGradient>
                
                <radialGradient id="secondaryNode" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
                  <stop offset="70%" stopColor="#059669" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4"/>
                </radialGradient>
                
                <radialGradient id="criticalNode" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
                  <stop offset="70%" stopColor="#dc2626" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.4"/>
                </radialGradient>
                
                {/* Glow effects for Obsidian style */}
                <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                <filter id="connectionGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Connection Lines Layer - Obsidian Style */}
              <g id="connections" opacity="0.6">
                {/* Central hub connections - Primary links */}
                <path d="M 600 300 L 300 150" stroke="#22d3ee" strokeWidth="3" fill="none" opacity="0.7" filter="url(#connectionGlow)">
                  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
                </path>
                <path d="M 600 300 L 900 150" stroke="#22d3ee" strokeWidth="3" fill="none" opacity="0.7" filter="url(#connectionGlow)">
                  <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3s" repeatCount="indefinite"/>
                </path>
                <path d="M 600 300 L 200 450" stroke="#10b981" strokeWidth="3" fill="none" opacity="0.7" filter="url(#connectionGlow)">
                  <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2.5s" repeatCount="indefinite"/>
                </path>
                <path d="M 600 300 L 1000 450" stroke="#10b981" strokeWidth="3" fill="none" opacity="0.7" filter="url(#connectionGlow)">
                  <animate attributeName="opacity" values="0.9;0.6;0.9" dur="2.5s" repeatCount="indefinite"/>
                </path>
                <path d="M 600 300 L 600 100" stroke="#ef4444" strokeWidth="4" fill="none" opacity="0.8" filter="url(#connectionGlow)">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                </path>
                
                {/* Secondary connections - Network mesh */}
                <path d="M 300 150 L 900 150" stroke="#64748b" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" values="0;-10" dur="4s" repeatCount="indefinite"/>
                </path>
                <path d="M 200 450 L 1000 450" stroke="#64748b" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" values="0;-10" dur="4s" repeatCount="indefinite"/>
                </path>
                <path d="M 300 150 L 200 450" stroke="#64748b" strokeWidth="1.5" fill="none" opacity="0.3">
                  <animate attributeName="opacity" values="0.2;0.5;0.2" dur="5s" repeatCount="indefinite"/>
                </path>
                <path d="M 900 150 L 1000 450" stroke="#64748b" strokeWidth="1.5" fill="none" opacity="0.3">
                  <animate attributeName="opacity" values="0.5;0.2;0.5" dur="5s" repeatCount="indefinite"/>
                </path>
                
                {/* Satellite connections */}
                <path d="M 300 150 L 150 80" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.5">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite"/>
                </path>
                <path d="M 900 150 L 1050 80" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.5">
                  <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3.5s" repeatCount="indefinite"/>
                </path>
                <path d="M 200 450 L 50 520" stroke="#f59e0b" strokeWidth="2" fill="none" opacity="0.5">
                  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite"/>
                </path>
                <path d="M 1000 450 L 1150 520" stroke="#f59e0b" strokeWidth="2" fill="none" opacity="0.5">
                  <animate attributeName="opacity" values="0.8;0.4;0.8" dur="4s" repeatCount="indefinite"/>
                </path>
              </g>
              
              {/* Floating Data Particles */}
              <g id="dataFlow">
                <circle r="3" fill="#22d3ee" opacity="0.8">
                  <animateMotion dur="6s" repeatCount="indefinite">
                    <mpath href="#dataPath1"/>
                  </animateMotion>
                </circle>
                <circle r="2" fill="#10b981" opacity="0.7">
                  <animateMotion dur="4s" repeatCount="indefinite">
                    <mpath href="#dataPath2"/>
                  </animateMotion>
                </circle>
                <path id="dataPath1" d="M 600 300 L 300 150 L 900 150 L 600 300" fill="none" opacity="0"/>
                <path id="dataPath2" d="M 600 300 L 200 450 L 1000 450 L 600 300" fill="none" opacity="0"/>
              </g>
              
              {/* Node Layer - Optimized for Performance */}
              <g id="nodes">
                {/* Central Power Hub - Main Node - OPTIMIZED */}
                <g className={`cursor-pointer group transition-all duration-200 ${selectedNode === 'power-hub' ? 'opacity-90' : ''}`} onClick={() => handleNodeClick('power-hub')}>
                  <circle cx="600" cy="300" r={selectedNode === 'power-hub' ? "40" : "35"} fill="url(#centralNode)" filter="url(#nodeGlow)" 
                    className="group-hover:r-40 transition-all duration-200 drop-shadow-lg"/>
                  <circle cx="600" cy="300" r={selectedNode === 'power-hub' ? "30" : "25"} fill="none" stroke="#fbbf24" strokeWidth={selectedNode === 'power-hub' ? "3" : "2"} opacity="0.8"
                    className="group-hover:stroke-width-3 transition-all duration-200"/>
                  <text x="600" y="250" textAnchor="middle" className={`text-sm font-bold drop-shadow transition-colors duration-200 ${selectedNode === 'power-hub' ? 'fill-yellow-200' : 'fill-yellow-300 group-hover:fill-yellow-200'}`}>Power Hub</text>
                  <text x="600" y="266" textAnchor="middle" className="fill-yellow-400 text-xs font-semibold">Central Grid</text>
                  <text x="600" y="340" textAnchor="middle" className={`text-xs transition-colors duration-200 ${selectedNode === 'power-hub' ? 'fill-white' : 'fill-gray-300 group-hover:fill-white'}`}>2,847 MW</text>
                  <text x="600" y="355" textAnchor="middle" className="fill-gray-400 text-xs">Active</text>
                </g>
                
                {/* Primary Nodes - OPTIMIZED */}
                <g className={`cursor-pointer group transition-all duration-200 ${selectedNode === 'residential-north' ? 'opacity-90' : ''}`} onClick={() => handleNodeClick('residential-north')}>
                  <circle cx="300" cy="150" r={selectedNode === 'residential-north' ? "30" : "25"} fill="url(#primaryNode)" filter="url(#nodeGlow)" 
                    className="group-hover:r-30 transition-all duration-200 drop-shadow-lg"/>
                  <circle cx="300" cy="150" r={selectedNode === 'residential-north' ? "21" : "18"} fill="none" stroke="#22d3ee" strokeWidth={selectedNode === 'residential-north' ? "2" : "1.5"} opacity={selectedNode === 'residential-north' ? "0.8" : "0.6"}
                    className="group-hover:stroke-width-2 group-hover:opacity-80 transition-all duration-200"/>
                  <text x="300" y="125" textAnchor="middle" className={`text-xs font-bold transition-colors duration-200 ${selectedNode === 'residential-north' ? 'fill-cyan-200' : 'fill-cyan-300 group-hover:fill-cyan-200'}`}>Residential N</text>
                  <text x="300" y="180" textAnchor="middle" className={`text-xs transition-colors duration-200 ${selectedNode === 'residential-north' ? 'fill-white' : 'fill-gray-300 group-hover:fill-white'}`}>820 MW</text>
                </g>
                
                <g className={`cursor-pointer group transition-all duration-300 ${selectedNode === 'residential-south' ? 'animate-pulse' : ''}`} onClick={() => handleNodeClick('residential-south')}>
                  <circle cx="900" cy="150" r={selectedNode === 'residential-south' ? "30" : "25"} fill="url(#primaryNode)" filter="url(#nodeGlow)" 
                    className="group-hover:r-30 transition-all duration-300 drop-shadow-lg"/>
                  <circle cx="900" cy="150" r={selectedNode === 'residential-south' ? "21" : "18"} fill="none" stroke="#22d3ee" strokeWidth={selectedNode === 'residential-south' ? "2" : "1.5"} opacity={selectedNode === 'residential-south' ? "0.8" : "0.6"}
                    className="group-hover:stroke-width-2 group-hover:opacity-80 transition-all duration-300"/>
                  <circle cx="900" cy="150" r={selectedNode === 'residential-south' ? "40" : "35"} fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity={selectedNode === 'residential-south' ? "0.4" : "0.2"}
                    className="group-hover:opacity-40 transition-opacity duration-300">
                    <animate attributeName="r" values={selectedNode === 'residential-south' ? "40;45;40" : "35;40;35"} dur="4s" repeatCount="indefinite"/>
                  </circle>
                  <text x="900" y="115" textAnchor="middle" className={`text-sm font-semibold transition-colors duration-300 ${selectedNode === 'residential-south' ? 'fill-cyan-200' : 'fill-cyan-300 group-hover:fill-cyan-200'}`}>Residential South</text>
                  <text x="900" y="185" textAnchor="middle" className={`text-xs transition-colors duration-300 ${selectedNode === 'residential-south' ? 'fill-white' : 'fill-gray-300 group-hover:fill-white'}`}>950 MW</text>
                </g>
                
                <g className={`cursor-pointer group transition-all duration-300 ${selectedNode === 'commercial-west' ? 'animate-pulse' : ''}`} onClick={() => handleNodeClick('commercial-west')}>
                  <circle cx="200" cy="450" r={selectedNode === 'commercial-west' ? "30" : "25"} fill="url(#secondaryNode)" filter="url(#nodeGlow)" 
                    className="group-hover:r-30 transition-all duration-300 drop-shadow-lg"/>
                  <circle cx="200" cy="450" r={selectedNode === 'commercial-west' ? "21" : "18"} fill="none" stroke="#10b981" strokeWidth={selectedNode === 'commercial-west' ? "2" : "1.5"} opacity={selectedNode === 'commercial-west' ? "0.8" : "0.6"}
                    className="group-hover:stroke-width-2 group-hover:opacity-80 transition-all duration-300"/>
                  <circle cx="200" cy="450" r={selectedNode === 'commercial-west' ? "40" : "35"} fill="none" stroke="#10b981" strokeWidth="0.5" opacity={selectedNode === 'commercial-west' ? "0.4" : "0.2"}
                    className="group-hover:opacity-40 transition-opacity duration-300">
                    <animate attributeName="r" values={selectedNode === 'commercial-west' ? "40;45;40" : "35;40;35"} dur="4s" repeatCount="indefinite"/>
                  </circle>
                  <text x="200" y="415" textAnchor="middle" className={`text-sm font-semibold transition-colors duration-300 ${selectedNode === 'commercial-west' ? 'fill-emerald-200' : 'fill-emerald-300 group-hover:fill-emerald-200'}`}>Commercial West</text>
                  <text x="200" y="485" textAnchor="middle" className={`text-xs transition-colors duration-300 ${selectedNode === 'commercial-west' ? 'fill-white' : 'fill-gray-300 group-hover:fill-white'}`}>650 MW</text>
                </g>
                
                <g className={`cursor-pointer group transition-all duration-300 ${selectedNode === 'industrial-east' ? 'animate-pulse' : ''}`} onClick={() => handleNodeClick('industrial-east')}>
                  <circle cx="1000" cy="450" r={selectedNode === 'industrial-east' ? "30" : "25"} fill="url(#secondaryNode)" filter="url(#nodeGlow)" 
                    className="group-hover:r-30 transition-all duration-300 drop-shadow-lg"/>
                  <circle cx="1000" cy="450" r={selectedNode === 'industrial-east' ? "21" : "18"} fill="none" stroke="#10b981" strokeWidth={selectedNode === 'industrial-east' ? "2" : "1.5"} opacity={selectedNode === 'industrial-east' ? "0.8" : "0.6"}
                    className="group-hover:stroke-width-2 group-hover:opacity-80 transition-all duration-300"/>
                  <circle cx="1000" cy="450" r={selectedNode === 'industrial-east' ? "40" : "35"} fill="none" stroke="#10b981" strokeWidth="0.5" opacity={selectedNode === 'industrial-east' ? "0.4" : "0.2"}
                    className="group-hover:opacity-40 transition-opacity duration-300">
                    <animate attributeName="r" values={selectedNode === 'industrial-east' ? "40;45;40" : "35;40;35"} dur="4s" repeatCount="indefinite"/>
                  </circle>
                  <text x="1000" y="415" textAnchor="middle" className={`text-sm font-semibold transition-colors duration-300 ${selectedNode === 'industrial-east' ? 'fill-emerald-200' : 'fill-emerald-300 group-hover:fill-emerald-200'}`}>Industrial East</text>
                  <text x="1000" y="485" textAnchor="middle" className={`text-xs transition-colors duration-300 ${selectedNode === 'industrial-east' ? 'fill-white' : 'fill-gray-300 group-hover:fill-white'}`}>980 MW</text>
                </g>
                
                {/* Critical Infrastructure with Pulsing Effect */}
                <g className={`cursor-pointer group transition-all duration-300 ${selectedNode === 'critical-systems' ? 'animate-pulse' : ''}`} onClick={() => handleNodeClick('critical-systems')}>
                  <circle cx="600" cy="100" r={selectedNode === 'critical-systems' ? "27" : "22"} fill="url(#criticalNode)" filter="url(#nodeGlow)" 
                    className="group-hover:r-27 transition-all duration-300 drop-shadow-lg"/>
                  <circle cx="600" cy="100" r={selectedNode === 'critical-systems' ? "18" : "15"} fill="none" stroke="#ef4444" strokeWidth={selectedNode === 'critical-systems' ? "3" : "2"} opacity="0.8"
                    className="group-hover:stroke-width-3 transition-all duration-300">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="600" cy="100" r={selectedNode === 'critical-systems' ? "35" : "30"} fill="none" stroke="#ef4444" strokeWidth="1" opacity={selectedNode === 'critical-systems' ? "0.5" : "0.3"}
                    className="group-hover:opacity-50 transition-opacity duration-300">
                    <animate attributeName="r" values={selectedNode === 'critical-systems' ? "35;40;35" : "30;35;30"} dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <text x="600" y="70" textAnchor="middle" className={`text-sm font-semibold transition-colors duration-300 ${selectedNode === 'critical-systems' ? 'fill-red-200' : 'fill-red-300 group-hover:fill-red-200'}`}>Critical Systems</text>
                  <text x="600" y="130" textAnchor="middle" className={`text-xs transition-colors duration-300 ${selectedNode === 'critical-systems' ? 'fill-white' : 'fill-gray-300 group-hover:fill-white'}`}>200 MW</text>
                </g>
                
                {/* Satellite Nodes with Hover Effects */}
                <g className={`cursor-pointer group transition-all duration-300 ${selectedNode === 'solar-farm-a' ? 'animate-pulse' : ''}`} onClick={() => handleNodeClick('solar-farm-a')}>
                  <circle cx="150" cy="80" r={selectedNode === 'solar-farm-a' ? "18" : "15"} fill="#8b5cf6" filter="url(#nodeGlow)" 
                    className="group-hover:r-18 transition-all duration-300 drop-shadow-md"/>
                  <circle cx="150" cy="80" r={selectedNode === 'solar-farm-a' ? "25" : "20"} fill="none" stroke="#8b5cf6" strokeWidth="0.5" opacity={selectedNode === 'solar-farm-a' ? "0.5" : "0.3"}
                    className="group-hover:opacity-50 transition-opacity duration-300">
                    <animate attributeName="r" values={selectedNode === 'solar-farm-a' ? "25;30;25" : "20;25;20"} dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <text x="150" y="55" textAnchor="middle" className={`text-xs font-medium transition-colors duration-300 ${selectedNode === 'solar-farm-a' ? 'fill-purple-200' : 'fill-purple-300 group-hover:fill-purple-200'}`}>Solar A</text>
                  <text x="150" y="105" textAnchor="middle" className={`text-xs transition-colors duration-300 ${selectedNode === 'solar-farm-a' ? 'fill-gray-300' : 'fill-gray-400 group-hover:fill-gray-300'}`}>450 MW</text>
                </g>
                
                <g className={`cursor-pointer group transition-all duration-300 ${selectedNode === 'wind-farm-b' ? 'animate-pulse' : ''}`} onClick={() => handleNodeClick('wind-farm-b')}>
                  <circle cx="1050" cy="80" r={selectedNode === 'wind-farm-b' ? "18" : "15"} fill="#8b5cf6" filter="url(#nodeGlow)" 
                    className="group-hover:r-18 transition-all duration-300 drop-shadow-md"/>
                  <circle cx="1050" cy="80" r={selectedNode === 'wind-farm-b' ? "25" : "20"} fill="none" stroke="#8b5cf6" strokeWidth="0.5" opacity={selectedNode === 'wind-farm-b' ? "0.5" : "0.3"}
                    className="group-hover:opacity-50 transition-opacity duration-300">
                    <animate attributeName="r" values={selectedNode === 'wind-farm-b' ? "25;30;25" : "20;25;20"} dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <text x="1050" y="55" textAnchor="middle" className={`text-xs font-medium transition-colors duration-300 ${selectedNode === 'wind-farm-b' ? 'fill-purple-200' : 'fill-purple-300 group-hover:fill-purple-200'}`}>Wind B</text>
                  <text x="1050" y="105" textAnchor="middle" className={`text-xs transition-colors duration-300 ${selectedNode === 'wind-farm-b' ? 'fill-gray-300' : 'fill-gray-400 group-hover:fill-gray-300'}`}>680 MW</text>
                </g>
                
                <g className={`cursor-pointer group transition-all duration-300 ${selectedNode === 'storage-west' ? 'animate-pulse' : ''}`} onClick={() => handleNodeClick('storage-west')}>
                  <circle cx="50" cy="520" r={selectedNode === 'storage-west' ? "15" : "12"} fill="#f59e0b" filter="url(#nodeGlow)" 
                    className="group-hover:r-15 transition-all duration-300 drop-shadow-md"/>
                  <circle cx="50" cy="520" r={selectedNode === 'storage-west' ? "20" : "16"} fill="none" stroke="#f59e0b" strokeWidth="0.5" opacity={selectedNode === 'storage-west' ? "0.5" : "0.3"}
                    className="group-hover:opacity-50 transition-opacity duration-300">
                    <animate attributeName="r" values={selectedNode === 'storage-west' ? "20;25;20" : "16;20;16"} dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <text x="50" y="545" textAnchor="middle" className={`text-xs font-medium transition-colors duration-300 ${selectedNode === 'storage-west' ? 'fill-amber-200' : 'fill-amber-300 group-hover:fill-amber-200'}`}>Storage W</text>
                </g>
                
                <g className={`cursor-pointer group transition-all duration-300 ${selectedNode === 'storage-east' ? 'animate-pulse' : ''}`} onClick={() => handleNodeClick('storage-east')}>
                  <circle cx="1150" cy="520" r={selectedNode === 'storage-east' ? "15" : "12"} fill="#f59e0b" filter="url(#nodeGlow)" 
                    className="group-hover:r-15 transition-all duration-300 drop-shadow-md"/>
                  <circle cx="1150" cy="520" r={selectedNode === 'storage-east' ? "20" : "16"} fill="none" stroke="#f59e0b" strokeWidth="0.5" opacity={selectedNode === 'storage-east' ? "0.5" : "0.3"}
                    className="group-hover:opacity-50 transition-opacity duration-300">
                    <animate attributeName="r" values={selectedNode === 'storage-east' ? "20;25;20" : "16;20;16"} dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <text x="1150" y="545" textAnchor="middle" className={`text-xs font-medium transition-colors duration-300 ${selectedNode === 'storage-east' ? 'fill-amber-200' : 'fill-amber-300 group-hover:fill-amber-200'}`}>Storage E</text>
                </g>
              </g>
            </svg>
            
            {/* Obsidian-style Info Panel */}
            <div className="absolute top-3 right-3 bg-slate-800/90 backdrop-blur-sm border border-slate-600/40 rounded-lg p-3 min-w-[200px]">
              <div className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                Graph Overview
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Nodes:</span>
                  <span className="text-white font-medium">9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Connections:</span>
                  <span className="text-green-400 font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Network Load:</span>
                  <span className="text-cyan-400 font-medium">93.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Graph Health:</span>
                  <span className="text-green-400 font-medium">Optimal</span>
                </div>
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="absolute bottom-3 left-3 flex gap-2">
              <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600/40 rounded-lg px-3 py-1.5 text-xs text-gray-300">
                <span className="text-cyan-400">Drag</span> to pan • <span className="text-cyan-400">Pinch</span> to zoom
              </div>
              <button 
                onClick={resetZoom}
                className="bg-slate-800/90 backdrop-blur-sm border border-slate-600/40 hover:border-cyan-400/60 rounded-lg px-3 py-1.5 text-xs text-gray-300 hover:text-cyan-400 transition-all duration-200 flex items-center gap-1.5 hover:bg-slate-700/90"
                title="Reset zoom to default view"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset View
              </button>
            </div>
          </div>

          {/* Obsidian-Style Network Statistics */}
          <div className="relative z-10 mt-4 grid grid-cols-3 md:grid-cols-6 gap-3">
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-xs font-medium">Central Hub</span>
              </div>
              <div className="text-yellow-400 font-bold text-base">2,847</div>
              <div className="text-gray-400 text-xs">MW Generated</div>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-gray-300 text-xs font-medium">Residential</span>
              </div>
              <div className="text-cyan-400 font-bold text-base">1,770</div>
              <div className="text-gray-400 text-xs">MW Load</div>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-gray-300 text-xs font-medium">Commercial</span>
              </div>
              <div className="text-emerald-400 font-bold text-base">1,630</div>
              <div className="text-gray-400 text-xs">MW Load</div>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-xs font-medium">Critical</span>
              </div>
              <div className="text-red-400 font-bold text-base">200</div>
              <div className="text-gray-400 text-xs">MW Priority</div>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300 text-xs font-medium">Renewable</span>
              </div>
              <div className="text-purple-400 font-bold text-base">1,130</div>
              <div className="text-gray-400 text-xs">MW Clean</div>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span className="text-gray-300 text-xs font-medium">Storage</span>
              </div>
              <div className="text-amber-400 font-bold text-base">85%</div>
              <div className="text-gray-400 text-xs">Capacity</div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Status Overview */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Supply vs Demand Card - Minimalistic & Clear */}
        <div className="group relative bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-purple-500/5 border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-white mb-6">Supply vs Demand</h2>
            
            {/* Main Comparison */}
            <div className="text-center mb-4">
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">2,650</div>
                  <div className="text-sm text-gray-300">Demand</div>
                  <div className="text-xs text-blue-300">MW</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400">2,847</div>
                  <div className="text-sm text-gray-300">Supply</div>
                  <div className="text-xs text-emerald-300">MW</div>
                </div>
              </div>
            </div>

            {/* Visual Balance */}
            <div className="mb-4">
              <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-blue-400 rounded-full" style={{ width: '93.1%' }}></div>
                <div className="absolute left-0 top-0 h-full bg-emerald-400 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>0</span>
                <span className="text-emerald-400 font-medium">+197 MW surplus</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="text-lg font-bold text-blue-400 mb-1">93.1%</div>
                <div className="text-xs text-gray-300">Utilization</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="text-lg font-bold text-green-400 mb-1">197</div>
                <div className="text-xs text-gray-300">MW Surplus</div>
              </div>
            </div>

            {/* Status */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/15 border border-green-500/25">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-green-400 text-sm font-medium">Surplus Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Efficiency Card - Minimalistic & Clear */}
        <div className="group relative bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-blue-500/5 border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-white mb-6">Grid Efficiency</h2>
            
            {/* Main Efficiency Display */}
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-cyan-400 mb-2">93.1%</div>
              <div className="text-sm text-gray-300">Current Efficiency</div>
              <div className="text-xs text-cyan-300">Power Transmission</div>
            </div>

            {/* Visual Progress */}
            <div className="mb-4">
              <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full" style={{ width: '93.1%' }}></div>
                <div className="absolute top-0 h-full w-0.5 bg-green-400" style={{ left: '90%' }} title="Target: 90%"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>0%</span>
                <span className="text-green-400 font-medium">Target: 90%</span>
                <span className="text-cyan-400">93.1%</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="text-lg font-bold text-red-400 mb-1">6.9%</div>
                <div className="text-xs text-gray-300">Losses</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-lg font-bold text-emerald-400 mb-1">196</div>
                <div className="text-xs text-gray-300">MW Lost</div>
              </div>
            </div>

            {/* Status */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/15 border border-green-500/25">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-green-400 text-sm font-medium">Above Target</span>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Indicator Card - Minimalistic & Clear */}
        <div className="group relative bg-gradient-to-br from-yellow-500/10 via-green-500/5 to-emerald-500/5 border border-yellow-500/20 rounded-2xl p-6 hover:border-yellow-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-white mb-6">Balance Indicator</h2>
            
            {/* Main Balance Display */}
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-green-400 mb-2">Surplus</div>
              <div className="text-sm text-gray-300">Grid State</div>
              <div className="text-xs text-green-300">Stable Operation</div>
            </div>

            {/* Visual Balance */}
            <div className="mb-4">
              <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-400 to-green-400 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Deficit</span>
                <span className="text-green-400 font-medium">Surplus Zone</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="text-lg font-bold text-yellow-400 mb-1">+197</div>
                <div className="text-xs text-gray-300">MW Balance</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="text-lg font-bold text-green-400 mb-1">98.5%</div>
                <div className="text-xs text-gray-300">Stability</div>
              </div>
            </div>

            {/* Status */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/15 border border-green-500/25">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Grid Stable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Storage Status Card - Minimalistic & Clear */}
        <div className="group relative bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-indigo-500/5 border border-purple-500/20 rounded-2xl p-6 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="2" />
                <path d="M9 12h6" />
                <path d="M12 9v6" />
              </svg>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-white mb-6">Storage Status</h2>
            
            {/* Main Storage Display */}
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-purple-400 mb-2">67%</div>
              <div className="text-sm text-gray-300">State of Charge</div>
              <div className="text-xs text-purple-300">Battery Level</div>
            </div>

            {/* Visual Progress */}
            <div className="mb-4">
              <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" style={{ width: '67%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>0%</span>
                <span className="text-purple-400 font-medium">898 / 1,340 MWh</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-lg font-bold text-emerald-400 mb-1">+180</div>
                <div className="text-xs text-gray-300">MW Charging</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-gray-500/10 border border-gray-500/20">
                <div className="text-lg font-bold text-gray-400 mb-1">442</div>
                <div className="text-xs text-gray-300">MWh Available</div>
              </div>
            </div>

            {/* Status */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/15 border border-purple-500/25">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span className="text-purple-400 text-sm font-medium">Good Level</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Energy Mix Section */}
      <section className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Energy Mix Visualization */}
          <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Current Energy Mix</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Donut Chart Side */}
              <div className="flex flex-col justify-center items-center space-y-4">
                <div className="relative">
                  <svg width="180" height="180" viewBox="0 0 200 200" className="transform -rotate-90">
                    {/* Background circle */}
                    <circle cx="100" cy="100" r="70" fill="none" stroke="#374151" strokeWidth="20" />
                    
                    {/* Solar - 35% */}
                    <circle 
                      cx="100" 
                      cy="100" 
                      r="70" 
                      fill="none" 
                      stroke="#fbbf24" 
                      strokeWidth="20" 
                      strokeDasharray="153.86 439.82"
                      strokeDashoffset="0"
                      className="transition-all duration-1000 ease-out"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.4))' }}
                    />
                    
                    {/* Wind - 25% */}
                    <circle 
                      cx="100" 
                      cy="100" 
                      r="70" 
                      fill="none" 
                      stroke="#22d3ee" 
                      strokeWidth="20" 
                      strokeDasharray="109.9 439.82"
                      strokeDashoffset="-153.86"
                      className="transition-all duration-1000 ease-out"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.4))' }}
                    />
                    
                    {/* Hydro - 15% */}
                    <circle 
                      cx="100" 
                      cy="100" 
                      r="70" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="20" 
                      strokeDasharray="65.94 439.82"
                      strokeDashoffset="-263.76"
                      className="transition-all duration-1000 ease-out"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.4))' }}
                    />
                    
                    {/* Coal - 20% */}
                    <circle 
                      cx="100" 
                      cy="100" 
                      r="70" 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="20" 
                      strokeDasharray="87.92 439.82"
                      strokeDashoffset="-329.7"
                      className="transition-all duration-1000 ease-out"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.4))' }}
                    />
                    
                    {/* Natural Gas - 5% */}
                    <circle 
                      cx="100" 
                      cy="100" 
                      r="70" 
                      fill="none" 
                      stroke="#8b5cf6" 
                      strokeWidth="20" 
                      strokeDasharray="21.98 439.82"
                      strokeDashoffset="-417.62"
                      className="transition-all duration-1000 ease-out"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))' }}
                    />
                  </svg>
                  
                  {/* Center Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-white">75%</div>
                    <div className="text-sm text-emerald-400 font-medium">Renewable</div>
                    <div className="text-xs text-gray-400">4,250 MW</div>
                  </div>
                </div>
                
                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                  <div className="text-center bg-emerald-500/10 rounded-lg p-2">
                    <div className="text-lg font-bold text-emerald-400">3,186</div>
                    <div className="text-xs text-gray-400">MW Renewable</div>
                  </div>
                  <div className="text-center bg-red-500/10 rounded-lg p-2">
                    <div className="text-lg font-bold text-red-400">1,064</div>
                    <div className="text-xs text-gray-400">MW Fossil</div>
                  </div>
                </div>
              </div>

              {/* Energy Sources Breakdown */}
              <div className="space-y-3">
                {/* Solar */}
                <div className="group bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 hover:bg-yellow-500/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Solar Power</div>
                        <div className="text-xs text-gray-400">1,487 MW • 245 plants</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-yellow-400">35%</div>
                      <div className="text-xs text-emerald-400">↑ 2.1%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '35%' }}></div>
                  </div>
                </div>

                {/* Wind */}
                <div className="group bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 hover:bg-cyan-500/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Wind Power</div>
                        <div className="text-xs text-gray-400">1,062 MW • 178 turbines</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-cyan-400">25%</div>
                      <div className="text-xs text-emerald-400">↑ 1.8%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-cyan-400 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '25%' }}></div>
                  </div>
                </div>

                {/* Coal */}
                <div className="group bg-red-500/10 border border-red-500/20 rounded-lg p-3 hover:bg-red-500/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17 6H22L20 8H18L17 6M10.5 7.5C10.5 6.67 11.17 6 12 6S13.5 6.67 13.5 7.5 12.83 9 12 9 10.5 8.33 10.5 7.5M16.5 12C16.5 11.17 17.17 10.5 18 10.5S19.5 11.17 19.5 12 18.83 13.5 18 13.5 16.5 12.83 16.5 12M22 18H2L4 20H6L5 18H7L8 20H10L9 18H11L12 20H14L13 18H15L16 20H18L17 18H19L22 18Z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Coal Power</div>
                        <div className="text-xs text-gray-400">850 MW • 12 plants</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-400">20%</div>
                      <div className="text-xs text-red-400">↓ 3.2%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-red-400 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '20%' }}></div>
                  </div>
                </div>

                {/* Hydro */}
                <div className="group bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 hover:bg-emerald-500/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Hydro Power</div>
                        <div className="text-xs text-gray-400">637 MW • 8 dams</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-400">15%</div>
                      <div className="text-xs text-emerald-400">↑ 0.5%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-emerald-400 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '15%' }}></div>
                  </div>
                </div>

                {/* Natural Gas */}
                <div className="group bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 hover:bg-purple-500/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13.14 3.13 12.44 3.5 11.82 4.07C8.27 6.85 8.26 11.78 11.71 14.68C12.5 15.36 13.4 15.74 14.24 16.07C14.76 16.24 15.27 16.35 15.73 16.44C16.76 16.64 17.33 16.67 18.11 16.47C18.5 16.38 18.77 16.21 18.77 15.77C18.77 14.32 18.33 12.97 17.66 11.2Z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Natural Gas</div>
                        <div className="text-xs text-gray-400">212 MW • 4 plants</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-400">5%</div>
                      <div className="text-xs text-red-400">↓ 1.1%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Statistics Sidebar */}
          <div className="space-y-4">
            {/* Live Stats */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-base font-bold text-white mb-3">Live Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Generation</span>
                  <span className="text-base font-bold text-white">4,250 MW</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Efficiency</span>
                  <span className="text-sm font-semibold text-cyan-400">94.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Carbon</span>
                  <span className="text-sm font-semibold text-emerald-400">180 g/kWh</span>
                </div>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-4">
              <h3 className="text-base font-bold text-white mb-3">Impact Today</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">CO₂ Avoided</span>
                  </div>
                  <span className="text-emerald-400 font-semibold text-sm">2,420 t</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Water Saved</span>
                  </div>
                  <span className="text-blue-400 font-semibold text-sm">1.2M L</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Trees Equiv.</span>
                  </div>
                  <span className="text-yellow-400 font-semibold text-sm">98.5K</span>
                </div>
              </div>
            </div>

            {/* Peak Zones */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-base font-bold text-white mb-3">Peak Zones</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">North</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-2 bg-gray-700 rounded-full">
                      <div className="w-8 h-2 bg-red-400 rounded-full"></div>
                    </div>
                    <span className="text-red-400 text-xs font-medium">87%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">East</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-2 bg-gray-700 rounded-full">
                      <div className="w-7 h-2 bg-yellow-400 rounded-full"></div>
                    </div>
                    <span className="text-yellow-400 text-xs font-medium">76%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">West</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-2 bg-gray-700 rounded-full">
                      <div className="w-6 h-2 bg-emerald-400 rounded-full"></div>
                    </div>
                    <span className="text-emerald-400 text-xs font-medium">62%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">South</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-2 bg-gray-700 rounded-full">
                      <div className="w-5 h-2 bg-emerald-400 rounded-full"></div>
                    </div>
                    <span className="text-emerald-400 text-xs font-medium">54%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean AI Snapshots & System Performance Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Clean AI Predictions */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">AI Predictions</h2>
            <div className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full">
              Active
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Next Hour Demand */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Next Hour Demand</div>
                <div className="text-sm text-gray-400">ML Forecast (95% accuracy)</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-400">2,720 MW</div>
                <div className="text-sm text-emerald-400">↑ 3.2% increase</div>
              </div>
            </div>
            
            <hr className="border-white/10" />
            
            {/* Supply Status */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Supply Status</div>
                <div className="text-sm text-gray-400">Reserve capacity available</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-400">No Shortages</div>
                <div className="text-sm text-gray-400">420 MW reserve</div>
              </div>
            </div>
            
            <hr className="border-white/10" />
            
            {/* Potential Issues */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Potential Overload</div>
                <div className="text-sm text-gray-400">North Zone monitoring</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-yellow-400">60 MW</div>
                <div className="text-sm text-yellow-400">Expected at 6:00 PM</div>
              </div>
            </div>
            
            <hr className="border-white/10" />
            
            {/* AI Confidence */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Prediction Confidence</div>
                <div className="text-sm text-gray-400">Model accuracy score</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-400">97.3%</div>
                <div className="text-sm text-blue-400">High confidence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean System Performance */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">System Performance</h2>
            <div className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
              Optimal
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Grid Frequency */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Grid Frequency</div>
                <div className="text-sm text-gray-400">Standard: 50.00 Hz</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-cyan-400">50.01 Hz</div>
                <div className="text-sm text-green-400">Within range</div>
              </div>
            </div>
            
            <hr className="border-white/10" />
            
            {/* Power Losses */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Transmission Losses</div>
                <div className="text-sm text-gray-400">Target: &lt; 7%</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-orange-400">6.9%</div>
                <div className="text-sm text-green-400">Meeting target</div>
              </div>
            </div>
            
            <hr className="border-white/10" />
            
            {/* Environmental Impact */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">CO₂ Savings Today</div>
                <div className="text-sm text-gray-400">vs. fossil baseline</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-400">1,420 tons</div>
                <div className="text-sm text-green-400">12.4% reduction</div>
              </div>
            </div>
            
            <hr className="border-white/10" />
            
            {/* Cost Efficiency */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Cost Savings</div>
                <div className="text-sm text-gray-400">Operational efficiency</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-emerald-400">₹12.4L</div>
                <div className="text-sm text-emerald-400">Today's savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
function Alerts() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            System Alerts & Notifications
          </span>
        </h1>
        <p className="text-gray-400">Real-time monitoring of system alerts, warnings, and critical notifications</p>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-400">4</div>
              <div className="text-sm text-gray-400">Active</div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Critical Alerts</h3>
          <p className="text-sm text-gray-400">Require immediate attention</p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">8</div>
              <div className="text-sm text-gray-400">Active</div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Warnings</h3>
          <p className="text-sm text-gray-400">Monitor closely</p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h10a1 1 0 001-1v-1a1 1 0 00-1-1H4a1 1 0 00-1 1v1a1 1 0 001 1zM4 15h10a1 1 0 001-1v-1a1 1 0 00-1-1H4a1 1 0 00-1 1v1a1 1 0 001 1zM4 11h10a1 1 0 001-1V9a1 1 0 00-1-1H4a1 1 0 00-1 1v1a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">12</div>
              <div className="text-sm text-gray-400">Active</div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Info Alerts</h3>
          <p className="text-sm text-gray-400">General notifications</p>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">47</div>
              <div className="text-sm text-gray-400">Today</div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Resolved</h3>
          <p className="text-sm text-gray-400">Successfully handled</p>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-6 text-white flex items-center">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
            Critical Alerts
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <div className="text-red-400 font-semibold">Power Line Overload</div>
                    <div className="text-sm text-gray-400">Transmission Line TL-47</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">2 min ago</div>
              </div>
              <div className="text-sm text-gray-300 mb-3">
                Line operating at 105% capacity (2,625 MW / 2,500 MW limit). Immediate load redistribution required.
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors">
                  Redistribute Load
                </button>
                <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors">
                  View Details
                </button>
              </div>
            </div>

            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <div className="text-red-400 font-semibold">Voltage Drop Critical</div>
                    <div className="text-sm text-gray-400">Substation Alpha-7</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">3 min ago</div>
              </div>
              <div className="text-sm text-gray-300 mb-3">
                Voltage dropped to 0.89 p.u. (below 0.95 threshold). Affecting 12,000 customers in residential zones.
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors">
                  Voltage Regulation
                </button>
                <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors">
                  Isolate Section
                </button>
              </div>
            </div>

            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <div>
                    <div className="text-red-400 font-semibold">Equipment Overload</div>
                    <div className="text-sm text-gray-400">Transformer T-23</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">5 min ago</div>
              </div>
              <div className="text-sm text-gray-300 mb-3">
                Transformer operating at 115% capacity (23 MVA / 20 MVA rated). Temperature rising to 95°C.
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors">
                  Load Transfer
                </button>
                <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors">
                  Emergency Cooling
                </button>
              </div>
            </div>

            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div>
                    <div className="text-red-400 font-semibold">Unusual Pattern Detected</div>
                    <div className="text-sm text-gray-400">Industrial Zone 4</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">7 min ago</div>
              </div>
              <div className="text-sm text-gray-300 mb-3">
                Abnormal load fluctuation detected: ±340 MW swings in 2-minute intervals. Potential equipment malfunction.
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors">
                  Pattern Analysis
                </button>
                <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors">
                  Investigate Source
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-6 text-white flex items-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
            Warning Alerts
          </h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="text-yellow-400 font-medium">High Demand Forecast</div>
                    <div className="text-xs text-gray-400">Peak expected at 6 PM</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">15 min ago</div>
              </div>
              <div className="text-xs text-gray-300">
                Predicted demand spike: +380 MW above normal capacity
              </div>
            </div>

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <div>
                    <div className="text-yellow-400 font-medium">Solar Output Declining</div>
                    <div className="text-xs text-gray-400">Weather impact detected</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">22 min ago</div>
              </div>
              <div className="text-xs text-gray-300">
                Cloud cover reducing solar generation by 15%
              </div>
            </div>

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <div className="text-yellow-400 font-medium">Voltage Fluctuation</div>
                    <div className="text-xs text-gray-400">Distribution Feeder F-12</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">18 min ago</div>
              </div>
              <div className="text-xs text-gray-300">
                Voltage varying between 0.96-1.04 p.u., monitor for stability
              </div>
            </div>

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <div>
                    <div className="text-yellow-400 font-medium">Equipment Heating</div>
                    <div className="text-xs text-gray-400">Circuit Breaker CB-45</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">25 min ago</div>
              </div>
              <div className="text-xs text-gray-300">
                Operating temperature 78°C, approaching 85°C threshold
              </div>
            </div>

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div>
                    <div className="text-yellow-400 font-medium">Harmonic Distortion</div>
                    <div className="text-xs text-gray-400">Commercial District 2</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">32 min ago</div>
              </div>
              <div className="text-xs text-gray-300">
                Total Harmonic Distortion at 4.2%, monitor power quality
              </div>
            </div>

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div>
                    <div className="text-yellow-400 font-medium">AI Model Drift</div>
                    <div className="text-xs text-gray-400">Prediction accuracy decline</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">35 min ago</div>
              </div>
              <div className="text-xs text-gray-300">
                Model accuracy dropped to 92.1%, retraining recommended
              </div>
            </div>

            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  <div>
                    <div className="text-blue-400 font-medium">Scheduled Maintenance</div>
                    <div className="text-xs text-gray-400">Grid Sector 3</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">1 hour ago</div>
              </div>
              <div className="text-xs text-gray-300">
                Maintenance window: Tomorrow 2:00 AM - 4:00 AM
              </div>
            </div>

            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="text-green-400 font-medium">System Optimization Complete</div>
                    <div className="text-xs text-gray-400">Load balancing updated</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">2 hours ago</div>
              </div>
              <div className="text-xs text-gray-300">
                AI successfully redistributed 240 MW across zones
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Settings */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-6 text-white flex items-center">
          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
          Alert Configuration
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-300">Notification Settings</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-300">Email Notifications</span>
                <div className="w-10 h-6 bg-emerald-500 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-300">SMS Alerts</span>
                <div className="w-10 h-6 bg-emerald-500 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-300">Push Notifications</span>
                <div className="w-10 h-6 bg-gray-600 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-300">Alert Thresholds</h4>
            
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Power Line Load</span>
                  <span className="text-sm text-emerald-400 font-bold">95%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Battery Low Level</span>
                  <span className="text-sm text-yellow-400 font-bold">20%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Voltage Drop</span>
                  <span className="text-sm text-red-400 font-bold">0.95 p.u.</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Equipment Overload</span>
                  <span className="text-sm text-yellow-400 font-bold">100%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Pattern Anomaly</span>
                  <span className="text-sm text-purple-400 font-bold">3σ</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Temperature Alert</span>
                  <span className="text-sm text-orange-400 font-bold">85°C</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-300">Response Actions</h4>
            
            <div className="space-y-3">
              <button className="w-full p-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg transition-all duration-200 text-left">
                <div className="text-emerald-400 font-medium text-sm">Auto Load Balancing</div>
                <div className="text-xs text-gray-400">Enabled for minor issues</div>
              </button>
              
              <button className="w-full p-3 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg transition-all duration-200 text-left">
                <div className="text-yellow-400 font-medium text-sm">Emergency Protocols</div>
                <div className="text-xs text-gray-400">Manual approval required</div>
              </button>
              
              <button className="w-full p-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-all duration-200 text-left">
                <div className="text-blue-400 font-medium text-sm">Maintenance Scheduling</div>
                <div className="text-xs text-gray-400">Automated coordination</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            System Settings
          </span>
        </h1>
        <p className="text-gray-400">Configure system parameters, preferences, and operational settings</p>
      </div>

      {/* Settings Categories */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Grid Configuration */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-6 text-white flex items-center">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
            Grid Configuration
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-white font-medium">Base Voltage Level</span>
                  <div className="text-sm text-gray-400">System nominal voltage</div>
                </div>
                <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white text-sm">
                  <option>400 kV</option>
                  <option>230 kV</option>
                  <option>138 kV</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-white font-medium">Frequency</span>
                  <div className="text-sm text-gray-400">System frequency</div>
                </div>
                <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white text-sm">
                  <option>50 Hz</option>
                  <option>60 Hz</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-white font-medium">Load Flow Method</span>
                  <div className="text-sm text-gray-400">Power flow calculation</div>
                </div>
                <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white text-sm">
                  <option>Newton-Raphson</option>
                  <option>Gauss-Seidel</option>
                  <option>Fast Decoupled</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-white font-medium">Voltage Tolerance</span>
                  <div className="text-sm text-gray-400">Acceptable voltage range</div>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="number" defaultValue="0.95" className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm w-16 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
                  <span className="text-gray-400">-</span>
                  <input type="number" defaultValue="1.05" className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm w-16 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
                  <span className="text-gray-400 text-sm">p.u.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI & Optimization */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-6 text-white flex items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
            AI & Optimization
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-white font-medium">Auto Optimization</span>
                  <div className="text-sm text-gray-400">Enable AI-driven decisions</div>
                </div>
                <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-all"></div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-white font-medium">Model Retraining</span>
                  <div className="text-sm text-gray-400">Automatic model updates</div>
                </div>
                <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white text-sm">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Manual</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-white font-medium">Prediction Horizon</span>
                  <div className="text-sm text-gray-400">Forecast time window</div>
                </div>
                <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white text-sm">
                  <option>15 minutes</option>
                  <option>1 hour</option>
                  <option>4 hours</option>
                  <option>24 hours</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-white font-medium">Confidence Threshold</span>
                  <div className="text-sm text-gray-400">Minimum prediction confidence</div>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="range" min="70" max="99" defaultValue="85" className="flex-1" />
                  <span className="text-emerald-400 font-bold text-sm w-8">85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Preferences */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-6 text-white flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
            Display Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-sm text-gray-300">Dark Mode</span>
              <div className="w-10 h-6 bg-emerald-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-sm text-gray-300">Auto Refresh</span>
              <div className="w-10 h-6 bg-emerald-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </div>
            </div>
            
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Refresh Rate</span>
                <span className="text-sm text-emerald-400 font-bold">5s</span>
              </div>
              <input type="range" min="1" max="30" defaultValue="5" className="w-full" />
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-6 text-white flex items-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
            Data Management
          </h3>
          
          <div className="space-y-4">
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Data Retention</span>
                <span className="text-sm text-cyan-400 font-bold">30 days</span>
              </div>
              <select className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-xs">
                <option>7 days</option>
                <option>30 days</option>
                <option>90 days</option>
                <option>1 year</option>
              </select>
            </div>
            
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-sm text-gray-300 block mb-2">Export Format</span>
              <select className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-xs">
                <option>CSV</option>
                <option>JSON</option>
                <option>Excel</option>
              </select>
            </div>
            
            <button className="w-full p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-colors text-blue-400 text-sm">
              Export Data
            </button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-6 text-white flex items-center">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
            Security
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-sm text-gray-300">2FA Enabled</span>
              <div className="w-10 h-6 bg-emerald-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </div>
            </div>
            
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-sm text-gray-300 block mb-2">Session Timeout</span>
              <select className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-xs">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
              </select>
            </div>
            
            <button className="w-full p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors text-red-400 text-sm">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* System Actions */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-6 text-white flex items-center">
          <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
          System Actions
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg transition-colors text-left">
            <div className="flex items-center space-x-3 mb-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-green-400 font-medium">Restart Services</span>
            </div>
            <div className="text-xs text-gray-400">Restart all grid services</div>
          </button>
          
          <button className="p-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-colors text-left">
            <div className="flex items-center space-x-3 mb-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="text-blue-400 font-medium">Backup System</span>
            </div>
            <div className="text-xs text-gray-400">Create system backup</div>
          </button>
          
          <button className="p-4 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg transition-colors text-left">
            <div className="flex items-center space-x-3 mb-2">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="text-purple-400 font-medium">Retrain AI</span>
            </div>
            <div className="text-xs text-gray-400">Force model retraining</div>
          </button>
          
          <button className="p-4 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg transition-colors text-left">
            <div className="flex items-center space-x-3 mb-2">
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-yellow-400 font-medium">System Health</span>
            </div>
            <div className="text-xs text-gray-400">Run diagnostics</div>
          </button>
        </div>
      </div>
    </div>
  );
}

function User() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            User Profile
          </span>
        </h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      {/* User Profile Card */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">J</span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">Jisnu</h2>
            <p className="text-gray-400 mb-1">Grid Operations Manager</p>
            <p className="text-sm text-gray-500">jisnu@ecogridx.com</p>
            <div className="flex items-center space-x-4 mt-3">
              <span className="inline-flex items-center px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-1"></div>
                Online
              </span>
              <span className="text-xs text-gray-500">Last login: 2 hours ago</span>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-emerald-400 mb-1">247</div>
            <div className="text-sm text-gray-400">Days Active</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 mb-1">1,432</div>
            <div className="text-sm text-gray-400">Actions Taken</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-purple-400 mb-1">98.7%</div>
            <div className="text-sm text-gray-400">Efficiency Rate</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400 mb-1">Admin</div>
            <div className="text-sm text-gray-400">Access Level</div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-6 text-white flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
            Account Information
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">First Name</label>
                <input type="text" defaultValue="Jisnu" className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Last Name</label>
                <input type="text" defaultValue="" placeholder="Enter last name" className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Email</label>
              <input type="email" defaultValue="jisnu@ecogridx.com" className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Department</label>
              <select className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                <option>Grid Operations</option>
                <option>Engineering</option>
                <option>Maintenance</option>
                <option>Management</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Phone</label>
              <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-6 text-white flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
            Permissions & Access
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-white font-medium">Grid Control Access</span>
                  <div className="text-sm text-gray-400">Manual grid operations</div>
                </div>
                <div className="w-10 h-6 bg-emerald-500 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-white font-medium">AI Override</span>
                  <div className="text-sm text-gray-400">Override AI decisions</div>
                </div>
                <div className="w-10 h-6 bg-emerald-500 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-white font-medium">Emergency Protocols</span>
                  <div className="text-sm text-gray-400">Emergency shutdown access</div>
                </div>
                <div className="w-10 h-6 bg-emerald-500 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-white font-medium">System Administration</span>
                  <div className="text-sm text-gray-400">Full system control</div>
                </div>
                <div className="w-10 h-6 bg-gray-600 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="text-sm text-yellow-400 font-medium mb-1">Access Level: Administrator</div>
              <div className="text-xs text-gray-400">Contact system admin to modify permissions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-6 text-white flex items-center">
          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
          Recent Activity
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Executed load balancing operation</div>
              <div className="text-xs text-gray-400">Redistributed 240 MW across zones</div>
            </div>
            <div className="text-xs text-gray-500">2 hours ago</div>
          </div>

          <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Acknowledged voltage drop alert</div>
              <div className="text-xs text-gray-400">Substation Alpha-7 voltage regulation</div>
            </div>
            <div className="text-xs text-gray-500">4 hours ago</div>
          </div>

          <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Updated system configuration</div>
              <div className="text-xs text-gray-400">Modified AI optimization parameters</div>
            </div>
            <div className="text-xs text-gray-500">1 day ago</div>
          </div>

          <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
            <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Initiated emergency protocol</div>
              <div className="text-xs text-gray-400">Equipment overload response - Transformer T-23</div>
            </div>
            <div className="text-xs text-gray-500">2 days ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RealTimeMonitoring() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Grid Monitor
          </span>
        </h1>
        <p className="text-gray-400">Real-time visualization and control of the smart grid system</p>
      </div>

      {/* Status Banner */}
      <div className="mb-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <h3 className="text-lg font-semibold text-white">Grid Status: Online</h3>
                <p className="text-sm text-gray-400">All systems operational</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-400">2,847 MW</div>
              <div className="text-sm text-gray-400">Total Generation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Energy Dashboard */}
      <div className="space-y-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
              <span className="text-sm text-gray-400">Total Production</span>
            </div>
            <div className="text-2xl font-bold text-emerald-400">2,847 MW</div>
            <div className="text-xs text-gray-500">+2.3% from yesterday</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-gray-400">Current Demand</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">2,650 MW</div>
            <div className="text-xs text-gray-500">Peak: 3,100 MW</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span className="text-sm text-gray-400">Battery Storage</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">67%</div>
            <div className="text-xs text-gray-500">1,340 MWh capacity</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-sm text-gray-400">Grid Losses</span>
            </div>
            <div className="text-2xl font-bold text-red-400">197 MW</div>
            <div className="text-xs text-gray-500">6.9% transmission loss</div>
          </div>
        </div>

        {/* Production Sources Breakdown */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-6 text-white flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
              Energy Production Sources
            </h3>
            
            {/* Total Production Summary */}
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-emerald-400">Total Production Capacity</span>
                <span className="text-2xl font-bold text-emerald-400">2,847 MW</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Renewable sources contributing:</span>
                <span className="text-green-400 font-bold">75.0% (2,137 MW)</span>
              </div>
            </div>

            {/* Production Sources Breakdown */}
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Generation by Source</h4>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  <div>
                    <span className="text-gray-300 font-medium">Solar Generation</span>
                    <div className="text-xs text-gray-500">Photovoltaic farms & rooftops</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 font-bold">1,245 MW</div>
                  <div className="text-xs text-gray-500">43.7% of total</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
                  <div>
                    <span className="text-gray-300 font-medium">Wind Generation</span>
                    <div className="text-xs text-gray-500">Onshore & offshore turbines</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-cyan-400 font-bold">892 MW</div>
                  <div className="text-xs text-gray-500">31.3% of total</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                  <div>
                    <span className="text-gray-300 font-medium">Thermal Plants</span>
                    <div className="text-xs text-gray-500">Natural gas & coal backup</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-orange-400 font-bold">710 MW</div>
                  <div className="text-xs text-gray-500">24.9% of total</div>
                </div>
              </div>
            </div>
            
            {/* Production vs Demand Balance */}
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm font-semibold text-emerald-400">Supply vs Demand Balance</span>
                  <div className="text-xs text-gray-400">Real-time grid balance status</div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-emerald-400">+197 MW</span>
                  <div className="text-xs text-gray-400">Surplus capacity</div>
                </div>
              </div>
              
              {/* Balance Progress Indicator */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Demand: 2,650 MW</span>
                  <span>Supply: 2,847 MW</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-green-500 h-3 rounded-full relative transition-all duration-1000" style={{ width: '100%' }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Balance Status */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="text-center p-2 bg-white/5 rounded">
                  <div className="text-gray-400">Surplus Utilization</div>
                  <div className="text-green-400 font-bold">Battery Charging</div>
                </div>
                <div className="text-center p-2 bg-white/5 rounded">
                  <div className="text-gray-400">Grid Efficiency</div>
                  <div className="text-emerald-400 font-bold">107.4%</div>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-gray-400 text-center">
                <span className="inline-flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Excess renewable energy being stored for peak demand periods
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-6 text-white flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              Demand & Storage Analysis
            </h3>
            
            {/* Current Demand Summary */}
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-blue-400">Total Current Demand</span>
                <span className="text-2xl font-bold text-blue-400">2,650 MW</span>
              </div>
              <div className="text-xs text-gray-400">Breakdown by consumer type:</div>
            </div>

            {/* Demand Breakdown */}
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Consumer Categories</h4>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-indigo-400 rounded-full"></div>
                  <div>
                    <span className="text-gray-300 font-medium">Residential</span>
                    <div className="text-xs text-gray-500">Homes & apartments</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-indigo-400 font-bold">1,192 MW</div>
                  <div className="text-xs text-gray-500">45.0% of total</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
                  <div>
                    <span className="text-gray-300 font-medium">Industrial</span>
                    <div className="text-xs text-gray-500">Factories & manufacturing</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-pink-400 font-bold">1,060 MW</div>
                  <div className="text-xs text-gray-500">40.0% of total</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-teal-400 rounded-full"></div>
                  <div>
                    <span className="text-gray-300 font-medium">Commercial</span>
                    <div className="text-xs text-gray-500">Offices & retail</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-teal-400 font-bold">398 MW</div>
                  <div className="text-xs text-gray-500">15.0% of total</div>
                </div>
              </div>
            </div>

            {/* Battery Storage Details */}
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm font-semibold text-purple-400">Battery Storage System</span>
                  <div className="text-xs text-gray-400">Grid-scale energy storage</div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-purple-400">67%</span>
                  <div className="text-xs text-gray-400">State of Charge</div>
                </div>
              </div>
              
              {/* Storage Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Empty</span>
                  <span>898 MWh / 1,340 MWh</span>
                  <span>Full</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full transition-all duration-1000" style={{ width: '67%' }}></div>
                </div>
              </div>
              
              {/* Storage Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="text-center p-2 bg-white/5 rounded">
                  <div className="text-gray-400">Available Space</div>
                  <div className="text-white font-bold">442 MWh</div>
                </div>
                <div className="text-center p-2 bg-white/5 rounded">
                  <div className="text-gray-400">Charging Rate</div>
                  <div className="text-green-400 font-bold">+180 MW</div>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-gray-400 text-center">
                <span className="inline-flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Currently charging from surplus solar & wind energy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* System Performance Metrics */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-6 text-white flex items-center">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
            System Performance Metrics
          </h3>
          
          {/* Overall System Health */}
          <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-cyan-400">Overall System Health</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-bold">Excellent</span>
              </div>
            </div>
            <div className="text-xs text-gray-400">All systems operating within optimal parameters</div>
          </div>

          {/* Performance Metrics Grid */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold text-gray-300 mb-4">Key Performance Indicators</h4>
            
            {/* Grid Efficiency */}
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-gray-300 font-medium">Grid Efficiency</span>
                  <div className="text-xs text-gray-500">Power transmission & distribution losses</div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-emerald-400">93.1%</span>
                  <div className="text-xs text-gray-400">Target: &gt;90%</div>
                </div>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-emerald-400 to-cyan-500 h-3 rounded-full transition-all duration-1000" style={{ width: '93.1%' }}></div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-green-400 font-medium">✓ Excellent performance</span>
                <span className="text-gray-500">Loss: 6.9%</span>
              </div>
            </div>

            {/* Renewable Share */}
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-gray-300 font-medium">Renewable Energy Share</span>
                  <div className="text-xs text-gray-500">Clean energy contribution to total generation</div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-400">75.0%</span>
                  <div className="text-xs text-gray-400">Target: 70%</div>
                </div>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-green-400 font-medium">✓ Above target (+5%)</span>
                <span className="text-gray-500">2,137 MW clean</span>
              </div>
            </div>

            {/* Load Factor */}
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-gray-300 font-medium">Load Factor</span>
                  <div className="text-xs text-gray-500">Average demand vs peak capacity utilization</div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-400">85.5%</span>
                  <div className="text-xs text-gray-400">Target: 80-90%</div>
                </div>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-3 rounded-full transition-all duration-1000" style={{ width: '85.5%' }}></div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-green-400 font-medium">✓ Optimal utilization</span>
                <span className="text-gray-500">Peak: 3,100 MW</span>
              </div>
            </div>
          </div>

          {/* Additional Performance Indicators */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-white/5 rounded-lg text-center">
              <div className="text-lg font-bold text-cyan-400">99.7%</div>
              <div className="text-xs text-gray-400 mb-1">Grid Reliability</div>
              <div className="text-xs text-green-400">✓ Uptime maintained</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg text-center">
              <div className="text-lg font-bold text-purple-400">0.3s</div>
              <div className="text-xs text-gray-400 mb-1">Response Time</div>
              <div className="text-xs text-green-400">✓ Real-time control</div>
            </div>
          </div>

          {/* Performance Status */}
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-semibold text-green-400">System Performance Status: Optimal</span>
              </div>
              <div className="text-xs text-gray-400">
                All performance indicators within target ranges - AI optimization active
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

// Icon Components
function MonitoringIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function AIOptimizerIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function StorageIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  );
}

function PredictionIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
    </svg>
  );
}

function AlertsIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h10a1 1 0 001-1v-1a1 1 0 00-1-1H4a1 1 0 00-1 1v1a1 1 0 001 1zM4 15h10a1 1 0 001-1v-1a1 1 0 00-1-1H4a1 1 0 00-1 1v1a1 1 0 001 1zM4 11h10a1 1 0 001-1V9a1 1 0 00-1-1H4a1 1 0 00-1 1v1a1 1 0 001 1z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
