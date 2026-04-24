import { motion } from "motion/react";
import { ClipboardCheck, CalendarRange, Sparkles, Trophy, Heart } from "lucide-react";

const steps = [
  {
    icon: <ClipboardCheck className="text-brand-indigo" size={32} />,
    title: "1. Enter Your Score",
    text: "Log your performance results after every round. Your consistency builds your profile and your legacy."
  },
  {
    icon: <CalendarRange className="text-brand-purple" size={32} />,
    title: "2. Earn Draw Entries",
    text: "Each score entered is a ticket into our monthly prize pools. More play equals more opportunity."
  },
  {
    icon: <Sparkles className="text-brand-neon" size={32} />,
    title: "3. Monthly Draw Happens",
    text: "Our transparent draw engine matches players with life-changing rewards every single month."
  },
  {
    icon: <Trophy className="text-brand-indigo" size={32} />,
    title: "4. Win Rewards",
    text: "Match numbers to win rewards from $50 up to $50,000 in instant cash payouts."
  },
  {
    icon: <Heart className="text-brand-emerald" size={32} />,
    title: "5. Your Play Funds Charity",
    text: "10% of your membership directly fuels verified charities. Your joy creates their hope."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 md:px-12 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight text-white">From Play to <span className="text-gradient-shimmer italic">Impact.</span></h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">A clear journey from the first tee to a global difference.</p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/[0.03] border border-white/5 backdrop-blur-md p-6 rounded-[32px] flex flex-col items-center text-center gap-6 group transition-all hover:bg-white/[0.05] relative z-10"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg relative">
                  <div className="absolute inset-0 bg-brand-indigo/5 blur-xl group-hover:bg-brand-indigo/10 transition-colors" />
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-xs">
                    {step.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
