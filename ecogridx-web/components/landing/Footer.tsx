export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl"></div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              EcoGridX
            </span>
          </div>
          
          <div className="flex items-center space-x-8">
            <a href="#features" className="text-gray-400 hover:text-emerald-400 transition-colors">Features</a>
            <a href="#metrics" className="text-gray-400 hover:text-emerald-400 transition-colors">Performance</a>
            <a href="#technology" className="text-gray-400 hover:text-emerald-400 transition-colors">Technology</a>
            <a href="#demo" className="text-gray-400 hover:text-emerald-400 transition-colors">Demo</a>
          </div>
          
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} EcoGridX. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}



