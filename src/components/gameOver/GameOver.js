import useStyles from './styles';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const GameOver = () => {
    const classes = useStyles();
    
    return <>
        <div className={classes.gameOver}>
            <Typography className={classes.gameOverText}>get rekt scrub</Typography>
            <Link className={classes.titleButton} to="/">
                <Button variant="contained" color="primary">Title Screen</Button>
            </Link>
        </div>
        
        <div className={classes.gameOverBackground}/>
    </>
};

export default GameOver;