import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    outerContainer: {
        background: '#557155',
        minWidth: '100vw',
        minHeight: '100vh',
        paddingTop: '15px',
    },
    menuContainer: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    image: {
        border: '5px solid black',
        borderRadius: '10px',
        padding: '5px',
        width: '5vw',
        backgroundColor: '#557155',
    },
}));