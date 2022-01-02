import * as constants from '../constants';
import { getPlayerCoords, getTile } from './selectors';
import { doSetPlayerMoves, doChangeHp, doSetXp } from './setters';
import { spawnPlayer, spawnCarrot, spawnFence, spawnTree, doSpawnCarrots, doSpawnTrees } from './spawn';
import { setTile, setTileEntity, doUpdateWolves, doCheckSuperCarrotPickup } from './movement';
import { checkMove, newCoordinatesInDirection, isOutOfBounds } from './moveHelpers';
import { doUseSuperCarrot, doUnequipSuperCarrot, doPlaceFence } from './item';

const game = (game = constants.defaultGame, action) => {
    switch (action.type) {
        case 'INIT_GRID':
            return initGrid();

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

        case 'TOGGLE_INVENTORY':
            return { ...game, isInInventory: !game.isInInventory };

        case 'TOGGLE_COLLECTION':
            return { ...game, isInCollection: !game.isInCollection };

        case 'COLLECTION_SELECT':
            return { ...game, collectionSelect: action.payload };

        default:
            return game;
    }
};

const initGrid = () => {
    const spawnPlayers = (game) => (
        spawnPlayer({ x: constants.playerStart.x, y: constants.playerStart.y }, constants.playerStartHp, game)
    );
    const spawnCarrots = (game) => (
        spawnCarrot(10, game)
    );
    const spawnFences = (game) => (
        spawnFence(10, game)
    );
    const spawnTrees = (game) => (
        spawnTree(10, game)
    );

    const stateChanges = [spawnPlayers, spawnCarrots, spawnFences, spawnTrees];
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), constants.defaultGame);
};

const movePlayer = (direction, game) => {
    const { x, y } = getPlayerCoords(game.grid);
    const { newX, newY } = newCoordinatesInDirection(x, y, direction);

    if (!isOutOfBounds(newX, newY) && checkMove(game.grid[newY][newX])) {
        const spawnPlayer = (game) => (
            setTileEntity({ x: newX, y: newY }, game.grid[y][x], game)
        );
        const removePlayer = (game) => (
            setTile({ x: x, y: y }, 'grass', game)
        );
        const setPlayerMoves = (game) => (
            doSetPlayerMoves(game.moves + 1, game)
        );
        const spawnCarrots = (game) => (
            doSpawnCarrots(game) 
        );
        const spawnTrees = (game) => (
            doSpawnTrees(game)
        );
        const updateWolves = (game) => (
            doUpdateWolves(game)
        );
        const setXp = (game) => (
            doSetXp(game.xp + 1, game)
        );
        const heal = (game) => (
            doChangeHp({ x: newX, y: newY }, game.carrotHealing, game)
        );
        const checkSuperCarrotPickup = (game) => (
            doCheckSuperCarrotPickup(game)
        );
        
        const baseChanges = [spawnPlayer, removePlayer, setPlayerMoves, spawnCarrots, spawnTrees, updateWolves];
        const stateChanges = game.grid[newY][newX].entity.type === 'carrot'
            ? [...baseChanges, setXp, heal, checkSuperCarrotPickup]
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
    const playerTile = getPlayerCoords(game.grid);
    const tileBeingHit = newCoordinatesInDirection(playerTile.x, playerTile.y, game.direction);
    const entityBeingHit = game.grid[tileBeingHit.newY][tileBeingHit.newX].entity;

    if (entityBeingHit.type === 'wolf' || entityBeingHit.type === 'fence' || entityBeingHit.type === 'tree') {
        const reduceHp = (game) => (
            doChangeHp({ x: tileBeingHit.newX, y: tileBeingHit.newY }, -constants.itemDict[game.inventoryWeapon].damage , game)
        );
        const addMove = (game) => (
            doSetPlayerMoves(game.moves + 1, game)
        );
        const spawnCarrots = (game) => (
            doSpawnCarrots(game)
        );
        const updateWolves = (game) => (
            doUpdateWolves(game)
        );

        const stateChanges = [reduceHp, addMove, spawnCarrots, updateWolves];
        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
    } 
    
    return game;
};

const consumeSuperCarrot = (game) => {
    if (game.inventorySuperCarrot === 0) {
        return game;
    };

    const useSuperCarrot = (game) => (
        doUseSuperCarrot(game)
    );
    const unequipSuperCarrot = (game) => (
        doUnequipSuperCarrot(game)
    );
    const setPlayerMoves = (game) => (
        doSetPlayerMoves(game.moves + 1, game)
    );
    const spawnCarrots = (game) => (
        doSpawnCarrots(game)
    );
    const spawnTrees = (game) => (
        doSpawnTrees(game)
    );
    const updateWolves = (game) => (
        doUpdateWolves(game)
    );

    const stateChanges = [useSuperCarrot, unequipSuperCarrot, setPlayerMoves, spawnCarrots, spawnTrees, updateWolves];
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
    const playerTile = getPlayerCoords(game.grid);
    const tileBeingPlacedOn = newCoordinatesInDirection(playerTile.x, playerTile.y, game.direction);
    if (
        !isOutOfBounds(tileBeingPlacedOn.newX, tileBeingPlacedOn.newY) &&
        game.grid[tileBeingPlacedOn.newY][tileBeingPlacedOn.newX].entity.type === 'grass' &&
        game.inventoryFences > 0 &&
        getTile('fence', game.grid).length < game.maxFencesPlaced
    ) {

        const placeFence = (game) => (
            doPlaceFence({ x: tileBeingPlacedOn.newX, y: tileBeingPlacedOn.newY }, game)
        );
        const reduceFences = (game) => (
            { ...game, inventoryFences: game.inventoryFences - 1 }
        );
        const addMove = (game) => (
            doSetPlayerMoves(game.moves + 1, game)
        );
        const spawnCarrots = (game) => (
            doSpawnCarrots(game)
        );
        const updateWolves = (game) => (
            doUpdateWolves(game)
        );

        const stateChanges = [placeFence, reduceFences, addMove, spawnCarrots, updateWolves];
        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
    } 
    
    return game;
};

export default game;