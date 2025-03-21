
import React, { useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';

// Character component representing a Sikh character with turban
const Character: React.FC = () => {
  const { character, moveForward, jump } = useGame();
  const [expression, setExpression] = useState('normal');
  
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
  
  // Character styling based on state
  const characterClasses = `character ${character.jumping ? 'animate-character-jump' : character.running ? 'animate-character-run' : ''}`;
  
  // Sikh character representation with turban
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
          
          {/* Beard */}
          <div className="absolute w-14 h-10 bg-black rounded-b-xl bottom-[-8px] left-1/2 -translate-x-1/2"></div>
          
          {/* Turban (Sikh Pagri) */}
          <div className="absolute w-26 h-12 bg-blue-600 rounded-t-full -top-10 left-1/2 -translate-x-1/2"></div>
          <div className="absolute w-24 h-10 bg-blue-600 rounded-t-full -top-8 left-1/2 -translate-x-1/2"></div>
          <div className="absolute w-24 h-3 bg-yellow-500 top-[-8px] left-1/2 -translate-x-1/2"></div>
          
          {/* Turban top knot */}
          <div className="absolute w-6 h-6 bg-blue-600 rounded-full top-[-15px] left-1/2 -translate-x-1/2"></div>
        </div>
        
        {/* Character body */}
        <div className="absolute w-24 h-32 bg-blue-700 rounded-lg top-16 left-1/2 -translate-x-1/2">
          {/* Clothing details - traditional Punjabi outfit */}
          <div className="absolute w-24 h-18 bg-white rounded-b-lg top-0 left-0"></div>
          <div className="absolute w-10 h-12 bg-blue-700 top-0 left-1/2 -translate-x-1/2"></div>
          
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
