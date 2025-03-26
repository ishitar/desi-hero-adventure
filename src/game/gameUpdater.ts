
import { Character, GameObject, GameState, SweetCounts } from "@/types/gameTypes";

export const createGameUpdater = (
  gameState: GameState,
  character: Character,
  obstacles: GameObject[],
  sweets: GameObject[],
  treasures: GameObject[],
  decorations: GameObject[],
  worldSpeed: React.MutableRefObject<number>,
  setObstacles: React.Dispatch<React.SetStateAction<GameObject[]>>,
  setSweets: React.Dispatch<React.SetStateAction<GameObject[]>>,
  setTreasures: React.Dispatch<React.SetStateAction<GameObject[]>>,
  setDecorations: React.Dispatch<React.SetStateAction<GameObject[]>>,
  setCharacter: React.Dispatch<React.SetStateAction<Character>>,
  setSweetCounts: React.Dispatch<React.SetStateAction<SweetCounts>>,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  setTreasuresCollected: React.Dispatch<React.SetStateAction<number>>,
  gameOver: () => void
) => {
  const updateGameObjects = () => {
    if (gameState !== 'playing') return;
    
    updateObstacles();
    updateTreasures();
    updateSweets();
    updateDecorations();
    checkCollisions();
    
    // Increment score
    setScore(prev => prev + 0.1);
  };
  
  const updateObstacles = () => {
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
  };
  
  const updateTreasures = () => {
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
  };
  
  const updateSweets = () => {
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
  };
  
  const updateDecorations = () => {
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
  };
  
  const checkCollisions = () => {
    checkObstacleCollisions();
    checkSweetCollisions();
    checkTreasureCollisions();
  };
  
  const checkObstacleCollisions = () => {
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
  };
  
  const checkSweetCollisions = () => {
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
  };
  
  const checkTreasureCollisions = () => {
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
  };
  
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
  
  return {
    updateGameObjects
  };
};
