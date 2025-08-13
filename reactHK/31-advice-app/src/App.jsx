import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Card from "./components/Card";
import Loading from "./components/Loading";

import "./App.css";

function App() {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const URL = "https://api.adviceslip.com/advice";

  async function fetchAdvice() {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${URL}?t=${Date.now()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch advice");
      }

      const data = await response.json();

      
      setAdvice(data.slip.advice);
      setLoading(false);

    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(function () {
    fetchAdvice();
  }, []);

  return (
    <div className="app">
      <Card error={error} advice={advice} fetchAdvice={fetchAdvice} loading={loading}/>
    </div>
  );
}

export default App;
