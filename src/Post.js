import {
    Button,
    CssBaseline,
    Typography,
    Grid,
    Breadcrumbs,
    Box,
} from '@material-ui/core';
import {
    AccountCircle,
    NavigateNext,
} from '@material-ui/icons';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import theme from './theme';
import {writePost} from "./Api";
import {useState} from 'react';
import {firestore, timestamp, user} from "./firebase";


export default function Post() {
    const classes = useStyles();

    let userName = '익명'
    const [data, setData] = useState(undefined);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    if (user != null){
        userName = user.displayName;
    }

    const handleWrite = (e) => {
        e.preventDefault();
        writePost('post', {title: title, body: body, author: userName, createdAt: timestamp});
        window.location.href ='/';
    }

    const handleClick = () => {
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
                        <AccountCircle />
                    </div>
                </header>
                <div align='center' >
                    <Grid className={classes.bread}>
                        <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb" className={classes.breadItem}>
                            <Button component={Link} to="/" onClick={handleClick}>
                                메인
                            </Button>
                            <Button onClick={handleClick}>
                                게시글
                            </Button>
                        </Breadcrumbs>
                    </Grid>
                    <Box className={classes.box}>
                        <Typography>제목</Typography>
                        <Typography>내용</Typography>
                    </Box>
                    <div align='right' style={{width: '80%'}}>
                        <Button
                            component={Link}
                            to='/'
                        >
                            취소
                        </Button>
                        <Button onClick={handleWrite}>
                            게시
                        </Button>
                    </div>
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
    bread: {
        display: 'flex',
        width: '80%',
    },
    breadItem: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    box: {
        display: 'flex',
        width: '80%',
        height: '80%',
        flexDirection: 'column',
    }
}));



