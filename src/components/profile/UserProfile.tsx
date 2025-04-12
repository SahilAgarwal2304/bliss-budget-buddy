
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { IndianRupee } from "lucide-react";

interface UserProfileData {
  name: string;
  email: string;
  monthlyIncome: string;
  preferredCurrency: string;
}

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileData>({
    name: user?.name || "",
    email: user?.email || "",
    monthlyIncome: localStorage.getItem("userMonthlyIncome") || "50000",
    preferredCurrency: "INR"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, you would save this to a database
    localStorage.setItem("userMonthlyIncome", profileData.monthlyIncome);
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          User Profile
          <IndianRupee className="h-5 w-5 text-budget-teal" />
        </CardTitle>
        <CardDescription>Manage your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={profileData.email}
            disabled={true} // Email cannot be changed
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
          <Input
            id="monthlyIncome"
            name="monthlyIncome"
            type="number"
            value={profileData.monthlyIncome}
            onChange={handleChange}
            disabled={!isEditing}
            className="appearance-none"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredCurrency">Preferred Currency</Label>
          <Input
            id="preferredCurrency"
            name="preferredCurrency"
            value="Indian Rupee (₹)"
            disabled={true} // Currency is fixed to INR
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEditing ? (
          <>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-budget-teal text-budget-navy hover:bg-budget-teal/90"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              onClick={logout}
              className="text-budget-red hover:bg-budget-red/10 hover:text-budget-red"
            >
              Log Out
            </Button>
            <Button 
              className="bg-budget-teal text-budget-navy hover:bg-budget-teal/90"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
