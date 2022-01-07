import { Link } from 'react-router-dom';
import { useState } from 'react';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { createCharacter } from '../../../actions/game';

const CreateCharacter = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [name, setName] = useState('Player');
    const [hand, setHand] = useState('right');

    const doCreateCharacter = () => {
        dispatch(createCharacter(name, hand));
    };

    return <>
        <div className={classes.outerContainer}>
             <p className={classes.title}>Create Character</p>
             <hr />
             
             <p className={classes.subtitle}>Name</p><br />
             <input type="text" className={classes.usernameTextbox} value={name} onChange={(e) => setName(e.target.value)} /><br /><br />

             <p className={classes.subtitle}>Dominant Hand</p><br />
             <button type="button" className={hand === 'left' ? classes.handButtonSelected : classes.handButton} onClick={() => setHand('left')}>Left</button>
             <button type="button" className={hand === 'right' ? classes.handButtonSelected : classes.handButton} onClick={() => setHand('right')}>Right</button><br /><br />
            <hr />

            <Link to="/game">
                <button className={classes.button} type="button" onClick={doCreateCharacter}>START</button>
            </Link>
        </div>
    </>
};

export default CreateCharacter;