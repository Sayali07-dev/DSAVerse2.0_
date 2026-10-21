import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden z-10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-teal-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="p-10 md:p-16 rounded-3xl bg-theme-card/80 border border-teal-500/30 glass-panel shadow-2xl shadow-teal-900/20">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-6">
            Ready to Enter the <span className="text-gradient-teal">DSAverse?</span>
          </h2>
          <p className="text-theme-text-muted text-lg mb-10 max-w-xl mx-auto">
            Your DSA journey starts here. Join your peers and master the algorithms you need.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-base shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center space-x-2 group hover:-translate-y-1"
            >
              <span>Start Learning — It's Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#syllabus"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-theme-card hover:bg-slate-700 border border-slate-600 text-white font-semibold text-base transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore the Syllabus</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
