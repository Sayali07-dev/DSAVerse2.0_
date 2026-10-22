<<<<<<< HEAD
import React from 'react';
import { Trophy, Flame, Award, ShieldCheck } from 'lucide-react';
=======
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Flame, 
  Award, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  BookOpen 
} from 'lucide-react';
>>>>>>> ecbfa17 (DSAverse)
import { mockUser } from '../data/dsaData';
import { ProgressBar } from '../components/ProgressBar';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { userProfile } = useAuth();
<<<<<<< HEAD
  const { solvedCount, totalProblems, overallProgress, topicsCompleted, totalTopics, readinessScore } = useProgress();

  const achievements = [
    { id: '1', title: 'First Problem', desc: 'Solved your first C++ problem on DSAverse', icon: '01', unlocked: solvedCount >= 1, date: 'Aug 01, 2026' },
    { id: '2', title: '7 Day Streak', desc: 'Maintained a 7-day continuous coding streak', icon: '7D', unlocked: true, date: 'Aug 07, 2026' },
    { id: '3', title: '25 Problems Mastered', desc: 'Solved 25 curated C++ DSA problems', icon: '25', unlocked: solvedCount >= 25, date: solvedCount >= 25 ? 'Unlocked' : 'Locked' },
    { id: '4', title: 'Tree Explorer', desc: 'Complete Binary Tree BFS & DFS traversals', icon: 'TR', unlocked: false, date: 'Locked' },
    { id: '5', title: 'Speed Solver', desc: 'Solve an Easy C++ problem in under 5 minutes', icon: '5M', unlocked: true, date: 'Aug 13, 2026' }
  ];
=======
  const { 
    overallProgress, 
    totalTopics, 
    readinessScore, 
    currentStreak,
    longestStreak,
    topicStats 
  } = useProgress();

  // Dynamic calculations from Learn section subtopics
  const totalSubtopicsMastered = useMemo(() => {
    return topicStats.reduce((sum, t) => sum + t.solved, 0);
  }, [topicStats]);

  const totalSubtopicsPossible = useMemo(() => {
    return topicStats.reduce((sum, t) => sum + t.total, 0);
  }, [topicStats]);

  const fullyCompletedTopicsCount = useMemo(() => {
    return topicStats.filter((t) => t.progress === 100).length;
  }, [topicStats]);

  const inProgressTopicsCount = useMemo(() => {
    return topicStats.filter((t) => t.progress > 0 && t.progress < 100).length;
  }, [topicStats]);

  // Dynamic Unlockable Achievements tied directly to Learn section progress and streak
  const achievements = useMemo(() => {
    const treeStat = topicStats.find((t) => t.topicId === 'trees');
    const treeProgress = treeStat?.progress || 0;
    const treeSolved = treeStat?.solved || 0;

    const cppStat = topicStats.find((t) => t.topicId === 'cpp-basics');
    const cppProgress = cppStat?.progress || 0;

    const recursionStat = topicStats.find((t) => t.topicId === 'recursion');
    const recursionProgress = recursionStat?.progress || 0;
    const recursionSolved = recursionStat?.solved || 0;

    const searchStat = topicStats.find((t) => t.topicId === 'searching');
    const sortStat = topicStats.find((t) => t.topicId === 'sorting');
    const searchSortProgress = Math.max(searchStat?.progress || 0, sortStat?.progress || 0);

    return [
      {
        id: '1',
        title: 'First Subtopic Mastered',
        desc: 'Completed your first interactive DSA subtopic checklist in Learn',
        icon: '01',
        unlocked: totalSubtopicsMastered >= 1,
        date: totalSubtopicsMastered >= 1 ? 'Unlocked in Learn' : 'Locked (Tick 1 subtopic in Learn)',
      },
      {
        id: '2',
        title: 'C++ Foundations Scholar',
        desc: 'Mastered 50%+ of C++ Fundamentals & Memory concepts in Learn',
        icon: 'CS',
        unlocked: cppProgress >= 50,
        date: cppProgress >= 50 ? `${cppProgress}% Mastered in Learn` : `${cppProgress}% (Need 50% in Learn)`,
      },
      {
        id: '3',
        title: 'Algorithm Specialist',
        desc: 'Reached 50%+ progress in Searching or Sorting modules in Learn',
        icon: 'AS',
        unlocked: searchSortProgress >= 50,
        date: searchSortProgress >= 50 ? `${searchSortProgress}% Mastered in Learn` : `${searchSortProgress}% (Need 50% in Learn)`,
      },
      {
        id: '4',
        title: 'Tree Explorer',
        desc: 'Mastered Binary Tree BFS, DFS and BST subtopics in Learn',
        icon: 'TR',
        unlocked: treeProgress >= 25 || treeSolved >= 5,
        date: treeProgress >= 25 || treeSolved >= 5 ? `${treeProgress}% Mastered in Learn` : `${treeProgress}% (Need 25% in Learn)`,
      },
      {
        id: '5',
        title: 'Recursion Call-Stack Wizard',
        desc: 'Completed call stack, dry run, and backtracking subtopics in Learn',
        icon: 'RC',
        unlocked: recursionProgress >= 30 || recursionSolved >= 4,
        date: recursionProgress >= 30 || recursionSolved >= 4 ? `${recursionProgress}% Mastered in Learn` : `${recursionProgress}% (Need 30% in Learn)`,
      },
      {
        id: '6',
        title: 'Curriculum Master (20+ Concepts)',
        desc: 'Mastered 20+ total subtopics across Learn modules',
        icon: '20',
        unlocked: totalSubtopicsMastered >= 20,
        date: totalSubtopicsMastered >= 20 ? `${totalSubtopicsMastered} Subtopics Mastered` : `${totalSubtopicsMastered}/20 Subtopics in Learn`,
      },
      {
        id: '7',
        title: '7-Day Learning Streak',
        desc: 'Maintained a 7-day continuous coding & learning streak',
        icon: '7D',
        unlocked: currentStreak >= 7,
        date: currentStreak >= 7 ? `${currentStreak} Days Streak` : `${currentStreak}/7 Days Active`,
      },
    ];
  }, [topicStats, totalSubtopicsMastered, currentStreak]);
>>>>>>> ecbfa17 (DSAverse)

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      
<<<<<<< HEAD
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
=======
      {/* Profile Header Box (Shows Name, Day Streak, Score, and Overall Progress) */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-950/80 via-teal-950/50 to-emerald-950/80 border border-teal-500/30 glass-panel shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-theme-text tracking-tight">
            {userProfile?.displayName || mockUser.name}
          </h1>
          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="flex items-center text-amber-500 dark:text-amber-400 font-semibold">
              <Flame className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500/20" /> {currentStreak} Day Streak
            </span>
            <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold">
              <Trophy className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Score: {readinessScore}/100
            </span>
>>>>>>> ecbfa17 (DSAverse)
          </div>
        </div>

        <div className="space-y-2 text-right shrink-0">
          <div className="text-xs text-theme-text-muted">Overall Progress</div>
          <div className="text-3xl font-black text-theme-text font-mono">{overallProgress}%</div>
          <ProgressBar progress={overallProgress} color="teal" height="sm" className="w-36 ml-auto" />
        </div>
      </div>

<<<<<<< HEAD
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
=======
      {/* Grid: Achievements + Dynamic DSA Readiness Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Dynamic Unlockable Achievements (Updates live with Learn section ticks) */}
        <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-theme-text flex items-center">
                <Award className="w-4 h-4 mr-2 text-amber-400" /> Unlockable Achievements
              </h3>
              <p className="text-[11px] text-theme-text-muted">
                Unlocks automatically as you complete concepts in the <strong className="text-teal-700 dark:text-teal-300">Learn</strong> section.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20 font-bold shrink-0">
              {unlockedCount} / {achievements.length} Unlocked
            </span>
          </div>

          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
>>>>>>> ecbfa17 (DSAverse)
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  ach.unlocked
<<<<<<< HEAD
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
=======
                    ? 'bg-emerald-500/10 border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                    : 'bg-theme-card/30 border-theme-border opacity-70'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <span className={`w-9 h-9 rounded-xl border font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                    ach.unlocked
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-sm'
                      : 'bg-theme-card border-theme-border text-theme-text-muted'
                  }`}>
                    {ach.unlocked ? ach.icon : <Lock className="w-4 h-4 text-theme-text-muted" />}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs font-bold text-theme-text truncate">{ach.title}</h4>
                      {ach.unlocked && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono font-semibold">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-theme-text-muted mt-0.5 leading-snug">{ach.desc}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-mono shrink-0 ml-2 font-semibold ${
                  ach.unlocked ? 'text-emerald-700 dark:text-emerald-400' : 'text-theme-text-muted'
                }`}>
                  {ach.date}
                </span>
>>>>>>> ecbfa17 (DSAverse)
              </div>
            ))}
          </div>
        </div>

<<<<<<< HEAD
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
=======
        {/* Dynamic DSA Readiness Breakdown (Updates live with Learn section) */}
        <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-theme-text flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-emerald-400" /> DSA Readiness Breakdown
              </h3>
              <p className="text-[11px] text-theme-text-muted">
                Real-time metrics computed directly from your <strong className="text-teal-700 dark:text-teal-300">Learn</strong> topic subtopics.
              </p>
            </div>
            <Link
              to="/learn/cpp-basics"
              className="text-xs text-teal-700 dark:text-teal-400 hover:underline font-semibold flex items-center shrink-0"
            >
              <span>Open Learn</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>

          {/* High-level live counters */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-theme-card border border-teal-500/30 space-y-1">
              <div className="text-[11px] text-theme-text-muted">Learn Subtopics Mastered</div>
              <div className="font-mono font-bold text-teal-700 dark:text-teal-400 text-base">
                {totalSubtopicsMastered} <span className="text-xs text-theme-text-muted font-normal">/ {totalSubtopicsPossible}</span>
              </div>
              <div className="text-[10px] text-theme-text-muted font-mono">
                {Math.round((totalSubtopicsMastered / Math.max(1, totalSubtopicsPossible)) * 100)}% Curriculum Covered
              </div>
            </div>

            <div className="p-3 rounded-xl bg-theme-card border border-emerald-500/30 space-y-1">
              <div className="text-[11px] text-theme-text-muted">Readiness Score</div>
              <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">
                {readinessScore} <span className="text-xs text-theme-text-muted font-normal">/ 100</span>
              </div>
              <div className="text-[10px] text-theme-text-muted font-mono">
                {readinessScore >= 80 ? 'Placement Ready' : 'In Preparation'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-theme-card border border-blue-500/30 space-y-1">
              <div className="text-[11px] text-theme-text-muted">Modules Mastered</div>
              <div className="font-mono font-bold text-blue-600 dark:text-blue-400 text-base">
                {fullyCompletedTopicsCount} <span className="text-xs text-theme-text-muted font-normal">/ {totalTopics}</span>
              </div>
              <div className="text-[10px] text-theme-text-muted font-mono">
                {inProgressTopicsCount} in progress
              </div>
            </div>

            <div className="p-3 rounded-xl bg-theme-card border border-amber-500/30 space-y-1">
              <div className="text-[11px] text-theme-text-muted">Continuous Streak</div>
              <div className="font-mono font-bold text-amber-600 dark:text-amber-400 text-base">
                {currentStreak} <span className="text-xs text-theme-text-muted font-normal">Days</span>
              </div>
              <div className="text-[10px] text-theme-text-muted font-mono">
                Best: {longestStreak} Days
              </div>
            </div>
          </div>

          {/* Module-by-Module Live Status Breakdown for all 9 Learn Topics */}
          <div className="pt-2 border-t border-theme-border/80 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-theme-text">
              <span className="flex items-center">
                <BookOpen className="w-3.5 h-3.5 mr-1.5 text-teal-600 dark:text-teal-400" />
                9 Learn Modules Live Progress
              </span>
              <span className="text-[10px] font-mono text-theme-text-muted">Subtopics Ticked</span>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {topicStats.map((topic) => (
                <Link
                  key={topic.topicId}
                  to={`/learn/${topic.topicId}`}
                  className="p-2.5 rounded-xl bg-theme-bg/60 hover:bg-theme-bg border border-theme-border hover:border-teal-500/40 transition-all flex flex-col space-y-1.5 group block"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-theme-text group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors flex items-center">
                      <span>{topic.name}</span>
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-teal-600" />
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        topic.status === 'Strong' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30' :
                        topic.status === 'Good' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30' :
                        topic.status === 'Improve' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30' :
                        'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30'
                      }`}>
                        {topic.status}
                      </span>
                      <span className="font-mono text-[11px] text-theme-text-muted">
                        {topic.solved} / {topic.total} ({topic.progress}%)
                      </span>
                    </div>
                  </div>
                  <ProgressBar progress={topic.progress} color={topic.color} height="sm" />
                </Link>
              ))}
            </div>
          </div>

>>>>>>> ecbfa17 (DSAverse)
        </div>

      </div>

    </div>
  );
};
<<<<<<< HEAD
=======

>>>>>>> ecbfa17 (DSAverse)
