
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <Avatar className="h-10 w-10 border-2 border-budget-teal rounded-full overflow-hidden">
        <AvatarImage 
          src={`${import.meta.env.BASE_URL}lovable-uploads/a8310e08-f714-4e01-8a60-59ff570560df.png`}
          alt="BudgetBliss Logo"
          className="object-cover" 
          onError={(e) => {
            console.error("Logo failed to load:", e);
            e.currentTarget.src = `${import.meta.env.BASE_URL}placeholder.svg`;
          }}
        />
        <AvatarFallback className="bg-budget-teal text-budget-navy font-bold">BB</AvatarFallback>
      </Avatar>
      <span className="font-bold text-budget-teal text-xl hidden sm:inline-block">
        BudgetBliss
      </span>
    </Link>
  );
};
