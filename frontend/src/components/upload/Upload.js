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
            return <Review />;
        default:
            return <Review />;;
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
                            <ProgressSidebar activeStep={activeStep} steps={steps} />
                        </Grid>
                    </Grid>
                </div>
            </Drawer>
            <UploadMain activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} steps={steps} getStepContent={getStepContent} />
        </div>
    );
}
