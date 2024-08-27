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
  initialScore: number | null;
  onScore: (data: PlayerScoreUpdate) => void;
  onPreviousClick: (nextTurn: GameTurn) => void;
};

export function GameScoreForm({
  game,
  playerIndex,
  roundIndex,
  initialScore,
  onScore,
  onPreviousClick,
}: GameScoreFormProps) {
  const [score, setScore] = useState(initialScore?.toString() ?? "");

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
      <h3>
        Round {roundIndex + 1} score for {game.roster[playerIndex].name}
      </h3>
      <div>
        <input
          required
          autoFocus
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
      </div>
      <button
        type="button"
        disabled={roundIndex === 0 && playerIndex === 0}
        onClick={() =>
          onPreviousClick(getPreviousTurn({ game, playerIndex, roundIndex }))
        }
      >
        Previous
      </button>
    </form>
  );
}
