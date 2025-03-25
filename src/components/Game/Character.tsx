
import React, { useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';

const Character: React.FC = () => {
  const { character, moveForward, jump } = useGame();
  const [expression, setExpression] = useState('normal');
  const [animationFrame, setAnimationFrame] = useState(0);
  const [glowing, setGlowing] = useState(false);
  
  // Auto-run the character forward
  useEffect(() => {
    const forwardInterval = setInterval(() => {
      moveForward();
    }, 50);
    
    return () => clearInterval(forwardInterval);
  }, [moveForward]);
  
  // Handle expression changes during jumps
  useEffect(() => {
    if (character.jumping) {
      setExpression('excited');
      
      const resetExpression = setTimeout(() => {
        setExpression('normal');
      }, 500);
      
      return () => clearInterval(resetExpression);
    }
  }, [character.jumping]);
  
  // Animation frame counter for running animation
  useEffect(() => {
    if (character.running) {
      const animInterval = setInterval(() => {
        setAnimationFrame(prev => (prev + 1) % 6);
      }, 150);
      
      return () => clearInterval(animInterval);
    }
  }, [character.running]);
  
  // Handle glowing effect when collecting sweets
  useEffect(() => {
    if (character.glowing) {
      setGlowing(true);
      
      const resetGlow = setTimeout(() => {
        setGlowing(false);
      }, 1000);
      
      return () => clearTimeout(resetGlow);
    }
  }, [character.glowing]);
  
  // Character styling based on state
  const characterClasses = `character absolute ${character.jumping ? 'animate-character-jump' : character.running ? 'animate-character-run' : ''} ${glowing ? 'character-glow' : ''}`;
  
  // Indian character representation with traditional attire
  return (
    <div 
      className={characterClasses}
      style={{
        left: `${character.x}px`,
        bottom: '20%', // Position character on the ground
        width: `${character.width}px`,
        height: `${character.height}px`,
        zIndex: 10 // Ensure character is above background elements
      }}
    >
      <div className="w-full h-full relative">
        {/* Character head */}
        <div className="absolute w-20 h-20 rounded-full bg-amber-700 border-2 border-amber-900 left-1/2 -translate-x-1/2">
          {/* Face */}
          <div className="absolute w-16 h-10 bg-amber-600 rounded-lg left-1/2 -translate-x-1/2 top-6"></div>
          
          {/* Eyes with expressive Indian features */}
          <div className="absolute w-3 h-4 bg-black rounded-full left-4 top-6"></div>
          <div className="absolute w-3 h-4 bg-black rounded-full right-4 top-6"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full left-[17px] top-7"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full right-[17px] top-7"></div>
          
          {/* Eyebrows */}
          <div className="absolute w-4 h-1 bg-black rounded-full left-3.5 top-4 transform -rotate-12"></div>
          <div className="absolute w-4 h-1 bg-black rounded-full right-3.5 top-4 transform rotate-12"></div>
          
          {/* Expression change based on jumping */}
          {expression === 'normal' ? (
            /* Normal smile */
            <div className="absolute w-8 h-1 bg-black rounded-full left-1/2 -translate-x-1/2 top-12"></div>
          ) : (
            /* Excited open mouth */
            <div className="absolute w-8 h-4 bg-black rounded-full left-1/2 -translate-x-1/2 top-12 flex items-center justify-center">
              <div className="w-6 h-2 bg-red-500 rounded-full"></div>
            </div>
          )}
          
          {/* Turban (Pagri) with detailed folds */}
          <div className="absolute w-26 h-12 bg-blue-600 rounded-t-full -top-10 left-1/2 -translate-x-1/2"></div>
          
          {/* Layered turban with folds */}
          <div className="absolute w-24 h-10 bg-blue-600 rounded-t-full -top-8 left-1/2 -translate-x-1/2 before:content-[''] before:absolute before:w-full before:h-4 before:bg-blue-500 before:bottom-0 before:opacity-30"></div>
          <div className="absolute w-24 h-1 bg-blue-700 -top-6 left-1/2 -translate-x-1/2"></div>
          <div className="absolute w-24 h-1 bg-blue-700 -top-4 left-1/2 -translate-x-1/2"></div>
          
          {/* Turban band */}
          <div className="absolute w-24 h-3 bg-yellow-500 top-[-8px] left-1/2 -translate-x-1/2"></div>
          
          {/* Turban top knot */}
          <div className="absolute w-6 h-6 bg-blue-600 rounded-full top-[-15px] left-1/2 -translate-x-1/2"></div>
        </div>
        
        {/* Character body with traditional Kurta */}
        <div className="absolute w-24 h-32 top-16 left-1/2 -translate-x-1/2">
          {/* Traditional Kurta */}
          <div className="absolute w-24 h-24 bg-white rounded-md top-0 left-0 shadow-inner border border-gray-100">
            {/* Kurta designs and patterns */}
            <div className="absolute w-full h-1 bg-orange-300 top-4"></div>
            <div className="absolute w-full h-1 bg-orange-300 top-8"></div>
            <div className="absolute w-10 h-16 bg-white top-0 left-1/2 -translate-x-1/2 border-l border-r border-gray-200"></div>
          </div>
          
          {/* Traditional Pajama/Dhoti */}
          <div className="absolute w-20 h-12 bg-white bottom-0 left-1/2 -translate-x-1/2 border border-gray-100"></div>
          
          {/* Arms with skin tone */}
          <div className={`absolute w-6 h-14 bg-amber-700 rounded-full -left-2 top-4 transform origin-top ${character.running ? (animationFrame < 3 ? 'rotate-[-25deg]' : 'rotate-[25deg]') : ''}`}></div>
          <div className={`absolute w-6 h-14 bg-amber-700 rounded-full -right-2 top-4 transform origin-top ${character.running ? (animationFrame < 3 ? 'rotate-[25deg]' : 'rotate-[-25deg]') : ''}`}></div>
          
          {/* Hands */}
          <div className="absolute w-5 h-5 bg-amber-700 rounded-full -left-1 top-[52px]"></div>
          <div className="absolute w-5 h-5 bg-amber-700 rounded-full -right-1 top-[52px]"></div>
          
          {/* Legs with animation */}
          <div className={`absolute w-6 h-14 bg-amber-700 rounded-full left-4 bottom-0 transform origin-top ${character.running ? (animationFrame < 3 ? 'translate-y-[-3px]' : 'translate-y-[3px]') : ''}`}></div>
          <div className={`absolute w-6 h-14 bg-amber-700 rounded-full right-4 bottom-0 transform origin-top ${character.running ? (animationFrame < 3 ? 'translate-y-[3px]' : 'translate-y-[-3px]') : ''}`}></div>
          
          {/* Traditional footwear (Mojari/Juti) */}
          <div className={`absolute w-8 h-3 bg-amber-800 rounded-t-full left-3 bottom-[-3px] ${character.running ? (animationFrame < 3 ? 'opacity-100' : 'opacity-70') : ''}`}></div>
          <div className={`absolute w-8 h-3 bg-amber-800 rounded-t-full right-3 bottom-[-3px] ${character.running ? (animationFrame < 3 ? 'opacity-70' : 'opacity-100') : ''}`}></div>
        </div>
      </div>
      
      {/* Jump hint indicator - appears periodically to encourage jumping */}
      {!character.jumping && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-6 bg-white/40 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold">↑</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Character;
