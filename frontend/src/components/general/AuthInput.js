import React from 'react'
import { TextField } from '@material-ui/core'


const autoCompleteNameMap = {
    firstName: 'fname',
    lastName: 'lname',
    email: 'email',
    password: 'password'
}

const labelNameMap = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email Address',
    password: 'Password'
}

const typeNameMap = {
    firstName: 'text',
    lastName: 'text',
    email: 'email',
    password: 'password'
}

const textFieldProps = (name) => ({
    variant: "outlined",
    name,
    id: name,
    required: true,
    fullWidth: true,
    label: labelNameMap[name],
    type: typeNameMap[name],
    autoComplete: autoCompleteNameMap[name]
})

export default function AuthInput(props) {
    const { name, error, helperText, checkInput, inref, ...others } = props
    return (
        <TextField
            {...textFieldProps(name)}
            error={error}
            helperText={error ? helperText : ''}
            // onBlur={e => showError(e.target.name)}
            onChange={e => checkInput(e.target.value, e.target.name)}
            inputRef={input => (
                inref[name] = input
            )}
            {...others}
        />
    )
}
