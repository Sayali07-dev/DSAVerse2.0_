import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  Copy, 
  ChevronDown,
  Layers,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  HardDrive
} from 'lucide-react';
import { SubtopicCheckbox } from './SubtopicCheckbox';
import { TopicProgressHeader } from './TopicProgressHeader';

interface DryRunStep {
  passNumber: number;
  totalPasses: number;
  title: string;
  description: string;
  items: number[];
  comparingIndices?: number[];
  swappingIndices?: number[];
  sortedIndices?: number[];
  pivotIndex?: number;
  minIndex?: number;
  pointers?: Record<string, number | string>;
  isCompleted?: boolean;
}

const CodeBox: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-teal-400">
        <span className="font-semibold">C++ Implementation</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-3.5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">
        {code}
      </pre>
    </div>
  );
};

const InteractiveSortDryRun: React.FC<{
  steps: DryRunStep[];
  title?: string;
  passLabel?: string;
}> = ({ steps, title }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1800);

  const step = steps[currentStep] || steps[0];

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, steps.length]);

  // Jump to next pass
  const handleNextPass = () => {
    setIsPlaying(false);
    const currentPass = step.passNumber;
    const nextPassIndex = steps.findIndex(
      (s, idx) => idx > currentStep && s.passNumber > currentPass
    );
    if (nextPassIndex !== -1) {
      setCurrentStep(nextPassIndex);
    } else {
      setCurrentStep(steps.length - 1);
    }
  };

  return (
    <div className="my-4 p-4 sm:p-5 rounded-2xl bg-slate-900/95 border border-teal-500/30 shadow-xl space-y-4">
      {/* Player Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${step.isCompleted ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
          <h4 className="text-xs sm:text-sm font-bold text-teal-300">
            {title || 'Visual Dry Run'}
          </h4>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold">
            Step {currentStep + 1} / {steps.length}
          </span>
        </div>

        {/* Pass count & Controls */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
            Pass {step.passNumber} of {step.totalPasses}
          </span>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center space-x-1 cursor-pointer transition-colors ${
              isPlaying
                ? 'bg-amber-600 text-white border-amber-500'
                : 'bg-slate-800 text-teal-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setCurrentStep((p) => Math.max(0, p - 1));
            }}
            disabled={currentStep === 0}
            className="px-2.5 py-1 rounded-lg border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
          >
            Prev
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setCurrentStep((p) => Math.min(steps.length - 1, p + 1));
            }}
            disabled={currentStep >= steps.length - 1}
            className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold disabled:opacity-40 cursor-pointer"
          >
            Step
          </button>

          <button
            type="button"
            onClick={handleNextPass}
            disabled={currentStep >= steps.length - 1}
            className="px-2.5 py-1 rounded-lg bg-indigo-600/40 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-200 text-xs font-medium disabled:opacity-40 cursor-pointer hidden md:inline-flex"
            title="Jump to Next Pass"
          >
            Finish Pass
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setCurrentStep(0);
            }}
            className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            title="Reset to Beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="px-1.5 py-1 text-[11px] bg-slate-800 border border-slate-700 rounded-lg text-slate-300 font-mono"
            title="Playback Speed"
          >
            <option value={2400}>0.75x</option>
            <option value={1800}>1x</option>
            <option value={1000}>1.5x</option>
            <option value={600}>2x</option>
          </select>
        </div>
      </div>

      {/* Array Elements / State Visualization */}
      <div className="py-4 px-3 sm:px-4 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col items-center justify-center space-y-3 overflow-x-auto">
        <div className="flex items-end justify-center space-x-2 sm:space-x-3 py-3 min-w-max">
          {step.items.map((val, idx) => {
            const isComparing = step.comparingIndices?.includes(idx);
            const isSwapping = step.swappingIndices?.includes(idx);
            const isSorted = step.sortedIndices?.includes(idx);
            const isPivot = step.pivotIndex === idx;
            const isMin = step.minIndex === idx;

            // Bar heights proportional to val (min height 48px, max 96px)
            const maxVal = Math.max(...step.items, 1);
            const heightPx = Math.max(44, Math.round((val / maxVal) * 88));

            return (
              <div key={idx} className="flex flex-col items-center">
                {/* Status tag */}
                <div className="h-5 flex items-center justify-center">
                  {isPivot && (
                    <span className="text-[10px] font-mono font-bold px-1 rounded bg-purple-500/30 text-purple-300 border border-purple-500/40">
                      pivot
                    </span>
                  )}
                  {isMin && !isPivot && (
                    <span className="text-[10px] font-mono font-bold px-1 rounded bg-amber-500/30 text-amber-300 border border-amber-500/40">
                      min
                    </span>
                  )}
                  {isSwapping && !isPivot && !isMin && (
                    <span className="text-[10px] font-mono font-bold px-1 rounded bg-rose-500/30 text-rose-300 border border-rose-500/40">
                      swap
                    </span>
                  )}
                  {isComparing && !isSwapping && !isPivot && !isMin && (
                    <span className="text-[10px] font-mono font-bold px-1 rounded bg-teal-500/30 text-teal-300 border border-teal-500/40">
                      cmp
                    </span>
                  )}
                  {isSorted && !isSwapping && !isPivot && !isMin && !isComparing && (
                    <span className="text-[9px] font-mono text-emerald-400">
                      sorted
                    </span>
                  )}
                </div>

                {/* Animated Number Box / Bar */}
                <div
                  style={{ height: `${heightPx}px` }}
                  className={`w-10 sm:w-12 rounded-xl flex items-center justify-center font-mono text-sm sm:text-base font-bold transition-all duration-300 shadow-md ${
                    isSwapping
                      ? 'bg-gradient-to-t from-rose-600 to-rose-500 text-white ring-4 ring-rose-400/50 scale-105 animate-bounce'
                      : isPivot
                      ? 'bg-gradient-to-t from-purple-700 to-purple-500 text-white ring-4 ring-purple-400/50 scale-105'
                      : isComparing
                      ? 'bg-gradient-to-t from-teal-600 to-teal-500 text-white ring-4 ring-teal-400/50 scale-105'
                      : isMin
                      ? 'bg-gradient-to-t from-amber-600 to-amber-500 text-white ring-4 ring-amber-400/50 scale-105'
                      : isSorted
                      ? 'bg-gradient-to-t from-emerald-800 to-emerald-600 text-emerald-100 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {val}
                </div>

                {/* Index tag */}
                <span className="text-[10px] font-mono text-slate-500 mt-1.5">
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Readout of current pointers / variables */}
        {step.pointers && Object.keys(step.pointers).length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-900 w-full text-xs font-mono">
            {Object.entries(step.pointers).map(([key, value]) => (
              <span
                key={key}
                className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-teal-300 font-semibold text-[11px]"
              >
                {key} = <span className="text-white">{value}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-slate-400 pt-1">
        <span className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded bg-teal-500" />
          <span>Comparing</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded bg-rose-500" />
          <span>Swapping / Moving</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded bg-purple-500" />
          <span>Pivot</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded bg-amber-500" />
          <span>Minimum</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded bg-emerald-600" />
          <span>Sorted Position</span>
        </span>
      </div>

      {/* Pass Explanation Banner */}
      <div
        className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed border ${
          step.isCompleted
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
            : 'bg-slate-950 border-slate-800 text-slate-200'
        }`}
      >
        <div className="flex items-center space-x-2 font-semibold mb-1 text-teal-400">
          <span>{step.title}</span>
        </div>
        <p className="text-slate-300 leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
};

export const SortingLearningView: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
  });

  const cardIds = [1, 2, 3, 4, 5, 6, 7, 8];
  const allExpanded = cardIds.every((id) => expandedCards[id]);

  const toggleAll = () => {
    const nextVal = !allExpanded;
    const next: Record<number, boolean> = {};
    cardIds.forEach((id) => {
      next[id] = nextVal;
    });
    setExpandedCards(next);
  };

  const toggleCard = (id: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // --- DRY RUN DATA ---

  // 1. Bubble Sort: [5, 2, 7, 1, 6, 3, 4]
  const bubbleSortSteps: DryRunStep[] = [
    {
      passNumber: 1,
      totalPasses: 6,
      title: 'Pass 1 · Comparison 1 of 6 · Compare 5 and 2',
      description: 'Adjacent elements arr[0] (5) and arr[1] (2) are compared. Since 5 > 2, they are in the wrong order and must swap.',
      items: [5, 2, 7, 1, 6, 3, 4],
      comparingIndices: [0, 1],
      pointers: { 'arr[0]': 5, 'arr[1]': 2, 'swaps': 0 }
    },
    {
      passNumber: 1,
      totalPasses: 6,
      title: 'Pass 1 · Swap Performed: 5 and 2 swapped',
      description: 'Result: 2, 5; 5 moves one place right. Next we will compare adjacent elements at indices 1 and 2.',
      items: [2, 5, 7, 1, 6, 3, 4],
      swappingIndices: [0, 1],
      pointers: { 'arr[0]': 2, 'arr[1]': 5, 'swaps': 1 }
    },
    {
      passNumber: 1,
      totalPasses: 6,
      title: 'Pass 1 · Comparison 2 of 6 · Compare 5 and 7',
      description: 'arr[1] (5) <= arr[2] (7). No swap needed. 5 stays before 7.',
      items: [2, 5, 7, 1, 6, 3, 4],
      comparingIndices: [1, 2],
      pointers: { 'arr[1]': 5, 'arr[2]': 7, 'swaps': 1 }
    },
    {
      passNumber: 1,
      totalPasses: 6,
      title: 'Pass 1 · Comparison 3 of 6 · Compare 7 and 1',
      description: '7 > 1 -> Swap needed! 7 bubbles to the right.',
      items: [2, 5, 7, 1, 6, 3, 4],
      comparingIndices: [2, 3],
      swappingIndices: [2, 3],
      pointers: { 'arr[2]': 7, 'arr[3]': 1, 'swaps': 2 }
    },
    {
      passNumber: 1,
      totalPasses: 6,
      title: 'Pass 1 · After Swapping 7 and 1',
      description: 'Array is now [2, 5, 1, 7, 6, 3, 4]. Now comparing 7 with 6.',
      items: [2, 5, 1, 7, 6, 3, 4],
      comparingIndices: [3, 4],
      swappingIndices: [3, 4],
      pointers: { 'swaps': 3 }
    },
    {
      passNumber: 1,
      totalPasses: 6,
      title: 'Pass 1 · Comparison 5 of 6 · 7 bubbles past 3 and 4',
      description: '7 is swapped with 3 and then with 4, bubbling to the last index of the array.',
      items: [2, 5, 1, 6, 3, 4, 7],
      sortedIndices: [6],
      pointers: { 'largest moved': 7, 'sorted index': 6 }
    },
    {
      passNumber: 2,
      totalPasses: 6,
      title: 'Pass 2 · Bubbling the next largest (6)',
      description: 'Comparing adjacent elements up to index 5. 6 bubbles past remaining smaller values and settles at index 5.',
      items: [2, 1, 5, 3, 4, 6, 7],
      sortedIndices: [5, 6],
      pointers: { 'Pass': 2, 'Sorted elements': 2 }
    },
    {
      passNumber: 3,
      totalPasses: 6,
      title: 'Pass 3 · Bubbling 5 to index 4',
      description: 'Scanning prefix: 5 moves into its sorted position at index 4.',
      items: [1, 2, 3, 4, 5, 6, 7],
      sortedIndices: [4, 5, 6],
      pointers: { 'Pass': 3, 'Sorted elements': 3 }
    },
    {
      passNumber: 4,
      totalPasses: 6,
      title: 'Pass 4 · Early Termination Check',
      description: 'Pass 4 scans adjacent pairs [1, 2], [2, 3], [3, 4]. No swaps occur! swapped flag remains false. Algorithm breaks early!',
      items: [1, 2, 3, 4, 5, 6, 7],
      sortedIndices: [0, 1, 2, 3, 4, 5, 6],
      isCompleted: true,
      pointers: { 'swapped': 'false', 'Status': 'Sorted!' }
    }
  ];

  // 2. Selection Sort: [6, 3, 8, 2, 7, 1, 5, 4]
  const selectionSortSteps: DryRunStep[] = [
    {
      passNumber: 1,
      totalPasses: 7,
      title: 'Pass 1 · Scan unsorted suffix for Minimum (init minIndex = 0)',
      description: 'Unsorted suffix starts at index 0 (val 6). Compare 3 with 6; 3 is smaller, so minIndex becomes 1 (val 3).',
      items: [6, 3, 8, 2, 7, 1, 5, 4],
      comparingIndices: [0, 1],
      minIndex: 1,
      pointers: { 'i': 0, 'minIndex': 1, 'minVal': 3 }
    },
    {
      passNumber: 1,
      totalPasses: 7,
      title: 'Pass 1 · Continuing Scan · Found smaller element 2 at index 3',
      description: 'Scanning forward: 2 < 3, so minIndex updates to 3 (val 2). The bars stay fixed while this pass scans.',
      items: [6, 3, 8, 2, 7, 1, 5, 4],
      comparingIndices: [3],
      minIndex: 3,
      pointers: { 'i': 0, 'minIndex': 3, 'minVal': 2 }
    },
    {
      passNumber: 1,
      totalPasses: 7,
      title: 'Pass 1 · Minimum 1 found at index 5',
      description: 'Scanning forward: 1 < 2, so minIndex updates to 5 (val 1). Final elements 5 and 4 are not smaller than 1.',
      items: [6, 3, 8, 2, 7, 1, 5, 4],
      comparingIndices: [5],
      minIndex: 5,
      pointers: { 'i': 0, 'minIndex': 5, 'minVal': 1 }
    },
    {
      passNumber: 1,
      totalPasses: 7,
      title: 'Pass 1 Swap · Swap arr[0] (6) with arr[minIndex] (1)',
      description: 'Swap 6 and 1. Value 1 is now permanently locked into its correct sorted position at index 0!',
      items: [1, 3, 8, 2, 7, 6, 5, 4],
      swappingIndices: [0, 5],
      sortedIndices: [0],
      pointers: { 'swapped': '6 <-> 1', 'sorted count': 1 }
    },
    {
      passNumber: 2,
      totalPasses: 7,
      title: 'Pass 2 · Find minimum in suffix [3, 8, 2, 7, 6, 5, 4]',
      description: 'Scanning suffix from index 1. Smallest element is 2 at index 3. Swap arr[1] (3) with arr[3] (2).',
      items: [1, 2, 8, 3, 7, 6, 5, 4],
      swappingIndices: [1, 3],
      sortedIndices: [0, 1],
      pointers: { 'i': 1, 'swapped': '3 <-> 2', 'sorted count': 2 }
    },
    {
      passNumber: 3,
      totalPasses: 7,
      title: 'Pass 3 · Find minimum in suffix [8, 3, 7, 6, 5, 4]',
      description: 'Smallest element is 3 at index 3. Swap arr[2] (8) with arr[3] (3).',
      items: [1, 2, 3, 8, 7, 6, 5, 4],
      swappingIndices: [2, 3],
      sortedIndices: [0, 1, 2],
      pointers: { 'i': 2, 'swapped': '8 <-> 3', 'sorted count': 3 }
    },
    {
      passNumber: 4,
      totalPasses: 7,
      title: 'Pass 4 & Subsequent Passes · Final Sorted Array',
      description: 'Subsequent passes place 4, 5, 6, 7, and 8 into their respective minimum positions. All elements sorted!',
      items: [1, 2, 3, 4, 5, 6, 7, 8],
      sortedIndices: [0, 1, 2, 3, 4, 5, 6, 7],
      isCompleted: true,
      pointers: { 'Status': 'Fully Sorted', 'Passes': 7 }
    }
  ];

  // 3. Insertion Sort: [7, 3, 8, 2, 6, 4, 5]
  const insertionSortSteps: DryRunStep[] = [
    {
      passNumber: 1,
      totalPasses: 6,
      title: 'Start: 1 Sorted Value · arr[0] = 7 is sorted prefix',
      description: 'Insertion Sort starts with the first element (7) as the sorted prefix. Pass 1 begins with key = arr[1] = 3.',
      items: [7, 3, 8, 2, 6, 4, 5],
      sortedIndices: [0],
      comparingIndices: [1],
      pointers: { 'key': 3, 'sorted prefix': '[7]' }
    },
    {
      passNumber: 1,
      totalPasses: 6,
      title: 'Pass 1 of 6 · Compare 7 > 3, Shift 7 right and insert 3',
      description: 'Since 7 > 3, shift 7 to index 1. Place 3 at index 0. Sorted prefix is now [3, 7].',
      items: [3, 7, 8, 2, 6, 4, 5],
      swappingIndices: [0, 1],
      sortedIndices: [0, 1],
      pointers: { 'key': 3, 'sorted prefix': '[3, 7]' }
    },
    {
      passNumber: 2,
      totalPasses: 6,
      title: 'Pass 2 of 6 · Key = arr[2] = 8',
      description: 'Compare 8 with 7: 8 > 7, so 8 is already in correct relative position. No shifts needed. Sorted prefix is [3, 7, 8].',
      items: [3, 7, 8, 2, 6, 4, 5],
      comparingIndices: [1, 2],
      sortedIndices: [0, 1, 2],
      pointers: { 'key': 8, 'shifts': 0 }
    },
    {
      passNumber: 3,
      totalPasses: 6,
      title: 'Pass 3 of 6 · Key = arr[3] = 2',
      description: '2 is smaller than 8, 7, and 3. Shift 8, 7, 3 right. Insert 2 at index 0. Sorted prefix is now [2, 3, 7, 8].',
      items: [2, 3, 7, 8, 6, 4, 5],
      swappingIndices: [0, 3],
      sortedIndices: [0, 1, 2, 3],
      pointers: { 'key': 2, 'shifts': 3 }
    },
    {
      passNumber: 4,
      totalPasses: 6,
      title: 'Pass 4 of 6 · Key = arr[4] = 6',
      description: '6 is smaller than 8 and 7, but greater than 3. Shift 8 and 7 right, insert 6 at index 2. Sorted prefix: [2, 3, 6, 7, 8].',
      items: [2, 3, 6, 7, 8, 4, 5],
      swappingIndices: [2, 4],
      sortedIndices: [0, 1, 2, 3, 4],
      pointers: { 'key': 6, 'shifts': 2 }
    },
    {
      passNumber: 5,
      totalPasses: 6,
      title: 'Pass 5 of 6 · Key = arr[5] = 4',
      description: 'Shift 8, 7, 6 right. Insert 4 at index 2. Sorted prefix: [2, 3, 4, 6, 7, 8].',
      items: [2, 3, 4, 6, 7, 8, 5],
      swappingIndices: [2, 5],
      sortedIndices: [0, 1, 2, 3, 4, 5],
      pointers: { 'key': 4, 'shifts': 3 }
    },
    {
      passNumber: 6,
      totalPasses: 6,
      title: 'Pass 6 of 6 · Key = arr[6] = 5',
      description: 'Shift 8, 7, 6 right. Insert 5 at index 3. All 7 elements are now placed in their exact sorted order!',
      items: [2, 3, 4, 5, 6, 7, 8],
      sortedIndices: [0, 1, 2, 3, 4, 5, 6],
      isCompleted: true,
      pointers: { 'key': 5, 'Status': 'Sorted!' }
    }
  ];

  // 4. Merge Sort: [38, 27, 43, 3, 9, 82, 10]
  const mergeSortSteps: DryRunStep[] = [
    {
      passNumber: 1,
      totalPasses: 5,
      title: 'Divide Phase · Original Array [38, 27, 43, 3, 9, 82, 10]',
      description: 'Divide into two halves: Left half [38, 27, 43, 3] and Right half [9, 82, 10]. Values begin in their original order.',
      items: [38, 27, 43, 3, 9, 82, 10],
      comparingIndices: [0, 1, 2, 3],
      pointers: { 'left': '0..3', 'right': '4..6', 'mid': 3 }
    },
    {
      passNumber: 2,
      totalPasses: 5,
      title: 'Recursive Subdivision to Unit Size',
      description: 'Subdivide arrays until subproblems have size 1: [38], [27], [43], [3], [9], [82], [10]. Single-element arrays are trivially sorted.',
      items: [38, 27, 43, 3, 9, 82, 10],
      pointers: { 'base cases': '7 sublists of size 1' }
    },
    {
      passNumber: 3,
      totalPasses: 5,
      title: 'Merge Step 1 · Merging 2-element subarrays',
      description: 'Merge [38] & [27] -> [27, 38]. Merge [43] & [3] -> [3, 43]. Merge [9] & [82] -> [9, 82].',
      items: [27, 38, 3, 43, 9, 82, 10],
      comparingIndices: [0, 1, 2, 3],
      pointers: { 'merged pairs': 3 }
    },
    {
      passNumber: 4,
      totalPasses: 5,
      title: 'Merge Step 2 · Merging 4-element left half and 3-element right half',
      description: 'Merge [27, 38] with [3, 43] -> [3, 27, 38, 43]. Merge [9, 82] with [10] -> [9, 10, 82].',
      items: [3, 27, 38, 43, 9, 10, 82],
      comparingIndices: [0, 1, 2, 3],
      sortedIndices: [0, 1, 2, 3],
      pointers: { 'left sorted': '[3, 27, 38, 43]', 'right sorted': '[9, 10, 82]' }
    },
    {
      passNumber: 5,
      totalPasses: 5,
      title: 'Merge Step 3 · Final Two-Way Linear Merge',
      description: 'Compare smallest elements from left and right using pointers i and j. Build final array: [3, 9, 10, 27, 38, 43, 82]. Guaranteed O(n log n) comparisons!',
      items: [3, 9, 10, 27, 38, 43, 82],
      sortedIndices: [0, 1, 2, 3, 4, 5, 6],
      isCompleted: true,
      pointers: { 'Status': 'Sorted!', 'Total comparisons': 12 }
    }
  ];

  // 5. Quick Sort: [10, 80, 30, 90, 40, 50, 70]
  const quickSortSteps: DryRunStep[] = [
    {
      passNumber: 1,
      totalPasses: 4,
      title: 'Lomuto Partition · Choose Pivot = 70 (high index 6)',
      description: 'Pick pivot = arr[6] = 70. Initialize i = low - 1 (-1). Pointer j scans from index 0 to 5.',
      items: [10, 80, 30, 90, 40, 50, 70],
      pivotIndex: 6,
      pointers: { 'pivot': 70, 'i': -1, 'j': 0 }
    },
    {
      passNumber: 1,
      totalPasses: 4,
      title: 'Scan j=0: 10 < 70 -> Increment i to 0, swap arr[0] with arr[0]',
      description: '10 is smaller than pivot. i becomes 0. 10 stays at index 0.',
      items: [10, 80, 30, 90, 40, 50, 70],
      comparingIndices: [0],
      pivotIndex: 6,
      pointers: { 'i': 0, 'j': 0, 'arr[j]': 10 }
    },
    {
      passNumber: 1,
      totalPasses: 4,
      title: 'Scan j=2: 30 < 70 -> Increment i to 1, swap arr[1] (80) & arr[2] (30)',
      description: '80 > 70 was skipped. 30 < 70 triggers swap! 30 moves left of the partition boundary.',
      items: [10, 30, 80, 90, 40, 50, 70],
      swappingIndices: [1, 2],
      pivotIndex: 6,
      pointers: { 'i': 1, 'j': 2, 'swapped': '80 <-> 30' }
    },
    {
      passNumber: 1,
      totalPasses: 4,
      title: 'Scan j=4 & j=5: 40 and 50 are < 70 -> Swap into smaller region',
      description: '40 swaps with 90, then 50 swaps with 80. Array becomes [10, 30, 40, 50, 90, 80, 70]. i is now 3.',
      items: [10, 30, 40, 50, 90, 80, 70],
      comparingIndices: [3, 4],
      pivotIndex: 6,
      pointers: { 'i': 3, 'smaller elements count': 4 }
    },
    {
      passNumber: 1,
      totalPasses: 4,
      title: 'Place Pivot into Correct Position: Swap arr[i+1] (90) with Pivot (70)',
      description: 'Swap 90 at index 4 with pivot 70 at index 6. 70 is now at index 4 with all elements <= 70 on left and > 70 on right!',
      items: [10, 30, 40, 50, 70, 80, 90],
      swappingIndices: [4, 6],
      sortedIndices: [4],
      pivotIndex: 4,
      pointers: { 'pivot index': 4, 'left': '0..3', 'right': '5..6' }
    },
    {
      passNumber: 2,
      totalPasses: 4,
      title: 'Recursive Sorting of Subarrays',
      description: 'QuickSort recursively sorts left partition [10, 30, 40, 50] and right partition [80, 90]. Entire array is sorted in-place!',
      items: [10, 30, 40, 50, 70, 80, 90],
      sortedIndices: [0, 1, 2, 3, 4, 5, 6],
      isCompleted: true,
      pointers: { 'Status': 'Sorted!', 'Extra Space': 'O(log n)' }
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <TopicProgressHeader topicId="sorting" topicTitle="Sorting Algorithms" />
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-emerald-950/40 border border-teal-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-teal-400 text-xs font-mono font-bold tracking-wider uppercase mb-1">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Core Algorithms Module</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sorting Algorithms & Analysis
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Master fundamental sorting techniques with comprehensive theory, standard C++ code implementations, and step-by-step visual dry run animations with pass counters.
          </p>
        </div>

        <button
          type="button"
          onClick={toggleAll}
          className="self-start md:self-center px-4 py-2 rounded-xl bg-teal-600/30 hover:bg-teal-600/50 border border-teal-500/40 text-teal-200 text-xs font-bold transition-all cursor-pointer shrink-0 shadow-sm"
        >
          {allExpanded ? 'Collapse All Cards' : 'Expand All Cards'}
        </button>
      </div>

      {/* CARD 1: Bubble Sort */}
      <div className="rounded-2xl border border-teal-500/20 bg-slate-900/90 overflow-hidden shadow-lg transition-all">
        <button
          type="button"
          onClick={() => toggleCard(1)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-900 hover:bg-slate-800/80 transition-colors cursor-pointer border-b border-slate-800"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="sorting" subtopicId={1} title="Bubble Sort" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              1
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Bubble Sort</h3>
              <p className="text-xs text-slate-400 font-mono">Repeatedly swap adjacent elements · O(n²) worst / O(n) best</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold hidden sm:inline-block">
              Stable · In-Place
            </span>
            <ChevronDown
              className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
                expandedCards[1] ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {expandedCards[1] && (
          <div className="p-5 sm:p-6 space-y-5 text-slate-200 text-sm">
            {/* Theory */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Theory</span>
              </h4>
              <p className="leading-relaxed text-slate-300">
                Bubble Sort compares adjacent elements and swaps them if they are in the wrong order. After each pass, the largest unsorted element moves to the end.
              </p>
              <div className="mt-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                <span className="text-teal-400 font-bold">Compare 5 and 2 → swap</span>
                <p className="mt-1 text-slate-400">
                  Pass 1 Comparison 1 of 6 · 1 swap: [5, 2, 7, 1, 6, 3, 4] → Result: 2, 5; 5 moves one place right.
                </p>
              </div>
            </div>

            {/* Visual Dry Run */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1 flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Visual Dry Run (Pass-by-Pass)</span>
              </h4>
              <InteractiveSortDryRun steps={bubbleSortSteps} title="Bubble Sort Dry Run • [5, 2, 7, 1, 6, 3, 4]" />
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Function
              </h4>
              <CodeBox
                code={`void bubbleSort(vector<int>& arr) {
    int n = arr.size();

    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;

        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }

        if (!swapped) break;
    }
}`}
              />
            </div>

            {/* Complexity & Specs */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-teal-300 font-mono text-xs block">
                Example: &#123;5, 2, 4&#125; → &#123;2, 4, 5&#125;
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span><strong>Best time:</strong> O(n) with the swapped optimization shown</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span><strong>Average/Worst time:</strong> O(n²)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span><strong>Extra space:</strong> O(1)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>Stable:</strong> Yes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>In-place:</strong> Yes</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* CARD 2: Selection Sort */}
      <div className="rounded-2xl border border-teal-500/20 bg-slate-900/90 overflow-hidden shadow-lg transition-all">
        <button
          type="button"
          onClick={() => toggleCard(2)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-900 hover:bg-slate-800/80 transition-colors cursor-pointer border-b border-slate-800"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="sorting" subtopicId={2} title="Selection Sort" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              2
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Selection Sort</h3>
              <p className="text-xs text-slate-400 font-mono">Find minimum element and place at front · O(n²) all cases</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold hidden sm:inline-block">
              Unstable · In-Place
            </span>
            <ChevronDown
              className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
                expandedCards[2] ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {expandedCards[2] && (
          <div className="p-5 sm:p-6 space-y-5 text-slate-200 text-sm">
            {/* Theory */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Theory</span>
              </h4>
              <p className="leading-relaxed text-slate-300">
                Selection Sort finds the smallest element in the unsorted part and swaps it with the first element of that part.
              </p>
              <div className="mt-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                <span className="text-teal-400 font-bold">Pass 1: scan the unsorted suffix</span>
                <p className="mt-1 text-slate-400">
                  Comparison 1 of 7 comparisons · 0 sorted · Minimum 6 · Comparing 3: Compare 3 with 6; the bars stay fixed while this pass scans.
                </p>
              </div>
            </div>

            {/* Visual Dry Run */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1 flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Visual Dry Run (Pass-by-Pass)</span>
              </h4>
              <InteractiveSortDryRun steps={selectionSortSteps} title="Selection Sort Dry Run • [6, 3, 8, 2, 7, 1, 5, 4]" />
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Function
              </h4>
              <CodeBox
                code={`void selectionSort(vector<int>& arr) {
    int n = arr.size();

    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;

        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        swap(arr[i], arr[minIndex]);
    }
}`}
              />
            </div>

            {/* Complexity & Specs */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-teal-300 font-mono text-xs block">
                Example: &#123;5, 2, 4&#125; → &#123;2, 4, 5&#125;
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span><strong>Best/Average/Worst time:</strong> O(n²)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span><strong>Extra space:</strong> O(1)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span><strong>Stable:</strong> No, in its standard implementation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>In-place:</strong> Yes</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* CARD 3: Insertion Sort */}
      <div className="rounded-2xl border border-teal-500/20 bg-slate-900/90 overflow-hidden shadow-lg transition-all">
        <button
          type="button"
          onClick={() => toggleCard(3)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-900 hover:bg-slate-800/80 transition-colors cursor-pointer border-b border-slate-800"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="sorting" subtopicId={3} title="Insertion Sort" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              3
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Insertion Sort</h3>
              <p className="text-xs text-slate-400 font-mono">Insert each element into sorted prefix · O(n) best / O(n²) worst</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold hidden sm:inline-block">
              Stable · In-Place · Adaptive
            </span>
            <ChevronDown
              className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
                expandedCards[3] ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {expandedCards[3] && (
          <div className="p-5 sm:p-6 space-y-5 text-slate-200 text-sm">
            {/* Theory */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Theory</span>
              </h4>
              <p className="leading-relaxed text-slate-300">
                Insertion Sort takes one element at a time and inserts it into its correct position in the already-sorted part, just like arranging playing cards in your hand.
              </p>
              <div className="mt-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                <span className="text-teal-400 font-bold">Start with one sorted value</span>
                <p className="mt-1 text-slate-400">
                  Pass 1 of 6 · 1 sorted · Sorted prefix: [7], next value is 3. Compare with 7, shift 7 right, insert 3.
                </p>
              </div>
            </div>

            {/* Visual Dry Run */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1 flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Visual Dry Run (Pass-by-Pass)</span>
              </h4>
              <InteractiveSortDryRun steps={insertionSortSteps} title="Insertion Sort Dry Run • [7, 3, 8, 2, 6, 4, 5]" />
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Function
              </h4>
              <CodeBox
                code={`void insertionSort(vector<int>& arr) {
    int n = arr.size();

    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }
}`}
              />
            </div>

            {/* Complexity & Specs */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-teal-300 font-mono text-xs block">
                Example: &#123;5, 2, 4&#125; → &#123;2, 4, 5&#125;
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span><strong>Best time:</strong> O(n) when already sorted</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span><strong>Average/Worst time:</strong> O(n²)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span><strong>Extra space:</strong> O(1)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>Stable:</strong> Yes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>In-place:</strong> Yes</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* CARD 4: Merge Sort */}
      <div className="rounded-2xl border border-teal-500/20 bg-slate-900/90 overflow-hidden shadow-lg transition-all">
        <button
          type="button"
          onClick={() => toggleCard(4)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-900 hover:bg-slate-800/80 transition-colors cursor-pointer border-b border-slate-800"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="sorting" subtopicId={4} title="Merge Sort" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              4
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Merge Sort</h3>
              <p className="text-xs text-slate-400 font-mono">Divide and Conquer · Guaranteed O(n log n) all cases</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-semibold hidden sm:inline-block">
              Stable · Out-of-Place
            </span>
            <ChevronDown
              className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
                expandedCards[4] ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {expandedCards[4] && (
          <div className="p-5 sm:p-6 space-y-5 text-slate-200 text-sm">
            {/* Theory */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Theory</span>
              </h4>
              <p className="leading-relaxed text-slate-300">
                Merge Sort uses the <strong>Divide and Conquer</strong> technique:
              </p>
              <ol className="list-decimal list-inside space-y-1 mt-2 text-slate-300 text-xs sm:text-sm pl-2">
                <li><strong>Divide:</strong> Split the array into two halves at the midpoint.</li>
                <li><strong>Conquer:</strong> Sort each half recursively until reaching single-element bases.</li>
                <li><strong>Combine:</strong> Merge the sorted halves into a single sorted array.</li>
              </ol>
            </div>

            {/* Visual Dry Run */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1 flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Visual Dry Run (Pass-by-Pass)</span>
              </h4>
              <InteractiveSortDryRun steps={mergeSortSteps} title="Merge Sort Dry Run • [38, 27, 43, 3, 9, 82, 10]" />
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Function
              </h4>
              <CodeBox
                code={`void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    vector<int> L(n1), R(n2);

    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right)
        return;

    int mid = left + (right - left) / 2;

    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}`}
              />
            </div>

            {/* Complexity & Specs */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-teal-300 font-mono text-xs block">
                Example: &#123;38, 27, 43, 3, 9, 82, 10&#125; → &#123;3, 9, 10, 27, 38, 43, 82&#125;
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span><strong>Best/Average/Worst time:</strong> O(n log n)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span><strong>Extra space:</strong> O(n) auxiliary memory for merge buffer</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>Stable:</strong> Yes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span><strong>In-place:</strong> No (requires O(n) additional space)</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* CARD 5: Quick Sort */}
      <div className="rounded-2xl border border-teal-500/20 bg-slate-900/90 overflow-hidden shadow-lg transition-all">
        <button
          type="button"
          onClick={() => toggleCard(5)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-900 hover:bg-slate-800/80 transition-colors cursor-pointer border-b border-slate-800"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="sorting" subtopicId={5} title="Quick Sort" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              5
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Quick Sort</h3>
              <p className="text-xs text-slate-400 font-mono">Partition around a pivot element · O(n log n) average</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold hidden sm:inline-block">
              Unstable · In-Place
            </span>
            <ChevronDown
              className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
                expandedCards[5] ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {expandedCards[5] && (
          <div className="p-5 sm:p-6 space-y-5 text-slate-200 text-sm">
            {/* Theory */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Theory</span>
              </h4>
              <p className="leading-relaxed text-slate-300">
                Quick Sort picks an element as a <strong>pivot</strong>, partitions the array around the pivot so smaller elements go to the left and greater go to the right, and recursively sorts the sub-arrays.
              </p>
            </div>

            {/* Visual Dry Run */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1 flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Visual Dry Run (Pass-by-Pass)</span>
              </h4>
              <InteractiveSortDryRun steps={quickSortSteps} title="Quick Sort Dry Run (Lomuto Partition) • [10, 80, 30, 90, 40, 50, 70]" />
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Function (Lomuto Partition)
              </h4>
              <CodeBox
                code={`int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }

    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);

        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`}
              />
            </div>

            {/* Complexity & Specs */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-teal-300 font-mono text-xs block">
                Example: &#123;10, 80, 30, 90, 40, 50, 70&#125; with pivot 70
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span><strong>Best/Average time:</strong> O(n log n)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span><strong>Worst time:</strong> O(n²) (e.g. sorted input with worst-case pivot)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span><strong>Extra space:</strong> O(log n) call stack (in-place partitioning)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span><strong>Stable:</strong> No</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>In-place:</strong> Yes</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* CARD 6: Stable vs Unstable Sorting */}
      <div className="rounded-2xl border border-teal-500/20 bg-slate-900/90 overflow-hidden shadow-lg transition-all">
        <button
          type="button"
          onClick={() => toggleCard(6)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-900 hover:bg-slate-800/80 transition-colors cursor-pointer border-b border-slate-800"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="sorting" subtopicId={6} title="Stable vs Unstable Sorting" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              6
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Stable vs Unstable Sorting</h3>
              <p className="text-xs text-slate-400 font-mono">Preservation of relative order for identical keys</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400 hidden sm:inline" />
            <ChevronDown
              className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
                expandedCards[6] ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {expandedCards[6] && (
          <div className="p-5 sm:p-6 space-y-5 text-slate-200 text-sm">
            {/* Theory */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Theory & Definitions</span>
              </h4>
              <p className="leading-relaxed text-slate-300">
                A sorting algorithm is called <strong>Stable</strong> if two elements with equal keys appear in the same relative order in the sorted output as they appeared in the input.
              </p>
            </div>

            {/* Visual Example: Stable vs Unstable */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <span className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wider block">
                Visual Example with Duplicate Keys:
              </span>

              <div className="space-y-3 text-xs font-mono">
                {/* Input */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-slate-400 w-28 shrink-0">Input Array:</span>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded bg-teal-600/40 text-teal-200 border border-teal-500/40 font-bold">
                      5 (Blue)
                    </span>
                    <span className="px-3 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
                      2
                    </span>
                    <span className="px-3 py-1 rounded bg-amber-600/40 text-amber-200 border border-amber-500/40 font-bold">
                      5 (Orange)
                    </span>
                  </div>
                </div>

                {/* Stable Output */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-slate-900">
                  <div className="flex items-center space-x-1.5 text-emerald-400 w-28 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="font-bold">Stable Output:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
                      2
                    </span>
                    <span className="px-3 py-1 rounded bg-teal-600 text-white font-bold ring-2 ring-teal-400/50">
                      5 (Blue)
                    </span>
                    <span className="px-3 py-1 rounded bg-amber-600 text-white font-bold ring-2 ring-amber-400/50">
                      5 (Orange)
                    </span>
                    <span className="text-[11px] text-emerald-300 ml-2 font-sans font-medium">
                      ✓ Blue remains before Orange!
                    </span>
                  </div>
                </div>

                {/* Unstable Output */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-slate-900">
                  <div className="flex items-center space-x-1.5 text-rose-400 w-28 shrink-0">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span className="font-bold">Unstable Output:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
                      2
                    </span>
                    <span className="px-3 py-1 rounded bg-amber-600 text-white font-bold ring-2 ring-amber-400/50">
                      5 (Orange)
                    </span>
                    <span className="px-3 py-1 rounded bg-teal-600 text-white font-bold ring-2 ring-teal-400/50">
                      5 (Blue)
                    </span>
                    <span className="text-[11px] text-rose-300 ml-2 font-sans font-medium">
                      ✗ Long-distance swap inverted original order!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Categorization Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-teal-300 font-mono border-b border-slate-800">
                    <th className="p-3">Category</th>
                    <th className="p-3">Algorithms</th>
                    <th className="p-3">Why / Mechanics</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-sans">
                  <tr>
                    <td className="p-3 font-semibold text-emerald-400 flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>Stable Sorts</span>
                    </td>
                    <td className="p-3 font-mono text-slate-200">
                      Bubble Sort, Insertion Sort, Merge Sort, Counting Sort
                    </td>
                    <td className="p-3 text-slate-400 text-xs leading-relaxed">
                      Only compares adjacent elements or preserves tie order via left-first merging (<code className="text-teal-300 font-mono">L[i] &lt;= R[j]</code>).
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-amber-400 flex items-center space-x-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                      <span>Unstable Sorts</span>
                    </td>
                    <td className="p-3 font-mono text-slate-200">
                      Selection Sort, Quick Sort, Heap Sort
                    </td>
                    <td className="p-3 text-slate-400 text-xs leading-relaxed">
                      Performs long-distance swaps across multiple indices, which can jump over duplicate keys and reorder them.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-xs text-teal-200 leading-relaxed">
              <strong>Practical Importance:</strong> Stability is critical when sorting records on multiple fields (e.g., sorting employees first by Department, and then by Salary without scrambling the previous alphabetical or department grouping).
            </div>
          </div>
        )}
      </div>

      {/* CARD 7: In-Place vs Out-of-Place Sorting */}
      <div className="rounded-2xl border border-teal-500/20 bg-slate-900/90 overflow-hidden shadow-lg transition-all">
        <button
          type="button"
          onClick={() => toggleCard(7)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-900 hover:bg-slate-800/80 transition-colors cursor-pointer border-b border-slate-800"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="sorting" subtopicId={7} title="In-Place vs Out-of-Place Sorting" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              7
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">In-Place vs Out-of-Place Sorting</h3>
              <p className="text-xs text-slate-400 font-mono">Auxiliary memory consumption and buffer allocation</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <HardDrive className="w-4 h-4 text-teal-400 hidden sm:inline" />
            <ChevronDown
              className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
                expandedCards[7] ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {expandedCards[7] && (
          <div className="p-5 sm:p-6 space-y-5 text-slate-200 text-sm">
            {/* Theory */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Memory Overhead Definitions</span>
              </h4>
              <p className="leading-relaxed text-slate-300">
                Sorting algorithms are categorized based on whether they rearrange elements inside the original array or require allocating temporary auxiliary memory arrays:
              </p>
            </div>

            {/* Side-by-side comparison cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold font-mono text-xs uppercase">
                  <HardDrive className="w-4 h-4" />
                  <span>In-Place Sorting</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Transforms the input array without allocating extra auxiliary memory proportional to the input size (requires <strong>O(1)</strong> extra space, or <strong>O(log n)</strong> recursion call stack).
                </p>
                <div className="pt-2 border-t border-slate-900 text-xs font-mono text-emerald-300">
                  Examples: Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, Heap Sort.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2">
                <div className="flex items-center space-x-2 text-indigo-400 font-bold font-mono text-xs uppercase">
                  <Layers className="w-4 h-4" />
                  <span>Out-of-Place Sorting</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Requires additional memory buffers proportional to the input size (typically <strong>O(n)</strong> auxiliary array storage) to store intermediate merged or copied segments.
                </p>
                <div className="pt-2 border-t border-slate-900 text-xs font-mono text-indigo-300">
                  Examples: Merge Sort (standard array merge), Counting Sort, Radix Sort.
                </div>
              </div>
            </div>

            {/* Memory breakdown table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-teal-300 font-mono border-b border-slate-800">
                    <th className="p-3">Algorithm</th>
                    <th className="p-3">Extra Memory</th>
                    <th className="p-3">In-Place?</th>
                    <th className="p-3">Primary Memory Consumer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-mono">
                  <tr>
                    <td className="p-3 font-semibold text-white">Bubble Sort</td>
                    <td className="p-3 text-emerald-400">O(1)</td>
                    <td className="p-3 text-emerald-400">Yes</td>
                    <td className="p-3 text-slate-400 font-sans">Single temporary swap variable</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Selection Sort</td>
                    <td className="p-3 text-emerald-400">O(1)</td>
                    <td className="p-3 text-emerald-400">Yes</td>
                    <td className="p-3 text-slate-400 font-sans">Index pointer and swap variable</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Insertion Sort</td>
                    <td className="p-3 text-emerald-400">O(1)</td>
                    <td className="p-3 text-emerald-400">Yes</td>
                    <td className="p-3 text-slate-400 font-sans">Single key value variable</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Quick Sort</td>
                    <td className="p-3 text-teal-400">O(log n)</td>
                    <td className="p-3 text-emerald-400">Yes</td>
                    <td className="p-3 text-slate-400 font-sans">Recursive function call stack</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Merge Sort</td>
                    <td className="p-3 text-amber-400">O(n)</td>
                    <td className="p-3 text-rose-400">No</td>
                    <td className="p-3 text-slate-400 font-sans">Left and Right temporary arrays (vector&lt;int&gt; L, R)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* CARD 8: Summary */}
      <div className="rounded-2xl border border-teal-500/20 bg-slate-900/90 overflow-hidden shadow-lg transition-all">
        <button
          type="button"
          onClick={() => toggleCard(8)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-900 hover:bg-slate-800/80 transition-colors cursor-pointer border-b border-slate-800"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="sorting" subtopicId={8} title="Summary & Comparison Matrix" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              8
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Summary & Comparison Matrix</h3>
              <p className="text-xs text-slate-400 font-mono">Master reference sheet for all sorting algorithms</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 font-semibold hidden sm:inline-block">
              Cheat Sheet
            </span>
            <ChevronDown
              className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
                expandedCards[8] ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {expandedCards[8] && (
          <div className="p-5 sm:p-6 space-y-5 text-slate-200 text-sm">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-2 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Comprehensive Sorting Comparison</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Compare time complexity, memory footprint, stability, and ideal use cases across all major algorithms:
              </p>

              {/* Master Matrix Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800 shadow-md">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-teal-300 font-mono border-b border-slate-800">
                      <th className="p-3">Algorithm</th>
                      <th className="p-3">Best Time</th>
                      <th className="p-3">Average Time</th>
                      <th className="p-3">Worst Time</th>
                      <th className="p-3">Space</th>
                      <th className="p-3">Stable?</th>
                      <th className="p-3">In-Place?</th>
                      <th className="p-3">When to Use?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-mono">
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-bold text-white">Bubble Sort</td>
                      <td className="p-3 text-emerald-400">O(n)</td>
                      <td className="p-3 text-amber-400">O(n²)</td>
                      <td className="p-3 text-rose-400">O(n²)</td>
                      <td className="p-3 text-emerald-400">O(1)</td>
                      <td className="p-3 text-emerald-400">Yes</td>
                      <td className="p-3 text-emerald-400">Yes</td>
                      <td className="p-3 font-sans text-slate-300 text-[11px]">Educational teaching; detecting already-sorted array in 1 pass.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-bold text-white">Selection Sort</td>
                      <td className="p-3 text-rose-400">O(n²)</td>
                      <td className="p-3 text-rose-400">O(n²)</td>
                      <td className="p-3 text-rose-400">O(n²)</td>
                      <td className="p-3 text-emerald-400">O(1)</td>
                      <td className="p-3 text-rose-400">No</td>
                      <td className="p-3 text-emerald-400">Yes</td>
                      <td className="p-3 font-sans text-slate-300 text-[11px]">When write operations are extremely costly (at most n swaps).</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-bold text-white">Insertion Sort</td>
                      <td className="p-3 text-emerald-400">O(n)</td>
                      <td className="p-3 text-amber-400">O(n²)</td>
                      <td className="p-3 text-rose-400">O(n²)</td>
                      <td className="p-3 text-emerald-400">O(1)</td>
                      <td className="p-3 text-emerald-400">Yes</td>
                      <td className="p-3 text-emerald-400">Yes</td>
                      <td className="p-3 font-sans text-slate-300 text-[11px]">Small arrays (n &lt; 20) or nearly sorted / online streaming data.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-bold text-teal-300">Merge Sort</td>
                      <td className="p-3 text-emerald-400">O(n log n)</td>
                      <td className="p-3 text-emerald-400">O(n log n)</td>
                      <td className="p-3 text-emerald-400">O(n log n)</td>
                      <td className="p-3 text-amber-400">O(n)</td>
                      <td className="p-3 text-emerald-400">Yes</td>
                      <td className="p-3 text-rose-400">No</td>
                      <td className="p-3 font-sans text-slate-300 text-[11px]">Guaranteed O(n log n) requirement, linked lists, external disk sorting.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-bold text-teal-300">Quick Sort</td>
                      <td className="p-3 text-emerald-400">O(n log n)</td>
                      <td className="p-3 text-emerald-400">O(n log n)</td>
                      <td className="p-3 text-rose-400">O(n²)</td>
                      <td className="p-3 text-teal-400">O(log n)</td>
                      <td className="p-3 text-rose-400">No</td>
                      <td className="p-3 text-emerald-400">Yes</td>
                      <td className="p-3 font-sans text-slate-300 text-[11px]">Default general-purpose in-memory sorting; superb cache locality.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Decision Rules */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wider block">
                Decision Flowchart: Which Sort Should You Pick?
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400 mt-0.5 shrink-0" />
                  <span><strong>Need Guaranteed Worst-Case O(n log n) &amp; Stability:</strong> Choose <strong>Merge Sort</strong>.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400 mt-0.5 shrink-0" />
                  <span><strong>General In-Memory Speed with Minimal Memory:</strong> Choose <strong>Quick Sort</strong> (or IntroSort, as in C++ <code className="text-teal-300 font-mono">std::sort</code>).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400 mt-0.5 shrink-0" />
                  <span><strong>Small Array (n ≤ 16) or Nearly Sorted Stream:</strong> Choose <strong>Insertion Sort</strong>.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400 mt-0.5 shrink-0" />
                  <span><strong>Minimizing Memory Writes (Flash memory):</strong> Choose <strong>Selection Sort</strong>.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
