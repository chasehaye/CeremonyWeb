import { useState } from 'react';

function validatePassword(password: string): string | null {
  const missing = [];
  if (password.length < 8) missing.push('8 characters');
  if (!/[A-Z]/.test(password)) missing.push('an uppercase letter');
  if (!/[a-z]/.test(password)) missing.push('a lowercase letter');
  if (!/\d/.test(password)) missing.push('a number');
  if (!/[@$!%*?&]/.test(password))
    missing.push('a special character (@$!%*?&)');
  if (missing.length === 0) return null;
  return 'Must have: ' + missing.join(', ');
}

export default function SignupPasswordStep({
  email,
  onSubmit,
  onBack,
}: {
  email: string;
  onSubmit: (password: string) => Promise<void>;
  onBack: () => void;
}) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedConfirm, setTouchedConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordError = validatePassword(password);
  const confirmError =
    confirm.length > 0 && confirm !== password
      ? 'Passwords do not match'
      : null;
  const isValid =
    passwordError === null && confirm === password && confirm.length > 0;

  async function handleSubmit() {
    if (!isValid) return;
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
      <h1 className="mb-1 font-medium text-xl">Create a password</h1>
      <p className="text-muted text-xs mb-4">{email}</p>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setTouchedPassword(true)}
        placeholder="••••••••"
        autoFocus
        disabled={loading}
        className="w-full bg-transparent rounded-lg border border-muted focus:border-accent-bright outline-none py-2 px-2 text-sm transition-colors duration-500"
      />
      <p className="text-xs text-center text-error whitespace-pre-line min-h-4 mt-1 mb-2">
        {touchedPassword && passwordError ? passwordError : ''}
      </p>

      <input
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        onBlur={() => setTouchedConfirm(true)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Confirm password"
        disabled={loading}
        className="w-full bg-transparent rounded-lg border border-muted focus:border-accent-bright outline-none py-2 px-2 text-sm transition-colors duration-500"
      />
      <p className="text-xs text-center text-error h-4 mt-1 mb-1">
        {touchedConfirm && confirmError ? confirmError : ''}
      </p>

      <button
        onClick={handleSubmit}
        disabled={loading || !isValid}
        className="bg-accent hover:bg-accent-hover transition-colors rounded-2xl w-full py-2 text-sm font-medium cursor-pointer disabled:opacity-60"
      >
        {loading ? 'Creating account...' : 'Create account'}
      </button>
      <span
        onClick={() => !loading && onBack()}
        className={`text-muted text-xs cursor-pointer hover:text-white transition-colors my-2 ${loading ? 'pointer-events-none opacity-50' : ''}`}
      >
        Back
      </span>
      <p className="text-xs text-error h-4">{error}</p>
    </>
  );
}
