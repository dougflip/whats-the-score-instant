import "./App.css";

import { Roster, addPlayer } from "@/core/roster";
import { id, init, tx } from "@instantdb/react";

import reactLogo from "@/assets/react.svg";
import { useState } from "react";
import viteLogo from "/vite.svg";

const APP_ID = "acddc6a6-5fad-43db-b9fc-9e29e476125c";

type Schema = {
  games: Game[];
};

type Game = {
  id: string | number;
  roster: Roster;
};

const db = init<Schema>({ appId: APP_ID });

function addToRoster(name: string) {
  db.transact(
    tx.games["60ab3893-35e5-49d3-ad1e-f173a7436285"].update({
      roster: addPlayer([], name),
    }),
    // tx..update({
    //   text,
    //   done: false,
    //   createdAt: Date.now(),
    // })
  );

  // db.transact(
  //   tx.todos[id()].update({
  //     text,
  //     done: false,
  //     createdAt: Date.now(),
  //   })
  // )
}

function App() {
  const [count, setCount] = useState(0);
  const { isLoading, error, data } = db.useQuery({
    games: { $: { where: { id: "60ab3893-35e5-49d3-ad1e-f173a7436285" } } },
  });

  if (data && data.games.length > 1) {
    return "Multiple games found - need to handle this.";
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={() => addToRoster("doug test")}>Add to Roster</button>
    </>
  );
}

export default App;
