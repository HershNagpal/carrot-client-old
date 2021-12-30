import { setTile } from "./movement";
import { getWolves } from "./selectors";

export const doSetPlayerMoves = (moves, game) => (
    { ...game, moves: moves }
);

export const doAddWolfMoves = (num, game) => (
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

export const doChangeHp = (coord, dHp, game) => {
    const entity = game.grid[coord.y][coord.x].entity;
    const checkHp = entity.hp + dHp;
    const newHp = checkHp > entity.maxHp
        ? entity.maxHp
        : checkHp;
    
    const setHp = (game) => (
        doSetHp(coord, newHp, game)
    );

    const toggleGameOver = (game) => (
        doToggleGameOver(game)
    );

    const addFences = (game) => (
        changePlayerFences(1, game)
    );

    const removeEntity = (game) => (
        setTile({ x: coord.x, y: coord.y }, 'grass', game)
    );

    const baseChanges = [setHp];
    const stateChanges = entity.type === 'player' && checkHp <= 0
        ? [...baseChanges, toggleGameOver]
        : entity.type === 'tree' && checkHp <= 0
            ? [...baseChanges, addFences, removeEntity]
            : (entity.type === 'wolf' || entity.type === 'fence') && checkHp <= 0
                ? [...baseChanges, removeEntity]
                : baseChanges

    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), game);
};

const doSetHp = (coord, hp, game) => (
    { ...game, grid: 
        game.grid.map((row, Yindex) => (
            row.map((tile, Xindex) => (
                Xindex === coord.x && Yindex === coord.y
                    ? {
                        ...tile, 
                        entity: {
                            ...tile.entity,
                            hp: hp,
                        },
                    }
                    : tile
            ))
        ))
    }
);

const changePlayerFences = (dFences, game) => (
    game.inventoryFences < game.maxHeldFences
        ? { ...game, inventoryFences: game.inventoryFences + dFences }
        : game
);  

export const doSetXp = (xp, game) => {
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

const doSetLevel = (level, game) => (
    { ...game, level: level }
);

const doToggleGameOver = (game) => (
    { ...game, gameOver: !game.gameOver }
);

export const doCheckForDeath = (game) => {
    return { ...game, grid: 
        game.grid.map((row) => (
            row.map((tile) => (
                tile.entity.hp <= 0
                    ? 
                        {
                            ...tile, 
                            entity: {
                                type: 'grass',
                            },
                        }
                    : tile
            ))
        ))
    }
};

export const setPocketItem = (id, game) => (
    { ...game, pocketItem: id }
);

/*export const updateLog = (gameEvent, game) => (
    { ...game, log: [...game.log, gameEvent] }
);*/