
import React, { useRef, useEffect } from 'react';
import { useGame } from '@/context/GameContext';

const Background: React.FC = () => {
  const { gameState } = useGame();
  const mountainsRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement[]>([]);
  const treesRef = useRef<HTMLDivElement>(null);
  const buildingsRef = useRef<HTMLDivElement>(null);
  const peopleRef = useRef<HTMLDivElement>(null);
  
  // Parallax scrolling effect with increased speed
  useEffect(() => {
    const scrollSpeed = {
      mountains: 0.3, // increased from 0.2
      trees: 0.8, // increased from 0.5
      clouds: 0.4, // increased from 0.3
      buildings: 0.6,
      people: 0.7
    };
    
    let animationFrameId: number;
    let scrollPos = 0;
    
    const animateBackground = () => {
      if (gameState !== 'playing') {
        animationFrameId = requestAnimationFrame(animateBackground);
        return;
      }
      
      scrollPos += 2; // increased from 1 for faster movement
      
      // Move mountains (slow)
      if (mountainsRef.current) {
        mountainsRef.current.style.transform = `translateX(-${scrollPos * scrollSpeed.mountains}px)`;
      }
      
      // Move trees (medium)
      if (treesRef.current) {
        treesRef.current.style.transform = `translateX(-${scrollPos * scrollSpeed.trees}px)`;
      }
      
      // Move buildings (medium-fast)
      if (buildingsRef.current) {
        buildingsRef.current.style.transform = `translateX(-${scrollPos * scrollSpeed.buildings}px)`;
      }
      
      // Move people (medium-fast)
      if (peopleRef.current) {
        peopleRef.current.style.transform = `translateX(-${scrollPos * scrollSpeed.people}px)`;
      }
      
      // Move clouds (variable)
      cloudsRef.current.forEach((cloud, index) => {
        const cloudSpeed = scrollSpeed.clouds * (0.8 + (index * 0.1));
        cloud.style.transform = `translateX(-${scrollPos * cloudSpeed}px)`;
      });
      
      animationFrameId = requestAnimationFrame(animateBackground);
    };
    
    animateBackground();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Sky gradient is handled by the game-canvas class */}
      
      {/* Mountains/Hills in the distance - now with scrolling */}
      <div ref={mountainsRef} className="absolute bottom-[20%] w-[200%] h-[20%]">
        <div className="absolute w-full h-full" style={{ 
          backgroundImage: 'linear-gradient(to bottom right, #8C6D46, #A08562)',
          clipPath: 'polygon(0% 100%, 8% 60%, 15% 80%, 22% 60%, 30% 90%, 35% 70%, 45% 100%, 52% 75%, 60% 100%, 70% 80%, 80% 50%, 90% 75%, 100% 100%)' 
        }}></div>
        <div className="absolute left-[100%] w-full h-full" style={{ 
          backgroundImage: 'linear-gradient(to bottom right, #8C6D46, #A08562)',
          clipPath: 'polygon(0% 100%, 8% 60%, 15% 80%, 22% 60%, 30% 90%, 35% 70%, 45% 100%, 52% 75%, 60% 100%, 70% 80%, 80% 50%, 90% 75%, 100% 100%)' 
        }}></div>
      </div>
      
      {/* Buildings/temples in the distance */}
      <div ref={buildingsRef} className="absolute bottom-[20%] w-[200%] h-[18%]">
        {/* Temple 1 */}
        <div className="absolute bottom-0 left-[10%] w-16 h-24">
          <div className="absolute bottom-0 w-full h-3/4 bg-amber-200"></div>
          <div className="absolute top-0 w-full h-1/4 bg-amber-700" style={{ 
            clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' 
          }}></div>
        </div>
        
        {/* Building 1 */}
        <div className="absolute bottom-0 left-[25%] w-20 h-20 bg-blue-200"></div>
        
        {/* Temple 2 */}
        <div className="absolute bottom-0 left-[40%] w-16 h-28">
          <div className="absolute bottom-0 w-full h-3/4 bg-amber-300"></div>
          <div className="absolute top-0 w-full h-1/4 bg-amber-800" style={{ 
            clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' 
          }}></div>
        </div>
        
        {/* Building 2 */}
        <div className="absolute bottom-0 left-[60%] w-24 h-16 bg-gray-300"></div>
        
        {/* Temple 3 */}
        <div className="absolute bottom-0 left-[75%] w-20 h-32">
          <div className="absolute bottom-0 w-full h-3/4 bg-amber-100"></div>
          <div className="absolute top-0 w-full h-1/4 bg-amber-600" style={{ 
            clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' 
          }}></div>
        </div>
        
        {/* Second set for seamless scrolling */}
        <div className="absolute bottom-0 left-[110%] w-16 h-24">
          <div className="absolute bottom-0 w-full h-3/4 bg-amber-200"></div>
          <div className="absolute top-0 w-full h-1/4 bg-amber-700" style={{ 
            clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' 
          }}></div>
        </div>
        
        <div className="absolute bottom-0 left-[125%] w-20 h-20 bg-blue-200"></div>
        
        <div className="absolute bottom-0 left-[140%] w-16 h-28">
          <div className="absolute bottom-0 w-full h-3/4 bg-amber-300"></div>
          <div className="absolute top-0 w-full h-1/4 bg-amber-800" style={{ 
            clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' 
          }}></div>
        </div>
        
        <div className="absolute bottom-0 left-[160%] w-24 h-16 bg-gray-300"></div>
        
        <div className="absolute bottom-0 left-[175%] w-20 h-32">
          <div className="absolute bottom-0 w-full h-3/4 bg-amber-100"></div>
          <div className="absolute top-0 w-full h-1/4 bg-amber-600" style={{ 
            clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' 
          }}></div>
        </div>
      </div>
      
      {/* People in the distance */}
      <div ref={peopleRef} className="absolute bottom-[20%] w-[200%] h-[6%]">
        {/* Person 1 */}
        <div className="absolute bottom-0 left-[15%] w-3 h-8">
          <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
          <div className="w-1 h-5 bg-blue-700 absolute top-2 left-1"></div>
        </div>
        
        {/* Person 2 */}
        <div className="absolute bottom-0 left-[30%] w-3 h-8">
          <div className="w-3 h-3 bg-red-800 rounded-full"></div>
          <div className="w-1 h-5 bg-red-700 absolute top-2 left-1"></div>
        </div>
        
        {/* Person 3 */}
        <div className="absolute bottom-0 left-[50%] w-3 h-8">
          <div className="w-3 h-3 bg-green-800 rounded-full"></div>
          <div className="w-1 h-5 bg-green-700 absolute top-2 left-1"></div>
        </div>
        
        {/* Person 4 */}
        <div className="absolute bottom-0 left-[70%] w-3 h-8">
          <div className="w-3 h-3 bg-purple-800 rounded-full"></div>
          <div className="w-1 h-5 bg-purple-700 absolute top-2 left-1"></div>
        </div>
        
        {/* Second set for seamless scrolling */}
        <div className="absolute bottom-0 left-[115%] w-3 h-8">
          <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
          <div className="w-1 h-5 bg-blue-700 absolute top-2 left-1"></div>
        </div>
        
        <div className="absolute bottom-0 left-[130%] w-3 h-8">
          <div className="w-3 h-3 bg-red-800 rounded-full"></div>
          <div className="w-1 h-5 bg-red-700 absolute top-2 left-1"></div>
        </div>
        
        <div className="absolute bottom-0 left-[150%] w-3 h-8">
          <div className="w-3 h-3 bg-green-800 rounded-full"></div>
          <div className="w-1 h-5 bg-green-700 absolute top-2 left-1"></div>
        </div>
        
        <div className="absolute bottom-0 left-[170%] w-3 h-8">
          <div className="w-3 h-3 bg-purple-800 rounded-full"></div>
          <div className="w-1 h-5 bg-purple-700 absolute top-2 left-1"></div>
        </div>
      </div>
      
      {/* Background trees - move at medium speed */}
      <div ref={treesRef} className="absolute bottom-[20%] w-[200%] h-[15%]">
        <div className="absolute bottom-0 left-[5%] w-8 h-16 bg-green-600 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[8%] w-6 h-12 bg-green-700 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[12%] w-8 h-14 bg-green-600 rounded-t-full"></div>
        
        <div className="absolute bottom-0 left-[25%] w-10 h-20 bg-green-700 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[28%] w-8 h-16 bg-green-800 rounded-t-full"></div>
        
        <div className="absolute bottom-0 left-[45%] w-8 h-16 bg-green-600 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[48%] w-6 h-12 bg-green-700 rounded-t-full"></div>
        
        <div className="absolute bottom-0 left-[65%] w-12 h-24 bg-green-700 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[69%] w-8 h-18 bg-green-800 rounded-t-full"></div>
        
        <div className="absolute bottom-0 left-[85%] w-8 h-16 bg-green-600 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[88%] w-6 h-12 bg-green-700 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[92%] w-8 h-14 bg-green-600 rounded-t-full"></div>
        
        {/* Second set of trees (for seamless scrolling) */}
        <div className="absolute bottom-0 left-[105%] w-8 h-16 bg-green-600 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[108%] w-6 h-12 bg-green-700 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[112%] w-8 h-14 bg-green-600 rounded-t-full"></div>
        
        <div className="absolute bottom-0 left-[125%] w-10 h-20 bg-green-700 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[128%] w-8 h-16 bg-green-800 rounded-t-full"></div>
        
        <div className="absolute bottom-0 left-[145%] w-8 h-16 bg-green-600 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[148%] w-6 h-12 bg-green-700 rounded-t-full"></div>
        
        <div className="absolute bottom-0 left-[165%] w-12 h-24 bg-green-700 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[169%] w-8 h-18 bg-green-800 rounded-t-full"></div>
        
        <div className="absolute bottom-0 left-[185%] w-8 h-16 bg-green-600 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[188%] w-6 h-12 bg-green-700 rounded-t-full"></div>
        <div className="absolute bottom-0 left-[192%] w-8 h-14 bg-green-600 rounded-t-full"></div>
      </div>
      
      {/* Clouds - move at slow speed */}
      <div 
        ref={el => el && (cloudsRef.current[0] = el)} 
        className="absolute left-[10%] top-[15%] w-20 h-10 bg-white/70 rounded-full"
      ></div>
      <div 
        ref={el => el && (cloudsRef.current[1] = el)} 
        className="absolute left-[30%] top-[10%] w-24 h-12 bg-white/70 rounded-full"
      ></div>
      <div 
        ref={el => el && (cloudsRef.current[2] = el)} 
        className="absolute left-[60%] top-[20%] w-20 h-8 bg-white/70 rounded-full"
      ></div>
      <div 
        ref={el => el && (cloudsRef.current[3] = el)} 
        className="absolute left-[80%] top-[15%] w-16 h-8 bg-white/70 rounded-full"
      ></div>
      <div 
        ref={el => el && (cloudsRef.current[4] = el)} 
        className="absolute left-[110%] top-[12%] w-22 h-10 bg-white/70 rounded-full"
      ></div>
      <div 
        ref={el => el && (cloudsRef.current[5] = el)} 
        className="absolute left-[140%] top-[18%] w-18 h-9 bg-white/70 rounded-full"
      ></div>
      
      {/* Sun */}
      <div className="absolute right-[10%] top-[10%] w-16 h-16 bg-game-yellow rounded-full animate-pulse-gentle"></div>
    </div>
  );
};

export default Background;
