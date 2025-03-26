
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
      religiousStructures: 0.85 // New scrolling speed for religious buildings
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
