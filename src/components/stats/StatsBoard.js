import { Container, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import { setTile } from '../../actions/game.js';
import { useSelector, useDispatch } from 'react-redux';

const StatsBoard = () => {
    const stats = useSelector( (state) => state.stats );
    const classes = useStyles();
    const dispatch = useDispatch();

    const spawnCarrot = () => {
        const x = Math.floor(Math.random() * 15);
        const y = Math.floor(Math.random() * 15);
        dispatch(setTile(x, y, 'C'));
    };

    const spawnWolf = () => {
        const x = Math.floor(Math.random() * 15);
        const y = Math.floor(Math.random() * 15);
        dispatch(setTile(x, y, 'W'));
    };

    const spawnFence = () => {
        const x = Math.floor(Math.random() * 15);
        const y = Math.floor(Math.random() * 15);
        dispatch(setTile(x, y, 'F'));
    };

    return <>
        <Container className={classes.outerContainer}>
            <Typography variant="h6">Moves: {stats.moves}</Typography>
            <Typography variant="h6">Level: {stats.level}</Typography>
            <Typography variant="h6">HP: {stats.hp} / {stats.maxHp}</Typography>
            <Typography variant="h6">XP: {stats.xp} / {stats.maxXp}</Typography>
            <Typography variant="h6">Atk: {stats.attack}</Typography>
            <hr />
            <Button color="primary" variant="contained" onClick={spawnCarrot}>carrotify</Button><br />
            <Button color="primary" variant="contained" onClick={spawnWolf}>birth wolf</Button><br />
            <Button color="primary" variant="contained" onClick={() => spawnFence()}>uhhh fence</Button>
        </Container>
    </>
};

export default StatsBoard;