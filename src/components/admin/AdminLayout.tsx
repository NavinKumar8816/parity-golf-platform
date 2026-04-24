import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  Trophy, 
  Heart, 
  CheckCircle, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { path: '/admin/users', icon: Users, label: 'User Management' },
  { path: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions' },
  { path: '/admin/draws', icon: Trophy, label: 'Draw Management' },
  { path: '/admin/charities', icon: Heart, label: 'Charity' },
  { path: '/admin/winners', icon: CheckCircle, label: 'Winner Verification' },
  { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
];

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#070708] text-slate-200 font-sans flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-64 bg-[#0d0d0f] border-r border-white/5 flex flex-col z-50 fixed lg:relative h-full"
          >
            <div className="p-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-indigo rounded-lg flex items-center justify-center">
                <Trophy className="text-white" size={18} />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">Golf Admin</span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
              <p className="px-4 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-600 mb-4">Main Menu</p>
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                      isActive 
                      ? 'bg-brand-indigo/10 text-brand-indigo' 
                      : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="p-4 border-t border-white/5">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-400/5 transition-all"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Header */}
        <header className="h-20 bg-[#0d0d0f]/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-all"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl w-64">
              <Search size={16} className="text-slate-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none text-xs focus:ring-0 placeholder:text-slate-600 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-white/5 rounded-lg transition-all text-slate-400 hover:text-white">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-indigo rounded-full border-2 border-[#0d0d0f]" />
            </button>
            <div className="h-8 w-px bg-white/5 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white leading-none">Admin Shell</p>
                <p className="text-[10px] text-slate-500 font-medium">System Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-indigo to-brand-purple p-0.5">
                <div className="w-full h-full rounded-[10px] bg-[#0d0d0f] flex items-center justify-center overflow-hidden">
                  <span className="text-xs font-bold text-white">AD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
