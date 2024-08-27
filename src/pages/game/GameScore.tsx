import { GameTurn, PlayerScoreUpdate, getNextTurn } from "@/core/game";
import { updatePlayerScore, useGame } from "@/db/db";

import { GameScoreForm } from "@/components/game/GameScoreForm";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";

export function GameScore() {
  const { gameId } = useParams({ from: "/games/$gameId" });
  const [currentTurn, setCurrentTurn] = useState<GameTurn>({
    roundIndex: 0,
    playerIndex: 0,
  });
  const { data, error, isLoading } = useGame(gameId);

  if (isLoading || !data) {
    return "loading...";
  }

  if (error) {
    return "error!";
  }

  function handleScore(data: PlayerScoreUpdate) {
    updatePlayerScore(data);
    setCurrentTurn(getNextTurn(data.game, data.playerIndex, data.roundIndex));
  }

  function handlePreviousClick(nextTurn: GameTurn) {
    setCurrentTurn(nextTurn);
  }

  return (
    <div>
      <h1>Game {gameId}</h1>
      <GameScoreForm
        game={data.games[0]}
        playerIndex={currentTurn.playerIndex}
        roundIndex={currentTurn.roundIndex}
        onScore={handleScore}
        onPreviousClick={handlePreviousClick}
      />
    </div>
  );
}
