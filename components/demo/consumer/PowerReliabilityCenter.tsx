"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

export default function PowerReliabilityCenter() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [activeOutage, setActiveOutage] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'week' | 'month'>('today');

  // Enhanced interactive map state
  const mapRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [touchData, setTouchData] = useState({ startX: 0, startY: 0, lastDistance: 0, initialScale: 1 });
  const [isZooming, setIsZooming] = useState(false);

  // Reset zoom function with smooth animation
  const resetZoom = () => {
    const mapElement = mapRef.current;
    if (mapElement) {
      // Add smooth transition
      mapElement.style.transition = 'transform 0.5s ease-out';
      
      // Reset to default values
      setScale(1);
      setTranslate({ x: 0, y: 0 });
      
      // Remove transition after animation completes
      setTimeout(() => {
        if (mapElement) {
          mapElement.style.transition = '';
        }
      }, 500);
    }
  };

  useEffect(() => {
    const mapContainer = mapRef.current;
    if (!mapContainer) return;

    // Use transform3d for hardware acceleration
    const updateTransform = () => {
      const mapContent = mapContainer.querySelector('.map-content') as HTMLElement;
      if (mapContent) {
        mapContent.style.transform = `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`;
        mapContent.style.transition = isPanning || isZooming ? 'none' : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        mapContent.style.transformOrigin = 'center center';
        mapContent.style.willChange = isPanning || isZooming ? 'transform' : 'auto';
      }
    };

    // Enhanced mouse wheel zoom with optimized performance
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setIsZooming(true);
      
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      const newScale = Math.min(Math.max(scale * zoomFactor, 0.3), 3);
      
      // Zoom towards mouse position with optimized calculations
      const rect = mapContainer.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;
      
      const scaleDiff = newScale - scale;
      const newTranslate = {
        x: translate.x - (mouseX * scaleDiff) / scale,
        y: translate.y - (mouseY * scaleDiff) / scale
      };
      
      setScale(newScale);
      setTranslate(newTranslate);
      
      // Reset zooming state
      setTimeout(() => setIsZooming(false), 150);
    };

    // Enhanced mouse pan with momentum
    const handleMouseDown = (e: MouseEvent) => {
      setIsPanning(true);
      setTouchData(prev => ({
        ...prev,
        startX: e.clientX - translate.x,
        startY: e.clientY - translate.y
      }));
      mapContainer.style.cursor = 'grabbing';
      mapContainer.style.userSelect = 'none';
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPanning) return;
      
      const newTranslate = {
        x: e.clientX - touchData.startX,
        y: e.clientY - touchData.startY
      };
      
      setTranslate(newTranslate);
    };

    const handleMouseUp = () => {
      setIsPanning(false);
      mapContainer.style.cursor = 'grab';
      mapContainer.style.userSelect = 'auto';
    };

    // Enhanced touch events with better pinch-to-zoom
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      
      if (e.touches.length === 1) {
        setIsPanning(true);
        setTouchData(prev => ({
          ...prev,
          startX: e.touches[0].clientX - translate.x,
          startY: e.touches[0].clientY - translate.y
        }));
      } else if (e.touches.length === 2) {
        setIsPanning(false);
        setIsZooming(true);
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        setTouchData(prev => ({
          ...prev,
          lastDistance: distance,
          initialScale: scale
        }));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      
      if (e.touches.length === 1 && isPanning) {
        const newTranslate = {
          x: e.touches[0].clientX - touchData.startX,
          y: e.touches[0].clientY - touchData.startY
        };
        setTranslate(newTranslate);
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (touchData.lastDistance > 0) {
          const scaleChange = distance / touchData.lastDistance;
          const newScale = Math.max(0.3, Math.min(3, touchData.initialScale * scaleChange));
          setScale(newScale);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      setIsPanning(false);
      setIsZooming(false);
      
      if (e.touches.length === 0) {
        setTouchData(prev => ({
          ...prev,
          lastDistance: 0,
          initialScale: scale
        }));
      }
    };

    // Add event listeners
    mapContainer.addEventListener('wheel', handleWheel, { passive: false });
    mapContainer.addEventListener('mousedown', handleMouseDown);
    mapContainer.addEventListener('mousemove', handleMouseMove);
    mapContainer.addEventListener('mouseup', handleMouseUp);
    mapContainer.addEventListener('mouseleave', handleMouseUp);
    mapContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    mapContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    mapContainer.addEventListener('touchend', handleTouchEnd, { passive: false });

    updateTransform();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      mapContainer.removeEventListener('wheel', handleWheel);
      mapContainer.removeEventListener('mousedown', handleMouseDown);
      mapContainer.removeEventListener('mousemove', handleMouseMove);
      mapContainer.removeEventListener('mouseup', handleMouseUp);
      mapContainer.removeEventListener('mouseleave', handleMouseUp);
      mapContainer.removeEventListener('touchstart', handleTouchStart);
      mapContainer.removeEventListener('touchmove', handleTouchMove);
      mapContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scale, translate, isPanning, touchData, isZooming]);

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
    { id: 'industrial-zone', name: 'Industrial Zone', status: 'normal', since: null, affected: 0 },
    { id: 'downtown-commercial', name: 'Downtown Commercial', status: 'normal', since: null, affected: 0 },
    { id: 'west-suburbs', name: 'West Suburbs', status: 'normal', since: null, affected: 0 },
    { id: 'medical-district', name: 'Medical District', status: 'maintenance', since: '2:30 PM', affected: 420 },
    { id: 'airport-zone', name: 'Airport Zone', status: 'outage', since: '4:00 PM', affected: 780 },
    { id: 'university-campus', name: 'University Campus', status: 'normal', since: null, affected: 0 },
    { id: 'harbor-district', name: 'Harbor District', status: 'normal', since: null, affected: 0 }
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