import { Link } from "@tanstack/react-router";

import { EMERGENCY_MODULES } from "@/lib/emergency-modules";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-panel">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <span className="size-5 rounded-xs bg-primary" aria-hidden />
            <span className="heading-console text-lg tracking-widest">ResQ AI</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            AI-assisted disaster response. Guidance, coordination and community intelligence when
            every second counts.
          </p>
          <p className="label-mono mt-6">Status: Nominal</p>
        </div>

        <div>
          <h3 className="label-mono mb-4">Protocols</h3>
          <ul className="space-y-2">
            {EMERGENCY_MODULES.slice(0, 5).map((m) => (
              <li key={m.slug}>
                <Link
                  to="/emergency-guide/$slug"
                  params={{ slug: m.slug }}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="label-mono mb-4">Platform</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
            </li>
            <li>
              <Link to="/assistant" className="text-sm text-muted-foreground hover:text-foreground">
                AI Assistant
              </Link>
            </li>
            <li>
              <Link to="/community" className="text-sm text-muted-foreground hover:text-foreground">
                Community Alerts
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="label-mono mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="label-mono">
            ResQ AI is decision support, not a replacement for emergency services.
          </p>
          <p className="label-mono">© {new Date().getFullYear()} ResQ AI Systems</p>
        </div>
      </div>
    </footer>
  );
}
