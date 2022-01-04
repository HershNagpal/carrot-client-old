import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    outerContainer: {
        background: 'aliceblue',
        border: '0.1vh solid black',
        minHeight: '90.5vh',
        minWidth: '35vh',
        maxWidth: '35vh',
        marginTop: '5vh',
        marginLeft: '2vh',
        padding: '10px',
    },
    infoContainer: {
        paddingLeft: '20px',
    },
    buttonContainer: {
        position: 'relative',
        left: '50%',
        transform: 'translate(-50%, 0)',
    },
    logContainer: {
        background: 'aliceblue',
        border: '1px solid black',
        minHeight: '40vh',
        maxHeight: '40vh',
        minWidth: '30vh',
        maxWidth: '30vh',
        padding: '5px',
        overflowY: 'scroll',
        scrollBehavior: 'smooth',
    },
    iconButton: {
        background: 'lightgray',
        fontSize: '5vh',
        padding: '1vh',
        borderRadius: '50%',
    },
    infoText: {
        fontSize: '3vh',
        fontFamily: 'Verdana',
        margin: '0',
    },
    logText: {
        fontSize: '12px',
        fontFamily: 'Verdana',
        background: '#fff6c2',
        margin: '0',
    },
    logTextAlt: {
        fontSize: '12px',
        fontFamily: 'Verdana',
        background: '#fff09a',
        margin: '0',
    },
}));