import * as constants from '../constants';

const wolf = (wolf = constants.defaultWolf, action) => {
    switch (action.type) {
        case 'INIT_WOLF':
            return initWolfReducer();

        case 'SET_WOLF':
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

const setWolfReducer = (singleWolf, id=true) => {
    return wolf;
};

const setWolfDamageReducer = (damage, id = true) => {
    wolf.map( (wolf, id))
};

const setWolfHPReducer = (hp, id = true) => {
    return wolf;
};

const setWolfMaxHPReducer = (hp, id = true) => {
    return wolf;
};

const killWolfReducer = (id = true) => {
    return wolf;
};

const addWolfReducer = (singleWolf) => {
    return [...wolf, singleWolf];
};

export default wolf;