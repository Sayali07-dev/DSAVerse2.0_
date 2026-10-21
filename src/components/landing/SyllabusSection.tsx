import React from 'react';
import { ChevronRight } from 'lucide-react';

export const SyllabusSection: React.FC = () => {
  const syllabusTopics = [
    {
      id: '01',
      title: 'Fundamentals',
      items: ['C++ Fundamentals', 'Introduction to Algorithms', 'Analysis of Algorithms', 'Time Complexity', 'Space Complexity', 'Abstract Data Types']
    },
    {
      id: '02',
      title: 'Arrays & Searching',
      items: ['Arrays', 'Associative Arrays', 'Jagged Arrays', 'Sequential Search', 'Sentinel Search', 'Binary Search', 'Fibonacci Search']
    },
    {
      id: '03',
      title: 'Sorting',
      items: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Quick Sort', 'Merge Sort', 'Internal & External Sorting']
    },
    {
      id: '04',
      title: 'Hashing',
      items: ['Hash Tables', 'Hash Functions', 'Collision Resolution']
    },
    {
      id: '05',
      title: 'Linked Lists',
      items: ['Singly Linked List', 'Doubly Linked List', 'Circular Linked List', 'Operations', 'Generalized Linked Lists']
    },
    {
      id: '06',
      title: 'Stacks & Queues',
      items: ['Stack ADT', 'Sequential Organization', 'Stack Operations', 'Prefix/Postfix', 'Expression Conversion']
    },
    {
      id: '07',
      title: 'Trees',
      items: ['Trees', 'Binary Trees', 'Binary Search Trees (BST)', 'Tree Traversals (Inorder, Preorder, Postorder)', 'AVL & Balanced Trees']
    }
  ];

  return (
    <section id="syllabus" className="py-12 bg-theme-card/60 border-y border-teal-500/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-theme-text tracking-tight mb-3">
            Your PICT DSA Syllabus.<br/>
            <span className="text-gradient-teal">One Place.</span>
          </h2>
          <p className="text-theme-text-muted text-base">
            Structured around the topics you actually need to learn.
          </p>
        </div>

        <div className="relative">
          {/* Timeline connecting line (Desktop) */}
          <div className="hidden lg:block absolute top-[28px] left-[40px] right-[40px] h-[2px] bg-theme-card -z-10"></div>
          
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
            {syllabusTopics.map((topic) => (
              <div 
                key={topic.id} 
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[280px] snap-start group"
              >
                <div className="bg-theme-card border border-teal-500/10 rounded-2xl p-6 h-full glass-panel hover:border-teal-500/30 transition-all hover:-translate-y-1 relative">
                  
                  {/* Connection Node */}
                  <div className="hidden lg:flex absolute -top-[30px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-theme-card border-2 border-teal-500/50 group-hover:bg-theme-surface-hover0 group-hover:shadow-[0_0_10px_rgba(20,184,166,0.6)] transition-all z-10"></div>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-theme-border">
                    <span className="text-3xl font-black text-theme-text group-hover:text-teal-900/40 transition-colors pointer-events-none">
                      {topic.id}
                    </span>
                    <h3 className="text-lg font-bold text-theme-text text-right w-2/3 leading-tight">
                      {topic.title}
                    </h3>
                  </div>
                  
                  <ul className="space-y-2.5">
                    {topic.items.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-theme-text-muted group-hover:text-theme-text-muted transition-colors">
                        <ChevronRight className="w-4 h-4 text-teal-500/50 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
