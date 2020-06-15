import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import { facilties_list } from '../../reducers/upload';

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

export default function FacilitiesList(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.facilities.map(
                (f, index) =>
                    f && <Chip key={index} label={facilties_list.basicFacilities.list[index].title} />
            )}
        </div>
    );
}
