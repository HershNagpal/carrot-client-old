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
    inventoryFences: 2,
    inventorySuperCarrot: 2,
    inventoryWeapon: 4,
    pocketItem: -1,
    carrotHealing: 1,
    fenceHp: 3,
    maxHeldFences: 3,
    maxFencesPlaced: 15,
    gameOver: false,
    isInInventory: false,
    log: ['WASD to move, arrow keys to change direction. Spacebar to attack. Pick up carrots to heal and level up. Wolves will hit you if you end your turn on a tile next to them.'],
    grid: Array(gridY).fill(Array(gridX).fill(0)).map((row, Yindex) => (
        row.map((tile, Xindex) => ({
            coords: { x: Xindex, y: Yindex },
            entity: { type: 'grass' },
        }))
    )),
};

export const itemDict = [
    {
        id: 0,
        name: 'Carrot of Riddles',
        description: 'It does something... but what?',
        flavor: 'An average looking carrot I found on the floor. Something about it is off.',
        type: 'superCarrot',
    },
    {
        id: 1,
        name: 'Vowed Mithril Spell-carrot',
        description: 'Teleports you to a random location.',
        flavor: '',
        type: 'superCarrot',
    },
    {
        id: 2,
        name: 'Relentless Steel Carrot',
        description: 'Attacks in all four directions around you simultaneously.',
        flavor: '',
        type: 'superCarrot',
    },
    {
        id: 3,
        name: 'Life\'s Limit',
        description: 'Levels you up instantly for half of your maximum HP.',
        flavor: '',
        type: 'superCarrot',
    },
    {
        id: 4,
        name: 'Farmer\'s Pitchfork',
        description: '1 Damage',
        flavor: 'We are going to fork it up.',
        type: 'weapon',
        damage: 1,
    },
    {
        id: 4,
        name: 'Carrotified Squire\'s Blade',
        description: '2 Damage',
        flavor: 'Carrotified.',
        type: 'weapon',
        damage: 2,
    },
];

export const gameDefinition = 'avoid fences and wolves, collect carrots';
export const crash = false;
export const gameRules = [
    'carrots must respawn',
    'game must not break',
    'wolves must chase',
    'wolves and carrots cannot coexist on one tile',
    crash ? 'dont' : 'do'
];