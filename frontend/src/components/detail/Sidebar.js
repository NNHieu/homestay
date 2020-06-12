import React, { useState } from 'react';
import PropTypes, { number } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import RatingScore from './RatingScore';
import { Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Box, Divider } from '@material-ui/core';
import RangeSelectCalendar from '../general/RangeSelectCalendar';
import NumberPlusMinus from '../general/NumberPlusMinus';
import { Margin } from '../general/Margin';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  stickySide: {
    background: 'white',
    position: '-webkit-sticky',
    position: 'sticky',
    top: 40,
    bottom: 40,
    paddingTop: '40px',
    paddingBottom: '40px',
    zIndex: 5,
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
  const [numberGuest, setNumberGuest] = useState({
    children: 0,
    adults: 2,
    rooms: 1
  })
  const refUnchangeFlag = React.useRef(false)

  const handleChange = (panel) => (event, isExpanded) => {
    console.log('fasd')
    if (!refUnchangeFlag.current)
      setExpanded(isExpanded ? panel : false);
    refUnchangeFlag.current = false
  };

  const handleOnDayClicked = range => setDays(range)

  const handleResetClick = () => {
    refUnchangeFlag.current = true
    setDays({
      from: undefined,
      to: undefined
    });
  }

  const handleChangeNumGuest = (value, name) => {
    numberGuest[name] = value
    setNumberGuest({ ...numberGuest })
  }


  return (
    <Grid item xs={12} md={4}>
      <div className={classes.stickySide}>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <RatingScore />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" disabled={!(days.from && days.to)} color="primary" fullWidth><Typography variant="h5">
              Đặt phòng
            </Typography></Button>
          </Grid>
          <Grid item xs={12}>
            <ExpansionPanel expanded={expanded == 'days'} onChange={handleChange('days')}>
              <ExpansionPanelSummary
                aria-controls="panel1bh-days"
                id="panel1bh-header"
              >
                <Grid container alignItems="center">
                  <Grid item xs={10}>

                    <Typography>
                      {!days.from && !days.to && 'Chọn ngày check-in'}
                      {days.from && !days.to && 'Chọn ngày check-out'}
                      {days.from &&
                        days.to &&
                        `Từ ngày ${days.from.toLocaleDateString()} đến ${days.to.toLocaleDateString()}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {days.from && days.to && (
                      <Button className="link" onClick={handleResetClick}>
                        Reset
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <RangeSelectCalendar onDayClick={handleOnDayClicked} defaultValue={days} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded == 'number'} onChange={handleChange('number')}>
              <ExpansionPanelSummary
                aria-controls="panel2bh-number"
                id="panel2bh-header"
              >
                {
                  expanded != 'number' ?
                    <Box>
                      <Typography>
                        {numberGuest.adults} người lớn
                    </Typography>
                      {
                        numberGuest.children > 0 &&
                        <Typography>
                          {numberGuest.children} trẻ em
                      </Typography>
                      }
                      <Typography variant="subtitle1" color="textSecondary">
                        {numberGuest.rooms} phòng
                    </Typography>
                    </Box>
                    :
                    <Typography color="textSecondary">
                      Chọn số người lưu trú
                  </Typography>
                }
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography>Số người lớn</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <NumberPlusMinus defaultValue={numberGuest.adults} min={1} max={10} name={'adults'} onChange={handleChangeNumGuest} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Số trẻ em</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <NumberPlusMinus defaultValue={numberGuest.children} min={0} max={10} name={'children'} onChange={handleChangeNumGuest} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography >Số phòng</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <NumberPlusMinus defaultValue={numberGuest.rooms} min={1} max={10} name={'rooms'} onChange={handleChangeNumGuest} />
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

Sidebar.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
};
