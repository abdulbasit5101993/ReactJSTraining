import {useState} from "react"
import { connect } from 'react-redux';
function Summary(props){
    var [formerrors, setFormerrors] = useState({})

    var validate = function(elements){
        var errors = {}
        console.log("summary elements received for validation",elements)
        if(!elements.username.value){
            errors.username = "Username is Required"
        }
        if(!elements.phone.value){
            errors.phone = "Phone Number is Required"
        }
        var errorKeys = Object.keys(errors)
        if(errorKeys.length>0){
            return errors
        }
        else{
            return false
        }

    }
    var saveSummary = (event) =>{
        event.preventDefault()
        var form = document.getElementById('summaryform')
        console.log("Form Elements in this", form.elements)
        var errors = validate(form.elements)
        if(errors){
            setFormerrors(errors)
        }else{
            setFormerrors({})
            if(props.step === 1){
                props.dispatch({
                    type:"CHECKOUTSTEP",
                    payload:2
                })
            }
            props.dispatch({
                type:"SUMMARYFORM",
                payload:{username:form.elements.username.value,phone:form.elements.phone.value}
            })
            props.history.push("/checkout/address")
        }
    }
    console.log('summary',props);
    return(
        <div>
            <h5 className="text-center"> Summary </h5>
            <form id="summaryform"> 
                <div className="row mb-2">
                    <div className="col">
                    <input value={props.summaryform?.username} name="username" type="text" className="form-control" placeholder="User name"></input>
                        <div className="text-danger">
                            {formerrors?.username && <div>{formerrors.username}</div>}
                        </div>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col">
                    <input value={props.summaryform?.phone} name="phone" type="text" className="form-control" placeholder="Phone"></input>
                    <div className="text-danger">
                            {formerrors?.phone && <div>{formerrors.phone}</div>}
                        </div>
                    </div>
                </div>
                <button onClick={saveSummary} className="btn btn-success mt-2">Continue to Address</button>
            </form>
        </div>
    )    
}

export default connect(function(state,props){
    return {
        step : state && state.checkoutstep,
        summaryform : state && state.summaryform,
    }
})(Summary)