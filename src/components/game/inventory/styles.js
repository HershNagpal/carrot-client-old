import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    outerContainer: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '10',
        minWidth: '80vw',
        maxWidth: '80vw',
        maxHeight: '95vh',
        borderRadius: '20px',
        backgroundColor: 'seagreen',
        filter: 'drop-shadow(5px 5px 5px #333)',
        paddingTop: '0.5vh',
        paddingBottom: '1vh',
    },
    itemSlot: {
        border: '3px solid black',
        borderRadius: '5px',
        margin: '0.5vh !important',
        padding: '1vh',
        backgroundColor: 'lightgreen',
        filter: 'drop-shadow(2px 2px 2px #333)',
        height: '20vh',
    },
    itemTypeIcon: {
        filter: 'drop-shadow(1px 1px 2px #333)',
        margin: '0.5vh',
        height: '4vh',
        width: '4vh',
        opacity: '0.7',
    },
    slotIcon: {
        border: '3px solid black',
        height: '4vh',
        width: '4vh',
        borderRadius: '25%',
        background: 'aliceblue',
        padding: '0.5vh',
        marginLeft: '1vh',
        filter: 'drop-shadow(1px 1px 1px #333)',
    },
    title: {
        color: 'aliceblue',
        fontFamily: 'Verdana',
        fontSize: '3vh',
        textShadow: '1px 1px 2px #333',
        display: 'inline-block',
    },
    subtitle: {
        color: 'aliceblue',
        fontFamily: 'Verdana',
        fontSize: '1.5vh',
        textShadow: '1px 1px 2px #333',
        display: 'inline-block',
    },
    itemTitle: {
        fontFamily: 'Verdana',
        fontWeight: 'bold',
        fontSize: '2vh',
        margin: '1vh',
    },
    itemDescription: {
        fontFamily: 'Verdana',
        fontSize: '1.5vh',
        margin: '1vh',
    },
    itemFlavor: {
        fontFamily: 'Verdana',
        fontSize: '1.5vh',
        margin: '1vh',
    },
    closeButton: {
        display: 'inline-block',
        float: 'right',
    }
}));