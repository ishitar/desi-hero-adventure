
import React from 'react';
import { useGame } from '@/context/GameContext';

const Obstacles: React.FC = () => {
  const { obstacles, treasures, decorations } = useGame();
  
  return (
    <>
      {/* Render cows (obstacles) */}
      {obstacles.map(cow => (
        <div
          key={cow.id}
          className="obstacle animate-cow-walk"
          style={{
            left: `${cow.x}px`,
            bottom: `${20 - 1}%`, // On the ground
            width: `${cow.width}px`,
            height: `${cow.height}px`,
          }}
        >
          <div className="w-full h-full relative">
            {/* Cow body */}
            <div className="absolute w-full h-3/4 bg-white rounded-lg bottom-0"></div>
            
            {/* Cow head */}
            <div className="absolute w-1/3 h-1/2 bg-white rounded-lg left-0 top-0">
              {/* Eyes */}
              <div className="absolute w-2 h-2 bg-black rounded-full top-2 left-2"></div>
              <div className="absolute w-2 h-2 bg-black rounded-full top-2 left-6"></div>
              
              {/* Nose */}
              <div className="absolute w-8 h-4 bg-pink-300 rounded-lg bottom-0 left-1"></div>
            </div>
            
            {/* Cow spots */}
            <div className="absolute w-1/3 h-1/3 bg-black rounded-full top-2 right-2"></div>
            <div className="absolute w-1/4 h-1/4 bg-black rounded-full bottom-2 left-12"></div>
            
            {/* Cow tail */}
            <div className="absolute w-1/6 h-2/3 bg-gray-200 rounded-full right-0 top-0 rotate-45"></div>
            
            {/* Cow legs */}
            <div className="absolute w-2 h-3 bg-gray-300 rounded-b-lg bottom-0 left-1/5"></div>
            <div className="absolute w-2 h-3 bg-gray-300 rounded-b-lg bottom-0 left-2/5"></div>
            <div className="absolute w-2 h-3 bg-gray-300 rounded-b-lg bottom-0 left-3/5"></div>
            <div className="absolute w-2 h-3 bg-gray-300 rounded-b-lg bottom-0 left-4/5"></div>
          </div>
        </div>
      ))}
      
      {/* Render treasures */}
      {treasures.map(treasure => (
        <div
          key={treasure.id}
          className="treasure"
          style={{
            left: `${treasure.x}px`,
            top: `${treasure.y}px`,
            width: `${treasure.width}px`,
            height: `${treasure.height}px`,
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            {treasure.type === 'coin' && (
              <div className="w-3/4 h-3/4 bg-game-yellow rounded-full border-4 border-yellow-600 animate-pulse-gentle"></div>
            )}
            {treasure.type === 'gem' && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-12 bg-purple-500 animate-pulse transform rotate-45 rounded-md"></div>
              </div>
            )}
            {treasure.type === 'chest' && (
              <div className="w-full h-full">
                <div className="w-full h-2/3 bg-amber-800 rounded-md bottom-0 absolute"></div>
                <div className="w-full h-1/3 bg-amber-900 rounded-t-md top-0 absolute"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            )}
          </div>
        </div>
      ))}
      
      {/* Render decorations */}
      {decorations.map(decoration => {
        if (decoration.type === 'temple') {
          return (
            <div
              key={decoration.id}
              className="temple"
              style={{
                left: `${decoration.x}px`,
                bottom: `${20 - 1}%`, // On the ground
                width: `${decoration.width}px`,
                height: `${decoration.height}px`,
              }}
            >
              <div className="w-full h-full relative">
                {/* Temple base */}
                <div className="absolute w-full h-2/3 bg-amber-200 rounded-lg bottom-0"></div>
                
                {/* Temple roof */}
                <div className="absolute w-full h-1/3 bg-amber-800 top-0 left-0" style={{ 
                  clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' 
                }}>
                </div>
                
                {/* Temple dome */}
                <div className="absolute w-1/4 h-1/4 bg-game-saffron rounded-full -top-6 left-1/2 -translate-x-1/2"></div>
                
                {/* Temple entrance */}
                <div className="absolute w-1/3 h-1/3 bg-amber-900 rounded-t-lg bottom-0 left-1/2 -translate-x-1/2"></div>
                
                {/* Temple windows */}
                <div className="absolute w-1/6 h-1/6 bg-amber-100 rounded-full top-1/3 left-1/4"></div>
                <div className="absolute w-1/6 h-1/6 bg-amber-100 rounded-full top-1/3 right-1/4"></div>
              </div>
            </div>
          );
        }
        
        if (decoration.type === 'banner') {
          return (
            <div
              key={decoration.id}
              className="banner animate-float-banner"
              style={{
                left: `${decoration.x}px`,
                top: `${decoration.y}px`,
                width: `${decoration.width}px`,
                height: `${decoration.height}px`,
              }}
            >
              <div className="w-full h-full relative">
                {/* Banner pole */}
                <div className="absolute w-1 h-full bg-gray-700 left-0"></div>
                
                {/* Banner cloth - tricolor like Indian flag */}
                <div className="absolute w-full h-1/3 bg-game-saffron top-0 left-0"></div>
                <div className="absolute w-full h-1/3 bg-white top-1/3 left-0">
                  {/* Ashoka Chakra */}
                  <div className="absolute w-4 h-4 rounded-full border-2 border-game-blue left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="absolute w-full h-1/3 bg-game-green bottom-0 left-0"></div>
              </div>
            </div>
          );
        }
        
        if (decoration.type === 'platform') {
          return (
            <div
              key={decoration.id}
              className="platform"
              style={{
                left: `${decoration.x}px`,
                top: `${decoration.y}px`,
                width: `${decoration.width}px`,
                height: `${decoration.height}px`,
              }}
            >
              <div className="w-full h-full bg-game-earth rounded-lg border-t-4 border-green-800"></div>
            </div>
          );
        }
        
        if (decoration.type === 'clue') {
          return (
            <div
              key={decoration.id}
              className="clue animate-bounce-slow"
              style={{
                left: `${decoration.x}px`,
                top: `${decoration.y}px`,
                width: `${decoration.width}px`,
                height: `${decoration.height}px`,
              }}
            >
              <div className="w-full h-full bg-amber-100 border-2 border-amber-800 rounded-lg flex items-center justify-center text-amber-900 font-bold">
                ?
              </div>
            </div>
          );
        }
        
        return null;
      })}
    </>
  );
};

export default Obstacles;
