import React, { useState } from 'react';
import { 
  BookMarked, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Filter, 
  Calendar, 
  AlertTriangle, 
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
  const [newMistakeType, setNewMistakeType] = useState<MistakeEntry['mistakeType']>('Boundary Condition');
  const [newWhatWentWrong, setNewWhatWentWrong] = useState('');
  const [newWhatILearned, setNewWhatILearned] = useState('');

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
          <h1 className="text-2xl sm:text-4xl font-extrabold text-theme-text flex items-center">
            <BookMarked className="w-8 h-8 mr-3 text-amber-400" />
            C++ Mistake Journal
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-muted mt-1">
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

      {/* Add New Mistake Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-theme-card border border-teal-500/30 rounded-3xl p-6 shadow-2xl glass-panel space-y-4">
            
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <h3 className="text-base font-bold text-theme-text flex items-center">
                <BookMarked className="w-4 h-4 mr-2 text-amber-400" /> Log C++ Mistake
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-theme-text-muted hover:text-theme-text font-bold px-2">X</button>
            </div>

            <form onSubmit={handleAddMistake} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-theme-text-muted mb-1">Problem Title</label>
                <input
                  type="text"
                  required
                  value={newProblemTitle}
                  onChange={(e) => setNewProblemTitle(e.target.value)}
                  placeholder="e.g. Binary Search Rotated Array"
                  className="w-full bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-theme-text-muted mb-1">Topic</label>
                  <select
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500"
                  >
                    <option value="Arrays">Arrays</option>
                    <option value="Searching">Searching</option>
                    <option value="Sorting">Sorting</option>
                    <option value="Recursion">Recursion</option>
                    <option value="Linked Lists">Linked Lists</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-theme-text-muted mb-1">Mistake Type</label>
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
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-theme-text-muted mb-1">What Went Wrong?</label>
                <textarea
                  required
                  rows={2}
                  value={newWhatWentWrong}
                  onChange={(e) => setNewWhatWentWrong(e.target.value)}
                  placeholder="Explain why your implementation crashed or failed test cases..."
                  className="w-full bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-theme-text-muted mb-1">What I Learned / Takeaway</label>
                <textarea
                  required
                  rows={2}
                  value={newWhatILearned}
                  onChange={(e) => setNewWhatILearned(e.target.value)}
                  placeholder="Key rule to remember in future solutions..."
                  className="w-full bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

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
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

