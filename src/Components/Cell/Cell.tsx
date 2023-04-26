import React, { useState, useEffect } from "react";
import "./cell.css"

interface Props {
    id: number;
    value: number;
    opened: boolean;
    marked: boolean;
    gameOver: boolean;
    openCell: (id: number) => void;
    markCell: (id: number) => void;
    gameLost: () => void;
    checkWin: () => void;
}

function Cell(props: Props) {
    const [value, setValue] = useState(props.opened ? (props.value === 0 ? "" : props.value) : "");
    const [style, setStyle] = useState("tile");
    const [marked, setMarked] = useState(props.marked);

    useEffect(() => {
        setStyle(props.opened ? (props.value === 9 ? (props.marked ? "tile marked-mine" : "tile mine") : "tile flipped") : "tile");
        setValue(props.opened ? (props.value === 0 ? "" : (props.value === 9 ? "💣" : props.value)) : (props.marked ? "🚩" : ""));
        setMarked(props.marked ? true : false)
    }, [props.opened, props.value, props.marked]);

    function open() {
        if (!marked && !props.gameOver) {
            if (props.value === 9) {
                props.openCell(props.id);
                setStyle("tile mine");
                props.gameLost();
            }
            else if (props.value !== 0) {
                props.openCell(props.id);
                setStyle("tile flipped");
                props.checkWin();
            }
            else {
                props.openCell(props.id);
                setStyle("tile flipped");
                props.checkWin();
            }
        }
    }

    function mark(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault();
        if (!props.gameOver)
            props.markCell(props.id);
    }

    return (
        <div className={style} onClick={open} onContextMenu={mark}>{value}</div>
    );
}

export default Cell;
