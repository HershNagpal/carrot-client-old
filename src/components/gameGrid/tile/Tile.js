import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { playerRightIcon, playerLeftIcon, playerUpIcon, playerDownIcon, carrotIcon, wolfIcon, fenceIcon } from '../../../images';

/**
 * Player: P
 * Wolf: W
 * Carrot: C
 * Fence: F
 * Grass: G
 */

const Tile = ({text}) => {
    const classes = useStyles();
    const stats = useSelector( (state) => state.stats );
    const [icon, setIcon] = useState('G');
    
    useEffect( () => {
        switch (text) {
            case 'G':
                setIcon('');
                break;
            case 'P':
                switch (stats.direction) {
                    case 'ArrowRight':
                    case 'd':
                        setIcon(playerRightIcon);
                        break;
                    case 'ArrowLeft':
                    case 'a':
                        setIcon(playerLeftIcon);
                        break;
                    case 'ArrowUp':
                    case 'w':
                        setIcon(playerUpIcon);
                        break;
                    case 'ArrowDown':
                    case 's':
                        setIcon(playerDownIcon);
                        break;
                    default:
                        break;
                }
                break;
            case 'C':
                setIcon(carrotIcon);
                break;
            case 'W':
                setIcon(wolfIcon);
                break;
            case 'F':
                setIcon(fenceIcon);
                break;
            default:
                break;
        }
    }, [text, stats]);

    return <>
        <div className={classes.tile}>
            <img className={classes.icon} src={icon} alt={icon}></img>
        </div>
    </>
};

export default Tile;