import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Code2, Database, Share2, Binary } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 pb-10 lg:pt-28 lg:pb-12 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-teal-600/15 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] -z-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-900/30 border border-teal-500/30 text-teal-300 text-xs font-semibold glow-teal">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>BUILT FOR PICT STUDENTS</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-theme-text leading-[1.1]">
              Master DSA.<br />
              <span className="text-gradient-teal">The PICT Way.</span>
            </h1>

            <p className="text-theme-text-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              A completely free Data Structures & Algorithms learning platform built around the PICT syllabus. Learn concepts, visualize algorithms, practice problems, and build your DSA fundamentals - all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-300 hover:to-teal-500 text-slate-950 font-bold text-base shadow-lg shadow-teal-500/30 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Start Learning - It's Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#syllabus"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-theme-card/80 hover:bg-theme-card border border-teal-500/25 hover:border-teal-500/50 text-theme-text font-semibold text-base transition-all flex items-center justify-center space-x-2 glass-panel"
              >
                <span>Explore Syllabus</span>
              </a>
            </div>

            <div className="pt-2 flex items-center justify-center lg:justify-start space-x-2 text-sm text-theme-text-muted">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Exclusively free for PICT students</span>
            </div>
          </motion.div>

          {/* Right Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-lg mx-auto"
          >
            {/* Main Interactive Core */}
            <div className="relative w-full aspect-square max-w-[450px] mx-auto flex items-center justify-center">
              
              {/* Central Glowing Orb */}
              <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-[60px] animate-pulse"></div>
              
              {/* Center DSA Node */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute z-20 w-24 h-24 rounded-2xl bg-theme-card border border-teal-500/50 shadow-2xl shadow-teal-500/20 flex flex-col items-center justify-center glow-teal glass-card"
              >
                <Code2 className="w-8 h-8 text-teal-400 mb-1" />
                <span className="text-[10px] font-bold text-theme-text tracking-widest">CORE</span>
              </motion.div>

              {/* Orbiting Nodes */}
              <div className="absolute inset-0 animate-[spin_30s_linear_infinite]">
                {/* Node 1: Array */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 rounded-xl bg-theme-card/90 border border-theme-border flex flex-col items-center justify-center shadow-lg -rotate-[0deg] animate-[spin_30s_linear_infinite_reverse]">
                    <Database className="w-5 h-5 text-blue-400 mb-1" />
                    <span className="text-[9px] font-mono text-theme-text-muted">ARRAY</span>
                  </div>
                </div>

                {/* Node 2: Tree */}
                <div className="absolute bottom-1/4 right-0 translate-x-1/2 translate-y-1/2">
                  <div className="w-16 h-16 rounded-xl bg-theme-card/90 border border-theme-border flex flex-col items-center justify-center shadow-lg -rotate-[120deg] animate-[spin_30s_linear_infinite_reverse]">
                    <Share2 className="w-5 h-5 text-emerald-400 mb-1" />
                    <span className="text-[9px] font-mono text-theme-text-muted">TREE</span>
                  </div>
                </div>

                {/* Node 3: Graph */}
                <div className="absolute bottom-1/4 left-0 -translate-x-1/2 translate-y-1/2">
                  <div className="w-16 h-16 rounded-xl bg-theme-card/90 border border-theme-border flex flex-col items-center justify-center shadow-lg -rotate-[240deg] animate-[spin_30s_linear_infinite_reverse]">
                    <Binary className="w-5 h-5 text-teal-400 mb-1" />
                    <span className="text-[9px] font-mono text-theme-text-muted">GRAPH</span>
                  </div>
                </div>
              </div>

              {/* Connecting SVG Lines */}
              <svg className="absolute inset-0 w-full h-full -z-10 animate-[spin_30s_linear_infinite]">
                <circle cx="50%" cy="50%" r="42%" fill="none" stroke="rgba(20, 184, 166, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="50%" cy="50%" r="28%" fill="none" stroke="rgba(20, 184, 166, 0.1)" strokeWidth="1" />
              </svg>

              {/* Floating Complexity Tags */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1, ease: "easeInOut" }}
                className="absolute top-1/4 right-8 px-3 py-1.5 rounded-lg bg-theme-card/80 border border-teal-500/30 text-xs font-mono text-teal-300 glass-panel shadow-lg"
              >
                O(log n)
              </motion.div>
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, delay: 0.5, ease: "easeInOut" }}
                className="absolute bottom-1/4 left-8 px-3 py-1.5 rounded-lg bg-theme-card/80 border border-rose-500/30 text-xs font-mono text-rose-300 glass-panel shadow-lg"
              >
                O(n^2)
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

