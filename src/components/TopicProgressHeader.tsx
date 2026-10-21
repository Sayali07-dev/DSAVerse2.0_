import React from 'react';
import { CheckCircle2, BookOpen } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { ProgressBar } from './ProgressBar';

interface TopicProgressHeaderProps {
  topicId: string;
  topicTitle: string;
}

export const TopicProgressHeader: React.FC<TopicProgressHeaderProps> = ({
  topicId,
  topicTitle,
}) => {
  const { getTopicProgress } = useProgress();
  const { completed, total, progress } = getTopicProgress(topicId);

  return (
    <div className="mb-6 p-4 rounded-2xl bg-theme-card border border-teal-500/25 shadow-sm glass-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30">
          <BookOpen className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold text-theme-text">{topicTitle} Progress</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 font-semibold border border-teal-500/30">
              Roadmap Synced
            </span>
          </div>
          <p className="text-xs text-theme-text-muted mt-0.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{completed} of {total} subtopics checked ({progress}%)</span>
          </p>
        </div>
      </div>

      <div className="w-full sm:w-56 space-y-1.5">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-theme-text-muted">Mastery</span>
          <span className="font-bold text-teal-700 dark:text-teal-400">{progress}%</span>
        </div>
        <ProgressBar
          progress={progress}
          color={progress === 100 ? 'emerald' : 'teal'}
          height="sm"
        />
      </div>
    </div>
  );
};
