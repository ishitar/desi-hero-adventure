import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '@/context/GameContext';

const IndianSweets: React.FC = () => {
  const { sweets, character, collectSweet, worldPosition } = useGame();
  const lastCharacterPos = useRef({ x: 0, y: 0 });
  const [showHitboxes, setShowHitboxes] = useState(false);
  const [collectedSweets, setCollectedSweets] = useState<{[id: string]: boolean}>({});
  const [isEating, setIsEating] = useState(false);
  const eatingTimeoutRef = useRef<number | null>(null);
  const [visibleSweets, setVisibleSweets] = useState<typeof sweets>([]);
  
  useEffect(() => {
    const updateVisibleSweets = () => {
      const screenWidth = window.innerWidth;
      
      // Filter sweets that are within the visible area with some buffer
      const updatedVisibleSweets = sweets.filter(sweet => {
        // Remove parallax factor, use direct position
        const adjustedX = sweet.x - worldPosition.current;
        
        // Only render sweets that are close to the visible area
        return adjustedX > -100 && adjustedX < screenWidth + 100;
      });
      
      setVisibleSweets(updatedVisibleSweets);
    };
    
    const animationFrame = requestAnimationFrame(updateVisibleSweets);
    return () => cancelAnimationFrame(animationFrame);
  }, [sweets, worldPosition]);
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'h') {
        setShowHitboxes(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (eatingTimeoutRef.current) {
        window.clearTimeout(eatingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkCollisions = () => {
      const currentPos = { x: character.x, y: character.y };
      
      sweets.forEach(sweet => {
        if (sweet.collected || collectedSweets[sweet.id]) return;
        
        // Remove parallax factor, use direct position
        const adjustedX = sweet.x - worldPosition.current;
        
        const baseBuffer = 30; 
        const characterBuffer = character.jumping ? baseBuffer * 2 : baseBuffer;
        
        const characterHitbox = {
          left: Math.min(lastCharacterPos.current.x, character.x) - characterBuffer,
          right: Math.max(lastCharacterPos.current.x, character.x) + character.width + characterBuffer,
          top: Math.min(lastCharacterPos.current.y, character.y) - characterBuffer,
          bottom: Math.max(lastCharacterPos.current.y, character.y) + character.height + characterBuffer
        };
        
        let sweetBuffer = baseBuffer * 1.5;
        if (['ladoo', 'jalebi'].includes(sweet.type)) {
          sweetBuffer *= 2.5;
        } else if (sweet.type === 'vadapav') {
          sweetBuffer *= 2;
        }
        
        const sweetHitbox = {
          left: adjustedX - sweetBuffer,
          right: adjustedX + sweet.width + sweetBuffer,
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
          Math.abs(characterHitbox.top - sweetHitbox.bottom) < baseBuffer * 4;
        
        const isJumpingDown = character.jumping && lastCharacterPos.current.y < character.y;
        const downwardCheck = isJumpingDown && 
          Math.abs(characterHitbox.bottom - sweetHitbox.top) < baseBuffer * 3;
        
        if ((horizontalOverlap && verticalOverlap) || 
            (horizontalOverlap && extraVerticalCheck) || 
            (horizontalOverlap && downwardCheck)) {
          if (!sweet.collected) {
            setCollectedSweets(prev => ({...prev, [sweet.id]: true}));
            collectSweet(sweet.id);
            console.log(`Collected ${sweet.type} at x:${sweet.x}, y:${sweet.y}`);
            
            setIsEating(true);
            if (eatingTimeoutRef.current) {
              window.clearTimeout(eatingTimeoutRef.current);
            }
            
            const timeoutId = window.setTimeout(() => {
              setIsEating(false);
            }, 1500);
            
            eatingTimeoutRef.current = timeoutId;
          }
        }
      });
      
      lastCharacterPos.current = currentPos;
      
      requestAnimationFrame(checkCollisions);
    };

    const animationId = requestAnimationFrame(checkCollisions);
    return () => cancelAnimationFrame(animationId);
  }, [character, sweets, collectSweet, worldPosition]);

  return (
    <div className="sweets-container">
      {visibleSweets.map(sweet => {
        if (sweet.collected) {
          return (
            <div 
              key={sweet.id}
              className="sweet animate-scale-out" 
              style={{
                position: 'absolute',
                left: `${sweet.x - worldPosition.current}px`,
                top: `${sweet.y}px`,
                width: `${sweet.width}px`,
                height: `${sweet.height}px`,
                zIndex: 5,
                opacity: 0.7,
                transition: 'all 0.3s ease-out',
                animation: 'scale-out 0.3s forwards'
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full bg-yellow-300 rounded-full animate-ping"></div>
              </div>
            </div>
          );
        }
        
        // Remove parallax factor, use direct position
        const adjustedX = sweet.x - worldPosition.current;
        const sweetY = sweet.y;
        
        const sweetStyles: React.CSSProperties = {
          position: 'absolute',
          left: `${adjustedX}px`,
          top: `${sweetY}px`,
          width: `${sweet.width}px`,
          height: `${sweet.height}px`,
          zIndex: 5,
          transform: `rotate(${Math.floor(Math.random() * 360)}deg)`
        };
        
        let hitboxStyles: React.CSSProperties | undefined;
        if (showHitboxes) {
          const baseBuffer = 30;
          let sweetBuffer = baseBuffer * 1.5;
          
          if (['ladoo', 'jalebi'].includes(sweet.type)) {
            sweetBuffer *= 2.5;
          } else if (sweet.type === 'vadapav') {
            sweetBuffer *= 2;
          }
          
          hitboxStyles = {
            position: 'absolute',
            left: `${adjustedX - sweetBuffer}px`,
            top: `${sweetY - sweetBuffer}px`,
            width: `${sweet.width + (sweetBuffer * 2)}px`,
            height: `${sweet.height + (sweetBuffer * 2)}px`,
            border: '1px dashed rgba(255, 0, 0, 0.5)',
            zIndex: 4
          };
        }
        
        return (
          <React.Fragment key={sweet.id}>
            {showHitboxes && hitboxStyles && <div style={hitboxStyles} />}
            <div
              className={`sweet animate-floating-sweet shadow-glow ${sweet.collected ? 'opacity-50' : ''}`}
              style={sweetStyles}
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
          </React.Fragment>
        );
      })}
      
      {showHitboxes && (
        <div style={{
          position: 'absolute',
          left: `${character.x - 30}px`,
          bottom: character.jumping ? '35%' : '20%',
          width: `${character.width + 60}px`,
          height: `${character.height + 60}px`,
          border: '1px dashed rgba(0, 255, 0, 0.5)',
          zIndex: 4
        }} />
      )}
    </div>
  );
};

export default IndianSweets;
