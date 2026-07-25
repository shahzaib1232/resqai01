import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Emergency Guidance Limits | ResQ AI" },
      {
        name: "description",
        content:
          "The terms governing use of ResQ AI, including the critical limitation that AI guidance is decision support and never a substitute for emergency services or medical care.",
      },
      { property: "og:title", content: "Terms of Use — Emergency Guidance Limits | ResQ AI" },
      {
        property: "og:description",
        content: "ResQ AI is decision support, not a substitute for emergency services.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

const SECTIONS = [
  {
    title: "Not a substitute for emergency services",
    body: "ResQ AI provides informational guidance only. It is not a medical device, not a dispatch service, and not professional medical, legal or rescue advice. In any life-threatening situation, contact your local emergency services immediately. Guidance produced by the assistant may be incomplete or wrong.",
  },
  {
    title: "Your responsibility",
    body: "You are responsible for your own judgement and safety. Never take an action that endangers you or others because the app suggested it. If the guidance conflicts with instructions from a trained responder, follow the responder.",
  },
  {
    title: "Accounts",
    body: "You must provide accurate information and keep your credentials secure. You are responsible for activity under your account. One person per account.",
  },
  {
    title: "Community reports",
    body: "Reports must be truthful and about real events. Do not publish personal data about other people, do not upload images of casualties, and do not file false disaster reports. False reports waste emergency capacity and will result in permanent removal.",
  },
  {
    title: "SOS use",
    body: "The SOS feature notifies contacts you have chosen. It does not contact emergency services on your behalf. Test it responsibly and inform your contacts that they are listed.",
  },
  {
    title: "Availability",
    body: "The service depends on networks, third-party AI providers and mapping data. It may be unavailable exactly when you need it. Keep offline copies of your critical emergency numbers.",
  },
  {
    title: "Limitation of liability",
    body: "To the maximum extent permitted by law, ResQ AI and its operators are not liable for any loss, injury or damage arising from use of, or inability to use, the service.",
  },
  {
    title: "Changes",
    body: "These terms may change. Continued use after an update constitutes acceptance of the revised terms.",
  },
];

function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
        <p className="label-mono">Legal</p>
        <h1 className="heading-console mt-3 text-5xl">Terms of Use</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: 25 July 2026</p>

        <div className="mt-8 border border-primary/30 bg-primary/5 p-4">
          <p className="text-sm text-foreground">
            <strong className="heading-console tracking-wide text-primary">Read this first:</strong>{" "}
            ResQ AI supplements emergency services. It never replaces them. Call your local
            emergency number in any life-threatening situation.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {SECTIONS.map((s, i) => (
            <section key={s.title}>
              <span className="font-mono text-[10px] text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="heading-console mt-2 text-2xl">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
