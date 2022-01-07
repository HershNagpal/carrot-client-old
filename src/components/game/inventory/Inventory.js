import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid } from '@mui/material';
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
            <Grid container direction="column" >
                <Grid item width={'100%'}>
                    <p className={classes.title}>Inventory</p>
                    <p className={classes.subtitle}>Press 'V' to swap with pocket.</p>
                    <hr />
                </Grid>

                {game.inventoryWeapon > 0
                    ? <Grid item className={classes.itemSlot}>
                        <p className={classes.inventoryLabel}>Weapon</p>
                        <img className={classes.slotIcon} src={itemIcons[game.inventoryWeapon]} alt={itemIcons[game.inventoryWeapon].name} width="50vw" />
                        <img src={swordIcon} className={classes.itemTypeIcon} alt="swordIcon" />
                        <p className={classes.itemTitle}><b>{constants.itemDict[game.inventoryWeapon].name}</b> </p>
                        <p className={classes.itemDescription}>{constants.itemDict[game.inventoryWeapon].description} </p>
                        <p className={classes.itemFlavor}><i>'{constants.itemDict[game.inventoryWeapon].flavor}'</i> </p>
                        <br />
                    </Grid>
                    : <Grid item className={classes.itemSlot}>
                        <img src={swordIcon} alt="swordIcon" className={classes.itemTypeIcon} />
                        <img className={classes.slotIcon} src={emptyIcon} alt="emptyIcon" width="50vw" />
                        <p className={classes.itemDescription}>No weapon equipped.</p>
                        <br />
                    </Grid>
                }

                {game.inventorySuperCarrot > 0
                    ? <Grid item className={classes.itemSlot}>
                        <img className={classes.slotIcon} src={itemIcons[game.inventorySuperCarrot]} alt={itemIcons[game.inventorySuperCarrot].name} width="50vw" />
                        <img src={carrotIcon} className={classes.itemTypeIcon} alt="carrotIcon" />
                        <p className={classes.itemTitle}><b>{constants.itemDict[game.inventorySuperCarrot].name}</b></p>
                        <p className={classes.itemDescription}>{constants.itemDict[game.inventorySuperCarrot].description}</p>
                        <p className={classes.itemFlavor}><i>'{constants.itemDict[game.inventorySuperCarrot].flavor}'</i></p>
                        <br />
                    </Grid>
                    : <Grid item className={classes.itemSlot}>
                        <img className={classes.slotIcon} src={emptyIcon} alt="emptyIcon" width="50vw" />
                        <img src={carrotIcon} alt="carrotIcon" className={classes.itemTypeIcon} />
                        <p className={classes.itemDescription}>No super carrot equipped.</p>
                        <br />
                    </Grid>
                }

                {game.pocketItem > 0
                    ? <Grid item className={classes.itemSlot}>
                        <img className={classes.slotIcon} src={itemIcons[game.pocketItem]} alt={itemIcons[game.pocketItem].name} width="50vw" />
                        <img src={pocketIcon} alt="pocketIcon" className={classes.itemTypeIcon} />
                        <p className={classes.itemTitle} ><b>{constants.itemDict[game.pocketItem].name}</b></p>
                        <p className={classes.itemDescription}>{constants.itemDict[game.pocketItem].description}</p>
                        <p className={classes.itemFlavor}><i>'{constants.itemDict[game.pocketItem].flavor}'</i></p>
                        <br />
                    </Grid>
                    : <Grid item className={classes.itemSlot}>
                        <img className={classes.slotIcon} src={emptyIcon} alt="emptyIcon" width="50vw" />
                        <img src={pocketIcon} alt="pocketIcon" className={classes.itemTypeIcon} />
                        <p className={classes.itemDescription}>No item in pocket.</p>
                        <br />
                    </Grid> 
                }
                <button onClick={doToggleInventory} className={classes.closeButton}>Close</button>
            </Grid>
        </Container>
    </>
};

export default Inventory;