import { isNonNullish, isNullish, range } from "remeda";
import { mapBy, setAt } from "@/utils/array";

export type Player = {
  name: string;
  scores: number[];
};

export type Roster = Player[];

export type Game = {
  /**
   * Initially, this will be an empty string, but assigned a value once saved to the db.
   */
  id: string;
  roster: Roster;
  turn: GameTurn;
};

/**
 * Represents a specific turn in a game.
 * This is a combination of a round index and a player index.
 */
export type GameTurn = {
  roundIndex: number;
  playerIndex: number;
};

export type PlayerScoreUpdate = {
  game: Game;
  score: number;
  turn: GameTurn;
};

/**
 * Creates a roster from a list of players.
 */
function createRoster(players: string[]): Roster {
  return players.map((name) => ({ name, scores: [] }));
}

/**
 * Creates a new game with the given players
 * and defaults the turn to the first player in the first round.
 */
export function createGame(players: string[]): Game {
  return {
    id: "",
    roster: createRoster(players),
    turn: { roundIndex: 0, playerIndex: 0 },
  };
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
export function setPlayerScore(
  game: Game,
  score: number,
  { playerIndex, roundIndex }: GameTurn = game.turn,
): Game {
  return {
    ...game,
    roster: mapBy(
      game.roster,
      (_, i) => i === playerIndex,
      (x) => ({ ...x, scores: setAt(x.scores, roundIndex, score) }),
    ),
    turn: getNextTurn(game),
  };
}

/**
 * Gets the next turn in the game.
 */
export function getNextTurn(
  game: Game,
  { playerIndex, roundIndex }: GameTurn = game.turn,
): GameTurn {
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
export function getPreviousTurn(
  game: Game,
  { playerIndex, roundIndex }: GameTurn = game.turn,
): GameTurn {
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

export function setTurn(game: Game, turn: GameTurn): Game {
  return {
    ...game,
    turn,
  };
}

/**
 * Gets the score for the turn associated with the game.s
 */
export function getScoreForTurn(
  game: Game,
  turn: GameTurn = game.turn,
): number | null {
  const { playerIndex, roundIndex } = turn;
  return game.roster[playerIndex]?.scores[roundIndex] ?? null;
}

/**
 * Maps over rounds and provides scores array to the callback.
 * Useful for rendering a table of scores.
 */
export function mapScores<T>(
  game: Game,
  mapFn: (round: number, scores: (number | null)[]) => T,
): T[] {
  const numRounds = Math.max(
    ...game.roster.map((player) => player.scores.length),
  );

  // include a blank row if
  //  - all players have a score for the last round OR
  //  - all players have a null score for the last round (basically an empty game)
  const includeBlankRow =
    game.roster.every((x) => isNonNullish(x.scores[numRounds - 1])) ||
    game.roster.every((x) => isNullish(x.scores[numRounds - 1]));

  return range(0, numRounds + (includeBlankRow ? 1 : 0)).map((roundIndex) =>
    mapFn(
      roundIndex,
      game.roster.map((player) => player.scores[roundIndex] ?? null),
    ),
  );
}

export function getScoreTotals(game: Game): number[] {
  return game.roster.map((player) =>
    player.scores.reduce((acc, score) => acc + (score ?? 0), 0),
  );
}
