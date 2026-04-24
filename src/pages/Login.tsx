import React, { useState } from 'react';
import { supabase, isConfigured } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Lock, ShieldCheck, Github } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const loadingRef = React.useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConfigured) {
      setError('Supabase connection is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the environment.');
      return;
    }

    setLoading(true);
    loadingRef.current = true;
    setError(null);

    const timeout = setTimeout(() => {
      if (loadingRef.current) {
        setLoading(false);
        loadingRef.current = false;
        setError('Request timed out. Please check your Supabase URL and network connection.');
      }
    }, 15000);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        clearTimeout(timeout);
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        clearTimeout(timeout);
        if (error) throw error;
        
        // No immediate navigate. AuthContext will detect session, 
        // fetch profile, and set role. App.tsx or Dashboard will handle 
        // state transitions smoothly.
        navigate('/dashboard');
      }
    } catch (err: any) {
      clearTimeout(timeout);
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050508] relative px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="bg-mesh opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-indigo/10 blur-[120px] rounded-full" />
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-brand-purple/5 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-brand-indigo to-brand-purple rounded-xl flex items-center justify-center font-display font-bold text-white shadow-xl shadow-brand-indigo/20 group-hover:scale-110 transition-transform">
              PI
            </div>
            <span className="font-display font-bold text-2xl tracking-tight uppercase text-white">Parity</span>
          </Link>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            {isSignUp ? 'Join the Legacy' : 'Welcome Back'}
          </h1>
          <p className="text-slate-500">
            {isSignUp ? 'Create your athlete profile today' : 'Enter your credentials to access the platform'}
          </p>
        </div>

        <div className="bg-white/[0.02] border border-white/5 backdrop-blur-2xl rounded-[40px] p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-indigo transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-indigo transition-all placeholder:text-slate-700"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-indigo transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-indigo transition-all placeholder:text-slate-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-xl flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-brand-indigo text-white font-bold text-lg flex items-center justify-center gap-2 shadow-2xl shadow-brand-indigo/20 hover:bg-brand-indigo/90 transition-all group disabled:opacity-50"
            >
              {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-grow bg-white/5" />
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Security Verified</span>
            <div className="h-px flex-grow bg-white/5" />
          </div>

          <div className="mt-8 flex flex-col gap-4">
             <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-slate-300 font-bold text-sm hover:bg-white/10 transition-all"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Join Legacy"}
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] font-bold text-slate-700 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-brand-emerald" />
          End-to-end encrypted authentication
        </p>
      </motion.div>
    </div>
  );
}
