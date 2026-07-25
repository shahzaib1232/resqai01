import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { AlertTriangle, Ban, CheckCircle2, Phone, ShieldPlus, Stethoscope } from "lucide-react";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/button";
import type { EmergencyNumber } from "@/lib/emergency-modules";
import { EMERGENCY_MODULES, getModule } from "@/lib/emergency-modules";

export const Route = createFileRoute("/emergency-guide/$slug")({
  loader: ({ params }) => {
    const module = getModule(params.slug);
    if (!module) throw notFound();
    return { module };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Protocol not found — ResQ AI" }, { name: "robots", content: "noindex" }],
      };
    }
    const { module } = loaderData;
    const title = `${module.name} Emergency Protocol — ResQ AI`;
    const description = `${module.tagline}. Risks, symptoms, prevention, do's and don'ts, and emergency numbers for ${module.name.toLowerCase()} situations.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ModulePage,
  notFoundComponent: ProtocolNotFound,
  errorComponent: ProtocolError,
});

function ProtocolNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="heading-console text-4xl">Protocol not found</h1>
        <p className="mt-4 text-muted-foreground">
          That emergency protocol doesn&apos;t exist. Browse the nine available protocols instead.
        </p>
        <Button asChild variant="signal" size="lg" className="mt-8">
          <Link to="/emergency-guide">All protocols</Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  );
}

function ProtocolError() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="heading-console text-4xl">This protocol didn&apos;t load</h1>
        <p className="mt-4 text-muted-foreground">
          Try again, or open the full protocol index. In a live emergency, call your local emergency
          number now.
        </p>
        <Button asChild variant="signal" size="lg" className="mt-8">
          <Link to="/emergency-guide">All protocols</Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  items,
  tone = "neutral",
}: {
  icon: typeof AlertTriangle;
  title: string;
  items: string[];
  tone?: "neutral" | "danger" | "ok" | "warn";
}) {
  const toneClass =
    tone === "danger"
      ? "text-primary"
      : tone === "ok"
        ? "text-ok"
        : tone === "warn"
          ? "text-accent"
          : "text-muted-foreground";

  return (
    <section className="border border-border bg-panel p-6">
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <Icon className={`size-4 ${toneClass}`} aria-hidden />
        <h2 className="heading-console text-lg tracking-wide">{title}</h2>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
            <span className={`mt-2 size-1 shrink-0 rounded-full ${toneClass.replace("text-", "bg-")}`} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ModulePage() {
  const { module } = Route.useLoaderData();
  const others = EMERGENCY_MODULES.filter((m) => m.slug !== module.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <header className="border-b border-border bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <Link to="/emergency-guide" className="label-mono hover:text-foreground">
              ← All protocols
            </Link>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="font-mono text-[10px] text-primary">
                  PROTOCOL {module.code}
                </span>
                <h1 className="heading-console mt-2 text-5xl sm:text-6xl">{module.name}</h1>
                <p className="mt-3 max-w-2xl text-muted-foreground">{module.tagline}</p>
              </div>
              <Button asChild variant="signal" size="lg">
                <Link to="/assistant" search={{ q: module.assistantPrompt }}>
                  Ask the AI about this
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="rule-signal max-w-3xl">
            <h2 className="label-mono mb-2">Overview</h2>
            <p className="text-lg leading-relaxed text-foreground">{module.overview}</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Section icon={AlertTriangle} title="Risks" items={module.risks} tone="danger" />
            <Section
              icon={Stethoscope}
              title="Symptoms to recognise"
              items={module.symptoms}
              tone="warn"
            />
            <Section icon={ShieldPlus} title="Prevention" items={module.prevention} tone="ok" />
            <Section icon={CheckCircle2} title="Do" items={module.dos} tone="ok" />
            <Section icon={Ban} title="Do not" items={module.donts} tone="danger" />

            <section className="border border-primary/30 bg-primary/5 p-6">
              <div className="flex items-center gap-2 border-b border-primary/20 pb-4">
                <Phone className="size-4 text-primary" aria-hidden />
                <h2 className="heading-console text-lg tracking-wide">Emergency numbers</h2>
              </div>
              <ul className="mt-4 space-y-3">
                {module.numbers.map((n: EmergencyNumber) => (
                  <li key={`${n.label}-${n.number}`} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-muted-foreground">{n.label}</span>
                    <span className="font-mono text-sm font-medium text-foreground">
                      {n.number}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Numbers vary by country. Confirm your local emergency number before you need it.
              </p>
            </section>
          </div>

          <section className="mt-16">
            <h2 className="label-mono mb-4">Related protocols</h2>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {others.map((m) => (
                <Link
                  key={m.slug}
                  to="/emergency-guide/$slug"
                  params={{ slug: m.slug }}
                  className="bg-background p-6 transition-colors hover:bg-surface"
                >
                  <span className="font-mono text-[10px] text-muted-foreground">{m.code}</span>
                  <p className="heading-console mt-3 text-xl">{m.name}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
