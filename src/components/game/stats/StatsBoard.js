import { Link } from 'react-router-dom';
import { Grid, Container, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { getPlayerTile } from '../../../reducers/selectors';
import { useDispatch } from 'react-redux';
import { toggleInventory, toggleCollection } from '../../../actions/game';
import InventoryIcons from './inventoryIcons/InventoryIcons';

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
        <Grid container className={classes.outerContainer}>
            <Grid item>
                <Container >
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
                <Container >
                    <Link to="/">
                        <Button variant="contained" color="primary">Title Screen</Button>
                    </Link>
                </Container>
            </Grid>

            <Grid item>
                <Container >
                    <Button variant="contained" color="primary" onClick={doToggleInventory}>Inventory</Button>
                </Container>
            </Grid>

            <Grid item>
                <Container >
                    <Button variant="contained" color="primary" onClick={doToggleCollection}>Collection</Button>
                </Container>
            </Grid>

            <Grid item>
                <Container className={classes.logContainer}>
                    {game.log.map((gameEvent, i) => (
                        <Typography key={i}>{gameEvent}</Typography>
                    ))}
                </Container>
            </Grid>
        </Grid>
    </>
};

export default StatsBoard;