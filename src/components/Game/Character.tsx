
import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';

const Character: React.FC = () => {
  const { character, moveForward } = useGame();
  
  // Auto-run the character forward
  useEffect(() => {
    const forwardInterval = setInterval(() => {
      moveForward();
    }, 50);
    
    return () => clearInterval(forwardInterval);
  }, [moveForward]);
  
  // Character styling based on state
  const characterClasses = `character ${character.jumping ? 'animate-character-jump' : character.running ? 'animate-character-run' : ''}`;
  
  // Simple character representation with CSS
  return (
    <div 
      className={characterClasses}
      style={{
        left: `${character.x}px`,
        width: `${character.width}px`,
        height: `${character.height}px`,
      }}
    >
      <div className="w-full h-full relative">
        {/* Character head */}
        <div className="absolute w-20 h-20 rounded-full bg-amber-700 border-2 border-amber-900 left-1/2 -translate-x-1/2">
          {/* Face */}
          <div className="absolute w-16 h-8 bg-amber-600 rounded-lg left-1/2 -translate-x-1/2 top-8"></div>
          {/* Eyes */}
          <div className="absolute w-3 h-4 bg-black rounded-full left-4 top-6"></div>
          <div className="absolute w-3 h-4 bg-black rounded-full right-4 top-6"></div>
          {/* Smile */}
          <div className="absolute w-8 h-1 bg-black rounded-full left-1/2 -translate-x-1/2 top-12"></div>
          {/* Turban */}
          <div className="absolute w-24 h-8 bg-game-saffron rounded-lg -top-6 left-1/2 -translate-x-1/2"></div>
          <div className="absolute w-6 h-6 bg-game-red rounded-full -top-4 left-1/2 -translate-x-1/2"></div>
        </div>
        
        {/* Character body */}
        <div className="absolute w-24 h-32 bg-game-blue rounded-lg top-16 left-1/2 -translate-x-1/2">
          {/* Clothing details */}
          <div className="absolute w-24 h-12 bg-game-white rounded-b-lg top-0 left-0"></div>
          <div className="absolute w-8 h-10 bg-game-blue top-2 left-1/2 -translate-x-1/2"></div>
          
          {/* Arms */}
          <div className={`absolute w-8 h-16 bg-amber-700 rounded-full -left-4 top-4 ${character.running ? 'animate-bounce-horizontal' : ''}`}></div>
          <div className={`absolute w-8 h-16 bg-amber-700 rounded-full -right-4 top-4 ${character.running ? 'animate-bounce-horizontal' : ''}`}></div>
          
          {/* Legs */}
          <div className="absolute w-8 h-16 bg-amber-700 rounded-full left-2 top-24"></div>
          <div className="absolute w-8 h-16 bg-amber-700 rounded-full right-2 top-24"></div>
        </div>
      </div>
    </div>
  );
};

export default Character;
