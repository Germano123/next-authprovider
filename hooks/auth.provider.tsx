"use client";

import { users } from "@/data/users";
import { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  uid: string;
  name: string;
  email: string;
  password: string;
}

export interface Credentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading?: boolean;
  login: (user: Credentials) => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = (login: Credentials): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(true);
        const user = users.find(
          (u) => u.email === login.email && u.password === login.password
        );

        if (user) {
          setUser(user);
          setLoading(false);
          resolve(user);
        } else {
          setLoading(false);
          resolve(null);
        }
      }, 1000); // 1 segundo de delay
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
