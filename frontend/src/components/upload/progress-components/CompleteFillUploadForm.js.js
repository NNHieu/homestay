import React from 'react'
import { Typography } from '@material-ui/core'

export default function CompleteFillUploadForm() {
    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                All done!
        </Typography>
            <Typography variant="subtitle1">
                Your homestay is uploaded. We will send you an email when your homestay is verified.
        </Typography>
        </React.Fragment>
    )
}
