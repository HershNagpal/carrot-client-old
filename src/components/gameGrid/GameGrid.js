import { Container, Grid, Button } from '@material-ui/core';
import { useEffect, useCallback } from 'react';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { setTile } from '../../actions/game.js';
import { setScore, setMoves } from '../../actions/stats.js'
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
                        coords.push( {x: Xindex, y: Yindex} );
                    }
                }
            )
        );
        if (coords === undefined) {
            console.log(search + ' not found in getTile');
        }
        return coords;
    };

    const checkPlayerMove = (x, y) => {
        const nextTile = grid[y][x]
        switch (nextTile) {
            case "C":
                dispatch(setScore(stats.score+1));
                return true;
            case "F":
                return false;
            case "W":
                return false;
            case "G":
                return true;
            default:
                return true;
        }
    };

    const checkWolfMove = (x, y) => {
        const nextTile = grid[y][x]
        switch (nextTile) {
            case "C":
                dispatch(setScore(stats.score-1));
                return true;
            case "F":
                return false;
            case "W":
                return false;
            case "G":
                return true;
            default:
                return true;
        }
    }

    const moveWolves = () => {
        const wolves = getTile("W");
        const { playerX, playerY } = getTile("P")[0];
        
        wolves.forEach( (wolf) => {
            const vDistance = Math.abs(playerY - wolf.y);
            const hDistance = Math.abs(playerX - wolf.x);

            // Up and Left
            if (vDistance > 0 && hDistance > 0) {
                if (vDistance >= hDistance) { /* Move wolf up */ }
                else { /* Move wolf left */ }
            } 
            // Up and Right
            else if (vDistance > 0 && hDistance > 0) {
                if (vDistance >= hDistance) { /* Move wolf up */ }
                else { /* Move wolf right */ }
            }
            // Down and Left
            else if (vDistance > 0 && hDistance > 0) {
                if (vDistance >= hDistance) { /* Move wolf up */ }
                else { /* Move wolf left */ }
            }
            // Down and Right
            else if (vDistance > 0 && hDistance > 0) {
                if (vDistance >= hDistance) { /* Move wolf up */ }
                else { /* Move wolf left */ }
            }
        });
    };

    const movePlayer = (direction) => {
        const {x, y} = getTile('P')[0];
        let { newX, newY } = newCoordinatesInDirection(x, y, direction)

        if (!isOutOfBounds(newX, newY) && checkPlayerMove(newX, newY)) {
            dispatch(setTile(x, y, ''));
            dispatch(setTile(newX, newY, "P"));
            dispatch(setMoves(stats.moves+1));
        }
    };

    const newCoordinatesInDirection = (x, y, direction) => {
        switch (direction) {
            case "w":
                return {newX: x, newY: y-1};
            case "a":
                return {newX: x-1, newY: y};
            case "s":
                return {newX: x, newY: y+1};
            case "d":
                return {newX: x+1, newY: y};
        }
    };

    const handleKeyPress = useCallback( (event) => {
        if (event.key === 'w' || event.key === 's' || event.key === 'a' || event.key === 'd') {
            movePlayer(event.key);
        }
    }, [movePlayer]);

    useEffect( () => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, [handleKeyPress]);

    const spawnCarrot = () => {
        const x = Math.floor(Math.random() * 15);
        const y = Math.floor(Math.random() * 15);
        dispatch(setTile(x, y, 'C'));
    };

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
            <Button color="primary" variant="contained" onClick={() => movePlayer('w')}>Up</Button>
            <Button color="primary" variant="contained" onClick={() => movePlayer('s')}>Down</Button>
            <Button color="primary" variant="contained" onClick={() => movePlayer('a')}>Left</Button>
            <Button color="primary" variant="contained" onClick={() => movePlayer('d')}>Right</Button>
            <Button color="primary" variant="contained" onClick={spawnCarrot}>carrotify</Button>
        </Container>
    </>
};

export default GameGrid;