import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  User, 
  Trophy, 
  Image as ImageIcon, 
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';

interface WinnerEntry {
  id: string;
  user_email: string;
  draw_id: string;
  matches: number;
  rank: string;
  prize_amount: number;
  payout_status: 'pending' | 'verified' | 'paid' | 'rejected';
  proof_url?: string;
  created_at: string;
}

export default function AdminWinners() {
  const [winners, setWinners] = useState<WinnerEntry[]>([]);
  const [selectedWinner, setSelectedWinner] = useState<WinnerEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    setLoading(true);
    // Mocking winner data for the verification UI
    setTimeout(() => {
      setWinners([
        {
          id: 'W-9284',
          user_email: 'player.one@example.com',
          draw_id: 'D-JUN-2026',
          matches: 5,
          rank: '1st',
          prize_amount: 50000,
          payout_status: 'pending',
          proof_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600',
          created_at: new Date().toISOString()
        },
        {
          id: 'W-9285',
          user_email: 'golf.fan@example.com',
          draw_id: 'D-JUN-2026',
          matches: 4,
          rank: '2nd',
          prize_amount: 15000,
          payout_status: 'verified',
          proof_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600',
          created_at: new Date().toISOString()
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const updateStatus = (id: string, status: WinnerEntry['payout_status']) => {
    setWinners(winners.map(w => w.id === id ? { ...w, payout_status: status } : w));
    setSelectedWinner(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Winner Verification</h1>
          <p className="text-slate-500 text-sm mt-1">Audit score proof and manage prize disbursements.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2 bg-[#0d0d0f] border border-white/5 rounded-xl w-64">
            <Search size={16} className="text-slate-500" />
            <input type="text" placeholder="Search Winner ID..." className="bg-transparent border-none text-xs focus:ring-0 placeholder:text-slate-600 w-full" />
          </div>
          <button className="p-2 b-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 bg-white/5 border border-white/5 rounded-[30px] animate-pulse" />
          ))
        ) : winners.map((winner) => (
          <motion.div
            key={winner.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 bg-[#0d0d0f] border border-white/5 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-white/10 transition-all group"
          >
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-brand-indigo transition-colors relative">
                <Trophy size={28} />
                <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0d0d0f] ${winner.payout_status === 'pending' ? 'bg-yellow-500' : winner.payout_status === 'verified' ? 'bg-brand-indigo' : winner.payout_status === 'paid' ? 'bg-brand-emerald' : 'bg-red-500'}`}>
                   {winner.payout_status === 'pending' ? <Clock size={10} className="text-black" /> : <CheckCircle2 size={10} className="text-white" />}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white tracking-tight">{winner.user_email}</h3>
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{winner.id}</span>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-r border-white/10 pr-4">
                    <CheckCircle2 size={12} className="text-brand-emerald" /> {winner.matches} Matches
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <Trophy size={12} className="text-yellow-500" /> {winner.rank} Rank
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-0.5">Net Prize Pool</div>
                <div className="text-xl font-display font-bold text-white flex items-center gap-2 justify-end">
                   <DollarSign size={18} className="text-brand-emerald" />
                   {winner.prize_amount.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedWinner(winner)}
                  className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <Eye size={16} /> Inspect Proof
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Proof Inspection Modal */}
      <AnimatePresence>
        {selectedWinner && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWinner(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-[#0d0d0f] border border-white/5 rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <div className="flex-1 p-1 bg-white/5">
                <img 
                  src={selectedWinner.proof_url} 
                  alt="Proof of score" 
                  className="w-full h-full object-cover rounded-[36px]"
                />
              </div>
              <div className="w-full md:w-80 p-8 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-brand-indigo mb-6">
                    <ShieldCheck size={20} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Compliance Check</span>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-white mb-1">Verify Outcome</h3>
                  <p className="text-xs text-slate-500 font-medium mb-8">Inspect the timestamp and signature in the provided scorecard image.</p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <p className="text-[10px] text-slate-600 font-bold uppercase mb-1">Status</p>
                      <p className="text-xs font-bold text-white flex items-center gap-2">
                        <Clock size={12} className="text-yellow-500" /> {selectedWinner.payout_status.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 space-y-3">
                  <button 
                    onClick={() => updateStatus(selectedWinner.id, 'verified')}
                    className="w-full py-4 bg-brand-emerald text-black font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all"
                  >
                    <CheckCircle2 size={16} /> Approve & Verify
                  </button>
                  <button 
                    onClick={() => updateStatus(selectedWinner.id, 'rejected')}
                    className="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-500 font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <XCircle size={16} /> Flag as Fraud
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
