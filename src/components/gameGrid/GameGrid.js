import { Container, Grid, Button } from '@material-ui/core';
import { useEffect, useCallback } from 'react';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { setTile } from '../../actions/game.js';
import { setScore } from '../../actions/stats.js'
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
        let coords; // TODO Fix stinky Mutation
        grid.forEach( (row, Yindex) => 
            row.forEach( (tile, Xindex) => {
                    if(tile === search) {
                        coords = {x: Xindex, y: Yindex};
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
                break;
        }

    };

    const movePlayer = (direction) => {
        const {x, y} = getTile('P');

        switch (direction) {
            case 'w':
                if (!isOutOfBounds(x, y-1) && checkPlayerMove(x, y-1)) {
                    dispatch(setTile(x, y, ''));
                    dispatch(setTile(x, y-1, 'P'));
                }
                break;
            case 's':
                if (!isOutOfBounds(x, y+1) && checkPlayerMove(x, y+1)) {
                    dispatch(setTile(x, y, ''));
                    dispatch(setTile(x, y+1, 'P'));
                }
                break;
            case 'a':
                if (!isOutOfBounds(x-1, y) && checkPlayerMove(x-1, y)) {
                    dispatch(setTile(x, y, ''));
                    dispatch(setTile(x-1, y, 'P'));
                }
                break;
            case 'd':
                if (!isOutOfBounds(x+1, y) && checkPlayerMove(x+1, y)) {
                    dispatch(setTile(x, y, ''));
                    dispatch(setTile(x+1, y, 'P'));
                }
                break;
            default:
                break;
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