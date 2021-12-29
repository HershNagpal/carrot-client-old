import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    outerContainer: {
        backgroundColor: 'gray',
        marginTop: '4vh',
    },
    entityInfo: {
        position: 'fixed',
        fontFamily: 'Helvetica',
        fontSize: '1em',
        color: 'green',
        textShadow: '0px 0px 3px white',
    },
}));