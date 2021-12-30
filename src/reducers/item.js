import * as constants from '../constants';

export const doUseSuperCarrot = (game) => {
    switch (game.inventorySuperCarrot) {
        case 0:
            console.log('Carrot of Riddles');
            return game;
        case 1:
            console.log('Vowed Mithril Spell-carrot');
            return game;
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
)

const carrotOfRiddles = (game) => game;