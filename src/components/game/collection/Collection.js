import useStyles from './styles';
import * as constants from '../../../constants';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid } from '@mui/material';
import { toggleCollection, collectionSelect } from '../../../actions/game';
import { swordIcon, carrotIcon, emptyIcon, bookIcon, itemIcons, loreIcons } from '../../../images';

const Collection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const game = useSelector((state) => state.game);
    const [tab, setTab] = useState('items');
    const [showLore, setShowLore] = useState(false);

    const doToggleCollection = () => {
        setShowLore(false);
        dispatch(toggleCollection())
    };
    
    const doCollectionSelect = (id) => (
        dispatch(collectionSelect(id))
    );

    const updateTab = (tab) => {
        setShowLore(false);
        const firstItem = tab === 'items'
            ? game.collection.find((item) => item.found > 0)
            : tab === 'books'
                ? game.lore.find((book) => book.found > 0)
                : game.lore.find((book) => book.found > 0); // Change to achievements
        dispatch(collectionSelect(firstItem.id));
        setTab(tab);
    };

    return <>
        {showLore ?
            <div className={classes.loreContainer}>
                {constants.loreDict[game.collectionSelect].lore.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                ))}
                <button className={classes.readButton} type="button" onClick={() => setShowLore(false)}>CLOSE</button>
            </div>
        : null}
        <Container className={classes.outerContainer}>
            <p className={classes.title}>Collection</p>

            <div>
                <button className={classes.tabButton} type="button" onClick={() => updateTab('items')}>Items</button>
                <button className={classes.tabButton} type="button" onClick={() => updateTab('books')}>Books</button>
                <button className={classes.tabButton} type="button" onClick={() => updateTab('achievements')}>Achievements</button>
            </div>
            <hr />
            {/*TODO: Put tabs into their own components */}
            {
                tab === 'items' && (
                    <Grid container direction="row" className={classes.itemList}>
                        <Grid item container>
                            {
                                constants.itemDict.map((item, i) => (
                                    i !== 0 && (
                                        <Grid item key={i} className={game.collectionSelect === i ? classes.selectedItem : classes.collectionItem}>
                                            {
                                                game.collection[i].found === 0
                                                    ? <img className={classes.collectionIcon} src={emptyIcon} alt="emptyIcon" />
                                                    : <img className={classes.collectionIcon} src={itemIcons[i]} alt={item.name} onClick={() => doCollectionSelect(i)} />
                                            }
                                        </Grid>
                                    )
                                ))
                            }
                        </Grid>

                        <Grid item className={classes.itemSlot}>
                            <img className={classes.slotIcon} src={itemIcons[game.collectionSelect]} alt={constants.itemDict[game.collectionSelect].name} />
                            <img className={classes.itemTypeIcon} src={constants.itemDict[game.collectionSelect].type === 'weapon' ? swordIcon : carrotIcon} alt="typeIcon" />    
                            <p className={classes.itemTitle}>
                                <b>{constants.itemDict[game.collectionSelect].name}</b>
                            </p>
                            <p className={classes.itemDescription}>
                                {constants.itemDict[game.collectionSelect].description}
                            </p>
                            <p className={classes.itemFlavor}>
                                <i>'{constants.itemDict[game.collectionSelect].flavor}'</i>
                            </p>
                            <p className={classes.itemFlavor}>
                                Found: {game.collection[game.collectionSelect].found}
                            </p>
                            {
                                constants.itemDict[game.collectionSelect].type === 'superCarrot' &&
                                <p className={classes.itemDescription}>
                                        Used: {game.collection[game.collectionSelect].used}
                                    </p>
                            }
                            <br/>
                        </Grid>
                    </Grid>
                )
            }

            {
                tab === 'books' && (
                    <Grid container direction="row" className={classes.itemList}>
                        <Grid item container>
                            {constants.loreDict.map((item, i) => (
                                i !== 0 && (
                                    <Grid item key={i} className={game.collectionSelect === i ? classes.selectedItem : classes.collectionItem}>
                                        {
                                            game.lore[i].found === 0
                                                ? <img className={classes.collectionIcon} src={emptyIcon} alt="emptyIcon" />
                                                : <img className={classes.collectionIcon} src={loreIcons[i]} alt={item.name} onClick={() => doCollectionSelect(i)} />
                                        }
                                    </Grid>
                                )
                            ))}
                        </Grid>

                        <Grid item className={classes.itemSlot}>
                            <img className={classes.slotIcon} src={loreIcons[game.collectionSelect]} alt={constants.loreDict[game.collectionSelect].name} />
                            <img className={classes.itemTypeIcon} src={bookIcon} alt="bookIcon" />    
                            <p className={classes.itemTitle}>
                                <b>{constants.loreDict[game.collectionSelect].name}</b>
                            </p>
                            <p className={classes.itemDescription}>
                                {constants.loreDict[game.collectionSelect].description}
                            </p>
                            <p  className={classes.itemFlavor}>
                                <i>'{constants.loreDict[game.collectionSelect].flavor}'</i>
                            </p>
                            <button className={classes.readButton} type="button" onClick={() => setShowLore(true)}>
                                READ
                            </button>
                            <br />
                        </Grid>
                    </Grid>
                )
            }

            {
                tab === 'achievements' &&
                    <p style={{color: 'white', fontFamily: 'Verdana'}}>
                        Coming soon...
                    </p>
            }

            <button className={classes.closeButton} onClick={doToggleCollection}>
                Close
            </button>
        </Container>
    </>
};

export default Collection;