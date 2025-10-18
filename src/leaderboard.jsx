import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch("/api/ranking-data");
        const data = await res.json();
        setScores(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchScores();
    const interval = setInterval(fetchScores, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Classifica</h2>
      <ol>
        {scores.map((s, i) => (
          <li key={i} style={{ color: i < 3 ? 'red' : 'black', fontWeight: i < 3 ? 'bold' : 'normal' }}>
            {s.name} - {s.operations} operazioni - {s.time}s
          </li>
        ))}
      </ol>
    </div>
  );
}
