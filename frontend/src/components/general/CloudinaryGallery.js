import React from 'react'
import { loadScript } from '../../utils/collection'


const cloudinaryGallery = { current: null }

export default function CloudinaryGallery(props) {
    const loaded = React.useRef(false);
    const images = props.images
    if (typeof window !== 'undefined' && !loaded.current) {
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
    return <div id="my-gallery" style={{ maxWidth: "90%" }} />
}

