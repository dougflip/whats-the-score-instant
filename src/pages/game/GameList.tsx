import * as db from "@/db/db";

import { Link, useRouter } from "@tanstack/react-router";

export function GameList() {
  const { navigate } = useRouter();
  const games = db.useGames();

  function handleDelete(gameId: string) {
    // TODO: use a pico modal here instead
    if (window.confirm("Are you sure you want to delete this game?")) {
      db.deleteGame(gameId);
    }
  }

  if (games.isLoading) {
    return <div>Loading...</div>;
  }

  if (games.error) {
    return <div>Error: {games.error.message}</div>;
  }

  return (
    <>
      <div className="text-right my-3">
        <Link to="/games/create">+ New Game</Link>
      </div>
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
              <td className="text-right">
                <button
                  className="danger mx-3"
                  onClick={() => handleDelete(game.id)}
                >
                  Delete
                </button>
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
    </>
  );
}
