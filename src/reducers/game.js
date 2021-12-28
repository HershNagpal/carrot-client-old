import * as constants from '../constants';
import { getPlayerCoords, getTile, getWolves } from './selectors';
import { checkMove, newCoordinatesInDirection, isOutOfBounds, getWolfDirection, wolfSpawnCoords } from './moveHelpers';

const game = (game = constants.defaultGame, action) => {
    switch (action.type) {
        case 'INIT_GRID':
            return initGrid();

        case 'MOVE_PLAYER':
            return movePlayer(action.payload, game);

        case 'SET_DIRECTION':
            return setDirection(action.payload, game);

        case 'ATTACK':
            return attack(game);

        case 'USE_SUPER_CARROT':
            return superCarrot(game);

        default:
            return game;
    }
};

const superCarrot = (game) => {
    return game;
}

const setDirection = (direction, game) => {
    switch (direction) {
        case "ArrowUp":
            return {...game, direction: "w"};
        case "ArrowDown":
            return {...game, direction: "s"};
        case "ArrowLeft":
            return {...game, direction: "a"};
        case "ArrowRight":
            return {...game, direction: "d"};
        default:
            return {...game, direction: direction};
    }
};

const initGrid = () => {
    const spawnPlayers = (game) => (
        spawnPlayer({ x: constants.playerStart.x, y: constants.playerStart.y}, constants.playerStartHp, game)
    );
    const spawnCarrots = (game) => (
        spawnCarrot(10, game)
    );
    const spawnFences = (game) => (
        spawnFence(10, game)
    );

    const stateChanges = [spawnPlayers, spawnCarrots, spawnFences];
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), constants.defaultGame);
};

const spawnPlayer = (coord, hp, game) => (
    { ...game, grid:
        game.grid.map((row, Yindex) => 
            coord.y === Yindex 
            ? row.map((tile, Xindex) => 
                coord.x === Xindex 
                    ? { ...tile, entity: { type: 'player', hp: hp, maxHp: hp } } 
                    : tile
            ) 
            : row
        )
    }
);

const spawnCarrot = (num, game) => {
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
            ? { ...tile, entity: { type: 'carrot' } }
            : tile
        ))
    ))};
};

const spawnFence = (num, game, hp=3) => {
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
            ? { ...tile, entity: { type: 'fence', hp: hp } }
            : tile
        ))
    ))};
}


const spawnWolf = (num, game) => {
    const arr = Array(num).fill(0);
    const coords = arr.reduce((a) => {
        while (true) {
            const { x, y } = wolfSpawnCoords(constants.gridX, constants.gridY);
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

const setTile = (coord, game) => (
    { ...game, grid:
        game.grid.map((row, Yindex) => 
            coord.y === Yindex 
            ? row.map((tile, Xindex) => 
                coord.x === Xindex 
                    ? { ...tile, entity: { type: coord.newTile } } 
                    : tile
            ) 
            : row
        )
    }
);

const setTileEntity = (coord, game) => (
    { ...game, grid:
        game.grid.map((row, Yindex) => 
            coord.y === Yindex 
            ? row.map((tile, Xindex) => 
                coord.x === Xindex 
                    ? { ...tile, entity: coord.newTile.entity } 
                    : tile
            ) 
            : row
        )
    }
);

const movePlayer = (direction, game) => {
    const { x, y } = getPlayerCoords(game.grid);
    const { newX, newY } = newCoordinatesInDirection(x, y, direction);

    if (!isOutOfBounds(newX, newY) && checkMove(game.grid[newY][newX])) {
        const spawnPlayer = (game) => (
            setTileEntity({x: newX, y:newY, newTile: game.grid[y][x]}, game)
        );
        const removePlayer = (game) => (
            setTile({ x: x, y: y, newTile: 'grass' }, game)
        );
        const setPlayerMoves = (game) => (
            doSetPlayerMoves(game.moves + 1, game)
        );
        const spawnCarrots = (game) => (
            doSpawnCarrots(game)
        );
        const updateWolves = (game) => (
            doUpdateWolves(game)
        );
        const setXp = (game) => (
            doSetXp(game.xp + 1, game)
        );
        const setHp = (game) => (
            doChangeHp(game, {x: newX, y: newY,}, game.carrotHealing)
        );
        
        const baseChanges = [spawnPlayer, removePlayer, setPlayerMoves, spawnCarrots, updateWolves];
        const stateChanges = game.grid[newY][newX].entity.type === 'carrot'
            ? [...baseChanges, setXp, setHp]
            : baseChanges; 

        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
    }
    return game;
};

const doMoveWolves = (game) => {
    const wolfTiles = getWolves(game.grid);
    const playerPos = getPlayerCoords(game.grid);

    return wolfTiles.reduce((a, wolfTile) => {
        const direction = getWolfDirection(playerPos.x, playerPos.y, wolfTile, game.grid);
        const { newX, newY } = newCoordinatesInDirection(wolfTile.coords.x, wolfTile.coords.y, direction);

        if (!isOutOfBounds(newX, newY) && checkMove(a.grid[newY][newX])) {
            const spawnWolf = (a) => (
                setTileEntity({ x: newX, y: newY, newTile: wolfTile }, a)
            );
            const removeWolf = (a) => (
                setTile({ x: wolfTile.coords.x, y: wolfTile.coords.y, newTile: 'grass' }, a)
            );

            const stateChanges = [spawnWolf, removeWolf];
            return stateChanges.reduce((a, stateChange) => (
                stateChange(a)
            ), a);
        } else {
            return a;
        }
    }, game);
};

const doSpawnCarrots = (game) => {
    const numCarrots = getTile('carrot', game.grid).length;
    if (numCarrots < constants.carrotCap) {
        if (Math.floor(Math.random() * 5) === 0) {
            return spawnCarrot(1, game);
        } else {
            return game;
        }
    } else {
        return game;
    }
};

const doUpdateWolves = (game) => {
    const checkWolvesAttacks = (game) => (
        doCheckWolfAttacks(game)
    );
    const moveWolves = (game) => (
        doMoveWolves(game)
    );
    const spawnWolves = (game) => (
        doSpawnWolves(game)
    );
    const addWolfMoves = (game) => (
        doAddWolfMoves(1, game)
    );

    const stateChanges = [checkWolvesAttacks, moveWolves, spawnWolves, addWolfMoves];
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), game);

};

const doSpawnWolves = (game) => {
    const numWolves = getTile('wolf', game.grid).length;
    if (numWolves < constants.wolfCap) {
        if (Math.floor(Math.random() * 50) === 0) {
            return spawnWolf(1, game);
        } else {
            return game;
        }
    } else {
        return game;
    }
};

const doSetPlayerMoves = (moves, game) => (
    { ...game, moves: moves }
);

const doAddWolfMoves = (num, game) => (
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
                            moves: foundWolf.entity.moves + num,
                        },
                    }
                    : tile;
            })
        ))
    }
);

const attack = (game) => {
    const playerTile = getPlayerCoords(game.grid);
    const tileBeingHit = newCoordinatesInDirection(playerTile.x, playerTile.y, game.direction);
    const entityBeingHit = game.grid[tileBeingHit.newY][tileBeingHit.newX].entity;

    if(entityBeingHit.type === 'wolf' || entityBeingHit.type === 'fence') {

        const reduceHp = (game) => (
            doChangeHp(game, {x: tileBeingHit.newX, y:tileBeingHit.newY}, -game.attack)
        );

        const checkForDeath = (game) => (
            doCheckForDeath(game, tileBeingHit)
        );
        const addMove = (game) => (
            doSetPlayerMoves(game.moves + 1, game)
        );
        const spawnCarrots = (game) => (
            doSpawnCarrots(game)
        );
        const updateWolves = (game) => (
            doUpdateWolves(game)
        );

        const stateChanges = [reduceHp, checkForDeath, addMove, spawnCarrots, updateWolves];
        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
    } 
    
    return game;
};

const doCheckWolfAttacks = (game) => {
    const playerCoords = getPlayerCoords(game.grid);
    const locationsAroundPlayer = [
        newCoordinatesInDirection(playerCoords.x, playerCoords.y, 'w'),
        newCoordinatesInDirection(playerCoords.x, playerCoords.y, 'a'),
        newCoordinatesInDirection(playerCoords.x, playerCoords.y, 's'),
        newCoordinatesInDirection(playerCoords.x, playerCoords.y, 'd'),
    ];
    
    return locationsAroundPlayer.reduce( (a, coord) => {
        return !isOutOfBounds(coord.newX, coord.newY) && a.grid[coord.newY][coord.newX].entity.type === 'wolf'
            ? doChangeHp(a, {x: playerCoords.x, y: playerCoords.y}, -a.grid[coord.newY][coord.newX].entity.attack)
            : a
    }, game);
};

const doChangeHp = (game, coord, dHp) => {
    const entity = game.grid[coord.y][coord.x].entity;
    const checkHp = entity.hp + dHp;
    if (entity.type === 'player') {
        if (checkHp <= 0) {
            // alert('git rekt scrub');
            return toggleGameOver(game);
        }
    }
    const newHp = checkHp > entity.maxHp
        ? entity.maxHp
        : checkHp;

    return { ...game, grid: 
        game.grid.map((row, Yindex) => (
            row.map((tile, Xindex) => (
                Xindex === coord.x && Yindex === coord.y
                    ? {
                        ...tile, 
                        entity: {
                            ...tile.entity,
                            hp: newHp,
                        },
                    }
                    : tile
            ))
        ))
    };
};

const doCheckForDeath = (game) => (
    { ...game, grid: 
        game.grid.map((row) => (
            row.map((tile) => (
                tile.entity.hp <= 0
                    ? {
                        ...tile, 
                        entity: {
                            type: 'grass',
                        },
                    }
                    : tile
            ))
        ))
    }
);

const doSetLevel = (level, game) => (
    { ...game, level: level }
);

const doSetXp = (xp, game) => {
    const dif = xp - game.maxXp;
    if (dif >= 0) {
        const addLevel = (game) => (
            doSetLevel(game.level + 1, game)
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

const toggleGameOver = (game) => (
    { ...game, gameOver: !game.gameOver }
);

export default game;