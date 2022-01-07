import useStyles from './styles';

const HealthBar = ({currentInfo}) => {
    const classes = useStyles();
    const widthPercentage = 100*(currentInfo.value / currentInfo.max);
    

    return <>
        <div className={classes.outerContainer}>
            <p className={classes.barInfoText}> 
                {currentInfo.value}/{currentInfo.max}
            </p>

            <div className={classes.healthBarContainer}>    
                <div className={classes.healthBar} style={{width:widthPercentage + '%'}} />
            </div> 
        </div>
    </>
};

export default HealthBar;