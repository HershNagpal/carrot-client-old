export const getTile = (search, grid) => {
    const coords = grid.reduce((a, row, Yindex) => (
        a.concat(row.reduce((a, tile, Xindex) => (
            tile.entity.type === search
                ? [ ...a, { x: Xindex, y: Yindex }]
                : a
        ), []))
    ), []);
    if (coords.length === 0 && search === 'player') {
        console.log(search + ' not found in getTile');
    }
    return coords;
};

export const getWolves = (grid) => (
    getTile('wolf', grid).map((coord) => (
        grid[coord.y][coord.x]
    ))
);