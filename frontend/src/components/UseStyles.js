import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 400;
export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    a: {
        textDecoration: "none",
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
