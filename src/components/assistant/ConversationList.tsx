import { Link } from "@tanstack/react-router";
import { MessageSquare, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ConversationSummary } from "@/lib/assistant-types";

export function ConversationList({
  conversations,
  activeId,
  onNew,
  onDelete,
  creating,
}: {
  conversations: ConversationSummary[];
  activeId?: string;
  onNew: () => void;
  onDelete: (id: string) => void;
  creating?: boolean;
}) {
  return (
    <aside className="border border-border bg-panel p-6 lg:col-span-4">
      <div className="flex items-center justify-between gap-3">
        <p className="label-mono">AI chat history</p>
        <Button size="sm" variant="outlineConsole" onClick={onNew} disabled={creating}>
          <Plus className="size-3.5" aria-hidden />
          New
        </Button>
      </div>

      <ul className="mt-5 space-y-2">
        {conversations.length === 0 && (
          <li className="font-mono text-[11px] text-muted-foreground">NO SAVED CONVERSATIONS</li>
        )}
        {conversations.map((c) => {
          const active = c.id === activeId;
          return (
            <li
              key={c.id}
              className={`flex items-center gap-2 border px-3 py-2 transition-colors ${
                active ? "border-primary/60 bg-primary/5" : "border-border hover:border-primary/40"
              }`}
            >
              <Link
                to="/assistant/$conversationId"
                params={{ conversationId: c.id }}
                className="flex min-w-0 flex-1 items-center gap-2 text-left"
              >
                <MessageSquare className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
                <span className="truncate text-xs text-foreground">{c.title}</span>
              </Link>
              <button
                type="button"
                aria-label={`Delete conversation ${c.title}`}
                onClick={() => onDelete(c.id)}
                className="text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="size-3.5" aria-hidden />
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
