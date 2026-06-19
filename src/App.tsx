import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import { useAuth } from './context/AuthContext';
import AdminApproval from './pages/auth/AdminApproval';
import BannedPage from './pages/auth/BannedPage';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/Signup';
import VerifyEmail from './pages/auth/VerifyEmail';
import VerifyToken from './pages/auth/VerifyToken';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import AppDashboard from './pages/dashboard/AppDashboard';
import Dashboard from './pages/dashboard/Dashboard';
import LogsDashboard from './pages/dashboard/LogsDashboard';
import TemplateDashboard from './pages/dashboard/TemplatesDashboard';
import DocumentLanding from './pages/docs/DocumentLanding';
import CreateOrg from './pages/org/CreateOrg';

function App() {
  const { user, admin, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-muted">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (!user.is_verified) {
    return (
      <Routes>
        <Route path="/" element={<VerifyEmail />} />
        <Route path="/verify/:token" element={<VerifyToken />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  if (!user.is_approved && !user.is_admin) {
    return (
      <Routes>
        <Route path="/" element={<AdminApproval />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  if (user.is_banned) {
    return (
      <Routes>
        <Route path="*" element={<BannedPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="apps" element={<AppDashboard />} />

        <Route path="orgs/new" element={<CreateOrg />} />
        <Route path="templates" element={<TemplateDashboard />} />
        <Route path="docs" element={<DocumentLanding />} />
        <Route
          path="metrics"
          element={<div className="text-muted">Metrics — coming soon</div>}
        />
        <Route
          path="billing"
          element={<div className="text-muted">Billing — coming soon</div>}
        />
        <Route path="/logs" element={<LogsDashboard />} />
        <Route
          path="settings"
          element={<div className="text-muted">Settings — coming soon</div>}
        />

        <Route
          path="admin"
          element={admin ? <AdminDashboard /> : <Navigate to="/dashboard" />}
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
