
import React, { useEffect, useState } from 'react';

const Fireflies: React.FC = () => {
  const [fireflies, setFireflies] = useState<Array<{id: number, left: string, top: string, delay: string, size: string}>>([]);
  
  useEffect(() => {
    // Generate random fireflies
    const newFireflies = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${20 + Math.random() * 60}%`,
      delay: `${Math.random() * 5}s`,
      size: `${3 + Math.random() * 3}px`
    }));
    
    setFireflies(newFireflies);
  }, []);
  
  return (
    <div className="fireflies-container absolute inset-0 z-5 overflow-hidden pointer-events-none">
      {fireflies.map((fly) => (
        <div
          key={fly.id}
          className="firefly absolute rounded-full bg-yellow-300 animate-firefly"
          style={{
            left: fly.left,
            top: fly.top,
            width: fly.size,
            height: fly.size,
            animationDelay: fly.delay
          }}
        />
      ))}
    </div>
  );
};

export default Fireflies;
