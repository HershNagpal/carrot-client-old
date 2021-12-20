export const setGrid = (grid) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_GRID', payload: grid });
    } catch (error) {
        console.log(error.message);
    }
};

export const setTile = (x, y, newTile) => async (dispatch) => {
    try {
        const data = {
            x: x, 
            y: y, 
            newTile: newTile
        };
        dispatch({ type: 'SET_TILE', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}
