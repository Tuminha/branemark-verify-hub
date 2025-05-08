
import { Button } from '@/components/ui/button';
import { FilterOptions } from '@/types';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Filter, Map, Check } from "lucide-react";

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  uniqueContinents: string[];
  uniqueCountries: string[];
}

const FilterBar = ({ filters, onFilterChange, uniqueContinents, uniqueCountries }: FilterBarProps) => {
  const handleFilterChange = (key: keyof FilterOptions, value: string | null) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      continent: null,
      country: null,
      validatedBy: null,
      validationType: null
    });
  };

  return (
    <div className="w-full mb-6">
      <div className="bg-card border rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5" />
          <h2 className="text-lg font-medium">Filter Centers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            value={filters.continent || ""}
            onValueChange={(value) => handleFilterChange('continent', value || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Continent" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="">All Continents</SelectItem>
                {uniqueContinents.map(continent => (
                  <SelectItem key={continent} value={continent}>{continent}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={filters.country || ""}
            onValueChange={(value) => handleFilterChange('country', value || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="">All Countries</SelectItem>
                {uniqueCountries.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={filters.validatedBy || ""}
            onValueChange={(value) => handleFilterChange('validatedBy', value as any || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Validator" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="">All Validations</SelectItem>
                <SelectItem value="francisco">Validated by Francisco</SelectItem>
                <SelectItem value="pascal">Validated by Pascal</SelectItem>
                <SelectItem value="both">Validated by Both</SelectItem>
                <SelectItem value="none">Not Validated</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={filters.validationType || ""}
            onValueChange={(value) => handleFilterChange('validationType', value as any || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="information">Information Validation</SelectItem>
                <SelectItem value="contact">Contact Validation</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
