import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core';

//Icons
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSelector, useDispatch } from 'react-redux';
import { saveImages } from '../../reducers/upload';


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
const cloudinaryGallery = { current: null }

export default function Cloudinary(props) {
    const loaded = React.useRef(false);
    const getMyTags = (cb, prefix) => cb(['test']);
    const images = useSelector(state => state.upload.images)
    const dispatch = useDispatch()

    React.useEffect(() => () => saveImages(images)(dispatch), [])

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#cloudinary-script-widget')) {
            loadScript(
                'https://widget.cloudinary.com/v2.0/global/all.js',
                document.querySelector('head'),
                'cloudinary-script-widget',
                () => {
                    cloudinaryWidget.current = cloudinary.createUploadWidget({ cloud_name: 'hmhn2208', upload_preset: 'bc8kirbk', },
                        function (error, result) {
                            console.log('upload');
                            console.log(result);
                            if (result)
                                if (result.event === 'success') {
                                    images.push(result.info.public_id)
                                    console.log(images)
                                } else if (result.event === 'close') {
                                    if (cloudinaryGallery.current) {
                                        cloudinaryGallery.current.update({
                                            mediaAssets: images.map(i => ({ publicId: i }))
                                        })
                                    }
                                }
                        });
                }
            );

        }
        if (!document.querySelector('#cloudinary-script-product-gallery')) {
            loadScript(
                'https://product-gallery.cloudinary.com/all.js',
                document.querySelector('head'),
                'cloudinary-script-product-gallery',
                () => {
                    cloudinaryGallery.current = cloudinary.galleryWidget({
                        container: "#my-gallery",
                        cloudName: "hmhn2208",
                        mediaAssets: images.map(i => ({ publicId: i }))   // by default mediaType: "image"
                    });
                    cloudinaryGallery.current.render();
                }
            );

        }
    }
    return (
        <div>
            <div id="my-gallery" style={{ maxWidth: "80%" }}>
            </div>
            <Button
                style={{
                    border: "5px dashed",
                    borderColor: "#e1e1e1",
                    // width: "100%",
                    // height: "500px",
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
        </div >
    )
}
