import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import AdminApproval from './pages/auth/AdminApproval';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/Signup';
import VerifyEmail from './pages/auth/VerifyEmail';
import VerifyToken from './pages/auth/VerifyToken';

function App() {
  const { user, loading } = useAuth();

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

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="apps"
          element={<div className="text-muted">Apps — coming soon</div>}
        />
        <Route
          path="templates"
          element={<div className="text-muted">Templates — coming soon</div>}
        />
        <Route path="/logs" element={<VerifyToken />} />
        <Route
          path="settings"
          element={<div className="text-muted">Settings — coming soon</div>}
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
