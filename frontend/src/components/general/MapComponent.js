import React from 'react'
//OL Map
import 'ol/ol.css';
import { Map, View, Feature } from 'ol';

import TileLayer from 'ol/layer/Tile';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Style, Circle, Fill, Stroke } from 'ol/style'
import { Tile, Vector as VectorLayer } from 'ol/layer'
import Point from 'ol/geom/Point';
import { fromLonLat, transform } from 'ol/proj';

export default function MapComponent(props) {
    React.useEffect(() => {
        let map_div = document.getElementById('map')
        let { lng, lat } = props

        // let coord = transform([lng, lat], 'EPSG:4326', 'EPSG:3857')
        let coord = fromLonLat([lng, lat])
        console.log(coord)
        var map = new Map({
            target: 'map',
            layers: [
                new Tile({
                    source: new OSM()
                })
            ],
            view: new View({
                center: coord,
                zoom: props.zoom
            })
        });

        var styles = {
            'geoMarker': new Style({
                image: new Circle({
                    radius: 7,
                    fill: new Fill({ color: 'black' }),
                    stroke: new Stroke({
                        color: 'white', widthL: 2
                    })
                })
            })
        };

        const marker = new Point(coord)

        var layer = new VectorLayer({
            source: new VectorSource({
                features: [
                    new Feature({
                        type: 'geoMarker',
                        geometry: marker
                    })
                ]
            }),
            style: function (feature) {
                return styles[feature.get('type')]
            }
        });

        map.addLayer(layer);
        if (props.chosable) {
            map.on('click', e => {
                var lonlat = transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
                console.log(lonlat)
                marker.setCoordinates(e.coordinate)
            })
        }
    }, [])

    return (
        <div id="map" style={{ width: "100%", height: "500px" }}></div>

    )
}
