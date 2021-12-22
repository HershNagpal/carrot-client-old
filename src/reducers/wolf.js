import * as constants from '../constants';

const wolf = (wolf = constants.defaultWolf, action) => {
    switch (action.type) {
        case 'INIT_WOLF':
            return initWolfReducer();

        case 'SET_WOLF':
            return action.payload;

        case 'SET_SINGLE_WOLF':
            return setWolfReducer(action.payload.singleWolf, action.payload.id);

        case 'SET_WOLF_DAMAGE':
            return setWolfDamageReducer(action.payload.damage, action.payload.id);

        case 'KILL_WOLF':
            return killWolfReducer(action.payload);

        case 'SET_WOLF_HP':
            return setWolfHPReducer(action.payload.hp, action.payload.id);

        case 'SET_WOLF_MAXHP':
            return setWolfMaxHPReducer(action.payload.hp, action.payload.id);
        
        case 'ADD_WOLF':
            return addWolfReducer(action.payload);

        default:
            return wolf;
    }
};

const initWolfReducer = () => {
    return wolf;
};

const setWolfReducer = (newWolf, id=true) => {
    return wolf.map( (singleWolf) => singleWolf.id === id ? newWolf : singleWolf );
};

const setWolfDamageReducer = (damage, id = true) => {
    return wolf.map( (singleWolf) => singleWolf.id === id ? {...singleWolf, damage: damage} : singleWolf);
};

const setWolfHPReducer = (hp, id = true) => {
    return wolf.map( (singleWolf) => singleWolf.id === id ? {...singleWolf, hp: hp} : singleWolf);
};

const setWolfMaxHPReducer = (hp, id = true) => {
    return wolf.map( (singleWolf) => singleWolf.id === id ? {...singleWolf, maxHP: hp} : singleWolf);
};

const killWolfReducer = (id = true) => {
    return wolf.map( (singleWolf) => singleWolf.id === id ? {...singleWolf, alive: false} : singleWolf);
};

const addWolfReducer = (newWolf) => {
    return [...wolf, newWolf];
};

export default wolf;