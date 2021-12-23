import * as constants from '../constants';
import { getTile, getWolves } from './selectors';
import { checkMove, newCoordinatesInDirection, isOutOfBounds, getWolfDirection } from './moveHelpers';

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

const spawnWolf = (num, game) => {
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
            ? { ...tile, entity: { type: 'wolf', hp: 3, attack: 1, moves: 0, maxMoves: 100 } }
            : tile
        ))
    ))};
};

const setTileReducer = (payload, game) => (
    { ...game, grid:
        game.grid.map((row, Yindex) => 
            payload.y === Yindex 
            ? row.map((tile, Xindex) => 
                payload.x === Xindex 
                    ? { ...tile, entity: { type: payload.newTile } } 
                    : tile
            ) 
            : row
        )
    }
);

const movePlayer = (direction, game) => {
    const { x, y } = getTile('player', game.grid)[0];
    const { newX, newY } = newCoordinatesInDirection(x, y, direction);

    if (!isOutOfBounds(newX, newY) && checkMove(game.grid[newY][newX])) {
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
        const moveWolves = (game) => (
            updateWolves(game)
        );
        const addXp = (game) => (
            setXp(game.xp + 1, game)
        );
        
        const baseChanges = [spawnPlayer, removePlayer, addMove, spawnCarrots, moveWolves];
        const stateChanges = game.grid[newY][newX].entity.type === 'carrot'
            ? [...baseChanges, addXp]
            : baseChanges; 

        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
    }
    return game;
};

const tryWolfMoves = (game) => {
    // get all wolves
    const wolfTiles = getWolves(game.grid);
    const playerPos = getTile('player', game.grid)[0];

    // loop for each wolf
    wolfTiles.forEach((wolfTile) => {    
        // pick direction for that wolf
        const direction = getWolfDirection(playerPos.x, playerPos.y, wolfTile);
        
        // generate new coords

        // check move on the new coords

        // add wolf on new tile
        // remove previous wolf
        // add wolf moves
        
        // conditionally add if wolf walks on carrot
    });
    return game;
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

const updateWolves = (game) => {
    const checkWolfSpawn = (game) => (
        spawnWolves(game)
    );
    const moveWolves = (game) => (
        tryWolfMoves(game)
    );
    const updateWolfMoves = (game) => (
        addWolfMoves(1, game)
    );

    const stateChanges = [checkWolfSpawn, moveWolves, updateWolfMoves];
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), game);

};

const spawnWolves = (game) => {
    const numWolves = getTile('wolf', game.grid).length;
    if (numWolves < constants.wolfCap) {
        if (Math.floor(Math.random() * 10) === 0) {
            return spawnWolf(1, game);
        } else {
            return game;
        }
    } else {
        return game;
    }
};

const setMoves = (moves, game) => (
    { ...game, moves: moves }
);

const addWolfMoves = (num, game) => (
    { ...game, grid: 
        game.grid.map((row, Yindex) => (
            row.map((tile, Xindex) => {
                const foundWolf = getWolves(game.grid).find((wolfTile) => (
                    wolfTile.coords.x === Xindex && wolfTile.coords.y === Yindex
                ));
                return foundWolf
                    ? { 
                        ...foundWolf, 
                        entity: {
                            ...foundWolf.entity,
                            moves: foundWolf.entity.moves+num,
                        },
                    }
                    : tile;
            })
        ))
    }
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