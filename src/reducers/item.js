import * as constants from '../constants';
import { getPlayerCoord, getPlayerTile } from './selectors';
import { setTile, setTileEntity } from './movement';
import { newCoordInDirection, isOutOfBounds } from './moveHelpers';
import { doChangeHp, doSetXp } from './setters';

export const doUseSuperCarrot = (game) => {
    const id = game.inventorySuperCarrot;
    
    switch (id) {
        case 1:
            return carrotOfRiddles(game);
        case 2:
            return vowedMithrilSpellCarrot(game);
        case 3:
            return relentlessSteelCarrot(game);
        case 4:
            return lifesLimit(game);
        case 9:
            return betterOmen(game);
        default:
            return carrotOfRiddles(game);
    }
};

export const doUnequipSuperCarrot = (game) => (
    { ...game, inventorySuperCarrot: 0 }
);

const carrotOfRiddles = (game) => game;

const betterOmen = (game) => {
    const playerCoord = getPlayerCoord();
    console.log(playerCoord)
    return doChangeHp(playerCoord, -getPlayerTile(game.grid).entity.maxHp * constants.betterOmenHealAmount, game);
};

const vowedMithrilSpellCarrot = (game) => {
    const { x, y } = getPlayerCoord(game.grid);
    const coord = randomGrassLocation(game);

    const spawnPlayer =     (game) => setTileEntity({ x: coord.x, y: coord.y }, game.grid[y][x], game);
    const removePlayer =    (game) => setTile({ x: x, y: y }, 'grass', game);

    const stateChanges = [spawnPlayer, removePlayer]
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), game);
};

const relentlessSteelCarrot = (game, damage=constants.itemDict[game.inventoryWeapon].damage) => {
    const playerCoord = getPlayerCoord(game.grid);
    const coordsBeingHit = [
        newCoordInDirection(playerCoord.x, playerCoord.y, 'w'),
        newCoordInDirection(playerCoord.x, playerCoord.y, 'a'),
        newCoordInDirection(playerCoord.x, playerCoord.y, 's'),
        newCoordInDirection(playerCoord.x, playerCoord.y, 'd'),
    ].filter((coord) => (
        !isOutOfBounds(coord.x, coord.y) &&
        (game.grid[coord.y][coord.x].entity.type === 'wolf' || 
        game.grid[coord.y][coord.x].entity.type === 'fence' ||
        game.grid[coord.y][coord.x].entity.type === 'tree')
    ));

    return coordsBeingHit.reduce((a, coord) => (
        doChangeHp({ x: coord.x, y: coord.y }, -(damage * constants.relentlessSteelCarrotMultiplier), a)
    ), game);
}

const lifesLimit = (game) => {
    const { x, y } = getPlayerCoord(game.grid);
    /*const damageToDeal = game.grid[y][x].entity.hp > game.grid[y][x].entity.maxHp / 2
        ? Math.floor(game.grid[y][x].entity.maxHp * 0.5)
        : game.grid[y][x].entity.hp - 1;*/
    const damageToDeal = game.grid[y][x].entity.hp - 1;
    const xpGain = damageToDeal * constants.lifesLimitDamageXpMultiplier;
    
    const increaseXp =      (game) => doSetXp(game.xp + xpGain, game);
    const damagePlayer =    (game) => doChangeHp({ x: x, y: y }, -damageToDeal, game);

    const stateChanges = [increaseXp, damagePlayer]
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), game);
};

const randomGrassLocation = (game) => {
    while (true) {
        const x = Math.floor(Math.random() * constants.gridX);
        const y = Math.floor(Math.random() * constants.gridY);
        if (game.grid[y][x].entity.type === 'grass') {
            return { x: x, y: y };
        }
    }
};

export const doPlaceFence = (coord, game) => {
    const fenceTile = {
        coord: { x: coord.x, y: coord.y }, 
        entity: { type: 'fence', hp: game.fenceHp, maxHp: game.fenceHp }
    };
    return setTileEntity({ x: coord.x, y: coord.y }, fenceTile, game)
}