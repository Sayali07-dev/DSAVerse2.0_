import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Target, CheckCircle2, Play, BookOpen, Compass } from 'lucide-react';
import { DifficultyBadge } from '../components/DifficultyBadge';

export const RecommendationsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-900/30 border border-teal-500/30 text-teal-300 text-xs font-semibold glow-teal">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Personalized Adaptive Learning Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-theme-text tracking-tight">
          Smart Next-Step <span className="text-gradient-teal">Recommendation</span>
        </h1>
        <p className="text-theme-text-muted text-xs sm:text-sm leading-relaxed">
          AI-driven problem recommendations calculated specifically from your previous accuracy, completed topics, and difficulty progression.
        </p>
      </div>

      {/* Main Primary Recommendation Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-950/90 via-teal-950/60 to-emerald-950/90 border border-teal-500/40 glass-panel shadow-2xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-teal-500/20 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-teal-500/20 border border-teal-500/30 text-teal-300">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Top Recommended Action</span>
              <h2 className="text-2xl font-black text-theme-text flex items-center mt-0.5">
                Binary Search - Easy
                <span className="ml-3"><DifficultyBadge difficulty="Easy" size="sm" /></span>
              </h2>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono shrink-0">
            98% Recommendation Match
          </span>
        </div>

        {/* Reason Banner */}
        <div className="p-4 rounded-xl bg-theme-card/80 border border-teal-500/20 text-xs text-theme-text-muted leading-relaxed">
          <strong className="text-teal-300">Why this recommendation?</strong><br />
          "You completed Arrays and achieved 82% accuracy in Linear Search. Solving Binary Search next establishes logarithmic O(log n) search space halving intuition."
        </div>

        {/* Detailed Breakdown Criteria */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-4 rounded-xl bg-theme-card border border-theme-border space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Prerequisites Completed</span>
            </div>
            <p className="text-xs text-theme-text-muted">Arrays & C++ Pointers (100% completed)</p>
          </div>

          <div className="p-4 rounded-xl bg-theme-card border border-theme-border space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Accuracy Target Met</span>
            </div>
            <p className="text-xs text-theme-text-muted">Linear Search accuracy is 82% (&gt;75% required)</p>
          </div>

          <div className="p-4 rounded-xl bg-theme-card border border-theme-border space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Difficulty Matched</span>
            </div>
            <p className="text-xs text-theme-text-muted font-mono">Easy C++ Problem (Level: Intermediate)</p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={() => navigate('/practice')}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-theme-text font-bold text-xs shadow-xl shadow-teal-600/30 transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Practice Problems</span>
          </button>

          <Link
            to="/learn/searching"
            className="px-6 py-3.5 rounded-xl bg-theme-card border border-teal-500/30 text-teal-300 font-semibold text-xs hover:border-theme-border transition-all flex items-center space-x-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Revise Topic</span>
          </Link>

          <Link
            to="/roadmap"
            className="px-6 py-3.5 rounded-xl bg-theme-card border border-theme-border text-theme-text-muted font-semibold text-xs hover:border-theme-border transition-all flex items-center space-x-2"
          >
            <Compass className="w-4 h-4" />
            <span>View Roadmap</span>
          </Link>
        </div>

      </div>

      {/* Alternative Recommendations */}
      <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
        <h3 className="text-base font-bold text-theme-text">Alternative Smart Recommendations</h3>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-theme-card border border-theme-border flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-theme-text">Two Sum - Easy</span>
                <DifficultyBadge difficulty="Easy" size="sm" />
              </div>
              <p className="text-xs text-theme-text-muted mt-1">Focus: Hash Map lookup O(1) time optimization</p>
            </div>
            <button onClick={() => navigate('/practice')} className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-theme-text text-xs font-bold transition-all cursor-pointer">
              Practice
            </button>
          </div>

          <div className="p-4 rounded-xl bg-theme-card border border-theme-border flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-theme-text">Maximum Subarray (Kadane's) - Medium</span>
                <DifficultyBadge difficulty="Medium" size="sm" />
              </div>
              <p className="text-xs text-theme-text-muted mt-1">Focus: Continuous subarray sum optimization</p>
            </div>
            <button onClick={() => navigate('/practice')} className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-theme-text text-xs font-bold transition-all cursor-pointer">
              Practice
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

