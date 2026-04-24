import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  role: 'admin' | 'user' | null;
  profile: any | null;
  loading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  user: null,
  session: null,
  role: null,
  profile: null,
  loading: true,
  error: null,
  refreshProfile: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      console.log(`[Auth] Fetching profile: ${userId}`);
      
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          console.log('[Auth] Profile missing, creating default...');
          const { data: { user: authUser } } = await supabase.auth.getUser();
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .upsert({ 
              id: userId, 
              email: authUser?.email || '',
              role: 'user',
              is_subscribed: false
            }, { onConflict: 'id' })
            .select()
            .single();

          if (createError) throw createError;
          setProfile(newProfile);
          setRole('user');
        } else {
          throw fetchError;
        }
      } else {
        const userRole = (data.role?.toLowerCase() || 'user') as 'admin' | 'user';
        console.log(`[Auth] Profile synced. ID: ${userId}, Role: ${userRole}`);
        setProfile(data);
        setRole(userRole);
      }
      setError(null);
    } catch (err: any) {
      console.error('[Auth] Profile error:', err.message);
      setError(err.message);
    }
  }, []);

  const handleAuthStateChange = useCallback(async (currentSession: Session | null) => {
    setLoading(true);
    setSession(currentSession);
    const currentUser = currentSession?.user || null;
    setUser(currentUser);

    if (currentUser) {
      await fetchProfile(currentUser.id);
    } else {
      setProfile(null);
      setRole(null);
    }
    setLoading(false);
  }, [fetchProfile]);

  useEffect(() => {
    let mounted = true;

    // Safety timeout to prevent infinite loading if Supabase hangs
    const timeoutId = setTimeout(() => {
      if (mounted) {
        console.warn('[Auth] Initialization timed out (5s)');
        setLoading(false);
      }
    }, 5000);

    const init = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      if (mounted) {
        await handleAuthStateChange(initialSession);
        clearTimeout(timeoutId);
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      console.log(`[Auth] Event: ${_event}`);
      if (mounted) handleAuthStateChange(newSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [handleAuthStateChange]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      role, 
      profile, 
      loading, 
      error, 
      refreshProfile: () => user ? fetchProfile(user.id) : Promise.resolve(),
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useUser = () => {
  const { user, role, loading, error } = useAuth();
  return { user, role, loading, error };
};

