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

export const spawnFence = (num, game, hp=3) => {
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
            ? { ...tile, entity: { type: 'fence', hp: hp, maxHp: hp } }
            : tile
        ))
    ))};
}

export const spawnTree = (num, game, hp=5) => {
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
            ? { ...tile, entity: { type: 'tree', hp: hp, maxHp: hp } }
            : tile
        ))
    ))};
}


export const spawnWolf = (num, game, hp=3) => {
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
            ? { ...tile, entity: { type: 'wolf', hp: hp, maxHp: hp, attack: 1, moves: 0, maxMoves: 100 } }
            : tile
        ))
    ))};
};

export const doSpawnWolves = (game) => {
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

export const doSpawnCarrots = (game) => {
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