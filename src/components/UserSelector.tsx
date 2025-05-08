
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { users } from '@/data/users';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserRound } from "lucide-react";

interface UserSelectorProps {
  onSelectUser: (userId: 'francisco' | 'pascal') => void;
  selectedUser: 'francisco' | 'pascal' | null;
}

const UserSelector = ({ onSelectUser, selectedUser }: UserSelectorProps) => {
  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      {!selectedUser && (
        <Alert className="bg-amber-50 border-amber-200 max-w-md">
          <UserRound className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-800">
            Please select who you are before proceeding with validations
          </AlertDescription>
        </Alert>
      )}
      
      <h2 className="text-lg font-medium">Select Validator</h2>
      <div className="flex gap-4">
        {users.map(user => (
          <TooltipProvider key={user.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedUser === user.id ? "default" : "outline"}
                  className="flex flex-col items-center p-2 h-auto"
                  onClick={() => onSelectUser(user.id as 'francisco' | 'pascal')}
                >
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Validate as {user.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default UserSelector;
