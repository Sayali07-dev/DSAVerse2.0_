import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  ChevronDown, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Repeat,
  Compass,
  Table as TableIcon,
  ChevronsRight
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

export const LinkedListLearningView: React.FC = () => {
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

  // Interactive state for Topic 2: Singly Linked List Traversal
  const [sllStep, setSllStep] = useState(0); // 0: before, 1: at 10, 2: at 20, 3: at 30, 4: at null

  // Interactive state for Topic 3: Searching
  const [searchTarget, setSearchTarget] = useState<number>(20);
  const [searchStep, setSearchStep] = useState<number>(-1); // -1: idle, 0: at 10, 1: at 20, 2: at 30, 3: end

  // Interactive state for Topic 7: Reversal Stepper
  const [reverseStep, setReverseStep] = useState(0); // 0..3

  // Interactive state for Topic 8: Middle Node
  const [middleStep, setMiddleStep] = useState(0); // 0..2

  // Interactive state for Topic 9: Cycle Detection
  const [cycleTab, setCycleTab] = useState<'detect' | 'start'>('detect');

  // Interactive state for Topic 11: Remove Nth
  const [nthStep, setNthStep] = useState(0);

  return (
    <div className="space-y-6">
      <TopicProgressHeader topicId="linked-lists" topicTitle="Linked Lists" />
      {/* Chapter Banner & Intro */}
      <div className="p-6 sm:p-8 rounded-3xl bg-theme-card border border-teal-500/25 glass-panel shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme-border pb-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 mb-1 flex items-center gap-1.5">
              <span>Chapter 05</span>
              <span>·</span>
              <span>Linear Data Structures</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-text tracking-tight">
              5. Linked Lists
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
            A Linked List is a data structure in which elements are stored in separate units called nodes. Each node contains data and a pointer that connects it to another node.
          </p>
          <p>
            We’ll learn all 12 topics using simple definitions, theory, and beginner-friendly C++ code snippets.
          </p>
        </div>

        {/* Quick Topics Jump Strip */}
        <div className="pt-2 flex flex-wrap gap-1.5 sm:gap-2">
          {[
            '1. Nodes & Pointers',
            '2. Singly Linked List',
            '3. Traversal & Search',
            '4. Insertion & Deletion',
            '5. Doubly Linked List',
            '6. Circular Linked List',
            '7. Reverse List',
            '8. Find Middle Node',
            '9. Detect Cycle',
            '10. Merge Two Lists',
            '11. Remove Nth From End',
            '12. Merge Sort',
            'Quick Revision'
          ].map((topicLabel, idx) => (
            <a
              key={idx}
              href={`#ll-topic-${idx + 1}`}
              onClick={(e) => {
                e.preventDefault();
                setExpandedCards(prev => ({ ...prev, [idx + 1]: true }));
                const el = document.getElementById(`ll-topic-${idx + 1}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium border border-theme-border bg-theme-surface-elevated hover:bg-teal-500/10 hover:border-teal-500/40 text-theme-text transition-colors"
            >
              {topicLabel}
            </a>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: Introduction to Nodes and Pointers */}
      {/* ========================================================================= */}
      <div id="ll-topic-1" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(1)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="linked-lists" subtopicId={1} title="Introduction to Nodes and Pointers" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              1
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">1. Introduction to Nodes and Pointers</h3>
              <p className="text-xs text-theme-text-muted font-mono">Foundations: struct Node, memory addresses, next pointer & nullptr</p>
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
                A node is a small unit that stores data and a pointer to another node. A pointer is a variable that stores the memory address of another object.
              </p>
            </div>

            {/* DIAGRAM: EXAMPLE LINKED LIST WITH THREE NODES */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-teal-400 font-bold border-b border-slate-800/80 pb-2">
                <span>EXAMPLE: LINKED LIST WITH THREE NODES</span>
                <span className="text-[11px] text-slate-400 font-normal">Head → [10] → [20] → [30] → NULL</span>
              </div>

              {/* Node Visualization Diagram */}
              <div className="py-4 overflow-x-auto flex items-center justify-start sm:justify-center gap-2 sm:gap-4 min-w-max">
                {/* Node 1 */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono text-teal-400 mb-1 font-bold">head (0x1000)</span>
                  <div className="flex items-stretch rounded-xl border-2 border-teal-500/60 bg-slate-900 overflow-hidden shadow-lg shadow-teal-500/10">
                    <div className="px-3 py-2.5 bg-teal-950/70 text-teal-200 font-mono font-bold text-sm flex flex-col items-center justify-center border-r border-teal-500/40">
                      <span className="text-[9px] uppercase tracking-wider text-teal-400">data</span>
                      <span>10</span>
                    </div>
                    <div className="px-3 py-2.5 bg-slate-900 text-slate-300 font-mono text-xs flex flex-col items-center justify-center">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400">next</span>
                      <span className="text-amber-400 font-semibold">0x1040</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 mt-1">first</span>
                </div>

                <div className="flex items-center text-teal-400">
                  <ArrowRight className="w-5 h-5" />
                </div>

                {/* Node 2 */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono text-slate-400 mb-1">0x1040</span>
                  <div className="flex items-stretch rounded-xl border-2 border-teal-500/60 bg-slate-900 overflow-hidden shadow-lg shadow-teal-500/10">
                    <div className="px-3 py-2.5 bg-teal-950/70 text-teal-200 font-mono font-bold text-sm flex flex-col items-center justify-center border-r border-teal-500/40">
                      <span className="text-[9px] uppercase tracking-wider text-teal-400">data</span>
                      <span>20</span>
                    </div>
                    <div className="px-3 py-2.5 bg-slate-900 text-slate-300 font-mono text-xs flex flex-col items-center justify-center">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400">next</span>
                      <span className="text-amber-400 font-semibold">0x1080</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 mt-1">second</span>
                </div>

                <div className="flex items-center text-teal-400">
                  <ArrowRight className="w-5 h-5" />
                </div>

                {/* Node 3 */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono text-slate-400 mb-1">0x1080</span>
                  <div className="flex items-stretch rounded-xl border-2 border-teal-500/60 bg-slate-900 overflow-hidden shadow-lg shadow-teal-500/10">
                    <div className="px-3 py-2.5 bg-teal-950/70 text-teal-200 font-mono font-bold text-sm flex flex-col items-center justify-center border-r border-teal-500/40">
                      <span className="text-[9px] uppercase tracking-wider text-teal-400">data</span>
                      <span>30</span>
                    </div>
                    <div className="px-3 py-2.5 bg-slate-900 text-rose-300 font-mono text-xs flex flex-col items-center justify-center">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400">next</span>
                      <span className="text-rose-400 font-bold">nullptr</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 mt-1">third</span>
                </div>

                <div className="flex items-center text-rose-400">
                  <ArrowRight className="w-5 h-5" />
                </div>

                {/* NULL block */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono text-slate-500 mb-1">terminator</span>
                  <div className="px-3.5 py-3 rounded-xl border border-rose-500/40 bg-rose-950/40 text-rose-300 font-mono font-bold text-xs">
                    NULL (nullptr)
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Each node stores a value and the address of the next node. <code className="text-rose-300 font-mono">NULL</code> (or <code className="text-teal-300 font-mono">nullptr</code> in modern C++) means there is no next node.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-2">
                Theory
              </h4>
              <ul className="space-y-1.5 text-xs text-theme-text-muted leading-relaxed list-disc list-inside">
                <li><strong className="text-theme-text">data</strong> stores the value.</li>
                <li><strong className="text-theme-text">next</strong> stores the address of the next node.</li>
                <li><strong className="text-theme-text">head</strong> points to the first node.</li>
                <li><strong className="text-theme-text">nullptr</strong> indicates that a pointer points to no object.</li>
                <li><strong className="text-theme-text">new</strong> dynamically creates a node; <strong className="text-theme-text">delete</strong> releases the memory allocated for it.</li>
              </ul>
            </div>

            <CodeBox
              title="C++ code"
              code={`#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

int main() {
    Node* first = new Node{10, nullptr};
    Node* second = new Node{20, nullptr};

    first->next = second;

    cout << first->data << endl;       // 10
    cout << first->next->data << endl; // 20

    delete second;
    delete first;

    return 0;
}`}
            />

            <div className="p-4 rounded-xl bg-theme-surface-elevated border border-theme-border space-y-2">
              <span className="text-xs font-bold font-mono text-teal-400 block">
                Understand these symbols:
              </span>
              <ul className="space-y-1 text-xs text-theme-text-muted">
                <li><code className="text-teal-300 font-mono font-semibold">Node*</code> — a pointer to a Node.</li>
                <li><code className="text-teal-300 font-mono font-semibold">new Node&#123;10, nullptr&#125;</code> — creates a node with data 10 and no next node.</li>
                <li><code className="text-teal-300 font-mono font-semibold">first-&gt;next = second</code> — connects the first node to the second.</li>
                <li><code className="text-teal-300 font-mono font-semibold">first-&gt;data</code> — accesses the data through a pointer.</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: Singly Linked List */}
      {/* ========================================================================= */}
      <div id="ll-topic-2" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(2)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="linked-lists" subtopicId={2} title="Singly Linked List" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              2
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">2. Singly Linked List</h3>
              <p className="text-xs text-theme-text-muted font-mono">Unidirectional chain: head → 10 → 20 → 30 → nullptr</p>
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
                A Singly Linked List is a collection of nodes where each node contains data and a pointer to the next node. Traversal normally happens in one direction, from the head to the end.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                Suppose the list is 10 → 20 → 30 → nullptr.
              </p>
              <ul className="space-y-1 text-xs text-theme-text-muted list-disc list-inside">
                <li><strong className="text-theme-text">head</strong> points to 10.</li>
                <li>The first node points to 20.</li>
                <li>The second node points to 30.</li>
                <li>The last node points to <code className="text-rose-400 font-mono">nullptr</code>.</li>
              </ul>
            </div>

            {/* INTERACTIVE DIAGRAM: STEPPING TEMP POINTER */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-xs font-mono font-bold text-teal-300">
                  Interactive Diagram: Temp Pointer Moving From Head to nullptr
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSllStep((prev) => (prev + 1) % 5)}
                    className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronsRight className="w-3.5 h-3.5" />
                    <span>Advance temp ({sllStep === 4 ? 'Reset' : `Step ${sllStep + 1}/4`})</span>
                  </button>
                  <button
                    onClick={() => setSllStep(0)}
                    className="p-1 rounded-lg border border-slate-700 text-slate-400 hover:text-white"
                    title="Reset"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="py-4 flex items-center justify-start sm:justify-center gap-2 sm:gap-4 overflow-x-auto min-w-max">
                {/* Head Pointer indicator */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold mb-1">head</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center font-mono text-xs text-emerald-300">
                    H
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-emerald-400" />

                {/* Node 10 */}
                <div className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center ${
                  sllStep === 1
                    ? 'border-amber-400 bg-amber-950/40 ring-4 ring-amber-400/30 scale-105'
                    : 'border-slate-700 bg-slate-900'
                }`}>
                  <div className="text-[10px] font-mono text-slate-400 mb-0.5">Node 1</div>
                  <div className="font-mono text-base font-bold text-white px-2">10</div>
                  <div className="text-[10px] font-mono text-teal-400 mt-0.5">next → [20]</div>
                  {sllStep === 1 && (
                    <span className="mt-1 px-1.5 py-0.2 rounded bg-amber-500 text-black font-mono text-[9px] font-bold">
                      temp == 10
                    </span>
                  )}
                </div>

                <ArrowRight className="w-4 h-4 text-teal-400" />

                {/* Node 20 */}
                <div className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center ${
                  sllStep === 2
                    ? 'border-amber-400 bg-amber-950/40 ring-4 ring-amber-400/30 scale-105'
                    : 'border-slate-700 bg-slate-900'
                }`}>
                  <div className="text-[10px] font-mono text-slate-400 mb-0.5">Node 2</div>
                  <div className="font-mono text-base font-bold text-white px-2">20</div>
                  <div className="text-[10px] font-mono text-teal-400 mt-0.5">next → [30]</div>
                  {sllStep === 2 && (
                    <span className="mt-1 px-1.5 py-0.2 rounded bg-amber-500 text-black font-mono text-[9px] font-bold">
                      temp == 20
                    </span>
                  )}
                </div>

                <ArrowRight className="w-4 h-4 text-teal-400" />

                {/* Node 30 */}
                <div className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center ${
                  sllStep === 3
                    ? 'border-amber-400 bg-amber-950/40 ring-4 ring-amber-400/30 scale-105'
                    : 'border-slate-700 bg-slate-900'
                }`}>
                  <div className="text-[10px] font-mono text-slate-400 mb-0.5">Node 3</div>
                  <div className="font-mono text-base font-bold text-white px-2">30</div>
                  <div className="text-[10px] font-mono text-rose-400 mt-0.5">next → null</div>
                  {sllStep === 3 && (
                    <span className="mt-1 px-1.5 py-0.2 rounded bg-amber-500 text-black font-mono text-[9px] font-bold">
                      temp == 30
                    </span>
                  )}
                </div>

                <ArrowRight className="w-4 h-4 text-rose-400" />

                {/* nullptr */}
                <div className={`p-3 rounded-xl border transition-all ${
                  sllStep === 4
                    ? 'border-rose-400 bg-rose-950/70 text-white ring-4 ring-rose-400/30'
                    : 'border-slate-800 bg-slate-900 text-slate-500'
                } font-mono text-xs flex flex-col items-center`}>
                  <span>nullptr</span>
                  {sllStep === 4 && (
                    <span className="text-[9px] text-amber-300 font-bold mt-1">temp == nullptr (Loop stops!)</span>
                  )}
                </div>
              </div>

              <div className="text-xs font-mono text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                {sllStep === 0 && 'Initial: head points to 10. temp = head not yet started. Click "Advance temp".'}
                {sllStep === 1 && 'Iteration 1: temp = head (at 10). Output: 10. Advances to temp = temp->next.'}
                {sllStep === 2 && 'Iteration 2: temp is now at Node 20. Output: 20. Advances to temp = temp->next.'}
                {sllStep === 3 && 'Iteration 3: temp is now at Node 30. Output: 30. Advances to temp = temp->next.'}
                {sllStep === 4 && 'Termination: temp is now nullptr. Loop condition (temp != nullptr) evaluates to false. Traversal completes!'}
              </div>
            </div>

            <CodeBox
              title="C++ code: Create and display a list"
              code={`#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

int main() {
    Node* head = new Node{10, nullptr};
    head->next = new Node{20, nullptr};
    head->next->next = new Node{30, nullptr};

    Node* temp = head;

    while (temp != nullptr) {
        cout << temp->data << " ";
        temp = temp->next;
    }

    // Free the allocated memory
    while (head != nullptr) {
        Node* temp = head;
        head = head->next;
        delete temp;
    }

    return 0;
}`}
            />

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
              <span className="text-teal-400 font-semibold block">Output:</span>
              <pre className="text-emerald-400 font-bold">10 20 30</pre>
            </div>

            <p className="text-xs text-theme-text-muted italic">
              The variable temp moves from one node to the next without changing the original head pointer.
            </p>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: Traversal and Searching */}
      {/* ========================================================================= */}
      <div id="ll-topic-3" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(3)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="linked-lists" subtopicId={3} title="Traversal and Searching" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              3
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">3. Traversal and Searching</h3>
              <p className="text-xs text-theme-text-muted font-mono">Visiting every node O(n) & linear search with early break</p>
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
                Traversal means visiting every node in a linked list one by one. Searching means checking whether a particular value exists in the list.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                We start from <code className="text-teal-300 font-mono">head</code> and move using <code className="text-teal-300 font-mono">temp = temp-&gt;next</code>. We stop when <code className="text-teal-300 font-mono">temp == nullptr</code>.
              </p>
              <p className="text-theme-text-muted leading-relaxed">
                Searching a linked list takes <span className="font-mono text-amber-300 font-bold">O(n)</span> time in the worst case because we may need to check every node.
              </p>
            </div>

            {/* INTERACTIVE SEARCH DIAGRAM */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-xs font-mono font-bold text-teal-300">
                  Interactive Search Diagram: Find Target in Linked List
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">Target x:</span>
                  {[10, 20, 30, 99].map(val => (
                    <button
                      key={val}
                      onClick={() => {
                        setSearchTarget(val);
                        setSearchStep(0);
                      }}
                      className={`px-2 py-0.5 rounded text-xs font-mono font-bold cursor-pointer ${
                        searchTarget === val
                          ? 'bg-teal-500 text-black'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setSearchStep(prev => (prev >= 3 ? 0 : prev + 1));
                    }}
                    className="px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-500 text-white text-xs font-mono font-bold ml-1 cursor-pointer"
                  >
                    Step
                  </button>
                  <button
                    onClick={() => setSearchStep(-1)}
                    className="p-1 rounded border border-slate-700 text-slate-400 hover:text-white"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Chain with search indicator */}
              <div className="py-4 flex items-center justify-start sm:justify-center gap-3 overflow-x-auto min-w-max">
                {[10, 20, 30].map((val, idx) => {
                  const isCurrent = searchStep === idx;
                  const isFound = isCurrent && val === searchTarget;
                  return (
                    <React.Fragment key={val}>
                      <div className={`p-3.5 rounded-xl border-2 transition-all flex flex-col items-center ${
                        isFound
                          ? 'border-emerald-400 bg-emerald-950/60 ring-4 ring-emerald-400/40 scale-105'
                          : isCurrent
                          ? 'border-amber-400 bg-amber-950/40 ring-4 ring-amber-400/30 scale-105'
                          : 'border-slate-700 bg-slate-900'
                      }`}>
                        <span className="text-[10px] font-mono text-slate-400 mb-0.5">Node [{idx}]</span>
                        <span className="font-mono text-lg font-bold text-white">{val}</span>
                        <div className="mt-1 h-5 flex items-center">
                          {isFound ? (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-black font-mono text-[9px] font-extrabold flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" /> Found! (break)
                            </span>
                          ) : isCurrent ? (
                            <span className="text-[9px] font-mono text-amber-300">
                              {val} != {searchTarget} (next)
                            </span>
                          ) : (
                            <span className="text-[9px] font-mono text-slate-500">Node</span>
                          )}
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-teal-400" />
                    </React.Fragment>
                  );
                })}

                <div className={`p-3.5 rounded-xl border font-mono text-xs flex flex-col items-center ${
                  searchStep === 3
                    ? 'border-rose-400 bg-rose-950/70 text-rose-200'
                    : 'border-slate-800 bg-slate-900 text-slate-500'
                }`}>
                  <span>nullptr</span>
                  {searchStep === 3 && (
                    <span className="text-[9px] text-rose-300 font-bold mt-1">Not found!</span>
                  )}
                </div>
              </div>

              <div className="text-xs font-mono p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                {searchStep === -1 && `Click 'Step' to begin searching for x = ${searchTarget}.`}
                {searchStep === 0 && (10 === searchTarget ? `At node 10 == ${searchTarget}! Match found. break triggers.` : `At node 10 != ${searchTarget}. Advance to temp->next.`)}
                {searchStep === 1 && (20 === searchTarget ? `At node 20 == ${searchTarget}! Match found. break triggers.` : `At node 20 != ${searchTarget}. Advance to temp->next.`)}
                {searchStep === 2 && (30 === searchTarget ? `At node 30 == ${searchTarget}! Match found. break triggers.` : `At node 30 != ${searchTarget}. Advance to temp->next.`)}
                {searchStep === 3 && `Reached nullptr! Value ${searchTarget} not in linked list.`}
              </div>
            </div>

            <CodeBox
              title="C++ code"
              code={`// Traversal
Node* temp = head;

while (temp != nullptr) {
    cout << temp->data << " ";
    temp = temp->next;
}

// Searching for value x
int x = 20;
temp = head;
bool found = false;

while (temp != nullptr) {
    if (temp->data == x) {
        found = true;
        break;
    }
    temp = temp->next;
}

if (found)
    cout << "Found";
else
    cout << "Not found";`}
            />

            <p className="text-xs text-theme-text-muted italic">
              Here, break immediately stops the loop when the value is found.
            </p>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: Insertion and Deletion */}
      {/* ========================================================================= */}
      <div id="ll-topic-4" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(4)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="linked-lists" subtopicId={4} title="Insertion and Deletion" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              4
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">4. Insertion and Deletion</h3>
              <p className="text-xs text-theme-text-muted font-mono">Insert Beginning, Insert End & Delete First Node with safe rewiring</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[4] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[4] && (
          <div className="p-5 sm:p-6 space-y-6 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Definition
              </h4>
              <ul className="space-y-1 text-xs text-theme-text-muted list-disc list-inside">
                <li><strong className="text-theme-text">Insertion:</strong> Adding a new node to the linked list.</li>
                <li><strong className="text-theme-text">Deletion:</strong> Removing an existing node from the linked list.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                Insertion and deletion change the links between nodes. We must update the pointers carefully so that the remaining list stays connected.
              </p>
            </div>

            {/* PART A: Insert at the beginning */}
            <div className="p-4 sm:p-5 rounded-2xl bg-theme-surface-elevated border border-theme-border space-y-4">
              <div className="flex items-center gap-2 border-b border-theme-border pb-2">
                <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-400 font-mono text-xs font-bold">
                  A
                </span>
                <h4 className="text-sm sm:text-base font-bold text-theme-text">Insert at the beginning</h4>
              </div>

              <p className="text-xs text-theme-text-muted leading-relaxed">
                Suppose the list is 20 → 30. We want to add 10.
              </p>

              {/* DIAGRAM BEFORE AND AFTER */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* BEFORE */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                    BEFORE INSERTION
                  </div>
                  <div className="flex items-center justify-center gap-2 py-3 overflow-x-auto">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">head →</span>
                    <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-white">
                      20 | •
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                    <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-white">
                      30 | •
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
                    <span className="px-2 py-1 rounded bg-slate-900 text-rose-400 font-mono text-xs">NULL</span>
                  </div>
                </div>

                {/* AFTER */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> AFTER INSERTION
                  </div>
                  <div className="flex items-center justify-center gap-2 py-3 overflow-x-auto">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">head →</span>
                    <div className="px-3 py-2 rounded-lg bg-teal-950 border-2 border-teal-400 font-mono text-xs font-bold text-teal-200 ring-2 ring-teal-400/30">
                      10 | •
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                    <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-white">
                      20 | •
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                    <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-white">
                      30 | •
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
                    <span className="px-2 py-1 rounded bg-slate-900 text-rose-400 font-mono text-xs">NULL</span>
                  </div>
                </div>
              </div>

              <CodeBox
                title="C++ function: insertAtBeginning"
                code={`void insertAtBeginning(Node*& head, int value) {
    Node* newNode = new Node{value, head};
    head = newNode;
}`}
              />

              <div className="space-y-1.5 text-xs text-theme-text-muted">
                <span className="font-bold text-theme-text block">How it works:</span>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Create a new node.</li>
                  <li>Make its next point to the current head.</li>
                  <li>Update head to point to the new node.</li>
                </ol>
                <p className="pt-1 text-teal-400 font-mono">
                  Node*&amp; head passes the actual head pointer by reference, so the function can change it.
                </p>
              </div>
            </div>

            {/* PART B: Insert at the end */}
            <div className="p-4 sm:p-5 rounded-2xl bg-theme-surface-elevated border border-theme-border space-y-4">
              <div className="flex items-center gap-2 border-b border-theme-border pb-2">
                <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-400 font-mono text-xs font-bold">
                  B
                </span>
                <h4 className="text-sm sm:text-base font-bold text-theme-text">Insert at the end</h4>
              </div>

              {/* DIAGRAM FOR INSERT AT END */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-teal-300 font-semibold">
                  Traversing to end node, then linking temp-&gt;next = newNode
                </div>
                <div className="flex items-center justify-start sm:justify-center gap-2 py-3 overflow-x-auto min-w-max">
                  <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-white">
                    10 | •
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                  <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-white">
                    20 | •
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                  <div className="px-3 py-2 rounded-lg bg-amber-950/60 border border-amber-400 font-mono text-xs text-amber-200 font-bold">
                    30 | temp
                  </div>
                  <div className="flex items-center text-emerald-400 font-mono text-xs font-bold">
                    <span className="mx-1">--next--&gt;</span>
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-emerald-950/80 border-2 border-emerald-400 font-mono text-xs text-emerald-200 font-bold ring-2 ring-emerald-400/30">
                    40 | nullptr (newNode)
                  </div>
                </div>
              </div>

              <CodeBox
                title="C++ function: insertAtEnd"
                code={`void insertAtEnd(Node*& head, int value) {
    Node* newNode = new Node{value, nullptr};

    if (head == nullptr) {
        head = newNode;
        return;
    }

    Node* temp = head;

    while (temp->next != nullptr) {
        temp = temp->next;
    }

    temp->next = newNode;
}`}
              />

              <p className="text-xs text-theme-text-muted leading-relaxed">
                We move to the last node and connect its next pointer to the new node. If the list is empty, the new node becomes the head.
              </p>
            </div>

            {/* PART C: Delete the first node */}
            <div className="p-4 sm:p-5 rounded-2xl bg-theme-surface-elevated border border-theme-border space-y-4">
              <div className="flex items-center gap-2 border-b border-theme-border pb-2">
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono text-xs font-bold">
                  C
                </span>
                <h4 className="text-sm sm:text-base font-bold text-theme-text">Delete the first node</h4>
              </div>

              {/* DIAGRAM FOR DELETION */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-rose-300 font-semibold">
                  Save temp = head, advance head = head-&gt;next, delete temp
                </div>
                <div className="flex items-center justify-start sm:justify-center gap-2 py-3 overflow-x-auto min-w-max">
                  <div className="px-3 py-2 rounded-lg bg-rose-950/60 border border-rose-500 text-rose-200 font-mono text-xs line-through opacity-75">
                    temp (10) [delete]
                  </div>
                  <div className="px-2 text-rose-400 font-mono text-xs">bypass</div>
                  <div className="px-3 py-2 rounded-lg bg-teal-950/80 border-2 border-teal-400 text-teal-200 font-mono text-xs font-bold">
                    new head → 20
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                  <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs">
                    30 → null
                  </div>
                </div>
              </div>

              <CodeBox
                title="C++ function: deleteBeginning"
                code={`void deleteBeginning(Node*& head) {
    if (head == nullptr)
        return;

    Node* temp = head;
    head = head->next;
    delete temp;
}`}
              />

              <p className="text-xs text-theme-text-muted leading-relaxed">
                We save the first node, move head to the next node, and release the old node's memory.
              </p>

              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  <strong>Remember:</strong> Never delete a node before saving the address of the next node if you still need to traverse the list.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: Doubly Linked List */}
      {/* ========================================================================= */}
      <div id="ll-topic-5" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(5)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="linked-lists" subtopicId={5} title="Doubly Linked List" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              5
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">5. Doubly Linked List</h3>
              <p className="text-xs text-theme-text-muted font-mono">Bidirectional links: nullptr ← 10 ⇄ 20 ⇄ 30 → nullptr</p>
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
                A Doubly Linked List is a linked list where every node contains data and two pointers: one to the previous node and one to the next node.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2 font-mono text-xs">
                Example: nullptr ← 10 ⇄ 20 ⇄ 30 → nullptr
              </p>
              <ul className="space-y-1 text-xs text-theme-text-muted list-disc list-inside">
                <li><strong className="text-theme-text">prev</strong> points to the previous node.</li>
                <li><strong className="text-theme-text">next</strong> points to the next node.</li>
                <li>We can traverse forward and backward.</li>
              </ul>
            </div>

            {/* DIAGRAM: DOUBLY LINKED LIST */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-teal-300 border-b border-slate-800/80 pb-2">
                Visual Diagram: Doubly Linked List Node Architecture [prev | data | next]
              </div>

              <div className="py-4 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto min-w-max">
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-500 font-mono text-xs">
                  nullptr
                </span>

                <span className="text-teal-400 font-mono">←</span>

                {/* Node 1 */}
                <div className="rounded-xl border-2 border-teal-500/60 bg-slate-900 overflow-hidden flex font-mono text-xs shadow-md">
                  <div className="px-2 py-2 bg-slate-950 text-slate-400 border-r border-slate-800 text-[10px]">null</div>
                  <div className="px-3 py-2 bg-teal-950/70 text-teal-200 font-bold text-sm border-r border-slate-800">10</div>
                  <div className="px-2 py-2 bg-slate-950 text-teal-300 text-[10px]">next</div>
                </div>

                <div className="flex flex-col items-center justify-center font-mono text-teal-400 text-xs px-1">
                  <span>⇄</span>
                </div>

                {/* Node 2 */}
                <div className="rounded-xl border-2 border-teal-500/60 bg-slate-900 overflow-hidden flex font-mono text-xs shadow-md">
                  <div className="px-2 py-2 bg-slate-950 text-teal-300 border-r border-slate-800 text-[10px]">prev</div>
                  <div className="px-3 py-2 bg-teal-950/70 text-teal-200 font-bold text-sm border-r border-slate-800">20</div>
                  <div className="px-2 py-2 bg-slate-950 text-teal-300 text-[10px]">next</div>
                </div>

                <div className="flex flex-col items-center justify-center font-mono text-teal-400 text-xs px-1">
                  <span>⇄</span>
                </div>

                {/* Node 3 */}
                <div className="rounded-xl border-2 border-teal-500/60 bg-slate-900 overflow-hidden flex font-mono text-xs shadow-md">
                  <div className="px-2 py-2 bg-slate-950 text-teal-300 border-r border-slate-800 text-[10px]">prev</div>
                  <div className="px-3 py-2 bg-teal-950/70 text-teal-200 font-bold text-sm border-r border-slate-800">30</div>
                  <div className="px-2 py-2 bg-slate-950 text-slate-400 text-[10px]">null</div>
                </div>

                <span className="text-teal-400 font-mono">→</span>

                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-500 font-mono text-xs">
                  nullptr
                </span>
              </div>
            </div>

            <CodeBox
              title="C++ code"
              code={`struct DNode {
    int data;
    DNode* prev;
    DNode* next;
};

int main() {
    DNode* first = new DNode{10, nullptr, nullptr};
    DNode* second = new DNode{20, first, nullptr};

    first->next = second;

    cout << second->prev->data; // 10

    delete second;
    delete first;
}`}
            />

            <p className="text-xs text-theme-text-muted leading-relaxed">
              The second node points backward to the first node, while the first node points forward to the second.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-theme-text space-y-1">
                <span className="font-bold text-emerald-400 flex items-center gap-1 font-mono">
                  <Check className="w-3.5 h-3.5" /> Advantages
                </span>
                <p className="text-theme-text-muted">
                  Forward and backward traversal, and easier deletion when the node is already known.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-theme-text space-y-1">
                <span className="font-bold text-rose-400 flex items-center gap-1 font-mono">
                  <AlertTriangle className="w-3.5 h-3.5" /> Disadvantage
                </span>
                <p className="text-theme-text-muted">
                  Extra memory is required for the prev pointer on each node.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 6: Circular Linked List */}
      {/* ========================================================================= */}
      <div id="ll-topic-6" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(6)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="linked-lists" subtopicId={6} title="Circular Linked List" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              6
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">6. Circular Linked List</h3>
              <p className="text-xs text-theme-text-muted font-mono">No NULL termination: last node connects back to head</p>
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
                A Circular Linked List is a linked list in which the last node points back to the first node instead of pointing to nullptr.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2 font-mono text-xs">
                Example: 10 → 20 → 30 → back to 10
              </p>
              <p className="text-theme-text-muted leading-relaxed">
                Since there is no nullptr at the end, a normal loop that waits for <code className="text-teal-300 font-mono">temp == nullptr</code> would never stop.
              </p>
            </div>

            {/* CIRCULAR DIAGRAM */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-teal-300 border-b border-slate-800/80 pb-2">
                Visual Diagram: Circular Ring Loop
              </div>

              <div className="py-4 flex flex-col items-center justify-center space-y-2">
                <div className="flex items-center justify-center gap-4 sm:gap-6">
                  <div className="px-4 py-2.5 rounded-xl border-2 border-teal-400 bg-teal-950/70 text-teal-200 font-mono font-bold text-sm shadow-md">
                    head (10)
                  </div>
                  <ArrowRight className="w-5 h-5 text-teal-400" />
                  <div className="px-4 py-2.5 rounded-xl border-2 border-teal-400 bg-slate-900 text-white font-mono font-bold text-sm shadow-md">
                    second (20)
                  </div>
                  <ArrowRight className="w-5 h-5 text-teal-400" />
                  <div className="px-4 py-2.5 rounded-xl border-2 border-teal-400 bg-slate-900 text-white font-mono font-bold text-sm shadow-md">
                    third (30)
                  </div>
                </div>

                {/* Curved return path */}
                <div className="w-full max-w-md flex items-center justify-between text-xs font-mono text-amber-400 px-4 pt-1">
                  <span className="flex items-center gap-1">
                    <Repeat className="w-3.5 h-3.5" /> 30-&gt;next loops back to head (10)
                  </span>
                  <span className="text-[10px] text-slate-400">do-while stops when temp == head</span>
                </div>
              </div>
            </div>

            <CodeBox
              title="C++ code"
              code={`struct Node {
    int data;
    Node* next;
};

Node* head = new Node{10, nullptr};
Node* second = new Node{20, nullptr};
Node* third = new Node{30, nullptr};

head->next = second;
second->next = third;
third->next = head;

// Traversal
Node* temp = head;

if (head != nullptr) {
    do {
        cout << temp->data << " ";
        temp = temp->next;
    } while (temp != head);
}`}
            />

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
              <span className="text-teal-400 font-semibold block">Output:</span>
              <pre className="text-emerald-400 font-bold">10 20 30</pre>
            </div>

            <p className="text-xs text-theme-text-muted leading-relaxed">
              The do-while loop prints the first node before checking whether we have returned to head.
            </p>

            <div className="p-3.5 rounded-xl bg-theme-surface-elevated border border-theme-border space-y-1 text-xs">
              <span className="font-bold text-teal-400 block font-mono">
                Applications:
              </span>
              <p className="text-theme-text-muted">
                Round-robin scheduling, circular turn systems, and repeated playlists.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 7: Reverse a Linked List */}
      {/* ========================================================================= */}
      <div id="ll-topic-7" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(7)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="linked-lists" subtopicId={7} title="Reverse a Linked List" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              7
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">7. Reverse a Linked List</h3>
              <p className="text-xs text-theme-text-muted font-mono">In-place link reversal using 3 pointers: prev, current, nextNode</p>
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
              <p className="text-theme-text-muted leading-relaxed mb-1">
                Reversing a linked list means changing its links so that the last node becomes the first node and the first becomes the last.
              </p>
              <p className="text-xs font-mono text-teal-300">
                For example: 10 → 20 → 30 → nullptr becomes 30 → 20 → 10 → nullptr.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                We use three pointers:
              </p>
              <ul className="space-y-1 text-xs text-theme-text-muted list-disc list-inside">
                <li><strong className="text-theme-text">prev:</strong> The previous node.</li>
                <li><strong className="text-theme-text">current:</strong> The node being processed.</li>
                <li><strong className="text-theme-text">nextNode:</strong> Saves the next node before the link changes.</li>
              </ul>
            </div>

            {/* INTERACTIVE 3-POINTER REVERSAL STEPPER */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-xs font-mono font-bold text-teal-300">
                  Interactive Diagram: In-Place Link Reversal ({reverseStep + 1}/4)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setReverseStep(prev => (prev + 1) % 4)}
                    className="px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-500 text-white text-xs font-mono font-bold cursor-pointer"
                  >
                    Next Step
                  </button>
                  <button
                    onClick={() => setReverseStep(0)}
                    className="p-1 rounded border border-slate-700 text-slate-400 hover:text-white"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Visual depiction per step */}
              <div className="py-4 flex items-center justify-center overflow-x-auto min-w-max">
                {reverseStep === 0 && (
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-slate-500">prev=null</span>
                    <span className="text-teal-400">|</span>
                    <span className="px-3 py-2 rounded bg-amber-950 border border-amber-400 text-amber-200 font-bold">curr: 10</span>
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                    <span className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white">next: 20</span>
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                    <span className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white">30</span>
                  </div>
                )}
                {reverseStep === 1 && (
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-rose-400">nullptr</span>
                    <ArrowLeft className="w-4 h-4 text-emerald-400" />
                    <span className="px-3 py-2 rounded bg-emerald-950 border border-emerald-400 text-emerald-200 font-bold">prev: 10</span>
                    <span className="text-teal-400">|</span>
                    <span className="px-3 py-2 rounded bg-amber-950 border border-amber-400 text-amber-200 font-bold">curr: 20</span>
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                    <span className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white">next: 30</span>
                  </div>
                )}
                {reverseStep === 2 && (
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-rose-400">null</span>
                    <ArrowLeft className="w-4 h-4 text-emerald-400" />
                    <span className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white">10</span>
                    <ArrowLeft className="w-4 h-4 text-emerald-400" />
                    <span className="px-3 py-2 rounded bg-emerald-950 border border-emerald-400 text-emerald-200 font-bold">prev: 20</span>
                    <span className="text-teal-400">|</span>
                    <span className="px-3 py-2 rounded bg-amber-950 border border-amber-400 text-amber-200 font-bold">curr: 30</span>
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                    <span className="text-slate-500">next: null</span>
                  </div>
                )}
                {reverseStep === 3 && (
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-emerald-400 font-bold">new head (prev) →</span>
                    <span className="px-3 py-2 rounded bg-emerald-950 border-2 border-emerald-400 text-emerald-200 font-bold ring-2 ring-emerald-400/40">30</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                    <span className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white">20</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                    <span className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white">10</span>
                    <ArrowRight className="w-4 h-4 text-rose-400" />
                    <span className="text-rose-400">nullptr</span>
                  </div>
                )}
              </div>

              <div className="text-xs font-mono text-slate-300 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                {reverseStep === 0 && 'Step 0: prev = nullptr, current = head (10). nextNode = current->next (20). Ready to reverse link.'}
                {reverseStep === 1 && 'Step 1: 10->next points backward to prev (nullptr). Advance prev = 10, current = 20.'}
                {reverseStep === 2 && 'Step 2: 20->next points backward to prev (10). Advance prev = 20, current = 30.'}
                {reverseStep === 3 && 'Step 3: 30->next points backward to 20. current becomes nullptr. Loop ends. prev (30) is the new head!'}
              </div>
            </div>

            <CodeBox
              title="C++ code"
              code={`Node* reverseList(Node* head) {
    Node* prev = nullptr;
    Node* current = head;

    while (current != nullptr) {
        Node* nextNode = current->next;
        current->next = prev;

        prev = current;
        current = nextNode;
    }

    return prev;
}`}
            />

            <div className="space-y-1 text-xs text-theme-text-muted">
              <span className="font-bold text-theme-text block">How it works:</span>
              <ol className="list-decimal list-inside space-y-1">
                <li>Save the next node so it is not lost.</li>
                <li>Reverse the current node's link.</li>
                <li>Move prev and current forward.</li>
                <li>When the loop ends, prev points to the new head.</li>
              </ol>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
              <span>Time complexity: <strong className="text-emerald-400">O(n)</strong></span>
              <span>·</span>
              <span>Auxiliary space: <strong className="text-emerald-400">O(1)</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 8: Find the Middle Node */}
      {/* ========================================================================= */}
      <div id="ll-topic-8" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(8)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="linked-lists" subtopicId={8} title="Find the Middle Node" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              8
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">8. Find the Middle Node</h3>
              <p className="text-xs text-theme-text-muted font-mono">Tortoise & Hare: slow moves 1 step, fast moves 2 steps</p>
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
                Finding the middle node means identifying the central node of a linked list.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory: Slow and fast pointers
              </h4>
              <ul className="space-y-1 text-xs text-theme-text-muted list-disc list-inside mb-2">
                <li><strong className="text-theme-text">slow</strong> moves one node at a time.</li>
                <li><strong className="text-theme-text">fast</strong> moves two nodes at a time.</li>
              </ul>
              <p className="text-theme-text-muted leading-relaxed text-xs">
                When fast reaches the end, slow is at the middle. If the list has an even number of nodes, the code below returns the second middle node.
              </p>
            </div>

            {/* DIAGRAM: SLOW & FAST POINTER SIMULATION */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-xs font-mono font-bold text-teal-300">
                  Visual Diagram: Slow (1x) &amp; Fast (2x) Pointers on [10 → 20 → 30 → 40 → 50]
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMiddleStep(prev => (prev + 1) % 3)}
                    className="px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-500 text-white text-xs font-mono font-bold cursor-pointer"
                  >
                    Advance ({middleStep + 1}/3)
                  </button>
                  <button
                    onClick={() => setMiddleStep(0)}
                    className="p-1 rounded border border-slate-700 text-slate-400 hover:text-white"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Node layout */}
              <div className="py-4 flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto min-w-max">
                {[10, 20, 30, 40, 50].map((val, idx) => {
                  const slowIdx = middleStep; // 0, 1, 2
                  const fastIdx = middleStep * 2; // 0, 2, 4
                  const isSlow = idx === slowIdx;
                  const isFast = idx === fastIdx;
                  const isFinalMiddle = middleStep === 2 && idx === 2;

                  return (
                    <React.Fragment key={val}>
                      <div className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center ${
                        isFinalMiddle
                          ? 'border-emerald-400 bg-emerald-950/70 ring-4 ring-emerald-400/40'
                          : isSlow || isFast
                          ? 'border-amber-400 bg-slate-900'
                          : 'border-slate-800 bg-slate-900/60'
                      }`}>
                        <span className="text-[10px] font-mono text-slate-400">Node</span>
                        <span className="font-mono text-base font-bold text-white px-1">{val}</span>
                        <div className="h-4 flex items-center gap-1 mt-1 font-mono text-[9px]">
                          {isSlow && <span className="px-1 rounded bg-teal-500 text-black font-bold">slow</span>}
                          {isFast && <span className="px-1 rounded bg-amber-500 text-black font-bold">fast</span>}
                        </div>
                      </div>
                      {idx < 4 && <ArrowRight className="w-3.5 h-3.5 text-slate-600" />}
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="text-xs font-mono text-slate-300 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                {middleStep === 0 && 'Step 0: slow starts at node 10; fast starts at node 10.'}
                {middleStep === 1 && 'Step 1: slow moves 1 step to 20; fast moves 2 steps to 30.'}
                {middleStep === 2 && 'Step 2: slow moves 1 step to 30; fast moves 2 steps to 50. Since fast->next is nullptr, loop ends! Middle node is 30.'}
              </div>
            </div>

            <CodeBox
              title="C++ code"
              code={`Node* findMiddle(Node* head) {
    Node* slow = head;
    Node* fast = head;

    while (fast != nullptr &&
           fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }

    return slow;
}`}
            />

            <div className="p-3.5 rounded-xl bg-theme-surface-elevated border border-theme-border font-mono text-xs">
              <span className="text-teal-400 font-bold block mb-1">Example:</span>
              <p className="text-theme-text-muted">
                10 → 20 → 30 → 40 → 50
              </p>
              <p className="text-emerald-400 font-bold mt-1">
                The middle node contains 30.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
              <span>Time complexity: <strong className="text-emerald-400">O(n)</strong></span>
              <span>·</span>
              <span>Auxiliary space: <strong className="text-emerald-400">O(1)</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 9: Detect and Find the Starting Point of a Cycle */}
      {/* ========================================================================= */}
      <div id="ll-topic-9" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(9)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="linked-lists" subtopicId={9} title="Detect and Find Starting Point of a Cycle" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              9
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">9. Detect and Find the Starting Point of a Cycle</h3>
              <p className="text-xs text-theme-text-muted font-mono">Floyd's Cycle-Finding Algorithm (Tortoise & Hare meeting and entry point)</p>
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
              <p className="text-theme-text-muted leading-relaxed mb-1">
                A cycle exists when a node points back to an earlier node, creating a loop in the linked list.
              </p>
              <p className="text-xs font-mono text-teal-300">
                Example: 10 → 20 → 30 → 40, where node 40 points back to node 20.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory: Floyd's Cycle Detection Algorithm
              </h4>
              <ul className="space-y-1 text-xs text-theme-text-muted list-disc list-inside mb-2">
                <li><strong className="text-theme-text">slow</strong> moves one step.</li>
                <li><strong className="text-theme-text">fast</strong> moves two steps.</li>
              </ul>
              <p className="text-theme-text-muted leading-relaxed text-xs">
                If they meet, a cycle exists. If fast reaches nullptr, there is no cycle.
              </p>
            </div>

            {/* DIAGRAM FOR CYCLE DETECTION & START */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-xs font-mono font-bold text-teal-300">
                  Visual Diagram: Cycle Structure 10 → [20 → 30 → 40 → (back to 20)]
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCycleTab('detect')}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold cursor-pointer ${
                      cycleTab === 'detect' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Phase A: Detect Cycle
                  </button>
                  <button
                    onClick={() => setCycleTab('start')}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold cursor-pointer ${
                      cycleTab === 'start' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Phase B: Find Cycle Start
                  </button>
                </div>
              </div>

              {/* Graphical representation of the loop */}
              <div className="py-4 flex flex-col items-center justify-center space-y-3">
                <div className="flex items-center gap-3 font-mono text-xs">
                  <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300">
                    head (10)
                  </div>
                  <ArrowRight className="w-4 h-4 text-teal-400" />
                  <div className="px-3 py-2 rounded-xl bg-amber-950/70 border-2 border-amber-400 text-amber-200 font-bold ring-2 ring-amber-400/30">
                    Cycle Start (20)
                  </div>
                  <ArrowRight className="w-4 h-4 text-teal-400" />
                  <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white">
                    30
                  </div>
                  <ArrowRight className="w-4 h-4 text-teal-400" />
                  <div className="px-3 py-2 rounded-xl bg-purple-950/70 border-2 border-purple-400 text-purple-200 font-bold">
                    40 (loops to 20)
                  </div>
                </div>

                <div className="text-xs font-mono text-amber-300 flex items-center gap-1.5 pt-1">
                  <Repeat className="w-3.5 h-3.5" />
                  <span>Node 40 connects back to Node 20 (Cycle length L = 3: [20, 30, 40])</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                {cycleTab === 'detect' ? (
                  <div>
                    <strong className="text-teal-400">Phase A Detection:</strong> Fast moves 2x as fast as Slow inside the cycle, closing the distance by 1 node per iteration. They are mathematically guaranteed to meet inside the loop!
                  </div>
                ) : (
                  <div>
                    <strong className="text-amber-400">Phase B Entry Point:</strong> Once slow and fast meet, reset slow to head (10) and keep fast at the meeting point. Move both at 1 step per iteration. They meet exactly at the cycle entrance (Node 20)!
                  </div>
                )}
              </div>
            </div>

            {/* Sub-block A */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400">
                A. Detect a cycle
              </h4>
              <CodeBox
                title="C++ function: hasCycle"
                code={`bool hasCycle(Node* head) {
    Node* slow = head;
    Node* fast = head;

    while (fast != nullptr &&
           fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;

        if (slow == fast)
            return true;
    }

    return false;
}`}
              />
            </div>

            {/* Sub-block B */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400">
                B. Find the starting node of the cycle
              </h4>
              <CodeBox
                title="C++ function: cycleStart"
                code={`Node* cycleStart(Node* head) {
    Node* slow = head;
    Node* fast = head;

    while (fast != nullptr &&
           fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;

        if (slow == fast) {
            slow = head;

            while (slow != fast) {
                slow = slow->next;
                fast = fast->next;
            }

            return slow;
        }
    }

    return nullptr;
}`}
              />
            </div>

            <p className="text-xs text-theme-text-muted leading-relaxed">
              After the pointers meet, reset slow to head. Move both pointers one step at a time. Their next meeting point is the cycle's starting node.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
              <span>Time complexity: <strong className="text-emerald-400">O(n)</strong></span>
              <span>·</span>
              <span>Auxiliary space: <strong className="text-emerald-400">O(1)</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 10: Merge Two Sorted Linked Lists */}
      {/* ========================================================================= */}
      <div id="ll-topic-10" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(10)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="linked-lists" subtopicId={10} title="Merge Two Sorted Linked Lists" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              10
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">10. Merge Two Sorted Linked Lists</h3>
              <p className="text-xs text-theme-text-muted font-mono">Dummy head node & tail splicing: List1 + List2 → single sorted list</p>
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
                Merging two sorted linked lists means combining them into one sorted linked list.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2">
                Suppose we have:
              </p>
              <ul className="space-y-1 text-xs text-theme-text-muted list-disc list-inside mb-2">
                <li><strong className="text-theme-text">List 1:</strong> 10 → 30 → 50</li>
                <li><strong className="text-theme-text">List 2:</strong> 20 → 40 → 60</li>
              </ul>
              <p className="text-theme-text-muted leading-relaxed text-xs">
                We compare the first available nodes, select the smaller one, and continue until both lists are merged.
              </p>
              <p className="text-xs font-mono text-emerald-400 font-bold mt-1">
                Result: 10 → 20 → 30 → 40 → 50 → 60
              </p>
            </div>

            {/* DIAGRAM: MERGING LISTS */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-xs font-mono font-bold text-teal-300 border-b border-slate-800/80 pb-2">
                Visual Comparison Diagram: Tail pointer stitching smaller elements
              </div>

              <div className="space-y-2 py-2">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="w-16 text-teal-400 shrink-0 font-bold">List 1:</span>
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-teal-500/40 text-teal-200 font-bold">10</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-teal-500/40 text-teal-200 font-bold">30</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-teal-500/40 text-teal-200 font-bold">50</span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="w-16 text-blue-400 shrink-0 font-bold">List 2:</span>
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-blue-500/40 text-blue-200 font-bold">20</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-blue-500/40 text-blue-200 font-bold">40</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-blue-500/40 text-blue-200 font-bold">60</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center gap-2 overflow-x-auto">
                  <span className="w-16 text-emerald-400 shrink-0 font-bold">Merged:</span>
                  <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-400 text-[10px]">dummy</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="px-2 py-1 rounded bg-teal-950 border border-teal-500 text-teal-200">10</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="px-2 py-1 rounded bg-blue-950 border border-blue-500 text-blue-200">20</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="px-2 py-1 rounded bg-teal-950 border border-teal-500 text-teal-200">30</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="px-2 py-1 rounded bg-blue-950 border border-blue-500 text-blue-200">40</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="px-2 py-1 rounded bg-teal-950 border border-teal-500 text-teal-200">50</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="px-2 py-1 rounded bg-blue-950 border border-blue-500 text-blue-200">60</span>
                </div>
              </div>
            </div>

            <CodeBox
              title="C++ code"
              code={`Node* mergeSorted(Node* list1, Node* list2) {
    Node dummy{0, nullptr};
    Node* tail = &dummy;

    while (list1 != nullptr &&
           list2 != nullptr) {
        if (list1->data <= list2->data) {
            tail->next = list1;
            list1 = list1->next;
        } else {
            tail->next = list2;
            list2 = list2->next;
        }

        tail = tail->next;
    }

    if (list1 != nullptr)
        tail->next = list1;
    else
        tail->next = list2;

    return dummy.next;
}`}
            />

            <div className="p-4 rounded-xl bg-theme-surface-elevated border border-theme-border space-y-2 text-xs">
              <span className="font-bold text-teal-400 font-mono block">Important concepts:</span>
              <ul className="space-y-1 text-theme-text-muted list-disc list-inside">
                <li><strong className="text-theme-text">dummy</strong> is a temporary starting node that simplifies merging.</li>
                <li><strong className="text-theme-text">tail</strong> tracks the last node of the merged list.</li>
                <li>The remaining nodes of either list can be attached directly because they are already sorted.</li>
                <li>This function reuses existing nodes; it does not create copies of them.</li>
              </ul>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
              <span>Time complexity: <strong className="text-emerald-400">O(n + m)</strong>, where n and m are lengths of the lists</span>
              <span>·</span>
              <span>Space: <strong className="text-emerald-400">O(1)</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 11: Remove Nth Node from End */}
      {/* ========================================================================= */}
      <div id="ll-topic-11" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(11)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="linked-lists" subtopicId={11} title="Remove Nth Node from End" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              11
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">11. Remove Nth Node from End</h3>
              <p className="text-xs text-theme-text-muted font-mono">Two-pointer technique with dummy node and (n + 1) offset</p>
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
                This problem asks us to delete the Nth node counted backward from the end of a linked list.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                <span className="text-slate-400 block">Example:</span>
                <p className="text-white">List: 10 → 20 → 30 → 40 → 50</p>
                <p className="text-amber-400">If n = 2, remove 40, because it is the second node from the end.</p>
                <p className="text-emerald-400 font-bold">Result: 10 → 20 → 30 → 50</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory: Two-pointer technique
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2 text-xs">
                We use fast and slow pointers with a dummy node.
              </p>
              <ol className="list-decimal list-inside space-y-1 text-xs text-theme-text-muted">
                <li>Move fast forward by n + 1 positions from the dummy node.</li>
                <li>Move both pointers together until fast reaches nullptr.</li>
                <li>slow-&gt;next is the node to remove.</li>
                <li>Bypass that node and delete it.</li>
              </ol>
            </div>

            {/* DIAGRAM: REMOVE NTH STEPPER */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-xs font-mono font-bold text-teal-300">
                  Visual Diagram: Sliding Window of Length (n + 1 = 3)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setNthStep(prev => (prev + 1) % 3)}
                    className="px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-500 text-white text-xs font-mono font-bold cursor-pointer"
                  >
                    Next ({nthStep + 1}/3)
                  </button>
                  <button
                    onClick={() => setNthStep(0)}
                    className="p-1 rounded border border-slate-700 text-slate-400 hover:text-white"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="py-4 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto min-w-max">
                {/* Dummy */}
                <div className={`p-2.5 rounded-lg border flex flex-col items-center ${
                  nthStep === 0 ? 'border-amber-400 bg-amber-950/40 text-amber-200' : 'border-slate-800 bg-slate-900 text-slate-500'
                }`}>
                  <span className="text-[9px]">dummy (0)</span>
                  {nthStep === 0 && <span className="text-[9px] text-teal-300 font-bold">slow &amp; fast</span>}
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-slate-600" />

                {/* 10 */}
                <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900 text-white flex flex-col items-center">
                  <span>10</span>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-slate-600" />

                {/* 20 */}
                <div className={`p-2.5 rounded-lg border flex flex-col items-center ${
                  nthStep === 1 ? 'border-amber-400 bg-amber-950/40 text-amber-200' : 'border-slate-800 bg-slate-900 text-white'
                }`}>
                  <span>20</span>
                  {nthStep === 1 && <span className="text-[9px] text-amber-400 font-bold">fast (n+1)</span>}
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-slate-600" />

                {/* 30 */}
                <div className={`p-2.5 rounded-lg border flex flex-col items-center ${
                  nthStep === 2 ? 'border-teal-400 bg-teal-950/70 text-teal-200' : 'border-slate-800 bg-slate-900 text-white'
                }`}>
                  <span>30</span>
                  {nthStep === 2 && <span className="text-[9px] text-teal-400 font-bold">slow</span>}
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-slate-600" />

                {/* 40 */}
                <div className={`p-2.5 rounded-lg border flex flex-col items-center ${
                  nthStep === 2 ? 'border-rose-500 bg-rose-950/60 text-rose-300 line-through' : 'border-slate-800 bg-slate-900 text-white'
                }`}>
                  <span>40</span>
                  {nthStep === 2 && <span className="text-[9px] text-rose-400 font-bold">toDelete</span>}
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-slate-600" />

                {/* 50 */}
                <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900 text-white flex flex-col items-center">
                  <span>50</span>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-slate-600" />

                {/* null */}
                <div className={`p-2.5 rounded-lg border text-[10px] flex flex-col items-center ${
                  nthStep === 2 ? 'border-amber-400 bg-amber-950/40 text-amber-200 font-bold' : 'border-slate-800 bg-slate-900 text-slate-500'
                }`}>
                  <span>nullptr</span>
                  {nthStep === 2 && <span className="text-[9px] text-amber-300 font-bold">fast</span>}
                </div>
              </div>

              <div className="text-xs font-mono text-slate-300 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                {nthStep === 0 && 'Step 0: Initialize dummy{0, head}. fast and slow start at dummy.'}
                {nthStep === 1 && 'Step 1: Move fast forward by n + 1 (3 steps). fast reaches node 20. A fixed gap of 2 nodes is established.'}
                {nthStep === 2 && 'Step 2: Advance both slow and fast together until fast == nullptr. slow lands on 30. slow->next is 40. Splicing 30->next to 50 deletes 40 cleanly!'}
              </div>
            </div>

            <CodeBox
              title="C++ code"
              code={`Node* removeNthFromEnd(Node* head, int n) {
    if (n <= 0)
        return head;

    Node dummy{0, head};
    Node* fast = &dummy;
    Node* slow = &dummy;

    for (int i = 0; i < n; i++) {
        fast = fast->next;

        if (fast == nullptr)
            return head; // n exceeds list length
    }

    fast = fast->next;

    while (fast != nullptr) {
        fast = fast->next;
        slow = slow->next;
    }

    Node* toDelete = slow->next;
    slow->next = toDelete->next;
    delete toDelete;

    return dummy.next;
}`}
            />

            <div className="p-4 rounded-xl bg-theme-surface-elevated border border-theme-border space-y-1.5 text-xs text-theme-text-muted">
              <span className="font-bold text-teal-400 font-mono block">Why use a dummy node?</span>
              <p>
                If the node to remove is the head itself, the dummy node lets us handle that case using the same pointer logic.
              </p>
              <p className="text-slate-400 text-[11px]">
                This implementation assumes n is a valid positive position not exceeding the list length; invalid positions leave the list unchanged.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
              <span>Time complexity: <strong className="text-emerald-400">O(n)</strong></span>
              <span>·</span>
              <span>Auxiliary space: <strong className="text-emerald-400">O(1)</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 12: Merge Sort on Linked Lists */}
      {/* ========================================================================= */}
      <div id="ll-topic-12" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(12)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="linked-lists" subtopicId={12} title="Merge Sort on Linked Lists" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              12
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">12. Merge Sort on Linked Lists</h3>
              <p className="text-xs text-theme-text-muted font-mono">Divide &amp; Conquer in O(n log n): split by middle, sort recursively, merge</p>
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
                Merge Sort is a sorting algorithm that repeatedly divides a list into smaller parts, sorts those parts, and merges them back in sorted order.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Theory
              </h4>
              <p className="text-theme-text-muted leading-relaxed mb-2 text-xs">
                Suppose the linked list is: <code className="text-teal-300 font-mono font-bold">40 → 10 → 30 → 20</code>
              </p>
              <div className="space-y-1 text-xs text-theme-text-muted">
                <span className="font-bold text-theme-text block">The process is:</span>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Divide the list into two halves.</li>
                  <li>Continue dividing until every part contains one node.</li>
                  <li>Merge the small lists in sorted order.</li>
                  <li>Continue merging until one completely sorted list remains.</li>
                </ol>
              </div>
            </div>

            {/* VISUAL DIAGRAM: DIVIDE AND CONQUER TREE */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="font-bold text-teal-300">
                  Visual Diagram: Divide &amp; Merge Tree
                </span>
                <span className="text-[11px] text-slate-400">Guaranteed O(n log n)</span>
              </div>

              {/* Tree depiction */}
              <div className="py-2 flex flex-col items-center space-y-3">
                {/* Level 0 */}
                <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold">
                  [ 40 → 10 → 30 → 20 ]
                </div>

                <div className="text-teal-400 text-xs">↓ split at middle via slow/fast ↓</div>

                {/* Level 1 */}
                <div className="flex items-center gap-6 sm:gap-12">
                  <div className="px-3 py-1.5 rounded-lg bg-teal-950/70 border border-teal-500/50 text-teal-200">
                    [ 40 → 10 ]
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-blue-950/70 border border-blue-500/50 text-blue-200">
                    [ 30 → 20 ]
                  </div>
                </div>

                <div className="text-slate-500 text-[11px]">↓ split to base case single nodes ↓</div>

                {/* Level 2 */}
                <div className="flex items-center gap-2 sm:gap-4 text-[11px]">
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700">[40]</span>
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700">[10]</span>
                  <span className="text-slate-600">|</span>
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700">[30]</span>
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700">[20]</span>
                </div>

                <div className="text-emerald-400 text-xs">↑ mergeSorted(left, right) ↑</div>

                {/* Level 3 Merge */}
                <div className="flex items-center gap-6 sm:gap-12">
                  <div className="px-3 py-1.5 rounded-lg bg-teal-950 border border-teal-400 text-teal-200 font-bold">
                    [ 10 → 40 ]
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-blue-950 border border-blue-400 text-blue-200 font-bold">
                    [ 20 → 30 ]
                  </div>
                </div>

                <div className="text-emerald-400 text-xs">↑ final mergeSorted ↑</div>

                {/* Level 4 Final */}
                <div className="px-5 py-2.5 rounded-xl bg-emerald-950 border-2 border-emerald-400 text-emerald-200 font-bold text-sm shadow-lg ring-2 ring-emerald-400/30">
                  [ 10 → 20 → 30 → 40 ]
                </div>
              </div>
            </div>

            <p className="text-xs text-theme-text-muted leading-relaxed">
              This algorithm uses the <code className="text-teal-300 font-mono">findMiddle()</code> and <code className="text-teal-300 font-mono">mergeSorted()</code> functions explained earlier.
            </p>

            <CodeBox
              title="C++ code"
              code={`Node* mergeSort(Node* head) {
    // Empty list or a single node is already sorted
    if (head == nullptr || head->next == nullptr)
        return head;

    // Find the middle of the list
    Node* slow = head;
    Node* fast = head->next;

    while (fast != nullptr &&
           fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }

    // Split the list into two halves
    Node* secondHalf = slow->next;
    slow->next = nullptr;

    // Sort both halves
    Node* left = mergeSort(head);
    Node* right = mergeSort(secondHalf);

    // Merge the sorted halves
    return mergeSorted(left, right);
}`}
            />

            <p className="text-xs text-theme-text-muted leading-relaxed">
              The function uses the same Node structure and mergeSorted() function from Topic 10.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
              <span>Time complexity: <strong className="text-emerald-400">O(n log n)</strong></span>
              <span>·</span>
              <span>Auxiliary space: <strong className="text-emerald-400">O(log n)</strong> for recursion stack (reuses existing nodes!)</span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 13: Quick Revision (WITH COMPREHENSIVE TABLES) */}
      {/* ========================================================================= */}
      <div id="ll-topic-13" className="rounded-2xl border-2 border-teal-500/40 bg-theme-card overflow-hidden shadow-xl transition-all">
        <button
          type="button"
          onClick={() => toggleCard(13)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-gradient-to-r from-teal-950/40 via-theme-surface-elevated to-emerald-950/40 hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="linked-lists" subtopicId={13} title="Quick Revision" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              <TableIcon className="w-4 h-4 text-teal-400" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text flex items-center gap-2">
                <span>Quick Revision</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 font-semibold">
                  Cheat Sheet &amp; Tables
                </span>
              </h3>
              <p className="text-xs text-theme-text-muted font-mono">Master reference tables: concepts, time &amp; space complexities, and pointer rules</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[13] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[13] && (
          <div className="p-5 sm:p-6 space-y-6 text-sm text-theme-text">
            {/* Table 1: Quick revision table from prompt */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick Revision Table</span>
              </h4>
              <p className="text-xs text-theme-text-muted mb-3">
                Core mental model and primary keywords to remember for each topic:
              </p>

              <div className="overflow-x-auto rounded-xl border border-theme-border shadow-md">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-teal-300 font-mono border-b border-slate-800">
                      <th className="p-3 w-1/3">Topic</th>
                      <th className="p-3">Main concept to remember</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-theme-border bg-theme-card/60">
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Nodes and pointers</td>
                      <td className="p-3 font-mono text-teal-400">data, next, head</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Singly linked list</td>
                      <td className="p-3 font-mono text-teal-400">One pointer per node</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Traversal and searching</td>
                      <td className="p-3 font-mono text-teal-400">Move using temp = temp-&gt;next</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Insertion and deletion</td>
                      <td className="p-3 font-mono text-teal-400">Update links safely</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Doubly linked list</td>
                      <td className="p-3 font-mono text-teal-400">prev and next</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Circular linked list</td>
                      <td className="p-3 font-mono text-teal-400">Last node connects to first</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Reverse a list</td>
                      <td className="p-3 font-mono text-teal-400">prev, current, nextNode</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Find middle</td>
                      <td className="p-3 font-mono text-teal-400">Slow and fast pointers</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Cycle detection</td>
                      <td className="p-3 font-mono text-teal-400">Floyd's algorithm</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Merge sorted lists</td>
                      <td className="p-3 font-mono text-teal-400">Compare and connect smaller nodes</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Remove Nth from end</td>
                      <td className="p-3 font-mono text-teal-400">Two pointers and dummy node</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Merge sort</td>
                      <td className="p-3 font-mono text-teal-400">Divide, recursively sort, merge</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: Operations Time & Space Complexity Matrix */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Operations Complexity Matrix</span>
              </h4>
              <div className="overflow-x-auto rounded-xl border border-theme-border shadow-md">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-teal-300 font-mono border-b border-slate-800">
                      <th className="p-3">Operation / Algorithm</th>
                      <th className="p-3">Time Complexity</th>
                      <th className="p-3">Auxiliary Space</th>
                      <th className="p-3">Key Invariant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-theme-border bg-theme-card/60 font-mono">
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text font-sans">Insert at Beginning</td>
                      <td className="p-3 text-emerald-400 font-bold">O(1)</td>
                      <td className="p-3 text-emerald-400">O(1)</td>
                      <td className="p-3 text-theme-text-muted font-sans text-[11px]">Pass head by reference (Node*&amp; head)</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text font-sans">Insert at End</td>
                      <td className="p-3 text-amber-400 font-bold">O(n)</td>
                      <td className="p-3 text-emerald-400">O(1)</td>
                      <td className="p-3 text-theme-text-muted font-sans text-[11px]">Traverse while temp-&gt;next != nullptr</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text font-sans">Delete First Node</td>
                      <td className="p-3 text-emerald-400 font-bold">O(1)</td>
                      <td className="p-3 text-emerald-400">O(1)</td>
                      <td className="p-3 text-theme-text-muted font-sans text-[11px]">Cache temp before head = head-&gt;next</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text font-sans">Search for Element</td>
                      <td className="p-3 text-amber-400 font-bold">O(n)</td>
                      <td className="p-3 text-emerald-400">O(1)</td>
                      <td className="p-3 text-theme-text-muted font-sans text-[11px]">Linear scan with immediate break</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text font-sans">Reverse List</td>
                      <td className="p-3 text-emerald-400 font-bold">O(n)</td>
                      <td className="p-3 text-emerald-400">O(1)</td>
                      <td className="p-3 text-theme-text-muted font-sans text-[11px]">Three pointers (prev, current, nextNode)</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text font-sans">Find Middle Node</td>
                      <td className="p-3 text-emerald-400 font-bold">O(n)</td>
                      <td className="p-3 text-emerald-400">O(1)</td>
                      <td className="p-3 text-theme-text-muted font-sans text-[11px]">Slow (1 step) + Fast (2 steps)</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text font-sans">Cycle Detection &amp; Start</td>
                      <td className="p-3 text-emerald-400 font-bold">O(n)</td>
                      <td className="p-3 text-emerald-400">O(1)</td>
                      <td className="p-3 text-theme-text-muted font-sans text-[11px]">Floyd's algorithm; reset slow to head</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text font-sans">Merge Two Sorted Lists</td>
                      <td className="p-3 text-emerald-400 font-bold">O(n + m)</td>
                      <td className="p-3 text-emerald-400">O(1)</td>
                      <td className="p-3 text-theme-text-muted font-sans text-[11px]">Dummy head node + tail tracking</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text font-sans">Remove Nth from End</td>
                      <td className="p-3 text-emerald-400 font-bold">O(n)</td>
                      <td className="p-3 text-emerald-400">O(1)</td>
                      <td className="p-3 text-theme-text-muted font-sans text-[11px]">Two pointers spaced n + 1 apart</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text font-sans">Merge Sort</td>
                      <td className="p-3 text-teal-400 font-bold">O(n log n)</td>
                      <td className="p-3 text-teal-400">O(log n)</td>
                      <td className="p-3 text-theme-text-muted font-sans text-[11px]">Recursion stack; reuses existing node pointers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 3: Singly vs Doubly vs Circular Comparison */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Singly vs. Doubly vs. Circular Comparison</span>
              </h4>
              <div className="overflow-x-auto rounded-xl border border-theme-border shadow-md">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-teal-300 font-mono border-b border-slate-800">
                      <th className="p-3">Feature</th>
                      <th className="p-3">Singly Linked List</th>
                      <th className="p-3">Doubly Linked List</th>
                      <th className="p-3">Circular Linked List</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-theme-border bg-theme-card/60">
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Pointers per node</td>
                      <td className="p-3 font-mono text-teal-400">1 (next)</td>
                      <td className="p-3 font-mono text-amber-400">2 (prev, next)</td>
                      <td className="p-3 font-mono text-teal-400">1 (next)</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Memory per node</td>
                      <td className="p-3 text-emerald-400">Minimal</td>
                      <td className="p-3 text-rose-400">Higher (extra prev pointer)</td>
                      <td className="p-3 text-emerald-400">Minimal</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Traversal direction</td>
                      <td className="p-3">Forward only</td>
                      <td className="p-3 font-bold text-teal-300">Forward and backward</td>
                      <td className="p-3">Forward (endless cycle)</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">End Condition</td>
                      <td className="p-3 font-mono text-rose-400">temp == nullptr</td>
                      <td className="p-3 font-mono text-rose-400">temp == nullptr</td>
                      <td className="p-3 font-mono text-amber-400">temp == head</td>
                    </tr>
                    <tr className="hover:bg-theme-surface-hover transition-colors">
                      <td className="p-3 font-semibold text-theme-text">Ideal Use Cases</td>
                      <td className="p-3 text-theme-text-muted">Dynamic stacks, queues, hash chaining</td>
                      <td className="p-3 text-theme-text-muted">Browser history, LRU Cache, text editors</td>
                      <td className="p-3 text-theme-text-muted">Round-robin CPU, cyclic playlists, turn games</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pointer Golden Rules */}
            <div className="p-4 rounded-xl bg-theme-surface-elevated border border-theme-border space-y-3">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block">
                Top 5 Golden Rules for Linked List Interview Problems
              </span>
              <ul className="space-y-2 text-xs text-theme-text-muted">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400 mt-0.5 shrink-0" />
                  <span><strong>Always Use a Dummy Node:</strong> When operations can delete or modify the head node (like remove Nth or merge lists), a dummy head eliminates tricky null-pointer edge cases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400 mt-0.5 shrink-0" />
                  <span><strong>Cache Before Modifying:</strong> Never overwrite <code className="text-teal-300 font-mono">curr-&gt;next</code> before saving it to a temporary pointer (<code className="text-teal-300 font-mono">Node* nextNode = curr-&gt;next</code>).</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400 mt-0.5 shrink-0" />
                  <span><strong>Guarded Fast Pointer Dereferences:</strong> When moving two steps (<code className="text-teal-300 font-mono">fast-&gt;next-&gt;next</code>), always check <code className="text-teal-300 font-mono">while (fast != nullptr &amp;&amp; fast-&gt;next != nullptr)</code> to prevent segmentation fault crashes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400 mt-0.5 shrink-0" />
                  <span><strong>Prevent Memory Leaks:</strong> In C++, whenever deleting a node, release its memory with <code className="text-rose-400 font-mono">delete temp</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400 mt-0.5 shrink-0" />
                  <span><strong>Pass Head by Reference:</strong> If a function modifies the head pointer itself, pass it as <code className="text-teal-300 font-mono">Node*&amp; head</code> or return the new head pointer.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
