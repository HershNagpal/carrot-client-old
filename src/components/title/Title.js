import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import useStyles from './styles';
import { carrotIcon, fenceIcon, playerRightIcon } from '../../images';

const Title = () => {
    const classes = useStyles();

    return <>
        <Container className={classes.outerContainer}>
            <div className={classes.menuContainer}>
                <p className={classes.titleText}>CarrotWolf</p>
                <p className={classes.subtitleText}>The Wolf Who Cried Carrot</p>
                <hr />
                <div className={classes.card}>
                    <div className={classes.endlessCardLeft}>
                        <img className={classes.image} src={carrotIcon} alt="carrotIcon" />
                        <p className={classes.cardText}>Endless</p>
                    </div>
                    <div className={classes.endlessCardRight}>
                        <Link to="/game">
                            <button className={classes.cardButton} type="button">NEW GAME</button>
                        </Link>
                    </div>
                </div>

                <div className={classes.card}>
                    <div className={classes.fendcelessCardLeft}>
                        <img className={classes.image} src={fenceIcon} alt="fenceIcon" />
                        <p className={classes.cardText}>Roguelite</p>
                    </div>
                    <div className={classes.fendcelessCardRight}>
                        <button className={classes.cardButton} type="button">NEW GAME</button>
                        <button className={classes.cardButton} type="button">NEW GAME</button>
                        <button className={classes.cardButton} type="button">NEW GAME</button>
                    </div>
                </div>

                <div className={classes.card}>
                    <div className={classes.fendcelessCardLeft}>
                        <img className={classes.image} src={playerRightIcon} alt="playerRightIcon" />
                        <p className={classes.cardText}>Career</p>
                    </div>
                    <div className={classes.fendcelessCardRight}>
                        <button className={classes.cardButton} type="button">NEW GAME</button>
                        <button className={classes.cardButton} type="button">NEW GAME</button>
                        <button className={classes.cardButton} type="button">NEW GAME</button>
                    </div>
                </div>

                <button className={classes.loginButton} type="button" onClick={() => alert('I am die')}>LOG IN</button>
            </div>
        </Container>
    </>
};

export default Title;