import { Link } from 'react-router-dom';
import { Container, Button } from '@material-ui/core';
import useStyles from './styles';

const Title = () => {
    const classes = useStyles();

    return <>
        <Container className={classes.outerContainer}>
            <h1>Title Screen</h1>
            <Link to="/game">
                <Button variant="contained" color="primary">Endless Mode</Button>
            </Link>
        </Container>
    </>
};

export default Title;