import * as constants from '../constants';
import { getPlayerCoords, getWolves } from './selectors';
import { doAddWolfMoves, doChangeHp, doSetPocketItem, doUpdateFound } from './setters';
import { doSpawnWolves } from './spawn';
import { checkMove, newCoordinatesInDirection, isOutOfBounds, getWolfDirection, reflectPosition } from './moveHelpers';

export const setTile = (coord, entityType, game) => (
    { ...game, grid:
        game.grid.map((row, Yindex) => 
            coord.y === Yindex 
            ? row.map((tile, Xindex) => 
                coord.x === Xindex 
                    ? { ...tile, entity: { type: entityType } } 
                    : tile
            ) 
            : row
        )
    }
);

export const setTileEntity = (coord, newTile, game) => (
    { ...game, grid:
        game.grid.map((row, Yindex) => 
            coord.y === Yindex 
            ? row.map((tile, Xindex) => 
                coord.x === Xindex 
                    ? { ...tile, entity: newTile.entity } 
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
            ? doChangeHp({ x: playerCoords.x, y: playerCoords.y }, -a.grid[coord.newY][coord.newX].entity.attack, a)
            : a
    ), game);
};

const doMoveWolves = (game) => {
    const wolfTiles = getWolves(game.grid);
    const playerCoords = getPlayerCoords(game.grid);

    return wolfTiles.reduce((a, wolfTile) => {
        const reflectPos = reflectPosition({ x: playerCoords.x, y: playerCoords.y }, { x: Math.floor(constants.gridX / 2), y: Math.floor(constants.gridY / 2) });
        const direction = Math.floor(Math.random() * constants.wolfRetreatChance) === 0
            ? getWolfDirection(reflectPos.x, reflectPos.y, wolfTile, game.grid)
            : getWolfDirection(playerCoords.x, playerCoords.y, wolfTile, game.grid);
        
        const { newX, newY } = newCoordinatesInDirection(wolfTile.coords.x, wolfTile.coords.y, direction);

        if (!isOutOfBounds(newX, newY) && checkMove(a.grid[newY][newX])) {
            const spawnWolf = (a) => (
                setTileEntity({ x: newX, y: newY }, wolfTile, a)
            );
            const removeWolf = (a) => (
                setTile({ x: wolfTile.coords.x, y: wolfTile.coords.y }, 'grass', a)
            );

            const stateChanges = [spawnWolf, removeWolf];
            return stateChanges.reduce((a, stateChange) => (
                stateChange(a)
            ), a);
        }

        return a;
    }, game);
};

export const doCheckSuperCarrotPickup = (game) => {
    if (Math.floor(Math.random() * constants.superCarrotChance) === 0) {
        const itemId = Math.floor(Math.random() * (constants.itemDict.length - 1) + 1);

        const setPocketItem = (game) => (
            doSetPocketItem(itemId, game)
        );
        const updateFound = (game) => (
            doUpdateFound(itemId, game)
        );

        const stateChanges = [setPocketItem, updateFound];
        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
    } else {
        return game;
    }
};
