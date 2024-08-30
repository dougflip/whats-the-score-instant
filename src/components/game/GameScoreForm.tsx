import { Game, PlayerScoreUpdate } from "@/core/game";

import { useState } from "react";

type GameScoreFormProps = {
  game: Game;
  roundIndex: number;
  playerIndex: number;
  initialScore: number | null;
  onScore: (data: PlayerScoreUpdate) => void;
};

export function GameScoreForm({
  game,
  playerIndex,
  roundIndex,
  initialScore,
  onScore,
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
          placeholder={`${game.roster[playerIndex].name}'s score`}
          required
          autoFocus
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
      </div>
    </form>
  );
}
