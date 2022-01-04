import useStyles from './styles';
import * as constants from '../../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Button } from '@mui/material';
import { toggleCollection } from '../../../actions/game';
import Carrots from './carrots/Carrots';
import Weapons from './weapons/Weapons';
import { swordIcon, carrotIcon, itemIcons } from '../../../images';

const Collection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const game = useSelector((state) => state.game);

    const doToggleCollection = () => (
        dispatch(toggleCollection())
    );
    
    return <>
        <Container className={classes.outerContainer}>
            <Typography variant="h4">Collection</Typography>
            <hr />

            <Grid container direction="row">
                <Grid container item className={classes.itemGrid} direction="column">
                    <Grid item>
                        <Carrots />
                    </Grid>

                    <Grid item>
                        <Weapons />
                    </Grid>
                </Grid>

                <Grid item className={classes.infoBox}>
                    <img className={classes.typeIcon} src={constants.itemDict[game.collectionSelect].type === 'weapon' ? swordIcon : carrotIcon} alt="typeIcon" />
                    <img className={classes.itemIcon} src={itemIcons[game.collectionSelect]} alt={constants.itemDict[game.collectionSelect]} /><br />
                    <Typography variant="h6"><b>{constants.itemDict[game.collectionSelect].name}</b></Typography>
                    <Typography>{constants.itemDict[game.collectionSelect].description}</Typography>
                    <Typography>Found: {game.collection[game.collectionSelect].found}</Typography>
                    {
                        constants.itemDict[game.collectionSelect].type === 'superCarrot'
                            ? <Typography>Used: {game.collection[game.collectionSelect].used}</Typography>
                            : null
                    }
                    <br />
                    <Typography><i>'{constants.itemDict[game.collectionSelect].flavor}'</i></Typography>
                </Grid>
            </Grid>

            <Button variant="contained" color="primary" onClick={doToggleCollection}>Close</Button>
        </Container>
    </>
};

export default Collection;