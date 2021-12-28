import * as constants from '../constants';
import { getPlayerCoords } from './selectors';
import { doSetPlayerMoves, doChangeHp, doSetXp, doCheckForDeath } from './setters';
import { spawnPlayer, spawnCarrot, spawnFence, spawnTree, doSpawnCarrots } from './spawn';
import { setTile, setTileEntity, doUpdateWolves } from './movement';
import { checkMove, newCoordinatesInDirection, isOutOfBounds } from './moveHelpers';

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
            setTileEntity({ x: newX, y: newY, newTile: game.grid[y][x] }, game)
        );
        const removePlayer = (game) => (
            setTile({ x: x, y: y, newTile: 'grass' }, game)
        );
        const setPlayerMoves = (game) => (
            doSetPlayerMoves(game.moves + 1, game)
        );
        const spawnCarrots = (game) => (
            doSpawnCarrots(game)
        );
        const updateWolves = (game) => (
            doUpdateWolves(game)
        );
        const setXp = (game) => (
            doSetXp(game.xp + 1, game)
        );
        const setHp = (game) => (
            doChangeHp(game, { x: newX, y: newY }, game.carrotHealing)
        );
        
        const baseChanges = [spawnPlayer, removePlayer, setPlayerMoves, spawnCarrots, updateWolves];
        const stateChanges = game.grid[newY][newX].entity.type === 'carrot'
            ? [...baseChanges, setXp, setHp]
            : baseChanges; 

        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
    }
    return game;
};

const setDirection = (direction, game) => {
    switch (direction) {
        case 'ArrowUp':
            return { ...game, direction: 'w' };
        case 'ArrowDown':
            return { ...game, direction: 's' };
        case 'ArrowLeft':
            return { ...game, direction: 'a' };
        case 'ArrowRight':
            return { ...game, direction: 'd' };
        default:
            return { ...game, direction: direction  };
    }
};

const attack = (game) => {
    const playerTile = getPlayerCoords(game.grid);
    const tileBeingHit = newCoordinatesInDirection(playerTile.x, playerTile.y, game.direction);
    const entityBeingHit = game.grid[tileBeingHit.newY][tileBeingHit.newX].entity;

    if (entityBeingHit.type === 'wolf' || entityBeingHit.type === 'fence' || entityBeingHit.type === 'tree') {
        const reduceHp = (game) => (
            doChangeHp(game, { x: tileBeingHit.newX, y: tileBeingHit.newY }, -game.attack)
        );
        const checkForDeath = (game) => (
            doCheckForDeath(game, tileBeingHit)
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

        const stateChanges = [reduceHp, checkForDeath, addMove, spawnCarrots, updateWolves];
        return stateChanges.reduce((a, stateChange) => (
            stateChange(a)
        ), game);
    } 
    
    return game;
};

export default game;