import * as constants from '../constants';
import { getPlayerCoords } from './selectors';

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

export const isPlayerNear = (nearbyTile, game) => {
    const playerCoords = getPlayerCoords(game.grid);
    return ['w', 'a', 's', 'd'].reduce((a, direction) => {
        const { newX, newY } = newCoordinatesInDirection(nearbyTile.coords.x, nearbyTile.coords.y, direction)
        return newX === playerCoords.x && newY === playerCoords.y
            ? direction
            : a                        
    }, false);
}

export const newCoordinatesInDirection = (x, y, direction) => {
    switch (direction) {
        case 'w':
            return { newX: x, newY: y - 1 };
        case 's':
            return { newX: x, newY: y + 1 };
        case 'a':
            return { newX: x - 1, newY: y };
        case 'd':
            return { newX: x + 1, newY: y };
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
    const vDistance = Math.abs(targetY - wolfTile.coords.y);
    const hDistance = Math.abs(targetX - wolfTile.coords.x);
    const vDirection = targetY - wolfTile.coords.y;
    const hDirection = targetX - wolfTile.coords.x;

    const up = newCoordinatesInDirection(wolfTile.coords.x, wolfTile.coords.y, 'w');
    const down = newCoordinatesInDirection(wolfTile.coords.x, wolfTile.coords.y, 's');
    const left = newCoordinatesInDirection(wolfTile.coords.x, wolfTile.coords.y, 'a');
    const right = newCoordinatesInDirection(wolfTile.coords.x, wolfTile.coords.y, 'd');

    const upValid = !isOutOfBounds(up.newX, up.newY) && checkMove(grid[up.newY][up.newX]);
    const downValid = !isOutOfBounds(down.newX, down.newY) && checkMove(grid[down.newY][down.newX]);
    const leftValid = !isOutOfBounds(left.newX, left.newY) && checkMove(grid[left.newY][left.newX]);
    const rightValid = !isOutOfBounds(right.newX, right.newY) && checkMove(grid[right.newY][right.newX]);

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

export const wolfSpawnCoords = (xLength, yLength) => (
    Math.round(Math.random()) === 0
        ? leftRightEdgeCoords(xLength, yLength)
        : topBottomEdgeCoords(xLength, yLength)
);

const leftRightEdgeCoords = (xLength, yLength) => ({
    x: Math.round(Math.random() * xLength),
    y: Math.floor(Math.random()) * (yLength - 1),
});

const topBottomEdgeCoords = (xLength, yLength) => ({
    x: Math.round(Math.random()) * (xLength - 1),
    y: Math.floor(Math.random() * yLength),
});