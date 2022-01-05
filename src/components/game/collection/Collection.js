import useStyles from './styles';
import * as constants from '../../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid } from '@mui/material';
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
            <p className={classes.title}>Collection</p>
            <hr />

            <Grid container direction="row" className={classes.itemList}>
                <Grid container item className={classes.itemGrid} direction="column">
                    <Grid item>
                        <Carrots />
                    </Grid>

                    <Grid item>
                        <Weapons />
                    </Grid>
                </Grid>

                <Grid item className={classes.itemSlot}>
                    <img className={classes.slotIcon} src={itemIcons[game.collectionSelect]} alt={constants.itemDict[game.collectionSelect]} />
                    <img className={classes.itemTypeIcon} src={constants.itemDict[game.collectionSelect].type === 'weapon' ? swordIcon : carrotIcon} alt="typeIcon" />    
                    <p className={classes.itemTitle}><b>{constants.itemDict[game.collectionSelect].name}</b></p>
                    <p className={classes.itemDescription}>{constants.itemDict[game.collectionSelect].description}</p>
                    <p  className={classes.itemFlavor}><i>'{constants.itemDict[game.collectionSelect].flavor}'</i></p>
                    <p className={classes.itemFlavor}>Found: {game.collection[game.collectionSelect].found}</p>
                    {
                        constants.itemDict[game.collectionSelect].type === 'superCarrot'
                            ? <p className={classes.itemDescription}>Used: {game.collection[game.collectionSelect].used}</p>
                            : null
                    }
                    <br />
                    
                </Grid>
            </Grid>

            <button className={classes.closeButton} onClick={doToggleCollection}>Close</button>
        </Container>
    </>
};

export default Collection;