
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // This is a mock login - in a real app, this would call an API
      // For demo purposes, we'll just set a mock user
      const mockUser = {
        id: "user-123",
        email,
        name: email.split("@")[0],
      };
      
      // Store user in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      // This is a mock signup - in a real app, this would call an API
      const mockUser = {
        id: "user-" + Math.floor(Math.random() * 1000),
        email,
        name,
      };
      
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
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
