import * as constants from '../constants';

const wolf = (wolf = constants.defaultWolf, action) => {
    switch (action.type) {
        case 'INIT_WOLF':
            return initWolfReducer();

        case 'SET_WOLF':
            return action.payload;

        case 'SET_SINGLE_WOLF':
            return wolf.map( (singleWolf) => singleWolf.id === action.payload.id || action.payload.id === 0 
            ? action.payload.newWolf : singleWolf );

        case 'SET_WOLF_ATTACK':
            return wolf.map( (singleWolf) => singleWolf.id === action.payload.id || action.payload.id === 0 
            ? {...singleWolf, attack: action.payload.attack} : singleWolf);

        case 'KILL_WOLF':
            return wolf.map( (singleWolf) => singleWolf.id === action.payload || action.payload === 0 
            ? {...singleWolf, alive: false} : singleWolf);

        case 'SET_WOLF_HP':
            return wolf.map( (singleWolf) => singleWolf.id === action.payload.id || action.payload.id === 0 
            ? {...singleWolf, hp: action.payload.hp} : singleWolf);

        case 'SET_WOLF_MAXHP':
            return wolf.map( (singleWolf) => singleWolf.id === action.payload.id || action.payload.id === 0 
            ? {...singleWolf, maxHp: action.payload.hp} : singleWolf);
        
        case 'ADD_WOLF':
            return [...wolf, action.payload];

        default:
            return wolf;
    }
};

const initWolfReducer = () => {
    return wolf;
};

export default wolf;