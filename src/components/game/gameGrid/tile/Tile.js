import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { grassIcon, playerRightIcon, playerLeftIcon, playerUpIcon, playerDownIcon, carrotIcon, wolfIcon, fenceIcon, treeIcon } from '../../../../images';
import HealthBar from './HealthBar';

const Tile = ({type, hp, maxHp}) => {
    const classes = useStyles();
    const game = useSelector((state) => state.game);
    const [icon, setIcon] = useState('grass');
    const [isMouseOver, setMouseOver] = useState(false);
    const [isEntityWithHp, setIsEntityWithHp] = useState(false);

    useEffect(() => {
        switch (type) {
            case 'grass':
                setIcon(grassIcon);
                setIsEntityWithHp(false);
                break;
            case 'player':
                setIsEntityWithHp(true);
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
                setIsEntityWithHp(false);
                break;
            case 'wolf':
                setIcon(wolfIcon);
                setIsEntityWithHp(true);
                break;
            case 'fence':
                setIcon(fenceIcon);
                setIsEntityWithHp(true);
                break;
            case 'tree':
                setIcon(treeIcon);
                setIsEntityWithHp(true);
                break;
            default:
                setIcon(grassIcon);
                setIsEntityWithHp(false);
        }
    }, [type, game]);

    return <>
        <div className={classes.tile} onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)}>
            {(hp < maxHp || (isMouseOver && isEntityWithHp)) && <HealthBar currentInfo={{value:hp, max:maxHp}} />}
            
            <img className={classes.icon} src={icon} alt={icon}></img>
        </div>
    </>
};

export default Tile;