export const setStats = (stats) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_STATS', payload: stats });
    } catch (error) {
        console.log(error.message);
    }
};

export const setScore = (score) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_SCORE', payload: score })
    } catch (error) {
        console.log(error.message);
    }
};

export const setMoves = (moves) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_MOVES', payload: moves })
    } catch (error) {
        console.log(error.message);
    }
};

export const setDirection = (direction) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_DIRECTION', payload: direction })
    } catch (error) {
        console.log(error.message);
    }
};

export const setAttack = (attack) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_ATTACK', payload: attack })
    } catch (error) {
        console.log(error.message);
    }
};

export const setHp = (hp) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_HP', payload: hp })
    } catch (error) {
        console.log(error.message);
    }
};

export const setMaxHp = (maxHp) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_MAXHP', payload: maxHp })
    } catch (error) {
        console.log(error.message);
    }
};

export const setXp = (xp) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_XP', payload: xp })
    } catch (error) {
        console.log(error.message);
    }
};

export const setMaxXp = (maxXp) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_MAXXP', payload: maxXp })
    } catch (error) {
        console.log(error.message);
    }
};

export const setLevel = (level) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_LEVEL', payload: level })
    } catch (error) {
        console.log(error.message);
    }
};