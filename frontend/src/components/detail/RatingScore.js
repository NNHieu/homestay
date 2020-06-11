import React from 'react'
import { Paper, Grid, Typography, Box, Button } from '@material-ui/core'


export default function RatingScore() {
    return (
        <Paper variant="elevation" style={{ padding: '10px', marginBottom: '30px', width: "100%" }}>
            <Grid container justify="center" alignItems="center">
                <Grid item sm={3}>
                    <Button variant="contained" color="primary" style={{
                        width: '70px',
                        height: '70px',
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Typography variant="h4" color="inherit">
                            8,7
                        </Typography>
                    </Button>
                </Grid>
                <Grid item sm={8}>
                    <Typography variant="h6">
                        Tuyệt vời
                    </Typography>
                    <Typography variant="subtitle1">
                        /10 (135 bài đánh giá)
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}
