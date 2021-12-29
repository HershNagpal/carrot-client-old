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

export const doChangeHp = (game, coord, dHp) => {
    const entity = game.grid[coord.y][coord.x].entity;
    const checkHp = entity.hp + dHp;
    const newHp = checkHp > entity.maxHp
        ? entity.maxHp
        : checkHp;

    if (entity.type === 'player' && checkHp <= 0) {
        return toggleGameOver(game);
    }
    
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

const toggleGameOver = (game) => (
    { ...game, gameOver: !game.gameOver }
);

export const doCheckForDeath = (game) => (
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

/*export const updateLog = (gameEvent, game) => (
    { ...game, log: [...game.log, gameEvent] }
);*/