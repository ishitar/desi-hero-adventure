
import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Map, Gem } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TreasureMap: React.FC = () => {
  const { character, targetLocation, worldPosition, showTreasureModal, setShowTreasureModal } = useGame();
  const { toast } = useToast();
  
  // Calculate relative position in the map
  const getRelativePosition = () => {
    if (!targetLocation) return 80; // Default position at 80% of the map
    
    // Assume the world is 5000px long and the map represents the entire journey
    const totalDistance = targetLocation.x;
    const progressPercentage = Math.min(100, (worldPosition.current / totalDistance) * 100);
    
    return progressPercentage;
  };
  
  // Check if treasure is reached
  useEffect(() => {
    if (targetLocation && worldPosition.current >= targetLocation.x && !showTreasureModal) {
      setShowTreasureModal(true);
      toast({
        title: "Treasure Found!",
        description: "You've reached the treasure! Claim your TOI Plus membership.",
      });
    }
  }, [worldPosition, targetLocation, showTreasureModal, setShowTreasureModal, toast]);
  
  return (
    <div className="fixed top-4 right-4 w-36 h-20 bg-amber-100/80 rounded-lg border-2 border-amber-800 shadow-md p-2">
      <div className="text-xs font-bold text-amber-900 mb-1 flex items-center justify-between">
        <span className="flex items-center">
          <Map className="w-3 h-3 mr-1" />
          Treasure Map
        </span>
        <span className="flex items-center">
          <div className="w-2 h-2 bg-red-600 rounded-full mr-1"></div>
          You
        </span>
      </div>
      
      <div className="relative w-full h-10 bg-amber-50 rounded border border-amber-600">
        {/* Path line */}
        <div className="absolute top-1/2 w-full h-0.5 bg-amber-800 transform -translate-y-1/2"></div>
        
        {/* Starting point */}
        <div className="absolute left-0 top-1/2 w-2 h-2 bg-amber-900 rounded-full transform -translate-y-1/2"></div>
        
        {/* Treasure target */}
        <div className="absolute right-1 top-1/2 w-4 h-4 text-amber-900 transform -translate-y-1/2">
          <Gem className="w-full h-full animate-pulse-gentle" />
        </div>
        
        {/* Character marker */}
        <div 
          className="absolute top-1/2 w-3 h-3 bg-red-600 rounded-full transform -translate-y-1/2 transition-all duration-500"
          style={{ left: `${getRelativePosition()}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-[8px] text-amber-800 mt-1">
        <span>Start</span>
        <span>Treasure</span>
      </div>
    </div>
  );
};

export default TreasureMap;
