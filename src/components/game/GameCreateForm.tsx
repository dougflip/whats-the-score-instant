import { FormEvent, useState } from "react";

import { range } from "remeda";
import { setAt } from "@/utils/array";

type GameCreateFormProps = {
  players?: string[];
  onSubmit: (players: string[]) => void;
};

export function GameCreateForm({
  players: initPlayers,
  onSubmit,
}: GameCreateFormProps) {
  const [players, setPlayers] = useState(
    initPlayers ?? range(0, 6).map(() => ""),
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(players.filter(Boolean));
  }

  return (
    <form onSubmit={handleSubmit}>
      {players.map((x, i) => (
        <div key={i}>
          <input
            type="text"
            placeholder={`Player ${i + 1}`}
            value={x}
            onChange={(e) =>
              setPlayers((data) => setAt(data, i, e.target.value))
            }
            required={i === 0}
          />
        </div>
      ))}
      <div>
        <button type="submit">Start!</button>
      </div>
    </form>
  );
}
