import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    tile: {
        background: 'lightgreen',
        fontSize: '5vh',
        justifyContent: 'center',
        color: 'black',
        height: '5.8vh',
        width: '5.8vh',
        border: '0.1vh solid mediumseagreen',
    },
    icon: {
        height: '5.8vh',
        width: '5.8vh',
        borderStyle: 'none',
    },
    healthBar: {
        position: 'absolute',
        zIndex: '2',
        fontFamily: 'Helvetica',
        fontSize: '0.4em',
        color: 'green',
        textShadow: '0px 0px 3px white',
    },
}));