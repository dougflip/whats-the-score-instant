import { db } from "@/db/db";
import { useParams } from "@tanstack/react-router";

export function GameScore() {
  const { gameId } = useParams({ from: "/games/$gameId" });

  const { data, error, isLoading } = db.useQuery({
    games: { $: { where: { id: gameId } } },
  });

  if (isLoading) {
    return "loading...";
  }

  if (error) {
    return "error!";
  }

  return (
    <div>
      <h1>Game {gameId}</h1>
      Roster
      {data.games[0].roster.map((player) => (
        <div key={player.name}>
          {player.name}: {player.scores.join(",")}
        </div>
      ))}
    </div>
  );
}
