
import React, { useRef, useEffect } from 'react';
import { useGame } from '@/context/GameContext';

const Background: React.FC = () => {
  const { gameState, decorations } = useGame();
  const mountainsRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement[]>([]);
  const treesRef = useRef<HTMLDivElement>(null);
  const buildingsRef = useRef<HTMLDivElement>(null);
  const peopleRef = useRef<HTMLDivElement>(null);
  const templesRef = useRef<HTMLDivElement>(null);
  const cowsRef = useRef<HTMLDivElement>(null);
  const fruitSellersRef = useRef<HTMLDivElement>(null);
  const religiousStructuresRef = useRef<HTMLDivElement>(null);
  const techLogosRef = useRef<HTMLDivElement>(null);
  
  // Parallax scrolling effect with increased speed
  useEffect(() => {
    const scrollSpeed = {
      mountains: 0.5, // increased for faster movement
      trees: 1.2,     // increased for faster movement
      clouds: 0.6,    // increased for faster movement
      buildings: 0.8,
      people: 1.0,
      temples: 0.9,
      cows: 1.1,
      fruitSellers: 1.0,
      religiousStructures: 0.85, // New scrolling speed for religious buildings
      techLogos: 0.65 // Similar to clouds
    };
    
    let animationFrameId: number;
    let scrollPos = 0;
    
    const animateBackground = () => {
      if (gameState !== 'playing') {
        animationFrameId = requestAnimationFrame(animateBackground);
        return;
      }
      
      scrollPos += 3; // increased from 2 for even faster movement
      
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
      
      // Move temples and religious buildings
      if (templesRef.current) {
        templesRef.current.style.transform = `translateX(-${scrollPos * scrollSpeed.temples}px)`;
      }
      
      // Move religious structures (new)
      if (religiousStructuresRef.current) {
        religiousStructuresRef.current.style.transform = `translateX(-${scrollPos * scrollSpeed.religiousStructures}px)`;
      }
      
      // Move cows
      if (cowsRef.current) {
        cowsRef.current.style.transform = `translateX(-${scrollPos * scrollSpeed.cows}px)`;
      }
      
      // Move fruit sellers
      if (fruitSellersRef.current) {
        fruitSellersRef.current.style.transform = `translateX(-${scrollPos * scrollSpeed.fruitSellers}px)`;
      }
      
      // Move tech logos (similar to clouds)
      if (techLogosRef.current) {
        techLogosRef.current.style.transform = `translateX(-${scrollPos * scrollSpeed.techLogos}px)`;
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

  // Render tech company logos in clouds
  const renderFlyingTechLogos = () => {
    // Create array of tech companies to display
    const techCompanies = [
      {
        name: "Google",
        svg: (
          <svg viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg" className="w-5/6 h-5/6">
            <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
            <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
            <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
            <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
            <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
            <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4"/>
          </svg>
        )
      },
      {
        name: "Adobe",
        svg: (
          <svg viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg" className="w-5/6 h-5/6">
            <path fill="#FA0F00" d="M42.5,0h155v234h-155V0z"/>
            <path fill="#FFF" d="M140.7,132l-20.3,48.2l-20.1-48.2H140.7z M155.9,116.5h-71.6L120,170.3h17.9l44-53.8H155.9z M120,47.9v24h-24.5V47.9H120z M120,95.9V71.9H85.5v24H120z M180.7,47.9v24h-24.7V47.9H180.7z M180.7,95.9V71.9h-34.8v24H180.7z"/>
          </svg>
        )
      },
      {
        name: "Apple",
        svg: (
          <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg" className="w-5/6 h-5/6">
            <path 
              d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" 
              fill="#000"
            />
          </svg>
        )
      },
      {
        name: "Microsoft",
        svg: (
          <svg viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" className="w-5/6 h-5/6">
            <rect x="1" y="1" width="10" height="10" fill="#f25022" />
            <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
            <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
            <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
          </svg>
        )
      },
      {
        name: "Samsung",
        svg: (
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-5/6 h-5/6">
            <path 
              d="M236.4 61.4L227 75.5c-21.3 32-59.4 48.5-97.9 42.1l-53-8.8 28.2 49.3c16.8 29.4 16.8 65.6 0 95L75.5 302.3l53-8.8c38.5-6.4 76.6 10.1 97.9 42.1l9.4 14.1 9.4-14.1c21.3-32 59.4-48.5 97.9-42.1l53 8.8-28.2-49.3c-16.8-29.4-16.8-65.6 0-95l28.2-49.3-53 8.8c-38.5 6.4-76.6-10.1-97.9-42.1l-9.4-14.1z" 
              fill="#1428a0"
            />
          </svg>
        )
      },
      {
        name: "Meta",
        svg: (
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-5/6 h-5/6">
            <path 
              d="M256,50C142.23,50,50,142.23,50,256s92.23,206,206,206,206-92.23,206-206S369.77,50,256,50Zm67.66,312.82c-1.28,10.21-10.18,18.07-20.44,18.07H208.49c-10.26,0-19.16-7.86-20.44-18.07l-37.79-302.38c-1.66-13.32,8.88-25.04,22.24-25.04H339.21c13.36,0,23.9,11.73,22.24,25.04l-37.79,302.38Z" 
              fill="#0668E1"
            />
          </svg>
        )
      }
    ];

    return (
      <div ref={techLogosRef} className="absolute w-[300%] top-0 left-0 h-[30%] z-10 pointer-events-none">
        {Array.from({ length: 8 }, (_, index) => {
          const randomCompany = techCompanies[Math.floor(Math.random() * techCompanies.length)];
          
          // Calculate random positions and animation values
          const leftPosition = Math.random() * 250 + (index * 30); // Spread them out
          const topPosition = Math.random() * 20 + 5; // 5% to 25%
          const size = 35 + Math.random() * 20; // 35px to 55px
          const animationDuration = 30 + Math.random() * 40; // 30s to 70s
          const delay = Math.random() * -20; // Random start position in animation

          return (
            <div 
              key={`flying-logo-${index}`}
              className="absolute z-10"
              style={{
                left: `${leftPosition}%`,
                top: `${topPosition}%`,
                animation: `float-y ${animationDuration}s ease-in-out ${delay}s infinite alternate`,
                opacity: 0.8
              }}
            >
              {/* Logo Container */}
              <div className="relative">
                {/* Logo Circle */}
                <div className="bg-white/80 p-1.5 rounded-full backdrop-blur-sm flex items-center justify-center shadow-lg border border-gray-300" 
                     style={{ width: `${size}px`, height: `${size}px` }}>
                  {randomCompany.svg}
                </div>
                
                {/* Company Name Label */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap backdrop-blur-sm shadow">
                  {randomCompany.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render religious buildings from the decorations
  const renderReligiousBuildings = () => {
    const filteredDecorations = decorations.filter(d => 
      ['temple', 'mosque', 'gurudwara', 'google-temple', 'adobe-temple'].includes(d.type)
    );
    
    return filteredDecorations.map(decoration => {
      if (decoration.type === 'temple') {
        return (
          <div
            key={decoration.id}
            className="temple absolute"
            style={{
              left: `${decoration.x}px`,
              bottom: '0',
              width: `${decoration.width}px`,
              height: `${decoration.height}px`,
            }}
          >
            <div className="w-full h-full relative">
              {/* Temple base */}
              <div className="absolute w-full h-2/3 bg-amber-200 rounded-lg bottom-0"></div>
              
              {/* Temple roof */}
              <div className="absolute w-full h-1/3 bg-amber-800 top-0 left-0" style={{ 
                clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' 
              }}>
              </div>
              
              {/* Temple dome */}
              <div className="absolute w-1/4 h-1/4 bg-game-saffron rounded-full -top-6 left-1/2 -translate-x-1/2"></div>
              
              {/* Temple entrance */}
              <div className="absolute w-1/3 h-1/3 bg-amber-900 rounded-t-lg bottom-0 left-1/2 -translate-x-1/2"></div>
              
              {/* Temple windows */}
              <div className="absolute w-1/6 h-1/6 bg-amber-100 rounded-full top-1/3 left-1/4"></div>
              <div className="absolute w-1/6 h-1/6 bg-amber-100 rounded-full top-1/3 right-1/4"></div>
            </div>
          </div>
        );
      }
      
      if (decoration.type === 'google-temple') {
        return (
          <div
            key={decoration.id}
            className="temple absolute"
            style={{
              left: `${decoration.x}px`,
              bottom: '0',
              width: `${decoration.width}px`,
              height: `${decoration.height}px`,
            }}
          >
            <div className="w-full h-full relative">
              {/* Temple base */}
              <div className="absolute w-full h-2/3 bg-white rounded-lg bottom-0"></div>
              
              {/* Temple roof */}
              <div className="absolute w-full h-1/3 bg-amber-800 top-0 left-0" style={{ 
                clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' 
              }}>
              </div>
              
              {/* Temple dome */}
              <div className="absolute w-1/4 h-1/4 bg-game-saffron rounded-full -top-6 left-1/2 -translate-x-1/2"></div>
              
              {/* Temple entrance */}
              <div className="absolute w-1/3 h-1/3 bg-amber-900 rounded-t-lg bottom-0 left-1/2 -translate-x-1/2"></div>
              
              {/* Google Logo on Temple */}
              <div className="absolute w-3/4 h-1/4 flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl">
                {/* Letter G */}
                <div className="h-full aspect-square bg-blue-500 rounded-full flex items-center justify-center mr-1">
                  <div className="h-3/4 aspect-square bg-white rounded-full flex items-center justify-center">
                    <div className="h-1/2 w-1/2 bg-blue-500 absolute bottom-1.5 right-1.5"></div>
                  </div>
                </div>
                {/* Letter o */}
                <div className="h-full aspect-square bg-red-500 rounded-full flex items-center justify-center mr-1">
                  <div className="h-3/4 aspect-square bg-white rounded-full"></div>
                </div>
                {/* Letter o */}
                <div className="h-full aspect-square bg-yellow-500 rounded-full flex items-center justify-center mr-1">
                  <div className="h-3/4 aspect-square bg-white rounded-full"></div>
                </div>
                {/* Letter g */}
                <div className="h-full aspect-square bg-blue-500 rounded-full flex items-center justify-center mr-1">
                  <div className="h-3/4 aspect-square bg-white rounded-full"></div>
                </div>
                {/* Letter l */}
                <div className="h-full aspect-square bg-green-500 rounded-full flex items-center justify-center mr-1">
                  <div className="h-3/4 aspect-square bg-white rounded-full"></div>
                </div>
                {/* Letter e */}
                <div className="h-full aspect-square bg-red-500 rounded-full flex items-center justify-center">
                  <div className="h-3/4 aspect-square bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      
      if (decoration.type === 'adobe-temple') {
        return (
          <div
            key={decoration.id}
            className="temple absolute"
            style={{
              left: `${decoration.x}px`,
              bottom: '0',
              width: `${decoration.width}px`,
              height: `${decoration.height}px`,
            }}
          >
            <div className="w-full h-full relative">
              {/* Temple base */}
              <div className="absolute w-full h-2/3 bg-gray-100 rounded-lg bottom-0"></div>
              
              {/* Temple roof */}
              <div className="absolute w-full h-1/3 bg-amber-800 top-0 left-0" style={{ 
                clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' 
              }}>
              </div>
              
              {/* Temple dome */}
              <div className="absolute w-1/4 h-1/4 bg-game-saffron rounded-full -top-6 left-1/2 -translate-x-1/2"></div>
              
              {/* Temple entrance */}
              <div className="absolute w-1/3 h-1/3 bg-amber-900 rounded-t-lg bottom-0 left-1/2 -translate-x-1/2"></div>
              
              {/* Adobe Logo on Temple */}
              <div className="absolute w-2/3 h-1/4 flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg">
                <div className="h-full aspect-square bg-red-600 flex items-center justify-center text-white font-bold">
                  A
                </div>
              </div>
            </div>
          </div>
        );
      }
      
      if (decoration.type === 'mosque') {
        return (
          <div
            key={decoration.id}
            className="mosque absolute"
            style={{
              left: `${decoration.x}px`,
              bottom: '0',
              width: `${decoration.width}px`,
              height: `${decoration.height}px`,
            }}
          >
            <div className="w-full h-full relative">
              {/* Mosque base */}
              <div className="absolute w-full h-2/3 bg-white rounded-lg bottom-0"></div>
              
              {/* Mosque dome */}
              <div className="absolute w-1/2 h-1/4 bg-green-600 rounded-t-full top-0 left-1/4"></div>
              
              {/* Mosque minarets */}
              <div className="absolute w-1/8 h-1/2 bg-white rounded-t-lg bottom-1/3 left-0"></div>
              <div className="absolute w-1/8 h-1/2 bg-white rounded-t-lg bottom-1/3 right-0"></div>
              
              {/* Minaret tops */}
              <div className="absolute w-3 h-3 bg-green-600 rounded-full -top-1 left-1/12"></div>
              <div className="absolute w-3 h-3 bg-green-600 rounded-full -top-1 right-1/12"></div>
              
              {/* Mosque entrance */}
              <div className="absolute w-1/4 h-1/4 bg-green-700 rounded-t-lg bottom-0 left-3/8"></div>
              
              {/* Mosque windows */}
              <div className="absolute w-1/6 h-1/6 bg-sky-100 rounded-t-full top-1/3 left-1/4"></div>
              <div className="absolute w-1/6 h-1/6 bg-sky-100 rounded-t-full top-1/3 right-1/4"></div>
            </div>
          </div>
        );
      }
      
      if (decoration.type === 'gurudwara') {
        return (
          <div
            key={decoration.id}
            className="gurudwara absolute"
            style={{
              left: `${decoration.x}px`,
              bottom: '0',
              width: `${decoration.width}px`,
              height: `${decoration.height}px`,
            }}
          >
            <div className="w-full h-full relative">
              {/* Gurudwara base */}
              <div className="absolute w-full h-3/4 bg-white rounded-lg bottom-0"></div>
              
              {/* Gurudwara dome - onion shape */}
              <div className="absolute w-2/5 h-1/4 bg-yellow-500 rounded-t-full top-0 left-1/3"></div>
              <div className="absolute w-1/10 h-1/10 bg-yellow-500 top-[-10px] left-1/2 -translate-x-1/2"></div>
              
              {/* Gurudwara spire */}
              <div className="absolute w-1 h-1/6 bg-yellow-600 top-[-25px] left-1/2 -translate-x-1/2"></div>
              
              {/* Gurudwara entrance */}
              <div className="absolute w-1/3 h-1/3 bg-amber-100 rounded-t-lg bottom-0 left-1/3"></div>
              
              {/* Side small domes */}
              <div className="absolute w-1/5 h-1/6 bg-yellow-500 rounded-t-full top-1/10 left-1/8"></div>
              <div className="absolute w-1/5 h-1/6 bg-yellow-500 rounded-t-full top-1/10 right-1/8"></div>
              
              {/* Flags */}
              <div className="absolute w-1/20 h-1/5 bg-white left-1/8 top-0">
                <div className="absolute w-full h-1/4 bg-blue-600 top-0"></div>
              </div>
            </div>
          </div>
        );
      }
      
      return null;
    });
  };

  // Add floating animation keyframes for tech logos
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-y {
        0% { transform: translateY(0px); }
        50% { transform: translateY(25px); }
        100% { transform: translateY(-15px); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Sky gradient is handled by the game-canvas class */}
      
      {/* Flying Tech Logos */}
      {renderFlyingTechLogos()}
      
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
      
      {/* Religious buildings - temples, mosques, gurudwaras - Now using the game's decoration data */}
      <div ref={religiousStructuresRef} className="absolute bottom-[20%] w-[300%] h-[18%]">
        {renderReligiousBuildings()}
        
        {/* Add some default religious buildings for the background */}
        <div className="absolute bottom-0 left-[10%] w-24 h-36">
          <div className="absolute bottom-0 w-full h-2/3 bg-amber-200"></div>
          <div className="absolute top-0 w-full h-1/3 bg-amber-700" style={{ 
            clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' 
          }}></div>
          {/* Temple dome */}
          <div className="absolute w-8 h-8 bg-red-600 rounded-full -top-3 left-1/2 -translate-x-1/2"></div>
          {/* Temple entrance */}
          <div className="absolute w-8 h-12 bg-amber-900 rounded-t-md bottom-0 left-1/2 -translate-x-1/2"></div>
        </div>
        
        {/* Mosque */}
        <div className="absolute bottom-0 left-[30%] w-28 h-32">
          <div className="absolute bottom-0 w-full h-2/3 bg-white"></div>
          {/* Mosque dome */}
          <div className="absolute w-12 h-12 bg-green-600 rounded-full -top-6 left-1/2 -translate-x-1/2" style={{
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%"
          }}></div>
          {/* Minaret */}
          <div className="absolute bottom-0 left-2 w-4 h-24 bg-white"></div>
          <div className="absolute -top-4 left-2 w-4 h-4 bg-green-600 rounded-full"></div>
          {/* Mosque windows */}
          <div className="absolute w-6 h-8 bg-blue-200 rounded-t-md bottom-6 left-4"></div>
          <div className="absolute w-6 h-8 bg-blue-200 rounded-t-md bottom-6 right-4"></div>
        </div>
        
        {/* Gurudwara */}
        <div className="absolute bottom-0 left-[50%] w-30 h-38">
          <div className="absolute bottom-0 w-full h-2/3 bg-white border-2 border-amber-300"></div>
          {/* Golden dome */}
          <div className="absolute w-14 h-14 bg-game-yellow rounded-full -top-8 left-1/2 -translate-x-1/2"></div>
          {/* Nishan Sahib (flag) */}
          <div className="absolute left-full -top-24 w-1 h-24 bg-amber-800">
            <div className="absolute top-0 left-0 w-8 h-8 bg-game-saffron"></div>
          </div>
          {/* Entrance */}
          <div className="absolute w-10 h-14 bg-amber-600 rounded-t-md bottom-0 left-1/2 -translate-x-1/2"></div>
        </div>
        
        {/* Additional temples at different positions */}
        <div className="absolute bottom-0 left-[70%] w-26 h-32">
          <div className="absolute bottom-0 w-full h-2/3 bg-amber-100"></div>
          <div className="absolute top-0 w-full h-1/3 bg-amber-600" style={{ 
            clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' 
          }}></div>
          <div className="absolute w-10 h-10 bg-red-500 rounded-full -top-5 left-1/2 -translate-x-1/2"></div>
        </div>
        
        {/* Mosque repeat */}
        <div className="absolute bottom-0 left-[90%] w-24 h-28">
          <div className="absolute bottom-0 w-full h-2/3 bg-white"></div>
          <div className="absolute w-10 h-10 bg-green-600 rounded-full -top-5 left-1/2 -translate-x-1/2" style={{
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%"
          }}></div>
        </div>
        
        {/* Repeat religious buildings for seamless scrolling */}
        <div className="absolute bottom-0 left-[110%] w-24 h-36">
          <div className="absolute bottom-0 w-full h-2/3 bg-amber-200"></div>
          <div className="absolute top-0 w-full h-1/3 bg-amber-700" style={{ 
            clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' 
          }}></div>
          <div className="absolute w-8 h-8 bg-red-600 rounded-full -top-3 left-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="absolute bottom-0 left-[130%] w-28 h-32">
          <div className="absolute bottom-0 w-full h-2/3 bg-white"></div>
          <div className="absolute w-12 h-12 bg-green-600 rounded-full -top-6 left-1/2 -translate-x-1/2" style={{
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%"
          }}></div>
        </div>
      </div>
      
      {/* Moving cows in the background */}
      <div ref={cowsRef} className="absolute bottom-[20%] w-[300%] h-[6%]">
        {/* Cow 1 */}
        <div className="absolute bottom-0 left-[15%] w-16 h-10">
          <div className="w-10 h-6 bg-white rounded-lg"></div>
          <div className="absolute w-4 h-4 bg-white rounded-lg -left-2 top-1"></div>
          <div className="absolute w-1 h-3 bg-white rounded-b-lg right-0 -top-1"></div>
          <div className="absolute w-1 h-3 bg-gray-300 left-2 -bottom-3"></div>
          <div className="absolute w-1 h-3 bg-gray-300 left-6 -bottom-3"></div>
        </div>
        
        {/* Cow 2 */}
        <div className="absolute bottom-0 left-[35%] w-18 h-12">
          <div className="w-12 h-7 bg-brown-100 rounded-lg"></div>
          <div className="absolute w-5 h-5 bg-brown-100 rounded-lg -left-3 top-1"></div>
          <div className="absolute w-1 h-4 bg-brown-100 rounded-b-lg right-0 -top-2"></div>
          <div className="absolute w-1 h-3 bg-gray-400 left-2 -bottom-3"></div>
          <div className="absolute w-1 h-3 bg-gray-400 left-8 -bottom-3"></div>
        </div>
        
        {/* Cow 3 */}
        <div className="absolute bottom-0 left-[55%] w-16 h-10 scale-x-[-1]">
          <div className="w-10 h-6 bg-white rounded-lg"></div>
          <div className="absolute w-4 h-4 bg-white rounded-lg -left-2 top-1"></div>
          <div className="absolute w-1 h-3 bg-white rounded-b-lg right-0 -top-1"></div>
          <div className="absolute w-1 h-3 bg-gray-300 left-2 -bottom-3"></div>
          <div className="absolute w-1 h-3 bg-gray-300 left-6 -bottom-3"></div>
        </div>
        
        {/* Additional cows at different positions */}
        <div className="absolute bottom-0 left-[75%] w-14 h-9">
          <div className="w-9 h-5 bg-amber-200 rounded-lg"></div>
          <div className="absolute w-3 h-3 bg-amber-200 rounded-lg -left-1 top-1"></div>
          <div className="absolute w-1 h-2 bg-amber-200 rounded-b-lg right-0 -top-1"></div>
          <div className="absolute w-1 h-3 bg-gray-300 left-2 -bottom-3"></div>
          <div className="absolute w-1 h-3 bg-gray-300 left-5 -bottom-3"></div>
        </div>
        
        {/* Repeat cows for seamless scrolling */}
        <div className="absolute bottom-0 left-[100%] w-16 h-10">
          <div className="w-10 h-6 bg-white rounded-lg"></div>
          <div className="absolute w-4 h-4 bg-white rounded-lg -left-2 top-1"></div>
          <div className="absolute w-1 h-3 bg-white rounded-b-lg right-0 -top-1"></div>
          <div className="absolute w-1 h-3 bg-gray-300 left-2 -bottom-3"></div>
          <div className="absolute w-1 h-3 bg-gray-300 left-6 -bottom-3"></div>
        </div>
      </div>
      
      {/* Fruit sellers */}
      <div ref={fruitSellersRef} className="absolute bottom-[20%] w-[300%] h-[8%]">
        {/* Fruit seller 1 */}
        <div className="absolute bottom-0 left-[25%] w-14 h-14">
          <div className="absolute bottom-0 w-10 h-6 bg-red-700 rounded-md"></div> {/* Cart */}
          <div className="absolute bottom-6 left-0 w-10 h-4 bg-yellow-500"></div> {/* Fruit display */}
          <div className="absolute bottom-6 left-2 w-2 h-2 bg-red-500 rounded-full"></div> {/* Apple */}
          <div className="absolute bottom-6 left-6 w-2 h-2 bg-orange-500 rounded-full"></div> {/* Orange */}
          <div className="absolute bottom-10 w-3 h-4 bg-amber-800 rounded-full"></div> {/* Seller head */}
          <div className="absolute bottom-6 w-1 h-4 bg-blue-800"></div> {/* Seller body */}
        </div>
        
        {/* Fruit seller 2 */}
        <div className="absolute bottom-0 left-[45%] w-16 h-14">
          <div className="absolute bottom-0 w-12 h-5 bg-green-700 rounded-md"></div> {/* Cart */}
          <div className="absolute bottom-5 left-0 w-12 h-3 bg-yellow-400"></div> {/* Fruit display */}
          <div className="absolute bottom-5 left-2 w-2 h-2 bg-green-500 rounded-full"></div> {/* Guava */}
          <div className="absolute bottom-5 left-8 w-2 h-2 bg-yellow-600 rounded-full"></div> {/* Mango */}
          <div className="absolute bottom-8 left-3 w-3 h-3 bg-amber-800 rounded-full"></div> {/* Seller head */}
          <div className="absolute bottom-5 left-4 w-1 h-3 bg-red-800"></div> {/* Seller body */}
        </div>
        
        {/* Fruit seller 3 */}
        <div className="absolute bottom-0 left-[65%] w-14 h-12">
          <div className="absolute bottom-0 w-10 h-4 bg-amber-700 rounded-md"></div> {/* Cart */}
          <div className="absolute bottom-4 left-0 w-10 h-3 bg-green-400"></div> {/* Fruit display */}
          <div className="absolute bottom-4 left-2 w-2 h-2 bg-purple-500 rounded-full"></div> {/* Grapes */}
          <div className="absolute bottom-4 left-6 w-2 h-2 bg-yellow-300 rounded-full"></div> {/* Banana */}
          <div className="absolute bottom-7 left-2 w-3 h-3 bg-amber-800 rounded-full"></div> {/* Seller head */}
          <div className="absolute bottom-4 left-3 w-1 h-3 bg-green-800"></div> {/* Seller body */}
        </div>
        
        {/* Repeat fruit sellers for seamless scrolling */}
        <div className="absolute bottom-0 left-[120%] w-14 h-14">
          <div className="absolute bottom-0 w-10 h-6 bg-red-700 rounded-md"></div>
          <div className="absolute bottom-6 left-0 w-10 h-4 bg-yellow-500"></div>
          <div className="absolute bottom-6 left-2 w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="absolute bottom-6 left-6 w-2 h-2 bg-orange-500 rounded-full"></div>
          <div className="absolute bottom-10 w-3 h-4 bg-amber-800 rounded-full"></div>
          <div className="absolute bottom-6 w-1 h-4 bg-blue-800"></div>
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
        
        {/* Add more people with different clothing colors */}
        <div className="absolute bottom-0 left-[20%] w-3 h-9">
          <div className="w-3 h-3 bg-amber-800 rounded-full"></div>
          <div className="w-1 h-6 bg-amber-700 absolute top-2 left-1"></div>
        </div>
        
        <div className="absolute bottom-0 left-[40%] w-3 h-7">
          <div className="w-3 h-3 bg-pink-800 rounded-full"></div>
          <div className="w-1 h-4 bg-pink-700 absolute top-2 left-1"></div>
        </div>
        
        <div className="absolute bottom-0 left-[60%] w-3 h-8">
          <div className="w-3 h-3 bg-yellow-800 rounded-full"></div>
          <div className="w-1 h-5 bg-yellow-700 absolute top-2 left-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Background;
