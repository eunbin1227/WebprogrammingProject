import {
    Button,
    CssBaseline,
    Typography,
    Grid,
    Breadcrumbs,
    Box,
    TextField,
} from '@material-ui/core';
import {
    AccountCircle,
    NavigateNext,
    FavoriteBorder,
} from '@material-ui/icons';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import theme from './theme';
import { pushLike, writeComments } from "./Api";
import {useEffect, useState} from 'react';
import {auth, firestore, fstorage} from "./firebase";



export default function Post() {
    const classes = useStyles();

    const [data, setData] = useState(undefined);
    const [comment, setComment] = useState('');
    const [login, setLogin] = useState(undefined);
    const [name, setName] = useState('');
    const [docid, setDocid] = useState('');
    const [flag, setFlag] = useState(undefined);
    const [likeCount, setLikeCount] = useState(0)
    const [likeArray, setLikeArray] = useState([])
    const [urls, setURLs] = useState([]);

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


    useEffect(() => {
        console.log('run');
        fstorage.ref().child(docid).listAll().then((res) => {
            res.items.forEach((imageRef) => {
                 displayImage(imageRef);
            })
        });

        function displayImage(imageRef) {
            imageRef.getDownloadURL().then(function (url) {
                setURLs(oldArray => [...oldArray, url]);
            }).catch(function (error) {
                // Handle any errors
            });
        }
    }, [docid])


    const handleWrite = (e) => {
        e.preventDefault();
        console.log(docid, name, data.comment, comment);
        const obj = {}
        obj['user'] = name;
        obj['comment'] = comment;
        const newComment = obj;
        writeComments(docid, newComment);
        setTimeout(() => {window.location.reload()}, 1000);
    }

    const handleClick = () => {
        console.log('You clicked a breadcrumb.');
        console.log(urls)
    }

    useEffect(async()=>{
        const id = window.location.search.split('?')[1];
        setDocid(window.location.search.split('?')[1]);
        await firestore.collection('post').doc(id).get().then((doc) => {
            setData({body: doc.data().contents.body, author: doc.data().contents.author, title: doc.data().contents.title, createdAt: doc.data().contents.createdAt, comment: Object.values(doc.data().comment), like: doc.data().like})
            setLikeCount(doc.data().like.length)
            setLikeArray(doc.data().like)
        })
    },[])



    useEffect(()=> {
        {likeArray.includes(name) ? setFlag(true):setFlag(false)}
    }, [likeArray])


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

    const handleHeart = async() => {
        if (name == '익명') {
            alert('좋아요를 누르시려면 로그인이 필요합니다!')
            return
        }
        pushLike(docid, name)
        setFlag(!flag)
        {flag ? setLikeCount(likeCount -1 ) : setLikeCount(likeCount+ 1)}
    }


    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <header className={classes.header}>
                    <div><a href="/main">
                    <img alt="logo" src="https://i.ibb.co/xH3SBFj/2021-06-23-2-59-26.png" border="0" width="100" height="100"></img>
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
                                게시글
                            </Button>
                        </Breadcrumbs>
                    </Grid>
                    <Box className={classes.box} >
                        <Typography variant ='h4' className={classes.title}>{data ? data.title: console.log('No Title')}</Typography>
                        <Typography align="right" className={classes.title}>작성자: {data ? data.author: console.log('No Author')}</Typography>
                        <div align='center'>
                            {
                                urls.map((url) => (<img alt="" src={url} key={url} width="800" height="400"></img>))
                            }
                        </div>
                        <Typography className={classes.body}>{data ? data.body: console.log('No body')}</Typography>
                        <Button
                            style={{maxWidth: '5px', marginBottom: '20px'}}
                            onClick={handleHeart}
                            color={flag? 'secondary': 'default'}
                        ><FavoriteBorder align='left'/>{likeCount}</Button>
                        <Grid container className={classes.commentList} align='left'>
                            {
                                data ? data.comment.map((d) => <Typography key={d.user + d.comment}>{`${d.user} : ${d.comment}`}</Typography>) : console.log('s')
                            }
                        </Grid>
                        <TextField
                            id="comment"
                            label="댓글"
                            variant="outlined"
                            rows={5}
                            onChange={(e) => setComment(e.target.value)}
                            multiline
                        />
                        <Button onClick={handleWrite}>
                            게시
                        </Button>
                    </Box>
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
    title: {
        marginBottom: theme.spacing(5),
    },
    body: {
        marginBottom: theme.spacing(10),
    },
    commentList: {
        display: 'flex',
        flexDirection: 'column',
    }
}));



