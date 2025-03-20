
import React, { useRef, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import Character from './Character';
import Obstacles from './Obstacles';
import Background from './Background';
import Controls from './Controls';
import ScoreBoard from './ScoreBoard';
import GameOverModal from '@/components/UI/GameOverModal';
import TreasureMap from './TreasureMap';

const GameCanvas: React.FC = () => {
  const { 
    gameState, 
    jump,
    moveLeft,
    moveRight,
    stopMoving
  } = useGame();
  const canvasRef = useRef<HTMLDivElement>(null);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      
      switch (e.key) {
        case ' ':
        case 'ArrowUp':
          jump();
          break;
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
          stopMoving();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, jump, moveLeft, moveRight, stopMoving]);

  return (
    <div className="game-container" ref={canvasRef}>
      <div className="game-canvas">
        <Background />
        <Character />
        <Obstacles />
        
        {/* Ground */}
        <div className="ground"></div>
      </div>
      
      <ScoreBoard />
      <Controls />
      <TreasureMap />
      
      {gameState === 'gameOver' && <GameOverModal />}
    </div>
  );
};

export default GameCanvas;
