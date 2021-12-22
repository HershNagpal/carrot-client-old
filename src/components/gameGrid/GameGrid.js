import { Container, Grid } from '@material-ui/core';
import { useEffect, useCallback } from 'react';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { initGrid, setTile } from '../../actions/game.js';
import { addWolf, setWolf } from '../../actions/wolf';
import { setXp, setMaxXp, setLevel, setMoves, setDirection } from '../../actions/stats.js'
import Tile from './tile/Tile';
import * as constants from '../../constants';

const GameGrid = () => {
    const grid = useSelector( (state) => state.grid );
    const stats = useSelector( (state) => state.stats );
    const wolf = useSelector( (state) => state.wolf );
    const dispatch = useDispatch();
    const classes = useStyles();

    const randomSpawn = (tile, num = 1) => {
        let x, y;
        for (let i = num; i > 0; i--) {
            do {
                x = Math.floor(Math.random() * 15);
                y = Math.floor(Math.random() * 15);
            } while (grid[y][x] !== 'G');
            dispatch(setTile(x, y, tile));
        }
    };

    useEffect( () => {
        dispatch(initGrid());
    }, [dispatch]);

    const getTile = (search) => {
        let coords = [];
        grid.forEach( (row, Yindex) => 
            row.forEach( (tile, Xindex) => {
                    if (tile === search) {
                        coords.push( { x: Xindex, y: Yindex } );
                    }
                }
            )
        );
        if (coords.length === 0 && search === 'P') {
            console.log(search + ' not found in getTile');
        }
        return coords;
    };

    const checkPlayerMove = (x, y) => {
        const nextTile = grid[y][x];
        switch (nextTile) {
            case 'C':
                if (stats.xp + 1 === stats.maxXp) {
                    dispatch(setLevel(stats.level + 1));
                    dispatch(setXp(0));
                    dispatch(setMaxXp(Math.floor(stats.maxXp * 1.1)));
                } else {
                    dispatch(setXp(stats.xp + 1));
                }
                return true;
            case 'F':
                return false;
            case 'W':
                return false;
            case 'G':
                return true;
            default:
                return false;
        }
    };

    const checkWolfMove = (x, y) => {
        const nextTile = grid[y][x];
        switch (nextTile) {
            case 'C':
                dispatch(setXp(stats.xp - 1));
                return true;
            case 'F':
                return false;
            case 'W':
                return false;
            case 'G':
                return true;
            case 'P':
                return false;
            default:
                return false;
        }
    }

    /**
     * Potential issue with wolves getting blocked if their current direction is blocked.
     * They won't try other directions even if they can. There are bugs with multiple wolves 
     * overlapping and eating each other and the player.
     * Also this function is FAT
     */
    const moveWolves = () => {
        wolf.map((singleWolf) => {
            const vDistance = Math.abs(singleWolf.y - wolf.y);
            const hDistance = Math.abs(singleWolf.x - wolf.x);
            const vDirection = singleWolf.y - wolf.y;
            const hDirection = singleWolf.x - wolf.x;
            let direction;

            // Up and Left
            if (vDirection <= 0 && hDirection <= 0) {
                if (vDistance >= hDistance) { 
                    direction = 'w';
                }
                else { 
                    direction = 'a'; 
                }
            }
            // Up and Right
            else if (vDirection <= 0 && hDirection >= 0) {
                if (vDistance >= hDistance) { 
                    direction = 'w';
                }
                else { 
                    direction = 'd'; 
                }
            }
            // Down and Left
            else if (vDirection >= 0 && hDirection <= 0) {
                if (vDistance >= hDistance) { 
                    direction = 's';
                }
                else { 
                    direction = 'a'; 
                }
            }
            // Down and Right
            else if (vDirection >= 0 && hDirection >= 0) {
                if (vDistance >= hDistance) { 
                    direction = 's';
                }
                else { 
                    direction = 'd'; 
                }
            }

            if (direction !== undefined) {
                const { newX, newY } = newCoordinatesInDirection(wolf.x, wolf.y, direction);
                if (!isOutOfBounds(newX, newY) && checkWolfMove(newX, newY)) {
                    dispatch(setTile(wolf.x, wolf.y, 'G'));
                    dispatch(setTile(newX, newY, 'W'));
                    dispatch(setWolf({...singleWolf, x: newX, y: newY, moves: singleWolf.moves+1}));
                } 
            }
            
        }); 
    };

    const movePlayer = (direction) => {
        const { x, y } = getTile('P')[0];
        const { newX, newY } = newCoordinatesInDirection(x, y, direction);

        if (!isOutOfBounds(newX, newY) && checkPlayerMove(newX, newY)) {
            dispatch(setTile(newX, newY, 'P'));
            dispatch(setTile(x, y, 'G'));
            dispatch(setMoves(stats.moves+1));
            spawnCarrots();
            moveWolves();
            spawnWolves();
        }
    };

    const spawnCarrots = () => {
        const numCarrots = getTile('C').length;
        if (numCarrots < constants.carrotCap) {
            if (Math.floor(Math.random() * 5) === 0) {
                randomSpawn('C', 1);
            }
        }
    }

    const spawnWolves = () => {
        const numWolves = getTile('W').length;
        if (numWolves < constants.wolfCap) {
            if (Math.floor(Math.random() * 10) === 0) {

                let x,y;
                do {
                    const edge = Math.round(Math.random());
                    if (edge === 1) {
                        x = Math.round(Math.random()) * 14;
                        y = Math.floor(Math.random() * 15);
                    } else {
                        x = Math.floor(Math.random() * 15);
                        y = Math.round(Math.random()) * 14;
                    }
                } while (grid[y][x] !== 'G');

                const newWolf = {
                    id: 1,
                    alive: true,
                    x: x,
                    y: y,
                    hp: 2,
                    maxHp: 2,
                    moves: 0,
                    maxMoves: 100,
                    attack: 1,
                };
                dispatch(setTile(x, y, 'W'));
                dispatch(addWolf(newWolf));
            }
        }
    }

    const newCoordinatesInDirection = (x, y, direction) => {
        switch (direction) {
            case 'w':
                return {newX: x, newY: y-1};
            case 's':
                return {newX: x, newY: y+1};
            case 'a':
                return {newX: x-1, newY: y};
            case 'd':
                return {newX: x+1, newY: y};
            default:
                break;
        }
    };

    const handleKeyPress = useCallback( (event) => {
        if (event.key === 'w' || event.key === 's' || event.key === 'a' || event.key === 'd') {
            movePlayer(event.key);
            dispatch(setDirection(event.key));
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            dispatch(setDirection(event.key));
        }
    }, [movePlayer, dispatch]);

    useEffect( () => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, [handleKeyPress]);

    const isOutOfBounds = (x, y) => {
        if (x >= constants.gridX || y >= constants.gridY) return true;
        if (x < 0 || y < 0) return true;
        return false;
    };
    
    return <>
        <Container className={classes.outerContainer}>
            <Grid container direction="column">
                {
                grid.map((row, index) => (
                    <Grid item container key={index} direction="row">
                        {
                            row.map((tile, index) => (
                                <Grid item key={index}>
                                    <Tile text={tile}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                ))
                }
            </Grid>
        </Container>
    </>
};

export default GameGrid;