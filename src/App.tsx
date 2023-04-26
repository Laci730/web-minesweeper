import React, { useState } from "react";
import Minefield from "./Components/Minefield/Minefield";
import Difficulty from "./Components/Difficulty/Difficulty";
import "./app.css"

function App() {
  const [minefieldSize, setMinefieldSize] = useState(0);
  const [numberOfMines, setNumberOfMines] = useState(0);

  function setDifficulty(difficulty: string) {
    if (difficulty === "easy") {
      setMinefieldSize(49);
      setNumberOfMines(6);
    }
    else if (difficulty === "medium") {
      setMinefieldSize(81);
      setNumberOfMines(12);
    }
    else if (difficulty === "hard") {
      setMinefieldSize(121);
      setNumberOfMines(18);
    }
  }

  if (minefieldSize === 0) {
    return (
      <div className="App">
        <Difficulty setDifficulty={setDifficulty} />
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <Minefield minefieldSize={minefieldSize} numberOfMines={numberOfMines} />
      </div>
    );

  }
}

export default App;
