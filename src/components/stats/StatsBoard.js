import { Container, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import { useSelector } from 'react-redux';

const StatsBoard = () => {
    const game = useSelector( (state) => state.game );
    const classes = useStyles();

    const spawnWolf = () => {
        /*const x = Math.floor(Math.random() * 15);
        const y = Math.floor(Math.random() * 15);
        dispatch(setTile(x, y, 'W'));*/
        console.log('function temporarily disabled')
    };

    const getGameState = () => {
        console.log(game);
    };

    return <>
        <Container className={classes.outerContainer}>
            <Typography variant="h6">Moves: {game.moves}</Typography>
            <Typography variant="h6">Level: {game.level}</Typography>
            <Typography variant="h6">HP: {game.hp} / {game.maxHp}</Typography>
            <Typography variant="h6">XP: {game.xp} / {game.maxXp}</Typography>
            <Typography variant="h6">Atk: {game.attack}</Typography>
            <hr />
            <Button color="primary" variant="contained" onClick={spawnWolf}>birth wolf</Button><br />
            <Button color="primary" variant="contained" onClick={getGameState}>game state</Button>
        </Container>
    </>
};

export default StatsBoard;