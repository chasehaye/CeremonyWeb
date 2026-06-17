import { NavLink } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import {
  AdminIcon,
  AppsIcon,
  BillingIcon,
  DashboardIcon,
  DocsIcon,
  LogsIcon,
  MetricsIcon,
  SettingsIcon,
  TeapotIcon,
  TemplatesIcon,
} from '../icons/Icons';
import { OrgSwitcher } from './OrgSwitcher';

const navItems = [
  { to: '/admin', icon: AdminIcon, label: 'Admin' },
  { to: '/dashboard', icon: DashboardIcon, label: 'Overview' },
  { to: '/docs', icon: DocsIcon, label: 'Docs' },
  { to: '/apps', icon: AppsIcon, label: 'Apps' },
  { to: '/templates', icon: TemplatesIcon, label: 'Templates' },
  { to: '/metrics', icon: MetricsIcon, label: 'Metrics' },
  { to: '/logs', icon: LogsIcon, label: 'Logs' },
  { to: '/billing', icon: BillingIcon, label: 'Billing' },
];

export default function Sidebar({ onClose }: { onClose: () => void }) {
  const { admin } = useAuth();

  const filteredNavItems = navItems.filter((item) =>
    item.to === '/admin' ? admin : true
  );

  const docsIndex = filteredNavItems.findIndex((item) => item.to === '/docs');
  const beforeOrgs = filteredNavItems.slice(0, docsIndex + 1);
  const afterOrgs = filteredNavItems.slice(docsIndex + 1);

  return (
    <aside className="w-60 px-2 flex flex-col h-[calc(100vh-2rem)] sticky top-0 m-4 bg-tile rounded-2xl">
      <div className="flex items-center justify-between px-3 py-3 text-[20px]">
        <div className="flex items-center gap-2">
          <TeapotIcon />
          <span>Ceremony</span>
        </div>
        <button
          onClick={onClose}
          className="md:hidden text-muted hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 1024 1024"
            className="mr-2 text-base hover:text-accent-bright cursor-pointer"
            version="1.1"
          >
            <path
              d="M914.368 673.664h-519.68c-25.152 0-45.568-22.016-45.568-48.896 0-26.88 20.416-48.896 45.568-48.896h519.68c25.216 0 45.632 22.016 45.632 48.896 0 26.88-20.48 48.896-45.632 48.896z m0-228.096h-519.68c-25.152 0-45.568-21.952-45.568-48.896 0-26.88 20.416-48.896 45.568-48.896h519.68c25.216 0 45.632 22.016 45.632 48.896 0 26.88-20.48 48.896-45.632 48.896z m-3.264-219.904H115.328c-26.88 0-50.56-20.352-51.328-47.168A48.896 48.896 0 0 1 112.896 128h795.776c26.88 0 50.56 20.416 51.328 47.168a48.896 48.896 0 0 1-48.896 50.56z m-619.776 447.232V348.672L64 510.784l227.328 162.112c0 0.768 0 0.768 0 0z m-178.432 122.944h795.776c26.88 0 50.56 20.48 51.328 47.232a48.896 48.896 0 0 1-48.896 50.496H115.328c-26.88 0-50.56-20.416-51.328-47.232a48.896 48.896 0 0 1 48.896-50.496z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <nav className="flex flex-col text-muted flex-1">
        {beforeOrgs.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="hover:text-accent-bright flex items-center gap-2 px-4 py-4 rounded-md text-[16px] font-mono transition-colors duration-700"
            >
              <Icon />
              {item.label}
            </NavLink>
          );
        })}

        <OrgSwitcher />

        {afterOrgs.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="hover:text-accent-bright flex items-center gap-2 px-4 py-4 rounded-md text-[16px] font-mono transition-colors duration-700"
            >
              <Icon />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mx-4 mb-4">
        <NavLink
          to="/settings"
          className="flex items-center text-muted hover:text-accent-bright text-[16px] font-mono gap-2 px-4 py-2 rounded-md transition-colors duration-700"
        >
          <SettingsIcon />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
