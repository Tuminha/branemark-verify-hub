
import { useState, useEffect } from 'react';
import { centers } from '@/data/centers';
import { useValidations } from '@/data/validations';
import CentersList from '@/components/CentersList';
import UserSelector from '@/components/UserSelector';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ValidatedCenters = () => {
  // Load selected user from localStorage
  const getSavedUser = (): 'francisco' | 'pascal' | null => {
    const saved = localStorage.getItem('branemark-selected-user');
    if (saved === 'francisco' || saved === 'pascal') {
      return saved;
    }
    return null;
  };

  const [selectedUser, setSelectedUser] = useState<'francisco' | 'pascal' | null>(getSavedUser);
  const { validations, addValidation, removeValidation } = useValidations();

  // Save selected user to localStorage
  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem('branemark-selected-user', selectedUser);
    }
  }, [selectedUser]);

  // Filter centers to only show those with information validated by at least one user
  const validatedCenters = centers.filter(center => {
    return validations.some(
      v => v.centerId === center.id && v.validationType === 'information'
    );
  });

  const handleValidate = (centerId: string, validationType: 'information' | 'contact', isValid: boolean) => {
    if (!selectedUser) {
      toast({
        title: "Select a user",
        description: "Please select who you are before validating",
        variant: "destructive"
      });
      return;
    }
    
    if (isValid) {
      addValidation(centerId, validationType, selectedUser);
      toast({
        title: "Center Validated",
        description: `${validationType === 'information' ? 'Information' : 'Contact'} has been validated by ${selectedUser === 'francisco' ? 'Francisco' : 'Pascal'}.`,
      });
    } else {
      removeValidation(centerId, validationType, selectedUser);
      toast({
        title: "Validation Removed",
        description: `${validationType === 'information' ? 'Information' : 'Contact'} validation has been removed.`,
      });
    }
  };

  const selectUser = (userId: 'francisco' | 'pascal') => {
    setSelectedUser(userId);
    toast({
      title: "User Changed",
      description: `Now validating as ${userId === 'francisco' ? 'Francisco Barbosa' : 'Pascal Kunz'}.`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="outline" asChild className="mb-6">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Validated Centers</h1>
        <p className="text-gray-600 text-center max-w-2xl">
          This page displays only centers that have had their information validated by at least one user.
        </p>
      </div>

      <UserSelector onSelectUser={selectUser} selectedUser={selectedUser} />

      {validatedCenters.length > 0 ? (
        <CentersList 
          centers={validatedCenters}
          validations={validations}
          selectedUser={selectedUser}
          onValidate={handleValidate}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No centers have been validated yet.</p>
        </div>
      )}
    </div>
  );
};

export default ValidatedCenters;
