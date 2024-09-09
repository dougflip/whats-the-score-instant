import { id, init, tx } from "@instantdb/react";

import { Game } from "@/core/game/game";

const APP_ID = "acddc6a6-5fad-43db-b9fc-9e29e476125c";

type Schema = {
  games: Game;
};

type UseGamesArgs = {
  limit?: number;
};

export const db = init<Schema>({ appId: APP_ID });

/**
 * Fetches a `Game` by ID from the database.
 */
export function useGame(gameId: string) {
  return db.useQuery({ games: { $: { where: { id: gameId } } } });
}

/**
 * Fetches a list of `Game`s from the database.
 */
export function useGames(args: UseGamesArgs = { limit: 10 }) {
  return db.useQuery({ games: { $: args } });
}

/**
 * Creates and commits a new `Game` to the database.
 * Returns the created `Game`.
 */
export function createGame(gameCreate: Game): Game {
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

/**
 * Deletes the `Game` with the given ID from the database.
 */
export function deleteGame(gameId: string) {
  db.transact(tx.games[gameId].delete());
}
