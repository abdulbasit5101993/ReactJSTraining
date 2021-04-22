
import {Component} from "react"
import axios from "axios"
import { Link } from 'react-router-dom';
// import { post } from "jquery"
class Signup extends Component{
    constructor(){
        super()
        this.state={
            
        }
    }

    user = {}
    
    getEmail = (event)=>{
        this.user.email = (event.target.value);
    }
    getPassword = (event)=>{
        this.user.password = (event.target.value);
    }

    register = ()=>{
        if( (this.user.email) && (this.user.password)){
            if( this.user.email === 'basit163@gmail.com' && this.user.password === '12345678'){
                // this.setState({
                //     message :  'logged in successfully'
                // })
                let apiUrl = "https://apibyashu.herokuapp.com/api/register";
                axios({
                    url:apiUrl,
                    method: "post",
                    data: this.user,
                }).then((response)=>{
                    console.log(response);
                }, (error)=>{
                    console.log(error);
                });

            }else{
                this.setState({
                    message : 'failed to login'
                }) 

            }
        }else{
            this.setState({
                message : 'Please fill out the Form'
            }) 
        }
        console.log(this.user.email,this.user.password);
    }
    render(){
        return(
            <div className="container">
            <div className="card shadow col-md-4 offset-md-4  col-sm-10 col-xs-10 offset-sm-1 offset-xs-1 mt-4 mb-4 pt-4 pb-4">
            <h2>Register</h2>
            <input className="form-control mt-4" placeholder="Enter Email" type="text" name="email" onChange={this.getEmail}></input>
            <input className="form-control mt-4" placeholder="Enter Password" type="password" name="password" onChange={this.getPassword}></input>
            <div className="text-danger mt-2">
            {this.state.message}
            </div>
            <button className="btn btn-primary mt-4 mb-4" onClick={this.register}>Register</button>
            <div>
                <Link to="/login">Already Existing User? click here to login</Link>
            </div>
        </div>
        </div>
    );
    }
}

export default Signup