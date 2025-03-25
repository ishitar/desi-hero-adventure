
import React from 'react';

const Torches: React.FC = () => {
  const torchPositions = [
    { left: '20%', bottom: '22%' },
    { left: '40%', bottom: '22%' },
    { left: '60%', bottom: '22%' },
    { left: '80%', bottom: '22%' },
  ];
  
  return (
    <div className="torches-container absolute inset-0 z-8 pointer-events-none">
      {torchPositions.map((pos, index) => (
        <div key={index} className="torch absolute" style={{ left: pos.left, bottom: pos.bottom }}>
          <div className="torch-handle w-3 h-10 bg-amber-800 rounded-b-sm"></div>
          <div className="torch-flame absolute -top-6 left-1/2 -translate-x-1/2 w-5 h-7">
            <div className="flame-outer w-full h-full bg-orange-500 rounded-full animate-flame-outer"></div>
            <div className="flame-inner absolute w-3/4 h-3/4 bg-yellow-300 rounded-full top-1/4 left-1/2 -translate-x-1/2 animate-flame-inner"></div>
            <div className="flame-glow absolute w-10 h-10 rounded-full bg-orange-500/30 filter blur-md -inset-2 animate-glow"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Torches;
