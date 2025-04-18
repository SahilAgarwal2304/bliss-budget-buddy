
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/SupabaseAuthContext";
import { NavLogo } from "./NavLogo";
import { NavLinks } from "./NavLinks";
import { AuthButtons } from "./AuthButtons";
import { MobileMenu } from "./MobileMenu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Helper to get user's display name from user metadata
  const getUserDisplayName = () => {
    if (!user) return "";
    return user.user_metadata?.name || user.email?.split("@")[0] || "";
  };

  const isAuthenticated = !!user;
  const userDisplayName = getUserDisplayName();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur">
      <div className="budget-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <NavLogo />
          </div>

          {isAuthenticated && <NavLinks />}

          <div className="flex items-center gap-4">
            <AuthButtons 
              isAuthenticated={isAuthenticated} 
              userDisplayName={userDisplayName} 
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        userDisplayName={userDisplayName}
      />
    </header>
  );
};

export default Navbar;
