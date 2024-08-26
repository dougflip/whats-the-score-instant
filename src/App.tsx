import "./App.css";

import { RosterCreate } from "@/components/roster/RosterCreate";

// const APP_ID = "acddc6a6-5fad-43db-b9fc-9e29e476125c";

// type Schema = {
//   games: Game[];
// };

// type Game = {
//   id: string | number;
//   roster: Roster;
// };

// const db = init<Schema>({ appId: APP_ID });

// function addToRoster(name: string) {
//   db.transact(
//     tx.games["60ab3893-35e5-49d3-ad1e-f173a7436285"].update({
//       roster: addPlayer([], name),
//     }),
//   );
// }

function App() {

  return (
    <RosterCreate />
  );
}

export default App;
