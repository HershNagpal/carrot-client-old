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

// Balance Constants
export const spearTipMultiplier = 2;
export const axeWoodcuttingMultiplier = 3;

export const wolfDict = [
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
    {
        id: 2,
        name: 'distracted',
        baseDamage: 1,
        baseMaxHp: 4,
        description: 'Runs at the player, but will eat any carrot it finds itself next to.',
    },
];

export const itemDict = [
    {
        id: 0,
        name: 'None',
        description: 'empty',
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
        description: 'Brings you to 1 HP to gain XP. Gain more XP the more HP you lose.',
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
        description: 'Deals 1 damage to the tile in front of you and the tile to its side. Triple damage to wood.',
        flavor: 'William Spooner\'s weapon of choice.',
        type: 'weapon',
        weaponType: 'axe',
        damage: 1,
    },
    {
        id: 8,
        name: 'Long Pointy Carrot',
        description: 'Deals 1 damage directly in front of you and double damage at the tip two tiles away.',
        flavor: 'A carrot for snakes.',
        type: 'weapon',
        weaponType: 'spear',
        damage: 1,
    },
];

export const loreDict = [
    {
        id: 0,
        name: 'Empty Book',
        description: 'empty',
        flavor: 'empty',
    },
    {
        id: 1,
        name: 'Tutorial Book',
        description: 'Learn how to play.',
        lore: [
            'Move - WASD',
            'Change Direction - Arrow keys',
            'Attack - Space',
            'Inventory - I',
            'Collection - U',
            'Consume Super Carrot - C',
            'Swap with Pocket - V',
            'Place Fence - F',
            'Pick up carrots to heal and level up. Some will give you super carrots or weapons when you pick them up.',
            'Kill the wolves before they kill you. Different wolves will behave in unqiue ways so try to find their patterns.',
            'The number on the blue bar is your level. Mouse over the HP and XP bars to see the exact values.',
            'Break trees to get wood and then place fences to block off the wolves or try to manipulate their movement. There is a limit on the number of fences that can be placed at once so maybe break ones you don\'t need.',
            'You have 1 pocket slot which will store the last thing you picked up. Make sure to equip it or you will lose it the next time you pick something up.',
            'The inventory icons on the sidebar will show your equipped weapon, super carrot, pocket, and fences. The small numbers show your weapons damage and amount of held fences.',
            'Other weapon types may have special properities so read their information in the Inventory screen.',
            'The log in the bottom right will keep track of game events like when you level up or pick up an item. Look here so you don\'t miss a drop.',
            'Try to get to the highest level you can!',
        ],
        flavor: 'You would be incapable of playing game without this.',
    },
];

export const defaultGame = {
    name: 'Player',
    hand: 'right',
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
    collectionSelect: 3,
    collection: Array(itemDict.length).fill(0).map((e, i) => ({
        id: i, 
        found: i === 5 || i === 3 ? 1 : 0,
        used: 0,
    })),
    lore: Array(loreDict.length).fill(0).map((e, i) => ({
        id: i,
        found: i === 1 ? 1 : 0,
    })),
    log: [{ text: 'You discovered Tutorial Book. Open your collection page with the icon above to read it.', color: 'red', importance: 'normal' }],
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