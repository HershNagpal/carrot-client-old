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
    statContainer: {
        marginLeft: '18%',
    },
    gameOverText: {
        textAlign: 'center',
        color: '#FF1493',
        fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
        fontSize: '4em',
        opacity: '0.7',
        marginTop: '20px',
        marginBottom: '20px',
    },
    gameOverBackground: {
        position: 'fixed',
        zIndex: '9',
        width: '100vw',
        height: '100vh',
        opacity: '0.5',
        backgroundColor: 'black',
    },
    titleButton: {
        marginTop: '30px',
        left: '50%',
        transform: 'translate(-50%, 0)',
        cursor: 'pointer',
    },
    icon: {
        width: '20px',
    },
}));