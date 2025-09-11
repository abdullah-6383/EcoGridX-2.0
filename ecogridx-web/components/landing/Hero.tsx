export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300">AI-Powered Smart Grid Revolution</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
          <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
            Intelligent Energy
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Distribution
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Advanced AI research project showcasing reinforcement learning applied to smart grid optimization, 
          demonstrating 18% cost reduction and improved renewable energy utilization.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a href="/demo" className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl font-bold text-lg text-gray-900 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 inline-block">
            <span className="relative z-10">Try Interactive Demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          
          <a href="#technology" className="px-8 py-4 border-2 border-white/20 rounded-2xl font-bold text-lg hover:bg-white/5 hover:border-emerald-400/50 transition-all duration-300">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}



