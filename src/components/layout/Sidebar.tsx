import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', icon: '⬡', label: 'Overview' },
  { to: '/apps', icon: '◈', label: 'Apps' },
  { to: '/templates', icon: '◻', label: 'Templates' },
  { to: '/logs', icon: '≡', label: 'Logs' },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: '200px',
        flexShrink: 0,
        background: 'var(--bg-base)',
        borderRight: '0.5px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.25rem',
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '2rem',
          fontSize: '15px',
          fontWeight: 500,
          color: 'var(--text-primary)',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        Ceremony
      </div>

      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          flex: 1,
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '7px 10px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              color: isActive ? 'var(--accent-dim)' : 'var(--text-secondary)',
              background: isActive ? 'var(--accent-bg)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.15s ease',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.01em',
            })}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              if (!el.classList.contains('active')) {
                el.style.background = 'var(--bg-hover)';
                el.style.color = 'var(--text-primary)';
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              if (!el.getAttribute('aria-current')) {
                el.style.background = 'transparent';
                el.style.color = 'var(--text-secondary)';
              }
            }}
          >
            <span style={{ fontSize: '16px', opacity: 0.7 }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div
        style={{ borderTop: '0.5px solid var(--border)', paddingTop: '1rem' }}
      >
        <NavLink
          to="/settings"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '7px 10px',
            borderRadius: 'var(--radius-md)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <span style={{ fontSize: '16px', opacity: 0.7 }}>⚙</span>
          Settings
        </NavLink>
      </div>
    </aside>
  );
}
