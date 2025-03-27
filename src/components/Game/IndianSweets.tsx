
import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '@/context/GameContext';

const IndianSweets: React.FC = () => {
  const { sweets, character, collectSweet, worldPosition } = useGame();
  const lastCharacterPos = useRef({ x: 0, y: 0 });
  const [showHitboxes, setShowHitboxes] = useState(false);
  const [collectedSweets, setCollectedSweets] = useState<{[id: string]: boolean}>({});
  // Track if character is eating to reset glow effect
  const [isEating, setIsEating] = useState(false);
  const eatingTimeoutRef = useRef<number | null>(null);
  // Track recently collected sweets to prevent duplicate collection events
  const recentlyCollectedRef = useRef<Set<string>>(new Set());
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'h') {
        setShowHitboxes(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      // Clean up timeout on component unmount
      if (eatingTimeoutRef.current) {
        window.clearTimeout(eatingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkCollisions = () => {
      const currentPos = { x: character.x, y: character.y };
      
      sweets.forEach(sweet => {
        if (sweet.collected || collectedSweets[sweet.id] || recentlyCollectedRef.current.has(sweet.id)) return;
        
        // Increase hitbox during jump for all sweet types
        const baseBuffer = 30; 
        // Significantly larger buffer when jumping to make it easier to collect sweets
        const characterBuffer = character.jumping ? baseBuffer * 3 : baseBuffer;
        
        // Calculate character hitbox (enlarged when jumping)
        const characterHitbox = {
          left: Math.min(lastCharacterPos.current.x, character.x) - characterBuffer,
          right: Math.max(lastCharacterPos.current.x, character.x) + character.width + characterBuffer,
          top: Math.min(lastCharacterPos.current.y, character.y) - characterBuffer * 2, // Extra vertical buffer
          bottom: Math.max(lastCharacterPos.current.y, character.y) + character.height + characterBuffer
        };
        
        // Adjust sweet buffer based on type
        let sweetBuffer = baseBuffer * 1.5;
        if (['ladoo', 'jalebi'].includes(sweet.type)) {
          sweetBuffer *= 2.5;
        } else if (sweet.type === 'vadapav') {
          sweetBuffer *= 2;
        } else if (sweet.type === 'dhokla') {
          // Increase the hitbox specifically for dhokla
          sweetBuffer *= 3.5;
        }
        
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
        
        // Handle jumping collision with improved detection
        const isJumpingUp = character.jumping && lastCharacterPos.current.y > character.y;
        const extraVerticalCheck = isJumpingUp && 
          Math.abs(characterHitbox.top - sweetHitbox.bottom) < baseBuffer * 5;
        
        const isJumpingDown = character.jumping && lastCharacterPos.current.y < character.y;
        const downwardCheck = isJumpingDown && 
          Math.abs(characterHitbox.bottom - sweetHitbox.top) < baseBuffer * 4;
        
        // Special check for dhokla during jumps since it's harder to collect
        const isDhoklaJumpCheck = sweet.type === 'dhokla' && character.jumping && 
          Math.abs(characterHitbox.top - sweetHitbox.bottom) < baseBuffer * 6;
        
        if ((horizontalOverlap && verticalOverlap) || 
            (horizontalOverlap && extraVerticalCheck) || 
            (horizontalOverlap && downwardCheck) ||
            (horizontalOverlap && isDhoklaJumpCheck)) {
          if (!sweet.collected) {
            // Mark the sweet as collected locally
            setCollectedSweets(prev => ({...prev, [sweet.id]: true}));
            
            // Add to recently collected set to prevent duplicates
            recentlyCollectedRef.current.add(sweet.id);
            
            // Collect sweet in the game context - pass the actual sweet type!
            collectSweet(sweet.id, sweet.type);
            console.log(`Collected ${sweet.type} at x:${sweet.x}, y:${sweet.y}`);
            
            // Set eating state and clear any existing timeout
            setIsEating(true);
            if (eatingTimeoutRef.current) {
              window.clearTimeout(eatingTimeoutRef.current);
            }
            
            // Reset eating state after 2 seconds
            const timeoutId = window.setTimeout(() => {
              setIsEating(false);
              // After the eating animation completes, remove the sweet from recently collected
              // This allows for a pause between collections
              setTimeout(() => {
                recentlyCollectedRef.current.delete(sweet.id);
              }, 500);
            }, 2000);
            
            eatingTimeoutRef.current = timeoutId;
          }
        }
      });
      
      lastCharacterPos.current = currentPos;
      
      requestAnimationFrame(checkCollisions);
    };

    const animationId = requestAnimationFrame(checkCollisions);
    return () => cancelAnimationFrame(animationId);
  }, [character, sweets, collectSweet]);

  return (
    <div className="sweets-container">
      {sweets.map(sweet => {
        if (sweet.collected) {
          return (
            <div 
              key={sweet.id}
              className="sweet animate-scale-out" 
              style={{
                position: 'absolute',
                left: `${sweet.x}px`,
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
        
        const sweetY = sweet.y;
        const isInViewport = sweet.x > -100 && sweet.x < window.innerWidth + 100;
        
        if (!isInViewport) return null;
        
        const sweetStyles: React.CSSProperties = {
          position: 'absolute',
          left: `${sweet.x}px`,
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
          } else if (sweet.type === 'dhokla') {
            sweetBuffer *= 3.5;
          }
          
          hitboxStyles = {
            position: 'absolute',
            left: `${sweet.x - sweetBuffer}px`,
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
