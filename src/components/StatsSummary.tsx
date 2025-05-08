
import { Center, Validation } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, MapPin, Flag, User } from 'lucide-react';

interface StatsSummaryProps {
  centers: Center[];
  validations: Validation[];
}

const StatsSummary = ({ centers, validations }: StatsSummaryProps) => {
  // Calculate statistics
  const totalCenters = centers.length;
  
  const uniqueCountries = new Set(centers.map(center => center.country)).size;
  
  const centersWithInformationValidated = new Set(
    validations
      .filter(v => v.validationType === 'information')
      .map(v => v.centerId)
  ).size;

  const centersWithContactValidated = new Set(
    validations
      .filter(v => v.validationType === 'contact')
      .map(v => v.centerId)
  ).size;

  const stats = [
    {
      title: "Total Centers",
      value: totalCenters,
      icon: MapPin
    },
    {
      title: "Unique Countries",
      value: uniqueCountries,
      icon: Flag
    },
    {
      title: "Centers with Validated Information",
      value: centersWithInformationValidated,
      icon: Check
    },
    {
      title: "Centers with Direct Contact",
      value: centersWithContactValidated,
      icon: User
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <stat.icon className="h-4 w-4" />
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsSummary;
