import React from 'react';
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Download, 
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Smartphone
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';

const conversionData = [
  { stage: 'Visitor', value: 12000, color: '#1e1b4b' },
  { stage: 'Signed Up', value: 3400, color: '#312e81' },
  { stage: 'Authenticated', value: 2800, color: '#4338ca' },
  { stage: 'Score Logged', value: 2100, color: '#6366f1' },
  { stage: 'Subscribed', value: 1840, color: '#818cf8' },
];

const engagementData = [
  { day: 'Mon', active: 120, logged: 80 },
  { day: 'Tue', active: 150, logged: 110 },
  { day: 'Wed', active: 180, logged: 130 },
  { day: 'Thu', active: 210, logged: 160 },
  { day: 'Fri', active: 250, logged: 190 },
  { day: 'Sat', active: 300, logged: 240 },
  { day: 'Sun', active: 280, logged: 220 },
];

export default function AdminReports() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Intelligence & Analytics</h1>
          <p className="text-slate-500 text-sm mt-1">Deep-dive into conversion funnels and user engagement.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#0d0d0f] border border-white/5 p-1 rounded-xl">
             <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white bg-white/5 rounded-lg shadow-sm">Real-time</button>
             <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all">Historical</button>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-indigo text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-indigo/20">
            <Download size={16} /> Export Dataset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Conversion Funnel */}
        <div className="bg-[#0d0d0f] border border-white/5 p-8 rounded-[40px] space-y-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Conversion Funnel</h3>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Visitor → Active Subscriber Flow</p>
          </div>
          <div className="space-y-4">
            {conversionData.map((item, i) => (
              <div key={item.stage} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest px-2">
                  <span className="text-slate-400">{item.stage}</span>
                  <span className="text-white">{item.value.toLocaleString()}</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / conversionData[0].value) * 100}%` }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
             <div>
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Total Conversion Rate</p>
               <p className="text-2xl font-display font-bold text-brand-emerald">15.3%</p>
             </div>
             <div className="text-right">
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Avg. CAC</p>
               <p className="text-2xl font-display font-bold text-white">₹142.00</p>
             </div>
          </div>
        </div>

        {/* Engagement Chart */}
        <div className="bg-[#0d0d0f] border border-white/5 p-8 rounded-[40px] space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Engagement Density</h3>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Active Users vs Score Logs</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-brand-indigo" />
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Active</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-brand-purple" />
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Logs</span>
               </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="active" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="logged" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161618', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}
                />
                <Area type="monotone" dataKey="active" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#active)" />
                <Area type="monotone" dataKey="logged" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#logged)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <Globe size={16} className="text-slate-500" />
                   <span className="text-[10px] font-bold text-slate-300 uppercase">Desktop</span>
                </div>
                <span className="text-xs font-black text-white">64%</span>
             </div>
             <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <Smartphone size={16} className="text-slate-500" />
                   <span className="text-[10px] font-bold text-slate-300 uppercase">Mobile</span>
                </div>
                <span className="text-xs font-black text-white">36%</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
