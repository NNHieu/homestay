import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';
import CloudinaryGallery from '../general/CloudinaryGallery'
import { Paper, Button, Link, Box, Chip } from '@material-ui/core';
import MapComponent from '../general/MapComponent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FacilitiesList from './FacilitiesList';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { facilties_list } from '../../reducers/upload';
import { Margin } from '../general/Margin';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

const useHFacilitiesStyles = makeStyles(theme => ({
  chipRoot: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function HTitle(props) {
  const { title, address } = props
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Paper variant="outlined" style={{ padding: '10px', marginBottom: '20px' }}>
        <Typography variant="h4">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {address} - <Link href="#" onClick={handleClickOpen} >Xem trên bản đồ </Link>
        </Typography>
      </Paper>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Đây là vị trí homestay trên bản đồ"}</DialogTitle>
        <DialogContent
          style={{
            width: "1000px"
          }}
        >
          <Box style={{
            width: "1000px"
          }}>
            <MapComponent lat={21.0227788} lng={105.8194541} zoom={16} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Chỉ đường
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

function HType(props) {
  return (
    <Paper variant="outlined" style={{ padding: "20px 20px", marginBottom: "20px" }}>
      <Box style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>
        <HomeWorkIcon style={{}} fontSize="large" />
        <Typography>Nhà/Chung cư</Typography>
      </Box>
    </Paper>
  )
}

function HDescription(props) {
  return (
    <Paper variant="outlined" style={{ padding: "20px 20px", marginBottom: "20px" }}>
      <Typography>
        Tọa lạc tại thành phố Hà Nội, gần Nhà Hát Lớn và trung tâm thương mại Tràng Tiền Plaza, omfy and Cozy HomeSTAY nearby Hanoi Opera House cung cấp chỗ nghỉ với WiFi cùng chỗ đỗ xe riêng miễn phí.

        Phòng nghỉ tại đây có sân hiên, máy&nbsp;điều hòa,&nbsp;TV màn hình phẳng và phòng tắm riêng đi kèm&nbsp;vòi sen cùng máy sấy tóc. Để thêm phần thuận tiện cho du khách, chỗ nghỉ có thể cung cấp khăn tắm và ga trải giường với một khoản phụ phí.

        Nhà hát múa rối nước Thăng Long và Nhà thờ Lớn cách homestay này lần lượt 1,9 km và 2,1 km. Sân bay gần nhất là sân bay quốc tế Nội Bài, cách 27 km từ <b>Comfy and Cozy HomeSTAY nearby Hanoi Opera House</b>.
      </Typography>
    </Paper>
  )
}

function HImages(props) {
  return (
    <Paper variant="outlined" style={{ padding: "20px 20px", marginBottom: "20px" }}>
      <CloudinaryGallery images={['wlzzofdp8dzcne645xxz', 'gtf0c9wtgmvbooarthxu', 'ett1wcbrnbpocgkwu10b']} />
    </Paper>

  )
}

function HFacilities(props) {
  const classes = useHFacilitiesStyles()
  const { facilities } = props
  return (
    <Paper variant="outlined" style={{ padding: "20px 20px", marginBottom: "20px" }}>
      {
        Object.keys(facilities).map(fname => (
          <>
            <Margin size="20px" />
            <Typography variant="h6">
              {facilties_list[fname].title}
            </Typography>
            <Divider />
            <Margin size="20px" />
            <div className={classes.chipRoot} >
              {
                facilities[fname].map(
                  (f, index) =>
                    f && <Chip key={index} label={facilties_list.basicFacilities.list[index].title} />
                )
              }
            </div>
          </>
        ))
      }

    </Paper>
  )
}

export default function Main(props) {
  const classes = useStyles();
  const { posts, title, address } = props;
  return (
    <Grid item xs={12} md={8}>
      <HTitle title={title} address={address} />
      <HType />
      <HImages />
      <HFacilities facilities={{
        basicFacilities: [true, false, true, false, true, false, true, false],
        comfortFacilities: [true, false, true, false, true,],

      }} />
      <HDescription />
    </Grid >
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
