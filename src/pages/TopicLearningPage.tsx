import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Code2, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Timer, 
  Copy, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight, 
  Sparkles,
  Layers,
  Cpu,
  RotateCcw,
  BookMarked,
  X,
  ExternalLink,
  Pause,
  ChevronDown
} from 'lucide-react';
import { dsaTopics, dsaProblems } from '../data/dsaData';
import { detailedTopicData } from '../data/dsaTopicDetails';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { TopicDiagram } from '../components/TopicDiagram';
import { SearchingLearningView } from '../components/SearchingLearningView';
import { HashingLearningView } from '../components/HashingLearningView';
import { SortingLearningView } from '../components/SortingLearningView';
import { LinkedListLearningView } from '../components/LinkedListLearningView';
import { StackQueueLearningView } from '../components/StackQueueLearningView';
import { RecursionLearningView } from '../components/RecursionLearningView';
import { TreesLearningView } from '../components/TreesLearningView';
import { SubtopicCheckbox } from '../components/SubtopicCheckbox';
import { TopicProgressHeader } from '../components/TopicProgressHeader';

interface TopicTheoryNote {
  definition: string;
  howItWorks: string;
  keyProperties: string[];
  applications: string[];
}

interface SubtopicDetail {
  title: string;
  explanation: string;
  codeSnippet: string;
  keyRule: string;
}

const topicTheoryNotes: Record<string, TopicTheoryNote> = {
  'cpp-basics': {
    definition:
      'C++ is a high-performance, statically typed general-purpose programming language developed by Bjarne Stroustrup. In Data Structures and Algorithms, C++ offers precise hardware control via direct memory pointers and references, alongside zero-overhead abstractions in the Standard Template Library (STL).',
    howItWorks:
      'Variables exist across distinct memory regions: Stack memory (automatic local variables, stack frames, fast LIFO allocation) and Heap memory (dynamic memory allocated via new and released via delete). References (&) act as non-null aliases to existing memory locations, enabling O(1) pass-by-reference without duplicating massive vectors or string buffers.',
    keyProperties: [
      'Pass-by-Reference (void f(vector<int> &v)) prevents expensive O(N) memory copies and runs in O(1) space.',
      'std::vector manages dynamic array resizing on the heap by doubling its capacity whenever size reaches capacity, ensuring amortized O(1) push_back.',
      'Pointers (*) store raw hexadecimal memory addresses and form the structural foundation of Linked Lists, Trees, and Graphs.',
      'Fast I/O optimization (ios_base::sync_with_stdio(false); cin.tie(NULL);) unties C and C++ standard streams, drastically speeding up competitive programming input processing.',
      'Smart pointers (std::unique_ptr, std::shared_ptr) implement RAII (Resource Acquisition Is Initialization) to eliminate dangling pointers and memory leaks.'
    ],
    applications: [
      'Competitive programming, low-latency execution engines, and game physics engines',
      'Operating systems memory allocation, device drivers, and embedded systems',
      'Implementing low-level pointer data structures (Doubly Linked Lists, AVL Trees, Heaps)',
      'High-throughput database engines (MySQL, PostgreSQL storage layer written in C/C++)'
    ]
  },
  'time-complexity': {
    definition:
      'Time Complexity measures the quantitative growth rate of elementary operations executed by an algorithm as a mathematical function of input size N. It characterizes computational efficiency asymptotically without being distorted by specific CPU clock speeds or machine hardware.',
    howItWorks:
      'Asymptotic notation analyzes the behavior of functions as N approaches infinity by discarding constant multipliers and lower-order terms. Big-O (O) represents the tight upper bound (worst-case), Big-Omega represents the lower bound (best-case), and Big-Theta represents the exact bound where upper and lower rates coincide.',
    keyProperties: [
      'O(1) Constant Time: Operations independent of input size (array indexing, hash table lookups, arithmetic).',
      'O(log N) Logarithmic Time: Algorithms that divide the remaining problem domain by a constant factor in each iteration (Binary Search).',
      'O(N) Linear Time: Single-pass traversal over all N items (Linear Search, finding max element, prefix sum).',
      'O(N log N) Linearithmic Time: Optimal comparison-based divide-and-conquer sorting (Merge Sort, QuickSort average case).',
      'O(N^2) Quadratic Time: Double nested loops iterating across N items (Bubble Sort, brute-force pair comparisons).',
      'O(2^N) Exponential Time: Combinatorial recursion without memoization (Generating all power set subsets).'
    ],
    applications: [
      'Predicting if an algorithm will terminate within a 1.0 second CPU limit (~10^8 operations in C++)',
      'Choosing optimal algorithmic paradigms (Divide & Conquer, Greedy, or Dynamic Programming)',
      'Evaluating trade-offs between processing time and auxiliary memory space consumption',
      'Database query optimization and index plan evaluation'
    ]
  },
  'arrays': {
    definition:
      'An Array is a foundational linear data structure comprising elements of identical data types allocated in strictly contiguous and sequential memory addresses. Elements are accessed in constant O(1) time using zero-indexed offsets from the base memory address.',
    howItWorks:
      'Because all elements occupy consecutive memory cells, the physical memory address of any element arr[i] is computed instantaneously by the hardware CPU via the formula: Base_Address + (i * sizeof(element)). This layout provides exceptional spatial cache locality, allowing CPU cache lines to prefetch subsequent elements into L1/L2 caches.',
    keyProperties: [
      'Random Access: Immediate O(1) element retrieval and modification by index.',
      'Contiguous Storage: High spatial cache locality provides optimal hardware traversal speeds.',
      'Two-Pointer Technique: Oppositely converging or same-direction sliding pointers reduce search spaces in O(N).',
      'Sliding Window Pattern: Maintains dynamic subarray windows for substring and subarray optimization in linear time.',
      'Prefix Sum Arrays: Precalculates cumulative totals in O(N) to answer range sum queries in O(1).'
    ],
    applications: [
      'Dense mathematical matrices, lookup tables, and signal processing buffers',
      'Underlying sequential storage for Vectors, Heaps, and Hash Table bucket arrays',
      'Subarray optimization problems (Kadane’s Maximum Subarray, Trapping Rain Water)',
      'Image pixel representations and audio frame processing buffers'
    ]
  },
  'searching': {
    definition:
      'Searching algorithms inspect or retrieve data stored across data structures. They are categorized into Sequential Search (Linear Search checking unsorted items in O(N)) and Interval Search (Binary Search eliminating half of a monotonic range in O(log N)).',
    howItWorks:
      'Linear Search tests each item sequentially until a match or array boundary is encountered. Binary Search requires a sorted or monotonic search space: it computes the midpoint mid = low + (high - low) / 2 and evaluates whether target equals arr[mid]. If target is smaller, the upper search boundary contracts to mid - 1; if larger, low advances to mid + 1.',
    keyProperties: [
      'Linear Search: Time O(N), Space O(1) — operates on arbitrary unsorted datasets.',
      'Binary Search: Time O(log N), Space O(1) — requires sorted elements or monotonic conditions.',
      'Lower Bound & Upper Bound: std::lower_bound returns first element >= target; upper_bound returns first element > target in O(log N).',
      'Rotated Sorted Search: Identifies which half of an array is cleanly sorted to route search branches.',
      'Binary Search on Answer: Solves optimization problems by binary searching the monotonic feasibility answer space.'
    ],
    applications: [
      'B-Tree and database index search engines',
      'Finding bounds and duplicate occurrences in sorted streams',
      'Capacity optimization (Koko Eating Bananas, Capacity to Ship Packages, Painter Partition)',
      'Spell checkers and dictionary lookup algorithms'
    ]
  },
  'sorting': {
    definition:
      'Sorting arranges elements into a monotonic sequence — either non-decreasing or non-increasing order. Sorting algorithms are classified into Comparison-based (Merge Sort, QuickSort, Heapsort) and Non-comparison-based (Counting Sort, Radix Sort).',
    howItWorks:
      'Comparison-based sorts determine order solely by comparing pairs of items and are mathematically proven to require Omega(N log N) comparisons in the worst case. Elementary sorts (Bubble, Selection, Insertion) swap items in O(N^2) time. Divide-and-conquer algorithms (Merge Sort, QuickSort) partition the dataset recursively and reconstruct sorted sequences.',
    keyProperties: [
      'In-Place Sorting: Executes with O(1) auxiliary memory (QuickSort, HeapSort, Insertion Sort).',
      'Stability: Preserves the relative order of duplicate elements (Merge Sort, Insertion Sort).',
      'Merge Sort: Guarantees strict O(N log N) worst-case runtime using O(N) auxiliary merge buffers.',
      'QuickSort: Achieves O(N log N) average runtime with minimal cache overhead via Lomuto or Hoare partitioning.',
      'Counting Sort: Achieves linear O(N + K) runtime when element values fall within a bounded integer range K.'
    ],
    applications: [
      'Preparing datasets for fast O(log N) Binary Search and two-pointer scans',
      'Interval merging (Meeting Rooms, Merge Intervals) and Greedy job scheduling',
      'Database query ordering (ORDER BY) and e-commerce ranking pipelines',
      'Graphics rendering z-buffer depth ordering'
    ]
  },
  'hashing': {
    definition:
      'Hashing maps keys into compact numerical indices in a Hash Table using a deterministic Hash Function. When properly configured, hashing achieves average O(1) constant-time insertion, deletion, and retrieval.',
    howItWorks:
      'A hash function hashes an input key into an integer index: index = hash(key) % table_size. When two keys yield identical indices (a Collision), it is resolved via Separate Chaining (linked lists or balanced trees at each bucket) or Open Addressing (probing consecutive slots using linear or quadratic offsets).',
    keyProperties: [
      'Average Time Complexity: O(1) average for search, insert, and delete in std::unordered_map / unordered_set.',
      'Load Factor (alpha = n / m): Ratio of stored entries to available buckets; triggers doubling and rehashing when threshold is crossed.',
      'Collision Resolution: Separate Chaining attaches nodes to a linked chain; Open Addressing finds the next empty slot.',
      'Ordered vs Unordered: std::map uses Red-Black Trees with O(log N) access; std::unordered_map uses Hash Tables with average O(1).',
      'Custom Hasher: Required for composite keys (e.g. std::pair<int, int>) in C++ unordered containers.'
    ],
    applications: [
      'Instant frequency counting, anagram verification, and duplicate item deduplication',
      'Two-Sum and Subarray Sum Equals K complement lookups in O(N) overall time',
      'In-memory caches (LRU Cache), runtime symbol tables, and distributed key-value stores',
      'Cryptographic signatures and password verification'
    ]
  },
  'recursion': {
    definition:
      'Recursion is an algorithmic methodology where a function calls itself directly or indirectly to solve smaller instances of the identical problem. Every correct recursive solution comprises one or more Base Cases and a Recursive Step that reduces problem size.',
    howItWorks:
      'Each invocation places a new Activation Record (frame) onto the system Call Stack containing arguments, local variables, and return program addresses. Calls continue descending until a Base Case triggers, whereupon frames pop sequentially and return computed values up the call stack tree.',
    keyProperties: [
      'Base Condition: Essential stopping rule that halts recursion and prevents stack overflow errors.',
      'Call Stack Memory: Maximum recursion depth D consumes O(D) auxiliary stack memory.',
      'Recursion Tree: Visual state space tree depicting branching factor and overlapping subproblems.',
      'Backtracking Pattern: Choose an option -> recursively explore consequences -> unchoose (undo state) to inspect alternative branches.',
      'Tail Recursion: When the recursive call is the final statement in the function, enabling tail-call frame optimization.'
    ],
    applications: [
      'Tree and Graph traversals (DFS Preorder, Inorder, Postorder)',
      'Divide and Conquer paradigms (Merge Sort, QuickSort, Binary Search)',
      'Combinatorial problem spaces: Subsets, Permutations, N-Queens, Sudoku Solver',
      'Parsing recursive syntax trees in AST parsers and JSON interpreters'
    ]
  },
  'linked-lists': {
    definition:
      'A Linked List is a linear data structure wherein elements (Nodes) are not stored in contiguous memory addresses; rather, nodes are dynamically allocated on the heap and linked together using pointers. Each node encapsulates data alongside one or more pointer addresses.',
    howItWorks:
      'Access commences from a designated Head pointer. In a Singly Linked List, each node maintains a single next pointer. In a Doubly Linked List, each node maintains both next and prev pointers. In a Circular Linked List, the terminal node references the Head node instead of nullptr.',
    keyProperties: [
      'Dynamic Memory Allocation: Expands and contracts seamlessly at runtime without contiguous reallocation.',
      'O(1) Insertion & Deletion: Inserting or removing nodes at the head or given node pointer takes constant O(1) time.',
      'Sequential Pointer Traversal: Accessing the K-th node necessitates traversing K pointer hops from Head in O(N) time.',
      'Floyd’s Cycle Algorithm: Uses Slow (1x) and Fast (2x) pointers to detect cycles and identify cycle entry points in O(N) time and O(1) space.',
      'In-Place Reversal: Reverses list orientation in O(N) time and O(1) space using three pointers (prev, curr, next).'
    ],
    applications: [
      'Implementing dynamic Stacks, Queues, and Hash Table separate chaining buckets',
      'Web browser backward/forward history navigation via Doubly Linked Lists',
      'Operating system free-list memory block tracking and LRU Cache structures',
      'Undo/Redo buffers in word processors and productivity tools'
    ]
  },
  'stacks-queues': {
    definition:
      'Stacks and Queues are restricted-access linear Abstract Data Types (ADTs) governed by strict insertion and removal disciplines. A Stack operates on LIFO (Last-In, First-Out), whereas a Queue operates on FIFO (First-In, First-Out).',
    howItWorks:
      'In a Stack, both push(x) and pop() take place exclusively at the Top pointer in O(1) time. In a Queue, enqueue(x) inserts at the Rear pointer while dequeue() extracts from the Front pointer in O(1) time. Deques (Double-Ended Queues) allow insertions and deletions at both extremities.',
    keyProperties: [
      'Stack Operations: push(), pop(), top(), and empty() execute in strict O(1) time.',
      'Queue Operations: push(), pop(), front(), and empty() execute in strict O(1) time.',
      'Monotonic Stack: Maintains elements in monotonic ascending or descending order to compute Next Greater/Smaller Elements in O(N).',
      'Sliding Window Deque: Preserves relevant window indices monotonically to extract sliding window maximums in O(N).',
      'Balanced Parentheses: Utilizes a stack to validate nested scopes and arithmetic expressions in O(N).'
    ],
    applications: [
      'Function call stack management and recursive execution engines',
      'Arithmetic expression evaluation and Infix to Postfix/Prefix conversion',
      'Breadth-First Search (BFS) frontier queues and operating system CPU round-robin scheduling',
      'Monotonic stack optimization in stock span, histogram area, and daily temperatures'
    ]
  },
  'trees': {
    definition:
      'A Tree is a non-linear, hierarchical data structure comprising nodes connected by edges, originating from a solitary Root node. In a Binary Tree, every node possesses at most two children: Left Child and Right Child.',
    howItWorks:
      'In a Binary Search Tree (BST), every node adheres to the BST invariant: all keys in its left subtree are strictly less than node.val, and all keys in its right subtree are strictly greater than node.val. Self-balancing binary trees (AVL Trees, Red-Black Trees) perform rotations to preserve height at O(log N).',
    keyProperties: [
      'DFS Traversals: Preorder (Root-Left-Right), Inorder (Left-Root-Right), Postorder (Left-Right-Root).',
      'BST Inorder Invariant: An Inorder traversal of any valid Binary Search Tree generates a strictly sorted sequence in O(N).',
      'BFS Level-Order Traversal: Visits nodes level by level using a FIFO Queue in O(N) time and O(W) maximum width space.',
      'Tree Height & Balance: A balanced tree with N nodes maintains height O(log N), guaranteeing O(log N) searches.',
      'Lowest Common Ancestor (LCA): Identifies the deepest common ancestor shared between two nodes.'
    ],
    applications: [
      'Hierarchical data representation: HTML DOM trees, JSON object trees, file system directories',
      'Fast ordered dictionaries and sets (C++ std::map and std::set implemented via Red-Black Trees)',
      'Priority Queues and Heaps for job scheduling and Dijkstra’s algorithm',
      'Prefix search Tries for auto-completion and Huffman coding data compression'
    ]
  },
  'graphs': {
    definition:
      'A Graph is a non-linear network data structure consisting of a finite set of Vertices (Nodes) V and a collection of Edges E connecting pairs of vertices, represented as G = (V, E). Graphs may be Directed or Undirected, and Weighted or Unweighted.',
    howItWorks:
      'Graphs are represented in code via an Adjacency Matrix (a V x V 2D matrix offering O(1) edge lookups with O(V^2) memory) or an Adjacency List (an array of vectors offering O(V + E) space). Traversal systematically explores vertices while marking a visited array to prevent infinite loops over cycles.',
    keyProperties: [
      'Breadth-First Search (BFS): Uses a FIFO Queue to traverse level-by-level, finding shortest paths in unweighted graphs in O(V + E).',
      'Depth-First Search (DFS): Uses recursion/stack to explore as deep as possible, detecting cycles and components in O(V + E).',
      'Dijkstra’s Algorithm: Utilizes a Min-Heap (priority_queue) to discover single-source shortest paths in non-negative graphs in O((V + E) log V).',
      'Topological Sorting: Linear ordering of vertices in Directed Acyclic Graphs (DAGs) using Kahn’s Algorithm or DFS post-order.',
      'Disjoint Set Union (DSU / Union-Find): Employs Path Compression and Union by Rank to manage dynamic connectivity in near-constant time.'
    ],
    applications: [
      'GPS navigation routing (Google Maps) and network packet routing',
      'Social network friend recommendations and graph community detection',
      'Course prerequisite resolution and build system compilation dependencies (Make, CMake)',
      'Web search crawling and PageRank authority algorithms'
    ]
  },
  'dp': {
    definition:
      'Dynamic Programming (DP) is an algorithmic optimization technique that solves complex problems by breaking them down into simpler, overlapping subproblems and memoizing their solutions. It avoids redundant re-computation of subproblems encountered in plain recursion.',
    howItWorks:
      'A problem is solvable via DP if it possesses: (1) Overlapping Subproblems — smaller subproblems are computed repeatedly, and (2) Optimal Substructure — the global optimal solution can be formulated from optimal solutions to subproblems. DP employs either Top-Down Memoization or Bottom-Up Tabulation.',
    keyProperties: [
      'Top-Down with Memoization: Natural recursive structure augmented with a lookup table (dp array) caching computed results.',
      'Bottom-Up Tabulation: Iterative table computation starting from base cases, eliminating recursive call stack overhead.',
      'Space Optimization: Rolling array or two-variable reduction when state i depends strictly on states i-1 or i-2.',
      '0/1 Knapsack Pattern: Decision making between including or excluding items subject to capacity constraints.',
      'Interval & Matrix DP: Solving over contiguous ranges (Matrix Chain Multiplication, Longest Palindromic Substring).'
    ],
    applications: [
      'Knapsack resource allocation, portfolio optimization, and budget allocation',
      'String diff engines (Git diff), Levenshtein edit distance, and DNA sequence alignment',
      'Shortest path routing algorithms with negative weights (Bellman-Ford, Floyd-Warshall)',
      'Game theory decision strategies and speech recognition algorithms'
    ]
  }
};

// Rich Subtopic Deep-Dive dictionary for all topics
const subtopicDeepDives: Record<string, SubtopicDetail[]> = {
  'cpp-basics': [
    {
      title: 'C++ Introduction and Program Structure',
      explanation: 'Every C++ program begins execution in the main() function. Programs include standard libraries via preprocessor directives (#include <iostream>), organize symbols with namespaces (using namespace std;), and return an integer exit code (return 0; for successful termination).',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\n// Program execution begins at main()\nint main() {\n    cout << "Welcome to C++ Fundamentals & DSA!" << endl;\n    return 0; // 0 indicates successful execution\n}',
      keyRule: 'Execution strictly begins at main(); returning 0 signals clean termination to the operating system.'
    },
    {
      title: 'Variables, Constants and Data Types',
      explanation: 'C++ provides built-in primitive types: int (4 bytes), long long (8 bytes, essential for competitive programming to prevent 32-bit overflow), float, double, char, and bool. The const keyword creates immutable constants evaluated safely at compile time.',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int age = 20;\n    long long bigNumber = 1000000000000LL; // 64-bit integer\n    const double PI = 3.1415926535;\n    bool isReady = true;\n    char grade = \'A\';\n    cout << "Size of int: " << sizeof(age) << " bytes\\n";\n    return 0;\n}',
      keyRule: 'Always use long long when integer sums or products can exceed 2 * 10^9 to prevent arithmetic overflow.'
    },
    {
      title: 'Input/Output (cin, cout)',
      explanation: 'cin reads whitespace-delimited tokens from standard input (stdin), and cout writes to standard output (stdout). Fast I/O desynchronization unties C stdio from C++ streams, speeding up large scale input by up to 10x.',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Fast I/O optimization for DSA\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int n;\n    if (cin >> n) {\n        cout << "Read value: " << n << "\\n";\n    }\n    return 0;\n}',
      keyRule: 'Prefer "\\n" over std::endl in high-frequency loops; endl forces an expensive buffer flush on each call.'
    },
    {
      title: 'Operators and Type Casting',
      explanation: 'Includes arithmetic (+, -, *, /, %), relational (==, !=, <, >), logical (&&, ||, !), and bitwise (&, |, ^, ~, <<, >>) operators. Use static_cast<type>() for safe, explicit type conversions.',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 7, b = 2;\n    // Integer division yields 3 without casting\n    double result = static_cast<double>(a) / b; // 3.5\n    int bitShift = (1 << 4); // 16 (2^4)\n    cout << "Casting result: " << result << ", Bit shift: " << bitShift << "\\n";\n    return 0;\n}',
      keyRule: 'Dividing two integers performs truncating integer division; cast at least one operand to double for exact floating results.'
    },
    {
      title: 'Conditional Statements (if-else, switch)',
      explanation: 'Enables conditional execution flows. if, else-if, and else evaluate arbitrary boolean expressions, while switch statements jump directly to integral or enumeration constant match cases.',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int score = 85;\n    if (score >= 90) cout << "Grade A\\n";\n    else if (score >= 80) cout << "Grade B\\n";\n    else cout << "Grade C\\n";\n\n    char op = \'+\';\n    switch (op) {\n        case \'+\': cout << "Addition\\n"; break;\n        case \'-\': cout << "Subtraction\\n"; break;\n        default:  cout << "Unknown\\n"; break;\n    }\n    return 0;\n}',
      keyRule: 'Always insert break statements inside each switch case to prevent unintended fall-through execution.'
    },
    {
      title: 'Loops (for, while, do-while)',
      explanation: 'Control structures for repeated execution. The for loop is optimal for counted iterations; while loop repeats while a condition holds; do-while executes the loop body at least once before testing the condition.',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // for loop\n    for (int i = 0; i < 3; i++) cout << i << " ";\n    // while loop\n    int count = 3;\n    while (count > 0) { count--; }\n    // do-while\n    int val = 0;\n    do { val++; } while (val < 1);\n    return 0;\n}',
      keyRule: 'Verify that loop variables consistently advance towards termination to prevent infinite loops.'
    },
    {
      title: 'Break and Continue',
      explanation: 'break exits the innermost loop or switch statement immediately. continue skips the remaining statements of the current iteration and advances directly to the loop condition evaluation or increment.',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i % 2 == 0) continue; // Skip even numbers\n        if (i > 7) break;         // Terminate when i > 7\n        cout << i << " ";         // Output: 1 3 5 7\n    }\n    return 0;\n}',
      keyRule: 'In nested loops, break and continue affect only the innermost loop in which they are located.'
    },
    {
      title: 'Nested Loops and Pattern Printing',
      explanation: 'Placing a loop inside another loop creates 2D iteration structures, essential for matrices, grids, and geometric pattern printing algorithms.',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = 4;\n    for (int row = 1; row <= n; row++) {\n        for (int col = 1; col <= row; col++) {\n            cout << "* ";\n        }\n        cout << "\\n";\n    }\n    return 0;\n}',
      keyRule: 'A loop of N iterations nested inside another of N iterations executes in O(N^2) quadratic time complexity.'
    },
    {
      title: 'Functions and Function Overloading',
      explanation: 'Functions modularize logic into reusable units with declared return types and parameters. C++ allows multiple functions with the same name if their parameter signatures (types or counts) differ.',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nint add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }\nint add(int a, int b, int c) { return a + b + c; }\n\nint main() {\n    cout << add(3, 4) << " " << add(2.5, 3.5) << " " << add(1, 2, 3) << "\\n";\n    return 0;\n}',
      keyRule: 'Overload resolution is determined at compile time based strictly on parameter signatures, not return types.'
    },
    {
      title: 'Pass by Value and Pass by Reference',
      explanation: 'Pass-by-value copies the argument into the function stack frame. Pass-by-reference (&) passes an alias to the original object, running in O(1) time without copying memory.',
      codeSnippet: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid swapRef(int &a, int &b) {\n    int temp = a; a = b; b = temp;\n}\n\nvoid printFast(const vector<int> &v) { // Zero-copy const reference\n    for (int x : v) cout << x << " ";\n}\n\nint main() {\n    int x = 10, y = 20;\n    swapRef(x, y);\n    cout << "x=" << x << " y=" << y << "\\n";\n    return 0;\n}',
      keyRule: 'Always pass large objects (vector, string) by const reference (const T&) to prevent expensive O(N) copy overhead.'
    },
    {
      title: 'Recursion Basics',
      explanation: 'A function that calls itself to break down a problem into smaller identical subproblems until reaching a base case. Every recursive call pushes an execution frame onto the call stack.',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nlong long factorial(int n) {\n    if (n <= 1) return 1; // Base case: terminates recursion\n    return n * factorial(n - 1); // Recursive call\n}\n\nint main() {\n    cout << "5! = " << factorial(5) << "\\n";\n    return 0;\n}',
      keyRule: 'Every recursive function must have a verified base case; missing or unreachable base cases trigger fatal Stack Overflow.'
    },
    {
      title: 'Scope and Lifetime of Variables',
      explanation: 'Local variables have block scope ({}) and are destroyed automatically upon block exit. Global variables persist for the entire program run. static local variables retain their value across consecutive function calls.',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nvoid hitCounter() {\n    static int count = 0; // Retains value across invocations\n    count++;\n    cout << "Hit count: " << count << "\\n";\n}\n\nint main() {\n    hitCounter(); // 1\n    hitCounter(); // 2\n    return 0;\n}',
      keyRule: 'Never return a pointer or reference to an automatic local variable, as its stack memory is freed upon function exit.'
    },
    {
      title: 'Arrays (1D and 2D)',
      explanation: 'Fixed-size collections of identical elements stored contiguously in memory. 1D arrays allow O(1) random access via base address + offset. 2D arrays represent grids stored in row-major layout.',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    int grid[2][3] = { {1, 2, 3}, {4, 5, 6} };\n    cout << "arr[2] = " << arr[2] << "\\n";\n    cout << "grid[1][2] = " << grid[1][2] << "\\n";\n    return 0;\n}',
      keyRule: 'Raw C++ arrays do not perform bounds checking; accessing out-of-range indices results in dangerous undefined behavior.'
    },
    {
      title: 'Strings and Character Arrays',
      explanation: 'std::string is a dynamic character sequence with helper methods like .length(), .substr(), .push_back(), and concatenation (+). C-strings are null-terminated character arrays (char str[] = "hello").',
      codeSnippet: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s = "Algorithmic";\n    s += "_Coding";\n    cout << "Length: " << s.length() << "\\n";\n    cout << "Substr: " << s.substr(0, 4) << "\\n"; // "Algo"\n    return 0;\n}',
      keyRule: 's.substr(pos, len) creates a new string in O(len) time; avoid repeated substr calls inside quadratic loops.'
    },
    {
      title: 'Pointers and References',
      explanation: 'A pointer stores the memory address of another variable and uses * to dereference. A reference is an alias that must be initialized when created and cannot be null or rebound.',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int val = 42;\n    int* ptr = &val; // ptr stores address of val\n    int& ref = val;  // ref is an alias of val\n    *ptr = 99;       // Modifies val to 99\n    ref = 100;       // Modifies val to 100\n    cout << "val=" << val << " *ptr=" << *ptr << " ref=" << ref << "\\n";\n    return 0;\n}',
      keyRule: 'Always verify pointers are not nullptr before dereferencing to prevent fatal Segmentation Fault crashes.'
    },
    {
      title: 'Dynamic Memory Allocation (new, delete)',
      explanation: 'Allocates memory at runtime on the Heap. Use new for single elements and new[] for arrays. Always deallocate with delete and delete[] to prevent memory leaks.',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int* dynamicArr = new int[5]{10, 20, 30, 40, 50};\n    cout << "First elem: " << dynamicArr[0] << "\\n";\n    delete[] dynamicArr; // Release heap memory\n    dynamicArr = nullptr; // Eliminate dangling pointer\n    return 0;\n}',
      keyRule: 'Always pair new[] with delete[] and set pointers to nullptr immediately after deallocation.'
    },
    {
      title: 'Structures (struct)',
      explanation: 'User-defined types combining multiple variables of varying types. In C++, struct members are public by default. Widely utilized for Linked List and Tree nodes in DSA.',
      codeSnippet: '#include <iostream>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nint main() {\n    TreeNode* root = new TreeNode(10);\n    root->left = new TreeNode(5);\n    cout << "Root: " << root->val << ", Left: " << root->left->val << "\\n";\n    delete root->left;\n    delete root;\n    return 0;\n}',
      keyRule: 'Implement struct constructors to initialize all pointers to nullptr by default.'
    },
    {
      title: 'Vectors and Pairs',
      explanation: 'std::vector is a dynamic array that handles resizing automatically with amortized O(1) push_back. std::pair binds two values (e.g. node and edge weight) accessible via .first and .second.',
      codeSnippet: '#include <iostream>\n#include <vector>\n#include <utility>\nusing namespace std;\n\nint main() {\n    vector<pair<int, int>> graphEdgeList;\n    graphEdgeList.push_back({1, 10}); // {node, weight}\n    graphEdgeList.push_back({2, 25});\n    for (const auto& edge : graphEdgeList) {\n        cout << "Node: " << edge.first << " Weight: " << edge.second << "\\n";\n    }\n    return 0;\n}',
      keyRule: 'Use reserve(N) on std::vector before batch insertions to prevent multiple reallocation copies.'
    },
    {
      title: 'Basic STL Containers',
      explanation: 'Core C++ Standard Template Library data structures: vector, string, stack (LIFO), queue (FIFO), priority_queue (heap), set (ordered balanced BST), and unordered_map (hash table O(1) lookups).',
      codeSnippet: '#include <iostream>\n#include <stack>\n#include <queue>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    stack<int> st; st.push(10); st.push(20);\n    queue<int> q;  q.push(1);  q.push(2);\n    unordered_map<string, int> freq;\n    freq["apple"] = 3;\n    cout << "Top stack: " << st.top() << ", Front queue: " << q.front() << "\\n";\n    return 0;\n}',
      keyRule: 'Select the right container for the complexity needed: unordered_map for O(1) average lookup, map for sorted traversal.'
    },
    {
      title: 'Classes and Objects',
      explanation: 'Foundational Object-Oriented Programming construct. Classes encapsulate private data members and public member methods, enforcing data hiding and clean algorithmic interfaces.',
      codeSnippet: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass CustomStack {\nprivate:\n    vector<int> elements;\npublic:\n    void push(int x) { elements.push_back(x); }\n    void pop() { if (!elements.empty()) elements.pop_back(); }\n    int top() const { return elements.back(); }\n    bool empty() const { return elements.empty(); }\n};\n\nint main() {\n    CustomStack cs;\n    cs.push(42);\n    cout << "Stack top: " << cs.top() << "\\n";\n    return 0;\n}',
      keyRule: 'Keep data members private and expose only verified member methods to preserve class invariants.'
    },
    {
      title: 'Basic Debugging and Problem Solving',
      explanation: 'Techniques for diagnosing algorithmic errors: boundary test-case design, edge cases (empty input, single element, negative numbers, extreme constraints), assert checks, and structured debug logging.',
      codeSnippet: '#include <iostream>\n#include <cassert>\nusing namespace std;\n\n#define DEBUG(x) cerr << #x << " = " << (x) << "\\n"\n\nint binarySearch(int arr[], int n, int target) {\n    int l = 0, r = n - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2; // Avoids integer overflow (l + r) / 2\n        DEBUG(mid);\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int a[] = {2, 4, 6, 8, 10};\n    assert(binarySearch(a, 5, 6) == 2);\n    cout << "All debug assertions passed!\\n";\n    return 0;\n}',
      keyRule: 'Always calculate mid as l + (r - l) / 2 to avoid overflow when l and r are large positive integers.'
    }
  ],
  'time-complexity': [
    {
      title: 'Asymptotic Bounds (Big-O, Omega, Theta)',
      explanation: 'Big-O represents the worst-case upper bound. Big-Omega represents the best-case lower bound. Big-Theta represents the tight asymptotic bound when upper and lower bounds coincide.',
      codeSnippet: '// Linear Search:\n// Best case: O(1) (element at index 0) -> Omega(1)\n// Worst case: O(N) (element at end or not found) -> O(N)',
      keyRule: 'Interview questions evaluate the worst-case Big-O runtime upper bound.'
    },
    {
      title: 'Dominant Terms & Dropping Constants',
      explanation: 'When N is large, lower order terms become negligible: 5N^2 + 100N + 500 simplifies to O(N^2). Constant multipliers do not alter asymptotic growth rates.',
      codeSnippet: '// 2N loop operations simplify to O(N)\nfor(int i = 0; i < N; i++) { /* work */ }\nfor(int i = 0; i < N; i++) { /* work */ }',
      keyRule: 'Always isolate the highest power of N that dominates execution when N -> infinity.'
    },
    {
      title: 'Nested Loops vs Single Pass',
      explanation: 'A loop nested inside another loop that both execute up to N yields O(N * N) = O(N^2). Sequential independent loops sum up: O(N) + O(N) = O(N).',
      codeSnippet: '// O(N^2):\nfor(int i = 0; i < n; i++) {\n    for(int j = 0; j < n; j++) { /* O(1) */ }\n}',
      keyRule: 'Beware of hidden inner operations: calling find() or substr() inside a loop creates an O(N^2) trap.'
    },
    {
      title: 'Master Theorem for Recurrences',
      explanation: 'The Master Theorem solves recurrences of the form T(N) = aT(N/b) + f(N). For Merge Sort, a = 2, b = 2, f(N) = O(N), yielding T(N) = O(N log N).',
      codeSnippet: '// Binary Search: T(N) = T(N/2) + O(1) => O(log N)\n// Merge Sort: T(N) = 2T(N/2) + O(N) => O(N log N)',
      keyRule: 'Check if the divide factor b and subproblem count a match Master Theorem cases.'
    },
    {
      title: 'Auxiliary Space vs Total Space',
      explanation: 'Total space includes input data memory. Auxiliary space measures solely the additional temporary memory allocated during algorithm execution (including recursion frames).',
      codeSnippet: '// Kadane algorithm: Input is vector nums (size N)\n// Extra variables: maxSoFar, currMax -> Auxiliary Space = O(1)',
      keyRule: 'Count call stack frames for recursion when measuring auxiliary space.'
    }
  ],
  'arrays': [
    {
      title: 'Contiguous Memory & Cache Locality',
      explanation: 'Arrays store elements consecutively in memory. CPU cache lines load blocks of adjacent memory at once, giving arrays unmatched traversal speed compared to pointer lists.',
      codeSnippet: 'int arr[5] = {10, 20, 30, 40, 50};\n// Address of arr[i] = Base + (i * 4 bytes)\nint* p = arr + 2; // Directly points to arr[2]',
      keyRule: 'Traverse 2D matrices row-by-row (arr[i][j]) rather than column-by-column to preserve cache lines.'
    },
    {
      title: 'Two-Pointer Technique',
      explanation: 'Uses two index variables moving either in opposite directions (converging inwards) or the same direction (fast/slow) to find pairs or partition elements in linear O(N) time.',
      codeSnippet: 'int left = 0, right = arr.size() - 1;\nwhile(left < right) {\n    int sum = arr[left] + arr[right];\n    if(sum == target) return {left, right};\n    if(sum < target) left++;\n    else right--;\n}',
      keyRule: 'Opposite-direction two-pointer requires the array to be sorted beforehand.'
    },
    {
      title: 'Sliding Window Pattern',
      explanation: 'Maintains a contiguous subarray window that expands by advancing the right pointer and contracts by advancing the left pointer, avoiding redundant O(N^2) recalculations.',
      codeSnippet: 'int left = 0, currentSum = 0, maxLen = 0;\nfor(int right = 0; right < n; right++) {\n    currentSum += nums[right];\n    while(currentSum > k) currentSum -= nums[left++];\n    maxLen = max(maxLen, right - left + 1);\n}',
      keyRule: 'Both pointers advance monotonically, ensuring each element is visited at most twice in O(N).'
    },
    {
      title: 'Prefix Sum & Difference Arrays',
      explanation: 'Prefix sums store cumulative totals: prefix[i] = prefix[i-1] + arr[i]. Range sum between indices [L, R] is calculated in O(1) as prefix[R] - prefix[L-1].',
      codeSnippet: 'vector<int> prefix(n + 1, 0);\nfor(int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];\n// Range sum [L, R]:\nint rangeSum = prefix[R + 1] - prefix[L];',
      keyRule: 'Use 1-indexed prefix sum vectors to eliminate special boundary conditions for L = 0.'
    },
    {
      title: 'Kadane Algorithm for Maximum Subarray',
      explanation: 'Computes maximum subarray sum in a single O(N) pass by dynamically tracking currentMax = max(nums[i], currentMax + nums[i]) at each element.',
      codeSnippet: 'int maxSoFar = nums[0], current = nums[0];\nfor(size_t i = 1; i < nums.size(); i++) {\n    current = max(nums[i], current + nums[i]);\n    maxSoFar = max(maxSoFar, current);\n}',
      keyRule: 'Initialize maxSoFar with nums[0], never 0, to handle arrays containing exclusively negative numbers.'
    }
  ],
  'searching': [
    {
      title: 'Binary Search Core Template',
      explanation: 'Operates on sorted search spaces. Computes mid without overflow, compares target against arr[mid], and eliminates half the search space per iteration.',
      codeSnippet: 'int low = 0, high = n - 1;\nwhile(low <= high) {\n    int mid = low + (high - low) / 2;\n    if(arr[mid] == target) return mid;\n    if(arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n}',
      keyRule: 'Always use low + (high - low) / 2 to avoid integer overflow when low + high exceeds 2^31 - 1.'
    },
    {
      title: 'Lower Bound & Upper Bound',
      explanation: 'std::lower_bound returns the iterator to the first element that is >= target. std::upper_bound returns the iterator to the first element strictly > target in O(log N).',
      codeSnippet: 'auto lb = lower_bound(nums.begin(), nums.end(), target);\nauto ub = upper_bound(nums.begin(), nums.end(), target);\nint count = ub - lb; // Count of target elements in O(log N)!',
      keyRule: 'Check if lb == nums.end() before dereferencing to prevent iterator out-of-bounds.'
    },
    {
      title: 'Search in Rotated Sorted Array',
      explanation: 'Even after rotation, at least one half of the array [low..mid] or [mid..high] is always strictly sorted. We inspect the sorted half to determine where the target lies.',
      codeSnippet: 'if(nums[low] <= nums[mid]) {\n    if(target >= nums[low] && target < nums[mid]) high = mid - 1;\n    else low = mid + 1;\n} else {\n    if(target > nums[mid] && target <= nums[high]) low = mid + 1;\n    else high = mid - 1;\n}',
      keyRule: 'Check nums[low] <= nums[mid] to identify which half is monotonically sorted.'
    },
    {
      title: 'Binary Search on Answer Space',
      explanation: 'Used when the answer space is monotonic (if X is valid, then any value > X is also valid). Binary searches the range of possible answers rather than an array index.',
      codeSnippet: 'int low = 1, high = maxAnswer, ans = high;\nwhile(low <= high) {\n    int mid = low + (high - low) / 2;\n    if(isPossible(mid)) { ans = mid; high = mid - 1; }\n    else low = mid + 1;\n}',
      keyRule: 'Identify the monotonic predicate function isPossible(mid) that evaluates in O(N).'
    }
  ],
  'sorting': [
    {
      title: 'QuickSort Lomuto & Hoare Partitioning',
      explanation: 'Partitioning selects a pivot and rearranges elements so all smaller items precede the pivot and larger items follow it. Lomuto uses one scanner; Hoare uses two converging pointers.',
      codeSnippet: 'int pivot = arr[high], i = low - 1;\nfor(int j = low; j < high; j++) {\n    if(arr[j] <= pivot) swap(arr[++i], arr[j]);\n}\nswap(arr[i + 1], arr[high]);\nreturn i + 1;',
      keyRule: 'Hoare partition does fewer swaps on average than Lomuto, but Lomuto is simpler to code.'
    },
    {
      title: 'Merge Sort Divide & Conquer',
      explanation: 'Divides the array recursively into halves until single-element arrays remain, then merges sorted halves using temporary auxiliary buffers in guaranteed O(N log N) time.',
      codeSnippet: 'void mergeSort(vector<int>& arr, int l, int r) {\n    if(l >= r) return;\n    int m = l + (r - l) / 2;\n    mergeSort(arr, l, m);\n    mergeSort(arr, m + 1, r);\n    merge(arr, l, m, r);\n}',
      keyRule: 'Merge Sort is a stable sorting algorithm, crucial when sorting objects with multiple keys.'
    },
    {
      title: 'In-Place vs Stable Sorting',
      explanation: 'In-place algorithms use O(1) auxiliary memory (QuickSort, HeapSort). Stable algorithms guarantee equal keys retain their original relative order (Merge Sort, Insertion Sort).',
      codeSnippet: '// std::sort is an IntroSort (QuickSort + HeapSort + InsertionSort): O(N log N), in-place, NOT stable.\n// std::stable_sort is MergeSort: O(N log N), stable, O(N) memory.',
      keyRule: 'Use std::stable_sort when order of equal records must be preserved.'
    },
    {
      title: 'Custom Comparators in C++',
      explanation: 'C++ std::sort accepts custom lambda functions or structs implementing strict weak ordering. Must strictly return false when elements are equivalent.',
      codeSnippet: 'sort(students.begin(), students.end(), [](const Student &a, const Student &b) {\n    if(a.marks != b.marks) return a.marks > b.marks; // Higher marks first\n    return a.id < b.id; // Tie break by ID\n});',
      keyRule: 'Never use <= in comparators; violating strict weak ordering causes segmentation crashes in std::sort.'
    }
  ],
  'hashing': [
    {
      title: 'Hash Functions & Bucket Distribution',
      explanation: 'A good hash function distributes keys uniformly across bucket slots to minimize collisions. C++ STL provides std::hash<T> for primitive types and strings.',
      codeSnippet: 'size_t h = hash<string>{}("algorithm");\nsize_t bucketIndex = h % numBuckets;',
      keyRule: 'Uneven hash distributions degrade hash table performance down to O(N).'
    },
    {
      title: 'Separate Chaining vs Open Addressing',
      explanation: 'Separate Chaining maintains a linked list (or Red-Black tree) at each bucket slot for colliding elements. Open Addressing searches for adjacent free slots (linear probing).',
      codeSnippet: '// C++ std::unordered_map uses Separate Chaining under the hood.\n// Each bucket holds a linked list of key-value pairs.',
      keyRule: 'Separate chaining easily handles high load factors without table resizing deadlock.'
    },
    {
      title: 'std::unordered_map vs std::map',
      explanation: 'std::unordered_map is backed by a Hash Table with average O(1) operations and unordered traversal. std::map is backed by a self-balancing Red-Black Tree with O(log N) operations and sorted keys.',
      codeSnippet: 'unordered_map<string, int> freq; // Average O(1)\nmap<string, int> sortedDict;      // Strictly O(log N), keys kept sorted',
      keyRule: 'Use std::map when you need ordered keys or predecessor/successor queries (lower_bound).'
    },
    {
      title: 'Two Sum & Complement Hashing Pattern',
      explanation: 'Instead of comparing all pairs in O(N^2), store each element in a hash map and check whether target - current exists in average O(1) time.',
      codeSnippet: 'unordered_map<int, int> seen;\nfor(int i = 0; i < nums.size(); i++) {\n    int comp = target - nums[i];\n    if(seen.count(comp)) return {seen[comp], i};\n    seen[nums[i]] = i;\n}',
      keyRule: 'Inserting into the map AFTER checking prevents accidentally pairing an element with itself.'
    }
  ],
  'recursion': [
    {
      title: 'Base Condition & Call Stack',
      explanation: 'Every recursive function must define a base condition that terminates execution. Without a base case, recursion executes indefinitely until Call Stack memory overflows.',
      codeSnippet: 'int fact(int n) {\n    if(n <= 1) return 1; // Base condition\n    return n * fact(n - 1); // Recursive step\n}',
      keyRule: 'Always place base conditions at the top of recursive functions before any recursive calls.'
    },
    {
      title: 'Backtracking: Choose, Explore, Unchoose',
      explanation: 'Backtracking generates state-space decision trees. At each step, choose an option, recursively explore all possibilities, then unchoose (undo the state) to test alternative branches.',
      codeSnippet: 'path.push_back(nums[i]);       // Choose\nbacktrack(nums, i + 1, path); // Explore\npath.pop_back();              // Unchoose (Restore)',
      keyRule: 'Every state modification must have an exact inverse operation before returning.'
    },
    {
      title: 'Subsets & Combinations Generation',
      explanation: 'For each element, make a binary choice: include the element in the current subset or exclude it, generating all 2^N subsets systematically.',
      codeSnippet: 'void getSubsets(int i, vector<int>& current) {\n    if(i == n) { result.push_back(current); return; }\n    current.push_back(nums[i]); getSubsets(i + 1, current); // Include\n    current.pop_back();         getSubsets(i + 1, current); // Exclude\n}',
      keyRule: 'Subsets generation takes O(2^N * N) time, practical for N <= 20.'
    }
  ],
  'linked-lists': [
    {
      title: 'In-Place Reversal Algorithm',
      explanation: 'Reverses a singly linked list in a single pass using three pointers (prev, curr, next) in O(N) time and O(1) auxiliary space without creating new nodes.',
      codeSnippet: 'ListNode *prev = nullptr, *curr = head;\nwhile(curr) {\n    ListNode *next = curr->next;\n    curr->next = prev;\n    prev = curr;\n    curr = next;\n}\nreturn prev; // New head of reversed list',
      keyRule: 'Always cache curr->next before modifying curr->next to avoid breaking list connectivity.'
    },
    {
      title: 'Floyd Cycle Detection (Fast & Slow)',
      explanation: 'Uses a slow pointer moving 1 step and a fast pointer moving 2 steps. If a cycle exists, the fast pointer will lap and meet the slow pointer in O(N) time and O(1) space.',
      codeSnippet: 'ListNode *slow = head, *fast = head;\nwhile(fast && fast->next) {\n    slow = slow->next;\n    fast = fast->next->next;\n    if(slow == fast) return true; // Cycle detected!\n}\nreturn false;',
      keyRule: 'To find cycle entry point, reset slow to head after meeting, then advance both at 1 step/iteration.'
    },
    {
      title: 'Dummy Node Technique',
      explanation: 'Allocates a temporary sentinel node before the head: ListNode dummy(0); dummy.next = head. Simplifies edge cases where the head node itself is deleted or inserted.',
      codeSnippet: 'ListNode dummy(0);\ndummy.next = head;\nListNode *curr = &dummy;\n// Now deleting or prepending at head requires no special if(head == null) checks!\nreturn dummy.next;',
      keyRule: 'Return dummy.next at the end to retrieve the actual list head.'
    }
  ],
  'stacks-queues': [
    {
      title: 'Monotonic Stack Pattern',
      explanation: 'A stack that maintains elements in strictly increasing or decreasing order. Ideal for finding the Next Greater Element or Previous Smaller Element in linear O(N) time.',
      codeSnippet: 'vector<int> nge(n, -1);\nstack<int> st;\nfor(int i = 0; i < n; i++) {\n    while(!st.empty() && nums[i] > nums[st.top()]) {\n        nge[st.top()] = nums[i];\n        st.pop();\n    }\n    st.push(i);\n}',
      keyRule: 'Each element enters and leaves the stack at most once, guaranteeing strict O(N) runtime.'
    },
    {
      title: 'Parentheses Matching with Stack',
      explanation: 'Pushes opening brackets onto the stack. When closing bracket is encountered, checks if stack top contains matching opening bracket, validating nested structures in O(N).',
      codeSnippet: 'stack<char> st;\nfor(char c : s) {\n    if(c == \'(\') st.push(\')\');\n    else if(c == \'{\') st.push(\'}\');\n    else if(c == \'[\') st.push(\']\');\n    else if(st.empty() || st.top() != c) return false;\n    else st.pop();\n}\nreturn st.empty();',
      keyRule: 'Push the expected closing bracket for cleaner comparison logic.'
    },
    {
      title: 'Circular Queue & Deque',
      explanation: 'Circular queue reuses array memory by wrapping indices via modulo arithmetic: rear = (rear + 1) % capacity. Deque supports O(1) operations at both ends.',
      codeSnippet: 'int front = 0, rear = 0, count = 0;\nvoid enqueue(int val) {\n    arr[rear] = val;\n    rear = (rear + 1) % capacity;\n    count++;\n}',
      keyRule: 'Modulo arithmetic prevents false overflow when empty slots exist at the front of the array.'
    }
  ],
  'trees': [
    {
      title: 'DFS Traversals (Inorder, Preorder, Postorder)',
      explanation: 'Preorder (Root, Left, Right) is used to clone trees. Inorder (Left, Root, Right) produces sorted order in BST. Postorder (Left, Right, Root) is used for tree deletion and bottom-up calculations.',
      codeSnippet: 'void inorder(TreeNode* root, vector<int>& res) {\n    if(!root) return;\n    inorder(root->left, res);\n    res.push_back(root->val); // Process root\n    inorder(root->right, res);\n}',
      keyRule: 'Inorder traversal of any valid Binary Search Tree is always monotonically non-decreasing.'
    },
    {
      title: 'BFS Level-Order Traversal with Queue',
      explanation: 'Visits nodes level-by-level from top to bottom using a FIFO Queue. Allows grouping nodes by level and finding minimum tree depth in O(N) time.',
      codeSnippet: 'queue<TreeNode*> q;\nq.push(root);\nwhile(!q.empty()) {\n    int levelSize = q.size();\n    for(int i = 0; i < levelSize; i++) {\n        TreeNode* node = q.front(); q.pop();\n        if(node->left) q.push(node->left);\n        if(node->right) q.push(node->right);\n    }\n}',
      keyRule: 'Capturing levelSize = q.size() at loop start separates levels cleanly.'
    },
    {
      title: 'Binary Search Tree Validation',
      explanation: 'Validating a BST requires verifying that ALL nodes in the left subtree are strictly less than root, and all in the right subtree are greater. Pass valid [minVal, maxVal] down recursively.',
      codeSnippet: 'bool isValidBST(TreeNode* root, long minVal = LONG_MIN, long maxVal = LONG_MAX) {\n    if(!root) return true;\n    if(root->val <= minVal || root->val >= maxVal) return false;\n    return isValidBST(root->left, minVal, root->val) &&\n           isValidBST(root->right, root->val, maxVal);\n}',
      keyRule: 'Use 64-bit long limits to avoid edge case issues with INT_MIN and INT_MAX node values.'
    }
  ],
  'graphs': [
    {
      title: 'Adjacency List vs Adjacency Matrix',
      explanation: 'Adjacency list uses vector<int> adj[V] storing only existing edges in O(V + E) space. Adjacency matrix uses V x V 2D array, consuming O(V^2) space but allowing O(1) edge existence queries.',
      codeSnippet: 'int V = 5;\nvector<int> adj[V]; // Adjacency list\nadj[0].push_back(1);\nadj[1].push_back(0); // Undirected edge (0, 1)',
      keyRule: 'Always prefer Adjacency List for sparse graphs (E << V^2) to save memory and traversal time.'
    },
    {
      title: 'BFS Shortest Path in Unweighted Graphs',
      explanation: 'Breadth-First Search radiates outward level-by-level using a FIFO Queue. The first time a target vertex is reached, the path length is guaranteed to be the shortest possible.',
      codeSnippet: 'vector<int> dist(V, -1);\nqueue<int> q;\nq.push(src); dist[src] = 0;\nwhile(!q.empty()) {\n    int u = q.front(); q.pop();\n    for(int v : adj[u]) {\n        if(dist[v] == -1) {\n            dist[v] = dist[u] + 1;\n            q.push(v);\n        }\n    }\n}',
      keyRule: 'Mark dist[v] or visited[v] immediately upon pushing into the queue, NOT when popping.'
    },
    {
      title: 'Dijkstra Algorithm with Min-Heap',
      explanation: 'Finds single-source shortest paths in non-negative weighted graphs using a priority_queue min-heap in O((V + E) log V) time.',
      codeSnippet: 'priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;\npq.push({0, src});\nwhile(!pq.empty()) {\n    auto [d, u] = pq.top(); pq.pop();\n    if(d > dist[u]) continue; // Stale entry\n    for(auto &[v, w] : adj[u]) {\n        if(dist[u] + w < dist[v]) {\n            dist[v] = dist[u] + w;\n            pq.push({dist[v], v});\n        }\n    }\n}',
      keyRule: 'Dijkstra does NOT work on graphs with negative edge weights; use Bellman-Ford instead.'
    }
  ],
  'dp': [
    {
      title: 'Memoization (Top-Down) Pattern',
      explanation: 'Writes the intuitive recursive solution and attaches an auxiliary lookup table (e.g. dp vector initialized with -1) to store states as they are computed.',
      codeSnippet: 'int memo[1005]; // Initialized to -1\nint solve(int n) {\n    if(n <= 1) return n;\n    if(memo[n] != -1) return memo[n]; // Cache hit!\n    return memo[n] = solve(n - 1) + solve(n - 2);\n}',
      keyRule: 'Memoization preserves natural recursive code structure with zero redundant calculations.'
    },
    {
      title: 'Tabulation (Bottom-Up) Pattern',
      explanation: 'Fills the DP table iteratively from base cases (dp[0]) up to the desired target (dp[n]), completely avoiding recursive call stack overhead.',
      codeSnippet: 'vector<int> dp(n + 1, 0);\ndp[0] = 0; dp[1] = 1;\nfor(int i = 2; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n}\nreturn dp[n];',
      keyRule: 'Ensure all subproblems required by state i are computed before evaluating state i.'
    },
    {
      title: '0/1 Knapsack Decision Pattern',
      explanation: 'For each item i and capacity w, make two choices: exclude item (take dp[i-1][w]) or include item (val[i] + dp[i-1][w - wt[i]]), taking the maximum.',
      codeSnippet: 'for(int i = 1; i <= n; i++) {\n    for(int w = W; w >= wt[i-1]; w--) {\n        dp[w] = max(dp[w], val[i-1] + dp[w - wt[i-1]]);\n    }\n}',
      keyRule: 'Traverse capacity w in reverse order (W down to wt) to optimize 2D table into a 1D array.'
    }
  ]
};

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

export const ComplexityAnalysisView: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  const allExpanded = [1, 2, 3, 4, 5, 6, 7].every((id) => expandedCards[id]);

  const toggleAll = () => {
    const nextVal = !allExpanded;
    const next: Record<number, boolean> = {};
    [1, 2, 3, 4, 5, 6, 7].forEach((id) => {
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

  const topics = [
    {
      id: 1,
      title: '1. Introduction to Complexity Analysis',
      content: (
        <div className="space-y-3 pt-2 text-theme-text">
          <p className="leading-relaxed">
            Complexity analysis tells us how much time and memory an algorithm needs as the input size <span className="font-mono text-teal-400 font-semibold">n</span> increases.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Time complexity:</strong> How the number of operations grows.</li>
            <li><strong>Space complexity:</strong> How the memory requirement grows.</li>
          </ul>
          <div className="p-3.5 rounded-xl bg-theme-bg/60 border border-theme-border text-xs sm:text-sm">
            <strong className="text-teal-400">Example:</strong> If a loop visits every element of an array of size <span className="font-mono text-teal-400">n</span>, its time complexity is <span className="font-mono font-bold text-teal-400">O(n)</span>.
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: '2. Big O, Omega and Theta Notations',
      content: (
        <div className="space-y-3.5 pt-2 text-theme-text">
          <p className="leading-relaxed">
            These notations describe how an algorithm's resource usage grows.
          </p>

          <div className="overflow-x-auto rounded-xl border border-theme-border">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900/80 text-teal-300 font-mono text-[11px] sm:text-xs uppercase border-b border-theme-border">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Notation</th>
                  <th className="py-2.5 px-4 font-semibold">Meaning</th>
                  <th className="py-2.5 px-4 font-semibold">Simple example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-bold text-teal-300">Big O — O</td>
                  <td className="py-2.5 px-4">Upper bound on growth</td>
                  <td className="py-2.5 px-4 font-mono text-teal-400 font-semibold">O(n²)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-bold text-teal-300">Omega — Ω</td>
                  <td className="py-2.5 px-4">Lower bound on growth</td>
                  <td className="py-2.5 px-4 font-mono text-teal-400 font-semibold">Ω(n)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-bold text-teal-300">Theta — Θ</td>
                  <td className="py-2.5 px-4">Tight bound on growth</td>
                  <td className="py-2.5 px-4 font-mono text-teal-400 font-semibold">Θ(n)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-1.5 pt-1">
            <p className="font-semibold">Easy way to remember:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-mono font-bold text-teal-400">O</span>: At most this growth rate, asymptotically.</li>
              <li><span className="font-mono font-bold text-teal-400">Ω</span>: At least this growth rate, asymptotically.</li>
              <li><span className="font-mono font-bold text-teal-400">Θ</span>: Both upper and lower bounds match.</li>
            </ul>
          </div>

          <p className="leading-relaxed">
            For example, if an algorithm always processes all <span className="font-mono text-teal-400">n</span> elements, its running time is <span className="font-mono font-bold text-teal-400">Θ(n)</span>.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: '3. Best, Average and Worst Cases',
      content: (
        <div className="space-y-3.5 pt-2 text-theme-text">
          <p className="leading-relaxed">
            These describe how an algorithm performs on different inputs of the same size.
          </p>

          <div className="space-y-2">
            <p className="font-semibold text-teal-400">Example: Searching for a number in an unsorted array.</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Best case:</strong> The number is first — <span className="font-mono text-emerald-400 font-bold">O(1)</span>.</li>
              <li><strong>Average case:</strong> The number is around the middle — typically <span className="font-mono text-amber-400 font-bold">Θ(n)</span> comparisons.</li>
              <li><strong>Worst case:</strong> The number is last or absent — <span className="font-mono text-rose-400 font-bold">O(n)</span>.</li>
            </ul>
          </div>

          <p className="leading-relaxed">
            The average case depends on the assumed distribution of inputs. The worst case gives the maximum growth for inputs of a given size.
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: '4. Time Complexity of Loops',
      content: (
        <div className="space-y-4 pt-2 text-theme-text">
          <p className="leading-relaxed">
            A loop's complexity depends on how many times it executes.
          </p>

          <div className="space-y-2">
            <p className="font-semibold text-teal-400">Example 1: One loop</p>
            <CodeBox code={`for (int i = 0; i < n; i++) {\n    cout << i;\n}`} />
            <p>The loop runs <span className="font-mono text-teal-400 font-semibold">n</span> times.</p>
            <p className="font-semibold">Time complexity: <span className="font-mono text-teal-400 font-bold">O(n)</span></p>
          </div>

          <div className="space-y-2 pt-2 border-t border-theme-border/50">
            <p className="font-semibold text-teal-400">Example 2: Loop that halves the input</p>
            <CodeBox code={`while (n > 1) {\n    n = n / 2;\n}`} />
            <p>The value of n is halved each time.</p>
            <p className="font-semibold">Time complexity: <span className="font-mono text-teal-400 font-bold">O(log n)</span></p>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: '5. Complexity of Nested Loops',
      content: (
        <div className="space-y-4 pt-2 text-theme-text">
          <p className="leading-relaxed">
            Nested loops are loops inside other loops.
          </p>

          <div className="space-y-2">
            <p className="font-semibold text-teal-400">Example 1: Two loops, each running n times</p>
            <CodeBox code={`for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        cout << i << j;\n    }\n}`} />
            <p>
              The inner loop runs <span className="font-mono text-teal-400 font-semibold">n</span> times for each of the <span className="font-mono text-teal-400 font-semibold">n</span> outer iterations.
            </p>
            <p>
              Total operations: <span className="font-mono text-teal-400 font-semibold">n × n = n²</span>.
            </p>
            <p className="font-semibold">Time complexity: <span className="font-mono text-teal-400 font-bold">O(n²)</span></p>
          </div>

          <div className="space-y-2 pt-2 border-t border-theme-border/50">
            <p className="font-semibold text-teal-400">Example 2: Two separate loops</p>
            <CodeBox code={`for (int i = 0; i < n; i++) {\n    cout << i;\n}\n\nfor (int j = 0; j < n; j++) {\n    cout << j;\n}`} />
            <p>
              Total operations: <span className="font-mono text-teal-400 font-semibold">n+n=2n</span>.
            </p>
            <p className="font-semibold">
              Time complexity: <span className="font-mono text-teal-400 font-bold">O(n)</span> because we ignore constant factors.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-300 text-xs sm:text-sm">
            <strong>Remember:</strong> nested loops do not always mean <span className="font-mono font-bold">O(n²)</span>. Count how many times their bodies actually execute.
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: '6. Complexity of Recursion',
      content: (
        <div className="space-y-4 pt-2 text-theme-text">
          <p className="leading-relaxed">
            Recursion happens when a function calls itself to solve a smaller version of a problem.
          </p>

          <div className="space-y-2">
            <p className="font-semibold text-teal-400">Example: Factorial</p>
            <CodeBox code={`int factorial(int n) {\n    if (n == 1)\n        return 1;\n\n    return n * factorial(n - 1);\n}`} />
            
            <p>For factorial(4), the calls are:</p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-teal-300 overflow-x-auto">
              factorial(4) → factorial(3) → factorial(2) → factorial(1)
            </div>

            <p>
              Each call handles one value, and there are <span className="font-mono text-teal-400 font-semibold">n</span> calls.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Time complexity:</strong> <span className="font-mono font-bold text-teal-400">O(n)</span></li>
              <li><strong>Auxiliary space:</strong> <span className="font-mono font-bold text-teal-400">O(n)</span> because each recursive call uses stack memory.</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-teal-950/20 border border-teal-500/30 text-teal-300 text-xs sm:text-sm">
            Always check how many recursive calls occur and how much the input shrinks in each call.
          </div>
        </div>
      ),
    },
    {
      id: 7,
      title: '7. Space Complexity and Auxiliary Space',
      content: (
        <div className="space-y-4 pt-2 text-theme-text">
          <p className="leading-relaxed">
            Space complexity describes how memory usage grows with input size.
          </p>
          <p className="leading-relaxed">
            Auxiliary space is the extra memory an algorithm uses, excluding the memory occupied by the input itself.
          </p>

          <div className="space-y-2">
            <p className="font-semibold text-teal-400">Example 1: Constant extra space</p>
            <CodeBox code={`int sum = 0;\n\nfor (int i = 0; i < n; i++) {\n    sum += i;\n}`} />
            <p>Only a fixed number of extra variables are used.</p>
            <ul className="list-disc pl-5">
              <li><strong>Auxiliary space:</strong> <span className="font-mono font-bold text-teal-400">O(1)</span></li>
            </ul>
          </div>

          <div className="space-y-2 pt-2 border-t border-theme-border/50">
            <p className="font-semibold text-teal-400">Example 2: Extra array</p>
            <CodeBox code={`vector<int> result(n);`} />
            <p>The vector stores <span className="font-mono text-teal-400 font-semibold">n</span> elements.</p>
            <ul className="list-disc pl-5">
              <li><strong>Auxiliary space:</strong> <span className="font-mono font-bold text-teal-400">O(n)</span></li>
            </ul>
          </div>

          <div className="space-y-2 pt-2 border-t border-theme-border/50">
            <p className="font-semibold text-teal-400">Example 3: Recursive function</p>
            <p className="leading-relaxed">
              If a recursive function makes <span className="font-mono text-teal-400 font-semibold">n</span> calls that remain on the call stack, its stack space can be <span className="font-mono font-bold text-teal-400">O(n)</span>.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-theme-border">
            <h4 className="text-sm font-bold text-theme-text">Quick revision table</h4>
            <div className="overflow-x-auto rounded-xl border border-theme-border">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900/80 text-teal-300 font-mono text-[11px] sm:text-xs uppercase border-b border-theme-border">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Complexity</th>
                    <th className="py-2.5 px-4 font-semibold">Meaning</th>
                    <th className="py-2.5 px-4 font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-sans">
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-4 font-mono font-bold text-teal-300">O(1)</td>
                    <td className="py-2.5 px-4">Constant</td>
                    <td className="py-2.5 px-4 text-theme-text-muted">Access an array element by index</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-4 font-mono font-bold text-teal-300">O(log n)</td>
                    <td className="py-2.5 px-4">Logarithmic</td>
                    <td className="py-2.5 px-4 text-theme-text-muted">Binary search</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-4 font-mono font-bold text-teal-300">O(n)</td>
                    <td className="py-2.5 px-4">Linear</td>
                    <td className="py-2.5 px-4 text-theme-text-muted">Traverse an array</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-4 font-mono font-bold text-teal-300">O(n log n)</td>
                    <td className="py-2.5 px-4">Linearithmic</td>
                    <td className="py-2.5 px-4 text-theme-text-muted">Merge sort</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-4 font-mono font-bold text-teal-300">O(n²)</td>
                    <td className="py-2.5 px-4">Quadratic</td>
                    <td className="py-2.5 px-4 text-theme-text-muted">Compare all pairs using nested loops</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-4 font-mono font-bold text-teal-300">O(2ⁿ)</td>
                    <td className="py-2.5 px-4">Exponential</td>
                    <td className="py-2.5 px-4 text-theme-text-muted">Basic recursive Fibonacci implementation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <TopicProgressHeader topicId="time-complexity" topicTitle="Complexity Analysis" />
      <div className="flex items-center justify-between pb-3 border-b border-theme-border">
        <div>
          <h2 className="text-xl font-bold text-theme-text">Complexity Analysis</h2>
          <p className="text-xs text-theme-text-muted mt-0.5">
            7 Essential Topics • Check the box to mark subtopic as mastered and update Roadmap progress
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
        {topics.map((topic) => {
          const isOpen = Boolean(expandedCards[topic.id]);
          return (
            <div
              key={topic.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-teal-500/40 bg-theme-card shadow-lg ring-1 ring-teal-500/20'
                  : 'border-theme-border bg-theme-card hover:border-teal-500/30'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleCard(topic.id)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-slate-800/20 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3.5 pr-2">
                  <SubtopicCheckbox
                    topicId="time-complexity"
                    subtopicId={topic.id}
                    title={topic.title}
                  />
                  <span
                    className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                        : 'bg-teal-500/10 border border-teal-500/20 text-teal-400'
                    }`}
                  >
                    {topic.id}
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold text-theme-text">
                    {topic.title}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-theme-text-muted transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-teal-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-theme-border/60 text-xs sm:text-sm text-theme-text leading-relaxed animate-in fade-in duration-200">
                  {topic.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const learnTopics = [
  { id: 'cpp-basics', name: 'C++ Fundamentals' },
  { id: 'time-complexity', name: 'Complexity Analysis' },
  { id: 'searching', name: 'Searching' },
  { id: 'hashing', name: 'Hashing' },
  { id: 'sorting', name: 'Sorting' },
  { id: 'linked-lists', name: 'Linked List' },
  { id: 'stacks-queues', name: 'Stack and Queue' },
  { id: 'recursion', name: 'Recursion' },
  { id: 'trees', name: 'Trees' },
];

export const TopicLearningPage: React.FC = () => {
  const { topicId: rawTopicId = 'cpp-basics' } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

  const normalizeTopicId = (raw: string) => {
    const clean = (raw || '').toLowerCase().trim();
    const exact = learnTopics.find(t => 
      t.id === clean || 
      t.id.replace(/-/g, '') === clean.replace(/[^a-z0-9]/g, '') ||
      t.name.toLowerCase() === clean
    );
    if (exact) return exact.id;
    if (clean.includes('link') || clean.includes('node') || clean.includes('list')) return 'linked-lists';
    if (clean.includes('stack') || clean.includes('queue') || clean.includes('deque')) return 'stacks-queues';
    if (clean.includes('recur') || clean.includes('backtrack') || clean.includes('queen') || clean.includes('maze') || clean.includes('sudoku')) return 'recursion';
    if (clean.includes('tree') || clean.includes('bst') || clean.includes('heap') || clean.includes('lca')) return 'trees';
    if (clean.includes('sort') || clean.includes('bubble') || clean.includes('quick') || clean.includes('merge') || clean.includes('insert') || clean.includes('select')) return 'sorting';
    if (clean.includes('hash') || clean.includes('map') || clean.includes('set')) return 'hashing';
    if (clean.includes('search') || clean.includes('binary') || clean.includes('linear') || clean.includes('fibonacci')) return 'searching';
    if (clean.includes('time') || clean.includes('complex')) return 'time-complexity';
    if (clean.includes('cpp') || clean.includes('basic') || clean.includes('fundamental') || clean.includes('prereq')) return 'cpp-basics';
    return 'cpp-basics';
  };

  const resolvedTopicId = normalizeTopicId(rawTopicId);
  const currentTopic = dsaTopics.find(t => t.id === resolvedTopicId) || dsaTopics[0];
  const topicDetail = detailedTopicData[currentTopic.id] || detailedTopicData['cpp-basics'];
  const relatedProblems = dsaProblems.filter(p => p.topicId === currentTopic.id || (currentTopic.id === 'cpp-basics' && p.topicId === 'arrays') || (currentTopic.id === 'time-complexity' && p.topicId === 'searching'));
  const theoryNote = topicTheoryNotes[currentTopic.id] || topicTheoryNotes['arrays'];
  const subtopicsList = subtopicDeepDives[currentTopic.id] || subtopicDeepDives['cpp-basics'];

  const [activeTab, setActiveTab] = useState<'concepts' | 'syntax' | 'dryrun' | 'complexity' | 'mistakes' | 'practice'>('concepts');
  const [copiedSyntax, setCopiedSyntax] = useState(false);
  const [copiedExample, setCopiedExample] = useState(false);
  const [dryRunIndex, setDryRunIndex] = useState(0);
  const [isPlayingDryRun, setIsPlayingDryRun] = useState(false);

  // Subtopic interactive modal / detail state
  const [selectedSubtopic, setSelectedSubtopic] = useState<SubtopicDetail | null>(null);
  const [masteredSubtopics, setMasteredSubtopics] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem('dsaverse_mastered_subtopics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const dryRunSteps = currentTopic.dryRunSteps || [];
  const safeDryRunIndex = Math.min(Math.max(0, dryRunIndex), Math.max(0, dryRunSteps.length - 1));

  useEffect(() => {
    setDryRunIndex(0);
    setIsPlayingDryRun(false);
    setSelectedSubtopic(null);
  }, [resolvedTopicId]);

  useEffect(() => {
    let timer: any;
    if (isPlayingDryRun && dryRunSteps.length > 0) {
      timer = setInterval(() => {
        setDryRunIndex(prev => {
          if (prev >= dryRunSteps.length - 1) {
            setIsPlayingDryRun(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1600);
    }
    return () => clearInterval(timer);
  }, [isPlayingDryRun, dryRunSteps.length]);

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSyntax(true);
    setTimeout(() => setCopiedSyntax(false), 2000);
  };

  const handleCopyExample = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedExample(true);
    setTimeout(() => setCopiedExample(false), 2000);
  };

  const toggleSubtopicMastered = (title: string) => {
    setMasteredSubtopics(prev => {
      const next = { ...prev, [title]: !prev[title] };
      try {
        localStorage.setItem('dsaverse_mastered_subtopics', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-teal-500/15">
        <div>
          <div className="flex items-center space-x-2 text-xs text-theme-text-muted mb-1">
            <Link to="/roadmap" className="hover:text-teal-300 flex items-center">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Roadmap
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-teal-300 font-semibold">{currentTopic.id === 'cpp-basics' ? 'Prerequisites' : currentTopic.name}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-theme-text flex flex-wrap items-center gap-3">
            <span>{currentTopic.id === 'cpp-basics' ? 'Prerequisites' : currentTopic.name}</span>
            <DifficultyBadge difficulty={currentTopic.difficulty} size="md" />
          </h1>
        </div>

        {currentTopic.id !== 'cpp-basics' && currentTopic.id !== 'time-complexity' && currentTopic.id !== 'searching' && currentTopic.id !== 'hashing' && currentTopic.id !== 'sorting' && currentTopic.id !== 'linked-lists' && currentTopic.id !== 'stacks-queues' && currentTopic.id !== 'recursion' && currentTopic.id !== 'trees' && (
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab('dryrun')}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm ${
                activeTab === 'dryrun'
                  ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-500/30'
                  : 'bg-theme-card border-teal-500/30 hover:border-teal-400 text-teal-300'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
              <span>Interactive Dry Run ({dryRunSteps.length} Steps)</span>
            </button>

            <Link
              to="/practice"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-teal-600/30 transition-all flex items-center space-x-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Practice C++ Problems</span>
            </Link>
          </div>
        )}
      </div>

      {/* Topic Selector Strip */}
      <div className="p-3 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel">
        <div className="text-[11px] font-mono uppercase tracking-wider text-theme-text-muted mb-2 px-1">
          Select Topic to View Theory & Examples:
        </div>
        <div className="flex flex-wrap gap-2">
          {learnTopics.map((topic) => {
            const isSelected = topic.id === currentTopic.id;
            return (
              <button
                key={topic.id}
                onClick={() => navigate(`/learn/${topic.id}`)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 border border-teal-400'
                    : 'bg-theme-card border border-theme-border text-theme-text-muted hover:text-theme-text hover:border-teal-500/40'
                }`}
              >
                {topic.name}
              </button>
            );
          })}
        </div>
      </div>

      {currentTopic.id === 'cpp-basics' ? (
        /* Static Prerequisites List for C++ Fundamentals */
        <div className="max-w-4xl mx-auto space-y-4">
          <TopicProgressHeader topicId="cpp-basics" topicTitle="C++ Fundamentals" />
          <div className="flex items-center justify-between pb-3 border-b border-theme-border">
            <div>
              <h2 className="text-xl font-bold text-theme-text">Prerequisites & Concepts</h2>
              <p className="text-xs text-theme-text-muted mt-0.5">
                {subtopicsList.length} Essential C++ Topics • Check the box to mark subtopic as mastered and update Roadmap progress
              </p>
            </div>
            <span className="text-xs font-mono text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full font-medium">
              Core Fundamentals
            </span>
          </div>

          <div className="space-y-2.5">
            {subtopicsList.map((topic, index) => {
              const subId = index + 1;
              return (
                <div
                  key={index}
                  className="p-3.5 sm:p-4 rounded-xl border border-theme-border bg-theme-card flex items-center justify-between space-x-3.5"
                >
                  <div className="flex items-center space-x-3">
                    <SubtopicCheckbox
                      topicId="cpp-basics"
                      subtopicId={subId}
                      title={topic.title}
                    />
                    <span className="font-mono text-xs font-bold text-teal-400 w-7 shrink-0">
                      {subId}.
                    </span>
                    <span className="text-sm font-semibold text-theme-text">
                      {topic.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-theme-text-muted px-2 py-0.5 rounded bg-slate-800/40 border border-theme-border hidden sm:inline-block">
                    Prerequisite {subId}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : currentTopic.id === 'searching' ? (
        <SearchingLearningView />
      ) : currentTopic.id === 'time-complexity' ? (
        <ComplexityAnalysisView />
      ) : currentTopic.id === 'hashing' ? (
        <HashingLearningView />
      ) : currentTopic.id === 'sorting' ? (
        <SortingLearningView />
      ) : currentTopic.id === 'linked-lists' ? (
        <LinkedListLearningView />
      ) : currentTopic.id === 'stacks-queues' ? (
        <StackQueueLearningView />
      ) : currentTopic.id === 'recursion' ? (
        <RecursionLearningView />
      ) : currentTopic.id === 'trees' ? (
        <TreesLearningView />
      ) : (
        /* Main Grid: Left Navigation Tabs + Right Main Learning Panel (for other topics) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-3">
          <div className="p-3 rounded-2xl bg-theme-card/90 border border-teal-500/20 glass-panel space-y-1">
            
            <button
              onClick={() => setActiveTab('concepts')}
              className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all cursor-pointer ${
                activeTab === 'concepts' ? 'bg-teal-600 text-white shadow-md' : 'text-theme-text-muted hover:border-theme-border'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>1. Overview & Theory</span>
            </button>

            <button
              onClick={() => setActiveTab('syntax')}
              className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all cursor-pointer ${
                activeTab === 'syntax' ? 'bg-teal-600 text-white shadow-md' : 'text-theme-text-muted hover:border-theme-border'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>2. C++ Syntax & Example</span>
            </button>

            <button
              onClick={() => setActiveTab('dryrun')}
              className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all cursor-pointer ${
                activeTab === 'dryrun' ? 'bg-teal-600 text-white shadow-md' : 'text-theme-text-muted hover:border-theme-border'
              }`}
            >
              <Play className="w-4 h-4 text-emerald-400" />
              <span>3. Step-by-Step Dry Run ({dryRunSteps.length} Steps)</span>
            </button>

            <button
              onClick={() => setActiveTab('complexity')}
              className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all cursor-pointer ${
                activeTab === 'complexity' ? 'bg-teal-600 text-white shadow-md' : 'text-theme-text-muted hover:border-theme-border'
              }`}
            >
              <Timer className="w-4 h-4 text-amber-400" />
              <span>4. Complexity Analysis</span>
            </button>

            <button
              onClick={() => setActiveTab('mistakes')}
              className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all cursor-pointer ${
                activeTab === 'mistakes' ? 'bg-teal-600 text-white shadow-md' : 'text-theme-text-muted hover:border-theme-border'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>5. Common Mistakes</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all cursor-pointer ${
                activeTab === 'practice' ? 'bg-teal-600 text-white shadow-md' : 'text-theme-text-muted hover:border-theme-border'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>6. Practice Questions ({relatedProblems.length})</span>
            </button>
          </div>

          {/* Quick Topic Info Badge */}
          <div className="p-4 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-2 text-xs">
            <div className="text-teal-400 font-bold uppercase tracking-wider text-[11px]">
              Topic Metrics
            </div>
            <div className="flex justify-between text-theme-text-muted">
              <span>Time Bound:</span>
              <span className="font-mono text-teal-300 font-bold">{topicDetail.complexity.time || currentTopic.complexity.time}</span>
            </div>
            <div className="flex justify-between text-theme-text-muted">
              <span>Space Bound:</span>
              <span className="font-mono text-blue-300 font-bold">{topicDetail.complexity.space || currentTopic.complexity.space}</span>
            </div>
            <div className="flex justify-between text-theme-text-muted">
              <span>Practice Questions:</span>
              <span className="font-mono text-theme-text font-bold">{relatedProblems.length} Curated</span>
            </div>
          </div>
        </div>

        {/* Right Main Learning Workspace Panel */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: CONCEPTS & THEORY NOTES */}
          {activeTab === 'concepts' && (
                <div className="space-y-6 animate-fadeIn">

                  {/* Definition & Core Theory */}
                  <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-theme-border pb-3">
                      <h3 className="text-lg font-bold text-theme-text flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-teal-400" /> {currentTopic.name} — Theory & Concept Notes
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                          What is {currentTopic.name}?
                        </h4>
                        <p className="text-sm text-theme-text-muted leading-relaxed">
                          {theoryNote.definition}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-theme-bg/60 border border-theme-border">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center">
                          <Cpu className="w-3.5 h-3.5 mr-1.5" /> How It Works in Hardware & Memory
                        </h4>
                        <p className="text-xs sm:text-sm text-theme-text-muted leading-relaxed">
                          {theoryNote.howItWorks}
                        </p>
                      </div>
                    </div>
                  </div>

              {/* Visual Diagrams & Flowcharts Component */}
              <TopicDiagram topicId={currentTopic.id} topicName={currentTopic.name} />

              {/* Interactive Dry Run Quick Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/50 via-slate-900 to-emerald-950/50 border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div>
                  <h4 className="text-sm font-bold text-teal-300 flex items-center">
                    <Play className="w-4 h-4 mr-1.5 text-emerald-400 fill-emerald-400" />
                    Interactive Step-by-Step Dry Run Ready ({dryRunSteps.length} Steps)
                  </h4>
                  <p className="text-xs text-theme-text-muted mt-0.5">
                    Step through the algorithmic execution, active pointers, and memory states for {currentTopic.name}.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('dryrun')}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shrink-0 flex items-center space-x-1.5 cursor-pointer shadow-md w-fit"
                >
                  <span>Launch Dry Run</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Key Theoretical Properties */}
              <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
                <h3 className="text-base font-bold text-theme-text flex items-center">
                  <Layers className="w-5 h-5 mr-2 text-amber-400" /> Core Characteristics, Rules & Invariants
                </h3>
                <ul className="space-y-2.5">
                  {theoryNote.keyProperties.map((prop, idx) => (
                    <li key={idx} className="p-3.5 rounded-xl bg-theme-card border border-theme-border flex items-start space-x-3 text-xs text-theme-text">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{prop}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Subtopics to Master Section */}
              <div id="subtopics-mastery-section" className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border pb-3">
                  <div>
                    <h3 className="text-base font-bold text-theme-text flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-400" />
                      {currentTopic.id === 'cpp-basics' ? 'Prerequisites' : 'Subtopics to Master'}
                    </h3>
                    <p className="text-xs text-theme-text-muted mt-0.5">
                      {currentTopic.id === 'cpp-basics'
                        ? 'Master these 21 foundational C++ prerequisites before advancing to complex algorithmic techniques.'
                        : 'Click any subtopic button below to view in-depth explanation, rules, and code snippets!'}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-teal-400">
                    {subtopicsList.filter(s => masteredSubtopics[s.title]).length} / {subtopicsList.length} Mastered
                  </span>
                </div>

                {/* Subtopic Interactive Buttons Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {subtopicsList.map((sub, idx) => {
                    const isMastered = Boolean(masteredSubtopics[sub.title]);
                    const isSelected = selectedSubtopic?.title === sub.title;

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSubtopic(sub)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between space-x-3 ${
                          isSelected
                            ? 'bg-teal-600/20 border-teal-400 ring-2 ring-teal-500/30'
                            : isMastered
                            ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400'
                            : 'bg-theme-card border-theme-border hover:border-teal-500/40 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-start space-x-2.5">
                          <SubtopicCheckbox
                            topicId={currentTopic.id}
                            subtopicId={idx + 1}
                            title={sub.title}
                          />
                          <span className={`w-5 h-5 rounded-full font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                            isMastered ? 'bg-emerald-500 text-white' : 'bg-teal-500/20 text-teal-300'
                          }`}>
                            {idx + 1}
                          </span>
                          <div>
                            <span className="text-xs font-semibold text-theme-text block leading-snug">
                              {sub.title}
                            </span>
                            <span className="text-[10px] text-theme-text-muted mt-0.5 block line-clamp-1">
                              {sub.keyRule}
                            </span>
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono shrink-0 ${
                          isMastered ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-teal-300 border border-slate-700'
                        }`}>
                          {isMastered ? 'Mastered' : 'Explore'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subtopic Inspector Drawer / Modal (When a subtopic button is clicked) */}
              {selectedSubtopic && (
                <div className="p-6 rounded-2xl bg-slate-900 border-2 border-teal-500/40 shadow-2xl glass-panel space-y-4 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <BookMarked className="w-5 h-5 text-teal-400" />
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-theme-text">
                          {currentTopic.id === 'cpp-basics' ? 'Prerequisite' : 'Subtopic'}: {selectedSubtopic.title}
                        </h4>
                        <span className="text-[11px] text-teal-300 font-mono">
                          Key Concept in {currentTopic.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleSubtopicMastered(selectedSubtopic.title)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                          masteredSubtopics[selectedSubtopic.title]
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-800 hover:bg-slate-700 text-theme-text border border-slate-700'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{masteredSubtopics[selectedSubtopic.title] ? 'Mastered!' : 'Mark as Mastered'}</span>
                      </button>

                      <button
                        onClick={() => setSelectedSubtopic(null)}
                        className="p-1.5 rounded-lg text-theme-text-muted hover:bg-slate-800 hover:text-theme-text transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 block mb-1">
                        Detailed Conceptual Breakdown
                      </span>
                      <p className="text-theme-text-muted leading-relaxed sm:text-sm">
                        {selectedSubtopic.explanation}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-teal-400">
                        <span>C++ Implementation Snippet:</span>
                        <button
                          onClick={() => handleCopyCode(selectedSubtopic.codeSnippet)}
                          className="hover:text-white flex items-center space-x-1 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </button>
                      </div>
                      <pre className="overflow-x-auto text-xs text-theme-text font-mono leading-relaxed p-2 rounded bg-slate-900 border border-slate-800/80">
                        {selectedSubtopic.codeSnippet}
                      </pre>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                      <span><strong>Key Rule:</strong> {selectedSubtopic.keyRule}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Real-World & Coding Applications */}
              <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
                <h3 className="text-base font-bold text-theme-text flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-cyan-400" /> Real-World Engineering Applications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {theoryNote.applications.map((app, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-theme-card border border-theme-border flex items-start space-x-2.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                      <span className="text-xs text-theme-text-muted leading-relaxed">{app}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: C++ SYNTAX & EXAMPLE */}
          {activeTab === 'syntax' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-theme-text flex items-center">
                      <Code2 className="w-5 h-5 mr-2 text-emerald-400" /> Standard C++ Syntax & Template Idioms
                    </h3>
                    <p className="text-xs text-theme-text-muted mt-1">
                      Idiomatic C++ templates and declarations specific to <span className="text-teal-300 font-semibold">{currentTopic.name}</span>.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(topicDetail.syntax || currentTopic.cppSyntax)}
                    className="px-3.5 py-1.5 rounded-lg border border-theme-border hover:bg-slate-700 text-theme-text-muted text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    {copiedSyntax ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSyntax ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-theme-border overflow-x-auto font-mono text-xs text-teal-300 leading-relaxed shadow-inner">
                  <pre>{topicDetail.syntax || currentTopic.cppSyntax}</pre>
                </div>
              </div>

              {/* Practical Complete Example Code */}
              <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-theme-text flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-amber-400" /> Complete Solution & Implementation
                    </h3>
                    <p className="text-xs text-theme-text-muted mt-1">
                      Fully implemented, runnable program demonstrating core algorithmic mechanics for <span className="text-teal-300 font-semibold">{currentTopic.name}</span>.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyExample(topicDetail.example || currentTopic.exampleCode)}
                    className="px-3.5 py-1.5 rounded-lg border border-theme-border hover:bg-slate-700 text-theme-text-muted text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    {copiedExample ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedExample ? 'Copied' : 'Copy Solution'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-theme-border overflow-x-auto font-mono text-xs text-slate-200 leading-relaxed shadow-inner">
                  <pre>{topicDetail.example || currentTopic.exampleCode}</pre>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/25 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
                    <span className="text-emerald-400 font-bold flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-400" /> Program Execution Verified
                    </span>
                    <span className="text-theme-text-muted text-[11px]">Runtime: {topicDetail.complexity.time} | Auxiliary Space: {topicDetail.complexity.space}</span>
                  </div>
                  <p className="text-xs text-theme-text-muted leading-relaxed">
                    This self-contained program is validated against standard C++ paradigms, handles all edge conditions, and demonstrates optimal {currentTopic.name} computational flow.
                  </p>
                </div>

                {/* Quick Actions to Dry Run */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('dryrun')}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch Step-by-Step Dry Run for this {currentTopic.name} Program</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: STEP-BY-STEP DRY RUN VISUALIZER */}
          {activeTab === 'dryrun' && (
            <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme-border pb-4">
                <div>
                  <h3 className="text-lg font-bold text-theme-text flex items-center">
                    <Play className="w-5 h-5 mr-2 text-emerald-400 fill-emerald-500/20" /> Interactive Step-by-Step Dry Run
                  </h3>
                  <p className="text-xs text-theme-text-muted mt-0.5">
                    Thorough execution walk-through across {dryRunSteps.length} individual states with memory and pointers for <span className="text-teal-300 font-semibold">{currentTopic.name}</span>.
                  </p>
                </div>

                {/* Dry Run Controls */}
                <div className="flex items-center space-x-2 font-mono">
                  <button
                    onClick={() => setIsPlayingDryRun(!isPlayingDryRun)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                      isPlayingDryRun
                        ? 'bg-amber-600 text-white border-amber-500'
                        : 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-600/30'
                    }`}
                  >
                    {isPlayingDryRun ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isPlayingDryRun ? 'Pause' : 'Auto Play'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsPlayingDryRun(false);
                      setDryRunIndex(Math.max(0, safeDryRunIndex - 1));
                    }}
                    disabled={safeDryRunIndex === 0}
                    className="px-3 py-1.5 rounded-lg border border-theme-border disabled:opacity-40 text-theme-text text-xs font-semibold hover:bg-slate-700 cursor-pointer"
                  >
                    Prev
                  </button>
                  <span className="text-xs text-teal-400 px-2 font-bold whitespace-nowrap">
                    Step {safeDryRunIndex + 1} / {dryRunSteps.length}
                  </span>
                  <button
                    onClick={() => {
                      setIsPlayingDryRun(false);
                      setDryRunIndex(Math.min(dryRunSteps.length - 1, safeDryRunIndex + 1));
                    }}
                    disabled={safeDryRunIndex >= dryRunSteps.length - 1}
                    className="px-3 py-1.5 rounded-lg bg-teal-600 disabled:opacity-40 text-white text-xs font-semibold hover:bg-teal-500 cursor-pointer"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => {
                      setIsPlayingDryRun(false);
                      setDryRunIndex(0);
                    }}
                    className="p-1.5 rounded-lg border border-theme-border hover:bg-slate-700 text-theme-text-muted hover:text-theme-text cursor-pointer"
                    title="Reset to Step 1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Step Navigation Pills */}
              <div className="flex flex-wrap gap-1.5">
                {dryRunSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsPlayingDryRun(false);
                      setDryRunIndex(idx);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                      safeDryRunIndex === idx
                        ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-400/40'
                        : 'bg-slate-800 text-theme-text-muted hover:text-theme-text hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    Step {step.step}
                  </button>
                ))}
              </div>

              {/* Dry Run Visual Display Area */}
              {dryRunSteps[safeDryRunIndex] ? (
                <div className="p-6 rounded-2xl bg-slate-900 border border-teal-500/30 space-y-6">
                  
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-teal-300">
                      Step {dryRunSteps[safeDryRunIndex].step}: {dryRunSteps[safeDryRunIndex].title}
                    </h4>
                    <span className="text-[11px] font-mono text-theme-text-muted">
                      Progress: {Math.round(((safeDryRunIndex + 1) / dryRunSteps.length) * 100)}%
                    </span>
                  </div>

                  {/* Visual Data Structure Representation */}
                  <div className="py-6 px-4 bg-slate-950 rounded-2xl border border-theme-border flex flex-col items-center justify-center space-y-4 overflow-x-auto">
                    
                    {/* Data structure specific badges */}
                    <div className="flex items-center space-x-2 text-[11px] font-mono text-teal-400">
                      <span>Structure:</span>
                      <span className="px-2 py-0.5 rounded bg-teal-500/20 border border-teal-500/30 text-teal-300">
                        {currentTopic.name} Visual Memory Model
                      </span>
                    </div>

                    {/* Nodes / Array Elements */}
                    <div className="flex items-center justify-center space-x-3 flex-wrap gap-y-4 py-2">
                      {dryRunSteps[safeDryRunIndex].arrayState.map((val, idx) => {
                        const isHighlighted = dryRunSteps[safeDryRunIndex].highlightIndices.includes(idx);
                        
                        // Check if any pointer matches this index or value
                        const matchingPointers = Object.entries(dryRunSteps[safeDryRunIndex].pointers)
                          .filter(([, pVal]) => pVal === idx || pVal === val)
                          .map(([pName]) => pName);

                        return (
                          <div key={idx} className="flex items-center">
                            <div className="flex flex-col items-center">
                              {/* Pointer indicator pin */}
                              {matchingPointers.length > 0 ? (
                                <span className="text-[10px] font-mono text-amber-400 font-bold mb-1 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                                  {matchingPointers.join(', ')}
                                </span>
                              ) : (
                                <span className="text-[10px] font-mono text-theme-text-muted mb-1">Index {idx}</span>
                              )}

                              <div className={`w-12 h-14 rounded-xl flex items-center justify-center font-mono text-sm font-bold transition-all ${
                                isHighlighted
                                  ? 'bg-teal-600 text-white ring-4 ring-teal-500/50 scale-110 shadow-lg shadow-teal-600/50'
                                  : 'bg-slate-800/80 text-theme-text-muted border border-slate-700'
                              }`}>
                                {val}
                              </div>
                            </div>

                            {/* Arrow for linked list topic */}
                            {currentTopic.id === 'linked-lists' && idx < dryRunSteps[safeDryRunIndex].arrayState.length - 1 && (
                              <ArrowRight className="w-4 h-4 text-teal-400 mx-2 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pointer Readout */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-mono text-theme-text-muted uppercase">Active Pointers & State:</span>
                    {Object.entries(dryRunSteps[safeDryRunIndex].pointers).map(([pName, pVal]) => (
                      <span key={pName} className="px-3 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-bold">
                        {pName} = {pVal}
                      </span>
                    ))}
                  </div>

                  {/* Step Description */}
                  <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 text-xs sm:text-sm text-theme-text leading-relaxed">
                    <strong className="text-teal-400 block mb-1">Step Details:</strong>
                    {dryRunSteps[safeDryRunIndex].description}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-900 rounded-2xl border border-theme-border">
                  <p className="text-sm text-theme-text-muted">No dry run steps available for this topic.</p>
                </div>
              )}

            </div>
          )}

          {/* TAB 4: COMPLEXITY ANALYSIS */}
          {activeTab === 'complexity' && (
            <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-6 animate-fadeIn">
              <div className="border-b border-theme-border pb-3">
                <h3 className="text-lg font-bold text-theme-text flex items-center">
                  <Timer className="w-5 h-5 mr-2 text-amber-400" /> Theoretical Complexity & Hardware Bounds
                </h3>
                <p className="text-xs text-theme-text-muted mt-1">
                  Rigorous asymptotic analysis and memory allocation behavior specifically for <span className="text-teal-300 font-semibold">{currentTopic.name}</span>.
                </p>
              </div>

              {/* 4 Core Bound Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-theme-card border border-teal-500/30 glass-panel space-y-1">
                  <span className="text-[11px] text-theme-text-muted font-mono uppercase tracking-wider font-semibold">Time Bound</span>
                  <div className="text-2xl font-black text-teal-400 font-mono">
                    {topicDetail.complexity.time}
                  </div>
                  <p className="text-[11px] text-theme-text-muted leading-tight">Overall computational time bound</p>
                </div>

                <div className="p-4 rounded-2xl bg-theme-card border border-blue-500/30 glass-panel space-y-1">
                  <span className="text-[11px] text-theme-text-muted font-mono uppercase tracking-wider font-semibold">Space Bound</span>
                  <div className="text-2xl font-black text-blue-400 font-mono">
                    {topicDetail.complexity.space}
                  </div>
                  <p className="text-[11px] text-theme-text-muted leading-tight">Total auxiliary runtime memory</p>
                </div>

                <div className="p-4 rounded-2xl bg-theme-card border border-emerald-500/30 glass-panel space-y-1">
                  <span className="text-[11px] text-theme-text-muted font-mono uppercase tracking-wider font-semibold">Best Case</span>
                  <div className="text-xs font-bold text-emerald-300 font-mono mt-1">
                    {topicDetail.complexity.best}
                  </div>
                  <p className="text-[11px] text-theme-text-muted leading-tight mt-1">Early exit or optimal distribution</p>
                </div>

                <div className="p-4 rounded-2xl bg-theme-card border border-rose-500/30 glass-panel space-y-1">
                  <span className="text-[11px] text-theme-text-muted font-mono uppercase tracking-wider font-semibold">Worst Case</span>
                  <div className="text-xs font-bold text-rose-300 font-mono mt-1">
                    {topicDetail.complexity.worst}
                  </div>
                  <p className="text-[11px] text-theme-text-muted leading-tight mt-1">Pathological input edge scenario</p>
                </div>
              </div>

              {/* Deep Hardware & Memory Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-theme-border space-y-2">
                  <span className="text-xs font-bold text-teal-300 flex items-center">
                    <Cpu className="w-4 h-4 mr-1.5" /> Auxiliary Memory Allocation
                  </span>
                  <p className="text-xs text-theme-text-muted leading-relaxed">
                    {topicDetail.complexity.auxiliarySpace}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-theme-border space-y-2">
                  <span className="text-xs font-bold text-blue-300 flex items-center">
                    <Layers className="w-4 h-4 mr-1.5" /> Call Stack & Recursion Behavior
                  </span>
                  <p className="text-xs text-theme-text-muted leading-relaxed">
                    {topicDetail.complexity.stackBehavior}
                  </p>
                </div>
              </div>

              {/* Derivation & Mathematical Proof */}
              <div className="p-4 rounded-xl bg-theme-card border border-teal-500/20 space-y-2">
                <strong className="text-xs font-bold text-amber-400 block">
                  Algorithmic Derivation & Proof:
                </strong>
                <p className="text-xs sm:text-sm text-theme-text-muted leading-relaxed">
                  {topicDetail.complexity.derivation}
                </p>
              </div>

              {/* Operations Complexity Matrix */}
              {topicDetail.complexity.operationsTable && topicDetail.complexity.operationsTable.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-theme-text font-bold">
                    Primary {currentTopic.name} Operations Matrix
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-theme-border">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900/80 text-theme-text-muted font-mono uppercase text-[11px] border-b border-theme-border">
                        <tr>
                          <th className="py-2.5 px-3.5">Operation</th>
                          <th className="py-2.5 px-3.5 w-28">Time Complexity</th>
                          <th className="py-2.5 px-3.5 w-28">Space Complexity</th>
                          <th className="py-2.5 px-3.5">Algorithmic & Hardware Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-sans">
                        {topicDetail.complexity.operationsTable.map((op, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-2.5 px-3.5 font-bold text-theme-text font-mono">
                              {op.operation}
                            </td>
                            <td className="py-2.5 px-3.5 font-mono text-teal-300 font-semibold">
                              {op.time}
                            </td>
                            <td className="py-2.5 px-3.5 font-mono text-blue-300">
                              {op.space}
                            </td>
                            <td className="py-2.5 px-3.5 text-theme-text-muted text-[11px] leading-relaxed">
                              {op.notes}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 5: COMMON MISTAKES */}
          {activeTab === 'mistakes' && (
            <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-6 animate-fadeIn">
              <div className="border-b border-theme-border pb-3">
                <h3 className="text-lg font-bold text-theme-text flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-rose-400" /> Common Pitfalls, Bugs & Verified Fixes
                </h3>
                <p className="text-xs text-theme-text-muted mt-1">
                  Practical mistakes encountered when implementing <span className="text-teal-300 font-semibold">{currentTopic.name}</span> in C++ with verified fixes.
                </p>
              </div>

              <div className="space-y-6">
                {(topicDetail.commonMistakes || currentTopic.commonMistakes).map((m, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-theme-card border border-rose-500/20 space-y-4 shadow-sm">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center text-xs font-mono font-bold">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-rose-300">
                        {m.title}
                      </h4>
                    </div>

                    <p className="text-xs text-theme-text-muted leading-relaxed pl-8">
                      {m.desc}
                    </p>

                    {/* Code comparison if available */}
                    {(m.wrongCode || m.correctCode) && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pl-8">
                        {m.wrongCode && (
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-mono text-rose-400 font-semibold flex items-center">
                              ❌ Anti-Pattern / Buggy Code
                            </span>
                            <div className="p-3 rounded-xl bg-slate-950 border border-rose-500/30 text-rose-300 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
                              <pre>{m.wrongCode}</pre>
                            </div>
                          </div>
                        )}

                        {m.correctCode && (
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center">
                              ✅ Correct C++ Idiom
                            </span>
                            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
                              <pre>{m.correctCode}</pre>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="ml-8 p-3 rounded-xl bg-emerald-950/25 border border-emerald-500/30 text-xs text-emerald-300 leading-relaxed flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Standard Fix: </strong>
                        <span>{m.fix}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PRACTICE QUESTIONS */}
          {activeTab === 'practice' && (
            <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-theme-border pb-3">
                <h3 className="text-lg font-bold text-theme-text flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-cyan-400" /> Curated C++ Practice Problems
                </h3>
                <Link
                  to="/practice"
                  className="text-xs text-teal-400 hover:underline flex items-center space-x-1"
                >
                  <span>View All 30 Problems</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {relatedProblems.map((prob) => (
                  <div
                    key={prob.id}
                    className="p-4 rounded-xl bg-theme-card border border-theme-border hover:border-teal-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                  >
                    <div>
                      <div className="flex items-center space-x-3">
                        <a
                          href={prob.leetcodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-bold text-theme-text hover:text-teal-400 transition-colors flex items-center"
                        >
                          {prob.title}
                          <ExternalLink className="w-3 h-3 ml-1.5 opacity-60" />
                        </a>
                        <DifficultyBadge difficulty={prob.difficulty} size="sm" />
                      </div>
                      <p className="text-xs text-theme-text-muted mt-1">
                        Acceptance: {prob.acceptance} | Expected Time: {prob.expectedTime} | Platform: {prob.platform}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <a
                        href={prob.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all flex items-center space-x-1"
                      >
                        <span>Solve on LeetCode</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    )}

    </div>
  );
};
