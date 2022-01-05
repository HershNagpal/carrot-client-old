import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    outerContainer: {
        width: '90%',
        overflow: 'hidden',
        position: 'relative',
        marginTop: '10px',
        marginBottom: '10px',
    },
    progressBarContainer: {
        position: 'relative',
        width: '100%',
        height: '3vh',
        backgroundColor: '#222222',
        borderRadius: '0.5vh',
        zIndex: '1',
    },
    progressBar: {
        height: '3vh',
        borderRadius: '0.5vh',
        position: 'absolute',
        zIndex: '2',
        pointerEvents: 'none'
    },
    barInfoText: {
        position: 'absolute',
        top: '-1.8vh',
        zIndex: '3',
        pointerEvents: 'none',
        fontFamily: 'Verdana',
        fontSize: '2vh',
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    hp: {
        backgroundColor: 'lightgreen',
    },
    xp: {
        backgroundColor: 'lightblue'
    },
}));