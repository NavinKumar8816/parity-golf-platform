import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CreditCard, 
  Trophy, 
  Heart, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  DollarSign
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { supabase } from '../../lib/supabase';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const drawStats = [
  { name: '5 Match', users: 12, color: '#6366f1' },
  { name: '4 Match', users: 45, color: '#818cf8' },
  { name: '3 Match', users: 156, color: '#a5b4fc' },
  { name: 'No Match', users: 1200, color: '#312e81' },
];

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscribers: 0,
    totalPrizePool: 0,
    charityContributions: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // In a real app, these would be real queries
    // Mocking for performance demo
    setStats({
      totalUsers: 2456,
      activeSubscribers: 1840,
      totalPrizePool: 125000,
      charityContributions: 15400
    });
  };

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers.toLocaleString(), change: '+12.5%', icon: Users, color: 'brand-indigo' },
    { label: 'Active Subscribers', value: stats.activeSubscribers.toLocaleString(), change: '+8.2%', icon: Activity, color: 'brand-purple' },
    { label: 'Prize Pool', value: `₹${stats.totalPrizePool.toLocaleString()}`, change: '+₹12,400', icon: Trophy, color: 'yellow-500' },
    { label: 'Charity Fund', value: `₹${stats.charityContributions.toLocaleString()}`, change: '+₹2,150', icon: Heart, color: 'brand-emerald' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">System Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time platform performance and core metrics.</p>
        </div>
        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0d0d0f] border border-white/5 p-6 rounded-3xl group hover:border-white/10 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-${card.color}/10 text-${card.color}`}>
                <card.icon size={20} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-brand-emerald">
                {card.change}
                <ArrowUpRight size={12} />
              </div>
            </div>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">{card.label}</p>
            <h3 className="text-2xl font-display font-bold text-white">{card.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-[#0d0d0f] border border-white/5 p-8 rounded-[40px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Revenue Growth</h3>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Monthly Subscription Income</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-slate-300 focus:outline-none focus:ring-2 ring-brand-indigo/20">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161618', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Draw Stats */}
        <div className="bg-[#0d0d0f] border border-white/5 p-8 rounded-[40px]">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white">Draw Distribution</h3>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Latest Monthly Outcome</p>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={drawStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#fff', fontSize: 11, fontWeight: 700 }}
                  width={80}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ backgroundColor: '#161618', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
                />
                <Bar dataKey="users" radius={[0, 8, 8, 0]}>
                  {drawStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-3">
             <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-white/[0.05] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-indigo shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                  <span className="text-xs font-bold text-slate-300">Jackpot Winners</span>
                </div>
                <span className="text-xs font-black text-white">12</span>
             </div>
             <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-white/[0.05] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-xs font-bold text-slate-300">Total Participants</span>
                </div>
                <span className="text-xs font-black text-white">1.4k</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
