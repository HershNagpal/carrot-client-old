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
import ProgressBar from './progressBar/ProgressBar';

const StatsBoard = () => {
    const game = useSelector((state) => state.game);
    const playerTile = getPlayerTile(game.grid);
    const classes = useStyles(90);
    const dispatch = useDispatch();

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

    useEffect(() => {
        const log = document.getElementById('logContainer');
        log.scrollTop = log.scrollHeight - log.clientHeight;
    }, [game.log]);

    return <>
        <Grid container className={classes.outerContainer} direction="column">
            <Grid item>
                <Container className={classes.infoContainer} disableGutters>
                    <p className={classes.username}>Username</p>
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
                            ? <p className={classes.logText} key={i}>{gameEvent}</p>
                            : <p className={classes.logTextAlt} key={i}>{gameEvent}</p>
                    ))}
                </Container>
            </Grid>
        </Grid>
    </>
};

export default StatsBoard;