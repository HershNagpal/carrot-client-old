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