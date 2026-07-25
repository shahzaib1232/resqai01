export type Guidance = {
  situation: string;
  severity: "low" | "moderate" | "high" | "critical";
  immediateSteps: string[];
  firstAid: string[];
  whoToCall: string[];
  avoid: string[];
  followUp: string;
};

export type AssistantMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  severity: string | null;
  createdAt: string;
  guidance: Guidance | null;
};

export type ConversationSummary = {
  id: string;
  title: string;
  updatedAt: string;
};

export function parseGuidance(content: string): Guidance | null {
  try {
    const parsed = JSON.parse(content) as Partial<Guidance>;
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.immediateSteps)) return null;
    return {
      situation: parsed.situation ?? "",
      severity: (parsed.severity as Guidance["severity"]) ?? "moderate",
      immediateSteps: parsed.immediateSteps ?? [],
      firstAid: parsed.firstAid ?? [],
      whoToCall: parsed.whoToCall ?? [],
      avoid: parsed.avoid ?? [],
      followUp: parsed.followUp ?? "",
    };
  } catch {
    return null;
  }
}
