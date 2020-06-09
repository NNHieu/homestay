import React, { Fragment } from 'react'
import { Typography, Grid, Paper, makeStyles, RadioGroup, FormControlLabel, Box, Radio } from '@material-ui/core'
import { Margin } from './Margin';

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
                <Typography component="h3" variant="h5" gutterBottom className={classes.title}>
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

export function CustomedPaperWithCheckBoxs(props) {
    const { title, shortDescription, options, onChange, defaultValue } = props
    return (
        <CustomedPaper title={title} shortDescription={shortDescription}>
            <RadioGroup onChange={onChange} defaultValue={defaultValue}>
                {options.map(option => {
                    return (
                        <Fragment key={option.value}>
                            <Margin size="10px" />
                            <FormControlLabel
                                value={option.value}
                                control={
                                    <Radio />
                                }
                                labelPlacement="end"
                                label={
                                    <Box>
                                        <Typography variant="h6">{option.mainText}</Typography>
                                        {option.subText && <Typography>{option.subText}</Typography>}
                                    </Box>
                                }
                            />
                        </Fragment>
                    )
                }
                )}
            </RadioGroup>
        </CustomedPaper>
    )
}