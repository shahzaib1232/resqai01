import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GLOBAL_EMERGENCY_NUMBERS } from "@/lib/emergency-modules";
import { submitContactMessage } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ResQ AI — Support, Partnerships & Feedback" },
      {
        name: "description",
        content:
          "Reach the ResQ AI team for support, agency partnerships, protocol corrections or feedback. For live emergencies, call your local emergency number first.",
      },
      { property: "og:title", content: "Contact ResQ AI — Support, Partnerships & Feedback" },
      {
        property: "og:description",
        content: "Support, partnerships, protocol corrections and feedback.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(255, "Email must be under 255 characters"),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(150, "Subject must be under 150 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Please give us at least a sentence")
    .max(2000, "Message must be under 2000 characters"),
});

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setPending(true);
    try {
      await submitContactMessage({ data: parsed.data });
      toast.success("Message received. We reply within two working days.");
      form.reset();
    } catch {
      toast.error("Could not send your message. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <p className="label-mono">Contact</p>
        <h1 className="heading-console mt-3 text-5xl sm:text-6xl">Talk to the team.</h1>

        <div className="mt-6 border border-primary/30 bg-primary/5 p-4">
          <p className="text-sm text-foreground">
            <strong className="heading-console tracking-wide text-primary">In an emergency:</strong>{" "}
            do not use this form. Call your local emergency number immediately.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <form onSubmit={onSubmit} noValidate className="glass-panel rounded-xs p-8 lg:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="label-mono">
                  Name
                </Label>
                <Input id="name" name="name" maxLength={100} autoComplete="name" />
                {errors.name && <p className="text-xs text-primary">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="label-mono">
                  Email
                </Label>
                <Input id="email" name="email" type="email" maxLength={255} autoComplete="email" />
                {errors.email && <p className="text-xs text-primary">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="subject" className="label-mono">
                Subject
              </Label>
              <Input id="subject" name="subject" maxLength={150} />
              {errors.subject && <p className="text-xs text-primary">{errors.subject}</p>}
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="message" className="label-mono">
                Message
              </Label>
              <Textarea id="message" name="message" rows={6} maxLength={2000} />
              {errors.message && <p className="text-xs text-primary">{errors.message}</p>}
            </div>

            <Button type="submit" variant="signal" size="lg" className="mt-8" disabled={pending}>
              {pending ? "Sending…" : "Send message"}
            </Button>
          </form>

          <aside className="space-y-6 lg:col-span-5">
            <div className="border border-border bg-panel p-6">
              <h2 className="label-mono mb-4">Direct channels</h2>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="size-4 text-accent" aria-hidden />
                  <span className="text-muted-foreground">support@resq-ai.app</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageSquare className="size-4 text-accent" aria-hidden />
                  <span className="text-muted-foreground">partnerships@resq-ai.app</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-accent" aria-hidden />
                  <span className="text-muted-foreground">Response within 2 working days</span>
                </li>
              </ul>
            </div>

            <div className="border border-border bg-panel p-6">
              <h2 className="label-mono mb-4">Emergency numbers</h2>
              <ul className="space-y-3">
                {GLOBAL_EMERGENCY_NUMBERS.map((n) => (
                  <li key={n.label} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-muted-foreground">{n.label}</span>
                    <span className="font-mono text-sm text-foreground">{n.number}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
