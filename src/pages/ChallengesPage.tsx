import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight } from 'lucide-react';
import { mockChallenges } from '../data/dsaData';
import { ProgressBar } from '../components/ProgressBar';
import { DifficultyBadge } from '../components/DifficultyBadge';

export const ChallengesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-teal-500/15">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-theme-text flex items-center">
          <Award className="w-8 h-8 mr-3 text-amber-400" />
          DSA Coding Challenges
        </h1>
        <p className="text-xs sm:text-sm text-theme-text-muted mt-1">
          Structured multi-day sprints to test your consistency and build problem-solving muscle.
        </p>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockChallenges.map((ch) => {
          const progress = Math.round((ch.completedProblems / ch.totalProblems) * 100);
          return (
            <div
              key={ch.id}
              className="p-6 rounded-3xl bg-theme-card border border-teal-500/20 glass-panel shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    {ch.durationDays} Days Sprint
                  </span>
                  <DifficultyBadge difficulty={ch.difficulty} size="sm" />
                </div>

                <h3 className="text-xl font-bold text-theme-text">{ch.title}</h3>
                <p className="text-xs text-theme-text-muted leading-relaxed">{ch.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {ch.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-theme-card text-theme-text-muted border border-theme-border">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-theme-border/80">
                <div className="flex justify-between text-xs text-theme-text-muted font-mono">
                  <span>Progress: {ch.completedProblems} / {ch.totalProblems} Problems</span>
                  <span className="text-teal-400 font-bold">{progress}%</span>
                </div>

                <ProgressBar progress={progress} color="teal" height="sm" />

                <div className="pt-2">
                  <Link
                    to="/practice"
                    className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-theme-surface-hover0 text-theme-text text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>Continue Challenge</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

