import { Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useKeyData } from './keyListenerHook';
import { initGrid, movePlayer, changeDirection, attack, consumeSuperCarrot, swapPocket, placeFence, toggleInventory, toggleCollection } from '../../../actions/game';
import useStyles from './styles';
import Tile from './tile/Tile';

const GameGrid = () => {
    const game = useSelector((state) => state.game);
    const dispatch = useDispatch();
    const classes = useStyles();

    const keyData = useKeyData();
    const keyPressed = keyData[0];

    useEffect(() => {
        if (game.gameOver) { return; }

        const key = keyPressed.key.toLowerCase();
        if (game.isInInventory || game.isInCollection) { //TODO: split into inventory and collection keypresses
            switch (key) {
                case 'i':
                    if (game.isInCollection) { dispatch(toggleCollection()); } 
                    dispatch(toggleInventory());
                    break;
                case 'u':
                    if (game.isInInventory) { dispatch(toggleInventory()); }
                    dispatch(toggleCollection());
                    break;
                case 'v':
                    dispatch(swapPocket());
                    break;
                default:
                    break;
            }
        } else {
            switch (key) { //TODO: split movePlayer into directions instead of passing in key 
                case 'w':
                case 's':
                case 'a':
                case 'd':
                    dispatch(movePlayer(key));
                    dispatch(changeDirection(key));
                    break;
                case 'arrowup':
                case 'arrowdown':
                case 'arrowleft':
                case 'arrowright':
                    dispatch(changeDirection(key));
                    break;
                case ' ':
                    dispatch(attack());
                    break;
                case 'c':
                    dispatch(consumeSuperCarrot());
                    break;
                case 'f':
                    dispatch(placeFence());
                    break;
                case 'i':
                    dispatch(toggleInventory());
                    break;
                case 'u':
                    dispatch(toggleCollection());
                    break;
                case 'v':
                    dispatch(swapPocket());
                    break;
                default:
                    break;
            }
        }
    }, [keyPressed, game.gameOver, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(initGrid());
    }, [dispatch]);

    return <>
        <Container className={classes.outerContainer} maxWidth={false} disableGutters>
            <Grid container direction="column" wrap="nowrap">
                {
                    game.grid.map((row, Yindex) => (
                        <Grid item container key={Yindex} direction="row" wrap="nowrap">
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