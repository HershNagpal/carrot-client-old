import useStyles from './styles';

/**
 * Player: P
 * Wolf: W
 * Carrot: C
 * Fence: F
 * Grass: " "
 */

const Tile = ({text}) => {
    const classes = useStyles();
    
    return <>
        <div className={classes.tile}>{text}</div>
    </>
};

export default Tile;