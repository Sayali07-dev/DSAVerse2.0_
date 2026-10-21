import { createClient, type Session, type SupabaseClient, type User } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

type AuthListener = (event: string, session: Session | null) => void;

function createMockSupabaseClient(): SupabaseClient {
  const STORAGE_KEY = 'dsaverse_mock_session';
  const listeners = new Set<AuthListener>();

  const buildMockSession = (email: string, fullName = 'Prisha Sharma', level = 'Intermediate'): Session => {
    const user: User = {
      id: 'mock-user-id',
      app_metadata: {},
      user_metadata: { full_name: fullName, level },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      email,
    };
    return {
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
      expires_in: 3600,
      token_type: 'bearer',
      user,
    };
  };

  let currentSession: Session | null = null;
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        currentSession = JSON.parse(saved);
      } else {
        // Default demo session so protected routes work out of the box when Supabase is not configured
        currentSession = buildMockSession('prisha@pict.edu', 'Prisha Sharma', 'Intermediate');
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(currentSession));
        } catch {
          // ignore storage error
        }
      }
    } catch {
      currentSession = buildMockSession('prisha@pict.edu', 'Prisha Sharma', 'Intermediate');
    }
  }

  const notify = (event: string, session: Session | null) => {
    listeners.forEach((cb) => cb(event, session));
  };

  const mockAuth = {
    getSession: async () => ({
      data: { session: currentSession },
      error: null,
    }),
    onAuthStateChange: (callback: AuthListener) => {
      listeners.add(callback);
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              listeners.delete(callback);
            },
          },
        },
      };
    },
    signUp: async ({
      email,
      options,
    }: {
      email: string;
      password?: string;
      options?: { data?: { full_name?: string; level?: string } };
    }) => {
      currentSession = buildMockSession(
        email,
        options?.data?.full_name || email.split('@')[0] || 'Student',
        options?.data?.level || 'Intermediate'
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentSession));
      }
      notify('SIGNED_IN', currentSession);
      return { data: { user: currentSession.user, session: currentSession }, error: null };
    },
    signInWithPassword: async ({ email }: { email: string; password?: string }) => {
      currentSession = buildMockSession(email, email.split('@')[0] || 'Student', 'Intermediate');
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentSession));
      }
      notify('SIGNED_IN', currentSession);
      return { data: { user: currentSession.user, session: currentSession }, error: null };
    },
    signInWithOAuth: async () => {
      currentSession = buildMockSession('student@pict.edu', 'Prisha Sharma', 'Intermediate');
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentSession));
      }
      notify('SIGNED_IN', currentSession);
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard';
      }
      return { data: { provider: 'google', url: '/dashboard' }, error: null };
    },
    signOut: async () => {
      currentSession = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
      notify('SIGNED_OUT', null);
      return { error: null };
    },
    resetPasswordForEmail: async () => ({ data: {}, error: null }),
  };

  return { auth: mockAuth } as unknown as SupabaseClient;
}

const isValidSupabaseConfig = (url?: string, key?: string): boolean => {
  if (!url || !key || typeof url !== 'string' || typeof key !== 'string') return false;
  const trimmedUrl = url.trim();
  const trimmedKey = key.trim();
  if (trimmedKey.length < 20 || trimmedKey.includes('placeholder')) return false;
  try {
    const parsed = new URL(trimmedUrl);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') && !trimmedUrl.includes('placeholder');
  } catch {
    return false;
  }
};

export const supabase: SupabaseClient =
  isValidSupabaseConfig(supabaseUrl, supabaseAnonKey)
    ? createClient(supabaseUrl!.trim(), supabaseAnonKey!.trim())
    : createMockSupabaseClient();
