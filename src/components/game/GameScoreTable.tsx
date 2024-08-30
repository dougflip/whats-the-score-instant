import "@/components/game/GameScoreTable.css";

import { Game, GameTurn, getScoreTotals, mapScores } from "@/core/game";

import classNames from "classnames";

type GameScoreTableProps = {
  game: Game;
  playerIndex: number;
  roundIndex: number;
  onTurnClick: (game: Game, turn: GameTurn) => void;
};

export function GameScoreTable({
  game,
  playerIndex,
  roundIndex,
  onTurnClick,
}: GameScoreTableProps) {
  return (
    <table className="game-score-table striped">
      <thead>
        <tr>
          {game.roster.map((player) => (
            <th key={player.name}>{player.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {mapScores(game, (rIndex, scores) => (
          <tr key={rIndex}>
            {scores.map((score, sIndex) => (
              <td
                key={sIndex}
                className={classNames({
                  "game-score-table-current-turn":
                    roundIndex === rIndex && playerIndex === sIndex,
                })}
              >
                <button
                  className="link"
                  onClick={() =>
                    onTurnClick(game, {
                      roundIndex: rIndex,
                      playerIndex: sIndex,
                    })
                  }
                >
                  {score ?? "--"}
                </button>
              </td>
            ))}
          </tr>
        ))}
        <tr className="game-score-table-total-row">
          {getScoreTotals(game).map((total, index) => (
            <td key={index}>{total}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
