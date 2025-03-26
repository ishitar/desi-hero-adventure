
import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Trophy, Sparkles, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TreasureModal: React.FC = () => {
  const { showTreasureModal, setShowTreasureModal, restartGame } = useGame();
  const [formStep, setFormStep] = useState<'celebration' | 'form'>('celebration');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const { toast } = useToast();

  // Reset form step when modal is opened
  useEffect(() => {
    if (showTreasureModal) {
      setFormStep('celebration');
    }
  }, [showTreasureModal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Form Incomplete",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Submit the form data (in a real app, this would send data to a server)
    toast({
      title: "Membership Claimed!",
      description: "Your TOI Plus membership has been registered. Enjoy your benefits!",
    });
    
    // Close modal and restart game
    setShowTreasureModal(false);
    restartGame();
  };

  return (
    <Dialog open={showTreasureModal} onOpenChange={setShowTreasureModal}>
      <DialogContent className="sm:max-w-md">
        {formStep === 'celebration' ? (
          <>
            <DialogHeader className="flex flex-col items-center text-center">
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <Trophy className="h-16 w-16 text-amber-500" />
                  <Sparkles className="h-6 w-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
                </div>
              </div>
              <DialogTitle className="text-2xl font-bold text-amber-800">
                Congratulations!
              </DialogTitle>
              <p className="text-lg mt-2 text-amber-700">
                You are now the owner of TOI Plus membership
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="inline-block w-3 h-3 rounded-full animate-bounce"
                    style={{
                      backgroundColor: ['#FF5722', '#FFC107', '#4CAF50', '#2196F3', '#9C27B0', '#F44336'][i % 6],
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </DialogHeader>
            <DialogFooter className="sm:justify-center">
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => setFormStep('form')}
              >
                <Gift className="mr-2 h-4 w-4" />
                Claim Now
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Register for TOI Plus Membership</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setFormStep('celebration')}>
                  Back
                </Button>
                <Button type="submit">Register</Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TreasureModal;
