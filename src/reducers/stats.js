import { defaultStats } from '../constants';

const stats = (stats = defaultStats, action) => {
    switch (action.type) {
        case 'SET_STATS':
            return action.payload;

        case 'SET_SCORE':
            return {...stats, score: action.payload};

        default:
            return stats;
    }
};

export default stats;
