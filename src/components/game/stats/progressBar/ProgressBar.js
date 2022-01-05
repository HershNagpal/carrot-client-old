import useStyles from './styles';
import { useState } from 'react';

const ProgressBar = ({type, currentInfo}) => {
    const [isMouseOver, setMouseOver] = useState(false);
    
    const classes = useStyles();
    const widthPercentage = 100*(currentInfo.value / currentInfo.max);

    const barType = type === 'hp'
        ? `${classes.progressBar} ${classes.hp}`
        : type === 'xp'
            ? `${classes.progressBar} ${classes.xp}`
            : `${classes.progressBar} ${classes.hp}`

    const textColor = type === 'hp'
            ? {color: 'mediumseagreen'}
            : type === 'xp'
                ? {color: 'cornflowerblue'}
                : `${classes.progressBar} ${classes.hp}`

    return <>
        <div className={classes.outerContainer}>
            <p className={classes.barInfoText} style={textColor}> 
                {
                    isMouseOver
                        ? `${currentInfo.value} / ${currentInfo.max}`
                        : type === 'hp'
                            ? 'HP'
                            : type === 'xp'
                                ? `${currentInfo.level}`
                                : 'Lol wtf'
                }
            </p>

            <div className={classes.progressBarContainer} onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)}>    
                <div className={barType} style={{width:widthPercentage + '%'}} />
            </div>
        </div>
    </>
};

export default ProgressBar;