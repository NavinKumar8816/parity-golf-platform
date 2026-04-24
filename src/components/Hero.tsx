import { motion } from "motion/react";
import { ArrowRight, Trophy, Heart, User, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-indigo/10 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[128px] animate-pulse delay-700" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/5 border border-brand-indigo/10 text-brand-indigo text-[10px] font-bold uppercase tracking-widest mb-8 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-indigo/40 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-indigo"></span>
          </span>
          The New Standard in Social Performance
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1]"
        >
          <span className="text-white block">Play. Win.</span>
          <span className="text-gradient-shimmer italic">Give Back.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Every score you enter brings you closer to winning — and helps fund real-world impact through charity. Track your game, win monthly rewards, and make a difference.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            to="/login"
            className="w-full sm:w-auto px-8 py-4 bg-brand-indigo rounded-xl font-bold text-white shadow-lg shadow-brand-indigo/30 hover:bg-brand-indigo/90 transition-all flex items-center justify-center gap-2 group"
          >
            Start Subscription
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
          
          <a href="#charity" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-white backdrop-blur-md hover:bg-white/10 transition-all">
            Explore Charity Impact
          </a>
        </motion.div>
      </div>

      {/* Stats/Proof */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-24"
      >
        <div className="flex flex-col items-center">
          <Trophy className="text-slate-700 mb-3" size={24} />
          <span className="text-3xl font-display font-bold text-white">$1.2M+</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Prizes Awarded</span>
        </div>
        <div className="flex flex-col items-center">
          <Heart className="text-slate-700 mb-3" size={24} />
          <span className="text-3xl font-display font-bold text-white">$450K+</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Charity Impact</span>
        </div>
        <div className="hidden md:flex flex-col items-center">
          <User className="text-slate-700 mb-3" size={24} />
          <span className="text-3xl font-display font-bold text-white">12K+</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Active Members</span>
        </div>
      </motion.div>
    </section>
  );
}
