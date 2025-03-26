
import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Apple, Smartphone, Computer } from 'lucide-react';

const IndianSweets: React.FC = () => {
  const { sweets, character, collectSweet, worldPosition, decorations } = useGame();
  const lastCharacterPos = useRef({ x: 0, y: 0 });
  const [showHitboxes, setShowHitboxes] = useState(false);
  const [collectedSweets, setCollectedSweets] = useState<{[id: string]: boolean}>({});
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'h') {
        setShowHitboxes(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Tech company logos for buildings
  const renderBuildingLogos = () => {
    return decorations
      .filter(d => ['temple', 'mosque', 'gurudwara', 'google-temple', 'adobe-temple'].includes(d.type))
      .map((building, index) => {
        if (!building.x || building.x < -building.width || building.x > window.innerWidth + 100) {
          return null;
        }

        let LogoComponent;
        let logoPosition;
        const baseLogoSize = 24;
        
        switch(index % 3) {
          case 0:
            LogoComponent = <Apple className="text-white/70" size={baseLogoSize} />;
            break;
          case 1:
            LogoComponent = <Computer className="text-white/70" size={baseLogoSize} />;
            break;
          case 2:
            LogoComponent = <Smartphone className="text-white/70" size={baseLogoSize} />;
            break;
          default:
            LogoComponent = <Apple className="text-white/70" size={baseLogoSize} />;
        }
        
        const yOffset = building.type === 'google-temple' || building.type === 'adobe-temple' ? 
          building.height * 0.7 : building.height * 0.5;
        
        logoPosition = {
          left: `${building.x + (building.width / 2) - (baseLogoSize / 2)}px`,
          top: `${building.y + yOffset}px`,
          zIndex: 7
        };
        
        return (
          <div key={`logo-${building.id}`} className="absolute" style={logoPosition}>
            <div className="bg-black/30 p-1 rounded-full backdrop-blur-sm">
              {LogoComponent}
            </div>
          </div>
        );
      });
  };

  useEffect(() => {
    const checkCollisions = () => {
      const currentPos = { x: character.x, y: character.y };
      
      sweets.forEach(sweet => {
        if (sweet.collected || collectedSweets[sweet.id]) return;
        
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
      {renderBuildingLogos()}
      
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
