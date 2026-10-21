import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { dsaProblems, mockUser } from '../data/dsaData';
import { useAuth } from './AuthContext';

export interface ChecklistItem {
  id: string;
  topicId: string;
  title: string;
  category: string;
  description: string;
}

export const dsaChecklistItems: ChecklistItem[] = [
  { id: 'chk-cpp', topicId: 'cpp-basics', title: 'C++ Pointers, References & Dynamic Memory Allocation', category: 'C++ Basics', description: 'Pointers, address-of operator, dynamic heap allocation, references' },
  { id: 'chk-time', topicId: 'time-complexity', title: 'Big-O Asymptotic Complexity & Space Bounds Analysis', category: 'Complexity', description: 'O(1), O(log N), O(N), O(N log N), O(N^2) identification' },
  { id: 'chk-bin-search', topicId: 'searching', title: 'Binary Search: Lower/Upper Bound & Search Space Reduction', category: 'Searching', description: 'Eliminating half the search space, monotonic condition predicates' },
  { id: 'chk-sort-mq', topicId: 'sorting', title: 'Sorting: Merge Sort & Quick Sort Partitioning', category: 'Sorting', description: 'Partitioning, recursive recurrence relations, O(N log N) bounds' },
  { id: 'chk-hash', topicId: 'hashing', title: 'Hash Tables: Unordered Map/Set & Collision Resolution', category: 'Hashing', description: 'Chaining, open addressing, O(1) average lookup and frequencies' },
  { id: 'chk-ll-reverse', topicId: 'linked-lists', title: 'Linked Lists: Pointer Rewiring & In-Place Reversal', category: 'Linked Lists', description: 'Singly & doubly linked lists, dummy head node, pointer rewire' },
  { id: 'chk-ll-cycle', topicId: 'linked-lists', title: 'Linked Lists: Floyd\'s Cycle Detection (Tortoise & Hare)', category: 'Linked Lists', description: 'Fast and slow pointer meeting point and cycle start node' },
  { id: 'chk-stack-lifo', topicId: 'stacks-queues', title: 'Stack: LIFO Mechanics & Balanced Parentheses Validation', category: 'Stack and Queue', description: 'Push/pop/top O(1), matching nested bracket expressions' },
  { id: 'chk-queue-fifo', topicId: 'stacks-queues', title: 'Queue & Deque: FIFO Order, Circular Buffer & Sliding Window', category: 'Stack and Queue', description: 'Front/rear indices, modulo arithmetic, sliding window max' },
  { id: 'chk-nge-minstack', topicId: 'stacks-queues', title: 'Monotonic Stack: Next Greater Element & O(1) Min Stack', category: 'Stack and Queue', description: 'Decreasing stack order, auxiliary min tracking stack' },
  { id: 'chk-recursion', topicId: 'recursion', title: 'Recursion: Base Cases, Call Stack & Return Tree', category: 'Recursion', description: 'Activation records, return values, call stack overflow prevention' },
  { id: 'chk-backtrack', topicId: 'recursion', title: 'Backtracking: Exhaustive State Exploration & Rollback', category: 'Recursion', description: 'N-Queens, Rat in a Maze, Sudoku Solver search pruning' },
  { id: 'chk-tree-traversals', topicId: 'trees', title: 'Binary Trees: DFS (Pre/In/Post) & BFS Level-Order', category: 'Trees', description: 'Recursive DFS orders and queue-based level order traversal' },
  { id: 'chk-bst', topicId: 'trees', title: 'Binary Search Tree (BST): Search, Insert & BST Validation', category: 'Trees', description: 'Left < Root < Right invariant, in-order sorted property' },
];

export const TOPIC_SUBTOPIC_TOTALS: Record<string, number> = {
  'cpp-basics': 7,
  'time-complexity': 7,
  'searching': 5,
  'hashing': 10,
  'sorting': 8,
  'linked-lists': 13,
  'stacks-queues': 13,
  'recursion': 13,
  'trees': 20,
};

interface TopicProgressStat {
  topicId: string;
  name: string;
  solved: number;
  total: number;
  progress: number;
  status: 'Strong' | 'Good' | 'Improve' | 'Weak';
  color: 'emerald' | 'blue' | 'amber' | 'rose';
}

interface ProgressContextType {
  // Checklist-driven Overall Progress
  checklistItems: ChecklistItem[];
  checklistMap: Record<string, boolean>;
  toggleChecklistItem: (id: string) => void;
  setChecklistItem: (id: string, checked: boolean) => void;
  checkedChecklistCount: number;
  totalChecklistCount: number;
  overallProgress: number;

  // Subtopic Checklist per Main Topic in Learn
  topicSubtopicsCheckedMap: Record<string, Record<string, boolean>>;
  toggleTopicSubtopic: (topicId: string, subtopicId: number | string) => void;
  isTopicSubtopicChecked: (topicId: string, subtopicId: number | string) => boolean;
  getTopicProgress: (topicId: string) => { completed: number; total: number; progress: number };

  // Practice Section Problem Tracker
  solvedMap: Record<string, boolean>;
  toggleProblemSolved: (problemId: string) => void;
  setProblemSolved: (problemId: string, solved: boolean) => void;
  solvedCount: number;
  totalProblems: number;

  // System Date-driven Streak & Heatmap
  currentStreak: number;
  longestStreak: number;
  lastLoginDate: string;
  systemTodayDate: string;
  activeDatesList: string[];
  simulateNewDayLogin: () => void;
  resetStreak: () => void;

  // Secondary metrics & topic breakdowns
  topicsCompleted: number;
  totalTopics: number;
  readinessScore: number;
  dailyGoalSolved: number;
  dailyGoalTarget: number;
  incrementDailyGoal: () => void;
  topicStats: TopicProgressStat[];
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

function getSystemDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Generate pre-seeded active dates for August, September, and October
function generatePreSeededActiveDates(currentDateStr: string, streakCount: number): string[] {
  const datesSet = new Set<string>();
  const curr = new Date(currentDateStr);
  const year = curr.getFullYear();

  // Streak days leading up to today
  for (let i = 0; i < streakCount; i++) {
    const d = new Date(curr);
    d.setDate(curr.getDate() - i);
    datesSet.add(getSystemDateKey(d));
  }

  // Pre-seed realistic active dates in August (month 7) and September (month 8)
  for (let day = 1; day <= 31; day += 2) {
    const dStr = `${year}-08-${String(day).padStart(2, '0')}`;
    datesSet.add(dStr);
  }
  for (let day = 2; day <= 30; day += 2) {
    const dStr = `${year}-09-${String(day).padStart(2, '0')}`;
    datesSet.add(dStr);
  }

  return Array.from(datesSet);
}

// Deterministic user hash for generating individualized profile stats
function getUserHash(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) & 0xffffff;
  }
  return Math.abs(hash);
}

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, userProfile } = useAuth();
  const userKey = user?.id || user?.email || (userProfile?.email ? userProfile.email : 'guest');
  const userHash = useMemo(() => getUserHash(userKey), [userKey]);

  // Keys for persistent storage
  const solvedStorageKey = `dsaverse_solved_${userKey}`;
  const checklistStorageKey = `dsaverse_checklist_${userKey}`;
  const subtopicsStorageKey = `dsaverse_subtopics_v1_${userKey}`;
  const streakStorageKey = `dsaverse_system_streak_${userKey}`;
  const dailyGoalStorageKey = `dsaverse_daily_goal_${userKey}`;

  // Current system date
  const systemTodayDate = useMemo(() => getSystemDateKey(new Date()), []);

  // 1. Subtopic Checklist State per Main Topic (C++ Basics, Complexity, Searching, Hashing, etc.)
  const [topicSubtopicsCheckedMap, setTopicSubtopicsCheckedMap] = useState<Record<string, Record<string, boolean>>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem(subtopicsStorageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }

    // Default baseline ticks for initial exploration
    const initialMap: Record<string, Record<string, boolean>> = {
      'cpp-basics': { '1': true, '2': true, '3': true },
      'time-complexity': { '1': true, '2': true },
      'searching': { '1': true },
      'hashing': { '1': true },
      'sorting': { '1': true },
      'linked-lists': { '1': true, '2': true },
      'stacks-queues': { '1': true, '2': true },
      'recursion': { '1': true },
      'trees': { '1': true },
    };
    return initialMap;
  });

  useEffect(() => {
    try {
      localStorage.setItem(subtopicsStorageKey, JSON.stringify(topicSubtopicsCheckedMap));
    } catch {
      // ignore
    }
  }, [topicSubtopicsCheckedMap, subtopicsStorageKey]);

  const toggleTopicSubtopic = useCallback((topicId: string, subtopicId: number | string) => {
    const key = String(subtopicId);
    setTopicSubtopicsCheckedMap((prev) => {
      const currentTopicMap = prev[topicId] || {};
      const nextVal = !currentTopicMap[key];
      const updated = {
        ...prev,
        [topicId]: {
          ...currentTopicMap,
          [key]: nextVal,
        },
      };
      return updated;
    });
  }, []);

  const isTopicSubtopicChecked = useCallback((topicId: string, subtopicId: number | string): boolean => {
    const key = String(subtopicId);
    return Boolean(topicSubtopicsCheckedMap[topicId]?.[key]);
  }, [topicSubtopicsCheckedMap]);

  const getTopicProgress = useCallback((topicId: string) => {
    const total = TOPIC_SUBTOPIC_TOTALS[topicId] || 1;
    const topicMap = topicSubtopicsCheckedMap[topicId] || {};
    const completed = Object.values(topicMap).filter(Boolean).length;
    const progress = Math.min(100, Math.round((completed / total) * 100));
    return { completed, total, progress };
  }, [topicSubtopicsCheckedMap]);

  // 2. Interactive Milestone Checklist State (Controls Overall Progress)
  const [checklistMap, setChecklistMap] = useState<Record<string, boolean>>(() => {
    const defaults: Record<string, boolean> = {};
    dsaChecklistItems.forEach(item => { defaults[item.id] = false; });

    if (typeof window === 'undefined') return defaults;
    try {
      const saved = localStorage.getItem(checklistStorageKey);
      if (saved) {
        return { ...defaults, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }

    // Default baseline: check 4 initial milestones
    dsaChecklistItems.slice(0, 4).forEach(item => {
      defaults[item.id] = true;
    });
    return defaults;
  });

  useEffect(() => {
    try {
      localStorage.setItem(checklistStorageKey, JSON.stringify(checklistMap));
    } catch {
      // ignore
    }
  }, [checklistMap, checklistStorageKey]);

  const toggleChecklistItem = useCallback((id: string) => {
    setChecklistMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const setChecklistItem = useCallback((id: string, checked: boolean) => {
    setChecklistMap((prev) => ({
      ...prev,
      [id]: checked,
    }));
  }, []);

  const checkedChecklistCount = useMemo(() => {
    return Object.values(checklistMap).filter(Boolean).length;
  }, [checklistMap]);

  const totalChecklistCount = dsaChecklistItems.length;

  const overallProgress = useMemo(() => {
    if (totalChecklistCount === 0) return 0;
    return Math.round((checkedChecklistCount / totalChecklistCount) * 100);
  }, [checkedChecklistCount, totalChecklistCount]);

  // 3. Practice Section Solved Problems Map
  const [solvedMap, setSolvedMap] = useState<Record<string, boolean>>(() => {
    const defaults: Record<string, boolean> = {};
    dsaProblems.forEach(p => { defaults[p.id] = false; });

    if (typeof window === 'undefined') return defaults;
    try {
      const saved = localStorage.getItem(solvedStorageKey);
      if (saved) {
        return { ...defaults, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }

    dsaProblems.slice(0, 4).forEach(p => { defaults[p.id] = true; });
    return defaults;
  });

  useEffect(() => {
    try {
      localStorage.setItem(solvedStorageKey, JSON.stringify(solvedMap));
    } catch {
      // ignore
    }
  }, [solvedMap, solvedStorageKey]);

  const toggleProblemSolved = useCallback((problemId: string) => {
    setSolvedMap((prev) => {
      const nextSolved = !prev[problemId];
      return { ...prev, [problemId]: nextSolved };
    });
  }, []);

  const setProblemSolved = useCallback((problemId: string, solved: boolean) => {
    setSolvedMap((prev) => {
      if (prev[problemId] === solved) return prev;
      return { ...prev, [problemId]: solved };
    });
  }, []);

  const totalProblems = dsaProblems.length;
  const solvedCount = useMemo(() => {
    return dsaProblems.reduce((acc, p) => acc + (solvedMap[p.id] ? 1 : 0), 0);
  }, [solvedMap]);

  // 4. System Date-Driven Streak & Heatmap Tracking
  const [streakData, setStreakData] = useState<{
    currentStreak: number;
    longestStreak: number;
    lastLoginDate: string;
    activeDates: string[];
  }>(() => {
    const initialStreak = (userHash % 5) + 5;
    const fallbackActiveDates = generatePreSeededActiveDates(systemTodayDate, initialStreak);

    if (typeof window === 'undefined') {
      return {
        currentStreak: initialStreak,
        longestStreak: initialStreak + 6,
        lastLoginDate: systemTodayDate,
        activeDates: fallbackActiveDates,
      };
    }

    try {
      const saved = localStorage.getItem(streakStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        const lastLogin = parsed.lastLoginDate;
        let streak = typeof parsed.currentStreak === 'number' ? parsed.currentStreak : initialStreak;
        let longest = typeof parsed.longestStreak === 'number' ? parsed.longestStreak : streak + 6;
        let activeDates: string[] = Array.isArray(parsed.activeDates) ? parsed.activeDates : fallbackActiveDates;

        if (lastLogin && lastLogin !== systemTodayDate) {
          const todayMs = new Date(systemTodayDate + 'T00:00:00').getTime();
          const lastMs = new Date(lastLogin + 'T00:00:00').getTime();
          const diffDays = Math.round((todayMs - lastMs) / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            streak = streak + 1;
            longest = Math.max(longest, streak);
          } else if (diffDays > 1) {
            streak = 1;
          }
        }

        if (!activeDates.includes(systemTodayDate)) {
          activeDates = [...activeDates, systemTodayDate];
        }

        const updated = {
          currentStreak: streak,
          longestStreak: longest,
          lastLoginDate: systemTodayDate,
          activeDates,
        };
        localStorage.setItem(streakStorageKey, JSON.stringify(updated));
        return updated;
      }
    } catch {
      // ignore
    }

    const defaultState = {
      currentStreak: initialStreak,
      longestStreak: initialStreak + 6,
      lastLoginDate: systemTodayDate,
      activeDates: fallbackActiveDates,
    };
    try {
      localStorage.setItem(streakStorageKey, JSON.stringify(defaultState));
    } catch {
      // ignore
    }
    return defaultState;
  });

  const simulateNewDayLogin = useCallback(() => {
    setStreakData((prev) => {
      const nextStreak = prev.currentStreak + 1;
      const nextLongest = Math.max(prev.longestStreak, nextStreak);
      
      const last = new Date(prev.lastLoginDate + 'T00:00:00');
      last.setDate(last.getDate() + 1);
      const nextDateStr = getSystemDateKey(last);

      const updated = {
        currentStreak: nextStreak,
        longestStreak: nextLongest,
        lastLoginDate: nextDateStr,
        activeDates: prev.activeDates.includes(nextDateStr) ? prev.activeDates : [...prev.activeDates, nextDateStr],
      };

      try {
        localStorage.setItem(streakStorageKey, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, [streakStorageKey]);

  const resetStreak = useCallback(() => {
    setStreakData((prev) => {
      const updated = {
        ...prev,
        currentStreak: 1,
        lastLoginDate: systemTodayDate,
      };
      try {
        localStorage.setItem(streakStorageKey, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, [streakStorageKey, systemTodayDate]);

  // 5. Daily Goal & Topic Metrics
  const [dailyGoalSolved, setDailyGoalSolved] = useState<number>(() => {
    if (typeof window === 'undefined') return 1;
    try {
      const saved = localStorage.getItem(dailyGoalStorageKey);
      if (saved !== null) {
        const num = parseInt(saved, 10);
        if (!Number.isNaN(num)) return num;
      }
    } catch {
      // ignore
    }
    return (userHash % 2) + 1;
  });

  const incrementDailyGoal = useCallback(() => {
    setDailyGoalSolved((prev) => Math.min(mockUser.dailyGoalTarget, prev + 1));
  }, []);

  const metrics = useMemo(() => {
    // Exactly the 9 Learn topics matching user specification:
    // C++ Fundamentals, Complexity Analysis, Searching, Hashing, Sorting, Linked List, Stack and Queue, Recursion, Trees
    const topicGroups: { id: string; name: string }[] = [
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

    const topicStats: TopicProgressStat[] = topicGroups.map((tg) => {
      const total = TOPIC_SUBTOPIC_TOTALS[tg.id] || 1;
      const topicMap = topicSubtopicsCheckedMap[tg.id] || {};
      const completed = Object.values(topicMap).filter(Boolean).length;
      const progress = Math.min(100, Math.round((completed / total) * 100));

      let status: TopicProgressStat['status'] = 'Weak';
      let color: TopicProgressStat['color'] = 'rose';
      if (progress === 100) {
        status = 'Strong';
        color = 'emerald';
      } else if (progress >= 50) {
        status = 'Good';
        color = 'blue';
      } else if (progress > 0) {
        status = 'Improve';
        color = 'amber';
      }

      return {
        topicId: tg.id,
        name: tg.name,
        solved: completed,
        total,
        progress,
        status,
        color,
      };
    });

    const totalTopics = topicGroups.length;
    const completedTopics = topicStats.filter(t => t.progress === 100).length;
    const inProgressTopics = topicStats.filter(t => t.progress > 0).length;
    const topicsCompleted = Math.max(1, completedTopics + (inProgressTopics > 0 ? 1 : 0));
    
    // Average subtopic progress across all 9 topics
    const avgSubtopicProgress = Math.round(topicStats.reduce((acc, t) => acc + t.progress, 0) / totalTopics);
    const readinessScore = Math.min(100, Math.round(20 + (avgSubtopicProgress * 0.6) + ((solvedCount / Math.max(1, totalProblems)) * 20)));

    return {
      topicsCompleted: Math.min(totalTopics, topicsCompleted),
      totalTopics,
      readinessScore,
      topicStats,
    };
  }, [topicSubtopicsCheckedMap, solvedCount, totalProblems]);

  return (
    <ProgressContext.Provider
      value={{
        // Overall Milestone Checklist
        checklistItems: dsaChecklistItems,
        checklistMap,
        toggleChecklistItem,
        setChecklistItem,
        checkedChecklistCount,
        totalChecklistCount,
        overallProgress,

        // Learn Subtopic Checklist per Main Topic
        topicSubtopicsCheckedMap,
        toggleTopicSubtopic,
        isTopicSubtopicChecked,
        getTopicProgress,

        // Solved Problems
        solvedMap,
        toggleProblemSolved,
        setProblemSolved,
        solvedCount,
        totalProblems,

        // Streak & System Date
        currentStreak: streakData.currentStreak,
        longestStreak: streakData.longestStreak,
        lastLoginDate: streakData.lastLoginDate,
        systemTodayDate,
        activeDatesList: streakData.activeDates,
        simulateNewDayLogin,
        resetStreak,

        // Topic & Metrics
        topicsCompleted: metrics.topicsCompleted,
        totalTopics: metrics.totalTopics,
        readinessScore: metrics.readinessScore,
        dailyGoalSolved,
        dailyGoalTarget: mockUser.dailyGoalTarget,
        incrementDailyGoal,
        topicStats: metrics.topicStats,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return ctx;
};
