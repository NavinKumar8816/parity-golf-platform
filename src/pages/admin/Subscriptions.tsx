import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Calendar, 
  ArrowUpRight, 
  TrendingUp, 
  Activity, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip 
} from 'recharts';

const planData = [
  { name: 'Monthly Pro', value: 1240, color: '#6366f1' },
  { name: 'Yearly Elite', value: 450, color: '#818cf8' },
  { name: 'Standard (Free)', value: 800, color: '#312e81' },
];

export default function AdminSubscriptions() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Subscription Lifecycle</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor recurring revenue and plan distribution.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-200 transition-all">
             Stripe Dashboard <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Snapshot */}
        <div className="lg:col-span-2 bg-[#0d0d0f] border border-white/5 p-8 rounded-[40px] flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {planData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <RechartsTooltip 
                   contentStyle={{ backgroundColor: '#161618', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-4 w-full">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Plan Distribution</h3>
            {planData.map((plan) => (
              <div key={plan.name} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }} />
                  <span className="text-xs font-bold text-white">{plan.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-display font-bold text-white">{plan.value}</div>
                  <div className="text-[10px] text-slate-600 font-bold uppercase">Users</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Column */}
        <div className="space-y-4">
           <div className="p-8 bg-brand-indigo/10 border border-brand-indigo/20 rounded-[40px]">
              <div className="flex items-center justify-between mb-4">
                 <div className="p-3 bg-white text-brand-indigo rounded-2xl">
                   <Zap size={20} />
                 </div>
                 <span className="text-[10px] font-black text-brand-indigo uppercase tracking-widest">Growth +24%</span>
              </div>
              <p className="text-[10px] font-bold text-brand-indigo uppercase tracking-widest mb-1 opacity-70">Projected ARR</p>
              <h3 className="text-3xl font-display font-bold text-white tracking-tight">₹24.8L</h3>
              <p className="text-[10px] text-slate-500 font-medium mt-4 leading-relaxed italic">"Optimal growth detected based on conversion trends in Tier-1 cities."</p>
           </div>
           <div className="p-8 bg-[#0d0d0f] border border-white/5 rounded-[40px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500">
                  <Activity size={20} />
                </div>
                <div>
                   <h4 className="text-sm font-bold text-white">Churn Rate</h4>
                   <p className="text-[10px] text-slate-600 font-bold uppercase">Last 30 Days</p>
                </div>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-2xl font-display font-bold text-white">3.2%</span>
                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                  +0.4% <ArrowUpRight size={12} />
                </span>
              </div>
           </div>
        </div>
      </div>

      {/* Subscription Log Table */}
      <div className="bg-[#0d0d0f] border border-white/5 rounded-[40px] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
           <h3 className="text-white font-bold leading-none">Recent Transactions</h3>
           <div className="flex gap-2">
             <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
               <Search size={14} className="text-slate-500" />
               <input type="text" placeholder="Search invoices..." className="bg-transparent border-none text-[10px] focus:ring-0 placeholder:text-slate-600 w-32" />
             </div>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
             <thead>
               <tr className="bg-white/[0.01]">
                 <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-600 tracking-[0.2em]">Transaction</th>
                 <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-600 tracking-[0.2em]">Amount</th>
                 <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-600 tracking-[0.2em]">Status</th>
                 <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-600 tracking-[0.2em]">Renewal</th>
                 <th className="px-8 py-5 text-[10px] uppercase font-black text-slate-600 tracking-[0.2em]">Portal</th>
               </tr>
             </thead>
             <tbody>
               {[1,2,3,4].map(i => (
                 <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500">
                          <CreditCard size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">INV-8293-PRO</p>
                          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tight">user.name@example.com</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-display font-bold text-white">₹499.00</p>
                      <p className="text-[9px] text-slate-600 font-bold uppercase">Monthly Pro</p>
                    </td>
                    <td className="px-8 py-6">
                       <span className="flex items-center gap-1.5 text-[9px] font-black text-brand-emerald uppercase tracking-widest">
                         <CheckCircle2 size={12} /> Success
                       </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-bold text-slate-300">July 24, 2026</p>
                      <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest italic">Auto-renewal active</p>
                    </td>
                    <td className="px-8 py-6">
                      <button className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 italic text-[10px] font-bold">
                        View Receipt
                      </button>
                    </td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
