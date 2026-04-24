import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Plus, 
  Trash2, 
  Edit2, 
  Star, 
  DollarSign, 
  ExternalLink, 
  TrendingUp,
  Image as ImageIcon,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';

interface Charity {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  total_donations: number;
  is_featured: boolean;
  website_url?: string;
  created_at: string;
}

export default function AdminCharities() {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharities();
  }, []);

  const fetchCharities = async () => {
    setLoading(true);
    // In a real app we'd fetch from 'charities' table
    // For now mocking data for premium UI demo
    setTimeout(() => {
      setCharities([
        {
          id: '1',
          name: 'Global Play Foundation',
          description: 'Providing sport equipment and coaching to underprivileged youth focused on technical excellence.',
          logo_url: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=200',
          total_donations: 45200,
          is_featured: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Ocean Relief Corp',
          description: 'Direct action against ocean pollution and coral reef restoration projects worldwide.',
          logo_url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=200',
          total_donations: 28500,
          is_featured: false,
          created_at: new Date().toISOString()
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const toggleFeatured = (id: string) => {
    setCharities(charities.map(c => 
      c.id === id ? { ...c, is_featured: !c.is_featured } : c
    ));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Charity Partners</h1>
          <p className="text-slate-500 text-sm mt-1">Manage organizations and monitor donation distribution.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-brand-indigo text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-indigo/20 flex items-center gap-3 hover:-translate-y-1 transition-all"
        >
          <Plus size={18} /> Add New Partner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 bg-white/5 border border-white/5 rounded-[40px] animate-pulse" />
          ))
        ) : (
          charities.map((charity) => (
            <motion.div
              key={charity.id}
              layoutId={charity.id}
              className="bg-[#0d0d0f] border border-white/5 p-8 rounded-[40px] flex flex-col group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/5 p-1 bg-white/5">
                  <img src={charity.logo_url} alt={charity.name} className="w-full h-full object-cover rounded-[14px]" />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleFeatured(charity.id)}
                    className={`p-2.5 rounded-xl transition-all ${charity.is_featured ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-white/5 text-slate-500 hover:text-white border border-white/5'}`}
                  >
                    <Star size={18} fill={charity.is_featured ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-slate-500 hover:text-white transition-all">
                    <Edit2 size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 mb-6">
                <h3 className="text-lg font-bold text-white mb-2">{charity.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 font-medium">{charity.description}</p>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Total Collected</span>
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-brand-emerald" />
                    <span className="text-lg font-display font-bold text-white">₹{charity.total_donations.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-brand-indigo" />
                  <span className="text-[9px] font-black text-brand-indigo uppercase tracking-widest">+12% from last month</span>
                </div>
              </div>

              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 size={20} className="text-red-500/40 hover:text-red-500 cursor-pointer" />
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Charity Modal placeholder */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-[#161618] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <h2 className="text-2xl font-display font-bold text-white mb-2">Partner Application</h2>
                <p className="text-slate-500 text-sm mb-8 font-medium">Onboard new organizations and charitable foundations.</p>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Logo / Cover Image</label>
                    <div className="w-full h-32 bg-white/5 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-3 group cursor-pointer hover:border-brand-indigo/50 transition-all">
                      <ImageIcon className="text-slate-600 group-hover:text-brand-indigo transition-colors" size={32} />
                      <span className="text-[10px] font-bold text-slate-600 group-hover:text-white transition-colors">UPLOAD ASSET (800x400 Recommended)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Organization Name</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-brand-indigo" placeholder="E.g. Green Earth Collective" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mission Description</label>
                      <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-brand-indigo min-h-[100px]" placeholder="Briefly describe the focus area..." />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:bg-white/10 transition-all">Discard</button>
                    <button className="flex-[2] py-4 bg-brand-indigo rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-brand-indigo/20">Finalize Partner</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
