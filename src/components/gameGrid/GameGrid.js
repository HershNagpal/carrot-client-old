import { Container, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { setGrid, setTile } from '../../actions/game.js';
import Tile from './tile/Tile';
import * as constants from '../../constants';

const GameGrid = () => {

    const grid = useSelector( (state) => state.grid );
    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(setGrid(constants.defaultGrid));
    }, [dispatch]);

    const carrotify = () => {
        const x = Number(document.getElementById("x").value);
        const y = Number(document.getElementById("y").value);
        const newTile = document.getElementById("newTile").value;
        dispatch(setTile(x, y, newTile));
    };

    const movePlayer = (direction) => {
        const {x, y} = getTile("P");
        dispatch(setTile(x, y, ""));

        switch (direction) {
            case "U":
                dispatch(setTile(x, y-1, "P"));
                break;
            case "D":
                dispatch(setTile(x, y+1, "P"));
                break;
            case "L":
                dispatch(setTile(x-1, y, "P"));
                break;
            case "R":
                dispatch(setTile(x+1, y, "P"));
                break;
        }

    }   

    const getTile = (search) => {
        let coords; // TODO Fix stinky Mutation
        grid.forEach( (row, Yindex) => 
            row.forEach( (tile, Xindex) => {
                    if(tile === search) {
                        coords = {x: Xindex, y: Yindex};
                    }
                }
            )
        );
        if (coords === undefined) {
            console.log(search, "not found in getTile");
        }
        return coords;
    };
    
    return <>
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
        {/* <button onClick={() => carrotify()}>carrotify</button> */}

        <button onClick={() => movePlayer("U")}>Up</button>
        <button onClick={() => movePlayer("D")}>Down</button>
        <button onClick={() => movePlayer("L")}>Left</button>
        <button onClick={() => movePlayer("R")}>UnLeft</button>
    </>
};

export default GameGrid;