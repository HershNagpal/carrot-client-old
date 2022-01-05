import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    inventoryContainer: {
        position: 'relative',
        left: '50%',
        transform: 'translate(-50%, 0)',
    },
    iconContainer: {
        position: 'relative',
        height: '8vh',
        width: '8vh',
        borderRadius: '50%', 
        backgroundColor: 'lightgreen',
        border: '0.1vh solid mediumseagreen',
    },
    icon: {
        height: '7vh',
        width: '7vh',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        filter: 'drop-shadow(2px 2px 3px #555)',
    },
    smallIcon: {
        height: '4vh',
        width: '4vh',
    },
    smallIconContainer: {
        backgroundColor: 'mediumseagreen',
        height: '3vh',
        width: '3vh',
        borderRadius: '50%',
        textAlign: 'center',
        lineHeight: '1.5',
        position: 'absolute',
        bottom: '-5px',
        right: '-5px',
        zIndex: '2',
        fontFamily: 'Verdana',
        fontSize: '2vh',
        color: 'aliceblue',
    },
}));