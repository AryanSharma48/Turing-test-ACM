import React, { useState } from 'react';
import { ShieldCheck, Users, ArrowRight, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: (teamName: string) => void;
  onAdminLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onAdminLogin }) => {
  const [teamName, setTeamName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple Admin Check
    if (teamName.toLowerCase() === 'admin' && password === 'admin') {
      onAdminLogin();
    } else if (teamName.trim().length > 0) {
      // Regular User Login
      onLogin(teamName);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF00E6] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00FF9D] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="game-card w-full max-w-md p-8 relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-6">
           <div className="bg-black p-4 border-2 border-[#00FF9D] shadow-[4px_4px_0px_#00FF9D]">
              <ShieldCheck className="w-12 h-12 text-[#00FF9D]" />
           </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading text-white mb-2 retro-text-shadow">
            TEAM LOGIN
          </h2>
          <p className="font-mono text-gray-400 text-xs uppercase tracking-widest">
            ACM SigAI Chapter // Identification
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[#00FF9D] font-mono text-xs uppercase tracking-wider">
              Team Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-black border-2 border-gray-700 text-white font-mono focus:border-[#FF00E6] focus:outline-none focus:ring-0 placeholder-gray-600 transition-colors"
                placeholder="ENTER TEAM NAME"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[#00FF9D] font-mono text-xs uppercase tracking-wider">
              Access Code
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-black border-2 border-gray-700 text-white font-mono focus:border-[#FF00E6] focus:outline-none focus:ring-0 placeholder-gray-600 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full game-btn group relative flex justify-center py-4 px-4 border-transparent text-sm font-heading uppercase tracking-widest text-black bg-[#00FF9D] hover:bg-[#00cc7d] focus:outline-none"
          >
            Enter System
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-gray-500 font-mono uppercase">
            Admins: Login with 'admin' / 'admin'
          </p>
        </div>
      </div>
    </div>
  );
};