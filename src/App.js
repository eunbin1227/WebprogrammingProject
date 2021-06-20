import './App.css';
import {Component} from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import Main from './Main';
import Login from './Login';


export default class App extends Component {
  render() {
    return(
        <div>
          <BrowserRouter>
            <Route path="/" exact component={Main} />
            <Route path="/ChooseData" component={Login} />
          </BrowserRouter>
        </div>
    )
  }
}