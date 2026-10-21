import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Globe, Share2, Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-teal-500/15 bg-theme-surface-elevated dark:bg-[#061417] text-theme-text-muted text-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-theme-text">
                DSA<span className="text-gradient-teal">verse</span>
              </span>
            </Link>
            <p className="text-xs text-theme-text-muted leading-relaxed max-w-sm">
              The complete, interactive DSA learning platform designed specifically for engineering students to master Data Structures & Algorithms in C++.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-theme-surface-elevated dark:bg-theme-card border border-theme-border hover:border-teal-500/40 text-theme-text-muted hover:text-teal-600 dark:hover:text-white transition-all">
                <Code2 className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-theme-surface-elevated dark:bg-theme-card border border-theme-border hover:border-teal-500/40 text-theme-text-muted hover:text-teal-600 dark:hover:text-white transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-theme-surface-elevated dark:bg-theme-card border border-theme-border hover:border-teal-500/40 text-theme-text-muted hover:text-teal-600 dark:hover:text-white transition-all">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Learn */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-text mb-4 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-teal-600 dark:text-teal-500" /> Learn
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/roadmap" className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors">Structured Roadmap</Link></li>
              <li><Link to="/learn/arrays" className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors">Arrays & Pointers</Link></li>
              <li><Link to="/learn/searching" className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors">Binary Search</Link></li>
              <li><Link to="/learn/recursion" className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors">Recursion & Backtracking</Link></li>
              <li><Link to="/learn/trees" className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors">Trees & Graph BFS/DFS</Link></li>
            </ul>
          </div>

          {/* Practice */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-text mb-4 flex items-center">
              <Code2 className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400" /> Practice
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/practice" className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors">Curated C++ Problems</Link></li>
              <li><Link to="/challenges" className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors">Coding Challenges</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-text mb-4 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-600 dark:text-emerald-400" /> Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/dashboard" className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors">Student Dashboard</Link></li>
              <li><Link to="/analytics" className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors">Weakness Analysis</Link></li>
              <li><Link to="/recommendations" className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors">Smart Recommendations</Link></li>
              <li><Link to="/journal" className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors">Mistake Journal</Link></li>
              <li><Link to="/community" className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors">Community Forum</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
