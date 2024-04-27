import React, { createContext, useState, useContext } from 'react';

// Context to store user authentication data
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

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
