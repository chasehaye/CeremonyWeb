import { useEffect, useState } from 'react';

import { approveUser, listUsers, rejectUser } from '../../lib/admin';

type User = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  is_admin: boolean;
  is_verified: boolean;
  is_approved: boolean;
};

export default function AdminDashboard() {
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
              className={`flex items-center justify-between py-3 ${
                i < users.length - 1 ? 'border-b border-neutral-800' : ''
              }`}
            >
              <div>
                <div className="font-mono text-[13px]">{user.name}</div>
                <div className="mt-0.5 text-[12px] text-muted">
                  {user.email}
                </div>
                <div className="mt-1 flex gap-2">
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
                </div>
              </div>

              {!user.is_admin && (
                <div className="flex gap-2">
                  {!user.is_approved && (
                    <button
                      onClick={() => handleApprove(user.id)}
                      className="rounded-lg bg-accent/20 px-3 py-1.5 text-[11px] font-medium text-accent-bright hover:bg-accent/30 transition-colors cursor-pointer"
                    >
                      Approve
                    </button>
                  )}
                  {user.is_approved && (
                    <button
                      onClick={() => handleReject(user.id)}
                      className="rounded-lg bg-red-500/15 px-3 py-1.5 text-[11px] font-medium text-red-400 hover:bg-red-500/25 transition-colors cursor-pointer"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
