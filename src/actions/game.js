export const setGrid = (grid) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_GRID', payload: grid });
    } catch (error) {
        console.log(error.message);
    }
}
