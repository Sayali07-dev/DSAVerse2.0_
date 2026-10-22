import { DEPARTMENTS } from '../data/departmentsData';
import type { QuestionPaper } from '../data/departmentsData';

const DB_NAME = 'DSAverse_PYQ_Database';
const DB_VERSION = 1;
const STORE_NAME = 'pyq_files';
const METADATA_KEY = 'dsaverse_uploaded_pyqs_metadata';

// Initialize IndexedDB for storing PDF Blobs
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Save Blob to IndexedDB
async function saveBlobToDB(id: string, blob: Blob): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put({ id, blob });
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// Get Blob from IndexedDB
async function getBlobFromDB(id: string): Promise<Blob | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => {
        resolve(req.result ? req.result.blob : null);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.error('Error fetching blob from IndexedDB', e);
    return null;
  }
}

// Delete Blob from IndexedDB
async function deleteBlobFromDB(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.error('Error deleting blob from IndexedDB', e);
  }
}

// Metadata stored in localStorage
function getUploadedMetadata(): QuestionPaper[] {
  try {
    const raw = localStorage.getItem(METADATA_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Filter out obsolete entries pointing to /pyqs/
    return parsed.filter((p: QuestionPaper) => p.pdfUrl && !p.pdfUrl.includes('/pyqs/'));
  } catch {
    return [];
  }
}

function saveUploadedMetadata(papers: QuestionPaper[]): void {
  try {
    localStorage.setItem(METADATA_KEY, JSON.stringify(papers));
  } catch (e) {
    console.warn('Could not save metadata to localStorage', e);
  }
}

// Active Object URLs in memory for preview
const activeBlobUrls = new Map<string, string>();

/**
 * Get all papers for a department (combining default curriculum papers and user-uploaded ones)
 */
export async function getPapersForDepartment(departmentId: string): Promise<QuestionPaper[]> {
  const dept = DEPARTMENTS.find((d) => d.id === departmentId);
  const defaultPapers = dept ? dept.defaultPapers : [];
  const uploaded = getUploadedMetadata().filter((p) => p.departmentId === departmentId);

  // Link uploaded papers with blob URLs if available
  const hydratedUploaded: QuestionPaper[] = await Promise.all(
    uploaded.map(async (p) => {
      if (!activeBlobUrls.has(p.id)) {
        const blob = await getBlobFromDB(p.id);
        if (blob) {
          const url = URL.createObjectURL(blob);
          activeBlobUrls.set(p.id, url);
          return { ...p, pdfUrl: url };
        }
      } else {
        return { ...p, pdfUrl: activeBlobUrls.get(p.id)! };
      }
      return p;
    })
  );

<<<<<<< HEAD
  // Filter out any uploaded duplicates that conflict with default papers
  const defaultTitles = new Set(defaultPapers.map((p) => p.title.trim().toLowerCase()));
  const defaultSubjectCodes = new Set(defaultPapers.map((p) => p.subjectCode.trim().toLowerCase()));
  const defaultUrls = new Set(defaultPapers.map((p) => p.pdfUrl.trim()));

  const uniqueUploaded = hydratedUploaded.filter((p) => {
    const titleNorm = p.title.trim().toLowerCase();
    const codeNorm = p.subjectCode.trim().toLowerCase();
    if (defaultTitles.has(titleNorm)) return false;
    if (defaultSubjectCodes.has(codeNorm)) return false;
    if (defaultUrls.has(p.pdfUrl.trim())) return false;
    return true;
  });

  return [...defaultPapers, ...uniqueUploaded];
=======
  return [...hydratedUploaded, ...defaultPapers];
>>>>>>> ecbfa17 (DSAverse)
}

/**
 * Get total papers count for each department
 */
export function getDepartmentPaperCounts(): Record<string, number> {
  const uploaded = getUploadedMetadata();
  const counts: Record<string, number> = {};

  for (const dept of DEPARTMENTS) {
    const uploadedCount = uploaded.filter((p) => p.departmentId === dept.id).length;
    counts[dept.id] = dept.defaultPapers.length + uploadedCount;
  }

  return counts;
}

/**
 * Upload and save a new PDF question paper
 */
export async function uploadQuestionPaper(params: {
  departmentId: string;
  file: File;
  title: string;
  subjectCode: string;
  year: string;
  semester: string;
  examType: 'In-Sem' | 'End-Sem' | 'Prelim' | 'Unit Test';
  pattern: string;
  marks: number;
}): Promise<QuestionPaper> {
  const id = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const blob = new Blob([await params.file.arrayBuffer()], { type: 'application/pdf' });
  
  // Save in IndexedDB
  await saveBlobToDB(id, blob);

  const previewUrl = URL.createObjectURL(blob);
  activeBlobUrls.set(id, previewUrl);

  const sizeKb = (params.file.size / 1024).toFixed(1);
  const fileSize = `${sizeKb} KB`;

  const newPaper: QuestionPaper = {
    id,
    departmentId: params.departmentId,
    title: params.title.trim() || params.file.name.replace(/\.[^/.]+$/, ''),
    subjectCode: params.subjectCode.trim() || 'ENG-PYQ',
    year: params.year || '2024',
    semester: params.semester || 'Semester 3 (SE)',
    examType: params.examType,
    pattern: params.pattern || 'Course Pattern 2024',
    marks: params.marks || 70,
    duration: params.examType === 'In-Sem' ? '1 Hour' : '2.5 Hours',
    pdfUrl: previewUrl,
    isCustomUpload: true,
    uploadedAt: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
    fileSize,
  };

  const current = getUploadedMetadata();
  saveUploadedMetadata([newPaper, ...current]);

  return newPaper;
}

/**
 * Delete a user-uploaded question paper
 */
export async function deleteUploadedPaper(paperId: string): Promise<void> {
  await deleteBlobFromDB(paperId);
  if (activeBlobUrls.has(paperId)) {
    URL.revokeObjectURL(activeBlobUrls.get(paperId)!);
    activeBlobUrls.delete(paperId);
  }

  const current = getUploadedMetadata();
  const filtered = current.filter((p) => p.id !== paperId);
  saveUploadedMetadata(filtered);
}
