import * as constants from '../../constants';

export const initGrid = () => {
    let grid = constants.defaultGrid;
    grid[7][7] = 'P';
    grid = spawn('C', 10, grid);
    grid = spawn('F', 10, grid);
    return grid;
}

const spawn = (tile, num, grid) => {
    let x, y;
    for (let i = num; i > 0; i--) {
        do {
            x = Math.floor(Math.random() * 15);
            y = Math.floor(Math.random() * 15);
        } while (grid[y][x] !== 'G');
        grid[y][x] = tile;
    }
    return grid;
};