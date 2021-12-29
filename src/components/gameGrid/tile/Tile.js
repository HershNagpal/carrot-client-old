import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { grassIcon, playerRightIcon, playerLeftIcon, playerUpIcon, playerDownIcon, carrotIcon, wolfIcon, fenceIcon, treeIcon } from '../../../images';
import HealthBar from './HealthBar';

const Tile = ({type, hp, maxHp}) => {
    const classes = useStyles();
    const game = useSelector((state) => state.game);
    const [icon, setIcon] = useState('grass');
    
    useEffect(() => {
        switch (type) {
            case 'grass':
                setIcon(grassIcon);
                break;
            case 'player':
                switch (game.direction) {
                    case 'd':
                        setIcon(playerRightIcon);
                        break;
                    case 'a':
                        setIcon(playerLeftIcon);
                        break;
                    case 'w':
                        setIcon(playerUpIcon);
                        break;
                    case 's':
                        setIcon(playerDownIcon);
                        break;
                    default:
                        break;
                }
                break;
            case 'carrot':
                setIcon(carrotIcon);
                break;
            case 'wolf':
                setIcon(wolfIcon);
                break;
            case 'fence':
                setIcon(fenceIcon);
                break;
            case 'tree':
                setIcon(treeIcon);
                break;
            default:
                setIcon(grassIcon);
        }
    }, [type, game]);

    return <>
        <div className={classes.tile}>
            <HealthBar hp={hp} maxHp={maxHp} />
            {
            type === 'grass' 
                ? null // TODO: Add Grass Icon
                : <img className={classes.icon} src={icon} alt={icon}></img>
            }
            
        </div>
    </>
};

export default Tile;