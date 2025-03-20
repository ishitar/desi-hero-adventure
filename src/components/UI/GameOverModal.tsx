
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Trophy, RefreshCw } from 'lucide-react';

const GameOverModal: React.FC = () => {
  const { score, highScore, restartGame } = useGame();
  
  return (
    <div className="game-over-modal">
      <div className="game-over-content">
        <h2 className="text-3xl font-bold text-game-navy mb-2">Game Over</h2>
        
        <div className="flex flex-col items-center gap-4 my-6">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-600 font-medium">YOUR SCORE</span>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-game-yellow" />
              <span className="text-4xl font-bold text-game-navy">{Math.floor(score)}</span>
            </div>
          </div>
          
          <div className="w-24 border-b border-gray-300 my-2"></div>
          
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-600 font-medium">BEST SCORE</span>
            <span className="text-2xl font-bold text-game-navy">{Math.floor(highScore)}</span>
          </div>
        </div>
        
        <button 
          className="flex items-center justify-center gap-2 bg-game-saffron text-white px-6 py-3 rounded-full 
                     shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95
                     font-bold"
          onClick={restartGame}
        >
          <RefreshCw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
