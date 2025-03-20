
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

type GameState = 'idle' | 'playing' | 'paused' | 'gameOver';

interface GameObject {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'cow' | 'coin' | 'gem' | 'chest' | 'temple' | 'banner' | 'platform' | 'clue' | 'snake' | 'tiger' | 'vulture' | 'insect' | 'beetle' | 'scorpion';
  speed?: number;
  collected?: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
  flightHeight?: number;
}

interface Character {
  x: number;
  y: number;
  width: number;
  height: number;
  jumping: boolean;
  running: boolean;
  lives: number;
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
  targetLocation?: {x: number, y: number};
  worldPosition: React.MutableRefObject<number>; // Added worldPosition
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
    lives: 10,
  });
  const [obstacles, setObstacles] = useState<GameObject[]>([]);
  const [treasures, setTreasures] = useState<GameObject[]>([]);
  const [decorations, setDecorations] = useState<GameObject[]>([]);
  const [gameLoopId, setGameLoopId] = useState<number | null>(null);
  const worldPosition = useRef(0);
  const worldSpeed = useRef(3);
  const [targetLocation, setTargetLocation] = useState<{x: number, y: number} | undefined>(undefined);

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
    
    initializeGameObjects();
    
    const loopId = window.setInterval(() => {
      updateGameState();
    }, 1000 / 60);
    
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
      
      setTimeout(() => {
        setCharacter(prev => ({ ...prev, jumping: false }));
      }, 500);
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

  const initializeGameObjects = useCallback(() => {
    const newObstacles: GameObject[] = Array(3).fill(null).map((_, i) => ({
      id: `cow-${i}`,
      x: window.innerWidth + (i * 600) + Math.random() * 300,
      y: 0,
      width: 80,
      height: 60,
      type: 'cow' as const,
      speed: 2 + Math.random() * 2,
    }));
    
    const snakes: GameObject[] = Array(3).fill(null).map((_, i) => ({
      id: `snake-${i}`,
      x: window.innerWidth + (i * 400) + Math.random() * 200,
      y: 0,
      width: 60,
      height: 30,
      type: 'snake' as const,
      speed: 1.5 + Math.random() * 1.5,
      direction: Math.random() > 0.5 ? 'left' as const : 'right' as const,
    }));
    
    const tigers: GameObject[] = Array(2).fill(null).map((_, i) => ({
      id: `tiger-${i}`,
      x: window.innerWidth + (i * 800) + Math.random() * 400,
      y: 0,
      width: 90,
      height: 70,
      type: 'tiger' as const,
      speed: 3 + Math.random() * 2,
    }));
    
    const vultures: GameObject[] = Array(3).fill(null).map((_, i) => ({
      id: `vulture-${i}`,
      x: window.innerWidth + (i * 500) + Math.random() * 300,
      y: 150 + Math.random() * 100,
      width: 60,
      height: 40,
      type: 'vulture' as const,
      speed: 2.5 + Math.random() * 1.5,
      flightHeight: 150 + Math.random() * 100,
    }));
    
    const insects: GameObject[] = Array(4).fill(null).map((_, i) => ({
      id: `insect-${i}`,
      x: window.innerWidth + (i * 300) + Math.random() * 200,
      y: 30 + Math.random() * 50,
      width: 20,
      height: 15,
      type: 'insect' as const,
      speed: 3 + Math.random() * 2,
    }));
    
    const beetles: GameObject[] = Array(3).fill(null).map((_, i) => ({
      id: `beetle-${i}`,
      x: window.innerWidth + (i * 400) + Math.random() * 300,
      y: 10,
      width: 25,
      height: 20,
      type: 'beetle' as const,
      speed: 1.5 + Math.random() * 1.5,
    }));
    
    const scorpions: GameObject[] = Array(2).fill(null).map((_, i) => ({
      id: `scorpion-${i}`,
      x: window.innerWidth + (i * 600) + Math.random() * 400,
      y: 5,
      width: 30,
      height: 20,
      type: 'scorpion' as const,
      speed: 1 + Math.random() * 1,
    }));
    
    const allObstacles = [...newObstacles, ...snakes, ...tigers, ...vultures, ...insects, ...beetles, ...scorpions];
    
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
    
    setTotalTreasures(newTreasures.length);
    
    const newDecorations: GameObject[] = [
      ...Array(3).fill(null).map((_, i) => ({
        id: `temple-${i}`,
        x: window.innerWidth + (i * 800) + Math.random() * 400,
        y: 0,
        width: 200,
        height: 300,
        type: 'temple' as const,
      })),
      
      ...Array(5).fill(null).map((_, i) => ({
        id: `banner-${i}`,
        x: window.innerWidth + (i * 400) + Math.random() * 200,
        y: 100 + Math.random() * 100,
        width: 100,
        height: 50,
        type: 'banner' as const,
      })),
      
      ...Array(5).fill(null).map((_, i) => ({
        id: `platform-${i}`,
        x: window.innerWidth + (i * 500) + Math.random() * 300,
        y: 200 + Math.random() * 150,
        width: 150,
        height: 30,
        type: 'platform' as const,
      })),
      
      ...Array(5).fill(null).map((_, i) => ({
        id: `clue-${i}`,
        x: window.innerWidth + (i * 600) + Math.random() * 400,
        y: 100 + Math.random() * 200,
        width: 30,
        height: 30,
        type: 'clue' as const,
      })),
    ];
    
    setObstacles(allObstacles);
    setTreasures(newTreasures);
    setDecorations(newDecorations);
  }, []);

  const updateGameState = useCallback(() => {
    if (gameState !== 'playing') return;
    
    setObstacles(prev => prev.map(obstacle => {
      let newX = obstacle.x - (obstacle.speed || worldSpeed.current);
      let newY = obstacle.y;
      
      if (obstacle.type === 'vulture') {
        newY = (obstacle.flightHeight || 150) + Math.sin(newX / 100) * 30;
      } else if (obstacle.type === 'snake') {
        newX = obstacle.x - (obstacle.speed || worldSpeed.current) * 0.7;
        if (Math.random() < 0.02) {
          obstacle.direction = obstacle.direction === 'left' ? 'right' : 'left';
        }
        if (obstacle.direction === 'left') {
          newX -= 0.5;
        } else {
          newX -= 0.2;
        }
      } else if (obstacle.type === 'tiger') {
        if (Math.random() < 0.05) {
          newX = obstacle.x - (obstacle.speed || worldSpeed.current) * 2;
        }
      }
      
      if (newX < -obstacle.width) {
        return {
          ...obstacle,
          x: window.innerWidth + Math.random() * 500,
          y: obstacle.type === 'vulture' ? (150 + Math.random() * 100) : 0,
          speed: getEnemySpeed(obstacle.type),
          flightHeight: obstacle.type === 'vulture' ? (150 + Math.random() * 100) : undefined,
        };
      }
      
      return {
        ...obstacle,
        x: newX,
        y: newY,
      };
    }));
    
    function getEnemySpeed(type: string) {
      switch(type) {
        case 'cow': return 2 + Math.random() * 2;
        case 'snake': return 1.5 + Math.random() * 1.5;
        case 'tiger': return 3 + Math.random() * 2;
        case 'vulture': return 2.5 + Math.random() * 1.5;
        default: return 2 + Math.random() * 2;
      }
    }
    
    setTreasures(prev => {
      const updatedTreasures = prev.map(treasure => {
        if (treasure.collected) return treasure;
        
        const newX = treasure.x - worldSpeed.current;
        
        if (newX < -treasure.width) {
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
    
    setDecorations(prev => prev.map(decoration => {
      let speed = 1;
      
      if (decoration.type === 'platform' || decoration.type === 'clue') {
        speed = worldSpeed.current;
      }
      
      const newX = decoration.x - speed;
      
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
    
    const obstacleCollision = obstacles.some(enemy => (
      character.x < enemy.x + enemy.width &&
      character.x + character.width > enemy.x &&
      character.y < enemy.y + enemy.height &&
      character.y + character.height > enemy.y
    ));
    
    if (obstacleCollision) {
      setCharacter(prev => {
        const newLives = prev.lives - 1;
        
        if (newLives <= 0) {
          gameOver();
        }
        
        return {
          ...prev,
          lives: Math.max(0, newLives)
        };
      });
      
      setObstacles(prev => prev.map(obs => {
        if (
          character.x < obs.x + obs.width &&
          character.x + character.width > obs.x &&
          character.y < obs.y + obs.height &&
          character.y + character.height > obs.y
        ) {
          return {
            ...obs,
            x: obs.x + 150
          };
        }
        return obs;
      }));
    }
    
    const treasureCollisions = treasures.filter(treasure => (
      !treasure.collected &&
      character.x < treasure.x + treasure.width &&
      character.x + character.width > treasure.x &&
      character.y < treasure.y + treasure.height &&
      character.y + character.height > treasure.y
    ));
    
    if (treasureCollisions.length > 0) {
      setTreasures(prev => prev.map(treasure => {
        if (treasureCollisions.some(t => t.id === treasure.id)) {
          return { ...treasure, collected: true };
        }
        return treasure;
      }));
      
      let treasureScore = 0;
      treasureCollisions.forEach(treasure => {
        if (treasure.type === 'coin') treasureScore += 10;
        else if (treasure.type === 'gem') treasureScore += 30;
        else if (treasure.type === 'chest') treasureScore += 100;
      });
      
      setScore(prev => prev + treasureScore);
      setTreasuresCollected(prev => prev + treasureCollisions.length);
    }
    
    setScore(prev => prev + 0.1);
  }, [gameState, character, obstacles, treasures, gameOver]);
  
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
        targetLocation,
        worldPosition, // Expose worldPosition to components
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
