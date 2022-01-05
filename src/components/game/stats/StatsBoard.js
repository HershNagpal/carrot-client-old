import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Grid, Container, IconButton } from '@mui/material';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { getPlayerTile } from '../../../reducers/selectors';
import { useDispatch } from 'react-redux';
import { toggleInventory, toggleCollection } from '../../../actions/game';
import InventoryIcons from './inventoryIcons/InventoryIcons';
import HomeIcon from '@mui/icons-material/Home';
import BackpackIcon from '@mui/icons-material/Backpack';
import BookIcon from '@mui/icons-material/Book';
import ProgressBar from './progressBar/ProgressBar';

const StatsBoard = () => {
    const game = useSelector((state) => state.game);
    const playerTile = getPlayerTile(game.grid);
    const classes = useStyles(90);
    const dispatch = useDispatch();
    const [popup, setPopup] = useState(false);

    const hpStat = {
        value: playerTile !== undefined ? playerTile.entity.hp : 0,
        max: playerTile !== undefined ? playerTile.entity.maxHp : 0,
    };

    const xpStat = {
        value: game !== undefined ? game.xp : 0,
        max: game !== undefined ? game.maxXp : 0,
        level: game.level,
    };

    const doToggleInventory = () => (
        dispatch(toggleInventory())
    );

    const doToggleCollection = () => (
        dispatch(toggleCollection())
    );

    const doTogglePopup = () => (
        setPopup(!popup)
    );

    useEffect(() => {
        const log = document.getElementById('logContainer');
        log.scrollTop = log.scrollHeight - log.clientHeight;
    }, [game.log]);

    return <>
        {
            popup
                ? (
                    <div className={classes.popupContainer}>
                        <p className={classes.popupText}>Are you sure you want to return to the title screen? Your progress will be lost.</p>
                        <div className={classes.popupButtonsContainer}>
                            <Link to="/">
                                <button type="button" className={classes.popupButton}>YES</button>
                            </Link>
                            <button type="button" className={classes.popupButton} onClick={doTogglePopup}>NO</button>
                        </div>
                    </div>
                )
                : null
        }
        <Grid container className={classes.outerContainer} direction="column">
            <Grid item>
                <Container className={classes.infoContainer} disableGutters>
                    <p className={classes.username}>{game.name}</p>
                    <ProgressBar type={'hp'} currentInfo={hpStat}/>
                    <ProgressBar type={'xp'} currentInfo={xpStat}/>
                </Container>
            </Grid>
            
            <Grid item>
                <InventoryIcons />
            </Grid>

            <Grid item>
                <Container className={classes.buttonContainer} disableGutters>
                    <Grid container direction="row" justifyContent="center">
                        <Grid item>
                            <IconButton color="primary" onClick={doTogglePopup}><HomeIcon fontSize='inherit' className={classes.iconButton} /></IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton color="primary" onClick={doToggleInventory}><BackpackIcon fontSize='inherit' className={classes.iconButton} /></IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton color="primary" onClick={doToggleCollection}><BookIcon fontSize='inherit' className={classes.iconButton} /></IconButton>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>

            <Grid item>
                <Container className={classes.logContainer} id="logContainer" disableGutters maxWidth={false}>
                    {game.log.map((gameEvent, i) => (
                        i % 2 === 0
                            ? <p className={classes.logText} style={{color: gameEvent.color, fontWeight: gameEvent.importance}} key={i}>{gameEvent.text}</p>
                            : <p className={classes.logTextAlt} style={{color: gameEvent.color, fontWeight: gameEvent.importance}} key={i}>{gameEvent.text}</p>
                    ))}
                </Container>
            </Grid>
        </Grid>
    </>
};

export default StatsBoard;