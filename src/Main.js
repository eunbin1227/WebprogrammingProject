import {
    Button,
    CssBaseline,
    Typography,
    Grid,
    Breadcrumbs,
} from '@material-ui/core';
import {
    AccountCircle,
    ChatBubbleOutline,
    FavoriteBorder,
    Visibility,
    NavigateNext,
} from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import theme from './theme';


export default function Main() {
    const classes = useStyles();

    const rows = [
        { id: 1, col1: 'Test1', col2: '10', col3: '1', col4: '5', col5: '2021년 06월 21일' },
        { id: 2, col1: 'Test2', col2: '1', col3: '12', col4: '45', col5: '2021년 02월 21일' },
        { id: 3, col1: 'Test3', col2: '106', col3: '13', col4: '55', col5: '2021년 01월 21일' },
    ];

    const columns = [
        { field: 'col1', headerName: ' ',  width: 500 },
        { field: 'col2', headerName: ' ', renderHeader: () => (<ChatBubbleOutline />), width: 150 },
        { field: 'col3', headerName: ' ', renderHeader: () => (<FavoriteBorder />), width: 150 },
        { field: 'col4', headerName: ' ', renderHeader: () => (<Visibility />), width: 150 },
        { field: 'col5', headerName: '최근 활동', width: 300 },
    ];

    const handleClick = (e) => {
        e.preventDefault();
        console.log('You clicked a breadcrumb.');
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <header className={classes.header}>
                    <div>Logo</div>
                    <Typography variant='h1'>Title</Typography>
                    <div className="login-panel">
                        <Button
                            variant='contained'
                            color='primary'
                            startIcon={<AccountCircle />}
                            component={Link}
                            to="/Login"
                        >
                        Login
                        </Button>
                    </div>
                </header>
                <div align='center'>
                    <div>
                        <Grid className={classes.bread}>
                            <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb" className={classes.breadItem}>
                                <Button onClick={handleClick}>
                                    메인
                                </Button>
                                {/*<Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>*/}
                                {/*    Core*/}
                                {/*</Link>*/}
                                {/*<Typography color="textPrimary">Breadcrumb</Typography>*/}
                            </Breadcrumbs>
                        </Grid>
                    </div>
                    <div align='right' style={{width: '80%'}}>
                        <Button
                            variant='contained'
                            color='primary'
                            component={Link}
                            to='/Write'
                        > 게시글 작성 </Button>
                    </div>
                    <Grid className={classes.table}>
                        <div style={{ height: 300, width: '80%'}}>
                            <DataGrid rows={rows} columns={columns} />
                        </div>
                    </Grid>
                </div>
            </div>

        </ThemeProvider>
    );
}

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 275,
        display: 'grid',
        height: '100vh',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        margin: 'auto',
        justifyContent: 'space-between',
    },
    table: {
        display: 'flex',
        justifyContent: 'center',
    },
    bread: {
        display: 'flex',
        width: '80%',
    },
    breadItem: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));



