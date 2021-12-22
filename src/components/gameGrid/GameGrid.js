import { Container, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { useKeyData } from './keyListenerHook';
import { initGrid, movePlayer, changeDirection } from '../../actions/game';
import Tile from './tile/Tile';

const GameGrid = () => {
    const game = useSelector((state) => state.game);
    const dispatch = useDispatch();
    const classes = useStyles();

    const keyData = useKeyData();
    const keyPressed = keyData[0];

    useEffect( () => {
        dispatch(initGrid());
    }, [dispatch]);

    /*const checkWolfMove = (x, y) => {
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
    }*/

    /**
     * Potential issue with wolves getting blocked if their current direction is blocked.
     * They won't try other directions even if they can. There are bugs with multiple wolves 
     * overlapping and eating each other and the player.
     * Also this function is FAT
     */
    /*const moveWolves = () => {
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
    };*/

    useEffect( () => {
        if (!keyPressed.disabled) {
            if (keyPressed.key === 'w' || keyPressed.key === 's' || keyPressed.key === 'a' || keyPressed.key === 'd') {
                dispatch(movePlayer(keyPressed.key));
                dispatch(changeDirection(keyPressed.key));
            } else if (keyPressed.key === 'ArrowUp' || keyPressed.key === 'ArrowDown' || keyPressed.key === 'ArrowLeft' || keyPressed.key === 'ArrowRight') {
                dispatch(changeDirection(keyPressed.key));
            }
        }
    }, [keyPressed, dispatch]);

    return <>
        <Container className={classes.outerContainer}>
            <Grid container direction="column">
                {
                game.grid.map((row, Yindex) => (
                    <Grid item container key={Yindex} direction="row">
                        {
                            row.map((tile, Xindex) => (
                                <Grid item key={Xindex}>
                                    <Tile type={tile.entity.type}/>
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