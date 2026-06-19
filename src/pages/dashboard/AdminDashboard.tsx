import { useEffect, useState } from 'react';

import { useAuth } from '../../context/AuthContext';
import {
  approveUser,
  banUser,
  grantAdmin,
  grantCreate,
  listUsers,
  rejectUser,
  revokeAdmin,
  revokeCreate,
  unbanUser,
} from '../../lib/admin';

type User = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  is_admin: boolean;
  is_verified: boolean;
  is_approved: boolean;
  is_banned: boolean;
  can_create: boolean;
  is_super_admin: boolean;
};

export default function AdminDashboard() {
  const { superAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await listUsers();
        setUsers(data.users);
      } catch {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  async function handleApprove(id: number) {
    try {
      await approveUser(id);
      setUsers(
        users.map((u) => (u.id === id ? { ...u, is_approved: true } : u))
      );
    } catch {
      setError('Failed to approve user');
    }
  }

  async function handleReject(id: number) {
    try {
      await rejectUser(id);
      setUsers(
        users.map((u) => (u.id === id ? { ...u, is_approved: false } : u))
      );
    } catch {
      setError('Failed to reject user');
    }
  }

  async function handleBan(id: number) {
    try {
      await banUser(id);
      setUsers(users.map((u) => (u.id === id ? { ...u, is_banned: true } : u)));
    } catch {
      setError('Failed to ban user');
    }
  }

  async function handleUnban(id: number) {
    try {
      await unbanUser(id);
      setUsers(
        users.map((u) => (u.id === id ? { ...u, is_banned: false } : u))
      );
    } catch {
      setError('Failed to unban user');
    }
  }

  async function handleGrantCreate(id: number) {
    try {
      await grantCreate(id);
      setUsers(
        users.map((u) => (u.id === id ? { ...u, can_create: true } : u))
      );
    } catch {
      setError('Failed to grant create permission');
    }
  }

  async function handleRevokeCreate(id: number) {
    try {
      await revokeCreate(id);
      setUsers(
        users.map((u) => (u.id === id ? { ...u, can_create: false } : u))
      );
    } catch {
      setError('Failed to revoke create permission');
    }
  }

  async function handleGrantAdmin(id: number) {
    try {
      await grantAdmin(id);
      setUsers(users.map((u) => (u.id === id ? { ...u, is_admin: true } : u)));
    } catch {
      setError('Failed to grant admin');
    }
  }

  async function handleRevokeAdmin(id: number) {
    try {
      await revokeAdmin(id);
      setUsers(users.map((u) => (u.id === id ? { ...u, is_admin: false } : u)));
    } catch {
      setError('Failed to revoke admin');
    }
  }

  return (
    <div className="max-w-full">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[16px] font-medium">User Management</h1>
        <span className="text-[12px] text-muted">{users.length} total</span>
      </div>

      {error && (
        <p className="mb-4 text-center text-[12px] text-red-400">{error}</p>
      )}

      <div className="rounded-xl bg-tile p-5">
        <p className="mb-4 text-[12px] text-muted">All users</p>

        {loading ? (
          <p className="text-[12px] text-muted">Loading...</p>
        ) : (
          users.map((user, i) => (
            <div
              key={user.id}
              className={`flex flex-col md:flex-row items-start justify-between py-3 ${
                i < users.length - 1 ? 'border-b border-neutral-800' : ''
              }`}
            >
              <div className="mb-2 md:mb-0">
                <div className="font-mono text-[13px]">{user.name}</div>
                <div className="mt-0.5 text-[12px] text-muted">
                  {user.email}
                </div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {user.is_super_admin && (
                    <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 font-mono text-[10px] text-yellow-400">
                      super admin
                    </span>
                  )}
                  {user.is_admin && (
                    <span className="rounded-full bg-accent/20 px-2 py-0.5 font-mono text-[10px] text-accent-bright">
                      admin
                    </span>
                  )}
                  {user.is_verified ? (
                    <span className="rounded-full bg-green-500/15 px-2 py-0.5 font-mono text-[10px] text-green-400">
                      verified
                    </span>
                  ) : (
                    <span className="rounded-full bg-neutral-500/15 px-2 py-0.5 font-mono text-[10px] text-neutral-400">
                      unverified
                    </span>
                  )}
                  {user.is_approved ? (
                    <span className="rounded-full bg-accent/20 px-2 py-0.5 font-mono text-[10px] text-accent-bright">
                      approved
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-500/15 px-2 py-0.5 font-mono text-[10px] text-red-400">
                      pending
                    </span>
                  )}
                  {user.is_banned && (
                    <span className="rounded-full bg-red-500/15 px-2 py-0.5 font-mono text-[10px] text-red-400">
                      banned
                    </span>
                  )}
                  {user.can_create && (
                    <span className="rounded-full bg-purple-500/15 px-2 py-0.5 font-mono text-[10px] text-purple-400">
                      can create apps/orgs
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 my-auto">
                {user.is_super_admin ? (
                  <span className="px-3 py-1.5 text-[11px] italic text-muted">
                    Protected account
                  </span>
                ) : (
                  <>
                    {user.is_approved ? (
                      <button
                        onClick={() => handleReject(user.id)}
                        className="rounded-lg bg-red-500/15 px-3 py-1.5 text-[11px] font-medium text-red-400 hover:bg-red-500/25 transition-colors cursor-pointer"
                      >
                        Revoke
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprove(user.id)}
                        className="rounded-lg bg-accent/20 px-3 py-1.5 text-[11px] font-medium text-accent-bright hover:bg-accent/30 transition-colors cursor-pointer"
                      >
                        Approve
                      </button>
                    )}
                    {user.is_banned ? (
                      <button
                        onClick={() => handleUnban(user.id)}
                        className="rounded-lg bg-neutral-500/15 px-3 py-1.5 text-[11px] font-medium text-neutral-400 hover:bg-neutral-500/25 transition-colors cursor-pointer"
                      >
                        Unban
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBan(user.id)}
                        className="rounded-lg bg-red-500/15 px-3 py-1.5 text-[11px] font-medium text-red-400 hover:bg-red-500/25 transition-colors cursor-pointer"
                      >
                        Ban
                      </button>
                    )}
                    {user.can_create ? (
                      <button
                        onClick={() => handleRevokeCreate(user.id)}
                        className="rounded-lg bg-neutral-500/15 px-3 py-1.5 text-[11px] font-medium text-neutral-400 hover:bg-neutral-500/25 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Revoke Privileges
                      </button>
                    ) : (
                      <button
                        onClick={() => handleGrantCreate(user.id)}
                        className="rounded-lg bg-purple-500/15 px-3 py-1.5 text-[11px] font-medium text-purple-400 hover:bg-purple-500/25 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Elevate Privileges
                      </button>
                    )}
                    {superAdmin && !user.is_admin && (
                      <button
                        onClick={() => handleGrantAdmin(user.id)}
                        className="rounded-lg bg-yellow-500/15 px-3 py-1.5 text-[11px] font-medium text-yellow-400 hover:bg-yellow-500/25 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Make Admin
                      </button>
                    )}
                    {superAdmin && user.is_admin && (
                      <button
                        onClick={() => handleRevokeAdmin(user.id)}
                        className="rounded-lg bg-neutral-500/15 px-3 py-1.5 text-[11px] font-medium text-neutral-400 hover:bg-neutral-500/25 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Remove Admin
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
