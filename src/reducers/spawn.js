import * as constants from '../constants';
import { getTile } from './selectors';
import { wolfSpawnCoords } from './moveHelpers';

export const spawnPlayer = (coord, hp, game) => (
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

export const spawnCarrot = (num, game) => {
    const arr = Array(num).fill(0);
    const coords = arr.reduce((a) => {
        while (true) {
            const x = Math.floor(Math.random() * constants.gridX);
            const y = Math.floor(Math.random() * constants.gridY);
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

export const spawnFence = (num, game) => {
    const arr = Array(num).fill(0);
    const coords = arr.reduce((a) => {
        while (true) {
            const x = Math.floor(Math.random() * constants.gridX);
            const y = Math.floor(Math.random() * constants.gridY);
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
            ? { ...tile, entity: { type: 'fence', hp: game.fenceHp, maxHp: game.fenceHp } }
            : tile
        ))
    ))};
}

export const spawnTree = (num, game, hp=5) => {
    const arr = Array(num).fill(0);
    const coords = arr.reduce((a) => {
        while (true) {
            const x = Math.floor(Math.random() * constants.gridX);
            const y = Math.floor(Math.random() * constants.gridY);
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
            ? { ...tile, entity: { type: 'tree', hp: hp, maxHp: hp } }
            : tile
        ))
    ))};
}


export const spawnWolf = (num, game) => {
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

    const wolfTypeId = Math.floor(Math.random() * (constants.wolfMap.length - 1)) + 1;
    const wolfEntity = constants.wolfMap[wolfTypeId]; // TODO: Actual levelled wolf stats

    return { ...game, grid: game.grid.map((row, Yindex) => (
        row.map((tile, Xindex) => (
            coords.find((coord) => coord.x === Xindex && coord.y === Yindex)
            ? { ...tile, entity: { type: 'wolf', wolfType: wolfEntity.name, attack: wolfEntity.baseDamage, hp: wolfEntity.baseMaxHp, maxHp: wolfEntity.baseMaxHp } }
            : tile
        ))
    ))};
};

export const doSpawnWolves = (game) => {
    const numWolves = getTile('wolf', game.grid).length;
    if (numWolves < constants.wolfCap) {
        if (Math.floor(Math.random() * constants.wolfSpawnRate) === 0) {
            return spawnWolf(1, game);
        } else {
            return game;
        }
    } else {
        return game;
    }
};

export const doSpawnCarrots = (game) => {
    const numCarrots = getTile('carrot', game.grid).length;
    if (numCarrots < constants.carrotCap) {
        if (Math.floor(Math.random() * constants.carrotSpawnRate) === 0) {
            return spawnCarrot(1, game);
        } else {
            return game;
        }
    } else {
        return game;
    }
};

export const doSpawnTrees = (game) => {
    const numTrees = getTile('tree', game.grid).length;
    if (numTrees < constants.treeCap) {
        if (Math.floor(Math.random() * constants.treeSpawnRate) === 0) {
            return spawnTree(1, game);
        } else {
            return game;
        }
    } else {
        return game;
    }
};