import { Button, Container, Typography } from '@material-ui/core';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { getTile, getWolves } from '../../reducers/selectors';

const StatsBoard = () => {
    const game = useSelector((state) => state.game);
    const classes = useStyles();

    return <>
        <Container className={classes.outerContainer}>
            <Typography variant="h6">Moves: {game.moves}</Typography>
            <Typography variant="h6">Level: {game.level}</Typography>
            <Typography variant="h6">HP: {game.hp} / {game.maxHp}</Typography>
            <Typography variant="h6">XP: {game.xp} / {game.maxXp}</Typography>
            <Typography variant="h6">Atk: {game.attack}</Typography>
            <hr />
            {   
                getTile('wolf', game.grid).length > 0
                ? getWolves(game.grid).map((tile, index) => (
                    <div key={index}>
                        <Typography variant="h6">HP: {tile.entity.hp} </Typography>
                        <Typography variant="h6">Atk: {tile.entity.attack} </Typography>
                        <Typography variant="h6">Moves: {tile.entity.moves}/{tile.entity.maxMoves} </Typography>
                        <br/>
                    </div>
                )) 
                : <Typography variant="h6">No wolves have appeared yet.</Typography>
            }
        </Container>
    </>
};

export default StatsBoard;