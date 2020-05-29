import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Grid } from '@material-ui/core';

// Custom Components
import UploadMain from './UploadMain'
import ProgressSidebar from './ProgressSidebar';

//Progress components
import BasicInfo from './progress-components/BasicInfo'
import AddressForm from './progress-components/AddressForm';
import PaymentForm from './progress-components/PaymentForm';
import Review from './Review';
import Descript from './progress-components/Descript';
import Facilities from './progress-components/Facilities';
import Prices from './progress-components/Prices';
import ReservationDate from './progress-components/ReservationDate';
import UploadImage from './progress-components/UploadImage';
import Cloudinary from '../general/Cloudinary';

const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


const steps = ['Thông tin cơ bản', 'Địa điểm', 'Mô tả', 'Vật dụng', 'Giá cả', 'Phòng trống', 'Hình ảnh', 'Hồ sơ', 'Đăng bài'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <BasicInfo />
        case 1:
            return <AddressForm />;
        case 2:
            return <Descript />;
        case 3:
            return <Facilities />;
        case 4:
            return <Prices />;
        case 5:
            return <ReservationDate />;
        case 6:
            return <Cloudinary />;
        default:
            return <Review />;;
    }
}

function getStepDescription(step) {
    switch (step) {
        case 0:
            return `Vui lòng cung cấp  mọi thông tin được yêu cầu trừ khi có đánh dấu không bắt buộc?`;
        case 1:
            return 'Khách hàng sẽ ở đâu?';
        case 2:
            return `Mỗi căn phòng, ngôi nhà đều có nét độc đáo riêng. Hãy giới thiệu các đặc điểm nổi bật tại nới ở của bạn?`;
        case 3:
            return `Nhà bạn có sẵn những vận dụng và tiện nghi gì?`;
        case 4:
            return `Chọn giá phòng mỗi đêm theo số lượng khách và các điều kiện khác?`;
        case 5:
            return `Thiết lập số ngày lưu trú tối thiểu và tối đa, các lựa chọn đặt phòng sớm và nhiều thiết lập khác.`
        default:
            return 'Unknown step';
    }
}


export default function ClippedDrawer() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Đăng kí kinh doanh
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <Grid container justify="center">
                        <Grid item xs={8} >
                            <ProgressSidebar activeStep={activeStep} steps={steps} getStepDescription={getStepDescription} handleNext={handleNext} handleBack={handleBack} />
                        </Grid>
                    </Grid>
                </div>
            </Drawer>
            <UploadMain activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} steps={steps} getStepContent={getStepContent} />
        </div>
    );
}
