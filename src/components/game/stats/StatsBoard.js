import { Link } from 'react-router-dom';
import { useEffect } from 'react';
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

const StatsBoard = () => {
    const game = useSelector((state) => state.game);
    const playerTile = getPlayerTile(game.grid);
    const classes = useStyles();
    const dispatch = useDispatch();

    const doToggleInventory = () => (
        dispatch(toggleInventory())
    );

    const doToggleCollection = () => (
        dispatch(toggleCollection())
    );

    useEffect(() => {
        const log = document.getElementById('logContainer');
        log.scrollTop = log.scrollHeight - log.clientHeight;
    }, [game.log]);

    return <>
        <Grid container className={classes.outerContainer} direction="column">
            <Grid item>
                <Container className={classes.infoContainer} disableGutters>
                    <p className={classes.infoText}>Moves: {game.moves}</p>
                    <p className={classes.infoText}>HP: {playerTile ? playerTile.entity.hp : 0} / {playerTile ? playerTile.entity.maxHp : 0}</p>
                    <p className={classes.infoText}>Level: {game.level}</p>
                    <p className={classes.infoText}>XP: {game.xp} / {game.maxXp}</p>
                </Container>
            </Grid>

            <Grid item>
                <InventoryIcons />
            </Grid>

            <Grid item>
                <Container className={classes.buttonContainer} disableGutters>
                    <Grid container direction="row" justifyContent="center">
                        <Grid item>
                            <Link to="/">
                                <IconButton color="primary"><HomeIcon className={classes.iconButton} /></IconButton>
                            </Link>
                        </Grid>
                        <Grid item>
                            <IconButton color="primary" onClick={doToggleInventory}><BackpackIcon className={classes.iconButton} /></IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton color="primary" onClick={doToggleCollection}><BookIcon className={classes.iconButton} /></IconButton>
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