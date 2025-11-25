"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "employee";
  image?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const route = useRouter();
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("authUser");
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  });

  const [loading, setLoading] = useState(false);

  const setAuth = (user: AuthUser, token: string) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
    route.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  return context;
};
