import useStyles from './styles';
import * as constants from '../../../constants';
import { carrotIcon, pocketIcon, itemIcons } from '../../../images';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const GameOver = () => {
    const game = useSelector((state) => state.game);
    const classes = useStyles();
    
    return <>
        <Container className={classes.outerContainer}>
            <Typography className={classes.gameOverText}>get rekt scrub</Typography>

            <Grid className={classes.statContainer} container direction="row" spacing={10}>
                <Grid item>
                    <Typography>
                        <b>Level:</b> {game.level}
                    </Typography>
                    <Typography>
                        <b>Total Carrots:</b> {game.totalCarrots}&nbsp;
                        <img className={classes.icon} src={carrotIcon} alt="carrotIcon" />
                    </Typography>
                    <Typography>
                        <b>Super Carrots Used:</b> {game.collection.reduce((a, item) => (a + item.used), 0)}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        <b>Weapon:</b> {constants.itemDict[game.inventoryWeapon].name}&nbsp;
                        <img className={classes.icon} src={itemIcons[game.inventoryWeapon]} alt="weaponIcon" />
                    </Typography>
                    <Typography>
                        <b>Super Carrot:</b> {constants.itemDict[game.inventorySuperCarrot].name}&nbsp;
                        <img className={classes.icon} src={itemIcons[game.inventorySuperCarrot]} alt="superCarrotIcon" />
                    </Typography>
                    <Typography>
                        <b>Pocket:</b> {constants.itemDict[game.pocketItem].name}&nbsp;
                        <img className={classes.icon} src={game.pocketItem !== 0 ? itemIcons[game.pocketItem] : pocketIcon} alt="pocketIcon" />
                    </Typography>
                </Grid>
            </Grid>

            <Link to="/">
                <Button className={classes.titleButton} variant="contained" color="primary">Title Screen</Button>
            </Link>
        </Container>
        
        <div className={classes.gameOverBackground} />
    </>
};

export default GameOver;