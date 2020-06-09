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
    const { options, refs, defaults } = props
    return (
        <FormGroup>
            {options.map((option, index) => {
                return (<FormControlLabel
                    key={option.id}
                    control={
                        <Checkbox
                            // checked={state[option.id]}
                            // onChange={handleChange}
                            defaultChecked={defaults[index]}
                            // value={option.id}
                            color="primary"
                            inputRef={ele => {
                                // console.log(ele)
                                refs[index] = ele
                            }}
                        />
                    }
                    label={option.title}
                />)
            })}
        </FormGroup>
    );
}
