import {
  GameTurn,
  PlayerScoreUpdate,
  getNextTurn,
  getScoreForTurn,
} from "@/core/game";
import { updatePlayerScore, useGame } from "@/db/db";

import { GameScoreForm } from "@/components/game/GameScoreForm";
import { GameScoreTable } from "@/components/game/GameScoreTable";
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
    setCurrentTurn(getNextTurn(data));
  }

  function handlePreviousClick(nextTurn: GameTurn) {
    setCurrentTurn(nextTurn);
  }

  return (
    <div>
      <GameScoreForm
        key={`${currentTurn.playerIndex}-${currentTurn.roundIndex}`}
        game={data.games[0]}
        playerIndex={currentTurn.playerIndex}
        roundIndex={currentTurn.roundIndex}
        initialScore={getScoreForTurn(data.games[0], currentTurn)}
        onScore={handleScore}
        onPreviousClick={handlePreviousClick}
      />
      <GameScoreTable
        game={data.games[0]}
        playerIndex={currentTurn.playerIndex}
        roundIndex={currentTurn.roundIndex}
      />
    </div>
  );
}
