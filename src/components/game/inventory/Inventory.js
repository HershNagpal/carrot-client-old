import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { toggleInventory } from '../../../actions/game';
import { swordIcon, carrotIcon, grassIcon } from '../../../images';
import * as constants from '../../../constants';

const Inventory = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const game = useSelector((state) => state.game);

    const doToggleInventory = () => (
        dispatch(toggleInventory())
    );
    
    return <>
        <Container className={classes.outerContainer}>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h4">Inventory</Typography>
                    <hr />
                </Grid>

                {game.inventoryWeapon >= 0
                    ? <Grid item>
                        <img src={swordIcon} alt="swordIcon" width="50vw" />
                        <Typography>{constants.itemDict[game.inventoryWeapon].name}</Typography>
                        <Typography>{constants.itemDict[game.inventoryWeapon].description}</Typography>
                        <Typography><i>'{constants.itemDict[game.inventoryWeapon].flavor}'</i></Typography>
                        <br />
                    </Grid>
                    : <Grid item>
                        <img src={swordIcon} alt="swordIcon" width="50vw" />
                        <Typography>No weapon equipped.</Typography>
                        <br />
                    </Grid>
                }

                {game.inventorySuperCarrot >= 0
                    ? <Grid item>
                        <img src={carrotIcon} alt="carrotIcon" width="50vw" />
                        <Typography>{constants.itemDict[game.inventorySuperCarrot].name}</Typography>
                        <Typography>{constants.itemDict[game.inventorySuperCarrot].description}</Typography>
                        <Typography><i>'{constants.itemDict[game.inventorySuperCarrot].flavor}'</i></Typography>
                        <br />
                    </Grid>
                    : <Grid item>
                        <img src={carrotIcon} alt="carrotIcon" width="50vw" />
                        <Typography>No super carrot equipped.</Typography>
                        <br />
                    </Grid>
                }

                {game.pocketItem >= 0
                    ? <Grid item>
                        <img src={grassIcon} alt="grassIcon" width="50vw" />
                        <Typography>{constants.itemDict[game.pocketItem].name}</Typography>
                        <Typography>{constants.itemDict[game.pocketItem].description}</Typography>
                        <Typography><i>'{constants.itemDict[game.pocketItem].flavor}'</i></Typography>
                        <br />
                    </Grid>
                    : <Grid item>
                        <img src={grassIcon} alt="grassIcon" width="50vw" />
                        <Typography>No item in pocket.</Typography>
                        <br />
                    </Grid>
                }
                
                <Grid item>
                    <Button variant="contained" color="primary" onClick={doToggleInventory}>Close</Button>
                </Grid>
            </Grid>
        </Container>
    </>
};

export default Inventory;