import * as constants from '../constants';
import { getPlayerCoords } from './selectors';
import { setTile, setTileEntity } from './movement';
import { newCoordinatesInDirection, isOutOfBounds } from './moveHelpers';
import { doChangeHp, doSetXp } from './setters';

export const doUseSuperCarrot = (game) => {
    const id = game.inventorySuperCarrot;
    
    switch (id) {
        case 1:
            return carrotOfRiddles(game);
        case 2:
            return randomPlayerTeleport(game);
        case 3:
            return attackAllDirections(game);
        case 4:
            return levelUp(game);
        default:
            return carrotOfRiddles(game);
    }
};

export const doUnequipSuperCarrot = (game) => (
    { ...game, inventorySuperCarrot: 0 }
);


// Carrot of Riddles lol
const carrotOfRiddles = (game) => game;

// Relentless Steel Carrot
const attackAllDirections = (game) => {
    const attack = (game) => (
        fourDirectionAttack(game)
    );

    const stateChanges = [attack]
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), game);
};

// Vowed Mithril Spell-carrot
const randomPlayerTeleport = (game) => {
    const { x, y } = getPlayerCoords(game.grid);
    const coords = randomGrassLocation(game);

    const spawnPlayer = (game) => (
        setTileEntity({ x: coords.x, y: coords.y }, game.grid[y][x], game)
    );
    const removePlayer = (game) => (
        setTile({ x: x, y: y }, 'grass', game)
    );

    const stateChanges = [ spawnPlayer, removePlayer]
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), game);
};

const levelUp = (game) => {
    const { x, y } = getPlayerCoords(game.grid);
    const damageToDeal = game.grid[y][x].entity.hp > game.grid[y][x].entity.maxHp/2
        ? Math.floor(game.grid[y][x].entity.maxHp * 0.5)
        : game.grid[y][x].entity.hp - 1;
    const xpToLevelUp = game.maxXp - game.xp;
    
    const increaseXp = (game) => (
        doSetXp(game.xp + xpToLevelUp, game)
    );
    const damagePlayer = (game) => (
        doChangeHp({x: x, y: y}, -damageToDeal, game)
    );

    const stateChanges = [ increaseXp, damagePlayer]
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

const fourDirectionAttack = (game, damage=constants.itemDict[game.inventoryWeapon].damage) => {
    const playerTile = getPlayerCoords(game.grid);
    const tilesBeingHit = [
        newCoordinatesInDirection(playerTile.x, playerTile.y, 'w'),
        newCoordinatesInDirection(playerTile.x, playerTile.y, 'a'),
        newCoordinatesInDirection(playerTile.x, playerTile.y, 's'),
        newCoordinatesInDirection(playerTile.x, playerTile.y, 'd'),
    ].filter((coord) => (
        !isOutOfBounds(coord.newX, coord.newY) &&
        (game.grid[coord.newY][coord.newX].entity.type === 'wolf' || 
        game.grid[coord.newY][coord.newX].entity.type === 'fence' ||
        game.grid[coord.newY][coord.newX].entity.type === 'tree')
    ));

    return tilesBeingHit.reduce((a, tile) => (
        doChangeHp({ x: tile.newX, y: tile.newY }, -(damage * 3), a)
    ), game);
}

export const doPlaceFence = (coord, game) => {
    const fenceTile = {
        coords: { x: coord.x, y: coord.y }, 
        entity: { type: 'fence', hp: game.fenceHp, maxHp: game.fenceHp }
    };
    return setTileEntity({ x: coord.x, y: coord.y }, fenceTile, game)
}