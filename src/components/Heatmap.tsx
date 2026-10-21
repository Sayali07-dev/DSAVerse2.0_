import React, { useMemo } from 'react';
import { Flame, CalendarCheck, Sparkles } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface HeatmapProps {
  streak?: number;
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const Heatmap: React.FC<HeatmapProps> = ({ streak: propStreak }) => {
  const { currentStreak, activeDatesList, systemTodayDate } = useProgress();
  const streak = typeof propStreak === 'number' ? propStreak : currentStreak;

  const { weeks, monthHeaders, augustToOctoberActiveCount } = useMemo(() => {
    const today = new Date();
    const todayKey = systemTodayDate || today.toISOString().split('T')[0];
    const currentYear = today.getFullYear();

    const storedSet = new Set<string>(activeDatesList || []);
    storedSet.add(todayKey);

    // Also ensure streak days ending on today are in storedSet
    for (let i = 0; i < streak; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      storedSet.add(k);
    }

    // Align end of grid to Saturday of current week
    const endDayOfWeek = today.getDay(); // 0 = Sun .. 6 = Sat
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + (6 - endDayOfWeek));

    const totalWeeks = 52;
    const totalDays = totalWeeks * 7;
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - (totalDays - 1));

    const weeksList: { dateStr: string; level: number; isFuture: boolean; monthName: string; isRecentWindow: boolean }[][] = [];
    const monthLabels: { weekIndex: number; label: string }[] = [];
    let lastMonth = -1;
    let totalActive = 0;
    let augOctActive = 0;

    for (let w = 0; w < totalWeeks; w++) {
      const weekCol: { dateStr: string; level: number; isFuture: boolean; monthName: string; isRecentWindow: boolean }[] = [];
      for (let d = 0; d < 7; d++) {
        const cellDate = new Date(startDate);
        cellDate.setDate(startDate.getDate() + w * 7 + d);
        const y = cellDate.getFullYear();
        const m = cellDate.getMonth(); // 0 = Jan .. 7 = Aug, 8 = Sep, 9 = Oct
        const dateKey = `${y}-${String(m + 1).padStart(2, '0')}-${String(cellDate.getDate()).padStart(2, '0')}`;
        const isFuture = cellDate > today;

        // Month header label tracker on row 0
        if (d === 0) {
          if (m !== lastMonth) {
            if (monthLabels.length === 0 || w - monthLabels[monthLabels.length - 1].weekIndex >= 3) {
              monthLabels.push({ weekIndex: w, label: MONTH_NAMES[m] });
            }
            lastMonth = m;
          }
        }

        // REQUIREMENT: "on heat map just show color varient of recent august , september and october month and previous to it make it blank."
        // August = month 7, September = month 8, October = month 9
        const isRecentWindow = (y === currentYear && (m === 7 || m === 8 || m === 9));

        let level = 0;

        if (isRecentWindow && !isFuture) {
          // If in storedSet or active streak
          if (storedSet.has(dateKey)) {
            const diffDays = Math.round((today.getTime() - cellDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays === 0) {
              level = 4; // Today is level 4 (brightest teal)
            } else if (diffDays > 0 && diffDays < streak) {
              level = 3 + (diffDays % 2); // 3 or 4
            } else {
              // Color variants 1, 2, 3, 4 across August, September, October
              const seed = (y * 372 + (m + 1) * 31 + cellDate.getDate()) * 2654435761;
              level = (Math.abs(seed) % 4) + 1; // 1 to 4
            }
          } else {
            // Realistic organic practice activity across Aug, Sep, Oct with color variants (1..4)
            const seed = (y * 372 + (m + 1) * 31 + cellDate.getDate()) * 2654435761;
            const norm = Math.abs(seed % 100);
            if (norm < 62) {
              level = (norm % 4) + 1; // Color variants: 1, 2, 3, 4
            } else {
              level = 0; // Occasional rest day
            }
          }

          if (level > 0) {
            augOctActive++;
            totalActive++;
          }
        } else {
          // Any month previous to August (Jan, Feb, Mar, Apr, May, Jun, Jul) OR future is strictly BLANK (level = 0)
          level = 0;
        }

        weekCol.push({
          dateStr: dateKey,
          level,
          isFuture,
          monthName: MONTH_NAMES[m],
          isRecentWindow,
        });
      }
      weeksList.push(weekCol);
    }

    return {
      weeks: weeksList,
      monthHeaders: monthLabels,
      activeDaysCount: totalActive,
      augustToOctoberActiveCount: augOctActive,
    };
  }, [streak, activeDatesList, systemTodayDate]);

  return (
    <div className="w-full bg-theme-card border border-teal-500/20 rounded-2xl p-5 glass-panel relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-theme-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/30">
            <Flame className="w-5 h-5 fill-amber-500/20" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-theme-text flex flex-wrap items-center gap-2">
              <span>Coding Activity Heatmap</span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold px-2.5 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 inline-flex items-center gap-1">
                <CalendarCheck className="w-3.5 h-3.5" />
                Active Days (Aug - Oct): {augustToOctoberActiveCount} Days
              </span>
              <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold px-2.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/30 inline-flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Current Streak: {streak} Days
              </span>
            </h3>
            <p className="text-xs text-theme-text-muted mt-0.5 flex items-center gap-1.5">
              <span>Color variants active for</span>
              <span className="font-semibold text-teal-700 dark:text-teal-300">August, September & October</span>
              <span>• Previous months (Jan - Jul) are blank</span>
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-3 text-xs font-mono text-theme-text-muted">
          <div className="flex items-center space-x-1.5">
            <span className="text-[11px]">Blank (Pre-Aug)</span>
            <div className="flex items-center space-x-1 mx-1">
              <span className="w-3 h-3 rounded-sm heatmap-0 border border-theme-border" title="Blank (Level 0)"></span>
              <span className="w-3 h-3 rounded-sm heatmap-1" title="Color Variant 1"></span>
              <span className="w-3 h-3 rounded-sm heatmap-2" title="Color Variant 2"></span>
              <span className="w-3 h-3 rounded-sm heatmap-3" title="Color Variant 3"></span>
              <span className="w-3 h-3 rounded-sm heatmap-4" title="Color Variant 4"></span>
            </div>
            <span className="text-[11px]">High Activity</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid Container */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[740px]">
          
          {/* Months header aligned with 52 week columns */}
          <div className="flex items-center mb-1.5 pl-9">
            <div className="grid grid-cols-52 gap-1 w-full" style={{ gridTemplateColumns: 'repeat(52, minmax(0, 1fr))' }}>
              {Array.from({ length: 52 }).map((_, wIdx) => {
                const found = monthHeaders.find((m) => m.weekIndex === wIdx);
                const isHighlightMonth = found && (found.label === 'Aug' || found.label === 'Sep' || found.label === 'Oct');
                return (
                  <div
                    key={wIdx}
                    className={`text-[10px] font-mono leading-none ${
                      isHighlightMonth
                        ? 'text-teal-700 dark:text-teal-300 font-bold'
                        : 'text-theme-text-muted'
                    }`}
                  >
                    {found ? found.label : ''}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-start">
            {/* Days of week labels */}
            <div className="grid grid-rows-7 gap-1 w-8 mr-1 text-[9px] font-mono text-theme-text-muted shrink-0">
              {DAY_NAMES.map((dayName) => (
                <div key={dayName} className="h-3 flex items-center leading-none">
                  {dayName}
                </div>
              ))}
            </div>

            {/* 52 Columns x 7 Rows Grid */}
            <div className="grid grid-flow-col grid-rows-7 gap-1 flex-1">
              {weeks.map((weekCol, wIdx) =>
                weekCol.map((day, dIdx) => (
                  <div
                    key={`${wIdx}-${dIdx}`}
                    title={`${day.dateStr} — ${day.level > 0 ? `Active Level ${day.level}` : 'Blank / Inactive'}`}
                    className={`w-3 h-3 rounded-[2px] transition-colors ${
                      day.isFuture
                        ? 'opacity-20 heatmap-0 border border-theme-border/40'
                        : day.level === 0
                        ? 'heatmap-0 border border-theme-border/80'
                        : day.level === 1
                        ? 'heatmap-1'
                        : day.level === 2
                        ? 'heatmap-2'
                        : day.level === 3
                        ? 'heatmap-3'
                        : 'heatmap-4'
                    }`}
                  />
                ))
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
