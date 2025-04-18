
import { Link } from "react-router-dom";

export const NavLinks = () => {
  return (
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
  );
};
