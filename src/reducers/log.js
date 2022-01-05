import * as constants from '../constants';

export const log = (action, game) => {
    const eventText = logStrings[action.type];
    switch (action.type) {
        case 'GET_ITEM':
            return updateLog({ text: game.moves + "| " + eventText[0] + constants.itemDict[action.payload.itemId].name, color: 'blue', importance: 'bold' }, game);
        case 'ATTACK':
            return updateLog({ text: game.moves + "| " + action.payload.attacker + eventText[0] + action.payload.target + eventText[1] + action.payload.damage + eventText[2], color: 'black', importance: 'normal' }, game);
        case 'LEVEL_UP':
            return updateLog({ text: game.moves + "| " + eventText[0] + game.level, color: 'green', importance: 'bold' }, game);
        default:
            return game;
    }
};

const updateLog = (gameEvent, game) => (
    { ...game, log: [...game.log, gameEvent] }
);

const logStrings = {
    'GET_ITEM': ['Picked up ',],
    'ATTACK': [' attacked ',' for ', ' damage ',],
    'LEVEL_UP': ['Reached level ',],
    'CONSUME_SUPER_CARROT': ['Used ',],
};