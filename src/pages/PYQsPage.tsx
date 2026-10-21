import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileText, 
  Eye, 
  Download, 
  Sparkles, 
  FileCheck,
  ExternalLink
} from 'lucide-react';
import { DEPARTMENTS } from '../data/departmentsData';
import type { QuestionPaper } from '../data/departmentsData';
import { getPapersForDepartment } from '../lib/pyqStorage';
import { PdfViewerModal } from '../components/pyqs/PdfViewerModal';

export const PYQsPage: React.FC = () => {
  // Selected department (defaults to computer-engineering)
  const [selectedDeptId, setSelectedDeptId] = useState<string>('computer-engineering');
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [viewingPaper, setViewingPaper] = useState<QuestionPaper | null>(null);

  // Load papers for current department
  const loadData = async (deptId: string) => {
    setLoading(true);
    try {
      const deptPapers = await getPapersForDepartment(deptId);
      setPapers(deptPapers);
    } catch (err) {
      console.error('Failed to load papers', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(selectedDeptId);
  }, [selectedDeptId]);

  // Split papers into the 2 requested columns: INSEM and ENDSEM
  const insemPapers = useMemo(() => {
    const list = papers.filter((p) => p.examType === 'In-Sem');
    const seenTitles = new Set<string>();
    const seenIds = new Set<string>();
    return list.filter((p) => {
      const normalizedTitle = p.title.trim().toLowerCase();
      if (seenTitles.has(normalizedTitle) || seenIds.has(p.id)) {
        return false;
      }
      seenTitles.add(normalizedTitle);
      seenIds.add(p.id);
      return true;
    });
  }, [papers]);

  const endsemPapers = useMemo(() => {
    return papers.filter((p) => p.examType === 'End-Sem' || p.examType === 'Prelim' || p.examType === 'Unit Test');
  }, [papers]);

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* ─── Top Header with Department Selector ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-theme-border gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-theme-text">
              PYQ's
            </h1>
          </div>
        </div>

        {/* Clean, compact Department Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-theme-text-muted hidden sm:inline">Department:</span>
          <select
            value={selectedDeptId}
            onChange={(e) => setSelectedDeptId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-theme-card border border-theme-border text-theme-text text-xs font-semibold focus:outline-none focus:border-teal-500 cursor-pointer shadow-sm w-full sm:w-auto"
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ─── ONLY 2 COLUMNS: INSEM AND ENDSEM ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        {/* ─── COLUMN 1: INSEM ─── */}
        <div className="flex flex-col rounded-3xl p-6 border bg-theme-card border-theme-border shadow-sm">
          {/* Column Header (NO Upload PDF button on the right) */}
          <div className="flex items-center space-x-3 pb-4 border-b border-theme-border mb-4">
            <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-700 dark:text-teal-300 flex items-center justify-center font-extrabold text-xs">
              IN
            </div>
            <h2 className="text-xl font-extrabold tracking-wider text-theme-text uppercase">
              INSEM
            </h2>
          </div>

          {/* Papers List */}
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-2">
              <div className="w-7 h-7 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-theme-text-muted">Loading papers...</p>
            </div>
          ) : insemPapers.length === 0 ? (
            <div className="py-14 px-4 text-center border-2 border-dashed border-theme-border rounded-2xl bg-theme-bg/40 flex flex-col items-center justify-center space-y-2">
              <FileText className="w-8 h-8 text-teal-600/40 dark:text-teal-400/40" />
              <p className="text-xs font-semibold text-theme-text">No INSEM papers available</p>
            </div>
          ) : (
            <div className="space-y-3">
              {insemPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="p-4 rounded-2xl bg-theme-bg/60 hover:bg-theme-bg border border-theme-border hover:border-teal-500/40 transition-all shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <FileCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                      <h3 className="text-sm font-bold text-theme-text truncate">
                        {paper.title}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 text-[11px] text-theme-text-muted">
                      <span className="font-medium text-teal-600 dark:text-teal-400">{paper.semester}</span>
                      <span>•</span>
                      <span>{paper.marks} Marks ({paper.duration})</span>
                      <span>•</span>
                      <span>{paper.year}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                      title="Open PDF directly in Chrome or Edge tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in Chrome / Edge</span>
                    </a>

                    <button
                      onClick={() => setViewingPaper(paper)}
                      className="px-3 py-1.5 rounded-xl bg-theme-surface-elevated hover:bg-theme-surface-hover border border-theme-border text-theme-text font-semibold text-xs flex items-center space-x-1 transition-all cursor-pointer"
                      title="Preview in modal"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <a
                      href={paper.pdfUrl}
                      download={`${paper.title.replace(/\s+/g, '_')}_INSEM.pdf`}
                      className="p-2 rounded-xl bg-theme-surface-elevated hover:bg-theme-surface-hover border border-theme-border text-theme-text transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ─── COLUMN 2: ENDSEM ─── */}
        <div className="flex flex-col rounded-3xl p-6 border bg-theme-card border-theme-border shadow-sm">
          {/* Column Header */}
          <div className="flex items-center space-x-3 pb-4 border-b border-theme-border mb-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-extrabold text-xs">
              END
            </div>
            <h2 className="text-xl font-extrabold tracking-wider text-theme-text uppercase">
              ENDSEM
            </h2>
          </div>

          {/* Papers List */}
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-2">
              <div className="w-7 h-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-theme-text-muted">Loading papers...</p>
            </div>
          ) : endsemPapers.length === 0 ? (
            <div className="py-16 px-4 text-center border-2 border-dashed border-theme-border rounded-2xl bg-theme-bg/30 flex flex-col items-center justify-center space-y-2">
              <FileText className="w-8 h-8 text-emerald-600/30 dark:text-emerald-400/30" />
              <p className="text-xs font-semibold text-theme-text-muted">No ENDSEM papers</p>
              <p className="text-[11px] text-theme-text-muted/60">ENDSEM section is currently empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              {endsemPapers.map((paper) => {
                const isCompGivenSample = paper.isGivenSample && selectedDeptId === 'computer-engineering';

                return (
                  <div
                    key={paper.id}
                    className={`p-4 rounded-2xl border transition-all shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isCompGivenSample
                        ? 'bg-gradient-to-r from-emerald-500/10 via-theme-bg to-teal-500/10 border-emerald-500/40 ring-1 ring-emerald-500/30'
                        : 'bg-theme-bg/60 hover:bg-theme-bg border-theme-border hover:border-emerald-500/40'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <h3 className="text-sm font-bold text-theme-text truncate">
                          {paper.title}
                        </h3>
                      </div>

                      {isCompGivenSample && (
                        <div>
                          <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                            <Sparkles className="w-2.5 h-2.5 mr-1 text-emerald-500" /> Uploaded Given PDF
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => setViewingPaper(paper)}
                        className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm ${
                          isCompGivenSample
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold shadow-emerald-500/25'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View PDF</span>
                      </button>

                      <a
                        href={paper.pdfUrl}
                        download={`${paper.title.replace(/\s+/g, '_')}_ENDSEM.pdf`}
                        className="p-2 rounded-xl bg-theme-card hover:bg-theme-surface-hover border border-theme-border text-theme-text transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* ─── PDF Viewer Modal ─── */}
      {viewingPaper && (
        <PdfViewerModal
          paper={viewingPaper}
          onClose={() => setViewingPaper(null)}
        />
      )}

    </div>
  );
};
