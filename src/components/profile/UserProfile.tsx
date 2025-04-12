
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Mail, Phone, User } from "lucide-react";

const UserProfile = () => {
  const { user, logout } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleSave = () => {
    // In a real app, this would call an API to update the user profile
    // For now, we'll just show a success message
    toast.success("Profile updated successfully!");
    setIsEditing(false);
    
    // Update the user in local storage to simulate a real update
    if (user) {
      const updatedUser = {
        ...user,
        name,
        email,
        phone
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Force a page reload to reflect changes
      window.location.reload();
    }
  };

  const handleCancel = () => {
    // Reset form values and exit edit mode
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>View and manage your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Profile Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    placeholder="Your full name"
                  />
                </div>
              ) : (
                <div className="flex items-center border rounded-md p-2">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{user?.name || "Not provided"}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? (
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder="your.email@example.com"
                  />
                </div>
              ) : (
                <div className="flex items-center border rounded-md p-2">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{user?.email || "Not provided"}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    placeholder="Your phone number"
                  />
                </div>
              ) : (
                <div className="flex items-center border rounded-md p-2">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{user?.phone || "Not provided"}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button className="bg-budget-teal text-budget-navy hover:bg-budget-teal/90" onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={logout}>Log Out</Button>
              <Button className="bg-budget-teal text-budget-navy hover:bg-budget-teal/90" onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;
