
import React from 'react';

const FogEffect: React.FC = () => {
  return (
    <div className="fog-container absolute inset-0 z-1 overflow-hidden pointer-events-none">
      <div className="fog-1 absolute w-full h-24 bg-white/10 rounded-full filter blur-xl animate-fog-1"></div>
      <div className="fog-2 absolute w-full h-24 bg-white/10 rounded-full filter blur-xl animate-fog-2"></div>
      <div className="fog-3 absolute w-full h-20 bg-white/5 rounded-full filter blur-xl animate-fog-3"></div>
      
      {/* Additional fog layers for more depth */}
      <div className="absolute w-full h-16 bg-white/8 rounded-full filter blur-xl"
           style={{
             bottom: '40%',
             opacity: '0.15',
             animation: 'fog-move-2 100s linear infinite'
           }}></div>
      <div className="absolute w-full h-16 bg-white/8 rounded-full filter blur-xl"
           style={{
             bottom: '10%',
             opacity: '0.2',
             animation: 'fog-move-3 130s linear infinite'
           }}></div>
    </div>
  );
};

export default FogEffect;
