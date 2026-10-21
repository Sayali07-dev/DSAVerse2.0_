import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  Copy, 
  ChevronDown
} from 'lucide-react';
import { SubtopicCheckbox } from './SubtopicCheckbox';
import { TopicProgressHeader } from './TopicProgressHeader';

interface DryRunStep {
  passNumber: number;
  totalPasses: number;
  title: string;
  description: string;
  items: number[];
  itemLabels?: string[];
  activeIndex?: number;
  secondaryIndex?: number;
  matchedIndex?: number;
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
    <div className="my-2.5 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-teal-400">
        <span>C++</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center space-x-1 text-theme-text-muted hover:text-white transition-colors cursor-pointer"
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

const InteractiveDryRunPlayer: React.FC<{
  steps: DryRunStep[];
  targetValue: number | string;
  label?: string;
}> = ({ steps, targetValue, label }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = steps[currentStep] || steps[0];

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1800);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <div className="my-4 p-4 sm:p-5 rounded-2xl bg-slate-900/95 border border-teal-500/30 shadow-lg space-y-4">
      {/* Player Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h4 className="text-xs sm:text-sm font-bold text-teal-300">
            Visual Dry Run {label ? `• ${label}` : ''}
          </h4>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold">
            Target: {targetValue}
          </span>
        </div>

        {/* Pass count & Controls */}
        <div className="flex items-center space-x-2">
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
            <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Auto Play'}</span>
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
            Next
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setCurrentStep(0);
            }}
            className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            title="Reset to Pass 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Array Elements / Search Range Visualization */}
      <div className="py-4 px-2 sm:px-4 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col items-center justify-center space-y-3 overflow-x-auto">
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 py-2 min-w-max">
          {step.items.map((val, idx) => {
            const isMatch = step.matchedIndex === idx;
            const isActive = step.activeIndex === idx;
            const isSecondary = step.secondaryIndex === idx;

            // Check if any pointers match this index
            const matchingPointers = step.pointers
              ? Object.entries(step.pointers)
                  .filter(([, pIdx]) => pIdx === idx)
                  .map(([pName]) => pName)
              : [];

            return (
              <div key={idx} className="flex flex-col items-center">
                {/* Pointer Tag */}
                <div className="h-6 flex items-center justify-center">
                  {matchingPointers.length > 0 ? (
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {matchingPointers.join(', ')}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500">
                      [{idx}]
                    </span>
                  )}
                </div>

                {/* Number Box */}
                <div
                  className={`w-10 sm:w-12 h-12 sm:h-14 rounded-xl flex items-center justify-center font-mono text-sm sm:text-base font-bold transition-all duration-200 ${
                    isMatch
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/50 shadow-lg shadow-emerald-500/40 scale-105'
                      : isActive
                      ? 'bg-teal-600 text-white ring-4 ring-teal-400/50 scale-105 shadow-md shadow-teal-600/40'
                      : isSecondary
                      ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50'
                      : 'bg-slate-800 text-slate-300 border border-slate-700/80'
                  }`}
                >
                  {val}
                </div>

                {step.itemLabels && step.itemLabels[idx] && (
                  <span className="text-[10px] font-mono text-teal-400 mt-1">
                    {step.itemLabels[idx]}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Readout of current pointers / variables */}
        {step.pointers && Object.keys(step.pointers).length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 border-t border-slate-900 w-full text-xs font-mono">
            {Object.entries(step.pointers).map(([key, value]) => (
              <span
                key={key}
                className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-teal-300 font-semibold text-[11px]"
              >
                {key} = {value}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pass Explanation Banner */}
      <div className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed border ${
        step.isCompleted
          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
          : 'bg-slate-950 border-slate-800 text-slate-200'
      }`}>
        <div className="flex items-center space-x-2 font-semibold mb-1 text-teal-400">
          <span>{step.title}</span>
        </div>
        <p className="text-slate-300 leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
};

export const SearchingLearningView: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const allExpanded = [1, 2, 3, 4, 5].every((id) => expandedCards[id]);

  const toggleAll = () => {
    const nextVal = !allExpanded;
    const next: Record<number, boolean> = {};
    [1, 2, 3, 4, 5].forEach((id) => {
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

  // 1. Linear Search Dry Run Steps
  const linearSearchSteps: DryRunStep[] = [
    {
      passNumber: 1,
      totalPasses: 3,
      title: 'Pass 1: Inspect index 0',
      description: 'Checking arr[0] = 10. Does 10 == 30? False (not found). Advance loop counter to i = 1.',
      items: [10, 20, 30, 40],
      activeIndex: 0,
      pointers: { i: 0 },
    },
    {
      passNumber: 2,
      totalPasses: 3,
      title: 'Pass 2: Inspect index 1',
      description: 'Checking arr[1] = 20. Does 20 == 30? False (not found). Advance loop counter to i = 2.',
      items: [10, 20, 30, 40],
      activeIndex: 1,
      pointers: { i: 1 },
    },
    {
      passNumber: 3,
      totalPasses: 3,
      title: 'Pass 3: Inspect index 2 (Target Matched!)',
      description: 'Checking arr[2] = 30. Does 30 == 30? True! Target found at index 2. Function immediately returns 2.',
      items: [10, 20, 30, 40],
      matchedIndex: 2,
      pointers: { i: 2 },
      isCompleted: true,
    },
  ];

  // 2. Binary Search Dry Run Steps (Example: Search 30 in [10, 20, 30, 40, 50])
  const binarySearchSteps: DryRunStep[] = [
    {
      passNumber: 1,
      totalPasses: 1,
      title: 'Pass 1: Compute middle and compare',
      description: 'Search range is [low: 0, high: 4]. mid = 0 + (4 - 0) / 2 = 2. Middle element arr[2] is 30. Target 30 matches arr[mid] immediately! Returns index 2.',
      items: [10, 20, 30, 40, 50],
      matchedIndex: 2,
      pointers: { low: 0, mid: 2, high: 4 },
      isCompleted: true,
    },
  ];

  // 3. Fibonacci Search Dry Run Steps (Array: [10, 20, 30, 40, 50, 60, 70, 80], target = 50)
  const fibonacciSearchSteps: DryRunStep[] = [
    {
      passNumber: 1,
      totalPasses: 2,
      title: 'Pass 1: Initial division with fib2 = 3',
      description: 'Smallest Fibonacci number >= 8 is fib = 8 (fib1 = 5, fib2 = 3). offset = -1. Compare at i = min(offset + fib2, n - 1) = min(-1 + 3, 7) = 2. arr[2] is 30. Since 30 < 50, discard elements up to index 2: fib = 5, fib1 = 3, fib2 = 2, offset = 2.',
      items: [10, 20, 30, 40, 50, 60, 70, 80],
      activeIndex: 2,
      pointers: { offset: -1, i: 2, fib: 8, fib2: 3 },
    },
    {
      passNumber: 2,
      totalPasses: 2,
      title: 'Pass 2: Next Fibonacci section (Target Found!)',
      description: 'With offset = 2 and fib2 = 2, inspect i = min(2 + 2, 7) = 4. arr[4] is 50. Since arr[4] == 50, target is found! Function returns index 4.',
      items: [10, 20, 30, 40, 50, 60, 70, 80],
      matchedIndex: 4,
      pointers: { offset: 2, i: 4, fib: 5 },
      isCompleted: true,
    },
  ];

  // 4. Binary Search on Answer Dry Run Steps (minimumHours(20, 5))
  const binarySearchOnAnswerSteps: DryRunStep[] = [
    {
      passNumber: 1,
      totalPasses: 5,
      title: 'Pass 1: Range [low: 0, high: 20], Test mid = 10',
      description: 'low = 0, high = 20. Candidate hours mid = 10. Items produced = 10 * 5 = 50 >= 20. Condition holds! 10 hours is valid. Search smaller values: high = 10.',
      items: [0, 5, 10, 15, 20],
      itemLabels: ['0 hrs', '5 hrs', '10 hrs', '15 hrs', '20 hrs'],
      activeIndex: 2,
      pointers: { low: '0h', mid: '10h', high: '20h' },
    },
    {
      passNumber: 2,
      totalPasses: 5,
      title: 'Pass 2: Range [low: 0, high: 10], Test mid = 5',
      description: 'low = 0, high = 10. Candidate hours mid = 5. Items produced = 5 * 5 = 25 >= 20. 5 hours is sufficient! Search smaller values: high = 5.',
      items: [0, 2, 5, 8, 10],
      itemLabels: ['0 hrs', '2 hrs', '5 hrs', '8 hrs', '10 hrs'],
      activeIndex: 2,
      pointers: { low: '0h', mid: '5h', high: '10h' },
    },
    {
      passNumber: 3,
      totalPasses: 5,
      title: 'Pass 3: Range [low: 0, high: 5], Test mid = 2',
      description: 'low = 0, high = 5. Candidate hours mid = 2. Items produced = 2 * 5 = 10 < 20. 2 hours is insufficient. Must search larger values: low = mid + 1 = 3.',
      items: [0, 1, 2, 3, 5],
      itemLabels: ['0 hrs', '1 hr', '2 hrs', '3 hrs', '5 hrs'],
      activeIndex: 2,
      pointers: { low: '0h', mid: '2h', high: '5h' },
    },
    {
      passNumber: 4,
      totalPasses: 5,
      title: 'Pass 4: Range [low: 3, high: 5], Test mid = 4',
      description: 'low = 3, high = 5. Candidate hours mid = 4. Items produced = 4 * 5 = 20 >= 20. Exactly enough! Keep high = 4.',
      items: [3, 4, 5],
      itemLabels: ['3 hrs', '4 hrs', '5 hrs'],
      activeIndex: 1,
      pointers: { low: '3h', mid: '4h', high: '5h' },
    },
    {
      passNumber: 5,
      totalPasses: 5,
      title: 'Pass 5: Range [low: 3, high: 4], Test mid = 3 (Convergence)',
      description: 'low = 3, high = 4. Candidate hours mid = 3. Items produced = 3 * 5 = 15 < 20 (insufficient). low = mid + 1 = 4. Now low == high == 4. Minimum required hours is 4!',
      items: [3, 4],
      itemLabels: ['3 hrs', '4 hrs (Answer)'],
      matchedIndex: 1,
      pointers: { low: '4h', high: '4h' },
      isCompleted: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <TopicProgressHeader topicId="searching" topicTitle="Searching Algorithms" />
      {/* Header with Title and Expand/Collapse All */}
      <div className="flex items-center justify-between pb-3 border-b border-theme-border">
        <div>
          <h2 className="text-xl font-bold text-theme-text">Searching</h2>
          <p className="text-xs text-theme-text-muted mt-0.5">
            5 Essential Searching Topics • Check the box to mark subtopic as mastered and update Roadmap progress
          </p>
        </div>
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-theme-card border border-theme-border text-teal-300 hover:border-teal-500/40 transition-colors cursor-pointer"
        >
          {allExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      <div className="space-y-3">
        {/* CARD 1: Linear Search */}
        <div
          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
            expandedCards[1]
              ? 'border-teal-500/40 bg-theme-card shadow-lg ring-1 ring-teal-500/20'
              : 'border-theme-border bg-theme-card hover:border-teal-500/30'
          }`}
        >
          <button
            type="button"
            onClick={() => toggleCard(1)}
            className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-slate-800/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3.5 pr-2">
              <SubtopicCheckbox topicId="searching" subtopicId={1} title="Linear Search" />
              <span
                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  expandedCards[1]
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                    : 'bg-teal-500/10 border border-teal-500/20 text-teal-400'
                }`}
              >
                1
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-theme-text">
                Linear Search
              </h3>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-theme-text-muted transition-transform duration-200 shrink-0 ${
                expandedCards[1] ? 'rotate-180 text-teal-400' : ''
              }`}
            />
          </button>

          {expandedCards[1] && (
            <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-theme-border/60 text-xs sm:text-sm text-theme-text leading-relaxed animate-in fade-in duration-200 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  Theory
                </h4>
                <p className="leading-relaxed">
                  Linear Search checks each element one by one until the target is found or the array ends. It works on both sorted and unsorted arrays.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border space-y-1.5">
                <p className="font-semibold text-teal-400">
                  Example: Search for 30 in [10, 20, 30, 40].
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Check 10 → not found.</li>
                  <li>Check 20 → not found.</li>
                  <li>Check 30 → found!</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  C++ function
                </h4>
                <CodeBox
                  code={`int linearSearch(vector<int>& arr, int target) {\n    for (int i = 0; i < arr.size(); i++) {\n        if (arr[i] == target)\n            return i;\n    }\n\n    return -1;\n}`}
                />
                <ul className="list-disc pl-5 space-y-1 mt-2 text-theme-text">
                  <li>Returns the index if found.</li>
                  <li>Returns -1 if not found.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  Complexity:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-theme-text">
                  <li>Best case: <span className="font-mono font-bold text-teal-400">O(1)</span></li>
                  <li>Average and worst case: <span className="font-mono font-bold text-teal-400">O(n)</span></li>
                  <li>Extra space: <span className="font-mono font-bold text-teal-400">O(1)</span></li>
                </ul>
              </div>

              {/* Visual Dry Run */}
              <InteractiveDryRunPlayer
                steps={linearSearchSteps}
                targetValue={30}
                label="Linear Search in [10, 20, 30, 40]"
              />
            </div>
          )}
        </div>

        {/* CARD 2: Binary Search */}
        <div
          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
            expandedCards[2]
              ? 'border-teal-500/40 bg-theme-card shadow-lg ring-1 ring-teal-500/20'
              : 'border-theme-border bg-theme-card hover:border-teal-500/30'
          }`}
        >
          <button
            type="button"
            onClick={() => toggleCard(2)}
            className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-slate-800/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3.5 pr-2">
              <SubtopicCheckbox topicId="searching" subtopicId={2} title="Binary Search" />
              <span
                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  expandedCards[2]
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                    : 'bg-teal-500/10 border border-teal-500/20 text-teal-400'
                }`}
              >
                2
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-theme-text">
                Binary Search
              </h3>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-theme-text-muted transition-transform duration-200 shrink-0 ${
                expandedCards[2] ? 'rotate-180 text-teal-400' : ''
              }`}
            />
          </button>

          {expandedCards[2] && (
            <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-theme-border/60 text-xs sm:text-sm text-theme-text leading-relaxed animate-in fade-in duration-200 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  Theory
                </h4>
                <p className="leading-relaxed">
                  Binary Search finds an element by repeatedly dividing the search range into half. The array must be sorted.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border space-y-2">
                <p className="font-semibold text-teal-400">
                  Example: Search for 30 in [10, 20, 30, 40, 50].
                </p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Middle element is 30.</li>
                  <li>Target matches the middle, so return its index immediately.</li>
                </ol>
                <p className="text-theme-text-muted text-xs">
                  If the target is smaller than the middle, search the left half. If larger, search the right half.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  C++ function
                </h4>
                <CodeBox
                  code={`int binarySearch(vector<int>& arr, int target) {\n    int low = 0;\n    int high = arr.size() - 1;\n\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n\n        if (arr[mid] == target)\n            return mid;\n        else if (arr[mid] < target)\n            low = mid + 1;\n        else\n            high = mid - 1;\n    }\n\n    return -1;\n}`}
                />
                <ul className="list-disc pl-5 space-y-1 mt-2 text-theme-text">
                  <li>low and high define the current search range.</li>
                  <li>mid finds the middle index.</li>
                  <li>Each iteration eliminates half the remaining range.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  Complexity:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-theme-text">
                  <li>Best case: <span className="font-mono font-bold text-teal-400">O(1)</span></li>
                  <li>Average and worst case: <span className="font-mono font-bold text-teal-400">O(log n)</span></li>
                  <li>Extra space: <span className="font-mono font-bold text-teal-400">O(1)</span></li>
                </ul>
              </div>

              {/* Visual Dry Run */}
              <InteractiveDryRunPlayer
                steps={binarySearchSteps}
                targetValue={30}
                label="Binary Search in [10, 20, 30, 40, 50]"
              />
            </div>
          )}
        </div>

        {/* CARD 3: Fibonacci Search */}
        <div
          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
            expandedCards[3]
              ? 'border-teal-500/40 bg-theme-card shadow-lg ring-1 ring-teal-500/20'
              : 'border-theme-border bg-theme-card hover:border-teal-500/30'
          }`}
        >
          <button
            type="button"
            onClick={() => toggleCard(3)}
            className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-slate-800/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3.5 pr-2">
              <SubtopicCheckbox topicId="searching" subtopicId={3} title="Fibonacci search" />
              <span
                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  expandedCards[3]
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                    : 'bg-teal-500/10 border border-teal-500/20 text-teal-400'
                }`}
              >
                3
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-theme-text">
                Fibonacci search
              </h3>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-theme-text-muted transition-transform duration-200 shrink-0 ${
                expandedCards[3] ? 'rotate-180 text-teal-400' : ''
              }`}
            />
          </button>

          {expandedCards[3] && (
            <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-theme-border/60 text-xs sm:text-sm text-theme-text leading-relaxed animate-in fade-in duration-200 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  Theory
                </h4>
                <p className="leading-relaxed">
                  Fibonacci Search is a searching algorithm for sorted arrays. Instead of dividing the search range using the middle index as Binary Search does, it uses Fibonacci numbers to choose comparison positions.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border space-y-2">
                <p className="font-semibold text-teal-400">
                  Fibonacci numbers are:
                </p>
                <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-teal-300 text-xs sm:text-sm overflow-x-auto">
                  0, 1, 1, 2, 3, 5, 8, 13, 21, ...
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">
                  The algorithm uses these numbers to divide the array into smaller sections and narrow down the target's position.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  C++ function
                </h4>
                <CodeBox
                  code={`int fibonacciSearch(vector<int>& arr, int target) {\n    int n = arr.size();\n\n    int fib2 = 0;\n    int fib1 = 1;\n    int fib = fib1 + fib2;\n\n    while (fib < n) {\n        fib2 = fib1;\n        fib1 = fib;\n        fib = fib1 + fib2;\n    }\n\n    int offset = -1;\n\n    while (fib > 1) {\n        int i = min(offset + fib2, n - 1);\n\n        if (arr[i] < target) {\n            fib = fib1;\n            fib1 = fib2;\n            fib2 = fib - fib1;\n            offset = i;\n        }\n        else if (arr[i] > target) {\n            fib = fib2;\n            fib1 = fib1 - fib2;\n            fib2 = fib - fib1;\n        }\n        else {\n            return i;\n        }\n    }\n\n    if (fib1 && offset + 1 < n &&\n        arr[offset + 1] == target) {\n        return offset + 1;\n    }\n\n    return -1;\n}`}
                />

                <div className="mt-3">
                  <p className="text-xs font-bold text-teal-400 mb-1">Required headers:</p>
                  <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
                    {`#include <vector>\n#include <algorithm>\nusing namespace std;`}
                  </pre>
                </div>

                <ul className="list-disc pl-5 space-y-1 mt-3 text-theme-text">
                  <li>fib, fib1, and fib2 track Fibonacci numbers.</li>
                  <li>offset records the eliminated section's boundary.</li>
                  <li>The function returns the target's index or -1.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  Complexity:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-theme-text">
                  <li>Best case: <span className="font-mono font-bold text-teal-400">O(1)</span></li>
                  <li>Worst case: <span className="font-mono font-bold text-teal-400">O(log n)</span></li>
                  <li>Extra space: <span className="font-mono font-bold text-teal-400">O(1)</span></li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-300 text-xs sm:text-sm">
                <strong>Remember:</strong> Like Binary Search, Fibonacci Search requires sorted data. It is less commonly used in everyday DSA problems.
              </div>

              {/* Visual Dry Run */}
              <InteractiveDryRunPlayer
                steps={fibonacciSearchSteps}
                targetValue={50}
                label="Fibonacci Search in [10, 20, 30, 40, 50, 60, 70, 80]"
              />
            </div>
          )}
        </div>

        {/* CARD 4: Binary Search on Answer */}
        <div
          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
            expandedCards[4]
              ? 'border-teal-500/40 bg-theme-card shadow-lg ring-1 ring-teal-500/20'
              : 'border-theme-border bg-theme-card hover:border-teal-500/30'
          }`}
        >
          <button
            type="button"
            onClick={() => toggleCard(4)}
            className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-slate-800/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3.5 pr-2">
              <SubtopicCheckbox topicId="searching" subtopicId={4} title="Binary Search on Answer" />
              <span
                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  expandedCards[4]
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                    : 'bg-teal-500/10 border border-teal-500/20 text-teal-400'
                }`}
              >
                4
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-theme-text">
                Binary Search on Answer
              </h3>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-theme-text-muted transition-transform duration-200 shrink-0 ${
                expandedCards[4] ? 'rotate-180 text-teal-400' : ''
              }`}
            />
          </button>

          {expandedCards[4] && (
            <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-theme-border/60 text-xs sm:text-sm text-theme-text leading-relaxed animate-in fade-in duration-200 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  Theory
                </h4>
                <p className="leading-relaxed">
                  Binary Search on Answer is a technique used when the answer itself lies in a searchable range and we can efficiently check whether a candidate answer is valid.
                </p>
                <p className="leading-relaxed mt-2 text-theme-text-muted">
                  Instead of searching for an element in an array, we search for the smallest or largest valid answer.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border space-y-2">
                <p className="leading-relaxed font-semibold text-teal-400">
                  Example: You have to produce at least 20 items, and a machine can produce x items per hour. Find the minimum whole number of hours required.
                </p>
                <p className="text-xs font-semibold">The condition is:</p>
                <div className="p-2 rounded-lg bg-slate-950 font-mono text-xs sm:text-sm text-amber-300">
                  x * hours &gt;= 20
                </div>
                <p className="leading-relaxed">
                  If a certain number of hours is enough, every larger number is also enough. This monotonic property allows binary search.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  C++ function
                </h4>
                <CodeBox
                  code={`int minimumHours(int required, int productionPerHour) {\n    int low = 0;\n    int high = required;\n\n    while (low < high) {\n        int mid = low + (high - low) / 2;\n\n        if (mid * productionPerHour >= required)\n            high = mid;\n        else\n            low = mid + 1;\n    }\n\n    return low;\n}`}
                />

                <div className="space-y-1.5 mt-2">
                  <p className="font-semibold text-teal-400">
                    Example: minimumHours(20, 5) returns 4.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-theme-text">
                    <li>If mid is enough, keep it as a possible answer and search smaller values.</li>
                    <li>If mid is not enough, search larger values.</li>
                    <li>When low == high, the minimum valid answer has been found.</li>
                  </ul>
                  <p className="text-xs text-theme-text-muted pt-1">
                    This simple example assumes productionPerHour &gt; 0 and that integer multiplication does not overflow.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  Complexity:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-theme-text">
                  <li>Time: <span className="font-mono font-bold text-teal-400">O(log R)</span>, where R is the size of the answer range.</li>
                  <li>Extra space: <span className="font-mono font-bold text-teal-400">O(1)</span>.</li>
                </ul>
                <p className="text-xs text-theme-text-muted mt-1.5">
                  For harder problems, the checking function may take additional time. For example, if checking a candidate costs O(n), total time may be O(n log R).
                </p>
              </div>

              {/* Visual Dry Run */}
              <InteractiveDryRunPlayer
                steps={binarySearchOnAnswerSteps}
                targetValue="20 items (5 items/hr)"
                label="minimumHours(20, 5) Answer Search"
              />
            </div>
          )}
        </div>

        {/* CARD 5: Quick Revision */}
        <div
          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
            expandedCards[5]
              ? 'border-teal-500/40 bg-theme-card shadow-lg ring-1 ring-teal-500/20'
              : 'border-theme-border bg-theme-card hover:border-teal-500/30'
          }`}
        >
          <button
            type="button"
            onClick={() => toggleCard(5)}
            className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-slate-800/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3.5 pr-2">
              <SubtopicCheckbox topicId="searching" subtopicId={5} title="Quick Revision" />
              <span
                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  expandedCards[5]
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                    : 'bg-teal-500/10 border border-teal-500/20 text-teal-400'
                }`}
              >
                5
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-theme-text">
                Quick Revision
              </h3>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-theme-text-muted transition-transform duration-200 shrink-0 ${
                expandedCards[5] ? 'rotate-180 text-teal-400' : ''
              }`}
            />
          </button>

          {expandedCards[5] && (
            <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-theme-border/60 text-xs sm:text-sm text-theme-text leading-relaxed animate-in fade-in duration-200 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">
                  Quick revision table
                </h4>

                {/* Static Table Properly Formatted */}
                <div className="overflow-x-auto rounded-xl border border-theme-border">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-900/80 text-teal-300 font-mono text-[11px] sm:text-xs uppercase border-b border-theme-border">
                      <tr>
                        <th className="py-3 px-4 font-semibold">Algorithm</th>
                        <th className="py-3 px-4 font-semibold">Data requirement</th>
                        <th className="py-3 px-4 font-semibold">Time complexity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-sans">
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-teal-300">Linear Search</td>
                        <td className="py-3 px-4 text-theme-text">Sorted or unsorted</td>
                        <td className="py-3 px-4 font-mono font-bold text-teal-400">O(n) worst case</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-teal-300">Binary Search</td>
                        <td className="py-3 px-4 text-theme-text">Sorted</td>
                        <td className="py-3 px-4 font-mono font-bold text-teal-400">O(log n) worst case</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-teal-300">Fibonacci Search</td>
                        <td className="py-3 px-4 text-theme-text">Sorted</td>
                        <td className="py-3 px-4 font-mono font-bold text-teal-400">O(log n) worst case</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-teal-300">Binary Search on Answer</td>
                        <td className="py-3 px-4 text-theme-text">Monotonic validity condition</td>
                        <td className="py-3 px-4 font-mono font-bold text-teal-400">O(log R) checks</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-teal-950/20 border border-teal-500/20 text-xs text-theme-text-muted leading-relaxed">
                Use this table as a quick reference during interview revision to quickly choose between index-based interval halving, sequential inspection, or monotonic predicate optimization.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
