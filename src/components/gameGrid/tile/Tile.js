import { useState, useEffect } from 'react';
import useStyles from './styles';
import { playerIcon, carrotIcon } from '../../../images';

/**
 * Player: P
 * Wolf: W
 * Carrot: C
 * Fence: F
 * Grass: ''
 */

const Tile = ({text}) => {
    const classes = useStyles();
    const [icon, setIcon] = useState('');
    
    useEffect( () => {
        switch (text) {
            case '':
                setIcon('');
                break;
            case 'P':
                setIcon(playerIcon);
                break;
            case 'C':
                setIcon(carrotIcon);
                break;
            default:
                break;
        }
    }, [text]);

    return <>
        <div className={classes.tile}>
            <img className={classes.icon} src={icon} alt={icon}></img>
        </div>
    </>
};

export default Tile;