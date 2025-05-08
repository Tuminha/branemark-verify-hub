
import { Center, Validation } from '@/types';
import CenterCard from './CenterCard';

interface CentersListProps {
  centers: Center[];
  validations: Validation[];
  selectedUser: 'francisco' | 'pascal' | null;
  onValidate: (
    centerId: string, 
    validationType: 'information' | 'contact', 
    isValid: boolean
  ) => void;
}

const CentersList = ({ centers, validations, selectedUser, onValidate }: CentersListProps) => {
  // Group centers by continent
  const centersByContinent = centers.reduce<Record<string, Center[]>>((acc, center) => {
    if (!acc[center.continent]) {
      acc[center.continent] = [];
    }
    acc[center.continent].push(center);
    return acc;
  }, {});

  // Sort continents
  const sortedContinents = Object.keys(centersByContinent).sort();

  return (
    <div className="space-y-8">
      {sortedContinents.map(continent => (
        <div key={continent} className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">{continent}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centersByContinent[continent].map(center => (
              <CenterCard
                key={center.id}
                center={center}
                validations={validations}
                selectedUser={selectedUser}
                onValidate={onValidate}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CentersList;
