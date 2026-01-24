import React from 'react';
import { Gamepad2 } from 'lucide-react';

interface LoadingScreenProps {
  progress: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#13111C]">
      <div className="w-full max-w-md text-center space-y-8 relative">
        
        {/* Animated Icon */}
        <div className="relative w-32 h-32 mx-auto animate-bounce">
            <div className="absolute inset-0 bg-[#FF00E6] rounded-xl transform rotate-6 border-4 border-black"></div>
            <div className="relative bg-[#00FF9D] border-4 border-black rounded-xl w-full h-full flex items-center justify-center shadow-[8px_8px_0px_#000]">
                <Gamepad2 className="w-16 h-16 text-black" />
            </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-4xl font-heading text-white tracking-wider retro-text-shadow uppercase transform -skew-x-6">
            Generating Level
          </h2>
          <div className="inline-block bg-black px-4 py-1 transform skew-x-12">
             <p className="text-[#00FF9D] font-mono text-sm uppercase tracking-widest transform -skew-x-12">
               AI is hallucinating pixels...
             </p>
          </div>
        </div>

        {/* Chunky Progress Bar */}
        <div className="w-full bg-[#1F1B2E] h-8 border-4 border-black p-1 shadow-[4px_4px_0px_#000]">
          <div 
            className="bg-[#FF00E6] h-full transition-all duration-300 ease-out flex items-center justify-end px-2"
            style={{ width: `${Math.max(5, progress)}%` }}
          >
             {/* Stripes texture */}
             <div className="w-full h-full" style={{backgroundImage: "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)", backgroundSize: "1rem 1rem"}}></div>
          </div>
        </div>
        
        <p className="text-xl font-bold text-white font-mono">{Math.round(progress)}%</p>
      </div>
    </div>
  );
};