import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, RefreshCw, Sparkles } from "lucide-react";

export default function DrawSystem() {
  const [numbers, setNumbers] = useState([12, 5, 33, 2, 41]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [matches, setMatches] = useState(3);

  const triggerDraw = () => {
    setIsDrawing(true);
    setMatches(0);
    setTimeout(() => {
      const newNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 45) + 1);
      setNumbers(newNumbers);
      setIsDrawing(false);
      setMatches(Math.floor(Math.random() * 5) + 1);
    }, 2000);
  };

  return (
    <section id="draw" className="py-24 px-6 md:px-12 bg-[#08080C] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/5 blur-[160px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-purple/10 border border-brand-purple/20 rounded-full text-brand-purple text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            <Sparkles size={12} /> Live Pool: $124,500
          </div>
          <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 italic tracking-tighter leading-tight">High Stakes. <br />High <span className="text-brand-purple text-gradient-shimmer">Transparency.</span></h2>
          <p className="text-slate-400 text-lg mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Our proprietary draw engine matches player performance scores with monthly pool numbers. Fully audited, fully transparent, and incredibly rewarding.
          </p>
          
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
              <div className="text-3xl font-display font-bold text-white mb-1">98.2%</div>
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest leading-none">Transparency Score</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
              <div className="text-3xl font-display font-bold text-white mb-1">Top 1%</div>
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest leading-none">Audited Payouts</div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-2xl">
          <div className="relative bg-white/[0.02] border border-white/10 p-10 md:p-16 rounded-[64px] overflow-hidden backdrop-blur-2xl">
             {/* Draw UI */}
            <div className="text-center mb-12 relative z-10">
              <h3 className="text-xs uppercase font-bold tracking-[0.4em] text-slate-500 mb-2">Live Matching Preview</h3>
              <p className="text-white/60 text-sm">Example performance match at membership rank 4</p>
            </div>

            <div className="flex justify-center flex-wrap gap-4 md:gap-6 mb-16 h-24 relative z-10">
              <AnimatePresence mode="popLayout">
                {numbers.map((num, i) => (
                  <motion.div
                    key={`${i}-${num}`}
                    initial={{ scale: 0.5, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.5, opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-display font-bold border-2 ${
                      i < matches 
                        ? "bg-brand-purple text-white border-brand-purple shadow-xl shadow-brand-purple/40" 
                        : "bg-white/5 text-white border-white/10"
                    }`}
                  >
                    {isDrawing ? "?" : num}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-6 mb-12 relative z-10">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${matches > 0 ? "bg-brand-emerald/10 text-brand-emerald" : "bg-white/5 text-slate-500"}`}>
                  <Trophy size={24} />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest leading-none mb-2">Match Result</div>
                  <div className="text-xl font-bold text-white leading-tight">
                    {matches > 0 ? `${matches} Numbers Matched` : "Scanning Pools..."}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest leading-none mb-2">Est. Reward</div>
                <div className={`text-2xl font-display font-bold ${matches > 0 ? "text-brand-neon" : "text-slate-500"}`}>
                  {matches > 0 ? `$${(matches * 125).toLocaleString()}` : "$0.00"}
                </div>
              </div>
            </div>

            <button 
              onClick={triggerDraw}
              disabled={isDrawing}
              className="w-full py-5 rounded-2xl bg-white text-black font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-200 transition-all disabled:opacity-50 relative z-10 shadow-2xl"
            >
              <RefreshCw className={isDrawing ? "animate-spin" : ""} size={20} />
              {isDrawing ? "Recalculating..." : "Simulate Next Draw"}
            </button>

            {/* Subtle Gradient Overlays */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-purple/10 rounded-full blur-[80px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
