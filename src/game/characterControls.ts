
import { Character, GameState } from "@/types/gameTypes";

export const createCharacterControls = (
  gameState: GameState,
  setCharacter: React.Dispatch<React.SetStateAction<Character>>
) => {
  const jump = () => {
    if (gameState === 'playing') {
      setCharacter(prev => {
        if (prev.jumping) return prev;
        
        return { 
          ...prev, 
          jumping: true,
          y: prev.y - 200
        };
      });
      
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
  };

  const moveLeft = () => {
    if (gameState === 'playing') {
      setCharacter(prev => ({ 
        ...prev, 
        running: true,
        x: Math.max(0, prev.x - 10) 
      }));
    }
  };

  const moveRight = () => {
    if (gameState === 'playing') {
      setCharacter(prev => ({ 
        ...prev, 
        running: true,
        x: Math.min(window.innerWidth - prev.width, prev.x + 10) 
      }));
    }
  };

  const stopMoving = () => {
    if (gameState === 'playing') {
      setCharacter(prev => ({ ...prev, running: false }));
    }
  };

  return {
    jump,
    moveLeft,
    moveRight,
    stopMoving
  };
};
