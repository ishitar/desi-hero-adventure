
export type GameState = 'idle' | 'playing' | 'paused' | 'gameOver';

export interface GameObject {
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

export interface Character {
  x: number;
  y: number;
  width: number;
  height: number;
  jumping: boolean;
  running: boolean;
  lives: number;
  glowing?: boolean;
}

export interface SweetCounts {
  [key: string]: {
    collected: number;
    total: number;
  };
}

export interface GameContextProps {
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
