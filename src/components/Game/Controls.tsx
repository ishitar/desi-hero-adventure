
import React from 'react';
import { useGame } from '@/context/GameContext';
import { ArrowLeft, ArrowRight, ArrowUp, Pause, Play } from 'lucide-react';

const Controls: React.FC = () => {
  const { 
    gameState, 
    startGame, 
    pauseGame, 
    resumeGame,
    jump,
    moveLeft,
    moveRight,
    stopMoving
  } = useGame();

  // Touch event handlers for mobile
  const handleTouchStart = (action: () => void) => (e: React.TouchEvent) => {
    e.preventDefault();
    action();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    stopMoving();
  };

  if (gameState === 'idle') {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-30">
        <button 
          className="bg-game-saffron text-white px-8 py-4 rounded-full text-2xl font-bold
                     shadow-lg transform transition-all hover:scale-105 active:scale-95
                     border-4 border-white/30"
          onClick={startGame}
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 w-full flex justify-center items-center gap-4 z-30 px-4">
      {/* Play/Pause Button */}
      <button 
        className="game-button w-12 h-12"
        onClick={gameState === 'playing' ? pauseGame : resumeGame}
      >
        {gameState === 'playing' ? (
          <Pause className="h-6 w-6 text-game-navy" />
        ) : (
          <Play className="h-6 w-6 text-game-navy" />
        )}
      </button>

      <div className="flex gap-2 md:gap-4">
        {/* Left Button (mobile only) */}
        <button 
          className="game-button w-14 h-14 md:w-16 md:h-16 lg:hidden"
          onTouchStart={handleTouchStart(moveLeft)}
          onTouchEnd={handleTouchEnd}
          onClick={moveLeft}
        >
          <ArrowLeft className="h-8 w-8 text-game-navy" />
        </button>
        
        {/* Jump Button (mobile only) */}
        <button 
          className="game-button w-14 h-14 md:w-16 md:h-16"
          onTouchStart={handleTouchStart(jump)}
          onClick={jump}
        >
          <ArrowUp className="h-8 w-8 text-game-navy" />
        </button>
        
        {/* Right Button (mobile only) */}
        <button 
          className="game-button w-14 h-14 md:w-16 md:h-16 lg:hidden"
          onTouchStart={handleTouchStart(moveRight)}
          onTouchEnd={handleTouchEnd}
          onClick={moveRight}
        >
          <ArrowRight className="h-8 w-8 text-game-navy" />
        </button>
      </div>
    </div>
  );
};

export default Controls;
