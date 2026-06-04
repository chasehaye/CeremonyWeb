import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TeapotSVG from '../../components/auth/TeapotSVG';
import { useAuth } from '../../context/AuthContext';
import { verifyEmail } from '../../lib/auth';
import { getMe } from '../../lib/auth';

export default function VerifyToken() {
  const { setUser, setVerified, setApproved, setAdmin } = useAuth();
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    async function verify() {
      try {
        await verifyEmail(token!);
        const data = await getMe();
        setUser(data);
        setVerified(data.is_verified);
        setApproved(data.is_approved);
        setAdmin(data.is_admin);
        navigate('/');
      } catch {
        setError('Invalid or expired verification link.');
      }
    }
    verify();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <TeapotSVG />
      {error ? (
        <>
          <h1 className="font-medium text-xl mb-2">Verification failed</h1>
          <p className="text-xs text-error">{error}</p>
        </>
      ) : (
        <p className="text-xs text-muted">Verifying your email...</p>
      )}
    </div>
  );
}
