'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  telefono: string;
  esConductor: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('uniride_user');
    if (stored) setUserState(JSON.parse(stored));
  }, []);

  const setUser = (u: User | null) => {
    setUserState(u);
    if (u) localStorage.setItem('uniride_user', JSON.stringify(u));
    else localStorage.removeItem('uniride_user');
  };

  const logout = () => {
    setUserState(null);
    localStorage.removeItem('uniride_user');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);