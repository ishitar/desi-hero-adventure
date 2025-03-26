
import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '@/context/GameContext';

const IndianSweets: React.FC = () => {
  const { sweets, character, collectSweet, worldPosition, decorations } = useGame();
  const lastCharacterPos = useRef({ x: 0, y: 0 });
  const [showHitboxes, setShowHitboxes] = useState(false);
  const [collectedSweets, setCollectedSweets] = useState<{[id: string]: boolean}>({});
  // Track if character is eating to reset glow effect
  const [isEating, setIsEating] = useState(false);
  const eatingTimeoutRef = useRef<number | null>(null);
  
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

  // Tech company logos for buildings using SVG
  const renderBuildingLogos = () => {
    return decorations
      .filter(d => ['temple', 'mosque', 'gurudwara', 'google-temple', 'adobe-temple'].includes(d.type))
      .map((building, index) => {
        if (!building.x || building.x < -building.width || building.x > window.innerWidth + 100) {
          return null;
        }

        let logoSvg;
        let companyName;
        let logoPosition;
        const baseLogoSize = 30; // Increased size for better visibility
        
        // Determine which company to show based on building and index
        if (building.type === 'google-temple') {
          companyName = "Google";
          logoSvg = (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg" className="w-5/6 h-5/6">
                <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
                <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
                <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
                <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
                <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
                <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4"/>
              </svg>
            </div>
          );
        } else if (building.type === 'adobe-temple') {
          companyName = "Adobe";
          logoSvg = (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg" className="w-5/6 h-5/6">
                <path fill="#FA0F00" d="M42.5,0h155v234h-155V0z"/>
                <path fill="#FFF" d="M140.7,132l-20.3,48.2l-20.1-48.2H140.7z M155.9,116.5h-71.6L120,170.3h17.9l44-53.8H155.9z M120,47.9v24h-24.5V47.9H120z M120,95.9V71.9H85.5v24H120z M180.7,47.9v24h-24.7V47.9H180.7z M180.7,95.9V71.9h-34.8v24H180.7z"/>
              </svg>
            </div>
          );
        } else {
          // For other building types, rotate between tech companies
          switch(index % 4) {
            case 0: // Apple logo
              companyName = "Apple";
              logoSvg = (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg" className="w-5/6 h-5/6">
                    <path 
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" 
                      fill="#000"
                    />
                  </svg>
                </div>
              );
              break;
            case 1: // Microsoft logo
              companyName = "Microsoft";
              logoSvg = (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <svg viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" className="w-5/6 h-5/6">
                    <rect x="1" y="1" width="10" height="10" fill="#f25022" />
                    <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
                    <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
                    <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
                  </svg>
                </div>
              );
              break;
            case 2: // Samsung logo
              companyName = "Samsung";
              logoSvg = (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-5/6 h-5/6">
                    <path 
                      d="M236.4 61.4L227 75.5c-21.3 32-59.4 48.5-97.9 42.1l-53-8.8 28.2 49.3c16.8 29.4 16.8 65.6 0 95L75.5 302.3l53-8.8c38.5-6.4 76.6 10.1 97.9 42.1l9.4 14.1 9.4-14.1c21.3-32 59.4-48.5 97.9-42.1l53 8.8-28.2-49.3c-16.8-29.4-16.8-65.6 0-95l28.2-49.3-53 8.8c-38.5 6.4-76.6-10.1-97.9-42.1l-9.4-14.1z" 
                      fill="#1428a0"
                    />
                  </svg>
                </div>
              );
              break;
            case 3: // Meta logo
              companyName = "Meta";
              logoSvg = (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-5/6 h-5/6">
                    <path 
                      d="M256,50C142.23,50,50,142.23,50,256s92.23,206,206,206,206-92.23,206-206S369.77,50,256,50Zm67.66,312.82c-1.28,10.21-10.18,18.07-20.44,18.07H208.49c-10.26,0-19.16-7.86-20.44-18.07l-37.79-302.38c-1.66-13.32,8.88-25.04,22.24-25.04H339.21c13.36,0,23.9,11.73,22.24,25.04l-37.79,302.38Z" 
                      fill="#0668E1"
                    />
                  </svg>
                </div>
              );
              break;
            default:
              companyName = "Tech Co";
              logoSvg = (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-5/6 h-5/6">
                    <rect x="128" y="128" width="256" height="256" fill="#007bff" />
                  </svg>
                </div>
              );
          }
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
            {/* Logo Container */}
            <div className="relative">
              {/* Logo Circle */}
              <div className="bg-white/80 p-1.5 rounded-full backdrop-blur-sm flex items-center justify-center shadow-lg border border-gray-300" 
                   style={{ width: `${baseLogoSize}px`, height: `${baseLogoSize}px` }}>
                {logoSvg}
              </div>
              
              {/* Company Name Label */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap backdrop-blur-sm shadow">
                {companyName}
              </div>
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
            
            // Set eating state and clear any existing timeout
            setIsEating(true);
            if (eatingTimeoutRef.current) {
              window.clearTimeout(eatingTimeoutRef.current);
            }
            
            // Reset eating state after 1.5 seconds
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
