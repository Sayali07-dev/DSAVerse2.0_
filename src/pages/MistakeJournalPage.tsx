<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
>>>>>>> ecbfa17 (DSAverse)
import { 
  BookMarked, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Filter, 
  Calendar, 
  AlertTriangle, 
<<<<<<< HEAD
  Lightbulb 
} from 'lucide-react';
import { mockMistakes } from '../data/dsaData';
import type { MistakeEntry } from '../data/dsaData';

export const MistakeJournalPage: React.FC = () => {
  const [mistakes, setMistakes] = useState<MistakeEntry[]>(mockMistakes);
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newProblemTitle, setNewProblemTitle] = useState('');
  const [newTopic, setNewTopic] = useState('Arrays');
=======
  Lightbulb,
  Search,
  Trash2,
  ExternalLink,
  RefreshCw,
  Check,
  Sparkles,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import type { MistakeEntry } from '../data/dsaData';

const LEARN_TOPICS = [
  'C++ Fundamentals',
  'Complexity Analysis',
  'Searching',
  'Hashing',
  'Sorting',
  'Linked Lists',
  'Stacks & Queues',
  'Recursion',
  'Trees'
];

const TOPIC_ROUTE_MAP: Record<string, string> = {
  'C++ Fundamentals': 'cpp-basics',
  'Complexity Analysis': 'time-complexity',
  'Searching': 'searching',
  'Hashing': 'hashing',
  'Sorting': 'sorting',
  'Linked Lists': 'linked-lists',
  'Stacks & Queues': 'stacks-queues',
  'Recursion': 'recursion',
  'Trees': 'trees',
};

export const MistakeJournalPage: React.FC = () => {
  const [mistakes, setMistakes] = useState<MistakeEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Reviewed' | 'Pending'>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form State for new mistake
  const [newProblemTitle, setNewProblemTitle] = useState('');
  const [newTopic, setNewTopic] = useState('Searching');
>>>>>>> ecbfa17 (DSAverse)
  const [newMistakeType, setNewMistakeType] = useState<MistakeEntry['mistakeType']>('Boundary Condition');
  const [newWhatWentWrong, setNewWhatWentWrong] = useState('');
  const [newWhatILearned, setNewWhatILearned] = useState('');

<<<<<<< HEAD
  const toggleReview = (id: string) => {
    setMistakes(prev => prev.map(m => m.id === id ? { ...m, reviewed: !m.reviewed } : m));
  };

  const handleAddMistake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProblemTitle || !newWhatWentWrong) return;

    const newEntry: MistakeEntry = {
      id: Date.now().toString(),
      problemId: 'custom',
      problemTitle: newProblemTitle,
      topic: newTopic,
      mistakeType: newMistakeType,
      date: new Date().toISOString().split('T')[0],
      whatWentWrong: newWhatWentWrong,
      whatILearned: newWhatILearned,
      reviewed: false
    };

    setMistakes([newEntry, ...mistakes]);
    setShowAddModal(false);
    setNewProblemTitle('');
    setNewWhatWentWrong('');
    setNewWhatILearned('');
  };

  const filteredMistakes = mistakes.filter(m => {
    const matchTopic = selectedTopic === 'All' || m.topic.toLowerCase() === selectedTopic.toLowerCase();
    const matchType = selectedType === 'All' || m.mistakeType === selectedType;
    return matchTopic && matchType;
  });

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-teal-500/15">
        <div>
=======
  // Fetch mistakes from backend
  const fetchMistakes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/mistakes');
      if (res.ok) {
        const data = await res.json();
        if (data.mistakes && Array.isArray(data.mistakes)) {
          setMistakes(data.mistakes);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend /api/mistakes not accessible, using fallback:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMistakes();
  }, []);

  const toggleReview = async (id: string) => {
    const target = mistakes.find(m => m.id === id);
    if (!target) return;
    const nextReviewed = !target.reviewed;

    // Optimistic UI update
    setMistakes(prev => prev.map(m => m.id === id ? { ...m, reviewed: nextReviewed } : m));

    try {
      await fetch(`/api/mistakes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewed: nextReviewed })
      });
    } catch (err) {
      console.error('Failed to sync review status with backend:', err);
    }
  };

  const handleDeleteMistake = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this mistake entry from the journal?')) {
      return;
    }

    setMistakes(prev => prev.filter(m => m.id !== id));

    try {
      await fetch(`/api/mistakes/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Failed to delete mistake on backend:', err);
    }
  };

  const handleAddMistake = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProblemTitle.trim() || !newWhatWentWrong.trim()) return;

    setIsSaving(true);
    const newEntry = {
      problemTitle: newProblemTitle.trim(),
      topic: newTopic,
      mistakeType: newMistakeType,
      whatWentWrong: newWhatWentWrong.trim(),
      whatILearned: newWhatILearned.trim(),
      problemId: newTopic.toLowerCase().replace(/[^a-z0-9]/g, '-')
    };

    try {
      const res = await fetch('/api/mistakes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.mistake) {
          setMistakes(prev => [data.mistake, ...prev]);
        } else {
          // Local fallback
          setMistakes(prev => [
            {
              id: `m-${Date.now()}`,
              problemId: newEntry.problemId,
              problemTitle: newEntry.problemTitle,
              topic: newEntry.topic,
              mistakeType: newEntry.mistakeType,
              date: new Date().toISOString().split('T')[0],
              whatWentWrong: newEntry.whatWentWrong,
              whatILearned: newEntry.whatILearned,
              reviewed: false
            },
            ...prev
          ]);
        }

        setSaveSuccessMsg('Mistake saved successfully to backend storage!');
        setTimeout(() => setSaveSuccessMsg(null), 4000);

        setShowAddModal(false);
        setNewProblemTitle('');
        setNewWhatWentWrong('');
        setNewWhatILearned('');
      } else {
        alert('Server returned an error while saving. Please try again.');
      }
    } catch (err) {
      console.error('Error logging mistake to backend:', err);
      // Still persist locally
      setMistakes(prev => [
        {
          id: `m-${Date.now()}`,
          problemId: newEntry.problemId,
          problemTitle: newEntry.problemTitle,
          topic: newEntry.topic,
          mistakeType: newEntry.mistakeType,
          date: new Date().toISOString().split('T')[0],
          whatWentWrong: newEntry.whatWentWrong,
          whatILearned: newEntry.whatILearned,
          reviewed: false
        },
        ...prev
      ]);
      setShowAddModal(false);
    } finally {
      setIsSaving(false);
    }
  };

  // Filter and search logic
  const filteredMistakes = mistakes.filter(m => {
    const matchSearch = searchQuery.trim() === '' || 
      m.problemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.whatWentWrong.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.whatILearned.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.topic.toLowerCase().includes(searchQuery.toLowerCase());

    const matchTopic = selectedTopic === 'All' || m.topic.toLowerCase() === selectedTopic.toLowerCase();
    const matchType = selectedType === 'All' || m.mistakeType === selectedType;
    const matchStatus = selectedStatus === 'All' || 
      (selectedStatus === 'Reviewed' && m.reviewed) ||
      (selectedStatus === 'Pending' && !m.reviewed);

    return matchSearch && matchTopic && matchType && matchStatus;
  });

  const totalCount = mistakes.length;
  const pendingCount = mistakes.filter(m => !m.reviewed).length;
  const reviewedCount = mistakes.filter(m => m.reviewed).length;

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Success Notification Banner */}
      {saveSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20">
              <Check className="w-4 h-4 text-emerald-300" />
            </div>
            <span className="text-xs font-semibold">{saveSuccessMsg}</span>
          </div>
          <button 
            onClick={() => setSaveSuccessMsg(null)}
            className="text-xs hover:text-white font-mono"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-teal-500/15">
        <div>
          <div className="flex items-center space-x-2 text-xs text-theme-text-muted mb-1">
            <Link to="/analytics" className="hover:text-teal-400">Weakness Analytics</Link>
            <span>/</span>
            <span className="text-teal-400 font-semibold">Mistake Journal</span>
          </div>
>>>>>>> ecbfa17 (DSAverse)
          <h1 className="text-2xl sm:text-4xl font-extrabold text-theme-text flex items-center">
            <BookMarked className="w-8 h-8 mr-3 text-amber-400" />
            C++ Mistake Journal
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-muted mt-1">
<<<<<<< HEAD
            Track past mistakes, understand why logic failed, and prevent repeating errors in interviews.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-theme-text text-xs font-bold shadow-lg shadow-teal-600/30 transition-all flex items-center space-x-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Mistake</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel flex flex-wrap items-center justify-between gap-4 text-xs">
        
        <div className="flex items-center space-x-3">
          <Filter className="w-4 h-4 text-teal-400" />
          <span className="font-semibold text-theme-text-muted">Filters:</span>
          
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="bg-theme-card border border-theme-border rounded-xl px-3 py-1.5 text-theme-text focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Topics</option>
            <option value="Searching">Searching</option>
            <option value="Recursion">Recursion</option>
            <option value="Arrays">Arrays</option>
            <option value="Hashing">Hashing</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-theme-card border border-theme-border rounded-xl px-3 py-1.5 text-theme-text focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Mistake Types</option>
            <option value="Boundary Condition">Boundary Condition</option>
            <option value="Off-by-one">Off-by-one</option>
            <option value="Null Pointer">Null Pointer</option>
            <option value="Time Limit Exceeded">Time Limit Exceeded</option>
            <option value="Logic Error">Logic Error</option>
          </select>
        </div>

        <div className="font-mono text-theme-text-muted">
          Showing {filteredMistakes.length} logged entries
        </div>

      </div>

      {/* Mistake Entries List */}
      <div className="space-y-4">
        {filteredMistakes.map((entry) => (
          <div
            key={entry.id}
            className={`p-6 rounded-2xl border transition-all ${
              entry.reviewed
                ? 'bg-theme-card/40 border-theme-border/80 opacity-80'
                : 'bg-theme-card border-teal-500/30 glass-panel shadow-xl'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-theme-border">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleReview(entry.id)}
                  className="p-1 rounded-lg hover:border-theme-border transition-colors"
                  title="Toggle Reviewed Status"
                >
                  {entry.reviewed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-theme-text-muted" />
                  )}
                </button>
                <h3 className="text-base font-bold text-theme-text">{entry.problemTitle}</h3>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {entry.topic}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/30">
                  {entry.mistakeType}
                </span>
              </div>

              <div className="flex items-center space-x-3 text-xs text-theme-text-muted font-mono">
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" /> {entry.date}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs">
              <div className="p-3.5 rounded-xl bg-theme-card border border-rose-500/20 space-y-1">
                <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" /> What Went Wrong
                </span>
                <p className="text-theme-text-muted leading-relaxed font-sans">{entry.whatWentWrong}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-theme-card border border-emerald-500/20 space-y-1">
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider flex items-center">
                  <Lightbulb className="w-3 h-3 mr-1" /> What I Learned
                </span>
                <p className="text-theme-text-muted leading-relaxed font-sans">{entry.whatILearned}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
=======
            Record bugs, call-stack overflows, and boundary edge cases. Logged mistakes persist to the backend so you never repeat the same error.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 shrink-0">
          <button
            onClick={fetchMistakes}
            disabled={isLoading}
            className="p-2.5 rounded-xl border border-theme-border bg-theme-card hover:border-teal-500/40 text-theme-text-muted hover:text-teal-400 transition-all"
            title="Refresh from Backend"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-teal-400' : ''}`} />
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-teal-600/30 transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Log New Mistake</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-theme-text-muted uppercase">Total Logged Mistakes</span>
            <div className="text-2xl font-extrabold text-theme-text font-mono">{totalCount}</div>
          </div>
          <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <BookMarked className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-theme-card border border-amber-500/20 glass-panel flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-amber-400/90 uppercase">Active / Needs Review</span>
            <div className="text-2xl font-extrabold text-amber-400 font-mono">{pendingCount}</div>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-theme-card border border-emerald-500/20 glass-panel flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-emerald-400/90 uppercase">Mastered & Prevented</span>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">{reviewedCount}</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Interactive Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-theme-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problem title, what went wrong, takeaways..."
              className="w-full bg-theme-card border border-theme-border rounded-xl pl-9 pr-3 py-2 text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:border-teal-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-text-muted hover:text-theme-text text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center space-x-1.5 text-theme-text-muted">
              <Filter className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-semibold text-[11px]">Filters:</span>
            </div>

            {/* Learn Topics Filter */}
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-theme-card border border-theme-border rounded-xl px-3 py-1.5 text-theme-text focus:outline-none focus:border-teal-500"
            >
              <option value="All">All Learn Topics ({LEARN_TOPICS.length})</option>
              {LEARN_TOPICS.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>

            {/* Mistake Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-theme-card border border-theme-border rounded-xl px-3 py-1.5 text-theme-text focus:outline-none focus:border-teal-500"
            >
              <option value="All">All Mistake Types</option>
              <option value="Boundary Condition">Boundary Condition</option>
              <option value="Off-by-one">Off-by-one</option>
              <option value="Null Pointer">Null Pointer</option>
              <option value="Time Limit Exceeded">Time Limit Exceeded</option>
              <option value="Logic Error">Logic Error</option>
              <option value="Memory Leak">Memory Leak</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="bg-theme-card border border-theme-border rounded-xl px-3 py-1.5 text-theme-text focus:outline-none focus:border-teal-500"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Needs Review</option>
              <option value="Reviewed">Mastered / Reviewed</option>
            </select>
          </div>

        </div>

        <div className="flex items-center justify-between pt-2 border-t border-theme-border/40 text-[11px] font-mono text-theme-text-muted">
          <span>Showing {filteredMistakes.length} of {mistakes.length} logged mistakes</span>
          <span className="text-teal-400 flex items-center">
            <Sparkles className="w-3 h-3 mr-1" />
            Backend storage active
          </span>
        </div>
      </div>

      {/* Mistake Entries List */}
      {isLoading ? (
        <div className="p-12 text-center space-y-3 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel">
          <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-theme-text-muted">Loading your mistake journal from backend...</p>
        </div>
      ) : filteredMistakes.length === 0 ? (
        <div className="p-12 text-center space-y-4 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto text-teal-400">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-theme-text">No Mistakes Match Your Filter</h3>
            <p className="text-xs text-theme-text-muted mt-1 max-w-md mx-auto">
              Try adjusting your filters or click "Log New Mistake" to record an error and prevent logic bugs.
            </p>
          </div>
          <button
            onClick={() => { setSearchQuery(''); setSelectedTopic('All'); setSelectedType('All'); setSelectedStatus('All'); }}
            className="px-4 py-2 rounded-xl border border-teal-500/40 text-teal-400 text-xs font-semibold hover:bg-teal-500/10 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map((entry) => {
            const topicSlug = TOPIC_ROUTE_MAP[entry.topic] || entry.topic.toLowerCase().replace(/[^a-z0-9]/g, '-');

            return (
              <div
                key={entry.id}
                className={`p-6 rounded-2xl border transition-all ${
                  entry.reviewed
                    ? 'bg-theme-card/60 border-theme-border/60 opacity-85'
                    : 'bg-theme-card border-teal-500/30 glass-panel shadow-xl hover:border-teal-500/50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-theme-border">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => toggleReview(entry.id)}
                      className="p-1 rounded-lg hover:bg-theme-surface-hover transition-colors flex items-center space-x-1.5 cursor-pointer"
                      title={entry.reviewed ? 'Mark as Needs Review' : 'Mark as Mastered / Reviewed'}
                    >
                      {entry.reviewed ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <span className="text-[11px] font-semibold text-emerald-400">Mastered</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-5 h-5 text-amber-400" />
                          <span className="text-[11px] font-semibold text-amber-400">Needs Review</span>
                        </>
                      )}
                    </button>

                    <h3 className="text-base font-bold text-theme-text ml-1">{entry.problemTitle}</h3>

                    <Link
                      to={`/learn/${topicSlug}`}
                      className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-teal-500/15 text-teal-300 border border-teal-500/30 hover:bg-teal-500/25 transition-colors flex items-center space-x-1"
                      title={`Revise ${entry.topic} in Learn section`}
                    >
                      <span>{entry.topic}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </Link>

                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/30">
                      {entry.mistakeType}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-theme-text-muted font-mono shrink-0">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-teal-400" /> {entry.date}
                    </span>
                    <button
                      onClick={(e) => handleDeleteMistake(entry.id, e)}
                      className="p-1 rounded text-theme-text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-theme-card border border-rose-500/20 space-y-1">
                    <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" /> What Went Wrong
                    </span>
                    <p className="text-theme-text-muted leading-relaxed font-sans">{entry.whatWentWrong}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-theme-card border border-emerald-500/20 space-y-1">
                    <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider flex items-center">
                      <Lightbulb className="w-3 h-3 mr-1" /> What I Learned / Takeaway
                    </span>
                    <p className="text-theme-text-muted leading-relaxed font-sans">
                      {entry.whatILearned || 'Review core edge conditions before submitting code.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-theme-border/30 text-[11px]">
                  <span className="text-theme-text-muted italic">
                    {entry.reviewed ? '✓ Concepts reviewed & tested in dry run' : '⚠️ Keep this error in mind when writing C++ code'}
                  </span>
                  <Link
                    to={`/learn/${topicSlug}`}
                    className="text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1"
                  >
                    <span>Practice {entry.topic}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      )}
>>>>>>> ecbfa17 (DSAverse)

      {/* Add New Mistake Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-theme-card border border-teal-500/30 rounded-3xl p-6 shadow-2xl glass-panel space-y-4">
            
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <h3 className="text-base font-bold text-theme-text flex items-center">
<<<<<<< HEAD
                <BookMarked className="w-4 h-4 mr-2 text-amber-400" /> Log C++ Mistake
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-theme-text-muted hover:text-theme-text font-bold px-2">X</button>
=======
                <BookMarked className="w-4 h-4 mr-2 text-amber-400" /> Log C++ Mistake to Backend
              </h3>
              <button 
                onClick={() => setShowAddModal(false)} 
                className="text-theme-text-muted hover:text-theme-text font-bold px-2"
              >
                ✕
              </button>
>>>>>>> ecbfa17 (DSAverse)
            </div>

            <form onSubmit={handleAddMistake} className="space-y-4 text-xs">
              <div>
<<<<<<< HEAD
                <label className="block font-semibold text-theme-text-muted mb-1">Problem Title</label>
=======
                <label className="block font-semibold text-theme-text mb-1">
                  Problem Title <span className="text-rose-400">*</span>
                </label>
>>>>>>> ecbfa17 (DSAverse)
                <input
                  type="text"
                  required
                  value={newProblemTitle}
                  onChange={(e) => setNewProblemTitle(e.target.value)}
<<<<<<< HEAD
                  placeholder="e.g. Binary Search Rotated Array"
=======
                  placeholder="e.g. Binary Search in Rotated Array, Merge Sort Inversion..."
>>>>>>> ecbfa17 (DSAverse)
                  className="w-full bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
<<<<<<< HEAD
                  <label className="block font-semibold text-theme-text-muted mb-1">Topic</label>
=======
                  <label className="block font-semibold text-theme-text mb-1">
                    Learn Section Topic <span className="text-rose-400">*</span>
                  </label>
>>>>>>> ecbfa17 (DSAverse)
                  <select
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500"
                  >
<<<<<<< HEAD
                    <option value="Arrays">Arrays</option>
                    <option value="Searching">Searching</option>
                    <option value="Sorting">Sorting</option>
                    <option value="Recursion">Recursion</option>
                    <option value="Linked Lists">Linked Lists</option>
=======
                    {LEARN_TOPICS.map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
>>>>>>> ecbfa17 (DSAverse)
                  </select>
                </div>

                <div>
<<<<<<< HEAD
                  <label className="block font-semibold text-theme-text-muted mb-1">Mistake Type</label>
=======
                  <label className="block font-semibold text-theme-text mb-1">
                    Mistake Type <span className="text-rose-400">*</span>
                  </label>
>>>>>>> ecbfa17 (DSAverse)
                  <select
                    value={newMistakeType}
                    onChange={(e) => setNewMistakeType(e.target.value as any)}
                    className="w-full bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500"
                  >
                    <option value="Boundary Condition">Boundary Condition</option>
                    <option value="Off-by-one">Off-by-one</option>
                    <option value="Null Pointer">Null Pointer</option>
                    <option value="Time Limit Exceeded">Time Limit Exceeded</option>
                    <option value="Logic Error">Logic Error</option>
<<<<<<< HEAD
=======
                    <option value="Memory Leak">Memory Leak</option>
>>>>>>> ecbfa17 (DSAverse)
                  </select>
                </div>
              </div>

              <div>
<<<<<<< HEAD
                <label className="block font-semibold text-theme-text-muted mb-1">What Went Wrong?</label>
                <textarea
                  required
                  rows={2}
                  value={newWhatWentWrong}
                  onChange={(e) => setNewWhatWentWrong(e.target.value)}
                  placeholder="Explain why your implementation crashed or failed test cases..."
=======
                <label className="block font-semibold text-theme-text mb-1">
                  What Went Wrong? <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={newWhatWentWrong}
                  onChange={(e) => setNewWhatWentWrong(e.target.value)}
                  placeholder="Explain why your logic failed: e.g. checked target after incrementing pointer, missed base case in recursive tree..."
>>>>>>> ecbfa17 (DSAverse)
                  className="w-full bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className="block font-semibold text-theme-text-muted mb-1">What I Learned / Takeaway</label>
                <textarea
                  required
                  rows={2}
                  value={newWhatILearned}
                  onChange={(e) => setNewWhatILearned(e.target.value)}
                  placeholder="Key rule to remember in future solutions..."
=======
                <label className="block font-semibold text-theme-text mb-1">
                  What I Learned / Takeaway
                </label>
                <textarea
                  rows={2}
                  value={newWhatILearned}
                  onChange={(e) => setNewWhatILearned(e.target.value)}
                  placeholder="Key rule to prevent this bug in competitive exams or interviews..."
>>>>>>> ecbfa17 (DSAverse)
                  className="w-full bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

<<<<<<< HEAD
              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border-theme-border text-theme-text-muted font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-theme-surface-hover0 text-theme-text font-bold shadow-md"
                >
                  Save Entry
                </button>
=======
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-teal-400 font-mono flex items-center">
                  <ShieldAlert className="w-3.5 h-3.5 mr-1" />
                  Saves to /api/mistakes
                </span>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl border border-theme-border text-theme-text-muted font-semibold hover:bg-theme-surface-hover"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold shadow-md flex items-center space-x-1.5"
                  >
                    {isSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                    <span>{isSaving ? 'Saving...' : 'Save to Backend'}</span>
                  </button>
                </div>
>>>>>>> ecbfa17 (DSAverse)
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
<<<<<<< HEAD

=======
>>>>>>> ecbfa17 (DSAverse)
