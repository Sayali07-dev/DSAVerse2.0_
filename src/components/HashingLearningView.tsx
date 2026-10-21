import React, { useState } from 'react';
import { Check, Copy, ChevronDown } from 'lucide-react';
import { SubtopicCheckbox } from './SubtopicCheckbox';
import { TopicProgressHeader } from './TopicProgressHeader';

const CodeBox: React.FC<{ code: string; language?: string }> = ({ code, language = 'C++' }) => {
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
        <span>{language}</span>
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

export const HashingLearningView: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
  });

  const allExpanded = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].every((id) => expandedCards[id]);

  const toggleAll = () => {
    const nextVal = !allExpanded;
    const next: Record<number, boolean> = {};
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((id) => {
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

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <TopicProgressHeader topicId="hashing" topicTitle="Hashing" />
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-theme-border">
        <div>
          <h2 className="text-xl font-bold text-theme-text">Hashing</h2>
          <p className="text-xs text-theme-text-muted mt-0.5">
            10 Essential Hashing Topics • Click any card to view detailed theory, code and tables
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
        {/* CARD 1: Introduction to Hashing */}
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
              <SubtopicCheckbox topicId="hashing" subtopicId={1} title="Introduction to Hashing" />
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
                Introduction to Hashing
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
                <p className="leading-relaxed">
                  <strong className="text-teal-400">Theory:</strong> Hashing converts a key into a value or index using a hash function. This helps us store and find data efficiently.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border space-y-2">
                <p className="font-semibold text-teal-400">
                  Example: Suppose we want to store the number 25 in a hash table of size 10.
                </p>
                <p className="text-xs sm:text-sm">Using the hash function:</p>
                <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-xs sm:text-sm text-teal-300">
                  h(x) = x mod 10
                </div>
                <p className="leading-relaxed">
                  The index is <span className="font-mono text-teal-400 font-semibold">25 mod 10 = 5</span>. So, we store 25 at index 5.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  C++ example
                </h4>
                <CodeBox
                  code={`int hashFunction(int key, int tableSize) {\n    return key % tableSize;\n}`}
                />
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  Usage:
                </h4>
                <CodeBox
                  code={`cout << hashFunction(25, 10);  // Output: 5`}
                />
              </div>

              <div className="space-y-1">
                <p className="text-theme-text">
                  <strong className="text-theme-text">Average lookup time:</strong> <span className="font-mono text-teal-400 font-bold">O(1)</span> for a well-designed hash table.
                </p>
                <p className="text-theme-text">
                  <strong className="text-theme-text">Worst-case lookup time:</strong> <span className="font-mono text-teal-400 font-bold">O(n)</span> if many keys collide.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CARD 2: Hash Functions and Collisions */}
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
              <SubtopicCheckbox topicId="hashing" subtopicId={2} title="Hash Functions and Collisions" />
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
                Hash Functions and Collisions
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
                  Hash function
                </h4>
                <p className="leading-relaxed mb-2">
                  A hash function maps a key to a position in a hash table.
                </p>
                <CodeBox
                  code={`int hashFunction(int key, int size) {\n    return key % size;\n}`}
                />
                <div className="mt-2 text-theme-text">
                  <p className="font-semibold text-teal-400">For a table of size 10:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>25 maps to index 5.</li>
                    <li>35 also maps to index 5.</li>
                  </ul>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border space-y-2">
                <h4 className="font-bold text-amber-300">
                  What is a collision?
                </h4>
                <p className="leading-relaxed">
                  A collision happens when two different keys map to the same index.
                </p>
                <p className="text-xs font-semibold">For example:</p>
                <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-xs sm:text-sm text-amber-300">
                  h(25) = 5,    h(35) = 5
                </div>
                <p className="leading-relaxed">
                  Both keys want the same position, so the collision must be handled.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1.5">
                  Common collision-handling techniques:
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-theme-text">
                  <li><strong className="text-theme-text">Linear probing:</strong> Search for the next available position.</li>
                  <li><strong className="text-theme-text">Chaining:</strong> Store multiple entries in the same bucket, often using a linked structure.</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-teal-950/20 border border-teal-500/20 text-xs text-teal-300 leading-relaxed">
                <strong>Remember:</strong> A collision does not mean data is lost. The hash table needs a strategy to store both keys.
              </div>
            </div>
          )}
        </div>

        {/* CARD 3: Linear Probing */}
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
              <SubtopicCheckbox topicId="hashing" subtopicId={3} title="Linear Probing" />
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
                Linear Probing
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
                <p className="leading-relaxed">
                  <strong className="text-teal-400">Theory:</strong> Linear probing is a collision-handling technique. If the calculated index is occupied, we check the next index, then the next, until an empty position is found.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border space-y-1.5">
                <p className="font-semibold text-teal-400">
                  Example: Table size = 10, hash function = key % 10.
                </p>
                <p className="text-xs sm:text-sm font-semibold">Insert 25, 35, and 45:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>25 goes to index 5.</li>
                  <li>35 also hashes to 5, so it goes to index 6.</li>
                  <li>45 also hashes to 5, so it goes to index 7.</li>
                </ul>
              </div>

              {/* Static Table for Hash Table After Insertion */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">
                  Hash table after insertion
                </h4>
                <div className="overflow-x-auto rounded-xl border border-theme-border">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-900/80 text-teal-300 font-mono text-[11px] sm:text-xs uppercase border-b border-theme-border">
                      <tr>
                        <th className="py-2.5 px-4 font-semibold w-24">Index</th>
                        <th className="py-2.5 px-4 font-semibold">Stored Key</th>
                        <th className="py-2.5 px-4 font-semibold">Status / Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-sans">
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2 px-4 font-mono font-bold text-slate-400">0</td>
                        <td className="py-2 px-4 font-mono text-slate-500">—</td>
                        <td className="py-2 px-4 text-theme-text-muted text-xs">Empty</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2 px-4 font-mono font-bold text-slate-400">1</td>
                        <td className="py-2 px-4 font-mono text-slate-500">—</td>
                        <td className="py-2 px-4 text-theme-text-muted text-xs">Empty</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2 px-4 font-mono font-bold text-slate-400">2</td>
                        <td className="py-2 px-4 font-mono text-slate-500">—</td>
                        <td className="py-2 px-4 text-theme-text-muted text-xs">Empty</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2 px-4 font-mono font-bold text-slate-400">3</td>
                        <td className="py-2 px-4 font-mono text-slate-500">—</td>
                        <td className="py-2 px-4 text-theme-text-muted text-xs">Empty</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2 px-4 font-mono font-bold text-slate-400">4</td>
                        <td className="py-2 px-4 font-mono text-slate-500">—</td>
                        <td className="py-2 px-4 text-theme-text-muted text-xs">Empty</td>
                      </tr>
                      <tr className="bg-teal-950/20 hover:bg-teal-950/30 transition-colors">
                        <td className="py-2 px-4 font-mono font-bold text-teal-400">5</td>
                        <td className="py-2 px-4 font-mono font-bold text-emerald-400 text-sm">25</td>
                        <td className="py-2 px-4 text-teal-300 text-xs">Direct hash: 25 % 10 = 5</td>
                      </tr>
                      <tr className="bg-teal-950/20 hover:bg-teal-950/30 transition-colors">
                        <td className="py-2 px-4 font-mono font-bold text-teal-400">6</td>
                        <td className="py-2 px-4 font-mono font-bold text-emerald-400 text-sm">35</td>
                        <td className="py-2 px-4 text-teal-300 text-xs">Linear probe from 5 → placed at 6</td>
                      </tr>
                      <tr className="bg-teal-950/20 hover:bg-teal-950/30 transition-colors">
                        <td className="py-2 px-4 font-mono font-bold text-teal-400">7</td>
                        <td className="py-2 px-4 font-mono font-bold text-emerald-400 text-sm">45</td>
                        <td className="py-2 px-4 text-teal-300 text-xs">Linear probe from 5 → 6 → placed at 7</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2 px-4 font-mono font-bold text-slate-400">8</td>
                        <td className="py-2 px-4 font-mono text-slate-500">—</td>
                        <td className="py-2 px-4 text-theme-text-muted text-xs">Empty</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2 px-4 font-mono font-bold text-slate-400">9</td>
                        <td className="py-2 px-4 font-mono text-slate-500">—</td>
                        <td className="py-2 px-4 text-theme-text-muted text-xs">Empty</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-theme-text-muted mt-2">
                  Indices 5, 6, and 7 contain the three keys.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  C++ code
                </h4>
                <p className="text-xs text-theme-text-muted mb-1">
                  This simple implementation assumes non-negative keys and uses -1 to represent an empty slot.
                </p>
                <CodeBox
                  code={`bool insert(vector<int>& table, int key) {\n    int size = table.size();\n    int index = key % size;\n\n    for (int i = 0; i < size; i++) {\n        int pos = (index + i) % size;\n\n        if (table[pos] == -1) {\n            table[pos] = key;\n            return true;\n        }\n\n        if (table[pos] == key)\n            return true; // Already present\n    }\n\n    return false; // Table is full\n}`}
                />
                <p className="text-xs text-theme-text mt-2 leading-relaxed">
                  The expression <span className="font-mono text-teal-400 font-semibold">(index + i) % size</span> wraps around to index 0 when we reach the end of the table.
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-theme-text">
                  <strong className="text-theme-text">Average time:</strong> Often <span className="font-mono text-teal-400 font-bold">O(1)</span> when the table is not crowded.
                </p>
                <p className="text-theme-text">
                  <strong className="text-theme-text">Worst-case time:</strong> <span className="font-mono text-teal-400 font-bold">O(n)</span>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-300 leading-relaxed">
                <strong>Note:</strong> Deletion needs special handling, such as tombstone markers, so that searches don't stop too early.
              </div>
            </div>
          )}
        </div>

        {/* CARD 4: Hash Search */}
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
              <SubtopicCheckbox topicId="hashing" subtopicId={4} title="Hash Search" />
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
                Hash Search
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
                <p className="leading-relaxed">
                  <strong className="text-teal-400">Theory:</strong> Hash search finds a key by calculating its hash index instead of checking every element from the beginning.
                </p>
                <p className="leading-relaxed mt-2 text-theme-text-muted">
                  In linear probing, searching starts at the calculated index and checks consecutive positions until the key is found or an empty slot proves it is absent.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  C++ code
                </h4>
                <CodeBox
                  code={`int hashSearch(vector<int>& table, int key) {\n    int size = table.size();\n    int index = key % size;\n\n    for (int i = 0; i < size; i++) {\n        int pos = (index + i) % size;\n\n        if (table[pos] == -1)\n            return -1;\n\n        if (table[pos] == key)\n            return pos;\n    }\n\n    return -1;\n}`}
                />
              </div>

              <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border space-y-1">
                <p className="text-theme-text leading-relaxed">
                  <strong className="text-teal-400">Example:</strong> If 25 is stored at index 5, searching for 25 returns 5. If the key is absent, it returns -1.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-theme-text leading-relaxed">
                <strong className="text-teal-400">Important:</strong> This search function works with the table created using the linear-probing method above, without deletions.
              </div>

              <div className="space-y-1">
                <p className="text-theme-text">
                  <strong className="text-theme-text">Complexity:</strong> Average <span className="font-mono text-teal-400 font-bold">O(1)</span>, worst-case <span className="font-mono text-teal-400 font-bold">O(n)</span>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CARD 5: Hash Maps and Hash Sets */}
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
              <SubtopicCheckbox topicId="hashing" subtopicId={5} title="Hash Maps and Hash Sets" />
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
                Hash Maps and Hash Sets
              </h3>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-theme-text-muted transition-transform duration-200 shrink-0 ${
                expandedCards[5] ? 'rotate-180 text-teal-400' : ''
              }`}
            />
          </button>

          {expandedCards[5] && (
            <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-theme-border/60 text-xs sm:text-sm text-theme-text leading-relaxed animate-in fade-in duration-200 space-y-5">
              <p className="text-theme-text leading-relaxed">
                These are C++ STL containers that use hashing to provide fast operations on average.
              </p>

              {/* Sub-section A: Hash map */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-theme-border space-y-3">
                <h4 className="text-sm font-bold text-teal-400">
                  A. Hash map — unordered_map
                </h4>
                <p className="leading-relaxed">
                  <strong className="text-theme-text">Theory:</strong> Stores data as key-value pairs. Each key is unique, but different keys can have the same value.
                </p>

                <p className="font-semibold text-teal-300">Example: Store student roll numbers and marks.</p>
                <CodeBox
                  code={`unordered_map<int, int> marks;\n\nmarks[101] = 85;\nmarks[102] = 90;\n\ncout << marks[101];  // Output: 85`}
                />

                <p className="font-semibold text-teal-300">Useful operations:</p>
                <CodeBox
                  code={`marks[103] = 78;            // Insert or update\nmarks.find(102);            // Search for key\nmarks.erase(101);           // Delete key\ncout << marks.size();       // Number of keys`}
                />

                <ul className="list-disc pl-5 space-y-1">
                  <li>Average insertion, search and deletion: <span className="font-mono text-teal-400 font-bold">O(1)</span>.</li>
                  <li>Worst case: <span className="font-mono text-teal-400 font-bold">O(n)</span>.</li>
                </ul>
              </div>

              {/* Sub-section B: Hash set */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-theme-border space-y-3">
                <h4 className="text-sm font-bold text-teal-400">
                  B. Hash set — unordered_set
                </h4>
                <p className="leading-relaxed">
                  <strong className="text-theme-text">Theory:</strong> Stores unique values only. It is useful when you only need to know whether an element exists.
                </p>

                <CodeBox
                  code={`unordered_set<int> s;\n\ns.insert(10);\ns.insert(20);\ns.insert(10);  // Duplicate ignored\n\ncout << s.size();  // Output: 2`}
                />

                <p className="font-semibold text-teal-300">Useful operations:</p>
                <CodeBox
                  code={`s.find(20);       // Search\ns.count(10);      // Returns 1 if present, otherwise 0\ns.erase(10);      // Delete`}
                />

                <ul className="list-disc pl-5 space-y-1">
                  <li>Average insertion, search and deletion: <span className="font-mono text-teal-400 font-bold">O(1)</span>.</li>
                  <li>Worst case: <span className="font-mono text-teal-400 font-bold">O(n)</span>.</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-teal-950/20 border border-teal-500/20 text-xs text-teal-300 leading-relaxed">
                <strong>Difference:</strong> Use <span className="font-mono font-bold">unordered_map</span> when you need a value associated with each key. Use <span className="font-mono font-bold">unordered_set</span> when you only need to store unique items.
              </div>
            </div>
          )}
        </div>

        {/* CARD 6: map and unordered_map */}
        <div
          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
            expandedCards[6]
              ? 'border-teal-500/40 bg-theme-card shadow-lg ring-1 ring-teal-500/20'
              : 'border-theme-border bg-theme-card hover:border-teal-500/30'
          }`}
        >
          <button
            type="button"
            onClick={() => toggleCard(6)}
            className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-slate-800/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3.5 pr-2">
              <SubtopicCheckbox topicId="hashing" subtopicId={6} title="map and unordered_map" />
              <span
                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  expandedCards[6]
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                    : 'bg-teal-500/10 border border-teal-500/20 text-teal-400'
                }`}
              >
                6
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-theme-text">
                map and unordered_map
              </h3>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-theme-text-muted transition-transform duration-200 shrink-0 ${
                expandedCards[6] ? 'rotate-180 text-teal-400' : ''
              }`}
            />
          </button>

          {expandedCards[6] && (
            <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-theme-border/60 text-xs sm:text-sm text-theme-text leading-relaxed animate-in fade-in duration-200 space-y-4">
              <p className="leading-relaxed">
                Both store key-value pairs, but they organize keys differently.
              </p>

              {/* Static Comparison Table */}
              <div className="overflow-x-auto rounded-xl border border-theme-border">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900/80 text-teal-300 font-mono text-[11px] sm:text-xs uppercase border-b border-theme-border">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold">Feature</th>
                      <th className="py-2.5 px-4 font-semibold">map</th>
                      <th className="py-2.5 px-4 font-semibold">unordered_map</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-sans">
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-theme-text">Internal structure</td>
                      <td className="py-2.5 px-4 text-theme-text">Usually balanced tree</td>
                      <td className="py-2.5 px-4 text-theme-text">Hash table</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-theme-text">Key order</td>
                      <td className="py-2.5 px-4 text-theme-text">Sorted</td>
                      <td className="py-2.5 px-4 text-theme-text">No guaranteed order</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-theme-text">Average search</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-teal-300">O(log n)</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-teal-300">O(1)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-theme-text">Worst-case search</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-amber-300">O(log n)</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-amber-300">O(n)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-theme-text">Use when</td>
                      <td className="py-2.5 px-4 text-theme-text-muted">Sorted keys are needed</td>
                      <td className="py-2.5 px-4 text-theme-text-muted">Fast average lookup is needed</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  C++ example
                </h4>
                <CodeBox
                  code={`map<int, string> a;\nunordered_map<int, string> b;\n\na[3] = "Sam";\na[1] = "Raj";\na[2] = "Amit";\n\nfor (auto p : a)\n    cout << p.first << " ";`}
                />

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-teal-300 mt-2">
                  <span className="text-slate-500 font-sans block text-xs mb-0.5">Output:</span>
                  1 2 3
                </div>

                <p className="text-xs text-theme-text mt-2 leading-relaxed">
                  The <span className="font-mono text-teal-400 font-semibold">map</span> prints keys in sorted order. With <span className="font-mono text-teal-400 font-semibold">unordered_map</span>, the iteration order is not guaranteed.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CARD 7: set and unordered_set */}
        <div
          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
            expandedCards[7]
              ? 'border-teal-500/40 bg-theme-card shadow-lg ring-1 ring-teal-500/20'
              : 'border-theme-border bg-theme-card hover:border-teal-500/30'
          }`}
        >
          <button
            type="button"
            onClick={() => toggleCard(7)}
            className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-slate-800/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3.5 pr-2">
              <SubtopicCheckbox topicId="hashing" subtopicId={7} title="set and unordered_set" />
              <span
                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  expandedCards[7]
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                    : 'bg-teal-500/10 border border-teal-500/20 text-teal-400'
                }`}
              >
                7
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-theme-text">
                set and unordered_set
              </h3>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-theme-text-muted transition-transform duration-200 shrink-0 ${
                expandedCards[7] ? 'rotate-180 text-teal-400' : ''
              }`}
            />
          </button>

          {expandedCards[7] && (
            <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-theme-border/60 text-xs sm:text-sm text-theme-text leading-relaxed animate-in fade-in duration-200 space-y-4">
              <p className="leading-relaxed">
                Both store unique elements, but their ordering differs.
              </p>

              {/* Static Comparison Table */}
              <div className="overflow-x-auto rounded-xl border border-theme-border">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900/80 text-teal-300 font-mono text-[11px] sm:text-xs uppercase border-b border-theme-border">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold">Feature</th>
                      <th className="py-2.5 px-4 font-semibold">set</th>
                      <th className="py-2.5 px-4 font-semibold">unordered_set</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-sans">
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-theme-text">Duplicate values</td>
                      <td className="py-2.5 px-4 text-theme-text">Not allowed</td>
                      <td className="py-2.5 px-4 text-theme-text">Not allowed</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-theme-text">Order</td>
                      <td className="py-2.5 px-4 text-theme-text">Sorted</td>
                      <td className="py-2.5 px-4 text-theme-text">No guaranteed order</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-theme-text">Average search</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-teal-300">O(log n)</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-teal-300">O(1)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-theme-text">Worst-case search</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-amber-300">O(log n)</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-amber-300">O(n)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  C++ example
                </h4>
                <CodeBox
                  code={`set<int> s;\n\ns.insert(30);\ns.insert(10);\ns.insert(20);\ns.insert(10);\n\nfor (int x : s)\n    cout << x << " ";`}
                />

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-teal-300 mt-2">
                  <span className="text-slate-500 font-sans block text-xs mb-0.5">Output:</span>
                  10 20 30
                </div>

                <p className="text-xs text-theme-text mt-2 leading-relaxed">
                  The duplicate 10 is stored only once, and the values are sorted.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-teal-950/20 border border-teal-500/20 text-xs text-teal-300 leading-relaxed">
                Use <span className="font-mono font-bold">unordered_set</span> instead when you don't need sorted order and want fast average membership checks.
              </div>
            </div>
          )}
        </div>

        {/* CARD 8: Frequency Counting */}
        <div
          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
            expandedCards[8]
              ? 'border-teal-500/40 bg-theme-card shadow-lg ring-1 ring-teal-500/20'
              : 'border-theme-border bg-theme-card hover:border-teal-500/30'
          }`}
        >
          <button
            type="button"
            onClick={() => toggleCard(8)}
            className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-slate-800/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3.5 pr-2">
              <SubtopicCheckbox topicId="hashing" subtopicId={8} title="Frequency Counting" />
              <span
                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  expandedCards[8]
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                    : 'bg-teal-500/10 border border-teal-500/20 text-teal-400'
                }`}
              >
                8
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-theme-text">
                Frequency Counting
              </h3>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-theme-text-muted transition-transform duration-200 shrink-0 ${
                expandedCards[8] ? 'rotate-180 text-teal-400' : ''
              }`}
            />
          </button>

          {expandedCards[8] && (
            <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-theme-border/60 text-xs sm:text-sm text-theme-text leading-relaxed animate-in fade-in duration-200 space-y-4">
              <div>
                <p className="leading-relaxed">
                  <strong className="text-teal-400">Theory:</strong> Frequency counting means counting how many times each element appears. A hash map stores each element as a key and its frequency as the value.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border space-y-1.5">
                <p className="font-semibold text-teal-400">
                  Example: [1, 2, 1, 3, 2, 1]
                </p>
                <p className="text-xs sm:text-sm font-semibold">Expected frequencies:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>1 appears 3 times.</li>
                  <li>2 appears 2 times.</li>
                  <li>3 appears 1 time.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  C++ function
                </h4>
                <CodeBox
                  code={`unordered_map<int, int> frequencyCount(vector<int>& arr) {\n    unordered_map<int, int> freq;\n\n    for (int x : arr) {\n        freq[x]++;\n    }\n\n    return freq;\n}`}
                />
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  Example usage:
                </h4>
                <CodeBox
                  code={`vector<int> arr = {1, 2, 1, 3, 2, 1};\n\nauto freq = frequencyCount(arr);\n\ncout << freq[1];  // Output: 3\ncout << freq[2];  // Output: 2`}
                />
              </div>

              <p className="text-theme-text leading-relaxed">
                <strong className="text-teal-400">How does freq[x]++ work?</strong> It increases the count of x by one. If the key doesn't exist, its count starts at zero.
              </p>

              <div className="space-y-1">
                <p className="text-theme-text">
                  <strong className="text-theme-text">Average time:</strong> <span className="font-mono text-teal-400 font-bold">O(n)</span>
                </p>
                <p className="text-theme-text">
                  <strong className="text-theme-text">Extra space:</strong> <span className="font-mono text-teal-400 font-bold">O(k)</span>, where <span className="font-mono text-teal-400">k</span> is the number of distinct elements.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CARD 9: Duplicate Detection */}
        <div
          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
            expandedCards[9]
              ? 'border-teal-500/40 bg-theme-card shadow-lg ring-1 ring-teal-500/20'
              : 'border-theme-border bg-theme-card hover:border-teal-500/30'
          }`}
        >
          <button
            type="button"
            onClick={() => toggleCard(9)}
            className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-slate-800/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3.5 pr-2">
              <SubtopicCheckbox topicId="hashing" subtopicId={9} title="Duplicate Detection" />
              <span
                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  expandedCards[9]
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                    : 'bg-teal-500/10 border border-teal-500/20 text-teal-400'
                }`}
              >
                9
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-theme-text">
                Duplicate Detection
              </h3>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-theme-text-muted transition-transform duration-200 shrink-0 ${
                expandedCards[9] ? 'rotate-180 text-teal-400' : ''
              }`}
            />
          </button>

          {expandedCards[9] && (
            <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-theme-border/60 text-xs sm:text-sm text-theme-text leading-relaxed animate-in fade-in duration-200 space-y-4">
              <div>
                <p className="leading-relaxed">
                  <strong className="text-teal-400">Theory:</strong> Duplicate detection checks whether an element appears more than once. An unordered_set helps us detect a repeated element while traversing the array.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border space-y-1">
                <p className="font-semibold text-teal-400">
                  Example: [10, 20, 30, 20]
                </p>
                <p className="text-xs sm:text-sm">The value 20 appears twice, so a duplicate exists.</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  C++ function
                </h4>
                <CodeBox
                  code={`bool containsDuplicate(vector<int>& arr) {\n    unordered_set<int> seen;\n\n    for (int x : arr) {\n        if (seen.count(x)) {\n            return true;\n        }\n\n        seen.insert(x);\n    }\n\n    return false;\n}`}
                />
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  Example usage:
                </h4>
                <CodeBox
                  code={`vector<int> arr = {10, 20, 30, 20};\n\ncout << containsDuplicate(arr);  // Output: 1 (true)`}
                />
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                  How it works
                </h4>
                <ol className="list-decimal pl-5 space-y-1 text-theme-text">
                  <li>Check whether the current value already exists in seen.</li>
                  <li>If it exists, return true.</li>
                  <li>Otherwise, insert it into the set.</li>
                  <li>If the loop finishes without finding a duplicate, return false.</li>
                </ol>
              </div>

              <div className="space-y-1">
                <p className="text-theme-text">
                  <strong className="text-theme-text">Average time:</strong> <span className="font-mono text-teal-400 font-bold">O(n)</span>
                </p>
                <p className="text-theme-text">
                  <strong className="text-theme-text">Extra space:</strong> <span className="font-mono text-teal-400 font-bold">O(n)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CARD 10: Quick Revision */}
        <div
          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
            expandedCards[10]
              ? 'border-teal-500/40 bg-theme-card shadow-lg ring-1 ring-teal-500/20'
              : 'border-theme-border bg-theme-card hover:border-teal-500/30'
          }`}
        >
          <button
            type="button"
            onClick={() => toggleCard(10)}
            className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-slate-800/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3.5 pr-2">
              <SubtopicCheckbox topicId="hashing" subtopicId={10} title="Quick Revision" />
              <span
                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  expandedCards[10]
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                    : 'bg-teal-500/10 border border-teal-500/20 text-teal-400'
                }`}
              >
                10
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-theme-text">
                Quick Revision
              </h3>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-theme-text-muted transition-transform duration-200 shrink-0 ${
                expandedCards[10] ? 'rotate-180 text-teal-400' : ''
              }`}
            />
          </button>

          {expandedCards[10] && (
            <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-theme-border/60 text-xs sm:text-sm text-theme-text leading-relaxed animate-in fade-in duration-200 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">
                  Quick revision
                </h4>

                {/* Static Table Properly Formatted */}
                <div className="overflow-x-auto rounded-xl border border-theme-border">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-900/80 text-teal-300 font-mono text-[11px] sm:text-xs uppercase border-b border-theme-border">
                      <tr>
                        <th className="py-3 px-4 font-semibold">Problem</th>
                        <th className="py-3 px-4 font-semibold">Recommended technique</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-sans">
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 px-4 text-theme-text">Store key-value pairs</td>
                        <td className="py-2.5 px-4 font-mono font-bold text-teal-300">unordered_map</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 px-4 text-theme-text">Store unique values</td>
                        <td className="py-2.5 px-4 font-mono font-bold text-teal-300">unordered_set</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 px-4 text-theme-text">Keep keys sorted</td>
                        <td className="py-2.5 px-4 font-mono font-bold text-teal-300">map</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 px-4 text-theme-text">Keep unique values sorted</td>
                        <td className="py-2.5 px-4 font-mono font-bold text-teal-300">set</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 px-4 text-theme-text">Count occurrences</td>
                        <td className="py-2.5 px-4 font-mono font-bold text-teal-300">unordered_map</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 px-4 text-theme-text">Detect duplicates</td>
                        <td className="py-2.5 px-4 font-mono font-bold text-teal-300">unordered_set</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 px-4 text-theme-text">Handle collisions in a custom table</td>
                        <td className="py-2.5 px-4 font-mono font-bold text-teal-300">Linear probing</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 px-4 text-theme-text">Find a key in a custom hash table</td>
                        <td className="py-2.5 px-4 font-mono font-bold text-teal-300">Hash search</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-teal-950/20 border border-teal-500/20 text-xs text-theme-text-muted leading-relaxed">
                Use this reference to choose between balanced binary search tree containers (<span className="font-mono text-teal-300">map/set</span>) and constant-time average hash containers (<span className="font-mono text-teal-300">unordered_map/unordered_set</span>).
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
