export const getCoords = (search, grid) => {
    const coords = grid.reduce((a, row, Yindex) => (
        a.concat(row.reduce((a, tile, Xindex) => (
            tile.entity.type === search
                ? [ ...a, { x: Xindex, y: Yindex }]
                : a
        ), []))
    ), []);
    if (coords.length === 0 && search === 'player') {
        console.log(search + ' not found in getCoords');
    }
    return coords;
};

export const getWolfTiles = (grid) => (
    getCoords('wolf', grid).map((coord) => (
        grid[coord.y][coord.x]
    ))
);

export const getPlayerTile = (grid) => (
    getCoords('player', grid).map((coord) => (
        grid[coord.y][coord.x]
    ))[0]
);

export const getPlayerCoord = (grid) => (
    getCoords('player', grid)[0]
);