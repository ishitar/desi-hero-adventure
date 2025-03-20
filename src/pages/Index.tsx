
import { GameProvider } from '@/context/GameContext';
import GameCanvas from '@/components/Game/GameCanvas';

const Index = () => {
  return (
    <GameProvider>
      <div className="w-full h-screen overflow-hidden bg-gradient-to-b from-game-blue to-game-teal">
        <GameCanvas />
      </div>
    </GameProvider>
  );
};

export default Index;
