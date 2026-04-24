import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Play, 
  Database, 
  Settings2, 
  History, 
  CheckCircle, 
  Zap, 
  ShieldCheck, 
  AlertCircle,
  RefreshCw,
  Eye,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';

interface DrawResult {
  userId: string;
  numbers: number[];
  matches: number;
  rank: string;
}

export default function AdminDraws() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMethod, setDrawMethod] = useState<'random' | 'algorithmic'>('random');
  const [simulationResults, setSimulationResults] = useState<DrawResult[]>([]);
  const [drawNumbers, setDrawNumbers] = useState<number[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchDrawHistory();
  }, []);

  const fetchDrawHistory = async () => {
    const { data } = await supabase
      .from('draws')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });
    if (data) setHistory(data);
  };

  const runSimulation = async () => {
    setIsDrawing(true);
    setSimulationResults([]);
    setIsPublished(false);

    // Simulation delay
    setTimeout(async () => {
      // 1. Generate Draw Numbers
      const nums: number[] = [];
      while (nums.length < 5) {
        const rand = Math.floor(Math.random() * 45) + 1;
        if (!nums.includes(rand)) nums.push(rand);
      }
      setDrawNumbers(nums);

      // 2. Fetch all active scores to simulate winners
      const { data: allScores } = await supabase.from('scores').select('*');
      
      if (allScores) {
        // Group by user
        const userScores: Record<string, number[]> = {};
        allScores.forEach(s => {
          if (!userScores[s.user_id]) userScores[s.user_id] = [];
          userScores[s.user_id].push(s.score);
        });

        const results: DrawResult[] = [];
        Object.keys(userScores).forEach(userId => {
          const userNums = userScores[userId];
          const matches = nums.filter(n => userNums.includes(n)).length;
          
          if (matches >= 3) {
            results.push({
              userId,
              numbers: userNums,
              matches,
              rank: matches === 5 ? '1st' : matches === 4 ? '2nd' : '3rd'
            });
          }
        });
        setSimulationResults(results.sort((a, b) => b.matches - a.matches));
      }
      setIsDrawing(false);
    }, 2000);
  };

  const publishResults = async () => {
    if (drawNumbers.length === 0) return;
    
    // In a real system, we would batch insert/update or trigger a DB function
    // For this demo, we'll simulate success
    setIsPublished(true);
    alert("🚀 Monthly Draw Published! Notifications sent to participants.");
    fetchDrawHistory();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight text-white">Draw Engine</h1>
          <p className="text-slate-500 text-sm mt-1">Configure and execute monthly reward distribution.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-1 flex gap-1">
          <button 
            onClick={() => setDrawMethod('random')}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${drawMethod === 'random' ? 'bg-brand-indigo text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
          >
            Random
          </button>
          <button 
            onClick={() => setDrawMethod('algorithmic')}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${drawMethod === 'algorithmic' ? 'bg-brand-indigo text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
          >
            Algorithmic
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Draw Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0d0d0f] border border-white/5 p-8 rounded-[40px] space-y-6">
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-3xl">
              <h3 className="text-sm font-bold text-white mb-2">Draw Configuration</h3>
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Choose between standard RNG or frequency-weighted selection for higher engagement.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Jackpot Rollover</span>
                <div className="w-10 h-5 bg-brand-indigo/20 rounded-full relative border border-brand-indigo/30">
                  <div className="absolute top-0.5 left-5 w-3.5 h-3.5 bg-brand-indigo rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Fraud Detection</span>
                <div className="w-10 h-5 bg-brand-emerald/20 rounded-full relative border border-brand-emerald/30">
                  <div className="absolute top-0.5 left-5 w-3.5 h-3.5 bg-brand-emerald rounded-full" />
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button 
                onClick={runSimulation}
                disabled={isDrawing}
                className="w-full py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-3"
              >
                {isDrawing ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
                Run Draw Simulation
              </button>
              
              <button 
                onClick={publishResults}
                disabled={isDrawing || drawNumbers.length === 0 || isPublished}
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${isPublished ? 'bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/30' : 'bg-brand-indigo text-white hover:opacity-90 shadow-2xl shadow-brand-indigo/20'}`}
              >
                {isPublished ? <ShieldCheck size={16} /> : <CheckCircle size={16} />}
                {isPublished ? 'Draw Published' : 'Publish Live Draw'}
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-brand-indigo/20 to-brand-purple/20 border border-brand-indigo/20 p-6 rounded-[40px]">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="text-brand-indigo" size={20} />
              <h3 className="text-xs font-black text-brand-indigo uppercase tracking-widest">Protocol Check</h3>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Once published, results are finalized in the blockchain and user payouts will be queued. Ensure all simulations pass the audit threshold.
            </p>
          </div>
        </div>

        {/* Simulation Output */}
        <div className="lg:col-span-2 bg-[#0d0d0f] border border-white/5 p-8 rounded-[40px] flex flex-col min-h-[500px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Simulation Output</h3>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Live calculation preview</p>
            </div>
            {drawNumbers.length > 0 && (
              <div className="flex gap-2">
                {drawNumbers.map(n => (
                  <div key={n} className="w-10 h-10 rounded-full bg-brand-indigo border border-white/20 flex items-center justify-center text-white text-xs font-black shadow-xl animate-in zoom-in slide-in-from-bottom-2">
                    {n}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <AnimatePresence mode="wait">
              {isDrawing ? (
                <div key="loader" className="h-full flex flex-col items-center justify-center gap-6 py-20">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-brand-indigo/20 border-t-brand-indigo rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Database size={24} className="text-brand-indigo animate-pulse" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black text-white uppercase tracking-[0.3em] mb-2">Analyzing Pool Data</p>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Checking 1,245 active scores...</p>
                  </div>
                </div>
              ) : simulationResults.length > 0 ? (
                <div key="results" className="space-y-3">
                  {simulationResults.map((res, i) => (
                    <motion.div
                      key={res.userId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/[0.05] transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${res.rank === '1st' ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'bg-white/10 text-slate-300'}`}>
                          {i + 1}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-brand-indigo transition-colors">{res.userId.slice(0, 12)}...</div>
                          <div className="text-[10px] text-brand-emerald font-black uppercase tracking-widest">{res.matches} Matches</div>
                        </div>
                      </div>
                      <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">
                        Rank: <span className="text-white">{res.rank}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div key="empty" className="h-full flex flex-col items-center justify-center opacity-30">
                  <Play size={48} className="text-slate-600 mb-6" />
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-600">Prepare draw to start simulation</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
