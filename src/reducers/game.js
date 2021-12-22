import * as constants from '../constants';

const game = (game = constants.defaultGame, action) => {
    switch (action.type) {
        case 'INIT_GRID':
            return initGrid(game);

        case 'MOVE_PLAYER':
            return movePlayer(action.payload, game);

        case 'SET_DIRECTION':
            return { ...game, direction: action.payload };

        default:
            return game;
    }
};

const initGrid = (game) => {
    const spawnPlayer = (game) => (
        setTileReducer({ x: constants.playerStart.x, y: constants.playerStart.y, newTile: 'player' }, game)
    );
    const spawnCarrots = (game) => (
        spawn('carrot', 10, game)
    );
    const spawnFences = (game) => (
        spawn('fence', 10, game)
    );

    const stateChanges = [spawnPlayer, spawnCarrots, spawnFences];
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), game);
};

const spawn = (newTile, num, game) => {
    const arr = Array(num).fill(0);
    const coords = arr.reduce((a) => {
        while (true) {
            const x = Math.floor(Math.random() * 15);
            const y = Math.floor(Math.random() * 15);
            if (
                game.grid[y][x].entity.type === 'grass' &&
                !a.find((coord) => coord.x === x && coord.y === y)
            ) {
                return [...a, { x: x, y: y }];
            }
        }
    }, []);

    return { ...game, grid: game.grid.map((row, Yindex) => (
        row.map((tile, Xindex) => (
            coords.find((coord) => coord.x === Xindex && coord.y === Yindex)
            ? { ...tile, entity: { type: newTile } }
            : tile
        ))
    ))};
};

const setTileReducer = (payload, game) => (
    { ...game, grid: game.grid.map((row, Yindex) => 
        payload.y === Yindex 
        ? row.map((tile, Xindex) => 
            payload.x === Xindex 
                ? { ...tile, entity: { type: payload.newTile } } 
                : tile
        ) 
        : row
    )}
);

const movePlayer = (direction, game) => {
    const { x, y } = getTile('player', game.grid)[0];
    const { newX, newY } = newCoordinatesInDirection(x, y, direction);

    if (!isOutOfBounds(newX, newY) && checkPlayerMove(game.grid[newY][newX])) {
        const spawnPlayer = (game) => (
            setTileReducer({ x: newX, y: newY, newTile: 'player' }, game)
        );
        const removePlayer = (game) => (
            setTileReducer({ x: x, y: y, newTile: 'grass' }, game)
        );
        const addMove = (game) => (
            setMoves(game.moves + 1, game)
        );
        const spawnCarrots = (game) => (
            checkCarrotSpawn(game)
        );
        const addXp = (game) => (
            setXp(game.xp + 1, game)
        );
        
        const baseChanges = [spawnPlayer, removePlayer, addMove, spawnCarrots];
        const stateChanges = game.grid[newY][newX].entity.type === 'carrot'
            ? [...baseChanges, addXp]
            : baseChanges; 

        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
        
        //moveWolves();
    }
};

const checkCarrotSpawn = (game) => {
    const numCarrots = getTile('carrot', game.grid).length;
    if (numCarrots < constants.carrotCap) {
        if (Math.floor(Math.random() * 5) === 0) {
            return spawn('carrot', 1, game);
        } else {
            return game;
        }
    } else {
        return game;
    }
};

const getTile = (search, grid) => {
    let coords = [];
    grid.forEach( (row, Yindex) => 
        row.forEach( (tile, Xindex) => {
                if (tile.entity.type === search) {
                    coords.push( { x: Xindex, y: Yindex } );
                }
            }
        )
    );
    if (coords.length === 0 && search === 'player') {
        console.log(search + ' not found in getTile');
    }
    return coords;
};

const newCoordinatesInDirection = (x, y, direction) => {
    switch (direction) {
        case 'w':
            return { newX: x, newY: y-1 };
        case 's':
            return { newX: x, newY: y+1 };
        case 'a':
            return { newX: x-1, newY: y };
        case 'd':
            return { newX: x+1, newY: y };
        default:
            break;
    }
};

const isOutOfBounds = (x, y) => {
    if (x >= constants.gridX || y >= constants.gridY) return true;
    if (x < 0 || y < 0) return true;
    return false;
};

const checkPlayerMove = (nextTile) => {
    switch (nextTile.entity.type) {
        case 'carrot':
            return true;
        case 'fence':
            return false;
        case 'wolf':
            return false;
        case 'grass':
            return true;
        default:
            return false;
    }
};

const setMoves = (moves, game) => (
    { ...game, moves: moves }
);

const setLevel = (level, game) => (
    { ...game, level: level }
);

const setXp = (xp, game) => {
    const dif = xp - game.maxXp;
    if (dif >= 0) {
        const addLevel = (game) => (
            setLevel(game.level + 1, game)
        );
        const updateMaxXp = (game) => (
            setMaxXp(Math.floor(game.maxXp * 1.1), game)
        );

        const stateChanges = [addLevel, updateMaxXp];
        return { ...stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game), xp: dif};
    } else {
        return { ...game, xp: xp };
    }
};

const setMaxXp = (maxXp, game) => (
    { ...game, maxXp: maxXp }
);

export default game;