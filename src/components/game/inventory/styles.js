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
        paddingTop: '10px',
        paddingBottom: '20px',
    },
    itemSlot: {
        border: '3px solid black',
        borderRadius: '5px',
        margin: '5px',
        padding: '5px',
        backgroundColor: 'lightgreen',
    },
    slotIcon: {
        border: '3px solid black',
        borderRadius: '25%',
        background: 'aliceblue',
        padding: '5px',
        marginLeft: '5px',
    },
}));