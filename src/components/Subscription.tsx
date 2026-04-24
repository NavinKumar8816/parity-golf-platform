import { motion } from "motion/react";
import { Check, Zap, Heart } from "lucide-react";

const plans = [
  {
    name: "Basic Access",
    price: "$19",
    period: "/mo",
    features: [
      "1 Entry per score logged",
      "Standard draw access",
      "Real-time tracking",
      "10% Charity contribution",
      "Community dashboard"
    ],
    cta: "Start Basic",
    highlight: false,
    color: "brand-indigo"
  },
  {
    name: "Pro Performance",
    price: "$49",
    period: "/mo",
    features: [
      "3 Entries per score logged",
      "Priority draw matching",
      "Verified performance badge",
      "Premium reward access",
      "Dedicated impact reports"
    ],
    cta: "Upgrade to Pro",
    highlight: true,
    badge: "Most Popular",
    color: "brand-purple"
  },
  {
    name: "Elite Legacy",
    price: "$99",
    period: "/mo",
    features: [
      "10 Entries per score logged",
      "VIP Draw pool access",
      "Personal concierge support",
      "Exclusive partner events",
      "Direct charity selection"
    ],
    cta: "Become Elite",
    highlight: false,
    color: "brand-emerald"
  }
];

export default function Subscription() {
  return (
    <section id="pricing" className="py-32 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-indigo/5 blur-[160px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4 text-white">Elevate Your Game. <span className="text-gradient-shimmer italic">Scale Your Impact.</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Choose a plan that matches your passion for performance and your commitment to a better world.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-[48px] p-8 flex flex-col transition-all duration-500 overflow-hidden ${
                plan.highlight 
                  ? "bg-gradient-to-b from-brand-indigo/10 to-transparent border border-brand-indigo/30 backdrop-blur-xl scale-105 shadow-2xl shadow-brand-indigo/20 z-20" 
                  : "bg-white/[0.03] border border-white/5 backdrop-blur-md"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 py-4 px-12 bg-brand-indigo text-white text-[9px] font-bold uppercase tracking-[0.2em] rotate-45 translate-x-[35%] -translate-y-[15%] shadow-lg">
                  {plan.badge}
                </div>
              )}

              <div className="mb-8">
                <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${plan.highlight ? "text-brand-indigo" : "text-slate-500"}`}>
                  {plan.name}
                </span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-display font-bold text-white tracking-tighter">{plan.price}</span>
                  <span className="text-sm font-medium text-slate-500">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <div className={`p-1 rounded-full ${plan.highlight ? "bg-brand-indigo/20 text-brand-indigo" : "bg-white/5 text-slate-500"}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className={`text-sm font-medium ${plan.highlight ? "text-slate-300" : "text-slate-400"}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`group relative w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all overflow-hidden ${
                plan.highlight 
                  ? "bg-brand-indigo text-white hover:bg-brand-indigo/90" 
                  : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
              }`}>
                {plan.highlight && (
                  <div className="absolute inset-0 shimmer-bg opacity-30 pointer-events-none" />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {plan.highlight && <Zap size={18} fill="currentColor" />}
                  {plan.cta}
                </span>
              </button>

              <p className="mt-6 text-center text-[9px] text-slate-600 uppercase tracking-widest font-bold">
                Cancel Anytime • Next Draw in 4 days
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 glass p-8 rounded-[40px] border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center text-brand-emerald">
              <Heart size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase tracking-widest text-xs">Direct Charity Funding</h4>
              <p className="text-[10px] text-slate-500 font-medium">10% of every membership plan is distributed to verified global NGOs.</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all"
          >
            Learn about distribution
          </motion.button>
        </div>
      </div>
    </section>
  );
}
