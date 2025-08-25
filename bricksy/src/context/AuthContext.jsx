// UPDATED: Provide a consistent `user` object, isAuthenticated flag, login/signup/logout that persist to localStorage
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name, email } or null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.error('Auth read error', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find((u) => u.email === email)) {
      return { ok: false, error: 'User already exists' };
    }
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, error: 'Invalid email or password' };

    const u = { name: found.name, email: found.email };
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
    return { ok: true, user: u };
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
