
import React from 'react';
import { useGame } from '@/context/GameContext';

const IndianSweets: React.FC = () => {
  const { sweets } = useGame();
  
  // Render different types of Indian sweets
  const renderSweet = (sweet: any) => {
    switch(sweet.type) {
      case 'dhokla':
        return (
          <div className="w-full h-full bg-yellow-200 rounded-sm border border-yellow-600">
            <div className="w-full h-1/4 bg-yellow-400 top-0 absolute"></div>
            <div className="w-2/3 h-2/3 bg-yellow-300 rounded-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        );
      case 'mithai':
        return (
          <div className="w-full h-full bg-orange-300 rounded-md border border-orange-600">
            <div className="w-2/3 h-2/3 bg-orange-400 rounded-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-1/2 h-1/2 bg-silver absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
          </div>
        );
      case 'vadapav':
        return (
          <div className="w-full h-full relative">
            <div className="w-full h-2/3 bg-amber-200 rounded-full absolute bottom-0"></div>
            <div className="w-3/4 h-1/2 bg-amber-700 rounded-md absolute top-1/4 left-1/2 -translate-x-1/2"></div>
          </div>
        );
      case 'jalebi':
        return (
          <div className="w-full h-full bg-orange-400 rounded-full border-2 border-orange-600">
            <div className="w-2/3 h-2/3 bg-orange-300 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        );
      case 'ladoo':
        return (
          <div className="w-full h-full bg-yellow-500 rounded-full border border-yellow-600">
            <div className="w-1/3 h-1/3 bg-yellow-300 rounded-full absolute left-1/3 top-1/3"></div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full bg-red-300 rounded-full"></div>
        );
    }
  };
  
  return (
    <>
      {sweets.map(sweet => (
        <div
          key={sweet.id}
          className="sweet"
          style={{
            left: `${sweet.x}px`,
            top: `${sweet.y}px`,
            width: `${sweet.width}px`,
            height: `${sweet.height}px`,
            opacity: sweet.collected ? 0 : 1,
            transition: 'opacity 0.3s ease-out',
            position: 'absolute',
            zIndex: 15,
          }}
        >
          {renderSweet(sweet)}
        </div>
      ))}
    </>
  );
};

export default IndianSweets;
