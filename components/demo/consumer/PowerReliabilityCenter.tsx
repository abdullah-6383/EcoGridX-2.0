"use client";

import { useState, useEffect } from 'react';

export default function PowerReliabilityCenter() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [activeOutage, setActiveOutage] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'week' | 'month'>('today');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock outage data for different areas
  const outageAreas = [
    { id: 'sector-15', name: 'Sector 15', status: 'outage', since: '2:15 PM', affected: 2400 },
    { id: 'downtown', name: 'Downtown', status: 'outage', since: '1:45 PM', affected: 1800 },
    { id: 'tech-district', name: 'Tech District', status: 'normal', since: null, affected: 0 },
    { id: 'riverside', name: 'Riverside', status: 'normal', since: null, affected: 0 },
    { id: 'business-park', name: 'Business Park', status: 'outage', since: '3:00 PM', affected: 950 },
    { id: 'residential-north', name: 'North Residential', status: 'maintenance', since: '1:00 PM', affected: 650 },
    { id: 'industrial-zone', name: 'Industrial Zone', status: 'normal', since: null, affected: 0 }
  ];

  // Extended load shedding schedule with more data
  const loadSheddingSchedule = [
    {
      date: 'Today',
      area: 'Your Area (Sector 12)',
      time: '6:00 AM - 7:00 AM',
      reason: 'Routine Maintenance',
      status: 'completed',
      impact: 'Low',
      type: 'planned'
    },
    {
      date: 'Tomorrow',
      area: 'Your Area (Sector 12)',
      time: '2:00 PM - 4:00 PM',
      reason: 'Grid Upgrade',
      status: 'scheduled',
      impact: 'Medium',
      type: 'maintenance'
    },
    {
      date: 'Dec 13',
      area: 'Your Area (Sector 12)',
      time: '10:00 PM - 11:30 PM',
      reason: 'Equipment Testing',
      status: 'scheduled',
      impact: 'Low',
      type: 'testing'
    },
    {
      date: 'Dec 14',
      area: 'Nearby Areas',
      time: '1:00 PM - 3:00 PM',
      reason: 'Transformer Replacement',
      status: 'scheduled',
      impact: 'High',
      type: 'emergency'
    },
    {
      date: 'Dec 15',
      area: 'Business District',
      time: '11:00 PM - 1:00 AM',
      reason: 'Cable Installation',
      status: 'tentative',
      impact: 'Medium',
      type: 'planned'
    }
  ];

  // Extended outage data with more details
  const reliabilityStats = {
    today: { uptime: 98.5, outages: 1, avgDuration: '45 min', affected: 2400 },
    week: { uptime: 97.8, outages: 4, avgDuration: '1.2 hrs', affected: 8900 },
    month: { uptime: 96.9, outages: 12, avgDuration: '1.8 hrs', affected: 24500 }
  };

  const notificationSettings = [
    { type: 'Outage Alerts', enabled: notificationsEnabled, description: 'Get notified of power cuts in your area' },
    { type: 'Schedule Changes', enabled: false, description: 'Updates to planned maintenance schedules' },
    { type: 'Restoration Updates', enabled: notificationsEnabled, description: 'Real-time power restoration progress' },
    { type: 'Emergency Alerts', enabled: true, description: 'Critical grid alerts and safety notices' }
  ];

  // Mock outage updates timeline
  const outageUpdates = [
    {
      time: '3:15 PM',
      status: 'Repair Crew Dispatched',
      details: 'Technical team en route to affected transformer',
      icon: '🚗'
    },
    {
      time: '3:00 PM',
      status: 'Outage Confirmed',
      details: 'Transformer fault identified in Sector 15 substation',
      icon: '⚡'
    },
    {
      time: '2:45 PM',
      status: 'Reports Received',
      details: 'Multiple outage reports from Sector 15 residents',
      icon: '📞'
    }
  ];

  const getAreaStatusColor = (status: string) => {
    switch (status) {
      case 'outage': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getScheduleStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'active':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Power Reliability Center
          </span>
        </h1>
        <p className="text-gray-400">Predictability & Planning for Power Management</p>
      </div>

      {/* Live Outage Map */}
      <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <div className="w-3 h-3 bg-red-400 rounded-full mr-3 animate-pulse"></div>
            Live Outage Map
          </h3>
          <div className="text-sm text-gray-400">
            Last updated: {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>

        {/* City Map Visualization */}
        <div className="relative bg-gray-800/50 rounded-xl p-6 mb-6 overflow-hidden" style={{ height: '400px' }}>
          {/* Enhanced Grid background with subtle animations */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(180deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
            transform: `scale(${mapZoom})`,
            transformOrigin: 'center'
          }}></div>

          {/* Power lines visualization */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300" 
            style={{ 
              zIndex: 1,
              transform: `scale(${mapZoom})`,
              transformOrigin: 'center'
            }}
          >
            {/* Main power transmission lines */}
            <path 
              d="M50 200 Q200 150 350 180 T550 200" 
              stroke="rgba(59, 130, 246, 0.3)" 
              strokeWidth="2" 
              fill="none"
              strokeDasharray="5,5"
            />
            <path 
              d="M100 100 Q250 120 400 100 T600 120" 
              stroke="rgba(59, 130, 246, 0.3)" 
              strokeWidth="2" 
              fill="none"
              strokeDasharray="5,5"
            />
            <path 
              d="M80 300 Q200 280 350 290 T520 300" 
              stroke="rgba(59, 130, 246, 0.3)" 
              strokeWidth="2" 
              fill="none"
              strokeDasharray="5,5"
            />
          </svg>

          {/* Enhanced city areas with better positioning and animations */}
          <div 
            className="relative h-full transition-transform duration-300" 
            style={{ 
              zIndex: 2,
              transform: `scale(${mapZoom})`,
              transformOrigin: 'center'
            }}
          >
            {/* Sector 15 - Outage */}
            <div 
              className="absolute cursor-pointer transition-all duration-300 hover:scale-110"
              style={{ top: '15%', left: '8%' }}
              onClick={() => setSelectedArea('sector-15')}
            >
              <div className="w-20 h-16 bg-red-500/80 rounded-lg border-2 border-red-400 shadow-lg shadow-red-500/20 hover:bg-red-500/90 animate-pulse relative">
                <div className="absolute inset-0 bg-red-400/20 rounded-lg animate-ping"></div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold whitespace-nowrap">
                  2.4k affected
                </div>
              </div>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs text-white bg-red-500/90 px-2 py-1 rounded-full whitespace-nowrap font-medium border border-red-400">
                Sector 15 ⚡
              </div>
            </div>

            {/* Business Park - Outage */}
            <div 
              className="absolute cursor-pointer transition-all duration-300 hover:scale-110"
              style={{ top: '25%', left: '5%' }}
              onClick={() => setSelectedArea('business-park')}
            >
              <div className="w-18 h-20 bg-red-500/80 rounded-lg border-2 border-red-400 shadow-lg shadow-red-500/20 hover:bg-red-500/90 animate-pulse relative">
                <div className="absolute inset-0 bg-red-400/20 rounded-lg animate-ping"></div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold whitespace-nowrap">
                  950 affected
                </div>
              </div>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs text-white bg-red-500/90 px-2 py-1 rounded-full whitespace-nowrap font-medium border border-red-400">
                Business Park ⚡
              </div>
            </div>

            {/* North Residential - Maintenance */}
            <div 
              className="absolute cursor-pointer transition-all duration-300 hover:scale-110"
              style={{ top: '10%', left: '42%' }}
              onClick={() => setSelectedArea('residential-north')}
            >
              <div className="w-20 h-14 bg-yellow-500/60 rounded-lg border-2 border-yellow-400/70 shadow-lg shadow-yellow-500/20 hover:bg-yellow-500/80 relative">
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold whitespace-nowrap">
                  Maintenance
                </div>
              </div>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs text-white bg-yellow-500/90 px-2 py-1 rounded-full whitespace-nowrap font-medium border border-yellow-400">
                North Residential 🔧
              </div>
            </div>

            {/* Tech District - Normal */}
            <div 
              className="absolute cursor-pointer transition-all duration-300 hover:scale-110"
              style={{ top: '55%', right: '8%' }}
              onClick={() => setSelectedArea('tech-district')}
            >
              <div className="w-22 h-24 bg-green-500/40 rounded-lg border-2 border-green-400/60 shadow-lg shadow-green-500/10 hover:bg-green-500/60 relative">
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold whitespace-nowrap">
                  Normal
                </div>
              </div>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs text-white bg-green-500/90 px-2 py-1 rounded-full whitespace-nowrap font-medium border border-green-400">
                Tech District ✓
              </div>
            </div>

            {/* Industrial Zone - Normal */}
            <div 
              className="absolute cursor-pointer transition-all duration-300 hover:scale-110"
              style={{ top: '70%', left: '38%' }}
              onClick={() => setSelectedArea('industrial-zone')}
            >
              <div className="w-24 h-16 bg-green-500/40 rounded-lg border-2 border-green-400/60 shadow-lg shadow-green-500/10 hover:bg-green-500/60 relative">
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold whitespace-nowrap">
                  Normal
                </div>
              </div>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs text-white bg-green-500/90 px-2 py-1 rounded-full whitespace-nowrap font-medium border border-green-400">
                Industrial Zone ✓
              </div>
            </div>

            {/* Your Location - Enhanced */}
            <div className="absolute" style={{ top: '48%', left: '48%' }}>
              <div className="relative">
                <div className="w-6 h-6 bg-blue-400 rounded-full animate-ping absolute"></div>
                <div className="w-6 h-6 bg-blue-500 rounded-full relative z-10 border-2 border-white shadow-lg">
                  <div className="absolute inset-0 bg-blue-300 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-sm text-blue-400 font-bold whitespace-nowrap bg-gray-900/80 px-2 py-1 rounded border border-blue-400/30">
                  📍 You are here
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Legend */}
          <div className="absolute bottom-4 right-4 bg-gray-900/95 border border-gray-600 rounded-xl p-4 backdrop-blur-sm shadow-lg" style={{ zIndex: 10 }}>
            <div className="text-xs text-gray-300 mb-3 font-semibold">Live Status Legend</div>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded border border-red-400 animate-pulse"></div>
                <span className="text-xs text-gray-300">Power Outage</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded border border-yellow-400"></div>
                <span className="text-xs text-gray-300">Maintenance</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded border border-green-400"></div>
                <span className="text-xs text-gray-300">Normal Supply</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                <span className="text-xs text-gray-300">Your Location</span>
              </div>
            </div>
          </div>

            {/* Map controls */}
            <div className="absolute top-4 left-4 space-y-2" style={{ zIndex: 10 }}>
              <button 
                onClick={() => {
                  const newZoom = Math.min(mapZoom + 0.3, 2.5);
                  setMapZoom(newZoom);
                  console.log('Zoom In:', newZoom);
                }}
                title="Zoom In"
                className="w-10 h-10 bg-gray-800/90 border border-gray-600 rounded-lg flex items-center justify-center text-white hover:bg-gray-700 transition-all duration-200 hover:scale-110 shadow-lg"
              >
                <span className="text-xl font-bold">+</span>
              </button>
              <button 
                onClick={() => {
                  const newZoom = Math.max(mapZoom - 0.3, 0.5);
                  setMapZoom(newZoom);
                  console.log('Zoom Out:', newZoom);
                }}
                title="Zoom Out"
                className="w-10 h-10 bg-gray-800/90 border border-gray-600 rounded-lg flex items-center justify-center text-white hover:bg-gray-700 transition-all duration-200 hover:scale-110 shadow-lg"
              >
                <span className="text-xl font-bold">−</span>
              </button>
              <button 
                onClick={() => { 
                  setMapZoom(1); 
                  setSelectedArea(null); 
                  console.log('Reset zoom to 1');
                }}
                title="Reset View"
                className="w-10 h-10 bg-gray-800/90 border border-gray-600 rounded-lg flex items-center justify-center text-white hover:bg-gray-700 transition-all duration-200 hover:scale-110 shadow-lg"
              >
                <span className="text-lg">⟲</span>
              </button>
              
              {/* Zoom indicator */}
              <div className="mt-2 px-2 py-1 bg-gray-800/90 border border-gray-600 rounded text-xs text-gray-300 text-center">
                {Math.round(mapZoom * 100)}%
              </div>
            </div>

            {/* Timeframe Selector */}
            <div className="absolute top-4 right-4 bg-gray-900/90 border border-gray-600 rounded-lg p-2 shadow-lg" style={{ zIndex: 10 }}>
              <div className="text-xs text-gray-400 mb-2">Reliability View</div>
              <div className="flex space-x-1">
                {(['today', 'week', 'month'] as const).map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-3 py-1 text-xs rounded transition-colors ${
                      selectedTimeframe === timeframe
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  </button>
                ))}
              </div>
            </div>
        </div>

        {/* Enhanced Area Details */}
        {selectedArea && (
          <div className="p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl">
            {(() => {
              const area = outageAreas.find(a => a.id === selectedArea);
              return area ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-white">{area.name}</h4>
                    <button 
                      onClick={() => setSelectedArea(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  
                  {area.status === 'outage' ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-400 font-semibold text-lg">Power Outage Active</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">Outage Duration</div>
                          <div className="text-lg font-bold text-red-400">Since {area.since}</div>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">Affected Customers</div>
                          <div className="text-lg font-bold text-red-400">{area.affected.toLocaleString()}</div>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">Est. Restoration</div>
                          <div className="text-lg font-bold text-yellow-400">5:30 PM</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <div className="text-sm text-gray-400 mb-2">Cause & Resolution:</div>
                        <div className="text-white">Transformer fault identified. Repair crew dispatched and working on replacement.</div>
                      </div>
                    </div>
                  ) : area.status === 'maintenance' ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="text-yellow-400 font-semibold text-lg">Scheduled Maintenance</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">Started</div>
                          <div className="text-lg font-bold text-yellow-400">{area.since}</div>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">Affected Customers</div>
                          <div className="text-lg font-bold text-yellow-400">{area.affected.toLocaleString()}</div>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">Est. Completion</div>
                          <div className="text-lg font-bold text-green-400">4:00 PM</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <div className="text-sm text-gray-400 mb-2">Maintenance Type:</div>
                        <div className="text-white">Preventive maintenance on distribution transformers and cable replacement.</div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-green-400 font-semibold text-lg">Normal Power Supply</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">Voltage</div>
                          <div className="text-lg font-bold text-green-400">230V ±5%</div>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">Frequency</div>
                          <div className="text-lg font-bold text-green-400">50 Hz</div>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">Reliability</div>
                          <div className="text-lg font-bold text-green-400">98.5%</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/30 rounded-lg p-4">
                        <div className="text-sm text-gray-400 mb-2">Status:</div>
                        <div className="text-white">All systems operating normally. No scheduled maintenance or outages.</div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Official Load Shedding Schedule */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
            Load Shedding Schedule
          </h3>

          <div className="space-y-4">
            {(showFullSchedule ? loadSheddingSchedule : loadSheddingSchedule.slice(0, 3)).map((schedule, index) => (
              <div 
                key={index}
                className="p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-white font-medium">{schedule.date}</div>
                    <div className="text-sm text-gray-400">{schedule.area}</div>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getScheduleStatusBadge(schedule.status)}`}>
                      {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs border ${
                      schedule.impact === 'High' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      schedule.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-green-500/20 text-green-400 border-green-500/30'
                    }`}>
                      {schedule.impact} Impact
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="text-gray-400">Time: </span>
                    <span className="text-yellow-400 font-medium">{schedule.time}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Reason: </span>
                    <span className="text-white">{schedule.reason}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Type: </span>
                    <span className="text-blue-400 capitalize">{schedule.type}</span>
                  </div>
                </div>

                {schedule.status === 'scheduled' && (
                  <div className="mt-3 pt-2 border-t border-gray-700/50">
                    <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                      Set Reminder
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex space-x-2 mt-4">
            <button 
              onClick={() => setShowFullSchedule(!showFullSchedule)}
              className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              {showFullSchedule ? 'Show Less' : `View Full Schedule (${loadSheddingSchedule.length} items)`}
            </button>
            <button 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                notificationsEnabled 
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                  : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
              }`}
            >
              {notificationsEnabled ? '🔔' : '🔕'}
            </button>
          </div>

          {/* Notification Settings */}
          {notificationsEnabled && (
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="text-sm font-bold text-blue-400 mb-3">Notification Settings</h4>
              <div className="space-y-2">
                {notificationSettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-300">{setting.type}</div>
                      <div className="text-xs text-gray-500">{setting.description}</div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${setting.enabled ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Outage Status & Updates */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <div className="w-3 h-3 bg-orange-400 rounded-full mr-3 animate-pulse"></div>
            Live Outage Updates
          </h3>

          {activeOutage ? (
            <div className="space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 font-medium">Active Outage in Your Area</span>
                </div>
                <div className="text-sm text-gray-300">
                  Estimated restoration: <span className="text-yellow-400 font-medium">5:30 PM</span>
                </div>
              </div>

              <div className="space-y-3">
                {outageUpdates.map((update, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg">
                    <span className="text-lg">{update.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white font-medium text-sm">{update.status}</span>
                        <span className="text-xs text-gray-400">{update.time}</span>
                      </div>
                      <p className="text-sm text-gray-400">{update.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-lg font-medium text-green-400 mb-2">All Systems Normal</div>
              <div className="text-sm text-gray-400">No active outages in your area</div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-700/50">
            <button 
              onClick={() => setActiveOutage(!activeOutage)}
              className="w-full py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-all duration-200 text-sm hover:scale-105"
            >
              {activeOutage ? 'Clear Outage' : 'Simulate Outage'}
            </button>
          </div>
        </div>
      </div>

      {/* Reliability Statistics */}
      <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white flex items-center">
            <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
            Reliability Statistics
          </h3>
          <div className="text-sm text-gray-400">Current {selectedTimeframe}</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {reliabilityStats[selectedTimeframe].uptime}%
            </div>
            <div className="text-sm text-gray-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400 mb-1">
              {reliabilityStats[selectedTimeframe].outages}
            </div>
            <div className="text-sm text-gray-400">Outages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {reliabilityStats[selectedTimeframe].avgDuration}
            </div>
            <div className="text-sm text-gray-400">Avg Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {reliabilityStats[selectedTimeframe].affected.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Customers Affected</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-400 mb-1">
            {outageAreas.filter(area => area.status === 'outage').length}
          </div>
          <div className="text-sm text-gray-400">Areas with Outages</div>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-400 mb-1">
            {outageAreas.filter(area => area.status === 'outage').reduce((sum, area) => sum + area.affected, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Affected Customers</div>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {reliabilityStats[selectedTimeframe].avgDuration}
          </div>
          <div className="text-sm text-gray-400">Avg. Restoration Time</div>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {reliabilityStats[selectedTimeframe].uptime}%
          </div>
          <div className="text-sm text-gray-400">Grid Reliability</div>
        </div>
      </div>
    </div>
  );
}