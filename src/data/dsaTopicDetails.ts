export interface OperationComplexity { operation: string; time: string; space: string; notes: string; }
export interface DetailedComplexity { time: string; space: string; best: string; average: string; worst: string; auxiliarySpace: string; stackBehavior: string; derivation: string; operationsTable: OperationComplexity[]; }
export interface DetailedMistake { title: string; desc: string; fix: string; wrongCode?: string; correctCode?: string; }
export interface TopicDetailItem { complexity: DetailedComplexity; commonMistakes: DetailedMistake[]; syntax: string; example: string; }

export const detailedTopicData: Record<string, TopicDetailItem> = {
  "cpp-basics": {
    "complexity": {
      "time": "O(1) Memory Access",
      "space": "O(1) Auxiliary / O(N) Dynamic",
      "best": "O(1) for pointer dereference, address lookup, and vector random access",
      "average": "O(1) for arithmetic & dereferencing; O(1) amortized for vector push_back",
      "worst": "O(N) for vector capacity doubling reallocation copy",
      "auxiliarySpace": "O(1) for pointer and reference variables; O(N) for heap allocations",
      "stackBehavior": "Stack allocations are automatic, LIFO, and instant (CPU stack pointer offset adjustment). Heap memory allocated with 'new' must be explicitly freed with 'delete' to prevent leaks.",
      "derivation": "Dereferencing a pointer computes physical address instantly via hardware memory controller: Address = Base + (Offset * sizeof(T)). No iteration is performed. Vector dynamic resizing allocates 2x capacity on the heap, copying previous N elements in O(N) time; when amortized across N insertions, each push_back costs O(1) on average.",
      "operationsTable": [
        {
          "operation": "Pointer Dereferencing (*p)",
          "time": "O(1)",
          "space": "O(1)",
          "notes": "Instant hardware memory access"
        },
        {
          "operation": "Address-Of Operator (&x)",
          "time": "O(1)",
          "space": "O(1)",
          "notes": "Returns variable memory address"
        },
        {
          "operation": "Pass-by-Reference",
          "time": "O(1)",
          "space": "O(1)",
          "notes": "Binds alias without copying object"
        },
        {
          "operation": "Pass-by-Value (size N)",
          "time": "O(N)",
          "space": "O(N)",
          "notes": "Copies entire vector/string buffer"
        },
        {
          "operation": "Vector push_back",
          "time": "O(1) amortized",
          "space": "O(1)",
          "notes": "O(N) only on capacity doubling"
        },
        {
          "operation": "Vector Random Access v[i]",
          "time": "O(1)",
          "space": "O(1)",
          "notes": "Direct contiguous offset access"
        }
      ]
    },
    "commonMistakes": [
      {
        "title": "Dangling Pointers after delete",
        "desc": "Accessing or dereferencing a pointer after its heap memory has been deallocated with delete causes undefined behavior or memory corruption.",
        "fix": "Set pointers to nullptr immediately after delete, or use modern RAII wrappers like std::unique_ptr.",
        "wrongCode": "int* p = new int(10);\ndelete p;\ncout << *p; // UNDEFINED BEHAVIOR: Dangling pointer!",
        "correctCode": "int* p = new int(10);\ndelete p;\np = nullptr; // Safe\n// Even better: use std::unique_ptr<int> p = std::make_unique<int>(10);"
      },
      {
        "title": "Pass-by-Value Overhead on Large Containers",
        "desc": "Passing large vectors or strings by value copies all N elements onto the function call stack, converting an O(1) call into an expensive O(N) operation.",
        "fix": "Pass by const reference (const vector<int>& v) for read-only access, or non-const reference (vector<int>& v) for in-place modifications.",
        "wrongCode": "void printData(vector<int> nums) { // Copies all elements!\n    for(int x : nums) cout << x << ' ';\n}",
        "correctCode": "void printData(const vector<int>& nums) { // O(1) zero-copy pass\n    for(int x : nums) cout << x << ' ';\n}"
      },
      {
        "title": "Memory Leak: Mismatched new[] and delete",
        "desc": "Allocating an array using new int[N] but freeing it with scalar delete (instead of delete[]) fails to invoke destructors and leaks allocated bytes.",
        "fix": "Always pair new[] with delete[], or preferably use std::vector which handles deallocation automatically via RAII.",
        "wrongCode": "int* arr = new int[100];\ndelete arr; // BUG: Should be delete[] arr",
        "correctCode": "int* arr = new int[100];\ndelete[] arr; // Correct array deallocation\narr = nullptr;"
      },
      {
        "title": "Vector Out-of-Bounds Undefined Behavior",
        "desc": "Using the subscript operator v[i] when i >= v.size() does not perform bounds checking and accesses arbitrary process memory.",
        "fix": "Use v.size() checks before indexing, or use v.at(i) during debugging to trigger a std::out_of_range exception.",
        "wrongCode": "vector<int> v = {1, 2, 3};\ncout << v[5]; // Undefined behavior, silent corruption!",
        "correctCode": "vector<int> v = {1, 2, 3};\nif (5 < v.size()) cout << v[5];\n// Or use: cout << v.at(5); // Throws catchable exception"
      }
    ],
    "syntax": "// C++ Memory, Pointers & STL Vector Core Patterns\n#include <iostream>\n#include <vector>\n#include <memory>\n\nusing namespace std;\n\n// 1. Pass-by-reference pattern\nvoid modifyByRef(int &val, vector<int> &vec) {\n    val += 10;\n    vec.push_back(val);\n}\n\n// 2. Fast I/O desynchronization\nvoid fastIO() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n}",
    "example": "#include <iostream>\n#include <vector>\n#include <numeric>\n\nusing namespace std;\n\nvoid swapPointers(int* &a, int* &b) {\n    int* temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int x = 42, y = 99;\n    int* p1 = &x;\n    int* p2 = &y;\n\n    cout << \"Initial values: *p1 = \" << *p1 << \", *p2 = \" << *p2 << \"\\n\";\n    swapPointers(p1, p2);\n    cout << \"After pointer swap: *p1 = \" << *p1 << \", *p2 = \" << *p2 << \"\\n\";\n\n    // Dynamic STL Vector demonstration\n    vector<int> dynamicList = {10, 20, 30};\n    dynamicList.push_back(40);\n    dynamicList.push_back(50);\n\n    cout << \"Vector elements (size: \" << dynamicList.size() << \", capacity: \" << dynamicList.capacity() << \"): \";\n    for (const int &val : dynamicList) {\n        cout << val << \" \";\n    }\n    cout << \"\\n\";\n\n    return 0;\n}"
  },
  "time-complexity": {
    "complexity": {
      "time": "Asymptotic Analysis O(1) to O(2^N)",
      "space": "O(1) Auxiliary to O(N) Stack Space",
      "best": "Omega(1) for early exit conditions in searching or sorted checks",
      "average": "Theta(N) or Theta(N log N) based on operation counting",
      "worst": "Big-O represents tight asymptotic upper bound as N -> infinity",
      "auxiliarySpace": "Auxiliary space measures solely the extra memory used by an algorithm, excluding input size",
      "stackBehavior": "Recursive algorithms consume O(depth) call stack memory. Each active function call frame consumes ~32 to 64 bytes on the execution stack.",
      "derivation": "Count dominant loop iterations and recurrence relations. For divide and conquer, Master Theorem T(N) = aT(N/b) + O(N^d) classifies complexity into O(N log N), O(N^d), or O(N^(log_b a)). In nested loops, sum from i=1 to N of outer * inner iterations.",
      "operationsTable": [
        {
          "operation": "Constant Time O(1)",
          "time": "O(1)",
          "space": "O(1)",
          "notes": "Independent of N (hash lookup, bit shift)"
        },
        {
          "operation": "Logarithmic Time O(log N)",
          "time": "O(log N)",
          "space": "O(1)",
          "notes": "Problem size halved each step (Binary Search)"
        },
        {
          "operation": "Linear Time O(N)",
          "time": "O(N)",
          "space": "O(1)",
          "notes": "Single pass traversal over array"
        },
        {
          "operation": "Linearithmic Time O(N log N)",
          "time": "O(N log N)",
          "space": "O(N)",
          "notes": "Merge Sort, QuickSort average"
        },
        {
          "operation": "Quadratic Time O(N^2)",
          "time": "O(N^2)",
          "space": "O(1)",
          "notes": "Double nested loops, Bubble Sort"
        },
        {
          "operation": "Exponential Time O(2^N)",
          "time": "O(2^N)",
          "space": "O(N)",
          "notes": "Recursive branching without memoization"
        }
      ]
    },
    "commonMistakes": [
      {
        "title": "Confusing Worst-Case with Average-Case",
        "desc": "Assuming QuickSort is always O(N log N) when an unrandomized pivot on sorted input degrades to O(N^2).",
        "fix": "State your pivot assumptions explicitly and use randomized pivots to ensure O(N log N) expectation.",
        "wrongCode": "// Assuming QuickSort is always guaranteed O(N log N)",
        "correctCode": "// QuickSort: Average O(N log N), Worst-case O(N^2).\n// MergeSort: Guaranteed O(N log N) in all cases."
      },
      {
        "title": "Ignoring Hidden In-Loop Complexity",
        "desc": "Calling methods like string::substr(), vector::insert(), or find() inside a loop turns an O(N) loop into an O(N^2) quadratic trap.",
        "fix": "Analyze the time complexity of library functions called inside your loops.",
        "wrongCode": "for(int i = 0; i < s.length(); i++) {\n    string sub = s.substr(i); // substr is O(N)! Overall: O(N^2)\n}",
        "correctCode": "// Use string_view or index pointers to avoid copying:\nstring_view sv = s;\nfor(size_t i = 0; i < sv.length(); i++) {\n    auto sub = sv.substr(i); // O(1) view, overall: O(N)\n}"
      },
      {
        "title": "Forgetting Call Stack in Space Complexity",
        "desc": "Reporting O(1) space for recursive algorithms simply because no dynamic arrays were allocated.",
        "fix": "Always factor recursive call stack depth into auxiliary space calculations.",
        "wrongCode": "int depthFirst(Node* root) {\n    if(!root) return 0;\n    return 1 + depthFirst(root->left); // Space reported as O(1) -> WRONG!\n}",
        "correctCode": "// Space complexity is O(H) where H is tree height due to activation records on the call stack."
      },
      {
        "title": "Dropping High-Order Variable Terms in Multi-Input Algorithms",
        "desc": "Simplifying an algorithm taking inputs of size N and M as O(N) when both bounds independently control runtime.",
        "fix": "Keep all non-constant independent input terms: write O(N + M) or O(N * M) rather than arbitrarily dropping one.",
        "wrongCode": "// Loop over Graph: V vertices and E edges -> Simplified to O(V) -> WRONG!",
        "correctCode": "// Graph traversal runs in O(V + E) time, keeping both parameters."
      }
    ],
    "syntax": "// Measuring and Comparing Algorithmic Complexity in C++\n#include <iostream>\n#include <chrono>\n\nusing namespace std;\n\n// 1. Logarithmic growth loop: O(log N)\nvoid logarithmicStep(int n) {\n    while(n > 0) {\n        n /= 2; // Halving input size\n    }\n}\n\n// 2. Linearithmic growth loop: O(N log N)\nvoid linearithmicStep(int n) {\n    for(int i = 0; i < n; i++) {\n        for(int j = 1; j < n; j *= 2) {\n            // Inner loop runs log(N) times\n        }\n    }\n}",
    "example": "#include <iostream>\n#include <vector>\n#include <cmath>\n\nusing namespace std;\n\n// Demonstrating O(N) vs O(log N) operation counts\nint linearCount(int n) {\n    int ops = 0;\n    for (int i = 0; i < n; i++) {\n        ops++;\n    }\n    return ops;\n}\n\nint logarithmicCount(int n) {\n    int ops = 0;\n    while (n > 1) {\n        n /= 2;\n        ops++;\n    }\n    return ops;\n}\n\nint main() {\n    int n = 1048576; // 2^20 elements (~1 million)\n\n    cout << \"Input Size N = \" << n << \"\\n\";\n    cout << \"Linear Operations O(N): \" << linearCount(n) << \" steps\\n\";\n    cout << \"Logarithmic Operations O(log2 N): \" << logarithmicCount(n) << \" steps\\n\";\n    cout << \"Efficiency Ratio: Linear takes \" << (linearCount(n) / logarithmicCount(n)) << \"x more operations!\\n\";\n\n    return 0;\n}"
  },
  "arrays": {
    "complexity": {
      "time": "O(1) Access / O(N) Scan",
      "space": "O(1) In-Place / O(N) Memory",
      "best": "O(1) for random access via index, and O(1) amortized for tail insertion",
      "average": "O(N) for linear search, two-pointer scan, sliding window, and Kadane's max subarray",
      "worst": "O(N) for insertion or deletion at index 0 (shifting all subsequent elements)",
      "auxiliarySpace": "O(1) for in-place pointer techniques; O(N) when building prefix sum arrays",
      "stackBehavior": "Static arrays (int arr[N]) live on the stack; std::vector dynamically manages its contiguous memory block on the heap.",
      "derivation": "Contiguous layout guarantees Address(i) = Base + (i * sizeof(T)). Memory lookups require a single addition and memory bus read (O(1)). Shifting elements on mid-array insertion requires moving N - i elements one by one, giving worst-case O(N).",
      "operationsTable": [
        {
          "operation": "Index Access arr[i]",
          "time": "O(1)",
          "space": "O(1)",
          "notes": "Instant hardware pointer arithmetic"
        },
        {
          "operation": "Append at End (push_back)",
          "time": "O(1) amortized",
          "space": "O(1)",
          "notes": "O(N) only during capacity doubling"
        },
        {
          "operation": "Insert at Beginning",
          "time": "O(N)",
          "space": "O(1)",
          "notes": "Requires shifting all N elements right"
        },
        {
          "operation": "Delete at Beginning",
          "time": "O(N)",
          "space": "O(1)",
          "notes": "Requires shifting all N elements left"
        },
        {
          "operation": "Two-Pointer Convergence",
          "time": "O(N)",
          "space": "O(1)",
          "notes": "Left & Right meet in single linear pass"
        },
        {
          "operation": "Prefix Sum Range Query",
          "time": "O(1)",
          "space": "O(N)",
          "notes": "prefix[R+1] - prefix[L] after O(N) prep"
        }
      ]
    },
    "commonMistakes": [
      {
        "title": "Off-by-One in Two-Pointer Loops",
        "desc": "Using left <= right instead of left < right when searching for distinct index pairs, inadvertently pairing an element with itself.",
        "fix": "Strictly verify whether pointers are permitted to coincide or must represent distinct indices.",
        "wrongCode": "while (left <= right) { // BUG: When left == right, adds same element twice!\n    if (arr[left] + arr[right] == target) return {left, right};\n}",
        "correctCode": "while (left < right) { // Correct: Guarantees distinct element pair\n    int sum = arr[left] + arr[right];\n    if (sum == target) return {left, right};\n    else if (sum < target) left++;\n    else right--;\n}"
      },
      {
        "title": "32-bit Integer Overflow in Prefix Sum Accumulation",
        "desc": "Prefix sums of large arrays exceed 2^31 - 1, causing silent integer overflow and negative sums.",
        "fix": "Declare prefix sums as long long accumulators.",
        "wrongCode": "vector<int> prefix(n + 1, 0); // Can overflow if elements are ~10^9\nfor(int i = 0; i < n; i++) prefix[i+1] = prefix[i] + nums[i];",
        "correctCode": "vector<long long> prefix(n + 1, 0); // Safe from 32-bit overflow\nfor(int i = 0; i < n; i++) prefix[i+1] = prefix[i] + (long long)nums[i];"
      },
      {
        "title": "Sliding Window Shrink Condition Invalidation",
        "desc": "Using 'if' instead of 'while' when shrinking a dynamic sliding window, leaving the window in an invalid state.",
        "fix": "Always use a 'while' loop to contract the left boundary until the invariant is restored.",
        "wrongCode": "if (currentSum > target) { // BUG: Only shrinks window once!\n    currentSum -= nums[left++];\n}",
        "correctCode": "while (currentSum > target && left <= right) { // Fully restores valid state\n    currentSum -= nums[left++];\n}"
      },
      {
        "title": "Initializing Kadane's Max So Far with Zero",
        "desc": "Setting maxSoFar = 0 fails completely when all array elements are negative (e.g. [-5, -2, -8]), returning 0 instead of -2.",
        "fix": "Initialize maxSoFar and currentMax with the first element nums[0].",
        "wrongCode": "int maxSoFar = 0; // BUG: Fails on all-negative inputs!\nfor(int x : nums) { ... }",
        "correctCode": "int maxSoFar = nums[0], currentMax = nums[0];\nfor(size_t i = 1; i < nums.size(); i++) {\n    currentMax = max(nums[i], currentMax + nums[i]);\n    maxSoFar = max(maxSoFar, currentMax);\n}"
      }
    ],
    "syntax": "// Standard Array & Vector Manipulation Patterns in C++\n#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// 1. Kadane's Maximum Subarray Pattern: O(N) Time, O(1) Space\nint kadane(const vector<int>& nums) {\n    int maxSoFar = nums[0], currentMax = nums[0];\n    for (size_t i = 1; i < nums.size(); i++) {\n        currentMax = max(nums[i], currentMax + nums[i]);\n        maxSoFar = max(maxSoFar, currentMax);\n    }\n    return maxSoFar;\n}",
    "example": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// Two-Pointer Target Sum on a Sorted Array\nbool findPairSum(const vector<int>& arr, int target, int &idx1, int &idx2) {\n    int left = 0, right = arr.size() - 1;\n    while (left < right) {\n        int sum = arr[left] + arr[right];\n        if (sum == target) {\n            idx1 = left;\n            idx2 = right;\n            return true;\n        } else if (sum < target) {\n            left++;\n        } else {\n            right--;\n        }\n    }\n    return false;\n}\n\nint main() {\n    vector<int> sortedArr = {2, 7, 11, 15, 19, 23};\n    int target = 26;\n    int i1 = -1, i2 = -1;\n\n    if (findPairSum(sortedArr, target, i1, i2)) {\n        cout << \"Pair found for target \" << target << \":\\n\";\n        cout << \"Index \" << i1 << \" (\" << sortedArr[i1] << \") + Index \" << i2 << \" (\" << sortedArr[i2] << \") = \" << target << \"\\n\";\n    } else {\n        cout << \"No pair found.\\n\";\n    }\n\n    return 0;\n}"
  },
  "searching": {
    "complexity": {
      "time": "O(log N) Binary / O(N) Linear",
      "space": "O(1) Auxiliary Space",
      "best": "O(1) when target is situated at middle element (Binary) or index 0 (Linear)",
      "average": "Theta(log N) for Binary Search; Theta(N) for Linear Search",
      "worst": "O(log N) for Binary Search on sorted monotonic domains; O(N) for Linear Search",
      "auxiliarySpace": "O(1) iterative execution; O(log N) if implemented recursively due to call stack frames",
      "stackBehavior": "Iterative while(low <= high) maintains 3 integer variables on stack, consuming 0 heap memory.",
      "derivation": "At each step of binary search, the range is halved: N -> N/2 -> N/4 -> ... -> 1. Solving N / (2^k) = 1 yields 2^k = N, so k = log2(N) iterations in the worst case.",
      "operationsTable": [
        {
          "operation": "Linear Search",
          "time": "O(N)",
          "space": "O(1)",
          "notes": "Works on unsorted data"
        },
        {
          "operation": "Binary Search",
          "time": "O(log N)",
          "space": "O(1)",
          "notes": "Requires sorted array"
        },
        {
          "operation": "std::lower_bound",
          "time": "O(log N)",
          "space": "O(1)",
          "notes": "First element >= target"
        },
        {
          "operation": "std::upper_bound",
          "time": "O(log N)",
          "space": "O(1)",
          "notes": "First element > target"
        },
        {
          "operation": "Rotated Sorted Search",
          "time": "O(log N)",
          "space": "O(1)",
          "notes": "O(N) if duplicates exist"
        },
        {
          "operation": "Binary Search on Answer",
          "time": "O(N log R)",
          "space": "O(1)",
          "notes": "R is range of feasible answers"
        }
      ]
    },
    "commonMistakes": [
      {
        "title": "32-bit Integer Overflow in Mid Calculation",
        "desc": "Writing mid = (low + high) / 2 causes integer overflow when low + high exceeds 2,147,483,647.",
        "fix": "Always write mid = low + (high - low) / 2.",
        "wrongCode": "int mid = (low + high) / 2; // BUG: Overflows 32-bit int!",
        "correctCode": "int mid = low + (high - low) / 2; // Safe from overflow"
      },
      {
        "title": "Infinite Loop on Boundary Contraction",
        "desc": "Setting low = mid instead of low = mid + 1 when mid was already tested and rejected causes low == high freeze.",
        "fix": "Ensure low advances past mid (low = mid + 1) and high decreases past mid (high = mid - 1).",
        "wrongCode": "if (nums[mid] < target) low = mid; // BUG: When low == mid, loops infinitely!",
        "correctCode": "if (nums[mid] < target) low = mid + 1; // Correctly shrinks search space"
      },
      {
        "title": "Incorrect Loop Termination Invariant",
        "desc": "Using low < high when target could be at the boundary index where low == high.",
        "fix": "Use while (low <= high) when searching for exact targets in [0..N-1].",
        "wrongCode": "while (low < high) { // BUG: Terminates without checking single remaining element!\n    int mid = low + (high - low) / 2;\n    if (nums[mid] == target) return mid;\n}",
        "correctCode": "while (low <= high) { // Inspects all valid candidate indices\n    int mid = low + (high - low) / 2;\n    if (nums[mid] == target) return mid;\n    else if (nums[mid] < target) low = mid + 1;\n    else high = mid - 1;\n}"
      },
      {
        "title": "Applying Binary Search on Unsorted Input",
        "desc": "Attempting binary search on unsorted data gives wrong answers because the monotonic invariant is violated.",
        "fix": "Sort the array in O(N log N) first or verify elements are already monotonically ordered.",
        "wrongCode": "vector<int> nums = {9, 2, 8, 4, 1};\nbinary_search(nums.begin(), nums.end(), 8); // UNDEFINED / WRONG!",
        "correctCode": "vector<int> nums = {9, 2, 8, 4, 1};\nsort(nums.begin(), nums.end()); // Must be sorted first!\nbinary_search(nums.begin(), nums.end(), 8); // Returns true"
      }
    ],
    "syntax": "// Standard Binary Search Patterns in C++\n#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// 1. Classical Iterative Binary Search\nint binarySearch(const vector<int>& nums, int target) {\n    int low = 0, high = (int)nums.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}",
    "example": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint binarySearch(const vector<int>& nums, int target) {\n    int low = 0, high = nums.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}\n\nint main() {\n    vector<int> sortedData = {11, 22, 33, 44, 55, 66, 77, 88, 99};\n    int target = 55;\n\n    int resultIndex = binarySearch(sortedData, target);\n    if (resultIndex != -1) {\n        cout << \"Target \" << target << \" found at index: \" << resultIndex << \"\\n\";\n        cout << \"Verification: sortedData[\" << resultIndex << \"] = \" << sortedData[resultIndex] << \"\\n\";\n    } else {\n        cout << \"Target not found.\\n\";\n    }\n\n    return 0;\n}"
  },
  "sorting": {
    "complexity": {
      "time": "O(N log N) Optimal / O(N^2) Elementary",
      "space": "O(1) In-Place / O(N) Merge Buffer",
      "best": "O(N) for Insertion Sort on sorted input; O(N log N) for Merge Sort",
      "average": "Theta(N log N) for QuickSort, Merge Sort, and HeapSort",
      "worst": "O(N^2) for QuickSort with bad pivot; O(N log N) guaranteed for Merge Sort",
      "auxiliarySpace": "O(1) for QuickSort/HeapSort/Insertion; O(N) for Merge Sort merge buffers",
      "stackBehavior": "QuickSort uses O(log N) stack frames for recursive partition calls; worst-case stack depth is O(N) if unbalanced.",
      "derivation": "Comparison sorting forms a decision tree with N! possible permutations as leaves. A binary tree with N! leaves requires depth at least log2(N!) = Omega(N log N). Therefore, no comparison sort can run faster than Omega(N log N) in the worst case.",
      "operationsTable": [
        {
          "operation": "QuickSort (Average)",
          "time": "O(N log N)",
          "space": "O(log N)",
          "notes": "In-place, unstable, cache-friendly"
        },
        {
          "operation": "QuickSort (Worst-case)",
          "time": "O(N^2)",
          "space": "O(N)",
          "notes": "Occurs with sorted array & end pivot"
        },
        {
          "operation": "Merge Sort",
          "time": "O(N log N)",
          "space": "O(N)",
          "notes": "Guaranteed O(N log N), stable"
        },
        {
          "operation": "HeapSort",
          "time": "O(N log N)",
          "space": "O(1)",
          "notes": "Guaranteed O(N log N), in-place, unstable"
        },
        {
          "operation": "Insertion Sort",
          "time": "O(N) to O(N^2)",
          "space": "O(1)",
          "notes": "O(N) on nearly-sorted data"
        },
        {
          "operation": "Counting Sort",
          "time": "O(N + K)",
          "space": "O(K)",
          "notes": "Non-comparison sort for bounded integers"
        }
      ]
    },
    "commonMistakes": [
      {
        "title": "QuickSort Worst-Case Degradation on Sorted Inputs",
        "desc": "Selecting the first or last element as pivot on an already sorted or reverse-sorted array creates empty partitions, yielding O(N^2) runtime.",
        "fix": "Use randomized pivot selection or median-of-three (low, mid, high).",
        "wrongCode": "int pivot = arr[high]; // Can trigger O(N^2) worst case on sorted arrays",
        "correctCode": "int randomPivotIdx = low + rand() % (high - low + 1);\nswap(arr[randomPivotIdx], arr[high]);\nint pivot = arr[high]; // Safe randomized pivot"
      },
      {
        "title": "Violating Strict Weak Ordering in Custom Comparators",
        "desc": "Using <= or >= in std::sort comparators violates strict weak ordering (where comp(a, a) must return false), triggering memory segmentation faults.",
        "fix": "Always use strict < (or > for descending) so equal elements evaluate to false.",
        "wrongCode": "bool comp(int a, int b) {\n    return a <= b; // BUG: Violates strict weak ordering! Crashes std::sort!\n}",
        "correctCode": "bool comp(int a, int b) {\n    return a < b; // Correct: comp(a, a) returns false\n}"
      },
      {
        "title": "Excessive Memory Allocations Inside Merge Sort",
        "desc": "Allocating new temporary vectors inside each recursive merge() call causes severe heap allocation overhead and slows performance by 5x.",
        "fix": "Allocate one single auxiliary buffer of size N before recursion and pass it down.",
        "wrongCode": "void merge(vector<int>& arr, int l, int m, int r) {\n    vector<int> L(m - l + 1), R(r - m); // Allocates on heap every single call!\n}",
        "correctCode": "// Pre-allocate one temp buffer of size N outside and pass by reference:\nvoid merge(vector<int>& arr, vector<int>& temp, int l, int m, int r) { ... }"
      },
      {
        "title": "Assuming std::sort is Stable",
        "desc": "std::sort is an introsort (QuickSort + HeapSort + InsertionSort) and does not preserve relative order of equal elements.",
        "fix": "Use std::stable_sort when relative ordering of equal keys must be preserved.",
        "wrongCode": "sort(records.begin(), records.end(), compareByGrade); // Ties reordered!",
        "correctCode": "stable_sort(records.begin(), records.end(), compareByGrade); // Ties preserved"
      }
    ],
    "syntax": "// Standard Merge Sort & QuickSort Patterns in C++\n#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// 1. Lomuto Partition Scheme for QuickSort\nint partition(vector<int>& arr, int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (arr[j] <= pivot) {\n            i++;\n            swap(arr[i], arr[j]);\n        }\n    }\n    swap(arr[i + 1], arr[high]);\n    return i + 1;\n}",
    "example": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint partition(vector<int>& arr, int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (arr[j] <= pivot) {\n            i++;\n            swap(arr[i], arr[j]);\n        }\n    }\n    swap(arr[i + 1], arr[high]);\n    return i + 1;\n}\n\nvoid quickSort(vector<int>& arr, int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}\n\nint main() {\n    vector<int> nums = {45, 12, 85, 32, 89, 39, 69, 44, 42, 1, 10};\n\n    cout << \"Unsorted array: \";\n    for (int x : nums) cout << x << \" \";\n    cout << \"\\n\";\n\n    quickSort(nums, 0, nums.size() - 1);\n\n    cout << \"Sorted array (QuickSort O(N log N)): \";\n    for (int x : nums) cout << x << \" \";\n    cout << \"\\n\";\n\n    return 0;\n}"
  },
  "hashing": {
    "complexity": {
      "time": "Average O(1) / Worst O(N)",
      "space": "O(N) Total Hash Table Storage",
      "best": "O(1) for search, insert, and delete when hash distribution has 0 collisions",
      "average": "Theta(1) constant time operations when load factor alpha < 0.75",
      "worst": "O(N) if all N keys hash to the same bucket (hash collision degradation)",
      "auxiliarySpace": "O(N) for storing N elements across M bucket linked lists",
      "stackBehavior": "Bucket array (pointers) and node chains are allocated dynamically on the heap.",
      "derivation": "Load factor alpha = N / M. Under simple uniform hashing, the expected chain length is alpha. If alpha is bounded by a constant (e.g. alpha <= 0.75 via rehashing), the expected time to search a key is 1 + alpha/2 = O(1).",
      "operationsTable": [
        {
          "operation": "Average Search (unordered_map)",
          "time": "O(1)",
          "space": "O(1)",
          "notes": "Direct bucket index lookup"
        },
        {
          "operation": "Average Insert (unordered_map)",
          "time": "O(1)",
          "space": "O(1)",
          "notes": "Chained at bucket head"
        },
        {
          "operation": "Average Delete (unordered_map)",
          "time": "O(1)",
          "space": "O(1)",
          "notes": "Removes node from bucket list"
        },
        {
          "operation": "Worst-Case Lookup (All Collide)",
          "time": "O(N)",
          "space": "O(1)",
          "notes": "Must traverse full chain"
        },
        {
          "operation": "Rehashing (Capacity Expansion)",
          "time": "O(N)",
          "space": "O(N)",
          "notes": "Doubles buckets when alpha > 0.75"
        },
        {
          "operation": "Ordered Map (std::map)",
          "time": "O(log N)",
          "space": "O(N)",
          "notes": "Red-Black Tree: strictly O(log N)"
        }
      ]
    },
    "commonMistakes": [
      {
        "title": "Modifying Map with operator[] for Read-Only Lookups",
        "desc": "Using myMap[key] inserts a default-constructed value into the hash table if the key is absent, unintentionally increasing map size.",
        "fix": "Use myMap.find(key) != myMap.end() or myMap.count(key) for read-only existence checks.",
        "wrongCode": "if (freq[target] == 1) { ... } // Inserts target with value 0 if not present!",
        "correctCode": "if (freq.find(target) != freq.end() && freq[target] == 1) { ... }\n// Or in C++20: if (freq.contains(target)) { ... }"
      },
      {
        "title": "Two Sum Self-Pairing Bug",
        "desc": "Inserting the current element into the hash map BEFORE checking for its complement can match an element with itself (e.g., target 6, array [3]).",
        "fix": "Check for the complement first, and insert the current element afterward.",
        "wrongCode": "seen[nums[i]] = i; // Inserted too early!\nif (seen.count(target - nums[i])) return {seen[target - nums[i]], i};",
        "correctCode": "int complement = target - nums[i];\nif (seen.count(complement)) return {seen[complement], i};\nseen[nums[i]] = i; // Inserted only after checking"
      },
      {
        "title": "Anti-Hash Adversarial Worst-Case in Competitive Programming",
        "desc": "Default std::hash<int> uses the identity function. Handcrafted test cases with multiples of bucket capacity cause 100% collisions, turning O(1) into O(N^2) TLE.",
        "fix": "Use a custom hash functor with a randomized splitmix64 bitwise seed in competitive programming.",
        "wrongCode": "unordered_map<int, int> mp; // Vulnerable to anti-hash hack tests",
        "correctCode": "struct custom_hash {\n    static uint64_t splitmix64(uint64_t x) { ... }\n    size_t operator()(uint64_t x) const { ... }\n};\nunordered_map<int, int, custom_hash> mp;"
      },
      {
        "title": "Missing Hash Function for Custom Structs / std::pair",
        "desc": "C++ STL unordered_map does not provide a default hash function for std::pair<T1, T2> or custom structs, causing build type deduction errors.",
        "fix": "Supply a custom hash lambda or functor that combines hashes using bit shifting and XOR.",
        "wrongCode": "unordered_map<pair<int, int>, int> memo; // BUILD ERROR: No default hash for std::pair!",
        "correctCode": "struct PairHash {\n    size_t operator()(const pair<int, int>& p) const {\n        return hash<int>()(p.first) ^ (hash<int>()(p.second) << 1);\n    }\n};\nunordered_map<pair<int, int>, int, PairHash> memo; // Works cleanly"
      }
    ],
    "syntax": "// Standard Hash Map & Hash Set Patterns in C++\n#include <iostream>\n#include <unordered_map>\n#include <unordered_set>\n\nusing namespace std;\n\n// 1. Two Sum Complement Pattern: O(N) Time, O(N) Space\nvector<int> twoSum(const vector<int>& nums, int target) {\n    unordered_map<int, int> seen;\n    for (int i = 0; i < (int)nums.size(); i++) {\n        int comp = target - nums[i];\n        if (seen.count(comp)) {\n            return {seen[comp], i};\n        }\n        seen[nums[i]] = i;\n    }\n    return {};\n}",
    "example": "#include <iostream>\n#include <vector>\n#include <unordered_map>\n\nusing namespace std;\n\n// Frequency counting and duplicate detection in O(N)\nvoid findFrequencies(const vector<string>& words) {\n    unordered_map<string, int> freq;\n    for (const string& w : words) {\n        freq[w]++;\n    }\n\n    cout << \"Word Frequency Breakdown (Average O(1) per lookup):\\n\";\n    for (const auto& [word, count] : freq) {\n        cout << \"  \"\" << word << \"\": \" << count << \" occurrences\\n\";\n    }\n}\n\nint main() {\n    vector<string> items = {\"apple\", \"banana\", \"apple\", \"cherry\", \"banana\", \"apple\", \"date\"};\n    findFrequencies(items);\n    return 0;\n}"
  },
  "recursion": {
    "complexity": {
      "time": "O(Branching_Factor ^ Depth)",
      "space": "O(Max_Recursion_Depth) Stack Memory",
      "best": "O(1) when the base condition triggers immediately on the initial call",
      "average": "Theta(2^N) for naive Fibonacci; Theta(N) for linear recursion; Theta(N log N) for divide and conquer",
      "worst": "O(2^N) for combinatorial power sets; O(N!) for permutations",
      "auxiliarySpace": "O(Depth) call stack frames. Each stack frame stores function parameters, local variables, and return address.",
      "stackBehavior": "Every function invocation pushes a new stack activation frame. When base case triggers, frames pop sequentially and unwind.",
      "derivation": "Draw the recursion state space tree. Total operations = Sum of operations across all tree nodes. For naive Fibonacci: T(N) = T(N-1) + T(N-2) + O(1), forming a binary tree of height N with ~2^N nodes, yielding exponential O(2^N) time.",
      "operationsTable": [
        {
          "operation": "Factorial / Linear Recursion",
          "time": "O(N)",
          "space": "O(N)",
          "notes": "N stack frames deep"
        },
        {
          "operation": "Divide & Conquer (Merge Sort)",
          "time": "O(N log N)",
          "space": "O(log N)",
          "notes": "Stack depth is log2(N)"
        },
        {
          "operation": "Naive Fibonacci (Tree)",
          "time": "O(2^N)",
          "space": "O(N)",
          "notes": "Exponential branches without memo"
        },
        {
          "operation": "Backtracking (Subsets 2^N)",
          "time": "O(2^N * N)",
          "space": "O(N)",
          "notes": "Binary include/exclude choices"
        },
        {
          "operation": "Backtracking (Permutations N!)",
          "time": "O(N! * N)",
          "space": "O(N)",
          "notes": "N factorial decision tree"
        },
        {
          "operation": "Tail Call Optimization",
          "time": "O(N)",
          "space": "O(1)",
          "notes": "Reuses stack frame if supported"
        }
      ]
    },
    "commonMistakes": [
      {
        "title": "Missing Base Case Stack Overflow (SIGSEGV)",
        "desc": "Omitting a terminating base condition or writing a condition that is bypassed causes infinite recursive descent until system stack memory exhausts (~8 MB limit).",
        "fix": "Always write and thoroughly test base condition termination rules at the very top of recursive functions.",
        "wrongCode": "int countUp(int n) {\n    return countUp(n + 1); // BUG: No base case! Stack overflow crash!\n}",
        "correctCode": "int countUp(int n) {\n    if (n >= 100) return n; // Terminating base condition\n    return countUp(n + 1);\n}"
      },
      {
        "title": "Forgetting to Unchoose (Restore State) in Backtracking",
        "desc": "Failing to remove the chosen element after the recursive call finishes corrupts the shared path state for subsequent sibling branches.",
        "fix": "Every push_back() or state modification MUST be paired with an exact pop_back() or inverse operation upon returning.",
        "wrongCode": "path.push_back(nums[i]);\nbacktrack(i + 1, path);\n// BUG: Forgot path.pop_back()! State polluted!",
        "correctCode": "path.push_back(nums[i]); // Choose\nbacktrack(i + 1, path);  // Explore\npath.pop_back();         // Unchoose (Restores invariant)"
      },
      {
        "title": "Passing Accumulator Containers by Value in Recursion",
        "desc": "Passing vector<int> current by value in each recursive step copies the entire vector at every node in the recursion tree, ballooning memory from O(N) to O(N * 2^N).",
        "fix": "Pass path accumulators by reference (vector<int>& path) and modify them in-place.",
        "wrongCode": "void generate(int i, vector<int> path) { // BUG: Copies vector on every call!\n    generate(i + 1, path);\n}",
        "correctCode": "void generate(int i, vector<int>& path) { // O(1) pass by reference\n    path.push_back(i);\n    generate(i + 1, path);\n    path.pop_back();\n}"
      },
      {
        "title": "Redundant Overlapping Subproblem Recalculation",
        "desc": "Using plain recursion on overlapping subproblems causes exponential O(2^N) execution instead of caching with memoization.",
        "fix": "Use Dynamic Programming memoization (dp array) to store computed answers and return them in O(1).",
        "wrongCode": "int fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2); // Recalculates fib(n-2) twice!\n}",
        "correctCode": "int memo[100] = {0};\nint fib(int n) {\n    if (n <= 1) return n;\n    if (memo[n] != 0) return memo[n]; // O(1) cache hit\n    return memo[n] = fib(n - 1) + fib(n - 2);\n}"
      }
    ],
    "syntax": "// Standard Recursive & Backtracking Framework in C++\n#include <iostream>\n#include <vector>\n\nusing namespace std;\n\n// Universal Backtracking Pattern: Choose -> Explore -> Unchoose\nvoid backtrack(int start, vector<int>& path, vector<vector<int>>& result, const vector<int>& nums) {\n    result.push_back(path); // Save current valid state\n\n    for (int i = start; i < (int)nums.size(); i++) {\n        path.push_back(nums[i]);             // 1. Choose\n        backtrack(i + 1, path, result, nums); // 2. Explore\n        path.pop_back();                     // 3. Unchoose (Restore)\n    }\n}",
    "example": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nvoid generateSubsets(int idx, const vector<int>& nums, vector<int>& current, vector<vector<int>>& allSubsets) {\n    if (idx == (int)nums.size()) {\n        allSubsets.push_back(current);\n        return;\n    }\n\n    // Choice 1: Include nums[idx]\n    current.push_back(nums[idx]);\n    generateSubsets(idx + 1, nums, current, allSubsets);\n    current.pop_back(); // Backtrack\n\n    // Choice 2: Exclude nums[idx]\n    generateSubsets(idx + 1, nums, current, allSubsets);\n}\n\nint main() {\n    vector<int> nums = {1, 2, 3};\n    vector<int> current;\n    vector<vector<int>> allSubsets;\n\n    generateSubsets(0, nums, current, allSubsets);\n\n    cout << \"Generated All 2^\" << nums.size() << \" = \" << allSubsets.size() << \" Subsets via Recursion:\\n\";\n    for (const auto& subset : allSubsets) {\n        cout << \"  { \";\n        for (int x : subset) cout << x << \" \";\n        cout << \"}\\n\";\n    }\n\n    return 0;\n}"
  },
  "linked-lists": {
    "complexity": {
      "time": "O(1) Head Operations / O(N) Traversal",
      "space": "O(1) In-Place / O(N) Dynamic Nodes",
      "best": "O(1) for prepending (push front), inserting after known node pointer, or deleting head",
      "average": "Theta(N) for searching values or accessing K-th node from Head",
      "worst": "O(N) for appending without tail pointer, reversing list, or finding middle node",
      "auxiliarySpace": "O(1) auxiliary pointer operations for in-place modifications; O(N) total heap memory for N nodes",
      "stackBehavior": "Iterative pointer traversal consumes zero stack memory; recursive list traversal consumes O(N) stack frames.",
      "derivation": "Nodes are non-contiguous heap allocations linked by pointers. To reach node K, the CPU must follow K pointers sequentially from Head: Head -> Node1 -> Node2 -> ... -> NodeK. Skipping steps is impossible, guaranteeing O(N) access.",
      "operationsTable": [
        {
          "operation": "Insert at Head",
          "time": "O(1)",
          "space": "O(1)",
          "notes": "Updates newNode->next = head"
        },
        {
          "operation": "Insert at Tail (with tail ptr)",
          "time": "O(1)",
          "space": "O(1)",
          "notes": "Updates tail->next = newNode"
        },
        {
          "operation": "Insert at Tail (without tail ptr)",
          "time": "O(N)",
          "space": "O(1)",
          "notes": "Must traverse from head to null"
        },
        {
          "operation": "Delete Head",
          "time": "O(1)",
          "space": "O(1)",
          "notes": "Updates head = head->next"
        },
        {
          "operation": "Random Access by Index K",
          "time": "O(K) -> O(N)",
          "space": "O(1)",
          "notes": "Sequential pointer hops required"
        },
        {
          "operation": "In-Place List Reversal",
          "time": "O(N)",
          "space": "O(1)",
          "notes": "Three-pointer prev/curr/next loop"
        },
        {
          "operation": "Floyd Cycle Detection",
          "time": "O(N)",
          "space": "O(1)",
          "notes": "Slow 1x & Fast 2x pointer traversal"
        }
      ]
    },
    "commonMistakes": [
      {
        "title": "Losing the Forward Pointer Before Re-wiring",
        "desc": "Overwriting curr->next before saving its original value severs the list and leaves subsequent nodes orphaned in memory.",
        "fix": "Always cache ListNode* next = curr->next before reassigning curr->next.",
        "wrongCode": "curr->next = prev; // BUG: Lost pointer to rest of list!\ncurr = curr->next; // Now curr points to prev!",
        "correctCode": "ListNode* next = curr->next; // 1. Cache forward pointer\ncurr->next = prev;           // 2. Rewire pointer\nprev = curr;                 // 3. Advance prev\ncurr = next;                 // 4. Advance curr"
      },
      {
        "title": "Null Pointer Dereference on Fast Pointer in Cycle Detection",
        "desc": "Writing while (fast->next != nullptr) crashes when fast is already nullptr (e.g., on even-length or empty lists).",
        "fix": "Always verify both fast && fast->next before accessing fast->next->next.",
        "wrongCode": "while (fast->next != nullptr) { // CRASH if fast is nullptr!\n    fast = fast->next->next;\n}",
        "correctCode": "while (fast != nullptr && fast->next != nullptr) { // Safe boundary condition\n    slow = slow->next;\n    fast = fast->next->next;\n}"
      },
      {
        "title": "Memory Leak: Deleting Node Without Preserving Next",
        "desc": "Calling delete curr before saving curr->next loses the address of subsequent nodes and leaks heap memory.",
        "fix": "Store next = curr->next before executing delete curr.",
        "wrongCode": "delete curr;\ncurr = curr->next; // BUG: Accessing deleted memory!",
        "correctCode": "ListNode* next = curr->next;\ndelete curr;\ncurr = next;"
      },
      {
        "title": "Complicated Edge Cases Without Dummy Head Sentinel",
        "desc": "Writing separate conditional logic for inserting or deleting the head node versus interior nodes.",
        "fix": "Use a stack-allocated dummy node (ListNode dummy(0); dummy.next = head;) to unify all insertion/deletion logic.",
        "wrongCode": "if (head->val == val) head = head->next; // Special case\nelse { /* loop interior */ }",
        "correctCode": "ListNode dummy(0);\ndummy.next = head;\nListNode* prev = &dummy;\n// Loop cleanly without special-casing head!\nreturn dummy.next;"
      }
    ],
    "syntax": "// Standard Linked List Struct & Reversal in C++\n#include <iostream>\n\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\n// 1. In-Place Reversal: O(N) Time, O(1) Space\nListNode* reverseList(ListNode* head) {\n    ListNode *prev = nullptr, *curr = head;\n    while (curr != nullptr) {\n        ListNode* next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}",
    "example": "#include <iostream>\n\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* reverseList(ListNode* head) {\n    ListNode *prev = nullptr, *curr = head;\n    while (curr != nullptr) {\n        ListNode* next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}\n\nvoid printList(ListNode* head) {\n    while (head != nullptr) {\n        cout << head->val << \" -> \";\n        head = head->next;\n    }\n    cout << \"nullptr\\n\";\n}\n\nint main() {\n    // Construct linked list: 10 -> 20 -> 30 -> 40 -> nullptr\n    ListNode* head = new ListNode(10);\n    head->next = new ListNode(20);\n    head->next->next = new ListNode(30);\n    head->next->next->next = new ListNode(40);\n\n    cout << \"Original Linked List: \";\n    printList(head);\n\n    head = reverseList(head);\n\n    cout << \"Reversed Linked List (O(N) Time, O(1) Space): \";\n    printList(head);\n\n    // Free memory\n    while (head) {\n        ListNode* temp = head;\n        head = head->next;\n        delete temp;\n    }\n\n    return 0;\n}"
  },
  "stacks-queues": {
    "complexity": {
      "time": "Strict O(1) Push/Pop / O(N) Monotonic Pass",
      "space": "O(N) Element Storage",
      "best": "O(1) for push, pop, top, front, back, and empty operations",
      "average": "Theta(1) per individual operation; Theta(N) total across an entire monotonic array traversal",
      "worst": "O(1) for stack/queue primitives; O(N) for monotonic stack processing N elements",
      "auxiliarySpace": "O(N) memory to store stack/queue elements in worst case",
      "stackBehavior": "std::stack is an adapter container using std::deque under the hood, allocating contiguous chunks on the heap.",
      "derivation": "In a monotonic stack processing N elements, each element is pushed onto the stack exactly once and popped at most once. Total push operations = N, total pop operations <= N. Total operations across the entire loop = 2N = O(N) linear amortized time.",
      "operationsTable": [
        {
          "operation": "Stack push(x) / pop()",
          "time": "O(1)",
          "space": "O(1)",
          "notes": "Operates exclusively at TOP"
        },
        {
          "operation": "Stack top() / empty()",
          "time": "O(1)",
          "space": "O(1)",
          "notes": "Inspects TOP without removal"
        },
        {
          "operation": "Queue push(x) / pop()",
          "time": "O(1)",
          "space": "O(1)",
          "notes": "Inserts at REAR, removes from FRONT"
        },
        {
          "operation": "Circular Queue Operations",
          "time": "O(1)",
          "space": "O(K)",
          "notes": "Array with modulo index wrap-around"
        },
        {
          "operation": "Monotonic Stack (Next Greater)",
          "time": "O(N)",
          "space": "O(N)",
          "notes": "Each element pushed/popped <= 1 time"
        },
        {
          "operation": "Sliding Window Deque",
          "time": "O(N)",
          "space": "O(K)",
          "notes": "Maintains indices in monotonic order"
        }
      ]
    },
    "commonMistakes": [
      {
        "title": "Calling top() or pop() on an Empty Stack (Undefined Behavior)",
        "desc": "Invoking st.top() or st.pop() when st.empty() is true causes undefined behavior or segmentation fault crashes.",
        "fix": "Always verify !st.empty() before inspecting top() or popping.",
        "wrongCode": "char c = st.top(); st.pop(); // CRASH if stack is empty!",
        "correctCode": "if (!st.empty()) {\n    char c = st.top();\n    st.pop();\n}"
      },
      {
        "title": "Storing Values Instead of Indices in Monotonic Stack",
        "desc": "Storing raw values in the stack makes it impossible to calculate element distances, subarray widths, or index spans (e.g., Largest Rectangle in Histogram).",
        "fix": "Store element indices in the stack: stack<int> st; and access values via arr[st.top()].",
        "wrongCode": "stack<int> st; // Stores values -> Cannot compute distance (i - st.top())!\nst.push(nums[i]);",
        "correctCode": "stack<int> st; // Stores indices!\nst.push(i);\n// Compute distance: int width = i - st.top() - 1;"
      },
      {
        "title": "Off-by-One in Circular Queue Modulo Indexing",
        "desc": "Using rear = rear + 1 without modulo wrap-around causes out-of-bounds array access.",
        "fix": "Wrap indices using modulo capacity: rear = (rear + 1) % capacity.",
        "wrongCode": "rear = rear + 1; // Overflows array buffer!",
        "correctCode": "rear = (rear + 1) % capacity; // Clean circular wrap"
      },
      {
        "title": "Forgetting to Check st.empty() at End of Parentheses Validation",
        "desc": "Matching all closing brackets but leaving unclosed opening brackets in the stack (e.g., '((()') erroneously returns true.",
        "fix": "Return st.empty() at the end to guarantee every opening bracket was closed.",
        "wrongCode": "return true; // BUG: Returns true for '((('!",
        "correctCode": "return st.empty(); // Returns true only if all brackets matched"
      }
    ],
    "syntax": "// Standard Stack, Queue & Monotonic Stack Patterns in C++\n#include <iostream>\n#include <stack>\n#include <queue>\n#include <vector>\n\nusing namespace std;\n\n// 1. Next Greater Element via Monotonic Stack: O(N) Time, O(N) Space\nvector<int> nextGreaterElements(const vector<int>& nums) {\n    int n = nums.size();\n    vector<int> nge(n, -1);\n    stack<int> st; // Stores indices\n\n    for (int i = 0; i < n; i++) {\n        while (!st.empty() && nums[i] > nums[st.top()]) {\n            nge[st.top()] = nums[i];\n            st.pop();\n        }\n        st.push(i);\n    }\n    return nge;\n}",
    "example": "#include <iostream>\n#include <vector>\n#include <stack>\n\nusing namespace std;\n\nvector<int> nextGreaterElements(const vector<int>& nums) {\n    int n = nums.size();\n    vector<int> result(n, -1);\n    stack<int> st; // Monotonic decreasing stack storing indices\n\n    for (int i = 0; i < n; i++) {\n        while (!st.empty() && nums[i] > nums[st.top()]) {\n            result[st.top()] = nums[i];\n            st.pop();\n        }\n        st.push(i);\n    }\n    return result;\n}\n\nint main() {\n    vector<int> temperatures = {73, 74, 75, 71, 69, 72, 76, 73};\n\n    vector<int> nge = nextGreaterElements(temperatures);\n\n    cout << \"Input Array:         \";\n    for (int t : temperatures) cout << t << \" \";\n    cout << \"\\nNext Greater Element: \";\n    for (int g : nge) cout << g << \" \";\n    cout << \"\\n\";\n\n    return 0;\n}"
  },
  "trees": {
    "complexity": {
      "time": "O(N) Traversals / O(log N) BST Search",
      "space": "O(H) Recursion Stack where H = Height",
      "best": "O(1) when search target is at root; O(log N) for balanced BST search/insert",
      "average": "Theta(log N) for balanced trees; Theta(N) for full tree traversals",
      "worst": "O(N) for search in degenerate skewed trees (linked list structure)",
      "auxiliarySpace": "O(H) call stack frames where H is height (log N for balanced, N for skewed)",
      "stackBehavior": "DFS pushes call stack frames down tree depth. BFS uses a FIFO queue with memory proportional to maximum level width (up to N/2 nodes).",
      "derivation": "A balanced binary tree with N nodes has height H = log2(N + 1). At each step of BST search, comparing with node.val eliminates the left or right subtree, cutting candidates in half, giving O(log N). Full traversals must inspect all N nodes, giving O(N).",
      "operationsTable": [
        {
          "operation": "DFS Traversals (In/Pre/Post)",
          "time": "O(N)",
          "space": "O(H)",
          "notes": "Visits each node exactly once"
        },
        {
          "operation": "BFS Level-Order Traversal",
          "time": "O(N)",
          "space": "O(W)",
          "notes": "W is max tree width (up to N/2)"
        },
        {
          "operation": "BST Search / Insert (Balanced)",
          "time": "O(log N)",
          "space": "O(log N)",
          "notes": "Eliminates half subtree per step"
        },
        {
          "operation": "BST Search / Insert (Skewed)",
          "time": "O(N)",
          "space": "O(N)",
          "notes": "Degenerates to a linked list"
        },
        {
          "operation": "Tree Height / Max Depth",
          "time": "O(N)",
          "space": "O(H)",
          "notes": "1 + max(left, right) post-order"
        },
        {
          "operation": "Lowest Common Ancestor (LCA)",
          "time": "O(N)",
          "space": "O(H)",
          "notes": "Bottom-up recursive search"
        }
      ]
    },
    "commonMistakes": [
      {
        "title": "Local BST Check Bug (Fails Global Subtree Validation)",
        "desc": "Checking node->left->val < node->val && node->right->val > node->val only tests immediate children, missing violations deep in subtrees.",
        "fix": "Pass valid allowable bounds [minVal, maxVal] down the recursion tree.",
        "wrongCode": "bool isValid(TreeNode* root) {\n    if(!root) return true;\n    if(root->left && root->left->val >= root->val) return false; // Fails deep violations!\n    return isValid(root->left) && isValid(root->right);\n}",
        "correctCode": "bool isValidBST(TreeNode* root, long minV = LONG_MIN, long maxV = LONG_MAX) {\n    if(!root) return true;\n    if(root->val <= minV || root->val >= maxV) return false;\n    return isValidBST(root->left, minV, root->val) &&\n           isValidBST(root->right, root->val, maxV);\n}"
      },
      {
        "title": "Memory Leak: Deleting Parent Before Children",
        "desc": "Freeing root node before deleting left and right subtrees loses pointer addresses to children, leaking heap nodes.",
        "fix": "Use Postorder traversal (delete left, delete right, delete root) to cleanly deallocate trees.",
        "wrongCode": "void destroy(TreeNode* root) {\n    delete root; // BUG: Lost pointers to children!\n    destroy(root->left);\n}",
        "correctCode": "void destroy(TreeNode* root) {\n    if(!root) return;\n    destroy(root->left);\n    destroy(root->right);\n    delete root; // Deleted only after children are freed\n}"
      },
      {
        "title": "BFS Level Boundary Loss in Queue",
        "desc": "Looping through queue without capturing int levelSize = q.size() mixes nodes from different tree levels.",
        "fix": "Capture levelSize before processing each level's children.",
        "wrongCode": "while (!q.empty()) {\n    TreeNode* node = q.front(); q.pop(); // Loses level boundaries!\n    if(node->left) q.push(node->left);\n}",
        "correctCode": "while (!q.empty()) {\n    int levelSize = q.size(); // Lock level count\n    for(int i = 0; i < levelSize; i++) {\n        TreeNode* node = q.front(); q.pop();\n        if(node->left) q.push(node->left);\n        if(node->right) q.push(node->right);\n    }\n}"
      },
      {
        "title": "Integer Overflow in BST Range Validation",
        "desc": "Using INT_MIN and INT_MAX as initial bounds fails when a tree node legitimately holds INT_MIN or INT_MAX.",
        "fix": "Use 64-bit LONG_MIN and LONG_MAX (or optional<int>) for boundary parameters.",
        "wrongCode": "bool check(TreeNode* root, int minV = INT_MIN, int maxV = INT_MAX); // Fails on node->val == INT_MIN",
        "correctCode": "bool check(TreeNode* root, long minV = LONG_MIN, long maxV = LONG_MAX); // Safe 64-bit bounds"
      }
    ],
    "syntax": "// Standard Binary Tree & BST Patterns in C++\n#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\n// 1. Inorder Traversal (Produces sorted order in BST): O(N) Time, O(H) Space\nvoid inorder(TreeNode* root, vector<int>& res) {\n    if (!root) return;\n    inorder(root->left, res);\n    res.push_back(root->val);\n    inorder(root->right, res);\n}",
    "example": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* insertBST(TreeNode* root, int val) {\n    if (!root) return new TreeNode(val);\n    if (val < root->val) root->left = insertBST(root->left, val);\n    else root->right = insertBST(root->right, val);\n    return root;\n}\n\nvoid inorder(TreeNode* root) {\n    if (!root) return;\n    inorder(root->left);\n    cout << root->val << \" \";\n    inorder(root->right);\n}\n\nint main() {\n    TreeNode* root = nullptr;\n    vector<int> keys = {50, 30, 70, 20, 40, 60, 80};\n\n    for (int k : keys) {\n        root = insertBST(root, k);\n    }\n\n    cout << \"Binary Search Tree Inorder Traversal (Strictly Sorted):\\n\";\n    inorder(root);\n    cout << \"\\n\";\n\n    return 0;\n}"
  },
  "graphs": {
    "complexity": {
      "time": "O(V + E) Traversals / O((V+E) log V) Dijkstra",
      "space": "O(V + E) Adjacency List / O(V^2) Matrix",
      "best": "O(1) for checking edge existence in Adjacency Matrix",
      "average": "Theta(V + E) for BFS and DFS traversals",
      "worst": "O(V^2) for Adjacency Matrix traversals; O((V + E) log V) for Dijkstra's shortest path",
      "auxiliarySpace": "O(V) for visited array and queue/stack; O(V + E) to store the graph itself",
      "stackBehavior": "DFS uses recursion stack up to O(V) depth. BFS uses a FIFO queue with up to O(V) vertices.",
      "derivation": "In an adjacency list representation, BFS and DFS visit every vertex once (O(V)) and inspect every outgoing edge once (O(E) in directed, O(2E) in undirected). Sum of vertex work + edge work = O(V + E).",
      "operationsTable": [
        {
          "operation": "Adjacency List Storage",
          "time": "O(1) append",
          "space": "O(V + E)",
          "notes": "Optimal for sparse graphs (E << V^2)"
        },
        {
          "operation": "Adjacency Matrix Storage",
          "time": "O(1) lookup",
          "space": "O(V^2)",
          "notes": "Optimal for dense graphs"
        },
        {
          "operation": "Breadth-First Search (BFS)",
          "time": "O(V + E)",
          "space": "O(V)",
          "notes": "Shortest path in unweighted graphs"
        },
        {
          "operation": "Depth-First Search (DFS)",
          "time": "O(V + E)",
          "space": "O(V)",
          "notes": "Connected components, cycle check"
        },
        {
          "operation": "Dijkstra's Algorithm",
          "time": "O((V+E) log V)",
          "space": "O(V)",
          "notes": "Shortest path with non-negative weights"
        },
        {
          "operation": "Topological Sort (Kahn's)",
          "time": "O(V + E)",
          "space": "O(V)",
          "notes": "DAG dependency resolution"
        }
      ]
    },
    "commonMistakes": [
      {
        "title": "Forgetting the Visited Array (Infinite Cycle Loops)",
        "desc": "Traversing an undirected graph or cyclic directed graph without tracking visited vertices causes infinite recursion and stack overflow.",
        "fix": "Always maintain a visited boolean array or unordered_set.",
        "wrongCode": "void dfs(int u) {\n    for(int v : adj[u]) dfs(v); // BUG: Cycles loop forever!\n}",
        "correctCode": "void dfs(int u, vector<bool>& visited) {\n    visited[u] = true;\n    for(int v : adj[u]) {\n        if(!visited[v]) dfs(v, visited);\n    }\n}"
      },
      {
        "title": "Marking Visited on Pop Instead of Push in BFS",
        "desc": "Marking visited[v] = true after popping from the queue allows the same vertex to be enqueued multiple times from different neighbors, exploding queue size to O(E).",
        "fix": "Always mark visited[v] = true immediately upon pushing to the queue.",
        "wrongCode": "int u = q.front(); q.pop();\nvisited[u] = true; // BUG: Neighbor already pushed u again!",
        "correctCode": "visited[v] = true; // Correct: Mark visited immediately upon push\nq.push(v);"
      },
      {
        "title": "Using Dijkstra on Negative Edge Weights",
        "desc": "Dijkstra assumes paths are monotonically non-decreasing. Negative edge weights invalidate greedy selection, producing incorrect shortest paths.",
        "fix": "Use Bellman-Ford (O(V * E)) or SPFA when negative weights are present.",
        "wrongCode": "// Applying Dijkstra to graph with negative weights -> WRONG!",
        "correctCode": "// Use Bellman-Ford algorithm to handle negative edges and detect negative cycles."
      },
      {
        "title": "Topological Sort on Graphs with Cycles",
        "desc": "Assuming a graph is a DAG without checking if the topological sort processed all V vertices.",
        "fix": "In Kahn's algorithm, check if processedCount == V; if less, a cycle exists.",
        "wrongCode": "return topoOrder; // Might be partial if cycle existed!",
        "correctCode": "if (topoOrder.size() != V) return {}; // Cycle detected!\nreturn topoOrder;"
      }
    ],
    "syntax": "// Standard Graph Representations & BFS/DFS Patterns in C++\n#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\n\n// 1. BFS Traversal for Shortest Path: O(V + E) Time, O(V) Space\nvector<int> bfs(int V, const vector<vector<int>>& adj, int src) {\n    vector<int> dist(V, -1);\n    queue<int> q;\n\n    dist[src] = 0;\n    q.push(src);\n\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        for (int v : adj[u]) {\n            if (dist[v] == -1) { // Unvisited\n                dist[v] = dist[u] + 1;\n                q.push(v);\n            }\n        }\n    }\n    return dist;\n}",
    "example": "#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\n\nvector<int> bfsShortestPath(int V, const vector<vector<int>>& adj, int src) {\n    vector<int> dist(V, -1);\n    queue<int> q;\n\n    dist[src] = 0;\n    q.push(src);\n\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        for (int v : adj[u]) {\n            if (dist[v] == -1) {\n                dist[v] = dist[u] + 1;\n                q.push(v);\n            }\n        }\n    }\n    return dist;\n}\n\nint main() {\n    int V = 5;\n    vector<vector<int>> adj(V);\n\n    // Build unweighted graph\n    adj[0] = {1, 2};\n    adj[1] = {0, 3};\n    adj[2] = {0, 4};\n    adj[3] = {1};\n    adj[4] = {2};\n\n    int src = 0;\n    vector<int> distances = bfsShortestPath(V, adj, src);\n\n    cout << \"Shortest Path Distances from Node \" << src << \" via BFS (O(V + E)):\\n\";\n    for (int i = 0; i < V; i++) {\n        cout << \"  To Node \" << i << \": \" << distances[i] << \" hops\\n\";\n    }\n\n    return 0;\n}"
  },
  "dp": {
    "complexity": {
      "time": "O(States * Transitions)",
      "space": "O(States) Memory / O(1) Optimized",
      "best": "O(1) when target state is base case",
      "average": "Theta(States * Transitions) for filling the complete memo/tabulation table",
      "worst": "O(N) for 1D DP; O(N * W) for 0/1 Knapsack; O(N * M) for LCS",
      "auxiliarySpace": "O(N) or O(N * W) for table; can frequently be reduced to O(1) or O(W) using rolling arrays",
      "stackBehavior": "Bottom-up tabulation uses 0 recursion stack frames. Top-down memoization uses O(N) call stack frames.",
      "derivation": "Total Time = Number of Unique Subproblem States * Time spent per state transition. In 1D Fibonacci: N states * O(1) transition = O(N). In 0/1 Knapsack: (N * W) states * O(1) choices = O(N * W) pseudo-polynomial time.",
      "operationsTable": [
        {
          "operation": "Top-Down (Memoization)",
          "time": "O(States)",
          "space": "O(States) + Stack",
          "notes": "Computes only reachable states"
        },
        {
          "operation": "Bottom-Up (Tabulation)",
          "time": "O(States)",
          "space": "O(States)",
          "notes": "Iterative, 0 recursion stack"
        },
        {
          "operation": "Space Optimization (Rolling)",
          "time": "O(States)",
          "space": "O(Row_Size)",
          "notes": "Keeps only previous state row"
        },
        {
          "operation": "0/1 Knapsack Pattern",
          "time": "O(N * W)",
          "space": "O(W) 1D array",
          "notes": "Loop capacity in reverse"
        },
        {
          "operation": "Longest Common Subsequence",
          "time": "O(N * M)",
          "space": "O(N * M)",
          "notes": "2D grid transition"
        },
        {
          "operation": "Interval DP (MCM)",
          "time": "O(N^3)",
          "space": "O(N^2)",
          "notes": "Loop over window length"
        }
      ]
    },
    "commonMistakes": [
      {
        "title": "Wrong Base Case Initialization (e.g. 0 vs Infinity)",
        "desc": "Initializing DP table with 0 when solving minimum cost/distance problems causes min() to erroneously select 0 every time.",
        "fix": "Initialize non-base states with infinity (e.g., 1e9 or INT_MAX / 2) and base state with 0.",
        "wrongCode": "vector<int> dp(amount + 1, 0); // BUG: min(dp[i], dp[i-c] + 1) always picks 0!",
        "correctCode": "vector<int> dp(amount + 1, 1e9); // Infinity\ndp[0] = 0; // Only base state is 0"
      },
      {
        "title": "Forward Traversal in 1D 0/1 Knapsack (Multiple Usage Bug)",
        "desc": "Traversing capacity forward (w = 0 to W) in a 1D knapsack table uses the same item multiple times, inadvertently solving Unbounded Knapsack.",
        "fix": "Traverse capacity in reverse order (w = W down to item_weight) so state w depends on un-updated states from the previous item.",
        "wrongCode": "for(int w = wt; w <= W; w++) // BUG: Re-uses item multiple times in 1D array!\n    dp[w] = max(dp[w], val + dp[w - wt]);",
        "correctCode": "for(int w = W; w >= wt; w--) // Correct: Uses item at most once\n    dp[w] = max(dp[w], val + dp[w - wt]);"
      },
      {
        "title": "State Transition Order Inversion (Topological Violation)",
        "desc": "Attempting to compute state i before its dependencies (i - 1 or i - 2) have been computed yields garbage values.",
        "fix": "Ensure loop direction strictly follows state topological dependencies.",
        "wrongCode": "for(int i = n; i >= 0; i--) dp[i] = dp[i-1] + dp[i-2]; // BUG: References uncomputed lower states!",
        "correctCode": "for(int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2]; // Correct bottom-up order"
      },
      {
        "title": "Integer Overflow with INT_MAX + 1 in DP Tables",
        "desc": "Using INT_MAX as infinity and writing min(ans, dp[w - c] + 1) overflows signed 32-bit integer into negative values.",
        "fix": "Use 1e9 or check dp[w - c] != INT_MAX before adding 1.",
        "wrongCode": "dp[i] = min(dp[i], dp[i - c] + 1); // If dp[i-c] is INT_MAX, overflows to INT_MIN!",
        "correctCode": "if (dp[i - c] != 1e9) dp[i] = min(dp[i], dp[i - c] + 1); // Safe"
      }
    ],
    "syntax": "// Standard Dynamic Programming Patterns in C++\n#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// 1. Bottom-Up Tabulation Pattern: O(N) Time, O(1) Space\nint fibonacciTabulation(int n) {\n    if (n <= 1) return n;\n    int prev2 = 0, prev1 = 1;\n    for (int i = 2; i <= n; i++) {\n        int current = prev1 + prev2;\n        prev2 = prev1;\n        prev1 = current;\n    }\n    return prev1;\n}",
    "example": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// 0/1 Knapsack with 1D Space Optimization: O(N * W) Time, O(W) Space\nint knapsack01(int W, const vector<int>& weights, const vector<int>& values) {\n    vector<int> dp(W + 1, 0);\n\n    for (size_t i = 0; i < weights.size(); i++) {\n        // Reverse traversal prevents item reuse\n        for (int w = W; w >= weights[i]; w--) {\n            dp[w] = max(dp[w], values[i] + dp[w - weights[i]]);\n        }\n    }\n    return dp[W];\n}\n\nint main() {\n    int capacity = 7;\n    vector<int> weights = {1, 3, 4, 5};\n    vector<int> values =  {1, 4, 5, 7};\n\n    int maxProfit = knapsack01(capacity, weights, values);\n\n    cout << \"Knapsack Capacity: \" << capacity << \"\\n\";\n    cout << \"Maximum Value Obtained (DP 1D Array Optimization): \" << maxProfit << \"\\n\";\n\n    return 0;\n}"
  }
};
