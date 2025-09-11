"use client";

import { useState } from 'react';

export default function StorageManagement() {
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);

  const storageUnits = [
    {
      id: 'BESS-001',
      name: 'Central Battery Bank',
      capacity: '500 kWh',
      currentLevel: 85,
      chargeRate: '+125 kW',
      dischargeRate: '-150 kW',
      currentMode: 'Charging',
      health: 98,
      efficiency: 92,
      location: 'Central Grid Station A',
      status: 'Active',
      type: 'Lithium-ion',
      temperature: '24°C',
      cycles: 1247,
      lastMaintenance: '15 days ago',
    },
    {
      id: 'BESS-002',
      name: 'Industrial Zone Storage',
      capacity: '750 kWh',
      currentLevel: 67,
      chargeRate: '+200 kW',
      dischargeRate: '-220 kW',
      currentMode: 'Discharging',
      health: 95,
      efficiency: 89,
      location: 'Industrial Zone B',
      status: 'Active',
      type: 'Lithium-ion',
      temperature: '26°C',
      cycles: 892,
      lastMaintenance: '8 days ago',
    },
    {
      id: 'HYDRO-001',
      name: 'Pumped Hydro Storage',
      capacity: '2000 kWh',
      currentLevel: 45,
      chargeRate: '+300 kW',
      dischargeRate: '-280 kW',
      currentMode: 'Standby',
      health: 88,
      efficiency: 78,
      location: 'Mountain Region C',
      status: 'Maintenance',
      type: 'Pumped Hydro',
      temperature: '18°C',
      cycles: 2156,
      lastMaintenance: '2 days ago',
    },
    {
      id: 'BESS-003',
      name: 'Residential South Grid',
      capacity: '300 kWh',
      currentLevel: 92,
      chargeRate: '+75 kW',
      dischargeRate: '-85 kW',
      currentMode: 'Charging',
      health: 99,
      efficiency: 94,
      location: 'Residential South',
      status: 'Active',
      type: 'Lithium-ion',
      temperature: '22°C',
      cycles: 456,
      lastMaintenance: '22 days ago',
    },
    {
      id: 'FLOW-001',
      name: 'Flow Battery System',
      capacity: '1200 kWh',
      currentLevel: 78,
      chargeRate: '+180 kW',
      dischargeRate: '-175 kW',
      currentMode: 'Discharging',
      health: 91,
      efficiency: 85,
      location: 'Commercial District D',
      status: 'Active',
      type: 'Vanadium Flow',
      temperature: '25°C',
      cycles: 1834,
      lastMaintenance: '12 days ago',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-400';
      case 'Maintenance':
        return 'text-yellow-400';
      case 'Offline':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'Charging':
        return 'text-green-400';
      case 'Discharging':
        return 'text-orange-400';
      case 'Standby':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getChargeColor = (charge: number) => {
    if (charge >= 80) return 'bg-green-500';
    if (charge >= 50) return 'bg-yellow-500';
    if (charge >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'text-green-400';
    if (health >= 85) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">Storage Management</h1>
        <p className="text-gray-400">Monitor and manage energy storage systems across the grid</p>
      </div>

      {/* Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Total Storage Capacity</h3>
          <p className="text-2xl font-bold text-white">3.25 MWh</p>
          <p className="text-xs text-gray-500 mt-1">Maximum grid storage</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Current Stored Energy</h3>
          <p className="text-2xl font-bold text-green-400">2.1 MWh</p>
          <p className="text-xs text-gray-500 mt-1">65% capacity utilized</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Number of Storage Units</h3>
          <p className="text-2xl font-bold text-blue-400">8 Units</p>
          <p className="text-xs text-gray-500 mt-1">6 active, 2 standby</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Charge/Discharge Status</h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-2xl font-bold text-green-400">Charging</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">+125 kW net flow</p>
        </div>
      </div>

      {/* Storage Unit List */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Storage Unit List</h2>
          <p className="text-sm text-gray-400">Click on any storage unit to view detailed graphs and metrics</p>
        </div>
        <div className="divide-y divide-gray-700">
          {storageUnits.map((unit) => (
            <div
              key={unit.id}
              className={`p-6 hover:bg-gray-750 transition-colors cursor-pointer ${
                selectedStorage === unit.id ? 'bg-gray-750 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => setSelectedStorage(selectedStorage === unit.id ? null : unit.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-lg font-semibold text-white">{unit.name}</h3>
                    <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">{unit.id}</span>
                    <span className={`text-sm font-medium ${getStatusColor(unit.status)}`}>
                      {unit.status}
                    </span>
                    <span className={`text-sm font-medium ${getModeColor(unit.currentMode)}`}>
                      {unit.currentMode}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-400">Capacity</p>
                      <p className="text-sm text-white font-medium">{unit.capacity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Current Level</p>
                      <p className="text-sm text-white font-medium">{unit.currentLevel}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Charge Rate</p>
                      <p className="text-sm text-green-400 font-medium">{unit.chargeRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Health Status</p>
                      <p className={`text-sm font-medium ${getHealthColor(unit.health)}`}>{unit.health}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Location</p>
                      <p className="text-sm text-white">{unit.location}</p>
                    </div>
                  </div>

                  {/* Charge Level Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getChargeColor(unit.currentLevel)}`}
                      style={{ width: `${unit.currentLevel}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{unit.type}</span>
                    <span>Efficiency: {unit.efficiency}%</span>
                  </div>
                </div>

                <div className="ml-6 flex flex-col gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                    View Details
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors">
                    Configure
                  </button>
                </div>
              </div>

              {/* Expanded Details with Graphs */}
              {selectedStorage === unit.id && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Performance Chart */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-white mb-4">Performance History</h4>
                      <div className="h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                        <svg viewBox="0 0 400 200" className="w-full h-full">
                          {/* Grid lines */}
                          <defs>
                            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="1"/>
                            </pattern>
                          </defs>
                          <rect width="400" height="200" fill="url(#grid)" />
                          
                          {/* Performance line */}
                          <polyline
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="2"
                            points="0,160 40,140 80,120 120,100 160,90 200,85 240,80 280,75 320,70 360,65 400,60"
                          />
                          
                          {/* Current level indicator */}
                          <circle cx="400" cy="60" r="4" fill="#10B981" />
                          
                          {/* Labels */}
                          <text x="10" y="190" fill="#9CA3AF" fontSize="12">0h</text>
                          <text x="350" y="190" fill="#9CA3AF" fontSize="12">24h</text>
                          <text x="10" y="15" fill="#9CA3AF" fontSize="12">100%</text>
                          <text x="10" y="195" fill="#9CA3AF" fontSize="12">0%</text>
                        </svg>
                      </div>
                    </div>

                    {/* Charge/Discharge Chart */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-white mb-4">Charge/Discharge Rate</h4>
                      <div className="h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                        <svg viewBox="0 0 400 200" className="w-full h-full">
                          <rect width="400" height="200" fill="url(#grid)" />
                          
                          {/* Charge rate bars */}
                          <rect x="50" y="60" width="30" height="40" fill="#10B981" />
                          <rect x="100" y="80" width="30" height="20" fill="#10B981" />
                          <rect x="150" y="40" width="30" height="60" fill="#10B981" />
                          <rect x="200" y="70" width="30" height="30" fill="#10B981" />
                          <rect x="250" y="50" width="30" height="50" fill="#10B981" />
                          <rect x="300" y="30" width="30" height="70" fill="#10B981" />
                          
                          {/* Discharge rate bars (negative) */}
                          <rect x="50" y="100" width="30" height="60" fill="#F59E0B" />
                          <rect x="100" y="100" width="30" height="40" fill="#F59E0B" />
                          <rect x="150" y="100" width="30" height="80" fill="#F59E0B" />
                          <rect x="200" y="100" width="30" height="50" fill="#F59E0B" />
                          <rect x="250" y="100" width="30" height="70" fill="#F59E0B" />
                          <rect x="300" y="100" width="30" height="90" fill="#F59E0B" />
                          
                          {/* Center line */}
                          <line x1="0" y1="100" x2="400" y2="100" stroke="#6B7280" strokeWidth="1" strokeDasharray="5,5"/>
                          
                          <text x="10" y="190" fill="#9CA3AF" fontSize="12">0h</text>
                          <text x="350" y="190" fill="#9CA3AF" fontSize="12">24h</text>
                          <text x="10" y="15" fill="#10B981" fontSize="12">+kW</text>
                          <text x="10" y="195" fill="#F59E0B" fontSize="12">-kW</text>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Current Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">Current Mode</span>
                          <span className={`text-sm font-medium ${getModeColor(unit.currentMode)}`}>{unit.currentMode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">Charge Rate</span>
                          <span className="text-sm text-green-400">{unit.chargeRate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">Discharge Rate</span>
                          <span className="text-sm text-orange-400">{unit.dischargeRate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">Efficiency</span>
                          <span className="text-sm text-white">{unit.efficiency}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Health & Status</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">Health Score</span>
                          <span className={`text-sm font-medium ${getHealthColor(unit.health)}`}>{unit.health}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">Temperature</span>
                          <span className="text-sm text-white">{unit.temperature}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">Cycles</span>
                          <span className="text-sm text-white">{unit.cycles.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">Last Maintenance</span>
                          <span className="text-sm text-white">{unit.lastMaintenance}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-3">System Info</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">Unit ID</span>
                          <span className="text-sm text-white">{unit.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">Type</span>
                          <span className="text-sm text-white">{unit.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">Location</span>
                          <span className="text-sm text-white">{unit.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">Status</span>
                          <span className={`text-sm font-medium ${getStatusColor(unit.status)}`}>{unit.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
