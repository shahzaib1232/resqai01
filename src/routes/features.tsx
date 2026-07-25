import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  Bot,
  Database,
  Lock,
  MapPin,
  Radio,
  ShieldCheck,
  Siren,
  Users,
} from "lucide-react";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Platform Features — AI Assistant, SOS, Maps | ResQ AI" },
      {
        name: "description",
        content:
          "Inside ResQ AI: structured AI emergency guidance, one-touch SOS with live location, OpenStreetMap nearby services, community reports, weather alerts and an admin console.",
      },
      { property: "og:title", content: "Platform Features — AI Assistant, SOS, Maps | ResQ AI" },
      {
        property: "og:description",
        content:
          "Structured AI emergency guidance, SOS with live location, nearby services, community reports and alerts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FeaturesPage,
});

const GROUPS = [
  {
    icon: Bot,
    title: "AI Emergency Assistant",
    points: [
      "Natural-language input — describe the situation as you would to a dispatcher",
      "Deterministic seven-section output: analysis, steps, first aid, numbers, avoid, survival, next actions",
      "Severity classification drives the visual urgency of the response card",
      "Conversation history saved so you can reopen guidance mid-incident",
    ],
  },
  {
    icon: Siren,
    title: "SOS System",
    points: [
      "Composes an emergency message with situation type and live coordinates",
      "Dispatches to your saved emergency contacts via SMS, WhatsApp or share sheet",
      "Records every activation in your SOS history with timestamp and location",
      "Surfaces nearby hospitals, police, fire stations and shelters in the same view",
    ],
  },
  {
    icon: MapPin,
    title: "Location Services",
    points: [
      "Save home, office and family locations with map-picked coordinates",
      "Live OpenStreetMap and Overpass lookup of nearby emergency facilities",
      "Distance-sorted results with one-tap directions and phone numbers",
      "Works from your current position or any saved location",
    ],
  },
  {
    icon: Users,
    title: "Community Alerts",
    points: [
      "Report disasters with type, severity, description and photo evidence",
      "Reports pinned to coordinates and shown to people nearby",
      "Community verification and resolution marking",
      "Moderator review queue in the admin console",
    ],
  },
  {
    icon: Bell,
    title: "Weather & Warnings",
    points: [
      "Current conditions for your active location",
      "Active severe-weather warnings with plain-language recommendations",
      "Alert notifications surfaced on the dashboard",
      "Recommendations tied back to the matching emergency protocol",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Admin Console",
    points: [
      "User management with role assignment",
      "Community report verification and resolution",
      "Platform analytics: reports by type, SOS activations, assistant usage",
      "Alert broadcast management",
    ],
  },
];

const SECURITY = [
  { icon: Lock, label: "Session-based authentication with token-scoped server calls" },
  { icon: Database, label: "Row-level security — every row scoped to its owner" },
  { icon: ShieldCheck, label: "Roles stored in a dedicated table, never on the profile" },
  { icon: Radio, label: "Server-side validation on every write, secrets never in the client" },
];

function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <p className="label-mono">Platform</p>
          <h1 className="heading-console mt-3 max-w-3xl text-5xl sm:text-6xl">
            Built like an operations console, not a landing page.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Every surface in ResQ AI answers one question: what do I do in the next sixty seconds?
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
            {GROUPS.map((g) => (
              <article key={g.title} className="bg-background p-8">
                <g.icon className="size-5 text-primary" aria-hidden />
                <h2 className="heading-console mt-5 text-2xl">{g.title}</h2>
                <ul className="mt-5 space-y-3">
                  {g.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-surface py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="label-mono">Security posture</p>
            <h2 className="heading-console mt-3 text-4xl">
              Emergency data is the most sensitive data there is.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {SECURITY.map((s) => (
                <div key={s.label} className="glass-panel rounded-xs p-6">
                  <s.icon className="size-4 text-accent" aria-hidden />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="glass-panel flex flex-col items-start gap-6 rounded-xs p-10 md:flex-row md:items-center md:justify-between">
            <h2 className="heading-console text-3xl">Ready when you are.</h2>
            <div className="flex gap-3">
              <Button asChild variant="signal" size="lg">
                <Link to="/auth">Create account</Link>
              </Button>
              <Button asChild variant="outlineConsole" size="lg">
                <Link to="/emergency-guide">Read the protocols</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
