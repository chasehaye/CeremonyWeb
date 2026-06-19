export default function DocumentLanding() {
  return (
    <div className="max-w-full">
      <div className="mb-8">
        <h1 className="text-[16px] font-medium mb-1">Documentation</h1>
        <p className="text-[12px] text-muted">
          Welcome to the docs. Here you can find all the information on this
          application from use to the reason behind its existence.
        </p>
      </div>

      {/* Intro */}
      <div className="rounded-xl bg-tile p-5 mb-4">
        <p className="text-[13px] font-medium mb-2">What is Ceremony?</p>
        <p className="text-[12px] text-muted leading-relaxed">
          Ceremony is an email delivery platform that lets you send
          transactional, notification, and marketing emails through a simple
          API. You create an organization, add apps, define templates, and send
          emails using your app's API key. Every email is logged so you have a
          full audit trail.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="rounded-xl bg-tile p-5">
        <p className="text-[12px] text-muted mb-4">Table of contents</p>

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[13px] font-medium font-mono mb-2">
              1. Getting Started
            </p>
            <div className="flex flex-col gap-1 pl-3 border-l border-neutral-800">
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Creating an account
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Creating an organization
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Creating your first app
              </p>
            </div>
          </div>

          <div>
            <p className="text-[13px] font-medium font-mono mb-2">2. Apps</p>
            <div className="flex flex-col gap-1 pl-3 border-l border-neutral-800">
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                What is an app?
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Managing API keys
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Rotating keys
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Enabling and disabling apps
              </p>
            </div>
          </div>

          <div>
            <p className="text-[13px] font-medium font-mono mb-2">
              3. Templates
            </p>
            <div className="flex flex-col gap-1 pl-3 border-l border-neutral-800">
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Creating a template
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Template types
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Using template variables
              </p>
            </div>
          </div>

          <div>
            <p className="text-[13px] font-medium font-mono mb-2">
              4. Sending Emails
            </p>
            <div className="flex flex-col gap-1 pl-3 border-l border-neutral-800">
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Authentication
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Send endpoint
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Request format
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Response format
              </p>
            </div>
          </div>

          <div>
            <p className="text-[13px] font-medium font-mono mb-2">5. Logs</p>
            <div className="flex flex-col gap-1 pl-3 border-l border-neutral-800">
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Reading logs
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Email statuses
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Debugging failed emails
              </p>
            </div>
          </div>

          <div>
            <p className="text-[13px] font-medium font-mono mb-2">6. Domains</p>
            <div className="flex flex-col gap-1 pl-3 border-l border-neutral-800">
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Adding a domain
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Verifying DNS records
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Attaching a domain to an app
              </p>
            </div>
          </div>

          <div>
            <p className="text-[13px] font-medium font-mono mb-2">
              7. Organizations
            </p>
            <div className="flex flex-col gap-1 pl-3 border-l border-neutral-800">
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Managing members
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Roles and permissions
              </p>
              <p className="text-[12px] text-muted hover:text-accent-bright cursor-pointer transition-colors">
                Switching organizations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
