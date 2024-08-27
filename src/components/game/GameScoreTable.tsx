import "@/components/game/GameScoreTable.css";

import { Game, mapScores } from "@/core/game";

import classNames from "classnames";

type GameScoreTableProps = {
  game: Game;
  playerIndex: number;
  roundIndex: number;
};

export function GameScoreTable({
  game,
  playerIndex,
  roundIndex,
}: GameScoreTableProps) {
  return (
    <table>
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
                {score}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
