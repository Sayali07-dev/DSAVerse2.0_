import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  ChevronDown, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Repeat, 
  ChevronsRight,
  Boxes,
  ArrowDown
} from 'lucide-react';
import { SubtopicCheckbox } from './SubtopicCheckbox';
import { TopicProgressHeader } from './TopicProgressHeader';

// Reusable Copyable Code Block
const CodeBox: React.FC<{ code: string; title?: string }> = ({ code, title = 'C++ Implementation' }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-theme-border bg-slate-950 shadow-inner">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-teal-400">
        <span className="font-semibold">{title}</span>
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

export const StackQueueLearningView: React.FC = () => {
  // State for card expand/collapse (all open by default or individual toggle)
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
    11: true,
    12: true,
    13: true,
  });

  const toggleCard = (id: number) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    for (let i = 1; i <= 13; i++) all[i] = true;
    setExpandedCards(all);
  };

  const collapseAll = () => {
    const none: Record<number, boolean> = {};
    for (let i = 1; i <= 13; i++) none[i] = false;
    setExpandedCards(none);
  };

  // Interactive state for Topic 1: Stack Simulator
  const [demoStack, setDemoStack] = useState<number[]>([10, 20, 30]);
  const [stackMessage, setStackMessage] = useState<string>('Current top is 30. Size = 3.');

  const handleStackPush = (val: number) => {
    if (demoStack.length >= 5) {
      setStackMessage('Stack Overflow! Maximum demo height reached.');
      return;
    }
    const next = [...demoStack, val];
    setDemoStack(next);
    setStackMessage(`Pushed ${val}. New top is ${val}. Size = ${next.length}.`);
  };

  const handleStackPop = () => {
    if (demoStack.length === 0) {
      setStackMessage('Stack Underflow! Stack is empty.');
      return;
    }
    const poppedVal = demoStack[demoStack.length - 1];
    const next = demoStack.slice(0, -1);
    setDemoStack(next);
    setStackMessage(`Popped ${poppedVal}. New top is ${next.length > 0 ? next[next.length - 1] : 'None (Empty)'}. Size = ${next.length}.`);
  };

  const handleStackReset = () => {
    setDemoStack([10, 20, 30]);
    setStackMessage('Reset to initial state: [10, 20, 30].');
  };

  // Interactive state for Topic 3: Queue Simulator
  const [demoQueue, setDemoQueue] = useState<number[]>([10, 20, 30]);
  const [queueMessage, setQueueMessage] = useState<string>('Front is 10, Back is 30. First in line exits first.');

  const handleQueueEnqueue = (val: number) => {
    if (demoQueue.length >= 6) {
      setQueueMessage('Queue is full for this demo (max 6 elements).');
      return;
    }
    const next = [...demoQueue, val];
    setDemoQueue(next);
    setQueueMessage(`Enqueued ${val} at rear. Front = ${next[0]}, Back = ${val}.`);
  };

  const handleQueueDequeue = () => {
    if (demoQueue.length === 0) {
      setQueueMessage('Queue Underflow! Queue is empty.');
      return;
    }
    const dequeued = demoQueue[0];
    const next = demoQueue.slice(1);
    setDemoQueue(next);
    setQueueMessage(`Dequeued ${dequeued} from front. New front = ${next.length > 0 ? next[0] : 'None'}.`);
  };

  const handleQueueReset = () => {
    setDemoQueue([10, 20, 30]);
    setQueueMessage('Reset queue to: [10, 20, 30].');
  };

  // Interactive state for Topic 5: Circular Queue
  const [cqArray, setCqArray] = useState<(string | null)[]>(['A', 'B', 'C', null, null]);
  const [cqFront, setCqFront] = useState<number>(0);
  const [cqRear, setCqRear] = useState<number>(2);
  const [cqCount, setCqCount] = useState<number>(3);
  const [cqNextItemChar, setCqNextItemChar] = useState<'D' | 'E' | 'F' | 'G' | 'H'>('D');
  const [cqLog, setCqLog] = useState<string>('Circular queue: 3 items (A, B, C), front: index 0 → rear: index 2.');

  const handleCqEnqueue = () => {
    if (cqCount === 5) {
      setCqLog('Queue Full! Cannot enqueue without overwriting active data.');
      return;
    }
    const nextRear = (cqRear + 1) % 5;
    const itemToInsert = cqNextItemChar;
    const nextArr = [...cqArray];
    nextArr[nextRear] = itemToInsert;
    setCqArray(nextArr);
    setCqRear(nextRear);
    setCqCount(cqCount + 1);
    const chars: ('D' | 'E' | 'F' | 'G' | 'H')[] = ['D', 'E', 'F', 'G', 'H'];
    const curIdx = chars.indexOf(cqNextItemChar);
    setCqNextItemChar(chars[(curIdx + 1) % chars.length]);
    setCqLog(`Enqueued '${itemToInsert}' at index ${nextRear} = (${cqRear} + 1) % 5. Count = ${cqCount + 1}.`);
  };

  const handleCqDequeue = () => {
    if (cqCount === 0) {
      setCqLog('Queue Empty! Cannot dequeue from empty buffer.');
      return;
    }
    const removedItem = cqArray[cqFront];
    const nextArr = [...cqArray];
    nextArr[cqFront] = null;
    const nextFront = (cqFront + 1) % 5;
    setCqArray(nextArr);
    setCqFront(nextFront);
    setCqCount(cqCount - 1);
    setCqLog(`Dequeued '${removedItem}' from index ${cqFront}. Next front = (${cqFront} + 1) % 5 = ${nextFront}. Count = ${cqCount - 1}.`);
  };

  const handleCqReset = () => {
    setCqArray(['A', 'B', 'C', null, null]);
    setCqFront(0);
    setCqRear(2);
    setCqCount(3);
    setCqNextItemChar('D');
    setCqLog('Reset Circular Queue: 3 items (A, B, C), front: index 0 → rear: index 2.');
  };

  // Interactive state for Topic 6: Deque
  const [demoDeque, setDemoDeque] = useState<number[]>([5, 10, 20]);
  const [dequeLog, setDequeLog] = useState<string>('Deque: [5, 10, 20]. Front = 5, Back = 20.');

  // Interactive state for Topic 8: Balanced Parentheses Stepper
  const parenthesesInputs = [
    { str: '{[()]}', label: '{[()]} (Valid nested brackets)' },
    { str: '([)]', label: '([)] (Mismatched bracket ordering)' },
    { str: '((()', label: '((() (Unclosed opening brackets)' },
    { str: '()', label: '() (Simple pair)' }
  ];
  const [selectedParenIdx, setSelectedParenIdx] = useState(0);
  const [parenStep, setParenStep] = useState(0);

  const getParenSimulationSteps = (input: string) => {
    const steps: {
      char: string;
      stackBefore: string[];
      action: string;
      stackAfter: string[];
      isInvalid?: boolean;
    }[] = [];
    const st: string[] = [];

    for (let i = 0; i < input.length; i++) {
      const ch = input[i];
      const before = [...st];
      if (ch === '(' || ch === '[' || ch === '{') {
        st.push(ch);
        steps.push({
          char: ch,
          stackBefore: before,
          action: `Opening bracket '${ch}' encountered. Push onto stack.`,
          stackAfter: [...st],
        });
      } else {
        if (st.length === 0) {
          steps.push({
            char: ch,
            stackBefore: before,
            action: `Closing bracket '${ch}' found but stack is empty! Unbalanced!`,
            stackAfter: [],
            isInvalid: true,
          });
          break;
        }
        const top = st.pop()!;
        const matches = (ch === ')' && top === '(') || (ch === ']' && top === '[') || (ch === '}' && top === '{');
        steps.push({
          char: ch,
          stackBefore: before,
          action: matches
            ? `Closing bracket '${ch}' matches top '${top}'. Pop '${top}'.`
            : `Mismatch! Top is '${top}' but closing is '${ch}'. Unbalanced!`,
          stackAfter: [...st],
          isInvalid: !matches,
        });
        if (!matches) break;
      }
    }
    return steps;
  };

  const currentParenSteps = getParenSimulationSteps(parenthesesInputs[selectedParenIdx].str);
  const safeParenStep = Math.min(parenStep, currentParenSteps.length);

  // Interactive state for Topic 9: Postfix Evaluation Stepper
  const [postfixStep, setPostfixStep] = useState(0);
  const postfixSteps = [
    { token: '2', stack: [2], note: "Read operand '2'. Push 2 onto stack." },
    { token: '3', stack: [2, 3], note: "Read operand '3'. Push 3 onto stack." },
    { token: '4', stack: [2, 3, 4], note: "Read operand '4'. Push 4 onto stack." },
    { token: '*', stack: [2, 12], note: "Read operator '*'. Pop b=4, a=3. Calculate 3 * 4 = 12. Push 12." },
    { token: '+', stack: [14], note: "Read operator '+'. Pop b=12, a=2. Calculate 2 + 12 = 14. Push 14." },
  ];

  // Interactive state for Topic 10: Next Greater Element
  const [ngeStep, setNgeStep] = useState(0);
  const ngeSteps = [
    { i: 0, val: 4, stack: [0], ans: [-1, -1, -1, -1, -1], note: "i=0 (val=4): Stack empty, push index 0 (val 4)." },
    { i: 1, val: 5, stack: [1], ans: [5, -1, -1, -1, -1], note: "i=1 (val=5): 5 > arr[top=0] (4). ans[0] = 5! Pop 0, push index 1 (val 5)." },
    { i: 2, val: 2, stack: [1, 2], ans: [5, -1, -1, -1, -1], note: "i=2 (val=2): 2 < arr[top=1] (5). No pop. Push index 2 (val 2)." },
    { i: 3, val: 10, stack: [3], ans: [5, 10, 10, -1, -1], note: "i=3 (val=10): 10 > arr[2] (2) -> ans[2]=10, pop 2. Then 10 > arr[1] (5) -> ans[1]=10, pop 1. Push index 3." },
    { i: 4, val: 8, stack: [3, 4], ans: [5, 10, 10, -1, -1], note: "i=4 (val=8): 8 < arr[top=3] (10). Push index 4. Loop ends." },
    { i: 5, val: 0, stack: [], ans: [5, 10, 10, -1, -1], note: "Remaining indices in stack (3, 4) have no greater element to right; stay -1. Final output: [5, 10, 10, -1, -1]." }
  ];

  // Interactive state for Topic 12: Min Stack Stepper
  const minStackHistory: { main: number[]; min: number[]; action: string }[] = [
    { main: [], min: [], action: 'Initial empty state' },
    { main: [5], min: [5], action: 'push(5) → min is 5' },
    { main: [5, 2], min: [5, 2], action: 'push(2) → 2 <= 5, push 2 to minS' },
    { main: [5, 2, 8], min: [5, 2], action: 'push(8) → 8 > 2, do NOT push 8 to minS' },
    { main: [5, 2], min: [5, 2], action: 'pop() → popped 8. min is still 2' },
    { main: [5], min: [5], action: 'pop() → popped 2. Since 2 == minS.top(), pop minS too. New min is 5' }
  ];
  const [minStackStep, setMinStackStep] = useState(0);

  return (
    <div className="space-y-6">
      <TopicProgressHeader topicId="stacks-queues" topicTitle="Stacks & Queues" />
      {/* Chapter Banner & Intro */}
      <div className="p-6 sm:p-8 rounded-3xl bg-theme-card border border-teal-500/25 glass-panel shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme-border pb-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 mb-1 flex items-center gap-1.5">
              <span>Chapter 06</span>
              <span>·</span>
              <span>Linear Data Structures</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-text tracking-tight">
              6. Stack and Queue
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-xl border border-theme-border bg-theme-surface-elevated hover:bg-theme-surface-hover text-xs font-semibold text-theme-text transition-all cursor-pointer"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-xl border border-theme-border bg-theme-surface-elevated hover:bg-theme-surface-hover text-xs font-semibold text-theme-text-muted hover:text-theme-text transition-all cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        <div className="space-y-2 text-sm text-theme-text-muted leading-relaxed">
          <p className="text-base text-theme-text font-medium">
            Stack and Queue are linear data structures used to store and process data. The main difference is the order in which elements are added and removed.
          </p>
          <p>
            Explore all 12 core topics below with definitions, intuitive theory, diagrams, visual steppers, and beginner-friendly C++ code.
          </p>
        </div>

        {/* Quick Topics Jump Strip */}
        <div className="pt-2 flex flex-wrap gap-1.5 sm:gap-2">
          {[
            '1. Intro to Stack (LIFO)',
            '2. Stack Implementation',
            '3. Intro to Queue (FIFO)',
            '4. Queue Implementation',
            '5. Circular Queue',
            '6. Deque',
            '7. STL Containers',
            '8. Balanced Parentheses',
            '9. Expressions (Infix/Prefix/Postfix)',
            '10. Next Greater Element',
            '11. Monotonic Stack',
            '12. Min Stack',
            'Quick Revise'
          ].map((topicLabel, idx) => (
            <a
              key={idx}
              href={`#sq-topic-${idx + 1}`}
              className="px-2.5 py-1 rounded-lg bg-theme-surface-elevated border border-theme-border hover:border-teal-500/50 hover:text-teal-400 text-theme-text-muted text-xs font-mono transition-all"
            >
              {topicLabel}
            </a>
          ))}
        </div>
      </div>

      {/* CORE COMPARISON INFOGRAPHIC: STACK (LIFO) VS QUEUE (FIFO) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-theme-card border border-teal-500/20 glass-panel shadow-lg space-y-6">
        <div className="border-b border-theme-border pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-theme-text flex items-center gap-2">
              <Boxes className="w-5 h-5 text-teal-400" />
              Core Paradigms: Stack vs Queue
            </h3>
            <p className="text-xs text-theme-text-muted mt-0.5">
              The foundational difference lies in access restriction: one end vs two ends.
            </p>
          </div>
          <span className="text-xs font-mono text-teal-400 px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20">
            LIFO vs FIFO
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Stack Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-950/40 via-theme-card to-slate-900 border border-teal-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <span className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center font-bold font-mono text-sm">
                  1
                </span>
                <div>
                  <h4 className="text-base font-bold text-theme-text">Stack</h4>
                  <span className="text-xs font-mono text-teal-300 font-bold uppercase tracking-wider">
                    LIFO — Last In, First Out
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">Single End</span>
            </div>

            <p className="text-xs sm:text-sm text-theme-text-muted leading-relaxed">
              The <strong className="text-theme-text">last element added</strong> is the <strong className="text-theme-text">first one removed</strong>.
            </p>

            <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/30 text-xs font-mono text-teal-200 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Real-life Example: <strong className="text-white">A stack of plates</strong> or tennis balls in a can.</span>
            </div>

            {/* Visual Stack Graphic */}
            <div className="py-4 px-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-2">
              <div className="text-[11px] font-mono text-teal-400 flex items-center gap-1 font-bold">
                <span>Top Entry / Exit (Push & Pop here)</span>
                <ArrowDown className="w-3.5 h-3.5 text-teal-400 animate-bounce" />
              </div>

              {/* Vertical Stack Container */}
              <div className="w-36 border-2 border-t-0 border-teal-500/60 rounded-b-xl p-2 bg-slate-900/60 space-y-1.5 flex flex-col items-center">
                <div className="w-full py-1.5 rounded-lg bg-teal-600/80 text-white font-mono text-xs font-bold text-center border border-teal-400 shadow-sm">
                  Plate 3 (Top)
                </div>
                <div className="w-full py-1.5 rounded-lg bg-teal-800/80 text-teal-100 font-mono text-xs font-bold text-center border border-teal-600/60 shadow-sm">
                  Plate 2
                </div>
                <div className="w-full py-1.5 rounded-lg bg-teal-950 text-teal-300 font-mono text-xs font-bold text-center border border-teal-800/60 shadow-sm">
                  Plate 1 (Base)
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-400 text-center">
                Only the top plate can be accessed or lifted off.
              </div>
            </div>
          </div>

          {/* 2. Queue Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/40 via-theme-card to-slate-900 border border-blue-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center justify-center font-bold font-mono text-sm">
                  2
                </span>
                <div>
                  <h4 className="text-base font-bold text-theme-text">Queue</h4>
                  <span className="text-xs font-mono text-blue-300 font-bold uppercase tracking-wider">
                    FIFO — First In, First Out
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">Two Ends</span>
            </div>

            <p className="text-xs sm:text-sm text-theme-text-muted leading-relaxed">
              The <strong className="text-theme-text">first element added</strong> is the <strong className="text-theme-text">first one removed</strong>.
            </p>

            <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs font-mono text-blue-200 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Real-life Example: <strong className="text-white">A line of people waiting</strong> at a ticket counter.</span>
            </div>

            {/* Visual Queue Graphic */}
            <div className="py-4 px-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-3">
              <div className="flex items-center justify-between w-full text-[11px] font-mono px-2">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Dequeue (Front)
                </span>
                <span className="text-blue-400 font-bold flex items-center gap-1">
                  Enqueue (Rear) <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Horizontal Pipeline */}
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                <div className="px-3 py-2 rounded-xl bg-emerald-600/80 text-white font-mono text-xs font-bold border border-emerald-400 text-center shadow-sm">
                  Person 1 (Front)
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <div className="px-3 py-2 rounded-xl bg-blue-700/80 text-white font-mono text-xs font-bold border border-blue-500 text-center shadow-sm">
                  Person 2
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <div className="px-3 py-2 rounded-xl bg-blue-900/80 text-blue-200 font-mono text-xs font-bold border border-blue-700 text-center shadow-sm">
                  Person 3 (Rear)
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-400 text-center">
                Person 1 arrived first and gets served first.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: Introduction to Stack (LIFO) */}
      {/* ========================================================================= */}
      <div id="sq-topic-1" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(1)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="stacks-queues" subtopicId={1} title="Introduction to Stack (LIFO)" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              01
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">1. Introduction to Stack (LIFO)</h3>
              <p className="text-xs text-theme-text-muted font-mono">Last In, First Out · push, pop, top operations</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[1] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[1] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Definition
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                A <strong className="text-theme-text">Stack</strong> is a linear data structure in which insertion and deletion happen at the same end, called the <strong className="text-teal-400">top</strong>.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                A stack has three main operations:
              </p>
              <ul className="space-y-1.5 text-xs text-theme-text-muted list-disc list-inside">
                <li><strong className="text-theme-text font-mono">push(x)</strong> — adds an element to the top.</li>
                <li><strong className="text-theme-text font-mono">pop()</strong> — removes the top element.</li>
                <li><strong className="text-theme-text font-mono">top()</strong> — returns the top element without removing it.</li>
              </ul>
            </div>

            {/* VISUAL DIAGRAM / SIMULATOR: PUSH 10, 20, 30 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div className="text-xs font-mono font-bold text-teal-300">
                  Visual Diagram & Interactive Dry Run: PUSH 10, THEN 20, THEN 30
                </div>
                <span className="text-[10px] text-slate-400">
                  Calling pop() removes 30 first. The new top becomes 20.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Visual Stack Model */}
                <div className="md:col-span-6 flex flex-col items-center justify-center p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                  <div className="text-[11px] font-bold text-teal-400 mb-2 flex items-center gap-1">
                    <ArrowDown className="w-3.5 h-3.5" /> Top of Stack
                  </div>

                  <div className="w-40 border-2 border-t-0 border-teal-500/50 rounded-b-2xl p-2.5 bg-slate-950/80 min-h-[160px] flex flex-col-reverse gap-1.5 items-center justify-start shadow-inner">
                    {demoStack.length === 0 ? (
                      <span className="text-slate-500 text-xs italic my-auto">Stack is Empty</span>
                    ) : (
                      demoStack.map((val, idx) => {
                        const isTop = idx === demoStack.length - 1;
                        return (
                          <div
                            key={idx}
                            className={`w-full py-2 px-3 rounded-lg text-center font-bold font-mono transition-all duration-200 flex items-center justify-between ${
                              isTop
                                ? 'bg-teal-600 text-white border-2 border-teal-300 shadow-md shadow-teal-500/20 scale-102'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                          >
                            <span className="text-[10px] text-teal-200">#{idx}</span>
                            <span className="text-sm">{val}</span>
                            {isTop ? (
                              <span className="text-[10px] uppercase font-bold text-teal-200">Top</span>
                            ) : (
                              <span className="w-4"></span>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-2">Closed Base (Bottom)</div>
                </div>

                {/* Interactive Controls & State */}
                <div className="md:col-span-6 space-y-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>s.top():</span>
                      <strong className="text-teal-300">{demoStack.length > 0 ? demoStack[demoStack.length - 1] : 'undefined'}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>s.size():</span>
                      <strong className="text-blue-300">{demoStack.length}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>s.empty():</span>
                      <strong className={demoStack.length === 0 ? 'text-rose-400' : 'text-emerald-400'}>
                        {demoStack.length === 0 ? '1 (true)' : '0 (false)'}
                      </strong>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-500/30 text-teal-200 text-xs">
                    {stackMessage}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleStackPush(40)}
                      className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      push(40)
                    </button>
                    <button
                      type="button"
                      onClick={handleStackPop}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      pop()
                    </button>
                    <button
                      type="button"
                      onClick={handleStackReset}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code
              </h4>
              <CodeBox
                title="C++ STL stack example"
                code={`#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;

    s.push(10);
    s.push(20);
    s.push(30);

    cout << s.top() << endl; // 30

    s.pop();

    cout << s.top() << endl; // 20

    cout << s.size() << endl; // 2
    cout << s.empty() << endl; // 0 (false)

    return 0;
}`}
              />
            </div>

            {/* Note */}
            <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-500/30 text-xs text-amber-300 leading-relaxed flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Remember:</strong> <span className="font-mono">pop()</span> removes an element but does not return its value. Use <span className="font-mono">top()</span> before <span className="font-mono">pop()</span> if you need to read it.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: Stack Implementation (Without STL) */}
      {/* ========================================================================= */}
      <div id="sq-topic-2" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(2)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="stacks-queues" subtopicId={2} title="Stack Implementation (Without STL)" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              02
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">2. Stack Implementation (Without STL)</h3>
              <p className="text-xs text-theme-text-muted font-mono">Fixed array + topIndex · Overflow and Underflow conditions</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[2] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[2] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Definition
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                Stack implementation means building the stack's operations yourself, instead of using C++'s built-in stack container.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                We can use a fixed-size array and an integer called <strong className="text-teal-400 font-mono">topIndex</strong>:
              </p>
              <ul className="space-y-1.5 text-xs text-theme-text-muted list-disc list-inside">
                <li>Initially, <strong className="text-theme-text font-mono">topIndex = -1</strong>, meaning the stack is empty.</li>
                <li>On <strong className="text-theme-text font-mono">push</strong>, increase <span className="font-mono">topIndex</span> and store the element.</li>
                <li>On <strong className="text-theme-text font-mono">pop</strong>, decrease <span className="font-mono">topIndex</span>.</li>
                <li>If the array is full, insertion is not allowed (<strong className="text-rose-400">Stack Overflow</strong>).</li>
              </ul>
            </div>

            {/* DIAGRAM: ARRAY-BASED STACK MEMORY LAYOUT */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-xs font-mono font-bold text-teal-300 border-b border-slate-800 pb-2">
                Visual Array Memory Model: Fixed Capacity = 5
              </div>

              <div className="py-3 flex flex-col items-center space-y-3">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <div className="text-slate-400 font-mono text-xs mr-2">arr:</div>
                  {[
                    { idx: 0, val: 10 },
                    { idx: 1, val: 20 },
                    { idx: 2, val: 30 },
                    { idx: 3, val: null },
                    { idx: 4, val: null }
                  ].map((cell) => (
                    <div key={cell.idx} className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm border ${
                          cell.val !== null
                            ? 'bg-slate-900 border-teal-500/50 text-white'
                            : 'bg-slate-950 border-dashed border-slate-800 text-slate-600'
                        }`}
                      >
                        {cell.val !== null ? cell.val : '-'}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1">[{cell.idx}]</span>
                      {cell.idx === 2 && (
                        <span className="text-[10px] font-bold text-teal-400 bg-teal-500/20 px-1.5 py-0.5 rounded mt-1 border border-teal-500/40">
                          ↑ topIndex=2
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-2">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-rose-400 font-bold block mb-1">Stack Overflow:</span>
                    <span className="text-slate-300">Trying to insert into a full stack (when <code className="text-teal-300">topIndex == 4</code>).</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-amber-400 font-bold block mb-1">Stack Underflow:</span>
                    <span className="text-slate-300">Trying to remove from an empty stack (when <code className="text-teal-300">topIndex == -1</code>).</span>
                  </div>
                </div>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code
              </h4>
              <CodeBox
                title="Array-based Stack Class"
                code={`#include <iostream>
using namespace std;

class Stack {
    int arr[5];
    int topIndex;

public:
    Stack() {
        topIndex = -1;
    }

    void push(int x) {
        if (topIndex == 4) {
            cout << "Stack Overflow\\n";
            return;
        }

        arr[++topIndex] = x;
    }

    void pop() {
        if (topIndex == -1) {
            cout << "Stack Underflow\\n";
            return;
        }

        topIndex--;
    }

    int top() {
        if (topIndex == -1)
            return -1;

        return arr[topIndex];
    }

    bool empty() {
        return topIndex == -1;
    }
};`}
              />
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
              <span>Capacity: <strong className="text-emerald-400">Fixed 5 elements</strong></span>
              <span>·</span>
              <span>Time: <strong className="text-emerald-400">O(1)</strong> push, pop, top</span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: Introduction to Queue (FIFO) */}
      {/* ========================================================================= */}
      <div id="sq-topic-3" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(3)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="stacks-queues" subtopicId={3} title="Introduction to Queue (FIFO)" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              03
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">3. Introduction to Queue (FIFO)</h3>
              <p className="text-xs text-theme-text-muted font-mono">First In, First Out · enqueue, dequeue, front, back</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[3] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[3] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Definition
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                A <strong className="text-theme-text">Queue</strong> is a linear data structure in which insertion happens at the <strong className="text-blue-400">rear</strong> and deletion happens at the <strong className="text-emerald-400">front</strong>.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                The main operations are:
              </p>
              <ul className="space-y-1.5 text-xs text-theme-text-muted list-disc list-inside">
                <li><strong className="text-theme-text font-mono">enqueue(x)</strong> — adds an element at the rear.</li>
                <li><strong className="text-theme-text font-mono">dequeue()</strong> — removes the element at the front.</li>
                <li><strong className="text-theme-text font-mono">front()</strong> — accesses the first element.</li>
                <li><strong className="text-theme-text font-mono">back()</strong> — accesses the last element.</li>
              </ul>
              <p className="text-xs font-mono text-teal-300 mt-2 bg-theme-surface-elevated p-2 rounded-lg border border-theme-border">
                Example: Insert 10, 20, 30. The first element removed will be 10.
              </p>
            </div>

            {/* INTERACTIVE QUEUE SIMULATOR */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-teal-300 font-mono">
                  Interactive Queue Simulator (FIFO)
                </span>
                <span className="text-[10px] text-slate-400">
                  Elements enter from Rear (right) and exit from Front (left)
                </span>
              </div>

              {/* Pipeline */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center space-y-3">
                <div className="flex items-center justify-between w-full max-w-lg text-[11px] px-2 font-bold">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" /> Dequeue Exit (Front)
                  </span>
                  <span className="text-blue-400 flex items-center gap-1">
                    Enqueue Entry (Rear) <ArrowLeft className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="w-full max-w-lg min-h-[64px] border-y-2 border-dashed border-teal-500/40 p-2 flex items-center gap-2 overflow-x-auto bg-slate-950/80 rounded-lg justify-start">
                  {demoQueue.length === 0 ? (
                    <span className="text-slate-500 text-xs italic mx-auto">Queue is Empty</span>
                  ) : (
                    demoQueue.map((item, idx) => {
                      const isFront = idx === 0;
                      const isBack = idx === demoQueue.length - 1;
                      return (
                        <div
                          key={idx}
                          className={`px-3 py-2 rounded-xl text-center font-bold text-xs shrink-0 flex flex-col items-center border transition-all ${
                            isFront
                              ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/20'
                              : isBack
                              ? 'bg-blue-950/80 border-blue-400 text-blue-200 ring-2 ring-blue-500/20'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          <span className="text-sm">{item}</span>
                          <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">
                            {isFront && isBack ? 'Front & Back' : isFront ? 'Front' : isBack ? 'Back' : `Pos ${idx}`}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="w-full max-w-lg p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-teal-300">
                  {queueMessage}
                </div>

                {/* Queue controls */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleQueueEnqueue(demoQueue.length > 0 ? (demoQueue[demoQueue.length - 1] + 10) : 10)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    enqueue({demoQueue.length > 0 ? demoQueue[demoQueue.length - 1] + 10 : 10})
                  </button>
                  <button
                    type="button"
                    onClick={handleQueueDequeue}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    dequeue()
                  </button>
                  <button
                    type="button"
                    onClick={handleQueueReset}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code
              </h4>
              <CodeBox
                title="C++ STL queue example"
                code={`#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;

    q.push(10);
    q.push(20);
    q.push(30);

    cout << q.front() << endl; // 10
    cout << q.back() << endl;  // 30

    q.pop();

    cout << q.front() << endl; // 20

    return 0;
}`}
              />
            </div>

            <p className="text-xs text-theme-text-muted leading-relaxed">
              In C++ STL, <strong className="font-mono text-teal-400">push()</strong> inserts into a queue, and <strong className="font-mono text-teal-400">pop()</strong> removes its front element.
            </p>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: Queue Implementation (Without STL) */}
      {/* ========================================================================= */}
      <div id="sq-topic-4" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(4)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="stacks-queues" subtopicId={4} title="Queue Implementation (Without STL)" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              04
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">4. Queue Implementation (Without STL)</h3>
              <p className="text-xs text-theme-text-muted font-mono">frontIndex & rearIndex · Memory drift limitation & why Circular Queue is needed</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[4] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[4] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Definition
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                A queue implementation uses variables to track the front and rear positions and manages insertion and deletion manually.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                A simple array queue uses:
              </p>
              <ul className="space-y-1 text-xs text-theme-text-muted list-disc list-inside mb-2">
                <li><strong className="text-theme-text font-mono">frontIndex</strong> — the first element.</li>
                <li><strong className="text-theme-text font-mono">rearIndex</strong> — the last element.</li>
              </ul>
              <p className="text-theme-text-muted leading-relaxed text-xs">
                In a basic linear array queue, deleted spaces at the beginning cannot easily be reused. A circular queue solves this problem.
              </p>
            </div>

            {/* DIAGRAM: LINEAR QUEUE MEMORY DRIFT LIMITATION */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-xs font-mono font-bold text-teal-300 border-b border-slate-800 pb-2">
                Visualizing the Linear Queue Limitation: Wasted Memory at Beginning
              </div>

              <div className="py-2 flex flex-col items-center space-y-3">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {[
                    { idx: 0, val: 'Dequeued (empty)', status: 'wasted' },
                    { idx: 1, val: 'Dequeued (empty)', status: 'wasted' },
                    { idx: 2, val: '30', status: 'front' },
                    { idx: 3, val: '40', status: 'mid' },
                    { idx: 4, val: '50', status: 'rear' },
                  ].map((cell) => (
                    <div key={cell.idx} className="flex flex-col items-center">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xs text-center p-1 border ${
                          cell.status === 'wasted'
                            ? 'bg-rose-950/30 border-dashed border-rose-500/40 text-rose-300'
                            : cell.status === 'front'
                            ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200'
                            : cell.status === 'rear'
                            ? 'bg-blue-950/70 border-blue-400 text-blue-200'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        {cell.val}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1">[{cell.idx}]</span>
                      {cell.status === 'front' && (
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1 rounded mt-0.5">
                          frontIndex
                        </span>
                      )}
                      {cell.status === 'rear' && (
                        <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 px-1 rounded mt-0.5">
                          rearIndex=4 (Full!)
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs w-full">
                  <strong>Notice:</strong> rearIndex has reached the end of the array (index 4), so the queue reports "Queue Full", even though indices [0] and [1] are completely vacant!
                </div>
              </div>
            </div>

            {/* C++ Code: Basic linear queue */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: Basic linear queue
              </h4>
              <CodeBox
                title="Linear Array Queue"
                code={`#include <iostream>
using namespace std;

class Queue {
    int arr[5];
    int frontIndex, rearIndex;

public:
    Queue() {
        frontIndex = 0;
        rearIndex = -1;
    }

    void enqueue(int x) {
        if (rearIndex == 4) {
            cout << "Queue Full\\n";
            return;
        }

        arr[++rearIndex] = x;
    }

    void dequeue() {
        if (frontIndex > rearIndex) {
            cout << "Queue Empty\\n";
            return;
        }

        frontIndex++;
    }

    int front() {
        if (frontIndex > rearIndex)
            return -1;

        return arr[frontIndex];
    }
};`}
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <strong className="text-teal-400">Limitation:</strong> Once rearIndex reaches the last array position, this implementation cannot reuse earlier empty spaces. It is intentionally a basic version to explain how a queue works.
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: Circular Queue */}
      {/* ========================================================================= */}
      <div id="sq-topic-5" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(5)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="stacks-queues" subtopicId={5} title="Circular Queue" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              05
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">5. Circular Queue</h3>
              <p className="text-xs text-theme-text-muted font-mono">Modulo wrap % · Reuse deleted slots · count tracking</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[5] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[5] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Definition
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                A <strong className="text-theme-text">Circular Queue</strong> is a queue in which the last array position connects logically back to the first position. This allows us to reuse empty spaces created by deletions.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory & Modulo Wrap Formula
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                In a circular queue, we use the modulo operator <code className="text-teal-400 font-mono">%</code> to wrap an index back to zero.
              </p>
              <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/30 font-mono text-xs text-teal-200">
                For an array of size 5, the next position after index 4 is:
                <div className="text-emerald-400 font-bold text-sm my-1">
                  (4 + 1) % 5 = 0
                </div>
                The rear wraps from index 4 right back to index 0!
              </div>
            </div>

            {/* INTERACTIVE CIRCULAR QUEUE SIMULATOR (Requested by user) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-teal-300 flex items-center gap-1.5">
                  <Repeat className="w-4 h-4 text-emerald-400" />
                  Interactive Circular Queue Simulator: (rearIndex + 1) % 5
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Capacity = 5 · Active Count: {cqCount} / 5
                </span>
              </div>

              {/* Graphical Circular Display */}
              <div className="py-2 flex flex-col items-center space-y-4">
                {/* Visual Array Ribbon with Wrap Arrow */}
                <div className="relative p-4 rounded-2xl bg-slate-900 border border-slate-800 w-full max-w-xl">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-3">
                    <span>Index 0</span>
                    <span className="text-teal-400 font-bold flex items-center gap-1">
                      Wrap to index 0 <ChevronsRight className="w-3.5 h-3.5" />
                    </span>
                    <span>Index 4</span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {cqArray.map((val, idx) => {
                      const isFront = idx === cqFront && cqCount > 0;
                      const isRear = idx === cqRear && cqCount > 0;
                      return (
                        <div key={idx} className="flex flex-col items-center">
                          <div
                            className={`w-full py-3 rounded-xl flex flex-col items-center justify-center font-bold text-sm border transition-all ${
                              val !== null
                                ? 'bg-teal-950/70 border-teal-500 text-teal-200 shadow-md shadow-teal-500/10'
                                : 'bg-slate-950 border-dashed border-slate-800 text-slate-600'
                            }`}
                          >
                            <span className="text-base">{val !== null ? val : '—'}</span>
                            <span className="text-[10px] text-slate-400 mt-0.5">{idx}</span>
                          </div>

                          <div className="flex flex-col items-center mt-1.5 gap-0.5 min-h-[36px]">
                            {isFront && (
                              <span className="text-[9px] uppercase font-bold text-emerald-400 bg-emerald-500/20 px-1 rounded border border-emerald-500/30">
                                Front
                              </span>
                            )}
                            {isRear && (
                              <span className="text-[9px] uppercase font-bold text-blue-400 bg-blue-500/20 px-1 rounded border border-blue-500/30">
                                Rear
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Wrap-around indicator line */}
                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 text-teal-300">
                      <Repeat className="w-3 h-3 text-teal-400" />
                      Circular logic: index (4 + 1) % 5 = 0
                    </span>
                    <span className="font-mono text-emerald-400">
                      front: {cqFront} · rear: {cqRear}
                    </span>
                  </div>
                </div>

                {/* Status Log */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-teal-300 w-full max-w-xl">
                  {cqLog}
                </div>

                {/* Interactive Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCqEnqueue}
                    className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                  >
                    <span>Enqueue {cqNextItemChar}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCqDequeue}
                    className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                  >
                    <span>Dequeue {cqArray[cqFront] ? cqArray[cqFront] : ''}</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCqReset}
                    className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset
                  </button>
                </div>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code
              </h4>
              <CodeBox
                title="Circular Queue with count"
                code={`#include <iostream>
using namespace std;

class CircularQueue {
    int arr[5];
    int frontIndex, rearIndex, count;

public:
    CircularQueue() {
        frontIndex = 0;
        rearIndex = -1;
        count = 0;
    }

    void enqueue(int x) {
        if (count == 5) {
            cout << "Queue Full\\n";
            return;
        }

        rearIndex = (rearIndex + 1) % 5;
        arr[rearIndex] = x;
        count++;
    }

    void dequeue() {
        if (count == 0) {
            cout << "Queue Empty\\n";
            return;
        }

        frontIndex = (frontIndex + 1) % 5;
        count--;
    }

    int front() {
        if (count == 0)
            return -1;

        return arr[frontIndex];
    }
};`}
              />
            </div>

            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 leading-relaxed flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Important:</strong> <span className="font-mono">count</span> tracks how many elements are currently stored. This cleanly distinguishes a full queue from an empty queue without ambiguity!
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
                <span>Time complexity: <strong className="text-emerald-400">O(1)</strong> enqueue() and dequeue()</span>
                <span>·</span>
                <span>Space: <strong className="text-emerald-400">O(1)</strong> auxiliary</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 6: Deque (Double-Ended Queue) */}
      {/* ========================================================================= */}
      <div id="sq-topic-6" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(6)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="stacks-queues" subtopicId={6} title="Deque (Double-Ended Queue)" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              06
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">6. Deque (Double-Ended Queue)</h3>
              <p className="text-xs text-theme-text-muted font-mono">Insert and delete at both front and back · Sliding window maximum</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[6] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[6] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Definition
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                A <strong className="text-theme-text">Deque</strong> (Double-Ended Queue) is a data structure in which insertion and deletion can happen at both the <strong className="text-teal-400">front</strong> and the <strong className="text-teal-400">back</strong>.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                Unlike a normal queue, a deque allows four main operations:
              </p>
              <ul className="space-y-1.5 text-xs text-theme-text-muted list-disc list-inside">
                <li><strong className="text-theme-text font-mono">push_front(x)</strong> — insert at the beginning.</li>
                <li><strong className="text-theme-text font-mono">push_back(x)</strong> — insert at the end.</li>
                <li><strong className="text-theme-text font-mono">pop_front()</strong> — remove from the beginning.</li>
                <li><strong className="text-theme-text font-mono">pop_back()</strong> — remove from the end.</li>
              </ul>
            </div>

            {/* DIAGRAM & INTERACTIVE DEQUE CHANNEL */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-xs font-mono font-bold text-teal-300 border-b border-slate-800 pb-2">
                Visualizing Double-Ended Channel: Bi-directional Operations
              </div>

              <div className="py-3 flex flex-col items-center space-y-3">
                <div className="flex items-center justify-between w-full max-w-lg text-[10px] text-teal-400 font-bold px-1">
                  <span>← push_front / pop_front</span>
                  <span>push_back / pop_back →</span>
                </div>

                <div className="w-full max-w-lg p-3 rounded-2xl bg-slate-900 border-2 border-teal-500/40 flex items-center justify-between gap-2 overflow-x-auto">
                  {demoDeque.map((val, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-teal-500/50 text-white font-mono text-sm font-bold shadow-md"
                    >
                      {val}
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-400 font-mono text-center">
                  {dequeLog}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const next = [1, ...demoDeque];
                      setDemoDeque(next);
                      setDequeLog('push_front(1) → inserted 1 at front');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-teal-700 hover:bg-teal-600 text-white text-xs cursor-pointer"
                  >
                    push_front(1)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const next = [...demoDeque, 99];
                      setDemoDeque(next);
                      setDequeLog('push_back(99) → inserted 99 at back');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-xs cursor-pointer"
                  >
                    push_back(99)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (demoDeque.length === 0) return;
                      const removed = demoDeque[0];
                      setDemoDeque(demoDeque.slice(1));
                      setDequeLog(`pop_front() → removed ${removed} from front`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-rose-700 hover:bg-rose-600 text-white text-xs cursor-pointer"
                  >
                    pop_front()
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (demoDeque.length === 0) return;
                      const removed = demoDeque[demoDeque.length - 1];
                      setDemoDeque(demoDeque.slice(0, -1));
                      setDequeLog(`pop_back() → removed ${removed} from back`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-xs cursor-pointer"
                  >
                    pop_back()
                  </button>
                </div>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code
              </h4>
              <CodeBox
                title="C++ STL std::deque"
                code={`#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;

    dq.push_back(10);
    dq.push_back(20);
    dq.push_front(5);

    // Deque: 5 10 20

    cout << dq.front() << endl; // 5
    cout << dq.back() << endl;  // 20

    dq.pop_front(); // Removes 5
    dq.pop_back();  // Removes 20

    cout << dq.front() << endl; // 10

    return 0;
}`}
              />
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                Applications
              </h4>
              <ul className="space-y-1 text-xs text-theme-text-muted list-disc list-inside">
                <li>Sliding window maximum problems (<strong className="text-theme-text">O(n)</strong> time)</li>
                <li>Implementing both queues and stacks with a single container</li>
                <li>Maintaining elements at both ends efficiently with O(1) amortized performance</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 7: STL stack, queue and deque */}
      {/* ========================================================================= */}
      <div id="sq-topic-7" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(7)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="stacks-queues" subtopicId={7} title="STL stack, queue and deque" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              07
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">7. STL stack, queue and deque</h3>
              <p className="text-xs text-theme-text-muted font-mono">Standard Template Library containers · Method comparison matrix</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[7] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[7] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Definition
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                <strong className="text-theme-text">STL</strong> stands for Standard Template Library. C++ provides ready-made containers so you do not need to implement every data structure manually.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-2">
                Theory and Common Functions Comparison Table
              </h4>
              <div className="overflow-x-auto rounded-xl border border-theme-border">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-teal-300 border-b border-theme-border">
                    <tr>
                      <th className="py-2.5 px-3">Function</th>
                      <th className="py-2.5 px-3">Stack</th>
                      <th className="py-2.5 px-3">Queue</th>
                      <th className="py-2.5 px-3">Deque</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-sans">
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-bold font-mono text-teal-400">Insert</td>
                      <td className="py-2.5 px-3 font-mono text-theme-text">push()</td>
                      <td className="py-2.5 px-3 font-mono text-theme-text">push()</td>
                      <td className="py-2.5 px-3 font-mono text-theme-text">push_front() / push_back()</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-bold font-mono text-rose-400">Remove</td>
                      <td className="py-2.5 px-3 font-mono text-theme-text">pop()</td>
                      <td className="py-2.5 px-3 font-mono text-theme-text">pop()</td>
                      <td className="py-2.5 px-3 font-mono text-theme-text">pop_front() / pop_back()</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-bold font-mono text-amber-400">Access</td>
                      <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">top()</td>
                      <td className="py-2.5 px-3 font-mono text-blue-400 font-bold">front(), back()</td>
                      <td className="py-2.5 px-3 font-mono text-teal-300 font-bold">front(), back()</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-bold font-mono text-slate-400">Check empty</td>
                      <td className="py-2.5 px-3 font-mono text-theme-text">empty()</td>
                      <td className="py-2.5 px-3 font-mono text-theme-text">empty()</td>
                      <td className="py-2.5 px-3 font-mono text-theme-text">empty()</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-bold font-mono text-slate-400">Size</td>
                      <td className="py-2.5 px-3 font-mono text-theme-text">size()</td>
                      <td className="py-2.5 px-3 font-mono text-theme-text">size()</td>
                      <td className="py-2.5 px-3 font-mono text-theme-text">size()</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code
              </h4>
              <CodeBox
                title="All Three STL Containers"
                code={`#include <iostream>
#include <stack>
#include <queue>
#include <deque>
using namespace std;

int main() {
    stack<int> s;
    queue<int> q;
    deque<int> d;

    s.push(10);
    q.push(20);
    d.push_back(30);

    cout << s.top() << endl;   // 10
    cout << q.front() << endl; // 20
    cout << d.front() << endl; // 30

    return 0;
}`}
              />
            </div>

            <div className="p-3.5 rounded-xl bg-teal-950/20 border border-teal-500/30 text-xs text-teal-300 leading-relaxed flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong>Exam Tip:</strong> A stack exposes its <span className="text-white font-mono">top</span> element; a queue exposes its <span className="text-white font-mono">front</span> and <span className="text-white font-mono">back</span>; a deque supports direct operations at <span className="text-white font-mono">both ends</span>.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 8: Balanced Parentheses */}
      {/* ========================================================================= */}
      <div id="sq-topic-8" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(8)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="stacks-queues" subtopicId={8} title="Balanced Parentheses" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              08
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">8. Balanced Parentheses</h3>
              <p className="text-xs text-theme-text-muted font-mono">Matching bracket validation using LIFO stack · O(n) Time, O(n) Space</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[8] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[8] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Definition
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                A sequence of brackets is <strong className="text-theme-text">balanced</strong> if every opening bracket has a matching closing bracket in the correct order.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 font-mono text-xs">
                <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-center">
                  <code>()</code> — balanced
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-center">
                  <code>{"{[()]}"}</code> — balanced
                </div>
                <div className="p-2 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-300 text-center">
                  <code>([)]</code> — not balanced
                </div>
                <div className="p-2 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-300 text-center">
                  <code>((()</code> — not balanced
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                A stack is useful because the most recently opened bracket must be closed first:
              </p>
              <ol className="space-y-1.5 text-xs text-theme-text-muted list-decimal list-inside">
                <li>Push opening brackets (<code className="text-teal-300 font-mono">(, [, {"{"}</code>) onto the stack.</li>
                <li>For a closing bracket, check whether the stack top is its matching opening bracket.</li>
                <li>If it matches, pop the stack.</li>
                <li>At the end, the stack must be empty.</li>
              </ol>
            </div>

            {/* INTERACTIVE DRY-RUN STEPPER */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-teal-300">
                  Interactive Step-by-Step Validation Trace
                </span>
                {/* Selector */}
                <div className="flex gap-1.5">
                  {parenthesesInputs.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedParenIdx(idx);
                        setParenStep(0);
                      }}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                        selectedParenIdx === idx ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.str}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step info */}
              <div className="space-y-3 py-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span>Expression:</span>
                  <div className="flex gap-1">
                    {parenthesesInputs[selectedParenIdx].str.split('').map((char, cIdx) => (
                      <span
                        key={cIdx}
                        className={`w-6 h-6 rounded flex items-center justify-center font-bold ${
                          cIdx === safeParenStep
                            ? 'bg-amber-500 text-black ring-2 ring-amber-300'
                            : cIdx < safeParenStep
                            ? 'bg-slate-800 text-slate-400'
                            : 'bg-slate-900 text-slate-200'
                        }`}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step trace display */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-teal-400 font-bold">
                      Step {safeParenStep} of {currentParenSteps.length}
                    </span>
                    <span className="text-slate-400">
                      Stack contents: [{safeParenStep > 0 && currentParenSteps[safeParenStep - 1] ? currentParenSteps[safeParenStep - 1].stackAfter.join(', ') : 'empty'}]
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    {safeParenStep === 0
                      ? 'Click Next to step through character inspection.'
                      : currentParenSteps[safeParenStep - 1]?.action}
                  </p>

                  {safeParenStep === currentParenSteps.length && (
                    <div className={`p-2 rounded-lg font-bold text-center text-xs ${
                      currentParenSteps[currentParenSteps.length - 1]?.isInvalid || (currentParenSteps[currentParenSteps.length - 1]?.stackAfter.length || 0) > 0
                        ? 'bg-rose-950/60 border border-rose-500 text-rose-300'
                        : 'bg-emerald-950/60 border border-emerald-500 text-emerald-300'
                    }`}>
                      {currentParenSteps[currentParenSteps.length - 1]?.isInvalid || (currentParenSteps[currentParenSteps.length - 1]?.stackAfter.length || 0) > 0
                        ? 'Result: Unbalanced! ❌'
                        : 'Result: Perfectly Balanced! ✅'}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={safeParenStep >= currentParenSteps.length}
                    onClick={() => setParenStep(prev => prev + 1)}
                    className="px-3 py-1 rounded-lg bg-teal-600 disabled:opacity-40 text-white font-bold text-xs cursor-pointer"
                  >
                    Next Step
                  </button>
                  <button
                    type="button"
                    onClick={() => setParenStep(0)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code
              </h4>
              <CodeBox
                title="Balanced Parentheses Validator"
                code={`#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isBalanced(string str) {
    stack<char> s;

    for (char ch : str) {
        if (ch == '(' || ch == '[' || ch == '{') {
            s.push(ch);
        }
        else if (ch == ')' || ch == ']' || ch == '}') {
            if (s.empty())
                return false;

            char top = s.top();
            s.pop();

            if (ch == ')' && top != '(') return false;
            if (ch == ']' && top != '[') return false;
            if (ch == '}' && top != '{') return false;
        }
    }

    return s.empty();
}

int main() {
    cout << isBalanced("{[()]}"); // 1 (true)
}`}
              />
            </div>

            <p className="text-xs text-theme-text-muted leading-relaxed">
              This function checks bracket balance only. If you are validating a mathematical expression, you must also check operands and operators. For example, <code className="text-teal-300 font-mono">()</code> has balanced brackets but is not a valid arithmetic expression by itself.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
              <span>Time complexity: <strong className="text-emerald-400">O(n)</strong></span>
              <span>·</span>
              <span>Auxiliary space: <strong className="text-emerald-400">O(n)</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 9: Infix, Prefix and Postfix Expressions */}
      {/* ========================================================================= */}
      <div id="sq-topic-9" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(9)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="stacks-queues" subtopicId={9} title="Infix, Prefix and Postfix Expressions" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              09
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">9. Infix, Prefix and Postfix Expressions</h3>
              <p className="text-xs text-theme-text-muted font-mono">Operator notations · Polish / Reverse Polish · Stack evaluation</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[9] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[9] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Definition
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-3">
                These are three different ways to write mathematical expressions based on where the operator appears:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold font-mono text-teal-400 block">Infix Notation</span>
                  <span className="text-xs text-slate-400">Operator between operands:</span>
                  <div className="text-base font-bold font-mono text-white pt-1">A + B</div>
                  <span className="text-[11px] text-slate-400">Standard human algebraic form</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold font-mono text-blue-400 block">Prefix Notation</span>
                  <span className="text-xs text-slate-400">Operator before operands:</span>
                  <div className="text-base font-bold font-mono text-white pt-1">+ A B</div>
                  <span className="text-[11px] text-slate-400">Also called Polish notation</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold font-mono text-emerald-400 block">Postfix Notation</span>
                  <span className="text-xs text-slate-400">Operator after operands:</span>
                  <div className="text-base font-bold font-mono text-white pt-1">A B +</div>
                  <span className="text-[11px] text-slate-400">Reverse Polish notation (RPN)</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory & Precedence Example
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                For the expression <code className="text-teal-300 font-mono font-bold">2 + 3 * 4</code>:
              </p>
              <ul className="space-y-1 text-xs font-mono text-slate-300 list-disc list-inside bg-slate-950 p-3 rounded-xl border border-slate-800">
                <li><strong className="text-teal-400">Infix:</strong> 2 + 3 * 4</li>
                <li><strong className="text-blue-400">Prefix:</strong> + 2 * 3 4</li>
                <li><strong className="text-emerald-400">Postfix:</strong> 2 3 4 * +</li>
              </ul>
              <p className="text-xs text-theme-text-muted mt-2">
                The multiplication happens before addition because <strong className="text-white">*</strong> has higher precedence than <strong className="text-white">+</strong>.
              </p>
              <p className="text-xs text-theme-text-muted mt-1">
                Stacks are commonly used to convert infix expressions to postfix or prefix, and to evaluate postfix and prefix expressions without parentheses ambiguities.
              </p>
            </div>

            {/* DIAGRAM & INTERACTIVE POSTFIX EVALUATION STEPPER */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-xs font-mono font-bold text-teal-300 border-b border-slate-800 pb-2">
                Visualizing Postfix Evaluation: Stack Trace for "2 3 4 * +"
              </div>

              <div className="space-y-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Tokens:</span>
                  {postfixSteps.map((step, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 rounded font-bold ${
                        idx === postfixStep
                          ? 'bg-amber-500 text-black ring-2 ring-amber-300'
                          : idx < postfixStep
                          ? 'bg-slate-800 text-slate-500'
                          : 'bg-slate-900 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {step.token}
                    </span>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-teal-400 font-bold">
                      Step {postfixStep + 1} of {postfixSteps.length}
                    </span>
                    <span className="text-slate-300">
                      Stack state: [{postfixSteps[postfixStep].stack.join(', ')}]
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs">
                    {postfixSteps[postfixStep].note}
                  </p>
                  {postfixStep === postfixSteps.length - 1 && (
                    <div className="p-2 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-center font-bold">
                      Final Output: 14 ✅
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={postfixStep >= postfixSteps.length - 1}
                    onClick={() => setPostfixStep(prev => prev + 1)}
                    className="px-3 py-1 rounded-lg bg-teal-600 disabled:opacity-40 text-white font-bold text-xs cursor-pointer"
                  >
                    Next Token
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostfixStep(0)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: Evaluate a postfix expression
              </h4>
              <p className="text-xs text-theme-text-muted mb-2">
                This beginner example supports single-digit, non-negative operands and the operators +, -, *, /. The postfix expression must be space-separated.
              </p>
              <CodeBox
                title="Postfix Expression Evaluator"
                code={`#include <iostream>
#include <stack>
#include <sstream>
#include <string>
using namespace std;

int evaluatePostfix(string expr) {
    stack<int> s;
    stringstream ss(expr);
    string token;

    while (ss >> token) {
        if (token.size() == 1 &&
            token[0] >= '0' && token[0] <= '9') {
            s.push(token[0] - '0');
        }
        else {
            int b = s.top(); s.pop();
            int a = s.top(); s.pop();

            if (token == "+") s.push(a + b);
            else if (token == "-") s.push(a - b);
            else if (token == "*") s.push(a * b);
            else if (token == "/") s.push(a / b);
        }
    }

    return s.top();
}

int main() {
    cout << evaluatePostfix("2 3 4 * +"); // 14
}`}
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
              <strong className="text-teal-400 block">How it works:</strong>
              <p>
                Push operands onto the stack. When an operator appears, pop the second operand (b), then the first operand (a), calculate a operator b, and push the result back.
              </p>
              <p className="text-slate-400 text-[11px] pt-1">
                For production code, validate the expression, stack size and division by zero before performing operations.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 10: Next Greater Element (NGE) */}
      {/* ========================================================================= */}
      <div id="sq-topic-10" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(10)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="stacks-queues" subtopicId={10} title="Next Greater Element (NGE)" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              10
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">10. Next Greater Element (NGE)</h3>
              <p className="text-xs text-theme-text-muted font-mono">Monotonic Stack · O(n) linear scan · Store unresolved indices</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[10] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[10] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Definition
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                The <strong className="text-theme-text">Next Greater Element</strong> of an element is the first element to its right that is greater than it. If no greater element exists, the answer is <strong className="text-rose-400 font-mono">-1</strong>.
              </p>
            </div>

            {/* EXAMPLE TABLE & VISUAL DIAGRAM */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-xs font-mono font-bold text-teal-300 border-b border-slate-800 pb-2">
                Example: Input Array vs Next Greater Elements
              </div>

              <div className="grid grid-cols-5 gap-2 text-center py-2">
                {[
                  { inVal: 4, ngeVal: 5 },
                  { inVal: 5, ngeVal: 10 },
                  { inVal: 2, ngeVal: 10 },
                  { inVal: 10, ngeVal: -1 },
                  { inVal: 8, ngeVal: -1 },
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] text-slate-500 block">idx {idx}</span>
                    <div className="text-sm font-bold text-white bg-slate-950 py-1 rounded border border-slate-700">
                      {item.inVal}
                    </div>
                    <ArrowDown className="w-3.5 h-3.5 text-teal-400 mx-auto" />
                    <div className={`text-xs font-bold py-1 rounded ${
                      item.ngeVal === -1 ? 'text-rose-400 bg-rose-950/40' : 'text-emerald-300 bg-emerald-950/40'
                    }`}>
                      {item.ngeVal}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory: Brute Force O(n²) vs Monotonic Stack O(n)
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                For every element, looking to its right until you find a greater value using nested loops takes <strong className="text-rose-400 font-mono">O(n²)</strong> time.
              </p>
              <p className="text-theme-text-muted leading-relaxed text-xs">
                A <strong className="text-emerald-400">monotonic stack</strong> solves the problem in <strong className="text-emerald-400 font-mono">O(n)</strong> time by remembering elements whose next greater element has not yet been found.
              </p>
            </div>

            {/* INTERACTIVE TRACE */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-teal-300 font-bold border-b border-slate-800 pb-2">
                <span>Algorithmic Execution Stepper</span>
                <span>Step {ngeStep + 1} of {ngeSteps.length}</span>
              </div>
              <p className="text-slate-300 text-xs">{ngeSteps[ngeStep].note}</p>
              <div className="flex justify-between items-center text-slate-400 text-[11px]">
                <span>Active Stack (indices): [{ngeSteps[ngeStep].stack.join(', ')}]</span>
                <span>Current Ans: [{ngeSteps[ngeStep].ans.join(', ')}]</span>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  disabled={ngeStep >= ngeSteps.length - 1}
                  onClick={() => setNgeStep(prev => prev + 1)}
                  className="px-3 py-1 rounded-lg bg-teal-600 disabled:opacity-40 text-white font-bold text-xs cursor-pointer"
                >
                  Next Step
                </button>
                <button
                  type="button"
                  onClick={() => setNgeStep(0)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code
              </h4>
              <CodeBox
                title="Next Greater Element (Monotonic Stack)"
                code={`#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreater(vector<int>& arr) {
    int n = arr.size();
    vector<int> ans(n, -1);
    stack<int> s; // Store indices

    for (int i = 0; i < n; i++) {
        while (!s.empty() &&
               arr[i] > arr[s.top()]) {
            ans[s.top()] = arr[i];
            s.pop();
        }

        s.push(i);
    }

    return ans;
}

int main() {
    vector<int> arr = {4, 5, 2, 10, 8};

    vector<int> ans = nextGreater(arr);

    for (int x : ans)
        cout << x << " ";
}`}
              />
            </div>

            <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-500/30 text-xs text-teal-200">
              <strong className="text-teal-400">Why store indices?</strong> We need to know which position in the answer array should receive the next greater value.
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 11: Monotonic Stack */}
      {/* ========================================================================= */}
      <div id="sq-topic-11" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(11)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="stacks-queues" subtopicId={11} title="Monotonic Stack" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              11
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">11. Monotonic Stack</h3>
              <p className="text-xs text-theme-text-muted font-mono">Strictly increasing or decreasing order · Core problem-solving paradigm</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[11] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[11] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Definition
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                A <strong className="text-theme-text">Monotonic Stack</strong> is a stack in which the stored elements remain in a particular order — either <strong className="text-teal-400">increasing</strong> or <strong className="text-teal-400">decreasing</strong>.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                There are two common forms:
              </p>
              <ul className="space-y-1.5 text-xs text-theme-text-muted list-disc list-inside">
                <li><strong className="text-theme-text font-mono">Monotonically increasing stack:</strong> Elements are maintained in increasing order from bottom to top.</li>
                <li><strong className="text-theme-text font-mono">Monotonically decreasing stack:</strong> Elements are maintained in decreasing order from bottom to top.</li>
              </ul>
              <p className="text-xs text-theme-text-muted mt-2">
                When a new element breaks the required order, we remove elements from the top until the order is restored.
              </p>
            </div>

            {/* DIAGRAM: MONOTONIC STACK INVARIANTS */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-xs font-mono font-bold text-teal-300 border-b border-slate-800 pb-2">
                Visual Comparison: Monotonically Increasing vs Decreasing
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                {/* Increasing */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-teal-400 block">Monotonically Increasing</span>
                  <div className="flex flex-col-reverse gap-1.5 w-28 mx-auto p-2 border-x-2 border-b-2 border-teal-500/40 rounded-b-lg">
                    <span className="bg-teal-600 text-white text-center py-1 rounded text-xs font-bold">10 (Top)</span>
                    <span className="bg-teal-800 text-white text-center py-1 rounded text-xs font-bold">7</span>
                    <span className="bg-teal-950 text-teal-200 text-center py-1 rounded text-xs font-bold">3 (Bottom)</span>
                  </div>
                  <span className="text-[10px] text-slate-400 text-center block">Elements grow bottom-to-top (3 &lt; 7 &lt; 10)</span>
                </div>

                {/* Decreasing */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-blue-400 block">Monotonically Decreasing</span>
                  <div className="flex flex-col-reverse gap-1.5 w-28 mx-auto p-2 border-x-2 border-blue-500/40 rounded-b-lg">
                    <span className="bg-blue-600 text-white text-center py-1 rounded text-xs font-bold">2 (Top)</span>
                    <span className="bg-blue-800 text-white text-center py-1 rounded text-xs font-bold">6</span>
                    <span className="bg-blue-950 text-blue-200 text-center py-1 rounded text-xs font-bold">9 (Bottom)</span>
                  </div>
                  <span className="text-[10px] text-slate-400 text-center block">Elements shrink bottom-to-top (9 &gt; 6 &gt; 2)</span>
                </div>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: Maintain a decreasing stack
              </h4>
              <CodeBox
                title="Monotonically Decreasing Stack"
                code={`#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int main() {
    vector<int> arr = {5, 3, 7, 2, 6};
    stack<int> s;

    for (int x : arr) {
        while (!s.empty() && s.top() < x) {
            s.pop();
        }

        s.push(x);
    }

    while (!s.empty()) {
        cout << s.top() << " ";
        s.pop();
    }
}`}
              />
            </div>

            <p className="text-xs text-theme-text-muted leading-relaxed">
              This keeps the stack in decreasing order from bottom to top, with the largest element at the bottom and the smallest at the top.
            </p>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Key Applications
              </h4>
              <ul className="space-y-1 text-xs text-theme-text-muted list-disc list-inside">
                <li>Next Greater Element / Next Smaller Element</li>
                <li>Stock Span Problem</li>
                <li>Largest Rectangle in Histogram (Hard LeetCode classic)</li>
                <li>Daily Temperatures</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300">
              <strong>Remember:</strong> A monotonic stack is a <strong className="text-white">problem-solving technique</strong>, not a separate C++ container!
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 12: Min Stack */}
      {/* ========================================================================= */}
      <div id="sq-topic-12" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(12)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="stacks-queues" subtopicId={12} title="Min Stack" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              12
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">12. Min Stack</h3>
              <p className="text-xs text-theme-text-muted font-mono">Retrieve minimum element in O(1) time · Dual stack design</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[12] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[12] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Definition
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                A <strong className="text-theme-text">Min Stack</strong> is a stack that supports normal stack operations and also returns the minimum element in <strong className="text-emerald-400 font-mono">O(1)</strong> time.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory & Dual Stack Design
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                A normal stack can give us its top element, but finding its minimum would require checking every element (<code className="text-rose-400 font-mono">O(n)</code>).
              </p>
              <p className="text-theme-text-muted leading-relaxed mb-2 text-xs">
                To solve this, we maintain an additional stack that tracks the minimum values (<code className="text-teal-400 font-mono">minS</code>).
              </p>
              <p className="text-theme-text-muted leading-relaxed text-xs">
                For every pushed element, we also push it onto the minimum stack if it is <strong className="text-teal-300">less than or equal to</strong> the current minimum. When that value is removed, we update the minimum stack too.
              </p>
            </div>

            {/* DIAGRAM & INTERACTIVE DUAL STACK SIMULATOR */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-xs font-mono font-bold text-teal-300 border-b border-slate-800 pb-2">
                Visual Dual-Stack Model: Main Stack (s) & Min Stack (minS)
              </div>

              <div className="py-2 space-y-3">
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {/* Main Stack */}
                  <div className="flex flex-col items-center">
                    <span className="text-slate-400 font-bold mb-1">Main Stack (s)</span>
                    <div className="w-full border-x-2 border-b-2 border-teal-500/50 rounded-b-xl p-2 bg-slate-900 min-h-[120px] flex flex-col-reverse gap-1">
                      {minStackHistory[minStackStep].main.map((v, i) => (
                        <div key={i} className="py-1 rounded bg-teal-800 text-white text-center text-xs font-bold">
                          {v}
                        </div>
                      ))}
                      {minStackHistory[minStackStep].main.length === 0 && (
                        <span className="text-slate-600 text-center my-auto italic">Empty</span>
                      )}
                    </div>
                  </div>

                  {/* Min Stack */}
                  <div className="flex flex-col items-center">
                    <span className="text-emerald-400 font-bold mb-1">Min Stack (minS)</span>
                    <div className="w-full border-x-2 border-b-2 border-emerald-500/50 rounded-b-xl p-2 bg-slate-900 min-h-[120px] flex flex-col-reverse gap-1">
                      {minStackHistory[minStackStep].min.map((v, i) => (
                        <div key={i} className="py-1 rounded bg-emerald-700 text-white text-center text-xs font-bold">
                          {v}
                        </div>
                      ))}
                      {minStackHistory[minStackStep].min.length === 0 && (
                        <span className="text-slate-600 text-center my-auto italic">Empty</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-center space-y-1">
                  <div className="text-teal-300 font-bold">
                    Action: {minStackHistory[minStackStep].action}
                  </div>
                  <div className="text-emerald-400">
                    s.getMin() = {minStackHistory[minStackStep].min.length > 0 ? minStackHistory[minStackStep].min[minStackHistory[minStackStep].min.length - 1] : 'undefined'}
                  </div>
                </div>

                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    disabled={minStackStep >= minStackHistory.length - 1}
                    onClick={() => setMinStackStep(prev => prev + 1)}
                    className="px-3 py-1 rounded-lg bg-teal-600 disabled:opacity-40 text-white font-bold text-xs cursor-pointer"
                  >
                    Next Step
                  </button>
                  <button
                    type="button"
                    onClick={() => setMinStackStep(0)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code
              </h4>
              <CodeBox
                title="MinStack Class"
                code={`#include <iostream>
#include <stack>
#include <algorithm>
using namespace std;

class MinStack {
    stack<int> s;
    stack<int> minS;

public:
    void push(int x) {
        s.push(x);

        if (minS.empty() || x <= minS.top()) {
            minS.push(x);
        }
    }

    void pop() {
        if (s.empty())
            return;

        if (s.top() == minS.top()) {
            minS.pop();
        }

        s.pop();
    }

    int top() {
        if (s.empty())
            return -1;

        return s.top();
    }

    int getMin() {
        if (minS.empty())
            return -1;

        return minS.top();
    }
};

int main() {
    MinStack s;

    s.push(5);
    s.push(2);
    s.push(8);

    cout << s.getMin() << endl; // 2

    s.pop();

    cout << s.getMin() << endl; // 2

    s.pop();

    cout << s.getMin() << endl; // 5
}`}
              />
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300 leading-relaxed">
              <strong>Why use x &lt;= minS.top() instead of just &lt;?</strong>
              <p className="mt-1">
                Duplicate minimum values must also be tracked. Otherwise, removing one copy would incorrectly remove the current minimum for remaining identical elements!
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
              <span>Time complexity: <strong className="text-emerald-400">O(1)</strong> push, pop, top, getMin</span>
              <span>·</span>
              <span>Auxiliary space: <strong className="text-emerald-400">O(n)</strong> worst case</span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 13: Quick Revise */}
      {/* ========================================================================= */}
      <div id="sq-topic-13" className="rounded-2xl border border-teal-500/40 bg-theme-card overflow-hidden shadow-lg transition-all">
        <button
          type="button"
          onClick={() => toggleCard(13)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-gradient-to-r from-teal-950/40 via-theme-surface-elevated to-emerald-950/40 hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="stacks-queues" subtopicId={13} title="Quick Revise: All 12 Topics" />
            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-mono font-bold text-xs">
              ⚡
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text flex items-center gap-2">
                <span>Quick Revise: All 12 Topics</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Exam Sheet
                </span>
              </h3>
              <p className="text-xs text-theme-text-muted font-mono">Consolidated revision matrix of every core concept</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[13] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[13] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-2">
                Final Revision: All 12 Topics
              </h4>
              <div className="overflow-x-auto rounded-xl border border-theme-border shadow-sm">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-teal-300 border-b border-theme-border">
                    <tr>
                      <th className="py-2.5 px-3.5 w-12">#</th>
                      <th className="py-2.5 px-3.5">Topic</th>
                      <th className="py-2.5 px-3.5">Main Concept & Key Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-sans">
                    {[
                      { id: 1, title: 'Stack (LIFO)', desc: 'Last in, first out · push, pop, top at same end' },
                      { id: 2, title: 'Stack implementation', desc: 'Fixed array + topIndex (-1 when empty, overflow at N-1)' },
                      { id: 3, title: 'Queue (FIFO)', desc: 'First in, first out · enqueue at rear, dequeue from front' },
                      { id: 4, title: 'Queue implementation', desc: 'Front and rear indices tracking linear slots' },
                      { id: 5, title: 'Circular queue', desc: 'Reuse empty array positions using % modulo: (idx + 1) % N' },
                      { id: 6, title: 'Deque', desc: 'Double-ended queue: insert and delete at both ends' },
                      { id: 7, title: 'STL containers', desc: 'std::stack, std::queue, std::deque ready-made templates' },
                      { id: 8, title: 'Balanced parentheses', desc: 'Match brackets using a stack · push open, pop matching close' },
                      { id: 9, title: 'Infix, prefix, postfix', desc: 'Different operator positions (standard, Polish, RPN)' },
                      { id: 10, title: 'Next Greater Element', desc: 'Find the next greater value to the right in O(n) via stack' },
                      { id: 11, title: 'Monotonic stack', desc: 'Maintain elements in a particular order (increasing or decreasing)' },
                      { id: 12, title: 'Min Stack', desc: 'Retrieve the minimum in O(1) time using auxiliary min stack' }
                    ].map((row) => (
                      <tr key={row.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 px-3.5 font-bold font-mono text-teal-400">
                          {row.id}
                        </td>
                        <td className="py-2.5 px-3.5 font-semibold text-theme-text font-mono">
                          {row.title}
                        </td>
                        <td className="py-2.5 px-3.5 text-theme-text-muted">
                          {row.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Cheatsheet Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/30 space-y-1">
                <span className="text-[11px] font-bold text-teal-300 font-mono block">Circular Modulo Wrap</span>
                <p className="text-xs text-slate-300 font-mono">next = (curr + 1) % Capacity</p>
                <p className="text-[10px] text-slate-400">Solves linear memory wastage</p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-1">
                <span className="text-[11px] font-bold text-blue-300 font-mono block">NGE Monotonic Invariant</span>
                <p className="text-xs text-slate-300 font-mono">while(!st.empty() && arr[i] &gt; arr[st.top()])</p>
                <p className="text-[10px] text-slate-400">Calculates answers in O(N) total</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                <span className="text-[11px] font-bold text-emerald-300 font-mono block">MinStack Invariant</span>
                <p className="text-xs text-slate-300 font-mono">if (minS.empty() || x &lt;= minS.top())</p>
                <p className="text-[10px] text-slate-400">Always track duplicates with &lt;=</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
