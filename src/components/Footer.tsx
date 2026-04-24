import { motion } from "motion/react";
import { Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-center md:text-left">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-8 justify-center md:justify-start">
              <div className="w-8 h-8 bg-gradient-to-tr from-brand-indigo to-brand-purple rounded-lg flex items-center justify-center font-display font-bold text-sm shadow-indigo-500/10 shadow-lg">
                PI
              </div>
              <span className="font-display font-bold text-xl tracking-tight uppercase text-white">Parity</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              The premium performance destination for the modern athlete who values scale and impact in equal measure.
            </p>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-white text-slate-400 hover:text-black transition-all">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-slate-500">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">Performance Logic</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Platform Intelligence</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Draw Mathematics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Membership Tiers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-slate-500">Philanthropy</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">Governance Model</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Transparency Index</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Global Partners</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contribution Portal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-slate-500">HQ</h4>
            <ul className="space-y-4 text-sm text-slate-500 mb-8">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Mail size={16} />
                <span>concierge@parityimpact.com</span>
              </li>
            </ul>
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl text-center backdrop-blur-sm">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-2">Subscribe To Intelligence</div>
              <input 
                type="text" 
                placeholder="Email address"
                className="w-full bg-transparent border-b border-white/10 py-2 text-xs focus:outline-none focus:border-brand-indigo transition-all placeholder:text-slate-700"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-12 gap-8">
          <div className="flex items-center gap-8 text-[10px] uppercase font-bold tracking-widest text-slate-700">
            <span>© 2026 Parity Impact</span>
            <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms of Governance</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-2 w-2 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-600">Enterprise Systems Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
