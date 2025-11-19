import jwtDecode from "jwt-decode";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { JwtPayload, LoginResponse, User } from "../types";
import { deleteItem, getItem, saveItem } from "../utils/storage";

const TOKEN_KEY = "token";

type AuthContextType = {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (payload: LoginResponse) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load stored token on app start
  useEffect(() => {
    (async () => {
      try {
        const storedToken = await getItem<string>("token");
        const storedUser = await getItem<User>("user");

        if (storedToken) {
          setToken(storedToken);

          if (storedUser) {
            // ✔️ We stored full user earlier → use it
            setUser(storedUser);
          } else {
            // ❗ fallback only if user not stored
            try {
              const payload = jwtDecode<JwtPayload>(storedToken);
              setUser(payload.user ?? null);
            } catch {
              setUser(null);
            }
          }
        }
      } catch (e) {
        console.error("Auth load error:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async ({ token: newToken, user: userData }: LoginResponse) => {
    await saveItem(TOKEN_KEY, newToken);
    setToken(newToken);

    if (userData) {
      setUser(userData);
    } else {
      try {
        const payload = jwtDecode<JwtPayload>(newToken);
        setUser(payload.user ?? null);
      } catch {
        setUser(null);
      }
    }
  };

  const logout = async () => {
    await deleteItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
