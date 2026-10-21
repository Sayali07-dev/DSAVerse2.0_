import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Code2, 
  Timer, 
  Search, 
  ArrowUpDown, 
  Hash, 
  RotateCcw, 
  GitCommit, 
  Layers, 
  Network
} from 'lucide-react';
import { dsaTopics, type DSATopic } from '../data/dsaData';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { ProgressBar } from '../components/ProgressBar';
import { useProgress } from '../context/ProgressContext';

// Exactly the 9 Learn topics requested:
// C++ Fundamentals, Complexity Analysis, Searching, Hashing, Sorting, Linked List, Stack and Queue, Recursion, Trees
const LEARN_TOPIC_ORDER = [
  'cpp-basics',
  'time-complexity',
  'searching',
  'hashing',
  'sorting',
  'linked-lists',
  'stacks-queues',
  'recursion',
  'trees',
];

export const RoadmapPage: React.FC = () => {
  const { topicStats } = useProgress();

  // Filter dsaTopics to only the 9 topics present in Learn
  const roadmapTopics = LEARN_TOPIC_ORDER.map((id) =>
    dsaTopics.find((t) => t.id === id)
  ).filter(Boolean) as DSATopic[];

  const getTopicIcon = (iconName: string) => {
    switch(iconName) {
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'Timer': return <Timer className="w-5 h-5" />;
      case 'Search': return <Search className="w-5 h-5" />;
      case 'ArrowUpDown': return <ArrowUpDown className="w-5 h-5" />;
      case 'Hash': return <Hash className="w-5 h-5" />;
      case 'RotateCcw': return <RotateCcw className="w-5 h-5" />;
      case 'GitCommit': return <GitCommit className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Network': return <Network className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-900/30 border border-teal-500/30 text-teal-300 text-xs font-semibold glow-teal">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Curriculum Pathway (9 Learn Modules)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-theme-text tracking-tight">
          C++ DSA <span className="text-gradient-teal">Roadmap</span>
        </h1>
        <p className="text-theme-text-muted text-xs sm:text-sm leading-relaxed">
          Sequential 9-stage learning pathway exactly aligned with the Learn feature. Track your mastery via subtopic checklist checkboxes.
        </p>
      </div>

      {/* Status Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-theme-text-muted py-3 border-y border-theme-border">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          <span>Completed (100%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]"></span>
          <span>In Progress</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
          <span>Recommended Next</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span>Ready to Learn (Unlocked)</span>
        </div>
      </div>

      {/* Vertical Flow Pathway */}
      <div className="relative border-l-2 border-teal-500/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
        {roadmapTopics.map((topic, index) => {
          // Dynamic stats calculated from the subtopic checklist ticks in Learn
          const dynamicStat = topicStats.find((s) => s.topicId === topic.id);
          const solvedCount = dynamicStat ? dynamicStat.solved : 0;
          const problemsCount = dynamicStat ? dynamicStat.total : 1;
          const progress = dynamicStat ? dynamicStat.progress : 0;

          const isCompleted = progress === 100;
          const isInProgress = progress > 0 && progress < 100;
          const isRecommended = index === 0 ? progress < 100 : progress === 0 && (topicStats[index - 1]?.progress ?? 0) > 0;

          return (
            <div key={topic.id} className="relative group">
              
              {/* Node Connector Bullet */}
              <div className={`absolute -left-[31px] sm:-left-[47px] top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-theme-text border-2 transition-all ${
                isCompleted ? 'bg-emerald-600 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.6)]' :
                isRecommended ? 'bg-amber-600 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-pulse' :
                isInProgress ? 'bg-teal-600 border-teal-400 shadow-[0_0_12px_rgba(20,184,166,0.6)]' :
                'bg-theme-card border-teal-500/40 text-teal-300'
              }`}>
                {isCompleted ? <CheckCircle2 className="w-4 h-4 text-white" /> :
                 <span className="text-xs font-mono font-bold">{index + 1}</span>}
              </div>

              {/* Node Card */}
              <div className={`p-5 rounded-2xl border transition-all glass-panel ${
                isRecommended ? 'bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border-amber-500/40 shadow-xl shadow-amber-500/10' :
                isCompleted ? 'bg-theme-card border-emerald-500/30 hover:border-emerald-500/50' :
                'bg-theme-card border-teal-500/30 hover:border-teal-500/50 shadow-md'
              }`}>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-xl border ${
                      isCompleted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      isRecommended ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      'bg-teal-500/10 text-teal-400 border-teal-500/30'
                    }`}>
                      {getTopicIcon(topic.iconName)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-teal-400 font-bold">STAGE {index + 1}</span>
                        <DifficultyBadge difficulty={topic.difficulty} size="sm" />
                      </div>
                      <h3 className="text-lg font-bold text-theme-text mt-0.5">{topic.name}</h3>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      isCompleted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold' :
                      isRecommended ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 animate-pulse' :
                      isInProgress ? 'bg-teal-500/10 text-teal-300 border-teal-500/30' :
                      'bg-slate-800/40 text-theme-text-muted border-theme-border'
                    }`}>
                      {isCompleted ? 'Completed (100%)' : isRecommended ? 'Recommended' : isInProgress ? 'In Progress' : 'Ready'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-theme-text-muted leading-relaxed mb-4">{topic.shortDesc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-3 border-t border-theme-border/80">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-theme-text-muted">
                      <span>{solvedCount} of {problemsCount} Subtopics Mastered</span>
                      <span className="font-mono font-bold text-teal-400">{progress}%</span>
                    </div>
                    <ProgressBar progress={progress} color={isCompleted ? 'emerald' : isRecommended ? 'amber' : 'teal'} height="sm" />
                  </div>

                  <div className="flex justify-end">
                    <Link
                      to={`/learn/${topic.id}`}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                          : isRecommended
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                          : isInProgress
                          ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/30'
                          : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/30'
                      }`}
                    >
                      <span>{isCompleted ? 'Review Topic' : isInProgress ? 'Continue Learning' : 'Start Topic'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
