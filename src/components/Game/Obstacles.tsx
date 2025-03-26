import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';

const Obstacles: React.FC = () => {
  const { obstacles, treasures, decorations, character, jump } = useGame();
  
  useEffect(() => {
    const checkAndJump = () => {
      const nearbyObstacle = obstacles.find(obstacle => {
        return (
          obstacle.type.includes('ground-') && 
          obstacle.x > character.x && 
          obstacle.x < character.x + 200 && 
          obstacle.x > character.x + 100
        );
      });
      
      if (nearbyObstacle && !character.jumping) {
        jump();
      }
    };
    
    const checkInterval = setInterval(checkAndJump, 300);
    return () => clearInterval(checkInterval);
  }, [obstacles, character, jump]);
  
  return (
    <>
      {obstacles.map(obstacle => {
        if (obstacle.type === 'ground-rock') {
          return (
            <div
              key={obstacle.id}
              className="obstacle"
              style={{
                left: `${obstacle.x}px`,
                bottom: `${20}%`, // On the ground
                width: `${obstacle.width}px`,
                height: `${obstacle.height}px`,
              }}
            >
              <div className="w-full h-full bg-gray-500 rounded-lg border-2 border-gray-700"></div>
            </div>
          );
        }
        
        if (obstacle.type === 'ground-log') {
          return (
            <div
              key={obstacle.id}
              className="obstacle"
              style={{
                left: `${obstacle.x}px`,
                bottom: `${20}%`, // On the ground
                width: `${obstacle.width}px`,
                height: `${obstacle.height}px`,
              }}
            >
              <div className="w-full h-full bg-amber-800 rounded-lg"></div>
            </div>
          );
        }
        
        if (obstacle.type === 'ground-fire') {
          return (
            <div
              key={obstacle.id}
              className="obstacle"
              style={{
                left: `${obstacle.x}px`,
                bottom: `${20}%`, // On the ground
                width: `${obstacle.width}px`,
                height: `${obstacle.height}px`,
              }}
            >
              <div className="w-full h-3/4 bg-red-500 rounded-t-lg animate-pulse"></div>
              <div className="w-full h-1/4 bg-yellow-500 bottom-0 absolute rounded-b-lg"></div>
            </div>
          );
        }
        
        if (obstacle.type === 'snake') {
          return (
            <div
              key={obstacle.id}
              className="obstacle animate-snake-slither"
              style={{
                left: `${obstacle.x}px`,
                bottom: `${20 - 0.5}%`, // Just above ground
                width: `${obstacle.width}px`,
                height: `${obstacle.height}px`,
              }}
            >
              <div className="w-full h-full relative">
                {/* Snake body */}
                <div className="absolute w-full h-full bg-green-600 rounded-full"></div>
                
                {/* Snake pattern */}
                <div className="absolute w-3/4 h-3/4 bg-green-700 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute w-1/2 h-1/2 bg-green-800 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                
                {/* Snake head */}
                <div className="absolute w-1/4 h-3/4 bg-green-600 rounded-lg right-0 top-1/2 -translate-y-1/2">
                  {/* Eyes */}
                  <div className="absolute w-1.5 h-1.5 bg-red-600 rounded-full top-1/4 right-1/4"></div>
                </div>
              </div>
            </div>
          );
        }
        
        if (obstacle.type === 'cow') {
          return (
            <div
              key={obstacle.id}
              className="obstacle animate-cow-walk"
              style={{
                left: `${obstacle.x}px`,
                bottom: `${20 - 1}%`, // On the ground
                width: `${obstacle.width}px`,
                height: `${obstacle.height}px`,
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
          );
        }
        
        if (obstacle.type === 'tiger') {
          return (
            <div
              key={obstacle.id}
              className="obstacle animate-tiger-prowl"
              style={{
                left: `${obstacle.x}px`,
                bottom: `${20 - 1}%`, // On the ground
                width: `${obstacle.width}px`,
                height: `${obstacle.height}px`,
              }}
            >
              <div className="w-full h-full relative">
                {/* Tiger body */}
                <div className="absolute w-full h-2/3 bg-amber-500 rounded-lg bottom-0"></div>
                
                {/* Tiger head */}
                <div className="absolute w-1/3 h-3/5 bg-amber-500 rounded-lg left-0 top-0">
                  {/* Eyes */}
                  <div className="absolute w-2 h-3 bg-yellow-300 rounded-full top-2 left-2"></div>
                  <div className="absolute w-2 h-3 bg-yellow-300 rounded-full top-2 left-6"></div>
                  
                  {/* Nose */}
                  <div className="absolute w-5 h-3 bg-pink-900 rounded-lg bottom-1 left-3"></div>
                </div>
                
                {/* Tiger stripes */}
                <div className="absolute w-2 h-2/3 bg-black rounded-full top-0 left-1/4"></div>
                <div className="absolute w-2 h-2/3 bg-black rounded-full top-0 left-2/4"></div>
                <div className="absolute w-2 h-2/3 bg-black rounded-full top-0 left-3/4"></div>
                
                {/* Tiger tail */}
                <div className="absolute w-1/4 h-1/6 bg-amber-500 rounded-full right-0 top-1/3 rotate-45"></div>
                
                {/* Tiger legs */}
                <div className="absolute w-3 h-4 bg-amber-600 rounded-b-lg bottom-0 left-1/5"></div>
                <div className="absolute w-3 h-4 bg-amber-600 rounded-b-lg bottom-0 left-2/5"></div>
                <div className="absolute w-3 h-4 bg-amber-600 rounded-b-lg bottom-0 left-3/5"></div>
                <div className="absolute w-3 h-4 bg-amber-600 rounded-b-lg bottom-0 left-4/5"></div>
              </div>
            </div>
          );
        }
        
        if (obstacle.type === 'vulture') {
          return (
            <div
              key={obstacle.id}
              className="obstacle"
              style={{
                left: `${obstacle.x}px`,
                top: `${obstacle.y}px`,
                width: `${obstacle.width}px`,
                height: `${obstacle.height}px`,
              }}
            >
              <div className="w-full h-full relative">
                {/* Vulture body */}
                <div className="absolute w-3/5 h-2/3 bg-gray-800 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                
                {/* Vulture head */}
                <div className="absolute w-1/4 h-1/3 bg-gray-700 rounded-full left-0 top-1/4">
                  {/* Beak */}
                  <div className="absolute w-1/2 h-1/2 bg-red-900 rounded-lg left-0 top-1/2"></div>
                  
                  {/* Eye */}
                  <div className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full top-1/3 right-1/4"></div>
                </div>
                
                {/* Vulture wings */}
                <div className="absolute w-full h-1/2 bg-gray-700 top-0 animate-vulture-wings">
                  <div className="absolute w-4/5 h-1/3 bg-gray-600 rounded-t-lg top-0 left-1/2 -translate-x-1/2"></div>
                </div>
                
                {/* Vulture tail */}
                <div className="absolute w-1/4 h-1/4 bg-gray-700 rounded-lg right-0 bottom-0"></div>
              </div>
            </div>
          );
        }
        
        if (obstacle.type === 'insect') {
          return (
            <div
              key={obstacle.id}
              className="obstacle animate-insect-fly"
              style={{
                left: `${obstacle.x}px`,
                bottom: `${20 - 2}%`, // Above ground
                width: `${obstacle.width}px`,
                height: `${obstacle.height}px`,
              }}
            >
              <div className="w-full h-full relative">
                {/* Insect body */}
                <div className="absolute w-2/3 h-2/3 bg-amber-900 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                
                {/* Insect head */}
                <div className="absolute w-1/3 h-1/2 bg-amber-800 rounded-full left-0 top-1/4">
                  {/* Eyes */}
                  <div className="absolute w-1 h-1 bg-red-500 rounded-full top-1 left-1"></div>
                  <div className="absolute w-1 h-1 bg-red-500 rounded-full top-1 right-1"></div>
                </div>
                
                {/* Insect wings */}
                <div className="absolute w-full h-1/2 top-0">
                  <div className="absolute w-1/2 h-full bg-amber-200/50 left-1/4 rounded-t-full"></div>
                </div>
                
                {/* Insect legs */}
                <div className="absolute w-1 h-2 bg-amber-700 -rotate-30 bottom-0 left-1/4"></div>
                <div className="absolute w-1 h-2 bg-amber-700 rotate-0 bottom-0 left-2/4"></div>
                <div className="absolute w-1 h-2 bg-amber-700 rotate-30 bottom-0 left-3/4"></div>
              </div>
            </div>
          );
        }
        
        if (obstacle.type === 'beetle') {
          return (
            <div
              key={obstacle.id}
              className="obstacle animate-beetle-crawl"
              style={{
                left: `${obstacle.x}px`,
                bottom: `${20 - 0.5}%`, // On ground
                width: `${obstacle.width}px`,
                height: `${obstacle.height}px`,
              }}
            >
              <div className="w-full h-full relative">
                {/* Beetle body */}
                <div className="absolute w-4/5 h-3/4 bg-blue-900 rounded-full top-1/4 left-1/2 -translate-x-1/2"></div>
                
                {/* Beetle head */}
                <div className="absolute w-1/4 h-1/4 bg-blue-800 rounded-sm top-0 left-1/2 -translate-x-1/2">
                  {/* Pincers */}
                  <div className="absolute w-1 h-2 bg-blue-700 -rotate-30 top-0 left-0"></div>
                  <div className="absolute w-1 h-2 bg-blue-700 rotate-30 top-0 right-0"></div>
                </div>
                
                {/* Beetle shell */}
                <div className="absolute w-3/4 h-1/2 bg-blue-800 rounded-t-full top-1/4 left-1/2 -translate-x-1/2"></div>
                
                {/* Beetle legs */}
                <div className="absolute w-6 h-1 bg-blue-700 -rotate-45 bottom-1 left-0"></div>
                <div className="absolute w-6 h-1 bg-blue-700 rotate-0 bottom-1 left-1/3"></div>
                <div className="absolute w-6 h-1 bg-blue-700 rotate-45 bottom-1 right-0"></div>
              </div>
            </div>
          );
        }
        
        if (obstacle.type === 'scorpion') {
          return (
            <div
              key={obstacle.id}
              className="obstacle animate-scorpion-move"
              style={{
                left: `${obstacle.x}px`,
                bottom: `${20 - 0.5}%`, // On ground
                width: `${obstacle.width}px`,
                height: `${obstacle.height}px`,
              }}
            >
              <div className="w-full h-full relative">
                {/* Scorpion body */}
                <div className="absolute w-2/3 h-3/4 bg-amber-700 rounded-lg left-0 top-1/4"></div>
                
                {/* Scorpion head */}
                <div className="absolute w-1/4 h-1/4 bg-amber-800 rounded-full left-0 top-1/4">
                  {/* Eyes */}
                  <div className="absolute w-1 h-1 bg-black rounded-full top-1 left-1"></div>
                  <div className="absolute w-1 h-1 bg-black rounded-full top-1 right-1"></div>
                </div>
                
                {/* Scorpion claws */}
                <div className="absolute w-3 h-2 bg-amber-800 left-1/4 top-0"></div>
                <div className="absolute w-3 h-2 bg-amber-800 left-1/2 top-0"></div>
                
                {/* Scorpion tail */}
                <div className="absolute w-1/3 h-1/2 bg-amber-700 rounded-r-lg right-0 top-0">
                  <div className="absolute w-1/2 h-1/2 bg-amber-900 rounded-full right-0 bottom-0"></div>
                </div>
                
                {/* Scorpion legs */}
                <div className="absolute w-4 h-1 bg-amber-600 -rotate-45 bottom-0 left-1/6"></div>
                <div className="absolute w-4 h-1 bg-amber-600 rotate-0 bottom-0 left-1/3"></div>
                <div className="absolute w-4 h-1 bg-amber-600 rotate-45 bottom-0 left-1/2"></div>
              </div>
            </div>
          );
        }
        
        return null;
      })}
      
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
      
      {decorations.map(decoration => {
        if (decoration.type === 'banner') {
          return null;
        }
        
        if (decoration.type === 'platform') {
          return null;
        }
        
        if (decoration.type === 'clue') {
          return null;
        }
        
        return null;
      })}
    </>
  );
};

export default Obstacles;
