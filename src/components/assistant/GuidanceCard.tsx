import { AlertTriangle, HeartPulse, PhoneCall, ShieldAlert, ListOrdered } from "lucide-react";

import type { Guidance } from "@/lib/assistant-types";

const SEVERITY_STYLES: Record<Guidance["severity"], string> = {
  low: "border-border text-muted-foreground",
  moderate: "border-accent/60 text-accent",
  high: "border-primary/60 text-primary",
  critical: "border-destructive/70 text-destructive",
};

function Section({
  icon: Icon,
  title,
  items,
  ordered,
}: {
  icon: typeof ListOrdered;
  title: string;
  items: string[];
  ordered?: boolean;
}) {
  if (items.length === 0) return null;
  const List = ordered ? "ol" : "ul";
  return (
    <div className="mt-6">
      <p className="label-mono flex items-center gap-2">
        <Icon className="size-3.5" aria-hidden />
        {title}
      </p>
      <List className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground">
            <span className="font-mono text-[11px] text-muted-foreground">
              {ordered ? String(i + 1).padStart(2, "0") : "—"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </List>
    </div>
  );
}

export function GuidanceCard({ guidance }: { guidance: Guidance }) {
  return (
    <article className="glass-panel rounded-xs p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="label-mono">Situation analysis</p>
        <span
          className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${SEVERITY_STYLES[guidance.severity]}`}
        >
          {guidance.severity}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{guidance.situation}</p>

      <Section icon={ListOrdered} title="Immediate steps" items={guidance.immediateSteps} ordered />
      <Section icon={HeartPulse} title="First aid" items={guidance.firstAid} />
      <Section icon={PhoneCall} title="Who to call" items={guidance.whoToCall} />
      <Section icon={ShieldAlert} title="Do not" items={guidance.avoid} />

      {guidance.followUp && (
        <p className="mt-6 flex gap-3 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          <AlertTriangle className="size-4 shrink-0 text-accent" aria-hidden />
          {guidance.followUp}
        </p>
      )}
    </article>
  );
}
