"use client";

import { useState, useEffect } from 'react';

export default function AIOptimizer() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<number | null>(null);
  
  // Real-time grid data
  const [gridData, setGridData] = useState({
    currentLoad: 2650,
    efficiency: 87.3,
    gridBalance: 92.1,
    storageLevel: 68.5,
    carbonReduction: 15.2,
    lastUpdated: new Date()
  });

  // AI Recommendations with detected issues
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      issue: "Load Imbalance Detected",
      zone: "North Grid Zone",
      severity: "High",
      description: "North zone experiencing 15% higher load than optimal capacity",
      aiAction: "Redistribute 180MW to East and West zones",
      currentMetrics: {
        gridBalance: 78.2,
        storage: 45.3,
        efficiency: 82.1
      },
      projectedMetrics: {
        gridBalance: 94.8,
        storage: 58.7,
        efficiency: 91.3
      },
      confidenceScore: 94.2,
      coordinates: { x: 25, y: 20 },
      status: "pending"
    },
    {
      id: 2,
      issue: "Storage Optimization Opportunity",
      zone: "Central Storage Hub",
      severity: "Medium",
      description: "Battery storage at 68% - optimal discharge window detected",
      aiAction: "Discharge 120MW during peak demand period (6-8 PM)",
      currentMetrics: {
        gridBalance: 92.1,
        storage: 68.5,
        efficiency: 87.3
      },
      projectedMetrics: {
        gridBalance: 96.3,
        storage: 55.2,
        efficiency: 93.7
      },
      confidenceScore: 89.7,
      coordinates: { x: 50, y: 45 },
      status: "pending"
    },
    {
      id: 3,
      issue: "Renewable Integration Gap",
      zone: "Solar Farm Array",
      severity: "Low",
      description: "Solar output 12% below forecast - supplement with wind",
      aiAction: "Increase wind turbine output by 80MW to compensate",
      currentMetrics: {
        gridBalance: 92.1,
        storage: 68.5,
        efficiency: 87.3
      },
      projectedMetrics: {
        gridBalance: 94.1,
        storage: 68.5,
        efficiency: 89.8
      },
      confidenceScore: 91.5,
      coordinates: { x: 75, y: 30 },
      status: "pending"
    }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGridData(prev => ({
        ...prev,
        currentLoad: prev.currentLoad + (Math.random() - 0.5) * 20,
        efficiency: Math.max(80, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 2)),
        gridBalance: Math.max(85, Math.min(98, prev.gridBalance + (Math.random() - 0.5) * 1.5)),
        storageLevel: Math.max(40, Math.min(85, prev.storageLevel + (Math.random() - 0.5) * 3)),
        lastUpdated: new Date()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Apply optimizations
    setGridData(prev => ({
      ...prev,
      efficiency: 94.2,
      gridBalance: 96.8,
      storageLevel: 58.3,
      carbonReduction: 18.7
    }));

    setRecommendations(prev => 
      prev.map(rec => ({ ...rec, status: 'applied' }))
    );

    setIsOptimizing(false);
    setOptimizationComplete(true);
  };

  const handleRecommendationAction = (id: number, action: 'accept' | 'reject' | 'modify') => {
    setRecommendations(prev =>
      prev.map(rec =>
        rec.id === id
          ? { ...rec, status: action === 'accept' ? 'accepted' : action === 'reject' ? 'rejected' : 'modified' }
          : rec
      )
    );
  };

  return (
  // ...existing code...

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Optimizer
          </span>
        </h1>
        <p className="text-gray-400">Intelligent grid optimization using reinforcement learning algorithms</p>
      </div>

      {/* Real-time Grid Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">Current Load</span>
            </div>
            <div className="text-lg font-bold text-cyan-400">{gridData.currentLoad.toFixed(0)} MW</div>
          </div>
          <div className="text-xs text-gray-500">Updated {gridData.lastUpdated.toLocaleTimeString()}</div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">Grid Balance</span>
            </div>
            <div className="text-lg font-bold text-emerald-400">{gridData.gridBalance.toFixed(1)}%</div>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div className="bg-emerald-400 h-2 rounded-full transition-all duration-1000" style={{ width: `${gridData.gridBalance}%` }}></div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">Storage Level</span>
            </div>
            <div className="text-lg font-bold text-blue-400">{gridData.storageLevel.toFixed(1)}%</div>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div className="bg-blue-400 h-2 rounded-full transition-all duration-1000" style={{ width: `${gridData.storageLevel}%` }}></div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">Efficiency</span>
            </div>
            <div className="text-lg font-bold text-orange-400">{gridData.efficiency.toFixed(1)}%</div>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div className="bg-orange-400 h-2 rounded-full transition-all duration-1000" style={{ width: `${gridData.efficiency}%` }}></div>
          </div>
        </div>
      </div>

      {/* AI Recommendations Map & Controls */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Grid Map Visualization */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-2">Grid Optimization Map</h3>
            <p className="text-sm text-gray-400">Real-time visualization of detected issues and AI recommendations</p>
          </div>
          
          <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-lg p-6 border border-white/10 h-80">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            {/* Issue Markers */}
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                  selectedRecommendation === rec.id ? 'scale-125 z-10' : ''
                }`}
                style={{ left: `${rec.coordinates.x}%`, top: `${rec.coordinates.y}%` }}
                onClick={() => setSelectedRecommendation(selectedRecommendation === rec.id ? null : rec.id)}
              >
                <div className={`w-4 h-4 rounded-full animate-pulse ${
                  rec.severity === 'High' ? 'bg-red-400' :
                  rec.severity === 'Medium' ? 'bg-yellow-400' : 'bg-green-400'
                }`}>
                  <div className={`absolute inset-0 rounded-full animate-ping ${
                    rec.severity === 'High' ? 'bg-red-400' :
                    rec.severity === 'Medium' ? 'bg-yellow-400' : 'bg-green-400'
                  }`}></div>
                </div>
                
                {selectedRecommendation === rec.id && (
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-lg p-3 min-w-48 z-20">
                    <div className="text-xs font-bold text-white mb-1">{rec.zone}</div>
                    <div className="text-xs text-gray-300 mb-2">{rec.issue}</div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      rec.severity === 'High' ? 'bg-red-500/20 text-red-400' :
                      rec.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {rec.severity} Priority
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm border border-white/20 rounded-lg p-3">
              <div className="text-xs font-bold text-white mb-2">Severity Levels</div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-xs text-gray-300">High Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs text-gray-300">Medium Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-gray-300">Low Priority</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Controls */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-2">Optimization Control</h3>
            <p className="text-sm text-gray-400">AI-powered grid optimization engine</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-bold text-purple-400">AI Engine Status</div>
                  <div className="text-xs text-gray-400">Neural network processing</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-purple-400">Active</span>
                </div>
              </div>
              
              <button
                onClick={handleOptimize}
                disabled={isOptimizing}
                className={`w-full px-4 py-3 rounded-lg font-bold transition-all ${
                  isOptimizing
                    ? 'bg-blue-500/30 text-blue-400 cursor-not-allowed'
                    : optimizationComplete
                    ? 'bg-green-500/30 text-green-400'
                    : 'bg-purple-500/30 text-purple-400 hover:bg-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20'
                }`}
              >
                {isOptimizing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Optimizing...</span>
                  </div>
                ) : optimizationComplete ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Optimization Complete</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Optimize Grid</span>
                  </div>
                )}
              </button>
            </div>

            {optimizationComplete && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="text-sm font-bold text-green-400 mb-2">Optimization Results</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Grid Balance:</span>
                    <span className="text-green-400">+4.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Efficiency:</span>
                    <span className="text-green-400">+6.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Carbon Reduction:</span>
                    <span className="text-green-400">+3.5%</span>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-sm font-bold text-white mb-2">Active Recommendations</div>
              <div className="text-2xl font-bold text-cyan-400">{recommendations.filter(r => r.status === 'pending').length}</div>
              <div className="text-xs text-gray-400">Issues detected</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations List */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white">AI Recommendations</h3>
        
        {recommendations.map((rec) => (
          <div key={rec.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Issue Detection */}
              <div>
                <div className="mb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      rec.severity === 'High' ? 'bg-red-400' :
                      rec.severity === 'Medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`}></div>
                    <h4 className="font-bold text-white">{rec.issue}</h4>
                  </div>
                  <div className="text-sm text-gray-400 mb-2">{rec.zone}</div>
                  <p className="text-sm text-gray-300">{rec.description}</p>
                </div>
                
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                  <div className="text-sm font-bold text-cyan-400 mb-1">AI Action Suggested</div>
                  <p className="text-sm text-gray-300">{rec.aiAction}</p>
                </div>
              </div>

              {/* Projected Impact */}
              <div>
                <h5 className="font-bold text-white mb-3">Projected Impact</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-400">Grid Balance</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-red-400">{rec.currentMetrics.gridBalance}%</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-green-400">{rec.projectedMetrics.gridBalance}%</span>
                      </div>
                    </div>
                    <div className="text-green-400 font-bold">
                      +{(rec.projectedMetrics.gridBalance - rec.currentMetrics.gridBalance).toFixed(1)}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-400">Storage Level</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-red-400">{rec.currentMetrics.storage}%</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-green-400">{rec.projectedMetrics.storage}%</span>
                      </div>
                    </div>
                    <div className={`font-bold ${
                      rec.projectedMetrics.storage - rec.currentMetrics.storage > 0 ? 'text-green-400' : 'text-orange-400'
                    }`}>
                      {rec.projectedMetrics.storage - rec.currentMetrics.storage > 0 ? '+' : ''}
                      {(rec.projectedMetrics.storage - rec.currentMetrics.storage).toFixed(1)}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-400">Efficiency</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-red-400">{rec.currentMetrics.efficiency}%</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-green-400">{rec.projectedMetrics.efficiency}%</span>
                      </div>
                    </div>
                    <div className="text-green-400 font-bold">
                      +{(rec.projectedMetrics.efficiency - rec.currentMetrics.efficiency).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidence Score & Operator Controls */}
              <div>
                <div className="mb-4">
                  <h5 className="font-bold text-white mb-3">Confidence Score</h5>
                  <div className="text-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="text-3xl font-bold text-purple-400 mb-1">{rec.confidenceScore}%</div>
                    <div className="text-xs text-gray-400">AI Confidence Level</div>
                    <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                      <div 
                        className="bg-purple-400 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${rec.confidenceScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-white mb-3">Operator Controls</h5>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleRecommendationAction(rec.id, 'accept')}
                      disabled={rec.status !== 'pending'}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
                        rec.status === 'accepted'
                          ? 'bg-green-500/30 text-green-400 border border-green-500/50'
                          : rec.status === 'pending'
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                          : 'bg-gray-500/20 text-gray-500 cursor-not-allowed border border-gray-500/20'
                      }`}
                    >
                      {rec.status === 'accepted' ? '✓ Accepted' : 'Accept'}
                    </button>
                    
                    <button
                      onClick={() => handleRecommendationAction(rec.id, 'reject')}
                      disabled={rec.status !== 'pending'}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
                        rec.status === 'rejected'
                          ? 'bg-red-500/30 text-red-400 border border-red-500/50'
                          : rec.status === 'pending'
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                          : 'bg-gray-500/20 text-gray-500 cursor-not-allowed border border-gray-500/20'
                      }`}
                    >
                      {rec.status === 'rejected' ? '✗ Rejected' : 'Reject'}
                    </button>
                    
                    <button
                      onClick={() => handleRecommendationAction(rec.id, 'modify')}
                      disabled={rec.status !== 'pending'}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
                        rec.status === 'modified'
                          ? 'bg-blue-500/30 text-blue-400 border border-blue-500/50'
                          : rec.status === 'pending'
                          ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30'
                          : 'bg-gray-500/20 text-gray-500 cursor-not-allowed border border-gray-500/20'
                      }`}
                    >
                      {rec.status === 'modified' ? '⚙ Modified' : 'Modify'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
