
import { Validation } from '../types';
import { useState, useCallback } from 'react';

// Initial state will be empty, as no validations exist at the start
const initialValidations: Validation[] = [];

export const useValidations = () => {
  const [validations, setValidations] = useState<Validation[]>(initialValidations);

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
