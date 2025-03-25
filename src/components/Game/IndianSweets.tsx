
import React, { useEffect, useRef } from 'react';
import { useGame } from '@/context/GameContext';

const IndianSweets: React.FC = () => {
  const { sweets } = useGame();
  const sweetRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  
  // Add more pronounced floating animation effects to sweets
  useEffect(() => {
    const animateSweets = () => {
      sweetRefs.current.forEach((sweetEl) => {
        // Apply floating animation with broader range
        const floatOffset = Math.sin(Date.now() / 1000) * 10;
        const bobOffset = Math.cos(Date.now() / 1500) * 5;
        sweetEl.style.transform = `translateY(${floatOffset}px) translateX(${bobOffset}px)`;
        // Add a subtle glow effect
        const glowIntensity = (Math.sin(Date.now() / 800) + 1) * 0.5;
        sweetEl.style.filter = `drop-shadow(0 0 ${5 + glowIntensity * 3}px rgba(255, 255, 150, ${0.5 + glowIntensity * 0.3}))`;
      });
      requestAnimationFrame(animateSweets);
    };
    
    const animationId = requestAnimationFrame(animateSweets);
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  // Render different types of Indian sweets with improved details and animations
  const renderSweet = (sweet: any) => {
    switch(sweet.type) {
      case 'dhokla':
        return (
          <div className="w-full h-full relative">
            <div className="w-full h-full bg-yellow-200 rounded-sm border border-yellow-600 animate-pulse-slow">
              <div className="w-full h-1/4 bg-yellow-400 top-0 absolute"></div>
              <div className="w-2/3 h-2/3 bg-yellow-300 rounded-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className={`absolute -top-5 left-0 right-0 text-yellow-100 text-xs font-bold text-center ${sweet.collected ? 'animate-fade-out opacity-100' : 'opacity-0'}`}>+10</div>
          </div>
        );
      case 'mithai':
        return (
          <div className="w-full h-full relative">
            <div className="w-full h-full bg-orange-300 rounded-md border border-orange-600 animate-pulse-slow">
              <div className="w-2/3 h-2/3 bg-orange-400 rounded-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-1/2 h-1/2 bg-silver absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
            </div>
            <div className={`absolute -top-5 left-0 right-0 text-yellow-100 text-xs font-bold text-center ${sweet.collected ? 'animate-fade-out opacity-100' : 'opacity-0'}`}>+15</div>
          </div>
        );
      case 'vadapav':
        return (
          <div className="w-full h-full relative">
            <div className="w-full h-full relative animate-pulse-slow">
              <div className="w-full h-2/3 bg-amber-200 rounded-full absolute bottom-0"></div>
              <div className="w-3/4 h-1/2 bg-amber-700 rounded-md absolute top-1/4 left-1/2 -translate-x-1/2"></div>
              <div className="w-1/2 h-1/4 bg-green-700 rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
            </div>
            <div className={`absolute -top-5 left-0 right-0 text-yellow-100 text-xs font-bold text-center ${sweet.collected ? 'animate-fade-out opacity-100' : 'opacity-0'}`}>+20</div>
          </div>
        );
      case 'jalebi':
        return (
          <div className="w-full h-full relative">
            <div className="w-full h-full bg-orange-400 rounded-full border-2 border-orange-600 animate-pulse-slow">
              <div className="w-2/3 h-2/3 bg-orange-300 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-1/3 h-1/3 bg-yellow-300 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className={`absolute -top-5 left-0 right-0 text-yellow-100 text-xs font-bold text-center ${sweet.collected ? 'animate-fade-out opacity-100' : 'opacity-0'}`}>+25</div>
          </div>
        );
      case 'ladoo':
        return (
          <div className="w-full h-full relative">
            <div className="w-full h-full bg-yellow-500 rounded-full border border-yellow-600 animate-pulse-slow">
              <div className="w-1/3 h-1/3 bg-yellow-300 rounded-full absolute left-1/3 top-1/3"></div>
              <div className="w-1/4 h-1/4 bg-yellow-200 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className={`absolute -top-5 left-0 right-0 text-yellow-100 text-xs font-bold text-center ${sweet.collected ? 'animate-fade-out opacity-100' : 'opacity-0'}`}>+30</div>
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
          ref={(el) => {
            if (el) sweetRefs.current.set(sweet.id, el);
            else sweetRefs.current.delete(sweet.id);
          }}
          className={`sweet ${sweet.collected ? 'collected' : ''}`}
          style={{
            left: `${sweet.x}px`,
            top: `${sweet.y}px`,
            width: `${sweet.width}px`,
            height: `${sweet.height}px`,
            opacity: sweet.collected ? 0 : 1,
            transition: 'opacity 0.3s ease-out, transform 0.2s ease-in-out',
            position: 'absolute',
            zIndex: 15,
            filter: 'drop-shadow(0 0 5px rgba(255, 255, 150, 0.7))',
          }}
        >
          {renderSweet(sweet)}
        </div>
      ))}
    </>
  );
};

export default IndianSweets;
