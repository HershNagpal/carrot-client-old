import StatsBoard from "./stats/StatsBoard";
import GameGrid from "./gameGrid/GameGrid";
import useStyles from './styles';
import { Grid, Container } from "@material-ui/core";

const Game = () => {
    const classes = useStyles();
    return <>
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