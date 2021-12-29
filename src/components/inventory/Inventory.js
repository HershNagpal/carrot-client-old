import { Container, Grid } from '@material-ui/core';
import useStyles from '../stats/styles';
import { useSelector } from 'react-redux';
import { fenceIcon } from '../../images';

const Inventory = () => {
    const game = useSelector((state) => state.game);
    const classes = useStyles();

    return <>
        <Container className={classes.inventoryContainer}>
            <Grid container>
                <Grid item >
                    <div className={classes.fenceContainer}>
                        {/* <img className={classes.fence} src={fenceIcon}/> */}
                    </div>
                </Grid>

            </Grid>
        </Container>
    </>
};

export default Inventory;