import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../api/axios";
import { AuthContext } from "./AuthContext";

type User = {
  _id?: string;
  fullName?: string;
  email?: string;
  bio?: string;
  skills?: string[];
  address?: string;
  phone?: number;
  resume?: string;
  role?: string;
};

interface UserContextValue {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  setUser: (u: User | null) => void;
}

export const UserContext = createContext<UserContextValue | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const auth = useContext(AuthContext);

  const refreshUser = async () => {
    if (!auth?.token) {
      setUser(null);
      return;
    }

    setLoading(true);
    try {
      const res = await getMe();
      // axios responses typically in res.data
      const payload = res?.data ?? res;
      setUser(payload.user ?? payload);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      refreshUser();
    } else {
      setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token]);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used inside UserProvider");
  return ctx;
};
