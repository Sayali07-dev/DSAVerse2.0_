import React from 'react';
import { Check } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface SubtopicCheckboxProps {
  topicId: string;
  subtopicId: number | string;
  title?: string;
  className?: string;
}

export const SubtopicCheckbox: React.FC<SubtopicCheckboxProps> = ({
  topicId,
  subtopicId,
  title,
  className = '',
}) => {
  const { isTopicSubtopicChecked, toggleTopicSubtopic } = useProgress();
  const checked = isTopicSubtopicChecked(topicId, subtopicId);

  return (
    <button
      type="button"
      title={checked ? `Mark ${title || `subtopic ${subtopicId}`} as uncompleted` : `Mark ${title || `subtopic ${subtopicId}`} as completed`}
      onClick={(e) => {
        e.stopPropagation();
        toggleTopicSubtopic(topicId, subtopicId);
      }}
      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
        checked
          ? 'bg-emerald-500 border-emerald-400 text-white shadow-sm shadow-emerald-500/40 hover:bg-emerald-600'
          : 'border-slate-400 dark:border-slate-600 hover:border-teal-400 bg-theme-bg/80 text-transparent hover:bg-teal-500/10'
      } ${className}`}
    >
      <Check
        className={`w-3.5 h-3.5 transition-transform ${
          checked ? 'opacity-100 scale-100 stroke-[3]' : 'opacity-0 scale-75'
        }`}
      />
    </button>
  );
};
