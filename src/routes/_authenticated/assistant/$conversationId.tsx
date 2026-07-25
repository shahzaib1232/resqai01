import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Composer } from "@/components/assistant/Composer";
import { ConversationList } from "@/components/assistant/ConversationList";
import { GuidanceCard } from "@/components/assistant/GuidanceCard";
import { ConsoleShell } from "@/components/console/ConsoleShell";
import {
  askAssistant,
  createConversation,
  deleteConversation,
  getConversation,
  listConversations,
} from "@/lib/assistant.functions";

export const Route = createFileRoute("/_authenticated/assistant/$conversationId")({
  head: () => ({
    meta: [
      { title: "Assistant Conversation — ResQ AI" },
      {
        name: "description",
        content:
          "A saved ResQ AI emergency conversation: your described situation and the structured protocol generated for it.",
      },
      { property: "og:title", content: "Assistant Conversation — ResQ AI" },
      {
        property: "og:description",
        content: "Saved emergency guidance thread.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConversationPage,
});

function ConversationPage() {
  const { conversationId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const list = useServerFn(listConversations);
  const load = useServerFn(getConversation);
  const ask = useServerFn(askAssistant);
  const create = useServerFn(createConversation);
  const remove = useServerFn(deleteConversation);

  const conversations = useQuery({
    queryKey: ["assistant", "conversations"],
    queryFn: () => list(),
  });

  const messages = useQuery({
    queryKey: ["assistant", "messages", conversationId],
    queryFn: () => load({ data: { conversationId } }),
  });

  const send = useMutation({
    mutationFn: (prompt: string) => ask({ data: { conversationId, prompt } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["assistant"] }),
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
    mutationFn: (id: string) => remove({ data: { conversationId: id } }),
    onSuccess: async (_data, id) => {
      await queryClient.invalidateQueries({ queryKey: ["assistant"] });
      if (id === conversationId) navigate({ to: "/assistant" });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const items = messages.data ?? [];

  return (
    <ConsoleShell title="AI Assistant" subtitle="Saved conversation — ask follow-up questions.">
      <div className="grid gap-6 lg:grid-cols-12">
        <section className="space-y-6 lg:col-span-8">
          {messages.isLoading && (
            <p className="font-mono text-[11px] text-muted-foreground">LOADING TRANSCRIPT…</p>
          )}

          {items.map((message) =>
            message.role === "user" ? (
              <div key={message.id} className="border border-border bg-panel p-5">
                <p className="label-mono">You reported</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{message.content}</p>
              </div>
            ) : message.guidance ? (
              <GuidanceCard key={message.id} guidance={message.guidance} />
            ) : (
              <p key={message.id} className="text-sm text-muted-foreground">
                {message.content}
              </p>
            ),
          )}

          {send.isPending && send.variables && (
            <div className="border border-border bg-panel p-5">
              <p className="label-mono">You reported</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{send.variables}</p>
            </div>
          )}

          {send.isPending && (
            <p className="flex items-center gap-2 font-mono text-[11px] text-primary">
              <Loader2 className="size-3.5 animate-spin" aria-hidden />
              GENERATING PROTOCOL…
            </p>
          )}

          <div className="glass-panel rounded-xs p-8">
            <Composer
              onSubmit={(prompt) => send.mutate(prompt)}
              pending={send.isPending}
              focusKey={conversationId}
            />
          </div>
        </section>

        <ConversationList
          conversations={conversations.data ?? []}
          activeId={conversationId}
          onNew={() => newThread.mutate()}
          onDelete={(id) => del.mutate(id)}
          creating={newThread.isPending}
        />
      </div>
    </ConsoleShell>
  );
}
