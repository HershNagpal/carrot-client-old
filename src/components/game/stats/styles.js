import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    outerContainer: {
        background: 'aliceblue',
        border: '1px solid black',
        minHeight: '90vh',
        minWidth: '20vw',
        maxWidth: '20vw',
        marginTop: '2.5vh',
    },
    logContainer: {
        bottom: '10vh',
        margin: '20px',
        background: 'aliceblue',
        border: '1px solid black',
        minHeight: '20vh',
        minWidth: '17vw',
        maxWidth: '17vw',
    },
}));