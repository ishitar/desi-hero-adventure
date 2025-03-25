
import React, { useRef, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import Character from './Character';
import Obstacles from './Obstacles';
import Background from './Background';
import Controls from './Controls';
import ScoreBoard from './ScoreBoard';
import GameOverModal from '@/components/UI/GameOverModal';
import TreasureMap from './TreasureMap';
import TreasureModal from './TreasureModal';
import IndianSweets from './IndianSweets';
import SweetsStatus from './SweetsStatus';
import Fireflies from './Fireflies';
import FogEffect from './FogEffect';
import AnimatedBanners from './AnimatedBanners';
import EnhancedSky from './EnhancedSky';
import Torches from './Torches';

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
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-floating-sweet {
          animation: float 3s ease-in-out infinite;
        }
        
        .shadow-glow {
          filter: drop-shadow(0 0 5px rgba(255, 255, 200, 0.7));
        }
        
        .character-glow {
          box-shadow: 0 0 15px 10px rgba(255, 215, 0, 0.7);
          animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 15px 10px rgba(255, 215, 0, 0.7); }
          50% { box-shadow: 0 0 25px 15px rgba(255, 215, 0, 0.9); }
          100% { box-shadow: 0 0 15px 10px rgba(255, 215, 0, 0.7); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}} />
      
      <div className="game-canvas">
        <EnhancedSky />
        <Background />
        <FogEffect />
        <AnimatedBanners />
        <Fireflies />
        <Torches />
        <IndianSweets />
        <Character />
        <Obstacles />
      </div>
      
      <ScoreBoard />
      <SweetsStatus />
      <Controls />
      <TreasureMap />
      <TreasureModal />
      
      {gameState === 'gameOver' && <GameOverModal />}
    </div>
  );
};

export default GameCanvas;
