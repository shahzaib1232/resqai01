import { useEffect, useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EMERGENCY_MODULES } from "@/lib/emergency-modules";

export function Composer({
  onSubmit,
  pending,
  initialValue,
  focusKey,
}: {
  onSubmit: (prompt: string) => void;
  pending: boolean;
  initialValue?: string;
  focusKey?: string;
}) {
  const [value, setValue] = useState(initialValue ?? "");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!pending) ref.current?.focus();
  }, [pending, focusKey]);

  function submit() {
    const prompt = value.trim();
    if (prompt.length < 4 || pending) return;
    onSubmit(prompt);
    setValue("");
  }

  return (
    <div>
      <p className="label-mono">Describe the situation</p>
      <Textarea
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            submit();
          }
        }}
        className="mt-4 min-h-32"
        maxLength={2000}
        placeholder="e.g. There is smoke coming from the flat below mine and the stairwell is filling up."
      />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button variant="signal" size="lg" onClick={submit} disabled={pending || value.trim().length < 4}>
          {pending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
          {pending ? "Analysing" : "Get protocol"}
        </Button>
        <span className="font-mono text-[10px] text-muted-foreground">⌘/CTRL + ENTER TO SEND</span>
      </div>

      <div className="mt-6">
        <p className="label-mono">Quick prompts</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {EMERGENCY_MODULES.slice(0, 6).map((m) => (
            <button
              key={m.slug}
              type="button"
              onClick={() => setValue(m.assistantPrompt)}
              className="border border-border px-3 py-2 text-left text-[11px] leading-snug text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
