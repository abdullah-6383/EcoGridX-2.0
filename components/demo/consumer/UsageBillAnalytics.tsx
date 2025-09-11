"use client";

import { useState } from 'react';

export default function UsageBillAnalytics() {
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv');
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Mock usage data with realistic consumption patterns
  const dailyUsage = [
    { hour: '00:00', kwh: 0.8, cost: 4.40 },
    { hour: '01:00', kwh: 0.6, cost: 3.30 },
    { hour: '02:00', kwh: 0.5, cost: 2.75 },
    { hour: '03:00', kwh: 0.4, cost: 2.20 },
    { hour: '04:00', kwh: 0.4, cost: 2.20 },
    { hour: '05:00', kwh: 0.7, cost: 3.85 },
    { hour: '06:00', kwh: 1.4, cost: 7.70 },
    { hour: '07:00', kwh: 2.3, cost: 12.65 },
    { hour: '08:00', kwh: 1.9, cost: 10.45 },
    { hour: '09:00', kwh: 1.6, cost: 8.80 },
    { hour: '10:00', kwh: 1.8, cost: 9.90 },
    { hour: '11:00', kwh: 2.1, cost: 11.55 },
    { hour: '12:00', kwh: 2.8, cost: 15.40 },
    { hour: '13:00', kwh: 3.2, cost: 17.60 },
    { hour: '14:00', kwh: 3.7, cost: 20.35 },
    { hour: '15:00', kwh: 3.9, cost: 21.45 },
    { hour: '16:00', kwh: 3.4, cost: 18.70 },
    { hour: '17:00', kwh: 3.1, cost: 17.05 },
    { hour: '18:00', kwh: 2.9, cost: 15.95 },
    { hour: '19:00', kwh: 2.6, cost: 14.30 },
    { hour: '20:00', kwh: 2.4, cost: 13.20 },
    { hour: '21:00', kwh: 2.1, cost: 11.55 },
    { hour: '22:00', kwh: 1.8, cost: 9.90 },
    { hour: '23:00', kwh: 1.2, cost: 6.60 }
  ];

  const weeklyUsage = [
    { day: 'Mon', kwh: 45.2, cost: 248.60 },
    { day: 'Tue', kwh: 42.8, cost: 235.40 },
    { day: 'Wed', kwh: 48.1, cost: 264.55 },
    { day: 'Thu', kwh: 44.8, cost: 246.40 },
    { day: 'Fri', kwh: 46.6, cost: 256.30 },
    { day: 'Sat', kwh: 58.3, cost: 320.65 },
    { day: 'Sun', kwh: 52.9, cost: 290.95 }
  ];

  const monthlyUsage = [
    { month: 'Apr', kwh: 1156, cost: 6358.00 },
    { month: 'May', kwh: 1289, cost: 7089.50 },
    { month: 'Jun', kwh: 1534, cost: 8437.00 },
    { month: 'Jul', kwh: 1756, cost: 9658.00 },
    { month: 'Aug', kwh: 1689, cost: 9289.50 },
    { month: 'Sep', kwh: 1598, cost: 8789.00 },
    { month: 'Oct', kwh: 1456, cost: 8008.00 },
    { month: 'Nov', kwh: 1387, cost: 7628.50 },
    { month: 'Dec', kwh: 1298, cost: 7139.00 },
    { month: 'Jan', kwh: 1234, cost: 6787.00 },
    { month: 'Feb', kwh: 1187, cost: 6528.50 },
    { month: 'Mar', kwh: 1245, cost: 6847.50 }
  ];

  const comparisonData = {
    neighbors: { avg: 167, your: 155, difference: -12, percentile: 68 },
    city: { avg: 142, your: 155, difference: 13, percentile: 34 },
    similar_homes: { avg: 159, your: 155, difference: -4, percentile: 55 }
  };

  // Bill breakdown data
  const billBreakdown = {
    totalAmount: 1250.75,
    components: [
      {
        category: 'Slab 1 (0-100 units)',
        units: 100,
        rate: 3.50,
        amount: 350.00,
        percentage: 28,
        color: 'green'
      },
      {
        category: 'Slab 2 (101-200 units)',
        units: 55,
        rate: 5.50,
        amount: 302.50,
        percentage: 24,
        color: 'yellow'
      },
      {
        category: 'Fixed Charges',
        units: 0,
        rate: 0,
        amount: 150.00,
        percentage: 12,
        color: 'blue'
      },
      {
        category: 'Electricity Duty',
        units: 0,
        rate: 0,
        amount: 65.25,
        percentage: 5,
        color: 'purple'
      },
      {
        category: 'Fuel Surcharge',
        units: 0,
        rate: 0,
        amount: 98.50,
        percentage: 8,
        color: 'orange'
      },
      {
        category: 'Sales Tax (18%)',
        units: 0,
        rate: 0,
        amount: 284.50,
        percentage: 23,
        color: 'red'
      }
    ]
  };

  const getCurrentData = () => {
    switch (viewMode) {
      case 'daily':
        return dailyUsage;
      case 'weekly':
        return weeklyUsage;
      case 'monthly':
        return monthlyUsage;
      default:
        return dailyUsage;
    }
  };

  const getMaxValue = (data: any[]) => {
    return Math.max(...data.map(d => d.kwh));
  };

  const getSlabColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-400';
      case 'yellow': return 'bg-yellow-400';
      case 'blue': return 'bg-blue-400';
      case 'purple': return 'bg-purple-400';
      case 'orange': return 'bg-orange-400';
      case 'red': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Usage & Bill Analytics
          </span>
        </h1>
        <p className="text-gray-400">Understanding Your Energy DNA</p>
      </div>

      {/* Detailed Consumption History */}
      <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
            Detailed Consumption History
          </h3>
          
          {/* View Mode Toggle */}
          <div className="flex space-x-2">
            {(['daily', 'weekly', 'monthly'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Export and Comparison Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                showComparison 
                  ? 'bg-purple-500/20 text-purple-400' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              {showComparison ? 'Hide' : 'Show'} Comparison
            </button>
            <button 
              onClick={() => alert('Opening pattern analysis...')}
              className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30 transition-colors"
            >
              Analyze Patterns
            </button>
          </div>

          <div className="flex space-x-2">
            <select 
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as 'csv' | 'pdf')}
              className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs border border-gray-600"
            >
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
            </select>
            <button 
              onClick={() => alert(`Exporting ${viewMode} data as ${exportFormat.toUpperCase()}...`)}
              className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs hover:bg-green-500/30 transition-colors"
            >
              Export
            </button>
          </div>
        </div>

        {/* Comparison Data */}
        {showComparison && (
          <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <h4 className="text-sm font-bold text-purple-400 mb-3">Usage Comparison</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(comparisonData).map(([key, data]) => (
                <div key={key} className="text-center">
                  <div className="text-xs text-gray-400 mb-1">
                    {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                  <div className="text-lg font-bold text-white mb-1">
                    {data.your} vs {data.avg} units
                  </div>
                  <div className={`text-sm ${data.difference < 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {data.difference > 0 ? '+' : ''}{data.difference} units
                  </div>
                  <div className="text-xs text-gray-500">
                    {data.percentile}th percentile
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Chart with Hover Effects */}
        <div className="mb-6 group">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/20 to-gray-900/20 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Enhanced Chart Background with Animated Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-4">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="border-b border-gray-700/30 w-full transition-all duration-300 group-hover:border-gray-600/50"
                  style={{ 
                    animationDelay: `${i * 100}ms`,
                    animation: selectedDay !== null ? 'pulse 2s ease-in-out infinite' : 'none'
                  }}
                ></div>
              ))}
            </div>
            
            {/* Enhanced Y-axis Labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs py-4 transition-all duration-300 group-hover:text-gray-300">
              {[1, 0.75, 0.5, 0.25, 0].map((multiplier, i) => (
                <span 
                  key={i}
                  className={`px-2 py-1 rounded transition-all duration-300 ${
                    selectedDay !== null ? 'text-emerald-400 font-medium bg-emerald-500/10' : 'text-gray-500'
                  }`}
                >
                  {viewMode === 'monthly' 
                    ? `${(getMaxValue(getCurrentData()) * multiplier / 1000).toFixed(1)}k` 
                    : (getMaxValue(getCurrentData()) * multiplier).toFixed(1)
                  }
                </span>
              ))}
            </div>

            {/* Chart Content Container */}
            <div className="flex items-end justify-between h-64 p-4 space-x-1 ml-8 relative">
              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-lg transition-all duration-500 ${
                selectedDay !== null 
                  ? 'bg-gradient-to-t from-emerald-500/10 to-transparent' 
                  : 'bg-transparent'
              }`}></div>
              {getCurrentData().map((data, index) => {
                const height = Math.max((data.kwh / getMaxValue(getCurrentData())) * 240, 8); // Ensure minimum height
                const isSelected = selectedDay === index;
                const isPeak = data.kwh > getMaxValue(getCurrentData()) * 0.7;
                const isLow = data.kwh < getMaxValue(getCurrentData()) * 0.3;
                
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1 cursor-pointer group relative"
                    onClick={() => setSelectedDay(selectedDay === index ? null : index)}
                    onMouseEnter={() => setSelectedDay(index)}
                    onMouseLeave={() => setSelectedDay(null)}
                  >
                    {/* Enhanced Bar with animations */}
                    <div className="relative w-full">
                      {/* Hover background glow */}
                      <div className={`absolute -inset-1 rounded-lg transition-all duration-300 ${
                        isSelected 
                          ? 'bg-gradient-to-t from-emerald-400/30 to-cyan-400/30 blur-sm' 
                          : 'bg-transparent'
                      }`}></div>
                      
                      <div
                        className={`relative w-full rounded-t-lg transition-all duration-500 overflow-hidden transform ${
                          isSelected 
                            ? 'scale-110 shadow-2xl shadow-emerald-400/50 z-10' 
                            : 'scale-100 hover:scale-105 shadow-lg hover:shadow-emerald-400/30'
                        }`}
                        style={{ 
                          height: isSelected ? `${height + 10}px` : `${height}px`,
                          transformOrigin: 'bottom center'
                        }}
                      >
                        {/* Animated gradient background */}
                        <div className={`absolute inset-0 transition-all duration-300 ${
                          isPeak 
                            ? 'bg-gradient-to-t from-red-500/80 via-orange-400/80 to-yellow-400/80' 
                            : isLow 
                            ? 'bg-gradient-to-t from-green-500/60 via-emerald-400/70 to-cyan-400/80'
                            : 'bg-gradient-to-t from-green-500/70 via-green-400/80 to-emerald-400/90'
                        } ${
                          isSelected 
                            ? 'opacity-100 saturate-150 brightness-110' 
                            : 'opacity-70 hover:opacity-90 hover:saturate-125'
                        }`}></div>
                        
                        {/* Animated shine effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform transition-transform duration-1000 ${
                          isSelected 
                            ? 'translate-x-full' 
                            : '-translate-x-full group-hover:translate-x-full'
                        }`}></div>
                        
                        {/* Floating particles effect */}
                        {isSelected && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-2 left-1/4 w-1 h-1 bg-white rounded-full animate-bounce opacity-70" style={{ animationDelay: '0ms', animationDuration: '1.5s' }}></div>
                            <div className="absolute top-4 right-1/4 w-1 h-1 bg-white rounded-full animate-bounce opacity-70" style={{ animationDelay: '300ms', animationDuration: '1.5s' }}></div>
                            <div className="absolute top-6 left-1/2 w-1 h-1 bg-white rounded-full animate-bounce opacity-70" style={{ animationDelay: '600ms', animationDuration: '1.5s' }}></div>
                          </div>
                        )}
                        
                        {/* Enhanced peak indicator */}
                        {isPeak && (
                          <div className={`absolute top-1 right-1 text-xs transition-all duration-300 ${
                            isSelected ? 'animate-pulse scale-125' : ''
                          }`}>⚡</div>
                        )}
                        
                        {/* Value display on larger bars */}
                        {viewMode === 'monthly' && height > 50 && (
                          <div className={`absolute inset-x-0 bottom-2 text-center text-xs font-bold transition-all duration-300 ${
                            isSelected ? 'text-white scale-110' : 'text-white/90'
                          }`}>
                            {data.kwh > 1000 ? `${(data.kwh/1000).toFixed(1)}k` : data.kwh}
                          </div>
                        )}
                        
                        {/* Animated border on hover */}
                        <div className={`absolute inset-0 border-2 rounded-t-lg transition-all duration-300 ${
                          isSelected 
                            ? 'border-emerald-400/80 shadow-inner' 
                            : 'border-transparent'
                        }`}></div>
                      </div>
                      
                      {/* Enhanced value indicator tooltip */}
                      <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 transition-all duration-300 z-20 ${
                        isSelected ? 'opacity-100 scale-100 -translate-y-2' : 'opacity-0 scale-95'
                      }`}>
                        <div className="bg-gradient-to-r from-emerald-500/90 to-cyan-500/90 backdrop-blur-sm border border-emerald-400/50 rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap shadow-xl">
                          <div className="font-bold">{viewMode === 'monthly' ? `${data.kwh} kWh` : `${data.kwh} kWh`}</div>
                          <div className="text-emerald-200 text-[10px]">₹{data.cost.toFixed(2)}</div>
                          {/* Tooltip arrow */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                            <div className="border-4 border-transparent border-t-emerald-500/90"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover ripple effect */}
                      {isSelected && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-emerald-400/50 rounded-full animate-ping"></div>
                      )}
                    </div>
                    
                    {/* Enhanced time labels */}
                    <div className={`text-xs mt-3 transform -rotate-45 origin-top-left whitespace-nowrap transition-all duration-300 ${
                      isSelected 
                        ? 'text-emerald-400 font-bold scale-110' 
                        : 'text-gray-400 group-hover:text-gray-200'
                    }`}>
                      {viewMode === 'daily' ? (data as any).hour : 
                       viewMode === 'weekly' ? (data as any).day : 
                       (data as any).month}
                    </div>
                    
                    {/* Enhanced Tooltip */}
                    {isSelected && (
                      <div className="absolute bottom-16 bg-gray-900/95 border border-gray-600 rounded-lg p-4 text-sm z-30 min-w-[200px] shadow-xl">
                        <div className="text-white font-bold text-center mb-2">
                          {viewMode === 'daily' ? (data as any).hour : 
                           viewMode === 'weekly' ? (data as any).day : 
                           (data as any).month}
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Usage:</span>
                            <span className="text-green-400 font-bold">{data.kwh} kWh</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Cost:</span>
                            <span className="text-yellow-400 font-bold">₹{data.cost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Rate:</span>
                            <span className="text-blue-400">₹{(data.cost/data.kwh).toFixed(2)}/kWh</span>
                          </div>
                          {isPeak && (
                            <div className="text-orange-400 text-xs text-center pt-1 border-t border-gray-700">
                              ⚡ Peak Usage Period
                            </div>
                          )}
                          {isLow && (
                            <div className="text-green-400 text-xs text-center pt-1 border-t border-gray-700">
                              🌱 Eco-Friendly Usage
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* Animated average line */}
              <div 
                className={`absolute left-8 right-4 border-t-2 border-dashed border-yellow-400/60 transition-all duration-500 ${
                  selectedDay !== null ? 'opacity-100 animate-pulse' : 'opacity-40'
                }`}
                style={{ 
                  top: `${((1 - (getCurrentData().reduce((sum, d) => sum + d.kwh, 0) / getCurrentData().length / getMaxValue(getCurrentData()))) * 240) + 16}px` 
                }}
              >
                {/* Average value indicator */}
                <div className={`absolute -right-2 -top-6 transform transition-all duration-300 ${
                  selectedDay !== null ? 'scale-110 opacity-100' : 'scale-100 opacity-80'
                }`}>
                  <div className="bg-yellow-400/20 border border-yellow-400/50 rounded-lg px-2 py-1 text-xs text-yellow-400 whitespace-nowrap backdrop-blur-sm">
                    Avg: {viewMode === 'monthly' 
                      ? `${((getCurrentData().reduce((sum, d) => sum + d.kwh, 0) / getCurrentData().length)/1000).toFixed(1)}k`
                      : `${(getCurrentData().reduce((sum, d) => sum + d.kwh, 0) / getCurrentData().length).toFixed(1)}`
                    } kWh
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chart legend */}
            <div className="mt-4 flex justify-center space-x-6 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-400 rounded"></div>
                <span className="text-gray-400">Normal Usage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-400 rounded"></div>
                <span className="text-gray-400">Peak Usage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-0.5 bg-yellow-400/60 border-dashed"></div>
                <span className="text-gray-400">Average</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/30 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-green-400 mb-1">
              {getCurrentData().reduce((sum, d) => sum + d.kwh, 0).toFixed(1)} kWh
            </div>
            <div className="text-sm text-gray-400">Total {viewMode} consumption</div>
          </div>
          
          <div className="bg-gray-800/30 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-blue-400 mb-1">
              ₹{getCurrentData().reduce((sum, d) => sum + d.cost, 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-400">Total {viewMode} cost</div>
          </div>
          
          <div className="bg-gray-800/30 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-yellow-400 mb-1">
              ₹{(getCurrentData().reduce((sum, d) => sum + d.cost, 0) / getCurrentData().length).toFixed(2)}
            </div>
            <div className="text-sm text-gray-400">Average {viewMode === 'daily' ? 'hourly' : viewMode === 'weekly' ? 'daily' : 'monthly'} cost</div>
          </div>
        </div>
      </div>

      {/* Bill Breakdown Analysis */}
      <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
          Bill Breakdown Analysis
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Pie Chart */}
          <div className="text-center">
            <div className="relative w-80 h-80 mx-auto mb-6 perspective-1000">
              {/* 3D Chart Container with shadow */}
              <div className="relative w-full h-full transform-gpu">
                {/* Shadow/Base */}
                <div className="absolute inset-0 transform translate-y-4 translate-x-2 opacity-30">
                  <div className="w-full h-full rounded-full bg-black blur-xl scale-95"></div>
                </div>
                
                {/* Main 3D Chart */}
                <div className="relative w-full h-full transform rotate-x-15 rotate-y-5">
                  {/* Chart segments */}
                  <svg className="w-full h-full" viewBox="0 0 320 320">
                    <defs>
                      {/* Gradients for 3D effect */}
                      <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#059669" />
                        <stop offset="100%" stopColor="#047857" />
                      </linearGradient>
                      <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#d97706" />
                      </linearGradient>
                      <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>
                      <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#6d28d9" />
                      </linearGradient>
                      <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="50%" stopColor="#ea580c" />
                        <stop offset="100%" stopColor="#dc2626" />
                      </linearGradient>
                      <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#dc2626" />
                        <stop offset="100%" stopColor="#b91c1c" />
                      </linearGradient>
                      
                      {/* Drop shadow filter */}
                      <filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
                      </filter>
                    </defs>
                    
                    {billBreakdown.components.map((component, index) => {
                      const centerX = 160;
                      const centerY = 160;
                      const radius = hoveredSegment === index ? 125 : 120;
                      const innerRadius = 45;
                      const isHovered = hoveredSegment === index;
                      
                      const prevPercentage = billBreakdown.components
                        .slice(0, index)
                        .reduce((sum, c) => sum + c.percentage, 0);
                      
                      const startAngle = (prevPercentage / 100) * 2 * Math.PI - Math.PI / 2;
                      const endAngle = ((prevPercentage + component.percentage) / 100) * 2 * Math.PI - Math.PI / 2;
                      
                      const x1 = centerX + radius * Math.cos(startAngle);
                      const y1 = centerY + radius * Math.sin(startAngle);
                      const x2 = centerX + radius * Math.cos(endAngle);
                      const y2 = centerY + radius * Math.sin(endAngle);
                      
                      const ix1 = centerX + innerRadius * Math.cos(startAngle);
                      const iy1 = centerY + innerRadius * Math.sin(startAngle);
                      const ix2 = centerX + innerRadius * Math.cos(endAngle);
                      const iy2 = centerY + innerRadius * Math.sin(endAngle);
                      
                      const largeArcFlag = component.percentage > 50 ? 1 : 0;
                      
                      const pathData = [
                        `M ${centerX} ${centerY}`,
                        `L ${ix1} ${iy1}`,
                        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${ix2} ${iy2}`,
                        `L ${x2} ${y2}`,
                        `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${x1} ${y1}`,
                        `Z`
                      ].join(' ');
                      
                      const gradientId = `${component.color}Grad`;
                      
                      // Calculate tooltip position
                      const midAngle = (startAngle + endAngle) / 2;
                      const tooltipRadius = radius + 20;
                      const tooltipX = centerX + tooltipRadius * Math.cos(midAngle);
                      const tooltipY = centerY + tooltipRadius * Math.sin(midAngle);
                      
                      return (
                        <g key={index}>
                          {/* Main segment */}
                          <path
                            d={pathData}
                            fill={`url(#${gradientId})`}
                            filter="url(#dropshadow)"
                            className="transition-all duration-500 ease-out cursor-pointer"
                            style={{
                              transformOrigin: `${centerX}px ${centerY}px`,
                              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                              filter: isHovered ? 'brightness(1.2) saturate(1.2)' : 'brightness(1)',
                            }}
                            onMouseEnter={(e) => {
                              setHoveredSegment(index);
                              setMousePosition({ x: e.clientX, y: e.clientY });
                            }}
                            onMouseLeave={() => setHoveredSegment(null)}
                            onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
                          />
                          
                          {/* Animated border on hover */}
                          {isHovered && (
                            <path
                              d={pathData}
                              fill="none"
                              stroke="rgba(255,255,255,0.8)"
                              strokeWidth="2"
                              className="pointer-events-none animate-pulse"
                              style={{
                                transformOrigin: `${centerX}px ${centerY}px`,
                                transform: 'scale(1.05)',
                              }}
                            />
                          )}
                          
                          {/* Glowing effect on hover */}
                          {isHovered && (
                            <path
                              d={pathData}
                              fill={`url(#${gradientId})`}
                              className="pointer-events-none opacity-50 blur-sm"
                              style={{
                                transformOrigin: `${centerX}px ${centerY}px`,
                                transform: 'scale(1.15)',
                              }}
                            />
                          )}
                          
                          {/* Percentage label on segment */}
                          <text
                            x={centerX + (radius - 20) * Math.cos(midAngle)}
                            y={centerY + (radius - 20) * Math.sin(midAngle)}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className={`text-xs font-bold fill-white transition-all duration-300 ${
                              isHovered ? 'text-sm' : ''
                            }`}
                            style={{
                              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                              transformOrigin: 'center',
                            }}
                          >
                            {component.percentage}%
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  
                  {/* Center circle with 3D effect and animations */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className={`w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full shadow-2xl border border-gray-600/50 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                        hoveredSegment !== null ? 'scale-110 shadow-3xl border-emerald-400/50' : ''
                      }`}>
                        <div className="text-center">
                          <div className={`text-lg font-bold transition-all duration-300 ${
                            hoveredSegment !== null ? 'text-emerald-400 scale-105' : 'text-white'
                          }`}>₹{billBreakdown.totalAmount}</div>
                          <div className={`text-xs transition-colors duration-300 ${
                            hoveredSegment !== null ? 'text-emerald-300' : 'text-gray-400'
                          }`}>Total</div>
                        </div>
                      </div>
                      
                      {/* Animated inner glow */}
                      <div className={`absolute inset-0 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-sm transition-all duration-300 ${
                        hoveredSegment !== null ? 'scale-125 opacity-100' : 'opacity-50'
                      }`}></div>
                      
                      {/* Pulsing ring on hover */}
                      {hoveredSegment !== null && (
                        <div className="absolute inset-0 w-24 h-24 border-2 border-emerald-400/50 rounded-full animate-ping"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Tooltip */}
            {hoveredSegment !== null && (
              <div 
                className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full"
                style={{ 
                  left: mousePosition.x, 
                  top: mousePosition.y - 10,
                }}
              >
                <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-600/50 rounded-xl p-4 shadow-2xl max-w-xs">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getSlabColor(billBreakdown.components[hoveredSegment].color)}`}></div>
                    <h5 className="text-white font-semibold">{billBreakdown.components[hoveredSegment].category}</h5>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-emerald-400 font-bold">₹{billBreakdown.components[hoveredSegment].amount.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Percentage:</span>
                      <span className="text-white font-medium">{billBreakdown.components[hoveredSegment].percentage}%</span>
                    </div>
                    
                    {billBreakdown.components[hoveredSegment].units > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Units:</span>
                          <span className="text-white">{billBreakdown.components[hoveredSegment].units}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Rate:</span>
                          <span className="text-white">₹{billBreakdown.components[hoveredSegment].rate}/unit</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div className="border-4 border-transparent border-t-gray-900/95"></div>
                  </div>
                </div>
              </div>
            )}

            <div className="text-lg font-bold text-white mb-2">November 2025 Bill</div>
            <div className="text-sm text-gray-400">155 units consumed</div>
          </div>

          {/* Breakdown Details with Legend */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mr-2"></div>
              Bill Components
            </h4>
            
            {billBreakdown.components.map((component, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Animated border glow */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${getSlabColor(component.color)} blur-sm`}></div>
                
                <div className={`relative p-5 bg-gradient-to-br from-gray-800/40 to-gray-900/40 border rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                  hoveredSegment === index 
                    ? 'border-white/30 shadow-2xl' 
                    : 'border-gray-700/50 hover:border-gray-600/50'
                }`}>
                  {/* Color indicator with pulse animation */}
                  <div className="flex items-start space-x-4">
                    <div className={`relative w-4 h-4 rounded-full ${getSlabColor(component.color)} shadow-lg flex-shrink-0 mt-1 transition-transform duration-300 group-hover:scale-125`}>
                      <div className={`w-full h-full rounded-full ${getSlabColor(component.color)} opacity-50 blur-sm`}></div>
                      {/* Pulsing ring on hover */}
                      <div className={`absolute inset-0 rounded-full ${getSlabColor(component.color)} opacity-0 group-hover:opacity-30 animate-ping`}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="transition-transform duration-300 group-hover:translate-x-1">
                          <span className="text-white font-medium group-hover:text-emerald-400 transition-colors duration-300">{component.category}</span>
                          {component.units > 0 && (
                            <div className="text-xs text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                              {component.units} units × ₹{component.rate}/unit
                            </div>
                          )}
                        </div>
                        <div className="text-right transition-transform duration-300 group-hover:scale-105">
                          <span className="text-white font-bold text-lg group-hover:text-emerald-400 transition-colors duration-300">₹{component.amount.toFixed(2)}</span>
                          <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{component.percentage}% of total</div>
                        </div>
                      </div>
                      
                      {/* Enhanced progress bar */}
                      <div className="relative">
                        <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden group-hover:h-4 transition-all duration-300">
                          <div 
                            className={`h-full rounded-full ${getSlabColor(component.color)} relative overflow-hidden transition-all duration-700 ease-out group-hover:shadow-lg`}
                            style={{ 
                              width: hoveredSegment === index ? `${Math.min(component.percentage + 2, 100)}%` : `${component.percentage}%`,
                              filter: hoveredSegment === index ? 'brightness(1.2) saturate(1.3)' : 'brightness(1)'
                            }}
                          >
                            {/* Animated shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            
                            {/* Floating particles effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="absolute top-0 left-2/4 w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                              <div className="absolute top-0 left-3/4 w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Enhanced percentage indicator */}
                        <div 
                          className={`absolute top-0 transform -translate-y-10 text-xs font-bold text-white px-3 py-1 rounded-lg shadow-xl transition-all duration-300 ${
                            hoveredSegment === index ? 'opacity-100 scale-110 bg-gradient-to-r from-emerald-500 to-cyan-500' : 'opacity-0 bg-gray-800'
                          }`}
                          style={{ left: `${Math.min(component.percentage, 85)}%` }}
                        >
                          <div className="flex items-center space-x-1">
                            <span>{component.percentage}%</span>
                            <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                          </div>
                          {/* Tooltip arrow */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                            <div className="border-2 border-transparent border-t-current"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Summary card */}
            <div className="mt-6 p-5 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-emerald-400 font-semibold">Total Bill Amount</h5>
                  <p className="text-gray-400 text-sm">November 2025 • 155 units</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">₹{billBreakdown.totalAmount}</div>
                  <div className="text-sm text-emerald-400">+12% from last month</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <h4 className="text-lg font-bold text-blue-400 mb-4">� Bill Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Electricity Charges:</span>
              <span className="text-white">₹652.50 (52%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Taxes & Duties:</span>
              <span className="text-white">₹598.25 (48%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Peak Hour Usage:</span>
              <span className="text-orange-400">24% (2-6 PM)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Potential Monthly Savings:</span>
              <span className="text-green-400">₹45/month if staying in Slab 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-1">₹8.05</div>
          <div className="text-sm text-gray-400">Cost per Unit</div>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">5.2</div>
          <div className="text-sm text-gray-400">kWh per Day</div>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">155</div>
          <div className="text-sm text-gray-400">Units This Month</div>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">Slab 2</div>
          <div className="text-sm text-gray-400">Current Tariff</div>
        </div>
      </div>
    </div>
  );
}