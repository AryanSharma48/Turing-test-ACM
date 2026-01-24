import React, { useEffect, useState } from 'react';
import { getScores, clearScores, TeamScore } from '../services/storageService';
import { Trophy, RefreshCw, LogOut, Trash2 } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [scores, setScores] = useState<TeamScore[]>([]);

  const loadScores = () => {
    setScores(getScores());
  };

  useEffect(() => {
    loadScores();
  }, []);

  const handleClear = () => {
    if (confirm("WARNING: This will wipe all team data from the database. Are you sure?")) {
      clearScores();
      loadScores();
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center custom-scrollbar">
      <div className="w-full max-w-4xl relative z-10 animate-in fade-in duration-500">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-[#1F1B2E] p-6 border-4 border-black shadow-[8px_8px_0px_#000]">
          <div className="flex items-center gap-4">
             <div className="bg-[#FF00E6] p-3 border-2 border-black">
                <Trophy className="w-8 h-8 text-black" />
             </div>
             <div>
               <h2 className="text-3xl font-heading text-white retro-text-shadow">ADMIN CONSOLE</h2>
               <p className="font-mono text-[#00FF9D] text-xs uppercase tracking-widest">Global Leaderboard Access</p>
             </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={loadScores}
              className="p-3 bg-black border-2 border-[#00FF9D] text-[#00FF9D] hover:bg-[#00FF9D] hover:text-black transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={20} />
            </button>
            <button 
              onClick={handleClear}
              className="p-3 bg-black border-2 border-[#FF2E2E] text-[#FF2E2E] hover:bg-[#FF2E2E] hover:text-white transition-colors"
              title="Wipe Database"
            >
              <Trash2 size={20} />
            </button>
            <button 
              onClick={onLogout}
              className="px-6 py-3 bg-[#FF2E2E] text-white font-heading uppercase border-2 border-black hover:bg-[#d90000] flex items-center gap-2"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="game-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono">
              <thead className="bg-black text-gray-400 uppercase text-xs tracking-wider">
                <tr>
                  <th className="p-4 border-b-2 border-gray-800">Rank</th>
                  <th className="p-4 border-b-2 border-gray-800">Team Name</th>
                  <th className="p-4 border-b-2 border-gray-800">Score</th>
                  <th className="p-4 border-b-2 border-gray-800 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {scores.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500 italic">
                      No data records found in the system.
                    </td>
                  </tr>
                ) : (
                  scores.map((score, index) => (
                    <tr key={`${score.teamName}-${score.timestamp}`} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-[#FF00E6]">
                        #{index + 1}
                      </td>
                      <td className="p-4 font-bold text-white uppercase">
                        {score.teamName}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-bold border border-current rounded ${
                          score.score === 5 ? 'text-[#00FF9D] border-[#00FF9D]' : 
                          score.score >= 3 ? 'text-yellow-400 border-yellow-400' : 
                          'text-[#FF2E2E] border-[#FF2E2E]'
                        }`}>
                          {score.score} / 5
                        </span>
                      </td>
                      <td className="p-4 text-right text-gray-500 text-xs">
                        {new Date(score.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4 text-center">
           <p className="text-[#00FF9D] font-mono text-xs uppercase animate-pulse">
             System Status: Monitoring Live Feeds...
           </p>
        </div>
      </div>
    </div>
  );
};