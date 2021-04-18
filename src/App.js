import './App.css';
import Nav from './Nav.js';
import Signup from './Signup.js';
import Login from './Login.js';
import Home from './Home.js';
import Search from './Search.js';

import {BrowserRouter as Router , Route, Redirect, Switch} from "react-router-dom";
var myObj = {
        name: 'Choclate Truffle',
        image: 'carousel1.jpg',
        alt: 'image',
        price: 880
        }
function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/search" exact component={Search}></Route>
      </Router>
      <Signup/>
      <Login/>
      {/* <Home/> */}
      <Search/>
    
    </div>
  );
}

export default App;
