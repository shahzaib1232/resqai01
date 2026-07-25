import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(10).max(2000),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    if (error) throw new Error("Could not store the contact message.");

    return { ok: true as const };
  });
