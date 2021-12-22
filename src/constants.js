export const gridX = 15;
export const gridY = 15;
export const carrotCap = 10;
export const fenceCap = 10;

export const playerStart = { x: 7, y: 7 };

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

export const defaultWolf = [
    {
        id: 0,
        alive: true,
        x: 0,
        y: 12,
        hp: 1,
        maxHP: 2,
        moves: 0,
        maxMoves: 100,
        attack: 1,
    },
    {
        id: 1,
        alive: false,
        x: 5,
        y: 14,
        hp: 1,
        maxHP: 2,
        moves: 0,
        maxMoves: 100,
        attack: 1,
    },
    {
        id: 2,
        x: 3,
        alive: false,
        y: 0,
        hp: 1,
        maxHP: 2,
        moves: 0,
        maxMoves: 100,
        attack: 1,
    },
];