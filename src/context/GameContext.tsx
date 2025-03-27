import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

type GameState = 'idle' | 'playing' | 'paused' | 'gameOver';

interface GameObject {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'cow' | 'coin' | 'gem' | 'chest' | 'temple' | 'banner' | 'platform' | 'clue' | 'snake' | 
         'tiger' | 'vulture' | 'insect' | 'beetle' | 'scorpion' | 'ground-rock' | 'ground-log' | 'ground-fire' |
         'dhokla' | 'mithai' | 'vadapav' | 'jalebi' | 'ladoo' | 'gurudwara' | 'mosque' | 'google-temple' | 'adobe-temple';
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
  glowing?: boolean;
}

interface SweetCounts {
  [key: string]: {
    collected: number;
    total: number;
  };
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
  sweets: GameObject[];
  sweetCounts: SweetCounts;
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
  collectSweet: (id: string) => void;
  targetLocation?: {x: number, y: number};
  worldPosition: React.MutableRefObject<number>;
  showTreasureModal: boolean;
  setShowTreasureModal: React.Dispatch<React.SetStateAction<boolean>>;
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
    
    initializeGameObjects();
    
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

  const jump = useCallback(() => {
    if (gameState === 'playing' && !character.jumping) {
      setCharacter(prev => ({ 
        ...prev, 
        jumping: true,
        y: prev.y - 200
      }));
      
      const jumpDuration = 500;
      const steps = 12;
      const stepTime = jumpDuration / steps;
      
      for (let i = 1; i < steps; i++) {
        setTimeout(() => {
          if (gameState === 'playing') {
            const progress = i / steps;
            const jumpHeight = -200 * 4 * progress * (1 - progress);
            
            setCharacter(prev => ({
              ...prev,
              y: jumpHeight
            }));
          }
        }, stepTime * i);
      }
      
      setTimeout(() => {
        setCharacter(prev => ({ 
          ...prev, 
          jumping: false,
          y: 0
        }));
      }, jumpDuration);
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

  const collectSweet = useCallback((id: string) => {
    setSweets(prev => prev.map(sweet => {
      if (sweet.id === id && !sweet.collected) {
        return { ...sweet, collected: true };
      }
      return sweet;
    }));

    setSweetCounts(prev => {
      const updatedCounts = { ...prev };
      
      const collectedSweet = sweets.find(s => s.id === id);
      if (collectedSweet && collectedSweet.collected === false && updatedCounts[collectedSweet.type]) {
        const currentCount = updatedCounts[collectedSweet.type].collected;
        const maxCount = updatedCounts[collectedSweet.type].total;
        updatedCounts[collectedSweet.type].collected = Math.min(currentCount + 1, maxCount);
      }
      
      return updatedCounts;
    });
    
    setScore(prev => prev + 25);
    
    setCharacter(prev => {
      if (!prev.glowing) {
        return { ...prev, glowing: true };
      }
      return prev;
    });
    
    setTimeout(() => {
      setCharacter(prev => ({ ...prev, glowing: false }));
    }, 1000);
  }, [sweets]);

  const initializeGameObjects = useCallback(() => {
    const newObstacles: GameObject[] = Array(5).fill(null).map((_, i) => ({
      id: `cow-${i}`,
      x: window.innerWidth + (i * 400) + Math.random() * 200,
      y: 0,
      width: 80,
      height: 60,
      type: 'cow' as const,
      speed: 2 + Math.random() * 2,
    }));
    
    const snakes: GameObject[] = Array(5).fill(null).map((_, i) => ({
      id: `snake-${i}`,
      x: window.innerWidth + (i * 300) + Math.random() * 150,
      y: 0,
      width: 60,
      height: 30,
      type: 'snake' as const,
      speed: 1.5 + Math.random() * 1.5,
      direction: Math.random() > 0.5 ? 'left' as const : 'right' as const,
    }));
    
    const tigers: GameObject[] = Array(3).fill(null).map((_, i) => ({
      id: `tiger-${i}`,
      x: window.innerWidth + (i * 600) + Math.random() * 300,
      y: 0,
      width: 90,
      height: 70,
      type: 'tiger' as const,
      speed: 3 + Math.random() * 2,
    }));
    
    const groundRocks: GameObject[] = Array(8).fill(null).map((_, i) => ({
      id: `rock-${i}`,
      x: window.innerWidth + (i * 350) + Math.random() * 200,
      y: 0,
      width: 40,
      height: 30,
      type: 'ground-rock' as const,
      speed: 0,
    }));
    
    const groundLogs: GameObject[] = Array(7).fill(null).map((_, i) => ({
      id: `log-${i}`,
      x: window.innerWidth + (i * 400) + Math.random() * 250,
      y: 0,
      width: 60,
      height: 20,
      type: 'ground-log' as const,
      speed: 0,
    }));
    
    const groundFires: GameObject[] = Array(6).fill(null).map((_, i) => ({
      id: `fire-${i}`,
      x: window.innerWidth + (i * 500) + Math.random() * 300,
      y: 0,
      width: 30,
      height: 40,
      type: 'ground-fire' as const,
      speed: 0,
    }));
    
    const allObstacles = [
      ...newObstacles, 
      ...snakes, 
      ...tigers, 
      ...groundRocks,
      ...groundLogs,
      ...groundFires
    ];
    
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
    
    const sweetTypes: Array<'dhokla' | 'mithai' | 'vadapav' | 'jalebi' | 'ladoo'> = 
      ['dhokla', 'mithai', 'vadapav', 'jalebi', 'ladoo'];
    
    const newSweets: GameObject[] = [];
    
    sweetTypes.forEach(type => {
      const sweetsOfType = Array(10).fill(null).map((_, i) => {
        let heightLevel;
        if (i < 2) {
          heightLevel = 50 + Math.random() * 50;
        } else if (i < 7) {
          heightLevel = 100 + Math.random() * 80;
        } else {
          heightLevel = 180 + Math.random() * 70;
        }
        
        return {
          id: `${type}-${i}`,
          x: window.innerWidth + (i * 250) + Math.random() * 200,
          y: heightLevel,
          width: 30,
          height: 30,
          type,
          collected: false,
        };
      });
      
      newSweets.push(...sweetsOfType);
    });
    
    const initialSweetCounts: SweetCounts = {};
    sweetTypes.forEach(type => {
      initialSweetCounts[type] = {
        collected: 0,
        total: 10
      };
    });
    
    setSweetCounts(initialSweetCounts);
    setSweets(newSweets);
    
    const googleTemple: GameObject = {
      id: 'google-temple',
      x: window.innerWidth + 1200,
      y: 0,
      width: 300,
      height: 350,
      type: 'google-temple',
    };
    
    const adobeTemple: GameObject = {
      id: 'adobe-temple',
      x: window.innerWidth + 2500,
      y: 0,
      width: 300,
      height: 350,
      type: 'adobe-temple',
    };
    
    const newDecorations: GameObject[] = [
      googleTemple,
      adobeTemple,
      
      ...Array(3).fill(null).map((_, i) => ({
        id: `temple-${i}`,
        x: window.innerWidth + (i * 800) + Math.random() * 400,
        y: 0,
        width: 200,
        height: 300,
        type: 'temple' as const,
      })),
      
      ...Array(2).fill(null).map((_, i) => ({
        id: `mosque-${i}`,
        x: window.innerWidth + (i * 1200) + Math.random() * 600,
        y: 0,
        width: 180,
        height: 280,
        type: 'mosque' as const,
      })),
      
      ...Array(2).fill(null).map((_, i) => ({
        id: `gurudwara-${i}`,
        x: window.innerWidth + (i * 1500) + Math.random() * 700,
        y: 0,
        width: 200,
        height: 320,
        type: 'gurudwara' as const,
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
      let newX = obstacle.x;
      let newY = obstacle.y;
      
      if (obstacle.type.startsWith('ground-')) {
        newX = obstacle.x - worldSpeed.current * 1.2;
      } else if (obstacle.type === 'vulture') {
        newX = obstacle.x - (obstacle.speed || worldSpeed.current);
        newY = (obstacle.flightHeight || 150) + Math.sin(newX / 100) * 30;
      } else if (obstacle.type === 'snake') {
        newX = obstacle.x - (obstacle.speed || worldSpeed.current) * 0.7;
        if (Math.random() < 0.02) {
          obstacle.direction = obstacle.direction === 'left' ? 'right' : 'left';
        }
        if (obstacle.direction === 'left') {
          newX -= 0.5;
        } else {
          newX += 0.2;
        }
      } else if (obstacle.type === 'tiger') {
        newX = obstacle.x - (obstacle.speed || worldSpeed.current);
        if (Math.random() < 0.05) {
          newX = obstacle.x - (obstacle.speed || worldSpeed.current) * 2;
        }
      } else {
        newX = obstacle.x - (obstacle.speed || worldSpeed.current);
      }
      
      if (newX < -obstacle.width) {
        if (obstacle.type.startsWith('ground-')) {
          return {
            ...obstacle,
            x: window.innerWidth + Math.random() * 500,
          };
        } else if (isVultureType(obstacle.type)) {
          return {
            ...obstacle,
            x: window.innerWidth + Math.random() * 300,
            y: 150 + Math.random() * 100,
            speed: getEnemySpeed(obstacle.type),
            flightHeight: 150 + Math.random() * 100,
          };
        } else {
          const newY = isAerialObstacle(obstacle.type) ? (150 + Math.random() * 100) : 0;
          return {
            ...obstacle,
            x: window.innerWidth + Math.random() * 300,
            y: newY,
            speed: getEnemySpeed(obstacle.type),
          };
        }
      }
      
      return {
        ...obstacle,
        x: newX,
        y: newY,
      };
    }));
    
    function isVultureType(type: GameObject['type']): boolean {
      return type === 'vulture';
    }
    
    function isAerialObstacle(type: GameObject['type']): boolean {
      return type === 'vulture' || type === 'insect' || type === 'beetle';
    }
    
    function getEnemySpeed(type: GameObject['type']) {
      switch(type) {
        case 'cow': return 2 + Math.random() * 2;
        case 'snake': return 1.5 + Math.random() * 1.5;
        case 'tiger': return 3 + Math.random() * 2;
        case 'vulture': return 2.5 + Math.random() * 1.5;
        case 'insect': return 3 + Math.random() * 2;
        case 'beetle': return 1.5 + Math.random() * 1.5;
        case 'scorpion': return 1 + Math.random() * 1;
        default: return 2 + Math.random() * 2;
      }
    }
    
    setTreasures(prev => {
      const updatedTreasures = prev.map(treasure => {
        if (treasure.collected) return treasure;
        
        const newX = treasure.x - worldSpeed.current * 1.2;
        
        if (newX < -treasure.width) {
          const distance = treasure.type === 'chest' 
            ? window.innerWidth + Math.random() * 500 + 200
            : window.innerWidth + Math.random() * 300;
            
          return {
            ...treasure,
            x: distance,
            y: 120 + Math.random() * 180,
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
            x: window.innerWidth + (i * 300) + Math.random() * 200,
            y: 120 + Math.random() * 180,
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
    
    setSweets(prev => {
      return prev.map(sweet => {
        if (sweet.collected) return sweet;
        
        const newX = sweet.x - worldSpeed.current * 1.2;
        
        if (newX < -sweet.width) {
          const jumpHeightOptions = [80, 100, 120, 150, 180, 200];
          const randomJumpHeight = jumpHeightOptions[Math.floor(Math.random() * jumpHeightOptions.length)];
          
          return {
            ...sweet,
            x: window.innerWidth + Math.random() * 300,
            y: randomJumpHeight,
          };
        }
        
        return {
          ...sweet,
          x: newX,
        };
      });
    });
    
    setDecorations(prev => prev.map(decoration => {
      let speed = 1;
      
      if (decoration.type === 'platform' || decoration.type === 'clue') {
        speed = worldSpeed.current;
      } else if (decoration.type === 'google-temple' || decoration.type === 'adobe-temple') {
        speed = worldSpeed.current * 0.8;
      } else {
        speed = worldSpeed.current * 0.9;
      }
      
      const newX = decoration.x - speed;
      
      if (newX < -decoration.width) {
        if (decoration.type === 'temple' || decoration.type === 'mosque' || decoration.type === 'gurudwara') {
          return {
            ...decoration,
            x: window.innerWidth + Math.random() * 500,
          };
        } else if (decoration.type === 'google-temple') {
          return {
            ...decoration,
            x: window.innerWidth + 1500 + Math.random() * 500,
          };
        } else if (decoration.type === 'adobe-temple') {
          return {
            ...decoration,
            x: window.innerWidth + 2000 + Math.random() * 500,
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
    
    const sweetCollisions = sweets.filter(sweet => (
      !sweet.collected &&
      character.x < sweet.x + sweet.width &&
      character.x + character.width > sweet.x &&
      character.y < sweet.y + sweet.height &&
      character.y + character.height > sweet.y
    ));
    
    if (sweetCollisions.length > 0) {
      setSweets(prev => prev.map(sweet => {
        if (sweetCollisions.some(s => s.id === sweet.id) && !sweet.collected) {
          return { ...sweet, collected: true };
        }
        return sweet;
      }));
      
      setSweetCounts(prev => {
        const newCounts = { ...prev };
        
        sweetCollisions.forEach(sweet => {
          if (newCounts[sweet.type] && !sweet.collected) {
            const currentCount = newCounts[sweet.type].collected;
            const maxCount = newCounts[sweet.type].total;
            newCounts[sweet.type].collected = Math.min(currentCount + 1, maxCount);
          }
        });
        
        return newCounts;
      });
      
      setScore(prev => prev + (sweetCollisions.length * 25));
      
      setCharacter(prev => ({ ...prev, glowing: true }));
      
      setTimeout(() => {
        setCharacter(prev => ({ ...prev, glowing: false }));
      }, 1000);
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
  }, [gameState, character, obstacles, treasures, gameOver, sweets]);

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
