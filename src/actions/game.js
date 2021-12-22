export const initGrid = () => async (dispatch) => {
    try {
        dispatch({ type: 'INIT_GRID', payload: null });
    } catch (error) {
        console.log(error.message);
    }
};

export const movePlayer = (direction) => async (dispatch) => {
    try {
        dispatch({ type: 'MOVE_PLAYER', payload: direction });
    } catch (error) {
        console.log(error.message);
    }
};

export const changeDirection = (direction) => async (dispatch) => {
    try {
        dispatch({ type: 'SET_DIRECTION', payload: direction })
    } catch (error) {
        console.log(error.message);
    }
};
