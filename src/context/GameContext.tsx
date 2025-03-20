
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

type GameState = 'idle' | 'playing' | 'paused' | 'gameOver';

interface GameObject {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'cow' | 'coin' | 'gem' | 'chest' | 'temple' | 'banner' | 'platform' | 'clue';
  speed?: number;
  collected?: boolean;
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
  treasuresCollected: number;
  totalTreasures: number;
  character: Character;
  obstacles: GameObject[];
  treasures: GameObject[];
  decorations: GameObject[];
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  gameOver: () => void;
  restartGame: () => void;
  jump: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  moveForward: () => void;
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
  const [treasuresCollected, setTreasuresCollected] = useState(0);
  const [totalTreasures, setTotalTreasures] = useState(0);
  const [character, setCharacter] = useState<Character>({
    x: 50,
    y: 0,
    width: 50,
    height: 80,
    jumping: false,
    running: true,
  });
  const [obstacles, setObstacles] = useState<GameObject[]>([]);
  const [treasures, setTreasures] = useState<GameObject[]>([]);
  const [decorations, setDecorations] = useState<GameObject[]>([]);
  const [gameLoopId, setGameLoopId] = useState<number | null>(null);
  const worldPosition = useRef(0);
  const worldSpeed = useRef(3);

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('indianTreasureHuntHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Save high score to localStorage when it changes
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
    });
    worldPosition.current = 0;
    worldSpeed.current = 3;
    
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

  const moveForward = useCallback(() => {
    if (gameState === 'playing') {
      worldPosition.current += worldSpeed.current;
      
      // Increase speed gradually
      if (worldPosition.current % 1000 === 0) {
        worldSpeed.current += 0.1;
      }
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
    const newObstacles: GameObject[] = Array(5).fill(null).map((_, i) => ({
      id: `cow-${i}`,
      x: window.innerWidth + (i * 600) + Math.random() * 300,
      y: 0,
      width: 80,
      height: 60,
      type: 'cow' as const,
      speed: 2 + Math.random() * 2,
    }));
    
    // Create treasures (coins, gems, chests)
    const treasureTypes: Array<'coin' | 'gem' | 'chest'> = ['coin', 'gem', 'chest'];
    const newTreasures: GameObject[] = Array(15).fill(null).map((_, i) => {
      const type = treasureTypes[Math.floor(Math.random() * 3)] as 'coin' | 'gem' | 'chest';
      let width = 30;
      let height = 30;
      
      if (type === 'gem') {
        width = 20;
        height = 30;
      } else if (type === 'chest') {
        width = 40;
        height = 30;
      }
      
      return {
        id: `treasure-${i}`,
        x: window.innerWidth + (i * 400) + Math.random() * 300,
        y: 150 + Math.random() * 150,
        width,
        height,
        type,
        collected: false,
      };
    });
    
    // Set total treasures count
    setTotalTreasures(newTreasures.length);
    
    // Create decorations (temples, banners, platforms, clues)
    const newDecorations: GameObject[] = [
      // Temples in background
      ...Array(3).fill(null).map((_, i) => ({
        id: `temple-${i}`,
        x: window.innerWidth + (i * 800) + Math.random() * 400,
        y: 0,
        width: 200,
        height: 300,
        type: 'temple' as const,
      })),
      
      // Banners
      ...Array(5).fill(null).map((_, i) => ({
        id: `banner-${i}`,
        x: window.innerWidth + (i * 400) + Math.random() * 200,
        y: 100 + Math.random() * 100,
        width: 100,
        height: 50,
        type: 'banner' as const,
      })),
      
      // Platforms
      ...Array(5).fill(null).map((_, i) => ({
        id: `platform-${i}`,
        x: window.innerWidth + (i * 500) + Math.random() * 300,
        y: 200 + Math.random() * 150,
        width: 150,
        height: 30,
        type: 'platform' as const,
      })),
      
      // Clues
      ...Array(5).fill(null).map((_, i) => ({
        id: `clue-${i}`,
        x: window.innerWidth + (i * 600) + Math.random() * 400,
        y: 100 + Math.random() * 200,
        width: 30,
        height: 30,
        type: 'clue' as const,
      })),
    ];
    
    setObstacles(newObstacles);
    setTreasures(newTreasures);
    setDecorations(newDecorations);
  }, []);

  // Update game state
  const updateGameState = useCallback(() => {
    if (gameState !== 'playing') return;
    
    // Move obstacles
    setObstacles(prev => prev.map(obstacle => {
      const newX = obstacle.x - (obstacle.speed || worldSpeed.current);
      
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
    
    // Move treasures
    setTreasures(prev => {
      const updatedTreasures = prev.map(treasure => {
        if (treasure.collected) return treasure;
        
        const newX = treasure.x - worldSpeed.current;
        
        // Reset treasure position if it goes off screen
        if (newX < -treasure.width) {
          // For chests, we want them to be more rare, so we place them further
          const distance = treasure.type === 'chest' 
            ? window.innerWidth + Math.random() * 1000 + 500
            : window.innerWidth + Math.random() * 500;
            
          return {
            ...treasure,
            x: distance,
            y: 150 + Math.random() * 150,
          };
        }
        
        return {
          ...treasure,
          x: newX,
        };
      });
      
      // Check if we need to add more treasures
      if (updatedTreasures.filter(t => !t.collected).length < 5) {
        const treasureTypes: Array<'coin' | 'gem' | 'chest'> = ['coin', 'gem', 'chest'];
        const newTreasures = Array(3).fill(null).map((_, i) => {
          const type = treasureTypes[Math.floor(Math.random() * 3)] as 'coin' | 'gem' | 'chest';
          let width = 30;
          let height = 30;
          
          if (type === 'gem') {
            width = 20;
            height = 30;
          } else if (type === 'chest') {
            width = 40;
            height = 30;
          }
          
          return {
            id: `treasure-${Date.now()}-${i}`,
            x: window.innerWidth + (i * 400) + Math.random() * 300,
            y: 150 + Math.random() * 150,
            width,
            height,
            type,
            collected: false,
          };
        });
        
        return [...updatedTreasures, ...newTreasures];
      }
      
      return updatedTreasures;
    });
    
    // Move decorations (slower than obstacles)
    setDecorations(prev => prev.map(decoration => {
      let speed = 1; // Default slow speed for background elements
      
      if (decoration.type === 'platform' || decoration.type === 'clue') {
        speed = worldSpeed.current; // Platforms move at same speed as game
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
        } else if (decoration.type === 'clue') {
          return {
            ...decoration,
            x: window.innerWidth + Math.random() * 600,
            y: 100 + Math.random() * 200,
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
    
    // 2. Check collision with treasures (score)
    const treasureCollisions = treasures.filter(treasure => (
      !treasure.collected &&
      character.x < treasure.x + treasure.width &&
      character.x + character.width > treasure.x &&
      character.y < treasure.y + treasure.height &&
      character.y + character.height > treasure.y
    ));
    
    if (treasureCollisions.length > 0) {
      // Mark treasures as collected
      setTreasures(prev => prev.map(treasure => {
        if (treasureCollisions.some(t => t.id === treasure.id)) {
          return { ...treasure, collected: true };
        }
        return treasure;
      }));
      
      // Calculate score based on treasure type
      let treasureScore = 0;
      treasureCollisions.forEach(treasure => {
        if (treasure.type === 'coin') treasureScore += 10;
        else if (treasure.type === 'gem') treasureScore += 30;
        else if (treasure.type === 'chest') treasureScore += 100;
      });
      
      // Increase score and treasures collected count
      setScore(prev => prev + treasureScore);
      setTreasuresCollected(prev => prev + treasureCollisions.length);
    }
    
    // Increase score gradually as game progresses
    setScore(prev => prev + 0.1);
  }, [gameState, character, obstacles, treasures, gameOver]);
  
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
        treasuresCollected,
        totalTreasures,
        character,
        obstacles,
        treasures,
        decorations,
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
