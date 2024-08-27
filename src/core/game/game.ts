import { mapBy, setAt } from "@/utils/array";

export type Player = {
  name: string;
  scores: number[];
};

export type Roster = Player[];

export type Game = {
  id: string;
  roster: Roster;
};

/**
 * Represents a specific turn in a game.
 * This is a combination of a round index and a player index.
 */
export type GameTurn = {
  roundIndex: number;
  playerIndex: number;
};

export type PlayerScoreUpdate = GameTurn & {
  game: Game;
  score: number;
};

export type GetTurnArgs = GameTurn & {
  game: Game;
};

/**
 * Creates a roster from a list of players.
 */
export function createRoster(players: string[]): Roster {
  return players.map((name) => ({ name, scores: [] }));
}

/**
 * Adds a new player to the roster.
 *
 * In the future we might ensure that the player name is unique.
 */
export function addPlayer(roster: Roster, name: string): Roster {
  return [...roster, { name, scores: [] }];
}

/**
 * Remove a player by name.
 */
export function removePlayer(roster: Roster, name: string): Roster {
  return roster.filter((player) => player.name !== name);
}

/**
 * Move a player from index to another.
 *
 * If an index is out of bounds then this is a noop.
 */
export function movePlayer(roster: Roster, from: number, to: number): Roster {
  return roster.toSpliced(from, 1).toSpliced(to, 0, roster[from]);
}

/**
 * Sets the score of a player at a given round index.
 */
export function setPlayerScore({
  game,
  playerIndex,
  roundIndex,
  score,
}: PlayerScoreUpdate): Game {
  return {
    ...game,
    roster: mapBy(
      game.roster,
      (_, i) => i === playerIndex,
      (x) => ({ ...x, scores: setAt(x.scores, roundIndex, score) }),
    ),
  };
}

/**
 * Gets the next turn in the game.
 */
export function getNextTurn({
  game,
  playerIndex,
  roundIndex,
}: GetTurnArgs): GameTurn {
  // if we you are the last user in the roster, go back to the first user
  if (playerIndex === game.roster.length - 1) {
    return {
      roundIndex: roundIndex + 1,
      playerIndex: 0,
    };
  }

  return {
    roundIndex,
    playerIndex: playerIndex + 1,
  };
}

/**
 * Gets the previous turn in the game.
 */
export function getPreviousTurn({
  game,
  playerIndex,
  roundIndex,
}: GetTurnArgs): GameTurn {
  // if we you are the first user in the roster, go back to the last user
  if (playerIndex === 0) {
    return {
      roundIndex: roundIndex - 1,
      playerIndex: game.roster.length - 1,
    };
  }

  return {
    roundIndex,
    playerIndex: playerIndex - 1,
  };
}

/**
 * Gets the score of a specific turn for a plyer.
 */
export function getScoreForTurn(
  game: Game,
  { playerIndex, roundIndex }: GameTurn,
): number | null {
  return game.roster[playerIndex]?.scores[roundIndex] ?? null;
}
