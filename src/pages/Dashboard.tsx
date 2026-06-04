import { useAuth } from '../context/AuthContext';

const stats = [
  { label: 'Emails sent', value: '1,284', sub: '↑ this month' },
  { label: 'Active apps', value: '3', sub: 'registered' },
  { label: 'Templates', value: '7', sub: 'in use' },
];

const logs = [
  { app: 'my-app', to: 'user@gmail.com', status: 'sent', time: '2m ago' },
  {
    app: 'portfolio-site',
    to: 'client@company.com',
    status: 'sent',
    time: '18m ago',
  },
  { app: 'my-app', to: 'test@test.com', status: 'failed', time: '1h ago' },
  {
    app: 'api-service',
    to: 'admin@domain.com',
    status: 'sent',
    time: '2h ago',
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  console.log('user:', user);
  return (
    <div style={{ maxWidth: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        <h1 style={{ fontSize: '16px', fontWeight: 500 }}>Overview</h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: 'var(--text-secondary)',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--accent-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--accent-dim)',
            }}
          >
            JD
          </div>
          John
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          marginBottom: '2rem',
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: 'var(--bg-elevated)',
              border: '0.5px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.875rem 1rem',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                marginBottom: '6px',
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: '11px',
                color: 'var(--accent-dark)',
                marginTop: '4px',
              }}
            >
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: 'var(--bg-surface)',
          border: '0.5px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            marginBottom: '1rem',
          }}
        >
          Recent activity
        </p>
        {logs.map((log, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom:
                i < logs.length - 1
                  ? '0.5px solid var(--border-subtle)'
                  : 'none',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {log.app}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  marginTop: '2px',
                }}
              >
                {log.to}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  background:
                    log.status === 'sent'
                      ? 'var(--success-bg)'
                      : 'var(--danger-bg)',
                  color:
                    log.status === 'sent'
                      ? 'var(--success-text)'
                      : 'var(--danger-text)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {log.status}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {log.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
