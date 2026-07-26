import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/features", label: "Platform" },
  { to: "/emergency-guide", label: "Protocols" },
  { to: "/assistant", label: "Deployment" },
  { to: "/community", label: "Network" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="size-6 rounded-xs bg-primary" aria-hidden />
          <span className="heading-console text-xl tracking-wider">ResQ AI</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="console" size="sm" className="hidden sm:inline-flex">
            <Link to="/dashboard">Launch Terminal</Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-xs border border-border text-foreground md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-panel md:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
        )}
        style={{ transition: "max-height 300ms var(--ease-console)" }}
      >
        <nav className="flex flex-col px-4 py-2" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="border-b border-border py-3 text-xs font-medium uppercase tracking-widest text-muted-foreground last:border-b-0"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild variant="console" size="sm" className="my-3 sm:hidden">
            <Link to="/dashboard" onClick={() => setOpen(false)}>
              Launch Terminal
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
