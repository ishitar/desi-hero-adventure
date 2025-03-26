
import { GameObject, SweetCounts } from "@/types/gameTypes";

export const initializeGameObjects = () => {
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
  
  const sweetTypes: Array<'dhokla' | 'mithai' | 'vadapav' | 'jalebi' | 'ladoo'> = 
    ['dhokla', 'mithai', 'vadapav', 'jalebi', 'ladoo'];
  
  const newSweets: GameObject[] = [];
  
  // Create sweets with better distribution
  sweetTypes.forEach(type => {
    const sweetsOfType = Array(10).fill(null).map((_, i) => {
      // Distribute sweets along different x coordinates with greater spacing
      const xPosition = window.innerWidth + (i * 250) + Math.random() * 200;
      
      // Create three height tiers for sweets
      let yPosition;
      if (i % 3 === 0) {
        yPosition = 80 + Math.random() * 40; // Lower tier
      } else if (i % 3 === 1) {
        yPosition = 150 + Math.random() * 40; // Middle tier
      } else {
        yPosition = 220 + Math.random() * 40; // Upper tier
      }
      
      return {
        id: `${type}-${i}`,
        x: xPosition,
        y: yPosition,
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
  
  return {
    obstacles: allObstacles,
    treasures: newTreasures,
    decorations: newDecorations,
    sweets: newSweets,
    sweetCounts: initialSweetCounts,
    totalTreasures: newTreasures.length
  };
};
