import { motion } from "motion/react";
import { User, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-full">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-brand-indigo to-brand-purple rounded-lg flex items-center justify-center font-display font-bold text-sm shadow-lg shadow-brand-indigo/20">
            PI
          </div>
          <span className="font-display font-bold text-xl tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Parity</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">Platform</a>
          <a href="#charity" className="hover:text-white transition-colors">Philanthropy</a>
          <a href="#draw" className="hover:text-white transition-colors">Rewards</a>
          <a href="#pricing" className="hover:text-white transition-colors">Subscription</a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-slate-200 transition-all shadow-xl shadow-white/5"
          >
            <User size={16} />
            <span>Enter Platform</span>
          </Link>
          
          <button className="md:hidden p-2 text-white/70">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
