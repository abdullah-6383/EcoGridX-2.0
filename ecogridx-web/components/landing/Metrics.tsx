export default function Metrics() {
  const metrics = [
    { value: "18%", label: "Cost Reduction", sublabel: "vs traditional methods", prefix: "-", color: "from-green-400 to-emerald-500" },
    { value: "30%", label: "Unmet Demand", sublabel: "improvement over baseline", prefix: "-", color: "from-blue-400 to-cyan-500" },
    { value: "14%", label: "Renewable Utilization", sublabel: "through smart storage", prefix: "+", color: "from-emerald-400 to-green-500" },
    { value: "99.7%", label: "Grid Reliability", sublabel: "uptime maintained", prefix: "", color: "from-purple-400 to-pink-500" }
  ];

  return (
    <section id="metrics" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Proven Performance
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real metrics from our AI-optimized smart grid simulation demonstrating significant improvements
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-105">
                <div className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.prefix}{metric.value}
                </div>
                <div className="text-xl font-semibold text-white mb-2">
                  {metric.label}
                </div>
                <div className="text-sm text-gray-400">
                  {metric.sublabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



