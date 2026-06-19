import { createContext, useContext, useEffect, useState } from 'react';

import { getMe, logout } from '../lib/auth';

export type User = {
  user_email: string;
  user_name: string;
  is_admin: boolean;
  is_verified: boolean;
  is_approved: boolean;
  is_banned: boolean;
  can_create: boolean;
};

export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  admin: boolean;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  verified: boolean;
  setVerified: React.Dispatch<React.SetStateAction<boolean>>;
  approved: boolean;
  setApproved: React.Dispatch<React.SetStateAction<boolean>>;
  banned: boolean;
  setBanned: React.Dispatch<React.SetStateAction<boolean>>;
  canCreate: boolean;
  setCanCreate: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  logoutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [approved, setApproved] = useState(false);
  const [banned, setBanned] = useState(false);
  const [canCreate, setCanCreate] = useState(false);

  useEffect(() => {
    async function initAuth() {
      try {
        const data = await getMe();
        if (data) {
          setUser(data);
          setAdmin(data.is_admin === true);
          setVerified(data.is_verified === true);
          setApproved(data.is_approved === true);
          setBanned(data.is_banned === true);
          setCanCreate(data.can_create === true);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    initAuth();
  }, []);

  const logoutUser = async () => {
    try {
      await logout();
    } catch {
    } finally {
      setUser(null);
      setAdmin(false);
      setVerified(false);
      setApproved(false);
      setBanned(false);
      setCanCreate(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        admin,
        setAdmin,
        verified,
        setVerified,
        approved,
        setApproved,
        banned,
        setBanned,
        canCreate,
        setCanCreate,
        loading,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
