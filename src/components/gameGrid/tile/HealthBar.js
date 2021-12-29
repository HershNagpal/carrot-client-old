import useStyles from './styles';

const Tile = ({hp, maxHp}) => {
    const classes = useStyles();

    return <>
        <div className={classes.healthBarContainer}>
            <div className={classes.healthBar} />
        </div>
    </>
};

export default Tile;