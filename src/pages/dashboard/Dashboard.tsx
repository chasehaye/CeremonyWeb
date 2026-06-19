import { useEffect, useState } from 'react';

import { useOrg } from '../../context/OrgContext';
import { getOrgStats } from '../../lib/org';

type RecentLog = {
  to_email: string;
  subject: string;
  status: string;
  created_at: string;
};

type Stats = {
  total_emails: number;
  sent_emails: number;
  failed_emails: number;
  pending_emails: number;
  total_templates: number;
  active_apps: number;
  recent_logs: RecentLog[];
};

export default function Dashboard() {
  const { activeOrg } = useOrg();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!activeOrg) return;
    async function fetchStats() {
      try {
        const data = await getOrgStats(activeOrg!.slug);
        setStats(data);
      } catch {
        setError('Failed to load stats');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [activeOrg]);

  const statCards = stats
    ? [
        { label: 'Templates', value: stats.total_templates, sub: null },
        {
          label: 'Emails Sent',
          value: stats.sent_emails,
          sub: `${stats.failed_emails} failed`,
        },
        { label: 'Active Apps', value: stats.active_apps, sub: null },
      ]
    : [];

  return (
    <div className="max-w-full">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[16px] font-medium">Overview</h1>
      </div>

      {error && (
        <p className="mb-4 text-[12px] text-center text-red-400">{error}</p>
      )}

      {loading ? (
        <p className="text-[12px] text-muted">Loading...</p>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-3 gap-2.5">
            {statCards.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-tile p-4">
                <div className="mb-1.5 text-[11px] text-muted">
                  {stat.label}
                </div>
                <div className="text-[22px] font-medium">{stat.value}</div>
                {stat.sub && (
                  <div className="mt-1 text-[11px] text-accent-bright">
                    {stat.sub}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-tile p-5">
            <p className="mb-4 text-[12px] text-muted">Recent activity</p>
            {!stats?.recent_logs?.length ? (
              <p className="text-[12px] text-muted">No recent activity</p>
            ) : (
              stats.recent_logs.map((log, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-2 ${
                    i < stats.recent_logs.length - 1
                      ? 'border-b border-neutral-800'
                      : ''
                  }`}
                >
                  <div>
                    <div className="font-mono text-[13px]">{log.subject}</div>
                    <div className="mt-0.5 text-[12px] text-muted">
                      {log.to_email}
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${
                        log.status === 'sent'
                          ? 'bg-accent/20 text-accent-bright'
                          : log.status === 'failed'
                            ? 'bg-red-500/15 text-red-400'
                            : 'bg-neutral-500/15 text-neutral-400'
                      }`}
                    >
                      {log.status}
                    </span>
                    <span className="text-[11px] text-muted">
                      {new Date(log.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
