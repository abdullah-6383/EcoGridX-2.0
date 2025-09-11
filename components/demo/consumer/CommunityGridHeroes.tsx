"use client";

import { useState, useEffect } from 'react';

export default function CommunityGridHeroes() {
  const [activeChallenge, setActiveChallenge] = useState(true);
  const [challengeProgress, setChallengeProgress] = useState(67);
  const [userParticipating, setUserParticipating] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'challenges' | 'leaderboard' | 'achievements'>('challenges');
  const [personalStats, setPersonalStats] = useState({
    powerCutsPrevented: 8,
    energySaved: 145.6,
    carbonReduced: 87.3,
    rank: 23,
    challengesCompleted: 15,
    streak: 7
  });

  // Update challenge progress simulation
  useEffect(() => {
    if (activeChallenge && userParticipating) {
      const interval = setInterval(() => {
        setChallengeProgress(prev => Math.min(prev + Math.random() * 2, 100));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeChallenge, userParticipating]);

  // Personal badges
  const badges = [
    {
      id: 1,
      name: 'Peak Saver',
      description: 'Reduced usage during 5 peak challenges',
      icon: '⚡',
      earned: true,
      rarity: 'bronze',
      dateEarned: '2 days ago'
    },
    {
      id: 2,
      name: 'Grid Guardian',
      description: 'Helped prevent 3 power cuts',
      icon: '🛡️',
      earned: true,
      rarity: 'silver',
      dateEarned: '1 week ago'
    },
    {
      id: 3,
      name: 'Community Champion',
      description: 'Top 10% in neighborhood challenges',
      icon: '👑',
      earned: true,
      rarity: 'gold',
      dateEarned: '2 weeks ago'
    },
    {
      id: 4,
      name: 'Energy Saver Master',
      description: 'Reduced consumption by 20% for a month',
      icon: '⭐',
      earned: false,
      progress: 78,
      target: 100
    },
    {
      id: 5,
      name: 'Grid Stability Hero',
      description: 'Participated in 50 grid challenges',
      icon: '🦸',
      earned: false,
      progress: 32,
      target: 50
    }
  ];

  // Neighborhood leaderboard
  const leaderboard = [
    { rank: 1, name: 'Green Valley', participants: 847, score: 2847, badge: '🥇' },
    { rank: 2, name: 'Eco Heights', participants: 623, score: 2634, badge: '🥈' },
    { rank: 3, name: 'Solar Gardens', participants: 756, score: 2489, badge: '🥉' },
    { rank: 4, name: 'Wind Park', participants: 534, score: 2234, badge: '4️⃣' },
    { rank: 5, name: 'Energy Plaza', participants: 689, score: 2156, badge: '5️⃣' },
    { rank: 6, name: 'Smart City', participants: 712, score: 2098, badge: '6️⃣' },
    { rank: 7, name: 'Your Neighborhood', participants: 456, score: 1987, badge: '7️⃣', isUser: true }
  ];

  // Active challenges - Enhanced with more variety
  const challenges = [
    {
      id: 1,
      title: 'Peak Hour Challenge',
      description: 'Reduce community load by 15% during 2-4 PM to prevent power cuts',
      timeLeft: '1h 23m',
      participants: 1247,
      targetReduction: 15,
      currentReduction: challengeProgress,
      reward: 'Grid Stability Badge + Community Recognition',
      status: 'active',
      difficulty: 'Medium',
      type: 'urgent'
    },
    {
      id: 2,
      title: 'Weekend Energy Saver',
      description: 'Keep weekend consumption below weekday average',
      timeLeft: '2 days',
      participants: 2156,
      targetReduction: 10,
      currentReduction: 43,
      reward: 'Energy Saver Badge + ₹50 Bill Credit',
      status: 'upcoming',
      difficulty: 'Easy',
      type: 'scheduled'
    },
    {
      id: 3,
      title: 'Solar Hour Optimization',
      description: 'Maximize usage during solar peak hours (11 AM - 2 PM)',
      timeLeft: '4h 15m',
      participants: 892,
      targetReduction: 20,
      currentReduction: 76,
      reward: 'Solar Champion Badge + ₹100 Credit',
      status: 'active',
      difficulty: 'Hard',
      type: 'optimization'
    }
  ];

  // Recent activity notifications
  const notifications = [
    { id: 1, message: 'You earned the Peak Saver badge!', time: '5 min ago', type: 'achievement' },
    { id: 2, message: 'New challenge started: Solar Hour Optimization', time: '15 min ago', type: 'challenge' },
    { id: 3, message: 'Your neighborhood moved up to 6th place!', time: '1h ago', type: 'leaderboard' },
    { id: 4, message: 'Weekly challenge completed successfully!', time: '2h ago', type: 'success' }
  ];

  // Community feed/activities
  const communityFeed = [
    { user: 'Sarah M.', action: 'prevented a power cut', points: 50, time: '10 min ago' },
    { user: 'Green Valley', action: 'completed weekend challenge', points: 200, time: '1h ago' },
    { user: 'Mike R.', action: 'earned Solar Champion badge', points: 100, time: '2h ago' },
    { user: 'Eco Heights', action: 'reached #2 on leaderboard', points: 300, time: '3h ago' }
  ];

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'bronze': return 'border-orange-600 bg-orange-600/10';
      case 'silver': return 'border-gray-400 bg-gray-400/10';
      case 'gold': return 'border-yellow-400 bg-yellow-400/10';
      default: return 'border-gray-600 bg-gray-600/10';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement': return '🏆';
      case 'challenge': return '⚡';
      case 'leaderboard': return '📊';
      case 'success': return '✅';
      default: return '🔔';
    }
  };

  const joinChallenge = (challengeId: number) => {
    alert(`Joined challenge ${challengeId}! You'll receive notifications about progress.`);
  };

  const setReminder = (challengeId: number) => {
    alert(`Reminder set for challenge ${challengeId}! You'll be notified when it starts.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center relative">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Community "Grid Heroes"
          </span>
        </h1>
        <p className="text-gray-400">Gamified Grid Stability through Community Action</p>
        
        {/* Notifications Bell */}
        <div className="absolute top-0 right-4">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15 21a2 2 0 01-4 0m4 0H9m6 0h1a1 1 0 001-1v-1a7 7 0 00-7-7 7 7 0 00-7 7v1a1 1 0 001 1h1m0 0V9a3 3 0 116 0v10"/>
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </button>
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-600 rounded-xl shadow-xl z-20">
              <div className="p-4 border-b border-gray-700">
                <h4 className="font-bold text-white">Recent Activity</h4>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 border-b border-gray-700/50 hover:bg-gray-800/50">
                    <div className="flex items-start space-x-2">
                      <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                      <div className="flex-1">
                        <div className="text-sm text-white">{notification.message}</div>
                        <div className="text-xs text-gray-400">{notification.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-1 bg-gray-800/50 rounded-xl p-1">
            {[
              { id: 'challenges', label: 'Challenges', icon: '⚡' },
              { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
              { id: 'achievements', label: 'Achievements', icon: '🎖️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                  selectedTab === tab.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Challenge Alert */}
      {activeChallenge && (
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <h3 className="text-xl font-bold text-red-400">🚨 GRID UNDER STRAIN!</h3>
            </div>
            <div className="text-sm text-gray-400">Ends in 1h 23m</div>
          </div>
          
          <p className="text-white mb-4">
            Help us prevent a power cut in your area by reducing usage for the next hour. 
            Join <span className="text-yellow-400 font-bold">1,247 neighbors</span> already participating!
          </p>

          {/* Challenge Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">Community Progress</span>
              <span className="text-yellow-400 font-bold">{challengeProgress.toFixed(1)}% of 15% target</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className={`h-4 rounded-full transition-all duration-1000 ${
                  challengeProgress >= 15 ? 'bg-green-400' : 'bg-yellow-400'
                }`}
                style={{ width: `${Math.min((challengeProgress / 15) * 100, 100)}%` }}
              ></div>
            </div>
            {challengeProgress >= 15 && (
              <div className="text-green-400 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Target achieved! Power cut prevented!
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            {!userParticipating ? (
              <button 
                onClick={() => setUserParticipating(true)}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                🛡️ Join the Challenge
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30">
                  ✅ You're participating!
                </div>
                <button 
                  onClick={() => setUserParticipating(false)}
                  className="px-4 py-2 bg-gray-600/20 text-gray-400 rounded-lg border border-gray-600/30 hover:bg-gray-600/30 transition-colors"
                >
                  Leave Challenge
                </button>
              </div>
            )}
            <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-colors">
              View Details
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Impact Dashboard */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
            Your Impact Dashboard
          </h3>

          {/* Personal Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">{personalStats.powerCutsPrevented}</div>
              <div className="text-sm text-gray-400">Power Cuts Prevented</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">#{personalStats.rank}</div>
              <div className="text-sm text-gray-400">Community Rank</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">{personalStats.energySaved}</div>
              <div className="text-sm text-gray-400">kWh Saved</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">{personalStats.carbonReduced}</div>
              <div className="text-sm text-gray-400">kg CO₂ Reduced</div>
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">{personalStats.challengesCompleted}</div>
              <div className="text-sm text-gray-400">Challenges Completed</div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-pink-400 mb-1">{personalStats.streak} days</div>
              <div className="text-sm text-gray-400">Current Streak</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => alert('Opening challenge history...')}
                className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-colors text-sm"
              >
                View History
              </button>
              <button 
                onClick={() => alert('Opening sharing options...')}
                className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-colors text-sm"
              >
                Share Stats
              </button>
            </div>
          </div>

          {/* Achievement Badges */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">🏆 Your Badges</h4>
            <div className="grid grid-cols-1 gap-3">
              {badges.map((badge) => (
                <div 
                  key={badge.id}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    badge.earned 
                      ? getBadgeRarityColor(badge.rarity || 'bronze')
                      : 'border-gray-600 bg-gray-800/30 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`text-2xl ${badge.earned ? '' : 'grayscale'}`}>
                      {badge.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold ${badge.earned ? 'text-white' : 'text-gray-500'}`}>
                        {badge.name}
                      </div>
                      <div className="text-sm text-gray-400">{badge.description}</div>
                      
                      {badge.earned ? (
                        <div className="text-xs text-green-400 mt-1">
                          Earned {badge.dateEarned}
                        </div>
                      ) : (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{badge.progress}/{badge.target}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                              style={{ width: `${((badge.progress || 0) / (badge.target || 100)) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Neighborhood Leaderboard */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
            Neighborhood Leaderboard
          </h3>

          <div className="space-y-3">
            {leaderboard.map((neighborhood) => (
              <div 
                key={neighborhood.rank}
                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                  neighborhood.isUser 
                    ? 'bg-purple-500/20 border border-purple-400/30' 
                    : 'bg-gray-800/30 hover:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{neighborhood.badge}</div>
                  <div>
                    <div className={`font-bold ${neighborhood.isUser ? 'text-purple-400' : 'text-white'}`}>
                      {neighborhood.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {neighborhood.participants} participants
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-bold ${neighborhood.isUser ? 'text-purple-400' : 'text-yellow-400'}`}>
                    {neighborhood.score}
                  </div>
                  <div className="text-xs text-gray-400">points</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <div className="text-sm text-blue-400 font-medium mb-2">🎯 This Month's Goal</div>
            <div className="text-sm text-gray-300">
              Reach top 5 to unlock <span className="text-yellow-400">Community Solar Discount</span> for all residents!
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Your neighborhood needs 213 more points to reach 5th place.
            </div>
          </div>
        </div>
      </div>

      {/* Live Community Challenges */}
      <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <div className="w-3 h-3 bg-orange-400 rounded-full mr-3 animate-pulse"></div>
          Live Community Challenges
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {challenges.map((challenge) => (
            <div 
              key={challenge.id}
              className={`p-6 rounded-xl border transition-all duration-300 ${
                challenge.status === 'active' 
                  ? 'bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30' 
                  : 'bg-gray-800/30 border-gray-700/50'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-bold text-white">{challenge.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
              </div>

              <p className="text-gray-300 text-sm mb-4">{challenge.description}</p>

              {/* Challenge Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-yellow-400">{challenge.currentReduction}% of {challenge.targetReduction}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      challenge.currentReduction >= challenge.targetReduction ? 'bg-green-400' : 'bg-orange-400'
                    }`}
                    style={{ width: `${Math.min((challenge.currentReduction / challenge.targetReduction) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Challenge Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Time Remaining:</span>
                  <span className="text-orange-400 font-medium">{challenge.timeLeft}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Participants:</span>
                  <span className="text-cyan-400">{challenge.participants.toLocaleString()}</span>
                </div>
              </div>

              {/* Reward */}
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-4">
                <div className="text-xs text-gray-400 mb-1">Reward:</div>
                <div className="text-sm text-yellow-400 font-medium">{challenge.reward}</div>
              </div>

              {challenge.status === 'active' ? (
                <button 
                  onClick={() => joinChallenge(challenge.id)}
                  className="w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Join Challenge
                </button>
              ) : (
                <button 
                  onClick={() => setReminder(challenge.id)}
                  className="w-full py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                >
                  Set Reminder
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Community Activity Feed */}
      <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></div>
          Live Community Activity
        </h3>

        <div className="space-y-3">
          {communityFeed.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center text-sm font-bold text-white">
                  {activity.user.charAt(0)}
                </div>
                <div>
                  <span className="text-white font-medium">{activity.user}</span>
                  <span className="text-gray-400 ml-2">{activity.action}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold">+{activity.points}</div>
                <div className="text-xs text-gray-400">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button 
            onClick={() => alert('Opening full activity feed...')}
            className="px-6 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
          >
            View All Activity
          </button>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6">
        <h4 className="text-lg font-bold text-green-400 mb-4">🌱 Community Impact This Month</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-400 mb-1">23</div>
            <div className="text-sm text-gray-400">Power Cuts Prevented</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400 mb-1">12,456</div>
            <div className="text-sm text-gray-400">kWh Saved</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400 mb-1">8.2 tons</div>
            <div className="text-sm text-gray-400">CO₂ Reduced</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400 mb-1">₹45,678</div>
            <div className="text-sm text-gray-400">Community Savings</div>
          </div>
        </div>
      </div>
    </div>
  );
}