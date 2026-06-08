import { useAuth } from '../context/AuthContext';
import type { Log, Stat } from '../types/Types';

export default function Dashboard() {
  const { user } = useAuth();

  const displayName =
    user?.user_name ||
    (() => {
      const emailName = user?.user_email?.split('@')[0] ?? '';

      return emailName.length > 20 ? `${emailName.slice(0, 20)}...` : emailName;
    })();

  const stats: Stat[] = [
    {
      label: 'Templates',
      value: 12,
      sub: '+2 this week',
    },
    {
      label: 'Emails Sent',
      value: 483,
      sub: '+18 today',
    },
    {
      label: 'Active Apps',
      value: 4,
      sub: 'All healthy',
    },
  ];

  const logs: Log[] = [
    {
      app: 'Welcome Email',
      to: 'user@example.com',
      status: 'sent',
      time: '2m ago',
    },
    {
      app: 'Password Reset',
      to: 'admin@example.com',
      status: 'failed',
      time: '15m ago',
    },
  ];

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[16px] font-medium">Overview</h1>

        <div className="flex items-center gap-2 text-[13px] text-muted">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[11px] font-medium text-white">
            {user?.user_name?.slice(0, 2).toUpperCase() ?? 'JD'}
          </div>
          {displayName}
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-3 gap-2.5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-tile p-4">
            <div className="mb-1.5 text-[11px] text-muted">{stat.label}</div>

            <div className="text-[22px] font-medium">{stat.value}</div>

            <div className="mt-1 text-[11px] text-accent-bright">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl bg-tile p-5">
        <p className="mb-4 text-[12px] text-muted">Recent activity</p>

        {logs.map((log, i) => (
          <div
            key={i}
            className={`flex items-center justify-between py-2 ${
              i < logs.length - 1 ? 'border-b border-neutral-800' : ''
            }`}
          >
            <div>
              <div className="font-mono text-[13px]">{log.app}</div>

              <div className="mt-0.5 text-[12px] text-muted">{log.to}</div>
            </div>

            <div className="flex items-center gap-2.5">
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${
                  log.status === 'sent'
                    ? 'bg-accent/20 text-accent-bright'
                    : 'bg-red-500/15 text-red-400'
                }`}
              >
                {log.status}
              </span>

              <span className="text-[11px] text-muted">{log.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
