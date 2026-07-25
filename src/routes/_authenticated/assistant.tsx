import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { ConsoleShell } from "@/components/console/ConsoleShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EMERGENCY_MODULES } from "@/lib/emergency-modules";

export const Route = createFileRoute("/_authenticated/assistant")({
  validateSearch: z.object({ q: z.string().max(2000).optional() }),
  head: () => ({
    meta: [
      { title: "AI Emergency Assistant — ResQ AI" },
      {
        name: "description",
        content:
          "Describe an emergency in plain language and receive an ordered protocol: situation analysis, immediate steps, first aid, who to call, and what to avoid.",
      },
      { property: "og:title", content: "AI Emergency Assistant — ResQ AI" },
      {
        property: "og:description",
        content: "Plain-language input, ordered emergency protocol out.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssistantPage,
});

function AssistantPage() {
  const { q } = Route.useSearch();

  return (
    <ConsoleShell
      title="AI Assistant"
      subtitle="Describe the situation the way you would to a dispatcher."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <section className="glass-panel rounded-xs p-8 lg:col-span-8">
          <p className="label-mono">Input</p>
          <Textarea
            className="mt-4 min-h-40"
            defaultValue={q ?? ""}
            placeholder="e.g. There is smoke coming from the flat below mine and the stairwell is filling up."
            maxLength={2000}
          />
          <Button variant="signal" size="lg" className="mt-6">
            Get protocol
          </Button>
          <p className="mt-3 font-mono text-[10px] text-muted-foreground">
            LIVE AI RESPONSE STREAMING LANDS IN THE NEXT PHASE
          </p>
        </section>

        <aside className="border border-border bg-panel p-8 lg:col-span-4">
          <p className="label-mono">Quick prompts</p>
          <ul className="mt-4 space-y-2">
            {EMERGENCY_MODULES.slice(0, 6).map((m) => (
              <li key={m.slug}>
                <span className="block border border-border px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                  {m.assistantPrompt}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </ConsoleShell>
  );
}
