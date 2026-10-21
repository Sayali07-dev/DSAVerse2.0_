import React from 'react';

interface DifficultyBadgeProps {
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard' | string;
  size?: 'sm' | 'md' | 'lg';
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, size = 'md' }) => {
  let colorClasses = "bg-theme-card text-theme-text-muted border-theme-border";
  
  if (difficulty === 'Beginner' || difficulty === 'Easy') {
    colorClasses = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 glow-emerald";
  } else if (difficulty === 'Medium') {
    colorClasses = "bg-amber-500/10 text-amber-400 border-amber-500/30 glow-amber";
  } else if (difficulty === 'Hard') {
    colorClasses = "bg-rose-500/10 text-rose-400 border-rose-500/30 glow-rose";
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-medium",
    md: "px-2.5 py-1 text-xs font-semibold",
    lg: "px-3 py-1.5 text-sm font-semibold"
  }[size];

  return (
    <span className={`inline-flex items-center rounded-full border ${colorClasses} ${sizeClasses}`}>
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current animate-pulse"></span>
      {difficulty}
    </span>
  );
};
