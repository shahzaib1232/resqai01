import { createFileRoute } from "@tanstack/react-router";
import { MapPinned, ShieldCheck } from "lucide-react";

import { ConsoleShell } from "@/components/console/ConsoleShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/community")({
  head: () => ({
    meta: [
      { title: "Community Alerts — Live Local Reports | ResQ AI" },
      {
        name: "description",
        content:
          "Disaster reports filed by people physically near the incident: type, severity, location and verification status, mapped in real time.",
      },
      { property: "og:title", content: "Community Alerts — Live Local Reports | ResQ AI" },
      {
        property: "og:description",
        content: "Reports filed by people who are physically there.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <ConsoleShell
      title="Community Alerts"
      subtitle="What people near you are reporting, right now."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <section className="border border-border bg-panel p-8 lg:col-span-8">
          <MapPinned className="size-5 text-accent" aria-hidden />
          <h2 className="heading-console mt-4 text-2xl">Live map</h2>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">
            An OpenStreetMap view of active reports and nearby emergency services, centred on your
            current or saved location.
          </p>
          <div className="grid-field mt-6 flex h-72 items-center justify-center border border-border">
            <span className="font-mono text-[10px] text-muted-foreground">
              MAP LAYER LANDS IN THE NEXT PHASE
            </span>
          </div>
        </section>

        <aside className="border border-border bg-panel p-8 lg:col-span-4">
          <ShieldCheck className="size-5 text-accent" aria-hidden />
          <h2 className="heading-console mt-4 text-2xl">File a report</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Report only what you can see yourself. False reports waste emergency capacity.
          </p>
          <Button variant="warn" className="mt-6 w-full">
            New report
          </Button>
        </aside>
      </div>
    </ConsoleShell>
  );
}
