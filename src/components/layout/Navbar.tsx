
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BarChart3, PiggyBank, History, Target } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur">
      <div className="budget-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/a8310e08-f714-4e01-8a60-59ff570560df.png" 
                alt="BudgetBliss Logo" 
                className="h-10 w-10"
              />
              <span className="font-bold text-budget-teal text-xl hidden sm:inline-block">
                BudgetBliss
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-foreground/80 hover:text-budget-teal transition-colors">
              Dashboard
            </Link>
            <Link to="/expenses" className="text-foreground/80 hover:text-budget-teal transition-colors">
              Expenses
            </Link>
            <Link to="/goals" className="text-foreground/80 hover:text-budget-teal transition-colors">
              Goals
            </Link>
            <Link to="/history" className="text-foreground/80 hover:text-budget-teal transition-colors">
              History
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden sm:flex">
              Sign In
            </Button>
            <Button className="bg-budget-teal text-budget-navy hover:bg-budget-teal/90">
              Sign Up
            </Button>
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="space-y-1 px-4 py-3">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 py-2 text-base text-foreground hover:text-budget-teal"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BarChart3 size={18} />
              Dashboard
            </Link>
            <Link 
              to="/expenses" 
              className="flex items-center gap-2 py-2 text-base text-foreground hover:text-budget-teal"
              onClick={() => setMobileMenuOpen(false)}
            >
              <PiggyBank size={18} />
              Expenses
            </Link>
            <Link 
              to="/goals" 
              className="flex items-center gap-2 py-2 text-base text-foreground hover:text-budget-teal"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Target size={18} />
              Goals
            </Link>
            <Link 
              to="/history" 
              className="flex items-center gap-2 py-2 text-base text-foreground hover:text-budget-teal"
              onClick={() => setMobileMenuOpen(false)}
            >
              <History size={18} />
              History
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
