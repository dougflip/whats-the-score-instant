import * as db from "@/db/db";

import { RosterCreateForm } from "@/components/game/GameCreateForm";
import { useRouter } from "@tanstack/react-router";

export function GameCreate() {
  const { navigate } = useRouter();

  function handleRosterSubmit(players: string[]) {
    const game = db.createGame(players);
    navigate({ to: `/games/${game.id}` });
  }

  return <RosterCreateForm onSubmit={handleRosterSubmit} />;
}
