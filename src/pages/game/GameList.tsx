import * as db from "@/db/db";

import { Link } from "@tanstack/react-router";
import { TrashIcon } from "@/components/icons/TrashIcon";

export function GameList() {
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
                <div>
                  <Link to="/games/$gameId" params={{ gameId: game.id }}>
                    {game.roster.map((x) => x.name).join(", ")}
                  </Link>
                </div>
                <div className="text-small">
                  <Link to="/games/$gameId" params={{ gameId: game.id }}>
                    Round: {game.turn.roundIndex + 1},{" "}
                    {game.roster[game.turn.playerIndex].name}&apos;s turn
                  </Link>
                </div>
              </td>
              <td className="text-right">
                <button
                  className="danger"
                  onClick={() => handleDelete(game.id)}
                >
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
