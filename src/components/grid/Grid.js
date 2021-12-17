import { AppBar, Typography } from '@material-ui/core';
import { FixedSizeLink, Link } from 'react-router-dom';

const Grid = () => {
    return (
        <AppBar position="static" color="inherit">
            <Typography variant="h2" align="center">MERN Test</Typography>
            <Link to="/yee"> Go To Yee </Link>
        </AppBar>

    )
};

export default Grid;
