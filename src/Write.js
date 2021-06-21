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


export default function Write() {
    const classes = useStyles();

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
                                게시글 작성
                            </Button>
                        </Breadcrumbs>
                    </Grid>
                    <Box /*border={2} borderColor="grey.500"*/ className={classes.box}>
                        <TextField
                            id="title"
                            label="제목"
                            variant="outlined"
                        />
                        <TextField
                            id="body"
                            label="내용"
                            size="large"
                            variant="outlined"
                            rows={23}
                            multiline
                        />
                    </Box>
                    <div align='left' style={{width: '80%'}}>
                        <Button>
                            <CameraAltOutlined />
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
                        <Button>
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



