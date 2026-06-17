import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useOrg } from '../../context/OrgContext';

export default function CreateOrg() {
  const { addOrg } = useOrg();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValid = name.trim().length > 0;

  async function handleSubmit() {
    if (!isValid) return;
    setLoading(true);
    setError('');
    try {
      await addOrg(name.trim());
      navigate('/dashboard');
    } catch {
      setError('Failed to create organization');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[80vh]">
      <div className="w-full max-w-md">
        <h1 className="text-[20px] font-medium mb-2 text-center">
          Create an organization
        </h1>
        <p className="text-[12px] text-muted text-center mb-8">
          Organizations let you group apps, templates, and members under a
          shared workspace.
        </p>

        <div className="rounded-xl bg-tile p-6">
          <div className="mb-4">
            <label className="mb-1.5 block font-mono text-[12px] text-muted">
              Organization name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched(true)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="A clear concise name"
              autoFocus
              className="w-full bg-transparent rounded-lg border border-muted focus:border-accent-bright outline-none py-2 px-2 text-sm font-mono transition-colors duration-500"
            />
            <p className="mt-1.5 text-[11px] text-error h-4 text-center">
              {touched && !isValid ? 'Organization name is required' : ''}
            </p>
          </div>

          {error && (
            <p className="mb-4 text-[12px] text-red-400 text-center">{error}</p>
          )}

          <div className="flex gap-2 justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 px-4 py-2 text-sm font-mono text-muted hover:text-white border border-muted/30 rounded-2xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-accent hover:bg-accent-hover transition-colors rounded-2xl px-4 py-2 text-sm font-medium cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
