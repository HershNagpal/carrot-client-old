import * as constants from '../constants';

export const log = (action, game) => {
    const gameEvent = logStrings[action.type];
    switch (action.type) {
        case 'GET_ITEM':
            return updateLog(game.moves + "| " + gameEvent + constants.itemDict[action.payload.itemId].name, game);
        case 'ATTACK':
            return updateLog(game.moves + "| " + action.payload.attacker + gameEvent[0] + action.payload.target + gameEvent[1] + action.payload.damage + gameEvent[2], game);
        case 'LEVEL_UP':
            return updateLog(game.moves + "| " + gameEvent[0] + game.level, game);
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