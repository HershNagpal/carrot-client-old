import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { playerRightIcon, playerLeftIcon, playerUpIcon, playerDownIcon, carrotIcon, wolfIcon, fenceIcon, treeIcon } from '../../../images';

const Tile = ({type}) => {
    const classes = useStyles();
    const game = useSelector((state) => state.game);
    const [icon, setIcon] = useState('grass');
    
    useEffect(() => {
        switch (type) {
            case 'grass':
                setIcon('');
                break;
            case 'player':
                switch (game.direction) {
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
                break;
        }
    }, [type, game]);

    return <>
        <div className={classes.tile}>
            <img className={classes.icon} src={icon} alt={icon}></img>
        </div>
    </>
};

export default Tile;