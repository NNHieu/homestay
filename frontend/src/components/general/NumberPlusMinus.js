import React from 'react'
import { InputAdornment, FormControl, OutlinedInput, IconButton } from '@material-ui/core'
import NumberFormat from 'react-number-format';

//Icons
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

/**
 * 
 * @param defaultValue
 * @param min
 * @param max 
 */
export default function NumberPlusMinus(props) {
    const { defaultValue, min, max, onChange, inputProps, name } = props
    const [value, setValue] = React.useState(defaultValue)
    const changeValue = (value) => {
        if (!(value < min || value > max)) {
            setValue(value)
            if (onChange)
                onChange(value, name)
        }
    }
    return (
        <FormControl >
            <OutlinedInput
                size="small"
                {...inputProps}
                startAdornment={
                    <InputAdornment position="start">
                        <IconButton
                            aria-label="minus"
                            onClick={() => { changeValue(value - 1) }}
                        >
                            <RemoveIcon />
                        </IconButton>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="plus"
                            onClick={() => { changeValue(value + 1) }}
                        >
                            <AddIcon />
                        </IconButton>
                    </InputAdornment>
                }
                value={value}
                // onChange={
                //     (e) => {
                //         console.log(e.target.value)
                //     }
                // }
                disabled
                inputComponent={(props) => {
                    const { inputRef, ...other } = props
                    return (<NumberFormat
                        getInputRef={inputRef}
                        style={{ textAlign: "center" }}
                        {...other}
                    // isAllowed={values => {
                    //     console.log('fasd')
                    //     console.log(values)
                    //     return values.floatValue <= 20 && values.floatValue > 0
                    // }}
                    // onValueChange={(values) => {
                    //     console.log(values)
                    //     if (values.value == "") {
                    //         setValue(0)
                    //     } else
                    //         setValue(parseInt(values.value))
                    // }}
                    />)
                }}
            />
        </FormControl>
    )
}

