import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Bot,
  MapPin,
  Radio,
  ShieldCheck,
  Siren,
  Users,
} from "lucide-react";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/button";
import { EMERGENCY_MODULES } from "@/lib/emergency-modules";
import radarTerrain from "@/assets/radar-terrain.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResQ AI — Smart Disaster Response & Emergency Assistant" },
      {
        name: "description",
        content:
          "AI-guided disaster response for fire, flood, earthquake, medical and road emergencies. Instant safety steps, SOS with live location, nearby services and community alerts.",
      },
      { property: "og:title", content: "ResQ AI — Smart Disaster Response & Emergency Assistant" },
      {
        property: "og:description",
        content:
          "Mission-critical AI emergency guidance: situation analysis, immediate safety steps, first aid, and nearby hospitals, police and shelters.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const CAPABILITIES = [
  {
    icon: Bot,
    title: "AI Emergency Assistant",
    body: "Describe the situation in plain language. Get a structured response: analysis, immediate steps, first aid, numbers to call and what to avoid.",
  },
  {
    icon: Siren,
    title: "One-touch SOS",
    body: "Generates an emergency message with your live coordinates and pushes it to your saved contacts in a single action.",
  },
  {
    icon: MapPin,
    title: "Nearby services",
    body: "Live OpenStreetMap lookup of hospitals, police stations, fire stations and shelters within reach of your position.",
  },
  {
    icon: Users,
    title: "Community intelligence",
    body: "Ground-truth reports from people nearby — blocked roads, rising water, structural damage — verified and resolved by the community.",
  },
  {
    icon: Activity,
    title: "Weather & disaster alerts",
    body: "Current conditions and active warnings for your saved locations, with plain-language safety recommendations attached.",
  },
  {
    icon: ShieldCheck,
    title: "Nine emergency protocols",
    body: "Reviewed offline-capable guidance for the disaster types that account for the overwhelming majority of civilian emergencies.",
  },
];

const AI_SECTIONS = [
  { code: "01", label: "Situation Analysis" },
  { code: "02", label: "Immediate Safety Steps" },
  { code: "03", label: "First Aid Guidance" },
  { code: "04", label: "Emergency Phone Numbers" },
  { code: "05", label: "Things To Avoid" },
  { code: "06", label: "Survival Tips" },
  { code: "07", label: "Recommended Next Actions" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2 border border-accent/25 bg-accent/10 px-2 py-1">
                <span className="size-1.5 animate-pulse rounded-full bg-accent" aria-hidden />
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  System ready: global monitoring active
                </span>
              </div>

              <h1 className="heading-console text-balance text-5xl sm:text-7xl md:text-8xl">
                Calm in the <span className="text-primary">eye</span> of the storm.
              </h1>

              <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Mission-critical AI disaster response for high-stakes moments. Decisive, structured
                guidance when every second counts.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild variant="signal" size="xl">
                  <Link to="/assistant">Emergency Deployment</Link>
                </Button>
                <Button asChild variant="outlineConsole" size="xl">
                  <Link to="/features">View Specs</Link>
                </Button>
              </div>
            </div>

            <div className="relative lg:col-span-5">
              <div
                className="absolute -inset-4 rounded-full bg-primary/5 blur-3xl"
                aria-hidden
              />
              <div className="relative aspect-square overflow-hidden rounded-xs border border-border bg-surface">
                <div className="grid-field absolute inset-0 opacity-30" aria-hidden />
                <div
                  className="absolute top-0 h-1 w-full animate-scan bg-accent/20"
                  aria-hidden
                />
                <img
                  src={radarTerrain}
                  alt="Emergency operations radar showing terrain contours and active incident markers"
                  width={1024}
                  height={1024}
                  className="size-full object-cover opacity-70"
                />
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-border bg-background/70 px-4 py-2 backdrop-blur-sm">
                  <span className="label-mono">Live incident feed</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    ● Streaming
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency module strip */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6" aria-labelledby="protocols">
          <h2 id="protocols" className="sr-only">
            Emergency protocols
          </h2>
          <div className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-3 lg:grid-cols-9">
            {EMERGENCY_MODULES.map((m) => (
              <Link
                key={m.slug}
                to="/emergency-guide/$slug"
                params={{ slug: m.slug }}
                className="group bg-background p-6 transition-colors hover:bg-primary"
              >
                <div className="mb-4 font-mono text-[10px] text-muted-foreground group-hover:text-primary-foreground/70">
                  {m.code}
                </div>
                <div className="heading-console text-lg group-hover:text-primary-foreground">
                  {m.name}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How the AI responds */}
        <section className="border-y border-border bg-surface py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="label-mono">The assistant</p>
                <h2 className="heading-console mt-3 text-4xl sm:text-5xl">
                  Not a chatbot. A dispatch protocol.
                </h2>
                <p className="mt-6 text-muted-foreground">
                  Say <em>&ldquo;my house is on fire&rdquo;</em> or{" "}
                  <em>&ldquo;I found an unconscious person&rdquo;</em>. ResQ AI classifies the
                  emergency, then returns the same seven labelled sections every time — so you know
                  where to look under stress, not what to read.
                </p>
                <Button asChild variant="signal" size="lg" className="mt-8">
                  <Link to="/assistant">Open the assistant</Link>
                </Button>
              </div>

              <div className="lg:col-span-7">
                <div className="glass-panel rounded-xs p-6">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="heading-console text-xs tracking-widest">
                      AI Operator // ResQ-9
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                      ● Structured output
                    </span>
                  </div>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {AI_SECTIONS.map((s) => (
                      <li
                        key={s.code}
                        className="rule-signal py-2 text-sm font-medium text-foreground"
                      >
                        <span className="mr-2 font-mono text-[10px] text-primary">[{s.code}]</span>
                        {s.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <p className="label-mono">Capabilities</p>
          <h2 className="heading-console mt-3 max-w-2xl text-4xl sm:text-5xl">
            Everything a first responder wishes a bystander had.
          </h2>

          <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <article key={c.title} className="bg-background p-8">
                <c.icon className="size-5 text-primary" aria-hidden />
                <h3 className="heading-console mt-5 text-xl">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Preparedness / trust */}
        <section className="border-t border-border bg-panel py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="label-mono">Why it exists</p>
              <h2 className="heading-console mt-3 text-4xl">
                The first responder is always a bystander.
              </h2>
            </div>
            <div className="grid gap-8 lg:col-span-2 sm:grid-cols-3">
              <div>
                <Radio className="size-5 text-accent" aria-hidden />
                <p className="mt-4 text-4xl font-semibold text-foreground">8-14 min</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Typical urban ambulance response. The people already present decide the outcome.
                </p>
              </div>
              <div>
                <AlertTriangle className="size-5 text-accent" aria-hidden />
                <p className="mt-4 text-4xl font-semibold text-foreground">~10%</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Survival lost per minute in cardiac arrest without bystander CPR.
                </p>
              </div>
              <div>
                <ShieldCheck className="size-5 text-accent" aria-hidden />
                <p className="mt-4 text-4xl font-semibold text-foreground">9</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Authored disaster protocols available without an AI call or a network round-trip.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="glass-panel flex flex-col items-start gap-8 rounded-xs p-10 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="heading-console text-4xl">Set it up before you need it.</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Save your home, work and family locations, add emergency contacts, and your SOS will
                be one press away when it matters.
              </p>
            </div>
            <Button asChild variant="signal" size="xl" className="shrink-0">
              <Link to="/auth">Create your account</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
