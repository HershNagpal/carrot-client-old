import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    tile: {
        background: 'lightgreen',
        fontSize: '5vh',
        justifyContent: 'center',
        color: 'black',
        height: '5vh',
        width: '5vh',
        border: '1px solid mediumseagreen',
    },
    icon: {
        height: '5vh',
        width: '5vh',
        borderStyle: 'none',
    },
}));