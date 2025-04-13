
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithOTP: (phone: string, otp: string) => Promise<void>;
  signup: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  logout: () => void;
  sendOTP: (phone: string) => Promise<void>;
  verifyPhone: (phone: string, otp: string) => Promise<boolean>;
}

// This context would connect to PostgreSQL (Neon) in a production environment
// Currently using localStorage as a mock database
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in from localStorage (would be PostgreSQL in production)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // In a real implementation, these functions would make API calls to a backend service
  // that interacts with PostgreSQL (Neon) database
  const login = async (email: string, password: string) => {
    try {
      // This is a mock login - in a real app with PostgreSQL, this would call an API
      // For demo purposes, we'll just set a mock user
      console.log("PostgreSQL (Neon) would authenticate user here");
      
      const mockUser = {
        id: "user-123",
        email,
        name: email.split("@")[0],
      };
      
      // Store user in localStorage for persistence (would be a JWT token in production)
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const loginWithOTP = async (phone: string, otp: string) => {
    try {
      // Verify OTP first
      const isVerified = await verifyPhone(phone, otp);
      
      if (isVerified) {
        console.log("PostgreSQL (Neon) would verify phone and OTP here");
        
        // Mock user for phone login
        const mockUser = {
          id: "user-" + Math.floor(Math.random() * 1000),
          email: `user-${phone}@example.com`, // Generated email for phone users
          name: `User-${phone.slice(-4)}`,
          phone
        };
        
        localStorage.setItem("user", JSON.stringify(mockUser));
        setUser(mockUser);
        toast.success("Phone verification successful!");
        navigate("/dashboard");
        return;
      }
      
      toast.error("OTP verification failed");
      throw new Error("OTP verification failed");
    } catch (error) {
      console.error("Login with OTP failed", error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, phone?: string) => {
    try {
      // This is a mock signup - in a real app with PostgreSQL (Neon), this would call an API
      console.log("PostgreSQL (Neon) would register user here");
      
      const mockUser = {
        id: "user-" + Math.floor(Math.random() * 1000),
        email,
        name,
        phone
      };
      
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // Mock OTP functionality
  const sendOTP = async (phone: string) => {
    try {
      // In a real app, this would call an API to send an OTP
      // For demo, we'll just store a mock OTP in localStorage
      const mockOTP = Math.floor(1000 + Math.random() * 9000).toString();
      localStorage.setItem(`otp-${phone}`, mockOTP);
      
      // Show the OTP in a toast for testing purposes
      toast.info(`Your OTP is: ${mockOTP}`, {
        duration: 10000,
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to send OTP", error);
      throw error;
    }
  };

  const verifyPhone = async (phone: string, otp: string) => {
    try {
      // In a real app, this would call an API to verify the OTP
      // For demo, we'll just check against the stored mock OTP
      const storedOTP = localStorage.getItem(`otp-${phone}`);
      
      if (storedOTP && storedOTP === otp) {
        // Clear the OTP after successful verification
        localStorage.removeItem(`otp-${phone}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("OTP verification failed", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithOTP,
        signup,
        logout,
        sendOTP,
        verifyPhone
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
