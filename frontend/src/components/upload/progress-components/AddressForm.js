import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CustomedPaper from '../../general/CustomedPaper';

//Reducers
import { saveAddress } from '../../../reducers/upload'

export default function AddressForm() {
  const state = useSelector(state => state.upload.address)
  const dispatch = useDispatch()
  const handleInputChange = (value, name) => {
    console.log(value)
    console.log(name)
    state[name] = value
    saveAddress(state)(dispatch)
  }
  return (
    <CustomedPaper title="Địa điểm" shortDescription="Xác định vị trí của bạn trên bản đồ">
      <Grid container spacing={3}>
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
