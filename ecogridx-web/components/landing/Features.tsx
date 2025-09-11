import { BoltIcon, LeafIcon, ChartIcon, BatteryIcon, TargetIcon, CpuIcon } from '../icons/LandingIcons';

export default function Features() {
  const features = [
    {
      icon: <BoltIcon />,
      title: "Real-Time Optimization",
      description: "AI-driven decisions every 15 minutes to balance supply, demand, and storage across the entire grid network.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <LeafIcon />,
      title: "Renewable Integration", 
      description: "Maximizes solar and wind utilization while maintaining grid stability through intelligent storage management.",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: <ChartIcon />,
      title: "Predictive Analytics",
      description: "Advanced forecasting for demand patterns, weather conditions, and optimal dispatch strategies.",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: <BatteryIcon />,
      title: "Storage Orchestration",
      description: "Intelligent battery management to store excess renewable energy and release it when needed most.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: <TargetIcon />,
      title: "Cost Optimization",
      description: "Reduces operational costs while maintaining grid reliability through intelligent resource allocation and automated dispatch optimization.",
      gradient: "from-red-400 to-rose-500"
    },
    {
      icon: <CpuIcon />,
      title: "Physics-Aware Simulation",
      description: "Realistic modeling including AC power flow, voltage limits, and transmission line constraints.",
      gradient: "from-indigo-400 to-purple-500"
    }
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Cutting-Edge Features
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built with modern AI and engineering principles to deliver unparalleled grid optimization performance
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-105 min-h-[320px] flex flex-col">
                <div className="mb-6 text-white">{feature.icon}</div>
                <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



