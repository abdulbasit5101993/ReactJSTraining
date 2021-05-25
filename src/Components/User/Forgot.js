import {useState} from 'react'
import axios from "axios"
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
function Forgot(props){
    var base_url = process.env.REACT_APP_BASE_URL;
    var [user, setUser]=useState({})
    var [error,setError]=useState('')
    
    var getEmail=(event)=>{
        setUser({
            ...user,
            email:event.target.value
        })
    }

    let sendEmail=function(){
        if(!user.email)
        {
            setError("Please enter valid credentials")
            
        }else{
            let apiurl =base_url+"/api/recoverpassword"
            axios({
                url:apiurl,
                method:"post",
                data: user
            }).then((response)=>{
                console.log("response from login api : ", response.data)
            }, (error)=>{
                console.log("error response from login api : ", error)
            })
        }
    }
    return(
        <div className="container">
        <div className="card shadow col-md-4 offset-md-4  col-sm-10 col-xs-10 offset-sm-1 offset-xs-1 mt-4 mb-4 pt-4 pb-4">
            <h3 className="text-center">Send Password</h3>
            <div>
                    <input type="email" className="form-control mb-4 mt-4" onChange={getEmail} placeholder="Enter your email"></input>
                    <div className="text-danger">
                        {error}
                    </div>

                    <div>
                        <span style={{float:"left"}}><Link to="/signup">New User? Signup</Link></span>
                        <span style={{float:"right"}}><Link to="/login">Login</Link></span>
                    </div>
                    <br/>
                    <br/>
                    <button className="btn btn-primary" onClick={sendEmail}>Send</button>
                </div>
            </div>
        </div>
    )
}
export default Forgot