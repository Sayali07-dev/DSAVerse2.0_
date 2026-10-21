import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

export const PictExclusivity: React.FC = () => {
  return (
    <section id="about" className="py-12 relative overflow-hidden bg-teal-950/20 border-y border-teal-500/15 z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.15),transparent_50%)]"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 mb-4 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
          <Award className="w-7 h-7" />
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-theme-text tracking-tight mb-3">
          Made for PICT.<br />
          <span className="text-gradient-teal">Free for PICT.</span>
        </h2>
        
        <p className="text-theme-text-muted text-base leading-relaxed max-w-2xl mx-auto mb-6">
          DSAverse is designed specifically around the learning needs and DSA curriculum of PICT students. No paywalls, no generic content - just what you need to succeed.
        </p>

        <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-theme-card border border-teal-500/40 text-teal-300 text-sm font-bold shadow-lg">
          <ShieldCheck className="w-5 h-5 text-teal-400" />
          <span>100% Free for PICT Students</span>
        </div>
      </div>
    </section>
  );
};
