import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    iconContainer: {
        position: 'relative',
        margin: '10px',
        height: '50px',
        width: '50px',
        borderRadius: '50px', 
        backgroundColor: 'lightgreen',
    },
    icon: {
        height: '50px',
        width: '50px',
    },
    fenceAmount: {
        backgroundColor: 'lightgrey',
        height: '1.2em',
        width: '1.2em',
        borderRadius: '1.2em',
        textAlign: 'center',
        position: 'absolute',
        bottom: '-5px',
        right: '-5px',
        zIndex: '2',
        fontFamily: 'Helvetica',
        fontSize: '1em',
        color: 'black',
        border: '1px solid black',
    },
}));