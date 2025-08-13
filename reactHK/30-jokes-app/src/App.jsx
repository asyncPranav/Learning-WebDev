import { useState } from "react";
import { useEffect } from "react";
import Button from "./components/Button";
import JokesCard from "./components/JokesCard";
import "./App.css";

function App() {

  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("Any");

  const URL = `https://v2.jokeapi.dev/joke/${category}?type=twopart`;

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${URL}`);
      if (!res.ok) {
        throw new Error("Failed to fetch joke");
      }
      const data = await res.json();
      setJoke({ setup: data.setup, punchline: data.delivery });
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  // fetch joke when app load and category changes
  useEffect(() => {
    fetchJoke(category);
  }, [category]);

  return (
    <div className="app">
      <h1>Random Joke Generator</h1>

      {/* Category Selector */}
      <select value={category} onChange={(e) => setCategory(e.target.value)} >
        <option value="Any">Any</option>
        <option value="Programming">Programming</option>
        <option value="Misc">Misc</option>
        <option value="Pun">Pun</option>
        <option value="Spooky">Spooky</option>
        <option value="Christmas">Christmas</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error.message}</p>}

      {joke && !loading && (
        <JokesCard setup={joke.setup} punchline={joke.punchline} />
      )}

      <Button onClick={fetchJoke} text="Get Another Joke" />
    </div>
  );
}

export default App;
