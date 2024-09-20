import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: function () {
    throw redirect({ to: "/games" });
  },
});
