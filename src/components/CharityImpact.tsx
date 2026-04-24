import { motion } from "motion/react";
import { HandHeart, Waves, Trees } from "lucide-react";

const charities = [
  {
    name: "PureWater Initiative",
    icon: <Waves className="text-blue-400" />,
    desc: "Providing sustainable clean water solutions to rural communities across Sub-Saharan Africa.",
    raised: "$124,500",
    image: "https://images.unsplash.com/photo-1541252260730-0102604bb169?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Green Canopy",
    icon: <Trees className="text-green-400" />,
    desc: "Restoring critical biodiversity hotspots and reforestation projects globally.",
    raised: "$89,200",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Mind Matters",
    icon: <HandHeart className="text-pink-400" />,
    desc: "Democratizing mental health support and educational resources for underprivileged youth.",
    raised: "$210,000",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800"
  }
];

export default function CharityImpact() {
  return (
    <section id="charity" className="py-24 px-6 md:px-12 bg-white/[0.02] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-emerald/5 blur-[128px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-4xl md:text-7xl font-display font-bold mb-6 italic tracking-tighter text-white leading-tight">Your Game Creates <span className="text-brand-emerald">Real Impact.</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Every round you play contributes to real lives — from youth programs to community development. We've built an engine of collective philanthropy.
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 p-8 px-12 rounded-[48px] text-center backdrop-blur-xl relative group">
            <div className="absolute inset-0 bg-brand-emerald/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[48px]" />
            <span className="text-xs uppercase tracking-[0.4em] font-black text-slate-500 mb-4 block">Total Donated</span>
            <div className="text-6xl font-display font-bold text-white tracking-widest">$452,800</div>
            <div className="mt-4 flex items-center justify-center gap-2 text-brand-emerald">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Live Live Impact Counter</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {charities.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[500px] rounded-[56px] overflow-hidden border border-white/5"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="p-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl mb-6 group-hover:border-brand-emerald/50 transition-colors shadow-2xl">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-display font-bold mb-4 text-white group-hover:text-brand-emerald transition-colors">{item.name}</h3>
                <p className="text-slate-400 text-sm mb-8 line-clamp-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {item.desc}
                </p>
                <div className="w-full flex items-center justify-between border-t border-white/5 pt-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Monthly Funding</span>
                    <span className="text-2xl font-display font-bold text-white leading-none mt-1">{item.raised}</span>
                  </div>
                  <div className="h-10 w-px bg-white/5" />
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Verification</span>
                    <span className="text-[10px] font-bold text-brand-emerald mt-1">SECURED ✓</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
