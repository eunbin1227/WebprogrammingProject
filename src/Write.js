import {
    Button,
    CssBaseline,
    Typography,
    Grid,
    Breadcrumbs,
    TextField,
    Box,
    IconButton,
    Checkbox,
} from '@material-ui/core';
import {
    AccountCircle,
    NavigateNext,
    CameraAltOutlined,
    CloudUpload,
    Delete,
} from '@material-ui/icons';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import theme from './theme';
import { writePost } from "./Api";
import {useEffect, useState} from 'react';
import {auth, timestamp, fstorage, firebaseConfig, firebaseApp} from "./firebase";
import ReactFirebaseImageUploader from "react-firebase-image-upload-control";

export default function Write() {
    const classes = useStyles();

    const [url, setURL] = useState("");
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [name, setName] = useState('');
    const [login, setLogin] = useState(undefined);
    const [file, setFile] = useState(null);


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



    const addFile = () => {

    }

    const handleUpload = () => {

    }


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

                    <div style={{ width: "80%" }}>
                        <ReactFirebaseImageUploader
                            firebaseApp={firebaseApp}
                            storageFolder="rfiu-test"
                            checkboxControl={Checkbox}
                            buttonControl={Button}
                            uploadButtonIcon={CloudUpload}
                            removeButtonIcon={Delete}
                            options={{
                                styles: {
                                    imgPreview: { maxWidth: "50px" },
                                    imgPreviewLabel: { fontSize: "12px" },
                                    progressControlWrapper: { height: "40px", width: "40px" }
                                }
                            }}
                            uploadCompleteCallback={statusObj => {
                                console.log("uploadCompleteCallback triggered, and we're done!, statusObj", statusObj);
                            }}
                            multiple
                        />
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
    },
    input: {

    },
    button: {

    }
}));



