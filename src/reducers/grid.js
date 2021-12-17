const grid = (grid = [], action) => {
    
    switch (action.type) {

        case 'SET_GRID':
            return action.payload;

        default:
            return grid;
    }
}

export default grid;