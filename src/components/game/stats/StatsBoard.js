import { Link } from 'react-router-dom';
import { Grid, Container, Typography, IconButton } from '@mui/material';
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


    return <>
        <Grid container className={classes.outerContainer} direction="column" disableGutters>
            <Grid item>
                <Container className={classes.infoContainer} disableGutters>
                    <Typography variant="h6">Moves: {game.moves}</Typography>
                    <Typography variant="h6">HP: {playerTile ? playerTile.entity.hp : 0} / {playerTile ? playerTile.entity.maxHp : 0}</Typography>
                    <Typography variant="h6">Level: {game.level}</Typography>
                    <Typography variant="h6">XP: {game.xp} / {game.maxXp}</Typography>
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
                <Container className={classes.logContainer} disableGutters maxWidth={false}>
                    {game.log.map((gameEvent, i) => (
                        <Typography key={i}>{gameEvent}</Typography>
                    ))}
                </Container>
            </Grid>
        </Grid>
    </>
};

export default StatsBoard;