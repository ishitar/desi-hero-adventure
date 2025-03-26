
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Character, GameObject, SweetCounts, GameContextProps } from '@/types/gameTypes';
import { initializeGameObjects } from '@/game/gameInitializer';
import { createCharacterControls } from '@/game/characterControls';
import { createGameUpdater } from '@/game/gameUpdater';
import { createSweetCollector } from '@/game/sweetCollector';

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [treasuresCollected, setTreasuresCollected] = useState(0);
  const [totalTreasures, setTotalTreasures] = useState(0);
  const [character, setCharacter] = useState<Character>({
    x: 50,
    y: 0,
    width: 50,
    height: 80,
    jumping: false,
    running: true,
    lives: 10,
  });
  const [obstacles, setObstacles] = useState<GameObject[]>([]);
  const [treasures, setTreasures] = useState<GameObject[]>([]);
  const [decorations, setDecorations] = useState<GameObject[]>([]);
  const [sweets, setSweets] = useState<GameObject[]>([]);
  const [sweetCounts, setSweetCounts] = useState<SweetCounts>({});
  const [gameLoopId, setGameLoopId] = useState<number | null>(null);
  const worldPosition = useRef(0);
  const worldSpeed = useRef(3);
  const [targetLocation, setTargetLocation] = useState<{x: number, y: number} | undefined>(undefined);
  const [showTreasureModal, setShowTreasureModal] = useState(false);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('indianTreasureHuntHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('indianTreasureHuntHighScore', highScore.toString());
  }, [highScore]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setTreasuresCollected(0);
    setCharacter({
      x: 50,
      y: 0,
      width: 50,
      height: 80,
      jumping: false,
      running: true,
      lives: 10,
    });
    worldPosition.current = 0;
    worldSpeed.current = 3;
    
    setTargetLocation({
      x: 1000 + Math.random() * 3000,
      y: Math.random() < 0.5 ? 0 : 200,
    });
    
    const gameObjects = initializeGameObjects();
    setObstacles(gameObjects.obstacles);
    setTreasures(gameObjects.treasures);
    setDecorations(gameObjects.decorations);
    setSweets(gameObjects.sweets);
    setSweetCounts(gameObjects.sweetCounts);
    setTotalTreasures(gameObjects.totalTreasures);
    
    const loopId = window.setInterval(() => {
      updateGameState();
    }, 1000 / 60);
    
    setGameLoopId(loopId);
    setShowTreasureModal(false);
  }, []);

  const pauseGame = useCallback(() => {
    if (gameState === 'playing') {
      setGameState('paused');
      if (gameLoopId) {
        clearInterval(gameLoopId);
        setGameLoopId(null);
      }
    }
  }, [gameState, gameLoopId]);

  const resumeGame = useCallback(() => {
    if (gameState === 'paused') {
      setGameState('playing');
      const loopId = window.setInterval(() => {
        updateGameState();
      }, 1000 / 60);
      setGameLoopId(loopId);
    }
  }, [gameState]);

  const gameOver = useCallback(() => {
    setGameState('gameOver');
    if (gameLoopId) {
      clearInterval(gameLoopId);
      setGameLoopId(null);
    }
    
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore, gameLoopId]);

  const restartGame = useCallback(() => {
    if (gameState === 'gameOver') {
      startGame();
    }
  }, [gameState, startGame]);

  const moveForward = useCallback(() => {
    if (gameState === 'playing') {
      worldPosition.current += worldSpeed.current;
      
      if (worldPosition.current % 1000 === 0) {
        worldSpeed.current += 0.1;
      }
    }
  }, [gameState]);

  // Initialize character controls
  const characterControls = createCharacterControls(gameState, setCharacter);
  const { jump, moveLeft, moveRight, stopMoving } = characterControls;

  // Initialize sweet collector
  const sweetCollector = createSweetCollector(sweets, setSweets, setSweetCounts, setScore, setCharacter);
  const { collectSweet } = sweetCollector;

  // Initialize game updater
  const gameUpdater = createGameUpdater(
    gameState,
    character,
    obstacles,
    sweets,
    treasures,
    decorations,
    worldSpeed,
    setObstacles,
    setSweets,
    setTreasures,
    setDecorations,
    setCharacter,
    setSweetCounts,
    setScore,
    setTreasuresCollected,
    gameOver
  );

  const updateGameState = useCallback(() => {
    if (gameState !== 'playing') return;
    
    moveForward();
    gameUpdater.updateGameObjects();
  }, [gameState, moveForward, gameUpdater]);

  useEffect(() => {
    return () => {
      if (gameLoopId) {
        clearInterval(gameLoopId);
      }
    };
  }, [gameLoopId]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        score,
        highScore,
        treasuresCollected,
        totalTreasures,
        character,
        obstacles,
        treasures,
        decorations,
        sweets,
        sweetCounts,
        startGame,
        pauseGame,
        resumeGame,
        gameOver,
        restartGame,
        jump,
        moveLeft,
        moveRight,
        moveForward,
        stopMoving,
        collectSweet,
        targetLocation,
        worldPosition,
        showTreasureModal,
        setShowTreasureModal,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
