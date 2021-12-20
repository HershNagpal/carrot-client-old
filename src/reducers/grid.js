import { defaultGrid } from '../constants';

const grid = (grid = defaultGrid, action) => {
    switch (action.type) {
        case 'SET_GRID':
            return action.payload;

        case 'SET_TILE':
            return setTileReducer(action.payload, grid);

        default:
            return grid;
    }
};

const setTileReducer = (payload, grid) => (
    grid.map( (row, Yindex) => 
        payload.y === Yindex 
        ? row.map( (tile, Xindex) => 
            payload.x === Xindex 
                ? payload.newTile 
                : tile
        ) 
        : row
    )
);

export default grid;