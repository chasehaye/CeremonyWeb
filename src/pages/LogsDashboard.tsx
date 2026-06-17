import { useEffect, useState } from 'react';

import { listMailLogs } from '../lib/mailLogs';

type EmailLog = {
  id: number;
  created_at: string;
  to_email: string;
  subject: string;
  status: string;
  error?: string;
};

type LogsResponse = {
  logs: EmailLog[];
};

export default function LogsDashboard() {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLogs() {
      try {
        const data: LogsResponse = await listMailLogs();
        setLogs(data.logs);
      } catch {
        setError('Failed to load logs');
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

  return (
    <div className="max-w-full">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[16px] font-medium">Email Logs</h1>
        <span className="text-[12px] text-muted">{logs.length} total</span>
      </div>

      {error && (
        <p className="mb-4 text-center text-[12px] text-red-400">{error}</p>
      )}

      <div className="rounded-xl bg-tile p-5">
        <p className="mb-4 text-[12px] text-muted">All emails</p>

        {loading ? (
          <p className="text-[12px] text-muted">Loading...</p>
        ) : (
          logs.map((log, i) => (
            <div
              key={log.id}
              className={`flex items-center justify-between py-3 ${
                i < logs.length - 1 ? 'border-b border-neutral-800' : ''
              }`}
            >
              <div>
                <div className="font-mono text-[13px]">{log.subject}</div>

                <div className="mt-0.5 text-[12px] text-muted">
                  {log.to_email}
                </div>

                <div className="mt-1 flex gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${
                      log.status === 'sent'
                        ? 'bg-green-500/15 text-green-400'
                        : log.status === 'failed'
                          ? 'bg-red-500/15 text-red-400'
                          : 'bg-neutral-500/15 text-neutral-400'
                    }`}
                  >
                    {log.status}
                  </span>

                  <span className="rounded-full bg-neutral-500/15 px-2 py-0.5 font-mono text-[10px] text-neutral-400">
                    {new Date(log.created_at).toLocaleString()}
                  </span>

                  {log.error && (
                    <span className="rounded-full bg-red-500/15 px-2 py-0.5 font-mono text-[10px] text-red-400">
                      error
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
