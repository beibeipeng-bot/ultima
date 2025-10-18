import { useState, useEffect, useRef } from "react";

export default function Game({ playerName, setPlayerName }) {
  const [numbers, setNumbers] = useState([]);
  const [pivotIndex, setPivotIndex] = useState(null);
  const [operations, setOperations] = useState(0);
  const [time, setTime] = useState(0);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setNumbers(Array.from({ length: 20 }, () => Math.floor(Math.random() * 100)));
  }, []);

  useEffect(() => {
    if (!finished && playerName) {
      timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [finished, playerName]);

  if (!playerName) {
    return (
      <div>
        <h2>Benvenuto al nostro gioco, inserisci il tuo nome</h2>
        <input
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="border p-1 mt-2"
        />
      </div>
    );
  }

  const checkSorted = (arr) => {
    const sorted = arr.slice().sort((a, b) => a - b);
    if (JSON.stringify(arr) === JSON.stringify(sorted)) {
      setFinished(true);
      submitScore();
    }
  };

  const handlePivot = (index) => {
    if (finished) return;
    setPivotIndex(index);
    const pivot = numbers[index];
    let comparisons = numbers.length - 1;
    let left = [];
    let right = [];
    let swaps = 0;

    numbers.forEach((n, i) => {
      if (i === index) return;
      if (n < pivot) { left.push(n); swaps++; }
      else { right.push(n); swaps++; }
    });

    const newNumbers = [...left, pivot, ...right];
    setNumbers(newNumbers);
    setOperations(prev => prev + comparisons + swaps);
    checkSorted(newNumbers);
  };

  const submitScore = async () => {
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName, operations, time }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div>Tempo ⏱: {time}s</div>
      <div>Numero di operazioni 🔄: {operations}</div>
      <div className="flex flex-wrap mt-4">
        {numbers.map((num, i) => (
          <button
            key={i}
            onClick={() => handlePivot(i)}
            className={`m-1 p-2 border ${i === pivotIndex ? 'bg-blue-300' : ''}`}
            disabled={finished}
          >
            {num}
          </button>
        ))}
      </div>
      {finished && <div className="mt-4 font-bold text-green-600">Hai completato il gioco!</div>}
    </div>
  );
}
