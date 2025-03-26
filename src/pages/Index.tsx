
import { GameProvider } from '@/context/GameContext';
import GameCanvas from '@/components/Game/GameCanvas';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <GameProvider>
        <div className="w-full h-screen overflow-hidden bg-gradient-to-b from-game-blue to-game-teal">
          <GameCanvas />
          <Toaster />
        </div>
      </GameProvider>
    </div>
  );
};

export default Index;
