import React from "react";
import "./Buttons.css"

interface Props {
    gameOver: boolean;
    solveTime: number;
    gameWon: boolean;
    newMinefield: () => void;
}

function Buttons(props: Props) {

    return (
        <>
            {props.gameOver &&
                (<div className="button-panel">
                    <h1>You {props.gameWon ? "win" : "lost"}!</h1>
                    <h3>{props.gameWon ? `Solved in ${props.solveTime} seconds.` : ""}</h3>
                    <div className="button-container">
                        <div className="button" onClick={props.newMinefield}>Play again</div>
                        <div className="button" onClick={() => window.location.reload()}>Choose difficulty</div>
                    </div>
                </div>)}
        </>
    );
}

export default Buttons;
