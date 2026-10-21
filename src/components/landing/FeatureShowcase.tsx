import React from 'react';
import { Play, Code2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeatureShowcase: React.FC = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Learn. <span className="text-gradient-teal">Visualize.</span> Code. Master.
        </h2>
      </div>

      <div className="space-y-32">
        
        {/* PANEL 1 - Learn Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-theme-card/80 border border-teal-500/20 rounded-2xl overflow-hidden glass-panel shadow-2xl relative">
              <div className="px-4 py-3 bg-theme-card/80 border-b border-theme-border flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="ml-2 text-xs font-mono text-theme-text-muted">Concept Explanation</span>
              </div>
              <div className="p-6 space-y-4">
                <h4 className="text-xl font-bold text-white">Binary Search</h4>
                <div className="p-4 rounded-xl bg-theme-card/50 border border-theme-border/50">
                  <p className="text-sm text-theme-text-muted leading-relaxed">
                    Binary Search is a searching algorithm for finding an element's position in a sorted array. 
                    It works by repeatedly dividing in half the portion of the list that could contain the item.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-theme-text-muted font-mono">Time Complexity</span>
                    <span className="text-sm font-bold text-teal-400 font-mono">O(log n)</span>
                  </div>
                  <div className="flex flex-col border-l border-theme-border pl-4">
                    <span className="text-xs text-theme-text-muted font-mono">Space Complexity</span>
                    <span className="text-sm font-bold text-teal-400 font-mono">O(1)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6 lg:pl-12">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <BookOpenIcon />
            </div>
            <h3 className="text-3xl font-bold text-white">Understand Before You Code</h3>
            <p className="text-theme-text-muted text-lg leading-relaxed">
              Build strong fundamentals with structured explanations designed specifically for your DSA curriculum. No more getting lost in overly complex theory.
            </p>
          </div>
        </div>

        {/* PANEL 2 - Visualize Algorithms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 lg:pr-12">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Play className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-white">See Algorithms Come Alive</h3>
            <p className="text-theme-text-muted text-lg leading-relaxed">
              Turn abstract algorithms into visual, intuitive processes that are easier to understand and remember. Watch pointers move, arrays sort, and trees traverse in real-time.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>
            <div className="bg-theme-card/80 border border-cyan-500/20 rounded-2xl overflow-hidden glass-panel shadow-2xl relative">
              <div className="px-4 py-3 bg-theme-card/80 border-b border-theme-border flex items-center justify-between">
                <span className="text-xs font-mono text-theme-text-muted flex items-center"><Layers className="w-3.5 h-3.5 mr-1.5 text-cyan-400"/> Array Sorting Visualizer</span>
              </div>
              <div className="p-6">
                <div className="flex items-end justify-center space-x-2 h-40">
                  <motion.div animate={{ height: ['40%', '60%', '40%'] }} transition={{ repeat: Infinity, duration: 2 }} className="w-8 bg-slate-700 rounded-t-md"></motion.div>
                  <motion.div animate={{ height: ['80%', '20%', '80%'] }} transition={{ repeat: Infinity, duration: 2 }} className="w-8 bg-cyan-500 rounded-t-md border border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></motion.div>
                  <motion.div animate={{ height: ['20%', '90%', '20%'] }} transition={{ repeat: Infinity, duration: 2 }} className="w-8 bg-cyan-500 rounded-t-md border border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></motion.div>
                  <motion.div animate={{ height: ['60%', '40%', '60%'] }} transition={{ repeat: Infinity, duration: 2 }} className="w-8 bg-slate-700 rounded-t-md"></motion.div>
                  <motion.div animate={{ height: ['90%', '50%', '90%'] }} transition={{ repeat: Infinity, duration: 2 }} className="w-8 bg-slate-700 rounded-t-md"></motion.div>
                </div>
                <div className="mt-6 flex justify-center space-x-4">
                  <div className="text-xs font-mono text-theme-text-muted flex items-center"><div className="w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></div> Comparing</div>
                  <div className="text-xs font-mono text-theme-text-muted flex items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div> Sorted</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 3 - Code & Practice */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-theme-card/90 border border-teal-500/20 rounded-2xl overflow-hidden glass-panel shadow-2xl relative">
              <div className="px-4 py-3 bg-theme-card flex items-center justify-between border-b border-theme-border">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-teal-400" />
                  <span className="text-xs font-mono text-theme-text-muted">binary_search.cpp</span>
                </div>
                <button className="px-3 py-1 bg-teal-500/20 hover:bg-theme-surface-hover0/30 text-teal-300 text-[10px] font-bold rounded flex items-center transition-colors">
                  <Play className="w-3 h-3 mr-1 fill-current" /> RUN CODE
                </button>
              </div>
              <div className="p-4 font-mono text-[13px] text-theme-text-muted space-y-1.5 overflow-x-auto bg-[#0d1117]">
                <div><span className="text-teal-400">// Standard C++ Binary Search</span></div>
                <br />
                <div><span className="text-blue-400">int</span> <span className="text-amber-200">binarySearch</span>(<span className="text-blue-400">std::vector</span>&lt;<span className="text-blue-400">int</span>&gt;& arr, <span className="text-blue-400">int</span> target) &#123;</div>
                <div className="pl-4"><span className="text-blue-400">int</span> left = <span className="text-rose-400">0</span>;</div>
                <div className="pl-4"><span className="text-blue-400">int</span> right = arr.<span className="text-amber-200">size</span>() - <span className="text-rose-400">1</span>;</div>
                <div className="pl-4"><span className="text-teal-400">while</span> (left &lt;= right) &#123;</div>
                <div className="pl-8"><span className="text-blue-400">int</span> mid = left + (right - left) / <span className="text-rose-400">2</span>;</div>
                <div className="pl-8"><span className="text-teal-400">if</span> (arr[mid] == target) <span className="text-teal-400">return</span> mid;</div>
                <div className="pl-8"><span className="text-theme-text-muted">// ... logic</span></div>
                <div className="pl-4">&#125;</div>
                <div>&#125;</div>
              </div>
              <div className="px-4 py-2 bg-theme-card/80 border-t border-theme-border flex justify-between items-center text-[10px] font-mono">
                <span className="text-emerald-400">Test Cases: 5/5 Passed</span>
                <span className="text-theme-text-muted">Time: 2ms</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6 lg:pl-12">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-white">Learn by Doing</h3>
            <p className="text-theme-text-muted text-lg leading-relaxed">
              Move from theory to implementation with practical coding examples and problems. 
              Write code in an integrated environment with instant test case feedback.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

// Helper icon component
function BookOpenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  );
}

