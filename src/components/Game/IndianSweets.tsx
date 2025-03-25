import React, { useEffect, useRef } from 'react';
import { useGame } from '@/context/GameContext';

const IndianSweets: React.FC = () => {
  const { sweets, character, collectSweet, worldPosition } = useGame();
  const lastCharacterPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkCollisions = () => {
      const currentPos = { x: character.x, y: character.y };
      
      sweets.forEach(sweet => {
        if (sweet.collected) return;
        
        const buffer = 15;
        const characterHitbox = {
          left: Math.min(lastCharacterPos.current.x, character.x) - buffer,
          right: Math.max(lastCharacterPos.current.x, character.x) + character.width + buffer,
          top: Math.min(lastCharacterPos.current.y, character.y) - buffer,
          bottom: Math.max(lastCharacterPos.current.y, character.y) + character.height + buffer
        };
        
        const sweetBuffer = ['ladoo', 'jalebi'].includes(sweet.type) ? buffer * 1.5 : buffer;
        const sweetHitbox = {
          left: sweet.x - sweetBuffer,
          right: sweet.x + sweet.width + sweetBuffer,
          top: sweet.y - sweetBuffer,
          bottom: sweet.y + sweet.height + sweetBuffer
        };
        
        const horizontalOverlap = 
          characterHitbox.right >= sweetHitbox.left && 
          characterHitbox.left <= sweetHitbox.right;
          
        const verticalOverlap = 
          characterHitbox.bottom >= sweetHitbox.top && 
          characterHitbox.top <= sweetHitbox.bottom;
        
        const isJumpingUp = character.jumping && lastCharacterPos.current.y > character.y;
        const extraVerticalCheck = isJumpingUp && 
          Math.abs(characterHitbox.top - sweetHitbox.bottom) < buffer * 2;
        
        if ((horizontalOverlap && verticalOverlap) || (horizontalOverlap && extraVerticalCheck)) {
          collectSweet(sweet.id);
          console.log(`Collected ${sweet.type} at x:${sweet.x}, y:${sweet.y}`);
        }
      });
      
      lastCharacterPos.current = currentPos;
    };

    const animationId = requestAnimationFrame(checkCollisions);
    return () => cancelAnimationFrame(animationId);
  }, [character, sweets, collectSweet]);

  return (
    <div className="sweets-container">
      {sweets.map(sweet => {
        if (sweet.collected) return null;
        
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
