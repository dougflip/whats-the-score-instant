import { Roster, createRoster } from "@/core/roster/roster";
import { id, init, tx } from "@instantdb/react";

const APP_ID = "acddc6a6-5fad-43db-b9fc-9e29e476125c";

type Schema = {
  games: Game;
};

type Game = {
  id: string;
  roster: Roster;
};

export const db = init<Schema>({ appId: APP_ID });

/**
 * Creates and commits a new `Game` to the database.
 * Returns the created `Game`.
 */
export function createGame(players: string[]): Game {
  const game: Game = {
    id: id(),
    roster: createRoster(players),
  };
  db.transact(tx.games[game.id].update(game));
  return game;
}
