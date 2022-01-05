// Entity caps
export const gridX = 15;
export const gridY = 15;
export const carrotCap = 10;
export const fenceSpawn = 10;
export const fenceCap = 15;
export const wolfCap = 5;
export const treeCap = 10;

// Player start info
export const playerStart = { x: 7, y: 7 };
export const playerStartHp = 10;

// RNG values
export const carrotSpawnRate = 5;
export const wolfSpawnRate = 50;
export const treeSpawnRate = 30;
export const wolfRetreatChance = 3;
export const superCarrotChance = 10;

export const wolfMap = [
    {
        id: 0,
        name: 'stupid',
        baseDamage: 0,
        baseMaxHp: 5,
        description: 'Moves in a random, stupid direction. Never attacks.',
    },
    {
        id: 1,
        name: 'timid',
        baseDamage: 1,
        baseMaxHp: 3,
        description: 'Runs at the player, but has a 33% chance to walk away from the player. Attacks if it begins its turn next to the player.',
    },
]

export const itemDict = [
    {
        id: 0,
        name: 'None',
        description: 'Empty.',
        flavor: 'Nothing.',
        type: 'empty',
    },
    {
        id: 1,
        name: 'Carrot of Riddles',
        description: 'It does something... but what?',
        flavor: 'An average looking carrot I found on the floor. Something about it is off.',
        type: 'superCarrot',
    },
    {
        id: 2,
        name: 'Vowed Mithril Spell-carrot',
        description: 'Teleports you to a random location.',
        flavor: 'It is vowed and also mithril.',
        type: 'superCarrot',
    },
    {
        id: 3,
        name: 'Relentless Steel Carrot',
        description: 'Attacks in all four directions around you simultaneously.',
        flavor: 'It is steel and also relentless.',
        type: 'superCarrot',
    },
    {
        id: 4,
        name: 'Life\'s Limit',
        description: 'Levels you up instantly for half of your maximum HP.',
        flavor: 'Uneat the carrots to then consume all at once.',
        type: 'superCarrot',
    },
    {
        id: 5,
        name: 'Farmer\'s Pitchfork',
        description: 'Deals 1 damage to the tile in front of you.',
        flavor: 'We are going to fork it up.',
        type: 'weapon',
        weaponType: 'blade',
        damage: 1,
    },
    {
        id: 6,
        name: 'Carrotified Squire\'s Blade',
        description: 'Deals 2 damage to the tile in front of you.',
        flavor: 'Carrotified.',
        type: 'weapon',
        weaponType: 'blade',
        damage: 2,
    },
    {
        id: 7,
        name: 'Husty Ratchet',
        description: 'Deals 1 damage to the tile in front of you and the tile to its right. Triple damage to wood.',
        flavor: 'William Spooner\'s weapon of choice.',
        type: 'weapon',
        weaponType: 'axe',
        damage: 1,
    },
    {
        id: 8,
        name: 'Long Pointy Carrot',
        description: 'Deals 1 damage to two tiles in front of you.',
        flavor: 'A carrot for snakes.',
        type: 'weapon',
        weaponType: 'spear',
        damage: 1,
    },
];

export const defaultGame = {
    level: 1,
    xp: 0,
    maxXp: 10,
    moves: 0,
    direction: 'w',
    totalCarrots: 0,
    inventoryFences: 2,
    inventorySuperCarrot: 3,
    inventoryWeapon: 5,
    pocketItem: 0,
    carrotHealing: 1,
    fenceHp: 3,
    maxHeldFences: 3,
    gameOver: false,
    isInInventory: false,
    isInCollection: false,
    collectionSelect: 5,
    collection: Array(itemDict.length).fill(0).map((e, i) => (
        { id: i, found: 0, used: 0 }
    )),
    log: [{ text: 'WASD to move, Arrows to change direction, Space to attack, I for inventory, U for collection, C to use super carrot, V to swap with pocket. Pick up carrots to heal and level up. Wolves will hit you if you end your turn on a tile next to them.', color: 'red', importance: 'normal' }],
    grid: Array(gridY).fill(Array(gridX).fill(0)).map((row, Yindex) => (
        row.map((tile, Xindex) => ({
            coord: { x: Xindex, y: Yindex },
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