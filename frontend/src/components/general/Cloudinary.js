import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core';

//Icons
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


function loadScript(src, position, id, onload) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    script.onload = onload
    position.appendChild(script);
}

function openCloudinaryWidget() {
    cloudinary.openUploadWidget({ cloud_name: 'hmhn2208', upload_preset: 'bc8kirbk' }, function (error, result) { console.log(error, result) });
}



const cloudinaryWidget = { current: null }
export default function Cloudinary() {
    const loaded = React.useRef(false);
    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#cloudinary-script')) {
            loadScript(
                'https://widget.cloudinary.com/v2.0/global/all.js',
                document.querySelector('head'),
                'cloudinary-script',
                () => {
                    cloudinaryWidget.current = cloudinary.createUploadWidget({ cloud_name: 'hmhn2208', upload_preset: 'bc8kirbk' }, function (error, result) { console.log(error, result) });
                }
            );
        }
    }


    return (
        <Button
            style={{
                border: "5px dashed",
                borderColor: "#e1e1e1",
                width: "100%",
                height: "500px",
                backgroundColor: "white",
            }}
            component="div"
            onClick={() => cloudinaryWidget.current.open()}
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
                    <Typography align="center" variant="caption">Upload ảnh của bạn</Typography>
                </Grid>
            </Grid>
        </Button>
    )
}
