import * as constants from '../constants';
import { getPlayerCoord, getWolfTiles } from './selectors';
import { doAddWolfMoves, doChangeHp, doSetPocketItem, doUpdateFound } from './setters';
import { doSpawnWolves } from './spawn';
import { checkMove, newCoordInDirection, isOutOfBounds, getAggressiveWolfDirection, reflectPosition, isPlayerNear } from './moveHelpers';
import { log } from './log';

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
    const moveWolves =      (game) => wolfAI(game);
    const spawnWolves =     (game) => doSpawnWolves(game);
    const addWolfMoves =    (game) => doAddWolfMoves(1, game);

    const stateChanges = [moveWolves, spawnWolves, addWolfMoves];
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), game);

};

const doWolfMove = (wolfTile, direction, game) => {
    const { x, y } = newCoordInDirection(wolfTile.coord.x, wolfTile.coord.y, direction);
    if (!isOutOfBounds(x, y) && checkMove(game.grid[y][x])) {
        const spawnWolf =   (game) => setTileEntity({ x: x, y: y }, wolfTile, game);
        const removeWolf =  (game) => setTile({ x: wolfTile.coord.x, y: wolfTile.coord.y }, 'grass', game);

        const stateChanges = [spawnWolf, removeWolf];
        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
    }
    return game;
};

const doWolfAttack = (wolfTile, direction, game) => {
    const { x, y } = newCoordInDirection(wolfTile.coord.x, wolfTile.coord.y, direction);

    const doDamage = (game) => doChangeHp({ x: x, y: y }, -wolfTile.entity.damage, game);
    const logAttack = (game) => log({ type: 'ATTACK', payload: { attacker: wolfTile.entity.type, target: game.grid[y][x].entity.type, damage: wolfTile.entity.damage}}, game);

    const stateChanges = [doDamage, logAttack];
    return !isOutOfBounds(x, y) 
        ? stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game)
        : game;
};

const doWolfAttackMove = (wolfTile, direction, game) => {
    const { x, y } = newCoordInDirection(wolfTile.coord.x, wolfTile.coord.y, direction);
    const playerDirection = isPlayerNear({ x: wolfTile.coord.x, y: wolfTile.coord.y }, game);
    
    if (playerDirection) {
        return doWolfAttack(wolfTile, playerDirection, game);
    }   if (!isOutOfBounds(x, y) && game.grid[y][x].entity.type === 'fence') {
        return doWolfAttack(wolfTile, direction, game);
    } else if (!isOutOfBounds(x, y) && checkMove(game.grid[y][x])) {
        const playerNewDirection = isPlayerNear({ x: x, y: y }, game);        

        const spawnWolf =   (game) => setTileEntity({ x: x, y: y }, wolfTile, game);
        const removeWolf =  (game) => setTile({ x: wolfTile.coord.x, y: wolfTile.coord.y }, 'grass', game);
        const wolfAttack =  (game) => doWolfAttack({ ...wolfTile, coord: { x: x, y: y } }, playerNewDirection, game);

        const baseChanges = [spawnWolf, removeWolf];
        const stateChanges = playerNewDirection
            ? [...baseChanges, wolfAttack]
            : baseChanges;
        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
    }
    return game;
};

const wolfAI = (game) => {
    const wolfTiles = getWolfTiles(game.grid);

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
    const directionToMove = directions[Math.floor(Math.random() * directions.length)];
    return doWolfMove(wolfTile, directionToMove, game);
}

const timidWolfAI = (wolfTile, game) => {
    const playerCoord = getPlayerCoord(game.grid);

    const reflectPos = reflectPosition({ x: playerCoord.x, y: playerCoord.y }, { x: Math.floor(constants.gridX / 2), y: Math.floor(constants.gridY / 2) });
    const direction = Math.floor(Math.random() * constants.wolfRetreatChance) === 0
        ? getAggressiveWolfDirection(reflectPos.x, reflectPos.y, wolfTile, game.grid)
        : getAggressiveWolfDirection(playerCoord.x, playerCoord.y, wolfTile, game.grid);
    return doWolfAttackMove(wolfTile, direction, game);
};

export const doCheckSuperCarrotPickup = (game) => {
    if (Math.floor(Math.random() * constants.superCarrotChance) === 0) {
        const itemId = Math.floor(Math.random() * (constants.itemDict.length - 1) + 1);

        const setPocketItem =   (game) => doSetPocketItem(itemId, game);
        const updateFound =     (game) => doUpdateFound(itemId, game);
        const updateLog =       (game) => log({ type: 'GET_ITEM', payload: { itemId: itemId } }, game);
        
        const stateChanges = [setPocketItem, updateFound, updateLog];
        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
    } else {
        return game;
    }
};
