
import React, { useEffect, useState } from 'react';

const Fireflies: React.FC = () => {
  const [fireflies, setFireflies] = useState<Array<{id: number, left: string, top: string, delay: string, size: string, duration: string}>>([]);
  
  useEffect(() => {
    // Generate more random fireflies with varied properties
    const newFireflies = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${15 + Math.random() * 65}%`,
      delay: `${Math.random() * 5}s`,
      size: `${2 + Math.random() * 4}px`,
      duration: `${3 + Math.random() * 4}s`
    }));
    
    setFireflies(newFireflies);
  }, []);
  
  return (
    <div className="fireflies-container absolute inset-0 z-5 overflow-hidden pointer-events-none">
      {fireflies.map((fly) => (
        <div
          key={fly.id}
          className="firefly absolute rounded-full bg-yellow-300 shadow-glow"
          style={{
            left: fly.left,
            top: fly.top,
            width: fly.size,
            height: fly.size,
            animationDelay: fly.delay,
            animationDuration: fly.duration,
            boxShadow: '0 0 5px 2px rgba(255, 236, 160, 0.3)'
          }}
        />
      ))}
    </div>
  );
};

export default Fireflies;
