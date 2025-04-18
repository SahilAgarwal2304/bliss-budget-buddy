
import { Link } from "react-router-dom";
import { BarChart3, PiggyBank, History, Target, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/SupabaseAuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  userDisplayName: string;
}

export const MobileMenu = ({ isOpen, onClose, isAuthenticated, userDisplayName }: MobileMenuProps) => {
  const { signOut } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-border/40 bg-background">
      <div className="space-y-1 px-4 py-3">
        {isAuthenticated ? (
          <>
            <div className="py-2 border-b border-border/40 mb-2">
              <div className="flex items-center gap-2 py-2">
                <User size={18} />
                <span>{userDisplayName}</span>
              </div>
            </div>
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 py-2 text-base text-foreground hover:text-budget-teal"
              onClick={onClose}
            >
              <BarChart3 size={18} />
              Dashboard
            </Link>
            <Link 
              to="/expenses" 
              className="flex items-center gap-2 py-2 text-base text-foreground hover:text-budget-teal"
              onClick={onClose}
            >
              <PiggyBank size={18} />
              Expenses
            </Link>
            <Link 
              to="/goals" 
              className="flex items-center gap-2 py-2 text-base text-foreground hover:text-budget-teal"
              onClick={onClose}
            >
              <Target size={18} />
              Goals
            </Link>
            <Link 
              to="/history" 
              className="flex items-center gap-2 py-2 text-base text-foreground hover:text-budget-teal"
              onClick={onClose}
            >
              <History size={18} />
              History
            </Link>
            <button 
              className="flex items-center gap-2 py-2 text-base text-foreground hover:text-budget-teal w-full text-left"
              onClick={() => {
                onClose();
                signOut();
              }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login"
              className="flex items-center gap-2 py-2 text-base text-foreground hover:text-budget-teal w-full text-left"
              onClick={onClose}
            >
              Sign In
            </Link>
            <Link 
              to="/signup"
              className="flex items-center gap-2 py-2 text-base text-foreground hover:text-budget-teal w-full text-left"
              onClick={onClose}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
