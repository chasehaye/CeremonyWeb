import { useEffect } from 'react';

import TeapotSVG from '../../components/auth/TeapotSVG';
import { useAuth } from '../../context/AuthContext';
import { getMe } from '../../lib/auth';

export default function VerifyEmail() {
  const { user, setUser, setVerified, setApproved, setAdmin } = useAuth();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getMe();
        if (data.is_verified) {
          setUser(data);
          setVerified(true);
          setApproved(data.is_approved === true);
          setAdmin(data.is_admin === true);
          clearInterval(interval);
        }
      } catch {}
    }, 3000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <TeapotSVG />
      <h1 className="mb-2 font-medium text-2xl">Validate your email</h1>
      <p className="text-xs text-muted mb-2 text-center mx-10">
        We sent a verification link to{' '}
        <span className="text-accent-bright">{user?.user_email}</span>
      </p>
      <p className="text-[11px] text-muted text-center leading-relaxed max-w-48 md:max-w-60">
        Click the link in the email to verify your account and continue.
      </p>
      <p className="text-[11px] text-muted text-center leading-relaxed">-</p>
      <p className="text-[11px] text-muted text-center leading-relaxed max-w-48 md:max-w-60">
        If you did not receive and email try again in 24 hrs
      </p>
    </div>
  );
}
