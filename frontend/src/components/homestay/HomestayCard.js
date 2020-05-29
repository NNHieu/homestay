import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import history from '../../utils/history'


const useStyles = makeStyles({
    root: {
        width: "80%",
        marginRight: 2,
        transition: "height 2s"
    },
    media: {
        height: 300,
    },
});

export default function HsCard(props) {
    const classes = useStyles();
    const hinfo = props.hinfo
    const goToDetail = () => history.push(`/homestay/${hinfo.id}`)
    const [showDesc, setShowDesc] = React.useState(false)

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={goToDetail} onMouseEnter={() => setShowDesc(true)} onMouseLeave={() => setShowDesc(false)}>
                <CardMedia
                    className={classes.media}
                    image={hinfo.review_image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {hinfo.title}
                    </Typography>
                    <Typography noWrap={!showDesc} variant="body2" color="textSecondary" component="p">
                        {hinfo.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <form>
                    <Button size="small" color="primary" onClick={goToDetail}>
                        Learn More
                    </Button>
                </form>
            </CardActions>
        </Card>
    );
}

