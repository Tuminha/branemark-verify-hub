
import { useCallback, useRef, useState, useEffect } from 'react';
import { useValidations } from '@/data/validations';
import { centers } from '@/data/centers';
import { useFilters } from '@/hooks/useFilters';
import WorldMap from '@/components/WorldMap';
import FilterBar from '@/components/FilterBar';
import CentersList from '@/components/CentersList';
import UserSelector from '@/components/UserSelector';
import StatsSummary from '@/components/StatsSummary';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
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
  const { filters, setFilters, filteredCenters, uniqueContinents, uniqueCountries } = useFilters(centers, validations);
  
  // Reference for scrolling to a center card
  const centerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Save selected user to localStorage
  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem('branemark-selected-user', selectedUser);
    }
  }, [selectedUser]);

  const handleValidate = useCallback((centerId: string, validationType: 'information' | 'contact', isValid: boolean) => {
    if (!selectedUser) return;
    
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
  }, [selectedUser, addValidation, removeValidation]);

  const selectUser = useCallback((userId: 'francisco' | 'pascal') => {
    setSelectedUser(userId);
    toast({
      title: "User Changed",
      description: `Now validating as ${userId === 'francisco' ? 'Francisco Barbosa' : 'Pascal Kunz'}.`,
    });
  }, []);

  const handleCenterSelect = useCallback((centerId: string) => {
    // Find the HTML element for the center card and scroll to it
    const element = document.getElementById(centerId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Brånemark Verify Hub</h1>
        <p className="text-gray-600 text-center max-w-2xl">
          Manage and validate Brånemark Centers worldwide. Select a user to validate center information and track validation status.
        </p>
      </div>

      <UserSelector onSelectUser={selectUser} selectedUser={selectedUser} />
      
      <StatsSummary centers={centers} validations={validations} />
      
      <WorldMap centers={centers} onCenterSelect={handleCenterSelect} />
      
      <FilterBar 
        filters={filters} 
        onFilterChange={setFilters} 
        uniqueContinents={uniqueContinents}
        uniqueCountries={uniqueCountries}
      />
      
      <CentersList 
        centers={filteredCenters} 
        validations={validations} 
        selectedUser={selectedUser} 
        onValidate={handleValidate}
      />
    </div>
  );
};

export default Dashboard;
