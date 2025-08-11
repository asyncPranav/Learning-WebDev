import React, { useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("#ff0000");
  const [favorites, setFavorites] = useState([]);

  const addFavorite = () => {
    if (!favorites.includes(color)) {
      setFavorites([...favorites, color]);
    }
  };

  return (
    <div className="app">
      <h1>Color Picker 🎨</h1>

      {/* Color input */}
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      {/* Display chosen color */}
      <div className="color-box" style={{ backgroundColor: color }} >
        {color}
      </div>

      {/* Add to favorites */}
      <button onClick={addFavorite}>Add to Favorites</button>

      {/* Favorite colors list */}
      {favorites.length > 0 && (
        <div className="favorites">
          <h3>Favorites:</h3>
          <div className="fav-list">
            {favorites.map((fav) => (
              <div
                key={fav}
                className="fav-color"
                style={{ backgroundColor: fav }}
                title={fav}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
