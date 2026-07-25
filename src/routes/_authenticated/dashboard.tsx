import { Link, createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ArrowUpRight, Radio, Siren, Users } from "lucide-react";

import { ConsoleShell } from "@/components/console/ConsoleShell";
import { Button } from "@/components/ui/button";
import { EMERGENCY_MODULES } from "@/lib/emergency-modules";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Terminal Overview — ResQ AI" },
      {
        name: "description",
        content:
          "Your ResQ AI terminal: SOS activation, AI assistant, nearby community alerts and quick access to every emergency protocol.",
      },
      { property: "og:title", content: "Terminal Overview — ResQ AI" },
      { property: "og:description", content: "Your ResQ AI emergency terminal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <ConsoleShell
      title="Overview"
      subtitle="Everything you need in the first sixty seconds, one surface."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="glass-panel rounded-xs border-primary/40 p-8 lg:col-span-2">
          <p className="label-mono text-primary">Emergency dispatch</p>
          <h2 className="heading-console mt-3 text-3xl">Trigger SOS</h2>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">
            Sends your situation type and live coordinates to your emergency contacts, and logs the
            activation to your history.
          </p>
          <Button variant="signal" size="lg" className="mt-6">
            <Siren className="size-4" aria-hidden />
            Activate SOS
          </Button>
          <p className="mt-3 font-mono text-[10px] text-muted-foreground">
            SOS DISPATCH WIRING LANDS IN THE NEXT PHASE
          </p>
        </section>

        <section className="border border-border bg-panel p-8">
          <Radio className="size-5 text-accent" aria-hidden />
          <h2 className="heading-console mt-4 text-2xl">AI Assistant</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Describe what is happening in plain words and get an ordered protocol back.
          </p>
          <Button asChild variant="outlineConsole" className="mt-6">
            <Link to="/assistant">
              Open assistant
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </section>

        <section className="border border-border bg-panel p-8">
          <Users className="size-5 text-accent" aria-hidden />
          <h2 className="heading-console mt-4 text-2xl">Community</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Reports filed by people physically near the incident.
          </p>
          <Button asChild variant="outlineConsole" className="mt-6">
            <Link to="/community">
              View alerts
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </section>

        <section className="border border-border bg-panel p-8 lg:col-span-2">
          <AlertTriangle className="size-5 text-accent" aria-hidden />
          <h2 className="heading-console mt-4 text-2xl">Protocols</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {EMERGENCY_MODULES.map((m) => (
              <Link
                key={m.slug}
                to="/emergency-guide/$slug"
                params={{ slug: m.slug }}
                className="border border-border px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {m.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </ConsoleShell>
  );
}
