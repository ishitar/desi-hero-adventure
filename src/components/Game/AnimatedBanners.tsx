
import React from 'react';
import { useGame } from '@/context/GameContext';

const AnimatedBanners: React.FC = () => {
  const { sweetCounts } = useGame();
  
  // Define positions for the sweet icons
  const sweetPositions = [
    { left: '15%', top: '55%', type: 'dhokla', delay: '0s' },
    { left: '35%', top: '45%', type: 'mithai', delay: '0.5s' },
    { left: '55%', top: '50%', type: 'vadapav', delay: '1s' },
    { left: '75%', top: '48%', type: 'jalebi', delay: '1.5s' },
    { left: '90%', top: '52%', type: 'ladoo', delay: '2s' },
  ];
  
  // Get the sweet icon based on type
  const getSweetIcon = (type: string) => {
    switch(type) {
      case 'dhokla':
        return (
          <div className="w-12 h-12 relative bg-yellow-200 rounded-sm border-2 border-yellow-600">
            <div className="w-full h-1/4 bg-yellow-400 absolute top-0"></div>
            <div className="w-2/3 h-2/3 bg-yellow-300 rounded-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        );
      case 'mithai':
        return (
          <div className="w-12 h-12 relative bg-orange-300 rounded-md border-2 border-orange-600">
            <div className="w-2/3 h-2/3 bg-orange-400 rounded-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-1/2 h-1/2 bg-gray-200 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
          </div>
        );
      case 'vadapav':
        return (
          <div className="w-12 h-12 relative">
            <div className="w-full h-2/3 bg-amber-200 rounded-full absolute bottom-0 border-2 border-amber-600"></div>
            <div className="w-3/4 h-1/2 bg-amber-700 rounded-md absolute top-1/4 left-1/2 -translate-x-1/2"></div>
            <div className="w-1/2 h-1/4 bg-green-700 rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
          </div>
        );
      case 'jalebi':
        return (
          <div className="w-12 h-12 relative bg-orange-400 rounded-full border-2 border-orange-600">
            <div className="w-2/3 h-2/3 bg-orange-300 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-1/3 h-1/3 bg-yellow-300 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        );
      case 'ladoo':
        return (
          <div className="w-12 h-12 relative bg-yellow-500 rounded-full border-2 border-yellow-600">
            <div className="w-1/3 h-1/3 bg-yellow-300 rounded-full absolute left-1/3 top-1/3"></div>
            <div className="w-1/4 h-1/4 bg-yellow-200 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="sweet-icons-container absolute inset-0 z-7 pointer-events-none">
      {sweetPositions.map((sweet, index) => (
        <div 
          key={index} 
          className="sweet-icon absolute animate-spin-slow shadow-glow"
          style={{ 
            left: sweet.left, 
            top: sweet.top,
            animationDelay: sweet.delay,
            transform: 'rotate(0deg)',
            animation: 'spin-slow 10s linear infinite'
          }}
        >
          {getSweetIcon(sweet.type)}
        </div>
      ))}
    </div>
  );
};

export default AnimatedBanners;
