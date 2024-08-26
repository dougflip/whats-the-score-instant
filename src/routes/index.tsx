import { GameCreate } from "@/pages/game/GameCreate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <GameCreate />,
});
