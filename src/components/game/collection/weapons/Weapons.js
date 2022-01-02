import { Container, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { collectionSelect } from '../../../../actions/game';
import { emptyIcon, itemIcons } from '../../../../images';
import useStyles from './styles';

const Carrots = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const game = useSelector((state) => state.game);

    const doCollectionSelect = (id) => (
        dispatch(collectionSelect(id))
    );

    return <>
        <Container>
            <Grid container>
                <Grid item className={game.collectionSelect === 5 ? classes.selectedItem : classes.collectionItem}>
                    <img className={classes.collectionIcon} src={itemIcons[5]} alt="pitchforkIcon" onClick={() => doCollectionSelect(5)} />
                </Grid>

                <Grid item className={game.collectionSelect === 6 ? classes.selectedItem : classes.collectionItem}>
                {
                    game.collection[6].found === 0
                        ? <img className={classes.collectionIcon} src={emptyIcon} alt="emptyIcon" />
                        : <img className={classes.collectionIcon} src={itemIcons[6]} alt="squiresBladeIcon" onClick={() => doCollectionSelect(6)} />
                }
                </Grid>
            </Grid>
        </Container>
    </>;
};

export default Carrots;