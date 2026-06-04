import { useState } from 'react';

function PasswordStep({
  email,
  onSubmit,
  onBack,
}: {
  email: string;
  onSubmit: (password: string) => Promise<void>;
  onBack: () => void;
}) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    if (!password) return;
    setLoading(true);
    setError('');
    try {
      await onSubmit(password);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="mb-1 font-medium text-xl">Enter Password</h1>
      <p className="text-muted text-xs mb-4">{email}</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="••••••••"
        autoFocus
        className="w-full bg-transparent rounded-lg border border-muted focus:border-accent-bright outline-none py-2 px-2 mb-4 text-sm transition-colors duration-500"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-accent hover:bg-accent-hover transition-colors rounded-2xl w-full py-2 text-sm font-medium cursor-pointer disabled:opacity-60"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
      <span
        onClick={onBack}
        className="text-muted text-xs cursor-pointer hover:text-white transition-colors my-2"
      >
        Back
      </span>
      <p className="text-xs text-error h-4">{error ? error : ''}</p>
    </>
  );
}

export default PasswordStep;
