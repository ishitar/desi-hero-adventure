
import React from 'react';

const Torches: React.FC = () => {
  // Add more torch positions, including some near the temple
  const torchPositions = [
    { left: '20%', bottom: '22%' },
    { left: '40%', bottom: '22%' },
    { left: '60%', bottom: '22%' },
    { left: '80%', bottom: '22%' },
    // Temple torches (positioned differently)
    { left: '49%', bottom: '25%' }, // temple entrance left
    { left: '51%', bottom: '25%' }, // temple entrance right
    { left: '30%', bottom: '30%' }, // near fruit stall
  ];
  
  return (
    <div className="torches-container absolute inset-0 z-8 pointer-events-none">
      {torchPositions.map((pos, index) => (
        <div key={index} className="torch absolute" style={{ left: pos.left, bottom: pos.bottom }}>
          <div className="torch-handle w-3 h-10 bg-amber-800 rounded-b-sm"></div>
          <div className="torch-flame absolute -top-6 left-1/2 -translate-x-1/2 w-5 h-7">
            <div className="flame-outer w-full h-full bg-orange-500 rounded-full animate-flame-outer"></div>
            <div className="flame-inner absolute w-3/4 h-3/4 bg-yellow-300 rounded-full top-1/4 left-1/2 -translate-x-1/2 animate-flame-inner"></div>
            <div className="flame-glow absolute w-12 h-12 rounded-full bg-orange-500/30 filter blur-md -inset-2 animate-glow"></div>
          </div>
          
          {/* Add smoke effect */}
          <div className="smoke-particles absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-10 opacity-0">
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i}
                className="smoke-particle absolute w-2 h-2 bg-gray-200/10 rounded-full"
                style={{
                  left: `${i * 30}%`,
                  top: '0',
                  animation: `smoke ${2 + i * 0.5}s ease-out infinite ${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Add shadows on the ground */}
          <div 
            className="shadow absolute w-16 h-4 bg-black/20 rounded-full blur-sm"
            style={{ 
              bottom: '-1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'shadow-flicker 2s infinite alternate'
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Torches;
