import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { ThemeProvider } from './context/ThemeContext';
import { LogIn, X, ArrowRight } from 'lucide-react';

// Eager load primary entry pages for instant first paint
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

// Lazy load secondary heavy pages for scalability, faster loading & smaller memory footprint
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage').then(m => ({ default: m.RoadmapPage })));
const TopicLearningPage = lazy(() => import('./pages/TopicLearningPage').then(m => ({ default: m.TopicLearningPage })));
const ProblemPracticePage = lazy(() => import('./pages/ProblemPracticePage').then(m => ({ default: m.ProblemPracticePage })));
const WeaknessAnalysisPage = lazy(() => import('./pages/WeaknessAnalysisPage').then(m => ({ default: m.WeaknessAnalysisPage })));
const RecommendationsPage = lazy(() => import('./pages/RecommendationsPage').then(m => ({ default: m.RecommendationsPage })));
const MistakeJournalPage = lazy(() => import('./pages/MistakeJournalPage').then(m => ({ default: m.MistakeJournalPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const ChallengesPage = lazy(() => import('./pages/ChallengesPage').then(m => ({ default: m.ChallengesPage })));
const CommunityPage = lazy(() => import('./pages/CommunityPage').then(m => ({ default: m.CommunityPage })));
const PYQsPage = lazy(() => import('./pages/PYQsPage').then(m => ({ default: m.PYQsPage })));

// Scroll to Top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ─── Loading Skeleton / Fallback ──────────────────────────────────────────────
const PageLoadingFallback: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
    <div className="relative">
      <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 animate-pulse flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
    <div className="text-center space-y-1">
      <p className="text-sm font-semibold text-theme-text">Loading DSAverse...</p>
      <p className="text-xs text-theme-text-muted">Preparing learning modules & algorithms</p>
    </div>
  </div>
);

// ─── Auth Gate Modal ───────────────────────────────────────────────────────────
// Shown when an unauthenticated user tries to access a protected page.
const AuthGateModal: React.FC<{ onClose: () => void; onContinueGuest: () => void }> = ({
  onClose,
  onContinueGuest,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div className="w-full max-w-sm bg-theme-card border border-teal-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl glass-panel relative animate-in fade-in zoom-in-95 duration-200">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-lg text-theme-text-muted hover:bg-theme-surface-hover transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/30">
          <LogIn className="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-theme-text">Welcome to DSAverse</h3>
          <p className="text-xs text-theme-text-muted mt-1 leading-relaxed">
            Sign in to sync your progress, track your streak, and view AI recommendations, or explore freely in demo mode.
          </p>
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <Link
            to="/login"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-theme-border bg-theme-surface-elevated hover:bg-theme-surface-hover text-theme-text text-xs font-semibold transition-all flex items-center justify-center"
          >
            Create Free Account
          </Link>
          <button
            onClick={onContinueGuest}
            className="w-full py-2 text-xs font-medium text-teal-600 dark:text-teal-400 hover:underline flex items-center justify-center gap-1 mt-1"
          >
            <span>Continue as Guest</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── Protected Route Wrapper ───────────────────────────────────────────────────
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [guestBypass, setGuestBypass] = useState(false);

  useEffect(() => {
    if (!loading && !user && !guestBypass) {
      setShowModal(true);
    }
  }, [loading, user, guestBypass]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-bg">
        <div className="w-10 h-10 rounded-full border-4 border-teal-500/30 border-t-teal-500 animate-spin" />
      </div>
    );
  }

  if (!user && !guestBypass) {
    return (
      <>
        {/* Render page dimly behind modal so it doesn't flash */}
        <div className="pointer-events-none opacity-40 select-none">{children}</div>
        {showModal && (
          <AuthGateModal
            onClose={() => setShowModal(false)}
            onContinueGuest={() => {
              setGuestBypass(true);
              setShowModal(false);
            }}
          />
        )}
      </>
    );
  }

  return <>{children}</>;
};

// ─── Main App Layout ──────────────────────────────────────────────────────────
export const AppContent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-theme-bg text-theme-text selection:bg-teal-500/30 selection:text-teal-900 dark:selection:text-white transition-colors duration-200">
      <ScrollToTop />

      {!isAuthPage && !isLandingPage && (
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} onSignOut={signOut} />
      )}

      <main className="flex-1">
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected/Interactive routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
            <Route path="/learn" element={<ProtectedRoute><TopicLearningPage /></ProtectedRoute>} />
            <Route path="/learn/:topicId" element={<ProtectedRoute><TopicLearningPage /></ProtectedRoute>} />
            <Route path="/practice" element={<ProtectedRoute><ProblemPracticePage /></ProtectedRoute>} />
            <Route path="/editor" element={<Navigate to="/practice" replace />} />
            <Route path="/editor/:problemId" element={<Navigate to="/practice" replace />} />
            <Route path="/analytics" element={<ProtectedRoute><WeaknessAnalysisPage /></ProtectedRoute>} />
            <Route path="/recommendations" element={<ProtectedRoute><RecommendationsPage /></ProtectedRoute>} />
            <Route path="/journal" element={<ProtectedRoute><MistakeJournalPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/challenges" element={<ProtectedRoute><ChallengesPage /></ProtectedRoute>} />
            <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
            <Route path="/pyqs" element={<ProtectedRoute><PYQsPage /></ProtectedRoute>} />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {!isAuthPage && !isLandingPage && <Footer />}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <ProgressProvider>
              <AppContent />
            </ProgressProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
