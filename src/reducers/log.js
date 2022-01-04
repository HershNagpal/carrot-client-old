import * as constants from '../constants';

export const log = (action, game) => {
    switch (action.type) {
        case 'GET_ITEM':
            const gameEvent = 'Picked up ' + constants.itemDict[action.payload.itemId].name + '.';
            return updateLog(gameEvent, game);
        default:
            return game;
    }
};

const updateLog = (gameEvent, game) => (
    { ...game, log: [...game.log, gameEvent] }
);