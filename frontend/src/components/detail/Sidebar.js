import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import RatingScore from './RatingScore';
import { Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import RangeSelectCalendar from '../general/RangeSelectCalendar';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { archives, description, social, title } = props;
  const [expanded, setExpanded] = useState()
  const [days, setDays] = useState({
    from: undefined,
    to: undefined,
  })

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOnDayClicked = (range) => {
    setDays(range)
  }

  return (
    <Grid item xs={12} md={4}>
      <RatingScore />
      <Button variant="outlined" color="primary" fullWidth> Đặt phòng </Button>
      <ExpansionPanel expanded={expanded == 'days'} onChange={handleChange('days')}>
        <ExpansionPanelSummary
          aria-controls="panel1bh-days"
          id="panel1bh-header"
        >
          <Typography>Select Days</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <RangeSelectCalendar />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>
  );
}

Sidebar.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
};
