import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  Timestamp,
  doc,
  deleteDoc
} from "firebase/firestore";
import { 
  LogOut, Search, Database, Mail, Activity, 
  Users, Radio, Zap, Trash2, ShieldCheck 
} from 'lucide-react';

interface PlayerData {
  id: string;
  name: string;
  email: string;
  score: number;
  timestamp?: any;
}

interface ActiveSession {
  id: string;
  name: string;
  email: string;
  lastActive: any;
}

export default function AdminDashboard({ onExit }: { onExit?: () => void }) {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [activeUsers, setActiveUsers] = useState<ActiveSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  // --- DELETE HANDLER ---
  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `CRITICAL_ACTION: Are you sure you want to purge the records for [${name}]? This action cannot be undone.`
    );
    
    if (confirmed) {
      try {
        await deleteDoc(doc(db, "submissions", id));
        // The real-time listener (onSnapshot) will handle updating the UI automatically
      } catch (error) {
        console.error("Purge failed:", error);
        alert("ACCESS_DENIED: System failed to delete record.");
      }
    }
  };

  useEffect(() => {
    setIsSyncing(true);

    // 1. SYNC COMPLETED SUBMISSIONS (Leaderboard)
    const qSubmissions = query(collection(db, "submissions"));
    const unsubSubmissions = onSnapshot(qSubmissions, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as PlayerData[];
      
      // Sort: Highest score first, then most recent
      data.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return (b.timestamp?.toMillis() || 0) - (a.timestamp?.toMillis() || 0);
      });
      
      setPlayers(data);
      setLoading(false);
      setIsSyncing(false);
    }, (err) => {
      console.error("Submission Sync Error:", err);
      setIsSyncing(false);
    });

    // 2. SYNC ACTIVE SESSIONS (Live Presence)
    // Filters for users who pinged the server in the last 10 minutes
    const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000);
    const qActive = query(
      collection(db, "active_sessions"),
      where("lastActive", ">", Timestamp.fromDate(tenMinsAgo))
    );
    
    const unsubActive = onSnapshot(qActive, (snapshot) => {
      const active = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as ActiveSession[];
      setActiveUsers(active);
    });

    return () => {
      unsubSubmissions();
      unsubActive();
    };
  }, []);

  const handleLogout = async () => {
    if (window.confirm("TERMINATE_ADMIN_SESSION: Return to login?")) {
      try {
        await auth.signOut();
        if (onExit) onExit();
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  const filteredPlayers = players.filter(p => 
    p.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-[#00FF9D] font-mono">
        <Database className="animate-pulse mb-4" size={48} />
        <span className="uppercase tracking-[0.4em] text-xs">Accessing_Central_Mainframe...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-mono relative overflow-x-hidden">
      {/* Background UI Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(#00FF9D 1px, transparent 1px), linear-gradient(90deg, #00FF9D 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b-2 border-[#00FF9D]/20 pb-8">
          <div>
            <div className="flex items-center gap-2 text-[#FF00E6] mb-2">
              <ShieldCheck size={16} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Encrypted_Admin_Link</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading uppercase tracking-tighter italic">
              Terminal<span className="text-[#00FF9D]">_Control</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-gray-500 uppercase">System_Status</p>
              <p className="text-[#00FF9D] font-bold text-sm tracking-widest flex items-center justify-end gap-2">
                <span className="w-2 h-2 bg-[#00FF9D] rounded-full animate-pulse" /> ONLINE
              </p>
            </div>
            <button onClick={handleLogout} className="group flex items-center gap-3 bg-[#FF00E6] text-white px-6 py-3 border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 transition-all font-bold uppercase text-sm">
              <LogOut size={18} /> Terminate_Session
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR: LIVE UPLINKS */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[#13111C] border-4 border-black p-5 shadow-[6px_6px_0px_rgba(0,0,0,0.5)]">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#00FF9D] mb-4 flex items-center gap-2">
                <Radio size={14} className="animate-pulse" /> Live_Uplinks [{activeUsers.length}]
              </h2>
              <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {activeUsers.length === 0 ? (
                  <p className="text-[10px] text-gray-600 uppercase italic py-4">Scanning for signals...</p>
                ) : (
                  activeUsers.map(u => (
                    <div key={u.id} className="border-l-2 border-[#00FF9D] pl-3 py-1 bg-white/5">
                      <p className="text-xs font-bold text-white uppercase truncate">{u.name}</p>
                      <p className="text-[9px] text-gray-500 truncate">{u.email}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-[#13111C] border-4 border-black p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Mainframe_Stats</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-[11px]"><span className="text-gray-500">AVG_SCORE:</span> <span className="text-[#00FF9D] font-bold">{(players.reduce((a,b)=>a+b.score,0)/(players.length||1)).toFixed(1)}/6</span></div>
                <div className="flex justify-between text-[11px]"><span className="text-gray-500">TOTAL_SUBMISSIONS:</span> <span className="text-white font-bold">{players.length}</span></div>
              </div>
            </div>
          </aside>

          {/* MAIN TABLE: SUBMISSIONS */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-[#181524] border-4 border-black shadow-[10px_10px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="bg-[#2D2440] border-b-4 border-black p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#00FF9D] text-black font-bold px-3 py-1 border-2 border-black transform -rotate-1 text-xs">DATABASE_active</div>
                  <span className="uppercase font-bold tracking-widest text-sm">Submission_Logs</span>
                </div>
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Filter_by_User..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black border-2 border-gray-700 px-10 py-2 outline-none focus:border-[#00FF9D] text-xs font-mono"
                  />
                </div>
              </div>

              <div className="overflow-x-auto max-h-[600px] custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-[#181524] z-20">
                    <tr className="border-b-4 border-black text-gray-400 uppercase text-[10px] tracking-widest">
                      <th className="p-4">User_Email</th>
                      <th className="p-4">Designation</th>
                      <th className="p-4 text-center">Score</th>
                      <th className="p-4 text-center">Timestamp</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-black/30">
                    {filteredPlayers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-20 text-center text-gray-600 uppercase text-xs tracking-[0.3em]">No_Data_Streams_Available</td>
                      </tr>
                    ) : (
                      filteredPlayers.map((p) => (
                        <tr key={p.id} className="hover:bg-[#00FF9D]/5 transition-colors group">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Mail size={12} className="text-[#00FF9D]/50" />
                              <span className="text-xs text-gray-400 font-mono">{p.email}</span>
                            </div>
                          </td>
                          <td className="p-4 font-bold text-[#00FF9D] text-sm uppercase italic">{p.name}</td>
                          <td className="p-4 text-center">
                            <span className={`px-3 py-1 font-heading text-lg border-2 ${p.score >= 5 ? 'border-[#00FF9D] text-[#00FF9D] bg-[#00FF9D]/10' : 'border-gray-800 text-gray-500 bg-black/40'}`}>
                              {p.score}/6
                            </span>
                          </td>
                          <td className="p-4 text-center text-[10px] text-gray-600 font-mono">
                            {p.timestamp?.toDate ? p.timestamp.toDate().toLocaleString() : 'SYNCING...'}
                          </td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => handleDelete(p.id, p.name)}
                              className="p-2 text-gray-600 hover:text-[#FF00E6] transition-all hover:bg-[#FF00E6]/10 rounded"
                              title="Delete Record"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
