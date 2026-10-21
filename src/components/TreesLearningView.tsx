import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  ChevronDown, 
  ArrowRight, 
  AlertTriangle 
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

export const TreesLearningView: React.FC = () => {
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
    14: true,
    15: true,
    16: true,
    17: true,
    18: true,
    19: true,
    20: true,
  });

  const toggleCard = (id: number) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    for (let i = 1; i <= 20; i++) all[i] = true;
    setExpandedCards(all);
  };

  const collapseAll = () => {
    const none: Record<number, boolean> = {};
    for (let i = 1; i <= 20; i++) none[i] = false;
    setExpandedCards(none);
  };

  // Interactive traversal state for Topic 5, 6, 7, 8
  const [activeTraversalTab, setActiveTraversalTab] = useState<'pre' | 'in' | 'post' | 'level'>('pre');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Dynamic Subtopic Checklist Progress Header */}
      <TopicProgressHeader topicId="trees" topicTitle="Trees & Binary Search Trees" />

      {/* Chapter Banner & Intro */}
      <div className="p-6 sm:p-8 rounded-3xl bg-theme-card border border-teal-500/25 glass-panel shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme-border pb-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 mb-1 flex items-center gap-1.5">
              <span>Chapter 08</span>
              <span>·</span>
              <span>Hierarchical Data Structures</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-text tracking-tight flex items-center gap-2">
              <span>8. Trees &amp; Binary Search Trees</span>
              <span className="text-xs font-mono text-teal-400 bg-teal-500/10 border border-teal-500/30 px-2.5 py-0.5 rounded-full">
                19 Essential Topics
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
            Trees are one of the most important data structures in DSA. They are used in searching, sorting, databases, file systems, hierarchical data, and priority queues.
          </p>
          <p>
            Explore all 19 topics with crystal-clear definitions, architectural diagrams, visual dry-runs, and battle-tested C++ implementations.
          </p>
        </div>

        {/* Quick Topics Jump Strip */}
        <div className="pt-2 flex flex-wrap gap-1.5 sm:gap-2">
          {[
            '1. Terminology',
            '2. Binary Trees',
            '3. Types of BT',
            '4. Representation',
            '5. Preorder',
            '6. Inorder',
            '7. Postorder',
            '8. Level-Order (BFS)',
            '9. Height & Depth',
            '10. Diameter',
            '11. Balanced Trees',
            '12. LCA',
            '13. Boundary',
            '14. Top & Bottom View',
            '15. BST Concept',
            '16. Search/Insert/Delete',
            '17. Validate BST',
            '18. Kth Element',
            '19. Heaps & PQ',
            'Quick Revise'
          ].map((topicLabel, idx) => (
            <a
              key={idx}
              href={`#tree-topic-${idx + 1}`}
              className="px-2.5 py-1 rounded-lg bg-theme-surface-elevated border border-theme-border hover:border-teal-500/50 hover:text-teal-400 text-theme-text-muted text-xs font-mono transition-all"
            >
              {topicLabel}
            </a>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: Introduction to Trees and Terminology */}
      {/* ========================================================================= */}
      <div id="tree-topic-1" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(1)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={1} title="Introduction to Trees and Terminology" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              01
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">1. Introduction to Trees and Terminology</h3>
              <p className="text-xs text-theme-text-muted font-mono">Non-linear hierarchical structure · Nodes, edges, root, leaves, depth &amp; height</p>
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
                A <strong className="text-theme-text">tree</strong> is a non-linear data structure made up of nodes connected by edges. It represents hierarchical relationships.
              </p>
              <p className="text-xs text-theme-text-muted mt-1.5">
                For example, a family hierarchy, an organizational chart, or a computer's folder structure is modeled as a tree.
              </p>
            </div>

            {/* VISUAL TREE DIAGRAM */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-xs font-mono font-bold text-teal-300 border-b border-slate-800 pb-2">
                Hierarchical Tree Model Diagram
              </div>

              <div className="py-4 flex flex-col items-center space-y-3">
                {/* Level 0: Root A */}
                <div className="flex flex-col items-center">
                  <div className="px-3.5 py-1.5 rounded-xl bg-teal-600 text-white font-bold border border-teal-300 shadow-md">
                    A (Root, Depth = 0)
                  </div>
                  <div className="w-40 h-4 border-t-2 border-teal-500/50 flex justify-between mt-1">
                    <div className="w-0.5 h-4 bg-teal-500/50"></div>
                    <div className="w-0.5 h-4 bg-teal-500/50"></div>
                  </div>
                </div>

                {/* Level 1: B & C */}
                <div className="flex justify-between w-64">
                  <div className="flex flex-col items-center">
                    <div className="px-3 py-1 rounded-lg bg-teal-800 text-teal-100 font-bold border border-teal-600">
                      B (Depth = 1)
                    </div>
                    <div className="w-24 h-4 border-t-2 border-teal-500/50 flex justify-between mt-1">
                      <div className="w-0.5 h-4 bg-teal-500/50"></div>
                      <div className="w-0.5 h-4 bg-teal-500/50"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="px-3 py-1 rounded-lg bg-teal-800 text-teal-100 font-bold border border-teal-600">
                      C (Depth = 1)
                    </div>
                    <div className="w-0.5 h-4 bg-teal-500/50 mt-1"></div>
                  </div>
                </div>

                {/* Level 2: D, E, F (Leaves) */}
                <div className="flex justify-between w-72 pt-1">
                  <div className="px-2.5 py-1 rounded bg-slate-900 border border-emerald-500/60 text-emerald-300 font-bold">
                    D (Leaf)
                  </div>
                  <div className="px-2.5 py-1 rounded bg-slate-900 border border-emerald-500/60 text-emerald-300 font-bold">
                    E (Leaf)
                  </div>
                  <div className="px-2.5 py-1 rounded bg-slate-900 border border-emerald-500/60 text-emerald-300 font-bold">
                    F (Leaf)
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-2">
                Important Terminology Cheatsheet
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-teal-400 block mb-0.5">Node:</strong>
                  <span className="text-slate-300">An individual data container, such as A, B, or C.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-teal-400 block mb-0.5">Root:</strong>
                  <span className="text-slate-300">The topmost origin node without parent (here A).</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-teal-400 block mb-0.5">Edge:</strong>
                  <span className="text-slate-300">The directional connection linking two nodes.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-teal-400 block mb-0.5">Leaf Node:</strong>
                  <span className="text-slate-300">A node with zero children (such as D, E, and F).</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-teal-400 block mb-0.5">Depth:</strong>
                  <span className="text-slate-300">Number of edges from root to the node (Root = 0).</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-teal-400 block mb-0.5">Height:</strong>
                  <span className="text-slate-300">Number of edges on longest downward path to a leaf.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: Binary Trees */}
      {/* ========================================================================= */}
      <div id="tree-topic-2" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(2)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={2} title="Binary Trees" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              02
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">2. Binary Trees</h3>
              <p className="text-xs text-theme-text-muted font-mono">At most two children · struct Node · Pointer traversal mechanics</p>
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
                A <strong className="text-theme-text">binary tree</strong> is a tree in which each node can have at most two children: a <strong className="text-teal-400">left child</strong> and a <strong className="text-teal-400">right child</strong>.
              </p>
            </div>

            {/* Tree example ASCII representation */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
              <span className="text-teal-400 font-bold block">Example Binary Tree:</span>
              <pre className="text-teal-200 leading-relaxed">{`       10
      /  \\
     20   30
    / \\
   40  50`}</pre>
              <p className="text-[11px] text-slate-400">
                Node 10 has two children (20, 30). Node 20 also has two children (40, 50). Nodes 30, 40, and 50 are leaves.
              </p>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Node Representation & Construction
              </h4>
              <CodeBox
                title="struct Node"
                code={`struct Node {
    int data;
    Node* left;
    Node* right;

    Node(int value) {
        data = value;
        left = nullptr;
        right = nullptr;
    }
};

// Creating the binary tree:
Node* root = new Node(10);
root->left = new Node(20);
root->right = new Node(30);

root->left->left = new Node(40);
root->left->right = new Node(50);`}
              />
            </div>

            <div className="p-3.5 rounded-xl bg-teal-950/20 border border-teal-500/30 text-xs text-teal-300 space-y-1 font-mono">
              <strong className="text-teal-400 block mb-1">Key Pointer Expressions to Understand:</strong>
              <div>• <code className="text-white">Node* root</code>: Stores the memory address of the node.</div>
              <div>• <code className="text-white">root-&gt;left</code>: Accesses the left child node.</div>
              <div>• <code className="text-white">root-&gt;right</code>: Accesses the right child node.</div>
              <div>• <code className="text-white">nullptr</code>: Indicates no child is connected there.</div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: Types of Binary Trees */}
      {/* ========================================================================= */}
      <div id="tree-topic-3" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(3)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={3} title="Types of Binary Trees" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              03
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">3. Types of Binary Trees</h3>
              <p className="text-xs text-theme-text-muted font-mono">Full, Complete, Perfect, Balanced &amp; Skewed variants</p>
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
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-2">
                The 5 Fundamental Binary Tree Types
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {/* 1. Full */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold font-mono text-teal-300 block">1. Full Binary Tree</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every node has either <strong>zero</strong> or <strong>exactly two</strong> children. No node has only one child.
                </p>
                <div className="p-2 rounded bg-slate-950 font-mono text-[10px] text-teal-200 text-center">
                  O (2 children) → Leaves have 0
                </div>
              </div>

              {/* 2. Complete */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold font-mono text-blue-300 block">2. Complete Binary Tree</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every level is completely full except possibly the last, and the last level is filled strictly from <strong>left to right</strong>.
                </p>
                <div className="p-2 rounded bg-slate-950 font-mono text-[10px] text-blue-200 text-center">
                  Crucial foundation for Heaps!
                </div>
              </div>

              {/* 3. Perfect */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold font-mono text-emerald-300 block">3. Perfect Binary Tree</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every internal node has exactly two children, and <strong>all leaves are at the exact same depth</strong>.
                </p>
                <div className="p-2 rounded bg-slate-950 font-mono text-[10px] text-emerald-200 text-center">
                  Total nodes = 2^(h+1) - 1
                </div>
              </div>

              {/* 4. Balanced */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold font-mono text-amber-300 block">4. Balanced Binary Tree</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The left and right subtree heights differ by <strong>at most one</strong> at every node (<code className="text-teal-300 font-mono">|hL - hR| ≤ 1</code>).
                </p>
                <div className="p-2 rounded bg-slate-950 font-mono text-[10px] text-amber-200 text-center">
                  Guarantees O(log n) height!
                </div>
              </div>

              {/* 5. Skewed */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold font-mono text-rose-300 block">5. Skewed Binary Tree</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Each node has only one child, so the tree degenerates into a linear linked list (<code className="text-rose-400 font-mono">O(n)</code> search time).
                </p>
                <div className="p-2 rounded bg-slate-950 font-mono text-[10px] text-rose-200 text-center">
                  Worst-case BST scenario
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300 flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Important distinction:</strong> A complete binary tree is not necessarily a perfect binary tree. A perfect tree requires every single level without exception to be 100% full.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: Tree Representation */}
      {/* ========================================================================= */}
      <div id="tree-topic-4" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(4)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={4} title="Tree Representation" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              04
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">4. Tree Representation</h3>
              <p className="text-xs text-theme-text-muted font-mono">Linked nodes vs Array indexing (2*i + 1, 2*i + 2)</p>
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
                A binary tree is commonly represented in memory using linked pointer nodes or consecutive array slots.
              </p>
            </div>

            {/* A. Linked */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-300">
                A. Linked Representation (Pointer-Based)
              </h4>
              <p className="text-xs text-theme-text-muted">
                Each node stores its value along with pointer addresses to its left and right children. Flexible and dynamically sized.
              </p>
              <CodeBox
                title="Linked Node Structure"
                code={`struct Node {
    int data;
    Node* left;
    Node* right;
};`}
              />
            </div>

            {/* B. Array representation */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-300">
                B. Array Representation (Index Arithmetic)
              </h4>
              <p className="text-xs text-theme-text-muted">
                For a binary tree stored in a zero-indexed array, if a node is located at index <code className="text-teal-300 font-mono">i</code>:
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-teal-200 space-y-1">
                <div>• Left child index: <strong className="text-white">2 * i + 1</strong></div>
                <div>• Right child index: <strong className="text-white">2 * i + 2</strong></div>
                <div>• Parent index: <strong className="text-white">(i - 1) / 2</strong> (for non-root nodes)</div>
              </div>

              {/* Visual Mapping */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                <span className="text-teal-400 font-bold block">Example Mapping:</span>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <pre className="text-teal-200 leading-relaxed">{`     10 (idx 0)
    /  \\
   20   30 (idx 1, 2)`}</pre>
                  <ArrowRight className="w-5 h-5 text-slate-600 hidden sm:block" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Array:</span>
                    <span className="p-2 rounded bg-slate-900 border border-teal-500/40 text-white font-bold">&#91;0&#93; 10</span>
                    <span className="p-2 rounded bg-slate-900 border border-teal-500/40 text-teal-200 font-bold">&#91;1&#93; 20</span>
                    <span className="p-2 rounded bg-slate-900 border border-teal-500/40 text-teal-200 font-bold">&#91;2&#93; 30</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  Array representation is optimal for complete binary trees and heaps because zero pointer memory is wasted!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 5, 6, 7, 8: Tree Traversals Suite (Preorder, Inorder, Postorder, Level-Order) */}
      {/* ========================================================================= */}
      <div id="tree-topic-5" className="rounded-2xl border-2 border-teal-500/40 bg-theme-card overflow-hidden shadow-lg transition-all">
        <button
          type="button"
          onClick={() => toggleCard(5)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-gradient-to-r from-teal-950/40 via-theme-surface-elevated to-emerald-950/40 hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={5} title="Tree Traversals Suite" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center font-mono font-bold text-xs">
              05-08
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-theme-text">5-8. Tree Traversals Suite</h3>
                <span className="text-[10px] font-mono text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded-full border border-teal-500/40 font-bold">
                  DFS &amp; BFS
                </span>
              </div>
              <p className="text-xs text-theme-text-muted font-mono">Preorder (NLR) · Inorder (LNR) · Postorder (LRN) · Level-Order BFS</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[5] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[5] && (
          <div className="p-5 sm:p-6 space-y-6 text-sm text-theme-text">
            {/* Reference Sample Tree */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <span className="text-teal-400 font-bold block">Reference Tree for Traversal Examples:</span>
              <pre className="text-teal-200 leading-relaxed">{`       1
      / \\
     2   3
    / \\
   4   5`}</pre>
            </div>

            {/* Traversal Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-theme-border pb-3">
              {[
                { id: 'pre', subId: 5, label: '5. Preorder (NLR)', order: '1 → 2 → 4 → 5 → 3' },
                { id: 'in', subId: 6, label: '6. Inorder (LNR)', order: '4 → 2 → 5 → 1 → 3' },
                { id: 'post', subId: 7, label: '7. Postorder (LRN)', order: '4 → 5 → 2 → 3 → 1' },
                { id: 'level', subId: 8, label: '8. Level-Order BFS', order: '1 → 2 → 3 → 4 → 5' },
              ].map((tab) => (
                <div
                  key={tab.id}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-xl border transition-all ${
                    activeTraversalTab === tab.id
                      ? 'bg-teal-950/40 border-teal-500/50'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <SubtopicCheckbox topicId="trees" subtopicId={tab.subId} title={tab.label} />
                  <button
                    type="button"
                    onClick={() => setActiveTraversalTab(tab.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                      activeTraversalTab === tab.id
                        ? 'bg-teal-600 text-white shadow-md shadow-teal-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                </div>
              ))}
            </div>

            {/* Tab 5: Preorder */}
            {activeTraversalTab === 'pre' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold font-mono uppercase text-teal-400">Root → Left → Right (NLR)</span>
                  <span className="px-2.5 py-1 rounded bg-teal-950 border border-teal-500/40 text-emerald-300 font-mono text-xs font-bold">
                    Output: 1 2 4 5 3
                  </span>
                </div>
                <p className="text-xs text-theme-text-muted leading-relaxed">
                  Visits the root first, recursively traverses the left subtree, and finally traverses the right subtree. Useful for cloning trees and generating prefix expressions.
                </p>
                <CodeBox
                  title="preorder(Node* root)"
                  code={`void preorder(Node* root) {
    if (root == nullptr) return;

    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}`}
                />
              </div>
            )}

            {/* Tab 6: Inorder */}
            {activeTraversalTab === 'in' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold font-mono uppercase text-teal-400">Left → Root → Right (LNR)</span>
                  <span className="px-2.5 py-1 rounded bg-teal-950 border border-teal-500/40 text-emerald-300 font-mono text-xs font-bold">
                    Output: 4 2 5 1 3
                  </span>
                </div>
                <p className="text-xs text-theme-text-muted leading-relaxed">
                  Visits the left subtree first, then visits the root node, and finally traverses the right subtree.
                </p>
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
                  <strong>BST Gold Standard Rule:</strong> Inorder traversal of a Binary Search Tree (BST) prints keys in strictly ascending sorted order!
                </div>
                <CodeBox
                  title="inorder(Node* root)"
                  code={`void inorder(Node* root) {
    if (root == nullptr) return;

    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}`}
                />
              </div>
            )}

            {/* Tab 7: Postorder */}
            {activeTraversalTab === 'post' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold font-mono uppercase text-teal-400">Left → Right → Root (LRN)</span>
                  <span className="px-2.5 py-1 rounded bg-teal-950 border border-teal-500/40 text-emerald-300 font-mono text-xs font-bold">
                    Output: 4 5 2 3 1
                  </span>
                </div>
                <p className="text-xs text-theme-text-muted leading-relaxed">
                  Visits left subtree, then right subtree, and finally the root. Essential for deleting trees (freeing children before destroying the parent) and calculating directory folder sizes.
                </p>
                <CodeBox
                  title="postorder(Node* root)"
                  code={`void postorder(Node* root) {
    if (root == nullptr) return;

    postorder(root->left);
    postorder(root->right);
    cout << root->data << " ";
}`}
                />
              </div>
            )}

            {/* Tab 8: Level-Order (BFS) */}
            {activeTraversalTab === 'level' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold font-mono uppercase text-teal-400">Breadth-First Search (Level by Level)</span>
                  <span className="px-2.5 py-1 rounded bg-teal-950 border border-teal-500/40 text-emerald-300 font-mono text-xs font-bold">
                    Output: 1 2 3 4 5
                  </span>
                </div>
                <p className="text-xs text-theme-text-muted leading-relaxed">
                  Uses an explicit FIFO Queue (<code className="text-teal-300 font-mono">std::queue&lt;Node*&gt;</code>) to process nodes level by level from left to right.
                </p>
                <CodeBox
                  title="levelOrder(Node* root) with std::queue"
                  code={`#include <queue>

void levelOrder(Node* root) {
    if (root == nullptr) return;

    queue<Node*> q;
    q.push(root);

    while (!q.empty()) {
        Node* current = q.front();
        q.pop();

        cout << current->data << " ";

        if (current->left != nullptr) {
            q.push(current->left);
        }

        if (current->right != nullptr) {
            q.push(current->right);
        }
    }
}`}
                />
                <div className="flex items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
                  <span>Time complexity: <strong className="text-emerald-400">O(n)</strong></span>
                  <span>·</span>
                  <span>Auxiliary space: <strong className="text-emerald-400">O(n)</strong> queue size</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 9: Height and Depth of a Tree */}
      {/* ========================================================================= */}
      <div id="tree-topic-9" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(9)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={9} title="Height and Depth of a Tree" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              09
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">9. Height and Depth of a Tree</h3>
              <p className="text-xs text-theme-text-muted font-mono">Recursive 1 + max(leftHeight, rightHeight) · O(n) Time, O(h) Space</p>
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
                Core Distinction
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                <strong className="text-white">Depth</strong> tells us how far a node is from the root. <strong className="text-white">Height</strong> tells us how far down the longest path from a node reaches a leaf.
              </p>
            </div>

            {/* Diagram */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <span className="text-teal-400 font-bold block">Height Example (Edges convention):</span>
              <pre className="text-teal-200 leading-relaxed">{`       10          Depth = 0
      /  \\
     20   30       Depth = 1
    /
   40              Depth = 2`}</pre>
              <p className="text-[11px] text-emerald-400 font-bold">
                The height of this tree is 2 (2 edges from root 10 down to leaf 40).
              </p>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: Calculate Height
              </h4>
              <CodeBox
                title="height(Node* root)"
                code={`#include <algorithm>
using namespace std;

int height(Node* root) {
    if (root == nullptr) return -1; // -1 for edge count (or 0 for node count)

    int leftHeight = height(root->left);
    int rightHeight = height(root->right);

    return 1 + max(leftHeight, rightHeight);
}`}
              />
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-teal-300 bg-theme-surface-elevated p-3 rounded-xl border border-theme-border">
              <span>Time complexity: <strong className="text-emerald-400">O(n)</strong></span>
              <span>·</span>
              <span>Auxiliary space: <strong className="text-emerald-400">O(h)</strong> recursion stack</span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 10: Diameter of a Binary Tree */}
      {/* ========================================================================= */}
      <div id="tree-topic-10" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(10)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={10} title="Diameter of a Binary Tree" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              10
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">10. Diameter of a Binary Tree</h3>
              <p className="text-xs text-theme-text-muted font-mono">Longest path between any two nodes · May or may not pass through root</p>
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
                The <strong className="text-theme-text">diameter</strong> is the maximum number of edges on a path between any two nodes in the tree. The path does not necessarily pass through the root!
              </p>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: Optimal Single-Pass Diameter
              </h4>
              <CodeBox
                title="diameter(Node* root)"
                code={`#include <algorithm>
using namespace std;

int diameterHelper(Node* root, int& diameter) {
    if (root == nullptr) return 0;

    int leftHeight = diameterHelper(root->left, diameter);
    int rightHeight = diameterHelper(root->right, diameter);

    // Update global diameter with path through current node
    diameter = max(diameter, leftHeight + rightHeight);

    return 1 + max(leftHeight, rightHeight);
}

int diameter(Node* root) {
    int result = 0;
    diameterHelper(root, result);
    return result;
}`}
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              For tree with nodes 1 → (2, 3), 2 → (4, 5): The longest path is <strong className="text-emerald-400">4 → 2 → 1 → 3</strong>, which contains <strong className="text-emerald-400">3 edges</strong>.
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 11: Balanced Binary Trees */}
      {/* ========================================================================= */}
      <div id="tree-topic-11" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(11)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={11} title="Balanced Binary Trees" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              11
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">11. Balanced Binary Trees</h3>
              <p className="text-xs text-theme-text-muted font-mono">Height balanced · abs(left - right) &lt;= 1 · Early exit with -1</p>
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
                A <strong className="text-theme-text">height-balanced binary tree</strong> has left and right subtree heights differing by at most one at every node.
              </p>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: Optimal O(n) Balance Check with -1 Shortcut
              </h4>
              <CodeBox
                title="isBalanced(Node* root)"
                code={`#include <algorithm>
#include <cstdlib>
using namespace std;

int checkHeight(Node* root) {
    if (root == nullptr) return 0;

    int left = checkHeight(root->left);
    if (left == -1) return -1; // Fast prune

    int right = checkHeight(root->right);
    if (right == -1) return -1; // Fast prune

    if (abs(left - right) > 1) return -1;

    return 1 + max(left, right);
}

bool isBalanced(Node* root) {
    return checkHeight(root) != -1;
}`}
              />
            </div>

            <div className="p-3.5 rounded-xl bg-teal-950/20 border border-teal-500/30 text-xs text-teal-300">
              <strong>Remember:</strong> A binary tree is not automatically a BST just because it is balanced. <strong className="text-white">Balance</strong> concerns subtree height; <strong className="text-white">BST</strong> concerns value ordering!
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 12: Lowest Common Ancestor (LCA) */}
      {/* ========================================================================= */}
      <div id="tree-topic-12" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(12)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={12} title="Lowest Common Ancestor (LCA)" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              12
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">12. Lowest Common Ancestor (LCA)</h3>
              <p className="text-xs text-theme-text-muted font-mono">Deepest shared ancestor of two nodes · O(n) DFS branching</p>
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
                The <strong className="text-theme-text">Lowest Common Ancestor (LCA)</strong> of two nodes is the deepest node in the tree that is an ancestor of both.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 mt-2 space-y-1">
                <div>For tree: 1 → (2, 3), 2 → (4, 5):</div>
                <div>• LCA of 4 and 5 is <strong className="text-emerald-400">2</strong></div>
                <div>• LCA of 4 and 3 is <strong className="text-emerald-400">1</strong></div>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: lowestCommonAncestor
              </h4>
              <CodeBox
                title="lowestCommonAncestor(root, p, q)"
                code={`Node* lowestCommonAncestor(Node* root, int p, int q) {
    if (root == nullptr) return nullptr;

    if (root->data == p || root->data == q) {
        return root;
    }

    Node* left = lowestCommonAncestor(root->left, p, q);
    Node* right = lowestCommonAncestor(root->right, p, q);

    if (left != nullptr && right != nullptr) {
        return root; // One on left, one on right -> current node is LCA!
    }

    return left != nullptr ? left : right;
}`}
              />
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 13: Boundary Traversal */}
      {/* ========================================================================= */}
      <div id="tree-topic-13" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(13)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={13} title="Boundary Traversal" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              13
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">13. Boundary Traversal</h3>
              <p className="text-xs text-theme-text-muted font-mono">Anti-clockwise perimeter · Root + Left boundary + Leaves + Reversed Right boundary</p>
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
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                4-Step Traversal Protocol
              </h4>
              <ol className="space-y-1 text-xs text-theme-text-muted list-decimal list-inside">
                <li><strong className="text-white">Root</strong> node</li>
                <li><strong className="text-white">Left boundary</strong> (excluding leaf nodes)</li>
                <li><strong className="text-white">All leaf nodes</strong> from left to right</li>
                <li><strong className="text-white">Right boundary</strong> (excluding leaf nodes, in reverse order)</li>
              </ol>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: boundaryTraversal
              </h4>
              <CodeBox
                title="Boundary Traversal Implementation"
                code={`#include <vector>
using namespace std;

bool isLeaf(Node* node) {
    return node != nullptr && node->left == nullptr && node->right == nullptr;
}

void addLeftBoundary(Node* root, vector<int>& ans) {
    Node* cur = root->left;
    while (cur != nullptr) {
        if (!isLeaf(cur)) ans.push_back(cur->data);
        cur = (cur->left != nullptr) ? cur->left : cur->right;
    }
}

void addLeaves(Node* root, vector<int>& ans) {
    if (root == nullptr) return;
    if (isLeaf(root)) {
        ans.push_back(root->data);
        return;
    }
    addLeaves(root->left, ans);
    addLeaves(root->right, ans);
}

void addRightBoundary(Node* root, vector<int>& ans) {
    Node* cur = root->right;
    vector<int> temp;
    while (cur != nullptr) {
        if (!isLeaf(cur)) temp.push_back(cur->data);
        cur = (cur->right != nullptr) ? cur->right : cur->left;
    }
    for (int i = (int)temp.size() - 1; i >= 0; i--) {
        ans.push_back(temp[i]);
    }
}

vector<int> boundaryTraversal(Node* root) {
    vector<int> ans;
    if (root == nullptr) return ans;
    if (!isLeaf(root)) ans.push_back(root->data);
    addLeftBoundary(root, ans);
    addLeaves(root, ans);
    addRightBoundary(root, ans);
    return ans;
}`}
              />
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 14: Top View and Bottom View */}
      {/* ========================================================================= */}
      <div id="tree-topic-14" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(14)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={14} title="Top View and Bottom View" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              14
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">14. Top View and Bottom View</h3>
              <p className="text-xs text-theme-text-muted font-mono">Vertical coordinates &amp; Horizontal distance (HD) · BFS level-order hashing</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[14] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[14] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold font-mono text-teal-400 block">Top View</span>
                <p className="text-xs text-slate-300">
                  For each vertical column (<code className="text-teal-300">hd</code>), take the <strong>first node</strong> encountered from the top.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold font-mono text-blue-400 block">Bottom View</span>
                <p className="text-xs text-slate-300">
                  For each vertical column (<code className="text-blue-300">hd</code>), take the <strong>last node</strong> encountered at greatest depth.
                </p>
              </div>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: topView & bottomView
              </h4>
              <CodeBox
                title="Top & Bottom View BFS Hashing"
                code={`#include <map>
#include <queue>
#include <vector>
using namespace std;

vector<int> topView(Node* root) {
    vector<int> ans;
    if (root == nullptr) return ans;

    map<int, int> view;
    queue<pair<Node*, int>> q; // {Node, HD}
    q.push({root, 0});

    while (!q.empty()) {
        auto [node, hd] = q.front();
        q.pop();

        if (!view.count(hd)) view[hd] = node->data; // First node seen at this HD

        if (node->left) q.push({node->left, hd - 1});
        if (node->right) q.push({node->right, hd + 1});
    }

    for (auto [hd, value] : view) ans.push_back(value);
    return ans;
}

vector<int> bottomView(Node* root) {
    vector<int> ans;
    if (root == nullptr) return ans;

    map<int, int> view;
    queue<pair<Node*, int>> q;
    q.push({root, 0});

    while (!q.empty()) {
        auto [node, hd] = q.front();
        q.pop();

        view[hd] = node->data; // Overwrite: latest node seen at this HD

        if (node->left) q.push({node->left, hd - 1});
        if (node->right) q.push({node->right, hd + 1});
    }

    for (auto [hd, value] : view) ans.push_back(value);
    return ans;
}`}
              />
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 15: Binary Search Tree (BST) */}
      {/* ========================================================================= */}
      <div id="tree-topic-15" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(15)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={15} title="Binary Search Tree (BST)" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              15
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">15. Binary Search Tree (BST)</h3>
              <p className="text-xs text-theme-text-muted font-mono">Left &lt; Node &lt; Right · O(log n) average search time</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[15] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[15] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                The BST Invariant
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                A <strong className="text-theme-text">Binary Search Tree (BST)</strong> is a binary tree that follows strict ordering:
              </p>
              <ul className="space-y-1 text-xs text-theme-text-muted list-disc list-inside mt-1.5">
                <li>Values <strong className="text-white">smaller</strong> than a node are placed in its left subtree.</li>
                <li>Values <strong className="text-white">greater</strong> than a node are placed in its right subtree.</li>
              </ul>
            </div>

            {/* Tree ASCII diagram */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <span className="text-teal-400 font-bold block">Example BST:</span>
              <pre className="text-teal-200 leading-relaxed">{`        50
       /  \\
      30   70
     / \\   / \\
    20 40 60 80`}</pre>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <span className="text-emerald-400 font-bold block">Searching for 60:</span>
                <div>1. 60 &gt; 50 → move right to 70</div>
                <div>2. 60 &lt; 70 → move left to 60</div>
                <div>3. Match found in only 2 comparisons!</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 16: BST Search, Insertion and Deletion */}
      {/* ========================================================================= */}
      <div id="tree-topic-16" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(16)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={16} title="BST Search, Insertion and Deletion" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              16
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">16. BST Search, Insertion and Deletion</h3>
              <p className="text-xs text-theme-text-muted font-mono">searchBST · insertBST · deleteBST with Inorder Successor</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[16] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[16] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            {/* A. Search */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-300">
                A. Search in BST
              </h4>
              <CodeBox
                title="searchBST(root, target)"
                code={`Node* searchBST(Node* root, int target) {
    if (root == nullptr || root->data == target) {
        return root;
    }

    if (target < root->data) {
        return searchBST(root->left, target);
    }

    return searchBST(root->right, target);
}`}
              />
            </div>

            {/* B. Insertion */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-300">
                B. Insertion in BST
              </h4>
              <CodeBox
                title="insertBST(root, value)"
                code={`Node* insertBST(Node* root, int value) {
    if (root == nullptr) {
        return new Node(value);
    }

    if (value < root->data) {
        root->left = insertBST(root->left, value);
    } else if (value > root->data) {
        root->right = insertBST(root->right, value);
    }

    return root;
}`}
              />
            </div>

            {/* C. Deletion */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-300">
                C. Deletion in BST (3 Cases)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono my-2">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-teal-400 font-bold block">Case 1: Leaf Node</span>
                  <span className="text-slate-400">Simply remove node &amp; return nullptr.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-blue-400 font-bold block">Case 2: 1 Child</span>
                  <span className="text-slate-400">Replace node with its non-null child.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-emerald-400 font-bold block">Case 3: 2 Children</span>
                  <span className="text-slate-400">Replace with Inorder Successor (min in right).</span>
                </div>
              </div>
              <CodeBox
                title="deleteBST(root, key)"
                code={`Node* findMin(Node* root) {
    while (root != nullptr && root->left != nullptr) {
        root = root->left;
    }
    return root;
}

Node* deleteBST(Node* root, int key) {
    if (root == nullptr) return nullptr;

    if (key < root->data) {
        root->left = deleteBST(root->left, key);
    } else if (key > root->data) {
        root->right = deleteBST(root->right, key);
    } else {
        // Case 1 & Case 2
        if (root->left == nullptr) {
            Node* temp = root->right;
            delete root;
            return temp;
        }
        if (root->right == nullptr) {
            Node* temp = root->left;
            delete root;
            return temp;
        }

        // Case 3: Two children
        Node* successor = findMin(root->right);
        root->data = successor->data;
        root->right = deleteBST(root->right, successor->data);
    }
    return root;
}`}
              />
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 17: Validate a BST */}
      {/* ========================================================================= */}
      <div id="tree-topic-17" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(17)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={17} title="Validate a BST" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              17
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">17. Validate a BST</h3>
              <p className="text-xs text-theme-text-muted font-mono">Range-based pruning (low &lt; val &lt; high) · LLONG_MIN &amp; LLONG_MAX</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[17] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[17] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                The Subtree Range Trap
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                Checking only whether a node's immediate children are valid is <strong className="text-rose-400">insufficient</strong>! Every node in the left subtree must be strictly less than the ancestor, and every node in the right subtree must be strictly greater.
              </p>
            </div>

            {/* Invalid Counterexample */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <span className="text-rose-400 font-bold block">Counterexample of an INVALID BST:</span>
              <pre className="text-rose-200 leading-relaxed">{`        10
       /  \\
      5    15
          /  \\
         6    20`}</pre>
              <p className="text-[11px] text-slate-400">
                Node 6 is less than 15, but it lies in the right subtree of 10! Since 6 &lt; 10, this tree is <strong className="text-rose-400">NOT a valid BST</strong>.
              </p>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: Range-Based Validation
              </h4>
              <CodeBox
                title="validateBST with (low, high) bounds"
                code={`#include <climits>

bool validateBST(Node* root, long long low, long long high) {
    if (root == nullptr) return true;

    if (root->data <= low || root->data >= high) {
        return false;
    }

    return validateBST(root->left, low, root->data) &&
           validateBST(root->right, root->data, high);
}

// Call using:
// bool valid = validateBST(root, LLONG_MIN, LLONG_MAX);`}
              />
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 18: Kth Smallest and Largest Element */}
      {/* ========================================================================= */}
      <div id="tree-topic-18" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(18)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={18} title="Kth Smallest and Largest Element" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              18
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">18. Kth Smallest and Largest Element</h3>
              <p className="text-xs text-theme-text-muted font-mono">Inorder traversal (ascending) · Reverse Inorder (descending)</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[18] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[18] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                Core Principle
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                Inorder traversal (Left → Root → Right) visits BST keys in <strong className="text-emerald-400">ascending order</strong>. Reverse inorder traversal (Right → Root → Left) visits keys in <strong className="text-blue-400">descending order</strong>.
              </p>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: kthSmallest & kthLargest
              </h4>
              <CodeBox
                title="Kth Smallest and Largest Helpers"
                code={`// A. Kth Smallest (Inorder: Left -> Root -> Right)
void kthSmallestHelper(Node* root, int k, int& count, int& answer) {
    if (root == nullptr || count >= k) return;

    kthSmallestHelper(root->left, k, count, answer);

    count++;
    if (count == k) {
        answer = root->data;
        return;
    }

    kthSmallestHelper(root->right, k, count, answer);
}

// B. Kth Largest (Reverse Inorder: Right -> Root -> Left)
void kthLargestHelper(Node* root, int k, int& count, int& answer) {
    if (root == nullptr || count >= k) return;

    kthLargestHelper(root->right, k, count, answer);

    count++;
    if (count == k) {
        answer = root->data;
        return;
    }

    kthLargestHelper(root->left, k, count, answer);
}`}
              />
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 19: Heaps and Priority Queues */}
      {/* ========================================================================= */}
      <div id="tree-topic-19" className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-md transition-all">
        <button
          type="button"
          onClick={() => toggleCard(19)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-theme-surface-elevated hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={19} title="Heaps and Priority Queues" />
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs">
              19
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text">19. Heaps and Priority Queues</h3>
              <p className="text-xs text-theme-text-muted font-mono">Max-Heap vs Min-Heap · std::priority_queue · O(log n) insertions</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[19] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[19] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1.5">
                What is a Heap?
              </h4>
              <p className="text-theme-text-muted leading-relaxed">
                A <strong className="text-theme-text">heap</strong> is a complete binary tree that follows a heap-order property:
              </p>
              <ul className="space-y-1 text-xs text-theme-text-muted list-disc list-inside mt-1.5">
                <li><strong className="text-white">Max-Heap:</strong> Every parent is greater than or equal to its children. Maximum element is at the root.</li>
                <li><strong className="text-white">Min-Heap:</strong> Every parent is less than or equal to its children. Minimum element is at the root.</li>
              </ul>
            </div>

            {/* Complexity Table */}
            <div className="overflow-x-auto rounded-xl border border-theme-border">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-teal-300 border-b border-theme-border">
                  <tr>
                    <th className="py-2.5 px-3">Heap Operation</th>
                    <th className="py-2.5 px-3">Time Complexity</th>
                    <th className="py-2.5 px-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-sans">
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-mono font-bold text-teal-400">top()</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">O(1)</td>
                    <td className="py-2.5 px-3 text-slate-300 text-xs">Direct access to root (min or max)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-mono font-bold text-teal-400">push()</td>
                    <td className="py-2.5 px-3 font-mono text-teal-300 font-bold">O(log n)</td>
                    <td className="py-2.5 px-3 text-slate-300 text-xs">Append to end and sift up</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-mono font-bold text-teal-400">pop()</td>
                    <td className="py-2.5 px-3 font-mono text-teal-300 font-bold">O(log n)</td>
                    <td className="py-2.5 px-3 text-slate-300 text-xs">Swap root with last and sift down</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-mono font-bold text-teal-400">buildHeap</td>
                    <td className="py-2.5 px-3 font-mono text-blue-400 font-bold">O(n)</td>
                    <td className="py-2.5 px-3 text-slate-300 text-xs">Bottom-up heapify in linear time</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* C++ Code */}
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-1">
                C++ Code: Max-Heap & Min-Heap using STL
              </h4>
              <CodeBox
                title="STL priority_queue"
                code={`#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    // A. Max-Heap by default
    priority_queue<int> maxPQ;
    maxPQ.push(30);
    maxPQ.push(10);
    maxPQ.push(50);
    cout << "Max-heap top: " << maxPQ.top() << "\\n"; // 50

    // B. Min-Heap using greater<int>
    priority_queue<int, vector<int>, greater<int>> minPQ;
    minPQ.push(30);
    minPQ.push(10);
    minPQ.push(50);
    cout << "Min-heap top: " << minPQ.top() << "\\n"; // 10

    return 0;
}`}
              />
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 20: Quick Revise */}
      {/* ========================================================================= */}
      <div id="tree-topic-20" className="rounded-2xl border border-teal-500/40 bg-theme-card overflow-hidden shadow-lg transition-all">
        <button
          type="button"
          onClick={() => toggleCard(20)}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-gradient-to-r from-teal-950/40 via-theme-surface-elevated to-emerald-950/40 hover:bg-theme-surface-hover transition-colors cursor-pointer border-b border-theme-border"
        >
          <div className="flex items-center space-x-3">
            <SubtopicCheckbox topicId="trees" subtopicId={20} title="Quick Revise: All 19 Tree Topics" />
            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-mono font-bold text-xs">
              ⚡
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-text flex items-center gap-2">
                <span>Quick Revise: All 19 Tree Topics</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Cheat Sheet
                </span>
              </h3>
              <p className="text-xs text-theme-text-muted font-mono">Consolidated revision matrix of every core concept</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
              expandedCards[20] ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedCards[20] && (
          <div className="p-5 sm:p-6 space-y-5 text-sm text-theme-text">
            <div>
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-teal-400 mb-2">
                Final Revision Table
              </h4>
              <div className="overflow-x-auto rounded-xl border border-theme-border shadow-sm">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-teal-300 border-b border-theme-border">
                    <tr>
                      <th className="py-2.5 px-3.5 w-12">#</th>
                      <th className="py-2.5 px-3.5">Topic</th>
                      <th className="py-2.5 px-3.5">What to Remember</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-sans">
                    {[
                      { id: 1, title: 'Tree', desc: 'Hierarchical, non-linear data structure of nodes and edges' },
                      { id: 2, title: 'Binary tree', desc: 'At most two children per node (left and right)' },
                      { id: 3, title: 'Preorder', desc: 'Root → Left → Right (NLR)' },
                      { id: 4, title: 'Inorder', desc: 'Left → Root → Right (LNR) · Sorted in BST' },
                      { id: 5, title: 'Postorder', desc: 'Left → Right → Root (LRN) · Bottom-up deletion' },
                      { id: 6, title: 'Level order', desc: 'BFS traversal level by level using a queue' },
                      { id: 7, title: 'Height', desc: 'Longest downward path from node to a leaf' },
                      { id: 8, title: 'Diameter', desc: 'Longest path between any two nodes in tree' },
                      { id: 9, title: 'Balanced tree', desc: 'Subtree height difference |hL - hR| ≤ 1 at every node' },
                      { id: 10, title: 'LCA', desc: 'Deepest common ancestor of two nodes' },
                      { id: 11, title: 'Boundary traversal', desc: 'Outer perimeter: Root + Left + Leaves + Reversed Right' },
                      { id: 12, title: 'Top / bottom view', desc: 'First / last seen nodes by horizontal distance (HD)' },
                      { id: 13, title: 'BST', desc: 'Left values smaller, right values larger' },
                      { id: 14, title: 'Validate BST', desc: 'Enforce valid (low, high) range across all subtrees' },
                      { id: 15, title: 'Kth smallest', desc: 'Inorder traversal with counter' },
                      { id: 16, title: 'Kth largest', desc: 'Reverse inorder traversal (Right → Root → Left)' },
                      { id: 17, title: 'Heap', desc: 'Complete binary tree with max or min heap property' },
                      { id: 18, title: 'Priority queue', desc: 'Efficiently access highest-priority item in O(1)' }
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
          </div>
        )}
      </div>
    </div>
  );
};
