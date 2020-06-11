import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';
import CloudinaryGallery from '../general/CloudinaryGallery'
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function Main(props) {
  const classes = useStyles();
  const { posts, title, address } = props;

  return (
    <Grid item xs={12} md={8}>
      <CloudinaryGallery images={['wlzzofdp8dzcne645xxz', 'gtf0c9wtgmvbooarthxu', 'ett1wcbrnbpocgkwu10b']} />
      <Paper variant="outlined" style={{ padding: '10px', marginBottom: '20px' }}>
        <Typography variant="h4">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {address}
        </Typography>
      </Paper>
      <Typography>
        Tọa lạc tại thành phố Hà Nội, gần Nhà Hát Lớn và trung tâm thương mại Tràng Tiền Plaza, omfy and Cozy HomeSTAY nearby Hanoi Opera House cung cấp chỗ nghỉ với WiFi cùng chỗ đỗ xe riêng miễn phí.

        Phòng nghỉ tại đây có sân hiên, máy&nbsp;điều hòa,&nbsp;TV màn hình phẳng và phòng tắm riêng đi kèm&nbsp;vòi sen cùng máy sấy tóc. Để thêm phần thuận tiện cho du khách, chỗ nghỉ có thể cung cấp khăn tắm và ga trải giường với một khoản phụ phí.

Nhà hát múa rối nước Thăng Long và Nhà thờ Lớn cách homestay này lần lượt 1,9 km và 2,1 km. Sân bay gần nhất là sân bay quốc tế Nội Bài, cách 27 km từ <b>Comfy and Cozy HomeSTAY nearby Hanoi Opera House</b>.
      </Typography>
    </Grid >
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
