import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    outerContainer: {
        minHeight: '90.5vh',
        minWidth: '35vh',
        maxWidth: '35vh',
        marginTop: '5vh',
        marginLeft: '2vh',
        padding: '10px',
        filter: 'drop-shadow(2px 2px 3px #444)',
    },
    username: {
        fontFamily: 'Verdana',
        fontSize: '4vh',
        color: 'aliceblue',
        textShadow: '1px 1px 3px #222',
        margin: '0',
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
        background: '#fff6c2',
        minHeight: '44vh',
        maxHeight: '44vh',
        minWidth: '30vh',
        maxWidth: '30vh',
        overflowY: 'scroll',
        scrollBehavior: 'smooth',
    },
    iconButton: {
        background: '#222222',
        color: 'mediumseagreen',
        margin: '1vh 0.1vh',
        height: '1vh',
        width: '1vh',
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
        padding: '5px',
        fontSize: '12px',
        fontFamily: 'Verdana',
        background: '#fff6c2',
        margin: '0',
    },
    logTextAlt: {
        padding: '5px',
        fontSize: '12px',
        fontFamily: 'Verdana',
        background: '#fff09a',
        margin: '0',
    },
}));