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
    const arr = Array(num).fill(0);
    const coords = arr.reduce((a) => {
        while (true) {
            const x = Math.floor(Math.random() * 15);
            const y = Math.floor(Math.random() * 15);
            if (
                grid[y][x] === 'G' &&
                !a.find((coord) => coord.x === x && coord.y === y)
            ) {
                return [...a, { x: x, y: y }];
            }
        }
    }, []);

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