import useStyles from './styles';

const HealthBar = ({hp, maxHp}) => {
    const classes = useStyles();

    return <>
        {
            hp !== undefined
                ? hp < maxHp
                    ? <div className={classes.healthBar}> {hp}/{maxHp} </div>
                    : <div className={classes.healthBar}> {hp} </div>
                : null 
        }
    </>
};

export default HealthBar;