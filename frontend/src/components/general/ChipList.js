import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

// Danh sách tag, non-clickable
export function SmallChips(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {
                props.chipList.map((chip, index) =>
                    <Chip
                        key={index}
                        size="small"
                        label={chip}
                        color="primary"
                        variant="outlined"
                        onDelete={e => { }}
                        deleteIcon={<DoneIcon />}
                    />
                )
            }
        </div>
    );
}
