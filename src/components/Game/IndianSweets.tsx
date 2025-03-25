
import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';

const IndianSweets: React.FC = () => {
  const { sweets, character, collectSweet, worldPosition } = useGame();

  // Check for collision with character
  useEffect(() => {
    const checkCollisions = () => {
      sweets.forEach(sweet => {
        // Skip already collected sweets
        if (sweet.collected) return;
        
        // Improved collision detection that's more forgiving
        const characterHitbox = {
          left: character.x,
          right: character.x + character.width,
          top: character.y,
          bottom: character.y + character.height
        };
        
        const sweetHitbox = {
          left: sweet.x,
          right: sweet.x + sweet.width,
          top: sweet.y,
          bottom: sweet.y + sweet.height
        };
        
        // More generous overlap check - even slight touches count
        const horizontalOverlap = 
          characterHitbox.right >= sweetHitbox.left && 
          characterHitbox.left <= sweetHitbox.right;
          
        const verticalOverlap = 
          characterHitbox.bottom >= sweetHitbox.top && 
          characterHitbox.top <= sweetHitbox.bottom;
        
        // If there's any overlap at all, collect the sweet
        if (horizontalOverlap && verticalOverlap) {
          collectSweet(sweet.id);
        }
      });
    };

    // Check for collisions on each animation frame
    const animationId = requestAnimationFrame(checkCollisions);
    return () => cancelAnimationFrame(animationId);
  }, [character, sweets, collectSweet]);

  return (
    <div className="sweets-container">
      {sweets.map(sweet => {
        if (sweet.collected) return null;
        
        // Calculate a dynamic y position that makes sweets appear only when character jumps
        const sweetY = sweet.y;
        const isInViewport = sweet.x > -100 && sweet.x < window.innerWidth + 100;
        
        if (!isInViewport) return null;
        
        return (
          <div
            key={sweet.id}
            className="sweet animate-floating-sweet shadow-glow"
            style={{
              position: 'absolute',
              left: `${sweet.x}px`,
              top: `${sweetY}px`,
              width: `${sweet.width}px`,
              height: `${sweet.height}px`,
              zIndex: 5,
              transform: `rotate(${Math.floor(Math.random() * 360)}deg)`
            }}
          >
            {sweet.type === 'dhokla' && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full bg-yellow-200 rounded-sm border-2 border-yellow-300 flex items-center justify-center shadow-lg animate-spin-slow">
                  <div className="w-3/4 h-3/4 bg-yellow-100 rounded-sm"></div>
                </div>
              </div>
            )}
            
            {sweet.type === 'mithai' && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full bg-orange-400 rounded-md border-2 border-orange-500 flex items-center justify-center shadow-lg animate-spin-slow">
                  <div className="w-2/3 h-2/3 bg-green-300 rounded-sm"></div>
                </div>
              </div>
            )}
            
            {sweet.type === 'vadapav' && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full bg-yellow-600 rounded-full border-2 border-yellow-700 flex items-center justify-center shadow-lg animate-spin-slow">
                  <div className="w-2/3 h-1/2 bg-amber-800 rounded-sm"></div>
                </div>
              </div>
            )}
            
            {sweet.type === 'jalebi' && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full bg-yellow-500 rounded-full border-2 border-yellow-600 shadow-lg animate-spin-slow" style={{
                  clipPath: 'spiral(circle at center)'
                }}></div>
              </div>
            )}
            
            {sweet.type === 'ladoo' && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full bg-orange-300 rounded-full border-2 border-orange-400 flex items-center justify-center shadow-lg animate-spin-slow">
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
