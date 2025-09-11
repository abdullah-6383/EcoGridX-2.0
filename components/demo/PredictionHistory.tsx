"use client";

import { useState } from 'react';

export default function PredictionHistory() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('energy-demand');

  const predictionData = [
    {
      id: 'pred-001',
      timestamp: '2025-08-17 09:00',
      type: 'Energy Demand',
      predicted: '2.4 MWh',
      actual: '2.2 MWh',
      accuracy: 92.5,
      confidence: 87,
      status: 'Completed',
      region: 'Central Grid',
    },
    {
      id: 'pred-002',
      timestamp: '2025-08-17 08:00',
      type: 'Solar Generation',
      predicted: '1.8 MWh',
      actual: '1.9 MWh',
      accuracy: 94.7,
      confidence: 91,
      status: 'Completed',
      region: 'Residential South',
    },
    {
      id: 'pred-003',
      timestamp: '2025-08-17 07:00',
      type: 'Storage Charge',
      predicted: '85%',
      actual: '83%',
      accuracy: 97.6,
      confidence: 95,
      status: 'Completed',
      region: 'Industrial Zone',
    },
    {
      id: 'pred-004',
      timestamp: '2025-08-17 10:00',
      type: 'Peak Load',
      predicted: '3.2 MW',
      actual: 'Pending',
      accuracy: null,
      confidence: 89,
      status: 'Pending',
      region: 'Commercial District',
    },
    {
      id: 'pred-005',
      timestamp: '2025-08-17 06:00',
      type: 'Wind Generation',
      predicted: '1.2 MWh',
      actual: '1.1 MWh',
      accuracy: 91.7,
      confidence: 78,
      status: 'Completed',
      region: 'Mountain Region',
    },
  ];

  const getAccuracyColor = (accuracy: number | null) => {
    if (accuracy === null) return 'text-gray-400';
    if (accuracy >= 95) return 'text-green-400';
    if (accuracy >= 90) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-400';
      case 'Pending':
        return 'text-yellow-400';
      case 'Failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-500';
    if (confidence >= 80) return 'bg-yellow-500';
    if (confidence >= 70) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
          Prediction History
        </h1>
        <p className="text-gray-400">View historical AI predictions and their accuracy metrics</p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-800 rounded-lg p-4">
        <div className="flex gap-4">
          <div>
            <label className="text-sm text-gray-400 block mb-2">Time Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-2">Prediction Type</label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Types</option>
              <option value="energy-demand">Energy Demand</option>
              <option value="solar-generation">Solar Generation</option>
              <option value="wind-generation">Wind Generation</option>
              <option value="storage-charge">Storage Charge</option>
              <option value="peak-load">Peak Load</option>
            </select>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Export Data
        </button>
      </div>

      {/* Accuracy Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Overall Accuracy</h3>
          <p className="text-2xl font-bold text-green-400">94.1%</p>
          <p className="text-xs text-gray-500 mt-1">Last 24 hours</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Avg Confidence</h3>
          <p className="text-2xl font-bold text-blue-400">88.2%</p>
          <p className="text-xs text-gray-500 mt-1">Model confidence</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Total Predictions</h3>
          <p className="text-2xl font-bold text-purple-400">247</p>
          <p className="text-xs text-gray-500 mt-1">In selected period</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Success Rate</h3>
          <p className="text-2xl font-bold text-white">98.8%</p>
          <p className="text-xs text-gray-500 mt-1">Completed predictions</p>
        </div>
      </div>

      {/* Prediction History Chart */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Accuracy Trend</h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-300">Accuracy %</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300">Target (95%)</span>
            </div>
          </div>
        </div>
        <div className="h-80 bg-gray-900 rounded-lg p-4">
          <svg viewBox="0 0 1000 300" className="w-full h-full">
            {/* Definitions for gradients and filters */}
            <defs>
              {/* Grid pattern */}
              <pattern id="predictionGrid" width="100" height="30" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 30" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.7"/>
              </pattern>
              
              {/* Gradient for the area under the curve */}
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#8B5CF6', stopOpacity: 0.3}} />
                <stop offset="100%" style={{stopColor: '#8B5CF6', stopOpacity: 0.05}} />
              </linearGradient>
              
              {/* Glow effect for the line */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background grid */}
            <rect width="1000" height="300" fill="url(#predictionGrid)" />

            {/* Y-axis labels and guidelines */}
            <g stroke="#4B5563" strokeWidth="0.5" opacity="0.5">
              <line x1="50" y1="50" x2="950" y2="50" />
              <line x1="50" y1="100" x2="950" y2="100" />
              <line x1="50" y1="150" x2="950" y2="150" />
              <line x1="50" y1="200" x2="950" y2="200" />
              <line x1="50" y1="250" x2="950" y2="250" />
            </g>

            {/* Target line (95% accuracy) */}
            <line x1="50" y1="75" x2="950" y2="75" stroke="#60A5FA" strokeWidth="2" strokeDasharray="8,4" opacity="0.7" />
            <text x="960" y="79" fill="#60A5FA" fontSize="12" fontWeight="500">95%</text>

            {/* Area under the curve */}
            <path
              d="M 50,200 L 130,185 L 210,170 L 290,160 L 370,145 L 450,125 L 530,110 L 610,100 L 690,90 L 770,80 L 850,75 L 950,70 L 950,250 L 50,250 Z"
              fill="url(#areaGradient)"
            />

            {/* Main accuracy trend line */}
            <path
              d="M 50,200 L 130,185 L 210,170 L 290,160 L 370,145 L 450,125 L 530,110 L 610,100 L 690,90 L 770,80 L 850,75 L 950,70"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="4"
              filter="url(#glow)"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points with enhanced styling */}
            <g>
              <circle cx="50" cy="200" r="6" fill="#1F2937" stroke="#8B5CF6" strokeWidth="3" />
              <circle cx="130" cy="185" r="6" fill="#1F2937" stroke="#8B5CF6" strokeWidth="3" />
              <circle cx="210" cy="170" r="6" fill="#1F2937" stroke="#8B5CF6" strokeWidth="3" />
              <circle cx="290" cy="160" r="6" fill="#1F2937" stroke="#8B5CF6" strokeWidth="3" />
              <circle cx="370" cy="145" r="6" fill="#1F2937" stroke="#8B5CF6" strokeWidth="3" />
              <circle cx="450" cy="125" r="6" fill="#1F2937" stroke="#8B5CF6" strokeWidth="3" />
              <circle cx="530" cy="110" r="6" fill="#1F2937" stroke="#8B5CF6" strokeWidth="3" />
              <circle cx="610" cy="100" r="6" fill="#1F2937" stroke="#8B5CF6" strokeWidth="3" />
              <circle cx="690" cy="90" r="6" fill="#1F2937" stroke="#8B5CF6" strokeWidth="3" />
              <circle cx="770" cy="80" r="6" fill="#1F2937" stroke="#8B5CF6" strokeWidth="3" />
              <circle cx="850" cy="75" r="6" fill="#1F2937" stroke="#8B5CF6" strokeWidth="3" />
              <circle cx="950" cy="70" r="6" fill="#1F2937" stroke="#8B5CF6" strokeWidth="3" />
            </g>

            {/* Hover indicators (larger transparent circles for better interaction) */}
            <g opacity="0">
              <circle cx="50" cy="200" r="15" fill="transparent" className="hover:opacity-100 transition-opacity cursor-pointer" />
              <circle cx="130" cy="185" r="15" fill="transparent" className="hover:opacity-100 transition-opacity cursor-pointer" />
              <circle cx="210" cy="170" r="15" fill="transparent" className="hover:opacity-100 transition-opacity cursor-pointer" />
              <circle cx="290" cy="160" r="15" fill="transparent" className="hover:opacity-100 transition-opacity cursor-pointer" />
              <circle cx="370" cy="145" r="15" fill="transparent" className="hover:opacity-100 transition-opacity cursor-pointer" />
              <circle cx="450" cy="125" r="15" fill="transparent" className="hover:opacity-100 transition-opacity cursor-pointer" />
              <circle cx="530" cy="110" r="15" fill="transparent" className="hover:opacity-100 transition-opacity cursor-pointer" />
              <circle cx="610" cy="100" r="15" fill="transparent" className="hover:opacity-100 transition-opacity cursor-pointer" />
              <circle cx="690" cy="90" r="15" fill="transparent" className="hover:opacity-100 transition-opacity cursor-pointer" />
              <circle cx="770" cy="80" r="15" fill="transparent" className="hover:opacity-100 transition-opacity cursor-pointer" />
              <circle cx="850" cy="75" r="15" fill="transparent" className="hover:opacity-100 transition-opacity cursor-pointer" />
              <circle cx="950" cy="70" r="15" fill="transparent" className="hover:opacity-100 transition-opacity cursor-pointer" />
            </g>

            {/* Y-axis labels */}
            <g fill="#9CA3AF" fontSize="12" textAnchor="end">
              <text x="45" y="55">100%</text>
              <text x="45" y="105">95%</text>
              <text x="45" y="155">90%</text>
              <text x="45" y="205">85%</text>
              <text x="45" y="255">80%</text>
            </g>

            {/* X-axis labels */}
            <g fill="#9CA3AF" fontSize="12" textAnchor="middle">
              <text x="50" y="280">00:00</text>
              <text x="200" y="280">04:00</text>
              <text x="350" y="280">08:00</text>
              <text x="500" y="280">12:00</text>
              <text x="650" y="280">16:00</text>
              <text x="800" y="280">20:00</text>
              <text x="950" y="280">24:00</text>
            </g>

            {/* Current value indicator */}
            <g>
              <circle cx="950" cy="70" r="8" fill="#8B5CF6" opacity="0.8">
                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="950" y="35" fill="#8B5CF6" fontSize="14" fontWeight="600" textAnchor="middle">96.5%</text>
            </g>

            {/* Axis lines */}
            <line x1="50" y1="50" x2="50" y2="250" stroke="#6B7280" strokeWidth="2" />
            <line x1="50" y1="250" x2="950" y2="250" stroke="#6B7280" strokeWidth="2" />
          </svg>
        </div>
        
        {/* Chart insights */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Trend: </span>
            <span className="text-green-400 font-medium">↗ Improving</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">Peak: </span>
            <span className="text-blue-400 font-medium">96.5% at 24:00</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-gray-300">Avg: </span>
            <span className="text-purple-400 font-medium">91.2% (24h)</span>
          </div>
        </div>
      </div>

      {/* Prediction History Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Recent Predictions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-750">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Predicted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Accuracy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Region
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {predictionData.map((prediction) => (
                <tr key={prediction.id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {prediction.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {prediction.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 font-medium">
                    {prediction.predicted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {prediction.actual}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {prediction.accuracy ? (
                      <span className={`font-medium ${getAccuracyColor(prediction.accuracy)}`}>
                        {prediction.accuracy}%
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-700 rounded-full h-2 max-w-[60px]">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getConfidenceColor(prediction.confidence)}`}
                          style={{ width: `${prediction.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-xs">{prediction.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`font-medium ${getStatusColor(prediction.status)}`}>
                      {prediction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {prediction.region}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg px-6 pt-6 pb-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Best Performing Models</h3>
            <div className="bg-green-900/30 border border-green-500/40 rounded-full px-3 py-1">
              <span className="text-green-400 text-xs font-medium">Top 4 Models</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* 1st Place - Solar Generation */}
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Solar Generation Predictor</h4>
                    <p className="text-green-400 text-xs">Renewable Energy • Real-time</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold text-lg">96.2%</div>
                  <div className="text-green-300 text-xs">+2.1% this week</div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full transition-all duration-500" style={{width: '96.2%'}}></div>
              </div>
            </div>

            {/* 2nd Place - Storage Charge */}
            <div className="bg-gradient-to-r from-green-900/15 to-green-900/5 border border-green-500/15 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Storage Charge Predictor</h4>
                    <p className="text-green-400 text-xs">Battery Management • Adaptive</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold text-lg">95.8%</div>
                  <div className="text-green-300 text-xs">+1.7% this week</div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500" style={{width: '95.8%'}}></div>
              </div>
            </div>

            {/* 3rd Place - Energy Demand */}
            <div className="bg-gradient-to-r from-yellow-900/15 to-yellow-900/5 border border-yellow-500/15 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Energy Demand Predictor</h4>
                    <p className="text-yellow-400 text-xs">Load Forecasting • Neural Network</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 font-bold text-lg">92.5%</div>
                  <div className="text-yellow-300 text-xs">-0.3% this week</div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full transition-all duration-500" style={{width: '92.5%'}}></div>
              </div>
            </div>

            {/* 4th Place - Wind Generation */}
            <div className="bg-gradient-to-r from-orange-900/15 to-orange-900/5 border border-orange-500/15 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full text-white font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Wind Generation Predictor</h4>
                    <p className="text-orange-400 text-xs">Weather Dependent • ML Model</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-orange-400 font-bold text-lg">89.3%</div>
                  <div className="text-orange-300 text-xs">+0.8% this week</div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all duration-500" style={{width: '89.3%'}}></div>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="mt-4 pt-3 border-t border-gray-700">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">93.5%</div>
                <div className="text-xs text-gray-400">Average Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">4/5</div>
                <div className="text-xs text-gray-400">Models Above 90%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg px-6 pt-6 pb-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Improvement Opportunities</h3>
            <div className="bg-orange-900/30 border border-orange-500/40 rounded-full px-3 py-1">
              <span className="text-orange-400 text-xs font-medium">4 Focus Areas</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {/* Priority 1 - Wind Prediction */}
            <div className="bg-gradient-to-r from-red-900/20 to-red-900/10 border border-red-500/20 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-7 h-7 bg-red-500 rounded-full text-white font-bold text-xs">
                    !
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Wind Prediction Accuracy</h4>
                    <p className="text-red-400 text-xs">Weather Dependent • High Priority</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-red-400 font-bold text-base">89.3%</div>
                  <div className="text-red-300 text-xs">Target: 95%</div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                <div className="bg-gradient-to-r from-red-500 to-red-400 h-1.5 rounded-full transition-all duration-500" style={{width: '89.3%'}}></div>
              </div>
              <p className="text-gray-300 text-xs">Consider weather pattern integration and historical data analysis</p>
            </div>

            {/* Priority 2 - Peak Load Timing */}
            <div className="bg-gradient-to-r from-orange-900/15 to-orange-900/5 border border-orange-500/15 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-7 h-7 bg-orange-500 rounded-full text-white font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Peak Load Timing</h4>
                    <p className="text-orange-400 text-xs">Time Series • Medium Priority</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-orange-400 font-bold text-base">91.8%</div>
                  <div className="text-orange-300 text-xs">Target: 96%</div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-1.5 rounded-full transition-all duration-500" style={{width: '91.8%'}}></div>
              </div>
              <p className="text-gray-300 text-xs">Enhance time-series modeling with seasonal patterns</p>
            </div>

            {/* Priority 3 - Regional Variations */}
            <div className="bg-gradient-to-r from-yellow-900/15 to-yellow-900/5 border border-yellow-500/15 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-7 h-7 bg-yellow-500 rounded-full text-white font-bold text-xs">
                    3
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Regional Variations</h4>
                    <p className="text-yellow-400 text-xs">Geographic • Low Priority</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 font-bold text-base">93.1%</div>
                  <div className="text-yellow-300 text-xs">Target: 97%</div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-1.5 rounded-full transition-all duration-500" style={{width: '93.1%'}}></div>
              </div>
              <p className="text-gray-300 text-xs">Add location-specific features and demographic data</p>
            </div>

            {/* Priority 4 - Data Quality */}
            <div className="bg-gradient-to-r from-blue-900/15 to-blue-900/5 border border-blue-500/15 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-7 h-7 bg-blue-500 rounded-full text-white font-bold text-xs">
                    4
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Data Quality Enhancement</h4>
                    <p className="text-blue-400 text-xs">Data Pipeline • Maintenance</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-blue-400 font-bold text-base">94.5%</div>
                  <div className="text-blue-300 text-xs">Target: 98%</div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-1.5 rounded-full transition-all duration-500" style={{width: '94.5%'}}></div>
              </div>
              <p className="text-gray-300 text-xs">Improve sensor calibration and data validation processes</p>
            </div>
          </div>

          {/* Improvement Summary */}
          <div className="mt-3 pt-2 border-t border-gray-700">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-orange-400">5.8%</div>
                <div className="text-xs text-gray-400">Avg Improvement Gap</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-400">Q4</div>
                <div className="text-xs text-gray-400">Target Completion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
