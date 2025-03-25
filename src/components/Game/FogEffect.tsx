
import React from 'react';

const FogEffect: React.FC = () => {
  return (
    <div className="fog-container absolute inset-0 z-1 overflow-hidden pointer-events-none">
      <div className="fog-1 absolute w-full h-24 bg-white/10 rounded-full filter blur-xl animate-fog-1"></div>
      <div className="fog-2 absolute w-full h-24 bg-white/10 rounded-full filter blur-xl animate-fog-2"></div>
      <div className="fog-3 absolute w-full h-20 bg-white/5 rounded-full filter blur-xl animate-fog-3"></div>
    </div>
  );
};

export default FogEffect;
