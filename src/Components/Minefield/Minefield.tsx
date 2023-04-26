import React, { useEffect, useState } from "react";
import Cell from "../Cell/Cell";
import Buttons from "../../Buttons/Buttons";
import generateMinefield from "./GenerateMinefield";
import "./Minefield.css"

interface Props {
    minefieldSize: number;
    numberOfMines: number;
}

const Minefield = ({ minefieldSize, numberOfMines }: Props) => {

    const [minefield, setMinefield] = useState(generateMinefield(minefieldSize, numberOfMines));
    const [nofMines, setNofMines] = useState(numberOfMines);
    const [gameOver, setGameOver] = useState(false);
    const [solveTime, setSolveTime] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
        if (!gameOver) {
            let timer = setInterval(() => {
                setSolveTime(solveTime + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [solveTime, gameOver]);

    const newMinefield = () => {
        const updateField = generateMinefield(minefieldSize, numberOfMines);
        setMinefield(updateField);
        setNofMines(numberOfMines);
        setGameOver(false);
        setSolveTime(0);
    }

    const openCell = (id: number) => {
        const updateField = [...minefield];
        if (!updateField[id].opened && updateField[id].value !== 0) {
            updateField[id].opened = true;
            updateField[id].marked = false;
            setMinefield(updateField);
        }
        else if (!updateField[id].opened) {
            setMinefield(openNeighbors(id));
            updateField[id].marked = false;;
        }
        countMarks(updateField);
    }

    const openNeighbors = (id: number) => {
        const updateField = [...minefield];
        updateField[id].opened = true;
        const x = Math.sqrt(minefieldSize);
        const rightCol = [1, x, -x, x + 1, -(x - 1)];
        const midCol = [1, x - 1, x, x + 1, -1, -(x - 1), -x, -(x + 1)];
        const leftCol = [-1, x, -x, x - 1, -(x + 1)];
        if (id % x === 0) {
            leftCol.forEach((currentValue) => {
                if (updateField[id - currentValue] !== undefined) {
                    openCell(updateField[id - currentValue].id);
                }
            });
        }
        else if (id % x === x - 1) {
            rightCol.forEach((currentValue) => {
                if (updateField[id - currentValue] !== undefined) {
                    openCell(updateField[id - currentValue].id);
                }
            });
        }
        else {
            midCol.forEach((currentValue) => {
                if (updateField[id - currentValue] !== undefined) {
                    openCell(updateField[id - currentValue].id);
                }
            });
        }
        return updateField;
    }

    const markCell = (id: number) => {
        const updateField = [...minefield];
        const marked = updateField[id].marked;
        if (!updateField[id].opened) {
            if (!marked) {
                updateField[id].marked = true;
                setMinefield(updateField);
                countMarks(updateField);
            }
            else {
                updateField[id].marked = false;
                setMinefield(updateField);
                countMarks(updateField);
            }
        }
    }

    const countMarks = (mineField: { marked: boolean }[]) => {
        const field = mineField.reduce(
            (sum, cell) => {
                if (cell.marked) {
                    sum--
                }
                return sum;
            }, numberOfMines);
        setNofMines(field);
    }

    const gameLost = () => {
        const updateField = [...minefield];
        updateField.forEach((cell) => { if (cell.value === 9) cell.opened = true });
        setMinefield(updateField);
        setGameOver(true);
        setGameWon(false);
    }

    const checkWin = () => {
        const updateField = [...minefield];
        const field = updateField.reduce(
            (sum, cell) => {
                if (cell.opened === true && cell.value !== 9) {
                    sum++
                }
                return sum;
            }, 0);
        const notMineCells = minefieldSize - numberOfMines;
        if (notMineCells === field) {
            setNofMines(0);
            updateField.forEach((cell) => { if (cell.value === 9) cell.marked = true });
            setMinefield(updateField);
            setGameOver(true);
            setGameWon(true);
        }
    }

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${Math.sqrt(minefieldSize)}, 50px)`,
        gridTemplateRows: `repeat(${Math.sqrt(minefieldSize)}, 50px)`,
        placeItems: "center",
        gap: "5px"
    }

    return (
        <div className="game-container">
            <div className="game-ui" onContextMenu={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.preventDefault()}>
                <div className="stats-container">
                    <div className="clock">Time: {solveTime}</div>
                    <div className="mines-left">Mines left: {nofMines}</div>
                </div>
                <div style={gridStyle} className="minefield" onClick={() => console.log(minefield)}>
                    {minefield.map(
                        (tile) => {
                            return (
                                <Cell
                                    id={tile.id}
                                    value={tile.value}
                                    opened={tile.opened}
                                    marked={tile.marked}
                                    gameOver={gameOver}
                                    openCell={openCell}
                                    markCell={markCell}
                                    gameLost={gameLost}
                                    checkWin={checkWin}
                                    key={tile.id} />
                            );
                        })}
                </div>
            </div>
            <Buttons gameOver={gameOver} newMinefield={newMinefield} solveTime={solveTime} gameWon={gameWon} />
        </div>
    );
}

export default Minefield;
