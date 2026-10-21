import React, { useState, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  FileCheck, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  Sparkles
} from 'lucide-react';
import { DEPARTMENTS } from '../../data/departmentsData';
import type { QuestionPaper } from '../../data/departmentsData';
import { uploadQuestionPaper } from '../../lib/pyqStorage';

interface UploadPaperModalProps {
  initialDepartmentId?: string;
  initialExamType?: 'In-Sem' | 'End-Sem';
  onClose: () => void;
  onPaperUploaded: (paper: QuestionPaper) => void;
}

export const UploadPaperModal: React.FC<UploadPaperModalProps> = ({
  initialDepartmentId = 'computer-engineering',
  initialExamType = 'End-Sem',
  onClose,
  onPaperUploaded,
}) => {
  const [departmentId, setDepartmentId] = useState(initialDepartmentId);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [year, setYear] = useState('NOV/DEC 2024');
  const [semester, setSemester] = useState('Semester 3 (SE)');
  const [examType, setExamType] = useState<'In-Sem' | 'End-Sem' | 'Prelim' | 'Unit Test'>(initialExamType);
  const [pattern, setPattern] = useState('2019 / 2024 Credit Pattern');
  const [marks, setMarks] = useState<number>(initialExamType === 'In-Sem' ? 30 : 70);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const commonSubjects = [
    'Data Structures and Algorithms',
    'Object Oriented Programming',
    'Database Management Systems',
    'Computer Networks',
    'Operating Systems',
    'Discrete Mathematics',
    'Theory of Computation',
    'Microprocessors & Interfacing'
  ];

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
      setError('Only PDF files (.pdf) are supported.');
      return;
    }
    if (selectedFile.size > 25 * 1024 * 1024) {
      setError('File size exceeds 25 MB limit.');
      return;
    }
    setError(null);
    setFile(selectedFile);

    // Auto fill title if empty
    if (!title) {
      const cleanName = selectedFile.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setTitle(cleanName);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please choose or drop a PDF question paper.');
      return;
    }
    if (!title.trim()) {
      setError('Please provide a subject title.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const newPaper = await uploadQuestionPaper({
        departmentId,
        file,
        title,
        subjectCode: subjectCode.trim() || 'CE-2024',
        year,
        semester,
        examType,
        pattern,
        marks: Number(marks) || 70,
      });

      setSuccess(true);
      setTimeout(() => {
        onPaperUploaded(newPaper);
        onClose();
      }, 900);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to upload paper. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-theme-card border border-teal-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl glass-panel relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-theme-text-muted hover:bg-theme-surface-hover transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
            <UploadCloud className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-theme-text flex items-center gap-1.5">
              <span>Upload Previous Year Q Paper</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </h3>
            <p className="text-xs text-theme-text-muted">
              Add past university question papers as PDF for your department.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Question paper uploaded and saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* PDF Drag & Drop Zone */}
          <div>
            <label className="block text-xs font-semibold text-theme-text mb-1.5">
              Question Paper PDF File <span className="text-rose-500">*</span>
            </label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                file
                  ? 'border-emerald-500/60 bg-emerald-500/5'
                  : 'border-theme-border hover:border-teal-500/60 bg-theme-bg/60 hover:bg-teal-500/5'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />
              {file ? (
                <div className="flex items-center justify-center space-x-3 text-emerald-600 dark:text-emerald-400">
                  <FileCheck className="w-8 h-8" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-theme-text truncate max-w-xs">{file.name}</p>
                    <p className="text-[11px] text-theme-text-muted">
                      {(file.size / 1024).toFixed(1)} KB • Click or drop another to replace
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <UploadCloud className="w-8 h-8 text-teal-600 dark:text-teal-400 mx-auto" />
                  <p className="text-xs font-semibold text-theme-text">
                    Drag & drop your question paper PDF here, or <span className="text-teal-600 dark:text-teal-400 underline">browse</span>
                  </p>
                  <p className="text-[11px] text-theme-text-muted">Supports official university question paper PDFs up to 25 MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Department Selection */}
          <div>
            <label className="block text-xs font-semibold text-theme-text mb-1.5">
              Department of Engineering <span className="text-rose-500">*</span>
            </label>
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-xs font-medium focus:outline-none focus:border-teal-500"
            >
              {DEPARTMENTS.map((dept, index) => (
                <option key={dept.id} value={dept.id}>
                  {index + 1}. {dept.name} ({dept.shortCode})
                </option>
              ))}
            </select>
          </div>

          {/* Subject Title */}
          <div>
            <label className="block text-xs font-semibold text-theme-text mb-1.5">
              Subject Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Data Structures and Algorithms"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-xs focus:outline-none focus:border-teal-500"
            />
            {/* Subject Quick Suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {commonSubjects.slice(0, 4).map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setTitle(sub)}
                  className="px-2 py-0.5 rounded-lg bg-theme-surface-elevated border border-theme-border text-[10px] text-theme-text-muted hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/40 transition-colors"
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of details: Subject Code, Year, Semester */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-theme-text mb-1.5">
                Subject Code
              </label>
              <input
                type="text"
                placeholder="e.g. 210242"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-xs focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-theme-text mb-1.5">
                Exam Session / Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-xs focus:outline-none focus:border-teal-500"
              >
                <option value="NOV/DEC 2024">NOV/DEC 2024</option>
                <option value="MAY/JUNE 2024">MAY/JUNE 2024</option>
                <option value="NOV/DEC 2023">NOV/DEC 2023</option>
                <option value="MAY/JUNE 2023">MAY/JUNE 2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-theme-text mb-1.5">
                Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-xs focus:outline-none focus:border-teal-500"
              >
                <option value="Semester 3 (SE)">Semester 3 (SE)</option>
                <option value="Semester 4 (SE)">Semester 4 (SE)</option>
                <option value="Semester 5 (TE)">Semester 5 (TE)</option>
                <option value="Semester 6 (TE)">Semester 6 (TE)</option>
                <option value="Semester 7 (BE)">Semester 7 (BE)</option>
                <option value="Semester 8 (BE)">Semester 8 (BE)</option>
              </select>
            </div>
          </div>

          {/* Exam Type, Total Marks & Pattern */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-theme-text mb-1.5">
                Exam Type
              </label>
              <select
                value={examType}
                onChange={(e) => {
                  const val = e.target.value as 'In-Sem' | 'End-Sem' | 'Prelim' | 'Unit Test';
                  setExamType(val);
                  if (val === 'In-Sem') setMarks(30);
                  if (val === 'End-Sem') setMarks(70);
                }}
                className="w-full px-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-xs focus:outline-none focus:border-teal-500"
              >
                <option value="End-Sem">End-Semester Exam (Final)</option>
                <option value="In-Sem">In-Semester Exam</option>
                <option value="Prelim">Prelim Exam</option>
                <option value="Unit Test">Unit Test</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-theme-text mb-1.5">
                Total Marks
              </label>
              <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-xs focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-theme-text mb-1.5">
                Course Pattern
              </label>
              <select
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-xs focus:outline-none focus:border-teal-500"
              >
                <option value="2019 / 2024 Credit Pattern">2019 / 2024 Credit Pattern</option>
                <option value="2019 Course Pattern">2019 Course Pattern</option>
                <option value="2015 Course Pattern">2015 Course Pattern</option>
                <option value="Autonomous Curriculum">Autonomous Curriculum</option>
              </select>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-theme-border">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-theme-border bg-theme-surface-elevated hover:bg-theme-surface-hover text-theme-text text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !file}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-teal-500/25 flex items-center space-x-2 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving to Department...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Question Paper</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
