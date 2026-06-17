import { useEffect, useState } from 'react';

import { createApp, deleteApp, listApps, rotateKey } from '../lib/app';

type App = {
  id: number;
  name: string;
  description: string;
  api_key: string;
  is_active: boolean;
  created_at: string;
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="text-[11px] text-muted hover:text-accent-bright transition-colors cursor-pointer"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function CreateAppModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (app: App) => void;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    if (!name) return;
    setLoading(true);
    try {
      const data = await createApp({ name, description });
      onCreate(data);
      onClose();
    } catch {
      setError('Failed to create app');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-[#111113] border border-neutral-800 rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-[15px] font-medium mb-4">New App</h2>
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-[11px] text-muted mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="my-app"
              autoFocus
              className="w-full bg-transparent border border-neutral-800 focus:border-accent-bright rounded-lg px-3 py-2 text-[13px] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] text-muted mb-1.5">
              Description <span className="text-neutral-600">(optional)</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this app for?"
              className="w-full bg-transparent border border-neutral-800 focus:border-accent-bright rounded-lg px-3 py-2 text-[13px] outline-none transition-colors"
            />
          </div>
          {error && <p className="text-[11px] text-red-400">{error}</p>}
          <div className="flex gap-2 mt-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-neutral-800 py-2 text-[12px] text-muted hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !name}
              className="flex-1 rounded-lg bg-accent hover:bg-accent-hover py-2 text-[12px] font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppDashboard() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [rotatingId, setRotatingId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchApps() {
      try {
        const data = await listApps();
        setApps(data.apps);
      } catch {
        setError('Failed to load apps');
      } finally {
        setLoading(false);
      }
    }
    fetchApps();
  }, []);

  async function handleDelete(id: number) {
    try {
      await deleteApp(id);
      setApps(apps.filter((a) => a.id !== id));
    } catch {
      setError('Failed to delete app');
    }
  }

  async function handleRotateKey(id: number) {
    setRotatingId(id);
    try {
      const data = await rotateKey(id);
      setApps(
        apps.map((a) => (a.id === id ? { ...a, api_key: data.api_key } : a))
      );
    } catch {
      setError('Failed to rotate key');
    } finally {
      setRotatingId(null);
    }
  }

  return (
    <div className="max-w-full">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[16px] font-medium">Apps</h1>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-lg bg-accent hover:bg-accent-hover px-3 py-1.5 text-[12px] font-medium transition-colors cursor-pointer"
        >
          + New App
        </button>
      </div>

      {error && <p className="mb-4 text-[12px] text-red-400">{error}</p>}

      {loading ? (
        <p className="text-[12px] text-muted">Loading...</p>
      ) : apps.length === 0 ? (
        <div className="rounded-xl bg-tile p-8 text-center">
          <p className="text-[13px] text-muted">No apps yet</p>
          <p className="mt-1 text-[11px] text-neutral-600">
            Create your first app to get an API key
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {apps.map((app) => (
            <div key={app.id} className="rounded-xl bg-tile p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[14px] font-medium">{app.name}</div>
                  {app.description && (
                    <div className="mt-0.5 text-[12px] text-muted">
                      {app.description}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${app.is_active ? 'bg-accent/20 text-accent-bright' : 'bg-red-500/15 text-red-400'}`}
                  >
                    {app.is_active ? 'active' : 'inactive'}
                  </span>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="text-[11px] text-muted hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-neutral-800 bg-black/20 px-3 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-muted mb-1">API Key</p>
                    <p className="font-mono text-[12px] text-neutral-400 truncate max-w-xs">
                      {app.api_key}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CopyButton text={app.api_key} />
                    <button
                      onClick={() => handleRotateKey(app.id)}
                      disabled={rotatingId === app.id}
                      className="text-[11px] text-muted hover:text-accent-bright transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {rotatingId === app.id ? 'Rotating...' : 'Rotate'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <CreateAppModal
          onClose={() => setShowModal(false)}
          onCreate={(app) => setApps([app, ...apps])}
        />
      )}
    </div>
  );
}
