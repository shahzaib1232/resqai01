import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  parseGuidance,
  type AssistantMessage,
  type ConversationSummary,
  type Guidance,
} from "./assistant-types";

const SYSTEM_PROMPT = `You are ResQ AI, an emergency response assistant.
Given a described situation, return calm, ordered, actionable safety guidance for a non-expert.
Rules:
- Always tell the person to contact professional emergency services when life is at risk.
- Keep every list item one short imperative sentence, at most 20 words.
- Provide at most 7 immediate steps, 5 first aid items, 4 contacts, 5 things to avoid.
- Never invent local phone numbers you are unsure of; describe the service instead (e.g. "local fire service").
- Severity must be one of: low, moderate, high, critical.`;

const guidanceSchema = z.object({
  situation: z.string(),
  severity: z.enum(["low", "moderate", "high", "critical"]),
  immediateSteps: z.array(z.string()),
  firstAid: z.array(z.string()),
  whoToCall: z.array(z.string()),
  avoid: z.array(z.string()),
  followUp: z.string(),
});

export const listConversations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ConversationSummary[]> => {
    const { data, error } = await context.supabase
      .from("assistant_conversations")
      .select("id, title, updated_at")
      .order("updated_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => ({
      id: row.id,
      title: row.title,
      updatedAt: row.updated_at,
    }));
  });

export const getConversation = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ conversationId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }): Promise<AssistantMessage[]> => {
    const { data: rows, error } = await context.supabase
      .from("assistant_messages")
      .select("id, role, content, severity, created_at")
      .eq("conversation_id", data.conversationId)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (rows ?? []).map((row) => ({
      id: row.id,
      role: row.role === "assistant" ? "assistant" : "user",
      content: row.content,
      severity: row.severity,
      createdAt: row.created_at,
      guidance: row.role === "assistant" ? parseGuidance(row.content) : null,
    }));
  });

export const createConversation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("assistant_conversations")
      .insert({ user_id: context.userId, title: "New situation" })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: data.id };
  });

export const deleteConversation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ conversationId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await context.supabase
      .from("assistant_messages")
      .delete()
      .eq("conversation_id", data.conversationId);
    const { error } = await context.supabase
      .from("assistant_conversations")
      .delete()
      .eq("id", data.conversationId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const askAssistant = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        conversationId: z.string().uuid(),
        prompt: z.string().trim().min(4).max(2000),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: conversation, error: convError } = await supabase
      .from("assistant_conversations")
      .select("id, title")
      .eq("id", data.conversationId)
      .maybeSingle();
    if (convError) throw new Error(convError.message);
    if (!conversation) throw new Error("Conversation not found");

    const { data: history, error: historyError } = await supabase
      .from("assistant_messages")
      .select("role, content")
      .eq("conversation_id", data.conversationId)
      .order("created_at", { ascending: true })
      .limit(30);
    if (historyError) throw new Error(historyError.message);

    const { error: userInsertError } = await supabase.from("assistant_messages").insert({
      conversation_id: data.conversationId,
      user_id: userId,
      role: "user",
      content: data.prompt,
    });
    if (userInsertError) throw new Error(userInsertError.message);

    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("AI service is not configured.");

    const { generateText, Output, NoObjectGeneratedError } = await import("ai");
    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(key);

    let guidance: Guidance;
    try {
      const { output } = await generateText({
        model: gateway("google/gemini-3.6-flash"),
        output: Output.object({ schema: guidanceSchema }),
        system: SYSTEM_PROMPT,
        messages: [
          ...(history ?? []).map((row) => ({
            role: row.role === "assistant" ? ("assistant" as const) : ("user" as const),
            content: row.content,
          })),
          { role: "user" as const, content: data.prompt },
        ],
      });
      guidance = output as Guidance;
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        const fallback = parseGuidance(error.text ?? "");
        if (!fallback) throw new Error("The assistant could not produce guidance. Try rephrasing.");
        guidance = fallback;
      } else {
        const message = error instanceof Error ? error.message : "AI request failed";
        if (message.includes("429")) throw new Error("Rate limited — wait a moment and retry.");
        if (message.includes("402")) throw new Error("AI credits exhausted for this workspace.");
        throw new Error(message);
      }
    }

    guidance = {
      ...guidance,
      immediateSteps: guidance.immediateSteps.slice(0, 7),
      firstAid: guidance.firstAid.slice(0, 5),
      whoToCall: guidance.whoToCall.slice(0, 4),
      avoid: guidance.avoid.slice(0, 5),
    };

    const { error: assistantInsertError } = await supabase.from("assistant_messages").insert({
      conversation_id: data.conversationId,
      user_id: userId,
      role: "assistant",
      content: JSON.stringify(guidance),
      severity: guidance.severity,
    });
    if (assistantInsertError) throw new Error(assistantInsertError.message);

    const title =
      conversation.title === "New situation"
        ? data.prompt.slice(0, 60)
        : conversation.title;
    await supabase
      .from("assistant_conversations")
      .update({ title, updated_at: new Date().toISOString() })
      .eq("id", data.conversationId);

    return { guidance };
  });
