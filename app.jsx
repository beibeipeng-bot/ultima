import { useState } from "react";
import Game from "./Game";
import Leaderboard from "./Leaderboard";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [view, setView] = useState("game"); // 'game' or 'leaderboard'

  return (
    <div className="p-4">
      <button onClick={() => setView("game")}>Gioco</button>
      <button onClick={() => setView("leaderboard")}>Classifica</button>
      {view === "game" ? (
        <Game playerName={playerName} setPlayerName={setPlayerName} />
      ) : (
        <Leaderboard />
      )}
    </div>
  );
}
