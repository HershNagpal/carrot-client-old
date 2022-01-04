import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    outerContainer: {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '10',
        minWidth: '80vw',
        maxWidth: '80vw',
        maxHeight: '95vh',
        borderRadius: '20px',
        backgroundColor: 'white',
        filter: 'drop-shadow(5px 5px 5px #555)',
        paddingTop: '10px',
        paddingBottom: '20px',
    },
    itemIcon: {
        width: '5vw',
        border: '3px solid black',
        borderRadius: '25%',
        backgroundColor: 'aliceblue',
        marginLeft: '5px',
        padding: '5px',
    },
    typeIcon: {
        width: '5vw',
    },
    itemGrid: {
        maxWidth: '45vw',
    },
    infoBox: {
        minWidth: '30vw',
        maxWidth: '30vw',
        minHeight: '40vh',
        backgroundColor: 'lightgray',
        borderRadius: '10px',
        padding: '10px',
    },
}));