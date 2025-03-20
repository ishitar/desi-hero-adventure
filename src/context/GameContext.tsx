
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type GameState = 'idle' | 'playing' | 'paused' | 'gameOver';

interface GameObject {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'cow' | 'coin' | 'temple' | 'banner' | 'platform';
  speed?: number;
}

interface Character {
  x: number;
  y: number;
  width: number;
  height: number;
  jumping: boolean;
  running: boolean;
}

interface GameContextProps {
  gameState: GameState;
  score: number;
  highScore: number;
  character: Character;
  obstacles: GameObject[];
  coins: GameObject[];
  decorations: GameObject[];
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  gameOver: () => void;
  restartGame: () => void;
  jump: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  stopMoving: () => void;
}

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
  const [character, setCharacter] = useState<Character>({
    x: 20,
    y: 0,
    width: 50,
    height: 80,
    jumping: false,
    running: false,
  });
  const [obstacles, setObstacles] = useState<GameObject[]>([]);
  const [coins, setCoins] = useState<GameObject[]>([]);
  const [decorations, setDecorations] = useState<GameObject[]>([]);
  const [gameLoopId, setGameLoopId] = useState<number | null>(null);

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('indianMarioHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Save high score to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('indianMarioHighScore', highScore.toString());
  }, [highScore]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setCharacter({
      x: 20,
      y: 0,
      width: 50,
      height: 80,
      jumping: false,
      running: false,
    });
    
    // Initialize game objects
    initializeGameObjects();
    
    // Start game loop
    const loopId = window.setInterval(() => {
      updateGameState();
    }, 1000 / 60); // 60 FPS
    
    setGameLoopId(loopId);
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
    
    // Update high score if current score is higher
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore, gameLoopId]);

  const restartGame = useCallback(() => {
    if (gameState === 'gameOver') {
      startGame();
    }
  }, [gameState, startGame]);

  const jump = useCallback(() => {
    if (gameState === 'playing' && !character.jumping) {
      setCharacter(prev => ({ ...prev, jumping: true }));
      
      // Jump animation logic
      setTimeout(() => {
        setCharacter(prev => ({ ...prev, jumping: false }));
      }, 500); // Jump duration matches CSS animation
    }
  }, [gameState, character.jumping]);

  const moveLeft = useCallback(() => {
    if (gameState === 'playing') {
      setCharacter(prev => ({ 
        ...prev, 
        running: true,
        x: Math.max(0, prev.x - 10) 
      }));
    }
  }, [gameState]);

  const moveRight = useCallback(() => {
    if (gameState === 'playing') {
      setCharacter(prev => ({ 
        ...prev, 
        running: true,
        x: Math.min(window.innerWidth - prev.width, prev.x + 10) 
      }));
    }
  }, [gameState]);

  const stopMoving = useCallback(() => {
    if (gameState === 'playing') {
      setCharacter(prev => ({ ...prev, running: false }));
    }
  }, [gameState]);

  // Initialize game objects
  const initializeGameObjects = useCallback(() => {
    // Create obstacles (cows)
    const newObstacles: GameObject[] = Array(3).fill(null).map((_, i) => ({
      id: `cow-${i}`,
      x: window.innerWidth + (i * 600) + Math.random() * 300,
      y: 0,
      width: 80,
      height: 60,
      type: 'cow',
      speed: 2 + Math.random() * 2,
    }));
    
    // Create coins
    const newCoins: GameObject[] = Array(10).fill(null).map((_, i) => ({
      id: `coin-${i}`,
      x: window.innerWidth + (i * 200) + Math.random() * 300,
      y: 150 + Math.random() * 150,
      width: 30,
      height: 30,
      type: 'coin',
    }));
    
    // Create decorations (temples, banners)
    const newDecorations: GameObject[] = [
      // Temples in background
      ...Array(3).fill(null).map((_, i) => ({
        id: `temple-${i}`,
        x: window.innerWidth + (i * 800) + Math.random() * 400,
        y: 0,
        width: 200,
        height: 300,
        type: 'temple',
      })),
      
      // Banners
      ...Array(5).fill(null).map((_, i) => ({
        id: `banner-${i}`,
        x: window.innerWidth + (i * 400) + Math.random() * 200,
        y: 100 + Math.random() * 100,
        width: 100,
        height: 50,
        type: 'banner',
      })),
      
      // Platforms
      ...Array(5).fill(null).map((_, i) => ({
        id: `platform-${i}`,
        x: window.innerWidth + (i * 500) + Math.random() * 300,
        y: 200 + Math.random() * 150,
        width: 150,
        height: 30,
        type: 'platform',
      })),
    ];
    
    setObstacles(newObstacles);
    setCoins(newCoins);
    setDecorations(newDecorations);
  }, []);

  // Update game state
  const updateGameState = useCallback(() => {
    if (gameState !== 'playing') return;
    
    // Move obstacles
    setObstacles(prev => prev.map(obstacle => {
      const newX = obstacle.x - (obstacle.speed || 3);
      
      // Reset obstacle position if it goes off screen
      if (newX < -obstacle.width) {
        return {
          ...obstacle,
          x: window.innerWidth + Math.random() * 500,
        };
      }
      
      return {
        ...obstacle,
        x: newX,
      };
    }));
    
    // Move coins
    setCoins(prev => prev.map(coin => {
      const newX = coin.x - 3;
      
      // Reset coin position if it goes off screen
      if (newX < -coin.width) {
        return {
          ...coin,
          x: window.innerWidth + Math.random() * 500,
          y: 150 + Math.random() * 150,
        };
      }
      
      return {
        ...coin,
        x: newX,
      };
    }));
    
    // Move decorations (slower than obstacles)
    setDecorations(prev => prev.map(decoration => {
      let speed = 1; // Default slow speed for background elements
      
      if (decoration.type === 'platform') {
        speed = 3; // Platforms move at same speed as game
      }
      
      const newX = decoration.x - speed;
      
      // Reset decoration position if it goes off screen
      if (newX < -decoration.width) {
        if (decoration.type === 'temple') {
          return {
            ...decoration,
            x: window.innerWidth + Math.random() * 400,
          };
        } else if (decoration.type === 'banner') {
          return {
            ...decoration,
            x: window.innerWidth + Math.random() * 300,
            y: 100 + Math.random() * 100,
          };
        } else if (decoration.type === 'platform') {
          return {
            ...decoration,
            x: window.innerWidth + Math.random() * 400,
            y: 200 + Math.random() * 150,
          };
        }
      }
      
      return {
        ...decoration,
        x: newX,
      };
    }));
    
    // Collision detection
    // 1. Check collision with cows (game over)
    const cowCollision = obstacles.some(cow => (
      character.x < cow.x + cow.width &&
      character.x + character.width > cow.x &&
      character.y < cow.y + cow.height &&
      character.y + character.height > cow.y
    ));
    
    if (cowCollision) {
      gameOver();
      return;
    }
    
    // 2. Check collision with coins (score)
    const coinCollisions = coins.filter(coin => (
      character.x < coin.x + coin.width &&
      character.x + character.width > coin.x &&
      character.y < coin.y + coin.height &&
      character.y + character.height > coin.y
    ));
    
    if (coinCollisions.length > 0) {
      // Increase score and remove collected coins
      setScore(prev => prev + (coinCollisions.length * 10));
      setCoins(prev => prev.filter(coin => !coinCollisions.includes(coin)));
      
      // Add new coins to replace collected ones
      const newCoins = coinCollisions.map((_, i) => ({
        id: `coin-${Date.now()}-${i}`,
        x: window.innerWidth + Math.random() * 500,
        y: 150 + Math.random() * 150,
        width: 30,
        height: 30,
        type: 'coin' as const,
      }));
      
      setCoins(prev => [...prev, ...newCoins]);
    }
    
    // Increase score gradually as game progresses
    setScore(prev => prev + 0.1);
  }, [gameState, character, obstacles, coins, gameOver]);
  
  // Clean up game loop on unmount
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
        character,
        obstacles,
        coins,
        decorations,
        startGame,
        pauseGame,
        resumeGame,
        gameOver,
        restartGame,
        jump,
        moveLeft,
        moveRight,
        stopMoving,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
