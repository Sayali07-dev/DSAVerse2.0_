import React from 'react';
import { BookOpen, Presentation, GraduationCap, Code2, Dumbbell, Timer } from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      num: '01',
      title: 'Concept Learning',
      desc: 'Clear explanations of DSA concepts from fundamentals to advanced topics.'
    },
    {
      icon: <Presentation className="w-6 h-6" />,
      num: '02',
      title: 'Interactive Visualizations',
      desc: 'Understand algorithms through animations and visual representations instead of memorizing them.'
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      num: '03',
      title: 'PICT Syllabus',
      desc: 'Content structured exactly around the DSA curriculum followed by PICT.'
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      num: '04',
      title: 'Coding Examples',
      desc: 'Learn concepts through practical C/C++ programming examples.'
    },
    {
      icon: <Dumbbell className="w-6 h-6" />,
      num: '05',
      title: 'Practice & Problems',
      desc: 'Apply what you learn with targeted coding exercises and algorithmic problems.'
    },
    {
      icon: <Timer className="w-6 h-6" />,
      num: '06',
      title: 'Complexity Analysis',
      desc: 'Understand Time Complexity and Space Complexity alongside every algorithm.'
    }
  ];

  return (
    <section id="features" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-theme-text tracking-tight">
          Everything You Need to <span className="text-gradient-teal">Master DSA</span>
        </h2>
        <p className="text-theme-text-muted text-sm sm:text-base leading-relaxed">
          Stop jumping between notes, videos, websites and random problem sets. 
          DSAverse brings your DSA learning journey together in one cohesive, interactive platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, idx) => (
          <div 
            key={idx}
            className="p-6 rounded-2xl bg-theme-card/60 border border-teal-500/10 glass-card glass-card-teal-hover group relative overflow-hidden flex flex-col h-full"
          >
            {/* Number Background */}
            <div className="absolute -top-4 -right-2 text-8xl font-black text-theme-text/20 group-hover:text-teal-900/10 transition-colors pointer-events-none select-none z-0">
              {feature.num}
            </div>

            <div className="relative z-10 flex-1">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 group-hover:bg-theme-surface-hover0/20 group-hover:border-teal-400/40 transition-all">
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold text-theme-text mb-3 flex items-center">
                <span className="text-teal-400 font-mono text-sm mr-2">{feature.num}</span> 
                {feature.title}
              </h4>
              <p className="text-sm text-theme-text-muted leading-relaxed group-hover:text-theme-text-muted transition-colors">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
