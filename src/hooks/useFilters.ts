
import { useState, useMemo } from 'react';
import { Center, FilterOptions, Validation } from '../types';

export const useFilters = (centers: Center[], validations: Validation[]) => {
  const [filters, setFilters] = useState<FilterOptions>({
    continent: null,
    country: null,
    validatedBy: null,
    validationType: null
  });

  const filteredCenters = useMemo(() => {
    return centers.filter(center => {
      // Filter by continent
      if (filters.continent && center.continent !== filters.continent) {
        return false;
      }

      // Filter by country
      if (filters.country && center.country !== filters.country) {
        return false;
      }

      // Filter by validation status
      if (filters.validatedBy && filters.validationType) {
        const franciscoValidated = validations.some(
          v => v.centerId === center.id && v.validationType === filters.validationType && v.validatedBy === 'francisco'
        );
        
        const pascalValidated = validations.some(
          v => v.centerId === center.id && v.validationType === filters.validationType && v.validatedBy === 'pascal'
        );

        if (filters.validatedBy === 'francisco' && !franciscoValidated) return false;
        if (filters.validatedBy === 'pascal' && !pascalValidated) return false;
        if (filters.validatedBy === 'both' && (!franciscoValidated || !pascalValidated)) return false;
        if (filters.validatedBy === 'none' && (franciscoValidated || pascalValidated)) return false;
      }

      return true;
    });
  }, [centers, validations, filters]);

  const uniqueContinents = useMemo(() => {
    return Array.from(new Set(centers.map(center => center.continent))).sort();
  }, [centers]);

  const uniqueCountries = useMemo(() => {
    return Array.from(new Set(centers.map(center => center.country))).sort();
  }, [centers]);

  return {
    filters,
    setFilters,
    filteredCenters,
    uniqueContinents,
    uniqueCountries
  };
};
