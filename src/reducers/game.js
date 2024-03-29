import * as constants from '../constants';
import { getPlayerCoord, getCoords } from './selectors';
import { doSetPlayerMoves, doChangeHp, doSetXp, doSetTotalCarrots, doUpdateUsed, doSetName, doSetHand } from './setters';
import { spawnPlayer, spawnCarrot, spawnFence, spawnTree, doSpawnCarrots, doSpawnTrees } from './spawn';
import { setTile, setTileEntity, doUpdateWolves, doCheckSuperCarrotPickup } from './movement';
import { checkMove, newCoordInDirection, isOutOfBounds } from './moveHelpers';
import { doUseSuperCarrot, doUnequipSuperCarrot, doPlaceFence } from './item';
import { bladeAttack, axeAttack, spearAttack } from './attack';

const game = (game = constants.defaultGame, action) => {
    switch (action.type) {
        case 'INIT_GRID':
            return initGrid(game);

        case 'MOVE_PLAYER':
            return movePlayer(action.payload, game);

        case 'SET_DIRECTION':
            return setDirection(action.payload, game);

        case 'ATTACK':
            return attack(game);

        case 'CONSUME_SUPER_CARROT':
            return consumeSuperCarrot(game);

        case 'SWAP_POCKET':
            return swapPocket(game);
        
        case 'PLACE_FENCE':
            return placeFence(game);

        case 'CREATE_CHARACTER':
            return createCharacter(action.payload, game);

        case 'TOGGLE_INVENTORY':
            return { ...game, isInInventory: !game.isInInventory };

        case 'TOGGLE_COLLECTION':
            return { ...game, collectionSelect: game.collection.find((item) => item.found > 0).id, isInCollection: !game.isInCollection };

        case 'COLLECTION_SELECT':
            return { ...game, collectionSelect: action.payload };

        default:
            return game;
    }
};

const initGrid = (game) => {
    const spawnPlayers =    (newGame) => spawnPlayer({ x: constants.playerStart.x, y: constants.playerStart.y }, constants.playerStartHp, newGame);
    const spawnCarrots =    (newGame) => spawnCarrot(constants.carrotCap, newGame);
    const spawnFences =     (newGame) => spawnFence(constants.fenceSpawn, newGame);
    const spawnTrees =      (newGame) => spawnTree(constants.treeCap, newGame);
    const setName =         (newGame) => doSetName(game.name, newGame);
    const setHand =         (newGame) => doSetHand(game.hand, newGame);

    const stateChanges = [spawnPlayers, spawnCarrots, spawnFences, spawnTrees, setName, setHand];
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), constants.defaultGame);
};

const movePlayer = (direction, game) => {
    const playerCoord = getPlayerCoord(game.grid);
    const newCoord = newCoordInDirection(playerCoord.x, playerCoord.y, direction);

    if (!isOutOfBounds(newCoord.x, newCoord.y) && checkMove(game.grid[newCoord.y][newCoord.x])) {
        const spawnPlayer =             (game) => setTileEntity({ x: newCoord.x, y: newCoord.y }, game.grid[playerCoord.y][playerCoord.x], game);
        const removePlayer =            (game) => setTile({ x: playerCoord.x, y: playerCoord.y }, 'grass', game);
        const setPlayerMoves =          (game) => doSetPlayerMoves(game.moves + 1, game);
        const spawnCarrots =            (game) => doSpawnCarrots(game);
        const spawnTrees =              (game) => doSpawnTrees(game);
        const updateWolves =            (game) => doUpdateWolves(game);
        const setXp =                   (game) => doSetXp(game.xp + 1, game);
        const addTotalCarrots =         (game) => doSetTotalCarrots(game.totalCarrots + 1, game);
        const heal =                    (game) => doChangeHp({ x: newCoord.x, y: newCoord.y }, game.carrotHealing, game);
        const checkSuperCarrotPickup =  (game) => doCheckSuperCarrotPickup(game);
        
        const baseChanges = [spawnPlayer, removePlayer, setPlayerMoves, spawnCarrots, spawnTrees, updateWolves];
        const stateChanges = game.grid[newCoord.y][newCoord.x].entity.type === 'carrot'
            ? [...baseChanges, setXp, addTotalCarrots, heal, checkSuperCarrotPickup]
            : baseChanges; 

        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
    }
    return game;
};

const setDirection = (direction, game) => {
    switch (direction) {
        case 'arrowup':
            return { ...game, direction: 'w' };
        case 'arrowdown':
            return { ...game, direction: 's' };
        case 'arrowleft':
            return { ...game, direction: 'a' };
        case 'arrowright':
            return { ...game, direction: 'd' };
        default:
            return { ...game, direction: direction };
    }
};

const attack = (game) => {
    switch (constants.itemDict[game.inventoryWeapon].weaponType) {
        case 'blade':
            return bladeAttack(game);        
        case 'axe':
            return axeAttack(game);
        case 'spear':
            return spearAttack(game);
        default:
            return game;
    }
};

const consumeSuperCarrot = (game) => {
    if (game.inventorySuperCarrot === 0) { return game; }

    const useSuperCarrot =      (game) => doUseSuperCarrot(game);
    const updateUsed =          (game) => doUpdateUsed(game.inventorySuperCarrot, game);
    const unequipSuperCarrot =  (game) => doUnequipSuperCarrot(game);
    const setPlayerMoves =      (game) => doSetPlayerMoves(game.moves + 1, game);
    const spawnCarrots =        (game) => doSpawnCarrots(game);
    const spawnTrees =          (game) => doSpawnTrees(game);
    const updateWolves =        (game) => doUpdateWolves(game);

    const stateChanges = [useSuperCarrot, updateUsed, unequipSuperCarrot, setPlayerMoves, spawnCarrots, spawnTrees, updateWolves];
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), game);
};

const swapPocket = (game) => (
    constants.itemDict[game.pocketItem].type === 'weapon'
        ? { ...game, pocketItem: game.inventoryWeapon, inventoryWeapon: game.pocketItem }
        : { ...game, pocketItem: game.inventorySuperCarrot, inventorySuperCarrot: game.pocketItem }
);

const placeFence = (game) => {
    const playerCoord = getPlayerCoord(game.grid);
    const coordBeingPlacedOn = newCoordInDirection(playerCoord.x, playerCoord.y, game.direction);
    if (
        !isOutOfBounds(coordBeingPlacedOn.x, coordBeingPlacedOn.y) &&
        game.grid[coordBeingPlacedOn.y][coordBeingPlacedOn.x].entity.type === 'grass' &&
        game.inventoryFences > 0 &&
        getCoords('fence', game.grid).length < constants.fenceCap
    ) {
        const placeFence =      (game) => doPlaceFence({ x: coordBeingPlacedOn.x, y: coordBeingPlacedOn.y }, game);
        const reduceFences =    (game) => ({ ...game, inventoryFences: game.inventoryFences - 1 });
        const addMove =         (game) => doSetPlayerMoves(game.moves + 1, game);
        const spawnCarrots =    (game) => doSpawnCarrots(game);
        const updateWolves =    (game) => doUpdateWolves(game);

        const stateChanges = [placeFence, reduceFences, addMove, spawnCarrots, updateWolves];
        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
    } 
    
    return game;
};

const createCharacter = (payload, game) => {
    const setName = (game) => doSetName(payload.name, game);
    const setHand = (game) => doSetHand(payload.hand, game);

    const stateChanges = [setName, setHand];
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), game);
};

export default game;