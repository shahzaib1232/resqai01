import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { z } from "zod";

import { Composer } from "@/components/assistant/Composer";
import { ConversationList } from "@/components/assistant/ConversationList";
import { ConsoleShell } from "@/components/console/ConsoleShell";
import {
  askAssistant,
  createConversation,
  deleteConversation,
  listConversations,
} from "@/lib/assistant.functions";

export const Route = createFileRoute("/_authenticated/assistant/")({
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
  component: AssistantIndexPage,
});

function AssistantIndexPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const list = useServerFn(listConversations);
  const create = useServerFn(createConversation);
  const ask = useServerFn(askAssistant);
  const remove = useServerFn(deleteConversation);

  const conversations = useQuery({
    queryKey: ["assistant", "conversations"],
    queryFn: () => list(),
  });

  const start = useMutation({
    mutationFn: async (prompt: string) => {
      const { id } = await create();
      await ask({ data: { conversationId: id, prompt } });
      return id;
    },
    onSuccess: async (id) => {
      await queryClient.invalidateQueries({ queryKey: ["assistant"] });
      navigate({ to: "/assistant/$conversationId", params: { conversationId: id } });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const newThread = useMutation({
    mutationFn: async () => (await create()).id,
    onSuccess: async (id) => {
      await queryClient.invalidateQueries({ queryKey: ["assistant"] });
      navigate({ to: "/assistant/$conversationId", params: { conversationId: id } });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const del = useMutation({
    mutationFn: (conversationId: string) => remove({ data: { conversationId } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["assistant"] }),
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <ConsoleShell
      title="AI Assistant"
      subtitle="Describe the situation the way you would to a dispatcher."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <section className="glass-panel rounded-xs p-8 lg:col-span-8">
          <Composer
            onSubmit={(prompt) => start.mutate(prompt)}
            pending={start.isPending}
            initialValue={q}
          />
          <p className="mt-6 font-mono text-[10px] text-muted-foreground">
            EVERY CONVERSATION IS SAVED TO YOUR AI CHAT HISTORY
          </p>
        </section>

        <ConversationList
          conversations={conversations.data ?? []}
          onNew={() => newThread.mutate()}
          onDelete={(id) => del.mutate(id)}
          creating={newThread.isPending}
        />
      </div>
    </ConsoleShell>
  );
}
