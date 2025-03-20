
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Trophy, Gem } from 'lucide-react';

const ScoreBoard: React.FC = () => {
  const { score, highScore, treasuresCollected, totalTreasures } = useGame();
  
  return (
    <div className="game-ui">
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-game-yellow" />
        <span className="score-display">{Math.floor(score)}</span>
      </div>
      
      <div className="h-6 border-r border-white/30 mx-1"></div>
      
      <div className="flex items-center gap-1">
        <Gem className="w-4 h-4 text-purple-500" />
        <span className="text-sm font-bold text-game-navy">{treasuresCollected} / {totalTreasures}</span>
      </div>
      
      <div className="h-6 border-r border-white/30 mx-1"></div>
      
      <div className="flex items-center gap-1">
        <span className="text-xs text-game-navy font-medium">BEST</span>
        <span className="text-sm font-bold text-game-navy">{Math.floor(highScore)}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
