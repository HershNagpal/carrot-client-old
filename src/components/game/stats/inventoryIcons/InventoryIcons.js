import { Container, Grid } from '@mui/material';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import * as constants from '../../../../constants';
import { fenceIcon, carrotOutlineIcon, pocketIcon, itemIcons } from '../../../../images';

const InventoryIcons = () => {
    const game = useSelector((state) => state.game);
    const classes = useStyles();
    const iconMargins = '1vh';

    return <>
        <Container className={classes.inventoryContainer} disableGutters>
            <Grid container direction="column" justifyContent="center">
                <Grid item container direction="row" justifyContent="center">
                    <Grid item className={classes.iconContainer} style={{margin: iconMargins}}> 
                        <div className={classes.smallIconContainer}>{constants.itemDict[game.inventoryWeapon].damage}</div>
                        <img className={classes.icon} src={itemIcons[game.inventoryWeapon]} alt="swordIcon" />
                    </Grid>

                    <Grid item className={classes.iconContainer} style={{margin: iconMargins}}>
                        <div className={classes.smallIconContainer}>{game.inventoryFences}</div>
                        <img className={classes.icon} src={fenceIcon} alt="fenceIcon" />
                    </Grid>
                </Grid>

                <Grid item container direction="row" justifyContent="center">
                    <Grid item className={classes.iconContainer} style={{margin: iconMargins}}>
                        <img className={classes.icon}
                            src={game.inventorySuperCarrot > 0 ? itemIcons[game.inventorySuperCarrot] : carrotOutlineIcon}
                            alt={game.inventorySuperCarrot > 0 ? constants.itemDict[game.inventorySuperCarrot].name : "carrotOutlineIcon"} />
                    </Grid>

                    <Grid item className={classes.iconContainer} style={{margin: iconMargins}}>
                        <img className={classes.icon} src={game.pocketItem > 0 ? itemIcons[game.pocketItem] : pocketIcon} alt={game.pocketItem > 0 ? "carrotIcon" : "pocketIcon"} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </>
};

export default InventoryIcons;