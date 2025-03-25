
import React from 'react';
import { useGame } from '@/context/GameContext';

const IndianSweets: React.FC = () => {
  const { sweets } = useGame();

  return (
    <div className="sweets-container">
      {sweets.map(sweet => {
        if (sweet.collected) return null;
        
        return (
          <div
            key={sweet.id}
            className="sweet animate-floating shadow-glow"
            style={{
              position: 'absolute',
              left: `${sweet.x}px`,
              top: `${sweet.y}px`,
              width: `${sweet.width}px`,
              height: `${sweet.height}px`,
              zIndex: 5
            }}
          >
            {sweet.type === 'dhokla' && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full bg-yellow-200 rounded-sm border-2 border-yellow-300 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-yellow-100 rounded-sm"></div>
                </div>
              </div>
            )}
            
            {sweet.type === 'mithai' && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full bg-orange-400 rounded-md border-2 border-orange-500 flex items-center justify-center">
                  <div className="w-2/3 h-2/3 bg-green-300 rounded-sm"></div>
                </div>
              </div>
            )}
            
            {sweet.type === 'vadapav' && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full bg-yellow-600 rounded-full border-2 border-yellow-700 flex items-center justify-center">
                  <div className="w-2/3 h-1/2 bg-amber-800 rounded-sm"></div>
                </div>
              </div>
            )}
            
            {sweet.type === 'jalebi' && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full bg-yellow-500 rounded-full border-2 border-yellow-600" style={{
                  clipPath: 'circle(50% at 50% 50%)'
                }}></div>
              </div>
            )}
            
            {sweet.type === 'ladoo' && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full bg-orange-300 rounded-full border-2 border-orange-400 flex items-center justify-center">
                  <div className="w-1/2 h-1/2 bg-orange-200 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IndianSweets;
