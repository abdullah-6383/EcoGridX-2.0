export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-bg opacity-50" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern" />
      
      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
    </div>
  );
}



