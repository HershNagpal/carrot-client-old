import { Container, Typography } from '@material-ui/core';
import useStyles from './styles';
import { useSelector } from 'react-redux';

const StatsBoard = () => {
    const stats = useSelector( (state) => state.stats );
    const classes = useStyles();

    return <>
        <Container className={classes.outerContainer}>
            <Typography>Score: {stats.score}</Typography>
        </Container>
    </>
};

export default StatsBoard;