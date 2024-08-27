import { Game, GameCreate } from "@/core/game/game";
import { id, init, tx } from "@instantdb/react";

const APP_ID = "acddc6a6-5fad-43db-b9fc-9e29e476125c";

type Schema = {
  games: Game;
};

export const db = init<Schema>({ appId: APP_ID });

export function useGame(gameId: string) {
  return db.useQuery({ games: { $: { where: { id: gameId } } } });
}

/**
 * Creates and commits a new `Game` to the database.
 * Returns the created `Game`.
 */
export function createGame(gameCreate: GameCreate): Game {
  const game: Game = {
    ...gameCreate,
    id: id(),
  };
  db.transact(tx.games[game.id].update(game));
  return game;
}

/**
 * Updates the score of a player in a game.
 */
export function updateGame(gameUpdate: Game): Game {
  db.transact(tx.games[gameUpdate.id].update(gameUpdate));
  return gameUpdate;
}
