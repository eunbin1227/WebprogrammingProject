import {
    Button,
    CssBaseline,
    Typography,
    Grid,
    Breadcrumbs,
    TextField,
    Box,
} from '@material-ui/core';
import {
    AccountCircle,
    NavigateNext,
    CameraAltOutlined,
    VideoCallOutlined,
    AttachFileOutlined,
} from '@material-ui/icons';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import theme from './theme';
import { writePost } from "./Api";
import {useEffect, useState} from 'react';
import {auth, timestamp} from "./firebase";


export default function Write() {
    const classes = useStyles();

    const [data, setData] = useState(undefined);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [name, setName] = useState('');
    const [login, setLogin] = useState(undefined);


    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                setLogin(true);
                setName(user.email.split('@')[0]);
            } else {
                // No user is signed in.
                setLogin(false);
                setName('익명');
            }
        });
    })

    const handleWrite = (e) => {
        e.preventDefault();
        writePost('post', {title: title, body: body, author: name, createdAt: timestamp});
        setTimeout(() => {window.location.href='/'}, 1000);
    }

    const handleClick = () => {
        console.log('You clicked a breadcrumb.');
        console.log(name);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            // Sign-out successful.
            window.location = '/';
        }).catch((error) => {
            // An error happened.
            alert(error.code);
        });
    }

    // const addFile = (e) => {
    //     e.preventDefault();
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //
    //     reader.onload = async (progressEvent) => {
    //         const data = await progressEvent.target.result;
    //         setData(data);
    //     }
    //     // reader.readAsText(file);
    // }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <header className={classes.header}>
                    <div><a href="/main">
                        <img alt="logo" src="https://ifh.cc/g/SsvCZf.png" border="0" width="100" height="100"></img>
                    </a></div>
                    <Typography variant='h4'>서울대학교 물품 거래 커뮤니티</Typography>
                    <div className="login-panel" align='center'>
                        {login ?
                            <div>
                                <Typography> Hello! {name} </Typography>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    startIcon={<AccountCircle />}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                            :
                            <Button
                                variant='contained'
                                color='primary'
                                startIcon={<AccountCircle />}
                                component={Link}
                                to="/Login"
                            >
                                Login
                            </Button>
                        }
                    </div>
                </header>
                <div align='center' >
                    <Grid className={classes.bread}>
                        <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb" className={classes.breadItem}>
                            <Button component={Link} to="/" onClick={handleClick}>
                                메인
                            </Button>
                            <Button onClick={handleClick}>
                                게시글 작성
                            </Button>
                        </Breadcrumbs>
                    </Grid>
                    <Box className={classes.box}>
                        <TextField
                            id="title"
                            label="제목"
                            variant="outlined"
                            onChange={e=>setTitle(e.target.value)}
                        />
                        <TextField
                            id="body"
                            label="내용"
                            variant="outlined"
                            onChange={e=>setBody(e.target.value)}
                            rows={20}
                            multiline
                        />
                    </Box>
                    <div align='left' style={{width: '80%'}}>
                        <Button>
                            <CameraAltOutlined />
                            <input
                                // type="file"
                                // onChange={addFile}
                                hidden
                                />
                        </Button>
                        <Button>
                            <VideoCallOutlined />
                        </Button>
                        <Button>
                            <AttachFileOutlined />
                        </Button>
                    </div>
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



