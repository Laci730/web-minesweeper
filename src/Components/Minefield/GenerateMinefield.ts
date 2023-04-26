function generateMinefield(minefieldSize: number, nOfMines: number) {

    let tileData = [];
    let mineIndexes: number[] = [];
    let value = 0;

    //Aknát tartalmazó mezők generálása
    while (mineIndexes.length < nOfMines) {
        let mineIndex = Math.floor(Math.random() * minefieldSize);
        if (!mineIndexes.includes(mineIndex)) {
            mineIndexes.push(mineIndex);
        }
    }

    //Aknamező generálása
    for (let i = 0; i < minefieldSize; i++) {
        if (mineIndexes.includes(i)) {
            value = 9;
        }
        else
            value = 0;
        tileData.push({
            id: i,
            value: value,
            opened: false,
            marked: false
        });
    }

    let mineField = tileData;
    const tmp = Math.sqrt(minefieldSize);
    const firstColumn = [-1, tmp, -tmp, tmp - 1, -(tmp + 1)];
    const lastColumn = [1, tmp, -tmp, tmp + 1, -(tmp - 1)];
    const tilesAround = [1, tmp - 1, tmp, tmp + 1, -1, -(tmp - 1), -tmp, -(tmp + 1)];

    for (let i = 0; i < minefieldSize; i++) {
        let currentTileVal = mineField[i].value;
        if (currentTileVal !== 9) {
            let minesAround = 0;
            if (i % tmp === 0) {
                //első oszlop elemei
                for (let j = 0; j < firstColumn.length; j++) {
                    let aroundTile = mineField[i - firstColumn[j]];
                    if (typeof aroundTile !== 'undefined') {
                        if (aroundTile.value === 9)
                            minesAround += 1;
                    }
                }
                if (minesAround !== 0)
                    mineField[i].value = minesAround;
            }

            else if (i % tmp === tmp - 1) {
                //utolsó oszlop elemei
                for (let j = 0; j < lastColumn.length; j++) {
                    let aroundTile = mineField[i - lastColumn[j]];
                    if (typeof aroundTile !== 'undefined') {
                        if (aroundTile.value === 9)
                            minesAround += 1;
                    }
                }
                if (minesAround !== 0)
                    mineField[i].value = minesAround;
            }
            else {
                for (let j = 0; j < tilesAround.length; j++) {
                    //középső oszlopok
                    let aroundTile = mineField[i - tilesAround[j]];
                    if (typeof aroundTile !== 'undefined') {
                        if (aroundTile.value === 9)
                            minesAround += 1;
                    }
                }
                if (minesAround !== 0)
                    mineField[i].value = minesAround;
            }
        }
    }
    return mineField;
}

export default generateMinefield;
