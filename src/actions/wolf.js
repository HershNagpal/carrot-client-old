export const initWolf = (wolf) => async (dispatch) => {
    try {
        dispatch({ type: 'INIT_WOLF', payload: wolf });
    } catch (error) {
        console.log(error.message);
    }
};

export const setWolf = (wolf) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_WOLF', payload: wolf });
    } catch (error) {
        console.log(error.message);
    }
};

export const setSingleWolf = (newWolf, id=0) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_SINGLE_WOLF', payload: {newWolf: newWolf, id: id} });
    } catch (error) {
        console.log(error.message);
    }
};

export const setWolfAttack = (attack, id=0) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_WOLF_ATTACK', payload: {attack: attack, id: id} });
    } catch (error) {
        console.log(error.message);
    }
};

export const killWolf = (id=0) => async (dispatch) => {
    try {
        dispatch({ type: 'KILL_WOLF', payload: id });
    } catch (error) {
        console.log(error.message);
    }
};

export const setWolfHP = (hp, id=0) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_WOLF_HP', payload: {hp: hp, id: id} });
    } catch (error) {
        console.log(error.message);
    }
};

export const setWolfMaxHP = (hp, id=0) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_WOLF_MAXHP', payload: {hp: hp, id: id} });
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