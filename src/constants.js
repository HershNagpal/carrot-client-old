export const gridX = 15;
export const gridY = 15;
export const carrotCap = 10;
export const fenceCap = 10;
export const wolfCap = 3;
export const treeCap = 10;

export const playerStart = { x: 7, y: 7 };
export const playerStartHp = 10;

export const defaultGame = {
    level: 1,
    xp: 0,
    maxXp: 10,
    moves: 0,
    direction: 'ArrowRight',
    fences: 3,
    lockedSuperCarrot: 2,
    pocketSuperCarrot: -1,
    attack: 1,
    carrotHealing: 1,
    gameOver: false,
    inventory: [],
    log: ['Welcome to CarrotWolf.'],
    grid: Array(gridY).fill(Array(gridX).fill(0)).map((row, Yindex) => (
        row.map((tile, Xindex) => ({
            coords: { x: Xindex, y: Yindex },
            entity: { type: 'grass' },
        }))
    )),
};

export const gameDefinition = 'avoid fences and wolves, collect carrots';
export const crash = false;
export const gameRules = [
    'carrots must respawn',
    'game must not break',
    'wolves must chase',
    'wolves and carrots cannot coexist on one tile',
    crash ? 'dont' : 'do'
];