import { Link } from 'react-router-dom';
import { Grid, Container, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { getPlayer } from '../../../reducers/selectors';
import Inventory from './inventory/Inventory';

const StatsBoard = () => {
    const game = useSelector((state) => state.game);
    const classes = useStyles();

    return <>
        <Grid container className={classes.outerContainer}>
            <Grid item>
                <Container >
                    <Typography variant="h6">Moves: {game.moves}</Typography>
                    <Typography variant="h6">HP: {getPlayer(game.grid) ? getPlayer(game.grid).entity.hp : 0} / {getPlayer(game.grid) ? getPlayer(game.grid).entity.maxHp : 0}</Typography>
                    <Typography variant="h6">Level: {game.level}</Typography>
                    <Typography variant="h6">XP: {game.xp} / {game.maxXp}</Typography>
                    <Typography variant="h6">Atk: {game.attack}</Typography>
                </Container>
            </Grid>

            <Grid item>
                <Inventory />
            </Grid>

            <Grid item>
                <Container >
                    <Link to="/">
                        <Button variant="contained" color="primary">Title Screen</Button>
                    </Link>
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