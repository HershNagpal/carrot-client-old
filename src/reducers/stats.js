import { defaultStats } from '../constants';

const stats = (stats = defaultStats, action) => {
    switch (action.type) {
        case 'SET_STATS':
            return action.payload;

        case 'SET_LEVEL':
            return {...stats, level: action.payload};

        case 'SET_MOVES':
            return {...stats, moves: action.payload};

        case 'SET_DIRECTION':
            return {...stats, direction: action.payload};

        case 'SET_ATTACK':
            return {...stats, attack: action.payload};

        case 'SET_HP':
            return {...stats, hp: action.payload};

        case 'SET_MAXHP':
            return {...stats, maxHp: action.payload};

        case 'SET_XP':
            return {...stats, xp: action.payload};

        case 'SET_MAXXP':
            return {...stats, maxXp: action.payload};
        
        default:
            return stats;
    }
};

export default stats;
