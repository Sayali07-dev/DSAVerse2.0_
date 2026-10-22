export interface QuestionPaper {
  id: string;
  departmentId: string;
  title: string;
  subjectCode: string;
  year: string;
  semester: string;
  examType: 'In-Sem' | 'End-Sem' | 'Prelim' | 'Unit Test';
  pattern: string;
  marks: number;
  duration: string;
  pdfUrl: string;
  isCustomUpload?: boolean;
  uploadedAt?: string;
  fileSize?: string;
  isGivenSample?: boolean;
  questionHighlights?: {
    questionNumber: string;
    subQuestions: string[];
    marks: number;
    relatedTopicSlug?: string;
  }[];
}

export interface Department {
  id: string;
  name: string;
  shortCode: string;
  description: string;
  accentColor: string;
  gradient: string;
  borderColor: string;
  badgeColor: string;
  iconName: string;
  availableSemesters: string[];
  defaultPapers: QuestionPaper[];
}

export const DEPARTMENTS: Department[] = [
  {
    id: 'computer-engineering',
    name: 'Computer Engineering',
    shortCode: 'COMP',
    description: 'Computer Engineering',
    accentColor: '#0D9488',
    gradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
    borderColor: 'border-teal-500/30 hover:border-teal-400',
    badgeColor: 'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30',
    iconName: 'Laptop',
    availableSemesters: ['Semester 3'],
    defaultPapers: [
      {
<<<<<<< HEAD
        id: 'pict-aids-ds-insem-2026',
        departmentId: 'computer-engineering',
        title: 'AIDS',
        subjectCode: '2643PC12',
        year: 'AUG-OCT 2026',
        semester: 'S.Y. B.Tech (AI&DS) SEM-III',
        examType: 'In-Sem',
        pattern: 'Autonomous Pattern',
        marks: 20,
        duration: '1 Hour',
        pdfUrl: '/assets/aistudio/AIDS_DS_c766eaf0.pdf',
        isGivenSample: true,
        fileSize: '2.3 MB',
      },
      {
        id: 'pict-ce-ds-insem-2025',
        departmentId: 'computer-engineering',
        title: 'CE',
=======
        id: 'pict-ce-ds-insem-2025',
        departmentId: 'computer-engineering',
        title: 'Data Structures (1303101) - PICT In-Sem Exam',
>>>>>>> ecbfa17 (DSAverse)
        subjectCode: '1303101',
        year: 'OCT-2025',
        semester: 'S.Y. B.Tech (CE) SEM-III',
        examType: 'In-Sem',
        pattern: '2024 PATTERN',
        marks: 20,
        duration: '1 Hour',
        pdfUrl: '/assets/aistudio/CE_DS_465d5ab0.pdf',
        isGivenSample: true,
        fileSize: '36 KB',
      },
      {
        id: 'pict-ete-dsa-insem-2025',
        departmentId: 'computer-engineering',
<<<<<<< HEAD
        title: 'ETE',
=======
        title: 'Data Structures and Algorithms (0305161) - PICT In-Sem Exam',
>>>>>>> ecbfa17 (DSAverse)
        subjectCode: '0305161',
        year: 'OCT-2025',
        semester: 'S.Y. B.Tech (ETE) SEM-III',
        examType: 'In-Sem',
        pattern: '2024 PATTERN',
        marks: 20,
        duration: '1 Hour',
        pdfUrl: '/assets/aistudio/ETE_DS_34606da9.pdf',
        isGivenSample: true,
        fileSize: '41 KB',
      },
      {
<<<<<<< HEAD
        id: 'pict-entc-dsa-insem-2026',
        departmentId: 'computer-engineering',
        title: 'E&TCE',
=======
        id: 'pict-aids-ds-insem-2026',
        departmentId: 'computer-engineering',
        title: 'Data Structures (2643PC12) - PICT In-Sem Exam',
        subjectCode: '2643PC12',
        year: 'AUG-OCT 2026',
        semester: 'S.Y. B.Tech (AI&DS) SEM-III',
        examType: 'In-Sem',
        pattern: 'Autonomous Pattern',
        marks: 20,
        duration: '1 Hour',
        pdfUrl: '/assets/aistudio/AIDS_DS_c766eaf0.pdf',
        isGivenSample: true,
        fileSize: '2.3 MB',
      },
      {
        id: 'pict-entc-dsa-insem-2026',
        departmentId: 'computer-engineering',
        title: 'Data Structures and Algorithms (2603MD16) - PICT In-Sem Exam',
>>>>>>> ecbfa17 (DSAverse)
        subjectCode: '2603MD16',
        year: 'AUG-OCT 2026',
        semester: 'S.Y. B.Tech (E&TCE) SEM-III',
        examType: 'In-Sem',
        pattern: 'Autonomous Pattern',
        marks: 20,
        duration: '1 Hour',
        pdfUrl: '/assets/aistudio/ENTC_DS_c0db50eb.pdf',
        isGivenSample: true,
        fileSize: '2.5 MB',
      }
    ]
  },
  {
    id: 'informational-technology',
    name: 'Informational Technology',
    shortCode: 'IT',
    description: 'Informational Technology',
    accentColor: '#3B82F6',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    borderColor: 'border-blue-500/30 hover:border-blue-400',
    badgeColor: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30',
    iconName: 'Server',
    availableSemesters: ['Semester 3'],
    defaultPapers: [
      {
        id: 'it-insem-ds-2025',
        departmentId: 'informational-technology',
<<<<<<< HEAD
        title: 'CE',
=======
        title: 'Data Structures (1303101) - PICT In-Sem Exam',
>>>>>>> ecbfa17 (DSAverse)
        subjectCode: '1303101',
        year: 'OCT-2025',
        semester: 'S.Y. B.Tech (SEM-III)',
        examType: 'In-Sem',
        pattern: '2024 PATTERN',
        marks: 20,
        duration: '1 Hour',
        pdfUrl: '/assets/aistudio/CE_DS_465d5ab0.pdf',
        isGivenSample: true,
        fileSize: '36 KB',
      }
    ]
  },
  {
    id: 'artificial-intelligence-and-data-science',
    name: 'Artificial Intelligence and Data Science',
    shortCode: 'AI&DS',
    description: 'Artificial Intelligence and Data Science',
    accentColor: '#8B5CF6',
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
    borderColor: 'border-purple-500/30 hover:border-purple-400',
    badgeColor: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30',
    iconName: 'Brain',
    availableSemesters: ['Semester 3'],
    defaultPapers: [
      {
        id: 'aids-insem-ds-2026',
        departmentId: 'artificial-intelligence-and-data-science',
<<<<<<< HEAD
        title: 'AIDS',
=======
        title: 'Data Structures (2643PC12) - PICT In-Sem Exam',
>>>>>>> ecbfa17 (DSAverse)
        subjectCode: '2643PC12',
        year: 'AUG-OCT 2026',
        semester: 'S.Y. B.Tech (AI&DS) SEM-III',
        examType: 'In-Sem',
        pattern: 'PICT Autonomous',
        marks: 20,
        duration: '1 Hour',
        pdfUrl: '/assets/aistudio/AIDS_DS_c766eaf0.pdf',
        isGivenSample: true,
        fileSize: '2.3 MB',
      }
    ]
  },
  {
    id: 'electronics-and-telecommunication-engineering',
    name: 'Electronics and Telecommmunication Engineering',
    shortCode: 'E&TC',
    description: 'Electronics and Telecommunication Engineering',
    accentColor: '#F59E0B',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderColor: 'border-amber-500/30 hover:border-amber-400',
    badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    iconName: 'Radio',
    availableSemesters: ['Semester 3'],
    defaultPapers: [
      {
        id: 'entc-insem-dsa-2026',
        departmentId: 'electronics-and-telecommunication-engineering',
<<<<<<< HEAD
        title: 'E&TCE',
=======
        title: 'Data Structures and Algorithms (2603MD16) - PICT In-Sem Exam',
>>>>>>> ecbfa17 (DSAverse)
        subjectCode: '2603MD16 / 0305161',
        year: 'AUG-OCT 2026',
        semester: 'S.Y. B.Tech (E&TCE) SEM-III',
        examType: 'In-Sem',
        pattern: 'PICT Autonomous',
        marks: 20,
        duration: '1 Hour',
        pdfUrl: '/assets/aistudio/ENTC_DS_c0db50eb.pdf',
        isGivenSample: true,
        fileSize: '2.5 MB',
      }
    ]
  },
  {
    id: 'electronics-and-computer-engineering',
    name: 'Electronics and Computer Engineering',
    shortCode: 'E&CE',
    description: 'Electronics and Computer Engineering',
    accentColor: '#EC4899',
    gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    borderColor: 'border-pink-500/30 hover:border-pink-400',
    badgeColor: 'bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30',
    iconName: 'Cpu',
    availableSemesters: ['Semester 3'],
    defaultPapers: [
      {
        id: 'ece-insem-dsa-2025',
        departmentId: 'electronics-and-computer-engineering',
<<<<<<< HEAD
        title: 'ETE',
=======
        title: 'Data Structures and Algorithms (0305161) - PICT In-Sem Exam',
>>>>>>> ecbfa17 (DSAverse)
        subjectCode: '0305161',
        year: 'OCT-2025',
        semester: 'S.Y. B.Tech (ETE) SEM-III',
        examType: 'In-Sem',
        pattern: '2024 PATTERN',
        marks: 20,
        duration: '1 Hour',
        pdfUrl: '/assets/aistudio/ETE_DS_34606da9.pdf',
        isGivenSample: true,
        fileSize: '41 KB',
      }
    ]
  }
];
