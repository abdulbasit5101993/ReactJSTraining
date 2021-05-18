import axios from "axios"
// import { push } from 'react-router-dom';
import {all, call, put, takeEvery, select} from "redux-saga/effects"

var base_url = 'https://apifromashu.herokuapp.com/';
//var base_url = process.env.REACT_APP_BASE_URL;
function login(action){
    return axios({
        method:"post",
        url:base_url+"api/login",
        data:action.payload,
    })      
}

function placeOrder(action){
    alert('inside saga file')
    console.log('inside saga file',action.payload)
    return axios({
        method:"post",
        url:base_url+"api/addcakeorder",
        data:action.payload,
        headers : {
            authtoken: localStorage.token
        }
    })      
}

function orderDetails(action){
    return axios({
        method:"post",
        url:base_url+"api/cakeorders",
        data:action.payload,
        headers : {
            authtoken: localStorage.token
        }
    })      
}

function* LoginGenerator(action, props){
    console.log('action in login saga',action)
    var state = yield select(function(state){
        return state
    })
    var result = yield(call(login,action,props))
    if(result.data.token){
        yield put({type:"LOGIN_SUCCESS",payload:result.data})  
        localStorage.setItem('token', result.data.token);
        console.log('this is the state',state);
    }else{
        yield put({type:"LOGIN_FAILURE"})   
    }
}

function* OrderDetailsGenerator(action, props){
    var result = yield(call(orderDetails,action,props))
    if(result){
        yield put({type:"ORDER_DETAILS_SUCCESS",payload:result.data})  
    }else{
        
        yield put({type:"ORDER_DETAILS_FAILURE"})  
    }
}

function* PlaceOrderGenerator(action, props){
    var result = yield(call(placeOrder,action,props))
    if(result){
        yield put({type:"ORDER_PLACED_SUCCESS",payload:result.data})  
    }else{
        yield put({type:"ORDER_PLACED_FAILURE"})  
    }
}

export function* LoginSaga(){
    yield takeEvery('LOGIN',LoginGenerator) 
}

export function* GetOrders(){
    yield takeEvery('ORDER_DETAILS',OrderDetailsGenerator) 
}

export function* PlaceOrders(){
    yield takeEvery('PLACEORDER',PlaceOrderGenerator) 
}

export function* RootSaga(){
    // yield takeEvery('LOGIN',LoginGenerator) 
    yield all([LoginSaga(),GetOrders(),PlaceOrders()]) 
}