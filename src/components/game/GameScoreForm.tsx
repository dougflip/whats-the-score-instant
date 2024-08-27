import {
  Game,
  GameTurn,
  PlayerScoreUpdate,
  getPreviousTurn,
} from "@/core/game";

import { useState } from "react";

type GameScoreFormProps = {
  game: Game;
  roundIndex: number;
  playerIndex: number;
  onScore: (data: PlayerScoreUpdate) => void;
  onPreviousClick: (nextTurn: GameTurn) => void;
};

export function GameScoreForm({
  game,
  playerIndex,
  roundIndex,
  onScore,
  onPreviousClick,
}: GameScoreFormProps) {
  const [score, setScore] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onScore({
      game,
      playerIndex,
      roundIndex,
      score: Number(score),
    });
    setScore("");
  }

  return (
    <form onSubmit={handleSubmit}>
      Round {roundIndex + 1} score for {game.roster[playerIndex].name}:
      <input
        type="text"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />
      <button
        type="button"
        disabled={roundIndex === 0 && playerIndex === 0}
        onClick={() =>
          onPreviousClick(getPreviousTurn(game, playerIndex, roundIndex))
        }
      >
        Previous
      </button>
    </form>
  );
}
