import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Alias route for the "Emergency Deployment" call to action.
 * The real page is the AI Emergency Assistant at /assistant — this route only
 * forwards there so the URL resolves on a direct visit or hard refresh.
 */
export const Route = createFileRoute("/emergency-deployment")({
  // Redirect runs on the client only: the assistant lives behind the
  // authenticated shell (also client-only), so forwarding during SSR on a
  // host without the backend env vars would fail the whole request.
  ssr: false,
  beforeLoad: () => {
    throw redirect({ to: "/assistant", replace: true });
  },
  component: () => null,
});
