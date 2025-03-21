
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Gift } from 'lucide-react';

const SweetsStatus: React.FC = () => {
  const { sweetCounts } = useGame();
  
  const getSweetIcon = (type: string) => {
    switch(type) {
      case 'dhokla':
        return (
          <div className="w-6 h-6 bg-yellow-200 rounded-sm border border-yellow-600">
            <div className="w-full h-1/4 bg-yellow-400 top-0 absolute"></div>
          </div>
        );
      case 'mithai':
        return (
          <div className="w-6 h-6 bg-orange-300 rounded-md border border-orange-600"></div>
        );
      case 'vadapav':
        return (
          <div className="w-6 h-6 relative">
            <div className="w-full h-2/3 bg-amber-200 rounded-full absolute bottom-0"></div>
            <div className="w-3/4 h-1/2 bg-amber-700 rounded-md absolute top-1/4 left-1/2 -translate-x-1/2"></div>
          </div>
        );
      case 'jalebi':
        return (
          <div className="w-6 h-6 bg-orange-400 rounded-full border-2 border-orange-600"></div>
        );
      case 'ladoo':
        return (
          <div className="w-6 h-6 bg-yellow-500 rounded-full border border-yellow-600"></div>
        );
      default:
        return <Gift className="w-5 h-5 text-pink-500" />;
    }
  };
  
  if (Object.keys(sweetCounts).length === 0) return null;
  
  return (
    <div className="fixed top-16 left-4 space-y-2 z-50">
      {Object.entries(sweetCounts).map(([type, count]) => (
        <div 
          key={type}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-md py-1 px-3 rounded-full 
                    border border-white/30 shadow-lg animate-fade-in"
        >
          <div className="relative">
            {getSweetIcon(type)}
          </div>
          <span className="text-xs font-semibold text-game-navy">
            {count.collected}/{count.total} {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SweetsStatus;
