import React,{ Suspense} from "react"
import './App.css';
import Nav from './Nav.js';
import Signup from './Signup.js';
import Login from './Login.js';
import Forgot from './Forgot.js';
import Home from './Home.js';
import Search from './Search.js';
import Cart from './Cart.js';
import Checkout from './Checkout.js';
import RemoveItem from './RemoveItem.js';
import {BrowserRouter as Router , Route, Redirect, Switch} from "react-router-dom";
import CakeDetails from './CakeDetails';
import OrderDetails from './OrderDetails';
import axios from "axios"
import { connect } from "react-redux"
import Orders from "./Orders";

var SuspendedAdmin = React.lazy(()=>import('./Admin'))
function App(props) {

if(localStorage.token && !props.user){
  var token = localStorage.token
  console.log('user is logged in')
  axios({
    method:'get',
    url:'https://apifromashu.herokuapp.com/api/getuserdetails',
    headers:{
      authtoken:token
    }
  }).then((response) =>{
    props.dispatch({
      type:'INTIALIZE_USER',
      payload:response.data.data
    })
  }, (error)=>{
    console.log('error from user details api',error)
  })

  let getcartdetails ="https://apibyashu.herokuapp.com/api/cakecart"
    axios({
        url:getcartdetails,
        method:"post",
        headers: {
            authtoken: localStorage.getItem('token')
        },
    }).then((response)=>{   
      console.log('get cake',response.data);  
      props.dispatch({
        type:"CARTDETAILS",
        payload:response.data.data
        })
        var data = response.data.data;
        var total = 0;
        data.forEach(data => {
            total += data.price;
        });
        props.dispatch({
        type:"CARTTOTAL",
        payload:total
        })
        props.dispatch({
        type:"CHECKOUTSTEP",
        payload:1
        })
    }, (error)=>{
    console.log("error response from add to cart api : ", error)
    }) 
}
  return (
    <div className="App">
      <Router>
        <Nav ></Nav>
        <div>
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/login" exact>
                <Login /> 
              </Route>
              <Route path="/signup" exact component={Signup}></Route>
              <Route path="/forgot" exact component={Forgot}></Route>
              <Route path="/search" exact component={Search}></Route> 
              <Route path="/orders" exact component={Orders}></Route> 
              <Route path="/orderdetails" exact component={OrderDetails}></Route> 
              <Route path="/cart" exact component={Cart}></Route> 
              <Route path="/checkout" component={Checkout}></Route> 
              <Route path="/cake/:cakeid" exact component={CakeDetails}></Route> 
              <Route path="/removeitem/:cakeid" exact component={RemoveItem}></Route> 
              <Route path="/admin" exact>
              <Suspense fallback={<div>Loading..</div>}>
                <SuspendedAdmin/>
              </Suspense>
              </Route>
              <Route path="/*">
                  <Redirect to="/"></Redirect>
              </Route>
          </Switch>
        </div>
      </Router>
    </div>
    )
}

export default connect(function(state,props){
  return {
    user:state?.user,
    token:state?.user?.token
  }
})(App);
