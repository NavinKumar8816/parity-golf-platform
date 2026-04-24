import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Calendar, 
  Shield, 
  UserX, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Edit,
  AlertTriangle,
  Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';

interface AdminUser {
  id: string;
  email: string;
  is_subscribed: boolean;
  role: string;
  created_at: string;
  last_login?: string;
  is_flagged?: boolean;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    // In a real app with profiles table
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (data) {
            // Mapping for demo if real table isn't fully populated with emails
            setUsers(data.map(u => ({
                id: u.id,
                email: u.email || `user_${u.id.slice(0,5)}@example.com`,
                is_subscribed: u.is_subscribed || false,
                role: u.role || 'User',
                created_at: u.created_at,
                is_flagged: u.is_flagged || false
            })));
        }
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const toggleFlag = async (user: AdminUser) => {
    const { error } = await supabase
        .from('profiles')
        .update({ is_flagged: !user.is_flagged })
        .eq('id', user.id);
    
    if (!error) {
        setUsers(users.map(u => u.id === user.id ? { ...u, is_flagged: !u.is_flagged } : u));
    }
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage platform members, subscriptions and access levels.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl w-full md:w-80">
            <Search size={18} className="text-slate-500" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by email or ID..." 
              className="bg-transparent border-none text-sm focus:ring-0 placeholder:text-slate-600 w-full"
            />
          </div>
          <button className="p-2.5 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0d0d0f] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-6 text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Member</th>
                <th className="px-8 py-6 text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Tier</th>
                <th className="px-8 py-6 text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Joined</th>
                <th className="px-8 py-6 text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-8 py-6 border-b border-white/5">
                      <div className="h-12 bg-white/5 rounded-2xl w-full" />
                    </td>
                  </tr>
                ))
              ) : filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-white/[0.01] transition-all border-b border-white/5 last:border-0">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center text-slate-400 font-bold group-hover:border-brand-indigo/30 transition-all">
                        {user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          {user.email}
                          {user.is_flagged && <AlertTriangle size={14} className="text-red-500" />}
                        </div>
                        <div className="text-[10px] text-slate-600 font-mono mt-0.5 tracking-tight">ID: {user.id.slice(0, 12)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {user.is_subscribed ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-emerald/10 text-brand-emerald rounded-full text-[9px] font-black uppercase tracking-widest border border-brand-emerald/20">
                        <CheckCircle2 size={10} /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-500/10 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/5">
                        <UserX size={10} /> Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    {user.is_subscribed ? (
                      <span className="flex items-center gap-2 text-xs font-bold text-white">
                        <Crown size={14} className="text-yellow-500 fill-yellow-500/20" /> Pro
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-600">Standard</span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-300">{new Date(user.created_at).toLocaleDateString()}</span>
                      <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">at {new Date(user.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-brand-indigo transition-all">
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => toggleFlag(user)}
                        className={`p-2 hover:bg-white/5 rounded-xl transition-all ${user.is_flagged ? 'text-red-500' : 'text-slate-400 hover:text-red-400'}`}
                      >
                        <Shield size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-6 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            Showing <span className="text-slate-300">1 - {filteredUsers.length}</span> of <span className="text-slate-300">{users.length}</span> Members
          </span>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/5 rounded-xl text-slate-500 disabled:opacity-30" disabled>
              <ChevronLeft size={20} />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-xl text-slate-500 disabled:opacity-30" disabled>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
