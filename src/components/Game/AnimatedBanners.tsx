
import React from 'react';

const AnimatedBanners: React.FC = () => {
  const bannerPositions = [
    { left: '15%', top: '25%', color: 'game-saffron', delay: '0s' },
    { left: '35%', top: '20%', color: 'green-500', delay: '0.5s' },
    { left: '55%', top: '22%', color: 'game-red', delay: '1s' },
    { left: '75%', top: '18%', color: 'blue-500', delay: '1.5s' },
  ];
  
  return (
    <div className="banners-container absolute inset-0 z-7 pointer-events-none">
      {bannerPositions.map((banner, index) => (
        <div 
          key={index} 
          className={`banner absolute w-20 h-8 bg-${banner.color}`}
          style={{ 
            left: banner.left, 
            top: banner.top,
            animationDelay: banner.delay
          }}
        >
          <div className={`w-full h-full bg-${banner.color} border-t border-b border-white/30`}>
            <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
              {['जय हिंद', 'नमस्ते', 'स्वागत', 'शुभ यात्रा'][index]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedBanners;
