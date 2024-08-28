import { Game, PlayerScoreUpdate, getPreviousTurn } from "@/core/game";

import { useState } from "react";

type GameScoreFormProps = {
  game: Game;
  roundIndex: number;
  playerIndex: number;
  initialScore: number | null;
  onScore: (data: PlayerScoreUpdate) => void;
  onPreviousClick: (gameUpdate: Game) => void;
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
      score: Number(score),
      turn: { playerIndex, roundIndex },
    });
    setScore("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>
        Round {roundIndex + 1}: {game.roster[playerIndex].name}
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
          onPreviousClick({
            ...game,
            turn: getPreviousTurn(game),
          })
        }
      >
        Previous
      </button>
    </form>
  );
}
