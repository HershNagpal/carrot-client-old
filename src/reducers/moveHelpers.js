import * as constants from '../constants';

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
        default:
            return false;
    }
};

export const newCoordinatesInDirection = (x, y, direction) => {
    switch (direction) {
        case 'w':
            return { newX: x, newY: y-1 };
        case 's':
            return { newX: x, newY: y+1 };
        case 'a':
            return { newX: x-1, newY: y };
        case 'd':
            return { newX: x+1, newY: y };
        default:
            break;
    }
};

export const isOutOfBounds = (x, y) => {
    if (x >= constants.gridX || y >= constants.gridY) return true;
    if (x < 0 || y < 0) return true;
    return false;
};

export const getWolfDirection = (playerX, playerY, wolfTile) => {
    const vDistance = Math.abs(playerY - wolfTile.coords.y);
    const hDistance = Math.abs(playerX - wolfTile.coords.x);
    const vDirection = playerY - wolfTile.coords.y;
    const hDirection = playerX - wolfTile.coords.x;

    // Up and Left - negative = player is up/left
    if (vDirection <= 0 && hDirection <= 0) {
        if (vDistance >= hDistance) {
            return 'w';
        } else {
            return 'a'
        }
    }
    // Up and Right
    else if (vDirection <= 0 && hDirection >= 0) {
        if (vDistance >= hDistance) {
            return 'w';
        } else {
            return 'd';
        }
    }
    // Down and Left
    else if (vDirection >= 0 && hDirection <= 0) {
        if (vDistance >= hDistance) {
            return 's';
        } else {
            return 'a';
        }
    }
    // Down and Right
    else if (vDirection >= 0 && hDirection >= 0) {
        if (vDistance >= hDistance) {
            return 's';
        } else {
            return 'd';
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
    y: Math.floor(Math.random()) * (yLength-1)
});

const topBottomEdgeCoords = (xLength, yLength) => ({
    x: Math.round(Math.random()) * (xLength-1),
    y: Math.floor(Math.random() * yLength)
});