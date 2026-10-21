import React, { useState } from 'react';
import { 
  GitCommit, 
  Workflow, 
  Database, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Clock, 
  Share2, 
  Split, 
  Boxes, 
  Binary, 
  Table,
  Zap
} from 'lucide-react';

interface TopicDiagramProps {
  topicId: string;
  topicName: string;
}

export const TopicDiagram: React.FC<TopicDiagramProps> = ({ topicId, topicName }) => {
  const [viewMode, setViewMode] = useState<'architecture' | 'flowchart'>('architecture');

  const renderDiagramContent = () => {
    switch (topicId) {
      case 'cpp-basics':
        return viewMode === 'architecture' ? (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Cpu className="w-4 h-4 mr-1.5 text-teal-400" /> C++ Memory Layout & Pointer Architecture
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              {/* Stack Memory */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-teal-500/30 space-y-2">
                <div className="flex items-center justify-between text-teal-400 font-bold border-b border-teal-500/20 pb-1">
                  <span>Stack Segment</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/20">LIFO Order</span>
                </div>
                <div className="p-2 rounded bg-slate-800/80 border border-slate-700/80 text-[11px] space-y-1">
                  <div className="text-theme-text font-bold">int a = 10;</div>
                  <div className="text-teal-400">Address: 0x7ffd58</div>
                </div>
                <div className="p-2 rounded bg-slate-800/80 border border-slate-700/80 text-[11px] space-y-1">
                  <div className="text-theme-text font-bold">int* ptr = &a;</div>
                  <div className="text-amber-400">Holds: 0x7ffd58</div>
                  <div className="text-[10px] text-theme-text-muted">*ptr dereferences to 10</div>
                </div>
                <div className="text-[10px] text-theme-text-muted">Auto deallocated when function returns.</div>
              </div>

              {/* Heap Memory */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-blue-500/30 space-y-2">
                <div className="flex items-center justify-between text-blue-400 font-bold border-b border-blue-500/20 pb-1">
                  <span>Heap Segment</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20">Dynamic</span>
                </div>
                <div className="p-2 rounded bg-slate-800/80 border border-slate-700/80 text-[11px] space-y-1">
                  <div className="text-theme-text font-bold">int* arr = new int[4];</div>
                  <div className="text-blue-400">Address: 0x9021a0</div>
                  <div className="flex gap-1 text-[10px] text-blue-300">
                    <span className="px-1 bg-blue-950/60 rounded">[0]</span>
                    <span className="px-1 bg-blue-950/60 rounded">[1]</span>
                    <span className="px-1 bg-blue-950/60 rounded">[2]</span>
                    <span className="px-1 bg-blue-950/60 rounded">[3]</span>
                  </div>
                </div>
                <div className="text-[10px] text-theme-text-muted">Requires manual `delete[]` to prevent memory leaks.</div>
              </div>

              {/* Vector STL Expansion */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between text-amber-400 font-bold border-b border-amber-500/20 pb-1">
                  <span>STL std::vector</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20">Doubling</span>
                </div>
                <div className="p-2 rounded bg-slate-800/80 border border-slate-700/80 text-[11px] space-y-1">
                  <div>Size: 3 / Capacity: 4</div>
                  <div className="text-amber-300">push_back(val) when full:</div>
                  <div className="text-[10px] text-theme-text-muted">Allocates 2x capacity on Heap & moves data in O(1) amortized.</div>
                </div>
                <div className="text-[10px] text-emerald-400">Zero memory leak risk via RAII!</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Workflow className="w-4 h-4 mr-1.5 text-teal-400" /> C++ Variable vs Reference vs Pointer Flowchart
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-800 border border-teal-500/30 w-full sm:w-auto">
                <div className="text-teal-400 font-bold">Original: int x = 42</div>
                <div className="text-[10px] text-theme-text-muted">Stored at &x (0x1000)</div>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-400 rotate-90 sm:rotate-0" />
              <div className="p-2.5 rounded-xl bg-slate-800 border border-emerald-500/30 w-full sm:w-auto">
                <div className="text-emerald-400 font-bold">Pass by Ref: void f(int &r)</div>
                <div className="text-[10px] text-theme-text-muted">Alias to 0x1000 (No copy overhead)</div>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-400 rotate-90 sm:rotate-0" />
              <div className="p-2.5 rounded-xl bg-slate-800 border border-blue-500/30 w-full sm:w-auto">
                <div className="text-blue-400 font-bold">Pointer: int* p = &x</div>
                <div className="text-[10px] text-theme-text-muted">Stores address 0x1000 (*p modifies x)</div>
              </div>
            </div>
          </div>
        );

      case 'time-complexity':
        return viewMode === 'architecture' ? (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Clock className="w-4 h-4 mr-1.5 text-teal-400" /> Big-O Growth Hierarchy & Runtime Bounds
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-mono text-center">
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                <div className="text-emerald-400 font-bold">O(1)</div>
                <div className="text-[10px] text-theme-text-muted mt-1">Constant</div>
                <div className="text-[10px] text-emerald-300">Array Indexing</div>
              </div>
              <div className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40">
                <div className="text-teal-400 font-bold">O(log N)</div>
                <div className="text-[10px] text-theme-text-muted mt-1">Logarithmic</div>
                <div className="text-[10px] text-teal-300">Binary Search</div>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40">
                <div className="text-blue-400 font-bold">O(N)</div>
                <div className="text-[10px] text-theme-text-muted mt-1">Linear</div>
                <div className="text-[10px] text-blue-300">Single Loop</div>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40">
                <div className="text-cyan-400 font-bold">O(N log N)</div>
                <div className="text-[10px] text-theme-text-muted mt-1">Linearithmic</div>
                <div className="text-[10px] text-cyan-300">Merge / Quick</div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40">
                <div className="text-amber-400 font-bold">O(N²)</div>
                <div className="text-[10px] text-theme-text-muted mt-1">Quadratic</div>
                <div className="text-[10px] text-amber-300">Nested Loops</div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40">
                <div className="text-rose-400 font-bold">O(2ᴺ)</div>
                <div className="text-[10px] text-theme-text-muted mt-1">Exponential</div>
                <div className="text-[10px] text-rose-300">Naive Recursion</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-teal-500/20 text-xs text-theme-text-muted">
              <strong className="text-teal-300 font-mono">1-Second Competitive Rule:</strong> A standard C++ CP judge executes ~10⁸ basic CPU operations per second. If N = 10⁵, an O(N²) solution (~10¹⁰ ops) will Time Out (TLE), requiring an O(N log N) or O(N) algorithm.
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Workflow className="w-4 h-4 mr-1.5 text-teal-400" /> Asymptotic Complexity Decision Tree
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="p-3 rounded-xl bg-slate-800/90 border border-teal-500/20">
                <div className="text-teal-300 font-bold mb-1">1. Loop Structure</div>
                <p className="text-[11px] text-theme-text-muted">Is problem size halved each step (n/2)? &rarr; O(log N). Single loop 1..N? &rarr; O(N). Nested loops &rarr; O(N²).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/90 border border-teal-500/20">
                <div className="text-teal-300 font-bold mb-1">2. Recurrence Relation</div>
                <p className="text-[11px] text-theme-text-muted">T(N) = 2T(N/2) + O(N) by Master Theorem &rarr; O(N log N) (Merge Sort divide and conquer).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/90 border border-teal-500/20">
                <div className="text-teal-300 font-bold mb-1">3. Auxiliary Memory</div>
                <p className="text-[11px] text-theme-text-muted">Count only extra memory created during execution (excluding input size). Recursive depth adds stack space.</p>
              </div>
            </div>
          </div>
        );

      case 'arrays':
        return viewMode === 'architecture' ? (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Database className="w-4 h-4 mr-1.5 text-teal-400" /> Contiguous Memory Allocation & Addressing
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/30 font-mono text-xs overflow-x-auto">
              <div className="flex items-center gap-2 min-w-[500px]">
                {[
                  { idx: 0, addr: '0x1000', val: 12 },
                  { idx: 1, addr: '0x1004', val: 25 },
                  { idx: 2, addr: '0x1008', val: 38 },
                  { idx: 3, addr: '0x100C', val: 41 },
                  { idx: 4, addr: '0x1010', val: 59 },
                ].map((cell) => (
                  <div key={cell.idx} className="flex-1 p-2.5 rounded-lg bg-slate-800 border border-teal-500/40 text-center space-y-1">
                    <div className="text-[10px] text-teal-400">arr[{cell.idx}]</div>
                    <div className="text-lg font-black text-theme-text">{cell.val}</div>
                    <div className="text-[10px] text-theme-text-muted">{cell.addr}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[11px] text-teal-300 text-center">
                Formula: Address(arr[i]) = Base_Address + (i * sizeof(int)) &rarr; Instant O(1) Access!
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Workflow className="w-4 h-4 mr-1.5 text-teal-400" /> Two-Pointer Convergence Flowchart
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-teal-500/20 text-center">
              <div className="p-2.5 rounded-lg bg-teal-950/60 border border-teal-500/30">
                <span className="text-teal-400 font-bold">Left = 0</span>
                <p className="text-[10px] text-theme-text-muted">Start at smallest element</p>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-400 hidden sm:block" />
              <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-500/30">
                <span className="text-amber-400 font-bold">Sum = arr[L] + arr[R]</span>
                <p className="text-[10px] text-theme-text-muted">Sum &lt; Target &rarr; L++ | Sum &gt; Target &rarr; R--</p>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-400 hidden sm:block" />
              <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30">
                <span className="text-emerald-400 font-bold">Right = N - 1</span>
                <p className="text-[10px] text-theme-text-muted">Convergences in O(N) linear time</p>
              </div>
            </div>
          </div>
        );

      case 'searching':
        return viewMode === 'architecture' ? (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Split className="w-4 h-4 mr-1.5 text-teal-400" /> Binary Search Interval Halving Architecture
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/30 font-mono text-xs space-y-3">
              <div className="flex justify-between items-center text-xs text-theme-text-muted">
                <span>low = 0</span>
                <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">mid = low + (high - low) / 2</span>
                <span>high = N - 1</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <div className="text-amber-300 font-bold">target &lt; arr[mid]</div>
                  <div className="text-theme-text-muted mt-1">Discard Right Half:</div>
                  <div className="text-teal-400">high = mid - 1</div>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40">
                  <div className="text-emerald-300 font-bold">target == arr[mid]</div>
                  <div className="text-theme-text-muted mt-1">Match Found:</div>
                  <div className="text-emerald-400">return mid</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <div className="text-blue-300 font-bold">target &gt; arr[mid]</div>
                  <div className="text-theme-text-muted mt-1">Discard Left Half:</div>
                  <div className="text-teal-400">low = mid + 1</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Workflow className="w-4 h-4 mr-1.5 text-teal-400" /> Binary Search Algorithm Flowchart
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/20 flex flex-col items-center space-y-2 text-center">
              <div className="px-3 py-1.5 rounded-md bg-teal-950 border border-teal-500/40 text-teal-300">
                Start: Check while (low &le; high)
              </div>
              <div className="w-0.5 h-3 bg-teal-500/40" />
              <div className="px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700 text-theme-text">
                Calculate mid = low + (high - low)/2 (prevents integer overflow)
              </div>
              <div className="w-0.5 h-3 bg-teal-500/40" />
              <div className="px-4 py-2 rounded-md bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                If arr[mid] == target &rarr; Return index. Else halve range and repeat.
              </div>
            </div>
          </div>
        );

      case 'sorting':
        return viewMode === 'architecture' ? (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Split className="w-4 h-4 mr-1.5 text-teal-400" /> Divide & Conquer Tree (Merge Sort / Quick Sort)
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/30 font-mono text-xs space-y-2 text-center">
              <div className="p-2 rounded bg-slate-800 border border-teal-500/40 text-teal-300 font-bold inline-block">
                [38, 27, 43, 3, 9, 82, 10] (Size N)
              </div>
              <div className="flex justify-center gap-12 text-theme-text-muted text-[10px]">
                <span>&swarr; Divide</span>
                <span>Divide &searr;</span>
              </div>
              <div className="flex justify-center gap-6">
                <div className="p-1.5 rounded bg-slate-800 border border-slate-700 text-blue-300">[38, 27, 43]</div>
                <div className="p-1.5 rounded bg-slate-800 border border-slate-700 text-blue-300">[3, 9, 82, 10]</div>
              </div>
              <div className="text-[10px] text-teal-400 py-1">Recursive subdivision until base case (size 1)</div>
              <div className="p-2 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold inline-block">
                Combined & Sorted: [3, 9, 10, 27, 38, 43, 82] &rarr; O(N log N)
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Workflow className="w-4 h-4 mr-1.5 text-teal-400" /> QuickSort Lomuto Partition Flowchart
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-teal-500/20 text-center space-y-2">
              <div className="text-amber-300 font-bold">Pick Pivot = arr[high]</div>
              <p className="text-[11px] text-theme-text-muted">Pointer i = low - 1. Loop j from low to high - 1.</p>
              <p className="text-[11px] text-teal-300">If arr[j] &le; pivot &rarr; i++ and swap(arr[i], arr[j]).</p>
              <div className="text-emerald-400 font-bold">Final step: swap(arr[i + 1], arr[high]). Pivot placed at i + 1!</div>
            </div>
          </div>
        );

      case 'hashing':
        return viewMode === 'architecture' ? (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Table className="w-4 h-4 mr-1.5 text-teal-400" /> Hash Table Architecture with Separate Chaining
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/30 font-mono text-xs space-y-2">
              {[
                { bucket: 0, items: ['Key: "cat" (val: 3)'] },
                { bucket: 1, items: ['Key: "dog" (val: 7)', 'Key: "fox" (val: 2) [Collision Chained]'] },
                { bucket: 2, items: ['[Empty Bucket]'] },
                { bucket: 3, items: ['Key: "lion" (val: 9)'] },
              ].map((row) => (
                <div key={row.bucket} className="flex items-center gap-2">
                  <div className="w-20 px-2 py-1 rounded bg-teal-950/80 border border-teal-500/40 text-teal-400 text-center font-bold">
                    Bucket {row.bucket}
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-theme-text-muted" />
                  <div className="flex-1 flex flex-wrap gap-2">
                    {row.items.map((item, i) => (
                      <span key={i} className={`px-2 py-1 rounded border text-[11px] ${item.includes('Collision') ? 'bg-amber-950/40 border-amber-500/40 text-amber-300' : item.includes('Empty') ? 'text-theme-text-muted border-slate-800' : 'bg-slate-800 border-slate-700 text-theme-text'}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="text-[11px] text-teal-300 text-center pt-2">
                Hash Function: Index = hash(Key) % Bucket_Count &rarr; Average O(1) Search, Insert, and Delete.
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Workflow className="w-4 h-4 mr-1.5 text-teal-400" /> Hash Lookup & Collision Handling Flowchart
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-900 border border-teal-500/20">
                <div className="text-teal-400 font-bold mb-1">Separate Chaining</div>
                <p className="text-[11px] text-theme-text-muted">Each bucket holds a linked list. Collisions append to the list. Simple, never runs out of capacity.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-teal-500/20">
                <div className="text-blue-400 font-bold mb-1">Open Addressing</div>
                <p className="text-[11px] text-theme-text-muted">Probes subsequent slots: Linear `(i + 1) % M` or Quadratic `(i + k²) % M` until an empty slot is located.</p>
              </div>
            </div>
          </div>
        );

      case 'recursion':
        return viewMode === 'architecture' ? (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Layers className="w-4 h-4 mr-1.5 text-teal-400" /> System Call Stack Activation Frames
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/30 font-mono text-xs flex flex-col items-center space-y-2">
              <div className="w-64 p-2 rounded bg-rose-950/70 border border-rose-500/50 text-rose-300 text-center">
                solve(1) &rarr; Base Case Reached (Returns 1)
              </div>
              <div className="text-theme-text-muted text-[10px]">&uarr; Pushed on top of stack</div>
              <div className="w-64 p-2 rounded bg-amber-950/70 border border-amber-500/50 text-amber-300 text-center">
                solve(2) &rarr; Waiting for solve(1)
              </div>
              <div className="w-64 p-2 rounded bg-blue-950/70 border border-blue-500/50 text-blue-300 text-center">
                solve(3) &rarr; Waiting for solve(2)
              </div>
              <div className="w-64 p-2 rounded bg-slate-800 border border-slate-700 text-theme-text text-center font-bold">
                solve(4) &rarr; Initial Call (Root Frame)
              </div>
              <div className="text-[11px] text-teal-300 text-center pt-2">
                Stack Depth = 4. Call stack unwinds and multiplies: 4 &times; 3 &times; 2 &times; 1 = 24.
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Workflow className="w-4 h-4 mr-1.5 text-teal-400" /> Universal Recursive Function Flowchart
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/20 text-center space-y-3">
              <div className="p-2 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300 font-bold">
                1. Base Case: If (condition met) &rarr; Return terminal value (Stops recursion!)
              </div>
              <div className="p-2 rounded bg-teal-950/40 border border-teal-500/30 text-teal-300 font-bold">
                2. Recursive Step: Return work(n) + solve(n - 1)
              </div>
              <p className="text-[11px] text-theme-text-muted">Without a base case, recursion leads to Stack Overflow (SIGSEGV).</p>
            </div>
          </div>
        );

      case 'linked-lists':
        return viewMode === 'architecture' ? (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <GitCommit className="w-4 h-4 mr-1.5 text-teal-400" /> Linked List Node Memory Architecture
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/30 font-mono text-xs overflow-x-auto">
              <div className="flex items-center gap-2 min-w-[550px]">
                <span className="text-teal-400 font-bold">Head &rarr;</span>
                {[
                  { val: 10, next: '0x200' },
                  { val: 20, next: '0x300' },
                  { val: 30, next: '0x400' },
                  { val: 40, next: 'nullptr' },
                ].map((node, i) => (
                  <React.Fragment key={i}>
                    <div className="border border-teal-500/40 rounded-lg overflow-hidden bg-slate-800 flex text-center">
                      <div className="p-2 text-theme-text font-black text-sm bg-slate-700/60 min-w-[36px]">
                        {node.val}
                      </div>
                      <div className="p-2 text-[10px] text-teal-400 border-l border-slate-700 flex items-center">
                        next*
                      </div>
                    </div>
                    {node.next !== 'nullptr' ? (
                      <ArrowRight className="w-4 h-4 text-teal-400" />
                    ) : (
                      <span className="text-rose-400 font-bold text-xs">&rarr; nullptr</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="text-[11px] text-teal-300 text-center pt-3">
                Nodes are dispersed non-contiguously on Heap & connected via pointer addresses.
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Workflow className="w-4 h-4 mr-1.5 text-teal-400" /> In-Place Pointer Reversal Flowchart
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/20 text-center space-y-2">
              <div className="text-amber-300 font-bold">Three Pointers: prev = nullptr, curr = head, next = nullptr</div>
              <div className="p-2 rounded bg-slate-800 text-[11px] text-teal-300">
                Loop: next = curr-&gt;next; curr-&gt;next = prev; prev = curr; curr = next;
              </div>
              <div className="text-emerald-400 font-bold">When curr == nullptr, Head = prev &rarr; O(N) Time, O(1) Space!</div>
            </div>
          </div>
        );

      case 'stacks-queues':
        return viewMode === 'architecture' ? (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Boxes className="w-4 h-4 mr-1.5 text-teal-400" /> Stack (LIFO) vs Queue (FIFO) Structural Architecture
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {/* Stack */}
              <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/30 text-center space-y-2">
                <div className="text-teal-400 font-bold">Stack (Last-In, First-Out)</div>
                <div className="w-32 mx-auto border-x-2 border-b-2 border-teal-500/50 p-2 space-y-1.5 rounded-b-lg bg-slate-800/60">
                  <div className="p-1.5 rounded bg-teal-600 text-white font-bold text-xs">Top: 30</div>
                  <div className="p-1.5 rounded bg-slate-700 text-theme-text text-xs">20</div>
                  <div className="p-1.5 rounded bg-slate-700 text-theme-text text-xs">10</div>
                </div>
                <p className="text-[10px] text-theme-text-muted">Push & Pop occur exclusively at the TOP in O(1) time.</p>
              </div>

              {/* Queue */}
              <div className="p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-center space-y-2">
                <div className="text-blue-400 font-bold">Queue (First-In, First-Out)</div>
                <div className="flex items-center justify-center gap-1.5 p-3 rounded-lg bg-slate-800/60 border border-blue-500/30">
                  <span className="text-[10px] text-rose-400 font-bold">Pop &larr; Front</span>
                  <div className="p-1.5 px-3 rounded bg-blue-600 text-white font-bold text-xs">10</div>
                  <div className="p-1.5 px-3 rounded bg-slate-700 text-theme-text text-xs">20</div>
                  <div className="p-1.5 px-3 rounded bg-slate-700 text-theme-text text-xs">30</div>
                  <span className="text-[10px] text-emerald-400 font-bold">&larr; Push Rear</span>
                </div>
                <p className="text-[10px] text-theme-text-muted">Inserts at Rear, removes from Front in O(1) time.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Workflow className="w-4 h-4 mr-1.5 text-teal-400" /> Monotonic Stack Next Greater Element Flowchart
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/20 text-center space-y-2">
              <div className="text-amber-300 font-bold">Traverse array from right to left (or left to right)</div>
              <p className="text-[11px] text-teal-300">While stack not empty && stack.top() &le; arr[i] &rarr; pop()</p>
              <p className="text-[11px] text-emerald-300">Next Greater is stack.empty() ? -1 : stack.top()</p>
              <div className="text-blue-400 font-bold">Push arr[i] to stack &rarr; Each element pushed & popped at most once: O(N)!</div>
            </div>
          </div>
        );

      case 'trees':
        return viewMode === 'architecture' ? (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Binary className="w-4 h-4 mr-1.5 text-teal-400" /> Binary Search Tree (BST) Hierarchical Architecture
            </div>
            <div className="p-5 rounded-xl bg-slate-900 border border-teal-500/30 font-mono text-xs text-center space-y-3">
              {/* Root */}
              <div className="inline-block p-2.5 px-4 rounded-xl bg-teal-600 text-white font-black text-sm shadow-lg shadow-teal-500/30">
                Root: 50
              </div>
              <div className="flex justify-center gap-24 text-[10px] text-theme-text-muted">
                <span>&swarr; Left &lt; 50</span>
                <span>Right &gt; 50 &searr;</span>
              </div>
              {/* Level 1 */}
              <div className="flex justify-center gap-16">
                <div className="p-2 px-3 rounded-lg bg-blue-600 text-white font-bold">Node: 30</div>
                <div className="p-2 px-3 rounded-lg bg-blue-600 text-white font-bold">Node: 70</div>
              </div>
              <div className="flex justify-center gap-8 text-[9px] text-theme-text-muted">
                <span>&swarr; &nbsp; &searr;</span>
                <span>&swarr; &nbsp; &searr;</span>
              </div>
              {/* Level 2 Leaves */}
              <div className="flex justify-center gap-6 text-[11px]">
                <span className="p-1.5 px-2.5 rounded bg-slate-800 border border-slate-700 text-emerald-300">20</span>
                <span className="p-1.5 px-2.5 rounded bg-slate-800 border border-slate-700 text-emerald-300">40</span>
                <span className="p-1.5 px-2.5 rounded bg-slate-800 border border-slate-700 text-emerald-300">60</span>
                <span className="p-1.5 px-2.5 rounded bg-slate-800 border border-slate-700 text-emerald-300">80</span>
              </div>
              <div className="text-[11px] text-teal-300 text-center pt-2">
                Inorder Traversal (Left &rarr; Root &rarr; Right): [20, 30, 40, 50, 60, 70, 80] &rarr; Always Sorted!
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Workflow className="w-4 h-4 mr-1.5 text-teal-400" /> BST Search & Traversal Flowchart
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-900 border border-teal-500/20">
                <div className="text-teal-400 font-bold mb-1">BST Search Logic</div>
                <p className="text-[11px] text-theme-text-muted">Key == val &rarr; Found! Key &lt; val &rarr; recurse left. Key &gt; val &rarr; recurse right. Height O(log N).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-teal-500/20">
                <div className="text-emerald-400 font-bold mb-1">BFS Level-Order Queue</div>
                <p className="text-[11px] text-theme-text-muted">Push Root to Queue. While queue not empty, pop node, print val, and push non-null left and right children.</p>
              </div>
            </div>
          </div>
        );

      case 'graphs':
        return viewMode === 'architecture' ? (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Share2 className="w-4 h-4 mr-1.5 text-teal-400" /> Graph Representation: Matrix vs Adjacency List
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/30 space-y-2">
                <div className="text-teal-400 font-bold">Adjacency List (Preferred)</div>
                <div className="text-[11px] text-theme-text-muted">vector&lt;int&gt; adj[V];</div>
                <div className="space-y-1 text-[11px]">
                  <div>Node 0 &rarr; [1, 2]</div>
                  <div>Node 1 &rarr; [0, 3]</div>
                  <div>Node 2 &rarr; [0, 3]</div>
                  <div>Node 3 &rarr; [1, 2]</div>
                </div>
                <div className="text-[10px] text-emerald-400 pt-1">Space: O(V + E) — Optimal for Sparse Graphs</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-blue-500/30 space-y-2">
                <div className="text-blue-400 font-bold">Adjacency Matrix</div>
                <div className="text-[11px] text-theme-text-muted">int matrix[V][V];</div>
                <div className="space-y-1 text-[11px]">
                  <div>[0]: [0, 1, 1, 0]</div>
                  <div>[1]: [1, 0, 0, 1]</div>
                  <div>[2]: [1, 0, 0, 1]</div>
                  <div>[3]: [0, 1, 1, 0]</div>
                </div>
                <div className="text-[10px] text-amber-400 pt-1">Space: O(V²) — O(1) Edge Lookup</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Workflow className="w-4 h-4 mr-1.5 text-teal-400" /> Graph Traversal: BFS vs DFS Flowchart
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-900 border border-teal-500/20">
                <div className="text-teal-400 font-bold mb-1">BFS (Queue)</div>
                <p className="text-[11px] text-theme-text-muted">Visits all neighbors level-by-level. Ideal for finding the Shortest Path in unweighted graphs in O(V + E).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-teal-500/20">
                <div className="text-rose-400 font-bold mb-1">DFS (Stack / Recursion)</div>
                <p className="text-[11px] text-theme-text-muted">Explores as deep as possible along each branch before backtracking. Used for cycle detection and topological sort.</p>
              </div>
            </div>
          </div>
        );

      case 'dp':
        return viewMode === 'architecture' ? (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Zap className="w-4 h-4 mr-1.5 text-teal-400" /> Dynamic Programming: Memoization vs Tabulation Table
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/30 font-mono text-xs space-y-3">
              <div className="text-[11px] text-theme-text-muted text-center">
                Fibonacci Tabulation Grid (dp[i] = dp[i-1] + dp[i-2]):
              </div>
              <div className="flex items-center justify-center gap-1.5 overflow-x-auto">
                {[
                  { i: 0, val: 0, base: true },
                  { i: 1, val: 1, base: true },
                  { i: 2, val: 1 },
                  { i: 3, val: 2 },
                  { i: 4, val: 3 },
                  { i: 5, val: 5 },
                  { i: 6, val: 8 },
                ].map((cell) => (
                  <div key={cell.i} className={`p-2 px-3 rounded-lg border text-center ${cell.base ? 'bg-amber-950/60 border-amber-500/40 text-amber-300' : 'bg-slate-800 border-slate-700 text-teal-300'}`}>
                    <div className="text-[10px] text-theme-text-muted">dp[{cell.i}]</div>
                    <div className="text-base font-black">{cell.val}</div>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-emerald-400 text-center">
                Exponential O(2ᴺ) calls collapsed into O(N) linear time and O(1) space with 2 variables!
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-xs font-semibold text-teal-300 flex items-center">
              <Workflow className="w-4 h-4 mr-1.5 text-teal-400" /> 4-Step Dynamic Programming Framework
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-teal-500/20">
                <div className="text-teal-400 font-bold">1. State Definition</div>
                <p className="text-[10px] text-theme-text-muted mt-1">What does dp[i][j] represent?</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-teal-500/20">
                <div className="text-blue-400 font-bold">2. Transition Formula</div>
                <p className="text-[10px] text-theme-text-muted mt-1">How does current state depend on subproblems?</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-teal-500/20">
                <div className="text-amber-400 font-bold">3. Base Cases</div>
                <p className="text-[10px] text-theme-text-muted mt-1">Initialize boundary conditions (dp[0]).</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-teal-500/20">
                <div className="text-emerald-400 font-bold">4. Final Answer</div>
                <p className="text-[10px] text-theme-text-muted mt-1">Return dp[n] or optimize to 1D table.</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/20 text-xs font-mono text-teal-300">
            Interactive diagram & algorithm flowchart for {topicName}.
          </div>
        );
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-theme-card border border-teal-500/30 glass-panel space-y-4">
      {/* Diagram Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme-border pb-3">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-teal-400" />
          <h4 className="text-sm font-bold text-theme-text">
            {topicName} — Visual Architecture & Algorithm Flowchart
          </h4>
        </div>

        {/* View Toggle Buttons */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-900 border border-teal-500/20">
          <button
            onClick={() => setViewMode('architecture')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
              viewMode === 'architecture'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-theme-text-muted hover:text-theme-text'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Architecture Diagram</span>
          </button>
          <button
            onClick={() => setViewMode('flowchart')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
              viewMode === 'flowchart'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-theme-text-muted hover:text-theme-text'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Algorithm Flowchart</span>
          </button>
        </div>
      </div>

      {/* Render Selected Diagram */}
      <div className="pt-1">
        {renderDiagramContent()}
      </div>
    </div>
  );
};
