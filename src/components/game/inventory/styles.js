import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    outerContainer: {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '10',
        minWidth: '70vw',
        maxWidth: '70vw',
        minHeight: '70vh',
        maxHeight: '70vh',
        borderRadius: '20px',
        backgroundColor: 'white',
        filter: 'drop-shadow(5px 5px 5px #555)',
        paddingTop: '10px',
    },
}));