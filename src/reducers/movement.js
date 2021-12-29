import { getPlayerCoords, getWolves } from './selectors';
import { doAddWolfMoves, doChangeHp } from './setters';
import { doSpawnWolves } from './spawn';
import { checkMove, newCoordinatesInDirection, isOutOfBounds, getWolfDirection } from './moveHelpers';

export const setTile = (coord, game) => (
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

export const setTileEntity = (coord, game) => (
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

export const doUpdateWolves = (game) => {
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

const doCheckWolfAttacks = (game) => {
    const playerCoords = getPlayerCoords(game.grid);
    const locationsAroundPlayer = [
        newCoordinatesInDirection(playerCoords.x, playerCoords.y, 'w'),
        newCoordinatesInDirection(playerCoords.x, playerCoords.y, 'a'),
        newCoordinatesInDirection(playerCoords.x, playerCoords.y, 's'),
        newCoordinatesInDirection(playerCoords.x, playerCoords.y, 'd'),
    ];
    
    return locationsAroundPlayer.reduce((a, coord) => (
        !isOutOfBounds(coord.newX, coord.newY) && a.grid[coord.newY][coord.newX].entity.type === 'wolf'
            ? doChangeHp(a, {x: playerCoords.x, y: playerCoords.y}, -a.grid[coord.newY][coord.newX].entity.attack)
            : a
    ), game);
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