import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function SimpleRating(props) {
    const { name, onChange, value } = props
    const [localValue, setValue] = React.useState(value);

    return (
        <div>
            <Rating
                name={name}
                value={localValue}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    onChange(newValue, name)
                }}
            />
        </div>
    );
}
