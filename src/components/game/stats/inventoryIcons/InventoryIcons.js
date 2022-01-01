import { Container, Grid } from '@material-ui/core';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import * as constants from '../../../../constants';
import { fenceIcon, carrotOutlineIcon, swordIcon, pocketIcon, itemIcons } from '../../../../images';

const InventoryIcons = () => {
    const game = useSelector((state) => state.game);
    const classes = useStyles();

    return <>
        <Container className={classes.inventoryContainer}>
            <Grid container direction="row">
                <Grid item container >
                    <Grid item className={classes.iconContainer}>
                        <div>
                            <div className={classes.smallIconContainer}>{constants.itemDict[game.inventoryWeapon].damage}</div>
                            <img className={classes.icon} src={itemIcons[game.inventoryWeapon]} alt="swordIcon" />
                        </div>
                    </Grid>

                    <Grid item className={classes.iconContainer}>
                        <div>
                            <div className={classes.smallIconContainer}>{game.inventoryFences}</div>
                            <img className={classes.icon} src={fenceIcon} alt="fenceIcon" />
                        </div>
                    </Grid>

                </Grid>

                <Grid item container>
                    <Grid item className={classes.iconContainer}>
                        <div>
                            <img className={classes.icon}
                                src={game.inventorySuperCarrot > 0 ? itemIcons[game.inventorySuperCarrot] : carrotOutlineIcon}
                                alt={game.inventorySuperCarrot > 0 ? constants.itemDict[game.inventorySuperCarrot].name : "carrotOutlineIcon"} />
                        </div>
                    </Grid>
                    
                    <Grid item className={classes.iconContainer}>
                        <div>
                            <img className={classes.icon} src={game.pocketItem > 0 ? itemIcons[game.pocketItem] : pocketIcon} alt={game.pocketItem > 0 ? "carrotIcon" : "pocketIcon"} />
                        </div>
                    </Grid>
                </Grid>
                

            </Grid>
        </Container>
    </>
};

export default InventoryIcons;