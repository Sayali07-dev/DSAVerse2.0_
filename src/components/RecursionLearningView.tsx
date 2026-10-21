import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  ChevronDown, 
  ArrowRight, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Boxes, 
  ArrowDown, 
  GitBranch, 
  Crown
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

export const RecursionLearningView: React.FC = () => {
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

  // Interactive state for Topic 1: Print Numbers Call Stack Stepper
  const [printStep, setPrintStep] = useState(0);
  const printFrames = [
    { call: 'printNumbers(5)', stage: 'Calls printNumbers(4)', output: [] },
    { call: 'printNumbers(4)', stage: 'Calls printNumbers(3)', output: [] },
    { call: 'printNumbers(3)', stage: 'Calls printNumbers(2)', output: [] },
    { call: 'printNumbers(2)', stage: 'Calls printNumbers(1)', output: [] },
    { call: 'printNumbers(1)', stage: 'Calls printNumbers(0)', output: [] },
    { call: 'printNumbers(0)', stage: 'BASE CASE: n == 0 hit! Returns without printing.', output: [] },
    { call: 'printNumbers(1)', stage: 'Unwinding: prints 1', output: [1] },
    { call: 'printNumbers(2)', stage: 'Unwinding: prints 2', output: [1, 2] },
    { call: 'printNumbers(3)', stage: 'Unwinding: prints 3', output: [1, 2, 3] },
    { call: 'printNumbers(4)', stage: 'Unwinding: prints 4', output: [1, 2, 3, 4] },
    { call: 'printNumbers(5)', stage: 'Unwinding: prints 5 · Complete!', output: [1, 2, 3, 4, 5] },
  ];

  // Interactive state for Topic 4: Math Problems Selector
  const [mathTab, setMathTab] = useState<'sum' | 'power' | 'fib'>('sum');

  // Interactive state for Topic 8: Permutations & Combinations Visuals (Explicit user requirement)
  const tokenPool = [1, 2, 3, 4];
  const [permSelected, setPermSelected] = useState<number[]>([4, 3]);
  const [combSelected, setCombSelected] = useState<number[]>([1, 2]);

  const togglePermToken = (num: number) => {
    if (permSelected.includes(num)) {
      setPermSelected(permSelected.filter(x => x !== num));
    } else {
      if (permSelected.length < 2) {
        setPermSelected([...permSelected, num]);
      }
    }
  };

  const toggleCombToken = (num: number) => {
    if (combSelected.includes(num)) {
      setCombSelected(combSelected.filter(x => x !== num));
    } else {
      if (combSelected.length < 2) {
        setCombSelected([...combSelected, num]);
      }
    }
  };

  // Interactive state for Topic 10: N-Queens 4x4 Stepper
  const [queenStep, setQueenStep] = useState(0);
  const nQueensSolutions = [
    // Solution 1
    [
      ['.', 'Q', '.', '.'],
      ['.', '.', '.', 'Q'],
      ['Q', '.', '.', '.'],
      ['.', '.', 'Q', '.']
    ],
    // Solution 2
    [
      ['.', '.', 'Q', '.'],
      ['Q', '.', '.', '.'],
      ['.', '.', '.', 'Q'],
      ['.', 'Q', '.', '.']
    ]
  ];

  // Interactive state for Topic 11: Rat in a Maze
  const mazeGrid = [
    [1, 1, 0],
    [0, 1, 1],
    [1, 1, 1]
  ];
  const mazeSolutionPath = [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 1]
  ];

  return (
    <div className="space-y-6">
      <TopicProgressHeader topicId="recursion" topicTitle="Recursion & Backtracking" />
      {/* Chapter Banner & Intro */}
      <div className="p-6 sm:p-8 rounded-3xl bg-theme-card border border-teal-500/25 glass-panel shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme-border pb-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 mb-1 flex items-center gap-1.5">
              <span>Chapter 07</span>
              <span>·</span>
              <span>Algorithmic Paradigms</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-text tracking-tight flex items-center gap-2">
              <span>7. Recursion</span>
              <span className="text-xs font-mono text-teal-400 bg-teal-500/10 border border-teal-500/30 px-2.5 py-0.5 rounded-full">
                Core Masterclass
              </span>
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
            Recursion is the engine of divide-and-conquer, dynamic programming, tree traversals, and exhaustive backtracking search. Master breaking problems into identical smaller subproblems, guarding with base cases, and unwinding call stack state.
          </p>
        </div>

        {/* Quick Topics Jump Strip */}
        <div className="pt-2 flex flex-wrap gap-1.5 sm:gap-2">
          {[
            '1. Intro to Recursion',
            '2. Base & Recursive Case',
            '3. Call Stack & Tree',
            '4. Math Problems',
            '5. Arrays & Strings',
            '6. Binary Search',
            '7. Subsets & Subsequences',
            '8. Permutations & Combinations',
            '9. Intro to Backtracking',
            '10. N-Queens Problem',
            '11. Rat in a Maze',
            '12. Sudoku Solver',
            'Quick Revise'
          ].map((topicLabel, idx) => (
            <a
              key={idx}
              href={`#rec-topic-${idx + 1}`}
              className="px-2.5 py-1 rounded-lg bg-theme-surface-elevated border border-theme-border hover:border-teal-500/50 hover:text-teal-400 text-theme-text-muted text-xs font-mono transition-all"
            >
              {topicLabel}
            </a>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: Introduction to Recursion */}
      {/* ========================================================================= */}
      <div id="rec-topic-1" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(1)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="recursion" subtopicId={1} title="Introduction to Recursion" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              01
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">1. Introduction to Recursion</h3>
              <p className="text-xs text-theme-text-muted font-mono">Functions calling themselves · Subproblems & unwinding order</p>
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
                <strong className="text-theme-text">Recursion</strong> is a programming technique in which a function calls itself to solve a smaller version of the same problem.
              </p>
              <p className="text-xs text-theme-text-muted mt-2">
                For example, to print numbers from 1 to 5, a function can call itself to handle smaller numbers first, then print the current number upon return.
              </p>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Implementation: printNumbers
              </h4>
              <CodeBox
                title="printNumbers(5) — Ascending Print via Unwinding"
                code={`#include <iostream>
using namespace std;

void printNumbers(int n) {
    if (n == 0) return;

    printNumbers(n - 1);
    cout << n << " ";
}

int main() {
    printNumbers(5);
    return 0;
}`}
              />
            </div>

            {/* Output banner */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-teal-300 flex items-center gap-2">
              <span className="text-slate-400">Output:</span>
              <strong className="text-emerald-400 text-sm">1 2 3 4 5</strong>
            </div>

            {/* INTERACTIVE CALL STACK STEPPER */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-teal-300 flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-teal-400" />
                  Interactive Call Stack & Execution Trace
                </span>
                <span className="text-[10px] text-slate-400">
                  Step {printStep + 1} of {printFrames.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-2">
                <div className="md:col-span-6 space-y-2">
                  <div className="text-xs font-bold text-teal-300">
                    Active Frame: <code className="text-white bg-slate-900 px-2 py-0.5 rounded">{printFrames[printStep].call}</code>
                  </div>
                  <p className="text-xs text-slate-300">
                    {printFrames[printStep].stage}
                  </p>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-400 block mb-1">Console Output So Far:</span>
                    <span className="text-emerald-400 font-bold">
                      {printFrames[printStep].output.length > 0
                        ? printFrames[printStep].output.join(' ')
                        : '(none yet — still descending to base case)'}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-6 flex flex-col items-center">
                  <div className="text-[11px] text-teal-400 font-bold mb-1">Call Stack State</div>
                  <div className="w-48 border-2 border-t-0 border-teal-500/40 rounded-b-xl p-2 bg-slate-900/80 flex flex-col-reverse gap-1 shadow-inner">
                    {['printNumbers(1)', 'printNumbers(2)', 'printNumbers(3)', 'printNumbers(4)', 'printNumbers(5)'].map((frame, idx) => {
                      const isActive = printStep >= (idx <= 4 ? idx : 0) && printStep <= (10 - idx);
                      return (
                        <div
                          key={idx}
                          className={`py-1 px-2 rounded text-center text-[10px] font-mono transition-all ${
                            isActive
                              ? 'bg-teal-700 text-white font-bold border border-teal-400'
                              : 'bg-slate-950 text-slate-600 border border-slate-800'
                          }`}
                        >
                          {frame}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-1 border-t border-slate-800/80">
                <button
                  type="button"
                  disabled={printStep >= printFrames.length - 1}
                  onClick={() => setPrintStep(prev => prev + 1)}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 disabled:opacity-40 text-white font-bold text-xs cursor-pointer"
                >
                  Next Step
                </button>
                <button
                  type="button"
                  onClick={() => setPrintStep(0)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Reset Trace
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-950/20 border border-teal-500/30 text-xs text-teal-300">
              <strong className="text-teal-400 block mb-1">How it works:</strong>
              <ul className="space-y-1 list-disc list-inside text-slate-300">
                <li><code className="text-teal-300">printNumbers(5)</code> calls <code className="text-teal-300">printNumbers(4)</code>.</li>
                <li>This continues descending until <code className="text-teal-300">printNumbers(0)</code> reaches the base case.</li>
                <li>When the calls return (unwinding), the numbers are printed in ascending order: <strong className="text-emerald-400">1 2 3 4 5</strong>.</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: Base Case and Recursive Case */}
      {/* ========================================================================= */}
      <div id="rec-topic-2" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(2)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="recursion" subtopicId={2} title="Print Numbers from 1 to N and N to 1" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              02
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">2. Base Case and Recursive Case</h3>
              <p className="text-xs text-theme-text-muted font-mono">The two indispensable components · Factorial walkthrough</p>
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
                Core Architectural Rule
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-3">
                Every correct recursive function generally needs two important parts:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 space-y-1">
                  <span className="font-bold text-sm block text-emerald-400">1. Base Case</span>
                  <p className="text-slate-300 font-sans text-xs">
                    The condition that stops recursion and prevents infinite execution.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/40 text-blue-300 space-y-1">
                  <span className="font-bold text-sm block text-blue-400">2. Recursive Case</span>
                  <p className="text-slate-300 font-sans text-xs">
                    The part where the function calls itself with a strictly smaller or simpler problem.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                Example: Factorial of a Number
              </h4>
              <p className="text-theme-text-muted text-xs leading-relaxed mb-2">
                The factorial of 4 is <span className="font-mono text-teal-300">4! = 4 × 3 × 2 × 1 = 24</span>.
              </p>
              <CodeBox
                title="Factorial Function with Base & Recursive Cases"
                code={`int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;           // Base case
    }

    return n * factorial(n - 1);  // Recursive case
}`}
              />
            </div>

            {/* VISUAL DIAGRAM: CALLS VS RETURNS */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-xs font-mono font-bold text-teal-300 border-b border-slate-800 pb-2">
                Visualizing factorial(4) Calls and Returns
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                {/* Recursive calls down */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-blue-400 font-bold block flex items-center gap-1">
                    <ArrowDown className="w-3.5 h-3.5 text-blue-400" /> Recursive Calls (Descending)
                  </span>
                  <div className="space-y-1.5 text-slate-300 text-xs">
                    <div>factorial(4) = 4 × factorial(3)</div>
                    <div className="pl-3">factorial(3) = 3 × factorial(2)</div>
                    <div className="pl-6">factorial(2) = 2 × factorial(1)</div>
                    <div className="pl-9 text-emerald-400 font-bold">factorial(1) = 1 (Base Case hit!)</div>
                  </div>
                </div>

                {/* Returning results up */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-emerald-400 font-bold block flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Returning Results (Unwinding)
                  </span>
                  <div className="space-y-1.5 text-slate-300 text-xs">
                    <div className="text-emerald-300 font-bold">4 × 3 × 2 × 1 = 24</div>
                    <div className="text-slate-400 text-[11px] pt-1">
                      Each stack frame multiplies its n by the returned subproblem value and yields 24 to main().
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-300 flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong>Important:</strong> Without a correct base case, recursion continues indefinitely until the program consumes all allocated stack memory, triggering a fatal <strong className="text-white">Stack Overflow crash</strong>.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: Recursion Tree and Call Stack */}
      {/* ========================================================================= */}
      <div id="rec-topic-3" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(3)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="recursion" subtopicId={3} title="Factorial of a Number" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              03
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">3. Recursion Tree and Call Stack</h3>
              <p className="text-xs text-theme-text-muted font-mono">Hardware stack frames · Branching trees · Overlapping subproblems</p>
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
                Call Stack
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                The <strong className="text-theme-text">call stack</strong> stores information about active function calls, including their parameters, local variables, and the return address where execution should resume.
              </p>
              <CodeBox
                title="countDown(3) Function"
                code={`void countDown(int n) {
    if (n == 0) return;

    cout << n << " ";
    countDown(n - 1);
}`}
              />
              <p className="text-xs text-theme-text-muted mt-2">
                Calling <code className="text-teal-300 font-mono">countDown(3)</code> prints <strong className="text-white font-mono">3 2 1</strong>. The function calls nest in the hardware stack:
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 my-2">
                countDown(3)<br />
                &nbsp;&nbsp;↳ countDown(2)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;↳ countDown(1)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ countDown(0) &lt;-- stops &amp; returns
              </div>
              <p className="text-xs text-theme-text-muted">
                Once <code className="text-teal-300 font-mono">countDown(0)</code> returns, earlier calls finish in reverse order.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Recursion Tree: Visualizing Branching Subproblems
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2 text-xs">
                A <strong className="text-theme-text">recursion tree</strong> illustrates how a problem branches into smaller subproblems. For example, recursive Fibonacci creates two calls at each non-base step:
              </p>
              <CodeBox
                title="Recursive Fibonacci Function"
                code={`int fib(int n) {
    if (n <= 1) return n;

    return fib(n - 1) + fib(n - 2);
}`}
              />

              {/* RECURSION TREE DIAGRAM */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="text-xs font-mono font-bold text-teal-300 border-b border-slate-800 pb-2">
                  Recursion Tree for fib(4): Visualizing Duplicate Work
                </div>

                <div className="py-3 flex flex-col items-center justify-center space-y-2">
                  {/* Root */}
                  <div className="px-3.5 py-1.5 rounded-xl bg-teal-600 text-white font-bold border border-teal-400 shadow-md">
                    fib(4)
                  </div>
                  <div className="w-48 h-4 border-t-2 border-teal-500/50 flex justify-between">
                    <div className="w-0.5 h-4 bg-teal-500/50"></div>
                    <div className="w-0.5 h-4 bg-teal-500/50"></div>
                  </div>

                  {/* Level 1 */}
                  <div className="flex justify-between w-64">
                    <div className="px-3 py-1 rounded-lg bg-teal-800 text-teal-100 font-bold border border-teal-600">
                      fib(3)
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-amber-950 text-amber-200 font-bold border border-amber-500/60 ring-2 ring-amber-500/30">
                      fib(2) ⚠️
                    </div>
                  </div>

                  {/* Level 2 children of fib(3) */}
                  <div className="flex gap-4 pt-1">
                    <div className="px-2.5 py-1 rounded bg-amber-950 text-amber-200 font-bold border border-amber-500/60 ring-2 ring-amber-500/30 text-[11px]">
                      fib(2) ⚠️
                    </div>
                    <div className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                      fib(1) = 1
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/25 border border-amber-500/30 text-xs text-amber-300">
                  <strong>Notice the duplicate <code className="text-white">fib(2)</code> calls:</strong> The repeated <code className="text-white">fib(2)</code> branch illustrates why basic recursive Fibonacci does massive redundant calculations, resulting in exponential $O(2^n)$ runtime!
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
              <span>Call Stack: <strong className="text-emerald-400">Tracks active hardware frames</strong></span>
              <span>·</span>
              <span>Recursion Tree: <strong className="text-emerald-400">Illustrates problem branching</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: Recursive Mathematical Problems */}
      {/* ========================================================================= */}
      <div id="rec-topic-4" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(4)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="recursion" subtopicId={4} title="Fibonacci Number" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              04
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">4. Recursive Mathematical Problems</h3>
              <p className="text-xs text-theme-text-muted font-mono">Sum of N numbers · Power(a, b) · Fibonacci sequence</p>
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
                Overview
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                Many mathematical problems can be solved by expressing the answer in terms of a smaller input:
              </p>
            </div>

            {/* TAB SELECTOR FOR 3 MATH PROBLEMS */}
            <div className="flex gap-2 border-b border-theme-border pb-2">
              <button
                type="button"
                onClick={() => setMathTab('sum')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono cursor-pointer transition-colors ${
                  mathTab === 'sum' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                A. Sum of N Numbers
              </button>
              <button
                type="button"
                onClick={() => setMathTab('power')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono cursor-pointer transition-colors ${
                  mathTab === 'power' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                B. Power (a^b)
              </button>
              <button
                type="button"
                onClick={() => setMathTab('fib')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono cursor-pointer transition-colors ${
                  mathTab === 'fib' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                C. Fibonacci Sequence
              </button>
            </div>

            {/* TAB A: SUM */}
            {mathTab === 'sum' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <p className="text-xs text-theme-text-muted leading-relaxed">
                  The sum of the first <span className="font-mono text-teal-300">n</span> natural numbers is <span className="font-mono text-teal-300">n + sum(n - 1)</span>.
                </p>
                <CodeBox
                  title="Sum of First N Numbers"
                  code={`int sum(int n) {
    if (n == 0) return 0;

    return n + sum(n - 1);
}`}
                />
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                  For <code className="text-teal-300">sum(4)</code>, the result is: 4 + 3 + 2 + 1 = <strong className="text-emerald-400">10</strong>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
                  <span>Time complexity: <strong className="text-emerald-400">O(n)</strong></span>
                  <span>·</span>
                  <span>Auxiliary space: <strong className="text-emerald-400">O(n)</strong> recursive frames</span>
                </div>
              </div>
            )}

            {/* TAB B: POWER */}
            {mathTab === 'power' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <p className="text-xs text-theme-text-muted leading-relaxed">
                  Calculate <span className="font-mono text-teal-300">a^b</span> using recursion by multiplying <span className="font-mono text-teal-300">a * power(a, b - 1)</span> until <span className="font-mono text-teal-300">b == 0</span>.
                </p>
                <CodeBox
                  title="Recursive Power Function"
                  code={`int power(int a, int b) {
    if (b == 0) return 1;

    return a * power(a, b - 1);
}`}
                />
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                  For <code className="text-teal-300">power(2, 3)</code>, the answer is: 2 * 2 * 2 = <strong className="text-emerald-400">8</strong>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
                  <span>Time complexity: <strong className="text-emerald-400">O(b)</strong></span>
                  <span>·</span>
                  <span>Auxiliary space: <strong className="text-emerald-400">O(b)</strong></span>
                </div>
              </div>
            )}

            {/* TAB C: FIBONACCI */}
            {mathTab === 'fib' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <p className="text-xs text-theme-text-muted leading-relaxed">
                  Each Fibonacci number is the sum of the previous two numbers in the sequence:
                </p>
                <CodeBox
                  title="Fibonacci Function"
                  code={`int fibonacci(int n) {
    if (n <= 1) return n;

    return fibonacci(n - 1) + fibonacci(n - 2);
}`}
                />
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                  For <code className="text-teal-300">fibonacci(5)</code>, the answer is <strong className="text-emerald-400">5</strong>, because the sequence starts 0, 1, 1, 2, 3, 5.
                </div>
                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300">
                  <strong>Note:</strong> This basic recursive solution takes exponential time, approximately <strong className="text-white font-mono">O(2^n)</strong>. Dynamic Programming (Memoization) can make it linear <strong className="text-white font-mono">O(n)</strong>!
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: Recursion on Arrays and Strings */}
      {/* ========================================================================= */}
      <div id="rec-topic-5" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(5)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="recursion" subtopicId={5} title="Sum of Array Elements" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              05
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">5. Recursion on Arrays and Strings</h3>
              <p className="text-xs text-theme-text-muted font-mono">Print elements · Compute sum · Two-pointer recursive string reversal</p>
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
                Core Technique
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                Recursion can process one element or character at a time, and then delegate the remaining subarray/substring to the next call.
              </p>
            </div>

            {/* Sub-block A: Print Array */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-300">
                A. Print an Array Recursively
              </h4>
              <CodeBox
                title="printArray(arr, n, index)"
                code={`void printArray(int arr[], int n, int index) {
    if (index == n) return;

    cout << arr[index] << " ";
    printArray(arr, n, index + 1);
}`}
              />
              <p className="text-xs font-mono text-slate-400">
                Example: <code className="text-teal-300">arr = &#123;10, 20, 30&#125;</code>, n = 3, index = 0 → Output: <strong className="text-emerald-400">10 20 30</strong>
              </p>
            </div>

            {/* Sub-block B: Sum of Array */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-300">
                B. Find the Sum of an Array
              </h4>
              <CodeBox
                title="arraySum(arr, n)"
                code={`int arraySum(int arr[], int n) {
    if (n == 0) return 0;

    return arr[n - 1] + arraySum(arr, n - 1);
}`}
              />
              <p className="text-xs font-mono text-slate-400">
                For <code className="text-teal-300">&#123;2, 4, 6&#125;</code>, the answer is <strong className="text-emerald-400">12</strong>.
              </p>
            </div>

            {/* Sub-block C: Reverse String */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-300">
                C. Reverse a String (Two-Pointer In-Place Recursion)
              </h4>
              <CodeBox
                title="reverseString(s, left, right)"
                code={`void reverseString(string &s, int left, int right) {
    if (left >= right) return;

    swap(s[left], s[right]);
    reverseString(s, left + 1, right - 1);
}

// Call it using:
// string s = "hello";
// reverseString(s, 0, s.length() - 1);
// cout << s; // Output: olleh`}
              />

              {/* Visual Diagram: Two-pointer shrinking */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                <span className="text-teal-400 font-bold block mb-2">Two-Pointer Shrinking Walkthrough for "hello":</span>
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {['h', 'e', 'l', 'l', 'o'].map((ch, idx) => (
                    <div key={idx} className="w-8 h-8 rounded-lg bg-slate-900 border border-teal-500/40 text-teal-200 flex items-center justify-center font-bold">
                      {ch}
                    </div>
                  ))}
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 mx-2" />
                  {['o', 'e', 'l', 'l', 'h'].map((ch, idx) => (
                    <div key={idx} className="w-8 h-8 rounded-lg bg-slate-900 border border-blue-500/40 text-blue-200 flex items-center justify-center font-bold">
                      {ch}
                    </div>
                  ))}
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 mx-2" />
                  {['o', 'l', 'l', 'e', 'h'].map((ch, idx) => (
                    <div key={idx} className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 flex items-center justify-center font-bold">
                      {ch}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Swaps outer characters (h ↔ o), then increments left and decrements right until left &gt;= right.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 6: Recursive Binary Search */}
      {/* ========================================================================= */}
      <div id="rec-topic-6" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(6)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="recursion" subtopicId={6} title="Check if Array is Sorted" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              06
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">6. Recursive Binary Search</h3>
              <p className="text-xs text-theme-text-muted font-mono">Divide and conquer in sorted range · O(log n) Time & Space</p>
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
                Definition & Steps
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                <strong className="text-theme-text">Recursive binary search</strong> finds a target in a sorted array by repeatedly searching one half of the current range.
              </p>
              <ol className="space-y-1 text-xs text-theme-text-muted list-decimal list-inside">
                <li>Calculate the middle index: <code className="text-teal-300 font-mono">mid = left + (right - left) / 2</code>.</li>
                <li>If the middle element is the target, return its index.</li>
                <li>If the target is smaller, recursively search the left half (<code className="text-teal-300 font-mono">mid - 1</code>).</li>
                <li>Otherwise, recursively search the right half (<code className="text-teal-300 font-mono">mid + 1</code>).</li>
              </ol>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code
              </h4>
              <CodeBox
                title="Recursive Binary Search"
                code={`int binarySearch(int arr[], int left, int right, int target) {
    if (left > right) return -1;

    int mid = left + (right - left) / 2;

    if (arr[mid] == target) return mid;

    if (target < arr[mid]) {
        return binarySearch(arr, left, mid - 1, target);
    }

    return binarySearch(arr, mid + 1, right, target);
}

// Example:
// int arr[] = {10, 20, 30, 40, 50};
// int result = binarySearch(arr, 0, 4, 40); // Returns index 3`}
              />
            </div>

            {/* Visual Search Bounds Diagram */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <span className="text-teal-400 font-bold block">Range Halving Diagram: target = 40</span>
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {[10, 20, 30, 40, 50].map((v, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold border ${
                      v === 40
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-200'
                        : i === 2
                        ? 'bg-blue-950 border-blue-400 text-blue-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>{v}</span>
                    <span className="text-[9px] text-slate-500">[{i}]</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400">
                1st call: mid = index 2 (30). 40 &gt; 30 → search right half [3..4]. 2nd call: mid = index 3 (40). Match found!
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
                <span>Time complexity: <strong className="text-emerald-400">O(log n)</strong></span>
                <span>·</span>
                <span>Auxiliary space: <strong className="text-emerald-400">O(log n)</strong> for call stack</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300">
                <strong>Important:</strong> Binary search strictly requires sorted data.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 7: Subsequences and Subsets */}
      {/* ========================================================================= */}
      <div id="rec-topic-7" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(7)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="recursion" subtopicId={7} title="Subsets (Power Set)" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              07
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">7. Subsequences and Subsets</h3>
              <p className="text-xs text-theme-text-muted font-mono">Include / Exclude paradigm · 2^n power set generation</p>
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
                A <strong className="text-theme-text">subsequence</strong> is formed by keeping elements in their original order while optionally skipping some elements. A <strong className="text-theme-text">subset</strong> is a selection of elements without considering order.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 mt-2">
                Example: For <code className="text-teal-300">&#123;1, 2&#125;</code>, the 4 possible selections are:
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 font-bold text-center">
                  <span className="p-1 rounded bg-slate-950 border border-slate-800 text-slate-400">&#123; &#125; (empty)</span>
                  <span className="p-1 rounded bg-slate-950 border border-slate-800 text-teal-300">&#123; 1 &#125;</span>
                  <span className="p-1 rounded bg-slate-950 border border-slate-800 text-teal-300">&#123; 2 &#125;</span>
                  <span className="p-1 rounded bg-slate-950 border border-slate-800 text-emerald-400">&#123; 1, 2 &#125;</span>
                </div>
              </div>
              <p className="text-xs text-theme-text-muted mt-2">
                Each element creates two choices: <strong className="text-white">include it</strong> or <strong className="text-white">exclude it</strong>.
              </p>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: Generate All Subsets Recursively
              </h4>
              <CodeBox
                title="generateSubsets (Pick & Don't Pick Pattern)"
                code={`#include <iostream>
#include <vector>
using namespace std;

void generateSubsets(int arr[], int n, int index,
                     vector<int>& current) {
    if (index == n) {
        cout << "{ ";
        for (int x : current) cout << x << " ";
        cout << "}\\n";
        return;
    }

    // Choice 1: Exclude the current element
    generateSubsets(arr, n, index + 1, current);

    // Choice 2: Include the current element
    current.push_back(arr[index]);
    generateSubsets(arr, n, index + 1, current);

    current.pop_back(); // Undo the choice (Backtrack)
}

int main() {
    int arr[] = {1, 2, 3};
    vector<int> current;
    generateSubsets(arr, 3, 0, current);
    return 0;
}`}
              />
            </div>

            <div className="p-3.5 rounded-xl bg-teal-950/20 border border-teal-500/30 text-xs text-teal-300">
              For <span className="font-mono text-white">n</span> elements, there are <strong className="text-emerald-400 font-mono">2^n</strong> total subsets. Generating and printing them requires at least <strong className="text-emerald-400 font-mono">O(n · 2^n)</strong> time because each subset can contain up to n elements.
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 8: Permutations and Combinations (WITH RICH VISUALS) */}
      {/* ========================================================================= */}
      <div id="rec-topic-8" className="rounded-2xl border-2 border-teal-500/40 bg-theme-card overflow-hidden shadow-xl transition-all">
        <button
          type="button"
          onClick={() => toggleCard(8)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-gradient-to-r from-teal-950/40 via-theme-surface-elevated to-emerald-950/40 hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="recursion" subtopicId={8} title="Permutations and Combinations" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center font-mono font-bold text-xs">
              08
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-theme-text">8. Permutations and Combinations</h3>
                <span className="text-[10px] font-mono text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded-full border border-teal-500/40 font-bold">
                  Interactive Visuals
                </span>
              </div>
              <p className="text-xs text-theme-text-muted font-mono">Order matters vs Order does not matter · Token Draw Simulators</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[8] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[8] && (
          <div className="p-5 sm:p-6 space-y-6 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Conceptual Distinction
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                Both concepts involve selecting elements from a set, but they differ fundamentally in <strong className="text-theme-text">whether order matters</strong>.
              </p>
            </div>

            {/* VISUAL 1: PERMUTATIONS (ORDER MATTERS) */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div>
                  <span className="text-sm font-bold font-mono text-teal-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Permutations: Order Matters! (Arrangements)
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    For distinct elements: <code className="text-teal-300">P(n, r) = n! / (n - r)!</code>
                  </p>
                </div>
                <div className="px-3 py-1 rounded-lg bg-teal-950 border border-teal-500 text-teal-300 font-mono text-xs font-bold">
                  P(4, 2) = 4! / (4 - 2)! = 12 arrangements
                </div>
              </div>

              {/* Interactive Permutation Drawer */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-slate-400 font-bold">Available Token Pool (n = 4):</span>
                  <span className="text-[11px] text-teal-400">Click tokens to add to arrangement (max 2):</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {tokenPool.map((token) => {
                    const isSelected = permSelected.includes(token);
                    return (
                      <button
                        key={token}
                        type="button"
                        onClick={() => togglePermToken(token)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-slate-900 border border-slate-700 text-slate-600 opacity-40 scale-95'
                            : 'bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-500/30'
                        }`}
                      >
                        {token}
                      </button>
                    );
                  })}
                </div>

                {/* Ordered Arrangement Display */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[11px] text-slate-400 font-bold">
                    Current Ordered Arrangement (Slot 1, Slot 2):
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border-2 border-teal-400 text-teal-200 text-lg font-bold flex items-center justify-center shadow-inner">
                      {permSelected[0] !== undefined ? permSelected[0] : '—'}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border-2 border-teal-400 text-teal-200 text-lg font-bold flex items-center justify-center shadow-inner">
                      {permSelected[1] !== undefined ? permSelected[1] : '—'}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-300 pt-1">
                    This run constructs the arrangement <strong className="text-white">({permSelected.join(', ') || '...'})</strong>. Drawing the same tokens in reverse order (e.g., (3, 4) vs (4, 3)) gives a <strong className="text-teal-300">completely different permutation</strong>!
                  </p>
                </div>
              </div>
            </div>

            {/* VISUAL 2: COMBINATIONS (ORDER DOES NOT MATTER) */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div>
                  <span className="text-sm font-bold font-mono text-blue-300 flex items-center gap-2">
                    <Boxes className="w-4 h-4 text-blue-400" />
                    Combinations: Order Does NOT Matter! (Selections / Groups)
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    For distinct elements: <code className="text-blue-300">C(n, r) = n! / (r! * (n - r)!)</code>
                  </p>
                </div>
                <div className="px-3 py-1 rounded-lg bg-blue-950 border border-blue-500 text-blue-300 font-mono text-xs font-bold">
                  C(4, 2) = 4! / (2! * 2!) = 6 combinations
                </div>
              </div>

              {/* Interactive Combination Drawer */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-slate-400 font-bold">Available Token Pool (n = 4):</span>
                  <span className="text-[11px] text-blue-400">Click tokens to add to group (max 2):</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {tokenPool.map((token) => {
                    const isSelected = combSelected.includes(token);
                    return (
                      <button
                        key={token}
                        type="button"
                        onClick={() => toggleCombToken(token)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-slate-900 border border-slate-700 text-slate-600 opacity-40 scale-95'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/30'
                        }`}
                      >
                        {token}
                      </button>
                    );
                  })}
                </div>

                {/* Group Display (Unordered Bag) */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[11px] text-slate-400 font-bold">
                    Selected Group / Bag (Unordered):
                  </span>
                  <div className="p-3 rounded-2xl bg-blue-950/40 border-2 border-dashed border-blue-500/50 flex items-center gap-3 w-fit">
                    <span className="text-slate-400 font-mono text-lg">&#123;</span>
                    {combSelected.map((num, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold text-sm">
                        {num}
                      </span>
                    ))}
                    {combSelected.length === 0 && <span className="text-slate-500 italic">Empty group</span>}
                    <span className="text-slate-400 font-mono text-lg">&#125;</span>
                  </div>
                  <p className="text-[11px] text-slate-300 pt-1">
                    Group <strong className="text-white">&#123;{combSelected.join(', ')}&#125;</strong> is identical to <strong className="text-white">&#123;{combSelected.slice().reverse().join(', ')}&#125;</strong>; changing draw order does not create a new combination.
                  </p>
                </div>
              </div>
            </div>

            {/* COMPARISON MATRIX TABLE */}
            <div className="overflow-x-auto rounded-xl border border-theme-border">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-teal-300 border-b border-theme-border">
                  <tr>
                    <th className="py-2.5 px-3">Property</th>
                    <th className="py-2.5 px-3">Permutation</th>
                    <th className="py-2.5 px-3">Combination</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-sans">
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-bold font-mono text-teal-400">Order</td>
                    <td className="py-2.5 px-3 font-semibold text-emerald-400">Order matters</td>
                    <td className="py-2.5 px-3 font-semibold text-blue-400">Order does not matter</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-bold font-mono text-teal-400">Equivalence</td>
                    <td className="py-2.5 px-3 font-mono text-theme-text">(1, 2) and (2, 1) differ</td>
                    <td className="py-2.5 px-3 font-mono text-theme-text">&#123;1, 2&#125; and &#123;2, 1&#125; are the same</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-bold font-mono text-teal-400">Formula</td>
                    <td className="py-2.5 px-3 font-mono text-teal-300">n! / (n - r)!</td>
                    <td className="py-2.5 px-3 font-mono text-blue-300">n! / [r! * (n - r)!]</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-bold font-mono text-teal-400">Usage</td>
                    <td className="py-2.5 px-3 text-theme-text-muted">Arrangements, sequences</td>
                    <td className="py-2.5 px-3 text-theme-text-muted">Selections, committees, sets</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* C++ Code for generating permutations */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: Generate Permutations via Swap & Backtrack
              </h4>
              <CodeBox
                title="generatePermutations (In-Place Backtracking)"
                code={`#include <iostream>
#include <vector>
using namespace std;

void generatePermutations(vector<int>& arr, int index) {
    if (index == arr.size()) {
        for (int x : arr) cout << x << " ";
        cout << "\\n";
        return;
    }

    for (int i = index; i < arr.size(); i++) {
        swap(arr[index], arr[i]);
        generatePermutations(arr, index + 1);
        swap(arr[index], arr[i]); // Backtrack
    }
}

// For {1, 2, 3}, this prints all 3! = 6 permutations:
// 1 2 3, 1 3 2, 2 1 3, 2 3 1, 3 2 1, 3 1 2`}
              />
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 9: Introduction to Backtracking */}
      {/* ========================================================================= */}
      <div id="rec-topic-9" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(9)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="recursion" subtopicId={9} title="Introduction to Backtracking" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              09
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">9. Introduction to Backtracking</h3>
              <p className="text-xs text-theme-text-muted font-mono">Choose · Explore · Undo choice (Backtrack) · State-space trees</p>
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
              <p className="text-theme-text-muted leading-relaxed">
                <strong className="text-theme-text">Backtracking</strong> is a problem-solving technique that builds a solution step by step. If a choice leads to an invalid solution, it <strong className="text-teal-400">undoes that choice</strong> and tries another.
              </p>
            </div>

            {/* FLOWCHART DIAGRAM */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-xs font-mono font-bold text-teal-300 border-b border-slate-800 pb-2">
                The Universal Backtracking Decision Flow
              </div>

              <div className="py-2 flex flex-col items-center space-y-3">
                <div className="px-4 py-2 rounded-xl bg-slate-900 border border-teal-500/50 text-teal-200 font-bold">
                  1. Choose an Option
                </div>
                <ArrowDown className="w-4 h-4 text-slate-500" />
                <div className="px-4 py-2 rounded-xl bg-slate-900 border border-blue-500/50 text-blue-200 font-bold">
                  2. Check Whether It Is Valid
                </div>

                <div className="grid grid-cols-2 gap-6 w-full max-w-sm pt-2">
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/60 text-center space-y-1">
                    <span className="text-emerald-400 font-bold block">If Valid:</span>
                    <span className="text-white text-xs">Continue (Recurse to next step)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/60 text-center space-y-1">
                    <span className="text-rose-400 font-bold block">If Invalid:</span>
                    <span className="text-white text-xs">Undo Choice (Backtrack!)</span>
                  </div>
                </div>

                <div className="text-slate-400 text-[11px] pt-1 text-center">
                  Repeat until a valid complete solution is found or all search branches are exhausted.
                </div>
              </div>
            </div>

            {/* C++ Code Skeleton */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: Basic Backtracking Skeleton
              </h4>
              <CodeBox
                title="Universal Backtracking Skeleton"
                code={`void solve(int n) {
    if (n == 0) {
        cout << "Solution found\\n";
        return;
    }

    for (int choice = 1; choice <= 2; choice++) {
        // 1. Make a choice
        cout << choice << " ";

        // 2. Recurse / Explore
        solve(n - 1);

        // 3. Undo the choice if needed (Backtrack)
    }
}`}
              />
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Classic Applications
              </h4>
              <ul className="space-y-1 text-xs text-theme-text-muted list-disc list-inside">
                <li><strong className="text-theme-text">N-Queens Problem</strong> — placing queens without threats</li>
                <li><strong className="text-theme-text">Rat in a Maze</strong> — discovering paths while avoiding dead ends</li>
                <li><strong className="text-theme-text">Sudoku Solver</strong> — filling grid obeying 3 concurrent rules</li>
                <li>Generating subsets and permutations</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 10: N-Queens Problem */}
      {/* ========================================================================= */}
      <div id="rec-topic-10" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(10)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="recursion" subtopicId={10} title="N-Queens Problem" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              10
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">10. N-Queens Problem</h3>
              <p className="text-xs text-theme-text-muted font-mono">Row, column & diagonal conflict checks · 4x4 Chessboard visualizer</p>
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
                Definition & Rules
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                Place <span className="font-mono text-teal-300">N</span> queens on an <span className="font-mono text-teal-300">N × N</span> chessboard so that no two queens attack each other.
              </p>
              <p className="text-xs text-theme-text-muted mb-2">
                Two queens must not share the same:
              </p>
              <ul className="space-y-1 text-xs text-theme-text-muted list-disc list-inside">
                <li><strong className="text-theme-text">Row</strong></li>
                <li><strong className="text-theme-text">Column</strong></li>
                <li><strong className="text-theme-text">Diagonal</strong> (both upper-left and upper-right)</li>
              </ul>
              <p className="text-xs text-theme-text-muted mt-2">
                A common approach places one queen in each row, trying different columns.
              </p>
            </div>

            {/* INTERACTIVE 4X4 CHESSBOARD VISUALIZER */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-teal-300 flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-400" />
                  4 × 4 Chessboard Verified Solution Visualizer
                </span>
                <button
                  type="button"
                  onClick={() => setQueenStep(prev => (prev === 0 ? 1 : 0))}
                  className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs cursor-pointer"
                >
                  Switch to Solution {queenStep === 0 ? '2' : '1'}
                </button>
              </div>

              <div className="py-2 flex flex-col items-center">
                <div className="grid grid-cols-4 gap-1 p-2 bg-slate-900 rounded-xl border border-slate-800">
                  {nQueensSolutions[queenStep].map((row, rIdx) =>
                    row.map((cell, cIdx) => {
                      const isDarkSquare = (rIdx + cIdx) % 2 === 1;
                      const hasQueen = cell === 'Q';
                      return (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-base transition-all ${
                            hasQueen
                              ? 'bg-amber-500 text-black border-2 border-amber-300 ring-2 ring-amber-400/40 shadow-lg'
                              : isDarkSquare
                              ? 'bg-slate-950 text-slate-700'
                              : 'bg-slate-800 text-slate-600'
                          }`}
                        >
                          {hasQueen ? '👑 Q' : '·'}
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="text-[11px] text-slate-400 mt-2 text-center">
                  Showing Solution {queenStep + 1} of 2 for N=4. Every row and column contains exactly one safe Queen!
                </div>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: isSafe & solveNQueens
              </h4>
              <CodeBox
                title="N-Queens Backtracking Solver"
                code={`#include <iostream>
#include <vector>
using namespace std;

bool isSafe(vector<string>& board, int row, int col, int n) {
    // Check the same column in previous rows
    for (int i = 0; i < row; i++) {
        if (board[i][col] == 'Q') return false;
    }

    // Check upper-left diagonal
    for (int i = row - 1, j = col - 1;
         i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] == 'Q') return false;
    }

    // Check upper-right diagonal
    for (int i = row - 1, j = col + 1;
         i >= 0 && j < n; i--, j++) {
        if (board[i][j] == 'Q') return false;
    }

    return true;
}

bool solveNQueens(vector<string>& board, int row, int n) {
    if (row == n) return true;

    for (int col = 0; col < n; col++) {
        if (isSafe(board, row, col, n)) {
            board[row][col] = 'Q';

            if (solveNQueens(board, row + 1, n)) {
                return true;
            }

            board[row][col] = '.'; // Backtrack
        }
    }

    return false;
}

int main() {
    int n = 4;
    vector<string> board(n, string(n, '.'));

    if (solveNQueens(board, 0, n)) {
        for (const string& row : board) {
            cout << row << "\\n";
        }
    } else {
        cout << "No solution exists\\n";
    }

    return 0;
}`}
              />
            </div>

            <div className="p-3.5 rounded-xl bg-teal-950/20 border border-teal-500/30 text-xs text-teal-300">
              <strong className="text-teal-400 block mb-1">How backtracking works:</strong>
              If placing a queen prevents the next row from having any valid position, the program removes the previous queen (<code className="text-white">board[row][col] = '.'</code>) and tries a different column.
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 11: Rat in a Maze */}
      {/* ========================================================================= */}
      <div id="rec-topic-11" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(11)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="recursion" subtopicId={11} title="Rat in a Maze" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              11
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">11. Rat in a Maze</h3>
              <p className="text-xs text-theme-text-muted font-mono">4-directional pathfinding · Visited marking · Dead-end retraction</p>
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
              <p className="text-theme-text-muted leading-relaxed mb-2">
                A rat must find a path from the starting cell <code className="text-teal-300 font-mono">(0, 0)</code> to the destination <code className="text-teal-300 font-mono">(n-1, n-1)</code> in a maze. Some cells are open, while others are blocked.
              </p>
              <ul className="space-y-1 text-xs text-theme-text-muted list-disc list-inside">
                <li><strong className="text-emerald-400 font-mono">1</strong> means the cell is open.</li>
                <li><strong className="text-rose-400 font-mono">0</strong> means the cell is blocked (wall).</li>
                <li>The rat can move <strong className="text-white">up, down, left, or right</strong>.</li>
                <li>A cell cannot be revisited on the current path (prevents cycles).</li>
              </ul>
            </div>

            {/* VISUAL MAZE GRID */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-xs font-mono font-bold text-teal-300 border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>Visual 3 × 3 Maze & Solved Route</span>
                <span className="text-[10px] text-emerald-400">Green = Rat Path Found</span>
              </div>

              <div className="py-2 flex flex-col items-center">
                <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-900 rounded-xl border border-slate-800">
                  {mazeGrid.map((row, rIdx) =>
                    row.map((cell, cIdx) => {
                      const isPath = mazeSolutionPath[rIdx][cIdx] === 1;
                      const isBlocked = cell === 0;
                      const isStart = rIdx === 0 && cIdx === 0;
                      const isEnd = rIdx === 2 && cIdx === 2;
                      return (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-bold text-xs border transition-all ${
                            isPath
                              ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-500/20'
                              : isBlocked
                              ? 'bg-slate-950 border-rose-500/40 text-rose-500/60'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span className="text-sm">
                            {isStart ? '🐀 Start' : isEnd ? '🏁 Exit' : isBlocked ? '🧱 Wall' : isPath ? '🐾 1' : '1'}
                          </span>
                          <span className="text-[9px] text-slate-500 mt-0.5">({rIdx},{cIdx})</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: solveMaze
              </h4>
              <CodeBox
                title="Rat in a Maze Backtracking"
                code={`#include <iostream>
#include <vector>
using namespace std;

bool solveMaze(vector<vector<int>>& maze,
               vector<vector<int>>& path,
               int row, int col, int n) {
    if (row < 0 || col < 0 || row >= n || col >= n ||
        maze[row][col] == 0 || path[row][col] == 1) {
        return false;
    }

    path[row][col] = 1;

    if (row == n - 1 && col == n - 1) {
        return true;
    }

    // Try down, right, up, and left
    if (solveMaze(maze, path, row + 1, col, n) ||
        solveMaze(maze, path, row, col + 1, n) ||
        solveMaze(maze, path, row - 1, col, n) ||
        solveMaze(maze, path, row, col - 1, n)) {
        return true;
    }

    path[row][col] = 0; // Backtrack
    return false;
}

int main() {
    vector<vector<int>> maze = {
        {1, 1, 0},
        {0, 1, 1},
        {1, 1, 1}
    };

    int n = maze.size();
    vector<vector<int>> path(n, vector<int>(n, 0));

    if (solveMaze(maze, path, 0, 0, n)) {
        for (const auto& row : path) {
            for (int cell : row) cout << cell << " ";
            cout << "\\n";
        }
    } else {
        cout << "No path exists\\n";
    }

    return 0;
}`}
              />
            </div>

            <p className="text-xs text-theme-text-muted leading-relaxed">
              The <code className="text-teal-300 font-mono">path</code> matrix marks cells in the current route. If a route fails, the algorithm unmarks its cells (<code className="text-teal-300 font-mono">path[row][col] = 0</code>) as it backtracks. If a route succeeds, the marked matrix shows the complete path found.
            </p>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 12: Sudoku Solver */}
      {/* ========================================================================= */}
      <div id="rec-topic-12" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(12)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="recursion" subtopicId={12} title="Sudoku Solver" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              12
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">12. Sudoku Solver</h3>
              <p className="text-xs text-theme-text-muted font-mono">Row, column & 3×3 box constraints · Exhaustive recursive solver</p>
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
              <p className="text-theme-text-muted leading-relaxed mb-2">
                A <strong className="text-theme-text">Sudoku solver</strong> fills empty cells in a 9 × 9 grid so that each row, each column, and each 3 × 3 sub-box contains the digits 1 through 9 exactly once.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                <span className="text-teal-400 font-bold block mb-1">The Algorithm Steps:</span>
                <ol className="space-y-1 list-decimal list-inside text-slate-300">
                  <li>Find an empty cell, represented by <code className="text-white">'.'</code>.</li>
                  <li>Try digits <code className="text-white">'1'</code> through <code className="text-white">'9'</code>.</li>
                  <li>Check whether each digit is valid in that row, column, and 3 × 3 box.</li>
                  <li>Place a valid digit and recursively solve the remaining board.</li>
                  <li>If no digit works, reset the cell to <code className="text-white">'.'</code> and try another choice.</li>
                </ol>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: isSafe & solveSudoku
              </h4>
              <CodeBox
                title="Sudoku Backtracking Solver"
                code={`#include <iostream>
#include <vector>
using namespace std;

bool isSafe(vector<vector<char>>& board,
            int row, int col, char digit) {
    for (int i = 0; i < 9; i++) {
        if (board[row][i] == digit) return false;
        if (board[i][col] == digit) return false;
    }

    int startRow = (row / 3) * 3;
    int startCol = (col / 3) * 3;

    for (int i = startRow; i < startRow + 3; i++) {
        for (int j = startCol; j < startCol + 3; j++) {
            if (board[i][j] == digit) return false;
        }
    }

    return true;
}

bool solveSudoku(vector<vector<char>>& board) {
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            if (board[row][col] == '.') {
                for (char digit = '1'; digit <= '9'; digit++) {
                    if (isSafe(board, row, col, digit)) {
                        board[row][col] = digit;

                        if (solveSudoku(board)) {
                            return true;
                        }

                        board[row][col] = '.'; // Backtrack
                    }
                }

                return false; // No digit works here
            }
        }
    }

    return true; // All cells filled
}

int main() {
    vector<vector<char>> board(9, vector<char>(9, '.'));

    // Supply a valid Sudoku puzzle in board before solving.
    if (solveSudoku(board)) {
        for (const auto& row : board) {
            for (char cell : row) cout << cell << " ";
            cout << "\\n";
        }
    } else {
        cout << "No solution exists\\n";
    }

    return 0;
}`}
              />
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-500/30 text-xs text-amber-300">
              <strong>Important:</strong> The <code className="text-white font-mono">main()</code> above initializes an empty board, which has no valid Sudoku solution because no initial clues constrain the grid. Replace that initialization with a valid Sudoku puzzle before running it to obtain a meaningful solution.
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 13: Quick Revise */}
      {/* ========================================================================= */}
      <div id="rec-topic-13" className="rounded-2xl border border-teal-500/40 bg-theme-card overflow-hidden shadow-lg transition-all">
        <button
          type="button"
          onClick={() => toggleCard(13)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-gradient-to-r from-teal-950/40 via-theme-surface-elevated to-emerald-950/40 hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="recursion" subtopicId={13} title="Quick Revise: All Key Concepts" />
            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-mono font-bold text-xs">
              ⚡
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text flex items-center gap-2">
                <span>Quick Revise: All Key Concepts</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Exam Ready
                </span>
              </h3>
              <p className="text-xs text-theme-text-muted font-mono">High-yield revision matrix across all 12 topics</p>
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
                Key Concepts to Remember
              </h4>
              <div className="overflow-x-auto rounded-xl border border-theme-border shadow-sm">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-teal-300 border-b border-theme-border">
                    <tr>
                      <th className="py-2.5 px-3.5 w-12">#</th>
                      <th className="py-2.5 px-3.5">Topic</th>
                      <th className="py-2.5 px-3.5">Main Idea</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-sans">
                    {[
                      { id: 1, title: 'Base case', desc: 'Stops recursion and prevents stack overflow' },
                      { id: 2, title: 'Recursive case', desc: 'Solves a smaller instance of the same problem' },
                      { id: 3, title: 'Call stack', desc: 'Hardware stack storing active function activation records' },
                      { id: 4, title: 'Recursion tree', desc: 'Visualizes problem branching and overlapping subproblems' },
                      { id: 5, title: 'Subsets', desc: 'Include or exclude each element (2^n choices)' },
                      { id: 6, title: 'Permutations', desc: 'Order matters · P(n, r) = n! / (n - r)!' },
                      { id: 7, title: 'Combinations', desc: 'Order does not matter · C(n, r) = n! / [r!(n - r)!]' },
                      { id: 8, title: 'Backtracking', desc: 'Make a choice, explore, undo if invalid' },
                      { id: 9, title: 'N-Queens', desc: 'Place queens without row, col, or diagonal attacks' },
                      { id: 10, title: 'Rat in a Maze', desc: 'Find valid path through maze using 4-way exploration' },
                      { id: 11, title: 'Sudoku Solver', desc: 'Fill empty cells while obeying row, col, and 3x3 box rules' },
                      { id: 12, title: 'Two-Pointer Recursion', desc: 'Inward shrinking swaps for in-place array/string processing' }
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
                <span className="text-[11px] font-bold text-teal-300 font-mono block">Backtracking Invariant</span>
                <p className="text-xs text-slate-300 font-mono">choose() → recurse() → undo()</p>
                <p className="text-[10px] text-slate-400">Restores state upon backtrack</p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-1">
                <span className="text-[11px] font-bold text-blue-300 font-mono block">Subset Generation</span>
                <p className="text-xs text-slate-300 font-mono">2 choices per item: Pick / Don't Pick</p>
                <p className="text-[10px] text-slate-400">Generates 2^n subsets in O(n·2^n)</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                <span className="text-[11px] font-bold text-emerald-300 font-mono block">Safety Function Invariant</span>
                <p className="text-xs text-slate-300 font-mono">isSafe(board, row, col)</p>
                <p className="text-[10px] text-slate-400">Prunes invalid branches early</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
