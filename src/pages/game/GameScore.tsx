import { db, updatePlayerScore } from "@/db/db";

import { useParams } from "@tanstack/react-router";
import { useState } from "react";

export function GameScore() {
  const { gameId } = useParams({ from: "/games/$gameId" });
  const [score, setScore] = useState("");

  const { data, error, isLoading } = db.useQuery({
    games: { $: { where: { id: gameId } } },
  });

  if (isLoading) {
    return "loading...";
  }

  if (error) {
    return "error!";
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updatePlayerScore({
      game: data.games[0],
      name: data.games[0].roster[0].name,
      score,
      roundIndex: 0,
    });
  }

  return (
    <div>
      <h1>Game {gameId}</h1>
      <form onSubmit={handleSubmit}>
        Round 1 score for {data.games[0].roster[0].name}:
        <input
          type="text"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
      </form>
    </div>
  );
}
