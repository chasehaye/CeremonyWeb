import { useEffect } from 'react';

import TeapotSVG from '../../components/auth/TeapotSVG';
import { useAuth } from '../../context/AuthContext';
import { getMe } from '../../lib/auth';

export default function AdminApproval() {
  const { user, setUser, setVerified, setApproved, setAdmin } = useAuth();

  useEffect(() => {
    const interval = setInterval(
      async () => {
        try {
          const data = await getMe();
          if (data.is_approved) {
            setUser(data);
            setVerified(data.is_verified === true);
            setApproved(true);
            setAdmin(data.is_admin === true);
            clearInterval(interval);
          }
        } catch {}
      },
      10 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <TeapotSVG />
      <h1 className="mb-2 font-medium text-2xl">Awaiting approval</h1>
      <p className="text-xs text-muted mb-2 text-center mx-10">
        We're a small team and manually review every account.{' '}
        <span className="text-accent-bright">{user?.user_email}</span> is in the
        queue.
      </p>
      <p className="text-[11px] text-muted text-center leading-relaxed max-w-48 md:max-w-60">
        You'll be automatically redirected once an admin approves your account.
        Check back soon.
      </p>
      <p className="text-[11px] text-muted text-center leading-relaxed max-w-40 md:max-w-52">
        If you have lost approval for an unexpected reason please contact
        support
      </p>
    </div>
  );
}
