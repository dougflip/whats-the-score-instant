import { Game, PlayerScoreUpdate } from "@/core/game";

import { useState } from "react";

type GameScoreFormProps = {
  game: Game;
  roundIndex: number;
  name: string;
  onScore: (data: PlayerScoreUpdate) => void;
};

export function GameScoreForm({
  game,
  name,
  roundIndex,
  onScore,
}: GameScoreFormProps) {
  const [score, setScore] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onScore({
      game,
      name,
      roundIndex,
      score: Number(score),
    });
    setScore("");
  }

  return (
    <form onSubmit={handleSubmit}>
      Round {roundIndex + 1} score for {name}:
      <input
        type="text"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />
    </form>
  );
}
