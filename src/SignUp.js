import {
    Button,
    CssBaseline,
    Typography,
    Grid,
    Avatar,
    Container,
    TextField,
    Link, IconButton,
} from '@material-ui/core';
import {
    Home,
    Lock
} from '@material-ui/icons';
import {useState} from "react";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { auth } from './firebase';


export default function SignUp() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                alert('회원가입이 완료되었습니다!');
                window.location = '/Login';
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                //const errorMessage = error.message;
                alert(errorCode);
                // ..
            });
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <div className={classes.contain}>
                            <IconButton href="/" > <Home/> </IconButton>
                        </div>
                        <Avatar className={classes.avatar}>
                            <Lock />
                        </Avatar>
                        <Typography component="h1" variant="h5" className={classes.title}>
                            회원가입
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="이메일"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(e) => {setEmail(e.target.value)}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="비밀번호"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={(e) => {setPassword(e.target.value)}}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                회원가입
                            </Button>
                            <Grid container justify="center">
                                <Grid item>
                                    <Link href="/Login" variant="body2">
                                        계정이 이미 있으신가요? 로그인
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
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
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: '#000000',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    title: {
        margin: theme.spacing(0, 0, 3),
    },
    contain: {
        display: 'flex',
        marginLeft: 'auto',
    }
}));



