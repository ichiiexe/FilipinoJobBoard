import { createContext, useMemo, useState, type ReactNode } from "react";
import { login as loginApi, register as registerApi } from "../api/axios";

type RegisterData = {
  name: string;
  email: string;
  password: string;
  bio?: string;
  skills?: string;
  phoneNumber?: string;
  address?: string;
  experience?: string;
  resumeLink?: string;
};

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("authToken"),
  );
// Local React state.
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginApi({ email, password });
      localStorage.setItem("authToken", data.token);
      setToken(data.token);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    try {
      const response = await registerApi(data);
      localStorage.setItem("authToken", response.token);
      setToken(response.token);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      loading,
      login,
      register,
      logout,
    }),
    [token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
