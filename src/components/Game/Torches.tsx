
import React, { useRef, useEffect } from 'react';
import { useGame } from '@/context/GameContext';

const Torches: React.FC = () => {
  const { gameState } = useGame();
  const torchesRef = useRef<HTMLDivElement>(null);
  
  // Add parallax scrolling effect for torches to match the background
  useEffect(() => {
    if (!torchesRef.current) return;
    
    const scrollSpeed = 0.9; // Slightly slower than foreground elements but faster than far background
    let animationFrameId: number;
    let scrollPos = 0;
    
    const animateTorches = () => {
      if (gameState !== 'playing') {
        animationFrameId = requestAnimationFrame(animateTorches);
        return;
      }
      
      scrollPos += 3; // Match the speed used in Background.tsx
      
      // Move torches at appropriate speed to match other background elements
      if (torchesRef.current) {
        torchesRef.current.style.transform = `translateX(-${scrollPos * scrollSpeed}px)`;
      }
      
      animationFrameId = requestAnimationFrame(animateTorches);
    };
    
    animateTorches();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState]);

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
    // Add more torches at different positions
    { left: '100%', bottom: '22%' },
    { left: '120%', bottom: '22%' },
    { left: '150%', bottom: '22%' },
    { left: '180%', bottom: '22%' },
  ];
  
  return (
    <div ref={torchesRef} className="torches-container absolute inset-0 z-8 pointer-events-none w-[300%]">
      {torchPositions.map((pos, index) => (
        <div key={index} className="torch absolute" style={{ left: pos.left, bottom: pos.bottom }}>
          <div className="torch-handle w-3 h-10 bg-amber-800 rounded-b-sm"></div>
          <div className="torch-flame absolute -top-6 left-1/2 -translate-x-1/2 w-5 h-7">
            <div className="flame-outer w-full h-full bg-orange-500 rounded-full animate-[flame-flicker_3s_ease-in-out_infinite]"></div>
            <div className="flame-inner absolute w-3/4 h-3/4 bg-yellow-300 rounded-full top-1/4 left-1/2 -translate-x-1/2 animate-[flame-flicker_2s_ease-in-out_infinite_0.5s]"></div>
            <div className="flame-glow absolute w-12 h-12 rounded-full bg-orange-500/30 filter blur-md -inset-2 animate-[glow-pulse_4s_ease-in-out_infinite]"></div>
          </div>
          
          {/* Add smoke effect */}
          <div className="smoke-particles absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i}
                className="smoke-particle absolute w-2 h-2 bg-gray-200/10 rounded-full animate-[smoke-rise_3s_ease-out_infinite]"
                style={{
                  left: `${i * 30}%`,
                  top: '0',
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Add shadows on the ground */}
          <div 
            className="shadow absolute w-16 h-4 bg-black/20 rounded-full blur-sm animate-[shadow-flicker_2s_infinite_alternate]"
            style={{ 
              bottom: '-1.5rem',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          ></div>
        </div>
      ))}

      {/* Add CSS animations to the game styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flame-flicker {
          0%, 100% { transform: scale(1); opacity: 1; }
          25% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.9; }
          75% { transform: scale(0.85); opacity: 0.7; }
        }
        
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        @keyframes shadow-flicker {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.2; }
          50% { transform: translateX(-50%) scale(0.8); opacity: 0.1; }
        }
        
        @keyframes smoke-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.1; }
          50% { transform: translateY(-10px) scale(1.5); opacity: 0.2; }
          100% { transform: translateY(-20px) scale(0.8); opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default Torches;
