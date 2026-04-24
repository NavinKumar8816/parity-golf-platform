import React, { useState, useEffect } from 'react';
import { supabase, isConfigured } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Award, 
  Plus, 
  History, 
  LogOut, 
  User, 
  RefreshCw, 
  Trophy, 
  ArrowUpRight,
  Target,
  Sparkles,
  ClipboardList,
  ShieldCheck,
  Crown,
  CreditCard,
  Shield
} from 'lucide-react';

interface Score {
  id: string;
  score: number;
  date: string;
  created_at: string;
}

interface Draw {
  id: string;
  numbers: number[];
  matches: number;
  rank: string;
  charity_amount?: number;
  created_at: string;
  user_id?: string;
  user_email?: string;
}

interface LeaderboardItem {
  user_email: string;
  matches: number;
  rank: string;
  created_at: string;
}

interface UserProfile {
  is_subscribed: boolean;
  role?: string;
}

import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user, role, profile, loading: authLoading, refreshProfile, signOut } = useAuth();
  const [scores, setScores] = useState<Score[]>([]);
  const [latestDraw, setLatestDraw] = useState<Draw | null>(null);
  const [drawHistory, setDrawHistory] = useState<Draw[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [newScore, setNewScore] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawNumbers, setDrawNumbers] = useState<number[]>([]);
  const [matchCount, setMatchCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }
    
    if (user) {
      fetchScores(user.id);
      fetchLatestDraw(user.id);
      fetchDrawHistory(user.id);
      fetchLeaderboard();
    }
  }, [user, authLoading, navigate]);

  const handleUpgrade = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_subscribed: true })
        .eq('id', user.id);
      
      if (error) throw error;
      await refreshProfile();
      alert("🎉 Welcome to Pro! Subscription activated.");
    } catch (err) {
      alert("Payment simulation failed. Ensure 'profiles' table exists.");
    } finally {
      setLoading(false);
    }
  };

  const fetchScores = async (userId: string) => {
    const { data } = await supabase
      .from('scores')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (data) setScores(data);
  };

  const fetchDrawHistory = async (userId: string) => {
    const { data } = await supabase
      .from('draws')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (data) setDrawHistory(data);
  };

  const fetchLeaderboard = async () => {
    const { data } = await supabase
      .from('draws')
      .select('numbers, matches, rank, created_at, user_id')
      .order('matches', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (data) {
      const items = data.map(d => ({
        user_email: d.user_id ? `User_${d.user_id.slice(0, 5)}` : "Anonymous",
        matches: d.matches,
        rank: d.rank,
        created_at: d.created_at
      }));
      setLeaderboard(items);
    }
  };

  const fetchLatestDraw = async (userId: string) => {
    const { data } = await supabase
      .from('draws')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (data && data.length > 0) {
      setLatestDraw(data[0]);
      setDrawNumbers(data[0].numbers);
      setMatchCount(data[0].matches);
    }
  };

  const handleLogScore = async () => {
    if (!profile.is_subscribed) {
      alert("🚀 Upgrade Required: Please subscribe to log performance entries.");
      return;
    }

    if (!newScore || isNaN(parseInt(newScore))) return;
    const scoreVal = parseInt(newScore);
    if (scoreVal < 1 || scoreVal > 45) {
      alert('Score must be between 1 and 45');
      return;
    }

    setLoading(true);
    try {
      const dateStr = new Date().toISOString().split('T')[0];
      
      const { error } = await supabase
        .from('scores')
        .insert([{ user_id: user.id, score: scoreVal, date: dateStr }]);
      
      if (error) throw error;
      
      setNewScore('');
      fetchScores(user.id);
    } catch (err: any) {
      console.error(err);
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const runDraw = async () => {
    if (!profile.is_subscribed) {
      alert("🔒 Premium Feature: Draws are exclusively for Pro members.");
      return;
    }

    if (scores.length === 0) return;
    setIsDrawing(true);
    setDrawNumbers([]);
    setMatchCount(0);
    
    setTimeout(async () => {
      const nums = Array.from({ length: 5 }, () => Math.floor(Math.random() * 45) + 1);
      const userScoreValues = scores.map(s => s.score);
      const matches = nums.filter(num => userScoreValues.includes(num)).length;

      let calculatedRank = "3rd";
      if (matches === 5) calculatedRank = "1st";
      else if (matches >= 3) calculatedRank = "2nd";

      setDrawNumbers(nums);
      setMatchCount(matches);
      setIsDrawing(false);

      try {
        const { data, error } = await supabase
          .from('draws')
          .insert([{ 
            user_id: user.id, 
            numbers: nums, 
            matches: matches,
            rank: calculatedRank,
            charity_amount: 5
          }])
          .select()
          .single();

        if (error) {
          console.error("Supabase Schema Error:", error);
        } else if (data) {
          setLatestDraw(data);
          fetchDrawHistory(user.id);
          fetchLeaderboard();
        }
      } catch (err) {
        console.error("Unexpected error saving draw:", err);
      }
    }, 2000);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (authLoading || (user && !profile)) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center flex-col gap-4">
        <div className="w-12 h-12 border-4 border-brand-indigo/20 border-t-brand-indigo rounded-full animate-spin" />
        <p className="text-slate-500 font-mono text-xs animate-pulse">Syncing Athlete Profile...</p>
      </div>
    );
  }

  if (!user) return null;

  const performanceValue = scores.length > 0 
    ? (scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length)
    : 0;
  
  const avgPerformance = performanceValue.toFixed(1);
  
  const getRanking = (val: number) => {
    if (val > 40) return "Top 1%";
    if (val > 35) return "Top 4%";
    if (val > 30) return "Top 10%";
    if (val > 25) return "Top 25%";
    return "Top 50%";
  };

  const ranking = getRanking(performanceValue);

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans p-6 lg:p-10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="bg-mesh opacity-20 pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-indigo/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-brand-indigo to-brand-purple rounded-2xl flex items-center justify-center font-display font-bold text-lg shadow-2xl shadow-brand-indigo/30">
              PI
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold tracking-tight">Athlete Intelligence</h1>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-500">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                Live Monitoring • {user.email}
                {profile.is_subscribed && (
                  <div className="flex items-center gap-1 bg-brand-indigo/10 text-brand-indigo px-2 py-0.5 rounded-full border border-brand-indigo/20">
                    <Crown size={10} className="fill-brand-indigo" />
                    <span>Pro Member</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {role === 'admin' && (
              <button 
                onClick={() => navigate('/admin')}
                className="px-6 py-3 bg-brand-indigo/10 border border-brand-indigo/20 rounded-2xl flex items-center gap-2 hover:bg-brand-indigo hover:text-white transition-all text-xs font-bold uppercase tracking-widest text-brand-indigo"
              >
                <Shield size={16} /> Admin Panel
              </button>
            )}
            <button 
              onClick={handleSignOut}
              className="px-6 py-3 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-2 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-500 transition-all text-xs font-bold uppercase tracking-widest"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[32px] flex flex-col gap-4 backdrop-blur-xl group hover:bg-white/[0.05] transition-all">
              <div className="p-3 bg-brand-indigo/10 rounded-2xl w-fit text-brand-indigo shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp size={24} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Avg Performance</span>
                <div className="text-4xl font-display font-bold text-white mt-1 group-hover:text-brand-indigo transition-colors">{avgPerformance}</div>
              </div>
            </div>
            
            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[32px] flex flex-col gap-4 backdrop-blur-xl group hover:bg-white/[0.05] transition-all">
              <div className="p-3 bg-brand-purple/10 rounded-2xl w-fit text-brand-purple shadow-lg group-hover:scale-110 transition-transform">
                <Award size={24} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Current Ranking</span>
                <div className="text-4xl font-display font-bold text-white mt-1">{ranking}</div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-brand-indigo/20 to-transparent border border-brand-indigo/20 p-8 rounded-[48px] flex flex-col justify-between backdrop-blur-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform pointer-events-none">
                <Target size={64} />
              </div>
              <h4 className="font-bold text-xs text-brand-indigo uppercase tracking-widest mb-8">Target Reward</h4>
              <div className="text-center py-6">
                <div className="text-[10px] uppercase tracking-[0.2em] mb-2 text-slate-500 font-bold">Matching Level</div>
                <div className="text-6xl font-display font-bold text-white tracking-tighter">4</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                Higher scores increase your probability of matching in the monthly draw cycle.
              </div>
            </div>
          </div>

          {/* CENTER COLUMN */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="bg-white/[0.03] border border-white/5 rounded-[48px] p-8 md:p-10 flex flex-col backdrop-blur-md relative overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-1">Draw Results</h3>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Live Monthly Performance Outcome</p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-full px-2 gap-1 text-[10px] font-bold uppercase border border-white/5 mb-8 w-fit mx-auto">
                  <button className="px-6 py-2 bg-white/10 rounded-full text-white shadow-xl">Latest Draw</button>
                </div>
              </div>

              {/* Draw Visualization - Circular Balls */}
              <div className="min-h-[220px] flex items-center justify-center gap-4 flex-wrap py-8">
                <AnimatePresence mode="wait">
                  {isDrawing ? (
                    <motion.div 
                      key="drawing-loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-4 flex-wrap justify-center"
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 10, -10, 0],
                            backgroundColor: ["rgba(99, 102, 241, 0.1)", "rgba(99, 102, 241, 0.2)", "rgba(99, 102, 241, 0.1)"]
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 0.8,
                            delay: i * 0.1 
                          }}
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-brand-indigo/30 flex items-center justify-center text-brand-indigo/40"
                        >
                          <RefreshCw size={24} className="animate-spin" />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : drawNumbers.length > 0 ? (
                    <motion.div 
                      key="draw-results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-4 flex-wrap justify-center"
                    >
                      {drawNumbers.map((num, i) => {
                        const isMatch = scores.map(s => s.score).includes(num);
                        return (
                          <motion.div 
                            key={`${i}-${num}`}
                            initial={{ opacity: 0, scale: 0, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ 
                              type: "spring",
                              damping: 15,
                              stiffness: 100,
                              delay: i * 0.1 
                            }}
                            className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl font-display font-bold shadow-2xl transition-all relative ${
                              isMatch 
                                ? "bg-brand-emerald text-white shadow-brand-emerald/30 scale-110 z-10 border-4 border-white/20" 
                                : "bg-brand-purple text-white shadow-brand-purple/20 border-4 border-white/10"
                            }`}
                          >
                            {num}
                            {isMatch && (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: [1, 1.5, 1] }}
                                className="absolute -top-1 -right-1 w-6 h-6 bg-white text-brand-emerald rounded-full flex items-center justify-center text-[10px] font-black"
                              >
                                ✓
                              </motion.div>
                            )}
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="no-draw"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-10 opacity-30"
                    >
                      <Trophy size={64} className="mx-auto mb-4" />
                      <p className="text-[10px] uppercase font-bold tracking-[0.3em]">No Draw Performed Yet</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {profile.is_subscribed && (
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center justify-between mx-8">
                  <div className="flex items-center gap-2 text-[9px] uppercase font-bold text-emerald-500">
                    <Sparkles size={14} />
                    <span>Charity Contribution Applied</span>
                  </div>
                  <div className="text-xs font-display font-bold text-emerald-400">₹5.00</div>
                </div>
              )}

              {drawNumbers.length > 0 && !isDrawing && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 p-8 bg-white/[0.02] border border-white/5 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl ${matchCount > 0 ? "bg-brand-emerald text-white" : "bg-slate-800 text-slate-500"}`}>
                      {matchCount > 0 ? <Sparkles size={32} /> : <Target size={32} />}
                    </div>
                    <div>
                      <div className="text-2xl font-display font-bold">{matchCount} Matches Found</div>
                      <div className={`text-[10px] uppercase font-bold tracking-widest mt-1 ${matchCount > 0 ? "text-brand-emerald" : "text-slate-500"}`}>
                        {matchCount >= 3 ? "Rank 🥇 High Performance Award" : matchCount >= 1 ? "Rank 🥈 Skill Recognition" : "Rank 🥉 Entry Acknowledged"}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase font-bold tracking-widest text-slate-600 mb-1">Authenticated Entry</div>
                    <div className="text-2xl font-display font-bold text-white">#{latestDraw ? latestDraw.id.slice(0, 8).toUpperCase() : '---'}</div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4 px-2">
                  <div className="flex items-center gap-3">
                    <History size={18} className="text-slate-500" />
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] leading-none mt-0.5">Performance Log (Last 5 Entries)</span>
                  </div>
                  <span className="text-[10px] font-bold text-brand-indigo uppercase tracking-widest cursor-pointer hover:underline transition-all">Full History</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <AnimatePresence mode="popLayout">
                    {scores.map((s, i) => (
                      <motion.div 
                        key={s.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-5 rounded-3xl group hover:bg-white/[0.04] transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-brand-indigo transition-colors transition-all">
                            <ClipboardList size={20} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">Score Entry</div>
                            <div className="text-[9px] text-slate-600 uppercase tracking-widest font-bold">
                              {new Date(s.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                        <div className="text-3xl font-display font-bold text-white group-hover:scale-110 transition-transform">{s.score}</div>
                      </motion.div>
                    ))}
                    {scores.length === 0 && (
                      <div className="py-10 text-center text-slate-700 font-bold uppercase tracking-[0.3em] text-xs">No Performance Data Yet</div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4 px-2">
                  <div className="flex items-center gap-3">
                    <TrendingUp size={18} className="text-slate-500" />
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] leading-none mt-0.5">Leaderboard (Global Top 10)</span>
                  </div>
                  <Trophy size={16} className="text-brand-indigo" />
                </div>
                <div className="space-y-4">
                  {leaderboard.length > 0 ? leaderboard.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${i === 0 ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]" : i === 1 ? "bg-slate-300 text-black" : i === 2 ? "bg-amber-600 text-white" : "bg-white/5 text-slate-500"}`}>
                          {i + 1}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-brand-indigo transition-colors">{item.user_email}</div>
                          <div className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">{item.rank} Rank</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-display font-bold text-white">{item.matches} Matches</div>
                        <div className="text-[8px] text-slate-600 font-bold uppercase">{new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="py-10 text-center text-slate-700 font-bold uppercase tracking-[0.3em] text-xs">Waiting for Draw results</div>
                  )}
                </div>
              </div>
            </div>

            {/* DRAW HISTORY SECTION */}
            <div className="flex flex-col gap-6 mt-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 px-2">
                <div className="flex items-center gap-3">
                  <RefreshCw size={18} className="text-slate-500" />
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] leading-none mt-0.5">Your Draw History (Last 10)</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {drawHistory.map((draw, i) => (
                  <motion.div 
                    key={draw.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl hover:border-brand-indigo/30 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">#{draw.id.slice(0, 8).toUpperCase()}</div>
                      <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${draw.rank === '1st' ? "bg-yellow-500/20 text-yellow-500" : draw.rank === '2nd' ? "bg-slate-400/20 text-slate-400" : "bg-amber-600/20 text-amber-600"}`}>
                        {draw.rank} RANK
                      </div>
                    </div>
                    <div className="flex gap-2 mb-4">
                      {draw.numbers.map((n, idx) => (
                        <div key={idx} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-display font-bold text-white group-hover:bg-brand-indigo/20 group-hover:border-brand-indigo/30 transition-all">
                          {n}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-end bg-black/20 p-3 rounded-2xl">
                      <div>
                        <div className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Matched</div>
                        <div className="text-xl font-display font-bold text-brand-emerald">{draw.matches}</div>
                      </div>
                      <div className="text-right text-[8px] font-bold text-slate-600 uppercase">
                        {new Date(draw.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white/[0.03] border border-brand-indigo/30 p-8 rounded-[48px] group relative flex flex-col gap-8 overflow-hidden backdrop-blur-xl transition-all hover:bg-white/[0.05]">
               <div className="absolute inset-0 bg-brand-indigo/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
               <div className="flex items-center justify-between">
                 <h4 className="font-bold text-xs uppercase tracking-widest text-brand-indigo">Action Core</h4>
                 <div className="w-10 h-10 rounded-full bg-brand-indigo flex items-center justify-center text-white shadow-xl shadow-brand-indigo/20">
                   {profile.is_subscribed ? <Crown size={20} /> : <Plus size={20} />}
                 </div>
               </div>
               
               <div className="space-y-4">
                 <div className="text-center mb-4">
                   <h3 className="text-2xl font-display font-bold italic text-white">Performance Entry</h3>
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Pool Validation Required</p>
                 </div>
                 
                 <input 
                  type="number"
                  min="1"
                  max="45"
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value)}
                  placeholder="Score (1-45)"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-center text-2xl font-display font-bold text-white focus:outline-none focus:border-brand-indigo transition-all placeholder:text-slate-800"
                 />
                 
                 <div className="grid grid-cols-1 gap-4">
                   <motion.button 
                     whileTap={{ scale: 0.95 }}
                     onClick={handleLogScore}
                     disabled={loading || !newScore}
                     className="w-full py-4 rounded-2xl bg-brand-indigo text-white font-bold text-sm shadow-2xl shadow-brand-indigo/30 transition-all disabled:opacity-30 relative overflow-hidden"
                   >
                     {loading && <div className="absolute inset-0 shimmer-bg opacity-30" />}
                     {loading ? 'Logging...' : 'Submit to Pool'}
                   </motion.button>

                   <motion.button 
                     whileTap={{ scale: 0.95 }}
                     onClick={runDraw}
                     disabled={isDrawing || scores.length === 0}
                     className="w-full py-4 rounded-2xl bg-white text-black font-bold text-sm shadow-xl shadow-white/5 hover:bg-slate-100 transition-all disabled:opacity-30 flex items-center justify-center gap-2"
                   >
                     {isDrawing ? <RefreshCw className="animate-spin" size={16} /> : <Trophy size={16} />}
                     {isDrawing ? 'Simulating Draw...' : 'Run Monthly Draw'}
                   </motion.button>

                   {!profile.is_subscribed ? (
                     <motion.button 
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.95 }}
                       onClick={handleUpgrade}
                       disabled={loading}
                       className="w-full py-6 rounded-3xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-brand-indigo/20 flex flex-col items-center justify-center gap-2 border border-white/10 mt-2"
                     >
                       <div className="flex items-center gap-2">
                         <CreditCard size={18} /> Upgrade Plan 🚀
                       </div>
                       <span className="text-[9px] opacity-60 font-bold tracking-widest leading-none">Unlock PRO Features</span>
                     </motion.button>
                   ) : (
                     <div className="p-4 rounded-2xl bg-brand-indigo/5 border border-brand-indigo/10 flex items-center justify-between mt-2">
                       <div className="flex items-center gap-2 text-[10px] font-bold text-brand-indigo uppercase">
                         <Crown size={14} className="fill-brand-indigo" />
                         <span>Pro Member Status</span>
                       </div>
                       <ShieldCheck size={16} className="text-brand-indigo" />
                     </div>
                   )}
                   
                   {scores.length === 0 && (
                     <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-[9px] text-red-400 font-bold uppercase tracking-widest text-center leading-relaxed">
                       Log at least one score to be eligible for the draw.
                     </div>
                   )}
                 </div>
               </div>
            </div>

            <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[48px] flex flex-col gap-8 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
                  <Award size={16} />
                </div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-white leading-none">Impact Timeline</h4>
              </div>
              <div className="space-y-8 relative ml-4">
                <div className="absolute left-[-23px] top-2 bottom-0 w-px bg-white/5" />
                {[
                  { label: "Profile Verified", status: "Completed", date: new Date(user.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) },
                  { label: `Draw Entry #${latestDraw ? latestDraw.id.slice(0, 4).toUpperCase() : 'NONE'}`, status: latestDraw ? "Active" : "Pending", date: latestDraw ? new Date(latestDraw.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : "--" },
                  { label: "Impact Report", status: "Scheduled", date: "May 15" }
                ].map((item, i) => (
                  <div key={i} className="relative flex flex-col gap-2">
                    <div className={`absolute left-[-27px] top-1 w-2.5 h-2.5 rounded-full border-2 border-[#050508] ${i === 1 ? "bg-brand-indigo shadow-[0_0_8px_rgba(99,102,241,0.5)]" : i === 0 ? "bg-brand-emerald" : "bg-slate-800"}`} />
                    <span className="text-[11px] font-bold text-white leading-none">{item.label}</span>
                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold leading-none">{item.date} • {item.status}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-8 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Donation Yield</span>
                  <span className="text-sm font-bold text-brand-emerald">10.0%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="h-full bg-brand-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
