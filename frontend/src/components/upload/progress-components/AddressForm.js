import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CustomedPaper from '../../general/CustomedPaper';
import GoogleMapAutocomplete from '../../general/GoogleMapAutocomplete'

//Reducers
import { saveAddress, validate } from '../../../reducers/upload'

//OL Map
import 'ol/ol.css';
import { Map, View, Feature } from 'ol';

import TileLayer from 'ol/layer/Tile';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Style, Circle, Fill, Stroke } from 'ol/style'
import { Tile, Vector as VectorLayer } from 'ol/layer'
import Point from 'ol/geom/Point';
import { fromLonLat, transform } from 'ol/proj';
import InputLocation from '../../general/InputLocation';

function loadMap() {
  let map_div = $('#map')
  let lng = 105.8194541
  let lat = 21.0227788


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
      zoom: 12
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
  map.on('click', e => {
    var lonlat = transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
    console.log(lonlat)
    marker.setCoordinates(e.coordinate)
  })

  return map
}

export default function AddressForm(props) {
  const state = useSelector(state => state.upload.address)
  const dispatch = useDispatch()
  props.validateRef.current = () => validate(state, 'address')

  const handleInputChange = (value, name) => {
    console.log(value)
    console.log(name)
    state[name] = value
    saveAddress(state)(dispatch)
  }



  React.useEffect(() => {
    loadMap()
    console.log('mounted')
    return () => {
      console.log('un mounted')
    }
  }, [])

  return (
    <CustomedPaper title="Địa điểm" shortDescription="Xác định vị trí của bạn trên bản đồ">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <InputLocation inputVariant="standard"></InputLocation>
        </Grid>
        {
          [
            { textFieldProps: { required: true, id: "address1", name: "address1", label: "Address line 1", fullWidth: true, autoComplete: "address-line1" } },
            { textFieldProps: { required: false, id: "address2", name: "address2", label: "Address line 2", fullWidth: true, autoComplete: "address-line2" } },
            { textFieldProps: { required: true, id: "city", name: "city", label: "City", fullWidth: true, autoComplete: "address-level2" }, sm: 6 },
            { textFieldProps: { required: true, id: "state", name: "state", label: "State/Province/Region", fullWidth: true }, sm: 6 },
            { textFieldProps: { required: true, id: "zip", name: "zip", label: "Zip / Postal code", fullWidth: true, autoComplete: "postal-code" }, sm: 6 },
            { textFieldProps: { required: true, id: "country", name: "country", label: "Country", fullWidth: true, autoComplete: "country" }, sm: 6 },
          ].map(line => (
            <Grid key={line.textFieldProps.id} item xs={12} sm={line.sm}>
              <TextField {...line.textFieldProps} value={state[line.textFieldProps.name]} onChange={e => handleInputChange(e.target.value, line.textFieldProps.name)}></TextField>
            </Grid>
          ))
        }
        <Grid item xs={12} sm={12}>
          <div id="map" style={{ width: "100%", height: "500px" }}></div>
        </Grid>
        {/* <iframe
          width="100%"
          height="450"
          frameBorder="0" style={{ border: 0 }}
          src="https://www.google.com/maps/embed/v1/search?center=21.0227788,105.8194541&key=AIzaSyBDzQDGITopmocksQoH6QR3UtmftSABZaE&q=Cau+Giay&zoom=14" allowfullscreen>
        </iframe> */}
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label: "Country"
            fullWidth
            autoComplete="country"
          />
        </Grid> */}
      </Grid>
    </CustomedPaper>
  );
}
