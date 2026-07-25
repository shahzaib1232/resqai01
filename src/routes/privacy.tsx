import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Location & Health Data | ResQ AI" },
      {
        name: "description",
        content:
          "How ResQ AI handles location, medical notes, emergency contacts, SOS history and AI conversations — what is stored, who can see it, and how to delete it.",
      },
      { property: "og:title", content: "Privacy Policy — Location & Health Data | ResQ AI" },
      {
        property: "og:description",
        content: "What ResQ AI stores, who can see it, and how to delete it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  {
    title: "What we collect",
    body: "Account email and password hash (handled by our authentication provider), your profile details (name, phone, blood group, medical notes, home city), emergency contacts you add, locations you save, SOS activations you trigger, community reports you publish, and your conversations with the AI assistant.",
  },
  {
    title: "Location data",
    body: "Your device location is read only when you explicitly request nearby services, activate SOS, or attach coordinates to a community report. We do not track you in the background. Coordinates attached to an SOS activation or a report are stored with that record.",
  },
  {
    title: "Medical information",
    body: "Blood group and medical notes are optional. They exist so an SOS message can carry information that helps a responder. They are readable only by you and are never shared with other users or sold.",
  },
  {
    title: "Who can see your data",
    body: "Row-level security is enforced at the database. Your profile, contacts, locations, SOS history and AI conversations are readable only by your account. Community reports are public by design — do not include personal details in them. Administrators can view SOS records and moderate reports for safety purposes only.",
  },
  {
    title: "AI processing",
    body: "The text you send to the assistant is transmitted to our AI provider to generate a response. Do not include information you are not comfortable transmitting. Conversations are stored against your account so you can reopen them, and you can delete them at any time.",
  },
  {
    title: "Retention and deletion",
    body: "You can delete individual contacts, locations, reports and conversations from within the app. Deleting your account removes all associated records via cascading deletion.",
  },
  {
    title: "What we never do",
    body: "We do not sell personal data, we do not run third-party advertising trackers, and we do not share medical or location data with advertisers.",
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
        <p className="label-mono">Legal</p>
        <h1 className="heading-console mt-3 text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: 25 July 2026</p>

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
