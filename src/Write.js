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
import {writePost, uploadImage} from "./Api";
import {useState} from 'react';
import {firestore, timestamp, user} from "./firebase";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function Write() {
    const classes = useStyles();
    let userName = '익명'
    const [data, setData] = useState(undefined);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [location, setLocation] = useState ('')

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

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

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
                    <div className="login-panel">
                        <AccountCircle />
                    </div>
                </header>

                <div align='center'>
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
                            rows={25}
                            multiline
                        />
                    </Box>

                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Location</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={location}
                                onChange={handleChange}
                            >
                                <MenuItem>인문대 1동</MenuItem>
                                <MenuItem>사회과학대학 16동</MenuItem>
                                <MenuItem>글로벌 공학 교육 센터 38동</MenuItem>
                                <MenuItem>경영대학 58동 </MenuItem>
                                <MenuItem>농업생명과학대학 200동 </MenuItem>
                                <MenuItem>생활과학대학 220동</MenuItem>
                                <MenuItem>기숙사 919동</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

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
    },
    formControl: {
        display: 'flex',
        width: '80%',
        height: '80%',
        minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

}));



