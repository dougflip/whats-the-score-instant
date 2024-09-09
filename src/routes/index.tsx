import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: function IndexRoute() {
    const nav = useNavigate();
    nav({ to: "/games" });
  },
});
