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
            const key = keyPressed.key.toLowerCase();
            if (key === 'w' || key === 's' || key === 'a' || key === 'd') {
                dispatch(movePlayer(key));
                dispatch(changeDirection(key));
            } else if (key === 'arrowup' || key === 'arrowdown' || key === 'arrowleft' || key === 'arrowright') {
                dispatch(changeDirection(key));
            } else if (key === ' ') {
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
                                    <Tile type={tile.entity.type} hp={tile.entity.hp} maxHp={tile.entity.maxHp}/>
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