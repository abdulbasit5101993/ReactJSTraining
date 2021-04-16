import './App.css';
import Carousel from './Carousel.js';
import Card from './Card.js';
import Nav from './Nav.js';
import Signup from './Signup.js';
import Login from './Login.js';

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
        
      </Router>
      <Nav/>
      <Signup/>
      <Login/>
      
      <Carousel/>
            <Card cakedata={myObj}/>
            <Card cakedata={myObj}/>
            <Card cakedata={myObj}/>
            <Card cakedata={myObj}/>
    </div>
  );
}

export default App;
