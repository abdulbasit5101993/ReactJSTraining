import {useState} from 'react'
import axios from "axios"
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

function Login(props){
    var base_url = process.env.REACT_APP_BASE_URL;

    var [user, setUser]=useState({})
    var [name, setName]=useState()
    var [formerrors, setFormerrors] = useState({})
    
    var validate = function(elements){
        var errors = {}
        console.log("elements received for validation",elements)
        if(!elements.email.value){
            errors.email = "Email is Required"
        }   
        
        if(!elements.password.value){
            errors.password = "Password is Required"
        }
        var errorKeys = Object.keys(errors)
        if(errorKeys.length>0){
            return errors
        }
        else{
            return false
        }

    }

    var getEmail=(event)=>{
        console.log("props : ", props)
        setUser({
            ...user,
            email:event.target.value
        })
        setName(event.target.value)
        console.log("user is", user)
        console.log("name is", name)
    }

    var getPassword=(event)=>{
        setUser({
            ...user,
            password:event.target.value
        })
        //user.password=event.target.value;
    }
    var getCartDetails = ()=>{
        let getcartdetails =base_url+"/api/cakecart"
            axios({
                url:getcartdetails,
                method:"post",
                headers: {
                    authtoken: localStorage.getItem('token')
                },
            }).then((response)=>{   
                console.log("response from get cake cart api : ", response.data)
                if(response.data){
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
                }
            }, (error)=>{
                console.log("error response from add to cart api : ", error)
            })
    }

    let loginUser=function(event){
        event.preventDefault()
        var form = document.getElementById('loginform')
        console.log("Form Elements in this", form.elements)
        var errors = validate(form.elements)
        if(errors){
            setFormerrors(errors)
        }else{
            props.dispatch({
                type:'LOGIN',
                payload:user,
            })
            // props.dispatch({
            //     type:"CART_DETAILS"
            // })
            // console.log('isloggedin true',props.isloggedin)
            props.history.push("/")
        }
    }
    return(
        <div className="container">
            <div className="card shadow col-md-4 offset-md-4  col-sm-10 col-xs-10 offset-sm-1 offset-xs-1 mt-4 mb-4 pt-4 pb-4">
            <h3 className="text-center">Login</h3>
                <form id="loginform" className="p-4">
                <div>
                    <input type="email" name="email" className="form-control mt-4" onChange={getEmail} placeholder="Enter your email"></input>
                    {props.error?.email && <div className="text-danger">{props.error.email}</div>}
                    <input type="password" name="password" className="form-control mt-4" onChange={getPassword} placeholder="Enter you password"></input>    
                    {props.error?.password && <div className="text-danger">{props.error.password}</div>}
                <div className="mt-2">
                    <div style={{float:"left"}}><Link to="/signup">Signup</Link></div>
                    <div style={{float:"right"}}><Link to="/forgot">Forgot Password</Link></div>
                    </div>
                    <br/>
                    <br/>
                    <button className="btn btn-primary" onClick={loginUser}>Login</button>
                </div>
                </form>
            </div>
        </div>
    )
}
Login = withRouter(Login)
export default connect(function(state,props){
    console.log('state ka data ------------',state,props)
    return{
        token:state && state?.user?.token,
        isloggedin:state && state?.isloggedin
    }
})(Login)