import * as constants from '../constants';
import { getPlayerCoord } from './selectors';

export const checkMove = (nextTile) => {
    switch (nextTile.entity.type) {
        case 'carrot':
            return true;
        case 'fence':
            return false;
        case 'wolf':
            return false;
        case 'grass':
            return true;
        case 'tree':
            return false;
        default:
            return false;
    }
};

export const isPlayerNear = (coord, game) => {
    const playerCoord = getPlayerCoord(game.grid);
    return ['w', 'a', 's', 'd'].reduce((a, direction) => {
        const { x, y } = newCoordInDirection(coord.x, coord.y, direction)
        return x === playerCoord.x && y === playerCoord.y
            ? direction
            : a                        
    }, false);
}

export const newCoordInDirection = (x, y, direction) => {
    switch (direction) {
        case 'w':
            return { x: x, y: y - 1 };
        case 's':
            return { x: x, y: y + 1 };
        case 'a':
            return { x: x - 1, y: y };
        case 'd':
            return { x: x + 1, y: y };
        default:
            break;
    }
};

export const isOutOfBounds = (x, y) => {
    if (x >= constants.gridX || y >= constants.gridY) return true;
    if (x < 0 || y < 0) return true;
    return false;
};

// TODO: Does not work with even number board dimensions
export const reflectPosition = (reflectCoord, originCoord) => ({
    x: reflectCoord.x >= originCoord.x 
        ? reflectCoord.x - (reflectCoord.x - originCoord.x) * 2
        : reflectCoord.x + (originCoord.x - reflectCoord.x) * 2,
    y: reflectCoord.y >= originCoord.y 
        ? reflectCoord.y - (reflectCoord.y - originCoord.y) * 2
        : reflectCoord.y + (originCoord.y - reflectCoord.y) * 2,
});

export const getWolfDirection = (targetX, targetY, wolfTile, grid) => {
    const vDistance = Math.abs(targetY - wolfTile.coord.y);
    const hDistance = Math.abs(targetX - wolfTile.coord.x);
    const vDirection = targetY - wolfTile.coord.y;
    const hDirection = targetX - wolfTile.coord.x;

    const up = newCoordInDirection(wolfTile.coord.x, wolfTile.coord.y, 'w');
    const down = newCoordInDirection(wolfTile.coord.x, wolfTile.coord.y, 's');
    const left = newCoordInDirection(wolfTile.coord.x, wolfTile.coord.y, 'a');
    const right = newCoordInDirection(wolfTile.coord.x, wolfTile.coord.y, 'd');

    const upValid = !isOutOfBounds(up.x, up.y) && checkMove(grid[up.y][up.x]);
    const downValid = !isOutOfBounds(down.x, down.y) && checkMove(grid[down.y][down.x]);
    const leftValid = !isOutOfBounds(left.x, left.y) && checkMove(grid[left.y][left.x]);
    const rightValid = !isOutOfBounds(right.x, right.y) && checkMove(grid[right.y][right.x]);

    // Up and Left - negative = player is up/left
    if (vDirection <= 0 && hDirection <= 0) {
        if (vDistance >= hDistance) {
            return upValid ? 'w' : 'a';
        } else {
            return leftValid ? 'a' : 'w';
        }
    }
    // Up and Right
    else if (vDirection <= 0 && hDirection >= 0) {
        if (vDistance >= hDistance) {
            return upValid ? 'w' : 'd';
        } else {
            return rightValid ? 'd' : 'w';
        }
    }
    // Down and Left
    else if (vDirection >= 0 && hDirection <= 0) {
        if (vDistance >= hDistance) {
            return downValid ? 's' : 'a';
        } else {
            return leftValid ? 'a' : 's';
        }
    }
    // Down and Right
    else if (vDirection >= 0 && hDirection >= 0) {
        if (vDistance >= hDistance) {
            return downValid ? 's' : 'd';
        } else {
            return rightValid ? 'd' : 's';
        }
    }
};

export const wolfSpawnCoord = (xLength, yLength) => (
    Math.round(Math.random()) === 0
        ? leftRightEdgeCoord(xLength, yLength)
        : topBottomEdgeCoord(xLength, yLength)
);

const leftRightEdgeCoord = (xLength, yLength) => ({
    x: Math.round(Math.random() * xLength),
    y: Math.floor(Math.random()) * (yLength - 1),
});

const topBottomEdgeCoord = (xLength, yLength) => ({
    x: Math.round(Math.random()) * (xLength - 1),
    y: Math.floor(Math.random() * yLength),
});

export const rotateDirection = (direction, rotationDirection = 'cw') => {
    if (rotationDirection === 'ccw') {
        switch (direction) {
            case 'w':
                return 'a';
            case 'a':
                return 's';
            case 's':
                return 'd';
            case 'd':
                return 'w';
            default:
                return direction;
        }
    } else {
        switch (direction) {
            case 'w':
                return 'd';
            case 'a':
                return 'w';
            case 's':
                return 'a';
            case 'd':
                return 's';
            default:
                return direction;
        }
    }
};