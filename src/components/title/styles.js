import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    outerContainer: {
        background: 'gray',
        minWidth: '95vw',
        minHeight: '95vh',
        border: '5px solid black',
        borderRadius: '5px',
    },
    image: {
        border: '5px solid black',
        borderRadius: '5px',
        width: '5vw',
    },
}));