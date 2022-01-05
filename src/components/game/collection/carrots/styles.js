import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    collectionItem: {
        border: '3px solid black',
        backgroundColor: 'aliceblue',
        padding: '1vh',
        height: '10vh',
        width: '10vh',
    },
    collectionIcon: {
        height: '8vh',
        width: '8vh',
    },
    selectedItem: {
        border: '3px solid black',
        backgroundColor: 'lightgreen',
        padding: '5px',
        height: '10vh',
        width: '10vh',
    },
}));