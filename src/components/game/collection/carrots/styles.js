import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    collectionItem: {
        border: '3px solid black',
        backgroundColor: 'aliceblue',
        padding: '5px',
    },
    collectionIcon: {
        width: '5vw',
    },
    selectedItem: {
        border: '3px solid lightgreen',
        backgroundColor: 'aliceblue',
        padding: '5px',
    },
}));