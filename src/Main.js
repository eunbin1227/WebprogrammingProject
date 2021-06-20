import {
    Button,
    CssBaseline,
    Typography,
} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 275,
        display: 'grid',
        height: '100vh',
    },
}));

export default function Main() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <header>
                    <div>Logo</div>
                    <h2>Title</h2>
                    <div className="login-panel">
                        <Button >Login</Button>
                    </div>
                </header>
            </div>
        </ThemeProvider>
    );
}



