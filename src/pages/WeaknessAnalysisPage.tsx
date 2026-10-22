<<<<<<< HEAD
import React from 'react';
=======
import React, { useState, useMemo } from 'react';
>>>>>>> ecbfa17 (DSAverse)
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
<<<<<<< HEAD
  PieChart as PieIcon 
=======
  PieChart as PieIcon,
  Search,
  ArrowUpDown,
  BookOpen,
  Code2,
  BookMarked,
  Sliders,
  RefreshCw,
  ChevronRight
>>>>>>> ecbfa17 (DSAverse)
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  PieChart, 
<<<<<<< HEAD
  Pie 
} from 'recharts';

export const WeaknessAnalysisPage: React.FC = () => {

  const topicAccuracyData = [
    { topic: 'Arrays', accuracy: 90, status: 'Strong', color: '#10b981' },
    { topic: 'Searching', accuracy: 76, status: 'Good', color: '#3b82f6' },
    { topic: 'Sorting', accuracy: 61, status: 'Improve', color: '#f59e0b' },
    { topic: 'Recursion', accuracy: 42, status: 'Weak', color: '#f43f5e' },
    { topic: 'Linked Lists', accuracy: 50, status: 'In Progress', color: '#8b5cf6' },
    { topic: 'Stacks & Queues', accuracy: 35, status: 'Weak', color: '#f43f5e' }
  ];

  const pieData = [
    { name: 'Strong (90%+)', value: 1, fill: '#10b981' },
    { name: 'Good (70-89%)', value: 1, fill: '#3b82f6' },
    { name: 'Improve (50-69%)', value: 2, fill: '#f59e0b' },
    { name: 'Weak (<50%)', value: 2, fill: '#f43f5e' }
  ];
=======
  Pie,
  ReferenceLine
} from 'recharts';

export interface TopicAccuracyItem {
  id: string;
  topic: string;
  accuracy: number;
  status: 'Strong' | 'Good' | 'Improve' | 'Weak';
  color: string;
  subtopicsCount: number;
  subtopicsCompleted: number;
  pitfall: string;
  recommendation: string;
}

// Initial accuracy and performance data strictly containing the 9 Learn section topics (NO Array)
const INITIAL_LEARN_TOPIC_ACCURACY: TopicAccuracyItem[] = [
  {
    id: 'cpp-basics',
    topic: 'C++ Fundamentals',
    accuracy: 92,
    status: 'Strong',
    color: '#10b981',
    subtopicsCount: 7,
    subtopicsCompleted: 6,
    pitfall: 'Dangling pointers after free/delete and memory leaks in dynamic allocation.',
    recommendation: 'Use smart pointers (std::unique_ptr) and RAII patterns for safe memory ownership.'
  },
  {
    id: 'time-complexity',
    topic: 'Complexity Analysis',
    accuracy: 84,
    status: 'Good',
    color: '#3b82f6',
    subtopicsCount: 7,
    subtopicsCompleted: 5,
    pitfall: 'Neglecting recursion stack memory when computing auxiliary space.',
    recommendation: 'Always factor in recursion call stack depth alongside heap and variable allocation.'
  },
  {
    id: 'searching',
    topic: 'Searching',
    accuracy: 76,
    status: 'Good',
    color: '#3b82f6',
    subtopicsCount: 5,
    subtopicsCompleted: 4,
    pitfall: 'Integer overflow in mid calculation and off-by-one errors with inclusive vs exclusive bounds.',
    recommendation: 'Use mid = low + (high - low) / 2 and double-check while(low <= high) boundary termination.'
  },
  {
    id: 'hashing',
    topic: 'Hashing',
    accuracy: 68,
    status: 'Improve',
    color: '#f59e0b',
    subtopicsCount: 10,
    subtopicsCompleted: 5,
    pitfall: 'Worst-case O(N) degradation in std::unordered_map during collisions, and pairing element with itself in two-sum.',
    recommendation: 'Look up the complement in the hash map BEFORE inserting the current element.'
  },
  {
    id: 'sorting',
    topic: 'Sorting',
    accuracy: 61,
    status: 'Improve',
    color: '#f59e0b',
    subtopicsCount: 8,
    subtopicsCompleted: 4,
    pitfall: 'Violating strict weak ordering in custom C++ comparators leading to runtime segmentation faults.',
    recommendation: 'Ensure custom comparators strictly return false when two elements have equal ordering keys.'
  },
  {
    id: 'linked-lists',
    topic: 'Linked Lists',
    accuracy: 54,
    status: 'Improve',
    color: '#f59e0b',
    subtopicsCount: 13,
    subtopicsCompleted: 6,
    pitfall: 'Losing the reference to curr->next when rewiring pointers in in-place reversal.',
    recommendation: 'Always cache nextNode = curr->next before rewiring curr->next = prev.'
  },
  {
    id: 'stacks-queues',
    topic: 'Stacks & Queues',
    accuracy: 48,
    status: 'Weak',
    color: '#f43f5e',
    subtopicsCount: 13,
    subtopicsCompleted: 4,
    pitfall: 'Failing to pop empty stack before calling st.top() and off-by-one in monotonic stacks.',
    recommendation: 'Always verify !st.empty() before st.top() and maintain monotonic strict inequality.'
  },
  {
    id: 'recursion',
    topic: 'Recursion',
    accuracy: 42,
    status: 'Weak',
    color: '#f43f5e',
    subtopicsCount: 13,
    subtopicsCompleted: 3,
    pitfall: 'Missing base condition resulting in stack overflow and forgetting rollback in backtracking.',
    recommendation: 'Revise call stack frames and ensure symmetric unchoose steps (path.pop_back()) in backtracking.'
  },
  {
    id: 'trees',
    topic: 'Trees',
    accuracy: 38,
    status: 'Weak',
    color: '#f43f5e',
    subtopicsCount: 20,
    subtopicsCompleted: 4,
    pitfall: 'Null pointer dereference when accessing node->left->val without checking if node->left != nullptr.',
    recommendation: 'Practice 5 easy Binary Tree DFS traversals (Preorder/Inorder/Postorder) with explicit base cases.'
  }
];

export const WeaknessAnalysisPage: React.FC = () => {
  // State: topic accuracy data that user can interactively simulate or adjust
  const [topicData, setTopicData] = useState<TopicAccuracyItem[]>(() => {
    if (typeof window === 'undefined') return INITIAL_LEARN_TOPIC_ACCURACY;
    try {
      const saved = localStorage.getItem('dsaverse_weakness_analytics_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure only Learn topics (no Array)
        const validIds = new Set(INITIAL_LEARN_TOPIC_ACCURACY.map(t => t.id));
        const filtered = parsed.filter((t: TopicAccuracyItem) => validIds.has(t.id));
        if (filtered.length === INITIAL_LEARN_TOPIC_ACCURACY.length) {
          return filtered;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_LEARN_TOPIC_ACCURACY;
  });

  // Interactive controls
  const [selectedTopicId, setSelectedTopicId] = useState<string>('recursion');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Weak' | 'Improve' | 'Good' | 'Strong'>('All');
  const [sortBy, setSortBy] = useState<'syllabus' | 'weakest' | 'highest' | 'name'>('weakest');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persist accuracy changes
  const updateAccuracy = (id: string, newAccuracy: number) => {
    const clamped = Math.min(100, Math.max(0, newAccuracy));
    let status: TopicAccuracyItem['status'] = 'Weak';
    let color = '#f43f5e';
    if (clamped >= 85) {
      status = 'Strong';
      color = '#10b981';
    } else if (clamped >= 70) {
      status = 'Good';
      color = '#3b82f6';
    } else if (clamped >= 50) {
      status = 'Improve';
      color = '#f59e0b';
    }

    setTopicData(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, accuracy: clamped, status, color } : t);
      try {
        localStorage.setItem('dsaverse_weakness_analytics_data', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleResetData = () => {
    setTopicData(INITIAL_LEARN_TOPIC_ACCURACY);
    try {
      localStorage.removeItem('dsaverse_weakness_analytics_data');
    } catch {
      // ignore
    }
  };

  // Currently selected topic for deep-dive
  const activeTopic = useMemo(() => {
    return topicData.find(t => t.id === selectedTopicId) || topicData[0];
  }, [topicData, selectedTopicId]);

  // Find lowest accuracy topic for banner
  const lowestAccuracyTopic = useMemo(() => {
    return [...topicData].sort((a, b) => a.accuracy - b.accuracy)[0];
  }, [topicData]);

  // Filter & sort for Bar Chart & Table
  const filteredAndSortedTopics = useMemo(() => {
    let list = topicData.filter(t => {
      const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
      const matchesSearch = searchQuery.trim() === '' || 
        t.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.pitfall.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });

    switch (sortBy) {
      case 'weakest':
        list.sort((a, b) => a.accuracy - b.accuracy);
        break;
      case 'highest':
        list.sort((a, b) => b.accuracy - a.accuracy);
        break;
      case 'name':
        list.sort((a, b) => a.topic.localeCompare(b.topic));
        break;
      case 'syllabus':
      default:
        // Keep standard syllabus sequence
        const syllabusOrder = INITIAL_LEARN_TOPIC_ACCURACY.map(t => t.id);
        list.sort((a, b) => syllabusOrder.indexOf(a.id) - syllabusOrder.indexOf(b.id));
        break;
    }

    return list;
  }, [topicData, statusFilter, sortBy, searchQuery]);

  // Donut chart distribution
  const pieData = useMemo(() => {
    const strongCount = topicData.filter(t => t.status === 'Strong').length;
    const goodCount = topicData.filter(t => t.status === 'Good').length;
    const improveCount = topicData.filter(t => t.status === 'Improve').length;
    const weakCount = topicData.filter(t => t.status === 'Weak').length;

    return [
      { name: 'Strong (85%+)', value: strongCount, status: 'Strong', fill: '#10b981' },
      { name: 'Good (70-84%)', value: goodCount, status: 'Good', fill: '#3b82f6' },
      { name: 'Improve (50-69%)', value: improveCount, status: 'Improve', fill: '#f59e0b' },
      { name: 'Weak (<50%)', value: weakCount, status: 'Weak', fill: '#f43f5e' }
    ];
  }, [topicData]);
>>>>>>> ecbfa17 (DSAverse)

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-teal-500/15">
        <div>
<<<<<<< HEAD
          <h1 className="text-2xl sm:text-4xl font-extrabold text-theme-text flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-teal-400" />
            Your DSA Performance & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-muted mt-1">
            Data-driven weakness detection and readiness tracking.
          </p>
        </div>

        <Link
          to="/recommendations"
          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-theme-surface-hover0 text-theme-text text-xs font-bold shadow-lg shadow-teal-600/30 transition-all flex items-center space-x-1.5 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>View Next-Step Recommendations</span>
        </Link>
      </div>

      {/* Prominent Weakness Recommendation Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-slate-900 border border-rose-500/40 glass-panel shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
            <AlertTriangle className="w-6 h-6 animate-bounce" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center">
              Critical Weakness Identified
            </div>
            <h2 className="text-xl font-extrabold text-theme-text">
              Recursion Accuracy is Low (42%)
            </h2>
            <p className="text-xs text-theme-text-muted leading-relaxed max-w-xl">
              "Your recursion accuracy is low. Revise the call stack concept and solve 3 Easy problems before moving forward to Trees & Backtracking."
=======
          <div className="flex items-center space-x-2 text-xs text-theme-text-muted mb-1">
            <Link to="/dashboard" className="hover:text-teal-400">Dashboard</Link>
            <span>/</span>
            <span className="text-teal-400 font-semibold">Weakness Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-theme-text flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-teal-400" />
            DSA Weakness & Accuracy Analytics
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-muted mt-1">
            Interactive diagnostics across all 9 Learn curriculum topics. Click on any bar or table row to inspect vulnerabilities, revise theory, and practice problems.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleResetData}
            className="px-3.5 py-2 rounded-xl border border-theme-border bg-theme-card hover:border-teal-500/40 text-theme-text-muted hover:text-teal-400 text-xs font-semibold transition-all flex items-center space-x-1.5"
            title="Reset accuracy to baseline"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>

          <Link
            to="/journal"
            className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all flex items-center space-x-1.5"
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Open Mistake Journal</span>
          </Link>

          <Link
            to="/recommendations"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-teal-600/30 transition-all flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Study Recommendations</span>
          </Link>
        </div>
      </div>

      {/* Dynamic Weakness Recommendation Banner (Points to Lowest Accuracy Topic) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-slate-900 border border-rose-500/40 glass-panel shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in duration-300">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-1.5">
              <span>Primary Weakness Identified</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
            </div>
            <h2 className="text-xl font-extrabold text-theme-text">
              {lowestAccuracyTopic.topic} Accuracy is Critically Low ({lowestAccuracyTopic.accuracy}%)
            </h2>
            <p className="text-xs text-theme-text-muted leading-relaxed max-w-xl">
              "{lowestAccuracyTopic.recommendation} Common pitfall: {lowestAccuracyTopic.pitfall}"
>>>>>>> ecbfa17 (DSAverse)
            </p>
          </div>
        </div>

<<<<<<< HEAD
        <div className="flex items-center space-x-3 shrink-0">
          <Link
            to="/learn/recursion"
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-theme-text text-xs font-bold shadow-lg shadow-rose-600/30 transition-all flex items-center space-x-1.5"
          >
            <span>Revise Recursion</span>
=======
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setSelectedTopicId(lowestAccuracyTopic.id)}
            className="px-4 py-2.5 rounded-xl border border-rose-500/40 text-rose-300 hover:bg-rose-500/10 text-xs font-semibold transition-all"
          >
            Inspect in Chart
          </button>

          <Link
            to={`/learn/${lowestAccuracyTopic.id}`}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all flex items-center space-x-1.5"
          >
            <span>Revise {lowestAccuracyTopic.topic}</span>
>>>>>>> ecbfa17 (DSAverse)
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

<<<<<<< HEAD
      {/* Grid: Charts + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recharts Bar Chart: Topic Accuracy */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <h3 className="text-base font-bold text-theme-text flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-teal-400" /> Topic Accuracy (%)
            </h3>
            <span className="text-xs font-mono text-theme-text-muted">Target: &gt;75%</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicAccuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="topic" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(139,92,246,0.3)', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="accuracy" radius={[8, 8, 0, 0]}>
                  {topicAccuracyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
=======
      {/* Main Interactive Grid: Interactive Bar Chart + Interactive Mastery Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recharts Bar Chart: Interactive Topic Accuracy */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
          
          {/* Chart Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme-border pb-3">
            <div>
              <h3 className="text-base font-bold text-theme-text flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-teal-400" /> 
                Topic Accuracy Graph
              </h3>
              <p className="text-[11px] text-theme-text-muted mt-0.5">
                Click any bar to inspect weakness diagnostics and practice drills
              </p>
            </div>

            {/* Sort & Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-1 bg-theme-card border border-theme-border rounded-xl p-1 text-xs">
                <span className="text-[10px] text-theme-text-muted px-1.5 uppercase font-mono">Sort:</span>
                <button
                  onClick={() => setSortBy('weakest')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    sortBy === 'weakest' ? 'bg-rose-500/20 text-rose-400' : 'text-theme-text-muted hover:text-theme-text'
                  }`}
                  title="Weakest accuracy first"
                >
                  Weakest
                </button>
                <button
                  onClick={() => setSortBy('highest')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    sortBy === 'highest' ? 'bg-emerald-500/20 text-emerald-400' : 'text-theme-text-muted hover:text-theme-text'
                  }`}
                  title="Highest accuracy first"
                >
                  Highest
                </button>
                <button
                  onClick={() => setSortBy('syllabus')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    sortBy === 'syllabus' ? 'bg-teal-500/20 text-teal-300' : 'text-theme-text-muted hover:text-theme-text'
                  }`}
                  title="Course syllabus order"
                >
                  Syllabus
                </button>
              </div>
            </div>
          </div>

          {/* Status Filter Badges */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] text-theme-text-muted mr-1 font-mono">Filter by tier:</span>
            {(['All', 'Weak', 'Improve', 'Good', 'Strong'] as const).map(tier => (
              <button
                key={tier}
                onClick={() => setStatusFilter(tier)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  statusFilter === tier
                    ? 'bg-teal-500 text-white font-bold shadow-md shadow-teal-500/20'
                    : 'bg-theme-card border border-theme-border text-theme-text-muted hover:text-theme-text'
                }`}
              >
                {tier === 'All' ? `All (${topicData.length})` : tier}
              </button>
            ))}
          </div>

          {/* Bar Chart Canvas */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={filteredAndSortedTopics} 
                margin={{ top: 15, right: 15, left: -15, bottom: 25 }}
                onClick={(state: any) => {
                  if (state && state.activePayload && state.activePayload.length > 0) {
                    const payload = state.activePayload[0].payload as TopicAccuracyItem;
                    if (payload && payload.id) {
                      setSelectedTopicId(payload.id);
                    }
                  }
                }}
              >
                <XAxis 
                  dataKey="topic" 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                  domain={[0, 100]} 
                  ticks={[0, 25, 50, 75, 100]}
                />
                <ReferenceLine y={75} stroke="#38bdf8" strokeDasharray="3 3" label={{ value: 'Target 75%', fill: '#38bdf8', fontSize: 10, position: 'top' }} />
                <Tooltip
                  cursor={{ fill: 'rgba(20, 184, 166, 0.08)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as TopicAccuracyItem;
                      const isSelected = data.id === selectedTopicId;
                      return (
                        <div className="p-3 bg-slate-900 border border-teal-500/40 rounded-xl shadow-2xl text-xs space-y-1.5 max-w-xs z-50">
                          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
                            <span className="font-bold text-white">{data.topic}</span>
                            <span 
                              className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                              style={{ backgroundColor: `${data.color}20`, color: data.color }}
                            >
                              {data.status}
                            </span>
                          </div>
                          <div className="text-sm font-extrabold font-mono" style={{ color: data.color }}>
                            {data.accuracy}% Accuracy
                          </div>
                          <p className="text-[11px] text-slate-300 line-clamp-2">
                            {data.pitfall}
                          </p>
                          <div className="pt-1 text-[10px] text-teal-400 font-semibold">
                            {isSelected ? '✓ Currently Selected' : '👉 Click to inspect deep-dive'}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="accuracy" 
                  radius={[8, 8, 0, 0]} 
                  cursor="pointer"
                  animationDuration={600}
                >
                  {filteredAndSortedTopics.map((entry) => {
                    const isSelected = entry.id === selectedTopicId;
                    return (
                      <Cell 
                        key={`cell-${entry.id}`} 
                        fill={entry.color} 
                        opacity={isSelected ? 1 : 0.75}
                        stroke={isSelected ? '#ffffff' : 'none'}
                        strokeWidth={isSelected ? 2 : 0}
                      />
                    );
                  })}
>>>>>>> ecbfa17 (DSAverse)
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
<<<<<<< HEAD
        </div>

        {/* Donut Distribution Chart */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
=======

          <div className="flex items-center justify-between text-[11px] text-theme-text-muted font-mono pt-2 border-t border-theme-border/40">
            <span>Click any bar to change the selected topic inspection below</span>
            <span className="text-teal-400">9 Topics (Learn Curriculum)</span>
          </div>

        </div>

        {/* Donut Mastery Distribution Chart */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel flex flex-col justify-between space-y-4">
>>>>>>> ecbfa17 (DSAverse)
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <h3 className="text-base font-bold text-theme-text flex items-center">
              <PieIcon className="w-4 h-4 mr-2 text-emerald-400" /> Mastery Distribution
            </h3>
<<<<<<< HEAD
          </div>

          <div className="h-64 w-full flex items-center justify-center">
=======
            <span className="text-[10px] font-mono text-theme-text-muted">Interactive</span>
          </div>

          <div className="h-52 w-full flex items-center justify-center relative">
>>>>>>> ecbfa17 (DSAverse)
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
<<<<<<< HEAD
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(139,92,246,0.3)', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
=======
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  cursor="pointer"
                  onClick={(entry: any) => {
                    if (entry && entry.status) {
                      setStatusFilter(prev => prev === entry.status ? 'All' : entry.status);
                    }
                  }}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`slice-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0.2)" strokeWidth={1} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white shadow-xl">
                          <p className="font-bold">{data.name}</p>
                          <p className="font-mono text-teal-400">{data.value} Topics</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Click slice to filter table</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-theme-text font-mono">{topicData.length}</span>
              <span className="text-[10px] text-theme-text-muted uppercase font-mono">Topics</span>
            </div>
          </div>

          {/* Interactive Legend for Pie */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-theme-border/40">
            {pieData.map(item => (
              <button
                key={item.name}
                onClick={() => setStatusFilter(prev => prev === item.status ? 'All' : (item.status as any))}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                  statusFilter === item.status
                    ? 'border-teal-400 bg-teal-500/10'
                    : 'border-theme-border/60 hover:border-theme-border'
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                  <span className="text-[11px] font-semibold text-theme-text truncate">{item.name.split(' ')[0]}</span>
                </div>
                <div className="text-[10px] text-theme-text-muted font-mono mt-0.5 pl-4">
                  {item.value} topics ({Math.round((item.value / topicData.length) * 100)}%)
                </div>
              </button>
            ))}
          </div>

>>>>>>> ecbfa17 (DSAverse)
        </div>

      </div>

<<<<<<< HEAD
      {/* Topic Accuracy Table */}
      <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
        <h3 className="text-base font-bold text-theme-text">Topic Performance Summary</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-theme-card/80 border-b border-theme-border text-theme-text-muted font-mono uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Topic</th>
                <th className="py-3.5 px-4">Accuracy</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {topicAccuracyData.map((row) => (
                <tr key={row.topic} className="hover:border-theme-border/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-theme-text">{row.topic}</td>
                  <td className="py-4 px-4 font-mono font-semibold" style={{ color: row.color }}>
                    {row.accuracy}%
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full font-semibold text-[11px] border ${
                      row.status === 'Strong' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      row.status === 'Good' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                      row.status === 'Improve' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      to={`/learn/${row.topic === 'Stacks & Queues' ? 'stacks-queues' : row.topic === 'Linked Lists' ? 'linked-lists' : row.topic.toLowerCase()}`}
                      className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
                    >
                      Practice Topic
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
=======
      {/* Selected Topic Deep-Dive Inspection Panel */}
      <div className="p-6 rounded-2xl bg-theme-card border-2 border-teal-500/40 glass-panel shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme-border pb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-md"
              style={{ backgroundColor: activeTopic.color }}
            >
              {activeTopic.accuracy}%
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-extrabold text-theme-text">{activeTopic.topic}</h3>
                <span 
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border"
                  style={{ 
                    backgroundColor: `${activeTopic.color}15`, 
                    color: activeTopic.color,
                    borderColor: `${activeTopic.color}40`
                  }}
                >
                  {activeTopic.status}
                </span>
              </div>
              <p className="text-xs text-theme-text-muted mt-0.5">
                Deep-dive vulnerability assessment and simulated drill score
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/learn/${activeTopic.id}`}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md shadow-teal-600/20"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Study {activeTopic.topic} Theory</span>
            </Link>

            <Link
              to="/practice"
              className="px-4 py-2 rounded-xl border border-teal-500/30 hover:border-teal-400 bg-theme-card text-teal-400 text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Practice Problems</span>
            </Link>

            <Link
              to="/journal"
              className="px-4 py-2 rounded-xl border border-amber-500/30 hover:border-amber-400 bg-theme-card text-amber-400 text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>Log Mistake</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-xl bg-theme-card border border-rose-500/25 space-y-1.5">
            <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider flex items-center">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Primary Pitfall Identified
            </span>
            <p className="text-theme-text leading-relaxed font-sans">
              {activeTopic.pitfall}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-theme-card border border-teal-500/25 space-y-1.5">
            <span className="font-bold text-teal-400 uppercase text-[10px] tracking-wider flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Prescribed Action Plan
            </span>
            <p className="text-theme-text leading-relaxed font-sans">
              {activeTopic.recommendation}
            </p>
          </div>

          {/* Interactive Score Simulator */}
          <div className="p-4 rounded-xl bg-theme-card border border-theme-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-theme-text uppercase text-[10px] tracking-wider flex items-center">
                <Sliders className="w-3.5 h-3.5 mr-1 text-teal-400" /> Simulate Practice Score
              </span>
              <span className="font-mono font-bold" style={{ color: activeTopic.color }}>
                {activeTopic.accuracy}%
              </span>
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              value={activeTopic.accuracy}
              onChange={(e) => updateAccuracy(activeTopic.id, parseInt(e.target.value, 10))}
              className="w-full accent-teal-500 cursor-pointer"
            />
            
            <div className="flex justify-between items-center text-[10px] text-theme-text-muted font-mono">
              <button 
                onClick={() => updateAccuracy(activeTopic.id, activeTopic.accuracy - 5)}
                className="hover:text-rose-400"
              >
                -5% Practice Fail
              </button>
              <button 
                onClick={() => updateAccuracy(activeTopic.id, activeTopic.accuracy + 5)}
                className="hover:text-emerald-400"
              >
                +5% Practice Pass
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Topic Performance Summary Table (Fully Interactive) */}
      <div className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
        
        {/* Table Header & Search Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme-border pb-4">
          <div>
            <h3 className="text-base font-bold text-theme-text flex items-center">
              Topic Performance Summary
            </h3>
            <p className="text-xs text-theme-text-muted mt-0.5">
              Interactive summary table for all {topicData.length} Learn topics. Click rows to inspect or sort by columns.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-theme-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topic or pitfall..."
                className="bg-theme-card border border-theme-border rounded-xl pl-8 pr-3 py-1.5 text-xs text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:border-teal-500 transition-colors w-48 sm:w-60"
              />
            </div>

            {/* Quick Sort Dropdown */}
            <div className="flex items-center space-x-1 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-teal-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-theme-card border border-theme-border rounded-xl px-2.5 py-1.5 text-theme-text text-xs focus:outline-none focus:border-teal-500"
              >
                <option value="weakest">Lowest Accuracy First</option>
                <option value="highest">Highest Accuracy First</option>
                <option value="name">Alphabetical (A-Z)</option>
                <option value="syllabus">Syllabus Sequence</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-theme-card border-b border-theme-border text-theme-text-muted font-mono uppercase tracking-wider text-[11px]">
              <tr>
                <th 
                  className="py-3 px-4 cursor-pointer hover:text-teal-400 transition-colors"
                  onClick={() => setSortBy(prev => prev === 'name' ? 'syllabus' : 'name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Topic</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 cursor-pointer hover:text-teal-400 transition-colors"
                  onClick={() => setSortBy(prev => prev === 'weakest' ? 'highest' : 'weakest')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Accuracy (%)</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th className="py-3 px-4">Performance Status</th>
                <th className="py-3 px-4 hidden md:table-cell">Key Diagnostic Pitfall</th>
                <th className="py-3 px-4 text-right">Interactive Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredAndSortedTopics.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-theme-text-muted">
                    No topics matched your search filter.
                  </td>
                </tr>
              ) : (
                filteredAndSortedTopics.map((row) => {
                  const isSelected = row.id === selectedTopicId;

                  return (
                    <tr 
                      key={row.id} 
                      onClick={() => setSelectedTopicId(row.id)}
                      className={`transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-teal-500/15 border-l-4 border-l-teal-400' 
                          : 'hover:bg-theme-surface-hover/50'
                      }`}
                    >
                      {/* Topic Name */}
                      <td className="py-3.5 px-4 font-bold text-theme-text">
                        <div className="flex items-center space-x-2">
                          <span>{row.topic}</span>
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                          )}
                        </div>
                      </td>

                      {/* Accuracy Score & Mini Bar */}
                      <td className="py-3.5 px-4 font-mono font-bold">
                        <div className="flex items-center space-x-2.5">
                          <span style={{ color: row.color }} className="w-10">
                            {row.accuracy}%
                          </span>
                          <div className="w-24 h-2 rounded-full bg-theme-bg overflow-hidden border border-theme-border/50">
                            <div 
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${row.accuracy}%`, backgroundColor: row.color }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full font-semibold text-[11px] border ${
                          row.status === 'Strong' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                          row.status === 'Good' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                          row.status === 'Improve' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                          'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        }`}>
                          {row.status}
                        </span>
                      </td>

                      {/* Diagnostic Pitfall */}
                      <td className="py-3.5 px-4 hidden md:table-cell text-theme-text-muted max-w-xs truncate">
                        {row.pitfall}
                      </td>

                      {/* Action Links */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/learn/${row.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="px-2.5 py-1 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 hover:text-teal-300 font-semibold text-xs border border-teal-500/30 transition-colors inline-flex items-center space-x-1"
                          >
                            <span>Learn</span>
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-theme-text-muted pt-3 border-t border-theme-border/40 font-mono">
          <span>Showing {filteredAndSortedTopics.length} of {topicData.length} Learn Section Topics</span>
          <span className="text-teal-400">Arrays successfully excluded as specified</span>
        </div>

>>>>>>> ecbfa17 (DSAverse)
      </div>

    </div>
  );
};
<<<<<<< HEAD

=======
>>>>>>> ecbfa17 (DSAverse)
