import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


export default function CheckBoxList(props) {
    const { options, onChange, name } = props
    const [state, setState] = React.useState(options.map((option, index) => ({
        [option.id]: option.checked
    })));

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        onChange({ [event.target.name]: event.target.checked }, name)
    };

    return (
        <FormGroup>
            {options.map((option, index) => {
                return (<FormControlLabel
                    key={option.id}
                    control={
                        <Checkbox
                            checked={state[option.id]}
                            onChange={handleChange}
                            name={String(option.id)}
                            color="primary"
                        />
                    }
                    label={option.title}
                />)
            })}
        </FormGroup>
    );
}
