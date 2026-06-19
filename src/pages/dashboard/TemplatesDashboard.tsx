import { useEffect, useState } from 'react';

import { useOrg } from '../../context/OrgContext';
import {
  createTemplate,
  deleteTemplate,
  listTemplates,
} from '../../lib/template';

type Template = {
  id: number;
  name: string;
  subject: string;
  body: string;
  type: string;
  is_active: boolean;
  created_at: string;
};

const TEMPLATE_TYPES = ['notification', 'marketing', 'transactional'];

function CreateTemplateModal({
  onClose,
  onCreate,
  orgSlug,
}: {
  onClose: () => void;
  onCreate: (template: Template) => void;
  orgSlug: string;
}) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [type, setType] = useState('transactional');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    if (!name || !subject || !body) return;
    setLoading(true);
    try {
      const data = await createTemplate(orgSlug, { name, subject, body, type });
      onCreate(data);
      onClose();
    } catch {
      setError('Failed to create template');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-[#111113] border border-neutral-800 rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-[15px] font-medium mb-4">New Template</h2>
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-[11px] text-muted mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Welcome Email"
              autoFocus
              className="w-full bg-transparent border border-neutral-800 focus:border-accent-bright rounded-lg px-3 py-2 text-[13px] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] text-muted mb-1.5">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Welcome to our platform"
              className="w-full bg-transparent border border-neutral-800 focus:border-accent-bright rounded-lg px-3 py-2 text-[13px] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] text-muted mb-1.5">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-[#111113] border border-neutral-800 focus:border-accent-bright rounded-lg px-3 py-2 text-[13px] outline-none transition-colors cursor-pointer"
            >
              {TEMPLATE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] text-muted mb-1.5">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="<p>Hello, welcome!</p>"
              rows={6}
              className="w-full bg-transparent border border-neutral-800 focus:border-accent-bright rounded-lg px-3 py-2 text-[13px] outline-none transition-colors font-mono resize-none"
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
              disabled={loading || !name || !subject || !body}
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

export default function TemplateDashboard() {
  const { activeOrg } = useOrg();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (!activeOrg) return;
    async function fetchTemplates() {
      try {
        const data = await listTemplates(activeOrg!.slug);
        setTemplates(data.templates);
      } catch {
        setError('Failed to load templates');
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, [activeOrg]);

  async function handleDelete(id: number) {
    if (!activeOrg) return;
    setDeletingId(id);
    try {
      await deleteTemplate(activeOrg.slug, id);
      setTemplates(templates.filter((t) => t.id !== id));
    } catch {
      setError('Failed to delete template');
    } finally {
      setDeletingId(null);
    }
  }

  if (!activeOrg) {
    return (
      <div className="rounded-xl bg-tile p-8 text-center">
        <p className="text-[13px] text-muted">No organization selected</p>
        <p className="mt-1 text-[11px] text-neutral-600">
          Select or create an organization to manage templates
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-full">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[16px] font-medium">Templates</h1>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-lg bg-accent hover:bg-accent-hover px-3 py-1.5 text-[12px] font-medium transition-colors cursor-pointer"
        >
          + New Template
        </button>
      </div>

      {error && (
        <p className="mb-4 text-[12px] text-center text-red-400">{error}</p>
      )}

      {loading ? (
        <p className="text-[12px] text-muted">Loading...</p>
      ) : templates.length === 0 ? (
        <div className="rounded-xl bg-tile p-8 text-center">
          <p className="text-[13px] text-muted">No templates yet</p>
          <p className="mt-1 text-[11px] text-neutral-600">
            Create your first template to start sending emails
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {templates.map((template) => (
            <div key={template.id} className="rounded-xl bg-tile p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[14px] font-medium">{template.name}</div>
                  <div className="mt-0.5 text-[12px] text-muted">
                    {template.subject}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${
                      template.type === 'transactional'
                        ? 'bg-accent/20 text-accent-bright'
                        : template.type === 'marketing'
                          ? 'bg-purple-500/15 text-purple-400'
                          : 'bg-neutral-500/15 text-neutral-400'
                    }`}
                  >
                    {template.type}
                  </span>
                  <button
                    onClick={() => handleDelete(template.id)}
                    disabled={deletingId === template.id}
                    className="text-[11px] text-muted hover:text-red-400 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {deletingId === template.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-neutral-800 bg-black/20 px-3 py-2">
                <p className="text-[10px] text-muted mb-1">Body</p>
                <p className="font-mono text-[12px] text-neutral-400 line-clamp-3 whitespace-pre-wrap">
                  {template.body}
                </p>
              </div>

              <div className="mt-2 text-[11px] text-neutral-600">
                {new Date(template.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <CreateTemplateModal
          onClose={() => setShowModal(false)}
          onCreate={(template) => setTemplates([template, ...templates])}
          orgSlug={activeOrg.slug}
        />
      )}
    </div>
  );
}
