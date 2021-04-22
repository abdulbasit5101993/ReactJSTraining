import {useState} from 'react'
import axios from "axios"
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
function Login(props){
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
        let getcartdetails ="https://apibyashu.herokuapp.com/api/cakecart"
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
            let apiurl ="https://apibyashu.herokuapp.com/api/login"
            axios({
                url:apiurl,
                method:"post",
                data: user
            }).then((response)=>{
                
                props.dispatch({
                    type:"LOGIN",
                    payload:response.data
                })
                console.log("response from login api : ", response.data)
                if(response.data.token){
                    localStorage.token = response.data.token
                    props.history.push("/")
                    getCartDetails()
                } else{
                    alert("Invalid Credentials")
                }
            }, (error)=>{
                console.log("error response from login api : ", error)
            })
        }
    }
    return(
        <div className="container">
            <div className="card shadow col-md-4 offset-md-4  col-sm-10 col-xs-10 offset-sm-1 offset-xs-1 mt-4 mb-4 pt-4 pb-4">
            <h3 className="text-center">Login</h3>
                <form id="loginform" className="p-4">
                <div>
                    <input type="email" name="email" className="form-control mt-4" onChange={getEmail} placeholder="Enter your email"></input>
                    {formerrors?.email && <div className="text-danger">{formerrors.email}</div>}
                    <input type="password" name="password" className="form-control mt-4" onChange={getPassword} placeholder="Enter you password"></input>    
                    {formerrors?.password && <div className="text-danger">{formerrors.password}</div>}
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
    return{
        token:state && state?.user?.token
    }
})(Login)