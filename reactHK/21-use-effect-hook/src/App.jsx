import { useState, useEffect } from "react";

function App() {
  const [showClock, setShowClock] = useState(true);

  return (
    <div>
      <h1>🕒 Live Digital Clock</h1>
      <button onClick={() => setShowClock(!showClock)}>
        {showClock ? "Hide Clock" : "Show Clock"}
      </button>
      {showClock && <Clock />}
    </div>
  );
}

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    console.log("⏳ Clock started");

    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup runs when component unmounts
    return () => {
      clearInterval(timerId);
      console.log("🛑 Clock stopped (cleanup)");
    };
  }, []);

  return <h2>{time.toLocaleTimeString()}</h2>;
}

export default App;