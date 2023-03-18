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
    titleText: {
        color: 'white',
        fontFamily: 'Verdana',
        fontSize: '40px',
        margin: '0',
        textAlign: 'center',
    },
    subtitleText: {
        color: '#bbb',
        fontFamily: 'Verdana',
        fontSize: '20px',
        margin: '10px 0 0 0',
        textAlign: 'center',  
    },
    image: {
        border: '5px solid seagreen',
        borderRadius: '10px',
        padding: '5px',
        width: '80px',
        background: 'lightgreen',
    },
    card: {
        borderRadius: '20px',
        background: '#222',
        padding: '20px',
        margin: '20px 20px',
        filter: 'drop-shadow(5px 5px 5px #555)',
        width: '300px',
        height: '135px',
    },
    cardText: {
        fontFamily: 'Verdana',
        fontSize: '2rem',
        color: 'mediumseagreen',
        fontWeight: 'bold',
        margin: '2px 0 0 0',
    },
    cardButton: {
        position: 'absolute',
        background: 'linear-gradient(90deg, rgba(34,34,34,1) 0%, rgba(60,179,112,1) 100%)',
        border: '0',
        padding: '10px',
        fontFamily: 'Verdana',
        color: 'white',
        width: '115px',
        marginTop: '5px',
        marginBottom: '5px',
        cursor: 'pointer',
    },
    endlessCardLeft: {
        display: 'inline flow-root',
        position: 'absolute',
    },
    endlessCardRight: {
        display: 'inline flow-root',
        float: 'right',
        width: '95px',
        marginLeft: '10px',
        position: 'absolute',
        right: '20px',
    },
    fendcelessCardLeft: {
        display: 'inline flow-root',
        position: 'absolute',
    },
    fendcelessCardRight: {
        display: 'inline flow-root',
        float: 'right',
        width: '95px',
        marginLeft: '50px',
        position: 'absolute',
        right: '20px',
    },
    loginButton: {
        background: 'seagreen',
        border: '0',
        borderRadius: '10px',
        padding: '10px',
        fontFamily: 'Verdana',
        color: 'white',
        width: '115px',
        marginTop: '5px',
        marginBottom: '5px',
        position: 'relative',
        left: '50%',
        transform: 'translate(-50%, 0)',
        cursor: 'pointer',
    },
}));

/* 
    '&:hover': {
      background: "#f00",
    }
*/