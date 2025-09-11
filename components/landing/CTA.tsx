import Link from 'next/link';

export default function CTA() {
  return (
    <section id="demo" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
            <h3 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Ready to Transform Your Grid?
              </span>
            </h3>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              A showcase of advanced AI and reinforcement learning applied to smart grid optimization. Built with cutting-edge technology for research and demonstration purposes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/demo" className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl font-bold text-lg text-gray-900 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 inline-block">
                <span className="relative z-10">Launch Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <a href="#technology" className="px-8 py-4 border-2 border-white/20 rounded-2xl font-bold text-lg hover:bg-white/5 hover:border-emerald-400/50 transition-all duration-300">
                View Technology
              </a>
            </div>
          </div>
        </div>
    </div>
    </section>
  );
}



