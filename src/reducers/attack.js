import * as constants from '../constants';
import { isOutOfBounds, newCoordInDirection, rotateDirection } from "./moveHelpers";
import { getPlayerCoord } from "./selectors";
import { doChangeHp, doSetPlayerMoves } from "./setters";
import { doSpawnCarrots } from "./spawn";
import { doUpdateWolves } from "./movement";
import { log } from "./log";

export const spearAttack = (game) => {
    const playerCoord = getPlayerCoord(game.grid);
    const coordBeingHit1 = newCoordInDirection(playerCoord.x, playerCoord.y, game.direction);
    const coordBeingHit2 = newCoordInDirection(coordBeingHit1.x, coordBeingHit1.y, game.direction);

    const validAttackTiles = [coordBeingHit1, coordBeingHit2].filter( (coordBeingHit) => {
        if (isOutOfBounds(coordBeingHit.x, coordBeingHit.y)) { return false; }
        const entityBeingHitType = game.grid[coordBeingHit.y][coordBeingHit.x].entity.type;
        return (entityBeingHitType === 'wolf' || entityBeingHitType === 'fence' || entityBeingHitType === 'tree');
    });

    return validAttackTiles.reduce( (a, coordBeingHit, index) => {
        const entityBeingHit = game.grid[coordBeingHit.y][coordBeingHit.x].entity;
        if (entityBeingHit.type === 'wolf' || entityBeingHit.type === 'fence' || entityBeingHit.type === 'tree') {
            const weapon = constants.itemDict[a.inventoryWeapon];
            const damageToDeal = index === validAttackTiles.length - 1 
                ? constants.spearTipMultiplier * weapon.damage
                : weapon.damage;

            const entityBeingHit = game.grid[coordBeingHit.y][coordBeingHit.x].entity;
            const reduceHp =        (a) => doChangeHp({ x: coordBeingHit.x, y: coordBeingHit.y }, -damageToDeal , a);
            const logAttack =       (a) => log({ type: 'ATTACK', payload: { attacker: 'player', target: entityBeingHit.type, damage: damageToDeal}}, a);

            const addMove =         (a) => doSetPlayerMoves(a.moves + 1, a);
            const spawnCarrots =    (a) => doSpawnCarrots(a);
            const updateWolves =    (a) => doUpdateWolves(a);

            const baseChanges = [reduceHp, logAttack];
            const stateChanges = index === validAttackTiles.length - 1
                ?  [...baseChanges, addMove, spawnCarrots, updateWolves]
                :  baseChanges;

            return stateChanges.reduce((b, stateChange) => (
                stateChange(b)
            ), a);
        }
        return a; 
    }, game);
};

export const axeAttack = (game) => {
    const playerCoord = getPlayerCoord(game.grid);
    const coordBeingHit1 = newCoordInDirection(playerCoord.x, playerCoord.y, game.direction);
    const coordBeingHit2 = newCoordInDirection(coordBeingHit1.x, coordBeingHit1.y, rotateDirection(game.direction, 'cw'));

    const validAttackTiles = [coordBeingHit1, coordBeingHit2].filter( (coordBeingHit) => {
        if (isOutOfBounds(coordBeingHit.x, coordBeingHit.y)) { return false; }
        const entityBeingHitType = game.grid[coordBeingHit.y][coordBeingHit.x].entity.type;
        return entityBeingHitType === 'wolf' || entityBeingHitType === 'fence' || entityBeingHitType === 'tree' ;
    });

    return validAttackTiles.reduce( (a, coordBeingHit, index) => {
        const entityBeingHit = game.grid[coordBeingHit.y][coordBeingHit.x].entity;
        if (entityBeingHit.type === 'wolf' || entityBeingHit.type === 'fence' || entityBeingHit.type === 'tree') {
            const damageMultiplier = entityBeingHit.type === 'tree' || entityBeingHit.type === 'fence' ? constants.axeWoodcuttingMultiplier : 1;
            const reduceHp =        (a) => doChangeHp({ x: coordBeingHit.x, y: coordBeingHit.y }, -constants.itemDict[a.inventoryWeapon].damage * damageMultiplier, a);
            const logAttack =       (a) => log({ type: 'ATTACK', payload: { attacker: 'player', target: entityBeingHit.type, damage: constants.itemDict[a.inventoryWeapon].damage}}, a);

            const addMove =         (a) => doSetPlayerMoves(a.moves + 1, a);
            const spawnCarrots =    (a) => doSpawnCarrots(a);
            const updateWolves =    (a) => doUpdateWolves(a);

            const baseChanges = [reduceHp, logAttack];
            const stateChanges = index === validAttackTiles.length - 1
                ?  [...baseChanges, addMove, spawnCarrots, updateWolves]
                :  baseChanges;

            return stateChanges.reduce((b, stateChange) => (
                stateChange(b)
            ), a);
        }
        return a; 
    }, game);
};

export const bladeAttack = (game) => {
    const playerCoord = getPlayerCoord(game.grid);
    const coordBeingHit = newCoordInDirection(playerCoord.x, playerCoord.y, game.direction);
    const entityBeingHit = game.grid[coordBeingHit.y][coordBeingHit.x].entity;

    if (entityBeingHit.type === 'wolf' || entityBeingHit.type === 'fence' || entityBeingHit.type === 'tree') {
        const reduceHp =        (game) => doChangeHp({ x: coordBeingHit.x, y: coordBeingHit.y }, -constants.itemDict[game.inventoryWeapon].damage , game);
        const logAttack =       (game) => log({ type: 'ATTACK', payload: { attacker: 'player', target: entityBeingHit.type, damage: constants.itemDict[game.inventoryWeapon].damage}}, game);
        const addMove =         (game) => doSetPlayerMoves(game.moves + 1, game);
        const spawnCarrots =    (game) => doSpawnCarrots(game);
        const updateWolves =    (game) => doUpdateWolves(game);

        const stateChanges = [reduceHp, logAttack, addMove, spawnCarrots, updateWolves];
        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
    } 
    return game;
};