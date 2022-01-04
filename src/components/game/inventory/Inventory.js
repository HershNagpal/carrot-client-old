import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Button } from '@mui/material';
import { toggleInventory } from '../../../actions/game';
import { swordIcon, carrotIcon, pocketIcon, emptyIcon, itemIcons } from '../../../images';
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
                    <Typography variant="h6">Press 'V' to swap with pocket.</Typography>
                    <hr />
                </Grid>

                {game.inventoryWeapon > 0
                    ? <Grid item className={classes.itemSlot}>
                        <img src={swordIcon} alt="swordIcon" width="50vw" />
                        <img className={classes.slotIcon} src={itemIcons[game.inventoryWeapon]} alt={itemIcons[game.inventoryWeapon].name} width="50vw" />
                        <Typography variant="h6"><b>{constants.itemDict[game.inventoryWeapon].name}</b></Typography>
                        <Typography>{constants.itemDict[game.inventoryWeapon].description}</Typography>
                        <Typography><i>'{constants.itemDict[game.inventoryWeapon].flavor}'</i></Typography>
                        <br />
                    </Grid>
                    : <Grid item className={classes.itemSlot}>
                        <img src={swordIcon} alt="swordIcon" width="50vw" />
                        <img className={classes.slotIcon} src={emptyIcon} alt="emptyIcon" width="50vw" />
                        <Typography>No weapon equipped.</Typography>
                        <br />
                    </Grid>
                }

                {game.inventorySuperCarrot > 0
                    ? <Grid item className={classes.itemSlot}>
                        <img src={carrotIcon} alt="carrotIcon" width="50vw" />
                        <img className={classes.slotIcon} src={itemIcons[game.inventorySuperCarrot]} alt={itemIcons[game.inventorySuperCarrot].name} width="50vw" />
                        <Typography variant="h6"><b>{constants.itemDict[game.inventorySuperCarrot].name}</b></Typography>
                        <Typography>{constants.itemDict[game.inventorySuperCarrot].description}</Typography>
                        <Typography><i>'{constants.itemDict[game.inventorySuperCarrot].flavor}'</i></Typography>
                        <br />
                    </Grid>
                    : <Grid item className={classes.itemSlot}>
                        <img src={carrotIcon} alt="carrotIcon" width="50vw" />
                        <img className={classes.slotIcon} src={emptyIcon} alt="emptyIcon" width="50vw" />
                        <Typography>No super carrot equipped.</Typography>
                        <br />
                    </Grid>
                }

                {game.pocketItem > 0
                    ? <Grid item className={classes.itemSlot}>
                        <img src={pocketIcon} alt="pocketIcon" width="50vw" />
                        <img className={classes.slotIcon} src={itemIcons[game.pocketItem]} alt={itemIcons[game.pocketItem].name} width="50vw" />
                        <Typography variant="h6"><b>{constants.itemDict[game.pocketItem].name}</b></Typography>
                        <Typography>{constants.itemDict[game.pocketItem].description}</Typography>
                        <Typography><i>'{constants.itemDict[game.pocketItem].flavor}'</i></Typography>
                        <br />
                    </Grid>
                    : <Grid item className={classes.itemSlot}>
                        <img src={pocketIcon} alt="pocketIcon" width="50vw" />
                        <img className={classes.slotIcon} src={emptyIcon} alt="emptyIcon" width="50vw" />
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