import { Container, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { setGrid } from '../../actions/game.js';

const defaultGrid = [
    [0,1,2,3,4,5,],
    [0,1,2,3,4,5,],
    [0,1,2,3,4,5,],
    [0,1,2,3,4,5,],
    [0,1,2,3,4,5,],
    [0,1,2,3,4,5,],
];

const Tile = ({text}) => {
    const classes = useStyles();
    return (
        <div className={classes.tile}>{text}</div>
    )
};

const GameGrid = () => {

    const grid = useSelector( (state) => state.grid );
    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(setGrid(defaultGrid));
    }, [dispatch]);
    
    return (
        <Container>
            <Grid container>
                {
                grid.map((row, index) => (
                        <Grid item container key={index} direction="row">
                            {
                                row.map((tile, index) => (
                                    <Grid item key={index}>
                                        <Tile text={tile}/>
                                    </Grid>
                                ))
                            }
                        </Grid>
                ))
                }
            </Grid>
        </Container>
    )
};

export default GameGrid;
