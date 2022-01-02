import { Container, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
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
                <Grid item className={game.collectionSelect === 1 ? classes.selectedItem : classes.collectionItem}>
                {
                    game.collection[1].found === 0
                        ? <img className={classes.collectionIcon} src={emptyIcon} alt="emptyIcon" />
                        : <img className={classes.collectionIcon} src={itemIcons[1]} alt="riddleCarrotIcon" onClick={() => doCollectionSelect(1)} />
                }
                </Grid>

                <Grid item className={game.collectionSelect === 2 ? classes.selectedItem : classes.collectionItem}>
                {
                    game.collection[2].found === 0
                        ? <img className={classes.collectionIcon} src={emptyIcon} alt="emptyIcon" />
                        : <img className={classes.collectionIcon} src={itemIcons[2]} alt="mithrilCarrotIcon" onClick={() => doCollectionSelect(2)} />
                }
                </Grid>

                <Grid item className={game.collectionSelect === 3 ? classes.selectedItem : classes.collectionItem}>
                    <img className={classes.collectionIcon} src={itemIcons[3]} alt="relentlessCarrotIcon" onClick={() => doCollectionSelect(3)} />
                </Grid>

                <Grid item className={game.collectionSelect === 4 ? classes.selectedItem : classes.collectionItem}>
                {
                    game.collection[4].found === 0
                        ? <img className={classes.collectionIcon} src={emptyIcon} alt="emptyIcon" />
                        : <img className={classes.collectionIcon} src={itemIcons[4]} alt="lifeCarrotIcon" onClick={() => doCollectionSelect(4)} />
                }
                </Grid>
            </Grid>
        </Container>
    </>;
};

export default Carrots;