import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useOrg } from '../../context/OrgContext';
import { OrgIcon } from '../icons/Icons';

export function OrgSwitcher() {
  const { orgs, activeOrg, switchOrg } = useOrg();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={` cursor-pointer w-full flex items-center gap-2 px-4 py-4 rounded-md text-[16px] font-mono transition-colors duration-700
          ${open ? 'text-accent-bright bg-white/5' : 'text-muted hover:text-accent-bright'}`}
      >
        <OrgIcon />
        <span className="flex-1 text-left">Orgs</span>
        <svg
          className={`w-3.5 h-3.5 opacity-40 transition-transform duration-200 mr-1
            ${open ? 'rotate-180' : 'hover:opacity-70'}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="mx-2 mb-1 overflow-hidden mt-2">
          {orgs.map((org) => {
            const isActive = org.slug === activeOrg?.slug;
            return (
              <button
                key={org.slug}
                onClick={() => {
                  switchOrg(org);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-mono text-left transition-colors rounded-md duration-700
                  ${
                    isActive
                      ? 'text-accent-bright hover:text-accent-subtle cursor-pointer'
                      : 'text-muted hover:text-accent-subtle hover:bg-white/5 cursor-pointer'
                  }`}
              >
                <span className="w-5 h-5 rounded-[5px] bg-white/10 flex items-center justify-center text-[10px] font-bold shrink-0">
                  {org.name[0].toUpperCase()}
                </span>
                <span className="flex-1 truncate">{org.name}</span>
                {isActive && (
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}

          <div className="border-t border-white/10 mt-2 " />

          <button
            onClick={() => {
              navigate('/orgs/new');
              setOpen(false);
            }}
            className="cursor-pointer w-full flex items-center gap-2 px-3 py-2 text-[12px] font-mono text-muted hover:text-accent-subtle"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Add organization
          </button>
        </div>
      )}
    </div>
  );
}
