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
    direction: 'w',
    inventoryFences: 3,
    inventorySuperCarrot: 1,
    inventoryWeapon: 1,
    pocketItem: -1,
    attack: 1,
    carrotHealing: 1,
    gameOver: false,
    log: ['WASD to move, arrow keys to change direction. Spacebar to attack. Pick up carrots to heal and level up. Wolves will hit you if you end your turn on a tile next to them.'],
    grid: Array(gridY).fill(Array(gridX).fill(0)).map((row, Yindex) => (
        row.map((tile, Xindex) => ({
            coords: { x: Xindex, y: Yindex },
            entity: { type: 'grass' },
        }))
    )),
};

export const itemDict = {
    0: {
        id: 0,
        name: 'Carrot of Riddles',
        description: 'It does something... but what?',
        flavor: 'An average looking carrot I found on the floor. Something about it is off.',
        type: 'superCarrot',
    },
    1: {
        id: 1,
        name: 'Vowed Mithril Spell-carrot',
        description: '',
        flavor: '',
        type: 'superCarrot',
    },
    2: {
        id: 2,
        name: 'Relentless Steel Carrot',
        description: '',
        flavor: '',
        type: 'superCarrot',
    },
    3: {
        id: 3,
        name: 'Carrot of Faded Memories',
        description: '',
        flavor: '',
        type: 'superCarrot',
    },
    4: {
        id: 4,
        name: 'Carrotified Squire\'s Blade',
        description: '',
        flavor: '',
        type: 'weapon',
    }
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