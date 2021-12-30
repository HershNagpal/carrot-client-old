import StatsBoard from './stats/StatsBoard';
import GameGrid from './gameGrid/GameGrid';
import GameOver from './gameOver/GameOver'
import { useSelector } from 'react-redux';
import { Grid, Container } from '@material-ui/core';
import useStyles from './styles';

const Game = () => {
    const game = useSelector((state) => state.game);
    const classes = useStyles();
    
    return <>
        {game.gameOver ? <GameOver /> : null }
        <Container className={classes.outerContainer} >
            <Grid container direction='row'>
                <Grid item>
                    <GameGrid />
                </Grid>
                <Grid item>
                    <StatsBoard />
                </Grid>
            </Grid>
        </Container>
    </>
};

export default Game;