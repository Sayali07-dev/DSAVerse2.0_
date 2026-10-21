export interface UserProfile {
  name: string;
  avatar: string;
  role: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  overallProgress: number;
  topicsCompleted: number;
  totalTopics: number;
  problemsSolved: number;
  totalProblems: number;
  currentStreak: number;
  longestStreak: number;
  readinessScore: number;
  dailyGoalSolved: number;
  dailyGoalTarget: number;
}

export interface DSATopic {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard';
  progress: number;
  problemsCount: number;
  solvedCount: number;
  status: 'Completed' | 'In Progress' | 'Locked' | 'Recommended';
  iconName: string;
  keyConcepts: string[];
  cppSyntax: string;
  exampleCode: string;
  complexity: {
    time: string;
    space: string;
    description: string;
  };
  commonMistakes: { title: string; desc: string; fix: string }[];
  dryRunSteps: {
    step: number;
    title: string;
    arrayState: number[];
    highlightIndices: number[];
    pointers: { [key: string]: number };
    description: string;
  }[];
}

export interface DSAProblem {
  id: string;
  title: string;
  topicId: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance: string;
  solved: boolean;
  platform: 'LeetCode';
  leetcodeUrl: string;
  statement: string;
  examples: { input: string; output: string; explanation: string }[];
  constraints: string[];
  hints: string[];
  expectedTime: string;
  expectedSpace: string;
  starterCode: string;
  solutionCode: string;
  testCases: { input: string; expectedOutput: string }[];
}

export interface MistakeEntry {
  id: string;
  problemId: string;
  problemTitle: string;
  topic: string;
  mistakeType: 'Boundary Condition' | 'Off-by-one' | 'Null Pointer' | 'Time Limit Exceeded' | 'Logic Error' | 'Memory Leak';
  date: string;
  whatWentWrong: string;
  whatILearned: string;
  reviewed: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  totalProblems: number;
  completedProblems: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'In Progress' | 'Not Started' | 'Completed';
  tags: string[];
}

export interface Contest {
  id: string;
  title: string;
  date: string;
  timeRemaining: string;
  duration: string;
  problemsCount: number;
  participantsCount: number;
  status: 'Upcoming' | 'Live' | 'Ended';
}

export interface CommunityPost {
  id: string;
  author: string;
  authorAvatar: string;
  authorRole: string;
  title: string;
  content: string;
  topic: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  timeAgo: string;
  isBookmarked?: boolean;
}

// Initial Mock User Data
export const mockUser: UserProfile = {
  name: "Prisha Sharma",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  role: "B.Tech Computer Science (3rd Year)",
  level: "Intermediate",
  overallProgress: 42,
  topicsCompleted: 4,
  totalTopics: 10,
  problemsSolved: 10,
  totalProblems: 30,
  currentStreak: 5,
  longestStreak: 14,
  readinessScore: 68,
  dailyGoalSolved: 1,
  dailyGoalTarget: 2
};

// 10 Structured DSA Topics
export const dsaTopics: DSATopic[] = [
  {
    "id": "cpp-basics",
    "name": "C++ Fundamentals",
    "shortDesc": "Prerequisites: Structure, syntax, data types, I/O, loops, functions, memory, pointers & STL.",
    "fullDesc": "Master foundational C++ prerequisites essential for competitive programming and DSA implementation: program structure, variables, I/O, operators, control flow, functions, memory allocation, pointers, and STL containers.",
    "difficulty": "Beginner",
    "progress": 100,
    "problemsCount": 15,
    "solvedCount": 15,
    "status": "Completed",
    "iconName": "Code2",
    "keyConcepts": [
      "Prerequisites: C++ Introduction & Program Structure",
      "Variables, Data Types, cin/cout & Type Casting",
      "Conditional Statements, Loops & Nested Patterns",
      "Functions, Pass by Reference & Recursion Basics",
      "Arrays, Strings, Pointers & Dynamic Memory (new/delete)",
      "Structures, Vectors, Pairs & Basic STL Containers",
      "Classes, Objects & Debugging Techniques"
    ],
    "cppSyntax": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    vector<int> nums = {10, 20, 30};\n    nums.push_back(40);\n\n    for (int x : nums) {\n        cout << x << \" \";\n    }\n    return 0;\n}",
    "exampleCode": "#include <iostream>\nusing namespace std;\n\nvoid swapByRef(int &a, int &b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x = 5, y = 10;\n    swapByRef(x, y);\n    cout << \"x: \" << x << \", y: \" << y << endl;\n    return 0;\n}",
    "complexity": {
      "time": "O(1)",
      "space": "O(1)",
      "description": "Direct memory access via pointer or reference is constant time."
    },
    "commonMistakes": [
      {
        "title": "Dangling Pointers",
        "desc": "Accessing memory after delete or returning address of local function variable.",
        "fix": "Set pointers to nullptr after deleting or use smart pointers like unique_ptr."
      },
      {
        "title": "Vector Out-of-Bounds",
        "desc": "Using v[i] where i >= v.size() causing undefined behavior.",
        "fix": "Use v.at(i) during debug or check bounds explicitly."
      }
    ],
    "dryRunSteps": [
      {
        "step": 1,
        "title": "Initialize Pointer to Array Base",
        "arrayState": [
          10,
          20,
          30,
          40,
          50
        ],
        "highlightIndices": [
          0
        ],
        "pointers": {
          "ptr": 0
        },
        "description": "Pointer ptr points to first element array index 0 (val = 10) at memory address 0x7ffe00."
      },
      {
        "step": 2,
        "title": "Dereference & In-Place Modification",
        "arrayState": [
          15,
          20,
          30,
          40,
          50
        ],
        "highlightIndices": [
          0
        ],
        "pointers": {
          "ptr": 0
        },
        "description": "*ptr = 15 modifies the memory directly without copying the array. Array index 0 becomes 15."
      },
      {
        "step": 3,
        "title": "Pointer Arithmetic (ptr++)",
        "arrayState": [
          15,
          20,
          30,
          40,
          50
        ],
        "highlightIndices": [
          1
        ],
        "pointers": {
          "ptr": 1
        },
        "description": "Executing ptr++ advances memory address by sizeof(int) (4 bytes). Pointer now references index 1 (val = 20)."
      },
      {
        "step": 4,
        "title": "Pointer Offset Addition (ptr += 2)",
        "arrayState": [
          15,
          20,
          30,
          40,
          50
        ],
        "highlightIndices": [
          3
        ],
        "pointers": {
          "ptr": 3
        },
        "description": "Executing ptr += 2 jumps forward 2 element positions (8 bytes). Pointer now targets index 3 (val = 40)."
      },
      {
        "step": 5,
        "title": "Reference Aliasing (int &ref = arr[4])",
        "arrayState": [
          15,
          20,
          30,
          40,
          99
        ],
        "highlightIndices": [
          4
        ],
        "pointers": {
          "ptr": 3,
          "ref": 4
        },
        "description": "Creating reference alias int &ref = arr[4] and assigning ref = 99 updates memory in-place with O(1) space."
      },
      {
        "step": 6,
        "title": "Vector Dynamic Capacity Expansion",
        "arrayState": [
          15,
          20,
          30,
          40,
          99
        ],
        "highlightIndices": [
          0,
          1,
          2,
          3,
          4
        ],
        "pointers": {
          "size": 5,
          "capacity": 10
        },
        "description": "When std::vector reaches full capacity, push_back triggers doubling of internal buffer from 5 to 10 in O(1) amortized time."
      }
    ]
  },
  {
    "id": "time-complexity",
    "name": "Complexity Analysis",
    "shortDesc": "Big-O notation, asymptotic analysis, recurrence relations, and space bounds.",
    "fullDesc": "Learn how to analyze algorithm efficiency, count operation growth rates, compute Big-O bounds, and optimize space usage.",
    "difficulty": "Beginner",
    "progress": 100,
    "problemsCount": 10,
    "solvedCount": 10,
    "status": "Completed",
    "iconName": "Timer",
    "keyConcepts": [
      "Asymptotic Bounds (Big-O, Big-Omega, Big-Theta)",
      "Dominant terms vs lower-order constants",
      "Nested Loops vs Single Pass Analysis",
      "Master Theorem for Recurrences",
      "Auxiliary Space vs Total Space Complexity"
    ],
    "cppSyntax": "// O(n^2) Quadratic Example\nfor(int i = 0; i < n; i++) {\n    for(int j = 0; j < n; j++) {\n        // Constant time operation O(1)\n    }\n}",
    "exampleCode": "// Logarithmic O(log n) Binary Search Loop\nint count = 0;\nwhile (n > 0) {\n    n = n / 2;\n    count++;\n}",
    "complexity": {
      "time": "O(log n)",
      "space": "O(1)",
      "description": "Halving input size in each step yields logarithmic time."
    },
    "commonMistakes": [
      {
        "title": "Confusing Worst vs Average Case",
        "desc": "Assuming QuickSort is always O(n log n) when worst case is O(n^2).",
        "fix": "State assumptions explicitly (e.g., randomized pivot prevents worst case)."
      },
      {
        "title": "Ignoring Auxiliary Space",
        "desc": "Forgetting recursive call stack memory when calculating space.",
        "fix": "Include recursion stack depth in auxiliary space complexity."
      }
    ],
    "dryRunSteps": [
      {
        "step": 1,
        "title": "Initial Problem Size N = 8",
        "arrayState": [
          4,
          8,
          12,
          16,
          20,
          24,
          28,
          32
        ],
        "highlightIndices": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7
        ],
        "pointers": {
          "low": 0,
          "high": 7,
          "opsRemaining": 8
        },
        "description": "Search space contains N = 8 elements. In Linear Search, worst-case would require 8 sequential comparisons."
      },
      {
        "step": 2,
        "title": "First Halving Step: Mid = 3",
        "arrayState": [
          4,
          8,
          12,
          16,
          20,
          24,
          28,
          32
        ],
        "highlightIndices": [
          3
        ],
        "pointers": {
          "mid": 3,
          "low": 0,
          "high": 7
        },
        "description": "Comparing target 28 with arr[mid] (16). Since 28 > 16, discard left 4 elements. Remaining problem size is now N/2 = 4."
      },
      {
        "step": 3,
        "title": "Second Halving Step: Mid = 5",
        "arrayState": [
          4,
          8,
          12,
          16,
          20,
          24,
          28,
          32
        ],
        "highlightIndices": [
          5
        ],
        "pointers": {
          "mid": 5,
          "low": 4,
          "high": 7
        },
        "description": "Updated range [4..7]. Mid = 5 (val = 24). Since 28 > 24, discard elements 4..5. Remaining problem size is now N/4 = 2."
      },
      {
        "step": 4,
        "title": "Third Halving Step: Mid = 6 (Target Found)",
        "arrayState": [
          4,
          8,
          12,
          16,
          20,
          24,
          28,
          32
        ],
        "highlightIndices": [
          6
        ],
        "pointers": {
          "mid": 6,
          "low": 6,
          "high": 7
        },
        "description": "Mid = 6 (val = 28). Target matches arr[mid]! Total comparisons = 3 = log2(8). Logarithmic efficiency verified."
      },
      {
        "step": 5,
        "title": "Complexity Bound Comparison",
        "arrayState": [
          4,
          8,
          12,
          16,
          20,
          24,
          28,
          32
        ],
        "highlightIndices": [
          6
        ],
        "pointers": {
          "logSteps": 3,
          "linearSteps": 7
        },
        "description": "For N = 1,000,000: Linear O(N) takes 1,000,000 checks; Logarithmic O(log N) takes only 20 checks!"
      }
    ]
  },
  {
    "id": "arrays",
    "name": "Arrays",
    "shortDesc": "Contiguous memory, two-pointer technique, sliding window, and prefix sums.",
    "fullDesc": "Deep dive into 1D and 2D arrays in C++, cache-friendly layouts, two-pointer optimizations, sliding window patterns, and prefix sums.",
    "difficulty": "Easy",
    "progress": 100,
    "problemsCount": 20,
    "solvedCount": 20,
    "status": "Completed",
    "iconName": "LayoutGrid",
    "keyConcepts": [
      "Contiguous memory layout & cache locality",
      "Two-Pointer Technique (converging & same-direction)",
      "Fixed and Dynamic Sliding Window",
      "Prefix Sum and Difference Arrays",
      "Kadane's Algorithm for Maximum Subarray"
    ],
    "cppSyntax": "vector<int> arr = {1, 2, 3, 4, 5};\n// Two pointers converging\nint left = 0, right = arr.size() - 1;\nwhile(left < right) {\n    if(arr[left] + arr[right] == target) break;\n    else if(arr[left] + arr[right] < target) left++;\n    else right--;\n}",
    "exampleCode": "int maxSubArray(vector<int>& nums) {\n    int maxSoFar = nums[0];\n    int currentMax = nums[0];\n    for(size_t i = 1; i < nums.size(); i++) {\n        currentMax = max(nums[i], currentMax + nums[i]);\n        maxSoFar = max(maxSoFar, currentMax);\n    }\n    return maxSoFar;\n}",
    "complexity": {
      "time": "O(n)",
      "space": "O(1)",
      "description": "Kadane's Algorithm runs in a single pass with O(1) auxiliary space."
    },
    "commonMistakes": [
      {
        "title": "Off-by-One in Two Pointers",
        "desc": "Using left <= right instead of left < right causing out of bounds or duplicate processing.",
        "fix": "Carefully determine if pointers can meet or cross based on the problem condition."
      },
      {
        "title": "Integer Overflow in Prefix Sum",
        "desc": "Prefix sums can exceed 32-bit integer limits when array elements are large.",
        "fix": "Use long long for prefix sum accumulators."
      }
    ],
    "dryRunSteps": [
      {
        "step": 1,
        "title": "Initialize Pointers at Opposite Ends",
        "arrayState": [
          2,
          5,
          8,
          11,
          14,
          18
        ],
        "highlightIndices": [
          0,
          5
        ],
        "pointers": {
          "left": 0,
          "right": 5,
          "target": 19
        },
        "description": "Sorted array. Left pointer at index 0 (val = 2), Right pointer at index 5 (val = 18). Sum = 2 + 18 = 20."
      },
      {
        "step": 2,
        "title": "Current Sum > Target: Decrement Right",
        "arrayState": [
          2,
          5,
          8,
          11,
          14,
          18
        ],
        "highlightIndices": [
          0,
          4
        ],
        "pointers": {
          "left": 0,
          "right": 4,
          "currentSum": 16
        },
        "description": "Because 20 > 19 and array is sorted ascending, decrease the sum by moving right pointer: right = 4 (val = 14)."
      },
      {
        "step": 3,
        "title": "Current Sum < Target: Increment Left",
        "arrayState": [
          2,
          5,
          8,
          11,
          14,
          18
        ],
        "highlightIndices": [
          1,
          4
        ],
        "pointers": {
          "left": 1,
          "right": 4,
          "currentSum": 19
        },
        "description": "Sum = 2 + 14 = 16 < 19. Increase the sum by advancing left pointer: left = 1 (val = 5). Now sum = 5 + 14 = 19."
      },
      {
        "step": 4,
        "title": "Target Match Found (19 == 19)",
        "arrayState": [
          2,
          5,
          8,
          11,
          14,
          18
        ],
        "highlightIndices": [
          1,
          4
        ],
        "pointers": {
          "left": 1,
          "right": 4,
          "match": 19
        },
        "description": "Current sum 19 matches target 19! Solution pair is at indices [1, 4] with values (5, 14)."
      },
      {
        "step": 5,
        "title": "Linear Time Guarantee (O(N))",
        "arrayState": [
          2,
          5,
          8,
          11,
          14,
          18
        ],
        "highlightIndices": [
          1,
          4
        ],
        "pointers": {
          "totalSteps": 3,
          "maxSteps": 6
        },
        "description": "Each step either advances left or decrements right. Pointers never backtrack, guaranteeing strict O(N) runtime and O(1) space."
      }
    ]
  },
  {
    "id": "searching",
    "name": "Searching",
    "shortDesc": "Linear search, binary search, lower/upper bounds, and search on answer.",
    "fullDesc": "Master searching techniques from basic linear scan to advanced binary search on answers, rotated sorted arrays, and matrix search.",
    "difficulty": "Easy",
    "progress": 100,
    "problemsCount": 15,
    "solvedCount": 15,
    "status": "Completed",
    "iconName": "Search",
    "keyConcepts": [
      "Linear Search vs Binary Search bounds",
      "Binary Search condition: low + (high - low) / 2",
      "Lower Bound (std::lower_bound) & Upper Bound",
      "Rotated Sorted Array Search (pivot detection)",
      "Binary Search on Answer Space (monotonic predicate)"
    ],
    "cppSyntax": "int binarySearch(const vector<int>& arr, int target) {\n    int low = 0, high = arr.size() - 1;\n    while(low <= high) {\n        int mid = low + (high - low) / 2;\n        if(arr[mid] == target) return mid;\n        else if(arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}",
    "exampleCode": "int findPivot(vector<int>& nums) {\n    int low = 0, high = nums.size() - 1;\n    while(low < high) {\n        int mid = low + (high - low) / 2;\n        if(nums[mid] > nums[high]) low = mid + 1;\n        else high = mid;\n    }\n    return low;\n}",
    "complexity": {
      "time": "O(log n)",
      "space": "O(1)",
      "description": "Binary search eliminates half the remaining search space per iteration."
    },
    "commonMistakes": [
      {
        "title": "Integer Overflow in Mid Calculation",
        "desc": "Using (low + high) / 2 can overflow 32-bit signed integer when sum exceeds 2^31 - 1.",
        "fix": "Always write low + (high - low) / 2."
      },
      {
        "title": "Infinite Loop on Boundary Condition",
        "desc": "Setting low = mid or high = mid without strict inequality causing low == high loop freeze.",
        "fix": "Carefully adjust low = mid + 1 or high = mid - 1 when mid is excluded."
      }
    ],
    "dryRunSteps": [
      {
        "step": 1,
        "title": "Initial Search Space: Target = 55",
        "arrayState": [
          12,
          23,
          34,
          45,
          55,
          67,
          89
        ],
        "highlightIndices": [
          0,
          6
        ],
        "pointers": {
          "low": 0,
          "high": 6,
          "target": 55
        },
        "description": "Array is sorted. Search space spans from low = 0 (12) to high = 6 (89)."
      },
      {
        "step": 2,
        "title": "First Comparison: Mid = 3 (val = 45)",
        "arrayState": [
          12,
          23,
          34,
          45,
          55,
          67,
          89
        ],
        "highlightIndices": [
          3
        ],
        "pointers": {
          "low": 0,
          "mid": 3,
          "high": 6
        },
        "description": "Compute mid = 0 + (6 - 0) / 2 = 3. arr[3] is 45. Since 55 > 45, target must be in right half. Set low = mid + 1 = 4."
      },
      {
        "step": 3,
        "title": "Second Comparison: Mid = 5 (val = 67)",
        "arrayState": [
          12,
          23,
          34,
          45,
          55,
          67,
          89
        ],
        "highlightIndices": [
          5
        ],
        "pointers": {
          "low": 4,
          "mid": 5,
          "high": 6
        },
        "description": "Updated bounds [4..6]. Compute mid = 4 + (6 - 4) / 2 = 5. arr[5] is 67. Since 55 < 67, target must be in left half. Set high = mid - 1 = 4."
      },
      {
        "step": 4,
        "title": "Third Comparison: Mid = 4 (val = 55)",
        "arrayState": [
          12,
          23,
          34,
          45,
          55,
          67,
          89
        ],
        "highlightIndices": [
          4
        ],
        "pointers": {
          "low": 4,
          "mid": 4,
          "high": 4
        },
        "description": "Bounds narrowed to [4..4]. Compute mid = 4. arr[4] is 55. Target matches arr[mid] (55 == 55)!"
      },
      {
        "step": 5,
        "title": "Return Target Index 4",
        "arrayState": [
          12,
          23,
          34,
          45,
          55,
          67,
          89
        ],
        "highlightIndices": [
          4
        ],
        "pointers": {
          "resultIndex": 4,
          "comparisons": 3
        },
        "description": "Search completes successfully. Found target index 4 in only 3 comparisons instead of 5 in linear scan."
      },
      {
        "step": 6,
        "title": "Edge Case Invariant Verification",
        "arrayState": [
          12,
          23,
          34,
          45,
          55,
          67,
          89
        ],
        "highlightIndices": [
          4
        ],
        "pointers": {
          "low": 4,
          "high": 4
        },
        "description": "The loop invariant while (low <= high) guarantees exact bounds coverage without missing elements or infinite cycling."
      }
    ]
  },
  {
    "id": "sorting",
    "name": "Sorting",
    "shortDesc": "Bubble, selection, insertion, merge sort, and quicksort partitioning.",
    "fullDesc": "Understand comparison and non-comparison sorting algorithms, stability, in-place vs extra memory, and partitioning strategies.",
    "difficulty": "Medium",
    "progress": 75,
    "problemsCount": 15,
    "solvedCount": 11,
    "status": "In Progress",
    "iconName": "ArrowUpDown",
    "keyConcepts": [
      "Comparison Sort Lower Bound: Omega(n log n)",
      "Stability in Sorting (preserving relative order)",
      "Merge Sort: Divide & Conquer with O(n) auxiliary space",
      "QuickSort: Lomuto & Hoare partition schemes",
      "Dutch National Flag 3-Way Partitioning"
    ],
    "cppSyntax": "// QuickSort Lomuto Partition\nint partition(vector<int>& arr, int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n    for(int j = low; j < high; j++) {\n        if(arr[j] <= pivot) {\n            i++;\n            swap(arr[i], arr[j]);\n        }\n    }\n    swap(arr[i + 1], arr[high]);\n    return i + 1;\n}",
    "exampleCode": "void merge(vector<int>& arr, int l, int m, int r) {\n    int n1 = m - l + 1, n2 = r - m;\n    vector<int> L(n1), R(n2);\n    for(int i = 0; i < n1; i++) L[i] = arr[l + i];\n    for(int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n    int i = 0, j = 0, k = l;\n    while(i < n1 && j < n2) {\n        if(L[i] <= R[j]) arr[k++] = L[i++];\n        else arr[k++] = R[j++];\n    }\n    while(i < n1) arr[k++] = L[i++];\n    while(j < n2) arr[k++] = R[j++];\n}",
    "complexity": {
      "time": "O(n log n)",
      "space": "O(log n)",
      "description": "QuickSort averages O(n log n) with O(log n) recursive call stack space."
    },
    "commonMistakes": [
      {
        "title": "QuickSort Worst Case Degradation",
        "desc": "Picking first or last element as pivot on already sorted array triggers O(n^2) degradation.",
        "fix": "Use randomized pivot selection or median-of-three."
      },
      {
        "title": "Non-Stable Custom Comparators",
        "desc": "Using <= or >= in strict weak ordering comparators causing undefined behavior in std::sort.",
        "fix": "Comparators must strictly return false for equal elements (use <)."
      }
    ],
    "dryRunSteps": [
      {
        "step": 1,
        "title": "QuickSort Partition: Choose Pivot = 45",
        "arrayState": [
          15,
          60,
          25,
          80,
          35,
          45
        ],
        "highlightIndices": [
          5
        ],
        "pointers": {
          "pivot": 45,
          "i": -1,
          "j": 0
        },
        "description": "Pivot is last element (45). Pointer i = -1 (boundary of <= pivot elements). Scanner j = 0 (val = 15). Since 15 <= 45, increment i to 0 and swap arr[0] with arr[0]."
      },
      {
        "step": 2,
        "title": "Scanner at Index 1: 60 > 45 (No Swap)",
        "arrayState": [
          15,
          60,
          25,
          80,
          35,
          45
        ],
        "highlightIndices": [
          1,
          5
        ],
        "pointers": {
          "i": 0,
          "j": 1
        },
        "description": "Element arr[1] = 60. Since 60 > 45, it belongs in the right partition. Do not increment i. Advance j to 2."
      },
      {
        "step": 3,
        "title": "Scanner at Index 2: 25 <= 45 (Swap with arr[1])",
        "arrayState": [
          15,
          25,
          60,
          80,
          35,
          45
        ],
        "highlightIndices": [
          1,
          2
        ],
        "pointers": {
          "i": 1,
          "j": 2
        },
        "description": "Element arr[2] = 25 <= 45. Increment i to 1. Swap arr[1] (60) with arr[2] (25). Small elements collected on left."
      },
      {
        "step": 4,
        "title": "Scanner at Index 4: 35 <= 45 (Swap with arr[2])",
        "arrayState": [
          15,
          25,
          35,
          80,
          60,
          45
        ],
        "highlightIndices": [
          2,
          4
        ],
        "pointers": {
          "i": 2,
          "j": 4
        },
        "description": "Element arr[4] = 35 <= 45. Increment i to 2. Swap arr[2] (60) with arr[4] (35). Left subarray holds [15, 25, 35]."
      },
      {
        "step": 5,
        "title": "Final Pivot Swap (arr[i+1] with Pivot)",
        "arrayState": [
          15,
          25,
          35,
          45,
          60,
          80
        ],
        "highlightIndices": [
          3,
          5
        ],
        "pointers": {
          "pivotFinalIdx": 3
        },
        "description": "Loop completes. Swap arr[i+1] (arr[3] = 80) with pivot (arr[5] = 45). Pivot 45 is now in its exact sorted position at index 3!"
      },
      {
        "step": 6,
        "title": "Partition Established: Divide & Conquer",
        "arrayState": [
          15,
          25,
          35,
          45,
          60,
          80
        ],
        "highlightIndices": [
          3
        ],
        "pointers": {
          "leftSubarray": 3,
          "rightSubarray": 5
        },
        "description": "All elements left of 45 ([15, 25, 35]) are <= 45. All elements right ([60, 80]) are > 45. Recursively sort each half in O(N log N) total time."
      }
    ]
  },
  {
    "id": "hashing",
    "name": "Hashing",
    "shortDesc": "Hash maps, hash sets, collision resolution, and frequency counting.",
    "fullDesc": "Learn how hash tables achieve O(1) average lookup, handle collisions via chaining or open addressing, and utilize std::unordered_map effectively.",
    "difficulty": "Medium",
    "progress": 80,
    "problemsCount": 15,
    "solvedCount": 12,
    "status": "In Progress",
    "iconName": "Hash",
    "keyConcepts": [
      "Hash function design and uniform distribution",
      "Collision Resolution: Separate Chaining vs Open Addressing",
      "Load factor alpha and rehashing mechanics",
      "std::unordered_map vs std::map (Hash Table vs Red-Black Tree)",
      "Custom hash functions for pairs and tuples"
    ],
    "cppSyntax": "#include <unordered_map>\nunordered_map<int, int> freq;\nfor(int x : nums) {\n    freq[x]++;\n}\nif(freq.find(target) != freq.end()) {\n    // Found in O(1) average\n}",
    "exampleCode": "vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> seen;\n    for(int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if(seen.count(complement)) {\n            return {seen[complement], i};\n        }\n        seen[nums[i]] = i;\n    }\n    return {};\n}",
    "complexity": {
      "time": "O(1) avg",
      "space": "O(n)",
      "description": "Average O(1) insertion, deletion, and lookup. O(n) worst-case on severe collisions."
    },
    "commonMistakes": [
      {
        "title": "Using operator[] for Checking Existence",
        "desc": "Using map[key] inserts a default constructed value if key does not exist, modifying size.",
        "fix": "Use map.find(key) != map.end() or map.count(key) instead."
      },
      {
        "title": "Worst-Case Anti-Hash Exploits",
        "desc": "Adversarial test cases can cause hash collisions on unordered_map leading to O(n) per operation.",
        "fix": "Use custom random seed hash functor in competitive programming."
      }
    ],
    "dryRunSteps": [
      {
        "step": 1,
        "title": "Insert Key 12: Hash(12) % 5 = 2",
        "arrayState": [
          0,
          0,
          12,
          0,
          0
        ],
        "highlightIndices": [
          2
        ],
        "pointers": {
          "bucket": 2,
          "key": 12
        },
        "description": "Table size M = 5. Key 12 hashes to index 2 (12 % 5 = 2). Bucket 2 is empty. Store 12 in O(1) time."
      },
      {
        "step": 2,
        "title": "Insert Key 17: Hash(17) % 5 = 2 (Collision!)",
        "arrayState": [
          0,
          0,
          12,
          0,
          0
        ],
        "highlightIndices": [
          2
        ],
        "pointers": {
          "bucket": 2,
          "key": 17,
          "collision": 1
        },
        "description": "Key 17 also hashes to index 2 (17 % 5 = 2). Collision detected! Separate chaining appends 17 to bucket 2 list: [12 -> 17]."
      },
      {
        "step": 3,
        "title": "Insert Key 7: Hash(7) % 5 = 2 (Second Collision)",
        "arrayState": [
          0,
          0,
          12,
          0,
          0
        ],
        "highlightIndices": [
          2
        ],
        "pointers": {
          "bucket": 2,
          "chainLength": 3
        },
        "description": "Key 7 hashes to index 2. Chain at bucket 2 extends to [12 -> 17 -> 7]. Other buckets remain free."
      },
      {
        "step": 4,
        "title": "Insert Key 14: Hash(14) % 5 = 4",
        "arrayState": [
          0,
          0,
          12,
          0,
          14
        ],
        "highlightIndices": [
          4
        ],
        "pointers": {
          "bucket": 4,
          "key": 14
        },
        "description": "Key 14 hashes to index 4 (14 % 5 = 4). Bucket 4 is empty, inserted directly without collision."
      },
      {
        "step": 5,
        "title": "O(1) Search for Key 17",
        "arrayState": [
          0,
          0,
          12,
          0,
          14
        ],
        "highlightIndices": [
          2
        ],
        "pointers": {
          "targetKey": 17,
          "probes": 2
        },
        "description": "Lookup key 17: computes hash index 2, traverses chain [12 -> 17], finds 17 in only 2 pointer steps."
      },
      {
        "step": 6,
        "title": "Load Factor Check & Rehashing Trigger",
        "arrayState": [
          0,
          0,
          12,
          0,
          14
        ],
        "highlightIndices": [
          2,
          4
        ],
        "pointers": {
          "loadFactor": 80,
          "nextCapacity": 11
        },
        "description": "When load factor (num_elements / buckets) exceeds threshold (0.75), automatic rehashing doubles buckets to keep operations O(1)."
      }
    ]
  },
  {
    "id": "recursion",
    "name": "Recursion",
    "shortDesc": "Call stack unwinding, base conditions, tree recursions, and backtracking.",
    "fullDesc": "Master recursive thinking, drawing call stack frames, avoiding stack overflows, and formulating backtracking state-space trees.",
    "difficulty": "Medium",
    "progress": 33,
    "problemsCount": 15,
    "solvedCount": 5,
    "status": "Recommended",
    "iconName": "GitCommit",
    "keyConcepts": [
      "Base case formulation & termination guarantees",
      "System Call Stack and Activation Records",
      "Recurrence relations and Master Theorem",
      "Backtracking: Choose, Explore, Unchoose pattern",
      "Recursion tree visualization and pruning"
    ],
    "cppSyntax": "void backtrack(vector<int>& current, int start, const vector<int>& nums) {\n    result.push_back(current);\n    for(int i = start; i < nums.size(); i++) {\n        current.push_back(nums[i]); // Choose\n        backtrack(current, i + 1, nums); // Explore\n        current.pop_back(); // Unchoose\n    }\n}",
    "exampleCode": "int fib(int n) {\n    if(n <= 1) return n; // Base case\n    return fib(n - 1) + fib(n - 2); // Recurrence\n}",
    "complexity": {
      "time": "O(2^n)",
      "space": "O(n)",
      "description": "Naive Fibonacci explores 2^n recursive branches with O(n) call stack depth."
    },
    "commonMistakes": [
      {
        "title": "Missing Base Case Stack Overflow",
        "desc": "Forgetting base condition causes infinite recursion until system stack memory is exhausted.",
        "fix": "Always write and verify base cases at the very top of your recursive function."
      },
      {
        "title": "Forgetting to Undo State in Backtracking",
        "desc": "Failing to remove chosen element corrupts state for subsequent sibling branches.",
        "fix": "Ensure every choose step has a matching unchoose step (e.g., path.pop_back())."
      }
    ],
    "dryRunSteps": [
      {
        "step": 1,
        "title": "Initial Call: factorial(4)",
        "arrayState": [
          4,
          0,
          0,
          0
        ],
        "highlightIndices": [
          0
        ],
        "pointers": {
          "depth": 1,
          "n": 4
        },
        "description": "factorial(4) pushed onto system call stack. Checks base condition n <= 1 (False). Prepares to call factorial(3)."
      },
      {
        "step": 2,
        "title": "Push Activation Frame: factorial(3)",
        "arrayState": [
          4,
          3,
          0,
          0
        ],
        "highlightIndices": [
          1
        ],
        "pointers": {
          "depth": 2,
          "n": 3
        },
        "description": "factorial(3) pushed onto stack. Checks base condition (False). Calls factorial(2). Stack depth is now 2."
      },
      {
        "step": 3,
        "title": "Push Activation Frame: factorial(2)",
        "arrayState": [
          4,
          3,
          2,
          0
        ],
        "highlightIndices": [
          2
        ],
        "pointers": {
          "depth": 3,
          "n": 2
        },
        "description": "factorial(2) pushed onto stack. Checks base condition (False). Calls factorial(1). Stack depth is now 3."
      },
      {
        "step": 4,
        "title": "Base Condition Hit: factorial(1)",
        "arrayState": [
          4,
          3,
          2,
          1
        ],
        "highlightIndices": [
          3
        ],
        "pointers": {
          "depth": 4,
          "baseHit": 1
        },
        "description": "factorial(1) pushed. Base condition n <= 1 is TRUE! Returns 1 immediately without further calls."
      },
      {
        "step": 5,
        "title": "Unwind Depth 3: factorial(2) = 2 * 1 = 2",
        "arrayState": [
          4,
          3,
          2,
          1
        ],
        "highlightIndices": [
          2
        ],
        "pointers": {
          "depth": 3,
          "returning": 2
        },
        "description": "Frame for factorial(1) popped. Frame for factorial(2) multiplies 2 * 1 = 2 and returns 2 to caller."
      },
      {
        "step": 6,
        "title": "Unwind Depth 2: factorial(3) = 3 * 2 = 6",
        "arrayState": [
          4,
          3,
          2,
          1
        ],
        "highlightIndices": [
          1
        ],
        "pointers": {
          "depth": 2,
          "returning": 6
        },
        "description": "Frame for factorial(2) popped. Frame for factorial(3) multiplies 3 * 2 = 6 and returns 6."
      },
      {
        "step": 7,
        "title": "Final Unwind Depth 1: factorial(4) = 4 * 6 = 24",
        "arrayState": [
          24,
          6,
          2,
          1
        ],
        "highlightIndices": [
          0
        ],
        "pointers": {
          "finalAnswer": 24
        },
        "description": "Root frame calculates 4 * 6 = 24. Result 24 returned to caller. Call stack fully cleared with O(N) max memory."
      }
    ]
  },
  {
    "id": "linked-lists",
    "name": "Linked Lists",
    "shortDesc": "Singly/doubly linked lists, cycle detection, pointer rewiring, and reversal.",
    "fullDesc": "Master pointer-based linked node structures, Floyd's cycle detection (tortoise & hare), in-place list reversal, and LRU cache design.",
    "difficulty": "Medium",
    "progress": 50,
    "problemsCount": 15,
    "solvedCount": 8,
    "status": "In Progress",
    "iconName": "GitCommit",
    "keyConcepts": [
      "Singly vs Doubly Linked List node memory",
      "In-place pointer reversal (prev, curr, next)",
      "Floyd's Cycle Finding Algorithm (Slow & Fast pointers)",
      "Dummy head node technique for edge cases",
      "Merging two sorted linked lists in O(1) space"
    ],
    "cppSyntax": "struct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* reverseList(ListNode* head) {\n    ListNode *prev = nullptr, *curr = head;\n    while(curr) {\n        ListNode* next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}",
    "exampleCode": "bool hasCycle(ListNode *head) {\n    ListNode *slow = head, *fast = head;\n    while(fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if(slow == fast) return true;\n    }\n    return false;\n}",
    "complexity": {
      "time": "O(n)",
      "space": "O(1)",
      "description": "Linear traversal with O(1) auxiliary pointer variables."
    },
    "commonMistakes": [
      {
        "title": "Losing Pointer to Next Node",
        "desc": "Overwriting curr->next before caching it causes orphaned unreachable nodes.",
        "fix": "Always save ListNode* next = curr->next before modifying curr->next."
      },
      {
        "title": "Null Pointer Dereference on Fast Pointer",
        "desc": "Checking fast->next->next without verifying fast && fast->next causes runtime crash.",
        "fix": "Always condition loops with while (fast && fast->next)."
      }
    ],
    "dryRunSteps": [
      {
        "step": 1,
        "title": "Initial Pointers: prev = null, curr = Node(10)",
        "arrayState": [
          10,
          20,
          30,
          40
        ],
        "highlightIndices": [
          0
        ],
        "pointers": {
          "prev": -1,
          "curr": 0,
          "next": 1
        },
        "description": "List: 10 -> 20 -> 30 -> 40 -> nullptr. Initialize prev = nullptr, curr = Head (Node 10). Cache next = Node 20."
      },
      {
        "step": 2,
        "title": "Reverse First Node: 10 -> nullptr",
        "arrayState": [
          10,
          20,
          30,
          40
        ],
        "highlightIndices": [
          0
        ],
        "pointers": {
          "prev": 0,
          "curr": 1
        },
        "description": "Rewire: curr->next = prev (Node 10 points to nullptr). Advance pointers: prev = Node 10, curr = Node 20."
      },
      {
        "step": 3,
        "title": "Reverse Second Node: 20 -> 10",
        "arrayState": [
          10,
          20,
          30,
          40
        ],
        "highlightIndices": [
          1
        ],
        "pointers": {
          "prev": 1,
          "curr": 2
        },
        "description": "Cache next = Node 30. Rewire: curr->next = prev (Node 20 points to Node 10). Advance: prev = Node 20, curr = Node 30."
      },
      {
        "step": 4,
        "title": "Reverse Third Node: 30 -> 20",
        "arrayState": [
          10,
          20,
          30,
          40
        ],
        "highlightIndices": [
          2
        ],
        "pointers": {
          "prev": 2,
          "curr": 3
        },
        "description": "Cache next = Node 40. Rewire: curr->next = prev (Node 30 points to Node 20). Advance: prev = Node 30, curr = Node 40."
      },
      {
        "step": 5,
        "title": "Reverse Fourth Node: 40 -> 30",
        "arrayState": [
          10,
          20,
          30,
          40
        ],
        "highlightIndices": [
          3
        ],
        "pointers": {
          "prev": 3,
          "curr": -1
        },
        "description": "Cache next = nullptr. Rewire: curr->next = prev (Node 40 points to Node 30). Advance: prev = Node 40, curr = nullptr."
      },
      {
        "step": 6,
        "title": "Reversal Complete: New Head = prev (Node 40)",
        "arrayState": [
          40,
          30,
          20,
          10
        ],
        "highlightIndices": [
          0,
          1,
          2,
          3
        ],
        "pointers": {
          "newHead": 40
        },
        "description": "curr is nullptr, terminating loop. Return prev (Node 40). Reversed list: 40 -> 30 -> 20 -> 10 -> nullptr in O(N) time and O(1) space."
      }
    ]
  },
  {
    "id": "stacks-queues",
    "name": "Stack and Queue",
    "shortDesc": "LIFO/FIFO paradigms, monotonic stacks, sliding window maximum, and deques.",
    "fullDesc": "Master restricted-access data structures: Stacks (LIFO), Queues (FIFO), Double-Ended Queues (Deque), and the Monotonic Stack pattern.",
    "difficulty": "Medium",
    "progress": 40,
    "problemsCount": 15,
    "solvedCount": 6,
    "status": "In Progress",
    "iconName": "Layers",
    "keyConcepts": [
      "Stack LIFO operations (push, pop, top) in O(1)",
      "Queue FIFO operations (enqueue, dequeue) in O(1)",
      "Circular Queue using fixed-size array",
      "Monotonic Stack for Next Greater Element in O(n)",
      "Monotonic Deque for Sliding Window Maximum in O(n)"
    ],
    "cppSyntax": "#include <stack>\n#include <vector>\n\nvector<int> nextGreater(const vector<int>& nums) {\n    int n = nums.size();\n    vector<int> nge(n, -1);\n    stack<int> st; // Stores indices\n    for(int i = 0; i < n; i++) {\n        while(!st.empty() && nums[i] > nums[st.top()]) {\n            nge[st.top()] = nums[i];\n            st.pop();\n        }\n        st.push(i);\n    }\n    return nge;\n}",
    "exampleCode": "bool isValidParentheses(string s) {\n    stack<char> st;\n    for(char c : s) {\n        if(c == '(' || c == '{' || c == '[') st.push(c);\n        else {\n            if(st.empty()) return false;\n            char top = st.top(); st.pop();\n            if((c == ')' && top != '(') ||\n               (c == '}' && top != '{') ||\n               (c == ']' && top != '[')) return false;\n        }\n    }\n    return st.empty();\n}",
    "complexity": {
      "time": "O(n)",
      "space": "O(n)",
      "description": "Each element is pushed and popped from the stack at most once in O(n)."
    },
    "commonMistakes": [
      {
        "title": "Calling top() or pop() on Empty Stack",
        "desc": "Calling st.top() when st.empty() is true causes undefined behavior or crash.",
        "fix": "Always check !st.empty() before inspecting top() or popping."
      },
      {
        "title": "Storing Values instead of Indices in Monotonic Stack",
        "desc": "Storing values makes it impossible to calculate subarray widths or distance.",
        "fix": "Store indices in the stack and access values via arr[st.top()]."
      }
    ],
    "dryRunSteps": [
      {
        "step": 1,
        "title": "Process Index 0 (val = 3)",
        "arrayState": [
          3,
          8,
          4,
          12,
          5
        ],
        "highlightIndices": [
          0
        ],
        "pointers": {
          "currVal": 3,
          "stackSize": 1
        },
        "description": "Stack is empty. Push index 0 (val 3) onto stack. Stack contents: [index 0 (val 3)]."
      },
      {
        "step": 2,
        "title": "Process Index 1 (val = 8 > top 3): Pop 3",
        "arrayState": [
          3,
          8,
          4,
          12,
          5
        ],
        "highlightIndices": [
          0,
          1
        ],
        "pointers": {
          "currVal": 8,
          "popped": 3,
          "ngeFound": 8
        },
        "description": "Current val 8 is greater than stack.top() (3). Pop 3! Next Greater Element for 3 is 8. Push index 1. Stack: [1]."
      },
      {
        "step": 3,
        "title": "Process Index 2 (val = 4 < top 8): Push 4",
        "arrayState": [
          3,
          8,
          4,
          12,
          5
        ],
        "highlightIndices": [
          2
        ],
        "pointers": {
          "currVal": 4,
          "stackSize": 2
        },
        "description": "Current val 4 < stack.top() (8). Monotonic decreasing invariant maintained. Push index 2. Stack: [1, 2]."
      },
      {
        "step": 4,
        "title": "Process Index 3 (val = 12): Pop 4, then Pop 8",
        "arrayState": [
          3,
          8,
          4,
          12,
          5
        ],
        "highlightIndices": [
          1,
          2,
          3
        ],
        "pointers": {
          "currVal": 12,
          "ngeFor4": 12,
          "ngeFor8": 12
        },
        "description": "12 > top 4 &rarr; Pop 4 (NGE for 4 is 12). 12 > top 8 &rarr; Pop 8 (NGE for 8 is 12). Push 3. Stack: [3]."
      },
      {
        "step": 5,
        "title": "Process Index 4 (val = 5 < top 12): Push 5",
        "arrayState": [
          3,
          8,
          4,
          12,
          5
        ],
        "highlightIndices": [
          4
        ],
        "pointers": {
          "currVal": 5,
          "stackSize": 2
        },
        "description": "Current val 5 < top (12). Push index 4. Array traversal complete."
      },
      {
        "step": 6,
        "title": "End of Array: Remaining Stack Elements have NGE = -1",
        "arrayState": [
          8,
          12,
          12,
          -1,
          -1
        ],
        "highlightIndices": [
          3,
          4
        ],
        "pointers": {
          "finalNGEArray": 1
        },
        "description": "Elements remaining in stack [12, 5] have no greater element to their right. Result: [8, 12, 12, -1, -1] in linear O(N) time."
      }
    ]
  },
  {
    "id": "trees",
    "name": "Trees",
    "shortDesc": "Binary trees, BST, DFS traversals (in/pre/post), BFS level-order, and LCA.",
    "fullDesc": "Master hierarchical data structures, Binary Search Trees, recursive tree properties, height/diameter computations, and Lowest Common Ancestor.",
    "difficulty": "Medium",
    "progress": 20,
    "problemsCount": 15,
    "solvedCount": 3,
    "status": "In Progress",
    "iconName": "Binary",
    "keyConcepts": [
      "Binary Tree structure: Root, Left, Right child",
      "DFS Traversals: Preorder, Inorder (sorted in BST), Postorder",
      "BFS Level-Order Traversal using Queue",
      "Binary Search Tree invariant: Left < Node < Right",
      "Lowest Common Ancestor (LCA) in BT and BST"
    ],
    "cppSyntax": "struct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nvoid inorder(TreeNode* root) {\n    if(!root) return;\n    inorder(root->left);\n    cout << root->val << \" \";\n    inorder(root->right);\n}",
    "exampleCode": "int maxDepth(TreeNode* root) {\n    if(!root) return 0;\n    return 1 + max(maxDepth(root->left), maxDepth(root->right));\n}",
    "complexity": {
      "time": "O(n)",
      "space": "O(h)",
      "description": "Tree traversals visit each node once in O(n) with O(h) call stack memory where h is tree height."
    },
    "commonMistakes": [
      {
        "title": "Assuming Local Check Validates Full BST",
        "desc": "Checking node->left < node is insufficient; all nodes in left subtree must be strictly less than node.",
        "fix": "Pass valid range [minVal, maxVal] down the recursion tree."
      },
      {
        "title": "Memory Leaks on Tree Deletion",
        "desc": "Deleting root before deleting children causes lost pointers and memory leaks.",
        "fix": "Use Postorder traversal (delete left, delete right, delete root) or smart pointers."
      }
    ],
    "dryRunSteps": [
      {
        "step": 1,
        "title": "BST Search for Key 65: Inspect Root 50",
        "arrayState": [
          50,
          30,
          70,
          20,
          40,
          60,
          80
        ],
        "highlightIndices": [
          0
        ],
        "pointers": {
          "currNode": 50,
          "target": 65
        },
        "description": "Start at Root Node (50). Compare target 65 with 50. Since 65 > 50, BST property directs search to the Right subtree."
      },
      {
        "step": 2,
        "title": "Branch Right: Inspect Node 70",
        "arrayState": [
          50,
          30,
          70,
          20,
          40,
          60,
          80
        ],
        "highlightIndices": [
          2
        ],
        "pointers": {
          "currNode": 70,
          "target": 65
        },
        "description": "Move to Right child (70). Compare 65 with 70. Since 65 < 70, BST property directs search to the Left child."
      },
      {
        "step": 3,
        "title": "Branch Left: Target 65 Found!",
        "arrayState": [
          50,
          30,
          70,
          20,
          40,
          65,
          80
        ],
        "highlightIndices": [
          5
        ],
        "pointers": {
          "currNode": 65,
          "target": 65,
          "match": 1
        },
        "description": "Move to Left child (65). Compare 65 with 65: Match found! Key located in 3 comparisons with O(log N) height."
      },
      {
        "step": 4,
        "title": "Inorder Traversal: Leftmost Leaf 20 & 30",
        "arrayState": [
          20,
          30,
          40,
          50,
          60,
          70,
          80
        ],
        "highlightIndices": [
          0,
          1
        ],
        "pointers": {
          "inorderStep": 1
        },
        "description": "Inorder traversal visits Left subtree: visits leaf 20, returns to parent 30, then visits right leaf 40."
      },
      {
        "step": 5,
        "title": "Inorder Traversal: Root 50 & Right Subtree",
        "arrayState": [
          20,
          30,
          40,
          50,
          60,
          70,
          80
        ],
        "highlightIndices": [
          3,
          4,
          5,
          6
        ],
        "pointers": {
          "inorderStep": 2
        },
        "description": "After left subtree finishes, prints root 50, then traverses right subtree [60, 70, 80]."
      },
      {
        "step": 6,
        "title": "Inorder Invariant Verified: Strictly Sorted",
        "arrayState": [
          20,
          30,
          40,
          50,
          60,
          70,
          80
        ],
        "highlightIndices": [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ],
        "pointers": {
          "sorted": 1
        },
        "description": "Inorder traversal of any valid BST produces a strictly sorted sequence in O(N) time."
      }
    ]
  },
  {
    "id": "graphs",
    "name": "Graphs",
    "shortDesc": "BFS, DFS, Dijkstra, topological sort, and cycle detection.",
    "fullDesc": "Learn graph representations (Adjacency Matrix vs List), systematic traversals (BFS, DFS), cycle detection in directed/undirected graphs, and shortest path algorithms.",
    "difficulty": "Hard",
    "progress": 10,
    "problemsCount": 15,
    "solvedCount": 1,
    "status": "In Progress",
    "iconName": "Share2",
    "keyConcepts": [
      "Adjacency List vs Adjacency Matrix space trade-offs",
      "Breadth-First Search (BFS) using Queue for shortest path",
      "Depth-First Search (DFS) using recursion for connectivity",
      "Topological Sorting (Kahn's BFS algorithm and DFS)",
      "Dijkstra's Shortest Path Algorithm using Min-Heap"
    ],
    "cppSyntax": "vector<int> bfs(int V, vector<int> adj[]) {\n    vector<int> bfsResult;\n    vector<bool> visited(V, false);\n    queue<int> q;\n    \n    q.push(0);\n    visited[0] = true;\n    \n    while(!q.empty()) {\n        int u = q.front(); q.pop();\n        bfsResult.push_back(u);\n        \n        for(int v : adj[u]) {\n            if(!visited[v]) {\n                visited[v] = true;\n                q.push(v);\n            }\n        }\n    }\n    return bfsResult;\n}",
    "exampleCode": "void dfs(int u, vector<int> adj[], vector<bool>& vis) {\n    vis[u] = true;\n    for(int v : adj[u]) {\n        if(!vis[v]) dfs(v, adj, vis);\n    }\n}",
    "complexity": {
      "time": "O(V + E)",
      "space": "O(V)",
      "description": "BFS and DFS systematically visit each vertex and traverse each edge once in O(V + E)."
    },
    "commonMistakes": [
      {
        "title": "Forgetting Visited Array in Cyclic Graphs",
        "desc": "Without visited array, traversing graph with cycles results in infinite loops.",
        "fix": "Always maintain a visited[] boolean array or unordered_set."
      },
      {
        "title": "Marking Visited on Pop Instead of Push in BFS",
        "desc": "Marking visited upon popping from queue causes duplicate vertices to be pushed multiple times.",
        "fix": "Always mark visited[v] = true immediately when pushing to the queue."
      }
    ],
    "dryRunSteps": [
      {
        "step": 1,
        "title": "BFS Start at Source Vertex 0",
        "arrayState": [
          1,
          0,
          0,
          0,
          0
        ],
        "highlightIndices": [
          0
        ],
        "pointers": {
          "currVertex": 0,
          "queueSize": 1
        },
        "description": "Graph with 5 vertices. Mark visited[0] = true. Push source vertex 0 to Queue. Queue: [0]. Traversal: []."
      },
      {
        "step": 2,
        "title": "Dequeue 0: Enqueue Neighbors 1 & 2",
        "arrayState": [
          1,
          1,
          1,
          0,
          0
        ],
        "highlightIndices": [
          1,
          2
        ],
        "pointers": {
          "popped": 0,
          "queueFront": 1
        },
        "description": "Pop 0, append to traversal. Explore neighbors of 0: nodes 1 and 2 are unvisited. Mark visited and push. Queue: [1, 2]. Traversal: [0]."
      },
      {
        "step": 3,
        "title": "Dequeue 1: Enqueue Neighbor 3",
        "arrayState": [
          1,
          1,
          1,
          1,
          0
        ],
        "highlightIndices": [
          3
        ],
        "pointers": {
          "popped": 1,
          "queueFront": 2
        },
        "description": "Pop 1, append to traversal. Discover unvisited neighbor of 1: node 3. Mark visited[3]=true, enqueue 3. Queue: [2, 3]. Traversal: [0, 1]."
      },
      {
        "step": 4,
        "title": "Dequeue 2: Enqueue Neighbor 4",
        "arrayState": [
          1,
          1,
          1,
          1,
          1
        ],
        "highlightIndices": [
          4
        ],
        "pointers": {
          "popped": 2,
          "queueFront": 3
        },
        "description": "Pop 2, append to traversal. Discover unvisited neighbor of 2: node 4. Mark visited[4]=true, enqueue 4. Queue: [3, 4]. Traversal: [0, 1, 2]."
      },
      {
        "step": 5,
        "title": "Dequeue 3 & 4: All Neighbors Visited",
        "arrayState": [
          1,
          1,
          1,
          1,
          1
        ],
        "highlightIndices": [
          3,
          4
        ],
        "pointers": {
          "popped": 3
        },
        "description": "Pop 3, append to traversal. All its neighbors already visited. Pop 4, append to traversal. Queue is now empty."
      },
      {
        "step": 6,
        "title": "BFS Traversal Complete: [0, 1, 2, 3, 4]",
        "arrayState": [
          0,
          1,
          2,
          3,
          4
        ],
        "highlightIndices": [
          0,
          1,
          2,
          3,
          4
        ],
        "pointers": {
          "totalVisited": 5
        },
        "description": "Queue empty. Level-by-level BFS traversal complete: [0, 1, 2, 3, 4] in optimal O(V + E) time."
      }
    ]
  },
  {
    "id": "dp",
    "name": "Dynamic Programming",
    "shortDesc": "Memoization, tabulation, 1D/2D DP, knapsack, and longest common subsequence.",
    "fullDesc": "Learn how to break complex problems into overlapping subproblems, store intermediate states with memoization (top-down) or tabulation (bottom-up), and optimize space.",
    "difficulty": "Hard",
    "progress": 0,
    "problemsCount": 15,
    "solvedCount": 0,
    "status": "In Progress",
    "iconName": "Sparkles",
    "keyConcepts": [
      "Overlapping Subproblems and Optimal Substructure",
      "Top-Down DP with Memoization table",
      "Bottom-Up DP with Iterative Tabulation",
      "Classic Patterns: 0/1 Knapsack, LCS, LIS, Coin Change",
      "Space Optimization: Rolling array technique"
    ],
    "cppSyntax": "int fib(int n) {\n    if(n <= 1) return n;\n    vector<int> dp(n + 1);\n    dp[0] = 0; dp[1] = 1;\n    for(int i = 2; i <= n; i++) {\n        dp[i] = dp[i - 1] + dp[i - 2];\n    }\n    return dp[n];\n}",
    "exampleCode": "int coinChange(vector<int>& coins, int amount) {\n    vector<int> dp(amount + 1, 1e9);\n    dp[0] = 0;\n    for(int i = 1; i <= amount; i++) {\n        for(int c : coins) {\n            if(i - c >= 0) {\n                dp[i] = min(dp[i], dp[i - c] + 1);\n            }\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}",
    "complexity": {
      "time": "O(n)",
      "space": "O(n)",
      "description": "Tabulation computes each subproblem once, reducing exponential runtime to linear."
    },
    "commonMistakes": [
      {
        "title": "Wrong Base Case Initialization",
        "desc": "Initializing DP table with 0 instead of infinity (or -1) when finding minimum cost.",
        "fix": "Carefully set base cases (e.g. dp[0] = 0, others to INT_MAX / 1e9)."
      },
      {
        "title": "State Transition Order Error",
        "desc": "Using uncomputed future states before calculating previous dependencies.",
        "fix": "Ensure topological order: compute smaller subproblems before larger ones."
      }
    ],
    "dryRunSteps": [
      {
        "step": 1,
        "title": "Allocate DP Table & Initialize Base Cases",
        "arrayState": [
          0,
          1,
          0,
          0,
          0,
          0,
          0
        ],
        "highlightIndices": [
          0,
          1
        ],
        "pointers": {
          "dp0": 0,
          "dp1": 1
        },
        "description": "Allocate dp array of size N + 1 (size 7 for N = 6). Base cases: dp[0] = 0, dp[1] = 1. Remaining cells uncomputed."
      },
      {
        "step": 2,
        "title": "Iteration i = 2: dp[2] = dp[1] + dp[0] = 1",
        "arrayState": [
          0,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        "highlightIndices": [
          2
        ],
        "pointers": {
          "i": 2,
          "computed": 1
        },
        "description": "Compute dp[2] = dp[1] + dp[0] = 1 + 0 = 1. Subproblem state 2 cached in table in O(1) time."
      },
      {
        "step": 3,
        "title": "Iteration i = 3: dp[3] = dp[2] + dp[1] = 2",
        "arrayState": [
          0,
          1,
          1,
          2,
          0,
          0,
          0
        ],
        "highlightIndices": [
          3
        ],
        "pointers": {
          "i": 3,
          "computed": 2
        },
        "description": "Compute dp[3] = dp[2] + dp[1] = 1 + 1 = 2. Direct lookup of previous two table cells."
      },
      {
        "step": 4,
        "title": "Iteration i = 4: dp[4] = dp[3] + dp[2] = 3",
        "arrayState": [
          0,
          1,
          1,
          2,
          3,
          0,
          0
        ],
        "highlightIndices": [
          4
        ],
        "pointers": {
          "i": 4,
          "computed": 3
        },
        "description": "Compute dp[4] = dp[3] + dp[2] = 2 + 1 = 3."
      },
      {
        "step": 5,
        "title": "Iteration i = 5: dp[5] = dp[4] + dp[3] = 5",
        "arrayState": [
          0,
          1,
          1,
          2,
          3,
          5,
          0
        ],
        "highlightIndices": [
          5
        ],
        "pointers": {
          "i": 5,
          "computed": 5
        },
        "description": "Compute dp[5] = dp[4] + dp[3] = 3 + 2 = 5."
      },
      {
        "step": 6,
        "title": "Iteration i = 6: dp[6] = dp[5] + dp[4] = 8 (Final Answer)",
        "arrayState": [
          0,
          1,
          1,
          2,
          3,
          5,
          8
        ],
        "highlightIndices": [
          6
        ],
        "pointers": {
          "i": 6,
          "result": 8
        },
        "description": "Final iteration: dp[6] = 5 + 3 = 8. Solved in strict O(N) linear time and O(1) space with 2 variables!"
      }
    ]
  }
];

const buildProblem = (
  id: string,
  title: string,
  topicId: string,
  difficulty: 'Easy' | 'Medium' | 'Hard',
  acceptance: string,
  solved: boolean,
  leetcodeUrl: string,
  statement: string,
  expectedTime: string,
  expectedSpace: string,
  hints: string[]
): DSAProblem => ({
  id,
  title,
  topicId,
  difficulty,
  acceptance,
  solved,
  platform: 'LeetCode',
  leetcodeUrl,
  statement,
  examples: [
    { input: "See problem description on LeetCode", output: "Matches LeetCode specification", explanation: "Verified test case" }
  ],
  constraints: ["1 <= n <= 10^5", "All elements within standard C++ integer constraints"],
  hints,
  expectedTime,
  expectedSpace,
  starterCode: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    // Implement your C++ solution here\n};`,
  solutionCode: `// Optimized C++ solution on LeetCode: ${leetcodeUrl}`,
  testCases: [{ input: "Standard test case", expectedOutput: "Valid output" }]
});

export const dsaProblems: DSAProblem[] = [
  // 1-4: Arrays (4)
  buildProblem(
    "two-sum",
    "Two Sum",
    "arrays",
    "Easy",
    "53.2%",
    true,
    "https://leetcode.com/problems/two-sum/",
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    "O(n)",
    "O(n)",
    [
      "Brute force checks all pairs in O(n^2) time.",
      "Use an unordered_map to store seen numbers and their indices for O(1) complement lookup."
    ]
  ),
  buildProblem(
    "best-time-to-buy-and-sell-stock",
    "Best Time to Buy and Sell Stock",
    "arrays",
    "Easy",
    "54.1%",
    true,
    "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a future day to sell.",
    "O(n)",
    "O(1)",
    [
      "Track the minimum price seen so far as you iterate.",
      "At each day, calculate prices[i] - minPrice and update maxProfit."
    ]
  ),
  buildProblem(
    "maximum-subarray",
    "Maximum Subarray (Kadane's Algorithm)",
    "arrays",
    "Medium",
    "51.0%",
    true,
    "https://leetcode.com/problems/maximum-subarray/",
    "Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.",
    "O(n)",
    "O(1)",
    [
      "Use Kadane's algorithm: maintain a running currentSum.",
      "If currentSum drops below 0, reset it to 0."
    ]
  ),
  buildProblem(
    "product-of-array-except-self",
    "Product of Array Except Self",
    "arrays",
    "Medium",
    "66.4%",
    false,
    "https://leetcode.com/problems/product-of-array-except-self/",
    "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i], without using division.",
    "O(n)",
    "O(1)",
    [
      "Compute prefix products in a forward pass.",
      "Multiply by suffix products in a backward pass using a single running variable."
    ]
  ),

  // 5-7: Searching (3)
  buildProblem(
    "binary-search",
    "Binary Search",
    "searching",
    "Easy",
    "58.1%",
    true,
    "https://leetcode.com/problems/binary-search/",
    "Given an array of integers nums which is sorted in ascending order, and an integer target, search target in nums and return its index or -1.",
    "O(log n)",
    "O(1)",
    [
      "Compare target with the middle element mid = low + (high - low) / 2.",
      "Halve the search space in each step based on comparison."
    ]
  ),
  buildProblem(
    "search-in-rotated-sorted-array",
    "Search in Rotated Sorted Array",
    "searching",
    "Medium",
    "41.2%",
    true,
    "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "Given a sorted and rotated array of unique elements nums and an integer target, return the index of target if it is in nums, or -1 otherwise in O(log n) time.",
    "O(log n)",
    "O(1)",
    [
      "At any mid, at least one half (left..mid or mid..right) is strictly sorted.",
      "Check which half is sorted, then check if target lies within that sorted boundary."
    ]
  ),
  buildProblem(
    "find-minimum-in-rotated-sorted-array",
    "Find Minimum in Rotated Sorted Array",
    "searching",
    "Medium",
    "50.9%",
    false,
    "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Find the minimum element in O(log n) time.",
    "O(log n)",
    "O(1)",
    [
      "Compare nums[mid] with nums[high].",
      "If nums[mid] > nums[high], the minimum must be in the right half (low = mid + 1)."
    ]
  ),

  // 8-10: Sorting (3)
  buildProblem(
    "sort-an-array",
    "Sort an Array (Merge Sort)",
    "sorting",
    "Medium",
    "57.3%",
    true,
    "https://leetcode.com/problems/sort-an-array/",
    "Given an array of integers nums, sort the array in ascending order and return it in O(n log n) time complexity.",
    "O(n log n)",
    "O(n)",
    [
      "Divide the array recursively into two halves until size is 1.",
      "Merge the two sorted halves using a temporary vector."
    ]
  ),
  buildProblem(
    "merge-intervals",
    "Merge Intervals",
    "sorting",
    "Medium",
    "47.8%",
    false,
    "https://leetcode.com/problems/merge-intervals/",
    "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals and return an array of non-overlapping intervals.",
    "O(n log n)",
    "O(n)",
    [
      "Sort intervals by their start time first.",
      "Iterate and merge if current.start <= previous.end."
    ]
  ),
  buildProblem(
    "sort-colors",
    "Sort Colors (Dutch National Flag)",
    "sorting",
    "Medium",
    "63.5%",
    false,
    "https://leetcode.com/problems/sort-colors/",
    "Given an array nums with n objects colored red (0), white (1), or blue (2), sort them in-place so that objects of the same color are adjacent.",
    "O(n)",
    "O(1)",
    [
      "Maintain three pointers: low, mid, and high.",
      "Swap 0s to low, keep 1s at mid, and swap 2s to high."
    ]
  ),

  // 11-13: Hashing (3)
  buildProblem(
    "valid-anagram",
    "Valid Anagram",
    "hashing",
    "Easy",
    "65.1%",
    true,
    "https://leetcode.com/problems/valid-anagram/",
    "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    "O(n)",
    "O(1)",
    [
      "Count character frequencies using a fixed-size array of length 26.",
      "Increment for s and decrement for t, then verify all counts are zero."
    ]
  ),
  buildProblem(
    "group-anagrams",
    "Group Anagrams",
    "hashing",
    "Medium",
    "68.9%",
    false,
    "https://leetcode.com/problems/group-anagrams/",
    "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    "O(n * k log k)",
    "O(n * k)",
    [
      "Use an unordered_map<string, vector<string>>.",
      "Sort each word to use as the canonical hash key."
    ]
  ),
  buildProblem(
    "longest-consecutive-sequence",
    "Longest Consecutive Sequence",
    "hashing",
    "Medium",
    "47.3%",
    false,
    "https://leetcode.com/problems/longest-consecutive-sequence/",
    "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence in O(n) time.",
    "O(n)",
    "O(n)",
    [
      "Insert all elements into an unordered_set for O(1) lookups.",
      "Only start counting a streak from numbers x where (x - 1) is NOT in the set."
    ]
  ),

  // 14-16: Recursion & Backtracking (3)
  buildProblem(
    "subsets",
    "Subsets",
    "recursion",
    "Medium",
    "78.4%",
    true,
    "https://leetcode.com/problems/subsets/",
    "Given an integer array nums of unique elements, return all possible subsets (the power set).",
    "O(n * 2^n)",
    "O(n)",
    [
      "At each index, make two recursive choices: include nums[i] or exclude nums[i].",
      "Remember to pop_back() when backtracking."
    ]
  ),
  buildProblem(
    "permutations",
    "Permutations",
    "recursion",
    "Medium",
    "79.1%",
    false,
    "https://leetcode.com/problems/permutations/",
    "Given an array nums of distinct integers, return all the possible permutations in any order.",
    "O(n * n!)",
    "O(n)",
    [
      "Swap the current index with each subsequent index i from idx to n-1.",
      "Recurse for idx + 1, then swap back to restore state."
    ]
  ),
  buildProblem(
    "combination-sum",
    "Combination Sum",
    "recursion",
    "Medium",
    "72.0%",
    false,
    "https://leetcode.com/problems/combination-sum/",
    "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.",
    "O(2^t)",
    "O(t)",
    [
      "Build a recursive decision tree where you can reuse the same index i if remaining target >= candidates[i].",
      "Base cases: remaining == 0 (valid combination) or remaining < 0 (prune branch)."
    ]
  ),

  // 17-19: Linked Lists (3)
  buildProblem(
    "reverse-linked-list",
    "Reverse Linked List",
    "linked-lists",
    "Easy",
    "77.2%",
    true,
    "https://leetcode.com/problems/reverse-linked-list/",
    "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    "O(n)",
    "O(1)",
    [
      "Track three pointers: prev = nullptr, curr = head, and nextTemp.",
      "Rewire curr->next = prev in each step."
    ]
  ),
  buildProblem(
    "linked-list-cycle",
    "Linked List Cycle",
    "linked-lists",
    "Easy",
    "50.8%",
    false,
    "https://leetcode.com/problems/linked-list-cycle/",
    "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    "O(n)",
    "O(1)",
    [
      "Use Floyd's Cycle Detection (slow and fast pointers).",
      "Move slow by 1 step and fast by 2 steps; if they meet, a cycle exists."
    ]
  ),
  buildProblem(
    "merge-two-sorted-lists",
    "Merge Two Sorted Lists",
    "linked-lists",
    "Easy",
    "65.0%",
    false,
    "https://leetcode.com/problems/merge-two-sorted-lists/",
    "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.",
    "O(n + m)",
    "O(1)",
    [
      "Create a dummy node to simplify head edge cases.",
      "Compare list1->val and list2->val and attach the smaller node."
    ]
  ),

  // 20-22: Stacks & Queues (3)
  buildProblem(
    "valid-parentheses",
    "Valid Parentheses",
    "stacks-queues",
    "Easy",
    "40.9%",
    true,
    "https://leetcode.com/problems/valid-parentheses/",
    "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "O(n)",
    "O(n)",
    [
      "Push opening brackets onto a stack.",
      "On a closing bracket, check if the stack is non-empty and top matches."
    ]
  ),
  buildProblem(
    "min-stack",
    "Min Stack",
    "stacks-queues",
    "Medium",
    "54.8%",
    false,
    "https://leetcode.com/problems/min-stack/",
    "Design a stack that supports push, pop, top, and retrieving the minimum element in constant O(1) time.",
    "O(1)",
    "O(n)",
    [
      "Store pairs {val, currentMin} in the stack.",
      "Each pushed element records the minimum up to that point."
    ]
  ),
  buildProblem(
    "daily-temperatures",
    "Daily Temperatures",
    "stacks-queues",
    "Medium",
    "66.1%",
    false,
    "https://leetcode.com/problems/daily-temperatures/",
    "Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",
    "O(n)",
    "O(n)",
    [
      "Maintain a monotonic decreasing stack of indices.",
      "When current temperature > temperatures[st.top()], pop and record i - st.top()."
    ]
  ),

  // 23-25: Trees (3)
  buildProblem(
    "maximum-depth-of-binary-tree",
    "Maximum Depth of Binary Tree",
    "trees",
    "Easy",
    "75.8%",
    false,
    "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "Given the root of a binary tree, return its maximum depth (number of nodes along the longest path from root down to the farthest leaf).",
    "O(n)",
    "O(h)",
    [
      "Base case: if root == nullptr return 0.",
      "Return 1 + max(maxDepth(root->left), maxDepth(root->right))."
    ]
  ),
  buildProblem(
    "invert-binary-tree",
    "Invert Binary Tree",
    "trees",
    "Easy",
    "77.1%",
    false,
    "https://leetcode.com/problems/invert-binary-tree/",
    "Given the root of a binary tree, invert the tree (mirror left and right subtrees), and return its root.",
    "O(n)",
    "O(h)",
    [
      "Swap root->left and root->right at each node.",
      "Recursively invert the left and right subtrees."
    ]
  ),
  buildProblem(
    "lowest-common-ancestor-of-a-binary-search-tree",
    "Lowest Common Ancestor of a BST",
    "trees",
    "Medium",
    "65.6%",
    false,
    "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.",
    "O(h)",
    "O(1)",
    [
      "Leverage BST property: if both p and q are smaller than root, move left.",
      "If both are larger than root, move right; otherwise root is the split point (LCA)."
    ]
  ),

  // 26-28: Graphs (3)
  buildProblem(
    "number-of-islands",
    "Number of Islands",
    "graphs",
    "Medium",
    "60.1%",
    false,
    "https://leetcode.com/problems/number-of-islands/",
    "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    "O(m * n)",
    "O(m * n)",
    [
      "Iterate through each cell; when you see '1', increment island count and launch DFS/BFS.",
      "Mark visited land cells as '0' so they are not counted again."
    ]
  ),
  buildProblem(
    "clone-graph",
    "Clone Graph",
    "graphs",
    "Medium",
    "58.9%",
    false,
    "https://leetcode.com/problems/clone-graph/",
    "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
    "O(V + E)",
    "O(V)",
    [
      "Use an unordered_map<Node*, Node*> to map original nodes to cloned nodes.",
      "Traverse using BFS or DFS and populate neighbors from the map."
    ]
  ),
  buildProblem(
    "course-schedule",
    "Course Schedule (Topological Sort)",
    "graphs",
    "Medium",
    "47.4%",
    false,
    "https://leetcode.com/problems/course-schedule/",
    "There are a total of numCourses courses you have to take. Given prerequisites pairs, return true if you can finish all courses (detect if the directed graph is acyclic).",
    "O(V + E)",
    "O(V + E)",
    [
      "Use Kahn's Algorithm (BFS with in-degree array).",
      "Push all nodes with in-degree 0 into a queue and count how many nodes get processed."
    ]
  ),

  // 29-30: Dynamic Programming (2)
  buildProblem(
    "climbing-stairs",
    "Climbing Stairs",
    "dp",
    "Easy",
    "53.0%",
    false,
    "https://leetcode.com/problems/climbing-stairs/",
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    "O(n)",
    "O(1)",
    [
      "ways(n) = ways(n - 1) + ways(n - 2), which follows the Fibonacci sequence.",
      "Maintain two variables prev1 and prev2 for O(1) space."
    ]
  ),
  buildProblem(
    "coin-change",
    "Coin Change",
    "dp",
    "Medium",
    "44.8%",
    false,
    "https://leetcode.com/problems/coin-change/",
    "You are given an integer array coins representing coins of different denominations and an integer amount. Return the fewest number of coins that you need to make up that amount.",
    "O(amount * n)",
    "O(amount)",
    [
      "Create a 1D DP array dp[amount + 1] initialized to infinity, with dp[0] = 0.",
      "For each amount i from 1 to amount, try every coin: dp[i] = min(dp[i], 1 + dp[i - coin])."
    ]
  )
];

// Mistake Journal Initial Data
export const mockMistakes: MistakeEntry[] = [
  {
    id: "m-1",
    problemId: "binary-search",
    problemTitle: "Binary Search",
    topic: "Searching",
    mistakeType: "Boundary Condition",
    date: "2026-08-12",
    whatWentWrong: "Used low < high instead of low <= high. Missed searching single-element subarray.",
    whatILearned: "When boundaries low and high are inclusive, the loop condition must be low <= high.",
    reviewed: false
  },
  {
    id: "m-2",
    problemId: "subsets",
    problemTitle: "Subsets Generation",
    topic: "Recursion",
    mistakeType: "Logic Error",
    date: "2026-08-10",
    whatWentWrong: "Forgot to call pop_back() after the recursive call, causing accumulation of unwanted elements in current vector.",
    whatILearned: "Backtracking step is essential to clean up global/reference state before visiting sibling branches.",
    reviewed: true
  },
  {
    id: "m-3",
    problemId: "two-sum",
    problemTitle: "Two Sum",
    topic: "Hashing",
    mistakeType: "Off-by-one",
    date: "2026-08-08",
    whatWentWrong: "Checked map after inserting current element, causing pair matching with itself when target == 2 * val.",
    whatILearned: "Check map complement BEFORE inserting current element into hash map.",
    reviewed: true
  }
];

// Challenges Data
export const mockChallenges: Challenge[] = [
  {
    id: "7-day-arrays",
    title: "7-Day Arrays Mastery",
    description: "Conquer Two Pointers, Sliding Window, and Prefix Sums in 7 days.",
    durationDays: 7,
    totalProblems: 14,
    completedProblems: 10,
    difficulty: "Beginner",
    status: "In Progress",
    tags: ["Arrays", "Two Pointers", "Prefix Sum"]
  },
  {
    id: "recursion-sprint",
    title: "Recursion & Backtracking Sprint",
    description: "Build call-stack mental models and master subset & permutation generation.",
    durationDays: 10,
    totalProblems: 12,
    completedProblems: 4,
    difficulty: "Intermediate",
    status: "In Progress",
    tags: ["Recursion", "Backtracking", "Subsets"]
  },
  {
    id: "30-days-dsa",
    title: "30 Days of Core DSA",
    description: "Complete roadmap covering Arrays, Trees, Graphs, and DP.",
    durationDays: 30,
    totalProblems: 30,
    completedProblems: 10,
    difficulty: "Advanced",
    status: "In Progress",
    tags: ["Full DSA", "Interview Prep"]
  }
];

// Contests Mock Data (kept for type compatibility)
export const mockContests: Contest[] = [];

// Community Forum Topics
export const communityTopics = [
  "All",
  "Arrays",
  "Searching",
  "Sorting",
  "Hashing",
  "Recursion",
  "Linked Lists",
  "Stacks & Queues",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Interview Prep"
];

// Community Mock Forum Posts (segregated by topic)
export const mockCommunityPosts: CommunityPost[] = [
  {
    id: "post-1",
    author: "Rohan V.",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    authorRole: "CS Undergraduate",
    title: "How I finally developed intuition for Recursion and Call Stacks!",
    content: "When starting with recursion, drawing the recursion tree on paper helped me 100x more than staring at code. Always write your base case first, then trust the recursive leap of faith for (n - 1), and remember to pop_back() when backtracking!",
    topic: "Recursion",
    tags: ["Recursion", "Backtracking", "C++"],
    likes: 42,
    commentsCount: 15,
    timeAgo: "2 hours ago"
  },
  {
    id: "post-2",
    author: "Ananya Roy",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    authorRole: "Software Engineer Intern",
    title: "Binary Search tricks every beginner fails on (boundary conditions)",
    content: "Always remember: low <= high vs low < high depends on whether high is inclusive (n-1) or exclusive (n). Also use low + (high - low) / 2 to avoid 32-bit signed integer overflow in C++!",
    topic: "Searching",
    tags: ["Searching", "Binary Search", "Interview Prep"],
    likes: 89,
    commentsCount: 24,
    timeAgo: "5 hours ago"
  },
  {
    id: "post-3",
    author: "Dev K.",
    authorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    authorRole: "4th Year Engineering Student",
    title: "Best approach to master Graph BFS and DFS for tech interviews?",
    content: "Start with Number of Islands (grid DFS/BFS), then Clone Graph, and then Course Schedule (Kahn's topological sort). Marking nodes visited BEFORE pushing to the BFS queue prevents TLE on dense graphs!",
    topic: "Graphs",
    tags: ["Graphs", "BFS", "DFS"],
    likes: 31,
    commentsCount: 11,
    timeAgo: "1 day ago"
  },
  {
    id: "post-4",
    author: "Siddharth M.",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    authorRole: "3rd Year IT Student",
    title: "When to use Two Pointers vs Sliding Window on Array problems",
    content: "Use Two Pointers (left = 0, right = n - 1) when dealing with sorted pairs or palindromes. Use Sliding Window when finding longest/shortest contiguous subarrays satisfying a condition in O(N) time.",
    topic: "Arrays",
    tags: ["Arrays", "Two Pointers", "Sliding Window"],
    likes: 54,
    commentsCount: 9,
    timeAgo: "1 day ago"
  },
  {
    id: "post-5",
    author: "Neha Kulkarni",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    authorRole: "Final Year CS Student",
    title: "Avoiding O(N) hash collisions in C++ unordered_map",
    content: "In time-critical tests, unordered_map can hit worst-case O(N) per lookup if many keys collide. Reserve bucket space with mp.reserve(n) and set mp.max_load_factor(0.25) for consistent O(1) lookups.",
    topic: "Hashing",
    tags: ["Hashing", "C++ STL", "Optimization"],
    likes: 37,
    commentsCount: 7,
    timeAgo: "2 days ago"
  },
  {
    id: "post-6",
    author: "Aarav Deshmukh",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    authorRole: "Placement Coordinator",
    title: "From Memoization to Tabulation: 3-Step DP Framework",
    content: "Step 1: Define state parameters (e.g., idx and remaining capacity). Step 2: Write top-down recursion with a dp memo table initialized to -1. Step 3: Convert base cases into table row 0 and iterate bottom-up.",
    topic: "Dynamic Programming",
    tags: ["Dynamic Programming", "Interview Prep"],
    likes: 63,
    commentsCount: 18,
    timeAgo: "3 days ago"
  },
  {
    id: "post-7",
    author: "Karan Patil",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    authorRole: "3rd Year CS Student",
    title: "Monotonic Stack pattern explained for Daily Temperatures & Next Greater Element",
    content: "Whenever a problem asks for the next greater or smaller element to the left/right, push array indices onto a stack while maintaining monotonic order. Each element is pushed and popped at most once, giving O(N) time!",
    topic: "Stacks & Queues",
    tags: ["Stacks & Queues", "Monotonic Stack"],
    likes: 29,
    commentsCount: 6,
    timeAgo: "4 days ago"
  }
];
