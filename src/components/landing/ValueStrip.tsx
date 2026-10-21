import React from 'react';
import { ShieldCheck, BookOpen, Presentation, Code } from 'lucide-react';

export const ValueStrip: React.FC = () => {
  const values = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-teal-400" />,
      title: '100% Free',
      desc: 'For PICT students'
    },
    {
      icon: <BookOpen className="w-5 h-5 text-blue-400" />,
      title: 'PICT-Aligned',
      desc: 'Designed around the DSA syllabus'
    },
    {
      icon: <Presentation className="w-5 h-5 text-teal-400" />,
      title: 'Interactive',
      desc: 'Learn by visualizing concepts'
    },
    {
      icon: <Code className="w-5 h-5 text-emerald-400" />,
      title: 'Practice',
      desc: 'Strengthen concepts through coding'
    }
  ];

  return (
    <section className="py-5 border-y border-teal-500/15 bg-theme-card/40 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {values.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center text-center p-4 ${index < 2 ? 'lg:py-2' : 'py-6 lg:py-2'} hover:-translate-y-1 transition-transform cursor-default`}
            >
              <div className="mb-3 p-2.5 rounded-xl bg-theme-card/80 border border-theme-border shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-theme-text mb-1 tracking-wide">{item.title}</h3>
              <p className="text-[11px] text-theme-text-muted uppercase tracking-wider">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

