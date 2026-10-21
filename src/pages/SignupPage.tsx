import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, name, 'Beginner');
    setLoading(false);

    if (error) {
      setError(error);
    } else {
      // Supabase sends a confirmation email by default.
      // If email confirmation is disabled in Supabase dashboard, user is logged in immediately.
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    setGoogleLoading(true);
    const { error } = await signInWithGoogle();
    setGoogleLoading(false);
    if (error) setError(error);
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden bg-grid-pattern">

      {/* Background Orb */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-teal-600/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>

      {/* Brand Logo */}
      <Link to="/" className="flex items-center space-x-2.5 mb-8 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-600/30 group-hover:scale-105 transition-transform">
          <Code2 className="w-5 h-5 text-white" />
        </div>
        <span className="text-2xl font-black tracking-tight text-theme-text">
          DSA<span className="text-gradient-teal">verse</span>
        </span>
      </Link>

      {/* Auth Box */}
      <div className="w-full max-w-lg bg-theme-card/90 border border-teal-500/30 rounded-3xl p-8 shadow-2xl glass-panel relative">

        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-theme-text">Create Student Account</h2>
          <p className="text-xs text-theme-text-muted mt-1">Start mastering C++ Data Structures &amp; Algorithms</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Account created!</p>
              <p className="text-xs text-theme-text-muted mt-0.5">Check your email to confirm your account, then you'll be redirected.</p>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={googleLoading || loading || success}
          className="w-full mb-4 py-2.5 rounded-xl border border-theme-border bg-theme-surface-elevated hover:bg-theme-surface-hover text-theme-text text-xs font-semibold transition-all flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {/* Google logo SVG */}
          <svg className="w-4 h-4" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.86l6.1-6.1C34.46 3.14 29.52 1 24 1 14.82 1 7.07 6.48 3.6 14.23l7.1 5.52C12.37 13.31 17.72 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.57-.14-3.1-.4-4.5H24v8.5h12.7c-.55 2.9-2.2 5.35-4.67 7l7.1 5.52C43.18 37.1 46.5 31.28 46.5 24.5z"/>
            <path fill="#FBBC05" d="M10.7 28.25A14.6 14.6 0 0 1 9.5 24c0-1.48.25-2.9.7-4.25l-7.1-5.52A23.46 23.46 0 0 0 .5 24c0 3.77.9 7.34 2.5 10.48l7.7-6.23z"/>
            <path fill="#34A853" d="M24 47c5.52 0 10.16-1.83 13.55-4.98l-7.1-5.52C28.6 38.3 26.4 39 24 39c-6.28 0-11.63-3.81-13.3-9.25l-7.7 6.23C6.57 43.36 14.6 47 24 47z"/>
          </svg>
          <span>{googleLoading ? 'Redirecting to Google...' : 'Continue with Google'}</span>
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-1 h-px bg-theme-border"></div>
          <span className="text-xs text-theme-text-muted font-medium">or sign up with email</span>
          <div className="flex-1 h-px bg-theme-border"></div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">

          <div>
            <label className="block text-xs font-semibold text-theme-text-muted mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-theme-text-muted absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-theme-card border border-theme-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-colors"
                placeholder="Prisha Sharma"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-theme-text-muted mb-1.5">College Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-theme-text-muted absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-theme-card border border-theme-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-colors"
                placeholder="student@college.edu"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-theme-text-muted mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-theme-text-muted absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-theme-card border border-theme-border rounded-xl pl-10 pr-3 py-2.5 text-xs text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-colors"
                  placeholder="Min 6 chars"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-theme-text-muted mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-theme-text-muted absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-theme-card border border-theme-border rounded-xl pl-10 pr-3 py-2.5 text-xs text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading || success}
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Creating account...</span>
            ) : (
              <>
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        <div className="mt-6 pt-6 border-t border-theme-border/80 text-center text-xs text-theme-text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
            Log In Here
          </Link>
        </div>

      </div>
    </div>
  );
};
