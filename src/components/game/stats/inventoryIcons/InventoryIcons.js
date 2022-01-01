import { Container, Grid } from '@material-ui/core';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { fenceIcon, carrotIcon, swordIcon, grassIcon } from '../../../../images';

const InventoryIcons = () => {
    const game = useSelector((state) => state.game);
    const classes = useStyles();

    return <>
        <Container className={classes.inventoryContainer}>
            <Grid container direction="row">
                <Grid item container >
                    <Grid item className={classes.iconContainer}>
                        <div>
                            <div className={classes.fenceAmount}>{game.inventoryWeapon}</div>
                            <img className={classes.icon} src={swordIcon} alt="swordIcon" />
                        </div>
                    </Grid>

                    <Grid item className={classes.iconContainer}>
                        <div>
                            <div className={classes.fenceAmount}>{game.inventoryFences}</div>
                            <img className={classes.icon} src={fenceIcon} alt="fenceIcon" />
                        </div>
                    </Grid>

                </Grid>

                <Grid item container>
                    <Grid item className={classes.iconContainer}>
                        <div>
                            <div className={classes.fenceAmount}>{game.inventorySuperCarrot}</div>
                            <img className={classes.icon} src={carrotIcon} alt="carrotIcon" />
                        </div>
                    </Grid>
                    
                    <Grid item className={classes.iconContainer}>
                        <div>
                            <div className={classes.fenceAmount}>{game.pocketItem}</div>
                            <img className={classes.icon} src={grassIcon} alt="grassIcon" />
                        </div>
                    </Grid>
                </Grid>
                

            </Grid>
        </Container>
    </>
};

export default InventoryIcons;