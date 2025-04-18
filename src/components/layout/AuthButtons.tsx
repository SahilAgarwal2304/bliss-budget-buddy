
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/SupabaseAuthContext";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  userDisplayName: string;
}

export const AuthButtons = ({ isAuthenticated, userDisplayName }: AuthButtonsProps) => {
  const { signOut } = useAuth();

  if (isAuthenticated) {
    return (
      <>
        <div className="hidden sm:block">
          <span className="text-sm text-muted-foreground mr-2">Hi, {userDisplayName}</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={signOut}
          className="hidden sm:flex"
        >
          <LogOut size={18} />
        </Button>
      </>
    );
  }

  return (
    <>
      <Button 
        variant="outline" 
        className="hidden sm:flex"
        asChild
      >
        <Link to="/login">Sign In</Link>
      </Button>
      <Button 
        className="bg-budget-teal text-budget-navy hover:bg-budget-teal/90"
        asChild
      >
        <Link to="/signup">Sign Up</Link>
      </Button>
    </>
  );
};
