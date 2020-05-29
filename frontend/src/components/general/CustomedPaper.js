import React from 'react'
import { Typography, Grid, Paper, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2),
            padding: theme.spacing(3),
        },
    },
}));

export default function CustomedPaper(props) {
    const classes = useStyles()
    const { title, shortDescription, content } = props
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography component="h1" variant="h4" gutterBottom className={classes.title}>
                    {title}
                </Typography>
            </Grid>
            {shortDescription && <Grid item xs={12}>
                <Typography gutterBottom>
                    {shortDescription}
                </Typography>
            </Grid>}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    {props.children}
                </Paper>
            </Grid>
        </Grid>
    )
}
