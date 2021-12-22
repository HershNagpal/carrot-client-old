export const initWolf = (wolf) => async (dispatch) => {
    try {
        dispatch({ type: 'INIT_WOLF', payload: wolf });
    } catch (error) {
        console.log(error.message);
    }
};

export const setWolf = (singleWolf, id=true) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_WOLF', payload: {singleWolf: singleWolf, id: id} });
    } catch (error) {
        console.log(error.message);
    }
};

export const setWolfDamage = (damage, id=true) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_WOLF_DAMAGE', payload: {damage: damage, id: id} });
    } catch (error) {
        console.log(error.message);
    }
};

export const killWolf = (id=true) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_STATS', payload: id });
    } catch (error) {
        console.log(error.message);
    }
};

export const setWolfHP = (hp, id=true) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_WOLF_HP', payload: {hp: hp, id: id} });
    } catch (error) {
        console.log(error.message);
    }
};

export const addWolf = (singleWolf) => async (dispatch) => {
    try {
        dispatch({ type: 'ADD_WOLF', payload: singleWolf });
    } catch (error) {
        console.log(error.message);
    }    
}