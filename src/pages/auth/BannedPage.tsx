import { useAuth } from '../../context/AuthContext';

export default function BannedPage() {
  const { logoutUser } = useAuth();

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="rounded-xl bg-tile p-8 text-center max-w-sm w-full">
        <p className="text-[14px] font-medium mb-1">Account Banned</p>
        <p className="text-[12px] text-muted mb-4">
          Your account has been suspended. Contact support if you believe this
          is a mistake.
        </p>
        <button
          onClick={logoutUser}
          className="text-[12px] text-muted hover:text-red-400 transition-colors cursor-pointer"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
