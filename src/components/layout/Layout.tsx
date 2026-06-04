import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          background: 'var(--bg-base)',
          overflowY: 'auto',
          padding: '2rem',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
