import * as db from "@/db/db";

import { Link } from "@tanstack/react-router";
import { RemoteData } from "@/components/remote-data/RemoteData";
import { TrashIcon } from "@/components/icons/TrashIcon";

export function GameList() {
  const games = db.useGames();

  function handleDelete(gameId: string) {
    if (window.confirm("Are you sure you want to delete this game?")) {
      db.deleteGame(gameId);
    }
  }

  return (
    <RemoteData
      data={games}
      render={({ games }) => (
        <>
          <div className="text-right my-3">
            <Link to="/games/create">+ New Game</Link>
          </div>
          <table>
            <tbody>
              {games.map((game) => (
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
      )}
    />
  );
}
