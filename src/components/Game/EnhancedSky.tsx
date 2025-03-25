
import React, { useEffect, useState, useRef } from 'react';

const EnhancedSky: React.FC = () => {
  const [stars, setStars] = useState<Array<{id: number, left: string, top: string, size: string, delay: string}>>([]);
  const cloudContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Generate stars for the sky
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 30}%`,
      size: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 3}s`
    }));
    
    setStars(newStars);
    
    // Cloud movement logic
    const generateCloud = () => {
      if (!cloudContainerRef.current) return;
      
      const cloud = document.createElement('div');
      const size = 50 + Math.random() * 100;
      const opacity = 0.4 + Math.random() * 0.4;
      const speed = 30 + Math.random() * 60;
      const top = Math.random() * 30;
      
      cloud.className = 'absolute bg-white rounded-full filter blur-md';
      cloud.style.width = `${size}px`;
      cloud.style.height = `${size / 2}px`;
      cloud.style.opacity = opacity.toString();
      cloud.style.top = `${top}%`;
      cloud.style.left = '-100px';
      cloud.style.transition = `transform ${speed}s linear`;
      
      cloudContainerRef.current.appendChild(cloud);
      
      // Start animation
      setTimeout(() => {
        cloud.style.transform = `translateX(${window.innerWidth + 200}px)`;
      }, 10);
      
      // Remove after animation
      setTimeout(() => {
        if (cloudContainerRef.current?.contains(cloud)) {
          cloudContainerRef.current.removeChild(cloud);
        }
      }, speed * 1000);
    };
    
    // Generate clouds periodically
    const cloudInterval = setInterval(generateCloud, 10000);
    generateCloud(); // Generate first cloud immediately
    
    return () => {
      clearInterval(cloudInterval);
    };
  }, []);
  
  return (
    <div className="sky-container absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Stars */}
      <div className="stars-container absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star absolute bg-white rounded-full animate-twinkle"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay
            }}
          />
        ))}
      </div>
      
      {/* Moving clouds */}
      <div ref={cloudContainerRef} className="clouds-container absolute inset-0"></div>
      
      {/* Sunrise/sunset gradient effect */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-orange-300/30 to-transparent"></div>
    </div>
  );
};

export default EnhancedSky;
