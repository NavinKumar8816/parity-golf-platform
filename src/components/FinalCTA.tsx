import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-indigo/5 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto bg-white/[0.03] border border-white/5 p-12 md:p-24 rounded-[64px] relative z-10 text-center overflow-hidden backdrop-blur-xl">
        {/* Background Gradients */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-purple/10 rounded-full blur-[96px]" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-indigo/10 rounded-full blur-[96px]" />
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-7xl font-display font-bold mb-8 italic tracking-tighter text-white leading-tight">Enter the Orbit.</h2>
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Join 12,000+ members who have turned their performance results into a high-stakes force for global philanthropy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-brand-indigo text-white font-bold text-lg flex items-center justify-center gap-2 shadow-2xl shadow-brand-indigo/40"
            >
              Start Your Journey
              <ArrowUpRight size={20} />
            </motion.button>
            <button className="text-slate-500 hover:text-white font-bold text-xs transition-colors uppercase tracking-[0.3em]">
              Governance & Partners
            </button>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-8 opacity-10 filter grayscale brightness-200">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_Fonts_2021_logo.svg" alt="Charity" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" alt="Tesla" className="h-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
