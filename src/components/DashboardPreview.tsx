import { motion } from "motion/react";
import { TrendingUp, Award, Calendar, History, Plus } from "lucide-react";

export default function DashboardPreview() {
  const lastScores = [38, 42, 35, 40, 39];
  
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">Your Intelligent Dashboard</h2>
          <p className="text-white/50">One command center for your performance and your impact.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[700px]">
          {/* Main Stats Rail */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[32px] flex flex-col gap-4">
              <div className="p-3 bg-brand-indigo/10 rounded-2xl w-fit text-brand-indigo">
                <TrendingUp size={24} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Avg Performance</span>
                <div className="text-3xl font-display font-bold text-white">38.8</div>
              </div>
            </div>
            
            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[32px] flex flex-col gap-4">
              <div className="p-3 bg-brand-purple/10 rounded-2xl w-fit text-brand-purple">
                <Award size={24} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Current Ranking</span>
                <div className="text-3xl font-display font-bold text-white">Top 4%</div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-brand-indigo/20 to-transparent border border-brand-indigo/20 p-8 rounded-[32px] flex-grow flex flex-col justify-between backdrop-blur-xl">
              <h4 className="font-bold text-sm text-brand-indigo uppercase tracking-widest">Target Reward</h4>
              <div className="text-center py-6">
                <div className="text-[10px] uppercase tracking-[0.2em] mb-2 text-slate-500 font-bold">Matching Level</div>
                <div className="text-5xl font-display font-bold text-white">4</div>
              </div>
              <button className="w-full py-3 rounded-2xl bg-white text-black font-bold text-sm shadow-lg shadow-white/5">Check Status</button>
            </div>
          </div>

          {/* Central Activity Card */}
          <div className="lg:col-span-6 bg-white/[0.03] border border-white/5 rounded-[48px] p-10 flex flex-col gap-10 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Performance Matrix</h3>
              <div className="flex bg-white/5 p-1 rounded-full px-2 gap-1 text-[10px] font-bold uppercase">
                <button className="px-3 py-1 bg-white/10 rounded-full text-white">Last 30 Days</button>
                <button className="px-3 py-1 text-slate-500">All Time</button>
              </div>
            </div>

            <div className="flex-grow flex items-end justify-between gap-4 py-8">
              {lastScores.map((score, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4">
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: `${score * 1.5}%` }}
                    className="w-full rounded-2xl bg-gradient-to-t from-brand-indigo/40 to-brand-indigo relative group cursor-pointer shadow-indigo-500/20 shadow-lg"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white text-black text-[10px] font-bold px-2 py-1 rounded shadow-xl">
                      Score: {score}
                    </div>
                  </motion.div>
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">APR {12 + i}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">Score History</span>
                <span className="text-xs font-bold text-brand-indigo cursor-pointer">View Detailed Log</span>
              </div>
              <div className="space-y-4">
                {[1, 2].map((_, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 p-4 rounded-3xl group hover:bg-white/10 transition-colors border border-transparent hover:border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                        <History size={16} className="text-slate-400" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Old Course - Morning</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Apr 24, 2026 • 09:12 AM</div>
                      </div>
                    </div>
                    <div className="text-lg font-display font-bold text-white">42</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Rail */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <button className="w-full flex-grow bg-white/[0.03] border border-brand-indigo/20 p-8 rounded-[48px] group relative flex flex-col items-center justify-center gap-6 overflow-hidden transition-all hover:bg-brand-indigo/5">
               <div className="absolute inset-0 bg-brand-indigo/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="w-16 h-16 rounded-full bg-brand-indigo flex items-center justify-center text-white shadow-xl shadow-brand-indigo/30 group-hover:scale-110 transition-transform">
                 <Plus size={32} />
               </div>
               <div className="text-center">
                 <h4 className="font-bold text-xl mb-1 italic text-white leading-none">Log Score</h4>
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">AddToCurrentPool</p>
               </div>
            </button>

            <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[48px] flex flex-col gap-6 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-brand-purple" />
                <h4 className="font-bold text-sm italic tracking-tight text-white leading-none">Active Impact Timeline</h4>
              </div>
              <div className="space-y-6 relative ml-2">
                <div className="absolute left-[-11px] top-2 bottom-0 w-px bg-white/10" />
                {[
                  { label: "Quarterly Payout", status: "Completed", date: "Mar 31" },
                  { label: "Impact Report", status: "Pending", date: "May 12" }
                ].map((item, i) => (
                  <div key={i} className="relative flex flex-col gap-1">
                    <div className={`absolute left-[-15px] top-1.5 w-2 h-2 rounded-full ${i === 0 ? "bg-brand-indigo" : "bg-white/10"}`} />
                    <span className="text-[10px] font-bold text-slate-300 leading-none">{item.label}</span>
                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold leading-none">{item.date} • {item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
