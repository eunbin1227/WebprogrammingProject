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
    NavigateNext,
} from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import theme from './theme';
import {useEffect, useState} from "react";
import { getPost } from "./Api";
import { firestore } from "./firebase";
import { auth } from './firebase';


export default function Main() {
    const classes = useStyles();
    const [data, setData] = useState([])
    const [login, setLogin] = useState(undefined);
    const [name, setName] = useState('');
    const [signInTime, setSignInTime] = useState('');

    useEffect(()=>{
        firestore.collection('post').get().then((querySnapshot) => {
            setData(querySnapshot.docs.map((doc)=>
                ({id: doc.id, detail: doc.data().contents, comment: doc.data().comment, like: doc.data().like})
            ))
        })
        console.log(data)
    },[])


    const changeTime = (input) => {
        const temp = input.split(' ');
        return temp[3]+'년 '+(new Date(Date.parse(temp[2] + "1, 2021")).getMonth()+1)+'월 '+temp[1]+ '일';
    }


    const changeSecond = (input) => {
        return new Date(input * 1000).toISOString().substr(11, 8) + " GMT"
    }



    const rows = data ? data.map(d => {
        return {
            id: d.id,
            col1: d.detail.title,
            col2: d.comment.length,
            col3: d.like.length,
            col4: d.detail.location,
            col5: changeSecond(d.detail.createdAt.seconds)}
    }) : []


    const columns = [
        {
            field: 'col1',
            headerName: '제목',
            width: 600,
            renderCell: (params) => {return (<Button component={Link} to={'/Main/Post?'+params.id}>{params.value}</Button>)}
        },
        { field: 'col2', headerName: ' ', renderHeader: () => (<ChatBubbleOutline />), width: 80 },
        { field: 'col3', headerName: ' ', renderHeader: () => (<FavoriteBorder />), width: 80 },
        { field: 'col4', headerName: '장소', width: 140 },
        { field: 'col5', headerName: '작성 시간', width: 200 },
    ];

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                setLogin(true);
                setName(user.email.split('@')[0]);
                setSignInTime(changeTime(user.metadata.lastSignInTime));
            } else {
                // No user is signed in.
                setLogin(false);
            }
        });
    })

    const handleClick = (e) => {
        e.preventDefault();
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
                                <Typography> 최근 접속일: {signInTime} </Typography>
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
                <div align='center'>
                    <div>
                        <Grid className={classes.bread}>
                            <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb" className={classes.breadItem}>
                                <Button onClick={handleClick}>
                                    메인
                                </Button>
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



