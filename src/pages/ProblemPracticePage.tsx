import React, { useState } from 'react';
import { 
  Code2, 
  Search, 
  CheckCircle2, 
  Circle, 
  ExternalLink,
  Sparkles,
  X,
  Copy,
  Check,
  Bot,
} from 'lucide-react';
import { dsaProblems, type DSAProblem } from '../data/dsaData';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { useProgress } from '../context/ProgressContext';

const topicLabels: Record<string, string> = {
  'arrays': 'Arrays',
  'searching': 'Searching',
  'sorting': 'Sorting',
  'hashing': 'Hashing',
  'recursion': 'Recursion',
  'linked-lists': 'Linked Lists',
  'stacks-queues': 'Stacks & Queues',
  'trees': 'Trees',
  'graphs': 'Graphs',
  'dp': 'Dynamic Programming',
};

export const ProblemPracticePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Solved' | 'Unsolved'>('All');
  const { solvedMap, toggleProblemSolved, solvedCount, totalProblems, overallProgress } = useProgress();

  // AI Assistant Modal State
  const [activeProblemForAi, setActiveProblemForAi] = useState<DSAProblem | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [copiedAiText, setCopiedAiText] = useState(false);

  const toggleSolved = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toggleProblemSolved(id);
  };

  const handleOpenAiAssistant = async (prob: DSAProblem) => {
    setActiveProblemForAi(prob);
    setAiLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch('/api/ai/dsa-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicLabels[prob.topicId] || prob.topicId,
          problemTitle: prob.title,
          question: `How do I approach "${prob.title}" in C++ with optimal ${prob.expectedTime} complexity? What are the key invariant and edge cases?`,
        }),
      });

      if (!res.ok) throw new Error('Assistant API returned an error');
      const data = await res.json();
      setAiResponse(data.answer || 'No guidance received.');
    } catch {
      setAiResponse(
        `### Approach Guidance for ${prob.title}:\n\n` +
        `1. **Invariant**: Verify if the data is sorted or can be mapped using frequency counting.\n` +
        `2. **Target Complexity**: Aim for ${prob.expectedTime} time.\n` +
        `3. **Edge Cases**: Empty collection, single-element input, duplicate elements, negative numbers.`
      );
    } finally {
      setAiLoading(false);
    }
  };

  const handleCopyAi = () => {
    if (!aiResponse) return;
    navigator.clipboard.writeText(aiResponse);
    setCopiedAiText(true);
    setTimeout(() => setCopiedAiText(false), 2000);
  };

  const filteredProblems = dsaProblems.filter((p) => {
    const isSolved = Boolean(solvedMap[p.id]);
    const topicLabel = topicLabels[p.topicId] || p.topicId;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topicLabel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === 'All' || p.topicId === selectedTopic;
    const matchesStatus = selectedStatus === 'All' || (selectedStatus === 'Solved' ? isSolved : !isSolved);

    return matchesSearch && matchesDiff && matchesTopic && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-teal-500/15">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-theme-text flex items-center">
            <Code2 className="w-8 h-8 mr-3 text-teal-400" />
            Curated 30 DSA Problem Bank
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-muted mt-1">
            Hand-picked questions covering all major engineering DSA topics with AI complexity guidance & LeetCode tracking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
            Solved: {solvedCount} / {totalProblems} ({overallProgress}%)
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-theme-card border border-teal-500/30 text-teal-300 text-xs font-mono font-semibold">
            Showing {filteredProblems.length} / {dsaProblems.length}
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-theme-text-muted absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or topics..."
            className="w-full bg-theme-card border border-theme-border rounded-xl pl-10 pr-4 py-2 text-xs text-theme-text placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-theme-text-muted hover:text-theme-text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as 'All' | 'Easy' | 'Medium' | 'Hard')}
            className="bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Topic Filter */}
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500"
          >
            <option value="All">All DSA Topics</option>
            <option value="arrays">Arrays</option>
            <option value="searching">Searching</option>
            <option value="sorting">Sorting</option>
            <option value="hashing">Hashing</option>
            <option value="recursion">Recursion & Backtracking</option>
            <option value="linked-lists">Linked Lists</option>
            <option value="stacks-queues">Stacks & Queues</option>
            <option value="trees">Trees & BST</option>
            <option value="graphs">Graphs</option>
            <option value="dp">Dynamic Programming</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as 'All' | 'Solved' | 'Unsolved')}
            className="bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Statuses</option>
            <option value="Solved">Solved Only</option>
            <option value="Unsolved">Unsolved Only</option>
          </select>
        </div>

      </div>

      {/* Problem Table */}
      <div className="rounded-2xl bg-theme-card border border-teal-500/20 glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            
            <thead className="bg-theme-card/80 border-b border-theme-border text-theme-text-muted font-mono uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">No.</th>
                <th className="py-3.5 px-4 w-16 text-center">Status</th>
                <th className="py-3.5 px-4">Question Title</th>
                <th className="py-3.5 px-4">Topic</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4">Complexity</th>
                <th className="py-3.5 px-4 text-center">AI Guidance</th>
                <th className="py-3.5 px-4 text-right">Practice</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-theme-text-muted">
                    <p className="font-semibold text-sm">No problems match your current search and filters.</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedDifficulty('All');
                        setSelectedTopic('All');
                        setSelectedStatus('All');
                      }}
                      className="mt-3 px-4 py-2 rounded-xl bg-teal-500/20 text-teal-300 text-xs font-semibold hover:bg-teal-500/30 transition-all"
                    >
                      Reset Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredProblems.map((prob, index) => {
                  const isSolved = Boolean(solvedMap[prob.id]);
                  return (
                    <tr
                      key={prob.id}
                      className="hover:bg-teal-950/20 transition-colors group"
                    >
                      <td className="py-4 px-4 text-center font-mono text-theme-text-muted">
                        {index + 1}
                      </td>

                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={(e) => toggleSolved(e, prob.id)}
                          title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
                          className="mx-auto flex items-center justify-center p-1 rounded-lg hover:bg-teal-500/10 transition-colors cursor-pointer"
                        >
                          {isSolved ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Circle className="w-4 h-4 text-theme-text-muted hover:text-teal-400" />
                          )}
                        </button>
                      </td>

                      <td className="py-4 px-4 font-bold text-theme-text group-hover:text-teal-400 transition-colors">
                        <a
                          href={prob.leetcodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 hover:underline"
                        >
                          <span>{prob.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 text-teal-400" />
                        </a>
                      </td>

                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-300 font-mono text-[11px]">
                          {topicLabels[prob.topicId] || prob.topicId}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <DifficultyBadge difficulty={prob.difficulty} size="sm" />
                      </td>

                      <td className="py-4 px-4 font-mono text-theme-text-muted">
                        {prob.expectedTime}
                      </td>

                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleOpenAiAssistant(prob)}
                          className="px-2.5 py-1.5 rounded-lg bg-teal-500/15 hover:bg-teal-500/30 border border-teal-500/30 text-teal-300 text-xs font-medium inline-flex items-center space-x-1 transition-all"
                          title="Get AI intuition and complexity hint"
                        >
                          <Sparkles className="w-3 h-3 text-teal-400" />
                          <span>AI Hint</span>
                        </button>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <a
                          href={prob.leetcodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all inline-flex items-center space-x-1.5"
                        >
                          <span>Solve on LeetCode</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* AI Guidance Modal */}
      {activeProblemForAi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-theme-card border border-teal-500/30 rounded-3xl p-6 shadow-2xl glass-panel relative flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-4 border-b border-theme-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-theme-text flex items-center gap-2">
                    <span>{activeProblemForAi.title}</span>
                    <DifficultyBadge difficulty={activeProblemForAi.difficulty} size="sm" />
                  </h3>
                  <p className="text-xs text-theme-text-muted">
                    DSAverse Algorithmic Hint & Invariant Explainer
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveProblemForAi(null)}
                className="p-1.5 rounded-lg text-theme-text-muted hover:bg-theme-surface-hover transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 text-xs leading-relaxed space-y-4">
              {aiLoading ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-3">
                  <div className="w-8 h-8 rounded-full border-2 border-teal-500/30 border-t-teal-400 animate-spin" />
                  <p className="text-theme-text-muted">Synthesizing optimal approach and dry-run hint...</p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-theme-border text-theme-text whitespace-pre-wrap font-sans text-xs sm:text-sm">
                  {aiResponse}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-theme-border flex items-center justify-between">
              <button
                onClick={handleCopyAi}
                disabled={aiLoading || !aiResponse}
                className="px-3.5 py-2 rounded-xl border border-theme-border bg-theme-card hover:bg-theme-surface-hover text-theme-text text-xs font-medium inline-flex items-center space-x-1.5 transition-all disabled:opacity-50"
              >
                {copiedAiText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-teal-400" />
                    <span>Copy Analysis</span>
                  </>
                )}
              </button>

              <div className="flex items-center space-x-2">
                <a
                  href={activeProblemForAi.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-md transition-all inline-flex items-center space-x-1.5"
                >
                  <span>Open in LeetCode</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
