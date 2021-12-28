import { Container, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { useKeyData } from './keyListenerHook';
import { initGrid, movePlayer, changeDirection, attack } from '../../actions/game';
import Tile from './tile/Tile';

const GameGrid = () => {
    const game = useSelector((state) => state.game);
    const dispatch = useDispatch();
    const classes = useStyles();

    const keyData = useKeyData();
    const keyPressed = keyData[0];

    useEffect(() => {
        // if (!keyPressed.disabled) {
        if (!game.gameOver) {
            if (keyPressed.key === 'w' || keyPressed.key === 's' || keyPressed.key === 'a' || keyPressed.key === 'd') {
                dispatch(movePlayer(keyPressed.key));
                dispatch(changeDirection(keyPressed.key));
            } else if (keyPressed.key === 'ArrowUp' || keyPressed.key === 'ArrowDown' || keyPressed.key === 'ArrowLeft' || keyPressed.key === 'ArrowRight') {
                dispatch(changeDirection(keyPressed.key));
            } else if (keyPressed.key === ' ') {
                dispatch(attack());
            }
        }
    }, [keyPressed, game.gameOver, dispatch]);

    useEffect(() => {
        dispatch(initGrid());
    }, [dispatch]);

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