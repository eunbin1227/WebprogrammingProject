import './App.css';
import {Component} from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import SignUp from './SignUp';
import Write from './Write';
import Post from './Post';


export default class App extends Component {
  render() {
    return(
        <div>
          <BrowserRouter>
              <Route path="/" exact component={Main} />
              <Route path="/Main" exact component={Main} />
              <Route path="/Login" component={Login} />
              <Route path="/SignUp" component={SignUp} />
              <Route path="/Write" component={Write} />
              <Route path="/Main/Post" exact component={Post} />
              <Route path="/Main/Post/:id" exact component={Post} />
          </BrowserRouter>
        </div>
    )
  }
}