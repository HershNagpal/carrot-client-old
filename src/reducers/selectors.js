export const getTile = (search, grid) => {
    let coords = [];
    grid.forEach( (row, Yindex) => 
        row.forEach( (tile, Xindex) => {
                if (tile.entity.type === search) {
                    coords.push( { x: Xindex, y: Yindex } );
                }
            }
        )
    );
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