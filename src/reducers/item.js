import * as constants from '../constants';
import { getPlayerCoords } from './selectors';
import { setTile, setTileEntity } from './movement';
import { checkMove } from './moveHelpers';

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
            return game;
        case 3:
            console.log('Carrot of Faded Memories');
            return game;
        case 4:
            console.log('Carrotified Squire\'s Blade');
            return game;
        default:
            console.log('?? carrot');
            return carrotOfRiddles(game);
    }
};

export const doUnequipSuperCarrot = (game) => (
    {...game, inventorySuperCarrot: -1 }
);

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

// Carrot of Riddles lol
const carrotOfRiddles = (game) => game;