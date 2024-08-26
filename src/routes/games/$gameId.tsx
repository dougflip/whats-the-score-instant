import { GameScore } from "@/pages/game/GameScore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/games/$gameId")({
  component: () => <GameScore />,
});
