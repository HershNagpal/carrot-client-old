import { Container, Grid } from '@material-ui/core';
import { useEffect, useCallback } from 'react';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { setTile } from '../../actions/game.js';
import { setXp, setMaxXp, setLevel, setMoves, setDirection } from '../../actions/stats.js'
import Tile from './tile/Tile';
import * as constants from '../../constants';

const GameGrid = () => {
    const grid = useSelector( (state) => state.grid );
    const stats = useSelector( (state) => state.stats );
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect( () => {
        dispatch(setTile(constants.playerStart.x, constants.playerStart.y, 'P'));
    }, [dispatch]);

    const getTile = (search) => {
        let coords = [];
        grid.forEach( (row, Yindex) => 
            row.forEach( (tile, Xindex) => {
                    if(tile === search) {
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
        const wolves = getTile('W');
        const { x, y } = getTile('P')[0];
        
        wolves.forEach( (wolf) => {
            const vDistance = Math.abs(y - wolf.y);
            const hDistance = Math.abs(x - wolf.x);
            const vDirection = y - wolf.y;
            const hDirection = x - wolf.x;
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
                if (!isOutOfBounds(newX, newY) && checkPlayerMove(newX, newY)) {
                    dispatch(setTile(wolf.x, wolf.y, 'G'));
                    dispatch(setTile(newX, newY, 'W'));
                } 
            }

        });
    };

    const movePlayer = (direction) => {
        const { x, y } = getTile('P')[0];
        const { newX, newY } = newCoordinatesInDirection(x, y, direction);

        if (!isOutOfBounds(newX, newY) && checkPlayerMove(newX, newY)) {
            dispatch(setTile(x, y, 'G'));
            dispatch(setTile(newX, newY, 'P'));
            dispatch(setMoves(stats.moves+1));
            moveWolves();
        }
    };

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