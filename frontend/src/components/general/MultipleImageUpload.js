import React from 'react'
import { useDropzone } from 'react-dropzone'
import RootRef from '@material-ui/core/RootRef'
import { Paper, IconButton, Button, Box, Typography, Grid } from '@material-ui/core'

//Icons 
import PublishIcon from '@material-ui/icons/Publish';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';



export default function PaperDropzone() {
    const onDrop = React.useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
        })

    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })
    const { ref, ...rootProps } = getRootProps()

    return (

        < RootRef rootRef={ref} >
            <input
                {...getInputProps}
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                style={{
                    display: "none"
                }}
            />
            <label htmlFor="contained-button-file">
                <Button
                    {...rootProps}
                    style={{
                        border: "5px dashed",
                        borderColor: "#e1e1e1",
                        width: "100%",
                        height: "500px",
                        backgroundColor: "white",
                    }}
                    component="div"
                >
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item xs={3}>
                            <CloudUploadIcon style={{ fontSize: 80 }} />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="center" variant="caption">Kéo và thả ảnh của bạn vào đây</Typography>
                        </Grid>
                    </Grid>
                </Button>
            </label>
        </RootRef >
    )
}