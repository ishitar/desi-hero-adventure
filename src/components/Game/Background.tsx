
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Sky gradient is handled by the game-canvas class */}
      
      {/* Mountains/Hills in the distance */}
      <div className="absolute bottom-[20%] w-full h-[20%]">
        <div className="absolute w-full h-full" style={{ 
          backgroundImage: 'linear-gradient(to bottom right, #8C6D46, #A08562)',
          clipPath: 'polygon(0% 100%, 15% 60%, 33% 100%, 45% 70%, 60% 100%, 80% 50%, 100% 100%)' 
        }}></div>
      </div>
      
      {/* Clouds */}
      <div className="absolute left-[10%] top-[15%] w-20 h-10 bg-white/70 rounded-full animate-float"></div>
      <div className="absolute left-[30%] top-[10%] w-24 h-12 bg-white/70 rounded-full animate-float" style={{ animationDelay: '-1s' }}></div>
      <div className="absolute left-[60%] top-[20%] w-20 h-8 bg-white/70 rounded-full animate-float" style={{ animationDelay: '-2s' }}></div>
      <div className="absolute left-[80%] top-[15%] w-16 h-8 bg-white/70 rounded-full animate-float" style={{ animationDelay: '-3s' }}></div>
      
      {/* Sun */}
      <div className="absolute right-[10%] top-[10%] w-16 h-16 bg-game-yellow rounded-full animate-pulse-gentle"></div>
      
      {/* Background decorations */}
      <div className="absolute bottom-[20%] left-[5%] w-8 h-16 bg-green-600 rounded-t-full"></div>
      <div className="absolute bottom-[20%] left-[8%] w-6 h-12 bg-green-700 rounded-t-full"></div>
      <div className="absolute bottom-[20%] left-[12%] w-8 h-14 bg-green-600 rounded-t-full"></div>
      
      <div className="absolute bottom-[20%] right-[15%] w-8 h-16 bg-green-600 rounded-t-full"></div>
      <div className="absolute bottom-[20%] right-[18%] w-6 h-12 bg-green-700 rounded-t-full"></div>
      <div className="absolute bottom-[20%] right-[22%] w-8 h-14 bg-green-600 rounded-t-full"></div>
    </div>
  );
};

export default Background;
