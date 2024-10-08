import * as db from "@/db/db";

import { GameCreateForm } from "@/components/game/GameCreateForm";
import { createGame } from "@/core/game";
import { useRouter } from "@tanstack/react-router";

export function GameCreate() {
  const { navigate } = useRouter();

  function handleRosterSubmit(players: string[]) {
    const game = db.createGame(createGame(players));
    navigate({ to: `/games/${game.id}` });
  }

  return <GameCreateForm onSubmit={handleRosterSubmit} />;
}
