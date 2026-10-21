import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Code2, Award, ArrowRight } from 'lucide-react';
import { dsaTopics, dsaProblems, mockChallenges } from '../data/dsaData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTopics = query
    ? dsaTopics.filter(t => t.name.toLowerCase().includes(query.toLowerCase()) || t.shortDesc.toLowerCase().includes(query.toLowerCase()))
    : dsaTopics.slice(0, 3);

  const filteredProblems = query
    ? dsaProblems.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.topicId.toLowerCase().includes(query.toLowerCase()))
    : dsaProblems.slice(0, 3);

  const filteredChallenges = query
    ? mockChallenges.filter(c => c.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSelectTopic = (id: string) => {
    onClose();
    navigate(`/learn/${id}`);
  };

  const handleSelectProblem = (_id: string) => {
    onClose();
    navigate('/practice');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-theme-card/40 dark:bg-black/70 backdrop-blur-md animate-fadeIn transition-colors">
      <div className="w-full max-w-2xl bg-theme-surface-elevated dark:bg-theme-card border border-teal-500/20 dark:border-teal-500/30 rounded-2xl shadow-2xl overflow-hidden glass-panel">
        
        {/* Search Input Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-theme-border bg-theme-surface-elevated/60 dark:bg-theme-card/60 transition-colors">
          <Search className="w-5 h-5 text-teal-500 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search DSA topics, C++ problems, or roadmap..."
            className="w-full bg-transparent text-theme-text dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none text-base font-normal"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-theme-text-muted hover:text-theme-text-muted dark:hover:text-white mr-2 transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="px-2 py-0.5 text-xs font-mono text-theme-text-muted dark:text-theme-text-muted bg-slate-100 dark:bg-theme-card border border-theme-border rounded transition-colors">
            ESC
          </span>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">

          {/* Topics Section */}
          {filteredTopics.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-theme-text-muted dark:text-theme-text-muted uppercase tracking-wider mb-2.5 flex items-center">
                <BookOpen className="w-3.5 h-3.5 mr-1.5 text-teal-500" />
                DSA Learning Topics
              </div>
              <div className="space-y-1.5">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => handleSelectTopic(topic.id)}
                    className="p-3 rounded-xl bg-theme-surface-elevated dark:bg-theme-card/50 hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover0/20 border border-transparent hover:border-teal-200 dark:hover:border-teal-500/30 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-theme-text dark:text-slate-100">{topic.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-theme-surface-elevated dark:bg-theme-card text-theme-text-muted dark:text-theme-text-muted border border-theme-border shadow-sm dark:shadow-none">
                          {topic.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-theme-text-muted dark:text-theme-text-muted mt-0.5 line-clamp-1">{topic.shortDesc}</p>
                    </div>
                    <span className="text-xs font-mono text-teal-500 flex items-center">
                      Learn <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problems Section */}
          {filteredProblems.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-theme-text-muted dark:text-theme-text-muted uppercase tracking-wider mb-2.5 flex items-center">
                <Code2 className="w-3.5 h-3.5 mr-1.5 text-blue-500 dark:text-blue-400" />
                C++ Coding Problems
              </div>
              <div className="space-y-1.5">
                {filteredProblems.map((prob) => (
                  <div
                    key={prob.id}
                    onClick={() => handleSelectProblem(prob.id)}
                    className="p-3 rounded-xl bg-theme-surface-elevated dark:bg-theme-card/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-transparent hover:border-blue-200 dark:hover:border-blue-500/30 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-theme-text dark:text-slate-100">{prob.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded border ${
                          prob.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30' :
                          prob.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30' :
                          'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30'
                        }`}>
                          {prob.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-theme-text-muted dark:text-theme-text-muted mt-0.5">Topic: {prob.topicId} • Acceptance: {prob.acceptance}</p>
                    </div>
                    <span className="text-xs font-mono text-blue-500 dark:text-blue-400 flex items-center">
                      Solve <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges Section */}
          {filteredChallenges.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-theme-text-muted dark:text-theme-text-muted uppercase tracking-wider mb-2.5 flex items-center">
                <Award className="w-3.5 h-3.5 mr-1.5 text-amber-500 dark:text-amber-400" />
                Coding Challenges
              </div>
              <div className="space-y-1.5">
                {filteredChallenges.map((ch) => (
                  <div
                    key={ch.id}
                    onClick={() => { onClose(); navigate('/challenges'); }}
                    className="p-3 rounded-xl bg-theme-surface-elevated dark:bg-theme-card/50 hover:bg-amber-50 dark:hover:bg-amber-900/20 border border-transparent hover:border-amber-200 dark:hover:border-amber-500/30 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-theme-text dark:text-slate-100">{ch.title}</h4>
                      <p className="text-xs text-theme-text-muted dark:text-theme-text-muted mt-0.5">{ch.description}</p>
                    </div>
                    <span className="text-xs font-mono text-amber-500 dark:text-amber-400">View</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query && filteredTopics.length === 0 && filteredProblems.length === 0 && filteredChallenges.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-theme-text-muted dark:text-theme-text-muted">No direct matches for "{query}".</p>
              <button
                onClick={() => { onClose(); navigate('/practice'); }}
                className="mt-3 px-4 py-2 text-xs font-semibold rounded-xl bg-teal-600 text-white hover:bg-teal-500 shadow-lg shadow-teal-500/30 transition-all cursor-pointer"
              >
                Browse All C++ Practice Questions
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 border-t border-theme-border bg-theme-surface-elevated/80 dark:bg-theme-card/80 flex items-center justify-between text-xs text-theme-text-muted transition-colors">
          <span>Navigate with mouse or enter key</span>
          <span className="font-mono">DSAverse Search v1.0</span>
        </div>
      </div>
    </div>
  );
};
