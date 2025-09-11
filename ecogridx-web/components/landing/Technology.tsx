export default function Technology() {
  return (
    <section id="technology" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Advanced Technology Stack
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Built on cutting-edge AI and simulation technologies to deliver enterprise-grade performance and reliability.
            </p>
            
            <div className="space-y-8">
              {[
                { title: "Reinforcement Learning", desc: "PPO algorithm trained on physics-based grid simulation" },
                { title: "AC Power Flow", desc: "Realistic electrical modeling with voltage and thermal constraints" },
                { title: "Real-Time Processing", desc: "Sub-second decision making for dynamic grid conditions" }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-8 text-center">Live Performance Dashboard</h3>
              <div className="space-y-6">
                {[
                  { label: "Grid Efficiency", value: "94.7%", width: "94.7%" },
                  { label: "Response Time", value: "0.3s", width: "85%" },
                  { label: "Renewable Integration", value: "78.2%", width: "78.2%" }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-emerald-400 font-mono font-bold">{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-emerald-400 to-cyan-500 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: item.width }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



