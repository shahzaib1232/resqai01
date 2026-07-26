import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: searchSchema,
  beforeLoad: async ({ search }) => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      throw redirect({ to: safePath(search.redirect) ?? "/dashboard" });
    }
  },
  head: () => ({
    meta: [
      { title: "Sign In or Create Account — ResQ AI" },
      {
        name: "description",
        content:
          "Access your ResQ AI terminal: emergency contacts, saved locations, SOS history, community alerts and the AI emergency assistant.",
      },
      { property: "og:title", content: "Sign In or Create Account — ResQ AI" },
      {
        property: "og:description",
        content: "Access your ResQ AI emergency terminal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function safePath(value: string | undefined) {
  if (!value) return undefined;
  if (!value.startsWith("/") || value.startsWith("//")) return undefined;
  return value;
}

const credentialsSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

const signUpSchema = credentialsSchema.extend({
  fullName: z.string().trim().min(1, "Name is required").max(100),
});

function AuthPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  const destination = safePath(search.redirect) ?? "/dashboard";

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate({ to: destination, replace: true });
      }
    });
    return () => data.subscription.unsubscribe();
  }, [destination, navigate]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form));
    const schema = mode === "signup" ? signUpSchema : credentialsSchema;
    const parsed = schema.safeParse(raw);

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
      if (mode === "signup") {
        const values = parsed.data as z.infer<typeof signUpSchema>;
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: values.fullName },
          },
        });
        if (error) throw error;
        toast.success("Account created. Check your inbox if confirmation is required.");
      } else {
        const values = parsed.data;
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        if (error) throw error;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Authentication failed.";
      toast.error(message);
    } finally {
      setPending(false);
    }
  }

  async function onGoogle() {
    setPending(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed. Try again.");
      setPending(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: destination, replace: true });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between border-r border-border bg-surface p-12 lg:flex">
        <div className="grid-field pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <Link to="/" className="heading-console relative text-2xl">
          RESQ<span className="text-primary">·</span>AI
        </Link>
        <div className="relative max-w-md">
          <p className="label-mono">Terminal access</p>
          <h1 className="heading-console mt-4 text-4xl leading-tight">
            Set up before the gap opens, not during it.
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Your account holds emergency contacts, saved locations, medical notes and SOS history —
            the things you will not have time to type when it matters.
          </p>
        </div>
        <p className="relative font-mono text-[10px] text-muted-foreground">
          ENCRYPTED SESSION · ROW-LEVEL ISOLATION
        </p>
      </div>

      <div className="flex items-center justify-center px-4 py-16 sm:px-8">
        <div className="w-full max-w-sm">
          <Link to="/" className="heading-console text-xl lg:hidden">
            RESQ<span className="text-primary">·</span>AI
          </Link>

          <p className="label-mono mt-8 lg:mt-0">
            {mode === "signin" ? "Sign in" : "Create account"}
          </p>
          <h2 className="heading-console mt-2 text-3xl">
            {mode === "signin" ? "Welcome back." : "Get set up."}
          </h2>

          <Button
            type="button"
            variant="outlineConsole"
            size="lg"
            className="mt-8 w-full"
            onClick={onGoogle}
            disabled={pending}
          >
            Continue with Google
          </Button>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[10px] text-muted-foreground">OR</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={onSubmit} noValidate className="space-y-5">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="label-mono">
                  Full name
                </Label>
                <Input id="fullName" name="fullName" maxLength={100} autoComplete="name" />
                {errors.fullName && <p className="text-xs text-primary">{errors.fullName}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="label-mono">
                Email
              </Label>
              <Input id="email" name="email" type="email" maxLength={255} autoComplete="email" />
              {errors.email && <p className="text-xs text-primary">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="label-mono">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
              />
              {errors.password && <p className="text-xs text-primary">{errors.password}</p>}
            </div>

            <Button type="submit" variant="signal" size="lg" className="w-full" disabled={pending}>
              {pending ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <button
            type="button"
            className="mt-6 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setErrors({});
            }}
          >
            {mode === "signin"
              ? "No account yet? Create one"
              : "Already have an account? Sign in"}
          </button>

          <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
            By continuing you agree to the{" "}
            <Link to="/terms" className="text-foreground underline underline-offset-4">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-foreground underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
