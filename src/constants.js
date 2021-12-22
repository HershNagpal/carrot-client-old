export const gridX = 15;
export const gridY = 15;
export const carrotCap = 10;
export const fenceCap = 10;

export const playerStart = { x: 7, y: 7 };

export const defaultGame = {
    level: 1,
    hp: 10,
    maxHp: 10,
    xp: 0,
    maxXp: 10,
    moves: 0,
    direction: 'ArrowRight',
    attack: 1,
    grid: Array(gridY).fill(Array(gridX).fill(0)).map((row, Yindex) => (
        row.map((tile, Xindex) => ({
            coords: { x: Xindex, y: Yindex },
            entity: { type: 'grass' },
        }))
    )),
};