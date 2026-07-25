import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/button";
import { EMERGENCY_MODULES } from "@/lib/emergency-modules";

export const Route = createFileRoute("/emergency-guide/")({
  head: () => ({
    meta: [
      { title: "Emergency Guide — 9 Disaster Protocols | ResQ AI" },
      {
        name: "description",
        content:
          "Authored protocols for fire, flood, earthquake, medical emergency, road accident, heatwave, storm, landslide and building collapse. Risks, symptoms, prevention, do's and don'ts.",
      },
      { property: "og:title", content: "Emergency Guide — 9 Disaster Protocols | ResQ AI" },
      {
        property: "og:description",
        content:
          "Reviewed, offline-capable guidance for the nine disaster types behind most civilian emergencies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuideIndex,
});

function GuideIndex() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <p className="label-mono">Emergency guide</p>
        <h1 className="heading-console mt-3 max-w-3xl text-5xl sm:text-6xl">
          Nine protocols. No scrolling for the answer.
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Each protocol is structured identically: overview, risks, symptoms, prevention, do&apos;s,
          don&apos;ts and the numbers to call. Written to be read under stress and available without
          an AI call.
        </p>

        <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {EMERGENCY_MODULES.map((m) => (
            <Link
              key={m.slug}
              to="/emergency-guide/$slug"
              params={{ slug: m.slug }}
              className="group flex flex-col bg-background p-8 transition-colors hover:bg-surface"
            >
              <span className="font-mono text-[10px] text-muted-foreground">{m.code}</span>
              <h2 className="heading-console mt-4 text-2xl transition-colors group-hover:text-primary">
                {m.name}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{m.tagline}</p>
              <span className="label-mono mt-6 text-primary">Open protocol →</span>
            </Link>
          ))}
        </div>

        <div className="glass-panel mt-16 flex flex-col items-start gap-6 rounded-xs p-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-muted-foreground">
            Facing something right now that doesn&apos;t fit a category? Describe it to the
            assistant in your own words.
          </p>
          <Button asChild variant="signal" size="lg">
            <Link to="/assistant">Ask ResQ AI</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
