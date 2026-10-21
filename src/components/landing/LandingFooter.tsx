import React from 'react';
import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="border-t border-theme-border bg-theme-card relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center md:items-start">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-teal-400" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-theme-text">
                DSA<span className="text-teal-400">verse</span>
              </span>
            </Link>
            <p className="text-theme-text-muted text-sm italic">
              Learn DSA Smarter.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-sm font-medium text-theme-text-muted">
            <a href="/" className="hover:text-teal-400 transition-colors">Home</a>
            <a href="#features" className="hover:text-teal-400 transition-colors">Features</a>
            <a href="#syllabus" className="hover:text-teal-400 transition-colors">Syllabus</a>
            <a href="#about" className="hover:text-teal-400 transition-colors">About</a>
            <Link to="/login" className="hover:text-teal-400 transition-colors">Login</Link>
          </div>

          {/* Copyright/Info */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-2">
            <div className="px-3 py-1 rounded bg-theme-card border border-theme-border text-xs text-theme-text-muted font-medium">
              Built for PICT students • Free to learn
            </div>
            <p className="text-xs text-theme-text-muted">
              © {new Date().getFullYear()} DSAverse. Not officially affiliated with PICT.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};
