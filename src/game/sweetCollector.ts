
import { GameObject, SweetCounts } from "@/types/gameTypes";

export const createSweetCollector = (
  sweets: GameObject[],
  setSweets: React.Dispatch<React.SetStateAction<GameObject[]>>,
  setSweetCounts: React.Dispatch<React.SetStateAction<SweetCounts>>,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  setCharacter: React.Dispatch<React.SetStateAction<any>>
) => {
  const collectSweet = (id: string) => {
    setSweets(prev => prev.map(sweet => {
      if (sweet.id === id && !sweet.collected) {
        return { ...sweet, collected: true };
      }
      return sweet;
    }));

    setSweetCounts(prev => {
      const updatedCounts = { ...prev };
      
      const collectedSweet = sweets.find(s => s.id === id);
      if (collectedSweet && collectedSweet.collected === false && updatedCounts[collectedSweet.type]) {
        const currentCount = updatedCounts[collectedSweet.type].collected;
        const maxCount = updatedCounts[collectedSweet.type].total;
        updatedCounts[collectedSweet.type].collected = Math.min(currentCount + 1, maxCount);
      }
      
      return updatedCounts;
    });
    
    setScore(prev => prev + 25);
    setCharacter(prev => ({ ...prev, glowing: true }));
    
    setTimeout(() => {
      setCharacter(prev => ({ ...prev, glowing: false }));
    }, 1000);
  };

  return { collectSweet };
};
