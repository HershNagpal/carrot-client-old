import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    gameOver: {
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%, 0)',
        margin: '0 auto',
        zIndex: '10',
        margin: 'auto',
        textAlign: 'center',
        verticalAlign: 'center',
    },
    gameOverText: {
        color: '#FF1493',
        fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
        fontSize: '5em',
        opacity: '0.7',
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
        opacity: '0.7',
    },
}));