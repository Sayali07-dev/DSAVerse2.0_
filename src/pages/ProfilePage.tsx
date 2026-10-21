import React from 'react';
import { Trophy, Flame, Award, ShieldCheck } from 'lucide-react';
import { mockUser } from '../data/dsaData';
import { ProgressBar } from '../components/ProgressBar';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { userProfile } = useAuth();
  const { solvedCount, totalProblems, overallProgress, topicsCompleted, totalTopics, readinessScore } = useProgress();

  const achievements = [
    { id: '1', title: 'First Problem', desc: 'Solved your first C++ problem on DSAverse', icon: '01', unlocked: solvedCount >= 1, date: 'Aug 01, 2026' },
    { id: '2', title: '7 Day Streak', desc: 'Maintained a 7-day continuous coding streak', icon: '7D', unlocked: true, date: 'Aug 07, 2026' },
    { id: '3', title: '25 Problems Mastered', desc: 'Solved 25 curated C++ DSA problems', icon: '25', unlocked: solvedCount >= 25, date: solvedCount >= 25 ? 'Unlocked' : 'Locked' },
    { id: '4', title: 'Tree Explorer', desc: 'Complete Binary Tree BFS & DFS traversals', icon: 'TR', unlocked: false, date: 'Locked' },
    { id: '5', title: 'Speed Solver', desc: 'Solve an Easy C++ problem in under 5 minutes', icon: '5M', unlocked: true, date: 'Aug 13, 2026' }
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      
      {/* Profile Header Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-950/80 via-teal-950/50 to-emerald-950/80 border border-teal-500/30 glass-panel shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <img
            src={mockUser.avatar}
            alt={userProfile?.displayName || mockUser.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-teal-500/50 shadow-xl"
          />
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-theme-text">{userProfile?.displayName || mockUser.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {overallProgress >= 75 ? 'Advanced' : overallProgress >= 30 ? 'Intermediate' : 'Beginner'}
              </span>
            </div>
            <p className="text-xs text-theme-text-muted font-mono">{mockUser.role}</p>
            <div className="pt-1 flex items-center space-x-4 text-xs text-theme-text-muted font-mono">
              <span className="flex items-center text-amber-400"><Flame className="w-3.5 h-3.5 mr-1" /> {mockUser.currentStreak} Day Streak</span>
              <span className="flex items-center text-emerald-400"><Trophy className="w-3.5 h-3.5 mr-1" /> Score: {readinessScore}/100</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-right shrink-0">
          <div className="text-xs text-theme-text-muted">Overall Progress</div>
          <div className="text-3xl font-black text-theme-text font-mono">{overallProgress}%</div>
          <ProgressBar progress={overallProgress} color="teal" height="sm" className="w-36 ml-auto" />
        </div>
      </div>

      {/* Grid: Achievements + Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Achievements List */}
        <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <h3 className="text-base font-bold text-theme-text flex items-center">
              <Award className="w-4 h-4 mr-2 text-amber-400" /> Unlockable Achievements
            </h3>
            <span className="text-xs font-mono text-teal-400">{unlockedCount} / {achievements.length} Unlocked</span>
          </div>

          <div className="space-y-3">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  ach.unlocked
                    ? 'bg-theme-card/80 border-teal-500/30'
                    : 'bg-theme-card/30 border-theme-border opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold flex items-center justify-center">{ach.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-theme-text">{ach.title}</h4>
                    <p className="text-[11px] text-theme-text-muted mt-0.5">{ach.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-theme-text-muted">{ach.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary Panel */}
        <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <h3 className="text-base font-bold text-theme-text flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-emerald-400" /> DSA Readiness Breakdown
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center p-3 rounded-xl bg-theme-card border border-theme-border">
              <span className="text-theme-text-muted">Topics Completed</span>
              <span className="font-mono font-bold text-teal-400">{topicsCompleted} / {totalTopics}</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-theme-card border border-theme-border">
              <span className="text-theme-text-muted">Total Problems Solved</span>
              <span className="font-mono font-bold text-blue-400">{solvedCount} / {totalProblems}</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-theme-card border border-theme-border">
              <span className="text-theme-text-muted">Longest Streak Record</span>
              <span className="font-mono font-bold text-amber-400">{mockUser.longestStreak} Days</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-theme-card border border-theme-border">
              <span className="text-theme-text-muted">Average Problem Time</span>
              <span className="font-mono font-bold text-emerald-400">14.5 mins</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
