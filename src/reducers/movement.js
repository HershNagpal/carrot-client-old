import * as constants from '../constants';
import { getPlayerCoords, getWolves } from './selectors';
import { doAddWolfMoves, doChangeHp, doSetPocketItem, doUpdateFound } from './setters';
import { doSpawnWolves } from './spawn';
import { checkMove, newCoordinatesInDirection, isOutOfBounds, getWolfDirection, reflectPosition, isPlayerNear } from './moveHelpers';

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
    const moveWolves = (game) => (
        wolfAI(game)
    );
    const spawnWolves = (game) => (
        doSpawnWolves(game)
    );
    const addWolfMoves = (game) => (
        doAddWolfMoves(1, game)
    );

    const stateChanges = [moveWolves, spawnWolves, addWolfMoves];
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), game);

};

const doWolfMove = (wolfTile, direction, game) => {
    const { newX, newY } = newCoordinatesInDirection(wolfTile.coords.x, wolfTile.coords.y, direction);
    if (!isOutOfBounds(newX, newY) && checkMove(game.grid[newY][newX])) {
        const spawnWolf = (game) => (
            setTileEntity({ x: newX, y: newY }, wolfTile, game)
        );
        const removeWolf = (game) => (
            setTile({ x: wolfTile.coords.x, y: wolfTile.coords.y }, 'grass', game)
        );

        const stateChanges = [spawnWolf, removeWolf];
        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
    }
    return game;
};

const doWolfAttack = (wolfTile, direction, game) => {
    const { newX, newY } = newCoordinatesInDirection(wolfTile.coords.x, wolfTile.coords.y, direction);
    return !isOutOfBounds(newX, newY) 
        ? doChangeHp({ x: newX, y: newY }, -wolfTile.entity.attack, game)
        : game
};

const wolfAI = (game) => {
    const wolfTiles = getWolves(game.grid);

    return wolfTiles.reduce((a, wolfTile) => {
        switch (wolfTile.entity.wolfType) {
            case 'timid':  
                return timidWolfAI(wolfTile, a); 
            case 'stupid':
                return stupidWolfAI(wolfTile, a);
            default:
                break;
        }
        return a;
    }, game);
};

const stupidWolfAI = (wolfTile, game) => {
    const directions = ['w', 'a', 's', 'd'];
    const directionToMove = directions[Math.floor(Math.random()*directions.length)];
    return doWolfMove(wolfTile, directionToMove, game);
}

const timidWolfAI = (wolfTile, game) => {
    const playerCoords = getPlayerCoords(game.grid);
    const playerDirection = isPlayerNear(wolfTile, game);

    if (playerDirection) {
        return doWolfAttack(wolfTile, playerDirection, game);
    } else {
        const reflectPos = reflectPosition({ x: playerCoords.x, y: playerCoords.y }, { x: Math.floor(constants.gridX / 2), y: Math.floor(constants.gridY / 2) });
        const direction = Math.floor(Math.random() * constants.wolfRetreatChance) === 0
            ? getWolfDirection(reflectPos.x, reflectPos.y, wolfTile, game.grid)
            : getWolfDirection(playerCoords.x, playerCoords.y, wolfTile, game.grid);
            return doWolfMove(wolfTile, direction, game);
    }
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
