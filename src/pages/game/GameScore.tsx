import {
  Game,
  PlayerScoreUpdate,
  getScoreForTurn,
  setPlayerScore,
} from "@/core/game";
import { updateGame, useGame } from "@/db/db";

import { GameScoreForm } from "@/components/game/GameScoreForm";
import { GameScoreTable } from "@/components/game/GameScoreTable";
import { useParams } from "@tanstack/react-router";

export function GameScore() {
  const { gameId } = useParams({ from: "/games/$gameId" });
  const { data, error, isLoading } = useGame(gameId);

  if (isLoading || !data) {
    return "loading...";
  }

  if (error) {
    return "error!";
  }

  function handleScore({ game, score, turn }: PlayerScoreUpdate) {
    updateGame(setPlayerScore(game, score, turn));
  }

  function handlePreviousClick(gameUpdate: Game) {
    updateGame(gameUpdate);
  }

  const game = data.games[0];

  return (
    <div>
      <GameScoreForm
        key={`${game.turn.playerIndex}-${game.turn.roundIndex}`}
        game={game}
        playerIndex={game.turn.playerIndex}
        roundIndex={game.turn.roundIndex}
        initialScore={getScoreForTurn(game)}
        onScore={handleScore}
        onPreviousClick={handlePreviousClick}
      />
      <GameScoreTable
        game={game}
        playerIndex={game.turn.playerIndex}
        roundIndex={game.turn.roundIndex}
      />
    </div>
  );
}
