import React from "react";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Elite Member • St. Andrews",
    text: "Parity has turned my weekend rounds into something much bigger. Knowing my consistency funds youth golf programs is a win before I even check the draw.",
    rating: 5,
    match: "$2,500 Match" 
  },
  {
    name: "Sarah Chen",
    role: "Pro Member • Pebble Beach",
    text: "The transparency is what hooked me. You can see exactly how the draw works and where your 10% contribution goes. It's the future of luxury sports.",
    rating: 5,
    match: "Impact First Badge"
  },
  {
    name: "Marcus Miller",
    role: "Basic Member • Royal St. Georges",
    text: "It's the only platform that rewards you for just playing the game you love. Simple, clean, and incredibly impactful. A true product story.",
    rating: 5,
    match: "$320 Match"
  }
];

export default function SocialProof() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div>
             <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 italic tracking-tight">Trusted by <span className="text-gradient-shimmer">12,000+ Players.</span></h2>
             <p className="text-slate-500 max-w-lg">Join a global community dedicated to high-performance and high-impact philanthropy.</p>
          </div>
          <div className="flex -space-x-3">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-slate-800 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-2 border-black bg-brand-indigo flex items-center justify-center text-[10px] font-bold text-white">
              +12K
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-[40px] flex flex-col gap-6 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <Quote size={64} />
              </div>
              
              <div className="flex gap-1 text-brand-neon">
                {[...Array(item.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              
              <p className="text-slate-400 text-sm leading-relaxed italic">
                "{item.text}"
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
                <div>
                  <div className="text-sm font-bold text-white">{item.name}</div>
                  <div className="text-[10px] text-slate-600 uppercase tracking-widest font-bold mt-1">{item.role}</div>
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-bold text-brand-indigo uppercase tracking-widest border border-brand-indigo/20">
                  {item.match}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
