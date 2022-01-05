import { Link } from 'react-router-dom';
import { Container, Button, Typography } from '@mui/material';
import useStyles from './styles';
import { carrotIcon, fenceIcon } from '../../images';

const Title = () => {
    const classes = useStyles();

    return <>
        <Container className={classes.outerContainer}>
            <div className={classes.menuContainer}>
                <Typography variant="h4">CarrotWolf</Typography>
                <Typography variant="h6">The Wolf Who Cried Carrot</Typography>
                <hr />
                <Link to="/game">
                    <img className={classes.image} src={carrotIcon} alt="carrotIcon" /><br />
                </Link>
                <Link to="/game">
                    <Button variant="contained" color="primary">Endless Mode</Button><br /><br />
                </Link>
                <img className={classes.image} src={fenceIcon} alt="fenceIcon" onClick={() => alert('I am die')} /><br />
                <Button variant="contained" color="primary" onClick={() => alert('I am die')}>Fendceless Mode</Button><br /><br />
                <Button variant="contained" color="secondary" onClick={() => alert('I am die')}>Log In</Button>
            </div>
        </Container>
    </>
};

export default Title;