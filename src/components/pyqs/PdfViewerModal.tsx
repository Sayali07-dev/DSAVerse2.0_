import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  FileText, 
  Calendar, 
  Clock, 
  Award, 
  BookOpen, 
  ChevronRight, 
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { DEPARTMENTS } from '../../data/departmentsData';
import type { QuestionPaper } from '../../data/departmentsData';
import { Link } from 'react-router-dom';

interface PdfViewerModalProps {
  paper: QuestionPaper;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ paper, onClose }) => {
  const [activeTab, setActiveTab] = useState<'pdf' | 'questions'>('pdf');
  const dept = DEPARTMENTS.find((d) => d.id === paper.departmentId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-2 sm:p-4 overflow-hidden animate-in fade-in duration-200">
      <div className="w-full max-w-6xl h-[92vh] flex flex-col bg-theme-card border border-teal-500/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden glass-panel">
        
        {/* Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-theme-border flex flex-wrap items-center justify-between gap-3 bg-theme-card/90">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  {dept?.shortCode || 'DEPARTMENT'}
                </span>
                <span className="text-xs font-mono text-theme-text-muted">
                  Code: {paper.subjectCode}
                </span>
                {paper.isGivenSample && (
                  <span className="hidden sm:inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40">
                    <Sparkles className="w-3 h-3 mr-1 text-emerald-500" />
                    Given PDF
                  </span>
                )}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-theme-text truncate max-w-md">
                {paper.title}
              </h3>
            </div>
          </div>

          {/* Meta & Navigation Tabs */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center bg-theme-bg p-1 rounded-xl border border-theme-border">
              <button
                onClick={() => setActiveTab('pdf')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'pdf'
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'text-theme-text-muted hover:text-theme-text'
                }`}
              >
                PDF View
              </button>
              {paper.questionHighlights && paper.questionHighlights.length > 0 && (
                <button
                  onClick={() => setActiveTab('questions')}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1 ${
                    activeTab === 'questions'
                      ? 'bg-teal-500 text-white shadow-sm'
                      : 'text-theme-text-muted hover:text-theme-text'
                  }`}
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Questions ({paper.questionHighlights.length})</span>
                </button>
              )}
            </div>

            {/* Open in Chrome / Edge Button */}
            <a
              href={paper.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-teal-500/20 transition-all cursor-pointer"
              title="Open PDF directly in Chrome or Edge tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Chrome / Edge</span>
            </a>

            {/* Download Link */}
            <a
              href={paper.pdfUrl}
              download={`${paper.title.replace(/\s+/g, '_')}_${paper.year}.pdf`}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-theme-surface-elevated hover:bg-theme-surface-hover border border-theme-border text-theme-text text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Download</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-theme-surface-elevated hover:bg-theme-surface-hover border border-theme-border text-theme-text transition-colors"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Meta Sub-header */}
        <div className="px-4 sm:px-6 py-2 bg-theme-bg/60 border-b border-theme-border text-xs text-theme-text-muted flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Session: <strong className="text-theme-text">{paper.year}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Exam: <strong className="text-theme-text">{paper.examType}</strong> ({paper.semester})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Max Marks: <strong className="text-theme-text">{paper.marks}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>Duration: <strong className="text-theme-text">{paper.duration}</strong></span>
            </div>
          </div>
          
          <a
            href={paper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
          >
            <span>Open in new tab</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Content Body */}
        <div className="flex-1 bg-slate-900/40 relative overflow-hidden flex flex-col">
          {activeTab === 'pdf' ? (
            <div className="w-full h-full relative flex flex-col items-center justify-center">
              <object
                data={`${paper.pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                type="application/pdf"
                className="w-full h-full border-0 bg-white"
              >
                <iframe
                  src={`${paper.pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                  title={paper.title}
                  className="w-full h-full border-0 bg-white"
                />
              </object>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/85 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full border border-white/20 shadow-xl flex items-center gap-2">
                <span>Having trouble viewing inside modal?</span>
                <a
                  href={paper.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 font-bold underline hover:text-teal-300"
                >
                  Open in Chrome / Edge tab
                </a>
              </div>
            </div>
          ) : (
            <div className="w-full h-full overflow-y-auto p-4 sm:p-8 space-y-4 max-w-4xl mx-auto">
              <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-theme-text">Curated Question Breakdown & DSA Mapping</h4>
                  <p className="text-xs text-theme-text-muted mt-0.5 leading-relaxed">
                    Review past university questions categorized by topic. Click through to dry-run or solve similar problems in DSAverse.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {paper.questionHighlights?.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-theme-card border border-theme-border hover:border-teal-500/40 transition-all shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-800 dark:text-teal-300 font-mono text-xs font-bold border border-teal-500/30">
                          {q.questionNumber}
                        </span>
                        <span className="text-xs text-theme-text-muted">Total Marks: {q.marks}</span>
                      </div>
                      {q.relatedTopicSlug && (
                        <Link
                          to={`/learn/${q.relatedTopicSlug}`}
                          onClick={onClose}
                          className="inline-flex items-center text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline gap-1"
                        >
                          <span>Learn Topic</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                    <ul className="space-y-1.5 pl-2 border-l-2 border-teal-500/30 ml-2">
                      {q.subQuestions.map((sub, sIdx) => (
                        <li key={sIdx} className="text-xs text-theme-text leading-relaxed flex items-start">
                          <ChevronRight className="w-3.5 h-3.5 text-teal-500 shrink-0 mr-1 mt-0.5" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
