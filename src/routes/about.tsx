import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ResQ AI — Why Bystander Response Decides Outcomes" },
      {
        name: "description",
        content:
          "ResQ AI exists because the first responder at any emergency is a bystander. Our mission, principles and the limits of what an AI assistant should do in a crisis.",
      },
      { property: "og:title", content: "About ResQ AI — Why Bystander Response Decides Outcomes" },
      {
        property: "og:description",
        content:
          "Our mission, design principles and honest limits: ResQ AI is decision support, not a replacement for emergency services.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    title: "Legibility over cleverness",
    body: "Under acute stress, working memory collapses. Every AI response uses the same seven labelled sections in the same order so the user learns where to look once and never has to search again.",
  },
  {
    title: "Red is a signal, not a style",
    body: "Exactly one control on any screen is red. If everything is urgent, nothing is. The interface reserves emergency red for SOS and critical alerts, and orange for warnings.",
  },
  {
    title: "Work without the network",
    body: "All nine protocols are authored content shipped with the app. If the AI call fails, the connection drops, or the model is unavailable, the guidance is still there.",
  },
  {
    title: "Never impersonate a dispatcher",
    body: "ResQ AI always tells the user to call emergency services. It supplements the minutes before help arrives; it never claims to replace them.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <p className="label-mono">About</p>
          <h1 className="heading-console mt-3 max-w-3xl text-5xl sm:text-6xl">
            The first responder is always a bystander.
          </h1>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-7">
              <p>
                Emergency medical services are extraordinary — and they are almost never first on
                scene. In most cities the gap between a call and a response is eight to fourteen
                minutes. During an earthquake, flood or cyclone, that gap stretches to hours or
                days, because the system is saturated and the roads are gone.
              </p>
              <p>
                In that gap, the outcome is decided by whoever is already standing there. Usually
                someone with no training, a phone with poor signal, and a rising sense of panic.
              </p>
              <p>
                ResQ AI is built for that person. It takes a plain sentence —{" "}
                <em>&ldquo;there is an earthquake&rdquo;</em>,{" "}
                <em>&ldquo;someone had a road accident&rdquo;</em> — and returns an ordered,
                actionable protocol in seconds. It knows where you are, who to notify, and where the
                nearest hospital, police station, fire station and shelter are.
              </p>
              <p>
                And it keeps a shared picture of what is happening around you, built from the
                reports of people who are physically there.
              </p>
            </div>

            <aside className="lg:col-span-5">
              <div className="glass-panel rounded-xs p-8">
                <h2 className="label-mono">The honest limit</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  ResQ AI is decision support. It is not a medical device, not a dispatch service,
                  and not a substitute for professional emergency care. Every response it produces
                  begins by telling you to contact emergency services. In a life-threatening
                  situation, call your local emergency number first, then use the app.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-border bg-surface py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="label-mono">Design principles</p>
            <h2 className="heading-console mt-3 text-4xl">Four rules, applied everywhere.</h2>
            <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2">
              {PRINCIPLES.map((p, i) => (
                <article key={p.title} className="bg-background p-8">
                  <span className="font-mono text-[10px] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="heading-console mt-4 text-2xl">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="glass-panel flex flex-col items-start gap-6 rounded-xs p-10 md:flex-row md:items-center md:justify-between">
            <h2 className="heading-console text-3xl">Prepare before the gap opens.</h2>
            <Button asChild variant="signal" size="lg">
              <Link to="/auth">Get started</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
