import { GameTurn, PlayerScoreUpdate, getNextTurn } from "@/core/game";
import { updatePlayerScore, useGame } from "@/db/db";
import { useEffect, useState } from "react";

import { GameScoreForm } from "@/components/game/GameScoreForm";
import { useParams } from "@tanstack/react-router";

export function GameScore() {
  const { gameId } = useParams({ from: "/games/$gameId" });
  const [round, setRound] = useState<GameTurn>({ roundIndex: 0, name: "" });
  const { data, error, isLoading } = useGame(gameId);

  if (isLoading || !data) {
    return "loading...";
  }

  if (error) {
    return "error!";
  }

  function handleScore(data: PlayerScoreUpdate) {
    updatePlayerScore(data);
    setRound(getNextTurn(data.game, data.name, data.roundIndex));
  }

  console.log(data);

  return (
    <div>
      <h1>Game {gameId}</h1>
      <GameScoreForm
        game={data.games[0]}
        name={round.name || data.games[0].roster[0].name}
        roundIndex={round.roundIndex}
        onScore={handleScore}
      />
    </div>
  );
}
