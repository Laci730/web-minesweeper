import React from "react";
import "./Difficulty.css"

interface Props {
    setDifficulty: (difficulty: string) => void;
}

function Difficulty({ setDifficulty }: Props) {
    return (
        <div className="difficulty-buttons-box">
            <h2 className="title">Minesweeper</h2>
            <div className="difficulty-button" onClick={() => setDifficulty("easy")}>Easy</div>
            <div className="difficulty-button" onClick={() => setDifficulty("medium")}>Medium</div>
            <div className="difficulty-button" onClick={() => setDifficulty("hard")}>Hard</div>
        </div>
    )
}

export default Difficulty;
