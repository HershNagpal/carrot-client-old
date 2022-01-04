import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    inventoryContainer: {
        position: 'relative',
        left: '50%',
        transform: 'translate(-50%, 0)',
    },
    iconContainer: {
        position: 'relative',
        margin: '20px',
        height: '8vh',
        width: '8vh',
        borderRadius: '50%', 
        backgroundColor: 'lightgreen',
    },
    icon: {
        height: '7vh',
        width: '7vh',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    smallIcon: {
        height: '4vh',
        width: '4vh',
    },
    smallIconContainer: {
        backgroundColor: 'lightgrey',
        height: '1.2em',
        width: '1.2em',
        borderRadius: '1.2em',
        textAlign: 'center',
        position: 'absolute',
        bottom: '-5px',
        right: '-5px',
        zIndex: '2',
        fontFamily: 'Helvetica',
        fontSize: '1em',
        color: 'black',
        border: '1px solid black',
    },
}));