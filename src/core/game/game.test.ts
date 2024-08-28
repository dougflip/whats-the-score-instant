import {
  createGame,
  getNextTurn,
  getPreviousTurn,
  getScoreForTurn,
  getScoreTotals,
  mapScores,
  setPlayerScore,
} from "@/core/game";
import { describe, expect, it } from "vitest";

describe("game", () => {
  describe("createGame", () => {
    it("creates a new game from an empty list of players", () => {
      const game = createGame([]);
      expect(game.roster).toEqual([]);
      expect(game.turn).toEqual({ roundIndex: 0, playerIndex: 0 });
    });

    it("creates a new game from a list of players", () => {
      const players = ["Alice", "Bob"];
      const game = createGame(players);
      expect(game.roster).toEqual(
        players.map((name) => ({ name, scores: [] })),
      );
      expect(game.turn).toEqual({ roundIndex: 0, playerIndex: 0 });
    });
  });

  describe("setPlayerScore", () => {
    it("sets the score of a player at a given round index", () => {
      const game = createGame(["Alice", "Bob"]);
      const updatedGame = setPlayerScore(game, 10);
      expect(updatedGame.roster[0].scores).toEqual([10]);
    });
  });

  describe("getNextTurn", () => {
    it("returns the next turn", () => {
      const game = createGame(["Alice", "Bob"]);
      const nextTurn = getNextTurn(game);
      expect(nextTurn).toEqual({ playerIndex: 1, roundIndex: 0 });
    });

    it("returns the next turn when the round is complete", () => {
      const game = createGame(["Alice", "Bob"]);
      const nextTurn = getNextTurn(game, { playerIndex: 1, roundIndex: 0 });
      expect(nextTurn).toEqual({ playerIndex: 0, roundIndex: 1 });
    });
  });

  describe("getPreviousTurn", () => {
    it("returns the previous turn", () => {
      const game = createGame(["Alice", "Bob"]);
      const previousTurn = getPreviousTurn(game, {
        playerIndex: 1,
        roundIndex: 1,
      });
      expect(previousTurn).toEqual({ playerIndex: 0, roundIndex: 1 });
    });

    it("returns the previous turn when going to a previous round", () => {
      const game = createGame(["Alice", "Bob"]);
      const previousTurn = getPreviousTurn(game, {
        playerIndex: 0,
        roundIndex: 1,
      });
      expect(previousTurn).toEqual({ playerIndex: 1, roundIndex: 0 });
    });
  });

  describe("getScoreForTurn", () => {
    it("returns the score for the current turn", () => {
      const game = createGame(["Alice", "Bob"]);
      const updatedGame = setPlayerScore(game, 10, {
        playerIndex: 0,
        roundIndex: 0,
      });
      const score = getScoreForTurn(
        updatedGame,
        getPreviousTurn(updatedGame, { playerIndex: 1, roundIndex: 0 }),
      );
      expect(score).toEqual(10);
    });
  });

  describe("mapScores", () => {
    it("maps over the scores of the game", () => {
      const game = createGame(["Alice", "Bob"]);
      const updatedGame = setPlayerScore(game, 10, {
        playerIndex: 0,
        roundIndex: 0,
      });
      const scores = mapScores(updatedGame, (_, scores) => scores);
      expect(scores).toEqual([[10, null]]);
    });
  });

  describe("getScoreTotals", () => {
    it("returns the total score for each player", () => {
      const game = createGame(["Alice", "Bob"]);
      const updatedGame = setPlayerScore(game, 10);
      const updatedGame2 = setPlayerScore(updatedGame, 20);
      const updatedGame3 = setPlayerScore(updatedGame2, 30);
      const totals = getScoreTotals(updatedGame3);
      expect(totals).toEqual([40, 20]);
    });
  });
});
