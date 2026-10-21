import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: 'purple' | 'blue' | 'emerald' | 'amber' | 'rose' | 'teal';
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'purple',
  showLabel = false,
  height = 'md',
  className = ''
}) => {
  const cappedProgress = Math.min(100, Math.max(0, progress));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  }[height];

  const colorGradients = {
    purple: 'from-teal-600 via-teal-500 to-emerald-500 shadow-[0_0_12px_rgba(139,92,246,0.5)]',
    teal: 'from-teal-600 via-teal-500 to-emerald-500 shadow-[0_0_12px_rgba(20,184,166,0.5)]',
    blue: 'from-blue-600 via-cyan-500 to-teal-400 shadow-[0_0_12px_rgba(59,130,246,0.5)]',
    emerald: 'from-emerald-600 via-teal-500 to-green-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]',
    amber: 'from-amber-600 via-orange-500 to-yellow-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]',
    rose: 'from-rose-600 via-pink-500 to-red-400 shadow-[0_0_12px_rgba(244,63,94,0.5)]'
  }[color];

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs mb-1.5 font-medium text-theme-text-muted">
          <span>Progress</span>
          <span className="font-mono">{cappedProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-theme-card/80 rounded-full overflow-hidden border border-theme-border/50 p-0.5 ${heightClasses}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorGradients} transition-all duration-500 ease-out`}
          style={{ width: `${cappedProgress}%` }}
        />
      </div>
    </div>
  );
};

