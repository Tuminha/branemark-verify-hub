
import { Validation } from '../types';
import { useState, useCallback, useEffect } from 'react';

// Function to load validations from localStorage
const loadValidationsFromStorage = (): Validation[] => {
  const stored = localStorage.getItem('branemark-validations');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored validations:', e);
      return [];
    }
  }
  return [];
};

// Initial state will be from localStorage or empty if none exists
const initialValidations: Validation[] = loadValidationsFromStorage();

export const useValidations = () => {
  const [validations, setValidations] = useState<Validation[]>(initialValidations);

  // Save validations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('branemark-validations', JSON.stringify(validations));
  }, [validations]);

  const addValidation = useCallback((centerId: string, validationType: 'information' | 'contact', validatedBy: 'francisco' | 'pascal') => {
    const newValidation: Validation = {
      centerId,
      validationType,
      validatedBy,
      timestamp: Date.now()
    };
    
    setValidations(prev => [...prev, newValidation]);
  }, []);

  const removeValidation = useCallback((centerId: string, validationType: 'information' | 'contact', validatedBy: 'francisco' | 'pascal') => {
    setValidations(prev => 
      prev.filter(v => 
        !(v.centerId === centerId && 
          v.validationType === validationType && 
          v.validatedBy === validatedBy)
      )
    );
  }, []);

  const isValidated = useCallback((centerId: string, validationType: 'information' | 'contact', validatedBy: 'francisco' | 'pascal') => {
    return validations.some(v => 
      v.centerId === centerId && 
      v.validationType === validationType && 
      v.validatedBy === validatedBy
    );
  }, [validations]);

  return {
    validations,
    addValidation,
    removeValidation,
    isValidated
  };
};
