// src/context/AuthContext.jsx

import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const login = (role) => {
    // In a real app, this would be a full user object after an API call
    const mockUser = {
      Admin: { name: 'Jane Smith', role: 'Admin' },
      Staff: { name: 'John Doe', role: 'Staff' },
    };
    setCurrentUser(mockUser[role]);
    navigate('/dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};