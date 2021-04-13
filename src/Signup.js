
import {Component} from "react"

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
                this.setState({
                    message :  'logged in successfully'
                })
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

            <div>
            <input className="form-control" placeholder="Enter Email" type="text" name="email" onChange={this.getEmail}></input>
            <input className="form-control mt-2" placeholder="Enter Password" type="password" name="password" onChange={this.getPassword}></input>
            <div className="text-danger mt-2">
            {this.state.message}
            </div>
            <button className="btn btn-success mt-2" onClick={this.register}>Register</button>
        </div>
    );
    }
}

export default Signup