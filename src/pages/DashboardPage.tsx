import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { 
  Flame, 
  Trophy, 
  BarChart3, 
  Code2, 
  ArrowRight, 
  CheckCircle2, 
  Circle,
  Clock,
  CheckSquare,
  RotateCcw,
  Calendar,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { dsaProblems } from '../data/dsaData';
import { ProgressBar } from '../components/ProgressBar';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { Heatmap } from '../components/Heatmap';

export const DashboardPage: React.FC = () => {
  const { userProfile, user } = useAuth();
  const {
    // Checklist
    checklistItems,
    checklistMap,
    toggleChecklistItem,
    setChecklistItem,
    checkedChecklistCount,
    totalChecklistCount,
    overallProgress,

    // Problems
    solvedMap,
    toggleProblemSolved,
    solvedCount,
    totalProblems,

    // Streak & Date
    currentStreak,
    longestStreak,
    systemTodayDate,
    simulateNewDayLogin,
    resetStreak,

    // Metrics
    topicsCompleted,
    totalTopics,
    readinessScore,
    topicStats,
  } = useProgress();

  const checklistRef = useRef<HTMLDivElement>(null);
  const practiceRef = useRef<HTMLDivElement>(null);

  const [checklistFilter, setChecklistFilter] = useState<string>('All');
  const [streakNotification, setStreakNotification] = useState<string | null>(null);

  const displayName = userProfile?.displayName || user?.email?.split('@')[0] || 'Student';
  const displayedTopics = topicStats.slice(0, 6);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSimulateNewDay = () => {
    simulateNewDayLogin();
    setStreakNotification(`Simulated new day login! Streak increased to ${currentStreak + 1} days.`);
    setTimeout(() => setStreakNotification(null), 4000);
  };

  const handleResetStreak = () => {
    resetStreak();
    setStreakNotification('Streak reset to 1 day.');
    setTimeout(() => setStreakNotification(null), 3000);
  };

  const handleCheckAll = () => {
    checklistItems.forEach(item => setChecklistItem(item.id, true));
  };

  const handleResetChecklist = () => {
    checklistItems.forEach(item => setChecklistItem(item.id, false));
  };

  const filteredChecklist = checklistItems.filter((item) => {
    if (checklistFilter === 'All') return true;
    return item.category.toLowerCase().includes(checklistFilter.toLowerCase());
  });

  const samplePracticeProblems = dsaProblems.slice(0, 5);

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-teal-500/15">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-theme-text flex items-center">
            Good afternoon, {displayName}
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-muted mt-1">
            System Date: <span className="font-mono font-semibold text-teal-700 dark:text-teal-300">{systemTodayDate}</span> • Track your checklist progress and coding consistency.
          </p>
        </div>
<<<<<<< HEAD

        <div className="flex items-center space-x-3">
          <button
            onClick={() => scrollToSection(checklistRef)}
            className="px-4 py-2 rounded-xl bg-theme-card border border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-semibold hover:border-theme-border transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Milestone Checklist</span>
          </button>
          <Link
            to="/practice"
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-600/30 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Practice Problems ({solvedCount}/{totalProblems})</span>
          </Link>
        </div>
=======
>>>>>>> ecbfa17 (DSAverse)
      </div>

      {/* Streak Alert Notification banner */}
      {streakNotification && (
        <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-medium flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center space-x-2">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500/30 animate-pulse" />
            <span>{streakNotification}</span>
          </div>
          <button onClick={() => setStreakNotification(null)} className="text-[11px] underline cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Interactive Top Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Overall Progress (Driven by Checklist Ticks) */}
        <div 
          onClick={() => scrollToSection(checklistRef)}
          className="p-4 rounded-2xl bg-theme-card border border-teal-500/30 hover:border-teal-400 glass-panel cursor-pointer transition-all hover:scale-[1.01] group relative"
          title="Click to view and tick milestones in the Checklist"
        >
          <div className="flex items-center justify-between text-xs text-theme-text-muted mb-2">
            <span className="font-semibold text-theme-text flex items-center gap-1.5">
              <span>Overall Progress</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300 font-mono">Live</span>
            </span>
            <CheckSquare className="w-4 h-4 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-theme-text font-mono tracking-tight flex items-baseline gap-1">
            <span>{overallProgress}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 my-2 overflow-hidden">
            <div 
              className="bg-teal-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="text-[11px] text-teal-700 dark:text-teal-400 font-medium flex items-center justify-between">
            <span>{checkedChecklistCount} of {totalChecklistCount} Milestones Ticked</span>
            <ChevronRight className="w-3 h-3 text-teal-600" />
          </div>
        </div>

        {/* 2. Problems Solved (Interactive & Synced with Practice Section) */}
        <div 
          onClick={() => scrollToSection(practiceRef)}
          className="p-4 rounded-2xl bg-theme-card border border-blue-500/30 hover:border-blue-400 glass-panel cursor-pointer transition-all hover:scale-[1.01] group"
          title="Click to view practice questions and sync progress"
        >
          <div className="flex items-center justify-between text-xs text-theme-text-muted mb-2">
            <span className="font-semibold text-theme-text flex items-center gap-1.5">
              <span>Problems Solved</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-700 dark:text-blue-300 font-mono">Practice</span>
            </span>
            <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-theme-text font-mono tracking-tight flex items-baseline gap-1">
            <span>{solvedCount}</span>
            <span className="text-xs text-theme-text-muted font-sans font-normal">/ {totalProblems}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 my-2 overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0}%` }}
            />
          </div>
          <div className="text-[11px] text-blue-700 dark:text-blue-400 font-medium flex items-center justify-between">
            <span>Curated Practice Bank</span>
            <ChevronRight className="w-3 h-3 text-blue-600" />
          </div>
        </div>

        {/* 3. Current Streak (System Date Tracked & Interactive) */}
        <div 
          className="p-4 rounded-2xl bg-theme-card border border-amber-500/30 hover:border-amber-400 glass-panel transition-all hover:scale-[1.01] group relative"
        >
          <div className="flex items-center justify-between text-xs text-theme-text-muted mb-2">
            <span className="font-semibold text-theme-text flex items-center gap-1.5">
              <span>Current Streak</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono">System</span>
            </span>
            <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400 fill-amber-500/20 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono tracking-tight flex items-baseline">
            <span>{currentStreak}</span>
            <span className="text-sm ml-1 font-sans font-normal text-theme-text-muted">days</span>
          </div>
          <div className="text-[11px] text-theme-text-muted mt-2 flex items-center justify-between">
            <span>Longest: {longestStreak} days</span>
            <button
              type="button"
              onClick={handleSimulateNewDay}
              className="px-2 py-0.5 rounded bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[10px] font-semibold cursor-pointer transition-colors"
              title="Test new day login (system date simulation)"
            >
              +1 Day
            </button>
          </div>
        </div>

        {/* 4. Readiness Score */}
        <div className="p-4 rounded-2xl bg-theme-card border border-emerald-500/30 glass-panel">
          <div className="flex items-center justify-between text-xs text-theme-text-muted mb-2">
            <span className="font-semibold text-theme-text">DSA Readiness</span>
            <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight flex items-baseline">
            <span>{readinessScore}</span>
            <span className="text-xs text-theme-text-muted font-sans font-normal ml-1">/ 100</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 my-2 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${readinessScore}%` }}
            />
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 font-medium">
            {readinessScore >= 80 ? 'Placement Ready' : 'In Preparation'}
          </div>
        </div>

      </div>

      {/* SECTION: Interactive DSA Preparation Checklist (Controls Overall Progress) */}
      <div 
        ref={checklistRef} 
        className="p-6 rounded-3xl bg-theme-card border border-teal-500/25 glass-panel shadow-sm space-y-6 scroll-mt-20"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-theme-border">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-800 dark:text-teal-300 text-xs font-semibold border border-teal-500/30">
              <CheckSquare className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Interactive Checklist • Real-time Progress Driver</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-theme-text">
              DSA Preparation & Mastery Checklist
            </h2>
            <p className="text-xs text-theme-text-muted max-w-3xl leading-relaxed">
              Tick or untick any concept below to dynamically change your <strong className="text-teal-700 dark:text-teal-300">Overall Progress ({overallProgress}%)</strong> in real time. Your ticks are saved automatically.
            </p>
          </div>

          {/* Quick Checklist Actions & Progress Counter */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 font-mono text-xs font-bold text-teal-700 dark:text-teal-300">
              {checkedChecklistCount} / {totalChecklistCount} Ticked ({overallProgress}%)
            </span>
            <button
              onClick={handleCheckAll}
              className="px-3 py-1.5 rounded-xl bg-theme-bg border border-theme-border text-theme-text hover:text-teal-700 dark:hover:text-teal-300 text-xs font-medium transition-colors cursor-pointer"
            >
              Tick All
            </button>
            <button
              onClick={handleResetChecklist}
              className="px-3 py-1.5 rounded-xl bg-theme-bg border border-theme-border text-rose-600 dark:text-rose-400 text-xs font-medium transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-theme-text-muted font-medium flex items-center mr-1">
            <Filter className="w-3.5 h-3.5 mr-1" /> Category:
          </span>
          {['All', 'Basics', 'Arrays', 'Searching', 'Sorting', 'Hashing', 'Recursion', 'Linked Lists', 'Stack & Queue', 'Trees', 'Graphs', 'Dynamic Programming'].map((cat) => (
            <button
              key={cat}
              onClick={() => setChecklistFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                checklistFilter === cat
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-theme-bg border border-theme-border text-theme-text-muted hover:text-theme-text hover:border-teal-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Checklist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredChecklist.map((item) => {
            const isChecked = Boolean(checklistMap[item.id]);
            return (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer select-none flex flex-col justify-between space-y-3 ${
                  isChecked
                    ? 'bg-emerald-500/10 border-emerald-500/40 shadow-sm'
                    : 'bg-theme-card border-theme-border hover:border-teal-500/40 hover:bg-theme-bg'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <button
                    type="button"
                    aria-label={isChecked ? `Uncheck ${item.title}` : `Check ${item.title}`}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isChecked
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                        : 'border-2 border-slate-400 dark:border-slate-600 hover:border-teal-500 text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 fill-white text-emerald-600" />
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/15 text-teal-800 dark:text-teal-300 font-semibold uppercase">
                        {item.category}
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${
                        isChecked ? 'text-emerald-700 dark:text-emerald-400' : 'text-theme-text-muted'
                      }`}>
                        {isChecked ? 'Completed' : 'Pending'}
                      </span>
                    </div>

                    <h4 className={`text-xs font-bold leading-snug ${
                      isChecked ? 'text-theme-text line-through opacity-85' : 'text-theme-text'
                    }`}>
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-theme-text-muted mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-theme-border flex items-center justify-between text-[11px]">
                  <span className="text-[10px] font-mono text-theme-text-muted">
                    Click card to toggle
                  </span>
                  <Link
                    to={`/learn/${item.topicId}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-teal-700 dark:text-teal-400 hover:underline font-semibold flex items-center space-x-1"
                  >
                    <span>Study Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION: Practice Problems Quick-Check & Synced with Practice Section */}
      <div 
        ref={practiceRef}
        className="p-6 rounded-3xl bg-theme-card border border-blue-500/25 glass-panel shadow-sm space-y-4 scroll-mt-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-theme-border">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-800 dark:text-blue-300 text-xs font-semibold border border-blue-500/30">
              <Code2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Practice Section Problem Sync</span>
            </div>
            <h3 className="text-xl font-bold text-theme-text">
              Solved Problems ({solvedCount} / {totalProblems})
            </h3>
            <p className="text-xs text-theme-text-muted">
              Ticking any problem here or on the Practice Page updates your <strong className="text-blue-700 dark:text-blue-300">Problems Solved count</strong> instantly.
            </p>
          </div>

          <Link
            to="/practice"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>Open All 30 Questions</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Quick Problem Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-theme-bg/60 border-b border-theme-border text-theme-text-muted font-mono uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3 w-16 text-center">Status</th>
                <th className="py-2.5 px-3">Problem Title</th>
                <th className="py-2.5 px-3">Difficulty</th>
                <th className="py-2.5 px-3">Acceptance</th>
                <th className="py-2.5 px-3 text-right">Practice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/60">
              {samplePracticeProblems.map((prob) => {
                const isSolved = Boolean(solvedMap[prob.id]);
                return (
                  <tr key={prob.id} className="hover:bg-theme-bg/40 transition-colors">
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => toggleProblemSolved(prob.id)}
                        className="mx-auto flex items-center justify-center p-1 rounded-lg hover:bg-teal-500/10 cursor-pointer"
                        title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
                      >
                        {isSolved ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-theme-text-muted hover:text-blue-500" />
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`font-semibold ${isSolved ? 'text-theme-text-muted line-through' : 'text-theme-text'}`}>
                        {prob.title}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <DifficultyBadge difficulty={prob.difficulty} size="sm" />
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-theme-text-muted">
                      {prob.acceptance}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        to="/practice"
                        className="text-teal-700 dark:text-teal-400 hover:underline font-medium text-[11px]"
                      >
                        Code in C++ →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION: System Date Streak & Heatmap */}
      <div className="space-y-4">
        {/* Streak Controls Banner */}
        <div className="p-4 rounded-2xl bg-theme-card border border-amber-500/30 glass-panel flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/30 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-theme-text">
                System Date Streak Tracking: <span className="text-amber-600 dark:text-amber-400 font-mono">{currentStreak} Days</span>
              </h4>
              <p className="text-xs text-theme-text-muted mt-0.5">
                Current system date: <span className="font-mono font-semibold text-theme-text">{systemTodayDate}</span>. When you open DSAverse on a new day and date, your streak changes automatically.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleSimulateNewDay}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500/30" />
              <span>Simulate Next Day (+1 Day)</span>
            </button>
            <button
              onClick={handleResetStreak}
              className="p-2 rounded-xl bg-theme-bg border border-theme-border text-theme-text-muted hover:text-rose-500 transition-colors cursor-pointer"
              title="Reset Streak"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* GitHub-style Coding Streak Heatmap (August, September, October color variants; prior months blank) */}
        <Heatmap streak={currentStreak} />
      </div>

      {/* Grid: Topic Progress Breakdown & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Topic Progress Breakdown */}
        <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <h3 className="text-base font-bold text-theme-text flex items-center">
              <BarChart3 className="w-4 h-4 mr-2 text-teal-600 dark:text-teal-400" /> Topic Progress & Status
            </h3>
            <div className="flex items-center space-x-3">
              <span className="text-[11px] font-mono text-teal-700 dark:text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-lg border border-teal-500/25">
                {topicsCompleted} / {totalTopics} Active Topics
              </span>
              <Link to="/analytics" className="text-xs text-teal-700 dark:text-teal-400 hover:underline font-semibold cursor-pointer">
                Full Analytics
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {displayedTopics.map((t) => (
              <div key={t.topicId} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-theme-text">
                    {t.name} <span className="text-[10px] font-mono text-theme-text-muted">({t.solved}/{t.total})</span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      t.status === 'Strong' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30' :
                      t.status === 'Good' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30' :
                      t.status === 'Improve' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30' :
                      'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30'
                    }`}>
                      {t.status}
                    </span>
                    <span className="font-mono text-theme-text-muted">{t.progress}%</span>
                  </div>
                </div>
                <ProgressBar progress={t.progress} color={t.color} height="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <h3 className="text-base font-bold text-theme-text flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" /> Recent Learning Activity
            </h3>
            <span className="text-xs text-theme-text-muted font-mono">{solvedCount} Problems Solved</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-theme-card border border-theme-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-theme-text">Overall Checklist Progress</div>
                  <div className="text-[10px] text-theme-text-muted font-mono">{checkedChecklistCount} of {totalChecklistCount} concepts mastered ({overallProgress}%)</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-teal-700 dark:text-teal-300 bg-teal-500/10 border border-teal-500/30">
                Active
              </span>
            </div>

            <div className="p-3 rounded-xl bg-theme-card border border-theme-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Flame className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-theme-text">System Streak Active</div>
                  <div className="text-[10px] text-theme-text-muted font-mono">{currentStreak} day streak as of {systemTodayDate}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/30">
                Streak
              </span>
            </div>

            <div className="p-3 rounded-xl bg-theme-card border border-theme-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Code2 className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-theme-text">Curated Problem Practice</div>
                  <div className="text-[10px] text-theme-text-muted font-mono">{solvedCount} problems completed in Practice section</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-blue-700 dark:text-blue-300 bg-blue-500/10 border border-blue-500/30">
                Practice
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
