import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/compare/innrly-vs-quickbooks")({
  beforeLoad: () => {
    throw redirect({ to: "/integrations/quickbooks", statusCode: 301 });
  },
  server: {
    handlers: {
      GET: async () =>
        new Response(null, {
          status: 301,
          headers: { Location: "/integrations/quickbooks" },
        }),
    },
  },
});
