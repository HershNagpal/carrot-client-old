import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { toggleCollection } from '../../../actions/game';
import { swordIcon, carrotIcon, pocketIcon, emptyIcon, itemIcons } from '../../../images';
import * as constants from '../../../constants';

const Collection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const game = useSelector((state) => state.game);

    const doToggleCollection = () => (
        dispatch(toggleCollection())
    );
    
    return <>
        <Container className={classes.outerContainer}>
            <Button variant="contained" color="primary" onClick={doToggleCollection}>Close</Button>
        </Container>
    </>
};

export default Collection;