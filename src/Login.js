import {
    Button,
    CssBaseline,
    Typography,
    Grid,
    Avatar,
    Container,
    TextField,
    Link,
    IconButton,
} from '@material-ui/core';
import {
    Lock,
    Home
} from '@material-ui/icons';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {useState} from "react";
import theme from './theme';


export default function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
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
                            로그인
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit} noValidate>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="이메일"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => {setEmail(e.target.value)}}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="비밀번호"
                                type="password"
                                id="password"
                                onChange={(e) => {setPassword(e.target.value)}}
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                로그인
                            </Button>
                            <Grid container justify='center'>
                                <Grid item>
                                    <Link href="/SignUp" variant="body2">
                                        {"계정이 없으신가요? 회원가입"}
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



