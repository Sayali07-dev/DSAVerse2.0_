import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface UserProfileData {
  displayName: string;
  avatarUrl: string | null;
  email: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile: UserProfileData | null;
  signUp: (email: string, password: string, fullName: string, level: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  const resolveUserProfile = (u: User | null): UserProfileData | null => {
    if (!u) return null;
    
    // Resolve display name
    let displayName = 'Student';
    const metadata = u.user_metadata || {};
    
    if (metadata.full_name) {
      displayName = metadata.full_name;
    } else if (metadata.name) {
      displayName = metadata.name;
    } else if (u.email) {
      displayName = u.email.split('@')[0];
    }
    
    // Resolve avatar
    let avatarUrl = null;
    if (metadata.avatar_url) {
      avatarUrl = metadata.avatar_url;
    } else if (metadata.picture) {
      avatarUrl = metadata.picture;
    }

    return {
      displayName,
      avatarUrl,
      email: u.email || ''
    };
  };

  useEffect(() => {
    let isMounted = true;
    
    // Safety fallback: ensure loading never hangs if remote auth provider is unreachable
    const safetyTimeout = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
      }
    }, 1500);

    // Get initial session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!isMounted) return;
        clearTimeout(safetyTimeout);
        setSession(session);
        setUser(session?.user ?? null);
        setUserProfile(resolveUserProfile(session?.user ?? null));
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Initial session resolution error, falling back:', err);
        if (isMounted) {
          clearTimeout(safetyTimeout);
          setLoading(false);
        }
      });

    // Listen for auth changes
    let subscription: { unsubscribe: () => void } | null = null;
    try {
      const res = supabase.auth.onAuthStateChange((_event, session) => {
        if (!isMounted) return;
        setSession(session);
        setUser(session?.user ?? null);
        setUserProfile(resolveUserProfile(session?.user ?? null));
        setLoading(false);
      });
      subscription = res?.data?.subscription ?? null;
    } catch (err) {
      console.warn('onAuthStateChange listener error:', err);
    }

    return () => {
      isMounted = false;
      clearTimeout(safetyTimeout);
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string, level: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, level },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      return { error: error?.message ?? null };
    } catch (err: any) {
      return { error: err.message || 'An unexpected error occurred during sign up' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      if (!data.session) return { error: 'Please verify your email address before logging in.' };
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'An unexpected error occurred during sign in' };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      return { error: error?.message ?? null };
    } catch (err: any) {
      return { error: err.message || 'An unexpected error occurred during Google sign in' };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, userProfile, signUp, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

