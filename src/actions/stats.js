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
}
