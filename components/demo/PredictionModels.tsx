"use client";

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface ModelConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  architecture: string;
  accuracy: number;
  weeklyChange: number;
  color: string;
  endpoint: (data: any) => Promise<any>;
  historyEndpoint: () => Promise<any>;
  defaultInputs: Record<string, any>;
  fields: FieldConfig[];
}

interface FieldConfig {
  key: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'json-array';
  placeholder?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}

const MODELS: ModelConfig[] = [
  {
    id: 'demand',
    name: 'Energy Demand Predictor',
    description: 'LSTM-based 24-48h energy demand forecasting with 95% accuracy for residential and industrial zones.',
    category: 'Load Forecasting',
    architecture: 'Neural Network',
    accuracy: 92.5,
    weeklyChange: -0.3,
    color: 'orange',
    endpoint: (data: any) => api.ai.demandPrediction(data),
    historyEndpoint: () => api.ai.demandHistory(),
    defaultInputs: {
      historical_data: [120, 135, 142, 155, 168, 175, 160, 145, 130, 125, 118, 140, 155, 170, 185, 195, 200, 190, 175, 160, 145, 135, 128, 122],
      location: 'Central Grid',
      season: 'summer',
      time_of_day: 'morning',
    },
    fields: [
      { key: 'location', label: 'Location', type: 'text', placeholder: 'e.g. Central Grid' },
      { key: 'season', label: 'Season', type: 'select', options: [
        { value: 'summer', label: 'Summer' }, { value: 'winter', label: 'Winter' },
        { value: 'spring', label: 'Spring' }, { value: 'autumn', label: 'Autumn' },
      ]},
      { key: 'time_of_day', label: 'Time of Day', type: 'select', options: [
        { value: 'morning', label: 'Morning' }, { value: 'afternoon', label: 'Afternoon' },
        { value: 'evening', label: 'Evening' }, { value: 'night', label: 'Night' },
      ]},
    ],
  },
  {
    id: 'solar',
    name: 'Solar Generation Predictor',
    description: 'Gradient Boosting Machine for solar output forecasting with weather data integration.',
    category: 'Renewable Energy',
    architecture: 'Real-time',
    accuracy: 96.2,
    weeklyChange: 2.1,
    color: 'green',
    endpoint: (data: any) => api.ai.renewableForecast(data),
    historyEndpoint: () => api.ai.renewableHistory(),
    defaultInputs: {
      temperature: 32,
      wind_speed: 12,
      cloud_cover: 25,
      humidity: 60,
      solar_capacity_kw: 500,
      wind_capacity_kw: 300,
    },
    fields: [
      { key: 'temperature', label: 'Temperature (°C)', type: 'number', min: -20, max: 50, step: 0.5 },
      { key: 'wind_speed', label: 'Wind Speed (m/s)', type: 'number', min: 0, max: 100, step: 0.5 },
      { key: 'cloud_cover', label: 'Cloud Cover (%)', type: 'number', min: 0, max: 100, step: 1 },
      { key: 'humidity', label: 'Humidity (%)', type: 'number', min: 0, max: 100, step: 1 },
      { key: 'solar_capacity_kw', label: 'Solar Capacity (kW)', type: 'number', min: 0, step: 10 },
      { key: 'wind_capacity_kw', label: 'Wind Capacity (kW)', type: 'number', min: 0, step: 10 },
    ],
  },
  {
    id: 'storage',
    name: 'Storage Charge Predictor',
    description: 'Deep Q-Network agent for real-time grid optimization and storage management decisions.',
    category: 'Battery Management',
    architecture: 'Adaptive',
    accuracy: 95.8,
    weeklyChange: 1.7,
    color: 'green',
    endpoint: (data: any) => api.ai.gridOptimize(data),
    historyEndpoint: () => api.ai.gridOptimizeHistory(),
    defaultInputs: {
      current_load_kw: 1200,
      available_sources: [
        { name: 'Solar Farm A', capacity_kw: 500, current_output_kw: 380, cost_per_kwh: 0.03 },
        { name: 'Wind Farm B', capacity_kw: 300, current_output_kw: 210, cost_per_kwh: 0.04 },
        { name: 'Gas Turbine', capacity_kw: 800, current_output_kw: 600, cost_per_kwh: 0.12 },
      ],
      storage_level_percent: 65,
      demand_forecast: [1200, 1150, 1100, 1050, 1000, 980, 1020, 1100, 1250, 1400, 1500, 1550, 1600, 1580, 1520, 1450, 1380, 1420, 1500, 1480, 1350, 1250, 1180, 1150],
    },
    fields: [
      { key: 'current_load_kw', label: 'Current Load (kW)', type: 'number', min: 0, step: 10 },
      { key: 'storage_level_percent', label: 'Storage Level (%)', type: 'number', min: 0, max: 100, step: 1 },
    ],
  },
  {
    id: 'failure',
    name: 'Equipment Failure Predictor',
    description: 'Ensemble ML combining Random Forest + XGBoost for predictive maintenance and failure detection.',
    category: 'Predictive Maintenance',
    architecture: 'Ensemble ML',
    accuracy: 91.4,
    weeklyChange: 0.5,
    color: 'yellow',
    endpoint: (data: any) => api.ai.failurePredict(data),
    historyEndpoint: () => api.ai.failureHistory(),
    defaultInputs: {
      equipment: [
        { id: 'TR-001', name: 'Transformer Alpha-7', temperature: 78, vibration: 3.2, load_cycles: 12500, age_years: 8.5, last_maintenance_days: 45 },
        { id: 'CB-045', name: 'Circuit Breaker CB-45', temperature: 52, vibration: 1.1, load_cycles: 8900, age_years: 5.2, last_maintenance_days: 15 },
        { id: 'TL-047', name: 'Transmission Line TL-47', temperature: 65, vibration: 2.8, load_cycles: 15600, age_years: 12, last_maintenance_days: 90 },
      ],
    },
    fields: [],
  },
  {
    id: 'loadbalance',
    name: 'Wind Generation Predictor',
    description: 'Multi-Agent Reinforcement Learning system for distributed grid load balancing optimization.',
    category: 'Weather Dependent',
    architecture: 'ML Model',
    accuracy: 89.3,
    weeklyChange: 0.8,
    color: 'orange',
    endpoint: (data: any) => api.ai.loadBalance(data),
    historyEndpoint: () => api.ai.loadBalanceHistory(),
    defaultInputs: {
      zones: [
        { id: 'zone-1', name: 'Residential North', current_load_kw: 800, capacity_kw: 1200 },
        { id: 'zone-2', name: 'Industrial East', current_load_kw: 1500, capacity_kw: 2000 },
        { id: 'zone-3', name: 'Commercial West', current_load_kw: 600, capacity_kw: 900 },
        { id: 'zone-4', name: 'Residential South', current_load_kw: 700, capacity_kw: 1100 },
      ],
      transfer_limits: [
        { from_zone: 'zone-1', to_zone: 'zone-2', max_kw: 300 },
        { from_zone: 'zone-2', to_zone: 'zone-3', max_kw: 250 },
        { from_zone: 'zone-3', to_zone: 'zone-4', max_kw: 200 },
        { from_zone: 'zone-4', to_zone: 'zone-1', max_kw: 250 },
      ],
    },
    fields: [],
  },
];

export default function PredictionModels() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [historyCount, setHistoryCount] = useState<Record<string, number>>({});
  const [liveAccuracy, setLiveAccuracy] = useState<Record<string, number>>({});

  // Fetch prediction counts from history endpoints
  useEffect(() => {
    MODELS.forEach((model) => {
      model.historyEndpoint().then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setHistoryCount((prev) => ({ ...prev, [model.id]: res.data.length }));
          const confidences = res.data
            .map((d: any) => d.result?.confidence ?? d.result?.confidence_score)
            .filter((c: any) => typeof c === 'number');
          if (confidences.length > 0) {
            const avg = confidences.reduce((a: number, b: number) => a + b, 0) / confidences.length;
            setLiveAccuracy((prev) => ({ ...prev, [model.id]: parseFloat(avg.toFixed(1)) }));
          }
        }
      }).catch(() => {});
    });
  }, []);

  const getModel = (id: string) => MODELS.find((m) => m.id === id)!;

  const handleSelectModel = (id: string) => {
    if (selectedModel === id) {
      setSelectedModel(null);
      setResult(null);
      setError(null);
      return;
    }
    setSelectedModel(id);
    setResult(null);
    setError(null);
    const model = getModel(id);
    setInputs(JSON.parse(JSON.stringify(model.defaultInputs)));
  };

  const handleInputChange = (key: string, value: any) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleRunPrediction = async () => {
    if (!selectedModel) return;
    const model = getModel(selectedModel);
    setIsRunning(true);
    setResult(null);
    setError(null);
    try {
      const res = await model.endpoint(inputs);
      if (res.success) {
        setResult(res.data);
        // Update history count
        setHistoryCount((prev) => ({ ...prev, [model.id]: (prev[model.id] || 0) + 1 }));
      } else {
        setError(res.message || 'Prediction failed');
      }
    } catch (e: any) {
      setError(e.message || 'Network error — is the backend running?');
    } finally {
      setIsRunning(false);
    }
  };

  const getColorClasses = (color: string) => {
    const map: Record<string, { bg: string; text: string; border: string; badge: string; ring: string }> = {
      green: { bg: 'from-green-900/20 to-emerald-900/10', text: 'text-green-400', border: 'border-green-500/20', badge: 'bg-green-500', ring: 'ring-green-500/30' },
      orange: { bg: 'from-orange-900/20 to-amber-900/10', text: 'text-orange-400', border: 'border-orange-500/20', badge: 'bg-orange-500', ring: 'ring-orange-500/30' },
      yellow: { bg: 'from-yellow-900/20 to-amber-900/10', text: 'text-yellow-400', border: 'border-yellow-500/20', badge: 'bg-yellow-500', ring: 'ring-yellow-500/30' },
      blue: { bg: 'from-blue-900/20 to-cyan-900/10', text: 'text-blue-400', border: 'border-blue-500/20', badge: 'bg-blue-500', ring: 'ring-blue-500/30' },
    };
    return map[color] || map.green;
  };

  const avgAccuracy = MODELS.reduce((sum, m) => sum + (liveAccuracy[m.id] ?? m.accuracy), 0) / MODELS.length;
  const modelsAbove90 = MODELS.filter((m) => (liveAccuracy[m.id] ?? m.accuracy) >= 90).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent mb-2">
          AI Prediction Models
        </h1>
        <p className="text-gray-400">View, configure, and run predictions with all 5 AI models powering EcoGridX</p>
      </div>

      {/* Best Performing Models - Card from Screenshot */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Best Performing Models</h3>
          <div className="bg-green-900/30 border border-green-500/40 rounded-full px-3 py-1">
            <span className="text-green-400 text-xs font-medium">Top {MODELS.length} Models</span>
          </div>
        </div>

        <div className="space-y-4">
          {[...MODELS]
            .sort((a, b) => (liveAccuracy[b.id] ?? b.accuracy) - (liveAccuracy[a.id] ?? a.accuracy))
            .map((model, rank) => {
              const c = getColorClasses(model.color);
              const acc = liveAccuracy[model.id] ?? model.accuracy;
              return (
                <div
                  key={model.id}
                  onClick={() => handleSelectModel(model.id)}
                  className={`bg-gradient-to-r ${c.bg} border ${c.border} rounded-lg p-4 cursor-pointer transition-all duration-200 hover:scale-[1.01] ${
                    selectedModel === model.id ? `ring-2 ${c.ring}` : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-8 h-8 ${c.badge} rounded-full text-white font-bold text-sm`}>
                        {rank + 1}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{model.name}</h4>
                        <p className={`${c.text} text-xs`}>{model.category} &bull; {model.architecture}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`${c.text} font-bold text-lg`}>{acc.toFixed(1)}%</div>
                      <div className={`text-xs ${model.weeklyChange >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                        {model.weeklyChange >= 0 ? '+' : ''}{model.weeklyChange}% this week
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        acc >= 95 ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                        acc >= 90 ? 'bg-gradient-to-r from-yellow-500 to-orange-400' :
                        'bg-gradient-to-r from-orange-500 to-red-400'
                      }`}
                      style={{ width: `${acc}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>

        {/* Summary footer */}
        <div className="mt-6 pt-4 border-t border-gray-700 grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-400">{avgAccuracy.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Average Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">{modelsAbove90}/{MODELS.length}</div>
            <div className="text-sm text-gray-400">Models Above 90%</div>
          </div>
        </div>
      </div>

      {/* Selected Model - Input Panel + Results */}
      {selectedModel && (() => {
        const model = getModel(selectedModel);
        const c = getColorClasses(model.color);
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Configuration */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <div className={`w-3 h-3 ${c.badge} rounded-full`} />
                  Configure {model.name}
                </h3>
                <span className="text-xs text-gray-500">{historyCount[model.id] ?? 0} past runs</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">{model.description}</p>

              {/* Dynamic Input Fields */}
              <div className="space-y-4">
                {model.fields.map((field) => (
                  <div key={field.key}>
                    <label className="text-sm text-gray-400 block mb-1.5">{field.label}</label>
                    {field.type === 'select' ? (
                      <select
                        value={inputs[field.key] ?? ''}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-emerald-500 focus:outline-none"
                      >
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : field.type === 'number' ? (
                      <input
                        type="number"
                        value={inputs[field.key] ?? ''}
                        onChange={(e) => handleInputChange(field.key, parseFloat(e.target.value) || 0)}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-emerald-500 focus:outline-none"
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <input
                        type="text"
                        value={inputs[field.key] ?? ''}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-emerald-500 focus:outline-none"
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}

                {/* Show raw JSON preview for complex inputs */}
                {model.fields.length === 0 && (
                  <div>
                    <label className="text-sm text-gray-400 block mb-1.5">Input Data (JSON)</label>
                    <textarea
                      value={JSON.stringify(inputs, null, 2)}
                      onChange={(e) => {
                        try { setInputs(JSON.parse(e.target.value)); } catch {}
                      }}
                      rows={10}
                      className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm font-mono border border-gray-600 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                )}

                {model.fields.length > 0 && Object.keys(inputs).some(k => !model.fields.find(f => f.key === k)) && (
                  <details className="text-sm">
                    <summary className="text-gray-400 cursor-pointer hover:text-white">Advanced inputs (JSON)</summary>
                    <textarea
                      value={JSON.stringify(inputs, null, 2)}
                      onChange={(e) => {
                        try { setInputs(JSON.parse(e.target.value)); } catch {}
                      }}
                      rows={8}
                      className="w-full mt-2 bg-gray-700 text-white rounded-lg px-3 py-2 text-xs font-mono border border-gray-600 focus:border-emerald-500 focus:outline-none"
                    />
                  </details>
                )}
              </div>

              {/* Run Button */}
              <button
                onClick={handleRunPrediction}
                disabled={isRunning}
                className={`mt-6 w-full py-3 rounded-lg font-bold text-white transition-all duration-300 ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 hover:shadow-lg hover:shadow-emerald-500/20'
                }`}
              >
                {isRunning ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Running {model.name}...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Run Prediction
                  </span>
                )}
              </button>

              {/* Reset */}
              <button
                onClick={() => setInputs(JSON.parse(JSON.stringify(model.defaultInputs)))}
                className="mt-2 w-full py-2 rounded-lg text-sm text-gray-400 hover:text-white bg-gray-700/50 hover:bg-gray-700 transition-colors"
              >
                Reset to Defaults
              </button>
            </div>

            {/* Results Panel */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Prediction Results
              </h3>

              {!result && !error && !isRunning && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <svg className="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <p className="text-sm">Configure inputs and click <strong>Run Prediction</strong> to see results</p>
                </div>
              )}

              {isRunning && (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-gray-700 border-t-emerald-400 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-emerald-400 text-xs font-bold">AI</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-4">Gemini AI is processing...</p>
                  <p className="text-gray-500 text-xs mt-1">Using {model.architecture} model</p>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-400 font-medium">Prediction Failed</span>
                  </div>
                  <p className="text-sm text-gray-300">{error}</p>
                </div>
              )}

              {result && (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {/* Render result keys as cards */}
                  {Object.entries(result).map(([key, value]) => (
                    <ResultCard key={key} label={key} value={value} />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function ResultCard({ label, value }: { label: string; value: any }) {
  const formatLabel = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  if (value === null || value === undefined) return null;

  // Numeric values
  if (typeof value === 'number') {
    const isPercent = label.includes('percent') || label.includes('score') || label.includes('factor') || label.includes('confidence');
    return (
      <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
        <div className="text-xs text-gray-400 mb-1">{formatLabel(label)}</div>
        <div className="text-xl font-bold text-emerald-400">
          {isPercent ? `${(value * (value <= 1 ? 100 : 1)).toFixed(1)}%` : value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>
      </div>
    );
  }

  // String values
  if (typeof value === 'string') {
    return (
      <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
        <div className="text-xs text-gray-400 mb-1">{formatLabel(label)}</div>
        <div className="text-sm text-white">{value}</div>
      </div>
    );
  }

  // Array of strings
  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
    return (
      <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
        <div className="text-xs text-gray-400 mb-2">{formatLabel(label)}</div>
        <ul className="space-y-1">
          {value.map((item, i) => (
            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Array of numbers (forecast data) - mini bar chart
  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'number') {
    const max = Math.max(...value);
    return (
      <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
        <div className="text-xs text-gray-400 mb-2">{formatLabel(label)} ({value.length} points)</div>
        <div className="flex items-end gap-[2px] h-16">
          {value.map((v, i) => (
            <div
              key={i}
              className="flex-1 bg-emerald-500/60 hover:bg-emerald-400 rounded-t-sm transition-colors cursor-default"
              style={{ height: `${(v / max) * 100}%` }}
              title={`${i}: ${v.toFixed(1)}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-gray-500 mt-1">
          <span>Min: {Math.min(...value).toFixed(1)}</span>
          <span>Avg: {(value.reduce((a, b) => a + b, 0) / value.length).toFixed(1)}</span>
          <span>Max: {max.toFixed(1)}</span>
        </div>
      </div>
    );
  }

  // Array of objects
  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
    return (
      <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
        <div className="text-xs text-gray-400 mb-2">{formatLabel(label)} ({value.length} items)</div>
        <div className="space-y-2">
          {value.map((item, i) => (
            <div key={i} className="p-2 bg-gray-800/50 rounded-lg text-xs">
              {Object.entries(item).map(([k, v]) => (
                <div key={k} className="flex justify-between py-0.5">
                  <span className="text-gray-400">{formatLabel(k)}</span>
                  <span className="text-white font-medium">
                    {typeof v === 'number' ? v.toLocaleString(undefined, { maximumFractionDigits: 2 }) : String(v)}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Object values
  if (typeof value === 'object' && !Array.isArray(value)) {
    return (
      <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
        <div className="text-xs text-gray-400 mb-2">{formatLabel(label)}</div>
        <div className="space-y-1">
          {Object.entries(value).map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm">
              <span className="text-gray-400">{formatLabel(k)}</span>
              <span className="text-white font-medium">
                {typeof v === 'number' ? v.toLocaleString(undefined, { maximumFractionDigits: 2 }) : String(v)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
