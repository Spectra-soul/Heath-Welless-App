import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Register user
  const register = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      await loadUser();
      setLoading(false);
    } catch (err) {
      setError(err.response.data.msg);
      setLoading(false);
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      await loadUser();
      setLoading(false);
    } catch (err) {
      setError(err.response.data.msg);
      setLoading(false);
    }
  };

  // Load User
  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth/user', {
        headers: {
          'x-auth-token': token
        }
      });
      setUser(res.data);
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Change Password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      await axios.put(
        '/api/users/change-password',
        { currentPassword, newPassword },
        {
          headers: {
            'x-auth-token': token
          }
        }
      );
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response.data.msg);
      setLoading(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        loadUser,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 