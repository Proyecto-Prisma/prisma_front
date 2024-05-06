import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './routes/LoginPage';
import SignupPage from './routes/SignupPage';
import HomePage from './routes/HomePage';
import OnePage from './routes/OnePage';
import { AuthProvider, useAuth } from './AuthContext';  // Ensure you import useAuth and AuthProvider correctly

// A component to handle protected routes
const ProtectedRoute = ({ children }) => {
  const { authData } = useAuth();
  
  // Redirect to login if there is no auth data
  if (!authData) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider> 
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/prisma" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/" element={<OnePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
