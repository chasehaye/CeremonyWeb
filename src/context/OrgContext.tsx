import { createContext, useContext, useEffect, useState } from 'react';

import { createOrg, deleteOrg, listOrgs } from '../lib/org';
import { useAuth } from './AuthContext';

export type Org = {
  name: string;
  slug: string;
};

export type OrgContextType = {
  orgs: Org[];
  setOrgs: React.Dispatch<React.SetStateAction<Org[]>>;
  activeOrg: Org | null;
  setActiveOrg: React.Dispatch<React.SetStateAction<Org | null>>;
  loading: boolean;
  switchOrg: (org: Org) => void;
  addOrg: (name: string) => Promise<void>;
  removeOrg: (slug: string) => Promise<void>;
};

const OrgContext = createContext<OrgContextType | undefined>(undefined);

type OrgProviderProps = {
  children: React.ReactNode;
};

export function OrgProvider({ children }: OrgProviderProps) {
  const { user } = useAuth();
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [activeOrg, setActiveOrg] = useState<Org | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initOrgs() {
      if (!user) {
        setOrgs([]);
        setActiveOrg(null);
        setLoading(false);
        return;
      }
      try {
        const data = await listOrgs();
        if (data?.organizations) {
          const mapped = data.organizations.map(
            (item: { organization: Org; role: string }) => item.organization
          );
          setOrgs(mapped);
          const savedSlug = localStorage.getItem('activeOrgSlug');
          const restored =
            mapped.find((o: Org) => o.slug === savedSlug) ?? mapped[0] ?? null;
          setActiveOrg(restored);
        }
      } catch {
        setOrgs([]);
      } finally {
        setLoading(false);
      }
    }
    initOrgs();
  }, [user]);

  const switchOrg = (org: Org) => {
    setActiveOrg(org);
    localStorage.setItem('activeOrgSlug', org.slug);
  };

  const addOrg = async (name: string) => {
    try {
      const res = await createOrg({ name });
      const newOrg = res.organization;
      setOrgs((prev) => [...prev, newOrg]);
      switchOrg(newOrg);
    } catch {
      // handle error
    }
  };

  const removeOrg = async (slug: string) => {
    try {
      await deleteOrg(slug);
      setOrgs((prev) => {
        const updated = prev.filter((o) => o.slug !== slug);
        if (activeOrg?.slug === slug) {
          const next = updated[0] ?? null;
          setActiveOrg(next);
          if (next) localStorage.setItem('activeOrgSlug', next.slug);
          else localStorage.removeItem('activeOrgSlug');
        }
        return updated;
      });
    } catch {
      // handle error
    }
  };

  return (
    <OrgContext.Provider
      value={{
        orgs,
        setOrgs,
        activeOrg,
        setActiveOrg,
        loading,
        switchOrg,
        addOrg,
        removeOrg,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export const useOrg = (): OrgContextType => {
  const context = useContext(OrgContext);
  if (!context) {
    throw new Error('useOrg must be used within an OrgProvider');
  }
  return context;
};
