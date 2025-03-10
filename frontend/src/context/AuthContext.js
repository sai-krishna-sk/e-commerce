// context/AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user data from localStorage on page load
    const token = localStorage.getItem("auth_token");
    const role = localStorage.getItem("user_role");
    
    if (token) {
      setUser({ token, role });
    }
  }, []);

  const login = (token, role) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_role", role);
    setUser({ token, role });
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};