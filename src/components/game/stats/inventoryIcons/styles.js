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
        height: '40px',
        width: '40px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    smallIcon: {
        height: '20px',
        width: '20px',
    },
    smallIconContainer: {
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