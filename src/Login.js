
import {Component} from "react"
import axios from "axios"
import { post } from "jquery"
class Login extends Component{
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

    login = ()=>{
        if( (this.user.email) && (this.user.password)){
            if( this.user.email === 'basit163@gmail.com' && this.user.password === '12345678'){
                // this.setState({
                //     message :  'logged in successfully'
                // })
                let apiUrl = "https://apibyashu.herokuapp.com/api/login";
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
        <div className="shadow col-4 offset-4 mt-4 mb-4 pt-4 pb-4">
            <h2>Login Form</h2>
            <input className="form-control" placeholder="Enter Email" type="text" name="email" onChange={this.getEmail}></input>
            <input className="form-control mt-2" placeholder="Enter Password" type="password" name="password" onChange={this.getPassword}></input>
            <div className="text-danger mt-2">
            {this.state.message}
            </div>
            <button className="btn btn-success mt-2" onClick={this.login}>Login</button>
        </div>
    );
    }
}

export default Login