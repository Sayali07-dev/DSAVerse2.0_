import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Sign Up',
      desc: 'Create your free DSAverse account using your email.'
    },
    {
      num: '02',
      title: 'Choose a Topic',
      desc: 'Follow the PICT-aligned syllabus step-by-step.'
    },
    {
      num: '03',
      title: 'Learn & Practice',
      desc: 'Study concepts, visualize algorithms and solve problems.'
    }
  ];

  return (
    <section id="how-it-works" className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-theme-text tracking-tight">
          How It Works
        </h2>
      </div>

      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-teal-500/20 -translate-y-1/2 hidden md:block"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-theme-card border-2 border-teal-500 flex items-center justify-center text-2xl font-black text-teal-400 mb-6 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-theme-text mb-2">{step.title}</h3>
              <p className="text-theme-text-muted text-sm px-4">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
