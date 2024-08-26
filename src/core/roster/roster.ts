import { mapBy, setAt } from "@/utils/array";

export type Player = {
  name: string;
  scores: number[];
};

export type Roster = Player[];

export type PlayerScoreUpdate = {
  roster: Roster;
  name: string;
  score: number;
  roundIndex: number;
};

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
  roster,
  name,
  score,
  roundIndex,
}: PlayerScoreUpdate): Roster {
  return mapBy(
    roster,
    (x) => x.name === name,
    (x) => ({ ...x, scores: setAt(x.scores, roundIndex, score) }),
  );
}
