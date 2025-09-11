"use client";

import { useState, useEffect } from 'react';

export default function MainDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [billAmount, setBillAmount] = useState(1250.75);
  const [billTrend, setBillTrend] = useState(12.5); // percentage change from last month
  const [currentSlab, setCurrentSlab] = useState(2);
  const [unitsUsed, setUnitsUsed] = useState(155);
  const [showBillDetails, setShowBillDetails] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const [showSlabAlert, setShowSlabAlert] = useState(false);

  // Extended mock data for bill details
  const billHistory = [
    { month: 'Current', amount: 1250.75, units: 155, avg_daily: 5.2 },
    { month: 'Last Month', amount: 1109.50, units: 138, avg_daily: 4.5 },
    { month: '2 Months Ago', amount: 1289.25, units: 162, avg_daily: 5.4 },
    { month: '3 Months Ago', amount: 998.75, units: 122, avg_daily: 4.1 },
  ];

  const alertSettings = [
    { type: 'Bill Threshold', value: '₹1500', enabled: alertsEnabled },
    { type: 'Units Warning', value: '200 units', enabled: alertsEnabled },
    { type: 'Slab Change Alert', value: 'Next slab', enabled: showSlabAlert },
    { type: 'Daily Usage', value: '6+ kWh/day', enabled: false },
  ];

  const savingsComparison = [
    { period: 'vs Last Month', amount: 141.25, percentage: 12.7, type: 'increase' },
    { period: 'vs Same Month Last Year', amount: -45.80, percentage: -3.5, type: 'savings' },
    { period: 'vs Neighborhood Avg', amount: -89.50, percentage: -6.7, type: 'savings' },
  ];

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate minor bill fluctuations
      setBillAmount(prev => prev + (Math.random() - 0.5) * 2);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Tariff slab data
  const slabs = [
    { slab: 1, rate: 3.50, limit: 100, color: 'green' },
    { slab: 2, rate: 5.50, limit: 200, color: 'yellow' },
    { slab: 3, rate: 7.50, limit: 300, color: 'orange' },
    { slab: 4, rate: 9.50, limit: Infinity, color: 'red' }
  ];

  const getCurrentSlabInfo = () => {
    for (const slab of slabs) {
      if (unitsUsed <= slab.limit) {
        return slab;
      }
    }
    return slabs[slabs.length - 1];
  };

  const getNextSlabInfo = () => {
    const currentSlabInfo = getCurrentSlabInfo();
    const nextSlabIndex = slabs.findIndex(s => s.slab === currentSlabInfo.slab) + 1;
    return nextSlabIndex < slabs.length ? slabs[nextSlabIndex] : null;
  };

  const currentSlabInfo = getCurrentSlabInfo();
  const nextSlabInfo = getNextSlabInfo();
  const unitsRemainingInSlab = currentSlabInfo.limit - unitsUsed;
  const slabProgress = (unitsUsed / currentSlabInfo.limit) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your Energy Command Center
          </span>
        </h1>
        <p className="text-gray-400">Critical information at a glance</p>
        <div className="text-sm text-gray-500 mt-2">
          Last updated: {currentTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit'
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Bill Forecaster */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
              Live Bill Forecaster
            </h3>
            <div className="text-xs text-gray-400">Current Month</div>
          </div>

          {/* Main Bill Amount */}
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-blue-400 mb-2">
              ₹ {billAmount.toFixed(2)}
            </div>
            <div className="text-gray-400 text-sm">Projected Monthly Bill</div>
          </div>

          {/* Trend Line */}
          <div className="relative">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {billTrend >= 0 ? (
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
              )}
              <span className={`text-sm font-medium ${billTrend >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                {billTrend >= 0 ? '+' : ''}{billTrend.toFixed(1)}% vs last month
              </span>
            </div>

            {/* Simple trend visualization */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-end justify-between h-16 space-x-2">
                {[85, 92, 88, 95, 100, 98, 102].map((height, index) => (
                  <div
                    key={index}
                    className={`w-full rounded-t-sm transition-all duration-500 ${
                      index === 6 ? 'bg-blue-400' : 'bg-gray-600'
                    }`}
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>6 days ago</span>
                <span>Today</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <div className="text-xs text-gray-400 mb-2">Quick Actions:</div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowBillDetails(!showBillDetails)}
                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30 transition-all duration-200 hover:scale-105"
              >
                {showBillDetails ? 'Hide Details' : 'View Details'}
              </button>
              <button 
                onClick={() => setAlertsEnabled(!alertsEnabled)}
                className={`px-3 py-1 rounded-lg text-xs transition-all duration-200 hover:scale-105 ${
                  alertsEnabled 
                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }`}
              >
                {alertsEnabled ? 'Alerts ON' : 'Set Alert'}
              </button>
            </div>
          </div>

          {/* Bill Details Expansion */}
          {showBillDetails && (
            <div className="mt-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
              <h4 className="text-sm font-bold text-white mb-3">Bill History & Comparison</h4>
              <div className="space-y-2">
                {billHistory.map((bill, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{bill.month}</span>
                    <div className="flex space-x-4">
                      <span className="text-blue-400">₹{bill.amount}</span>
                      <span className="text-gray-500">{bill.units} units</span>
                      <span className="text-gray-500">{bill.avg_daily} kWh/day</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-700/50">
                <h5 className="text-xs font-medium text-gray-400 mb-2">Savings Analysis</h5>
                <div className="space-y-1">
                  {savingsComparison.map((comparison, index) => (
                    <div key={index} className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">{comparison.period}</span>
                      <span className={`font-medium ${
                        comparison.type === 'savings' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {comparison.type === 'savings' ? '−' : '+'} ₹{Math.abs(comparison.amount)} ({comparison.percentage > 0 ? '+' : ''}{comparison.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Alert Settings */}
          {alertsEnabled && (
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h4 className="text-sm font-bold text-green-400 mb-3">Active Alerts</h4>
              <div className="space-y-2">
                {alertSettings.filter(alert => alert.enabled).map((alert, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">{alert.type}</span>
                    <span className="text-green-400">{alert.value}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setAlertsEnabled(false)}
                className="mt-2 px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs hover:bg-red-500/30 transition-colors"
              >
                Disable All
              </button>
            </div>
          )}
        </div>

        {/* Tariff Slab Tracker */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
              Tariff Slab Tracker
            </h3>
            <div className="text-xs text-gray-400">This Month</div>
          </div>

          {/* Current Slab Info */}
          <div className="mb-6">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-yellow-400 mb-1">
                Slab {currentSlabInfo.slab}
              </div>
              <div className="text-gray-400 text-sm">
                ₹{currentSlabInfo.rate}/unit
              </div>
            </div>

            {/* Slab Progress Bar */}
            <div className="relative">
              <div className="text-sm text-gray-400 mb-2 flex justify-between">
                <span>{unitsUsed} units used</span>
                <span>{currentSlabInfo.limit === Infinity ? '∞' : currentSlabInfo.limit} unit limit</span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    currentSlabInfo.color === 'green' ? 'bg-green-400' :
                    currentSlabInfo.color === 'yellow' ? 'bg-yellow-400' :
                    currentSlabInfo.color === 'orange' ? 'bg-orange-400' :
                    'bg-red-400'
                  }`}
                  style={{ width: `${Math.min(slabProgress, 100)}%` }}
                ></div>
              </div>

              {nextSlabInfo && (
                <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-300">
                    <span className="font-medium text-orange-400">{unitsRemainingInSlab} units remaining</span> until Slab {nextSlabInfo.slab}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Next rate: ₹{nextSlabInfo.rate}/unit
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* All Slabs Overview */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-300 mb-3">Tariff Slabs:</div>
            {slabs.map((slab) => (
              <div 
                key={slab.slab}
                className={`flex justify-between items-center p-2 rounded-lg transition-all ${
                  slab.slab === currentSlabInfo.slab 
                    ? 'bg-yellow-500/20 border border-yellow-500/30' 
                    : 'bg-gray-800/30'
                }`}
              >
                <span className="text-sm text-gray-300">
                  Slab {slab.slab} ({slab.limit === Infinity ? '300+' : `0-${slab.limit}`} units)
                </span>
                <span className="text-sm font-medium text-white">
                  ₹{slab.rate}/unit
                </span>
              </div>
            ))}
          </div>

          {/* Slab Management */}
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <div className="flex space-x-2 mb-3">
              <button 
                onClick={() => setUnitsUsed(Math.max(0, unitsUsed - 10))}
                className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs hover:bg-green-500/30 transition-all duration-200 hover:scale-105"
              >
                -10 Units
              </button>
              <button 
                onClick={() => setUnitsUsed(unitsUsed + 10)}
                className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/30 transition-all duration-200 hover:scale-105"
              >
                +10 Units
              </button>
              <button 
                onClick={() => setShowSlabAlert(!showSlabAlert)}
                className={`px-3 py-1 rounded-lg text-xs transition-all duration-200 hover:scale-105 ${
                  showSlabAlert 
                    ? 'bg-blue-500/30 text-blue-300' 
                    : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                }`}
              >
                {showSlabAlert ? 'Alert ON' : 'Set Alert'}
              </button>
            </div>

            {/* Slab Alert */}
            {showSlabAlert && nextSlabInfo && (
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-orange-400 text-xs font-medium">Slab Change Alert Active</span>
                </div>
                <div className="text-xs text-gray-300">
                  You'll be notified when you're {Math.max(0, unitsRemainingInSlab - 5)} units away from Slab {nextSlabInfo.slab}
                </div>
                <div className="text-xs text-orange-300 mt-1">
                  Rate will increase to ₹{nextSlabInfo.rate}/unit
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">24°C</div>
          <div className="text-sm text-gray-400">Optimal Temperature</div>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">2.4 kW</div>
          <div className="text-sm text-gray-400">Current Load</div>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">12 Days</div>
          <div className="text-sm text-gray-400">Until Bill Due</div>
        </div>
      </div>
    </div>
  );
}