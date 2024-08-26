import {
  Roster,
  addPlayer,
  movePlayer,
  removePlayer,
  setPlayerScore,
} from "@/core/roster";
import { describe, expect, it } from "vitest";

function testRoster(): Roster {
  return [
    { name: "Player 1", scores: [10, 20, 30] },
    { name: "Player 2", scores: [15, 25, 35] },
    { name: "Player 3", scores: [5, 15, 25] },
  ];
}

describe("Roster", () => {
  describe("addPlayer", () => {
    it("should add a new player to the roster", () => {
      const newRoster = addPlayer(testRoster(), "Player 4");
      expect(newRoster).toHaveLength(4);
      expect(newRoster[3].name).toBe("Player 4");
      expect(newRoster[3].scores).toEqual([]);
    });
  });

  describe("removePlayer", () => {
    it("should remove a player from the roster", () => {
      const newRoster = removePlayer(testRoster(), "Player 2");
      expect(newRoster).toHaveLength(2);
      expect(newRoster[0].name).toBe("Player 1");
      expect(newRoster[1].name).toBe("Player 3");
    });
  });

  describe("movePlayer", () => {
    it("should move a player within the roster", () => {
      const newRoster = movePlayer(testRoster(), 0, 2);
      expect(newRoster[0].name).toBe("Player 2");
      expect(newRoster[1].name).toBe("Player 3");
      expect(newRoster[2].name).toBe("Player 1");
    });
  });

  describe("setPlayerScore", () => {
    it("should set the score of a player at a given round index", () => {
      const playerScoreUpdate = {
        roster: testRoster(),
        name: "Player 1",
        score: 40,
        roundIndex: 1,
      };
      const newRoster = setPlayerScore(playerScoreUpdate);
      expect(newRoster[0].scores[1]).toBe(40);
    });
  });
});
