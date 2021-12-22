export const gridX = 15;
export const gridY = 15;

export const playerStart = { x:7, y:7 };

export const defaultGrid = [...Array(gridY)].map(e => Array(gridX).fill('G'));

export const defaultStats = {
    level: 1,
    hp: 10,
    maxHp: 10,
    xp: 0,
    maxXp: 10,
    moves: 0,
    direction: 'ArrowRight',
    attack: 1,
};