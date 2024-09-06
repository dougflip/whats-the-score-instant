import * as db from "@/db/db";

import { useRouter } from "@tanstack/react-router";

export function GameList() {
  const { navigate } = useRouter();
  const games = db.useGames();

  if (games.isLoading) {
    return <div>Loading...</div>;
  }

  if (games.error) {
    return <div>Error: {games.error.message}</div>;
  }

  return (
    <table>
      <tbody>
        {games.data.games.map((game) => (
          <tr key={game.id}>
            <td>
              <div>{game.roster.map((x) => x.name).join(", ")}</div>
              <div className="text-small">
                Round: {game.turn.roundIndex},{" "}
                {game.roster[game.turn.playerIndex].name}&apos;s turn
              </div>
            </td>
            <td>
              <button
                onClick={() =>
                  navigate({
                    to: "/games/$gameId",
                    params: { gameId: game.id },
                  })
                }
              >
                Play
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
