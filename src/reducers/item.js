import * as constants from '../constants';
import { getPlayerCoords } from './selectors';
import { setTile, setTileEntity } from './movement';
import { newCoordinatesInDirection } from './moveHelpers';
import { doChangeHp } from './setters';

export const doUseSuperCarrot = (game) => {
    switch (game.inventorySuperCarrot) {
        case 0:
            console.log('Carrot of Riddles');
            return carrotOfRiddles(game);
        case 1:
            console.log('Vowed Mithril Spell-carrot');
            return randomPlayerTeleport(game);
        case 2:
            console.log('Relentless Steel Carrot');
            return attackAllDirections(game);
        case 3:
            console.log('Carrot of Faded Memories');
            return carrotOfRiddles(game);
        case 4:
            console.log('Carrotified Squire\'s Blade');
            return carrotOfRiddles(game);
        default:
            console.log('?? carrot');
            return carrotOfRiddles(game);
    }
};

export const doUnequipSuperCarrot = (game) => (
    {...game, inventorySuperCarrot: -1 }
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
}

// Vowed Mithril Spell-carrot
const randomPlayerTeleport = (game) => {
    const { x, y } = getPlayerCoords(game.grid);

    const coords = randomGrassLocation(game);
    console.log(coords);
    
    const spawnPlayer = (game) => (
        setTileEntity({ x: coords.x, y: coords.y}, game.grid[y][x], game)
    );
    const removePlayer = (game) => (
        setTile({ x: x, y: y}, 'grass', game)
    );

    const stateChanges = [ spawnPlayer, removePlayer]
    return stateChanges.reduce((a, stateChange) => (
        stateChange(a)
    ), game);
};

const randomGrassLocation = (game) => {
    while (true) {
        const x = Math.floor(Math.random() * 15);
        const y = Math.floor(Math.random() * 15);
        if (game.grid[y][x].entity.type === 'grass') {
            return { x: x, y: y };
        }
    }
};

const fourDirectionAttack = (game, attack=game.attack) => {
    const playerTile = getPlayerCoords(game.grid);
    const tilesBeingHit = [
        newCoordinatesInDirection(playerTile.x, playerTile.y, 'w'),
        newCoordinatesInDirection(playerTile.x, playerTile.y, 'a'),
        newCoordinatesInDirection(playerTile.x, playerTile.y, 's'),
        newCoordinatesInDirection(playerTile.x, playerTile.y, 'd'),
    ].filter( (coord) => (
        game.grid[coord.newY][coord.newX].entity.type === 'wolf' || 
        game.grid[coord.newY][coord.newX].entity.type === 'fence' ||
        game.grid[coord.newY][coord.newX].entity.type === 'tree'
    ));

    console.log(tilesBeingHit);

    return tilesBeingHit.reduce((a, tile) => (
        doChangeHp({ x: tile.newX, y: tile.newY }, -attack, a)
    ), game);
}
