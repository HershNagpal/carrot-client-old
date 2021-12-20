export const gridX = 15;
export const gridY = 15;

export const playerStart = {x:7, y:7};

export const defaultGrid = [...Array(gridY)].map(e => Array(gridX).fill(''));

export const defaultStats = {
    score: 0,
    hp: 0,
};