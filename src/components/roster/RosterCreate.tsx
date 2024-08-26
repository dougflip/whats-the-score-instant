import { FormEvent, useState } from "react";

import { setAt } from "@/utils/array";

type RosterCreateProps = {
  players?: string[];
  onSubmit: (players: string[]) => void;
};

export function RosterCreate({
  players: initPlayers,
  onSubmit,
}: RosterCreateProps) {
  const [players, setPlayers] = useState(initPlayers ?? ["", "", "", ""]);

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
          />
        </div>
      ))}
      <div>
        <button type="submit">Start!</button>
      </div>
    </form>
  );
}
