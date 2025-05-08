
import { useState } from 'react';
import { Center, Validation } from '@/types';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { users } from '@/data/users';
import { MapPin, Globe, Phone, Mail, User, Check } from 'lucide-react';

interface CenterCardProps {
  center: Center;
  validations: Validation[];
  selectedUser: 'francisco' | 'pascal' | null;
  onValidate: (
    centerId: string, 
    validationType: 'information' | 'contact', 
    isValid: boolean
  ) => void;
}

const CenterCard = ({ center, validations, selectedUser, onValidate }: CenterCardProps) => {
  // Check if center is validated by each user
  const isInformationValidatedBy = (userId: 'francisco' | 'pascal') => {
    return validations.some(v => 
      v.centerId === center.id && 
      v.validationType === 'information' && 
      v.validatedBy === userId
    );
  };

  const isContactValidatedBy = (userId: 'francisco' | 'pascal') => {
    return validations.some(v => 
      v.centerId === center.id && 
      v.validationType === 'contact' && 
      v.validatedBy === userId
    );
  };

  const informationValidatedByFrancisco = isInformationValidatedBy('francisco');
  const informationValidatedByPascal = isInformationValidatedBy('pascal');
  const contactValidatedByFrancisco = isContactValidatedBy('francisco');
  const contactValidatedByPascal = isContactValidatedBy('pascal');
  
  // Handle checkbox changes
  const handleInformationChange = (checked: boolean) => {
    if (selectedUser) {
      onValidate(center.id, 'information', checked);
    }
  };
  
  const handleContactChange = (checked: boolean) => {
    if (selectedUser) {
      onValidate(center.id, 'contact', checked);
    }
  };

  const isCheckedInformation = selectedUser ? 
    (selectedUser === 'francisco' ? informationValidatedByFrancisco : informationValidatedByPascal) :
    false;

  const isCheckedContact = selectedUser ? 
    (selectedUser === 'francisco' ? contactValidatedByFrancisco : contactValidatedByPascal) :
    false;

  return (
    <Card id={center.id} className="w-full">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-xl">{center.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-4 w-4" />
              {center.location}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {center.director && (
          <div className="flex items-start gap-2">
            <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Director: {center.director}</span>
          </div>
        )}
        
        {center.address && (
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{center.address}</span>
          </div>
        )}
        
        {center.phone && (
          <div className="flex items-start gap-2">
            <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{center.phone}</span>
          </div>
        )}
        
        {center.email && (
          <div className="flex items-start gap-2">
            <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <a href={`mailto:${center.email}`} className="text-primary hover:underline">
              {center.email}
            </a>
          </div>
        )}
        
        {center.website && (
          <div className="flex items-start gap-2">
            <Globe className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <a 
              href={center.website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline"
            >
              Website
            </a>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t pt-4">
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <TooltipProvider>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id={`info-${center.id}`}
                        checked={isCheckedInformation}
                        disabled={!selectedUser}
                        onCheckedChange={handleInformationChange}
                      />
                      <label 
                        htmlFor={`info-${center.id}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        Information Correct & Branemark Center Confirmed
                      </label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Check this box if all the displayed information for this center is accurate and you confirm it is an official Branemark Center.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
            <div className="flex items-center gap-2">
              {informationValidatedByFrancisco && (
                <div className="flex items-center gap-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={users[0].avatar} alt={users[0].name} />
                    <AvatarFallback>FB</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">Validated by Francisco</span>
                </div>
              )}
              {informationValidatedByPascal && (
                <div className="flex items-center gap-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={users[1].avatar} alt={users[1].name} />
                    <AvatarFallback>PK</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">Validated by Pascal</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <TooltipProvider>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id={`contact-${center.id}`}
                        checked={isCheckedContact}
                        disabled={!selectedUser}
                        onCheckedChange={handleContactChange}
                      />
                      <label 
                        htmlFor={`contact-${center.id}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        Director Known & Direct Contact Established
                      </label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Check this box if you personally know the director(s) and have a direct line of contact.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
            <div className="flex items-center gap-2">
              {contactValidatedByFrancisco && (
                <div className="flex items-center gap-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={users[0].avatar} alt={users[0].name} />
                    <AvatarFallback>FB</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">Validated by Francisco</span>
                </div>
              )}
              {contactValidatedByPascal && (
                <div className="flex items-center gap-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={users[1].avatar} alt={users[1].name} />
                    <AvatarFallback>PK</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">Validated by Pascal</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CenterCard;
