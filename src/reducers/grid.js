import * as constants from '../constants';

const grid = (grid = constants.defaultGrid, action) => {
    switch (action.type) {
        case 'INIT_GRID':
            return initGrid(grid);

        case 'SET_GRID':
            return action.payload;

        case 'SET_TILE':
            return setTileReducer(action.payload, grid);

        default:
            return grid;
    }
};

const initGrid = (grid) => {
    const spawnPlayer = (grid) => (
        setTileReducer({ x: constants.playerStart.x, y: constants.playerStart.y, newTile: 'P' }, grid)
    );
    const spawnCarrots = (grid) => (
        spawn('C', 10, grid)
    );
    const spawnFences = (grid) => (
        spawn('F', 10, grid)
    );

    const stateChanges = [spawnPlayer, spawnCarrots, spawnFences];
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), grid);
};

const spawn = (newTile, num, grid) => {
    let x, y;
    let coords = [];
    for (let i = num; i > 0; i--) {
        do {
            x = Math.floor(Math.random() * 15);
            y = Math.floor(Math.random() * 15);
        } while (
            grid[y][x] !== 'G' ||
            coords.find((coord) => coord.x === x && coord.y === y)
        );
        coords.push({ x: x, y: y });
    }
    return grid.map((row, Yindex) => (
        row.map((tile, Xindex) => (
            coords.find((coord) => coord.x === Xindex && coord.y === Yindex)
            ? newTile
            : tile
        ))
    ));
};

const setTileReducer = (payload, grid) => (
    grid.map( (row, Yindex) => 
        payload.y === Yindex 
        ? row.map( (tile, Xindex) => 
            payload.x === Xindex 
                ? payload.newTile 
                : tile
        ) 
        : row
    )
);

export default grid;