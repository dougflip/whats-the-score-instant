import { GameList } from "@/pages/game/GameList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/games/")({
  component: () => <GameList />,
});
