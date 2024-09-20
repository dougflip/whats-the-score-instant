import {
  Game,
  GameTurn,
  PlayerScoreUpdate,
  getScoreForTurn,
  setPlayerScore,
  setTurn,
} from "@/core/game";
import { updateGame, useGame } from "@/db/db";

import { GameScoreForm } from "@/components/game/GameScoreForm";
import { GameScoreTable } from "@/components/game/GameScoreTable";
import { RemoteData } from "@/components/remote-data/RemoteData";
import { useParams } from "@tanstack/react-router";

export function GameScore() {
  const { gameId } = useParams({ from: "/games/$gameId" });
  const games = useGame(gameId);

  function handleScore({ game, score, turn }: PlayerScoreUpdate) {
    updateGame(setPlayerScore(game, score, turn));
  }

  function handleTurnClick(game: Game, turn: GameTurn) {
    updateGame(setTurn(game, turn));
  }

  return (
    <RemoteData
      data={games}
      render={({ games: [game] }) => {
        return (
          <div>
            <GameScoreForm
              key={`${game.turn.playerIndex}-${game.turn.roundIndex}`}
              game={game}
              playerIndex={game.turn.playerIndex}
              roundIndex={game.turn.roundIndex}
              initialScore={getScoreForTurn(game)}
              onScore={handleScore}
            />
            <GameScoreTable
              game={game}
              playerIndex={game.turn.playerIndex}
              roundIndex={game.turn.roundIndex}
              onTurnClick={handleTurnClick}
            />
          </div>
        );
      }}
    />
  );
}
