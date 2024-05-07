import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    // Get auth data from localStorage when the component mounts
    const persistedAuthData = localStorage.getItem("authData");
    return persistedAuthData ? JSON.parse(persistedAuthData) : null;
  });

  useEffect(() => {
    // Persist auth data to localStorage when it changes
    if (authData) {
      localStorage.setItem("authData", JSON.stringify(authData));
    } else {
      localStorage.removeItem("authData"); // Clear auth data from localStorage when logged out
    }
  }, [authData]);

  const updateAuthData = (data) => {
    setAuthData(data);
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthData: updateAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
